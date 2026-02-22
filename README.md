# Booking Manager

Frontend-only application for managing bookings associated with properties. It supports creating, viewing, editing, and deleting bookings with date validation and overlap prevention per property.

> The test defines an estimated time of ~3 hours. The scope was kept proportional: full functionality, polished UX, accessibility, and test coverage - no overengineering.

---

## Quick Start

```bash
pnpm install
pnpm dev
```

The app opens at [http://localhost:5173](http://localhost:5173).

---

## Features

### Full CRUD

- **Create** - form in a side Sheet with real-time validation
- **Read** - list displayed as a table (desktop) or cards (mobile)
- **Update** - same form with pre-filled data
- **Delete** - contextual confirmation before deleting

### Business Rules

- `startDate` and `endDate` are required, with `startDate < endDate`
- Overlap prevention within the same property:
  - When editing, the current booking is excluded from the comparison

### UX / UI

- **Responsive**: table on desktop, cards on mobile (conditional rendering via `useDevice` hook, not CSS media queries)
- **Sheet** (shadcn/ui) for creating/editing without losing context of the list
- **Toasts** for CRUD action feedback
- **Inline validation** in forms (React Hook Form + Zod)
- **Contextual confirmation** before deleting (shows property and dates)
- **Empty state** when there are no bookings
- **Semantic HTML and accessibility**: labels, `aria-label`, keyboard navigation, focus management in the Sheet
- **Error Boundary** at the root for unexpected render errors

### Additional features (within scope)

- **Number of guests and nights** as extra information on each booking
- **localStorage persistence** - bookings are preserved on reload (Zustand persist middleware). Only domain state (`bookings[]`) is persisted; form state is local (React Hook Form)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite + TypeScript |
| Global state | Zustand + persist middleware (localStorage) |
| Styling | Tailwind CSS v4 |
| UI components | shadcn/ui (Radix primitives) |
| Forms | React Hook Form + Zod |
| Dates | dayjs |
| Feedback | Sonner (toasts) |
| Unit/integration testing | Vitest + React Testing Library + happy-dom |
| E2E testing | Cypress |
| Code quality | ESLint + Prettier + Husky (pre-commit) |

---

## Architecture

Feature-based structure with a shared layer for scalability:

```
src/
├── features/
│   └── bookings/
│       ├── components/       # BookingTable, BookingForm, BookingSheet, etc.
│       │   └── __tests__/    # Integration tests per component
│       ├── store/            # Zustand store + tests
│       ├── utils/            # overlap, validation, formatDate, etc. + tests
│       └── types.ts          # DraftBooking
├── pages/
│   └── BookingsPage.tsx      # Feature orchestrator
├── shared/
│   ├── config/               # Breakpoints
│   ├── data/                 # Hardcoded properties (4 items)
│   ├── hooks/                # useDevice (responsive)
│   ├── lib/                  # cn() utility
│   ├── types/                # Booking, Property
│   ├── ui/                   # shadcn/ui components + ErrorBoundary
│   └── utils/                # formatDate
└── test/                     # Setup, factories, helpers
```

### Principles

- Business logic (overlap, validation) **decoupled** from the view - lives in `utils/`
- Form state is **local** (React Hook Form), domain state is **global** (Zustand)
- `shared/` allows scaling to new features without coupling to `bookings/`

---

## Data Model

### Booking

| Field | Type | Description |
|---|---|---|
| `id` | `string` | UUID generated on creation |
| `guestName` | `string` | Guest name |
| `propertyId` | `string` | Associated property ID |
| `numberOfGuests` | `number` | Number of guests |
| `nights` | `number` | Number of nights (computed) |
| `startDate` | `string` | Check-in date (`YYYY-MM-DD`) |
| `endDate` | `string` | Check-out date (`YYYY-MM-DD`) |

### Property

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier |
| `name` | `string` | Property name |
| `address` | `string` | Full address |
| `city` | `string` | City |
| `country` | `string` | Country |
| `state` | `string?` | State/province (optional) |
| `description` | `string?` | Description (optional) |

Hardcoded list of 4 properties in `src/shared/data/properties.ts`.

---

## Technical Decisions

| Decision | Reasoning |
|---|---|
| **Vite** instead of Next.js | Frontend-only single-page app - Vite reduces complexity and unnecessary infrastructure for the scope |
| **Zustand** instead of Redux Toolkit | Less boilerplate, sufficient for simple global state (`bookings[]` + CRUD). If the app grows and requires more complex state and advanced debugging (time travel), Redux Toolkit would be a better alternative |
| **Sheet** for forms | Keeps the list context visible while creating/editing |
| **Hostfully-like palette** | Brand color integration via CSS variables (oklch) |
| **Husky + pre-commit** | `pnpm lint` runs automatically before each commit as a quality gate |
| **CI with GitHub Actions** | Pipeline that runs `lint` and `tests` on pull requests and commits to `main` |

---

## Testing

Strategy in 3 levels:

### Unit tests (Vitest)

Utils and hooks: `overlap`, `validation`, `formatDate`, `getPropertyName`, `useDevice`, `bookingStore`.

### Integration tests (Vitest + RTL)

Components: `BookingForm`, `BookingSheet`, `BookingTable`, `BookingCardList`, `BookingHeader`, `BookingEmptyState`, `DeleteBookingDialog`.

- Accessible assertions (`getByRole`, `getByLabelText`)
- Realistic interactions with `userEvent`
- Centralized fixtures with `dataFactory`

### E2E tests (Cypress)

Full CRUD flow from the user's perspective:

- Create booking → validate in list
- Validations (invalid dates, overlap)
- Edit booking → validate changes
- Delete booking → confirm removal
- Persistence → data survives reload

Best practices applied: seeding via `localStorage`, selectors with `data-testid` and `within()`, custom commands, no hardcoded `cy.wait()`.

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Development server (Vite) |
| `pnpm build` | Production build (`tsc` + Vite) |
| `pnpm preview` | Local build preview |
| `pnpm lint` | ESLint |
| `pnpm test` | Unit and integration tests (Vitest) |
| `pnpm test:watch` | Tests in watch mode |
| `pnpm test:coverage` | Tests with coverage report |
| `pnpm cy:open` | Cypress in interactive mode |
| `pnpm cy:run` | Cypress in headless mode |

---

## Future Improvements

### Within the current frontend

- Sorting and multi-selection in the table (migration to TanStack Table)
- Filtering by property, guest, or dates
- Booking statuses (confirmed, pending, cancelled)
- Virtualization for the card list and pagination for the table, for large datasets

### If extended to a backend

- Authentication and sessions (provider integration, secure token handling)
- Database persistence (PostgreSQL + Prisma)
- Full async state management (loading / error / retry)
- SSR/ISR if the use case justified it

(Next.js would be a better choice than a Vite SPA)
