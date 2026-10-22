# Midterm Submission Checklist — Library Module

Use this checklist with the course handout. The source project can support the API portion, but the team must verify its own course-specific evidence before submission.

## Project setup and API

- [x] Layered Express structure: routes → services → mock data.
- [x] OpenAPI contract and Swagger UI source included.
- [x] Required health endpoint implemented in source: `GET /api/v1/health` → `{"status":"ok"}`.
- [x] Node built-in smoke tests added for health, books list, not-found response, and malformed JSON.
- [ ] On the team computer, run `npm install`, then `npm test`, then `npm start`; record the actual result.
- [ ] Open `http://localhost:3007/docs` and confirm the contract loads and the endpoints work.
- [ ] Exercise the CRUD and business-rule flows in Swagger or another API client; capture real response screenshots.

## Figma prototype — required separate deliverable

- [ ] Create the actual prototype in the team's Figma workspace; the `public/` browser UI is not a substitute.
- [ ] Apply the exact shared class design-system styles/components.
- [ ] Create desktop and phone-width frames and link the required main flows in Prototype mode.
- [ ] Include loading, empty, error, validation, confirmation, and success states.
- [ ] Test the Figma share link in view mode and paste the real link into the team's submission materials.
- [ ] Capture screenshots of the finished Figma frames and shared design-system styles.
- [ ] Compare with at least two other module groups and document actual similarities/differences.

## Integration and documentation

- [ ] Confirm Registrar student key, lookup endpoint, response schema, authentication, and error handling with the Registrar group.
- [ ] Confirm Finance penalty ownership, payment-status endpoint, response schema, authentication, and error handling with the Finance group.
- [ ] Update `docs/integration.md` agreement log with real decisions and dates. Until confirmed, keep adapters in mock mode and describe them as mocks.
- [ ] Replace any suggested sprint/backlog statuses with the team's actual progress and evidence.
- [ ] Add the real group number, team member names, module/port assignment, and any professor-required identifying information.
- [ ] Review all documentation and remove instructions or sample details that do not apply to the team's actual work.

## Important accuracy note

Do not claim that a live Registrar/Finance integration, persistent database, or native Figma prototype is complete unless it has actually been implemented and tested. The current API stores data in memory, so mock records reset when the server restarts. The PHP 500 penalty is illustrative only.
