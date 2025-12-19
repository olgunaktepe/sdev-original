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

### 2. Review Fix Proposals

All proposed fixes are stored in the `/fixes` directory with a standardized format that includes:

- Problem description
- Root cause analysis
- Code changes (before/after)
- Testing steps

### 3. Implement

The original developer can review proposals and implement them directly into the live platform.

## Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Agent instructions for code style |
| `STYLE_GUIDE.md` | Detailed coding patterns with examples |
| `/fixes/` | Directory of proposed fixes |
| `/.claude/commands/` | Custom slash commands |

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
