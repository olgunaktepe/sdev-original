# Review Code for Original Platform Compliance

You are reviewing code to ensure it matches the original SDEV PHP platform coding style.

**Code to review:** $ARGUMENTS

---

## Review Instructions

1. Read the code carefully
2. Check EVERY rule in the checklist
3. Be STRICT - the original developer does not tolerate AI bloat
4. REJECT if any rules are violated

---

## Quick Rejection Checklist

Scan for these instant-rejection patterns:

### PHP Syntax (REJECT if found)
- [ ] `function name(Type $param)` - type hints
- [ ] `function name(): Type` - return types
- [ ] `namespace` declarations
- [ ] `use` statements
- [ ] `interface` or `abstract class`
- [ ] `??=` or `?->` operators
- [ ] `fn() =>` arrow functions
- [ ] `match()` expressions
- [ ] `#[Attribute]` syntax

### Code Style (REJECT if found)
- [ ] Multi-line `if` blocks for simple checks
- [ ] Multi-line `while` loops for simple fetches
- [ ] Spaces inside parentheses `if ( $x )`
- [ ] `try { } catch { }` blocks
- [ ] `throw new Exception()`

### Over-Engineering (REJECT if found)
- [ ] Creating new classes
- [ ] Factory or repository patterns
- [ ] Dependency injection
- [ ] More than 3 new functions
- [ ] PHPDoc comment blocks
- [ ] Excessive inline comments

---

## Expected Patterns

The code SHOULD use:

```php
// Error handling
if(!$id)err("Not found");

// Loops
while($r = mysql_fetch_assoc($q))$items[] = (object)$r;

// WHERE clauses
$wheresql[] = "field='{$val}'";

// Defaults
$limit = ($limit)?$limit:100;

// Responses
json(['items'=>$items]);
sql("INSERT INTO...");
```

---

## Output Your Review

If ANY violation is found, output:

```
## REJECTED

**Violations:**

1. **Line X:** [description]
   - Found: `[code]`
   - Should be: `[code]`

**Fix these issues and resubmit.**
```

If ALL checks pass, output:

```
## APPROVED

Code follows original platform style.

- [x] No modern PHP features
- [x] Compact syntax used
- [x] Minimal complexity
- [x] Uses existing helpers

Ready for original developer review.
```
