# Protocol API

The hosted API is in private funded testing. This document defines the integration surface so terminal teams can build against stable response shapes. Public credentials are intentionally absent from this repository.

Base URL: `https://wmrdesks.app/api/protocol`

## Read endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/status` | Protocol and indexer health |
| `GET` | `/desks` | Discovered launches and desk state |
| `GET` | `/analytics` | Verified fee, purchase and payout totals |
| `GET` | `/cashout/routes` | Current wrapper, router and route availability |

## Quote endpoint

`POST /cashout/quote`

Example request:

```json
{
  "wrapper": "0x0000000000000000000000000000000000000000",
  "amount": "1000000000000000000",
  "recipient": "0x0000000000000000000000000000000000000000"
}
```

The production response supplies the router, protected minimum, deadline and required execution fee. Treat every quote as short-lived and use integer strings for token and wei amounts.

```json
{
  "wrapper": "0x…",
  "router": "0x…",
  "amount": "1000000000000000000",
  "minimumOutput": "…",
  "recipient": "0x…",
  "deadline": 1789000000,
  "executionFeeWei": "…"
}
```

## Rules

- Reject a response whose chain ID, wrapper or router does not match the selected route.
- Do not cache cashout quotes beyond their deadline.
- Do not use JavaScript numbers for onchain amounts.
- A `200` quote is preparation, not proof of settlement.
- Track the signed transaction and the resulting cashout request separately.
- During private testing, request integration access from the WMR team. Never embed shared credentials in a frontend bundle.

