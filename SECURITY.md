# Security policy

## Report a vulnerability

Do not open a public issue for an exploitable contract, signing, custody, authentication or infrastructure vulnerability. Contact the WMR team privately through the official channel listed on [wmrdesks.app](https://wmrdesks.app) and include the affected contract, transaction or route plus reproduction steps.

## Integration safety

- Verify chain ID and contract address before every signature.
- Obtain routes and quotes from the official WMR origin.
- Use exact integer amounts and enforce quote deadlines.
- Keep minimum-output protection intact.
- Ask only for the required wrapper allowance.
- Never request or collect a user's seed phrase or private key.
- Treat symbols, names, logos and token lists as display metadata.

## Repository hygiene

This public repository must never contain private keys, mnemonics, API keys, admin credentials, `.env` files, server inventories, signing endpoints or private deployment material. Run `./scripts/check-secrets.sh` before every commit.

