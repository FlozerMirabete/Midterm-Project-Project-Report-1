# Backend Architecture Decision Record

## ADR-001: Express API with layered mock-data architecture

**Status:** Accepted for midterm prototype.

**Context:** The CMS midterm requires a working API, an OpenAPI contract, consistent errors, and a clear routes → services → data separation. A real database and live partner integrations can be added later.

**Decision:** Use Node.js with Express. Store route definitions in `server/routes`, business validation and clearance rules in `server/services`, and temporary data in `server/data/store.js`. Publish the OpenAPI 3.0.3 contract at `server/openapi.yaml` and Swagger UI at `/docs`. Return Problem Details JSON for HTTP 400 and 404 errors.

**Consequences:** Easy to run locally and demonstrate with mock data. Data resets on restart; there is no authentication or persistence. Replace the mock store with a database and replace integration adapters with actual partner endpoints for the finals project.
