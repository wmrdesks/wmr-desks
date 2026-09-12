# Fee schedules

The community-requested split is live for new coins launched through the current WMR hosted factory. Total trading fees remain 3%.

| Destination | Share of trade volume |
| --- | ---: |
| Official WMR buyback and permanent burn | 1.7% |
| Launched coin holder reward purchases | 0.9% |
| Payout reserve | 0.1% |
| PONs | 0.3% |

The 0.9% buys the selected reward asset. Eligible holders share settled rewards in proportion to their snapshot balances. It is not 0.9% paid separately to every wallet, an APY, or a guaranteed net return. Execution costs and route conditions apply.

The 1.7% funds purchases of official WMR on Robinhood Chain. A dedicated execution escrow and retry journal track each purchase; the desk settles the purchased tokens to the permanent burn address. A pending buyback does not redefine the holder allocation.

The 0.1% reserve share is retained by the fee accounting service and periodically converted to USDG when the conversion threshold is met. It supplements replenishment from redeemed source backing; it does not guarantee instant payout or unlimited liquidity.

## Existing desks

Old vaults retain their immutable 1.8% infrastructure, 0.7% holder rewards, 0.2% legacy protocol buyback and 0.3% PONs schedule. The existing infrastructure share includes 0.1% reserve funding; the remaining 1.7% is the legacy team share before authorized operating costs. Do not label an old desk as using the new split or assume its legacy protocol token is official WMR.

An independently launched coin is not automatically covered by WMR launchpad fee rules. Routing an existing coin requires its own authorized configuration.

The current factory and legacy factory addresses are in [Contracts](CONTRACTS.md). Read a vault's immutable allocation and factory identity when explaining a specific existing coin.
