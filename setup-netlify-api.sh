#!/bin/bash

# Script to help set up Netlify API integration
# This will guide you through getting the necessary tokens and setting up GitHub secrets

echo "🚀 Netlify API Integration Setup"
echo "================================="
echo ""
echo "This script will help you set up automatic deployment to Netlify via GitHub Actions."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Please run this script from the project root directory"
  exit 1
fi

echo "📋 Step 1: Get your Netlify Access Token"
echo "----------------------------------------"
echo "1. Go to: https://app.netlify.com/user/applications"
echo "2. Click 'New access token'"
echo "3. Give it a name (e.g., 'GitHub Actions Deploy')"
echo "4. Click 'Generate token'"
echo "5. COPY THE TOKEN (you won't see it again!)"
echo ""
read -p "Press Enter after you've copied your Netlify access token..."

echo ""
echo "📋 Step 2: Create a Netlify Site (if you haven't already)"
echo "--------------------------------------------------------"
echo "Option A: Create via Netlify Dashboard"
echo "  1. Go to: https://app.netlify.com"
echo "  2. Click 'Add new site' → 'Import an existing project'"
echo "  3. Connect GitHub and select 'professors-keyboard'"
echo "  4. Click 'Deploy site' (don't worry about build settings, we'll use GitHub Actions)"
echo ""
echo "Option B: Create via API (requires token from Step 1)"
echo ""
read -p "Do you want to create the site via API? (y/n): " create_via_api

if [ "$create_via_api" = "y" ]; then
  read -p "Enter your Netlify access token: " NETLIFY_TOKEN
  
  if [ -z "$NETLIFY_TOKEN" ]; then
    echo "❌ Token is required"
    exit 1
  fi
  
  echo ""
  echo "Creating Netlify site..."
  RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $NETLIFY_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"name":"professors-keyboard"}' \
    https://api.netlify.com/api/v1/sites)
  
  SITE_ID=$(echo $RESPONSE | grep -o '"site_id":"[^"]*' | cut -d'"' -f4)
  SITE_URL=$(echo $RESPONSE | grep -o '"url":"[^"]*' | cut -d'"' -f4)
  
  if [ -z "$SITE_ID" ]; then
    echo "❌ Failed to create site. Response: $RESPONSE"
    echo "   You may need to create it manually via the dashboard"
  else
    echo "✅ Site created!"
    echo "   Site ID: $SITE_ID"
    echo "   Site URL: $SITE_URL"
    echo ""
    read -p "Press Enter to continue..."
  fi
else
  echo ""
  echo "After creating the site via dashboard:"
  echo "1. Go to Site settings → General → Site details"
  echo "2. Copy the 'Site ID'"
  echo ""
  read -p "Press Enter after you have the Site ID..."
fi

echo ""
echo "📋 Step 3: Add GitHub Secrets"
echo "----------------------------"
read -p "Enter your Netlify Access Token: " NETLIFY_TOKEN
read -p "Enter your Netlify Site ID: " SITE_ID

if [ -z "$NETLIFY_TOKEN" ] || [ -z "$SITE_ID" ]; then
  echo "❌ Both token and site ID are required"
  exit 1
fi

echo ""
echo "Setting up GitHub secrets..."
echo ""
echo "You need to add these secrets to your GitHub repository:"
echo ""
echo "1. Go to: https://github.com/KenAdler/professors-keyboard/settings/secrets/actions"
echo "2. Click 'New repository secret'"
echo "3. Add these two secrets:"
echo ""
echo "   Name: NETLIFY_AUTH_TOKEN"
echo "   Value: $NETLIFY_TOKEN"
echo ""
echo "   Name: NETLIFY_SITE_ID"
echo "   Value: $SITE_ID"
echo ""
read -p "Press Enter after you've added the secrets to GitHub..."

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 What happens next:"
echo "   - Every time you push to the 'main' branch, GitHub Actions will:"
echo "     1. Build your app"
echo "     2. Deploy it to Netlify automatically"
echo ""
echo "📝 To test it:"
echo "   git commit --allow-empty -m 'Trigger Netlify deployment'"
echo "   git push"
echo ""
echo "🌐 Your site will be available at the Netlify URL you saw earlier!"

