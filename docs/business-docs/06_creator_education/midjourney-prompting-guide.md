# Midjourney Prompting Guide for Movemental Branding
## Complete Guide to Creating Visual Assets with AI

**Date**: January 2025  
**Purpose**: Comprehensive Midjourney prompting guide with tailored prompts for all three branding directions  
**Tech Stack**: Midjourney v6 (latest version)

---

## Part 1: Midjourney Prompting Fundamentals

### Understanding Midjourney

Midjourney is an AI image generation tool that creates visuals from text descriptions. The quality of your output depends heavily on the precision and structure of your prompts.

### Core Prompt Structure

**Basic Formula**:
```
[Subject] + [Style/Medium] + [Composition] + [Color/Mood] + [Technical Details] + [Parameters]
```

**Example**:
```
A minimalist logo featuring interconnected nodes, modern vector art style, centered composition, electric blue and purple gradient, high contrast, --ar 1:1 --v 6 --stylize 750
```

---

### Essential Prompting Techniques

#### 1. Be Specific and Descriptive

**Bad**: "a logo"  
**Good**: "A minimalist wordmark logo for "Movemental" featuring geometric letterforms with subtle network connection lines, modern sans-serif typography, electric blue (#0ea5e9) primary color with purple (#a855f7) accent, clean white background, professional tech company aesthetic"

**Why**: Specificity guides Midjourney to produce exactly what you need rather than generic outputs.

#### 2. Use Visual Language and Style References

**Effective Style References**:
- Art movements: "Bauhaus style", "Art Deco", "Minimalist", "Swiss Design"
- Design eras: "Mid-century modern", "Contemporary", "Futuristic"
- Medium: "Vector illustration", "3D render", "Photorealistic", "Digital art"
- Artists/Designers: "In the style of Paul Rand", "Inspired by Dieter Rams"

**Example**:
```
A logo in the style of Swiss Design, featuring clean geometric forms, minimal color palette, precise typography, inspired by Paul Rand's corporate identity work
```

#### 3. Master Midjourney Parameters

**Essential Parameters**:

- **`--ar` or `--aspect`**: Aspect ratio
  - `--ar 1:1` (square, perfect for logos/icons)
  - `--ar 16:9` (widescreen, for hero images)
  - `--ar 4:3` (standard, for illustrations)
  - `--ar 9:16` (portrait, for mobile)

- **`--v 6`**: Version 6 (latest, most advanced)
  - Always use `--v 6` for best results

- **`--stylize` or `--s`**: Artistic interpretation (0-1000)
  - `--s 100` (more literal, follows prompt closely)
  - `--s 750` (balanced, recommended default)
  - `--s 1000` (highly artistic, creative interpretation)

- **`--chaos` or `--c`**: Variability (0-100)
  - `--c 0` (consistent, predictable)
  - `--c 50` (moderate variation)
  - `--c 100` (high variation, experimental)

- **`--weird` or `--w`**: Unusual interpretations (0-3000)
  - `--w 0` (normal)
  - `--w 1000` (creative, unusual)
  - Use sparingly for experimental looks

- **`--quality` or `--q`**: Render quality (0.25, 0.5, 1, 2)
  - `--q 1` (default, balanced)
  - `--q 2` (higher quality, slower, costs more)
  - Use `--q 2` for final logo/icon outputs

