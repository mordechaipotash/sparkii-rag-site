# Design System

## Visual Philosophy

**Principles**:
- Minimal: Content first, decoration last
- Terminal aesthetic: Clean, monospace, developer-friendly
- Fast: No unnecessary animations or JavaScript
- Accessible: High contrast, readable, keyboard-navigable
- Timeless: No trends, no frameworks, pure fundamentals

**NOT**:
- Flashy animations
- Gradient backgrounds
- Fancy fonts
- Image-heavy
- Framework-dependent (Bootstrap/Tailwind/etc.)

---

## Color Palette

### Light Mode (Default)
```css
:root {
  /* Base colors */
  --bg: #ffffff;
  --text: #24292f;
  --text-muted: #57606a;

  /* Accent colors */
  --link: #0969da;
  --link-hover: #0550ae;
  --border: #d0d7de;
  --border-hover: #8c959f;

  /* UI elements */
  --code-bg: #f6f8fa;
  --code-border: #d0d7de;
  --card-bg: #ffffff;
  --card-border: #d0d7de;
  --card-hover-border: #8c959f;

  /* Interactive */
  --button-bg: #f6f8fa;
  --button-hover: #eaeef2;
  --focus-ring: #0969da;
}
```

### Dark Mode (Optional - User Preference)
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0d1117;
    --text: #c9d1d9;
    --text-muted: #8b949e;

    --link: #58a6ff;
    --link-hover: #79c0ff;
    --border: #30363d;
    --border-hover: #6e7681;

    --code-bg: #161b22;
    --code-border: #30363d;
    --card-bg: #0d1117;
    --card-border: #30363d;
    --card-hover-border: #6e7681;

    --button-bg: #21262d;
    --button-hover: #30363d;
    --focus-ring: #58a6ff;
  }
}
```

**Color Philosophy**: GitHub's color system. Battle-tested, accessible, familiar to developers.

---

## Typography

### Font Family
```css
:root {
  --font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono',
               'Courier New', monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica',
               'Arial', sans-serif;
}

body {
  font-family: var(--font-mono);
}
```

**Why monospace**: Developer aesthetic, uniform spacing, readable code examples inline.

### Font Sizes
```css
:root {
  --text-xs: 0.75rem;    /* 12px - meta text */
  --text-sm: 0.875rem;   /* 14px - secondary text */
  --text-base: 1rem;     /* 16px - body text */
  --text-lg: 1.125rem;   /* 18px - large body */
  --text-xl: 1.25rem;    /* 20px - small headings */
  --text-2xl: 1.5rem;    /* 24px - h3 */
  --text-3xl: 1.875rem;  /* 30px - h2 */
  --text-4xl: 2.25rem;   /* 36px - h1 */
}
```

### Line Height
```css
body {
  line-height: 1.6;  /* Readable for prose */
}

code, pre {
  line-height: 1.4;  /* Tighter for code */
}

h1, h2, h3 {
  line-height: 1.2;  /* Compact for headings */
}
```

---

## Layout

### Max Width & Centering
```css
.container {
  max-width: 800px;      /* Optimal line length for reading */
  margin: 0 auto;        /* Center horizontally */
  padding: 0 1rem;       /* Breathing room on mobile */
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}
```

### Spacing Scale (8px Base Unit)
```css
:root {
  --space-1: 0.5rem;   /* 8px */
  --space-2: 1rem;     /* 16px */
  --space-3: 1.5rem;   /* 24px */
  --space-4: 2rem;     /* 32px */
  --space-6: 3rem;     /* 48px */
  --space-8: 4rem;     /* 64px */
  --space-12: 6rem;    /* 96px */
}
```

**Usage**:
- Small gaps: `--space-1`, `--space-2`
- Sections: `--space-4`, `--space-6`
- Page sections: `--space-8`, `--space-12`

---

## Components

### Cards (Project Summaries)
```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  padding: var(--space-4);
  transition: border-color 150ms ease;
}

.card:hover {
  border-color: var(--card-hover-border);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-2);
  color: var(--text);
}

.card-summary {
  color: var(--text-muted);
  margin-bottom: var(--space-3);
}

