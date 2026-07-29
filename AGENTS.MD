# AGENTS.MD — Dispute Triage Cockpit

## Project Overview

**Dispute Triage Dashboard** for Coral Escapes — a vacation rental marketplace processing $40M+/month across 12 countries in Latin America and the Caribbean. The dashboard helps fraud analysts quickly understand chargebacks, prioritize work, and gather evidence to win disputes.

**Client**: Coral Escapes (via Yuno merchant success team)
**Problem**: 23% dispute win rate (industry benchmark 45-55%), analysts spend 45 min/dispute gathering evidence across 5 systems, losing $180K/month to winnable chargebacks.
**Goal**: Single dashboard — triage, understand, and gather evidence in under 5 minutes per dispute.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 |
| Language | TypeScript 6 (strict, `es2023` target) |
| Build | Vite 8 |
| UI Library | MUI 6 (`@mui/material`, `@mui/icons-material`) |
| Styling | Emotion (`@emotion/react`, `@emotion/styled`) + Sass |
| Routing | React Router DOM 7 |
| Data Fetching | TanStack React Query 5 |
| Lint | ESLint 10 + typescript-eslint + react-hooks + react-refresh |
| Package Manager | npm |

## Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Type-check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture & Conventions

### Directory Structure (target)

```
src/
├── assets/             # Static assets (images, icons)
├── components/         # Shared/reusable UI components
├── features/           # Feature modules (dispute-list, dispute-detail, etc.)
│   ├── disputes/
│   │   ├── components/ # Feature-specific components
│   │   ├── hooks/      # Feature-specific hooks
│   │   ├── types.ts    # Feature-specific types
│   │   └── index.ts    # Public API barrel
├── data/               # Mock data, test fixtures, data generation
├── hooks/              # Shared custom hooks
├── types/              # Global/shared type definitions
├── utils/              # Utility functions
├── theme/              # MUI theme customization
├── App.tsx             # Root component with router setup
└── main.tsx            # Entry point
```

### Code Style

- **Functional components only** — no class components
- **Named exports** — avoid default exports (except route-level pages if needed)
- Use MUI components and theme system for all UI
- Prefer `sx` prop or `styled()` for component-level styles; avoid inline style objects
- Use React Router for navigation between views (list → detail)
- Use TanStack Query for data fetching (even with mock data — simulate async)
- TypeScript strict mode: no `any`, explicit return types on exported functions
- Prefer `interface` for object shapes, `type` for unions/intersections

### State & Data

- **No real backend** — use mock data (JSON files or in-memory)
- Simulate API calls with small delays for realistic UX
- TanStack Query manages server state; local UI state with `useState`/`useReducer`
- Filter/sort state can live in URL search params (React Router) or local state

## Domain Model (Key Types)

```typescript
// Dispute reason categories
type DisputeReasonCategory = 'fraud' | 'service' | 'processing' | 'authorization'

// Dispute statuses
type DisputeStatus = 'new' | 'in-progress' | 'submitted'

// Core dispute entity
interface Dispute {
  id: string
  transactionId: string
  amount: number
  currency: 'USD' | 'MXN' | 'BRL' | 'COP'
  reasonCode: string            // e.g., "10.4", "13.1", "12.1", "11.3"
  reasonCategory: DisputeReasonCategory
  status: DisputeStatus
  responseDeadline: string      // ISO date
  filedAt: string               // ISO date
  transactionDate: string       // ISO date
  paymentMethod: string         // e.g., "Visa ****4532"
  processor: string             // e.g., "EBANX", "dLocal", "PaymentEz"
  customer: CustomerProfile
  booking: BookingDetails
  timeline: TimelineEvent[]
  evidenceSignals?: EvidenceSignal[]
}
```

## Dispute Reason Codes Reference

| Code | Category | Meaning |
|------|----------|---------|
| 10.4 | Fraud | Fraudulent transaction, card not present |
| 10.5 | Fraud | Fraud — counterfeit transaction |
| 13.1 | Service | Services not provided or merchandise not received |
| 13.2 | Service | Cancelled recurring transaction |
| 13.3 | Service | Not as described or defective |
| 12.1 | Processing | Duplicate processing |
| 12.2 | Processing | Incorrect amount |
| 11.1 | Authorization | Card recovery bulletin |
| 11.3 | Authorization | No authorization obtained |

## Evidence Strategy by Category

- **Fraud (10.x)**: IP match, device fingerprint, delivery confirmation, prior successful txns, AVS/CVV match
- **Service (13.x)**: Check-in/check-out logs, guest communication, cancellation policy acceptance, property photos
- **Processing (12.x)**: Transaction logs proving single charge, correct amount records
- **Authorization (11.x)**: Auth response codes, approval records

## Test Data Requirements

- 15-25 disputes with varied characteristics
- Mix of all 4 reason categories
- Amounts: $80 – $3,500
- Currencies: USD, MXN, BRL, COP
- Deadlines: 1-2 days (urgent) to 14+ days (comfortable)
- All statuses represented
- Some disputes with complete evidence, others with gaps

## Acceptance Criteria

1. ✅ Landing view shows all disputes with key details at a glance
2. ✅ Filter/sort by deadline, amount, reason type, status
3. ✅ Dispute detail workspace: transaction data, customer info, booking details, timeline
4. ✅ Plain-language explanation of reason codes
5. ✅ Visual guidance toward most relevant evidence per dispute type
6. ✅ Responsive, production-ready feel
7. ✅ README with setup instructions and design decisions

### Stretch Goals (optional)

- Evidence strength signals (missing/weak evidence warnings, positive signals)
- Dispute reason intelligence panel (auto-suggested evidence types)

## Design Principles

- **Clarity over density** — fraud analysts use this 8+ hours/day; reduce cognitive load
- **Urgency visibility** — deadline proximity must be immediately obvious (color-coded)
- **Contextual relevance** — surface different evidence based on dispute reason category
- **Scannable** — key metrics visible without clicking; details on demand
- **Professional tone** — operational tool, not a marketing site
