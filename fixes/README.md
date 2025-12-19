# Fix Proposals

This directory contains proposed fixes for the original SDEV PHP platform.

## File Naming Convention

```
YYYY-MM-DD-short-description.md
```

Examples:
- `2024-12-19-date-format-fix.md`
- `2024-12-19-listing-filter-bug.md`
- `2024-12-20-timezone-handling.md`

## Status Subdirectories

| Directory | Purpose |
|-----------|---------|
| `/pending/` | Proposed, awaiting review |
| `/approved/` | Passed review, ready to share |
| `/implemented/` | Confirmed implemented by original dev |
| `/rejected/` | Did not pass review or was declined |

## Workflow

1. Create fix in `/pending/YYYY-MM-DD-description.md`
2. Run `/review-code` on the code
3. If approved, move to `/approved/`
4. Share with original developer
5. Once implemented, move to `/implemented/`

## Template

Use `TEMPLATE.md` as your starting point for new fixes.
