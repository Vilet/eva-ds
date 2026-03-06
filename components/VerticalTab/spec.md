# VerticalTab — Spec

## Status
- Design: Stable
- Implementation: Ready (v4 — nav-icon hover/active rework + hasIconBoxBg 2026-03-05)
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
| 2 | Nested tab — indented to align with level-1 content (chevron box + gap) |

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
  hasIconBoxBg?:   boolean;         // nav-icon only — default true; false removes colored fill from icon box (regular section tabs vs branded product tabs)
  hasChildren?:    boolean;         // Shows expand/collapse chevron button
  onClick?:        () => void;      // Row selection callback
  onToggle?:       () => void;      // Chevron expand/collapse callback
  onActionsClick?: () => void;      // ... contextual actions callback; button hidden until hover/active
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
| open (expanded) | ✅ | -- |

No disabled or loading states — not in the Figma spec.

---

## Optional elements (all optional except label)

| Element | Prop | Behaviour |
|---------|------|-----------|
| Chevron | `hasChildren` | `<Icon>` inside the row button (no own button wrapper). Chevron-right when collapsed; chevron-down when `isOpen=true`. Clicking the row calls both `onClick` and `onToggle`. |
| Icon | `icon` | ReactNode rendered left of label. Sized via `--tab-icon-size`. |
| Count | `count` | Numeric text right of label. Hidden (opacity 0) when actions button is shown on hover. |
| Actions (...) | `onActionsClick` | `<Button variant="ghost" size="xxs">` inside `<span>`. Hidden by CSS until tab is hovered or active. `stopPropagation` prevents row selection. |

---

## Tokens used

### default variant

| Property | Token |
|----------|-------|
| Hover background | `--color-interactive-secondary-bg-active` |
| Active background | `--color-interactive-secondary-bg-active` |
| Default / hover text | `--color-neutral-neutral-2` |
| Active text (label + icons) | `--color-neutral-neutral-1` |
| Count color | `--color-neutral-neutral-3` (see missing tokens) |
| Chevron (default) | `--color-neutral-neutral-2` |
| Border radius | `--radius-xs` (all sizes — S, M, L) |
| Tab height | S: 28px, M/L: 32px (component-scoped `--tab-height`) |
| Level-2 indent | `calc(--spacing-sm + 20px + --spacing-xsm)` — aligns with level-1 content past chevron |
| Outer L/R padding | `--spacing-sm` (on `.tab` root) |
| Content row gap | `--spacing-xsm` (inside `tab__row-btn`) |
| Sibling gap (btn / count / actions) | `--spacing-sm` (gap on `.tab` root) |
| Label font size | `--font-size-tab-s/m/l` |
| Icon container | 18x18px fixed (all sizes) |
| Icon glyph size | `--icon-size-tab-m` (16px — same for all sizes) |
| Label font weight | `--font-weight-medium` |

### nav-icon variant

#### Two tab types

The nav-icon variant supports two visual types controlled by `hasIconBoxBg`:

| Type | `hasIconBoxBg` | Icon box fill | Icon glyph size | Use case |
|------|:--------------:|---------------|-----------------|----------|
| Branded | `true` (default) | `--color-interactive-secondary-bg-highlighted` | `--icon-size-tab-m` (16px) | Product module tabs (Hiring, Assessments, etc.) |
| Regular | `false` | transparent | `--icon-size-tab-l` (18px) | UI section tabs (Overview, Shared with me, Templates, etc.) |

#### Layout tokens

| Property | Token |
|----------|-------|
| Full-width h-padding | `--spacing-sm` (8px) |
| Minimized h-padding | `--spacing-l` (16px) |
| Vertical padding | `--spacing-xsm` (4px) |
| Gap (icon box -> label) | `--spacing-sm` (8px) |
| Height | 36px (hardcoded — no token yet) |
| Icon box size | 28x28px (hardcoded — no token yet) |
| Icon box radius | `--radius-m` (10px) |
| Icon glyph color | `--color-neutral-neutral-1` (always dark) |
| Label font size | `--font-size-label-med` (13px) |
| Label font weight | `--font-weight-medium` (500) |
| Label line-height | `--line-height-label-med` (20px) |
| Label letter-spacing | `--letter-spacing-label-med` (-0.15px) |

#### State colors

| State | Outer button | Inner body (`.tab__nav-body`) | Icon box (branded) | Icon box (regular) | Accent line | Label color |
|-------|-------------|-------------------------------|--------------------|--------------------|-------------|-------------|
| Default | transparent | -- | `--color-interactive-secondary-bg-highlighted` | transparent | -- | `--color-neutral-neutral-2` |
| Hover | transparent | no fill | keeps default fill | keeps transparent | 1px, `--color-interactive-secondary-border-hover` | `--color-neutral-neutral-1` |
| Active (extended) | transparent | `--color-surface-tab-active` | transparent | transparent | 1px, `--color-neutral-neutral-1` | `--color-neutral-neutral-1` |
| Active (minimized) | transparent | n/a (no body wrapper) | `--color-surface-tab-active` | `--color-surface-tab-active` | 1px, `--color-neutral-neutral-1` | n/a |

