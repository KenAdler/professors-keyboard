# Deploy to Vercel - Simple Guide

Vercel is much easier than Netlify! Here's how to deploy:

## 🚀 One-Click Deploy

**Click this link to deploy:**
https://vercel.com/new/clone?repository-url=https://github.com/KenAdler/professors-keyboard

## Step-by-Step Instructions

### Option 1: Deploy via Vercel Website (Recommended)

1. **Go to Vercel:**
   https://vercel.com/new

2. **Sign in with GitHub:**
   - Click "Continue with GitHub"
   - Authorize Vercel to access your GitHub account

3. **Import Repository:**
   - Click "Import Git Repository"
   - Find and select `KenAdler/professors-keyboard`
   - Click "Import"

4. **Configure Project:**
   - Vercel will auto-detect it's a Vite project
   - **Framework Preset:** Vite (should auto-detect)
   - **Build Command:** `npm run build` (should auto-fill)
   - **Output Directory:** `dist` (should auto-fill)
   - **Install Command:** `npm install` (should auto-fill)
   - Everything should be pre-filled correctly!

5. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site will be live!

6. **Get Your URL:**
   - After deployment, you'll see your live URL
   - It will be something like: `https://professors-keyboard.vercel.app`
   - Or a custom one like: `https://professors-keyboard-xxxxx.vercel.app`

### Option 2: Use Vercel CLI (If you have Node.js)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /Users/kenadler/professors-keyboard
vercel

# Follow the prompts
# - Link to existing project or create new
# - Deploy to production
```

## ✅ What Happens After Deployment

- **Automatic Deployments:** Every push to `main` branch auto-deploys
- **Preview Deployments:** Every pull request gets a preview URL
- **Fast CDN:** Your site is served from a global CDN
- **HTTPS:** Automatically enabled

## 🎯 Your Live URL

After deployment, Vercel will give you:
- **Production URL:** `https://professors-keyboard.vercel.app` (or similar)
- **Custom Domain:** You can add one in project settings

## 🔄 Automatic Deployments

Once set up:
- Push to GitHub → Auto-deploys to Vercel
- No manual steps needed!
- Check deployments at: https://vercel.com/dashboard

## Why Vercel is Better

✅ Easier GitHub integration  
✅ Better auto-detection of frameworks  
✅ Faster builds  
✅ Better developer experience  
✅ Free tier is very generous  

## Need Help?

If you run into any issues:
1. Check the deployment logs in Vercel dashboard
2. Make sure GitHub repository is public (or grant Vercel access)
3. Verify build settings match `vercel.json`

Let's deploy to Vercel - it should be much smoother! 🚀

