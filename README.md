<p align="center">
  <img src="assets/brand/wmr-logo.png" width="92" alt="WMR Desks logo">
</p>

# WMR Desks

**Launch coins. Route fees. Reward holders.**

WMR Desks is reward infrastructure for PONs launches on Robinhood Chain. A launch can send part of its trading fee to a dedicated desk. The desk buys a selected reward asset and distributes a backed representation to eligible holders.

[Website](https://wmrdesks.app) · [Architecture](docs/ARCHITECTURE.md) · [Terminal integration](docs/TERMINAL_INTEGRATION.md) · [Contracts](docs/CONTRACTS.md)

## Fee flow

Every buy and sell carries a 3% total fee:

| Allocation | Share of trade | Purpose |
| --- | ---: | --- |
| PONs | 0.3% | Platform fee |
| Infrastructure | 1.8% | Operations, execution, audits, gas and development |
| Holder rewards | 0.7% | Purchases the selected reward asset |
| WMR buyback + burn | 0.2% | Buys WMR and sends it to the permanent burn address |

The percentages describe the total trade amount. They sum to 3%.

## How it works

1. A creator launches through WMR Desks or routes an eligible existing PONs coin.
2. The launch transaction creates a dedicated fee vault with the fixed allocation.
3. The indexer calculates eligible balances at a published snapshot block.
4. Collected reward fees buy the selected asset through its verified route.
5. Backed wrapped rewards arrive at eligible Robinhood Chain addresses.
6. A holder exits through the WMR cashout router. The router burns the wrapper, settles the backing route, and pays the protected output to the chosen recipient.

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

The contracts and registered routes listed here are deployed on Robinhood Chain. Integrators must query current route availability and obtain a fresh quote before allowing a cashout. The hosted protocol API remains private during the funded test period; no credential is committed to this repository.

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

