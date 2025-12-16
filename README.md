# Quartz Fabricators

A GitHub Pages-ready directory and set of standalone microsites for quartz fabricators. The root `index.html` lists every partner with links to their dedicated pages under `fabricators/<slug>/`.

## Data-driven content
- Fabricator data lives in `data/fabricators.json`.
- Run the build script to regenerate the index and all microsites after editing the data file:

```bash
node scripts/build.js
```

## Publishing with GitHub Pages
- Commit the generated HTML in this repository (already included).
- Enable GitHub Pages with the `main` branch as the source (root directory).
- The live site will be available at `https://<your-user>.github.io/quartz-fabricators/`, and each fabricator page will be at `https://<your-user>.github.io/quartz-fabricators/fabricators/<slug>/`.
