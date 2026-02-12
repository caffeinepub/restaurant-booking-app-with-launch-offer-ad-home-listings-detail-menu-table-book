#!/bin/bash

# Android Web Assets Sync Script
# Copies built web assets from frontend/dist to Android app assets directory

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DIST_DIR="$FRONTEND_DIR/dist"
ANDROID_ASSETS_DIR="$FRONTEND_DIR/android/app/src/main/assets/www"

echo "🔄 Syncing web assets to Android project..."

# Check if dist directory exists
if [ ! -d "$DIST_DIR" ]; then
    echo "❌ Error: dist directory not found at $DIST_DIR"
    echo "Please run 'pnpm run build:skip-bindings' first"
    exit 1
fi

# Create Android assets directory if it doesn't exist
mkdir -p "$ANDROID_ASSETS_DIR"

# Clean existing assets
echo "🧹 Cleaning existing assets..."
rm -rf "$ANDROID_ASSETS_DIR"/*

# Copy all built files to Android assets
echo "📦 Copying built files..."
cp -r "$DIST_DIR"/* "$ANDROID_ASSETS_DIR"/

# Verify critical files exist
if [ ! -f "$ANDROID_ASSETS_DIR/index.html" ]; then
    echo "❌ Error: index.html not found in assets"
    exit 1
fi

echo "✅ Web assets synced successfully!"
echo "📁 Assets location: $ANDROID_ASSETS_DIR"
echo ""
echo "Next steps:"
echo "  cd android"
echo "  ./gradlew assembleDebug"