.card-meta {
  font-size: var(--text-sm);
  color: var(--text-muted);
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
```

### Expandable Sections (Details/Summary)
```html
<details class="expandable">
  <summary>▶ Section Title</summary>
  <div class="expandable-content">
    Content goes here
  </div>
</details>
```

```css
.expandable {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: var(--space-3);
  margin-bottom: var(--space-3);
}

.expandable summary {
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  list-style: none;  /* Hide default triangle */
}

.expandable summary::-webkit-details-marker {
  display: none;  /* Safari */
}

.expandable summary::before {
  content: '▶ ';
  display: inline-block;
  transition: transform 150ms ease;
}

.expandable[open] summary::before {
  transform: rotate(90deg);
}

.expandable-content {
  margin-top: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px solid var(--border);
}
```

### Breadcrumbs
```html
<nav class="breadcrumbs">
  <a href="/">Home</a> >
  <a href="/projects/">Projects</a> >
  <span>Sparkii RAG</span>
</nav>
```

```css
.breadcrumbs {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-bottom: var(--space-4);
}

.breadcrumbs a {
  color: var(--link);
  text-decoration: none;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.breadcrumbs > * {
  margin: 0 0.5rem;
}

.breadcrumbs > *:first-child {
  margin-left: 0;
}
```

### Depth Meter
```html
<div class="depth-meter">
  <span class="depth-label">Depth:</span>
  <span class="depth-dots">
    <span class="dot active">●</span>
    <span class="dot">○</span>
    <span class="dot">○</span>
    <span class="dot">○</span>
  </span>
</div>
```

```css
.depth-meter {
  position: fixed;
  top: var(--space-2);
  right: var(--space-2);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: var(--space-2);
  font-size: var(--text-sm);
  z-index: 100;
}

.depth-dots {
  margin-left: var(--space-2);
}

.dot {
  opacity: 0.3;
}

.dot.active {
  opacity: 1;
  color: var(--link);
}
```

### Tech Tags
```html
<div class="tech-tags">
  <span class="tag">python</span>
  <span class="tag">fastapi</span>
  <span class="tag">postgresql</span>
</div>
```

```css
.tech-tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-top: var(--space-3);
}

.tag {
  display: inline-block;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-decoration: none;
  transition: all 150ms ease;
}

.tag:hover {
  background: var(--button-hover);
  border-color: var(--border-hover);
  color: var(--link);
}
```

---

## Navigation

### Header
```html
<header class="site-header">
  <nav class="site-nav">
    <a href="/" class="logo">mordechai.dev</a>
    <div class="nav-links">
      <a href="/projects/">Projects</a>
      <a href="/thinking/">Thinking</a>
      <a href="/tech/">Tech</a>
      <a href="https://github.com/YOUR_GITHUB">GitHub</a>
    </div>
  </nav>
</header>
```

```css
.site-header {
  border-bottom: 1px solid var(--border);
  padding: var(--space-3) 0;
  margin-bottom: var(--space-6);
}

.site-nav {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--space-2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: var(--space-4);
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
}

.nav-links a:hover {
  color: var(--link);
}

@media (max-width: 640px) {
  .site-nav {
    flex-direction: column;
    gap: var(--space-2);
  }

  .nav-links {
    gap: var(--space-3);
    font-size: var(--text-sm);
  }
}
```

---

## Responsive Design

### Breakpoints
```css
/* Mobile first approach */

/* Small devices (phones, up to 640px) */
@media (max-width: 640px) {
  /* Default styles */
}

/* Medium devices (tablets, 641px and up) */
@media (min-width: 641px) {
  /* Tablet enhancements */
}

/* Large devices (desktops, 1024px and up) */
@media (min-width: 1024px) {
  /* Desktop enhancements */
}
```

### Mobile Adaptations
- Single column layout
- Larger tap targets (48px minimum)
- Simplified navigation
- Collapsible sections expanded by default
- Reduced spacing (but still readable)

---

## Interactions

### Transitions
```css
/* Standard transition for most interactive elements */
a, button, .card, .tag {
  transition: all 150ms ease;
}

/* Expand/collapse animation */
.expandable summary::before {
  transition: transform 200ms ease;
}

/* No transitions for motion-sensitive users */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
```

### Focus States
```css
a:focus, button:focus, summary:focus {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

### Hover States
- Links: Underline
- Cards: Border color change
- Tags: Background + border change
- Buttons: Background change

---

## Accessibility

### Requirements
- ✅ WCAG AA contrast ratios (4.5:1 for text)
- ✅ Keyboard navigable (tab, enter, space)
- ✅ Screen reader friendly (semantic HTML)
- ✅ Focus indicators visible
- ✅ Respects prefers-reduced-motion
- ✅ Respects prefers-color-scheme

### Semantic HTML
```html
<!-- Use proper heading hierarchy -->
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>

<!-- Use nav for navigation -->
<nav>...</nav>

<!-- Use article for content -->
<article>...</article>

<!-- Use proper lists -->
<ul><li>...</li></ul>
```

---

## Performance

### Constraints
- No external CSS frameworks (Bootstrap, Tailwind, etc.)
- No external JS libraries (jQuery, React, etc.)
- Single CSS file (<10KB)
- Minimal JS (<5KB)
- Total page weight: <100KB

### Optimization
- Inline critical CSS
- Defer non-critical CSS
- Minify in production
- Use system fonts (no web fonts to load)

---

## Meta Notes
<!-- This design system prioritizes readability and speed -->
<!-- GitHub's color palette is battle-tested for developer tools -->
<!-- Monospace font gives terminal/code aesthetic -->
<!-- Mobile-first responsive design -->
