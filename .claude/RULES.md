# Claude Operating Rules

## Libraries
- Do not add new libraries unless explicitly instructed.
- React Router is allowed only if requested.

## Styling
- Use CSS variables only for visual values.
- No hardcoded colors, spacing, radius, shadows.
- Components must consume semantic tokens only.

## Component Pages (DS Playground)
- Every component page must include a states matrix:
  default / hover / active / disabled / loading
  + size variants
  + style variants

## Navigation
- Navigation must be data-driven.
- Use one configuration object to define:
  - sidebar structure
  - routes/pages
- Do not hardcode navigation inside JSX.