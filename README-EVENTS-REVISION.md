# Rise City Events — matched to risecity.now

This revision uses the actual Rise City black-and-white website design. The site header, footer, RC monogram, and existing `styles.css` remain **unchanged**. No blue branding or serif display fonts are introduced.

## Preview and publication
- New page: `events.html`
- Upload the ZIP contents **at the GitHub repository root**, not in a nested folder.
- The integrated update contains `events.html`, `events.css`, `events.js`, `page-links.js`, `content/events.json`, the three photo crops, `.pages.yml`, navigation-enabled `index.html`, `beliefs.html`, `give.html`, and Give page CSS/JS. It does not replace other saved content files or existing branding assets.
- If `content/give.json` is not yet on your GitHub repository, upload that file separately from the complete ZIP to make Give content editable.
- Keep your repository's existing `assets/rise-city-hero.webp`, `assets/rise-city-people.webp`, `assets/rise-city-wordmark.png`, `assets/rc-monogram.png`, all other `content/*.json`, and `CNAME`.
- If you have subsequently customized HTML files, preserve them and use the page-only update and add `<script defer src="page-links.js"></script>` before `</head>` in each existing page, removing `give-nav.js` if present. Then append `Events` using the navigation helper.
- The merged `.pages.yml` retains your seven previous editing areas and adds photo opacity, blur and saturation controls to Events.
- Both the hero and footer continue to follow the exact site styling, without special Events overrides.

## Navigation
The shared page-links script corrects interior-page anchor routes; for instance, `Our Story` leads to `index.html#our-story` from the Events page. It also ensures only the current page has the selected navigation indicator.

## Photo handling
The three photo assets are crops from the supplied **Worship, Fellowship, and Bible Study(1).png** image, lightly faded and blurred by CSS to support rather than compete with the words.

## Dates
All event dates are explicitly *to be determined*. No registration URL or meeting location is invented.
