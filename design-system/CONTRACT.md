# Design System Contract

## What "Match" Means at Elevatus

### Token Parity (MUST)
- Every color, spacing, radius, shadow value in a component MUST reference
  a named component token. No hex codes. No px literals. No calc() unless
  documented here.
- Token values must be identical between Figma variables export and 
  tokens/*.json (verified by CI snapshot test).

### Visual Parity (MUST)

- Every component MUST have a Playground page under `/src/playground/` (or equivalent).
- All documented states (hover, focus, disabled, loading, error, selected)
  must be rendered in a states matrix on that page.

- Default state must visually match Figma reference.
- No visual drift is allowed without:
  1) updating tokens
  2) updating component spec
  3) documenting the change in DECISIONS.md

- Visual validation is done through:
  - token snapshot parity
  - manual parity check against Figma reference frame
  - optional visual regression snapshot (if enabled later)
- Chromatic snapshot within 0% diff threshold for default state.
- All documented states (hover, focus, disabled, loading, error, selected)
  must exist in Storybook and pass Chromatic.

### Spacing Parity (MUST)
- Padding, margin, gap values must use spacing tokens exactly.
  No rounding to "close enough."

### Typography Parity (MUST)
- font-size, line-height, font-weight, letter-spacing must match
  Figma text style values exactly.

### Responsive (SHOULD)
- Breakpoints defined in tokens/semantic/breakpoints.json.
- Each component spec.md declares whether it has responsive behavior.

### RTL (MUST for navigation, inputs, tables; SHOULD for others)
- Components marked RTL:MUST in their spec.md must pass RTL visual test.

## What "Match" Does NOT Mean
- Pixel-perfect on every browser at every zoom level (impractical).
- Animation/transition curves (handled separately in motion tokens).
- Print styles (out of scope).

## Token Naming Rules
[See tokens/README.md]

## Breaking Change Protocol
Any of the following requires a BREAKING entry in tokens/CHANGELOG.md,
a design review issue, and a deprecation period of ≥1 sprint:
- Renaming a token
- Removing a token
- Changing a primitive value that affects >3 components