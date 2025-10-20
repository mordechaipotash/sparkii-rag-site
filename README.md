# About Me Site - One-Shot Build System

Progressive disclosure personal site that lets visitors explore at their own depth.

## What Is This?

A resource collection system that lets you build a complete "about me" website in one shot with Claude Code or Cursor.

**NOT**: A marketing site or blog
**IS**: A natural way for people you reach out to understand who you are, at their own pace

---

## How It Works

### Phase 1: You Control Content (Done!)
All your content is in markdown files - edit anytime:

```
content/
├── landing.md              # Hero + 3 doorways
├── projects/               # What you've built
│   ├── sparkii-rag.md
│   ├── wotc-tax.md
│   └── israeli-tech.md
├── thinking/               # How you think
│   ├── how-i-learn.md
│   ├── the-disconnect.md
│   └── what-im-not.md
├── tech/                   # Tech stack
│   └── stack.md
└── about/                  # Full story
    └── full-story.md
```

### Phase 2: You Control Design
Design system is specified in markdown:

```
design/
├── design-system.md        # Colors, fonts, components
└── navigation-structure.md # Site map, URLs, how people navigate
```

### Phase 3: One-Shot Build
Single Claude Code/Cursor prompt builds everything:

```bash
"Build the complete static site following BUILD_PROMPT.md"
```

**Result**: Complete HTML/CSS/JS website in `/build/` directory

---

## What You Need to Do

### Step 1: Review & Customize Content

All content files are pre-filled with YOUR actual projects and info.

**Review these files and customize**:

