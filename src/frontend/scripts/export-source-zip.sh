#!/bin/bash

# Source Code Export Script
# Creates a ZIP archive of the complete project source code

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
OUTPUT_FILE="$PROJECT_ROOT/tablebook-source.zip"

echo "📦 Exporting TableBook source code..."
echo "📁 Project root: $PROJECT_ROOT"

# Change to project root
cd "$PROJECT_ROOT"

# Create ZIP with source files, excluding build artifacts
zip -r "$OUTPUT_FILE" \
  backend/ \
  frontend/ \
  -x "*/node_modules/*" \
  -x "*/dist/*" \
  -x "*/build/*" \
  -x "*/.dfx/*" \
  -x "*/android/app/build/*" \
  -x "*/android/app/src/main/assets/www/*" \
  -x "*/android/.gradle/*" \
  -x "*/android/build/*" \
  -x "*/.gradle/*" \
  -x "*.apk" \
  -x "*.zip" \
  -x "*/.DS_Store" \
  -x "*/.env" \
  -x "*/.env.local" \
  -x "*/coverage/*" \
  -x "*/.vscode/*" \
  -x "*/.idea/*"

echo "✅ Source code exported successfully!"
echo "📦 Output: $OUTPUT_FILE"
echo ""
echo "Archive contents:"
zip -sf "$OUTPUT_FILE" | head -20
echo "..."
echo ""
echo "To extract:"
echo "  unzip tablebook-source.zip"
