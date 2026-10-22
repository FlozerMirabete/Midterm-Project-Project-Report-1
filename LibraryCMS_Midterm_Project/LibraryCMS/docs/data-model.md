# Data Model

## Entities and relationships

```text
LIBRARY_RECORD
- id (PK, Library-owned record ID)
- studentId (external key from Registrar / shared student identifier)
- status
- updatedAt

BOOK_RECORD
- id (PK)
- bookId (unique book identifier)
- title
- studentId (student identifier)
- borrowDate, dueDate, returnDate
- bookStatus

BOOK_DAMAGE
- id (PK)
- bookId
- studentId
- damageType (LOST or DAMAGED)
- description
- penaltyAmount
- status (UNRESOLVED or RESOLVED)

PENALTY
- id (PK)
- bookId
- studentId
- penaltyType (LOST or DAMAGED)
- amount
- paymentStatus (UNPAID or PAID)
```

Relationships: one student may have many book records; one student may have many book issue reports and penalties; one book may have an issue and related penalty. `studentId` is the cross-subsystem identifier, but Registrar/Finance records themselves are externally owned. The local `id` values are mock Library record identifiers, not the partner subsystem's PKs.

## Clearance invariant

A student is `NOT_CLEARED` if at least one issue is `UNRESOLVED` or at least one penalty is `UNPAID`. A student may be `CLEARED` only when both conditions are false.

## Book status values

`AVAILABLE`, `BORROWED`, `RETURNED`, `LOST`, `DAMAGED`.

## Penalty policy for prototype

LOST and DAMAGED use the replacement value as the penalty. PHP 500 is only a sample value used in mock data; actual amounts must follow the school's policy and book replacement cost.
