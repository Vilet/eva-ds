# MainAppbar — Spec

## Status
- Design: Stable
- Implementation: Ready
- Figma: https://www.figma.com/design/UuxOHrS8uSWTMv9S6zr3gV/Design-system--main-?node-id=4369-739806

---

## Description

Top-level application bar (breadcrumbs panel). Displays breadcrumb navigation on the left and contextual controls on the right. Content is dynamic and depends on the module/page context.

Only the **web (desktop)** resolution is in scope. Mobile variant is excluded.

---

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `MainAppbar` | default | Container — breadcrumbs left, children slot right |
| `AppbarAction` | named | Ghost S icon-only Button wrapper with optional indicator dot |
| `AppbarAvatarGroup` | named | Clickable avatar pill — NOT a button, no hover state |
| `AppbarAutomation` | named | Ghost S Button — zap icon + automation count label |

---

## Props API

### MainAppbar

```typescript
interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface MainAppbarProps {
  breadcrumbs: BreadcrumbItem[];
  children?: ReactNode;
}
```

### AppbarAction

```typescript
interface AppbarActionProps {
  icon: ReactNode;
  hasIndicator?: boolean;
  onClick?: () => void;
  ariaLabel: string;
}
```

### AppbarAvatarGroup

```typescript
interface AppbarAvatarGroupProps {
  avatars: string[];
  count: number;
  onClick?: () => void;
  ariaLabel?: string;
}
```

### AppbarAutomation

```typescript
interface AppbarAutomationProps {
  count: number;
  icon?: ReactNode;
  onClick?: () => void;
}
```

---

## States matrix

| State | MainAppbar |
|-------|:----------:|
| default | ✅ |

Sub-elements inherit states from their own components (Button hover/active/focus).

---

## Tokens used

### Container

| Property | Token |
|----------|-------|
| Background | `--color-neutral-neutral-8-white` |
| Horizontal padding | `--spacing-xxxl` (32px) |
| Vertical padding | `--spacing-sm` (8px) |
| Height | 56px (component-scoped — no token) |

### Breadcrumbs

| Property | Token |
|----------|-------|
| Gap | `--spacing-xsm` (4px) |
| Breadcrumb button | `Button variant="ghost" size="xxs"` |
| Breadcrumb color override | `--color-neutral-neutral-4` |
| Separator color | `--color-neutral-neutral-4` |
| Separator font-size | `--font-size-label-small` (12px) |

### Right controls

| Property | Token |
|----------|-------|
| Gap | `--spacing-xsm` (4px) |

### Avatar group

| Property | Token |
|----------|-------|
| Pill padding-left | `--spacing-xxsm` (2px) |
| Pill padding-right | `--spacing-sm` (8px) |
| Pill gap | `--spacing-sm` (8px) |
| Pill border-radius | `--radius-xxl` (pill shape) |
| Avatar size | 20px (component-scoped) |
| Avatar overlap | `--spacing-xsm` (4px negative margin) |
| Avatar right padding | `--spacing-xsm` (4px) |
| Count font-size | `--font-size-label-small` (12px) |
| Count line-height | `--line-height-label-small` (16px) |
| Count letter-spacing | `--letter-spacing-body-small` (-0.2px) |
| Count color | `--color-neutral-neutral-1` |

### Automation

| Property | Token |
|----------|-------|
| Padding | `--spacing-xsm` `--spacing-sm` (4px 8px) |
| Gap | `--spacing-xsm` (4px) |
| Border-radius | `--radius-xs` (6px) |
| Icon size | 20px (component-scoped) |
| Label font-size | `--font-size-label-small` (12px) |
| Label font-weight | `--font-weight-medium` (500) |
| Label line-height | `--line-height-label-small` (16px) |
| Label letter-spacing | `--letter-spacing-label-small` (-0.15px) |
| Label color | `--color-neutral-neutral-3` |

### Indicator dot

| Property | Token |
|----------|-------|
| Size | 16px (component-scoped) |
| Position | absolute, top: -4px, right: -4px |
| Dot color | `--primitives-system-color-red-scale-1` |

---

## Missing tokens (flagged)

| Token needed | Figma value | Currently using |
|---|---|---|
| `--appbar-height` | 56px | component-scoped CSS var |
| `--color-indicator-dot` | notification red | `--primitives-system-color-red-scale-1` (primitive — needs semantic alias) |
| `--avatar-size-xs` | 20px | component-scoped CSS var |

---

## Rules

- Breadcrumbs use `Button variant="ghost" size="xxs"` — color overridden to `neutral-4`
- Action buttons use `Button variant="ghost" size="s"` icon-only
- Avatar group uses native `<button>` for accessibility but is visually NOT styled as a button — no hover background
- Automation uses `Button variant="ghost" size="s"` with icon + label — only rendered when automations exist
- Profile avatar uses `Button variant="ghost" size="s"` with circular `<img>` as icon
- No margin on root — consumer's responsibility
- Indicator dot uses the `indicator-dot` Icon positioned absolutely over the action button

---

## Do / Don't

- ✅ Pass `ariaLabel` for every `AppbarAction`
- ✅ Conditionally render `AppbarAutomation` only when automations exist
- ✅ Conditionally render `AppbarAvatarGroup` only when relevant
- ❌ Don't add margin to the MainAppbar root
- ❌ Don't add hover state to the avatar group
