# Quartz Fabricators

Static directory of quartz fabricators, pre-rendered for GitHub Pages. The site lives in `docs/` so it can be published directly via the GitHub Pages setting that targets the `/docs` folder. Each fabricator gets its own dedicated page at `/fabricators/<slug>/`.

## Local preview / rebuild

1. Update `data/fabricators.json` with new entries or edits.
2. Run the generator to rebuild the static pages:

   ```bash
   node scripts/build.js
   ```

3. Open `docs/index.html` in a browser to browse the directory.

## Adding another fabricator

Add a new object to `data/fabricators.json` with the shape below, then re-run the build script. The slug value becomes the folder name under `docs/fabricators/`.

```json
{
  "slug": "new-shop",
  "name": "New Shop",
  "region": "Region name",
  "city": "City, ST",
  "description": "One-line summary.",
  "services": ["service 1", "service 2"],
  "specialties": ["tag 1", "tag 2"],
  "certifications": ["cert 1"],
  "lead_time_weeks": 2,
  "contact": {
    "phone": "(000) 000-0000",
    "email": "info@example.com",
    "website": "https://example.com",
    "address": "123 Main St, City, ST"
  }
}
```

After committing the generated files, enable GitHub Pages for the `docs/` folder. Every fabricator will then have a standalone page you can share.
