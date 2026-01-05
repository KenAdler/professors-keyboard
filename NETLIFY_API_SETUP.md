# Netlify API Integration Setup

This guide explains how to set up automatic deployment to Netlify using the API.

## Quick Start

### Option 1: Direct API Deployment (One-time setup)

1. **Get your Netlify Access Token:**
   - Go to: https://app.netlify.com/user/applications
   - Click "New access token"
   - Name it (e.g., "API Deployment")
   - Copy the token

2. **Run the deployment script:**
   ```bash
   export NETLIFY_AUTH_TOKEN="your-token-here"
   ./deploy-netlify-api.sh
   ```

   Or run interactively:
   ```bash
   ./deploy-netlify-api.sh
   # Enter your token when prompted
   ```

### Option 2: GitHub Actions (Automatic on every push)

1. **Get your Netlify Access Token** (same as above)

2. **Create a Netlify Site** (if you haven't already):
   - Option A: Use the script above (it will create one)
   - Option B: Go to https://app.netlify.com and create manually
   - Get the Site ID from Site settings → General → Site details

3. **Add GitHub Secrets:**
   - Go to: https://github.com/KenAdler/professors-keyboard/settings/secrets/actions
   - Click "New repository secret"
   - Add `NETLIFY_AUTH_TOKEN` with your token
   - Add `NETLIFY_SITE_ID` with your site ID

4. **That's it!** Every push to `main` will automatically deploy.

## How It Works

### GitHub Actions Workflow

The `.github/workflows/netlify-deploy.yml` file:
- Triggers on every push to `main`
- Builds your app
- Deploys to Netlify using the Netlify CLI action

### Direct API Script

The `deploy-netlify-api.sh` script:
- Builds your project (if needed)
- Creates a Netlify site (if it doesn't exist)
- Packages and deploys your `dist` folder
- Provides the live URL

## Troubleshooting

### "curl not found"
Install curl:
```bash
# macOS
brew install curl

# Linux
sudo apt-get install curl
```

### "npm not found"
Install Node.js from https://nodejs.org

### "Deployment failed"
- Check your Netlify token is valid
- Ensure the token has deploy permissions
- Check Netlify dashboard for error details

### GitHub Actions not deploying
- Verify secrets are set correctly
- Check Actions tab for error logs
- Ensure workflow file is in `.github/workflows/`

## Manual API Calls

If you prefer to use the API directly:

```bash
# Create site
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"professors-keyboard"}' \
  https://api.netlify.com/api/v1/sites

# Deploy (after building)
cd dist
zip -r ../deploy.zip .
cd ..

curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary "@deploy.zip" \
  https://api.netlify.com/api/v1/sites/YOUR_SITE_ID/deploys
```

## Next Steps

After setup, your site will be automatically deployed on every push to GitHub!

