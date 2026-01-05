# Fix "Failed during stage 'preparing repo'" Error

This error means Netlify can't access your GitHub repository. Here's how to fix it:

## Solution: Complete GitHub Connection Setup

### Step 1: Check Netlify GitHub App Installation

1. Go to: https://github.com/settings/installations
2. Look for **"Netlify"** in the list
3. If you DON'T see Netlify:
   - Go to: https://app.netlify.com/account/applications
   - Click **"New access token"** or look for **"Connect to GitHub"**
   - Authorize Netlify to access your GitHub account
   - Make sure to grant access to the `professors-keyboard` repository

### Step 2: Delete Old Site and Start Fresh (Recommended)

Since the connection isn't working, let's start fresh:

1. **Delete the current site:**
   - Go to: https://app.netlify.com/projects/professors-keyboard
   - Click **"Site settings"** → Scroll to bottom → **"General"** → **"Delete site"**
   - Confirm deletion

2. **Create new site with proper connection:**
   - Go to: https://app.netlify.com/start/deploy?repository=https://github.com/KenAdler/professors-keyboard
   - Click **"Connect to GitHub"**
   - If prompted, install the Netlify app on your GitHub account
   - **IMPORTANT:** Make sure to select **"All repositories"** or at least grant access to `professors-keyboard`
   - After authorization, you'll be redirected back
   - Click **"Deploy site"**

### Step 3: Verify Repository Access

After deploying, verify:
1. Go to your new site's settings
2. Click **"Build & deploy"**
3. Under **"Continuous Deployment"**, you should see:
   - Repository: `KenAdler/professors-keyboard`
   - Branch: `main`
   - If you see this, the connection is working!

### Step 4: If Still Not Working

If you still get the error, try this:

1. **Manually link repository:**
   - Go to site settings → **"Build & deploy"**
   - Under **"Continuous Deployment"**, click **"Link to Git provider"**
   - Select **"GitHub"**
   - Choose repository: `professors-keyboard`
   - Branch: `main`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Click **"Save"**

2. **Check repository permissions:**
   - Go to: https://github.com/settings/installations
   - Click on **"Netlify"**
   - Make sure `professors-keyboard` repository is in the list
   - If not, click **"Configure"** and add it

## Alternative: Manual Deploy via API

If GitHub connection continues to fail, we can deploy manually:

1. Build locally (if you have Node.js):
   ```bash
   npm install
   npm run build
   ```

2. Then use the deploy script:
   ```bash
   export NETLIFY_AUTH_TOKEN="nfp_qZuPN5zAfmK5MDb9PRMT13ZLVaHPxp8P60e9"
   ./deploy-netlify-api.sh
   ```

But continuous deployment from GitHub is much better for automatic updates!

## Quick Checklist

- [ ] Netlify app is installed on GitHub (https://github.com/settings/installations)
- [ ] Netlify has access to `professors-keyboard` repository
- [ ] Site is linked to GitHub repository in Netlify settings
- [ ] Build settings are configured (command: `npm install && npm run build`, publish: `dist`)

Once all these are checked, the build should work!

