# Setup Instructions

## Creating the GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner and select "New repository"
3. Name the repository: `professors-keyboard` (or `Professor's-Keyboard`)
4. Make it **public** (required for free deployment)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Connecting Your Local Repository to GitHub

After creating the repository on GitHub, run these commands:

```bash
cd /Users/kenadler/professors-keyboard

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/professors-keyboard.git

# Rename branch to main if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

## Deploying to the Internet

### Option 1: Deploy with Vercel (Recommended - Easiest)

1. Go to [Vercel](https://vercel.com) and sign up/login with your GitHub account
2. Click "Add New Project"
3. Import your `professors-keyboard` repository
4. Vercel will auto-detect Vite settings
5. Click "Deploy"
6. Your app will be live in minutes at a URL like: `https://professors-keyboard.vercel.app`

### Option 2: Deploy with Netlify

1. Go to [Netlify](https://netlify.com) and sign up/login with your GitHub account
2. Click "Add new site" → "Import an existing project"
3. Select your `professors-keyboard` repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"
6. Your app will be live at a URL like: `https://professors-keyboard.netlify.app`

### Option 3: Deploy with GitHub Pages

1. After pushing to GitHub, go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. Create a workflow file (see `.github/workflows/deploy.yml` if provided)
5. Your app will be live at: `https://YOUR_USERNAME.github.io/professors-keyboard`

## Local Development

To run the app locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

