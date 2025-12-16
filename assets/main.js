async function loadVendors() {
  const grid = document.querySelector('.grid');
  const empty = document.getElementById('vendors-empty');

  try {
    const response = await fetch('data/vendors.json');
    const vendors = await response.json();

    if (!Array.isArray(vendors) || vendors.length === 0) {
      empty.hidden = false;
      return;
    }

    vendors.forEach((vendor) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img src="${vendor.image}" alt="${vendor.name}">
        <div class="card-content">
          <div class="meta">
            <span class="badge">${vendor.years} 年經驗</span>
            <span>${vendor.location}</span>
          </div>
          <h3>${vendor.name}</h3>
          <p class="desc">${vendor.description}</p>
          <div class="tags">${vendor.highlights
            .slice(0, 3)
            .map((item) => `<span class="badge">${item}</span>`)
            .join('')}</div>
          <a class="button" href="vendor.html?id=${encodeURIComponent(
            vendor.id
          )}">查看專屬頁面 →</a>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (error) {
    console.error('載入廠商資料失敗', error);
    empty.hidden = false;
  }
}

document.addEventListener('DOMContentLoaded', loadVendors);
