# QUICKSTART - Build Your Site in 10 Minutes

## 🎯 Goal
Build your complete "about me" site in one shot with Claude Code.

## ⏱️ Timeline
- **5 minutes**: Replace placeholders with your info
- **2 minutes**: Run build command
- **3 minutes**: Test locally
- **Total**: 10 minutes to working site

---

## Step 1: Replace Placeholders (5 min)

### Search & Replace These:

Open project in your editor and find/replace:

```bash
# Find these strings and replace with YOUR info:

[YOUR_EMAIL_HERE]          → your@email.com
[YOUR_GITHUB_URL]          → https://github.com/yourhandle
[YOUR_LINKEDIN_URL]        → https://linkedin.com/in/yourprofile
YOUR_GITHUB                → yourhandle
YOUR_LINKEDIN              → yourprofile
YOUR_EMAIL                 → your@email.com
[DATE_TO_UPDATE]           → 2025-01-15 (or current date)
```

### Files That Need Updates:

1. **content/about/full-story.md** - Contact section
2. **content/thinking/what-im-not.md** - Contact section
3. **design/navigation-structure.md** - Footer links

### Quick Check:
```bash
# Search for any remaining placeholders:
grep -r "YOUR_" content/
grep -r "\[YOUR" content/
```

Should return nothing if you got them all.

---

## Step 2: Build (2 min)

### Option A: Claude Code/Cursor

Open project:
```bash
cd /Users/mordechai/oct-5-2-2025/about-me-site
cursor .  # or code . for VSCode
```

Send this prompt to Claude Code:
```
Build the complete static site following BUILD_PROMPT.md.

Read all content from /content/ directory.
Read all design specs from /design/ directory.
Generate complete website in /build/ directory.

Follow all rules in BUILD_PROMPT.md exactly:
- Convert markdown to semantic HTML
- Generate single styles.css with all design system styles
- Generate single script.js with depth meter and expandable sections
- Create index pages for categories (projects, thinking)
- Include navigation (header, breadcrumbs, footer)
- Make expandable sections from "Expand:" headings
- Convert tech tags to clickable links
- Remove "Meta Notes" sections
- Generate sitemap.xml and 404.html

Validate everything works before confirming done.
```

**Wait 2-5 minutes** while Claude Code builds.

### Option B: Manual Build (If Option A fails)

I can create a Python build script for you. Let me know if you want this fallback option.

---

## Step 3: Test (3 min)

### Start Local Server:
```bash
cd build
python -m http.server 8000
```

Open browser: **http://localhost:8000**

### Test Checklist:

**Landing Page**:
- [ ] Hero line shows
- [ ] Three doorways (Projects, Thinking, Tech) clickable
- [ ] Click "What I've Built" → goes to projects page

**Projects Page**:
- [ ] 3 project cards show (Sparkii RAG, WOTC, Israeli Tech)
- [ ] Click "Read more" on Sparkii RAG → goes to full page

**Project Detail Page**:
- [ ] Breadcrumbs: Home > Projects > Sparkii RAG
- [ ] Content shows
- [ ] "Expand: Technical Details" sections collapse/expand
- [ ] Tech tags clickable (python, fastapi, etc.)
- [ ] Depth meter shows (top right)

**Navigation**:
- [ ] Header: mordechai.dev | Projects | Thinking | Tech | GitHub | LinkedIn
- [ ] Footer: GitHub, LinkedIn, Email links
- [ ] Click Projects → projects index
- [ ] Click Thinking → thinking index
- [ ] Click Tech → tech page

**Mobile**:
- [ ] Resize browser to phone width (375px)
- [ ] Everything readable
- [ ] Navigation works
- [ ] Single column layout

### Common Issues:

**Issue**: Links don't work (404 errors)
**Fix**: Check if files are in correct folders, verify paths

**Issue**: Expandable sections don't expand
**Fix**: Check if script.js loaded, look for console errors

**Issue**: Styling broken
**Fix**: Check if styles.css loaded, inspect element for CSS

---

## Step 4: Deploy (5 min)

### GitHub Pages (Free):

```bash
# Create git repo (if not already)
git init
git add .
git commit -m "Initial site"

# Create GitHub repo at github.com
# Then:
git remote add origin https://github.com/yourhandle/yourname.github.io.git
git push -u origin main

# Copy build folder to gh-pages branch
git checkout -b gh-pages
cp -r build/* .
git add .
git commit -m "Deploy site"
git push origin gh-pages
```

