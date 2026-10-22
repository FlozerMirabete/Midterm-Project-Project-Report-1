# Figma-ready frontend package

The `public/` folder is a responsive, clickable browser prototype for the Library subsystem. It is included in the project ZIP and is served at `http://localhost:3007/` when the server runs. The HTML/CSS/JS are editable source assets; the prototype is not a native `.fig` file and does not automatically create frames inside an existing Figma workspace.

## Suggested Figma frame plan (align with the professor's rubric)

Create a Figma page named **Library CMS — Midterm Prototype** and use the class design-system styles/components rather than inventing a separate visual system. The browser UI uses a forest/cream/green visual direction as a starter only; replace tokens with the exact class-provided color, typography, spacing, radius and shadow styles when those are available.

### Desktop frames (1440 × 1024)
1. **Overview / Dashboard** — KPI cards, recent borrowing table, attention list, clearance overview.
2. **Books & Borrowing** — search/filter table with Borrowed, Overdue and Returned states.
3. **Lost & Damaged — List** — issue queue with student ID, book ID, issue, penalty and status.
4. **Report Issue — Form** — student ID, book ID, issue type, description and penalty amount; include required-field and invalid-ID validation.
5. **Report Issue — Confirmation** — confirm submission and explain that clearance remains blocked until resolution/payment.
6. **Success / Updated Record** — new issue appears in the table and status shows Not Cleared.
7. **Penalties** — amount, reason and payment status, with Finance status marked pending/unpaid/paid.
8. **Student Clearance** — cleared vs not-cleared examples and reason for hold.
9. **Loading state** — skeleton rows/spinner while records load.
10. **Empty state** — “No records yet” and a relevant action.
11. **Error state** — API unavailable/failed request with Retry action.
12. **Confirmation dialog** — resolve issue or mark as paid, with Cancel and Confirm.

### Phone frames (390 × 844)
Create phone-width versions of Overview, Books & Borrowing, and Report Issue. At phone width, collapse the sidebar to a menu, stack KPI cards, and convert wide table rows to scrollable table/cards. Keep action labels and ID/date/currency formats consistent with the class standards.

### Prototype links
- Overview → Books & Borrowing via “View all”.
- Overview → Lost & Damaged via “Review all issues” or “Report lost / damaged book”.
- Books & Borrowing row → record detail.
- Record detail → Edit/Report issue → confirmation → success.
- Lost & Damaged → issue detail → Resolve confirmation → success.
- Penalties → payment detail → mark payment confirmed (only after Finance confirmation).
- Student Clearance → student detail; unresolved issue or unpaid penalty displays Not Cleared.

### Realistic sample data
- Student ID format: `2026-00123` (confirm with the group's agreed format).
- Book IDs: `BK-0004`, `BK-0007`.
- Date display: `Sep 25, 2026` (use the class standard).
- Currency display: `₱1,500.00`.
- Sample penalty `₱500.00` is illustrative only; actual amount must follow the school's policy/replacement value.

### Rubric evidence to capture for the presentation
- One Figma screenshot with the Design panel showing class color/text styles or shared components.
- Three finished key screens.
- The five-step main flow: list → details → edit/report → save → success.
- Loading, empty, error, validation and confirmation-dialog states.
- Two to four phone-width frames.
- Cross-module comparison with at least two other groups; fill this only after checking their real screens.

Do not claim a native Figma prototype is finished until these frames are actually created in Figma, linked in Prototype mode, and the share link is tested in view mode. Do not invent partner-group agreements, team members, actual progress evidence or Figma links.
