const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'fabricators.json');
const DOCS_PATH = path.join(__dirname, '..', 'docs');
const FAB_DIR = path.join(DOCS_PATH, 'fabricators');

const fabricators = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function homePage() {
  const cards = fabricators
    .map((fab) => {
      const services = fab.services.slice(0, 2).join(' • ');
      return `<article class="card">
        <h2>${fab.name}</h2>
        <div class="tag-row">
          <span class="tag">${fab.region}</span>
          <span class="tag">${fab.city}</span>
          <span class="tag">Lead time: ${fab.lead_time_weeks} wk</span>
        </div>
        <p class="meta">${fab.description}</p>
        <p class="meta">${services}</p>
        <a class="btn" href="fabricators/${fab.slug}/index.html">View profile →</a>
      </article>`;
    })
    .join('\n');

  const body = `
  <header>
    <h1>Quartz Fabricator Directory</h1>
    <p>Each profile is pre-built for GitHub Pages — ready to share with builders, designers, and homeowners.</p>
  </header>
  <main>
    <div class="grid">${cards}</div>
  </main>`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Quartz Fabricator Directory</title>
  <meta name="description" content="Independent microsites for quartz fabricators">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
${body}
</body>
</html>`;

  fs.writeFileSync(path.join(DOCS_PATH, 'index.html'), `${html}\n`);
}

function fabricatorPage(fab) {
  const serviceList = fab.services.map((item) => `<li>${item}</li>`).join('\n');
  const specialtyTags = fab.specialties.map((item) => `<span class="badge">${item}</span>`).join(' ');
  const certTags = fab.certifications.map((item) => `<span class="badge">${item}</span>`).join(' ');

  const body = `
  <div class="page">
    <a class="footer-link" href="../../index.html">← Back to directory</a>
    <header>
      <h1>${fab.name}</h1>
      <p class="meta">${fab.region} • ${fab.city}</p>
    </header>

    <section class="section">
      <h3>What they do</h3>
      <p class="meta">${fab.description}</p>
      <div class="tag-row">${specialtyTags}</div>
    </section>

    <section class="section">
      <h3>Core services</h3>
      <ul class="list">${serviceList}</ul>
    </section>

    <section class="section meta-grid">
      <div>
        <h3>Lead time</h3>
        <p class="meta">${fab.lead_time_weeks} weeks average</p>
      </div>
      <div>
        <h3>Certifications</h3>
        <div class="tag-row">${certTags}</div>
      </div>
    </section>

    <section class="section">
      <h3>Contact</h3>
      <p class="meta">${fab.contact.address}</p>
      <p class="meta">Phone: <a href="tel:${fab.contact.phone}">${fab.contact.phone}</a></p>
      <p class="meta">Email: <a href="mailto:${fab.contact.email}">${fab.contact.email}</a></p>
      <p class="meta">Website: <a class="footer-link" href="${fab.contact.website}" target="_blank" rel="noreferrer">${fab.contact.website} →</a></p>
    </section>
  </div>`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${fab.name} | Quartz Fabricators</title>
  <meta name="description" content="${fab.name} quartz fabrication profile for GitHub Pages">
  <link rel="stylesheet" href="../../assets/style.css">
</head>
<body>
${body}
</body>
</html>`;

  const outDir = path.join(FAB_DIR, fab.slug);
  ensureDir(outDir);
  fs.writeFileSync(path.join(outDir, 'index.html'), `${html}\n`);
}

ensureDir(FAB_DIR);
homePage();
fabricators.forEach(fabricatorPage);
console.log(`Generated ${fabricators.length} microsites in /docs.`);
