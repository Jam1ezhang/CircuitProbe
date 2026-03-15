# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static HTML template for academic research project pages. There is no build system, no package manager, and no compilation step — the site is served directly as HTML/CSS/JS and works with GitHub Pages out of the box.

## Development

To preview the site locally, use any static file server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000` in a browser.

## Architecture

The entire site is a single-page design with three core files:

- **`index.html`** — All content lives here. Sections are structured as `<section>` blocks with Bulma CSS classes. Add, remove, or comment out sections to customize. TODO comments mark all placeholders to replace.
- **`static/css/index.css`** — Custom styles layered on top of Bulma. Uses CSS custom properties (`--primary-color`, `--shadow-md`, etc.) defined in `:root` for consistent theming. Mobile breakpoints at 480px and 768px.
- **`static/js/index.js`** — Vanilla JS for interactive features: More Works dropdown (`toggleMoreWorks()`), BibTeX copy button (`copyBibTeX()`), scroll-to-top button, and video carousel autoplay via `IntersectionObserver`.

### External dependencies (CDN-loaded, no install needed)

- **Bulma** (`bulma.min.css`) — CSS framework for layout and components
- **bulma-carousel** / **bulma-slider** — Carousel and slider UI components
- **Font Awesome 6** — Icons
- **Academicons** — Academic-specific icons (arXiv, Google Scholar, etc.)
- **jQuery 3.5.1** — Required by bulma-carousel/slider
- **MathJax 3** — LaTeX math rendering via `$...$` and `$$...$$` syntax

### Key HTML patterns

- **`#moreWorksDropdown`** — Fixed-position dropdown (top-right on desktop, bottom-right on mobile) for linking related papers
- **`#BibTeX`** section — Uses `id="bibtex-code"` on the `<code>` element for the copy button to work
- **`.results-carousel`** / **`.results-list`** — Two layout options for displaying results: carousel (scrollable) or stacked list
- **`.insights-list`** — Vertically stacked cards for findings/analysis sections
- **`.dnerf`** — Small-caps styling for stylized paper name rendering
- **`.publication-venue`** / **`.publication-awards`** — Styled badges for conference name and award text

## Customization checklist

Replace all TODO-marked items in `index.html`:
1. `<title>`, `<meta name="title">`, `<meta name="description">`, OG/Twitter tags
2. Paper title, author names with links, institution affiliations
3. arXiv URL, GitHub repo URL, demo link
4. Teaser image (`static/images/intro.jpg`) and caption
5. Abstract content
6. Section images and their alt text
7. BibTeX entry in `#BibTeX` section
8. More Works dropdown entries (`.work-item` blocks)
9. `static/images/favicon.ico`
10. Social preview image at `static/images/social_preview.png` (1200×630px)
