# quartz-fabricators

Static GitHub Pages for a set of quartz fabricators. The repo ships with structured data, a build script, and pre-generated pages in `/docs` so you can publish immediately.

## What's included
- `data/fabricators.json` — editable catalog of shops with slugs, contact info, and services.
- `scripts/build-pages.js` — Node-based generator that builds a homepage plus a dedicated site for each fabricator.
- `docs/` — output folder suitable for GitHub Pages (project site). Each fabricator lives in `docs/fabricators/<slug>/`.

## Usage
1. Update or add entries in `data/fabricators.json`.
2. Run the build to regenerate the static pages:
   ```bash
   npm run build
   ```
3. Commit the refreshed `docs` output and push. Configure GitHub Pages to serve from the `docs` folder.

After publishing, you can browse the gallery at `/docs/index.html` (or the GitHub Pages URL) and click into each fabricator's standalone microsite.
