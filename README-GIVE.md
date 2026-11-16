# Rise City — Give page (Zelle)

This update adds a responsive Give page at `give.html`, matching the site's existing black-and-white typography and footer.

## Payment information

The only configured method is Zelle, using **risecitynow@gmail.com** (supplied by Rise City). The website does not process payments or store banking data. Visitors should verify recipient details with their banking institution before sending money.

## Upload to GitHub Pages

Recommended: upload the **SAFE UPDATE** package's files into the **root** of your existing repository, replacing matching HTML, YAML and JavaScript files. This does **not** replace `assets/`, your existing `content/home.json`, `content/beliefs.json`, `content/chrome.json`, `content/appearance.json`, `content/settings.json`, or `CNAME`.

The safe package contains:
- `give.html`, `give.css`, `give.js` — the standalone new page
- `give-nav.js` — adds Give to site navigation/footer using `content/give.json`
- `content/give.json` — editable page content, Zelle recipient, and page appearance
- `.pages.yml` — updated complete Pages CMS configuration, with new sixth editor
- `index.html`, `beliefs.html` — same pages except one additional `give-nav.js` script reference

**Important:** If you've changed the `index.html` or `beliefs.html` structure on GitHub since your last provided version, preserve your changes: instead of replacing the files, add `<script defer src="give-nav.js"></script>` immediately before `</head>` in both files.

### Pages CMS editing

Go to app.pagescms.org, sign into the repository, and open `06 • GIVE — Zelle, Generosity, Layout & FAQs`. Change instructions, text, Zelle email, FAQs, colors, section visibility and buttons.

`give.html` works without Pages CMS as a static fallback, but Pages CMS edits are read from `content/give.json` when hosted.

### About the Elevation Church reference

The structural inspiration is from its giving page: a generosity-led introduction, easy instructions, mission impact, and FAQs. The copy and design here are original to Rise City; no Elevation payment platform or financial claims are reused.

## Safety and financial information

Don't invent a Zelle payment URL or QR code. Zelle email transfers should be initiated within the donor's bank app, and the displayed recipient details checked carefully. No statement that gifts are tax deductible or that confirmations are automatically emailed has been made. The site doesn't take payments.
