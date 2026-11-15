# Rise City — editable GitHub Pages website

This is **the same Rise City HTML website, updated with seamless cool-gray artwork blending** (black-and-white branding, Acts 3:6 hero, citywide mission, photos, and all 11 Apostolic beliefs), with an added **Pages CMS** editing layer. The visual layout, responsive CSS, existing HTML elements and assets are preserved.

## Publish once to GitHub

1. Unzip this package and open the extracted folder.
2. In your existing Rise City GitHub repository, upload **all contents** from the extracted folder, including the hidden `.pages.yml` file, `content` folder, `assets` folder, and `cms-content.js`. **Do not** upload the zip itself. Replace previous versions of `index.html`, `beliefs.html`, and other matching files.
3. In GitHub **Settings → Pages**, choose **Deploy from a branch**, `main`, `/(root)`. If this was already set, leave it as-is.
4. When your GitHub Pages link loads, confirm the design works. Keep your existing custom domain settings; the package does not change DNS or your existing CNAME file.

**Important if replacing an existing GitHub Pages repository with a custom domain:** Preserve the existing `CNAME` file. You may also include the correct `CNAME` in the new upload. Do not remove it when replacing site files.

## Activate your no-code content editor

1. Open **https://app.pagescms.org/**.
2. Sign in with the GitHub account used for Rise City.
3. Authorize/install the Pages CMS GitHub app. Grant it access only to the Rise City repository if you prefer.
4. Open the Rise City repository and its publishing branch (`main`). Pages CMS will detect `.pages.yml`.
5. You will see three editors:
   - **Home page — edit wording**: Acts 3:6 introduction, our story, mission, faith, and connection copy.
   - **What We Believe — 11 articles**: edit each full belief using a rich-text editor, plus its scripture references and section labels.
   - **Photos, logos and contact links**: choose/upload replacement assets, email, social profiles and giving link.
6. Edit a field and **Save**. Pages CMS commits the JSON change to GitHub, and GitHub Pages then serves the new content. No FTP, command line or HTML editing needed for ordinary updates.

### Images and links

The images are stored in `assets/`; you can select existing images or upload new ones through Pages CMS. To preserve the current branding, keep them unchanged unless desired. For a GitHub Pages repository under `username.github.io/rise-city/`, image paths are normalized by `cms-content.js` so they work whether your repository uses a GitHub project URL or your custom domain.

Only enter an email/phone/social URL when it is ready to be public. Empty fields remain hidden. The site deliberately contains no neighborhood, street address or meeting location.

### Check before sharing

- Open the main page and **What We Believe** on phone and desktop after a change.
- If you edit the appearance/layout (rather than text/images), change `styles.css` or the page templates manually.
- This is a **form-based content editor**, not an in-page drag-and-drop website designer.
- Changes to HTML meta descriptions/social previews may need HTML editing for search crawlers; the default metadata remains the original Rise City theme.
- Keep the `content` JSON files and `cms-content.js` together, since the published pages use both.

## Preview locally

Opening `index.html` as a `file://` URL shows its original fallback text. To see edits to `content/*.json` locally, run `python3 -m http.server 8000` from the extracted folder and open `http://localhost:8000/`. Ordinary publishing does **not** require Python; GitHub Pages serves the files as static content.

## FAQ

**Will the site look the same?** Yes: the original design and image positions are retained, with updated background tones and softened image edges for a more seamless appearance. The editable layer updates text and selected image URLs inside the existing layout.

**Do I need WordPress or WXR?** No.

**Can I use Publii instead?** Publii is a good offline static editor, but using this identical design in Publii requires converting the site into a native Publii theme. Pages CMS edits your existing GitHub files directly, so it is the easier fit.

**Will this cost money?** GitHub Pages public-repository hosting and the hosted Pages CMS entry point are free to get started; check the providers' current terms for usage or team features.

**Which version is this?** Rise City — Rise Up and Walk (Acts 3:6), last GitHub Pages edition prior to the WordPress/WXR conversion.
