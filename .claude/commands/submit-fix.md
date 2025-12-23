# Submit Fix - Create PR to Production

**Fix to submit:** $ARGUMENTS

## Agent Execution

You MUST use the Task tool to spawn an agent for this work.

```
Task tool parameters:
- subagent_type: "general-purpose"
- description: "Submit PR to prod"
- prompt: <see below>
```

## Agent Prompt

Use this exact prompt for the agent:

---

**Task:** Create a Pull Request from the test repo to the production repo for the original developer to review.

**Fix to submit:** $ARGUMENTS

## Environment

| Item | Value |
|------|-------|
| Working directory | `/Users/olgunaktepe/Desktop/sdev-original` |
| Test repo | `olgunaktepe/sdev-original` |
| Test URL | `https://sdev-original-test.up.railway.app` |
| **Prod repo** | `gontham/sdev` |
| **Prod account** | `GilesStevens` (collaborator) |
| **Token env var** | `GONTHAM_GITHUB_TOKEN` (in `.env` file) |

## CRITICAL SAFETY RULES

**This is a READ-ONLY interaction with `gontham/sdev`.**

**NEVER:**
- `git push` to `gontham/sdev`
- `git remote add` for `gontham/sdev`
- Any command that writes directly to `gontham/sdev`
- `gh repo sync` or similar sync commands

**ONLY ALLOWED:**
- `gh pr create --repo gontham/sdev` (creates PR via API, doesn't push)
- `gh pr view --repo gontham/sdev` (read-only)
- `gh pr list --repo gontham/sdev` (read-only)

## Prerequisites Check

### Step 1: Load Environment Token

```bash
source /Users/olgunaktepe/Desktop/sdev-original/.env
echo "Token loaded: ${GONTHAM_GITHUB_TOKEN:0:10}..."
```

If token is empty, STOP and tell user to check `.env` file.

### Step 2: Verify Test Was Completed

Check recent commits to confirm the fix was applied and tested:

```bash
git log --oneline -5
```

Look for the fix commit. If not found, tell user to run `/test-fix` first.

### Step 3: Verify Railway Deployment

```bash
railway status
```

Confirm deployment is healthy.

## Workflow

### Step 4: Create Feature Branch

```bash
# Ensure we're on main and up to date
git checkout main
git pull origin main

# Create branch with date prefix
BRANCH_NAME="fix/$(date +%Y-%m-%d)-<short-description>"
git checkout -b $BRANCH_NAME

# Push to YOUR repo only (olgunaktepe/sdev-original)
git push -u origin $BRANCH_NAME
```

### Step 5: Create PR to Production Repo

**IMPORTANT:** Use the `GONTHAM_GITHUB_TOKEN` to authenticate as `GilesStevens`:

```bash
source /Users/olgunaktepe/Desktop/sdev-original/.env

GH_TOKEN=$GONTHAM_GITHUB_TOKEN gh pr create \
  --repo gontham/sdev \
  --head olgunaktepe:$BRANCH_NAME \
  --base main \
  --title "Fix: <title>" \
  --body "$(cat <<'EOF'
## Summary

<One paragraph explaining the problem and solution>

## Changes

**File:** `<path/to/file.php>`

```php
// BEFORE
<old code>

// AFTER
<new code>
```

## Testing

Tested and verified on staging environment:
- URL: https://sdev-original-test.up.railway.app
- Steps: <what was tested>
- Result: ✅ Working

## Notes for Review

<Any context the original developer should know>

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Submitted by: GilesStevens (on behalf of olgunaktepe)
EOF
)"
```

### Step 6: Return to Main Branch

```bash
git checkout main
```

### Step 7: Get PR URL

```bash
source /Users/olgunaktepe/Desktop/sdev-original/.env
GH_TOKEN=$GONTHAM_GITHUB_TOKEN gh pr list --repo gontham/sdev --head olgunaktepe:$BRANCH_NAME --json url -q '.[0].url'
```

## Output Format

**If successful:**
```
✅ Token: GilesStevens account loaded
✅ Branch: fix/YYYY-MM-DD-description
✅ Pushed to: olgunaktepe/sdev-original
✅ PR Created: <PR URL to gontham/sdev>
✅ PR Number: #<number>

Share this PR URL with the original developer:
<PR URL>

The original developer (gontham) can review and merge when ready.
```

**If failed:**
```
❌ Error: <description>

Possible issues:
- Token not found in .env file
- Token expired or invalid
- Repos may not share git history
- Branch already exists

Suggested fix: <what to do>
```

---

## After Agent Completes

The agent will return the PR URL. This PR is now pending review by the original developer at `gontham/sdev`.

**You cannot merge this PR** - only the original developer (gontham) can.

## Troubleshooting

### "Token invalid" error
Regenerate token at: GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)

### "No common commits" error
The repos may have diverged. May need to sync histories first.

### "Permission denied" error
Verify GilesStevens still has collaborator access to gontham/sdev.
