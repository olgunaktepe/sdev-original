# Test Fix - Apply and Commit Changes

**Fix to test:** $ARGUMENTS

## Agent Execution

You MUST use the Task tool to spawn an agent for this work.

```
Task tool parameters:
- subagent_type: "general-purpose"
- description: "Apply fix to test repo"
- prompt: <see below>
```

## Agent Prompt

Use this exact prompt for the agent:

---

**Task:** Apply a fix and commit to the test repository.

**Fix to apply:** $ARGUMENTS

## Environment

| Item | Value |
|------|-------|
| Working directory | `/Users/olgunaktepe/Desktop/sdev-original` |
| Test repo | `olgunaktepe/sdev-original` |
| Test repo account | `olgunaktepe` |
| Prod repo | `gontham/sdev` (DO NOT TOUCH) |

## SAFETY RULES

**NEVER:**
- Push to `gontham/sdev`
- Add `gontham/sdev` as a remote
- Use `GONTHAM_GITHUB_TOKEN` (that's only for `/submit-fix`)

**ALWAYS:**
- Verify remote is `origin` → `olgunaktepe/sdev-original`
- Only push to `olgunaktepe/sdev-original`

## Workflow

### Step 1: Verify Safe Repository

```bash
git remote -v
```

Confirm output shows:
```
origin  https://github.com/olgunaktepe/sdev-original (fetch)
origin  https://github.com/olgunaktepe/sdev-original (push)
```

**STOP if you see `gontham/sdev` as a push remote.**

### Step 2: Parse the Fix

From the conversation, extract:
- File(s) to modify
- BEFORE code block
- AFTER code block

### Step 3: Apply Code Changes

Use the Edit tool to apply the AFTER code.

### Step 4: Commit to Test Repo

```bash
git add <modified-files>
git commit -m "$(cat <<'EOF'
Fix: <title>

<Problem description>

Solution: <solution description>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
git push origin main
```

## Output Format

**If successful:**
```
✅ Repository: olgunaktepe/sdev-original (verified safe)
✅ Applied: <file(s) modified>
✅ Committed: <commit hash> - <message>
✅ Pushed: origin/main

Next step: Run `/deploy-fix` to deploy and verify on Railway.
```

**If failed:**
```
❌ Error: <description>

Suggested fix: <what to do>
```

---

## After Agent Completes

Run `/deploy-fix` to deploy to Railway and verify the fix works.
