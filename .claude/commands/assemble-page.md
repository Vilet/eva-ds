# Command: Assemble Page

## When to use
When a Figma page design exists and all required components are already 
implemented in components/ or patterns/.

## Before starting
1. Read `design-system/CONTRACT.md`
2. Read `tokens/README.md`
3. Read `CLAUDE.md`
4. Identify every component visible in the Figma design
5. Confirm each component exists in components/ or patterns/
   — if any is missing, stop and report which ones before writing any code

## Steps

1. Read the Figma design context from the provided link
2. Map every visible UI element to its existing component
3. Build the page layout using only existing components — never create 
   new ones inline
4. Use only CSS custom properties for layout spacing, never hardcoded values
5. Wire up the navigation config — add this page to nav.config.tsx
6. Add a playground route for this page

## Rules
- Never implement a new component inside a page file
- Never hardcode layout values — use spacing tokens only
- Page files live in src/pages/
- Page CSS files live alongside the page file
- If a component is missing — stop and report, do not improvise

## Output
- `src/pages/[PageName]/[PageName].tsx`
- `src/pages/[PageName]/[PageName].css`
- Updated `nav.config.tsx`
- List of every component used and where it maps from
```