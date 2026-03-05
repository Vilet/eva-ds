# VerticalTab — Spec

## Status
- Design: Stable
- Implementation: Ready (v2 — corrections applied)
- Figma: https://www.figma.com/design/UuxOHrS8uSWTMv9S6zr3gV/Design-system--main-?node-id=11336-279180&t=NAXc4m1wygp0uEnj-4

---

## Variants & sizes

| Variant | Sizes | Primary use |
|---------|-------|-------------|
| default | S, M, L | Tree-style navigation tab — sidebar file trees, pipeline stages, org structures |
| nav-icon | S, M, L | Main sidebar icon tab — top-level navigation with prominent icon and optional label |

### Nesting levels (default variant only)

| Level | Description |
|-------|-------------|
| 1 | Top-level tab — no left indent |
| 2 | Nested tab — indented `--spacing-xl` from level 1 |

---

## Props API

```typescript
export type TabSize    = 's' | 'm' | 'l';
export type TabLevel   = 1 | 2;
export type TabVariant = 'default' | 'nav-icon';

export interface TabProps {
  label:           string;          // Required — the visible tab label
  icon?:           ReactNode;       // Optional — folder/file icon (left of label)
  count?:          number;          // Optional — numeric badge (right of label)
  size:            TabSize;
  level?:          TabLevel;        // default: 1 (default variant only)
  variant?:        TabVariant;      // default: 'default'
  isActive?:       boolean;         // Selected/active state
  isOpen?:         boolean;         // Expanded (children visible) — requires hasChildren
  hasChildren?:    boolean;         // Shows expand/collapse chevron button
  onClick?:        () => void;      // Row selection callback
  onToggle?:       () => void;      // Chevron expand/collapse callback
  onActionsClick?: () => void;      // ··· contextual actions callback; button hidden until hover/active
  ariaLabel?:      string;          // Override accessible label (useful for nav-icon without visible text)
}
```

---

## States matrix

| State | default | nav-icon |
|-------|:-------:|:--------:|
| default (enabled) | ✅ | ✅ |
| hover | ✅ | ✅ |
| active (selected) | ✅ | ✅ |
| open (expanded) | ✅ | ❌ |

No disabled or loading states — not in the Figma spec.

---

## Optional elements (all optional except label)

| Element | Prop | Behaviour |
|---------|------|-----------|
| Chevron | `hasChildren` | `<Icon>` inside the row button (no own button wrapper). Chevron-right when collapsed; chevron-down when `isOpen=true`. Clicking the row calls both `onClick` and `onToggle`. |
| Icon | `icon` | ReactNode rendered left of label. Sized via `--tab-icon-size`. |
| Count | `count` | Numeric text right of label. Hidden (opacity 0) when actions button is shown on hover. |
| Actions (···) | `onActionsClick` | `<Button variant="ghost" size="xxs">` inside an absolutely-positioned `<span>`. Hidden by CSS until tab is hovered or active. `stopPropagation` prevents row selection. |

---

## Tokens used

| Property | Token |
|----------|-------|
| Hover background | `--color-interactive-secondary-bg-hover` |
| Active background | `--color-surface-tab-active` |
| Nav-icon active accent line | `--color-interactive-primary-default` |
| Default / hover text | `--color-neutral-neutral-2` |
| Active text (label + icons) | `--color-neutral-neutral-1` |
| Count / muted icon | `--color-neutral-neutral-3` |
| Chevron (default) | `--color-neutral-neutral-4` |
| Border radius | `--radius-xxs` (S), `--radius-xs` (M, L) |
| Tab height | S: 28px, M/L: 32px (component-scoped `--tab-height`) |
| Level-2 indent | `--spacing-xl` |
| Row L/R padding | `--spacing-sm` (all sizes) |
| Row gap | `--spacing-xsm` |
| Label font size | `--font-size-tab-s/m/l` |
| Icon size | `--icon-size-tab-s/m/l` |
| Active bold weight | `--font-weight-semibold` |
| Nav-icon accent line width | `2px` (component-scoped placeholder — no border token yet) |

---

## Missing tokens (flagged — do not implement without explicit approval)

All previously-flagged tokens have been approved and implemented in `tokens/typography.json`
and `tokens/icon.json`. They are available as CSS custom properties in `build/tokens.css`.

| Token | Value |
|-------|-------|
| `--font-size-tab-s` | 12px |
| `--font-size-tab-m` | 13px |
| `--font-size-tab-l` | 14px |
| `--font-weight-semibold` | 600 |
| `--icon-size-tab-s` | 14px |
| `--icon-size-tab-m` | 16px |
| `--icon-size-tab-l` | 18px |

Still missing (not approved):
- `--icon-size-nav-s/m/l` — nav-icon variant icon sizes (using inline placeholder px values)

---

## Rules

- Native `<button>` for nav-icon variant; `<div>` root with single inner `<button>` for default variant
- Chevron is **not** a separate button — it is an `<Icon>` inside `tab__row-btn`; clicking anywhere on the row calls both `onClick` and `onToggle`
- Actions (···) uses `<Button variant="ghost" size="xxs">` inside an absolutely-positioned `<span className="tab__actions-wrapper">`
- `onActionsClick` wrapper is rendered but CSS-hidden (opacity 0) until hover/active — never controlled by JS show/hide
- Fixed heights: S=28px (`--tab-height`), M=32px, L=32px — controlled via CSS custom property, not padding
- Hover color: label and leading icon → `--color-neutral-neutral-2`
- Active color: label and leading icon → `--color-neutral-neutral-1` (not primary color)
- Nesting beyond level 2 is not in scope; consumer handles deeper nesting by adjusting padding
- No `disabled` or `loading` states — not in the Figma spec for this component
- No margin on root element — margin is the consumer's responsibility

---

## Do / Don't

- ✅ Pass `ariaLabel` for nav-icon tabs without a visible label
- ✅ Use `onToggle` to manage `isOpen` externally
- ✅ Provide `hasChildren` even when children list is empty (shows the chevron in collapsed state)
- ❌ Don't nest another interactive element inside the count badge
- ❌ Don't use `variant="nav-icon"` with `level` — nav-icon has no nesting concept
- ❌ Don't use `isOpen` without `hasChildren`
