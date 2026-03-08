#!/bin/bash

# Logo Collection Script for Alan Hirsch Organizations
# This script helps collect logos from organization websites

echo "🎯 Alan Hirsch Organizations Logo Collection Script"
echo "=================================================="
echo ""

# Create the orgs directory if it doesn't exist
mkdir -p "$(dirname "$0")"

echo "📋 This script will guide you through collecting 11 logos."
echo "   Follow the instructions for each organization."
echo ""
echo "Press ENTER to start..."
read

# Function to guide user through manual collection
collect_logo() {
    local name=$1
    local url=$2
    local filename=$3
    
    echo ""
    echo "=================================================="
    echo "📍 Collecting: $name"
    echo "=================================================="
    echo ""
    echo "🌐 Website: $url"
    echo "💾 Save as: $filename"
    echo ""
    echo "STEPS:"
    echo "  1. Open this URL in your browser: $url"
    echo "  2. Right-click the logo in the header"
    echo "  3. Select 'Save Image As...' or 'Inspect Element'"
    echo "  4. Save to this directory as: $filename"
    echo ""
    echo "TIP: If logo is SVG or low-res, use browser DevTools:"
    echo "     - Right-click logo → Inspect"
    echo "     - Find <img> or <svg> tag"
    echo "     - Copy src URL for higher resolution"
    echo ""
    echo "Press ENTER when you've saved the logo (or SKIP to skip)..."
    read response
    
    if [ -f "$filename" ]; then
        echo "✅ Found $filename"
    else
        echo "⚠️  Logo not found. You can collect it later."
    fi
}

# Priority 1: Primary Organizations
echo ""
echo "🎯 PRIORITY 1: Primary Organizations (Most Important)"
echo "=================================================="

collect_logo \
    "100 Movements" \
    "https://100movements.com/" \
    "100-movements-logo.png"

collect_logo \
    "5Q Collective" \
    "https://5qcentral.com/" \
    "5q-collective-logo.png"

collect_logo \
    "Forge Mission Training Network" \
    "https://www.forgeamerica.com/" \
    "forge-logo.png"

collect_logo \
    "Movement Leaders Collective" \
    "https://movementleaderscollective.com/" \
    "mlc-logo.png"

# Priority 2: Partner Organizations
echo ""
echo "🎯 PRIORITY 2: Partner Organizations"
echo "=================================================="

collect_logo \
    "Future Travelers" \
    "https://www.futuretravelers.org/" \
    "future-travelers-logo.png"

collect_logo \
    "Shapevine" \
    "https://www.shapevine.com/" \
    "shapevine-logo.png"

collect_logo \
    "3DM (Three Dimensional Ministries)" \
    "https://3dmovements.com/" \
    "3dm-logo.png"

# Priority 3: Academic Partners
echo ""
echo "🎯 PRIORITY 3: Academic Partners"
echo "=================================================="

collect_logo \
    "Wheaton College" \
    "https://www.wheaton.edu/" \
    "wheaton-logo.png"

collect_logo \
    "Asbury Seminary" \
    "https://asburyseminary.edu/" \
    "asbury-logo.png"

collect_logo \
    "Fuller Seminary" \
    "https://www.fuller.edu/" \
    "fuller-logo.png"

collect_logo \
    "George Fox Seminary" \
    "https://www.georgefox.edu/seminary/" \
    "georgefox-logo.png"

# Summary
echo ""
echo "=================================================="
echo "📊 Collection Summary"
echo "=================================================="
echo ""

count=0
for logo in 100-movements-logo.png 5q-collective-logo.png forge-logo.png mlc-logo.png future-travelers-logo.png shapevine-logo.png 3dm-logo.png wheaton-logo.png asbury-logo.png fuller-logo.png georgefox-logo.png; do
    if [ -f "$logo" ]; then
        echo "✅ $logo"
        ((count++))
    else
        echo "⚠️  $logo (not collected)"
    fi
done

echo ""
echo "Collected: $count/11 logos"
echo ""

if [ $count -eq 11 ]; then
    echo "🎉 All logos collected! Great job!"
    echo ""
    echo "Next steps:"
    echo "  1. Optimize logos at https://tinypng.com/"
    echo "  2. Verify all logos are <100KB"
    echo "  3. Test on light/dark backgrounds"
    echo "  4. Proceed to Phase 2 (implementation)"
else
    echo "📝 To collect missing logos:"
    echo "  - Run this script again, or"
    echo "  - Follow instructions in LOGO_ACQUISITION_GUIDE.md"
fi

echo ""
echo "Done! 🚀"

