# Personal Website

A professional-leaning personal portfolio and creative space, built with plain HTML, CSS, and JavaScript and hosted with GitHub Pages.

## Development approach

The site is intentionally static-first. It does not require a database, build step, or framework.

- **Pages:** HTML files in the root and section folders.
- **Design:** Shared styles in `assets/css/style.css`.
- **Behavior:** Shared JavaScript in `assets/js/main.js`.
- **Editable content:** `assets/data/site-content.json`.

## Editing content manually

For now, edit `assets/data/site-content.json` directly in GitHub.

- Add project entries to the `projects` array.
- Add music entries to the `music` array.
- Add writing entries to the `writing` array.
- Update the `about.paragraphs` array for the About page.

Each entry can use this structure:

```json
{
  "type": "PROJECT",
  "title": "A project title",
  "description": "A short description."
}
```

Keep the JSON valid: use double quotes and separate entries with commas.

## Future CMS

The content file is kept separate from the page layouts so a Git-based CMS can be added later. Before choosing a CMS, verify that it can edit this content format and works with GitHub Pages. The initial site does not depend on a CMS.

## Local preview

Open `index.html` in a local web server for the most reliable preview, since browsers may restrict loading JSON files from a `file://` URL.

## Deployment

The intended hosting platform is GitHub Pages. Configure the repository's Pages settings to deploy from the `main` branch and the root folder.
