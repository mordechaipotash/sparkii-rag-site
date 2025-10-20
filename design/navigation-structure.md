# Navigation Structure

## Site Map

```
/
├── index.html (Landing Page - 3 Doorways)
│
├── projects/
│   ├── index.html (All Projects Overview)
│   ├── sparkii-rag.html
│   ├── wotc-tax.html
│   └── israeli-tech.html
│
├── thinking/
│   ├── index.html (All Thinking Pieces)
│   ├── how-i-learn.html
│   ├── the-disconnect.html
│   └── what-im-not.html
│
├── tech/
│   └── index.html (Tech Stack with Tag Filtering)
│
└── about/
    └── full-story.html (Complete Context)
```

---

## URL Structure

### Clean URLs
- **Preferred**: `/projects/sparkii-rag`
- **Fallback**: `/projects/sparkii-rag.html`

Use HTML5 history API or server config to hide `.html` extensions.

### Shareable & Bookmarkable
Every piece of content has its own URL:
- Direct link to project: `https://mordechai.dev/projects/sparkii-rag`
- Direct link to thinking piece: `https://mordechai.dev/thinking/how-i-learn`
- Direct link to tech section: `https://mordechai.dev/tech#python`

### Deep Linking
Hash links for sections within pages:
- `/projects/sparkii-rag#technical-details`
- `/tech#python`
- `/about/full-story#contact`

---

## Navigation Hierarchy

### Global Navigation (Header)
Appears on every page:

```
[mordechai.dev]  Projects | Thinking | Tech | GitHub | LinkedIn
```

**Implementation**:
- Persistent across all pages
- Current page highlighted
- Mobile: Collapsible menu or stacked

### Breadcrumbs (Sub-Navigation)
Shows location in site hierarchy:

```
Home > Projects > Sparkii RAG
Home > Thinking > How I Learn
Home > Tech
```

**Implementation**:
- Appears below header
- All levels clickable except current
- Mobile: Same, may wrap

### Back Links
On deep pages, provide "← Back to [Category]" link:

```
← Back to Projects
← Back to Thinking
```

---

## Progressive Disclosure Layers

### Layer 0: Landing Page (index.html)
**Time to Decision**: 3 seconds

**Shows**:
- Hero line: "I build AI-native systems that work."
- Subtext: "Self-taught. Beit Shemesh. 2.5 years deep in AI."
- Three doorways (clickable cards):
  - What I've Built →
  - How I Think →
  - Tech I Use →

**Navigation**:
- Click any doorway → Layer 1 (category page)
- Footer: GitHub, LinkedIn, Email links

---

### Layer 1: Category Pages (projects/index.html, etc.)
**Time to Scan**: 30 seconds

**Shows**:
- Category title
- Brief intro (1-2 sentences)
- Cards with summaries:
  - Title
  - 30-50 word summary
  - Quick facts (tech, timeline, status)
  - "Read more →" button

**Navigation**:
- Breadcrumbs: `Home > Projects`
- Global nav: Header links
- Click card → Layer 2 (individual page)

**Example** (projects/index.html):
```
Projects

Production systems I've built solo. No teams, no outsourcing.
See what one person + AI tools can ship.

┌─────────────────────────────┐
│ Sparkii RAG System          │
│ 253K messages, classification│
│ Tech: Python, pgvector...   │
│ [Read more →]               │
└─────────────────────────────┘

┌─────────────────────────────┐
│ WOTC Tax Processing         │
│ 3-tier microservices...     │
└─────────────────────────────┘
```

---

### Layer 2: Individual Pages (projects/sparkii-rag.html)
**Time to Read**: 2-3 minutes

**Shows**:
- Full content with expandable sections
- Headings: "Expand: Technical Details", "Expand: Deep Dive"
- Links to related content
- Tech tags (clickable)

**Navigation**:
- Breadcrumbs: `Home > Projects > Sparkii RAG`
- Global nav: Header
- "← Back to Projects" link
- Related links: Other projects, thinking pieces
- Depth meter (shows Layer 2/4)

**Expandable Sections**:
```
## What It Does
[Always visible content]

▶ Technical Details
  [Click to expand - Layer 3 content]

▶ Deep Dive
  [Click to expand - Layer 3 content]
```

---

### Layer 3: Expanded Sections (JavaScript-driven)
**Time to Read**: 5+ minutes (cumulative)

**Shows**:
- Detailed technical content
- Code examples
- Architecture diagrams (if any)
- Implementation challenges

**Navigation**:
- Same as Layer 2
- Depth meter updates: Layer 3/4
- Collapse button (hide details)

