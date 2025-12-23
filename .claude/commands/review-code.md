# Review Code for Original Platform Compliance

**Code to review:** $ARGUMENTS

## Agent Execution

You MUST use the Task tool to spawn an agent for this review. This ensures consistent, thorough enforcement of coding standards.

```
Task tool parameters:
- subagent_type: "general-purpose"
- description: "Review SDEV code compliance"
- prompt: <see below>
```

## Agent Prompt

Use this exact prompt for the agent:

---

**Task:** Review PHP code for SDEV platform style compliance.

**Code to review:** $ARGUMENTS

**Working directory:** /Users/olgunaktepe/Desktop/sdev-original

## Review Checklist

### INSTANT REJECTION (if ANY found):

**Modern PHP Syntax:**
- [ ] `function name(Type $param)` - type hints
- [ ] `function name(): Type` - return types
- [ ] `namespace` declarations
- [ ] `use` statements for imports
- [ ] `interface` or `abstract class`
- [ ] `??=` or `?->` operators
- [ ] `fn() =>` arrow functions
- [ ] `match()` expressions
- [ ] `#[Attribute]` syntax

**Verbose Code Style:**
- [ ] Multi-line `if` blocks for simple checks
- [ ] Multi-line `while` loops for simple fetches
- [ ] Spaces inside parentheses `if ( $x )`
- [ ] `try { } catch { }` blocks
- [ ] `throw new Exception()`

**Over-Engineering:**
- [ ] Creating new classes unnecessarily
- [ ] Factory or repository patterns
- [ ] Dependency injection
- [ ] More than 3 new functions for a simple fix
- [ ] PHPDoc comment blocks
- [ ] Excessive inline comments

### EXPECTED PATTERNS (should use):

```php
if(!$id)err("Not found");
while($r = mysql_fetch_assoc($q))$items[] = (object)$r;
$wheresql[] = "field='{$val}'";
$limit = ($limit)?$limit:100;
json(['items'=>$items]);
```

## Output Format

**If ANY violation found:**

```
## REJECTED

**Violations:**

1. **Line X:** [description]
   - Found: `[code]`
   - Should be: `[code]`

2. **Line Y:** [description]
   - Found: `[code]`
   - Should be: `[code]`

**Fix these issues and run `/review-code` again.**
```

**If ALL checks pass:**

```
## APPROVED

Code follows original platform style.

- [x] No modern PHP features
- [x] Compact syntax used
- [x] Minimal complexity
- [x] Uses existing helpers

Ready for `/document-fix` to create PR.
```

---

## After Agent Completes

- If REJECTED: Fix the violations and run `/review-code` again
- If APPROVED: Proceed to `/document-fix` to create the PR
