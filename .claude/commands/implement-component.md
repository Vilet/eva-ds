# Command: Implement Component

## When to use
When a component spec.md exists and is marked Status: Ready for implementation.

## Steps

1. Read `design-system/CONTRACT.md`
2. Read `tokens/README.md`
3. Read `components/[ComponentName]/spec.md` fully before writing any code
4. Check `build/tokens.css` to confirm every token referenced in the spec exists
   — if any token is missing, stop and report which ones are missing
5. Implement `[ComponentName].tsx` following the spec exactly:
   - Props API must match spec exactly — no additions, no omissions
   - All states in the states matrix must be implemented
   - No hardcoded values anywhere
6. Implement `[ComponentName].stories.tsx`:
   - One story per state in the states matrix
   - One story per variant × size combination
   - One RTL story if spec marks RTL as required
7. Implement `[ComponentName].test.tsx`:
   - Test all props render correctly
   - Test keyboard navigation
   - Test accessibility with axe
8. Add component to the DS Playground:
   - Add a new entry to the sidebar navigation config object in `src/`
   - Create a new playground page for this component
   - The page must show a full states matrix:
     all variants × all sizes × all states from the spec
   - Do not hardcode the navigation — only update the config object
9. Self-check before finishing:
   - Paste the spec.md implementation checklist
   - Mark each item ✅ or ❌ with a note
   - If any item is ❌ fix it before reporting done
   - State explicitly: "I have checked every CSS value against
     build/tokens.css. No hardcoded values exist."

## Output
- `components/[ComponentName]/[ComponentName].tsx`
- `components/[ComponentName]/[ComponentName].stories.tsx`
- `components/[ComponentName]/[ComponentName].test.tsx`
- `src/playground/pages/[ComponentName]Page.tsx` (playground page)
- Updated sidebar navigation config
- Self-check checklist with all items marked