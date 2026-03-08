# Media Library Quick Reference

## Directory Locations

| Aspect Ratio | Path | Use Case |
|-------------|------|----------|
| 16:9 Landscape | `landscape/16-9/` | Hero images, banners, video thumbnails |
| 4:3 Landscape | `landscape/4-3/` | Card images, traditional layouts |
| 9:16 Portrait | `portrait/9-16/` | Mobile hero, social media stories |
| 1:1 Square | `square/1-1/` | Social posts, profile images, cards |

## Category Folders

| Category | Path | Description |
|----------|------|-------------|
| Community | `community/` | Gatherings, groups, connection |
| Worship | `worship/` | Prayer, services, spiritual practices |
| Mission | `mission/` | Outreach, service, transformation |
| Leadership | `leadership/` | Teams, meetings, conferences |
| People | `people/` | Individual portraits, people in context |

## Style Folders

| Style | Path | Description |
|-------|------|-------------|
| Black & White | `bw/` | Dramatic, timeless imagery |
| Silhouette | `silhouette/` | Symbolic, background elements |

## Quick Image Paths

```typescript
// Hero image (16:9)
'/media-library/images/landscape/16-9/community-gathering.jpg'

// Mobile hero (9:16)
'/media-library/images/portrait/9-16/worship-hand.jpg'

// Card image (square)
'/media-library/images/square/1-1/bible-closeup.jpg'

// Category-based
'/media-library/images/community/small-group.jpg'

// Black & white
'/media-library/images/bw/cross-silhouette.jpg'
```

## TypeScript Helper

```typescript
import { getImagePath, imageConfigs } from '@/lib/media-library';

// Get path by aspect ratio
const image = getImagePath('community-gathering', '16:9');

// Use with Next.js Image
<Image 
  src={image}
  width={imageConfigs.hero.width}
  height={imageConfigs.hero.height}
  alt="Community gathering"
/>
```

## Common Sizes

| Use Case | Aspect Ratio | Dimensions |
|----------|-------------|------------|
| Hero | 16:9 | 1920x1080 |
| Mobile Hero | 9:16 | 1080x1920 |
| Card | 4:3 | 1200x900 |
| Square | 1:1 | 1200x1200 |
| Thumbnail | 1:1 | 400x400 |

## Downloading Images

```bash
# 1. Get Unsplash API key from https://unsplash.com/developers
# 2. Add to .env.local: UNSPLASH_ACCESS_KEY=your_key
# 3. Run download script
node scripts/download-unsplash-images.js
```

## Naming Convention

- Use kebab-case: `community-gathering.jpg`
- Be descriptive: `worship-hands-raised-bw.jpg`
- Include metadata: `{name}.json` alongside image

## See Also

- Full documentation: [README.md](./README.md)
- Setup guide: [../scripts/MEDIA-LIBRARY-SETUP.md](../scripts/MEDIA-LIBRARY-SETUP.md)
- Curation guide: [../scripts/curate-unsplash-collections.md](../scripts/curate-unsplash-collections.md)
- TypeScript utilities: [../../lib/media-library.ts](../../lib/media-library.ts)
