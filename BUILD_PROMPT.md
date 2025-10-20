# BUILD PROMPT - About Me Site

## Overview

Build a complete static website from markdown content files following design specifications.

**Input**: Markdown files in `/content/` + design specs in `/design/`
**Output**: Complete static HTML/CSS/JS website in `/build/`
**Constraint**: Pure HTML/CSS/JavaScript - NO frameworks

---

## Input Files

### Content (Markdown)
```
content/
├── landing.md
├── projects/
│   ├── sparkii-rag.md
│   ├── wotc-tax.md
│   └── israeli-tech.md
├── thinking/
│   ├── how-i-learn.md
│   ├── the-disconnect.md
│   └── what-im-not.md
├── tech/
│   └── stack.md
└── about/
    └── full-story.md
```

### Design Specifications
```
design/
├── design-system.md (colors, typography, components)
└── navigation-structure.md (site map, URLs, navigation)
```

---

## Output Structure

```
build/
├── index.html (landing page)
├── projects/
│   ├── index.html
│   ├── sparkii-rag.html
│   ├── wotc-tax.html
│   └── israeli-tech.html
├── thinking/
│   ├── index.html
│   ├── how-i-learn.html
│   ├── the-disconnect.html
│   └── what-im-not.html
├── tech/
│   └── index.html
├── about/
│   └── full-story.html
├── styles.css (single CSS file)
├── script.js (single JS file)
├── sitemap.xml
└── 404.html
```

---

## Technical Requirements

### 1. HTML Generation

#### Parse Markdown
- Read all `.md` files from `/content/`
- Convert markdown to semantic HTML
- Preserve heading hierarchy (h1 → h2 → h3)
- Convert links, lists, code blocks, bold, italic

#### Semantic HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page Title] | Mordechai</title>
  <meta name="description" content="[First paragraph or summary]">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <header class="site-header">
    <nav class="site-nav">
      <!-- Navigation from design/navigation-structure.md -->
    </nav>
  </header>

  <!-- Breadcrumbs if not landing page -->
  <nav class="breadcrumbs">...</nav>

  <main class="container" id="main-content">
    <!-- Content from markdown -->
  </main>

  <footer class="site-footer">
    <!-- Footer links -->
  </footer>

  <script src="/script.js"></script>
</body>
</html>
```

#### Expandable Sections
When markdown contains heading like:
```markdown
## Expand: Technical Details
```

Convert to:
```html
<details class="expandable">
  <summary>Technical Details</summary>
  <div class="expandable-content">
    <!-- Content under this heading -->
  </div>
</details>
```

**Pattern**: Any heading starting with "Expand:" becomes expandable section.

#### Code Blocks
```markdown
```python
def example():
    return "formatted code"
```
```

Becomes:
```html
<pre><code class="language-python">def example():
    return "formatted code"
</code></pre>
```

#### Tech Tags
When markdown contains:
```markdown
## Tech Stack Tags
`python` `fastapi` `postgresql` `pgvector`
```

Convert to:
```html
<div class="tech-tags">
  <a href="/tech#python" class="tag">python</a>
  <a href="/tech#fastapi" class="tag">fastapi</a>
  <a href="/tech#postgresql" class="tag">postgresql</a>
  <a href="/tech#pgvector" class="tag">pgvector</a>
</div>
```

---

### 2. CSS Generation (styles.css)

#### Structure
```css
/* CSS Variables (from design-system.md) */
:root { ... }

/* Base Styles */
* { box-sizing: border-box; }
body { ... }

/* Typography */
h1, h2, h3 { ... }
p { ... }
code, pre { ... }

/* Layout */
.container { ... }
.site-header { ... }
.site-nav { ... }
.breadcrumbs { ... }

/* Components */
.card { ... }
.expandable { ... }
.depth-meter { ... }
.tech-tags { ... }
.tag { ... }

/* Utilities */
.skip-link { ... }

/* Responsive */
@media (max-width: 640px) { ... }
@media (min-width: 641px) { ... }

/* Dark Mode */
@media (prefers-color-scheme: dark) { ... }

/* Accessibility */
@media (prefers-reduced-motion: reduce) { ... }
```

#### Copy ALL styles from design/design-system.md
- CSS variables for colors
- Typography settings
- Component styles (cards, expandables, tags)
- Layout and responsive rules
- Dark mode support
- Accessibility features

---

### 3. JavaScript Generation (script.js)

#### Features Required

**1. Depth Meter Tracking**
```javascript
// Calculate page depth based on URL
const depthMap = {
  '/': 0,
  '/projects/': 1,
  '/thinking/': 1,
  '/tech/': 1,
  '/projects/sparkii-rag.html': 2,
  '/projects/wotc-tax.html': 2,
  '/thinking/how-i-learn.html': 2,
  '/about/full-story.html': 4
};

