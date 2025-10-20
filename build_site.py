#!/usr/bin/env python3
"""
Build script for About Me site
Converts markdown content to HTML following BUILD_PROMPT.md specifications
"""

import re
import os
from pathlib import Path
from datetime import datetime

# Base HTML template
HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Mordechai</title>
  <meta name="description" content="{description}">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  {header}

  {breadcrumbs}

  <main class="container" id="main-content">
    {content}
  </main>

  {footer}

  {depth_meter}

  <script src="/script.js"></script>
</body>
</html>
"""

HEADER = """<header class="site-header">
    <nav class="site-nav">
      <a href="/" class="logo">mordechai.dev</a>
      <div class="nav-links">
        <a href="/projects/">Projects</a>
        <a href="/thinking/">Thinking</a>
        <a href="/tech/">Tech</a>
        <a href="https://github.com/YOUR_GITHUB" target="_blank" rel="noopener">GitHub ↗</a>
        <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noopener">LinkedIn ↗</a>
      </div>
    </nav>
  </header>"""

FOOTER = """<footer class="site-footer">
    <div class="footer-links">
      <a href="https://github.com/YOUR_GITHUB" target="_blank" rel="noopener">GitHub</a>
      <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noopener">LinkedIn</a>
      <a href="mailto:YOUR_EMAIL">Email</a>
    </div>
    <div class="footer-meta">
      <a href="/about/full-story.html">Complete Story</a> |
      Last updated: {date}
    </div>
  </footer>"""

DEPTH_METER = """<div class="depth-meter" aria-label="Content depth indicator">
    <span class="depth-label">Depth:</span>
    <span class="depth-dots" role="img" aria-label="Depth level indicator">
      <span class="dot">●</span>
      <span class="dot">○</span>
      <span class="dot">○</span>
      <span class="dot">○</span>
    </span>
  </div>"""

def markdown_to_html(text):
    """Convert markdown to HTML (basic implementation)"""
    # Remove meta notes (HTML comments)
    text = re.sub(r'<!--.*?-->', '', text, flags=re.DOTALL)

    # Code blocks
    def replace_code_block(match):
        lang = match.group(1) or ''
        code = match.group(2)
        return f'<pre><code class="language-{lang}">{code}</code></pre>'

    text = re.sub(r'```(\w+)?\n(.*?)```', replace_code_block, text, flags=re.DOTALL)

    # Headings
    text = re.sub(r'^# (.*?)$', r'<h1>\1</h1>', text, flags=re.MULTILINE)
    text = re.sub(r'^## (.*?)$', r'<h2>\1</h2>', text, flags=re.MULTILINE)
    text = re.sub(r'^### (.*?)$', r'<h3>\1</h3>', text, flags=re.MULTILINE)
    text = re.sub(r'^#### (.*?)$', r'<h4>\1</h4>', text, flags=re.MULTILINE)

    # Bold and italic
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*(.*?)\*', r'<em>\1</em>', text)

    # Links
    text = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2">\1</a>', text)

    # Inline code
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)

    # Lists (simple implementation)
    text = re.sub(r'^\- (.*?)$', r'<li>\1</li>', text, flags=re.MULTILINE)
    text = re.sub(r'(<li>.*?</li>\n)+', r'<ul>\g<0></ul>', text, flags=re.DOTALL)

    # Paragraphs
    lines = text.split('\n\n')
    paragraphs = []
    for line in lines:
        line = line.strip()
        if line and not line.startswith('<'):
            paragraphs.append(f'<p>{line}</p>')
        elif line:
            paragraphs.append(line)

    return '\n'.join(paragraphs)

def process_expandable_sections(html):
    """Convert 'Expand:' headings to details/summary"""
    # Find all h2/h3 with "Expand:" prefix
    def replace_expand(match):
        title = match.group(1).replace('Expand: ', '').strip()
        return f'<details class="expandable"><summary>{title}</summary><div class="expandable-content">'

    html = re.sub(r'<h[23]>Expand:\s*(.*?)</h[23]>', replace_expand, html)

    # Close details tags before next heading or end
    # This is simplified - in production would need better parsing
    return html

def extract_tech_tags(content):
    """Extract tech tags from markdown"""
    # Look for Tech Stack Tags section
    match = re.search(r'## Tech Stack Tags\s+(.*?)(?=\n##|\Z)', content, re.DOTALL)
    if match:
        tags_text = match.group(1)
        # Extract code-wrapped words
        tags = re.findall(r'`([^`]+)`', tags_text)
        return tags
    return []

def generate_tech_tags_html(tags):
    """Generate HTML for tech tags"""
    if not tags:
        return ''

    html = '<div class="tech-tags">\n'
    for tag in tags:
        html += f'  <a href="/tech/#{tag}" class="tag">{tag}</a>\n'
    html += '</div>'
    return html

def generate_breadcrumbs(path):
    """Generate breadcrumbs for a path"""
    parts = path.strip('/').split('/')
    if not parts[0]:  # Landing page
        return ''

    html = '<nav class="breadcrumbs" aria-label="Breadcrumb">\n'
    html += '  <a href="/">Home</a> >\n'

    current_path = ''
    for i, part in enumerate(parts[:-1]):  # All but last
        current_path += '/' + part
        label = part.capitalize()
        html += f'  <a href="{current_path}/">{label}</a> >\n'

    # Last part (current page)
    last = parts[-1].replace('.html', '').replace('-', ' ').title()
    html += f'  <span aria-current="page">{last}</span>\n'
    html += '</nav>'

    return html

def build_page(content_file, output_file, title, description=''):
    """Build a single page from markdown"""
    # Read markdown content
    with open(content_file, 'r') as f:
        content = f.read()

    # Extract tech tags before converting
    tech_tags = extract_tech_tags(content)

    # Convert markdown to HTML
    html_content = markdown_to_html(content)

    # Process expandable sections
    html_content = process_expandable_sections(html_content)

    # Add tech tags if present
    if tech_tags:
        tags_html = generate_tech_tags_html(tech_tags)
        html_content += '\n' + tags_html

    # Generate breadcrumbs
    path = output_file.replace('/Users/mordechai/oct-5-2-2025/about-me-site/build', '')
    breadcrumbs = generate_breadcrumbs(path)

    # Determine if depth meter needed (not on landing)
    depth_meter = DEPTH_METER if path != '/index.html' else ''

    # Build full HTML
    html = HTML_TEMPLATE.format(
        title=title,
        description=description or title,
        header=HEADER,
        breadcrumbs=breadcrumbs,
        content=html_content,
        footer=FOOTER.format(date=datetime.now().strftime('%Y-%m-%d')),
        depth_meter=depth_meter
    )

    # Write output
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w') as f:
        f.write(html)

    print(f'✓ Generated: {output_file}')

def main():
    """Main build process"""
    print('Building site...\n')

    base = Path('/Users/mordechai/oct-5-2-2025/about-me-site')
    content_dir = base / 'content'
    build_dir = base / 'build'

    # Note: Landing page already created manually
    print('✓ Landing page already created')

    # Build project pages
    print('\nBuilding project pages...')
    for md_file in (content_dir / 'projects').glob('*.md'):
        title = md_file.stem.replace('-', ' ').title()
        build_page(
            str(md_file),
            str(build_dir / 'projects' / f'{md_file.stem}.html'),
            title
        )

    # Build thinking pages
    print('\nBuilding thinking pages...')
    for md_file in (content_dir / 'thinking').glob('*.md'):
        title = md_file.stem.replace('-', ' ').title()
        build_page(
            str(md_file),
            str(build_dir / 'thinking' / f'{md_file.stem}.html'),
            title
        )

    # Build tech page
    print('\nBuilding tech page...')
    build_page(
        str(content_dir / 'tech' / 'stack.md'),
        str(build_dir / 'tech' / 'index.html'),
        'Tech Stack'
    )

    # Build about page
    print('\nBuilding about page...')
    build_page(
        str(content_dir / 'about' / 'full-story.md'),
        str(build_dir / 'about' / 'full-story.html'),
        'The Full Story'
    )

    print('\n✅ Build complete!')
    print(f'\nGenerated site in: {build_dir}')
    print('\nNext steps:')
    print('1. cd build')
    print('2. python -m http.server 8000')
    print('3. Open http://localhost:8000')

if __name__ == '__main__':
    main()
