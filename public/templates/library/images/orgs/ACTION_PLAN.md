# Logo Collection - Immediate Action Plan

## 🚀 Execute Right Now

You have 3 options to collect logos:

---

## Option 1: Interactive Script (Recommended - Easiest)

Run the collection helper script:

```bash
cd /Users/joshshepherd/Projects/alan-hirsch-10-7-25/public/images/orgs
./collect-logos.sh
```

The script will:
- Guide you through each website
- Tell you exactly where to save each logo
- Track your progress
- Provide a summary at the end

---

## Option 2: Manual Collection (Fastest if you know what you're doing)

### Quick Steps:
For each organization below:
1. Click the link (opens in browser)
2. Right-click their logo
3. "Save Image As..." → save to this directory
4. Name it exactly as shown

### The Links (Click and Go):

**Priority 1 (30 min):**
1. [100 Movements](https://100movements.com/) → Save as: `100-movements-logo.png`
2. [5Q Central](https://5qcentral.com/) → Save as: `5q-collective-logo.png`
3. [Forge America](https://www.forgeamerica.com/) → Save as: `forge-logo.png`
4. [MLC](https://movementleaderscollective.com/) → Save as: `mlc-logo.png`

**Priority 2 (20 min):**
5. [Future Travelers](https://www.futuretravelers.org/) → Save as: `future-travelers-logo.png`
6. [Shapevine](https://www.shapevine.com/) → Save as: `shapevine-logo.png`
7. [3DM](https://3dmovements.com/) → Save as: `3dm-logo.png`

**Priority 3 (20 min):**
8. [Wheaton College](https://www.wheaton.edu/) → Save as: `wheaton-logo.png`
9. [Asbury Seminary](https://asburyseminary.edu/) → Save as: `asbury-logo.png`
10. [Fuller Seminary](https://www.fuller.edu/) → Save as: `fuller-logo.png`
11. [George Fox](https://www.georgefox.edu/seminary/) → Save as: `georgefox-logo.png`

---

## Option 3: Use Brandfetch (Automated - Try First!)

Visit [Brandfetch.com](https://brandfetch.com/) and search for each organization:

```bash
# Try searching these on Brandfetch:
- "100 Movements"
- "5Q Collective"  
- "Forge Mission Training"
- "Movement Leaders Collective"
- "3DM Movements"
- "Wheaton College"
- "Asbury Seminary"
- "Fuller Seminary"
- "George Fox University"
```

If found, download PNG with transparent background.

---

## 📍 Where to Save

**Save ALL logos to:**
```
/Users/joshshepherd/Projects/alan-hirsch-10-7-25/public/images/orgs/
```

This is the directory you're currently in.

---

## 🎨 If Logo Needs Cleanup

### Quick Figma Method:
1. Upload logo to [Figma.com](https://figma.com) (free)
2. Use magic wand to remove background
3. Export as PNG with transparency
4. Download and save

### Online Background Remover:
- [Remove.bg](https://remove.bg/) - Instant background removal
- [Photopea](https://photopea.com/) - Free Photoshop alternative

---

## 📊 Check Your Progress

Run this command to see what you've collected:

```bash
cd /Users/joshshepherd/Projects/alan-hirsch-10-7-25/public/images/orgs
ls -lh *.png 2>/dev/null | wc -l
```

Should show 11 when complete.

Or view them all:
```bash
ls -1 *.png
```

---

## ⚡ Power User: Bulk Download Attempt

Try to extract logo URLs from websites (requires inspection):

```bash
# This won't work automatically, but shows the concept
# You'd need to manually find the logo URLs in browser DevTools

# Example for when you find a direct URL:
curl -o 100-movements-logo.png "https://example.com/logo.png"
```

---

## 🔍 Finding Hidden High-Res Logos

### Browser DevTools Method:
1. Visit website
2. Press `F12` (or Cmd+Opt+I on Mac)
3. Click "Elements" or "Inspector" tab
4. Find the `<img>` tag with the logo
5. Look at the `src` attribute
6. Right-click → "Open in new tab" to get high-res version
7. Save that version

### Example:
```html
<!-- You might find something like: -->
<img src="/assets/logo-full.png" alt="Logo">

<!-- Which means the full URL is: -->
https://website.com/assets/logo-full.png
```

---

## ✅ Verify After Collection

```bash
cd /Users/joshshepherd/Projects/alan-hirsch-10-7-25/public/images/orgs

# Check that all files exist:
for logo in 100-movements-logo.png 5q-collective-logo.png forge-logo.png mlc-logo.png future-travelers-logo.png shapevine-logo.png 3dm-logo.png wheaton-logo.png asbury-logo.png fuller-logo.png georgefox-logo.png; do
  if [ -f "$logo" ]; then
    echo "✅ $logo ($(ls -lh $logo | awk '{print $5}'))"
  else
    echo "❌ $logo - MISSING"
  fi
done
```

---

## 🎯 Success Criteria

You're done when:
- [ ] All 11 PNG files exist in `/public/images/orgs/`
- [ ] Each file is named correctly (lowercase, hyphens)
- [ ] Files are under 500KB each (ideally under 100KB)
- [ ] Logos have transparent backgrounds (test on different colors)
- [ ] Logos are crisp and clear (at least 500px wide)

---

## 🚦 What To Do After Collection

### Step 1: Optimize (if needed)
```bash
# Visit https://tinypng.com/
# Drag all 11 PNGs
# Download optimized versions
# Replace originals
```

### Step 2: Verify Quality
Open each logo in Preview/image viewer and check:
- Transparent background ✓
- Clear and sharp ✓
- Proper colors ✓

### Step 3: Test in Context
Create a quick HTML file to preview:

```html
<!-- test-logos.html -->
<!DOCTYPE html>
<html>
<body style="padding:50px; background:#f0f0f0;">
  <h1>Logo Test</h1>
  <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px;">
    <img src="100-movements-logo.png" style="width:200px; background:white; padding:20px;">
    <img src="5q-collective-logo.png" style="width:200px; background:white; padding:20px;">
    <img src="forge-logo.png" style="width:200px; background:white; padding:20px;">
    <img src="mlc-logo.png" style="width:200px; background:white; padding:20px;">
    <img src="future-travelers-logo.png" style="width:200px; background:white; padding:20px;">
    <img src="shapevine-logo.png" style="width:200px; background:white; padding:20px;">
    <img src="3dm-logo.png" style="width:200px; background:white; padding:20px;">
    <img src="wheaton-logo.png" style="width:200px; background:white; padding:20px;">
    <img src="asbury-logo.png" style="width:200px; background:white; padding:20px;">
    <img src="fuller-logo.png" style="width:200px; background:white; padding:20px;">
    <img src="georgefox-logo.png" style="width:200px; background:white; padding:20px;">
  </div>
</body>
</html>
```

Open in browser to review all logos.

### Step 4: Report Back
Run this to create a collection report:

```bash
cd /Users/joshshepherd/Projects/alan-hirsch-10-7-25/public/images/orgs
echo "# Logo Collection Report" > COLLECTION_REPORT.md
echo "" >> COLLECTION_REPORT.md
echo "**Date:** $(date)" >> COLLECTION_REPORT.md
echo "" >> COLLECTION_REPORT.md
echo "## Collected Logos:" >> COLLECTION_REPORT.md
echo "" >> COLLECTION_REPORT.md
for logo in *.png; do
  if [ -f "$logo" ]; then
    size=$(ls -lh "$logo" | awk '{print $5}')
    echo "- ✅ $logo ($size)" >> COLLECTION_REPORT.md
  fi
done
echo "" >> COLLECTION_REPORT.md
echo "**Total:** $(ls -1 *.png 2>/dev/null | wc -l)/11 logos" >> COLLECTION_REPORT.md
cat COLLECTION_REPORT.md
```

---

## 💡 Pro Tips

### Tip 1: Start with the easiest
Begin with organization websites that clearly display logos. Save the tricky ones for last.

### Tip 2: Take screenshots as backup
If you can't download directly, screenshot and crop later.

### Tip 3: Check social media
Organization Facebook/LinkedIn pages often have high-res logos in profile pictures.

### Tip 4: Look for /press or /media pages
Many organizations have these pages with downloadable assets.

### Tip 5: Contact directly if stuck
Use the email template in `LOGO_ACQUISITION_GUIDE.md` to request logos directly.

---

## 🆘 Troubleshooting

**Problem:** Logo is low resolution
**Solution:** Use DevTools to find higher-res version in page source

**Problem:** Logo has background
**Solution:** Use remove.bg or Figma to remove background

**Problem:** Can't find logo on website
**Solution:** 1) Check footer, 2) Check About page, 3) Screenshot and crop

**Problem:** Logo is SVG (not PNG)
**Solution:** Open SVG in browser, screenshot at high resolution, or convert with Figma

**Problem:** Website doesn't exist/is down
**Solution:** Try Internet Archive (web.archive.org) or create text-based logo

---

## ⏱️ Time Estimate

- **Brandfetch attempt:** 15-20 minutes
- **Manual collection:** 45-60 minutes  
- **With cleanup:** 90-120 minutes
- **With optimization:** Add 15 minutes

**Total realistic time:** 1.5 - 2 hours

---

## 🎯 Your Action Right Now

**Pick ONE method and start:**

### Method A (Easiest):
```bash
./collect-logos.sh
```

### Method B (Fastest):
Open START_HERE.md and click each link, save logos manually

### Method C (Most Thorough):
Follow LOGO_ACQUISITION_GUIDE.md step-by-step

**Just start! You've got this! 💪**

---

**Ready? Go! 🚀**

