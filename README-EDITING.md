# Rise City — Editable Design Studio for GitHub Pages

This is the same Rise City site using the latest supplied Rise City artwork and
"Rise Up and Walk" (Acts 3:6) message. It is static HTML/CSS/JavaScript,
editable with Pages CMS, and can be hosted free on GitHub Pages.

## Important: updating an EXISTING GitHub repository

1. **Keep your existing `CNAME` file** if you already have a custom domain.
   This package intentionally does not include or replace it.
2. Upload or replace the files inside this package **at the repository root**
   (the same level as `index.html`). Preserve the `assets/` and `content/` folders.
3. The config `.pages.yml` is hidden by default on macOS. To show hidden files
   in Finder press `Command + Shift + .` (period). Verify `.pages.yml` appears
   in your GitHub repository, alongside `index.html`.
4. If `.pages.yml` is missing, open the repository's **Add file > Create new file**,
   enter `.pages.yml` as its filename, and paste the contents of
   `Rise-City-Pages-CMS-Updated-Config.txt` (also provided separately).
   If `.pages.yml` already exists, open it on GitHub, click the pencil icon,
   replace all its text with the updated config, then commit.
5. Commit changes. Confirm GitHub **Settings > Pages** is set to
   **Deploy from branch / main / (root)**, unless you already have working
   Pages settings for your custom domain.
6. In <https://app.pagescms.org/>, select the repository and `main` branch.
   Reload Pages CMS to display the expanded fields.

Do not upload the ZIP itself to the GitHub repository. Unzip first.

## New editable areas

**01 — APPEARANCE & LAYOUT** (`content/appearance.json`)
- 19 global colors: page background, headings/outline, paragraphs, navigation,
  announcement strip, dark sections, buttons, cards, borders and footer
- Heading and body font selection, text size, letter spacing, line height
- Container width, section spacing, button/card rounding, hero image options
- Sticky header and smooth scrolling
- Photo treatment and side placement in Our Story
- Desktop columns for Our Heart and Mission cards
- Every section: show/hide toggle, optional background photo, photo opacity,
  background color and page ordering

For **background color** in a specific section, leave the value blank to inherit
from the global palette. To override just that section, enter a hex color like
`#EDEDED`.

**02 — HOMEPAGE TEXT** (`content/home.json`)
- Main headings in every section, welcome and Scripture quotations
- The Rise Up and Walk narrative, steps, story, heart, mission, CTA text
- Foundation Scripture and story/mission details

**03 — WHAT WE BELIEVE** (`content/beliefs.json`)
- All 11 doctrinal articles (rich-text editing), titles, citations and navigation
- Intro/closing texts and headings
- The full teaching is preserved from the previous site.

**04 — NAVIGATION, BUTTONS & SEO** (`content/chrome.json`)
- Desktop/mobile menu labels and URLs
- All major buttons and target links
- Announcement bar, section labels, image caption, footer
- Browser title/description and social metadata fields

**05 — IMAGES & CONTACT** (`content/settings.json`)
- Hero image, RC mark, portrait, footer wordmark, sharing image and favicon
- Email, phone, Instagram, Facebook, YouTube and giving URL

## Important design notes

- Pages CMS is a **field-based editor**, not a drag-and-drop page canvas.
- **Colors use hex text fields** (`#F5F5F5`), not a built-in color picker.
- New background images appear behind a section with configurable opacity.
  For readable text, start with a low image opacity (10–25%).
- Large font sizes or reordered sections may require design review afterward.
- The hero is the exact supplied artwork by default, shown unaltered.
- Contact links appear only once entered; no physical location is stated.
- Layout and content are updated on the live website after GitHub Pages deploys.
- Client-side edits to SEO/social meta tags might **not** be read by search
  crawlers or social scrapers. To change public social previews reliably,
  edit the static `<head>` tags in the HTML too, or introduce a build step.

## Test locally

Run `python3 -m http.server 8000` in the extracted folder, then open
<http://localhost:8000/>. Opening `index.html` directly using `file://` may
prevent JSON from loading due to browser security restrictions.

## Key files

- `index.html`, `beliefs.html` — page structures
- `styles.css` — design and responsive layout
- `cms-content.js` — applies all CMS JSON settings to the site
- `script.js` — mobile navigation
- `.pages.yml` — Pages CMS editor schema (in repository root)
- `content/*.json` — editable content and appearance
- `assets/*` — brand images and photos
- `.nojekyll` — disables Jekyll processing on GitHub Pages

## Safety

Keep a copy of the current GitHub repository or create a new branch before
uploading this version. The package does **not** include `CNAME`; retain the
existing repository copy. If a previous upload left a `site.config.js`, it is
not used by this version and may be left in place or deleted separately.
