import {
  createPublicClient,
  createWalletClient,
  custom,
  defineChain,
  http,
  parseUnits,
} from 'viem';
import backedRewardTokenAbi from '../../abis/BackedRewardToken.json' with {type: 'json'};
import cashoutRouterAbi from '../../abis/SellSettlementRouter.json' with {type: 'json'};

const robinhood = defineChain({
  id: 4663,
  name: 'Robinhood Chain',
  nativeCurrency: {name: 'Ether', symbol: 'ETH', decimals: 18},
  rpcUrls: {default: {http: ['https://rpc.mainnet.chain.robinhood.com']}},
  blockExplorers: {default: {name: 'Blockscout', url: 'https://robinhoodchain.blockscout.com'}},
});

export async function requestCashout({
  ethereum,
  wrapper,
  router,
  holder,
  recipient,
  amount,
  minimumOutput,
  deadline,
  executionFeeWei,
}) {
  const publicClient = createPublicClient({chain: robinhood, transport: http()});
  const walletClient = createWalletClient({account: holder, chain: robinhood, transport: custom(ethereum)});
  const decimals = await publicClient.readContract({address: wrapper, abi: backedRewardTokenAbi, functionName: 'decimals'});
  const wrapperAmount = parseUnits(amount, decimals);
  const allowance = await publicClient.readContract({
    address: wrapper,
    abi: backedRewardTokenAbi,
    functionName: 'allowance',
    args: [holder, router],
  });

  if (allowance < wrapperAmount) {
    const approval = await walletClient.writeContract({
      address: wrapper,
      abi: backedRewardTokenAbi,
      functionName: 'approve',
      args: [router, wrapperAmount],
    });
    await publicClient.waitForTransactionReceipt({hash: approval});
  }

  return walletClient.writeContract({
    address: router,
    abi: cashoutRouterAbi,
    functionName: 'requestSell',
    args: [wrapperAmount, BigInt(minimumOutput), recipient, BigInt(deadline)],
    value: BigInt(executionFeeWei),
  });
}

// Obtain wrapper, router, minimumOutput, deadline and executionFeeWei from a
// fresh WMR route/quote response. Never hard-code a cashout quote.

