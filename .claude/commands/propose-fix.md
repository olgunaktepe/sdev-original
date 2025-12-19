# Propose a Fix for the Original Platform

Analyze the issue described and propose a minimal fix that matches the original developer's coding style.

**Issue:** $ARGUMENTS

## Instructions

1. First, understand the issue completely
2. Identify the file(s) that need to be changed
3. Propose the SMALLEST possible change that solves the problem
4. Write the fix in the exact style used in STYLE_GUIDE.md

## Output Format

Create the fix proposal in this exact format:

```markdown
## Fix: [Short Title]

**File:** `/path/to/file.php`

**Problem:** [One sentence describing what's broken]

**Root Cause:** [One sentence explaining why it's broken]

**Solution:** [One sentence describing the fix approach]

### Code Changes

**Lines X-Y:**
```php
// BEFORE
[exact current code]

// AFTER
[your fixed code]
```

### Testing

1. [Step to verify the fix]
2. [Expected result]

### Notes

[Any important considerations for the original developer]
```

## Style Reminders

- No type hints or return types
- Single-line conditionals: `if(!$x)err("msg");`
- Use `pick($a, $b)` for defaults
- Use `$wheresql[]` pattern for queries
- Keep it SIMPLE - no over-engineering
