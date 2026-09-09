# Terminal and wallet integration

The smooth holder flow is: see the reward, choose Sell, review protected output, approve if needed, and sign the cashout request. The holder does not need to visit the WMR website when a terminal integrates this flow.

## Discovery

1. Read the current asset registry.
2. Add enabled wrapper contracts to the terminal's token catalog.
3. Read `balanceOf(holder)` and `decimals()` using the standard ERC-20 ABI.
4. Match by chain ID and contract address. Never match by symbol alone.

## Cashout flow

1. Fetch the current route and a fresh quote from the WMR protocol API.
2. Show output asset, estimated output, minimum received, execution cost, recipient and expiry.
3. If `allowance(holder, router) < wrapperAmount`, request `approve(router, wrapperAmount)`.
4. Call the route's `requestSell(wrapperAmount, minimumOutput, recipient, deadline)` and attach the quoted `executionFeeWei` as transaction value.
5. Track the request event and settlement state until paid or expired.

```ts
const allowance = await publicClient.readContract({
  address: wrapper,
  abi: erc20Abi,
  functionName: 'allowance',
  args: [holder, router],
});

if (allowance < wrapperAmount) {
  await walletClient.writeContract({
    address: wrapper,
    abi: erc20Abi,
    functionName: 'approve',
    args: [router, wrapperAmount],
    account: holder,
  });
}

await walletClient.writeContract({
  address: router,
  abi: cashoutRouterAbi,
  functionName: 'requestSell',
  args: [wrapperAmount, minimumOutput, recipient, BigInt(deadline)],
  value: executionFeeWei,
  account: holder,
});
```

See the runnable example in [`examples/terminal-integration`](../examples/terminal-integration/).

## UX requirements

- Label the action **Sell wrapped reward** or **Redeem**, not a generic DEX swap.
- Display the source asset and source network.
- State that output is protected by a minimum and deadline.
- Present approval and cashout as two signatures when approval is required.
- Do not pre-approve an unlimited amount by default.
- Do not invent a price when the quote service is unavailable.
- Keep the recipient editable so a user can settle to a compatible destination address.

## Wallet compatibility

MetaMask, Phantom EVM and other EIP-1193 wallets can sign the Robinhood Chain transactions. Trading terminals can use the same ABIs. A terminal that only routes conventional AMM liquidity must add a WMR adapter or intent action before it can offer cashout.

## Failure explanations

| Condition | Message to show |
| --- | --- |
| Route unavailable | This reward route is temporarily unavailable. Your wrapped balance is unchanged. |
| Quote expired | Refresh the quote and review the new minimum output. |
| Approval rejected | Approval was not signed. No wrapped tokens were moved. |
| Cashout rejected | The cashout request was not signed. Any earlier approval remains, but no reward was sold. |
| Settlement pending | The request is confirmed and settlement is processing. |
| Minimum cannot be met | The request will not settle below the protected minimum. Refresh the quote or wait. |

