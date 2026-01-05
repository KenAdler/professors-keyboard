# Fresh Start - Complete Setup Guide

## Step 1: Delete Old Netlify Site (if exists)

1. Go to: https://app.netlify.com/sites
2. Find "professors-keyboard" site
3. Click on it → "Site settings" → Scroll to bottom → "General" → "Delete site"
4. Confirm deletion

## Step 2: Create New Site from GitHub

**Use this direct link:**
https://app.netlify.com/start/deploy?repository=https://github.com/KenAdler/professors-keyboard

### Detailed Steps:

1. **Click the link above** (or go to Netlify → "Add new site" → "Import an existing project")

2. **Connect to GitHub:**
   - Click "Connect to GitHub"
   - If you see "Install Netlify", click it
   - **IMPORTANT:** When asked which repositories to grant access to:
     - Select **"All repositories"** (recommended)
     - OR select **"Only select repositories"** and choose `professors-keyboard`
   - Click "Install" or "Authorize"

3. **Select Repository:**
   - After authorization, you'll see a list of repositories
   - Find and click on **"professors-keyboard"**
   - Click "Next"

4. **Configure Build Settings:**
   - Netlify should auto-detect from `netlify.toml`, but verify:
   - **Branch to deploy:** `main`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** (leave empty)

5. **Deploy:**
   - Click **"Deploy site"**
   - Wait 2-3 minutes for the build

6. **Verify:**
   - Check the "Deploys" tab - you should see "Building" then "Published"
   - Your site will be live at the URL shown (e.g., `https://professors-keyboard-xxxxx.netlify.app`)

## Step 3: Verify Everything Works

After deployment succeeds:
- Visit your live site URL
- Test the piano keyboard
- Test clicking on the staff
- Everything should work!

## Troubleshooting

### If you still get "preparing repo" error:

1. **Check GitHub App Installation:**
   - Go to: https://github.com/settings/installations
   - Find "Netlify"
   - Click "Configure"
   - Make sure `professors-keyboard` is in the repository list
   - If not, add it and save

2. **Try Manual Link:**
   - After creating the site, go to Site settings → "Build & deploy"
   - Under "Continuous Deployment", click "Link to Git provider"
   - Select GitHub and your repository

### If build fails:

- Check the build logs in the "Deploys" tab
- Make sure `package.json` has the build script (it does: `"build": "vite build"`)
- Make sure `netlify.toml` is correct (it is)

## Current Configuration

✅ **netlify.toml** - Configured correctly
✅ **package.json** - Has build script
✅ **vite.config.js** - Fixed (removed problematic base path)
✅ **.nvmrc** - Node 18 specified
✅ **All files committed to GitHub**

Everything is ready! Just follow Step 2 above.

