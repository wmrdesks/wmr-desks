# Contributing

Issues and pull requests are welcome for documentation corrections, terminal adapters, wallet UX, language bindings and accessibility improvements.

Before opening a pull request:

1. Keep examples read-only unless a user explicitly signs a transaction.
2. Match assets by chain ID and contract address.
3. Preserve minimum-output and deadline fields.
4. Do not add private infrastructure data or credentials.
5. Run `./scripts/check-secrets.sh`.

Contract or route changes require separate deployment review and are not activated by merging documentation.

