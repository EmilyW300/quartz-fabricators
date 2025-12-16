function getVendorId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderVendor(vendor) {
  document.title = `${vendor.name} | 石英加工商`;
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <div>
      <a class="back-link" href="./">← 返回列表</a>
      <h1>${vendor.name}</h1>
      <div class="meta">
        <span class="badge">${vendor.years} 年經驗</span>
        <span>${vendor.location}</span>
      </div>
      <p class="info">${vendor.description}</p>
      <div class="tags">${vendor.highlights
        .map((item) => `<span class="badge">${item}</span>`)
        .join('')}</div>
    </div>
    <img src="${vendor.image}" alt="${vendor.name}">
  `;

  const services = document.getElementById('services');
  services.innerHTML = vendor.services.map((item) => `<li>${item}</li>`).join('');

  const contact = document.getElementById('contact');
  contact.innerHTML = `
    <div class="detail">
      <h3>電話</h3>
      <a href="tel:${vendor.contact.phone}">${vendor.contact.phone}</a>
    </div>
    <div class="detail">
      <h3>Email</h3>
      <a href="mailto:${vendor.contact.email}">${vendor.contact.email}</a>
    </div>
    <div class="detail">
      <h3>網站</h3>
      <a href="${vendor.contact.website}" target="_blank" rel="noopener">${vendor.contact.website}</a>
    </div>
  `;
}

async function initVendorPage() {
  const vendorId = getVendorId();
  if (!vendorId) {
    document.getElementById('not-found').hidden = false;
    return;
  }

  try {
    const response = await fetch('data/vendors.json');
    const vendors = await response.json();
    const vendor = vendors.find((item) => item.id === vendorId);

    if (!vendor) {
      document.getElementById('not-found').hidden = false;
      return;
    }

    renderVendor(vendor);
  } catch (error) {
    console.error('載入廠商資料失敗', error);
    document.getElementById('not-found').hidden = false;
  }
}

document.addEventListener('DOMContentLoaded', initVendorPage);
