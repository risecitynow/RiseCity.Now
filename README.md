# Rise City — editable website, GitHub Pages + Pages CMS

**This package preserves the Rise City Acts 3:6 website design.** Its black-and-white visual system uses the supplied RC logo, Rise City banner and portrait artwork. The updated cool-gray background is matched to the banner, with feathered edges on desktop and mobile to avoid obvious image rectangles.

**Central theme:** “Rise up and walk” (Acts 3:6). The mission is to share the gospel all over the city. No particular neighborhood, address, or city is named.

## How to publish

1. Extract this ZIP onto your computer. Open the extracted folder.
2. In your existing GitHub Pages repository, upload the **contents** of this folder, not the folder or ZIP. Replace previous files. Keep the existing `CNAME` file if a custom domain is already connected.
3. Upload the `content` and `assets` directories, and the `index.html`, `beliefs.html`, `styles.css`, `script.js`, `cms-content.js`, `404.html`, and `.pages.yml` files. **`.pages.yml` begins with a dot and may be hidden in Finder.** On Mac, press `Command + Shift + .` to reveal hidden files.
4. Commit the changes. Make sure GitHub Pages still deploys from `main` and `/(root)`.
5. Go to https://app.pagescms.org, sign in with GitHub, connect the Rise City repository, and edit the website via the three content editors.

**Full editing walkthrough:** `README-EDITING.md`.

## Editors included

- **Home page**: headline, Acts 3:6 introduction, Our Story, Our Heart, mission, and connection text.
- **What We Believe**: all 11 principles with rich-text body fields and Scripture references.
- **Photos, logos and contact links**: image pickers, email, phone, social media, giving URL.

Changes made in Pages CMS are committed to GitHub and are displayed by the site via `cms-content.js`. No WordPress installation, database, build or paid hosting is required for this method. This is a **field-based editor**, not a freeform drag-and-drop page designer. Layout changes still require editing the HTML/CSS.

## Important files

- `.pages.yml` — which visual fields appear in Pages CMS
- `content/home.json` — homepage text
- `content/beliefs.json` — complete statement of faith
- `content/settings.json` — logos, photographs and links
- `cms-content.js` — loads the editable files into the preserved design
- `styles.css` — responsive design + seamlessly blended grayscale

### Preview locally

The file:// preview uses static fallback text, because browsers normally block `fetch` for local JSON. To preview all CMS edits locally, run `python3 -m http.server 8000` inside the extracted directory and visit http://localhost:8000/. For hosting, just upload the files to GitHub Pages.

The existing custom domain DNS records can remain unchanged. If your previous GitHub site contains a `CNAME` file, do not delete it.
