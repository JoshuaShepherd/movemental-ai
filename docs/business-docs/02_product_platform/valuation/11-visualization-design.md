<div style="display: flex; justify-content: space-between; max-width: 8.5in; margin: 0 auto;">

<a href="10-conclusions.md"
style="color: #1a5f96; text-decoration: none;">← Previous: 10
Conclusions</a><a href="index.md"
style="color: #1a5f96; text-decoration: none; font-weight: 600;">Index</a>

</div>

<div class="section">

## Section 9: Visualization Notes and Print Document Execution Prompt

**📊 VISUALIZATION OPPORTUNITIES THROUGHOUT DOCUMENT**:

This report includes visualization notes (📊) indicating opportunities
to enhance understanding through charts and graphs. See specific notes
in:

- Creator Revenue Assumptions (Section 1) - Power law distributions,
  Alan/Brad benchmarks
- Financial Model Assumptions (Section 1) - Overhead efficiency, unit
  economics, margin analysis
- AI Consulting Revenue (Section 1) - Consulting revenue waterfall,
  growth timeline
- Valuation Summary Table (Section 4) - Trajectory charts, scenario
  comparisons

**PROMPT FOR PRINT DOCUMENT EXECUTION**:

**Objective**: Transform this valuation report into a professional
print-ready document using strategic visualizations, typography, and
layout design.

**Key Requirements**:

1.  Create all visualizations noted with 📊 using Python/R or modern
    charting libraries
2.  Use professional typography (IBM Plex Sans/Serif or Source Sans
    Pro/Serif)
3.  Establish clear visual hierarchy (H1/H2/H3, consistent styling)
4.  Optimize for print (300+ DPI, CMYK color space, test grayscale)
5.  Include cover page, table of contents, proper page breaks
6.  Format all tables with alternating row colors and captions
7.  Create valuation trajectory as opening visual hook
8.  Add confidence intervals, scenario comparisons, and risk
    visualizations
9.  Export to high-quality PDF with embedded fonts
10. Maintain source files (Python/R scripts, data files) for future
    updates

**Technical Stack**: Python (Pandas/Matplotlib/Seaborn) or R (ggplot2)
for charts, LaTeX or InDesign for layout, PDF export at 300+ DPI.

**Success Criteria**: Document should read as cohesive HBR-level
professional analysis where visualizations enhance the narrative, all
numbers are supported, and print version maintains readability.

**See detailed visualization specifications and execution notes in each
section marked with 📊.**

------------------------------------------------------------------------

## PROFESSIONAL DESIGN SPECIFICATIONS AND HTML/CSS TO PDF APPROACH

### Design Philosophy and Approach

**Overall Design Philosophy**:

Create a document that feels authoritative, professional, and
educational—matching HBR case study quality. The design should support
readability, guide the reader through complex financial concepts, and
make data accessible through strategic use of typography, spacing, and
visualizations.

**Design Principles**:

1.  **Clarity over decoration**: Every visual element should serve the
    narrative
2.  **Hierarchy through typography**: Use size, weight, and spacing to
    guide reading flow
3.  **Consistency**: Establish design system and apply consistently
    throughout
4.  **Accessibility**: Ensure readability in both digital and print
    formats
5.  **Data visualization as storytelling**: Charts should enhance
    understanding, not just display numbers

### Technical Stack: HTML/CSS → PDF Workflow

**Recommended Approach**:

1.  **HTML/CSS source document** (single-page application or multi-page
    with navigation)
2.  **CSS print media queries** for print optimization
3.  **JavaScript for interactivity** (e.g. collapsible sections, chart
    interactions)
4.  **Chart libraries** (Chart.js, D3.js, or Observable Plot) for
    visualizations
5.  **PDF generation** via browser Print-to-PDF or headless Chrome
    (Puppeteer)

**Why HTML/CSS First?**:

- **Flexibility**: Easy to update content and styling
- **Interactivity**: Can create expandable sections, tooltips,
  interactive charts
- **Maintainability**: Single source of truth for both digital and print
  versions
- **Accessibility**: Web standards ensure screen reader compatibility
- **Modern workflow**: Easier to version control, collaborate, and
  iterate

### Design System Specifications

#### Typography

