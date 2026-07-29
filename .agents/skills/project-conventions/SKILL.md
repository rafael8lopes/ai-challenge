---
name: project-conventions
description: 'Coding conventions and architectural rules for this project. Load this skill whenever writing or reviewing code. Covers component patterns, import rules, package structure, state management, security, and accessibility.'
---

# Project Conventions

Key goals:
- Clean architecture
- Strong TypeScript and maintainable React
- Clear separation of concerns
- Accessibility and performance awareness
- Solid testing strategy and DX

## Architecture
Use feature-based structure under `src/`.

Core areas:
- `app/`
- `components/`
- `features/sales/`
- `features/vehicles/`
- `layouts/`
- `services/`
- `styles/`
- `types/`
- `utils/`
- `mocks/`

Each feature should own:
- `pages`
- `components`
- `hooks`
- `services`
- `types`
- `utils`

Avoid creating shared modules unless they are genuinely shared.

## Engineering Rules
### Components
- Keep components focused on one responsibility.
- Prefer composition over large components.
- If a component grows beyond about 200 lines, consider splitting.

### Design System Usage
- Use MUI as the default design system for UI building blocks.
- Prefer MUI components before creating custom components.
- Create custom components only when MUI does not satisfy the required behavior, accessibility, or product-specific visual constraints.
- When creating wrappers around MUI, keep them thin and reusable.

### Business Logic
- Do not put business logic inside JSX.
- Move logic to `utils/`, `services/`, or `hooks/`.

Example:

Bad:
```tsx
const filteredSales = sales.filter(...)
```

Good:
```ts
filterPublicSales()
```

### Service Layer
- Pages must never import JSON fixtures directly.
- Access fixtures through service modules only.
- Keep an API-like boundary so replacing mocks with backend calls is straightforward.

Example:

Bad:
```ts
import sales from "@/mocks/sales.json";
```

Good:
```ts
publicSalesService.getPublicSales()
```

## State Ownership
- Server state: TanStack Query (sales, vehicles, details).
- URL state: filters via search params (for example `?state=live`).
- UI state: local component state (modal open, selected image, accordion state).
- Derived state: pure functions first; `useMemo` only for filtering/mapping possible massive datasets.

Never duplicate server or derived state.

## Styling
- Use MUI as the styling foundation; drive all visuals through the shared theme in `app/theme`.
- Prefer the `sx` prop for component-level styling. Reach for tokens (`palette`, `spacing`, `typography`) instead of hardcoded values where possible.
- Use `styled()` from `@emotion/styled` (or `@mui/material/styles`) for reusable, complex, or frequently repeated style blocks.
- Extract repeated `sx` objects into shared style constants (e.g. `utils/*Styles.ts`) rather than duplicating them across components.
- Avoid inline `style={{}}` objects and avoid styling raw HTML tags.
- Customize global look-and-feel in the theme, not per-component overrides.

Example using `sx` with theme tokens:
```tsx
<Box sx={{ display: 'flex', gap: 2, p: 3, bgcolor: 'background.default' }}>
  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'error.main' }}>
    Overdue
  </Typography>
</Box>
```

Example shared style constant:
```ts
export const headerCellSx = {
  fontWeight: 700,
  color: 'text.secondary',
  letterSpacing: 0.8,
} as const
```

## Component File Structure
Reusable component folder pattern:

```text
VehicleCard/
  VehicleCard.tsx
  VehicleCard.test.tsx
```

Inside component files, prefer this order:
1. imports
2. types
3. component
4. handlers
5. derived values
6. effects
7. return

Avoid deeply nested ternaries; extract sections into child components.

## Naming
- Components: `SaleCard`, `VehicleCard`, `Pagination`
- Hooks: `usePublicSales`, `useVehicle`, `usePagination`
- Utilities: `formatDate`, `formatPrice`, `filterPublicSales`, `parseFilters`
- Services: `publicSalesService`, `publicVehiclesService`

## TypeScript and React
- Never use `any`; prefer `unknown` or explicit types.
- Keep types close to their feature/domain.
- Prefer function components and named exports.
- Avoid premature memoization (`React.memo`, `useMemo`, `useCallback`).

## Imports
- Use path alias imports with `@/` for internal project modules.
- Do not use relative imports (`../` or `./`) for internal modules.
- Keep imports stable and refactor-safe by relying on alias paths.

## Routing and Access
Public routes:
- `/`
- `/sales/:saleId`
- `/vehicles/:vehicleId`
- `/*` (Not Found)

Private or exclusive sales must not be accessible.

## Accessibility
- Use semantic HTML (`header`, `main`, `section`, `nav`, `footer`).
- Inputs require labels.
- Buttons must be keyboard accessible.
- Images need meaningful `alt` text.
- Loading states use `role="status"`.
- Error states use `role="alert"`.

## Performance
- Avoid filtering/sorting in render.
- Avoid unnecessary object recreation.
- Put expensive work in `utils/` or `hooks/`.
- Paginate large datasets.

## Error and Empty States
Each page must explicitly handle:
- loading
- empty
- error
- not found

Gracefully handle missing or malformed optional data (image, price, optional fields, dates).