function updateDepthMeter() {
  const path = window.location.pathname;
  const depth = depthMap[path] || 0;

  // Update depth meter dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index <= depth);
  });
}
```

**2. Expandable Section State**
```javascript
// Remember which sections user expanded
function saveExpandedState() {
  const expanded = [];
  document.querySelectorAll('details[open]').forEach(detail => {
    expanded.push(detail.querySelector('summary').textContent);
  });
  localStorage.setItem('expandedSections', JSON.stringify(expanded));
}

function restoreExpandedState() {
  const expanded = JSON.parse(localStorage.getItem('expandedSections') || '[]');
  // Restore open state based on saved data
}
```

**3. Smooth Scrolling for Hash Links**
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
```

**4. Mobile Menu Toggle** (if needed)
```javascript
// If nav has more than 4 items on mobile, make collapsible
function setupMobileNav() {
  // Implementation
}
```

#### Complete script.js Structure
```javascript
(function() {
  'use strict';

  // Depth meter
  function updateDepthMeter() { ... }

  // Expandable sections
  function saveExpandedState() { ... }
  function restoreExpandedState() { ... }

  // Smooth scrolling
  function setupSmoothScrolling() { ... }

  // Initialize on load
  document.addEventListener('DOMContentLoaded', function() {
    updateDepthMeter();
    restoreExpandedState();
    setupSmoothScrolling();
  });

  // Save state before leaving
  window.addEventListener('beforeunload', function() {
    saveExpandedState();
  });
})();
```

---

### 4. Category Index Pages

#### Example: projects/index.html

Read all files in `content/projects/`, extract:
- Title (h1 or filename)
- Card Summary (section marked "Card Summary (Layer 1)")
- Quick Facts (section marked "Quick Facts (Layer 1)")

Generate grid of cards:
```html
<div class="cards-grid">
  <article class="card">
    <h2 class="card-title">Sparkii RAG System</h2>
    <p class="card-summary">
      Production RAG system for 253,432 AI conversation messages...
    </p>
    <div class="card-meta">
      <span>Scale: 253K messages</span>
      <span>Tech: Stella, pgvector, FastAPI</span>
      <span>Status: Production</span>
    </div>
    <a href="/projects/sparkii-rag.html" class="card-link">Read more →</a>
  </article>

  <!-- More cards... -->
</div>
```

**Do the same for**:
- `thinking/index.html` - All thinking pieces as cards
- `tech/index.html` - Tech stack with filtering

---

### 5. Landing Page (index.html)

Special page - use content from `content/landing.md`:

```html
<main class="container landing">
  <section class="hero">
    <h1>[Hero Line from landing.md]</h1>
    <p class="subtext">[Subtext from landing.md]</p>
  </section>

  <section class="doorways">
    <a href="/projects/" class="doorway">
      <h2>What I've Built</h2>
      <p>[Description from landing.md]</p>
    </a>

    <a href="/thinking/" class="doorway">
      <h2>How I Think</h2>
      <p>[Description from landing.md]</p>
    </a>

    <a href="/tech/" class="doorway">
      <h2>Tech I Use</h2>
      <p>[Description from landing.md]</p>
    </a>
  </section>
</main>
```

**Style doorways as large clickable cards** (see design-system.md for styling).

---

### 6. Navigation Components

#### Header (All Pages)
```html
<header class="site-header">
  <nav class="site-nav">
    <a href="/" class="logo">mordechai.dev</a>
    <div class="nav-links">
      <a href="/projects/">Projects</a>
      <a href="/thinking/">Thinking</a>
      <a href="/tech/">Tech</a>
      <a href="https://github.com/YOUR_GITHUB" target="_blank">GitHub ↗</a>
      <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank">LinkedIn ↗</a>
    </div>
  </nav>
</header>
```

**Highlight current section** - add class `.active` to current page's nav link.

#### Breadcrumbs (Non-Landing Pages)
```html
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="/">Home</a> >
  <a href="/projects/">Projects</a> >
  <span aria-current="page">Sparkii RAG</span>
</nav>
```

**Generate breadcrumbs automatically** based on URL path.

