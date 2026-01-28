# Media Library

Curated collection of images, videos, and other media assets for **movemental thought leadership templates**. Templates must show what individual authors (e.g. Brad Brisco) can expect for their own platform—author imagery, books, articles, podcasts, courses, etc.—not food, random stock, or unrelated lifestyle imagery. See [Template Content and Media](../../_docs/template-content-and-media.md) for the movemental best-practice approach and how to organize media by content type and persona.

## Organization

Media assets are organized by:

1. **Aspect Ratio** - For layout-specific images
   - `landscape/` - 16:9, 4:3, 21:9, 3:2
   - `portrait/` - 9:16, 3:4, 2:3
   - `square/` - 1:1

2. **Style/Type** - For design-specific images
   - `bw/` - Black and white images
   - `silhouette/` - Silhouette images
   - `abstract/` - Abstract/conceptual images

3. **Content Theme** - For subject-specific images
   - `community/` - Community gatherings, small groups
   - `worship/` - Worship services, prayer, spiritual practices
   - `mission/` - Missional work, outreach, service
   - `leadership/` - Leadership meetings, teams, conferences
   - `people/` - Individual portraits, people in context

## Directory Structure

```
media-library/
├── images/
│   ├── landscape/
│   │   ├── 16-9/          # Widescreen landscape (1920x1080, 3840x2160)
│   │   ├── 4-3/           # Traditional landscape (1600x1200, 2048x1536)
│   │   ├── 21-9/          # Ultra-wide (2560x1080, 3440x1440)
│   │   └── 3-2/           # Portrait landscape (3000x2000)
│   ├── portrait/
│   │   ├── 9-16/          # Mobile/vertical (1080x1920)
│   │   ├── 3-4/           # Traditional portrait (1200x1600)
│   │   └── 2-3/           # Portrait ratio (2000x3000)
│   ├── square/
│   │   └── 1-1/           # Square images (1200x1200, 2000x2000)
│   ├── bw/                # Black and white images (any aspect ratio)
│   ├── silhouette/        # Silhouette images (any aspect ratio)
│   ├── abstract/          # Abstract/conceptual images
│   ├── community/         # Community-themed images
│   ├── worship/           # Worship-themed images
│   ├── mission/           # Mission-themed images
│   ├── leadership/        # Leadership-themed images
│   └── people/            # People-focused images
├── videos/                # Video assets (to be organized)
└── icons/                 # Icon sets (to be organized)
```

## Image Naming Convention

Images are named using kebab-case with descriptive names:
- `community-gathering.jpg`
- `worship-hands-raised-bw.jpg`
- `leadership-team-meeting.jpg`

Each image has a corresponding JSON metadata file:
- `community-gathering.jpg` → `community-gathering.json`

## Metadata Format

Each image includes a JSON metadata file with:

```json
{
  "id": "community-gathering",
  "query": "church community gathering",
  "category": "community",
  "unsplashId": "abc123",
  "unsplashUrl": "https://unsplash.com/photos/...",
  "photographer": "John Doe",
  "photographerUrl": "https://unsplash.com/@johndoe",
  "aspectRatio": "16:9",
  "width": 1920,
  "height": 1080,
  "color": "#a1b2c3",
  "description": "People gathered in community",
  "tags": ["community", "gathering"]
}
```

## Adding New Images

### Using the Download Script

1. Get an Unsplash API key from https://unsplash.com/developers
2. Add to `.env.local`: `UNSPLASH_ACCESS_KEY=your_key_here`
3. Run: `node scripts/download-unsplash-images.js`

### Manual Addition

1. Download image from Unsplash or other source
2. Place in appropriate directory based on aspect ratio and/or category
3. Name using kebab-case: `descriptive-name.jpg`
4. Create a JSON metadata file: `descriptive-name.json`
5. Update `manifest.json` (if you create one)

## Image Sources

- **Unsplash** - Primary source for high-quality, free images
  - Search terms: church, community, mission, worship, leadership
  - Always attribute photographers (included in metadata)

- **Pexels** - Alternative free image source
- **Pixabay** - Additional free images

## Usage in Templates

When using images in templates, reference them by their aspect ratio category:

```tsx
// Landscape hero image (16:9)
<Image 
  src="/media-library/images/landscape/16-9/community-gathering.jpg"
  alt="Community gathering"
  width={1920}
  height={1080}
/>

// Portrait image (9:16)
<Image 
  src="/media-library/images/portrait/9-16/worship-hand.jpg"
  alt="Worship"
  width={1080}
  height={1920}
/>

// Category-based image
<Image 
  src="/media-library/images/community/small-group.jpg"
  alt="Small group"
/>
```

## Missional Thought Leadership Themes

This library is curated specifically for missional thought leadership content similar to:

- **Alan Hirsch** - Apostolic movements, missional church
- **Brad Brisco** - Church planting, missional communities
- **Alan Roxburgh** - Missional theology, leadership development

Image themes focus on:
- Community and gathering
- Mission and outreach
- Leadership and team building
- Worship and spiritual practices
- Urban mission and social justice
- Movement and transformation

## Best Practices

1. **Aspect Ratios** - Always check aspect ratio before using in layouts
2. **Attribution** - Credit photographers when possible (metadata included)
3. **Licensing** - All Unsplash images are free for commercial use
4. **Optimization** - Consider using Next.js Image optimization
5. **Alt Text** - Use descriptive alt text from metadata
6. **Performance** - Use appropriate image sizes for context

## Future Additions

- Video assets for hero sections
- Icon sets for UI elements
- Additional aspect ratios as needed
- Animated GIFs for interactions
- SVG illustrations
