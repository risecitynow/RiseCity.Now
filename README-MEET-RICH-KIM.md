# Meet Rich & Kim — Rise City website add-on

This is a new page, built to use the same `styles.css`, header/footer, white/gray/black palette, and typography as the live Rise City site. It uses the exact uploaded photo without changing faces, clothing, or the RC monogram.

## Upload files to GitHub (safe approach)

Upload `meet-rich-and-kim.html`, `meet-rich-and-kim.css`, `meet-rich-and-kim.js`, `assets/rich-and-kim-monogram.png`, and `content/meet-rich-and-kim.json` to the matching paths in your repository. **Do not replace `styles.css`, `cms-content.js`, assets other than the new image, `CNAME`, or existing content JSON files.**

## Add the Our Story button (one small edit)

Open `index.html` on GitHub, click Edit, and find the Our Story section (`id="our-story"`). Immediately before `<div class="story-footer">`, paste the one-line button from `OUR-STORY-BUTTON-PASTE.html`. Commit. It uses the current site's existing `btn btn-black` styles. This is the recommended approach because your live repository may have newer changes than the last local website ZIP.

If you prefer a ready-made but older index.html, it is provided **separately** inside the optional `RiseCity-Meet-Integrated-Index-OPTIONAL.zip`. Back up the current GitHub `index.html` first because the optional file is based on an earlier local snapshot and may overwrite newer live changes.

## Pages CMS

Open `.pages.yml` in GitHub and APPEND the entire text from `APPEND-TO-pages.yml.txt` at the document root after the last existing section; do not replace `.pages.yml` or indent this snippet beneath an existing field. A new editor, `09 • MEET RICH & KIM`, will appear. The rest of your CMS stays intact. The button added via the one-line paste is a fixed link; its destination can be changed directly in `index.html`. The optional integrated index version uses the JSON-driven `home_button_label` and `home_button_url` settings and loads `meet-rich-and-kim.js` on the homepage.

## Coffee button

The 'Let's get coffee' button launches an email to `risecitynow@gmail.com` with the subject 'Coffee with Rich and Kim'. It works without a form backend. You can later change it to `connect.html` in Pages CMS after the Connect page is published.

## Page address after publication

https://risecity.now/meet-rich-and-kim.html

## Design integrity

Header, footer, logo and original site CSS are unchanged. The new CSS is scoped to the Meet page, apart from a single optional class used by the integrated homepage button.


## Revision: people-first language + full-width photograph
The biography now refers generally to shared backgrounds in **service-based industries**, without degrees, employers, job titles or specific occupations. The three editable service cards focus on **listen, serve and connect**.
The original uploaded photo remains unchanged. The hero image is now full-bleed across the browser viewport, in the same width:100%, height:auto pattern as the homepage banner; on mobile, it uses a centered cover crop so Rich and Kim remain recognizable.
If you already installed the previous Meet page, replace `meet-rich-and-kim.html`, `meet-rich-and-kim.css` and `content/meet-rich-and-kim.json` only. No changes to `.pages.yml` are necessary because the existing field keys are retained.
