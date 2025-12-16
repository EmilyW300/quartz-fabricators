const fs = require('fs/promises');
const path = require('path');

const rootDir = process.cwd();
const dataPath = path.join(rootDir, 'data', 'fabricators.json');
const fabricatorsDir = path.join(rootDir, 'fabricators');

const styleHrefRoot = 'assets/styles.css';
const styleHrefNested = '../../assets/styles.css';

const headerHtml = (title, stylesheet) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="stylesheet" href="${stylesheet}" />
</head>
<body>`;

const footerHtml = `
  <footer>
    Quartz Fabricators Showcase · Built for GitHub Pages
  </footer>
</body>
</html>`;

const renderChips = (items) => items.map((item) => `<span class="chip">${item}</span>`).join('\n');

const renderList = (items) => `<ul class="list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;

const renderFabricatorPage = (fabricator) => {
  return `${headerHtml(`${fabricator.name} · Quartz Fabricator`, styleHrefNested)}
  <main>
    <section class="hero">
      <div class="hero-card">
        <h1>${fabricator.name}</h1>
        <div class="meta">
          <span>📍 ${fabricator.location}</span>
          <span>🗺️ ${fabricator.region}</span>
        </div>
        <p class="lead">${fabricator.summary}</p>
        <div class="contact-buttons">
          <a class="button" href="tel:${fabricator.contact.phone.replace(/[^\d+]/g, '')}">Call</a>
          <a class="button" href="mailto:${fabricator.contact.email}">Email</a>
          <a class="button" href="${fabricator.contact.website}" target="_blank" rel="noopener">Website</a>
        </div>
      </div>
      <div class="surface">
        <h3>Capabilities</h3>
        <div class="section">
          <strong>Services</strong>
          ${renderList(fabricator.services)}
        </div>
        <div class="section">
          <strong>Specialties</strong>
          ${renderList(fabricator.specialties)}
        </div>
        <div class="section meta">
          <span>⏱️ Lead time: ${fabricator.leadTime}</span>
          <span>✅ Credentials: ${fabricator.certifications.join(', ')}</span>
        </div>
      </div>
    </section>
  </main>
${footerHtml}`;
};

const renderIndexPage = (fabricators) => {
  const cards = fabricators
    .map(
      (fabricator) => `
      <article class="card">
        <h2>${fabricator.name}</h2>
        <div class="meta">
          <span>📍 ${fabricator.location}</span>
          <span>🗺️ ${fabricator.region}</span>
        </div>
        <p class="lead">${fabricator.summary}</p>
        <div class="chips">${renderChips(fabricator.specialties.slice(0, 3))}</div>
        <a class="button" href="fabricators/${fabricator.slug}/">View site</a>
      </article>`
    )
    .join('\n');

  return `${headerHtml('Quartz Fabricators · Directory', styleHrefRoot)}
  <header>
    <p class="chip">GitHub Pages Ready</p>
    <h1>Quartz Fabricators</h1>
    <p class="lead">Each fabricator below has its own microsite. Publish this repository with GitHub Pages to deliver a polished directory and standalone profiles for every partner.</p>
  </header>
  <main>
    <section class="grid">
      ${cards}
    </section>
  </main>
${footerHtml}`;
};

async function build() {
  const data = await fs.readFile(dataPath, 'utf8');
  const fabricators = JSON.parse(data);

  await fs.mkdir(fabricatorsDir, { recursive: true });

  const indexHtml = renderIndexPage(fabricators);
  await fs.writeFile(path.join(rootDir, 'index.html'), indexHtml, 'utf8');

  for (const fabricator of fabricators) {
    const targetDir = path.join(fabricatorsDir, fabricator.slug);
    await fs.mkdir(targetDir, { recursive: true });
    const html = renderFabricatorPage(fabricator);
    await fs.writeFile(path.join(targetDir, 'index.html'), html, 'utf8');
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
