<p align="center">
  <img src="assets/brand/wmr-logo.png" width="92" alt="WMR Desks logo">
</p>

# WMR Desks

**Launch coins. Route fees. Reward holders.**

WMR Desks is an onchain reward layer built for PONs launches. It converts a defined share of every buy and sell into the reward asset selected by the creator, accounts for eligible holders, and delivers fully backed rewards on Robinhood Chain.

The product brings launch, fee routing, reward acquisition, distribution and cashout into one verifiable lifecycle. Its multichain settlement architecture connects PONs communities with supported assets on Robinhood Chain, Ethereum, BNB Chain and Solana while preserving route-specific custody and redemption. Holders receive rewards automatically at their eligible wallet address and can redeem them through WMR's protected cashout flow.

[Website](https://wmrdesks.app) · [Architecture](docs/ARCHITECTURE.md) · [Terminal integration](docs/TERMINAL_INTEGRATION.md) · [Contracts](docs/CONTRACTS.md)

## Product capabilities

- **Launch with rewards:** create a PONs coin and its dedicated reward desk in one guided flow.
- **Route an existing coin:** connect an eligible PONs launch after the authorized creator-fee recipient approves the route.
- **Choose across networks:** select a registered reward asset from a verified Robinhood Chain, Ethereum, BNB Chain or Solana route.
- **Reward every eligible holder:** calculate proportional distributions from published onchain snapshots rather than a fixed wallet list.
- **Keep rewards backed:** mint wrapped rewards only against reconciled purchases and custody or direct-settlement records.
- **Exit with protection:** redeem through a route-specific cashout request with minimum-output and deadline controls.
- **Integrate anywhere:** give wallets and trading terminals the public registry, ABIs and transaction flow required to surface WMR rewards natively.

## Architecture at a glance

WMR Desks separates trading, fee accounting, reward execution, backing, distribution and settlement so every stage can be inspected independently. PONs continues to handle the coin's native market. WMR receives the dedicated fee stream, records its fixed allocation, purchases the selected reward asset through a verified route, reconciles the backing, and delivers the corresponding wrapped reward to eligible holders. Cashout is a separate protected settlement path that burns the wrapper before releasing its backing.

```mermaid
flowchart LR
    T[PONs buy or sell] --> F[3% trade fee]
    F --> P[0.3% PONs]
    F --> I[0.1% payout reserve]
    F --> R[0.9% holder reward purchases]
    F --> B[1.7% official WMR buyback + burn]
    R --> Q[Verified reward route]
    Q --> C[Backed custody or direct settlement]
    C --> W[Wrapped rewards on Robinhood Chain]
    W --> X[WMR cashout request]
    X --> S[Source-route settlement]
    S --> U[Protected output to holder]
```

This separation keeps trading liquidity independent from reward-wrapper liquidity and gives wallets, terminals and auditors a clear contract boundary at each step. See the [full architecture](docs/ARCHITECTURE.md) for the complete fee split, route model and chain-specific settlement design.

## Fee flow

For new coins launched through the current WMR V2 hosted factory, each buy and sell carries the same 3% total fee:

| Allocation | Share of trade | Purpose |
| --- | ---: | --- |
| PONs | 0.3% | Platform fee |
| Payout reserve | 0.1% | Supplemental reserve funding, periodically converted to USDG |
| Holder rewards | 0.9% | Purchases the selected reward asset |
| Official WMR buyback + burn | 1.7% | Buys official WMR and sends it to the permanent burn address |

The percentages describe the total trade amount. They sum to 3%; they are not guaranteed holder returns. Existing desks retain their original immutable fee schedules. See [fee versions](docs/FEES.md).

## How it works

1. A creator launches through WMR Desks or routes an eligible existing PONs coin.
2. The launch transaction creates a dedicated fee vault with the fixed allocation.
3. The indexer calculates eligible balances at a published snapshot block.
4. Collected reward fees buy the selected asset through its verified route.
5. Backed wrapped rewards arrive at eligible Robinhood Chain addresses.
6. A holder exits through the WMR cashout router. At protected settlement, the router pays USDG and burns the redeemed wrapper in the same transaction. The service then sells the matching source backing and bridges proceeds to replenish the reserve.

WMR does not create low-liquidity wrapper pools. A generic DEX swap cannot redeem a wrapper by itself. Wallets and terminals should expose the WMR cashout action described in [Terminal integration](docs/TERMINAL_INTEGRATION.md).

## Network

| Item | Value |
| --- | --- |
| Network | Robinhood Chain mainnet |
| Chain ID | `4663` |
| Currency | `ETH` |
| RPC | `https://rpc.mainnet.chain.robinhood.com` |
| Explorer | `https://robinhoodchain.blockscout.com` |

## Repository contents

- `abis/` — integration ABIs extracted from the deployed contract build
- `registry/` — sanitized public contract and reward-asset catalog
- `docs/` — protocol, API and terminal integration documentation
- `examples/terminal-integration/` — wallet-safe approval and cashout example
- `assets/brand/` — WMR logo and integration-safe marks

## Integration status

The contracts and registered routes listed here are deployed on Robinhood Chain. Integrators must query current route availability and obtain a fresh quote before allowing a cashout. Public read endpoints expose protocol and route information. Availability is checked at request time; no private API credentials or signing material belong in this repository.

## Security

Never commit private keys, seed phrases, RPC secrets, admin credentials or signing material. See [SECURITY.md](SECURITY.md) for reporting and integration rules.

<details>
<summary>There is a tiny signal in the terminal…</summary>

### Meet Wimmy

<img src="assets/brand/wimmy-guide.svg" width="150" alt="Wimmy, the WMR guide">

Wimmy ("WIM-ee") is the movable WMR guide. The CRT eyes watch the route, the chest mark points toward the next action, and the little antenna listens for confirmed blocks. On the website, drag Wimmy anywhere and open the guide for launch, rewards and cashout help.

`> rewards_found`

</details>

## License

Documentation, examples and brand integration assets are available under the [MIT License](LICENSE). WMR and related brand marks remain trademarks of their respective owner.
