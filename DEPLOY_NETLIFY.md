# Deploy to Netlify - Quick Guide

Your code is already on GitHub at: **https://github.com/KenAdler/professors-keyboard**

## Deploy Steps (Takes 2 minutes):

1. **Go to Netlify**: https://app.netlify.com
   - Sign up or log in (you can use "Sign in with GitHub" for easiest setup)

2. **Add New Site**:
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account if prompted

3. **Select Repository**:
   - Search for and select `professors-keyboard`
   - Click "Configure and deploy"

4. **Build Settings** (should auto-detect from netlify.toml):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

5. **Wait for Deployment**:
   - Netlify will install dependencies and build your app
   - Takes about 1-2 minutes
   - You'll see a success message with your live URL!

6. **Your App is Live!**:
   - You'll get a URL like: `https://professors-keyboard-xxxxx.netlify.app`
   - You can customize the domain name in Site settings → Domain management

## Auto-Deployments

Netlify will automatically deploy whenever you push to the `main` branch on GitHub!

## Need Help?

- Netlify Dashboard: https://app.netlify.com
- Your repository: https://github.com/KenAdler/professors-keyboard

