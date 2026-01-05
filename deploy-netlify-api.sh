#!/bin/bash

# Direct Netlify API deployment script
# This script uses the Netlify API to create a site and deploy it

set -e

echo "🚀 Netlify API Deployment"
echo "========================"
echo ""

# Check for required tools
if ! command -v curl &> /dev/null; then
    echo "❌ Error: curl is required but not installed"
    exit 1
fi

if ! command -v zip &> /dev/null; then
    echo "⚠️  Warning: zip is not installed. You'll need to build the project first."
    echo "   Run: npm install && npm run build"
    read -p "Press Enter to continue if you've already built the project..."
fi

# Get Netlify token
if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
    echo "📝 Enter your Netlify Access Token"
    echo "   Get it from: https://app.netlify.com/user/applications"
    echo ""
    read -p "Netlify Access Token: " NETLIFY_AUTH_TOKEN
    export NETLIFY_AUTH_TOKEN
fi

if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
    echo "❌ Error: Netlify token is required"
    exit 1
fi

# Build the project if dist doesn't exist
if [ ! -d "dist" ]; then
    echo "📦 Building project..."
    if command -v npm &> /dev/null; then
        npm install
        npm run build
    else
        echo "❌ Error: npm is required to build the project"
        echo "   Please install Node.js and npm, then run: npm install && npm run build"
        exit 1
    fi
fi

if [ ! -d "dist" ]; then
    echo "❌ Error: dist directory not found after build"
    exit 1
fi

echo ""
echo "📦 Creating deployment package..."

# Create a temporary zip file
TEMP_ZIP=$(mktemp).zip
cd dist
zip -r "$TEMP_ZIP" . > /dev/null
cd ..

echo "✅ Package created: $(basename $TEMP_ZIP)"
echo ""

# Check if site already exists
echo "🔍 Checking for existing site..."
SITES_RESPONSE=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "https://api.netlify.com/api/v1/sites")

SITE_ID=$(echo "$SITES_RESPONSE" | grep -o '"site_id":"[^"]*' | grep -o 'professors-keyboard[^"]*' | head -1)

if [ -z "$SITE_ID" ]; then
    # Extract site_id from any existing site with the name
    SITE_ID=$(echo "$SITES_RESPONSE" | grep -o '"name":"professors-keyboard"[^}]*"site_id":"[^"]*' | grep -o '"site_id":"[^"]*' | cut -d'"' -f4 | head -1)
fi

if [ -z "$SITE_ID" ]; then
    echo "📝 Creating new Netlify site..."
    CREATE_RESPONSE=$(curl -s -X POST \
        -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"name":"professors-keyboard"}' \
        "https://api.netlify.com/api/v1/sites")
    
    SITE_ID=$(echo "$CREATE_RESPONSE" | grep -o '"site_id":"[^"]*' | cut -d'"' -f4)
    SITE_URL=$(echo "$CREATE_RESPONSE" | grep -o '"url":"[^"]*' | cut -d'"' -f4)
    
    if [ -z "$SITE_ID" ]; then
        echo "❌ Failed to create site"
        echo "Response: $CREATE_RESPONSE"
        rm -f "$TEMP_ZIP"
        exit 1
    fi
    
    echo "✅ Site created!"
    echo "   Site ID: $SITE_ID"
    echo "   Site URL: $SITE_URL"
else
    echo "✅ Found existing site: $SITE_ID"
    SITE_INFO=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
        "https://api.netlify.com/api/v1/sites/$SITE_ID")
    SITE_URL=$(echo "$SITE_INFO" | grep -o '"url":"[^"]*' | cut -d'"' -f4)
    echo "   Site URL: $SITE_URL"
fi

echo ""
echo "🚀 Deploying to Netlify..."

# Create deploy
DEPLOY_RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/zip" \
    --data-binary "@$TEMP_ZIP" \
    "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys")

DEPLOY_ID=$(echo "$DEPLOY_RESPONSE" | grep -o '"id":"[^"]*' | cut -d'"' -f4)
DEPLOY_URL=$(echo "$DEPLOY_RESPONSE" | grep -o '"deploy_url":"[^"]*' | cut -d'"' -f4)

if [ -z "$DEPLOY_ID" ]; then
    echo "❌ Deployment failed"
    echo "Response: $DEPLOY_RESPONSE"
    rm -f "$TEMP_ZIP"
    exit 1
fi

echo "✅ Deployment started!"
echo "   Deploy ID: $DEPLOY_ID"
echo "   Deploy URL: $DEPLOY_URL"
echo ""

# Clean up
rm -f "$TEMP_ZIP"

echo "⏳ Waiting for deployment to complete..."
sleep 5

# Check deploy status
STATUS_RESPONSE=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys/$DEPLOY_ID")

STATE=$(echo "$STATUS_RESPONSE" | grep -o '"state":"[^"]*' | cut -d'"' -f4)

if [ "$STATE" = "ready" ]; then
    echo "✅ Deployment complete!"
elif [ "$STATE" = "error" ]; then
    echo "❌ Deployment failed"
    echo "Check the deploy logs at: $DEPLOY_URL"
    exit 1
else
    echo "⏳ Deployment in progress (state: $STATE)"
    echo "   Check status at: $DEPLOY_URL"
fi

echo ""
echo "🌐 Your site is live at: $SITE_URL"
echo ""
echo "💡 To set up automatic deployments via GitHub Actions:"
echo "   1. Add these secrets to your GitHub repo:"
echo "      - NETLIFY_AUTH_TOKEN: $NETLIFY_AUTH_TOKEN"
echo "      - NETLIFY_SITE_ID: $SITE_ID"
echo "   2. The GitHub Action will automatically deploy on every push!"

