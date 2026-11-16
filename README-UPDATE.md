# Rise City — reuse the original dark “Your Walk With Christ Matters” section

This patch uses the ORIGINAL HTML structure and CSS classes from the Rise City homepage,
matching the screenshot and preserving the black-and-white design.

Upload these THREE files to the ROOT of your GitHub repository:

- connect.html
- connect.css
- connect.js

They replace the existing THREE files with the same names. No other website files
are included or changed: do not replace .pages.yml, content/connect.json,
content/home.json, content/settings.json, styles.css, cms-content.js, page-links.js,
assets, CNAME, or any of your header/footer configuration.

Result:
- The exact homepage-style dark connection section appears BELOW the Connect form
  and ABOVE the common site footer.
- The headline and introductory paragraph are pulled from the existing homepage
  CMS settings because it reuses the same selectors and CSS classes.
- Email and social URLs are populated from the existing content/settings.json
  through your existing cms-content.js. Fallback links match the checked live repo.
- The button in the dark section points to #connection-form within the SAME page.
- The previous white closing remains in the HTML but is hidden by default; you can
  opt to show it later by adding the optional `show_original_closing` field.
- The existing Connect "Show closing section" checkbox controls the NEW dark block.

The existing form delivery configuration is untouched. No emails are sent by
uploading these files, and no live form-submission test has been performed.
