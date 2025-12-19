# SDEV Original Platform - Fix Proposals

This repository contains proposed fixes for the original SDEV PHP platform. All code follows the exact coding style and patterns used by the original developer.

## Purpose

- Suggest small, focused bug fixes
- Propose minor improvements
- Share code changes that can be reviewed and implemented by the original developer

## How to Use

### 1. Propose a Fix

Use Claude Code with the `/propose-fix` command:

```
/propose-fix The listings page shows wrong date format for timestamps older than 30 days
```

### 2. Review the Code

**All code must pass review before sharing.** Use the `/review-code` command:

```
/review-code [paste your code here]
```

The reviewer will:
- Check for forbidden patterns (type hints, namespaces, verbose syntax)
- Verify correct style (single-line conditionals, compact loops)
- Reject code that's too complex or over-engineered
- Approve only code that matches the original developer's style

### 3. Fix Violations

If code is rejected:
1. Read the violation list
2. Fix each issue
3. Re-run `/review-code`
4. Repeat until approved

### 4. Share with Developer

Only **APPROVED** fixes should be shared with the original developer.

All proposed fixes are stored in the `/fixes` directory with a standardized format.

## Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Main agent instructions |
| `STYLE_GUIDE.md` | Detailed coding patterns with examples |
| `RULES.md` | Strict rejection rules checklist |
| `/fixes/` | Directory of proposed fixes |
| `/.claude/commands/propose-fix.md` | Fix proposal command |
| `/.claude/commands/review-code.md` | Code review command |
| `/.claude/agents/code-reviewer.md` | Reviewer agent config |

## Coding Style

All code in this repository must follow the original platform's style:

- **No type hints** - `function get()` not `function get(): array`
- **Single-line conditionals** - `if(!$x)err("msg");`
- **camelCase functions** - `getItems()`, `saveFilter()`
- **Array WHERE pattern** - `$wheresql[] = "condition";`
- **Direct SQL** - String interpolation, not prepared statements
- **Minimal comments** - Code should be self-explanatory
- **No abstractions** - No interfaces, base classes, or dependency injection

See `STYLE_GUIDE.md` for comprehensive examples.

## Important Notes

- This repo does NOT contain sensitive project data
- This repo is NOT connected to the new Next.js platform
- Fixes should be minimal and focused
- Always test proposed fixes before submitting
