# Link GitHub Repository to Netlify - Step by Step

## The Problem
The error "Failed during stage 'preparing repo'" means Netlify can't access your GitHub repository. We need to link them.

## Solution: Link GitHub to Netlify

### Step 1: Go to Your Site Settings
1. Go to: https://app.netlify.com/projects/professors-keyboard
2. Click **"Site configuration"** (or "Site settings") in the left sidebar
3. Click **"Build & deploy"** in the submenu

### Step 2: Link to GitHub
1. Scroll down to **"Continuous Deployment"** section
2. You should see a button that says:
   - **"Link to Git provider"** OR
   - **"Connect to Git provider"** OR  
   - **"Set up continuous deployment"**

3. Click that button
4. Select **"GitHub"** as your Git provider
5. If prompted, authorize Netlify to access your GitHub account
6. You may need to install the Netlify app on your GitHub account (click "Install" if prompted)

### Step 3: Select Your Repository
1. After authorization, you'll see a list of your repositories
2. Find and select: **"professors-keyboard"**
3. Click **"Next"** or **"Save"**

### Step 4: Configure Build Settings
Netlify should auto-detect from `netlify.toml`, but verify:
- **Branch to deploy:** `main`
- **Build command:** `npm ci && npm run build` (should auto-fill)
- **Publish directory:** `dist` (should auto-fill)
- **Base directory:** (leave empty)

### Step 5: Deploy
1. Click **"Deploy site"** or **"Save"**
2. Netlify will start building immediately
3. Wait 2-3 minutes for the build to complete

### Step 6: Verify
- Check the deploy status in the "Deploys" tab
- Once successful, your site will be live at: https://professors-keyboard.netlify.app

## Alternative: If You Don't See "Link to Git Provider"

If the button isn't visible, try:

1. Go to: https://app.netlify.com/account/applications
2. Check if Netlify is authorized to access GitHub
3. If not, click "New access token" or "Connect to GitHub"
4. Then go back to your site settings and try again

## Still Having Issues?

If you still can't find the option:
1. Go to: https://app.netlify.com/sites/professors-keyboard/deploys
2. Click **"Trigger deploy"** → **"Deploy site"**
3. This might prompt you to link the repository

Or try the direct link:
https://app.netlify.com/start/deploy?repository=https://github.com/KenAdler/professors-keyboard

This will create a new site linked to your repo, but you can delete the old one and use this new one instead.

