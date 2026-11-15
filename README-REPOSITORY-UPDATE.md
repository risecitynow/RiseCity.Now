# Rise City — Full-width hero + readable footer, compatible with your GitHub repo

Public repository: https://github.com/risecitynow/RiseCity.Now

## IMPORTANT: Keep your two recently updated images

Your repository already contains newer media than the older offline project copy.
The safest update is **RiseCityNow-Safe-Update-Hero-Footer.zip**. It does NOT
include `assets/`, `content/`, or `CNAME`, so uploading it to your existing
GitHub repository preserves those current files exactly, including the two
recently changed images and any edits saved from Pages CMS.

We confirmed the repository `assets/rise-city-people.webp` is larger/different
than the previous locally held version. The complete ZIP is a standalone
reference package; its assets are not verified byte-identical to your live repo.

### Existing site — recommended workflow

1. Download **RiseCityNow-Safe-Update-Hero-Footer.zip** and extract it.
2. In your existing repository (`main`), upload those files into the repository
   ROOT. Replace the matching `index.html`, `styles.css`, `cms-content.js`,
   and `.pages.yml` files. Do not delete files not included in the patch.
3. **Do not replace or delete `assets/`, `content/` or `CNAME`.**
4. Commit. After deployment refresh the site (Shift-Reload).
5. In Pages CMS, set **Hero Image Width = full** and **Hero Image Fit = natural**
   (whole image) or **cover** (may crop). A missing new width setting defaults
   to full in the updated code.
6. In Appearance, the **Footer Background** may be white, light gray or black:
   footer text/wordmark contrast now adapts automatically for readability.

The separate `RiseCityNow-Pages-CMS-Footer.yml` is an exact copy of `.pages.yml`.
On GitHub the file MUST be named exactly `.pages.yml` at repository root.

### Complete ZIP

The complete ZIP includes HTML, CSS, JS, `content/`, `assets/`, `CNAME`, and
`.pages.yml` for an offline backup/fresh repository, **but its bundled images
may predate the two most recent replacements in your live GitHub repository**.
For the existing live repository, the SAFE update is strongly recommended.