**Font Stack**:

\`\`\`css

/\* Primary Body Font - Sans Serif for readability \*/

body {

font-family: 'IBM Plex Sans', 'Source Sans Pro', -apple-system,
BlinkMacSystemFont, 'Segoe UI', sans-serif;

font-size: 11pt; /\* Print-friendly base size \*/

line-height: 1.6; /\* Comfortable reading line height \*/

color: \#1a1a1a; /\* High contrast for print \*/

}

/\* Headers - Serif for authority and academic tone \*/

h1, h2, .section-title {

font-family: 'IBM Plex Serif', 'Source Serif Pro', 'Merriweather',
Georgia, serif;

font-weight: 600;

color: \#0a0a0a;

}

h1 { font-size: 28pt; margin-top: 24pt; margin-bottom: 12pt; }

h2 { font-size: 22pt; margin-top: 20pt; margin-bottom: 10pt; }

h3 { font-size: 18pt; margin-top: 16pt; margin-bottom: 8pt; }

h4 { font-size: 14pt; margin-top: 12pt; margin-bottom: 6pt; }

\`\`\`

**Typography Hierarchy**:

- **H1 (Section titles)**: 28pt, bold, serif - Section breaks
- **H2 (Subsection titles)**: 22pt, semi-bold, serif - Major subsections
- **H3 (Sub-subsection titles)**: 18pt, semi-bold, serif - Supporting
  sections
- **Body text**: 11pt, regular, sans-serif - Main content
- **Callout boxes**: 10pt, italic, sans-serif - Key insights, warnings
- **Captions**: 9pt, regular, sans-serif - Table/figure captions
- **Footnotes**: 9pt, regular, sans-serif - References and notes

#### Color Palette

\`\`\`css

/\* Primary Brand Colors (adjust based on Movemental branding) \*/

:root {

/\* Primary - Use for headers, key metrics, highlights \*/

--color-primary: \#1a5f96; /\* Professional blue \*/

/\* Secondary - Use for accents, links \*/

--color-secondary: \#2d8659; /\* Complementary green \*/

/\* Neutral Grays - Use for text, backgrounds \*/

--color-text-primary: \#1a1a1a;

--color-text-secondary: \#4a4a4a;

--color-text-tertiary: \#6a6a6a;

--color-bg-light: \#f8f8f8;

--color-bg-medium: \#e8e8e8;

--color-border: \#d0d0d0;

/\* Status Colors - Use for risk levels, confidence indicators \*/

--color-high-risk: \#c53030; /\* Red for high uncertainty \*/

--color-medium-risk: \#d69e2e; /\* Yellow/amber for medium uncertainty
\*/

--color-low-risk: \#38a169; /\* Green for low uncertainty \*/

/\* Chart Colors - Accessible palette that works in color and grayscale
\*/

--chart-color-1: \#1a5f96;

--chart-color-2: \#2d8659;

--chart-color-3: \#805ad5;

--chart-color-4: \#d69e2e;

--chart-color-5: \#c53030;

--chart-color-6: \#319795;

}

\`\`\`

**Color Usage Guidelines**:

- Use primary blue for section headers and key metrics
- Use green for positive indicators (growth, success)
- Use red/amber/green for risk level indicators (high/medium/low)
- Ensure all colors have sufficient contrast (WCAG AA minimum, AAA
  preferred)
- Test in grayscale: All information must be readable in black-and-white
  print

#### Layout and Spacing

**Page Specifications**:

\`\`\`css

@page {

size: 8.5in 11in; /\* US Letter \*/

margin: 1in 0.875in; /\* 1" top/bottom, 0.875" left/right \*/

@top-center {

content: "Movemental Valuation Report";

font-size: 9pt;

color: var(--color-text-tertiary);

}

@bottom-center {

content: counter(page);

font-size: 9pt;

color: var(--color-text-tertiary);

}

}

\`\`\`

**Spacing System**:

\`\`\`css

/\* Consistent spacing scale \*/

--spacing-xs: 4pt; /\* Tight spacing (between related items) \*/

--spacing-sm: 8pt; /\* Small spacing (between list items) \*/

--spacing-md: 16pt; /\* Medium spacing (between paragraphs) \*/

--spacing-lg: 24pt; /\* Large spacing (between sections) \*/

--spacing-xl: 32pt; /\* Extra large (major section breaks) \*/

\`\`\`

**Grid System**:

- Use CSS Grid or Flexbox for multi-column layouts
- Single column for body text (max-width: 6.5" for optimal readability)
- Two-column for comparison tables or side-by-side content
- Full-width for large visualizations

#### Component Specifications

**Tables**:

\`\`\`css

table {

width: 100%;

border-collapse: collapse;

margin: var(--spacing-md) 0;

font-size: 10pt;

}

table th {

background-color: var(--color-primary);

color: white;

padding: 8pt 12pt;

text-align: left;

font-weight: 600;

border-bottom: 2pt solid var(--color-primary);

}

table td {

padding: 6pt 12pt;

border-bottom: 1pt solid var(--color-border);

}

table tr:nth-child(even) {

background-color: var(--color-bg-light);

}

table caption {

font-size: 9pt;

color: var(--color-text-secondary);

margin-top: var(--spacing-sm);

text-align: left;

font-style: italic;

}

\`\`\`

**Callout Boxes** (Key Insights, Warnings, Important Notes):

\`\`\`css

.callout {

border-left: 4pt solid var(--color-primary);

background-color: var(--color-bg-light);

padding: var(--spacing-md);

margin: var(--spacing-lg) 0;

border-radius: 4pt;

}

.callout.warning {

border-left-color: var(--color-medium-risk);

background-color: \#fef3c7;

}

.callout.success {

border-left-color: var(--color-low-risk);

background-color: \#d1fae5;

}

\`\`\`

**Visualization Containers**:

\`\`\`css

.chart-container {

width: 100%;

max-width: 100%;

margin: var(--spacing-lg) 0;

padding: var(--spacing-md);

background-color: white;

border: 1pt solid var(--color-border);

border-radius: 4pt;

}

.chart-container figcaption {

font-size: 9pt;

color: var(--color-text-secondary);

margin-top: var(--spacing-sm);

text-align: center;

font-style: italic;

}

\`\`\`

**Valuation Highlights** (Large number displays):

\`\`\`css

.valuation-display {

font-family: 'IBM Plex Serif', serif;

font-size: 32pt;

font-weight: 700;

color: var(--color-primary);

text-align: center;

margin: var(--spacing-xl) 0;

}

.valuation-range {

font-size: 18pt;

color: var(--color-text-secondary);

margin-top: var(--spacing-xs);

}

\`\`\`

### Print Media Queries

**Critical CSS for Print**:

\`\`\`css

@media print {

/\* Ensure proper page breaks \*/

h1, h2 {

page-break-after: avoid;

break-after: avoid;

}

/\* Prevent orphans and widows \*/

p, li {

orphans: 3;

widows: 3;

}

/\* Keep tables together \*/

table {

page-break-inside: avoid;

break-inside: avoid;

}

/\* Ensure charts/figures stay with captions \*/

figure {

page-break-inside: avoid;

break-inside: avoid;

}

/\* Adjust colors for print \*/

body {

background: white;

color: black;

}

/\* Remove interactive elements \*/

.interactive {

display: none;

}

/\* Show URLs in links \*/

a\[href\]::after {

content: " (" attr(href) ")";

font-size: 8pt;

color: var(--color-text-tertiary);

}

/\* Optimize for black and white \*/

.chart-container {

border: 1pt solid black;

}

/\* Ensure sufficient margins \*/

@page {

margin: 1in;

}

}

\`\`\`

### HTML Structure Template

**Document Structure**:

\`\`\`html

<div class="cover-page">

# Movemental Valuation Report

A Strategic Framework for Understanding Platform Value Creation

</div>

<div class="toc">

</div>

<div id="executive-summary" class="section section">

</div>

<div id="assumptions" class="section section">

</div>

<div style="display: flex; justify-content: space-between; max-width: 8.5in; margin: 0 auto;">

<a href="10-conclusions.md"
style="color: #1a5f96; text-decoration: none;">← Previous: 10
Conclusions</a><a href="index.md"
style="color: #1a5f96; text-decoration: none; font-weight: 600;">Index</a>

</div>

</div>
