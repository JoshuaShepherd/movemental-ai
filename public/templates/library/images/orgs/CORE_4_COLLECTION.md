# Core 4 Organizations - Quick Collection

## 🎯 Focused Collection: Alan's Primary Organizations

Collecting only the 4 organizations closest to Alan Hirsch.

---

## ✅ Progress Tracker

- [x] **5Q Collective** - `5q-collective-logo.png` ✓ COLLECTED
- [ ] **100 Movements** - `100-movements-logo.png`
- [ ] **Movement Leaders Collective (MLC)** - `mlc-logo.png`
- [ ] **Forge Mission Training** - `forge-logo.png`

**Progress: 1/4 complete (25%)** 🎯

---

## 🚀 Collect the Remaining 3 Logos

### Logo #2: 100 Movements
**Website:** https://100movements.com/  
**Save as:** `100-movements-logo.png`

**Quick Steps:**
1. Visit https://100movements.com/
2. Right-click the logo (likely "100M" or "100 Movements" text)
3. Save Image As → `100-movements-logo.png`
4. Save to this directory

**Alternative:** 
- Try https://brandfetch.com/ and search "100 Movements"
- Check their social media profile images

---

### Logo #3: Movement Leaders Collective (MLC)
**Website:** https://movementleaderscollective.com/  
**Save as:** `mlc-logo.png`

**Quick Steps:**
1. Visit https://movementleaderscollective.com/
2. Right-click the header logo
3. Save Image As → `mlc-logo.png`
4. Save to this directory

**Note:** MLC might have a circular or badge-style logo

---

### Logo #4: Forge Mission Training Network
**Website:** https://www.forgeamerica.com/  
**Save as:** `forge-logo.png`

**Quick Steps:**
1. Visit https://www.forgeamerica.com/
2. Right-click the Forge logo
3. Save Image As → `forge-logo.png`
4. Save to this directory

**Alternative:**
- Try https://brandfetch.com/ and search "Forge America" or "Forge Mission Training"

---

## ⚡ Super Quick Method

Run these commands to check which you still need:

```bash
cd /Users/joshshepherd/Projects/alan-hirsch-10-7-25/public/images/orgs

# Check what you have
echo "✅ Collected:"
ls -1 *.png 2>/dev/null

echo ""
echo "⏳ Still Need:"
for logo in 100-movements-logo.png mlc-logo.png forge-logo.png; do
  if [ ! -f "$logo" ]; then
    echo "  - $logo"
  fi
done
```

---

## 🎨 Logo Specs (Quick Reminder)

- **Format:** PNG with transparent background
- **Min Width:** 500px (bigger is better)
- **Max Size:** 100KB after optimization
- **Naming:** Exact names as shown above

---

## 🔍 If You Can't Find a Logo

### Method 1: DevTools
1. Right-click logo → Inspect Element
2. Find `<img>` tag
3. Copy `src` URL
4. Open URL in new tab
5. Right-click → Save Image

### Method 2: Screenshot + Cleanup
1. Screenshot the logo
2. Open at https://remove.bg/ to remove background
3. Download and save with correct name

### Method 3: Brandfetch
1. Visit https://brandfetch.com/
2. Search organization name
3. Download PNG if available

---

## ✅ Verify Collection

After collecting all 4, run:

```bash
cd /Users/joshshepherd/Projects/alan-hirsch-10-7-25/public/images/orgs

echo "📊 Core 4 Collection Status:"
echo ""
for logo in 5q-collective-logo.png 100-movements-logo.png mlc-logo.png forge-logo.png; do
  if [ -f "$logo" ]; then
    size=$(ls -lh "$logo" | awk '{print $5}')
    echo "✅ $logo ($size)"
  else
    echo "❌ $logo - NOT COLLECTED"
  fi
done
```

---

## 🎯 Quick Links (Click to Open)

1. ✅ ~~5Q Central~~ - DONE
2. [100 Movements](https://100movements.com/) - COLLECT THIS
3. [Movement Leaders Collective](https://movementleaderscollective.com/) - COLLECT THIS
4. [Forge America](https://www.forgeamerica.com/) - COLLECT THIS

---

## ⏱️ Time Estimate

**15-20 minutes** to collect the remaining 3 logos

---

## 🚀 After Collection

Once you have all 4 logos:

1. **Optimize** (if any are over 100KB):
   - Visit https://tinypng.com/
   - Upload the large files
   - Download optimized versions

2. **Verify** they look good:
   ```bash
   open *.png
   ```

3. **Proceed to Phase 2**: Data structure implementation

---

## 💡 Why These 4?

These are Alan Hirsch's **founding organizations** and most active partnerships:

- **5Q Collective** → APEST fivefold ministry (his signature teaching)
- **100 Movements** → mDNA and movement transformation
- **MLC** → Global movement leader network
- **Forge** → Original missional training network (where it all started)

These 4 represent his core work and will provide the foundation for the organizations section.

---

**Ready? Let's collect those last 3 logos! 🎯**

**Time to complete: ~15 minutes**

