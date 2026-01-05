# Fix Deployment - Site Not Found Error

## Problem
The Netlify site was created but hasn't been built/deployed yet, so you're seeing a "Site not found" error.

## Solution: Enable Continuous Deployment from GitHub

The easiest fix is to connect your GitHub repository to Netlify so it builds automatically.

### Quick Fix (2 minutes):

1. **Go to Netlify Dashboard:**
   https://app.netlify.com/projects/professors-keyboard

2. **Click "Site settings" → "Build & deploy"**

3. **Under "Continuous Deployment", click "Link to Git provider"**
   - Select "GitHub"
   - Authorize Netlify to access your GitHub account
   - Select repository: `KenAdler/professors-keyboard`
   - Branch: `main`

4. **Configure Build Settings:**
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Base directory: (leave empty)

5. **Click "Deploy site"**

6. **Wait 2-3 minutes** for the build to complete

7. **Your site will be live!** 🎉

### Alternative: Manual Deploy via API

If you have Node.js installed locally:

```bash
cd /Users/kenadler/professors-keyboard
npm install
npm run build
export NETLIFY_AUTH_TOKEN="nfp_qZuPN5zAfmK5MDb9PRMT13ZLVaHPxp8P60e9"
./deploy-netlify-api.sh
```

### Check Build Status

After setting up, check your deployments at:
https://app.netlify.com/projects/professors-keyboard/deploys

## Why This Happened

The site was created via API, but no files were deployed. Netlify needs either:
1. Files uploaded directly (via API or drag-and-drop)
2. Continuous deployment from GitHub (recommended)

Setting up continuous deployment is the best solution as it will automatically rebuild on every push!

