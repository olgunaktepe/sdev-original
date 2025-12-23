# Propose a Fix for the Original Platform

**Issue:** $ARGUMENTS

## Agent Execution

You MUST use the Task tool to spawn an agent for this work. This saves context and ensures consistent enforcement of coding standards.

```
Task tool parameters:
- subagent_type: "general-purpose"
- description: "Propose fix for SDEV"
- prompt: <see below>
```

## Agent Prompt

Use this exact prompt for the agent:

---

**Task:** Propose a minimal fix for the SDEV PHP platform.

**Issue to fix:** $ARGUMENTS

**Working directory:** /Users/olgunaktepe/Desktop/sdev-original

## Instructions

1. Read CLAUDE.md to understand the coding style requirements
2. Investigate the issue - find the relevant file(s)
3. Understand the root cause
4. Write the SMALLEST possible fix in the original developer's style

## Code Style Rules (MUST FOLLOW)

- Single-line conditionals: `if(!$x)err("msg");`
- Compact loops: `while($r = mysql_fetch_assoc($q))$items[] = (object)$r;`
- No type hints, return types, or namespaces
- No try-catch blocks
- No PHPDoc comments
- Use helpers: `err()`, `json()`, `sql()`, `pick()`

## Output Format

Return this exact structure:

```markdown
## Fix: [Short Title]

**File:** `/path/to/file.php`

**Problem:** [One sentence]

**Root Cause:** [One sentence]

**Solution:** [One sentence]

### Code Changes

**Lines X-Y:**
```php
// BEFORE
[exact current code]

// AFTER
[fixed code]
```

### Testing

1. [Step to verify]
2. [Expected result]

### Review Status

[ ] Ready for `/review-code`
```

---

## After Agent Completes

1. Review the agent's output
2. Run `/review-code` on the proposed code
3. If rejected, fix violations and re-review
4. Only share with original developer after APPROVED