#### Footer (All Pages)
```html
<footer class="site-footer">
  <div class="footer-links">
    <a href="https://github.com/YOUR_GITHUB">GitHub</a>
    <a href="https://linkedin.com/in/YOUR_LINKEDIN">LinkedIn</a>
    <a href="mailto:YOUR_EMAIL">Email</a>
  </div>
  <div class="footer-meta">
    <a href="/about/full-story.html">Complete Story</a> |
    Last updated: [CURRENT_DATE]
  </div>
</footer>
```

---

### 7. Depth Meter Component

Include on all pages except landing:

```html
<div class="depth-meter" aria-label="Content depth indicator">
  <span class="depth-label">Depth:</span>
  <span class="depth-dots" role="img" aria-label="Depth level indicator">
    <span class="dot active">●</span>
    <span class="dot">○</span>
    <span class="dot">○</span>
    <span class="dot">○</span>
  </span>
</div>
```

JavaScript updates active dots based on page depth (see navigation-structure.md for depth levels).

---

### 8. Sitemap Generation (sitemap.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mordechai.dev/</loc>
    <lastmod>[DATE]</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mordechai.dev/projects/sparkii-rag</loc>
    <lastmod>[DATE]</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- All other pages -->
</urlset>
```

Generate automatically from all HTML files created.

---

### 9. 404 Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Page Not Found | Mordechai</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <main class="container">
    <h1>404 - Page Not Found</h1>
    <p>This page doesn't exist. Try one of these:</p>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/projects/">Projects</a></li>
      <li><a href="/thinking/">Thinking</a></li>
      <li><a href="/tech/">Tech</a></li>
    </ul>
  </main>
</body>
</html>
```

---

## Content Processing Rules

### Markdown Parsing
- **Headings**: `#` → `<h1>`, `##` → `<h2>`, etc.
- **Bold**: `**text**` → `<strong>text</strong>`
- **Italic**: `*text*` → `<em>text</em>`
- **Links**: `[text](url)` → `<a href="url">text</a>`
- **Code inline**: `` `code` `` → `<code>code</code>`
- **Code blocks**: ` ```lang ... ``` ` → `<pre><code class="language-lang">...</code></pre>`
- **Lists**: `-` or `*` → `<ul><li>`, `1.` → `<ol><li>`

### Special Sections