- **`--no`**: Exclude elements (v6: use single `--no` with comma-separated values)
  - `--no text, watermark` (for clean outputs)
  - `--no people` (if you don't want human figures)
  - `--no text, watermark, signature` (multiple exclusions in one parameter)

#### 4. Prompt Weighting with `::`

Use `::` to assign importance to different elements:

**Syntax**: `element::weight`

**Example**:
```
network nodes::2 electric blue::1.5 purple accent::1 clean background::0.5
```

This gives network nodes highest priority (2x), electric blue high priority (1.5x), purple accent normal priority, and clean background lower priority.

#### 5. Proper Use of Quotation Marks

**For Text That Should Appear in the Image**:
- Use **double quotation marks** (`"text"`) to specify text that should be rendered in the image
- Example: `a logo with "Movemental" written in modern typography`
- Keep text short (3-4 words maximum for best accuracy)
- Use `--style raw` and lower `--stylize` values (50-200) for better text rendering

**For Brand Names in Descriptions**:
- Use double quotes around brand names for clarity: `"Movemental" logo`
- This helps Midjourney understand it's a specific brand name, not a generic term
- Example: `"Movemental" wordmark logo, modern sans-serif typography`

**Important Notes**:
- **Single quotes** (`'text'`) are NOT recognized for text rendering - always use double quotes
- For logo prompts where you want to AVOID text, use `--no text, watermark` (we typically do this)
- If you DO want text in the image, use quotes AND consider `--style raw --s 50` for accuracy
- Text rendering works best with standard Latin alphabet

**Examples**:
```
# Text that should appear in image:
A book cover with "The Great Adventure" in elegant script --style raw --s 50

# Brand name in description (text won't appear due to --no):
"Movemental" logo, minimalist design --no text, watermark

# Brand name with text that SHOULD appear:
"Movemental" wordmark logo with the text "Movemental" in modern typography --style raw --s 100
```

#### 6. Negative Prompts

Use `--no` to exclude unwanted elements:

**Common Exclusions** (v6: combine multiple exclusions in single `--no` parameter):
- `--no text, watermark` (prevents unwanted text and watermarks in logos)
- `--no text, watermark, signature` (removes text, watermarks, and artist signatures)
- `--no people` (if you don't want human figures)
- `--no background` (for simple backgrounds - note: Midjourney doesn't create true transparency, but you can request simple backgrounds)

#### 7. Iteration and Refinement

**Process**:
1. Start with a detailed prompt
2. Generate 4 variations (Midjourney default)
3. Upscale your favorite (U1, U2, U3, or U4)
4. Create variations (V1, V2, V3, or V4) if needed
5. Refine prompt based on results
6. Repeat until satisfied

**Refinement Tips**:
- If too abstract: Add "detailed", "precise", "specific"
- If too literal: Add "stylized", "artistic", "creative interpretation"
- If colors off: Specify exact hex codes or color names
- If composition wrong: Add "centered", "symmetrical", "balanced"

---

### Logo-Specific Prompting Tips

**Critical Elements for Logos**:
1. **Simplicity**: "minimalist", "simple", "clean"
2. **Scalability**: "works at small sizes", "vector-style"
3. **Typography**: Specify font style or characteristics
4. **Color**: Exact colors or "monochrome", "two-color"
5. **Style**: "flat design", "geometric", "modern"
6. **Background**: "white background", "transparent", "solid color"

**Logo Prompt Template**:
```
"[Brand name]" logo, [style description], [color palette], [typography style], minimalist design, scalable, works at small sizes, clean white background, professional, --ar 1:1 --v 6 --stylize 500 --q 2 --no text, watermark
```

**Note**: Use double quotes around brand name for clarity. Since we use `--no text, watermark`, the brand name won't appear as text in the image, but helps Midjourney understand the context.

---

### Icon-Specific Prompting Tips

**Critical Elements for Icons**:
1. **Consistency**: "uniform style", "cohesive set"
2. **Clarity**: "recognizable", "clear silhouette"
3. **Style**: "flat design", "outline", "filled"
4. **Size**: "works at 16px", "scalable"
5. **Color**: Consistent palette across set

**Icon Set Prompt Template**:
```
Set of [number] minimalist icons, [subject list], [style], [color palette], uniform line weight, consistent style, flat design, scalable, --ar 1:1 --v 6 --stylize 400
```

---

### Illustration-Specific Prompting Tips

**Critical Elements for Illustrations**:
1. **Composition**: "centered", "rule of thirds", "symmetrical"
2. **Style**: "vector illustration", "3D render", "digital art"
3. **Mood**: "professional", "energetic", "calm"
4. **Detail Level**: "detailed", "simplified", "stylized"
5. **Color Harmony**: Specify color relationships

**Illustration Prompt Template**:
```
[Subject], [style], [composition], [color palette], [mood], [detail level], professional, --ar 16:9 --v 6 --stylize 750
```

---

### Media/Photography-Specific Prompting Tips

**Critical Elements for Media**:
1. **Photography Style**: "photorealistic", "cinematic", "documentary"
2. **Lighting**: "natural light", "studio lighting", "golden hour"
3. **Camera Settings**: "shallow depth of field", "wide angle", "telephoto"
4. **Mood**: "professional", "warm", "dramatic"
5. **Quality**: "high resolution", "4K", "professional photography"

**Media Prompt Template**:
```
[Subject], [photography style], [lighting], [camera perspective], [mood], high resolution, professional photography, --ar 16:9 --v 6 --stylize 200
```

---

## Part 2: Movemental Branding Prompts

### Color Palette Reference

**Direction 1: Executive Authority**
- Primary: Deep Slate Blue (#627d98)
- Accent: Executive Gold (#ff9800)
- Neutral: Warm Grays (#fafafa to #212121)

**Direction 2: Network Intelligence** (RECOMMENDED)
- Primary: Intelligent Blue (#0ea5e9)
- Accent: AI Purple (#a855f7)
- Network: Network Green (#22c55e)
- Neutral: Slate Grays (#f8fafc to #0f172a)

**Direction 3: Scenius Collective**
- Primary: Growth Green (#22c55e)
- Accent: Warm Amber (#d97706)
- Community: Community Blue (#0ea5e9)
- Neutral: Warm Grays (#fafaf9 to #1c1917)

---

## Direction 1: Executive Authority Prompts

### Logo Prompts

#### Primary Logo (Wordmark)
```
"Movemental" wordmark logo, modern sans-serif typography similar to Poppins, clean geometric letterforms, deep slate blue (#627d98) primary color, subtle executive gold (#ff9800) accent on first letter M, minimalist design, professional corporate identity, scalable vector style, centered composition, white background, --ar 1:1 --v 6 --stylize 500 --q 2 --no text, watermark
```

#### Logo Mark (Icon Only)
```
Minimalist logo mark for "Movemental", abstract geometric foundation element, stacked rectangles or platform lines suggesting stability and infrastructure, deep slate blue (#627d98) with subtle executive gold (#ff9800) accent, architectural precision, clean lines, professional, scalable, works at small sizes, white background, --ar 1:1 --v 6 --stylize 400 --q 2 --no text, watermark
```

#### Logo Lockup (Full)
```
Complete "Movemental" logo, wordmark with icon mark, modern corporate identity, Poppins-style typography, deep slate blue (#627d98) and executive gold (#ff9800) color scheme, horizontal lockup, professional spacing, minimalist aesthetic, executive authority feel, white background, --ar 16:9 --v 6 --stylize 500 --q 2 --no text, watermark
```

### Icon Set Prompts

#### Leadership Icons
```
Set of 12 minimalist vector icons representing leadership concepts: chess king, chessboard strategy, upward growth arrow, bar chart, mountain peak, compass, lighthouse, crown, shield, trophy, star, target, uniform line weight 2px, deep slate blue (#627d98) monochrome, flat design, consistent style, scalable, works at 16px, --ar 1:1 --v 6 --stylize 400 --q 2
```

#### Platform Icons
```
Set of 8 minimalist icons for digital platform: content management, analytics dashboard, user profile, settings gear, search magnifying glass, notification bell, share arrow, network connection, deep slate blue (#627d98) with executive gold (#ff9800) accents, uniform style, flat design, --ar 1:1 --v 6 --stylize 400 --q 2
```

### Illustration Prompts

#### Hero Illustration
```
Abstract illustration of movemental leadership, confident executive figure standing on elevated platform overlooking interconnected network of organizations, modern vector art style, deep slate blue (#627d98) primary with executive gold (#ff9800) highlights, professional corporate aesthetic, centered composition, clean white background, --ar 16:9 --v 6 --stylize 750
```

#### Network Amplification Visualization
```
Professional data visualization showing network amplification effects, interconnected nodes with growth metrics, bar charts and line graphs integrated, deep slate blue (#627d98) and executive gold (#ff9800) color scheme, modern infographic style, clean typography, white background, --ar 16:9 --v 6 --stylize 600
```

#### Platform Infrastructure Illustration
```
Architectural-style illustration of digital platform infrastructure, layered foundation elements suggesting stability and scalability, geometric shapes, deep slate blue (#627d98) gradient, executive gold (#ff9800) accent lines, professional technical drawing style, minimalist, --ar 16:9 --v 6 --stylize 650
```

### Media/Photography Prompts

#### Executive Office Scene
```
Modern executive office interior, floor-to-ceiling windows overlooking city skyline, minimalist furniture, deep slate blue (#627d98) and warm gray color scheme, natural daylight, professional photography, shallow depth of field, warm ambient lighting, --ar 16:9 --v 6 --stylize 200
```

#### Leadership Portrait Style
```
Professional portrait of confident business leader, modern corporate setting, deep slate blue (#627d98) suit, executive gold (#ff9800) tie accent, natural studio lighting, professional headshot style, shallow depth of field, warm tones, --ar 4:3 --v 6 --stylize 300
```

---

## Direction 2: Network Intelligence Prompts (RECOMMENDED)

### Logo Prompts

#### Primary Logo (Network + AI)
```
"Movemental" logo, wordmark in Space Grotesk-style modern geometric sans-serif, interconnected network nodes forming letter M, electric blue (#0ea5e9) and AI purple (#a855f7) gradient, subtle data flow lines, tech-forward aesthetic, minimalist yet dynamic, scalable vector style, centered, dark slate background (#1e293b), --ar 1:1 --v 6 --stylize 600 --q 2 --no text, watermark
```

#### Logo Mark (Network Nodes)
```
Abstract logo mark, interconnected nodes forming network pattern with subtle AI data flow, electric blue (#0ea5e9) primary, AI purple (#a855f7) accent, network green (#22c55e) connection lines, glowing neon effect, modern tech aesthetic, scalable, works at small sizes, dark background, --ar 1:1 --v 6 --stylize 650 --q 2 --no text, watermark
```

#### Animated Logo Concept (Static Frame)
```
"Movemental" logo with network intelligence aesthetic, wordmark with animated network nodes in static frame, electric blue (#0ea5e9) to AI purple (#a855f7) gradient, pulsing connection lines, network green (#22c55e) data streams, futuristic tech style, dark slate background, --ar 1:1 --v 6 --stylize 700 --q 2 --no text, watermark
```

### Icon Set Prompts

#### AI & Network Icons
```
Set of 16 minimalist tech icons: neural network nodes, data flow arrows, AI brain, cloud computing, network connection, machine learning symbol, algorithm flowchart, database, API connection, blockchain link, quantum computing, neural pathway, data stream, AI sparkle, network hub, connectivity graph, electric blue (#0ea5e9) and AI purple (#a855f7) color scheme, flat design with subtle glow effects, uniform style, scalable, --ar 1:1 --v 6 --stylize 500 --q 2
```

#### Platform Feature Icons
```
Set of 12 icons for AI-powered platform features: voice preservation, SEO optimization, content generation, network amplification, analytics dashboard, cross-reference, transparency badge, AI assistant, network effects, content repurposing, audience insights, collaboration, electric blue (#0ea5e9), AI purple (#a855f7), network green (#22c55e) color palette, modern flat design, consistent style, --ar 1:1 --v 6 --stylize 500 --q 2
```

### Illustration Prompts

#### Network Effects Hero Visualization
```
Dynamic 3D visualization of network amplification, interconnected nodes glowing with electric blue (#0ea5e9) and AI purple (#a855f7), data streams flowing between nodes in network green (#22c55e), neural network pattern, futuristic tech aesthetic, dark background, sense of motion and connectivity, --ar 16:9 --v 6 --stylize 800
```

#### AI Intelligence Illustration
```
Abstract illustration of AI intelligence preserving human voice, stylized brain composed of network nodes, electric blue (#0ea5e9) and AI purple (#a855f7) gradient, network green (#22c55e) connection lines, modern digital art style, tech-forward, centered composition, dark slate background, --ar 16:9 --v 6 --stylize 750
```

#### Network Amplification Metrics
```
Infographic-style illustration showing 28x-500x network amplification, animated data visualization, bar charts and network graphs, electric blue (#0ea5e9), AI purple (#a855f7), network green (#22c55e) color scheme, modern tech aesthetic, clean typography, professional data visualization, --ar 16:9 --v 6 --stylize 650
```

#### Platform Capabilities Showcase
```
Isometric illustration of AI-powered platform features, interconnected modules showing content management, AI assistance, network effects, analytics, electric blue (#0ea5e9) and AI purple (#a855f7) color scheme, network green (#22c55e) accents, modern 3D render style, tech-forward, --ar 16:9 --v 6 --stylize 700
```

### Media/Photography Prompts

#### Tech Workspace Scene
```
Modern tech workspace, multiple screens showing network visualizations and AI interfaces, electric blue (#0ea5e9) and AI purple (#a855f7) screen glows, clean minimalist setup, natural and screen lighting mix, professional tech photography, shallow depth of field, --ar 16:9 --v 6 --stylize 250
```

#### Network Visualization Photography
```
Close-up photograph of network node visualization on high-resolution display, electric blue (#0ea5e9) and AI purple (#a855f7) glowing connections, network green (#22c55e) data streams, dark environment, screen glow effect, professional tech photography, --ar 16:9 --v 6 --stylize 300
```

---

## Direction 3: Scenius Collective Prompts

### Logo Prompts

#### Primary Logo (Community Connection)
```
"Movemental" logo, wordmark in DM Sans-style friendly modern sans-serif, interconnected circles forming letter M, growth green (#22c55e) primary, warm amber (#d97706) accent, community blue (#0ea5e9) connection lines, organic flow, collaborative aesthetic, approachable yet professional, scalable, white background, --ar 1:1 --v 6 --stylize 550 --q 2 --no text, watermark
```

#### Logo Mark (Interconnected Circles)
```
Abstract logo mark, interconnected circles with organic flow lines, growth green (#22c55e) primary, warm amber (#d97706) and community blue (#0ea5e9) accents, friendly organic shapes, collaborative community feel, scalable, works at small sizes, white or warm neutral background, --ar 1:1 --v 6 --stylize 600 --q 2 --no text, watermark
```

#### Community Logo Lockup
```
Complete "Movemental" logo with community indicator, wordmark with interconnected circles mark, small community avatars integrated, growth green (#22c55e), warm amber (#d97706), community blue (#0ea5e9) color scheme, friendly collaborative aesthetic, horizontal lockup, --ar 16:9 --v 6 --stylize 550 --q 2 --no text, watermark
```

### Icon Set Prompts

#### Community & Collaboration Icons
```
Set of 14 friendly icons representing community and collaboration: group of people, handshake, shared goal target, conversation bubble, network connection, collaborative project, community hub, partnership, collective growth, shared resources, mutual support, cross-reference, relationship link, scenius symbol, growth green (#22c55e), warm amber (#d97706), community blue (#0ea5e9) color palette, rounded friendly style, consistent design, scalable, --ar 1:1 --v 6 --stylize 500 --q 2
```

#### Movement Icons
```
Set of 10 icons for movement concepts: organic growth, transformation arrow, community circle, collaborative handshake, shared path, collective impact, network relationship, mutual elevation, scenius collaboration, movement multiplication, growth green (#22c55e) primary with warm amber (#d97706) and community blue (#0ea5e9) accents, organic shapes, friendly aesthetic, --ar 1:1 --v 6 --stylize 550 --q 2
```

### Illustration Prompts

#### Scenius Collaboration Scene
```
Warm illustration of diverse group of movemental leaders collaborating, gathered around table with laptops and documents, growth green (#22c55e), warm amber (#d97706), community blue (#0ea5e9) color accents, friendly inclusive atmosphere, modern co-working space, organic shapes, collaborative energy, --ar 16:9 --v 6 --stylize 750
```

#### Network Relationships Visualization
```
Organic relationship graph showing interconnected movemental leaders, growth green (#22c55e) connection lines, warm amber (#d97706) and community blue (#0ea5e9) node accents, friendly organic shapes, collaborative network pattern, warm background, --ar 16:9 --v 6 --stylize 700
```

#### Community Growth Illustration
```
Illustration of collective growth and amplification, organic shapes showing multiplication, growth green (#22c55e) primary, warm amber (#d97706) highlights, community blue (#0ea5e9) connections, friendly collaborative aesthetic, movement-focused, --ar 16:9 --v 6 --stylize 750
```

### Media/Photography Prompts

#### Collaborative Workspace
```
Warm photograph of diverse team collaborating in modern co-working space, natural light, indoor plants, growth green (#22c55e) and warm amber (#d97706) color accents in decor, friendly atmosphere, professional but approachable, shallow depth of field, --ar 16:9 --v 6 --stylize 200
```

#### Community Gathering
```
Photograph of diverse group of people in collaborative setting, warm lighting, growth green (#22c55e), warm amber (#d97706), community blue (#0ea5e9) color accents, inclusive atmosphere, natural interactions, professional documentary style, --ar 16:9 --v 6 --stylize 250
```

---

## Advanced Prompting Techniques

### Combining Directions (Hybrid Approach)

Since we recommend Direction 2 with elements from Directions 1 and 3, here are hybrid prompts:

#### Hybrid Logo (Network Intelligence + Premium Polish)
```
"Movemental" logo, wordmark in Space Grotesk-style modern geometric sans-serif, interconnected network nodes forming letter M with subtle architectural foundation elements, electric blue (#0ea5e9) and AI purple (#a855f7) gradient with executive gold (#ff9800) premium accent, tech-forward with sophisticated polish, scalable, dark slate background, --ar 1:1 --v 6 --stylize 650 --q 2 --no text, watermark
```

#### Hybrid Illustration (Network + Community)
```
Dynamic network visualization with community warmth, interconnected nodes in electric blue (#0ea5e9) and AI purple (#a855f7) with growth green (#22c55e) community connections, warm amber (#d97706) human touch accents, tech-forward with collaborative feel, dark background with warm accents, --ar 16:9 --v 6 --stylize 750
```

### Iteration Prompts

Use these to refine your results:

#### If Too Abstract
```
[Previous prompt], more detailed, precise, specific elements, clearer definition, less abstract
```

#### If Too Literal
```
[Previous prompt], more stylized, artistic interpretation, creative approach, less literal
```

#### If Colors Off
```
[Previous prompt], exact colors: [specific hex codes], color accuracy important, match color palette precisely
```

#### If Composition Wrong
```
[Previous prompt], centered composition, balanced layout, symmetrical, proper spacing
```

### Style Consistency Prompts

To ensure all assets match:

#### Style Reference Prompt
```
[Asset description], consistent with Movemental brand style: [describe key style elements from chosen direction], maintain color palette: [list colors], uniform aesthetic across all assets
```

---

## Prompt Optimization Checklist

Before generating, ensure your prompt includes:

- [ ] **Subject**: Clear description of what you want
- [ ] **Style**: Specific art style or design movement
- [ ] **Colors**: Exact hex codes or color names
- [ ] **Composition**: Layout and framing
- [ ] **Technical Details**: Quality, resolution, format
- [ ] **Parameters**: `--ar`, `--v 6`, `--stylize`, `--q`
- [ ] **Exclusions**: `--no text, watermark` for logos (v6: single parameter with commas)
- [ ] **Brand Alignment**: References to Movemental's positioning

---

## Workflow Recommendations

### Step 1: Generate Variations
Start with your base prompt and generate 4 variations.

### Step 2: Select and Upscale
Choose your favorite (U1-U4) and upscale it.

### Step 3: Create Variations (If Needed)
If you want variations of the upscaled version, use V1-V4.

### Step 4: Refine Prompt
Based on results, refine your prompt and regenerate.

### Step 5: Final Selection
Select final version and download.

### Step 6: Post-Processing
- Remove any unwanted elements in design software
- Adjust colors to match exact brand palette
- Optimize for web use
- Create variations (light/dark backgrounds, etc.)

---

## Common Issues and Solutions

### Issue: Unwanted Text in Logos
**Solution**: Add `--no text, watermark, signature` to prompt (v6: single parameter with comma-separated values). Also ensure brand name is in quotes: `"Movemental" logo` for clarity.

### Issue: Colors Don't Match Brand
**Solution**: Specify exact hex codes: "electric blue (#0ea5e9)" or use color names with hex codes

### Issue: Text Not Rendering Correctly (If You Want Text)
**Solution**: Use double quotes around text: `"Movemental"`, add `--style raw` parameter, and lower `--stylize` to 50-200. Keep text short (3-4 words max).

### Issue: Too Abstract or Too Literal
**Solution**: Adjust `--stylize` parameter (lower = more literal, higher = more artistic)

### Issue: Inconsistent Style Across Assets
**Solution**: Create a style reference prompt and include it in all asset prompts

### Issue: Poor Quality at Small Sizes
**Solution**: Use `--q 2` for higher quality, specify "scalable", "works at small sizes"

---

## Best Practices Summary

1. **Be Specific**: Detailed prompts produce better results
2. **Use Exact Colors**: Include hex codes for brand colors
3. **Specify Style**: Reference art movements, designers, or styles
4. **Include Parameters**: Always use `--v 6`, appropriate `--ar`, `--stylize`
5. **Use Quotations Properly**: Use double quotes around brand names (`"Movemental"`) and text that should appear in images
6. **Iterate**: Refine prompts based on results
7. **Maintain Consistency**: Use style reference prompts across all assets
8. **Post-Process**: Always refine in design software for final use
9. **Test Scalability**: Ensure logos/icons work at small sizes
10. **Exclude Unwanted**: Use `--no` with comma-separated values (v6: `--no text, watermark` not `--no text --no watermark`)
11. **Quality Matters**: Use `--q 2` for final logo/icon outputs
12. **Text Rendering**: If you want text in images, use `--style raw` and lower `--stylize` (50-200) for accuracy

---

## Next Steps

1. **Select Primary Direction**: Choose Direction 2 (Network Intelligence) or hybrid approach
2. **Generate Test Assets**: Start with logo prompts to establish style
3. **Refine Based on Results**: Adjust prompts based on initial outputs
4. **Create Style Guide**: Document successful prompts for consistency
5. **Build Asset Library**: Generate full set of logos, icons, illustrations, media
6. **Post-Process**: Refine all assets in design software (Figma, Illustrator, etc.)
7. **Implement**: Use assets in your React/Next.js/Shadcn/Tailwind implementation

---

*This guide provides comprehensive Midjourney prompting strategies specifically tailored to Movemental's three branding directions. Use these prompts as starting points and refine based on your specific needs and results.*

