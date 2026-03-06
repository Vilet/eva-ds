# ListRecord — Spec

## Status
- Design: Stable
- Implementation: Ready
- Figma: https://www.figma.com/design/UuxOHrS8uSWTMv9S6zr3gV/Design-system--main-?node-id=11435-115013

---

## Description

Alternative data view style for table records displayed as a flat list. Each row has a fixed height, optional leading icon, single-line title with a milk-fade truncation overlay, a flexible metadata slot, and floating action buttons that appear on hover.

Only the **web (desktop)** resolution is in scope.

---

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `ListRecord` | default | Single list-record row |

---

## Props API

### ListRecord

```typescript
interface ListRecordProps {
  /** Full leading icon element (consumer provides 32px container + background) */
  leadingIcon?: ReactNode;
  /** Record title — single line, truncated with milk-fade overlay */
  title: string;
  /** Metadata elements — rendered as flex children after the title */
  children?: ReactNode;
  /** Floating action buttons — shown on hover, absolutely positioned */
  actions?: ReactNode;
  /** Selected / active state — adds primary border */
  selected?: boolean;
  /** Click handler for the entire row */
  onClick?: () => void;
}
```

---

## States matrix

| State | ListRecord |
|-------|:----------:|
| default | visible |
| hover | bg change + floating actions appear |
| selected | primary border |

---

## Tokens used

### Container

| Property | Token |
|----------|-------|
| Height | 48px (component-scoped) |
| Horizontal padding | `--spacing-sm` (8px) |
| Gap (icon to content) | `--spacing-l` (16px) |
| Border-radius | `--radius-l` (12px) |
| Background (default) | `--color-neutral-neutral-8-white` |
| Background (hover) | `--color-interactive-secondary-bg-hover` |
| Border (selected) | `--color-interactive-primary-border-active` |

### Leading icon slot

| Property | Token |
|----------|-------|
| Container size | 32px (component-scoped) |
| Icon size | 16x16px |

Consumer is responsible for the icon container background and border-radius.

### Title

| Property | Token |
|----------|-------|
| Font size | `--font-size-title-small` (14px) |
| Font weight | `--font-weight-medium` (500) |
| Line height | `--line-height-title-small` (20px) |
| Letter spacing | `--letter-spacing-title-small` (-0.1px) |
| Color | `--color-neutral-neutral-1` |

### Milk-fade overlay

| Property | Value |
|----------|-------|
| Method | CSS `mask-image` gradient |
| Fade width | 32px from right edge |

### Content area

| Property | Token |
|----------|-------|
| Gap | `--spacing-m` (12px) |

### Floating actions container

| Property | Token |
|----------|-------|
| Background | `--color-neutral-neutral-8-white` |
| Border-radius | `--radius-xs` (6px) |
| Shadow | `--shadow-elev-1` |
| Padding | `--spacing-xxsm` (2px) |
| Gap | `--spacing-xxsm` (2px) |
| Position | absolute, right: 8px, vertically centered |

---

## Missing tokens (flagged)

| Token needed | Figma value | Currently using |
|---|---|---|
| `--list-record-height` | 48px | component-scoped CSS var |

---

## Rules

- Row height is hard-fixed at 48px — no vertical padding drives the height
- Title occupies a single line — no wrapping. Truncation uses a milk-fade mask, not `text-overflow: ellipsis`
- Metadata items are passed as `children` and rendered as flex siblings of the title
- Number and type of metadata elements varies by context — consumer's responsibility
- Leading icon slot accepts a complete ReactNode — consumer provides background, border-radius, icon
- Floating actions are hidden by default, revealed on `:hover`
- Selected state shows a primary border, does NOT change background
- No margin on root — consumer's responsibility
- Use existing `Button` component (variant `wrapped` or `solo-floating`) for the floating action buttons

---

## Do / Don't

- Do pass `onClick` for interactive rows
- Do use `Button` wrapped/solo-floating for the floating action buttons
- Do keep metadata flexible — pass whatever ReactNodes the context needs
- Don't add margin to the ListRecord root
- Don't use `text-overflow: ellipsis` for the title — use the milk-fade mask
- Don't hard-code metadata items inside the component