**"Card Summary (Layer 1)"** - Extract for card display on index pages
**"Quick Facts (Layer 1)"** - Extract for card metadata
**"Expand: [Title]"** - Convert to `<details><summary>` expandable
**"Tech Stack Tags"** - Extract and convert to clickable tags
**"Meta Notes"** - IGNORE (don't render, just comments for content authors)

---

## Build Process

### Step-by-Step

1. **Read design specs**
   - Parse `design/design-system.md` → extract CSS
   - Parse `design/navigation-structure.md` → understand site map

2. **Generate CSS** (`build/styles.css`)
   - Write all styles from design system
   - Include responsive breakpoints
   - Add dark mode support
   - Ensure accessibility features

3. **Generate JavaScript** (`build/script.js`)
   - Depth meter tracking
   - Expandable section state
   - Smooth scrolling
   - Mobile nav (if needed)

4. **Process landing page**
   - Read `content/landing.md`
   - Generate `build/index.html` with doorways

5. **Process category pages**
   - For each category (`projects`, `thinking`, `tech`):
     - Read all markdown files in category
     - Generate `category/index.html` with cards
     - Generate individual pages (`category/item.html`)

6. **Process about page**
   - Read `content/about/full-story.md`
   - Generate `build/about/full-story.html`

7. **Generate sitemap**
   - List all HTML files
   - Create `build/sitemap.xml`

8. **Generate 404**
   - Create `build/404.html`

9. **Verify**
   - All links work (no broken internal links)
   - All pages have proper navigation
   - Breadcrumbs are correct
   - Depth meter on appropriate pages

---

## Validation Checklist

After build completes, verify:

### Structure
- [ ] All content files converted to HTML
- [ ] Directory structure matches design spec
- [ ] Single `styles.css` file exists
- [ ] Single `script.js` file exists
- [ ] `sitemap.xml` generated
- [ ] `404.html` exists

### Content
- [ ] Markdown properly converted (headings, links, lists, code)
- [ ] Expandable sections work (details/summary elements)
- [ ] Tech tags are clickable and link to `/tech#tag`
- [ ] Meta notes NOT rendered (removed from output)
- [ ] Code blocks have syntax highlighting class

### Navigation
- [ ] Header navigation on all pages
- [ ] Breadcrumbs on non-landing pages
- [ ] Footer on all pages
- [ ] Internal links work (relative paths correct)
- [ ] External links open in new tab (target="_blank")

### Components
- [ ] Cards display correctly on index pages
- [ ] Depth meter appears on appropriate pages
- [ ] Expandable sections expand/collapse
- [ ] Tech tags render with styling

### Responsive
- [ ] Mobile viewport meta tag present
- [ ] Single column on mobile (<640px)
- [ ] Navigation stacks/collapses on mobile
- [ ] Text readable on all screen sizes

### Accessibility
- [ ] Semantic HTML (header, nav, main, footer, article)
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Alt text for images (if any)
- [ ] ARIA labels where appropriate
- [ ] Skip links present
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA

### Performance
- [ ] Total page weight < 100KB
- [ ] No external dependencies (frameworks, fonts, libraries)
- [ ] CSS minified (production)
- [ ] JS minified (production)
- [ ] Fast load time (<1 second on local)

### Browser Compatibility
- [ ] Works in Chrome/Edge (Chromium)
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Degrades gracefully without JavaScript

---

## Constraints & Rules

### MUST DO
- ✅ Use semantic HTML5
- ✅ Follow design-system.md exactly for styling
- ✅ Generate single CSS file (no inline styles)
- ✅ Generate single JS file (no inline scripts)
- ✅ Make all internal links relative
- ✅ Create breadcrumbs automatically
- ✅ Convert "Expand:" headings to expandable sections
- ✅ Extract tech tags and make clickable
- ✅ Include depth meter on non-landing pages

### MUST NOT DO
- ❌ Use any CSS frameworks (Bootstrap, Tailwind, etc.)
- ❌ Use any JS frameworks (React, Vue, jQuery, etc.)
- ❌ Use build tools (webpack, vite, etc.)
- ❌ Add features not specified in this document
- ❌ Change design system colors/fonts/spacing
- ❌ Render "Meta Notes" sections (remove them)
- ❌ Include external dependencies (CDNs, web fonts)

### SHOULD DO
- ⚠️ Minify CSS/JS for production
- ⚠️ Add helpful code comments
- ⚠️ Use consistent indentation (2 spaces)
- ⚠️ Add TODO comments if something unclear
- ⚠️ Generate a build log showing what was created

---

## Build Output

After running build, user should have:

```
build/
├── index.html (landing)
├── projects/
│   ├── index.html (3 cards)
│   ├── sparkii-rag.html
│   ├── wotc-tax.html
│   └── israeli-tech.html
├── thinking/
│   ├── index.html (3 cards)
│   ├── how-i-learn.html
│   ├── the-disconnect.html
│   └── what-im-not.html
├── tech/
│   └── index.html
├── about/
│   └── full-story.html
├── styles.css (~8-10KB minified)
├── script.js (~3-5KB minified)
├── sitemap.xml
└── 404.html
```

**Total**: ~15-20 files, <100KB total

User can then:
1. Open `build/index.html` in browser
2. Test all functionality
3. Deploy to hosting (Vercel, Netlify, GitHub Pages)

---

## Example Build Command

```bash
# If you create a build script:
python build.py

# Or, single Claude Code prompt:
"Build the complete static site following BUILD_PROMPT.md.
Read all content from /content/ and design specs from /design/.
Generate complete site in /build/ directory."
```

---

## Success Criteria

Build is successful when:
1. All HTML files generated from markdown
2. Single CSS file with all design system styles
3. Single JS file with all interactive features
4. Navigation works (breadcrumbs, header, footer)
5. Expandable sections expand/collapse
6. Tech tags link to tech page
7. Depth meter updates per page
8. Mobile responsive
9. Accessible (semantic HTML, ARIA)
10. Fast (<100KB total, <1s load)
11. No console errors when opened in browser
12. All internal links work

**Test**: Open `build/index.html` → Click through all pages → Everything works.

---

## Notes

- This is a STATIC site - no server-side processing
- JavaScript enhances but is not required (progressive enhancement)
- Content updates = edit markdown → rebuild
- Design changes = edit design-system.md → rebuild
- New pages = add markdown file → rebuild

**Philosophy**: Content in markdown (human-editable), design in specs (controlled), build is automated (one command).

**Result**: User has 100% control over every word and every pixel, but doesn't need to write HTML/CSS manually.
