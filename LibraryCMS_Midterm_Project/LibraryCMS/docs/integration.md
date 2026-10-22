# Integration Contract — Registrar and Finance

## Current status

**NOT YET SPECIFIED / MOCK MODE.** The Library API is intentionally usable before partner APIs are available. Do not claim a live integration until a partner contract is agreed, implemented, and tested end-to-end. Current adapter responses are local mock data.

## Integration status endpoint

`GET /api/v1/integration/status` reports whether the placeholder configuration is present. It does not prove that a partner system is reachable.

## Environment placeholders

Copy `.env.example` to `.env` when needed. Leave values as `NOT_YET_SPECIFIED` until the partner groups confirm them. Never commit real API keys.

| Variable | Owner / purpose | Current value |
|---|---|---|
| `REGISTRAR_MODE` | Registrar adapter mode | `mock` |
| `REGISTRAR_BASE_URL` | Registrar service base URL | `NOT_YET_SPECIFIED` |
| `REGISTRAR_STUDENT_LOOKUP_PATH` | Student lookup path and key format | `NOT_YET_SPECIFIED` |
| `REGISTRAR_API_KEY` | Secret, if partner requires it | `NOT_YET_SPECIFIED` |
| `FINANCE_MODE` | Finance adapter mode | `mock` |
| `FINANCE_BASE_URL` | Finance service base URL | `NOT_YET_SPECIFIED` |
| `FINANCE_PENALTIES_PATH` | Penalty lookup path | `NOT_YET_SPECIFIED` |
| `FINANCE_PAYMENT_STATUS_PATH` | Payment verification path | `NOT_YET_SPECIFIED` |
| `FINANCE_API_KEY` | Secret, if partner requires it | `NOT_YET_SPECIFIED` |

These are configuration placeholders, not confirmed partner endpoint names. Do not invent or call them as if they were real.

## Existing local adapter endpoints

- `GET /api/v1/integration/registrar/students/{studentId}` — mock student/enrollment response.
- `GET /api/v1/integration/finance/students/{studentId}/penalties` — mock penalty response.
- `GET /api/v1/integration/status` — reports mock mode and whether configuration fields are present.

## Contract checklist to complete with partner teams

### Registrar
- [ ] Confirm the canonical student primary key and exact format.
- [ ] Confirm base URL, HTTP method, lookup path, query/path parameters.
- [ ] Confirm response fields for student identity and enrollment status.
- [ ] Confirm authentication, timeout, rate limits, and error response format.
- [ ] Agree on whether Library may cache identity/status and for how long.

### Finance
- [ ] Confirm whether Library sends a penalty assessment or Finance owns the official penalty record.
- [ ] Confirm how the Library penalty ID maps to a Finance transaction/assessment ID.
- [ ] Confirm lookup and payment-status verification endpoints and allowed status values.
- [ ] Confirm whether Finance or Library calculates replacement costs and penalties.
- [ ] Confirm authentication, timeout, idempotency, and error response format.
- [ ] Confirm how payment reversals/refunds are represented.

## Ownership and data rules

- `studentId` is an external reference key until Registrar confirms the canonical identifier; Library does not create Registrar student records.
- Library owns book inventory, borrowing records, and book-damage/loss reports.
- Finance owns official financial/payment records. A local mock `PAID` flag is only for demonstration and is not proof of actual payment.
- A student must remain uncleared while a library issue is unresolved or a required penalty is unpaid, using the agreed authoritative Finance status when integrated.
- Use environment variables for URLs and secrets. Do not hard-code secrets or commit `.env`.

## Agreement log

| Date | Partner module | Decision | Evidence/status |
|---|---|---|---|
| Pending | Registrar | Student key, lookup path, schema | NOT_YET_SPECIFIED |
| Pending | Finance | Penalty ownership, payment lookup, schema | NOT_YET_SPECIFIED |
