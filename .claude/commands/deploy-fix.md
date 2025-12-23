# Deploy Fix - Deploy to Railway and Verify

**Action:** $ARGUMENTS

## Agent Execution

You MUST use the Task tool to spawn an agent for deployment.

```
Task tool parameters:
- subagent_type: "general-purpose"
- description: "Deploy and verify on Railway"
- prompt: <see below>
```

## Agent Prompt

Use this exact prompt for the agent:

---

**Task:** Deploy SDEV platform to Railway and verify the fix works.

**Action:** $ARGUMENTS

## Environment

| Item | Value |
|------|-------|
| Working directory | `/Users/olgunaktepe/Desktop/sdev-original` |
| Test repo | `olgunaktepe/sdev-original` |
| Test URL | `https://sdev-original-test.up.railway.app` |
| Prod repo | `gontham/sdev` (DO NOT TOUCH) |

## Command Interpretation

| Argument | Action |
|----------|--------|
| (empty) | Deploy current main and verify |
| `status` | Check deployment status |
| `logs` | View recent logs |
| `verify` | Just verify (no deploy) |

## Workflow

### For Default (Deploy and Verify):

#### Step 1: Deploy to Railway

```bash
git checkout main
git pull origin main
railway up --detach
```

Wait ~60 seconds for deployment.

#### Step 2: Check Deployment Status

```bash
railway status
railway domain
```

#### Step 3: Verify Fix in Browser

1. Use Chrome DevTools MCP to navigate to: `https://sdev-original-test.up.railway.app`
2. Navigate to the affected page
3. Take a snapshot to verify the fix
4. Check console for errors (use `list_console_messages`)
5. Document what was tested and the result

### For Status:

```bash
railway status
railway domain
```

### For Logs:

```bash
railway logs --tail 100
```

### For Verify Only:

Skip deployment, go directly to Step 3 (browser verification).

## Output Format

**If deployment and verification successful:**
```
✅ Deployed: https://sdev-original-test.up.railway.app
✅ Status: Healthy
✅ Verified: <what was tested>
✅ Result: <working/not working>

Next step: Run `/submit-fix` to create PR to prod.
```

**If verification failed:**
```
❌ Deployed: https://sdev-original-test.up.railway.app
❌ Verification Failed: <what went wrong>
❌ Console errors: <if any>

Debug the issue, run `/test-fix` again, then `/deploy-fix` again.
```

**If deployment failed:**
```
❌ Deployment Failed: <error>
❌ Logs: <relevant error logs>

Suggested fix: <what to do>
```

---

## After Agent Completes

- If verified working: Run `/submit-fix` to create PR to `gontham/sdev`
- If failed: Debug, run `/test-fix` with fixes, then `/deploy-fix` again
