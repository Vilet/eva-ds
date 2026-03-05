# Tokens

Design tokens are the single source of truth for all visual decisions in the Elevatus design system. This folder contains all token files that feed into the Style Dictionary build pipeline.

---

## Folder structure

```
tokens/
├── color.primitives.json    Raw color values — primary, secondary, neutral, system, chart, supportive palettes
├── color.aliases.json       Semantic color aliases — interactive, surface, structure, status, text
├── spacing.json             XXSM–XXXXL spacing scale
├── radius.json              XXS–XXL border radius scale
├── shadows.json             Elevation shadows
└── README.md                This file
```

---

## Token tiers

### Tier 1 — Primitives (`color.primitives.json`)
Raw values. Named by position in the scale, not by intent.

- `primary` and `secondary` groups are **themed** — regenerated when a user redefines their seed colors
- All other groups (`neutral`, `system-color`, `chart-colors`, `supportive-palette`) are **fixed** — never change with theming

**Rule: never reference primitive tokens directly in component CSS unless the component has exactly one consumer.**

### Tier 2 — Semantic aliases (`color.aliases.json`)
Intent-named references that point to primitives. The alias names stay stable, but their resolved values update automatically when a user redefines their seed colors.


---

## Naming conventions

Tokens use **kebab-case** within each tier. Hierarchy is expressed with dots in JSON and slashes in Figma:

| Figma | JSON | CSS output |
|---|---|---|
| `primitives/primary/primary-0` | `primitives.primary.primary-0` | `--primitives-primary-primary-0` |
| `color/interactive-primary/default` | `color.interactive-primary.default` | `--color-interactive-primary-default` |
| `spacing/sm` | `spacing.sm` | `--spacing-sm` |
| `radius/s` | `radius.s` | `--radius-s` |

---

## Semantic color groups

| Group | Palette | Themed | Used for |
|---|---|---|---|
| `interactive-primary` | primary | ✅ | Filled buttons, primary icons, focus rings |
| `interactive-secondary` | secondary | ✅ | Bordered buttons |
| `interactive-filter` | secondary | ✅ | Filter buttons — independent identity |
| `interactive-card` | secondary | ✅ | Clickable card gesture states |
| `surface` | secondary + neutral | ✅ | Resting backgrounds, container borders |
| `structure` | neutral | ❌ | Dividers, separators, tab underlines |
| `status` | system-color | ❌ | Error, success states |
| `text` | neutral + primary | partly | Body text, labels, links |

---

## Rules

- ❌ No hex codes or pixel values directly in component CSS
- ❌ Do not hand-edit primitive color values — they are generated from seed colors
- ❌ Do not rename a token without updating all references and adding a CHANGELOG entry
- ❌ Do not delete a token — mark it deprecated first
- ✅ New tokens require a description matching the Figma variable description exactly
- ✅ New semantic aliases require a written justification of which components consume them
- ✅ All changes to this folder trigger an automatic rebuild via GitHub Actions

---

## How to add a new token

1. Confirm the value exists as a Figma variable first
2. Add it to the correct JSON file following the naming convention above
3. If it is a semantic alias — document which components will consume it
4. Run `npm run build:tokens` locally to verify no errors
5. Open a PR — do not commit directly to `main`

---

## Build

```bash
npm run build:tokens
```

Output: `build/tokens.css` — CSS custom properties ready to import in the React app.
