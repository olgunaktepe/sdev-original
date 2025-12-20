# Deploy Fix - Push to Railway Test Server

Deploy approved fixes to the Railway test environment.

**Action:** $ARGUMENTS

## Prerequisites

- Railway CLI installed: `npm install -g @railway/cli`
- Railway project linked: `railway link`
- GitHub CLI installed: `gh`

## Instructions

### If PR number provided:
Merge the PR and deploy to Railway.

### If no argument:
Deploy current main branch to Railway.

### If "status":
Check current Railway deployment status.

## Workflow

### Step 1: Check Railway Connection

```bash
railway status
```

If not linked, prompt user to run:
```bash
cd /Users/olgunaktepe/Desktop/sdev-original
railway login
railway link
```

### Step 2: Handle PR (if provided)

```bash
# Check PR status
gh pr view <PR-number> --json state,mergeable,title

# If mergeable, merge it
gh pr merge <PR-number> --squash --delete-branch

# Pull latest
git checkout main
git pull origin main
```

### Step 3: Deploy to Railway

```bash
railway up --detach
```

Or for a specific service:
```bash
railway up --service sdev-original-test
```

### Step 4: Monitor Deployment

```bash
# Check deployment status
railway status

# View logs (optional)
railway logs --tail 50
```

### Step 5: Get Deployment URL

```bash
railway domain
```

### Step 6: Verify Deployment

Test the deployed URL:
- Check `/site/login` loads
- Verify no PHP errors in logs

## Output

Return:
- Deployment status (success/failure)
- Railway deployment URL
- Any errors encountered

## Commands

| Command | Action |
|---------|--------|
| `/deploy-fix` | Deploy current main branch |
| `/deploy-fix 5` | Merge PR #5 and deploy |
| `/deploy-fix status` | Check deployment status |
| `/deploy-fix logs` | View recent deployment logs |
| `/deploy-fix rollback` | Rollback to previous deployment |

## Example

```
/deploy-fix 5

Output:
✅ PR #5 merged: Fix: Date format issue
✅ Deploying to Railway...
✅ Build completed in 45s
✅ Health check passed
✅ Deployment URL: https://sdev-original-test.up.railway.app

Test: https://sdev-original-test.up.railway.app/site/login
```

## Rollback

If deployment fails:
```bash
railway rollback
```

## Environment Variables

Railway auto-sets these from the MySQL service:
- `MYSQLHOST`
- `MYSQLPORT`
- `MYSQLUSER`
- `MYSQLPASSWORD`
- `MYSQLDATABASE`
- `RAILWAY_PUBLIC_DOMAIN`
