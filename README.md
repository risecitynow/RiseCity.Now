# Rise City — GitHub Pages Website

A polished, mobile-friendly static Rise City church website using your rose-gold logo. Created with HTML, CSS, and vanilla JavaScript. No build tools or database required.

## Publish to GitHub Pages

1. Create a new **public** repository on [GitHub](https://github.com/new), e.g. `rise-city`.
2. Upload **all files and the `assets` folder** from this package into the repository root. Keep the directory structure.
3. Go to the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**. Choose branch `main` and folder `/(root)`, and click **Save**.
5. Your published address will look like `https://YOUR-USERNAME.github.io/rise-city/`.

For a repository named `YOUR-USERNAME.github.io`, your homepage instead appears at `https://YOUR-USERNAME.github.io/`.

## Enter your real church details

Edit **`site.config.js`**; replace empty values with accurate details. Empty values are hidden, and unconfirmed gathering details display a "coming soon" message.

```js
window.RISE_CITY_CONFIG = {
  gatheringDay: "Sundays",
  gatheringTime: "2:00 PM",
  campusName: "Your campus name",
  address: "Your real street address",
  email: "hello@your-real-domain.com",
  instagram: "https://instagram.com/your-real-handle",
  facebook: "https://facebook.com/your-real-page",
  youtube: "https://youtube.com/@your-real-channel",
  givingUrl: "https://your-real-giving-provider.example"
};
```

*The above values are illustrative only; don't publish invented address, schedule, links, or email addresses.*

If you add a physical address, a working Google Maps link appears. If you provide an email, the contact form appears. The form opens the visitor's **email application**, prefilled with their note; GitHub Pages is static hosting and **cannot collect form submissions** itself. For backend form delivery, connect a dedicated service after creating your own account.

## File guide

- `index.html`: page structure and website copy.
- `styles.css`: typography, responsive layout, colors, animations.
- `script.js`: mobile menu, scroll effects, configuration, contact mailto behavior.
- `site.config.js`: change gathering details, email, social and giving links in one place.
- `assets/rise-city-logo.webp`: web-optimized logo created from the uploaded picture.
- `assets/rise-city-logo-original.png`: full-quality copy of the original logo.
- `assets/favicon.svg`: small custom skyline browser icon.
- `assets/social-preview.jpg`: image for social previews.
- `404.html`: friendly not-found page.
- `.nojekyll`: tells GitHub Pages not to run Jekyll.

## Custom domain (optional)

When you own a domain, open **Settings → Pages → Custom domain** and enter it. Follow the official [GitHub DNS instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site), then enable **Enforce HTTPS** once the certificate is available. No `CNAME` is included because no confirmed domain was supplied.

## Local testing

Open `index.html` in a browser, or run `python3 -m http.server 8000` from the site folder and visit `http://localhost:8000/`.

## Privacy and accessibility

No analytics, cookies, or tracking are included. The site supports keyboard focus, skip navigation, accessible mobile menu, native expandable questions, responsive layout, and reduced motion. Google Fonts are optional, and fallback fonts are available.

**Social sharing:** Once the final GitHub Pages or custom domain is known, edit `index.html` and change the Open Graph image metadata (`og:image`) from `assets/social-preview.jpg` to its full public `https://.../assets/social-preview.jpg` address so social platforms reliably display the preview.
