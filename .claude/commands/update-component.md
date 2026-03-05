# Command: Update Component

## When to use
When a component exists in code and the spec.md has changed,
or when a Figma update requires code changes.

## Steps

1. Read the current `spec.md` and identify exactly what changed
2. Read the current component implementation
3. Run the QA check (see qa-check.md command) before making any changes
   to establish a baseline of what currently passes and fails
4. Make only the changes described in the spec update — nothing else
5. Update `spec.md` if the implementation required any clarification
6. Update `tokens/CHANGELOG.md` if any token values changed
7. Run self-check checklist from spec.md

## Hard rule
Do not refactor code that is not related to the change.
Do not fix things that were not broken.