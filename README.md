# RISE CITY — GitHub Pages Website

A responsive, static, two-page church website built around the Acts 3:6 theme **“Rise Up and Walk”** and the newer black-and-white Rise City branding.

## Included

- `index.html` — Acts 3:6 homepage, Rise Up and Walk invitation, about, heart, 11-belief navigation, citywide gospel mission, connect
- `beliefs.html` — full *What We Believe* statement: all 11 principles and Scripture references, with Acts 3:6 thematic connection
- `styles.css` — responsive layout and black-and-white visual identity
- `script.js` — mobile navigation, current year, church contact/social link rendering
- `site.config.js` — **edit this file first** to add contact details and social media links
- `404.html` — friendly missing-page screen
- `.nojekyll` — helps GitHub Pages publish files directly
- `assets/` — optimized files generated from your four uploaded images: RC monogram, Rise City wordmark, Rise City NOW banner, and portrait photo

## Upload to GitHub (no developer tools required)

1. Download and **unzip** `Rise-City-Rise-Up-and-Walk-Website.zip` on your computer.
2. Visit https://github.com/new and create a **Public** repository, such as `rise-city`.
3. In your new repository, click **Add file → Upload files** (or the "uploading an existing file" link).
4. Open the extracted folder. Select **everything inside** it — the `index.html` and `beliefs.html` files, `assets` folder, and other site files. Drag them onto GitHub. Do **not** upload only the outer folder or the ZIP.
5. Click **Commit changes**.
6. Go to **Settings → Pages**. Under *Build and deployment*, set **Source = Deploy from a branch**, **Branch = main**, **Folder = /(root)**, then Save.
7. GitHub will provide a URL like `https://YOUR-USERNAME.github.io/rise-city/`.

The site uses relative links (`beliefs.html`, `assets/...`), so it works both at a GitHub project URL and with a connected domain.

## Add church information

Open `site.config.js` in the repository, click the pencil icon, and edit the quoted strings. For example:

```js
window.RISE_CITY_CONFIG = {
  email: "hello@example.org",
  phone: "",
  instagram: "https://www.instagram.com/YOURHANDLE/",
  facebook: "",
  youtube: "",
  givingUrl: ""
};
```

The example above is illustrative; the downloaded file has unknown details **blank**. Unconfigured contact details remain hidden or display a neutral coming-soon message. For social links and online giving, use full URLs beginning with `https://`.

Changes to `site.config.js` take effect when GitHub Pages republishes your commit. This version intentionally avoids listing a physical meeting site, neighborhood, or specific city name: its outreach message is **sharing the gospel all over the city**.

## Custom domain (optional)

1. In your repository, go to **Settings → Pages → Custom domain** and enter the domain you own, e.g. `risecitynow.com`. Save.
2. At the domain DNS provider (GoDaddy, Squarespace Domains, Cloudflare, etc.), create these GitHub Pages **A** records for the root (`@`):

   | Type | Host | Value |
   |------|------|-------|
   | A | @ | `185.199.108.153` |
   | A | @ | `185.199.109.153` |
   | A | @ | `185.199.110.153` |
   | A | @ | `185.199.111.153` |

3. Add a `www` **CNAME** pointing to `YOUR-USERNAME.github.io` (without `https://` and without the repository name).
4. Remove any **conflicting** existing parking/website DNS records, but preserve mail service records (MX, SPF/DKIM, etc.).
5. After DNS and certificate provisioning complete, enable **Enforce HTTPS** in GitHub Pages.

Authoritative guide: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## How to edit the What We Believe page

- All eleven beliefs are visible in **`beliefs.html`**, and the homepage links directly to each section.
- Open `beliefs.html` in GitHub, click Edit, change only the text you need, and commit.
- To edit the short homepage beliefs list, open `index.html` and find `belief-link-grid`.
- This is a static website: it needs no database, build, paid hosting, or server-side code.

## Technical notes

- The header's social and contact data are set in `site.config.js`; no data is sent to an external service.
- The site intentionally does not include a fake working contact form. GitHub Pages is static hosting and cannot receive form submissions by itself; a third-party form service can be connected later.
- Uses web fonts when online and system sans-serif fallbacks otherwise.
- The graphic assets have been optimized for fast page loading. All branded photographs/logos are from the four supplied images.

## Central theme — Acts 3:6

**Rise Up and Walk** is the central theme across the homepage, the statement-of-faith introduction, navigation metadata, and footers.

> “In the name of Jesus Christ of Nazareth rise up and walk.” — Acts 3:6 (KJV)

This quotation comes from the account of Peter speaking to a man unable to walk. The site describes the healing faithfully and then clearly distinguishes Rise City's *application* of the text: rise in faith, walk with Christ, and carry the gospel all over the city. The previous citywide statement is retained as **mission**, rather than the primary identity.

No street address, neighborhood, or specific city name is shown.
