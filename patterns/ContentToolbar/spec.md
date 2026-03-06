# Content Toolbar — Spec

## Status
- Design: Stable
- Implementation: Ready
- Figma: https://www.figma.com/design/UuxOHrS8uSWTMv9S6zr3gV/Design-system--main-?node-id=11437-74577

---

## Description

The toolbar appears on almost every page, located right below the page title
and above the page content (data table or other display style).
The number of controls on the right side varies depending on the context.

This is a **compositional pattern** — it provides layout only and uses
existing components (Button, Icon) for all interactive elements.

---

## Variants

| Variant | Left slot | Right slot |
|---------|-----------|------------|
| With table record counter | Text label ("Showing N records") | Ghost XS action buttons |
| With dropdown context | Ghost S button with trailing chevron icon | Ghost XS action buttons |

---

## Props API

```typescript
export interface ContentToolbarProps {
  left?: React.ReactNode;
  children?: React.ReactNode;
}
```

- `left` — contextual element for the left side (counter text, dropdown button, etc.)
- `children` — action buttons for the right side

---

## Layout

- Flex row, `space-between`, vertically centered
- Vertical padding: `--spacing-xsm`
- Right actions gap: 2px (matches Figma `gap-[2px]`)
- No background, no border — sits directly in the page flow

---

## Components used

- `Button` variant=`ghost` size=`xs` — toolbar action buttons (Search, Sort, Filter, etc.)
- `Button` variant=`ghost` size=`xs` with `iconRight` — dropdown context switcher
- `Button` variant=`ghost` size=`xs` icon-only — more options (...)
- `Icon` — icons inside buttons

---

## Tokens used

| Property | Token |
|----------|-------|
| Vertical padding | `--spacing-xsm` |

All other styling comes from the composed Button and Icon components.

---

## Rules

- No custom styles on child buttons — use existing Button variants as-is
- Left slot is optional — toolbar can have actions only
- Right slot is flexible — consumer decides which buttons to show
- Pattern provides layout only; all interactivity is delegated to child components
