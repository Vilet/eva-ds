# Button — Spec

## Status
- Design: Stable
- Implementation: Ready
- Figma: https://www.figma.com/design/UuxOHrS8uSWTMv9S6zr3gV/Design-system--main-?node-id=11325-12987&t=NAXc4m1wygp0uEnj-4

---

## Variants & sizes

| Variant | Sizes available | Primary use |
|---------|----------------|-------------|
| primary | M, S | Filled button — primary action, used in modals and page titles. Rarely used at M size. |
| secondary | M, S, XS | Bordered button — secondary action in modals and other places |
| ghost | M, S, XS, XXS | No fill/border — toolbars, undertable actions, breadcrumbs (XXS only) |
| solo-floating | S, XS | Elevated icon-only button — appears on card hover above the card |
| wrapped | S, XS, XXS | Icon-only button intended for use inside a `ButtonBar` container pattern |

---

## Props API

```typescript
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'solo-floating' | 'wrapped';
export type ButtonSize = 'm' | 's' | 'xs' | 'xxs';

export interface ButtonProps {
  variant:    ButtonVariant;
  size:       ButtonSize;
  label?:     string;
  iconLeft?:  React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?:  boolean;
  loading?:   boolean;
  onClick?:   React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;   // Required when label is absent (icon-only)
  type?:      'button' | 'submit' | 'reset';
}
```

---

## States matrix

| State | primary | secondary | ghost | solo-floating | wrapped |
|-------|:-------:|:---------:|:-----:|:-------------:|:-------:|
| default | ✅ | ✅ | ✅ | ✅ | ✅ |
| hover | ✅ | ✅ | ✅ | ✅ | ✅ |
| active | ✅ | ✅ | ✅ | ✅ | ✅ |
| disabled | ✅ | ✅ | ✅ | ❌ | ❌ |
| loading | ✅ | ✅ | ✅ | ❌ | ❌ |
| focus-visible | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Tokens used

| Property | Token |
|----------|-------|
| primary bg | `--color-interactive-primary-default` |
| primary bg hover | `--color-interactive-primary-hover` |
| primary bg active | `--color-interactive-primary-hover` ⚠️ see missing tokens |
| primary bg disabled | `--color-interactive-primary-disabled` |
| primary text | `--color-neutral-neutral-8-white` |
| secondary/ghost bg hover | `--color-interactive-secondary-bg-hover` |
| secondary/ghost bg active | `--color-interactive-secondary-bg-active` |
| secondary border | `--color-interactive-secondary-border-default` |
| secondary border hover | `--color-interactive-secondary-border-hover` |
| secondary border active | `--color-interactive-secondary-border-active` |
| secondary/ghost text | `--color-neutral-neutral-1` |
| disabled text | `--color-neutral-neutral-4` |
| disabled border | `--color-neutral-neutral-5` |
| solo-floating bg | `--color-surface-card-bg` |
| solo-floating shadow | `--shadow-elev-1` |
| solo-floating shadow hover | `--shadow-elev-2` |
| focus ring | `--shadow-elev-blue` |
| border-radius (M) | `--radius-s` |
| border-radius (S) | `--radius-xs` |
| border-radius (XS, XXS) | `--radius-xxs` |
| padding-y M / padding-x M | `--spacing-sm` / `--spacing-m` |
| padding-y S / padding-x S | `--spacing-xsm` / `--spacing-sm` |
| padding-y XS / padding-x XS | `--spacing-xxsm` / `--spacing-xsm` |
| padding XXS | `--spacing-xxsm` (all sides) |
| icon/label gap | `--spacing-xsm` |

---

## Missing tokens (flagged — do not implement without explicit approval)

| Missing token | Used for | Current fallback |
|---------------|----------|-----------------|
| `--color-interactive-primary-active` | Primary active-state background | `--color-interactive-primary-hover` |
| `--font-size-button-m` | Label font size for M size | Component-scoped CSS var (0.875rem) |
| `--font-size-button-s` | Label font size for S/XS/XXS | Component-scoped CSS var (0.8125rem / 0.75rem) |
| `--font-weight-medium` | Label font weight | Component-scoped CSS var (500) |
| `--line-height-button` | Label line height | Component-scoped CSS var (1.25) |

---

## Rules

- Native `<button>` element always — never `div+role`
- `type="button"` by default
- Icon-only buttons (no `label`) **must** receive `ariaLabel` prop — enforced by documentation, not TypeScript
- No margin on root element — margin is the consumer's responsibility
- Loading state: spinner replaces `iconLeft`, label stays visible, button is non-interactive, `aria-busy="true"`
- `solo-floating` and `wrapped` do not support `disabled` or `loading`
- `wrapped` buttons must be used inside a `ButtonBar` container (separate pattern, not in scope here)

---

## Do / Don't

- ✅ One primary button per view maximum
- ✅ Use `ghost` / `XXS` for breadcrumbs only
- ✅ Pass `ariaLabel` for every icon-only button
- ❌ Don't use `primary` at `xs` or `xxs` size
- ❌ Don't use `disabled` or `loading` on `solo-floating` or `wrapped`
- ❌ Don't add margin to the Button root — use layout wrappers instead
