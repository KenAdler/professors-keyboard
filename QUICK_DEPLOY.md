# Quick Deploy Guide

## 🚀 Fastest Way to Deploy (2 options)

### Option 1: One-Click Deploy via Netlify UI (Recommended for first time)

1. Go to: https://app.netlify.com/start/deploy?repository=https://github.com/KenAdler/professors-keyboard
2. Click "Connect to GitHub" and authorize
3. Click "Deploy site"
4. Done! Your site is live in ~2 minutes

**After this, set up automatic deployments:**

1. Get your Netlify Access Token: https://app.netlify.com/user/applications
2. Get your Site ID: Site settings → General → Site details
3. Add GitHub secrets: https://github.com/KenAdler/professors-keyboard/settings/secrets/actions
   - `NETLIFY_AUTH_TOKEN`: Your access token
   - `NETLIFY_SITE_ID`: Your site ID

### Option 2: Use the API Script (Fully automated)

```bash
# 1. Get your Netlify token from: https://app.netlify.com/user/applications
export NETLIFY_AUTH_TOKEN="your-token-here"

# 2. Run the deployment script
cd /Users/kenadler/professors-keyboard
./deploy-netlify-api.sh
```

The script will:
- Build your project
- Create a Netlify site (if needed)
- Deploy it
- Give you the live URL
- Show you how to set up GitHub Actions for auto-deploy

## 🔄 Automatic Deployments (After initial setup)

Once you've added the GitHub secrets (`NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`), every push to `main` will automatically deploy via GitHub Actions!

## 📝 What You Need

- **Netlify Account**: Free at https://netlify.com
- **Netlify Access Token**: Get from https://app.netlify.com/user/applications
- **Site ID**: Get from your site's settings (or let the script create it)

## ✅ Verification

After deployment, you can:
- Visit your live site URL
- Check deployments at: https://app.netlify.com/sites/professors-keyboard/deploys
- View GitHub Actions at: https://github.com/KenAdler/professors-keyboard/actions

