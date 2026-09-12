# Public contracts

The canonical network for desk, wrapper and cashout interactions is Robinhood Chain mainnet (`4663`). Verify addresses against the explorer and the current WMR registry before signing.

| Contract | Address |
| --- | --- |
| PONs V2 launch factory | [`0x7eD598BcEf8bd9Edd8C97A195C6d13f40801EC7e`](https://robinhoodchain.blockscout.com/address/0x7eD598BcEf8bd9Edd8C97A195C6d13f40801EC7e) |
| PONs launch-and-buy router | [`0xe33E9E479dF8802cb0866d5d05258bEc4cF62948`](https://robinhoodchain.blockscout.com/address/0xe33E9E479dF8802cb0866d5d05258bEc4cF62948) |
| PONs fee escrow | [`0xd3AFEB2a57f70eF218Aa82451c51B2fb0416Ac9e`](https://robinhoodchain.blockscout.com/address/0xd3AFEB2a57f70eF218Aa82451c51B2fb0416Ac9e) |
| Historical WMR hosted factory (legacy) | [`0x9a40ba06b8b7903a032fd0ffc4d81b857cdcb8cc`](https://robinhoodchain.blockscout.com/address/0x9a40ba06b8b7903a032fd0ffc4d81b857cdcb8cc) |
| Current WMR hosted factory — fee V2 | [`0xa32db46b9f1e8d9C0FA4042E370321AAcAad50E5`](https://robinhoodchain.blockscout.com/address/0xa32db46b9f1e8d9C0FA4042E370321AAcAad50E5) |
| Previous hosted factory — legacy fees | [`0x68e28ECf4569baCEE34142E7A9f90eb90Fd43eFF`](https://robinhoodchain.blockscout.com/address/0x68e28ECf4569baCEE34142E7A9f90eb90Fd43eFF) |
| Official WMR token | [`0x0318206d6949f91dde089fa5f2819383fa44c226`](https://robinhoodchain.blockscout.com/address/0x0318206d6949f91dde089fa5f2819383fa44c226) |
| V2 buyback execution escrow | [`0x26BA09161014BF5693ED332cD9f34766c9E63017`](https://robinhoodchain.blockscout.com/address/0x26BA09161014BF5693ED332cD9f34766c9E63017) |

Wrapper and route addresses are listed in [`registry/reward-assets.json`](../registry/reward-assets.json). The registry is a discovery aid; runtime checks and fresh quotes remain required.

## Included ABIs

- `HostedDeskFactory.json` — launch a PONs coin and desk together
- `BackedRewardToken.json` — ERC-20 discovery, approval and wrapper actions
- `EvmRewardExitRouter.json` — EVM-backed cashout requests
- `SolanaRewardExitRouter.json` — Solana-backed cashout requests
- `SellSettlementRouter.json` — settlement-router cashout requests

`HostedDeskFactory.json` is the current V2 factory ABI. Existing desks remain on their original factory and fee terms. Public contract addresses do not contain private keys, but blockchain transactions and contract getters can reveal connected wallets.

ABI files are extracted from the same contract build used by the current deployment workspace. Integrators should pin the repository commit they review.

