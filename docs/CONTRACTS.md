# Public contracts

The canonical network for desk, wrapper and cashout interactions is Robinhood Chain mainnet (`4663`). Verify addresses against the explorer and the current WMR registry before signing.

| Contract | Address |
| --- | --- |
| PONs V2 launch factory | [`0x7eD598BcEf8bd9Edd8C97A195C6d13f40801EC7e`](https://robinhoodchain.blockscout.com/address/0x7eD598BcEf8bd9Edd8C97A195C6d13f40801EC7e) |
| PONs launch-and-buy router | [`0xe33E9E479dF8802cb0866d5d05258bEc4cF62948`](https://robinhoodchain.blockscout.com/address/0xe33E9E479dF8802cb0866d5d05258bEc4cF62948) |
| PONs fee escrow | [`0xd3AFEB2a57f70eF218Aa82451c51B2fb0416Ac9e`](https://robinhoodchain.blockscout.com/address/0xd3AFEB2a57f70eF218Aa82451c51B2fb0416Ac9e) |
| WMR hosted desk factory | [`0x9a40ba06b8b7903a032fd0ffc4d81b857cdcb8cc`](https://robinhoodchain.blockscout.com/address/0x9a40ba06b8b7903a032fd0ffc4d81b857cdcb8cc) |

Wrapper and route addresses are listed in [`registry/reward-assets.json`](../registry/reward-assets.json). The registry is a discovery aid; runtime checks and fresh quotes remain required.

## Included ABIs

- `HostedDeskFactory.json` — launch a PONs coin and desk together
- `BackedRewardToken.json` — ERC-20 discovery, approval and wrapper actions
- `EvmRewardExitRouter.json` — EVM-backed cashout requests
- `SolanaRewardExitRouter.json` — Solana-backed cashout requests
- `SellSettlementRouter.json` — settlement-router cashout requests

ABI files are extracted from the same contract build used by the current deployment workspace. Integrators should pin the repository commit they review.