Site live at: `https://yourhandle.github.io`

### Vercel (Easier):

1. Go to [vercel.com](https://vercel.com)
2. Sign up (free)
3. Import your GitHub repo
4. Set "Output Directory" to `build`
5. Deploy

Site live at: `https://yourproject.vercel.app`

Custom domain: Add in Vercel settings

### Netlify (Drag & Drop):

1. Go to [netlify.com](https://netlify.com)
2. Drag `/build/` folder to deploy area
3. Done

Site live at: `https://random-name.netlify.app`

Custom domain: Add in Netlify settings

---

## Next Actions

### After Site is Live:

1. **Test on real devices** (phone, tablet, different browsers)
2. **Share URL** with a few people, get feedback
3. **Monitor what works** - which pages do people spend time on?
4. **Iterate** - edit markdown, rebuild, redeploy

### Update Content:

```bash
# Edit any markdown file
nano content/projects/sparkii-rag.md

# Rebuild (same Claude Code prompt)
# Test locally
# Redeploy (git push or vercel/netlify will auto-deploy)
```

### Add New Project:

```bash
# Copy existing project as template
cp content/projects/sparkii-rag.md content/projects/new-project.md

# Edit new-project.md with your content
# Rebuild
# Automatically appears on projects page
```

---

## Troubleshooting

### Build Failed

**Error**: "Can't find content files"
**Fix**: Make sure you're in the right directory: `/Users/mordechai/oct-5-2-2025/about-me-site`

**Error**: "Markdown parsing failed"
**Fix**: Check for unclosed code blocks (```) or malformed markdown

**Error**: "Design system file not found"
**Fix**: Verify `design/design-system.md` exists

### Site Works Locally But Not After Deploy

**Issue**: Paths broken
**Fix**: Make sure all links are relative (`/projects/` not `https://yoursite.com/projects/`)

**Issue**: CSS/JS not loading
**Fix**: Check paths in HTML (`<link href="/styles.css">` should work)

### Content Not Showing

**Issue**: Page blank
**Fix**: Check browser console for errors, verify HTML generated correctly

**Issue**: Section missing
**Fix**: Check markdown file, rebuild, verify conversion worked

---

## Success Criteria

You're done when:
- ✅ Site loads locally at localhost:8000
- ✅ All navigation works (header, breadcrumbs, footer)
- ✅ Projects load and expand correctly
- ✅ Tech tags are clickable
- ✅ Mobile responsive (test at 375px width)
- ✅ No console errors
- ✅ All YOUR_* placeholders replaced
- ✅ Contact links work (email, GitHub, LinkedIn)

Then deploy and you're live!

---

## Time Estimates

| Task | Time | Can Skip? |
|------|------|-----------|
| Replace placeholders | 5 min | No |
| Build with Claude Code | 2 min | No |
| Test locally | 3 min | No |
| Deploy to Vercel/Netlify | 5 min | Yes (deploy later) |
| Custom domain setup | 10 min | Yes (optional) |
| **Total minimum** | **10 min** | - |
| **Total with deploy** | **20 min** | - |

---

## What's Next?

After your site is live:

### Week 1:
- Share URL with 3-5 people
- Get feedback
- Make small content tweaks

### Week 2:
- Add new project if you build something
- Update tech stack if you learn new tools
- Refine "What I'm NOT" based on bad inquiries

### Month 1:
- See which pages people spend time on
- Consider adding more depth where interest is high
- Update "The Disconnect" if market changes

### Ongoing:
- Edit markdown files as you learn/build
- Rebuild and redeploy (5 minutes)
- Keep content current

---

## Quick Reference

### Build Command:
```
"Build site following BUILD_PROMPT.md from /content/ and /design/ to /build/"
```

### Test Command:
```bash
cd build && python -m http.server 8000
```

### Deploy Command (Vercel):
```bash
vercel --prod
```

### Update Workflow:
```bash
1. Edit markdown files
2. Run build command
3. Test locally
4. Deploy (auto or manual)
```

---

## Done!

You should now have:
- ✅ Complete static website
- ✅ All content in markdown (editable)
- ✅ Professional design
- ✅ Mobile responsive
- ✅ Fast loading
- ✅ No frameworks
- ✅ Deployed and live (or ready to deploy)

**Time spent**: 10-20 minutes
**Result**: Production-ready personal site

Now you can share it when reaching out to companies/people. They'll understand you at their own pace.

---

Need help? Check README.md for full documentation.
