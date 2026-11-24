# Rise City — About Us header + Coffee on Us Connect page

Prepared against the public main branch of risecitynow/RiseCity.Now on 2026-11-24.

## What changes
Only `page-links.js` changes. Replace that one file in the ROOT of your GitHub repository.

- Adds **About Us** to desktop and mobile headers, linking to `meet-rich-and-kim.html`.
- Preserves **Our Story** and its existing homepage anchor.
- Highlights About Us when visitors are on Meet Rich & Kim.
- Keeps the existing Events and Give navigation and their Pages CMS show/hide controls.
- On `connect.html`, adds a black-and-white **Coffee's on Us** invitation beneath the intro callout and before the form on mobile. The scheduling button reads its URL from `content/meet-rich-and-kim.json` under `friendship.button_url` (current value: https://calendar.app.google/rResX4KfWwvQAiDc8). A fallback URL is present if loading content fails.
- Adds a second link to Meet Rich & Kim from the coffee invitation.
- Responsive navigation spacing at desktop/tablet sizes without overriding header/footer colors or logo styles.

## Upload
1. In GitHub open https://github.com/risecitynow/RiseCity.Now/blob/main/page-links.js
2. Edit/replace `page-links.js` with the file in this package (or upload with replacement to repository root).
3. Commit, then hard refresh your browser.
4. Test the About Us link on desktop and mobile; on Connect verify 'Schedule coffee' opens your calendar.

## Important safety notes
- DO NOT upload/replace `.pages.yml`, `content/chrome.json`, `content/meet-rich-and-kim.json`, your photographs, or existing page HTML. The update preserves your current live content and Google Calendar link.
- The About Us link is added automatically even if it is not yet a separate entry in Pages CMS. If you want to edit/order it via the CMS, add a menu item under 04 > Header, menu & Get Connected button > Navigation items, with label `About Us` and destination `meet-rich-and-kim.html`. The script recognizes it and avoids duplicates.
- Google Calendar's booking service may require sign-in or may restrict bookings; test availability in your own browser. The script verifies the URL syntax and destination but cannot guarantee appointment availability.
