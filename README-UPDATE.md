# Rise City — two additional Coffee buttons

This is a **one-file update** matched to the current RiseCity.Now website and your existing About Us + Coffee navigation changes.

## Added
1. **Meet Rich & Kim page:** a **Let’s Get Coffee ↗** black button at the TOP of the page, above the full-bleed Rich & Kim photograph, in the existing hero overline. The original bottom Coffee’s on Us section remains.
2. **Homepage → Our Story:** a **Let’s Get Coffee ↗** outlined button beside the existing **Meet Rich & Kim ↗** black button. Both wrap cleanly on small screens.
3. The two new buttons use the same URL as your existing Meet Rich & Kim page coffee CTA, from `content/meet-rich-and-kim.json` → `friendship.button_url`, and the same button text from `friendship.button_label`. If you change the calendar destination through Pages CMS, they all update together.
4. The existing **About Us** header link and the **Coffee’s on Us** Connect-page invitation from the previous version of `page-links.js` stay included.

## Installation
1. Open https://github.com/risecitynow/RiseCity.Now/blob/main/page-links.js
2. Replace just the repository-root **page-links.js** with this file and commit.
3. Hard-refresh `https://risecity.now/` and `https://risecity.now/meet-rich-and-kim.html`.
4. Verify that both Let’s Get Coffee buttons open your Calendar appointment page. Test mobile sizes too.

## Do not replace
No need to upload or overwrite your homepage, Meet page, YAML, JSON, images, font files, or CSS. The site uses its existing black-and-white theme.

## Booking URL
Currently in your content JSON: https://calendar.app.google/rResX4KfWwvQAiDc8
The script also contains this as a fallback, so the button works before CMS JSON finishes loading; when CMS JSON arrives, it takes precedence.
