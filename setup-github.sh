#!/bin/bash

# Script to help set up GitHub repository for The Professor's Keyboard

echo "🎹 The Professor's Keyboard - GitHub Setup"
echo "=========================================="
echo ""
echo "This script will help you connect your local repository to GitHub."
echo ""
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
  echo "❌ GitHub username is required. Exiting."
  exit 1
fi

REPO_NAME="professors-keyboard"
REMOTE_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo ""
echo "📋 Next steps:"
echo "1. Go to https://github.com/new"
echo "2. Repository name: ${REPO_NAME}"
echo "3. Make it PUBLIC (required for free hosting)"
echo "4. DO NOT initialize with README, .gitignore, or license"
echo "5. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repository on GitHub..."

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
  echo "⚠️  Remote 'origin' already exists. Updating..."
  git remote set-url origin "$REMOTE_URL"
else
  echo "➕ Adding remote 'origin'..."
  git remote add origin "$REMOTE_URL"
fi

# Ensure we're on main branch
git branch -M main

echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Success! Your code is now on GitHub!"
  echo ""
  echo "📦 Repository URL: ${REMOTE_URL}"
  echo ""
  echo "🌐 Next: Deploy to the internet!"
  echo "   - Vercel: https://vercel.com (easiest)"
  echo "   - Netlify: https://netlify.com"
  echo "   - GitHub Pages: Enable in repository settings → Pages"
  echo ""
else
  echo ""
  echo "❌ Push failed. Please check:"
  echo "   1. Repository exists on GitHub"
  echo "   2. You have push access"
  echo "   3. Your GitHub credentials are configured"
  echo ""
fi

