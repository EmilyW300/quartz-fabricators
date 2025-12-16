const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'fabricators.json');
const docsDir = path.join(__dirname, '..', 'docs');
const fabricatorsDir = path.join(docsDir, 'fabricators');
const assetsDir = path.join(docsDir, 'assets');

const fabricators = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function baseHtml({ title, body, basePath }) {
  const safeBase = basePath || '.';
  const assetsHref = `${safeBase}/assets/styles.css`;
  const homeHref = `${safeBase}/`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="stylesheet" href="${assetsHref}" />
</head>
<body>
  <header class="site-header">
    <div class="logo">Quartz Fabricators</div>
    <nav class="breadcrumb">
      <a href="${homeHref}">Home</a>
    </nav>
  </header>
  <main>
    ${body}
  </main>
  <footer class="site-footer">
    <p>Built for GitHub Pages — each fabricator has a standalone site.</p>
  </footer>
</body>
</html>`;
}

function cardGrid(fabricatorList) {
  return fabricatorList
    .map(
      (fabricator) => `
      <article class="card">
        <h2>${fabricator.name}</h2>
        <p class="tagline">${fabricator.tagline}</p>
        <p class="meta">${fabricator.location}</p>
        <ul class="pill-list">
          ${fabricator.services.slice(0, 3).map((service) => `<li>${service}</li>`).join('')}
        </ul>
        <a class="button" href="./fabricators/${fabricator.slug}/">View site</a>
      </article>
    `
    )
    .join('\n');
}

function renderIndex() {
  const body = `
    <section class="hero">
      <div>
        <p class="eyebrow">Quartz Network</p>
        <h1>Quartz fabricators you can publish to GitHub Pages in one click.</h1>
        <p class="lede">Review each shop's capabilities, then click through to its dedicated microsite hosted in this repository.</p>
      </div>
    </section>
    <section>
      <div class="section-header">
        <h2>Fabricator gallery</h2>
        <p>Curated shops with their own ready-to-ship GitHub Pages sites.</p>
      </div>
      <div class="grid">${cardGrid(fabricators)}</div>
    </section>
  `;

  const html = baseHtml({ title: 'Quartz Fabricators', body, basePath: '.' });
  fs.writeFileSync(path.join(docsDir, 'index.html'), html, 'utf-8');
}

function renderFabricatorPage(fabricator) {
  const body = `
    <section class="hero">
      <div>
        <p class="eyebrow">${fabricator.location}</p>
        <h1>${fabricator.name}</h1>
        <p class="lede">${fabricator.tagline}</p>
        <div class="actions">
          <a class="button" href="${fabricator.contact.website}" target="_blank" rel="noreferrer">Visit website</a>
          <a class="button ghost" href="mailto:${fabricator.contact.email}">Request a quote</a>
        </div>
      </div>
    </section>
    <section class="two-column">
      <div>
        <h2>About</h2>
        <p>${fabricator.about}</p>
        <h3>Highlights</h3>
        <ul class="check-list">
          ${fabricator.highlights.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <div>
        <h2>Services</h2>
        <ul class="pill-list">
          ${fabricator.services.map((service) => `<li>${service}</li>`).join('')}
        </ul>
        <div class="contact-card">
          <h3>Contact</h3>
          <p><strong>Phone:</strong> ${fabricator.contact.phone}</p>
          <p><strong>Email:</strong> <a href="mailto:${fabricator.contact.email}">${fabricator.contact.email}</a></p>
          <p><strong>Site:</strong> <a href="${fabricator.contact.website}" target="_blank" rel="noreferrer">${fabricator.contact.website}</a></p>
        </div>
      </div>
    </section>
  `;

  const html = baseHtml({ title: `${fabricator.name} — Quartz Fabricator`, body, basePath: '../..' });
  const outputDir = path.join(fabricatorsDir, fabricator.slug);
  ensureDir(outputDir);
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf-8');
}

function writeStyles() {
  const styles = `
:root {
  --ink: #0f172a;
  --subtle: #475569;
  --muted: #cbd5e1;
  --accent: #7c3aed;
  --bg: #0b1021;
  --card: #121833;
  --border: #1e293b;
  --surface: #0f172a;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: radial-gradient(circle at top left, #111827 0%, #0b1021 45%, #070a16 100%);
  color: #e2e8f0;
  line-height: 1.6;
  min-height: 100vh;
}

a {
  color: #c4b5fd;
  text-decoration: none;
}

a:hover {
  color: #a78bfa;
}

main {
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px 20px 80px;
}

.site-header, .site-footer {
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #cbd5e1;
}

.logo {
  font-weight: 700;
  letter-spacing: 0.02em;
}

.breadcrumb a {
  font-size: 14px;
  color: #94a3b8;
}

.hero {
  padding: 32px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.22), rgba(99, 102, 241, 0.25));
  border: 1px solid #312e81;
  border-radius: 18px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
}

.hero h1 {
  margin-top: 6px;
  margin-bottom: 10px;
  font-size: 32px;
  line-height: 1.3;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  color: #c7d2fe;
}

.lede {
  color: #cbd5e1;
  max-width: 720px;
  font-size: 16px;
}

.section-header {
  margin-top: 36px;
  margin-bottom: 16px;
}

.section-header h2 {
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

.card {
  background: rgba(17, 24, 39, 0.75);
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
}

.card h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

.tagline {
  color: #cbd5e1;
  margin-top: 0;
}

.meta {
  color: #94a3b8;
  margin-bottom: 12px;
}

.pill-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 16px 0;
}

.pill-list li {
  background: #111827;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid #1f2937;
  color: #e2e8f0;
  font-size: 14px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 14px 30px rgba(99, 102, 241, 0.35);
}

.button:hover {
  transform: translateY(-1px);
}

.button.ghost {
  background: transparent;
  border: 1px solid #4338ca;
  box-shadow: none;
}

.two-column {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 26px;
}

.check-list {
  list-style: none;
  padding: 0;
  margin: 12px 0 0 0;
}

.check-list li::before {
  content: '✔';
  color: #a78bfa;
  margin-right: 8px;
}

.contact-card {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 14px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.site-footer {
  color: #94a3b8;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 14px;
}

@media (max-width: 640px) {
  main, .site-header, .site-footer {
    padding-left: 16px;
    padding-right: 16px;
  }
}
`;

  ensureDir(assetsDir);
  fs.writeFileSync(path.join(assetsDir, 'styles.css'), styles, 'utf-8');
}

function build() {
  ensureDir(docsDir);
  ensureDir(fabricatorsDir);
  writeStyles();
  renderIndex();
  fabricators.forEach(renderFabricatorPage);
  console.log(`Generated ${fabricators.length} fabricator sites in docs/`);
}

build();
