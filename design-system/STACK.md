# Project Stack

## Runtime
- Node.js 20+

## Frontend
- React 18
- TypeScript (strict mode)
- Vite (SWC)

## Styling
- CSS variables generated from design tokens
- No Tailwind
- No CSS-in-JS
- No styled-components

## Design System Rules
- Source of truth for tokens = Figma Variables export
- Components may use only semantic tokens
- No hardcoded colors, spacing, radius, shadows
- All components must be fully typed

## Architecture
- ES modules only
- No additional libraries without explicit approval