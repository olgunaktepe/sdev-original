# Document Fix - Create GitHub Pull Request

Create a GitHub Pull Request for an approved fix, ready to share with the original developer.

**Fix to document:** $ARGUMENTS

## Workflow Order

**Important:** We deploy and verify BEFORE creating a PR. No point sharing a broken fix.

1. Apply code changes to main
2. Commit to main
3. Deploy to Railway test server
4. Verify fix works in browser
5. Only then create PR for original developer

## Instructions

### Step 1: Parse Fix Content

Extract from the fix proposal:
- **File(s)** to modify
- **Lines** to change
- **BEFORE** code block
- **AFTER** code block
- **Testing** instructions

### Step 2: Apply Changes

Use the Edit tool to apply the AFTER code.
Match the exact lines specified in the fix.

### Step 3: Commit to Main

```bash
git add <modified-files>
git commit -m "$(cat <<'EOF'
Fix: <title from fix>

<Problem description>

Solution: <solution description>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
git push origin main
```

### Step 4: Deploy to Railway

```bash
railway up --detach
```

Wait for deployment to complete (~60 seconds).

### Step 5: Verify Fix Works

1. Navigate to the affected page in browser
2. Test the fix according to testing instructions
3. Use Chrome DevTools to verify CSS/JS changes if needed
4. **If fix doesn't work:** Debug, fix, recommit, redeploy
5. **If fix works:** Proceed to create PR

### Step 6: Create PR for Original Developer

Only after verification succeeds:

```bash
git checkout -b fix/YYYY-MM-DD-description
git push -u origin fix/YYYY-MM-DD-description

gh pr create --title "Fix: <title>" --body "$(cat <<'EOF'
## Summary

<Problem and solution description>

## File to Modify

`<path/to/file.php>`

## Code Changes

<Detailed code changes with BEFORE/AFTER blocks>

## Testing

<Testing instructions>

## Verified

✅ Tested on Railway: <URL>

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

### Step 7: Return to Main

```bash
git checkout main
```

## Output

Return:
- Deployment URL
- Verification status
- PR URL (only if verified)
- PR number
- Files modified

## Example

```
/document-fix sticky-columns

Output:
✅ Committed: Fix sticky columns in listingsDev
✅ Deployed: https://sdev-original-production.up.railway.app
✅ Verified: Sticky columns working in browser
✅ PR: https://github.com/olgunaktepe/sdev-original/pull/1
✅ Files: src/template/listingsDev/index.phtml

Share PR link with original developer.
```
