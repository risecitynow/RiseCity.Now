RISE CITY — CONNECTION PAGE
===========================
This package was built to add to your existing site WITHOUT replacing your current
styles.css, page-links.js, cms-content.js, assets, content/chrome.json, or other CMS data.

Files to upload to your GitHub repository root:
- connect.html
- connect.css
- connect.js
- connect-thanks.html
- content/connect.json

PAGES CMS
1. Open your existing `.pages.yml` in the repository on GitHub.
2. Scroll to the very bottom.
3. Paste everything from APPEND-TO-pages.yml.txt, beginning with `- name: connect`.
   IMPORTANT: Do not paste the comment inside the 'content:' block? The entire
   fragment is a top-level array entry under `content:` at same indentation as
   `- name: events`, `- name: give`, etc. Do not create a second `content:` key.
4. Commit, refresh Pages CMS. You now have `08 • CONNECT` editor.

IMPORTANT: ENABLE EMAIL DELIVERY
This static GitHub Pages form sends submissions through https://formsubmit.co/
using POST to risecitynow@gmail.com. FormSubmit sends a ONE-TIME activation email
when the form is first submitted. Check that inbox (and spam), approve the form,
and then submit a real test connection card. Until confirmed, submissions are not
actively delivered to the inbox. Do not announce the form until activation and a
successful test delivery have been confirmed.

Connect the website's existing header button:
In Pages CMS → `04 • Navigation, Buttons & Site Information` → `Navigation` →
`Get Connected` button URL, change `index.html#connect` to `connect.html`.
If your CMS display is different, edit `content/chrome.json` directly:
`navigation.cta_url = "connect.html"`.
Your existing header appearance and footer colors are NOT changed.
On the homepage, you may also point the Contact section CTA to `connect.html`.
The Events button can point to `connect.html?interest=prayer` etc once an option
matches the dropdown; optional.

Forms include: first name, last name, email (required), phone (optional), reason
(dropdown required) and a brief optional message. No visitor data is written to GitHub.

YOUR PRIVACY AND SECURITY
- A third-party (FormSubmit) processes the form data and emails the responses.
- Keep spam protection enabled. Never expose private account credentials in CMS.
- Do not solicit sensitive personal details in a public connection card.
- A form in this ZIP has not been sent to or tested with your real inbox; activation
  and a live test are essential. No email was sent by creating this package.

If FormSubmit is not the right processor for your church, replace the form
endpoint with an approved alternative and its verified form ID.
