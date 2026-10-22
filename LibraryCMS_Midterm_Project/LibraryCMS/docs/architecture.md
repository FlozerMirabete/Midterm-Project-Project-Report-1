# Architecture

## Module overview

The Library subsystem tracks borrowed books, lost/damaged book reports, penalties, and library clearance. Registrar owns official student information and Finance owns payment information. Library references partner-owned student identifiers rather than treating partner records as Library data.

## Request flow

```text
User / another CMS module
          ↓ HTTP JSON
Express routes (server/routes)
          ↓
Services and business rules (server/services)
          ↓
Mock data store (server/data/store.js)
          ↓ JSON response / Problem Details error
```

The mock data layer is replaceable by a database in the finals project without moving business rules into the routes.

## Screens / client actions to endpoints

| Screen/action (proposed Figma screen) | Endpoint | Purpose |
|---|---|---|
| Library Clearance List | `GET /api/v1/library` | View clearance records |
| Student Clearance Details | `GET /api/v1/library/{studentId}` | Check a student's clearance |
| Create Library Record | `POST /api/v1/library` | Add a clearance record |
| Edit/Refresh Clearance | `PUT /api/v1/library/{studentId}` | Update clearance subject to rules |
| Delete Library Record | `DELETE /api/v1/library/{studentId}` | Remove a record |
| Book Borrowing List | `GET /api/v1/books` | List/search book records |
| Add Borrowing Record | `POST /api/v1/books` | Record a book borrowing |
| Book Details/Edit | `GET/PUT /api/v1/books/{id}` | Read/update book status |
| Lost/Damaged Book Form | `POST /api/v1/book-damages` | Record issue and create penalty |
| Penalty List | `GET /api/v1/penalties` | View penalties |
| Mark Penalty Paid (mock only) | `PUT /api/v1/penalties/{id}` | Simulate payment confirmation |
| Registrar lookup | `GET /api/v1/integration/registrar/students/{studentId}` | Mock external student lookup |
| Finance lookup | `GET /api/v1/integration/finance/students/{studentId}/penalties` | Mock external penalty lookup |
| Server health | `GET /api/v1/health` | Verify server is running |

## Data and error handling

The API currently uses mock arrays. Missing resources return HTTP 404. Invalid requests or clearance-rule violations return HTTP 400 using `application/problem+json` with `type`, `title`, `status`, `detail`, and `instance` fields.
