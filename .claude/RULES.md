# Rules

These rules apply to every task. No exceptions.

---

## Tokens
- Never use hex codes, px values, or any hardcoded value in component CSS
- Only reference CSS custom properties from `build/tokens.css`
- Never create a new token — flag it and request explicitly if one is missing
- Never rename or delete an existing token

## Components
- Never add a prop or variant not documented in the component's `spec.md`
- Never modify another component's files while working on a component
- Never import external UI libraries (MUI, Chakra, Radix, etc.)
  unless they already exist in `package.json`
- Never add a new npm dependency without flagging it for human approval
- Always use native HTML elements (`<button>`, `<input>`) over div+role
- No inline styles

## Code quality
- Every component must have a corresponding `.stories.tsx` file
- Every component must have a corresponding `.test.tsx` file
- No `any` types in TypeScript

## Component pages (DS Playground)
- Every component page must include a states matrix:
  default / hover / active / disabled / loading
  + size variants
  + style variants

## Navigation
- Navigation must be data-driven
- Use one configuration object to define sidebar structure and routes
- Never hardcode navigation inside JSX

## Libraries
- Do not add new libraries unless explicitly instructed
- React Router is allowed only if requested

## Git
- Never commit directly to `main`
- Always describe what changed and why in the commit message

---

## When in doubt
Stop. Ask. Do not guess.