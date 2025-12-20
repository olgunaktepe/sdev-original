# Document Fix - Create GitHub Pull Request

Create a GitHub Pull Request for an approved fix, ready to share with the original developer.

**Fix to document:** $ARGUMENTS

## Instructions

1. Locate the approved fix file in `/fixes/approved/`
2. Parse the fix content to extract file paths and code changes
3. Create a new Git branch for the fix
4. Apply the code changes from the fix file
5. Commit with a descriptive message
6. Push and create a Pull Request
7. Move the fix file to `/fixes/implemented/`

## Workflow

### Step 1: Find the Fix

Search for the fix file in `/fixes/approved/` matching the argument.
If no argument provided, list all available approved fixes.

### Step 2: Parse Fix Content

Extract from the fix file:
- **File(s)** to modify
- **Lines** to change
- **BEFORE** code block
- **AFTER** code block
- **Testing** instructions

### Step 3: Create Branch

```bash
git checkout main
git pull origin main
git checkout -b fix/YYYY-MM-DD-description
```

Use the fix filename (without .md) as the branch description.

### Step 4: Apply Changes

Use the Edit tool to apply the AFTER code from the fix file.
Match the exact lines specified in the fix.

### Step 5: Commit

```bash
git add <modified-files>
git commit -m "$(cat <<'EOF'
Fix: <title from fix file>

<Problem description from fix file>

Solution: <solution description from fix file>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

### Step 6: Push and Create PR

```bash
git push -u origin fix/YYYY-MM-DD-description

gh pr create --title "Fix: <title>" --body "$(cat <<'EOF'
## Summary

<Problem and solution from fix file>

## Changes

- **File:** `<path/to/file.php>`
- **Lines:** X-Y

## Code Change

```php
// BEFORE
<old code>

// AFTER
<new code>
```

## Testing

<Testing instructions from fix file>

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

### Step 7: Update Fix Status

```bash
git checkout main
git mv fixes/approved/<fix-file>.md fixes/implemented/<fix-file>.md
git commit -m "Move to implemented: <fix-file>"
git push
```

## Output

Return:
- Branch name
- PR URL
- PR number
- Files modified
- Next step: Use `/deploy-fix <PR-number>` to deploy to Railway

## Example

```
/document-fix 2024-12-19-date-format-fix

Output:
✅ Branch: fix/2024-12-19-date-format-fix
✅ PR: https://github.com/olgunaktepe/sdev-original/pull/5
✅ Files: src/php/lib/deal.lib.php
✅ Status: Ready for review

Next: /deploy-fix 5
```