#### Accent line

- Right-side vertical line, `::after` pseudo-element on the outer button
- Width: 1px
- Height: 100% of tab height
- Position: `right: 0; top: 0`
- Hover color: `--color-interactive-secondary-border-hover`
- Active color: `--color-neutral-neutral-1` (black — overrides hover)
- Visible on both hover and active states

---

## Layout notes

### default variant
- Outer `.tab` div holds padding (`--spacing-sm`) and gap (`--spacing-sm`)
- Children in order: `tab__row-btn` (flex-1) -> `tab__count` (optional) -> `tab__actions-wrapper` (optional)
- Count and actions button are **visible simultaneously** — count does NOT hide on hover/active
- Actions button is an inline flex sibling (not absolutely positioned); hidden via `opacity: 0` until hover/active

### nav-icon variant
- **Architecture**: outer `<button>` (transparent, padding) -> inner `.tab__nav-body` (receives active bg, rounded) -> `[icon box][label]`
- **Minimized**: outer `<button>` (transparent, padding) -> icon box directly (no inner body wrapper)
- `tab__nav-icon-box`: 28x28 box; icon glyph centered inside; always `neutral-1` color
- **Full width** (`isMinimized=false`): padding 4px 8px; icon box + label visible
- **Minimized** (`isMinimized=true`): padding 4px 16px; only icon box; content centered
- **Hover**: no container fill anywhere — only the accent line appears. Icon box keeps its default fill.
- **Active extended**: inner body gets `--color-surface-tab-active` fill; icon box goes transparent (avoids double-fill)
- **Active minimized**: no inner body; icon box gets `--color-surface-tab-active` fill (both branded and regular types)

### CSS class modifiers (nav-icon)

| Class | Applied when |
|-------|-------------|
| `tab--nav-icon` | always (nav-icon variant) |
| `tab--minimized` | `isMinimized=true` |
| `tab--no-icon-bg` | `hasIconBoxBg=false` |
| `tab--active` | `isActive=true` |

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
| `--font-size-count` | 11px | `var(--tab-font-size)` (13-14px) — Figma uses `Label/Mini 11-16` for count at all sizes |
| `--color-text-count` | `#b2957a` (secondary-1) | `--color-neutral-neutral-3` — Figma count uses brown secondary palette, needs semantic alias |
| `--tab-height-nav-icon` | 36px | hardcoded `36px` in CSS |
| `--icon-box-nav-size` | 28px | hardcoded `28px` in CSS |

---

## Rules

- Native `<button>` for nav-icon variant; `<div>` root with single inner `<button>` for default variant
- Chevron is **not** a separate button — it is an `<Icon>` inside `tab__row-btn`; clicking anywhere on the row calls both `onClick` and `onToggle`
- Actions (...) uses `<Button variant="ghost" size="xxs">` inside `<span className="tab__actions-wrapper">` which is an **inline flex sibling** of `tab__row-btn`
- `onActionsClick` wrapper is rendered but CSS-hidden (opacity 0) until hover/active — never controlled by JS show/hide
- Count badge is always visible; it does **not** hide when actions button appears (both coexist per Figma)
- Fixed heights: S=28px (`--tab-height`), M=32px, L=32px — controlled via CSS custom property, not padding
- Hover color: label and leading icon -> `--color-neutral-neutral-1`
- Active color: label and leading icon -> `--color-neutral-neutral-1` (not primary color)
- Nav-icon hover: **no container fill** — only accent line appears; icon box keeps its default fill
- Nav-icon active (extended): inner body fills with `--color-surface-tab-active`; icon box goes transparent
- Nav-icon active (minimized): icon box fills with `--color-surface-tab-active` (both branded and regular types)
- Nesting beyond level 2 is not in scope; consumer handles deeper nesting by adjusting padding
- No `disabled` or `loading` states — not in the Figma spec for this component
- No margin on root element — margin is the consumer's responsibility

---

## Do / Don't

- ✅ Pass `ariaLabel` for nav-icon tabs without a visible label
- ✅ Use `onToggle` to manage `isOpen` externally
- ✅ Provide `hasChildren` even when children list is empty (shows the chevron in collapsed state)
- ✅ Toggle `isMinimized` at the sidebar level — all nav-icon tabs in the sidebar switch together
- ✅ Use `hasIconBoxBg=false` for regular UI section tabs (Overview, Templates, etc.)
- ✅ Use `hasIconBoxBg=true` (default) for branded product module tabs (Hiring, Assessments, etc.)
- ❌ Don't nest another interactive element inside the count badge
- ❌ Don't use `variant="nav-icon"` with `level` — nav-icon has no nesting concept
- ❌ Don't use `isOpen` without `hasChildren`
- ❌ Don't use `isMinimized` with `variant="default"` — has no effect and is semantically wrong
- ❌ Don't use `hasIconBoxBg` with `variant="default"` — only applies to nav-icon