1. **content/landing.md** - Change hero line if needed
2. **content/projects/** - All filled with sparkii-rag, wotc-tax, israeli-tech details
3. **content/thinking/** - Your learning philosophy, the disconnect, boundaries
4. **content/tech/stack.md** - Tech you use (pre-filled)
5. **content/about/full-story.md** - Complete context (pre-filled)

**Look for placeholders**:
- `[YOUR_EMAIL_HERE]` - Add your email
- `[YOUR_GITHUB_URL]` - Add GitHub profile
- `[YOUR_LINKEDIN_URL]` - Add LinkedIn
- `[DATE_TO_UPDATE]` - Add current date

**Search for these** in all files and replace.

### Step 2: Review Design (Optional)

Design system is already set up with:
- GitHub-inspired color palette
- Monospace font (developer aesthetic)
- Clean, minimal styling
- Mobile responsive
- Dark mode support

**If you want changes**:
- Edit `design/design-system.md` (change colors, fonts, spacing)
- Edit `design/navigation-structure.md` (change site structure)

**Most people won't need to change this** - it's designed for developer portfolios.

### Step 3: Build the Site

#### Option A: Claude Code/Cursor (Recommended)
```bash
# Open project in Claude Code or Cursor
cd about-me-site

# Single prompt:
"Build the complete static site following BUILD_PROMPT.md.
Read all content from /content/ and design specs from /design/.
Generate site in /build/ directory."
```

#### Option B: Build Script (If you want automation)
I can create a Python build script that does the same thing without requiring Claude Code.

### Step 4: Test Locally

```bash
cd build
python -m http.server 8000

# Open browser: http://localhost:8000
```

Click through everything:
- Landing page doorways work
- Projects load and expand
- Navigation works
- Breadcrumbs correct
- Mobile responsive
- Links work

### Step 5: Deploy

Copy `/build/` folder to:
- **GitHub Pages**: Push to `gh-pages` branch
- **Vercel**: Connect repo, auto-deploy
- **Netlify**: Drag & drop `/build/` folder
- **Any static host**: Just upload files

---

## Progressive Disclosure Explained

### Visitor Experience

**3 seconds** (Landing):
- Sees hero line: "I build AI-native systems that work"
- Chooses path: Projects / Thinking / Tech

**30 seconds** (Category):
- Scans 3 cards with summaries
- Picks one that interests them

**2-3 minutes** (Individual Page):
- Reads full content
- Expands "Technical Details" if interested

**5+ minutes** (Deep Dive):
- Clicks through to other projects
- Reads full story
- Decides to contact you

### Your Control

Every word, every section, every detail = you decide what to show/hide.

**Example** from sparkii-rag.md:
```markdown
## Card Summary (Layer 1)
[Always visible on projects page]

## Expand: Technical Details (Layer 2)
[Collapsed by default, click to expand]

## Expand: Deep Dive (Layer 3)
[Even more detail, also collapsed]
```

Visitor controls how deep they go. You control what's available at each depth.

---

## File Structure Explained

### Content Files

Each markdown file has:
- **Headings**: `#` = h1, `##` = h2, etc.
- **Expandable sections**: `## Expand: Title` → becomes collapsible
- **Tech tags**: `` `python` `fastapi` `` → becomes clickable tags
- **Meta notes**: `<!-- comment -->` → not rendered (your notes)

### Design Files

**design-system.md**: All visual rules
- Colors (light + dark mode)
- Typography (fonts, sizes)
- Components (cards, tags, expandable sections)
- Spacing, layout, responsive

**navigation-structure.md**: How site works
- Site map (which pages exist)
- URL structure (/projects/sparkii-rag)
- Navigation (breadcrumbs, header, footer)
- Progressive disclosure layers

### Build Prompt

**BUILD_PROMPT.md**: Instructions for Claude Code
- How to convert markdown → HTML
- How to generate CSS from design system
- What JavaScript features to include
- Validation checklist
- Success criteria

---

## What Makes This Different

### Traditional Portfolio Sites
- Template-based (look like everyone else's)
- All-or-nothing (show everything upfront)
- Hard to customize (locked into template)
- Framework-dependent (React, Vue, WordPress)

### This System
- **Unique**: Designed for your specific goals (progressive disclosure)
- **Controlled**: You choose what shows at each depth level
- **Flexible**: Edit markdown, rebuild in seconds
- **No lock-in**: Pure HTML/CSS/JS, no frameworks

### Key Features

✅ **Progressive disclosure** - Visitor controls depth
✅ **Mobile responsive** - Works perfectly on phone
✅ **Fast** - <100KB total, loads instantly
✅ **Accessible** - Screen readers, keyboard navigation
✅ **Dark mode** - Automatic based on user preference
✅ **No tracking** - No analytics, no cookies, no BS
✅ **Offline-ready** - Static files, no server needed

---

## Customization Guide

### Change Hero Line
Edit `content/landing.md`:
```markdown
## Hero Line
Your new hero line here.
```

Rebuild → Updated.

### Add New Project
1. Create `content/projects/new-project.md`
2. Copy structure from sparkii-rag.md
3. Fill in your content
4. Rebuild → Automatically appears on projects page

### Change Colors
Edit `design/design-system.md`:
```css
:root {
  --link: #your-color;
  --bg: #your-bg;
}
```

Rebuild → New colors applied everywhere.

### Add Social Links
Find in `content/about/full-story.md` or `content/thinking/what-im-not.md`:
```markdown
**Email**: your@email.com
**LinkedIn**: linkedin.com/in/yourprofile
**GitHub**: github.com/yourhandle
```

Also update in `design/navigation-structure.md` (header/footer).

---

## Maintenance

### Update Content
1. Edit markdown files
2. Run build command
3. Test in browser
4. Deploy updated `/build/` folder

**Time**: 5-10 minutes

### Add New Pages
1. Create new markdown file in appropriate folder
2. Follow existing file structure
3. Run build command
4. New page automatically integrated

### Design Changes
1. Edit `design/design-system.md` or `navigation-structure.md`
2. Run build command
3. All pages updated with new design

---

## What's Included

### ✅ Content (Your Data)
- Landing page with hero + 3 doorways
- 3 project pages (Sparkii RAG, WOTC, Israeli Tech)
- 3 thinking pieces (How I Learn, The Disconnect, What I'm NOT)
- Tech stack page
- Full story / about page

### ✅ Design System
- GitHub-inspired color palette
- Monospace developer aesthetic
- Responsive layout (mobile → desktop)
- Dark mode support
- Accessibility features (WCAG AA)

### ✅ Build Instructions
- Complete BUILD_PROMPT.md
- Validation checklist
- Success criteria
- Example commands

---

## Next Steps

1. **Now**: Review content files, replace placeholders with YOUR info
2. **Today**: Run one-shot build with Claude Code
3. **This week**: Test locally, make any tweaks
4. **Next week**: Deploy to hosting, share URL

---

## Questions?

### "Can I edit the HTML directly after building?"
Yes, but better to edit markdown and rebuild. That way you keep source of truth in markdown.

### "What if I want to add a blog?"
Add `content/blog/` folder, create markdown files, rebuild. System is extensible.

### "Can I change the whole design?"
Yes - edit design-system.md completely, rebuild. You have 100% control.

### "Do I need to know HTML/CSS/JavaScript?"
No - that's the point. You control content in markdown, design in specs, build is automated.

### "What if the build fails?"
Check BUILD_PROMPT.md validation checklist. Most issues are missing placeholders or malformed markdown.

### "Can I use this for something else?"
Yes - the system works for any progressive disclosure content site. Just change the content files.

---

## File Checklist

Before building, make sure you've customized:

```
[ ] content/landing.md - Hero line is yours
[ ] content/projects/*.md - All project details accurate
[ ] content/thinking/*.md - Philosophy reflects your views
[ ] content/tech/stack.md - Tech stack is current
[ ] content/about/full-story.md - All placeholders replaced
[ ] Search all files for [YOUR_*] and replace
[ ] Search all files for YOUR_GITHUB/LINKEDIN/EMAIL and replace
[ ] Update dates where needed
```

Then run build command.

---

## License & Usage

This is YOUR site. Do whatever you want with it.

- Use for personal site
- Modify freely
- Share the system with others
- No attribution required

**Built with**: Claude Code assistance (that's the point!)

---

Last updated: [DATE]
