# Fix Template

Copy this template when creating new fix proposals.

---

## Fix: [Short Descriptive Title]

**Date:** YYYY-MM-DD

**Status:** Proposed | Reviewing | Implemented | Rejected

**File(s):** `/path/to/file.php`

---

### Problem

[One or two sentences describing what is broken or needs improvement]

### Root Cause

[Brief explanation of why this happens]

### Solution

[One sentence describing the approach]

---

### Code Changes

**File:** `/path/to/file.php`

**Lines:** X-Y

```php
// BEFORE
$existingCode = 'current implementation';

// AFTER
$fixedCode = 'new implementation';
```

---

### Testing

1. Navigate to [page/feature]
2. Perform [action]
3. Verify [expected result]

---

### Notes

- [Any important considerations]
- [Edge cases to be aware of]
- [Related areas that might be affected]

---

### Reviewer Notes

_To be filled by original developer during review_

- [ ] Code style matches existing patterns
- [ ] Fix is minimal and focused
- [ ] No unnecessary changes
- [ ] Tested and working
