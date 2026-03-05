# Elevatus Design System — Claude Instructions

This is the Elevatus design system repository. It contains design tokens,
component specifications, and React component implementations.

Before doing anything, read these files in this order:
1. `design-system/CONTRACT.md` — the law. What must match between Figma and code.
2. `tokens/README.md` — token taxonomy and naming rules.
3. The relevant `components/[Name]/spec.md` — the spec for the component you are working on.

---

## Project stack
- React + TypeScript
- Vite
- CSS custom properties for tokens (no Tailwind, no CSS-in-JS)
- Style Dictionary for token build pipeline

## Folder structure
```
tokens/                  Design tokens — source of truth
design-system/           Architecture docs and contracts
components/              React component implementations
  └── [ComponentName]/
      ├── [Name].tsx
      ├── [Name].stories.tsx
      ├── [Name].test.tsx
      └── spec.md
patterns/                Complex product-specific components
scripts/                 Automation scripts
build/                   Generated token output — never hand-edit
.claude/                 Claude Code configuration
```

## Token usage rule
Components use CSS custom properties from `build/tokens.css` only.

✅ correct
```css
background: var(--color-interactive-primary-default);
border-radius: var(--radius-s);
padding: var(--spacing-sm);
```

❌ never
```css
background: #1b15cf;
border-radius: 8px;
padding: 8px;
```

## When unsure
Stop and ask. Never invent tokens, props, or variants not in the spec.