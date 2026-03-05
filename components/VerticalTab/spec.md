# VerticalTab — Spec

## Status
- Design: Stable
- Implementation: Ready (v3 — Figma variable audit 2026-03-05)
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
  isMinimized?:    boolean;         // nav-icon only — icon box only, no label; use when sidebar is collapsed
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

### default variant

| Property | Token |
|----------|-------|
| Hover background | `--color-interactive-secondary-bg-active` |
| Active background | `--color-interactive-secondary-bg-active` |
| Default / hover text | `--color-neutral-neutral-2` |
| Active text (label + icons) | `--color-neutral-neutral-1` |
| Count color | `--color-neutral-neutral-3` (⚠ see missing tokens) |
| Chevron (default) | `--color-neutral-neutral-2` |
| Border radius | `--radius-xs` (all sizes — S, M, L) |
| Tab height | S: 28px, M/L: 32px (component-scoped `--tab-height`) |
| Level-2 indent (total) | `--spacing-xl` (20px from outer edge) |
| Outer L/R padding | `--spacing-sm` (on `.tab` root) |
| Content row gap | `--spacing-xsm` (inside `tab__row-btn`) |
| Sibling gap (btn / count / actions) | `--spacing-sm` (gap on `.tab` root) |
| Label font size | `--font-size-tab-s/m/l` |
| Icon container | 18×18px fixed (all sizes) |
| Icon glyph size | `--icon-size-tab-m` (16px — same for all sizes) |
| Label font weight | `--font-weight-medium` |

### nav-icon variant

| Property | Token |
|----------|-------|
| Full-width h-padding | `--spacing-sm` (8px) |
| Minimized h-padding | `--spacing-l` (16px) |
| Vertical padding | `--spacing-xsm` (4px) |
| Gap (icon box → label) | `--spacing-sm` (8px) |
| Height | 36px (⚠ hardcoded — no token yet) |
| Icon box size | 28×28px (⚠ hardcoded — no token yet) |
| Icon box radius | `--radius-m` (10px) |
| Icon box background | `--color-interactive-secondary-bg-highlighted` |
| Icon glyph color | `--color-neutral-neutral-1` (always dark) |
| Icon glyph size | 20px (⚠ hardcoded — no token yet) |
| Label font size | `--font-size-label-med` (13px) |
| Label font weight | `--font-weight-medium` (500) |
| Label line-height | `--line-height-label-med` (20px) |
| Label letter-spacing | `--letter-spacing-label-med` (-0.15px) |
| Label color (default/hover) | `--color-neutral-neutral-3` / `--color-neutral-neutral-2` |
| Label color (active) | `--color-neutral-neutral-1` |
| Hover background | `--color-interactive-secondary-bg-hover` |
| Active background | `--color-surface-tab-active` |
| Active accent line color | `--color-interactive-primary-default` |
| Active accent line width | 2px (⚠ hardcoded — no border token yet) |
| Border radius | `--radius-xs` |

---

## Layout notes

### default variant
- Outer `.tab` div holds padding (`--spacing-sm`) and gap (`--spacing-sm`)
- Children in order: `tab__row-btn` (flex-1) → `tab__count` (optional) → `tab__actions-wrapper` (optional)
- Count and actions button are **visible simultaneously** — count does NOT hide on hover/active
- Actions button is an inline flex sibling (not absolutely positioned); hidden via `opacity: 0` until hover/active

### nav-icon variant
- **Row layout**: `[tab__nav-icon-box]` → `[tab__label]` (label omitted when `isMinimized`)
- `tab__nav-icon-box`: 28×28 colored bg box; icon glyph centered inside; always `neutral-1` color
- **Full width** (`isMinimized=false`): padding 4px 8px; icon box + label visible
- **Minimized** (`isMinimized=true`): padding 4px 16px; only icon box; content centered
- Active state shows a right-side accent line (2px, primary color, 60% height, centered vertically)

---

## Missing tokens (flagged — do not implement without explicit approval)

Approved and implemented:

| Token | Value |
|-------|-------|
| `--font-size-tab-s` | 13px |
| `--font-size-tab-m` | 13px |
| `--font-size-tab-l` | 14px |
| `--font-weight-semibold` | 600 |
| `--font-weight-medium` | 500 |
| `--icon-size-tab-s` | 14px |
| `--icon-size-tab-m` | 16px |
| `--icon-size-tab-l` | 18px |

Still missing (not approved — do not hardcode):

| Token needed | Figma value | Currently using |
|---|---|---|
| `--font-size-count` | 11px | `var(--tab-font-size)` (13–14px) — Figma uses `Label/Mini 11-16` for count at all sizes |
| `--color-text-count` | `#b2957a` (secondary-1) | `--color-neutral-neutral-3` — Figma count uses brown secondary palette, needs semantic alias |
| `--tab-height-nav-icon` | 36px | hardcoded `36px` in CSS |
| `--icon-box-nav-size` | 28px | hardcoded `28px` in CSS |
| `--icon-size-nav-icon` | 20px | hardcoded `20px` in CSS |

---

## Rules

- Native `<button>` for nav-icon variant; `<div>` root with single inner `<button>` for default variant
- Chevron is **not** a separate button — it is an `<Icon>` inside `tab__row-btn`; clicking anywhere on the row calls both `onClick` and `onToggle`
- Actions (···) uses `<Button variant="ghost" size="xxs">` inside `<span className="tab__actions-wrapper">` which is an **inline flex sibling** of `tab__row-btn`
- `onActionsClick` wrapper is rendered but CSS-hidden (opacity 0) until hover/active — never controlled by JS show/hide
- Count badge is always visible; it does **not** hide when actions button appears (both coexist per Figma)
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
- ✅ Toggle `isMinimized` at the sidebar level — all nav-icon tabs in the sidebar switch together
- ❌ Don't nest another interactive element inside the count badge
- ❌ Don't use `variant="nav-icon"` with `level` — nav-icon has no nesting concept
- ❌ Don't use `isOpen` without `hasChildren`
- ❌ Don't use `isMinimized` with `variant="default"` — has no effect and is semantically wrong