---

### Layer 4: Full Story (about/full-story.html)
**Time to Read**: 10+ minutes

**Shows**:
- Complete background
- Philosophy
- Context (Beit Shemesh, self-taught, ADHD)
- Contact info
- FAQs

**Navigation**:
- Breadcrumbs: `Home > About`
- Depth meter: Layer 4/4
- Internal anchors (Table of Contents)

---

## Cross-Linking Strategy

### Projects → Tech
Every project has tech tags:
```html
<div class="tech-tags">
  <a href="/tech#python" class="tag">python</a>
  <a href="/tech#fastapi" class="tag">fastapi</a>
  <a href="/tech#postgresql" class="tag">postgresql</a>
</div>
```

Clicking tag → tech page, scrolls to that tech section, highlights projects using it.

### Projects ↔ Thinking
Projects include "What This Proves" section linking to relevant thinking:
```
This project demonstrates pattern recognition (see How I Learn)
and AI-native development (see The Disconnect).
```

Thinking pieces link to projects as evidence:
```
Example: Built Sparkii RAG using this approach (see project).
```

### Everything → Full Story
Footer on every page:
```
Want the complete context? Read the full story →
```

---

## Search & Discovery

### No Search Bar (Intentional)
- Only 3 main categories + <10 total pages
- Progressive disclosure guides discovery
- Users choose their path, not search

### Discovery Paths

**Path 1: Project-First**
```
Landing → Projects → Sparkii RAG → Tech Tags → Other Projects
```

**Path 2: Philosophy-First**
```
Landing → How I Think → What I've Built (proof) → Projects
```

**Path 3: Tech-First**
```
Landing → Tech → Filter by Python → Projects Using Python
```

All paths lead to same content, different entry points.

---

## Mobile Navigation

### Header (Mobile)
```
☰ [mordechai.dev]

[Expanded Menu:]
  Home
  Projects
  Thinking
  Tech
  GitHub ↗
  LinkedIn ↗
```

### Breadcrumbs (Mobile)
Same as desktop, may wrap to 2 lines.

### Cards (Mobile)
Stack vertically, full width.

### Depth Meter (Mobile)
Move to bottom-right, smaller size, or hide entirely.

---

## Footer (All Pages)

```html
<footer class="site-footer">
  <div class="footer-links">
    <a href="https://github.com/YOUR_GITHUB">GitHub</a>
    <a href="https://linkedin.com/in/YOUR_LINKEDIN">LinkedIn</a>
    <a href="mailto:YOUR_EMAIL">Email</a>
  </div>
  <div class="footer-meta">
    <a href="/about/full-story">Complete Story</a> |
    Last updated: [DATE]
  </div>
</footer>
```

**Always Shows**:
- External links (GitHub, LinkedIn, Email)
- Link to full story
- Last updated date

---

## State Management (JavaScript)

### User Preferences (localStorage)
```javascript
// Remember user's preferred entry path
localStorage.setItem('preferredPath', 'projects');

// Remember dark/light mode preference
localStorage.setItem('colorScheme', 'dark');

// Remember which sections user expanded
localStorage.setItem('expandedSections', JSON.stringify(['tech-details']));
```

### Depth Tracking
```javascript
// Update depth meter based on page depth
const depthMap = {
  '/': 0,
  '/projects/': 1,
  '/projects/sparkii-rag': 2,
  '/about/full-story': 4
};

// Update visual indicator
updateDepthMeter(currentDepth);
```

---

## Accessibility Navigation

### Skip Links
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### Keyboard Navigation
- Tab: Move through links/buttons
- Enter/Space: Activate links/expand sections
- Escape: Collapse expanded sections (optional)

### Screen Reader Landmarks
```html
<header role="banner">...</header>
<nav role="navigation">...</nav>
<main role="main" id="main-content">...</main>
<footer role="contentinfo">...</footer>
```

---

## Error Pages

### 404 - Not Found
```html
<h1>Page Not Found</h1>
<p>This page doesn't exist. Try one of these:</p>
<ul>
  <li><a href="/">Home</a></li>
  <li><a href="/projects/">Projects</a></li>
  <li><a href="/thinking/">Thinking</a></li>
</ul>
```

### 500 - Error (if needed)
Simple message, links to home.

---

## Meta Notes
<!-- Navigation is simple because site is small (3 categories, ~10 pages) -->
<!-- Progressive disclosure = user controls depth -->
<!-- Cross-linking creates web of related content -->
<!-- Mobile-friendly: no complex interactions needed -->
