// ══════════════════════════════════════════
// PWA SERVICE WORKER REGISTRATION
// ══════════════════════════════════════════
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('[PWA] Service Worker registered:', reg.scope))
      .catch(err => console.error('[PWA] Service Worker registration failed:', err));
  });
}

// ══════════════════════════════════════════
// PWA INSTALL PROMPT & OFFLINE DETECTION
// ══════════════════════════════════════════
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show custom PWA installation banner if present
  const installBanner = document.getElementById('pwa-install-banner');
  if (installBanner) {
    installBanner.style.display = 'flex';
  }
});

function triggerInstallApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('[PWA] User installed the app');
    } else {
      console.log('[PWA] User dismissed the install prompt');
    }
    deferredPrompt = null;
    const installBanner = document.getElementById('pwa-install-banner');
    if (installBanner) installBanner.style.display = 'none';
  });
}

function updateOnlineStatus() {
  const offlineBanner = document.getElementById('offline-banner');
  if (offlineBanner) {
    if (navigator.onLine) {
      offlineBanner.classList.remove('active');
      showToast('Tizim onlayn rejimda ishlamoqda');
    } else {
      offlineBanner.classList.add('active');
      showToast('Aloqa uzildi. Offline rejimda ishlashda davom etishingiz mumkin');
    }
  }
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// ══════════════════════════════════════════
// LIGHT / DARK MODE THEME MANAGEMENT
// ══════════════════════════════════════════
function initTheme() {
  const savedTheme = localStorage.getItem('aps_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
  updateThemeToggleIcon();
}

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const activeTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
  localStorage.setItem('aps_theme', activeTheme);
  updateThemeToggleIcon();
  showToast(activeTheme === 'light' ? 'Yorug\' mavzu yoqildi' : 'Qorong\'u mavzu yoqildi');
}

function updateThemeToggleIcon() {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
  }
}

// ══════════════════════════════════════════
// DEFAULT PRESETS (LOCAL STORAGE COHESION)
// ══════════════════════════════════════════
const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Un', unit: 'qop (50 kg)', stock: 248, price: 65000, icon: '🌾', sold: 320 },
  { id: 'p2', name: 'Sholi', unit: 'paket (5 kg)', stock: 92, price: 14500, icon: '🌾', sold: 185 },
  { id: 'p3', name: 'O\'simlik yog\'i', unit: 'litr', stock: 18, price: 12000, icon: '🫙', sold: 90 },
  { id: 'p4', name: 'Shakar', unit: 'qop (50 kg)', stock: 134, price: 48000, icon: '🍬', sold: 134 }
];

const DEFAULT_CLIENTS = [
  { id: 'c1', name: 'Alijon Toshmatov', phone: '+998 90 123 45 67', address: 'Yunusobod tuman, 5-kvartal', totalSpend: 1240000, debt: 120000, history: [
    { date: '12-iyun', type: 'Naqd', desc: 'Sotib olindi', amount: 85000 },
    { date: '05-iyun', type: 'Nasiya', desc: 'Qarzga olindi', amount: 120000 }
  ], status: 'Faol' },
  { id: 'c2', name: 'Sarvinoz Raximova', phone: '+998 93 456 78 90', address: 'Chilonzor tuman, 9-kvartal', totalSpend: 890000, debt: 0, history: [
    { date: '10-iyun', type: 'Karta', desc: 'Sotib olindi', amount: 65000 }
  ], status: 'Faol' },
  { id: 'c3', name: 'Jasur Mirzayev', phone: '+998 94 987 65 43', address: 'Shayxontohur tuman, Labzak', totalSpend: 2040000, debt: 340000, history: [
    { date: '14-may', type: 'Nasiya', desc: 'Qarzga olindi', amount: 340000 }
  ], status: 'Faol' },
  { id: 'c4', name: 'Nodira Karimova', phone: '+998 97 111 22 33', address: 'Mirzo Ulug\'bek tuman', totalSpend: 165000, debt: 85000, history: [
    { date: 'Bugun', type: 'Nasiya', desc: 'Qarzga olindi', amount: 85000 }
  ], status: 'Yangi' }
];

const DEFAULT_ORDERS = [
  { id: 'o1', clientId: 'c1', clientName: 'Alijon Toshmatov', items: [{ productId: 'p1', qty: 2, name: 'Un', price: 65000 }], total: 130000, date: 'Bugun', status: 'Kutilmoqda', payment: 'Nasiya' },
  { id: 'o2', clientId: 'c2', clientName: 'Sarvinoz Raximova', items: [{ productId: 'p2', qty: 1, name: 'Sholi', price: 14500 }], total: 65000, date: 'Bugun', status: 'Yetkazildi', payment: 'Karta' },
  { id: 'o3', clientId: 'c3', clientName: 'Jasur Mirzayev', items: [{ productId: 'p1', qty: 3, name: 'Un', price: 65000 }, { productId: 'p3', qty: 2, name: 'O\'simlik yog\'i', price: 12000 }], total: 285000, date: 'Bugun', status: 'Jo\'natildi', payment: 'Naqd' }
];

// ══════════════════════════════════════════
// APP STATE MANAGER
// ══════════════════════════════════════════
const State = {
  products: [],
  clients: [],
  orders: [],

  init() {
    this.products = JSON.parse(localStorage.getItem('aps_products')) || DEFAULT_PRODUCTS;
    this.clients = JSON.parse(localStorage.getItem('aps_clients')) || DEFAULT_CLIENTS;
    this.orders = JSON.parse(localStorage.getItem('aps_orders')) || DEFAULT_ORDERS;
    this.save();
  },

  save() {
    localStorage.setItem('aps_products', JSON.stringify(this.products));
    localStorage.setItem('aps_clients', JSON.stringify(this.clients));
    localStorage.setItem('aps_orders', JSON.stringify(this.orders));
    updateBadges();
  },

  addOrder(order) {
    this.orders.unshift(order);

    // Deduct stock
    order.items.forEach(item => {
      const prod = this.products.find(p => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.qty);
        prod.sold = (prod.sold || 0) + item.qty;
      }
    });

    // Update Client metrics
    const client = this.clients.find(c => c.id === order.clientId);
    if (client) {
      client.totalSpend += order.total;
      if (order.payment === 'Nasiya') {
        client.debt += order.total;
        client.history.unshift({
          date: 'Bugun',
          type: 'Nasiya',
          desc: `Qarzga sotib olindi: ${order.items.map(i => `${i.qty} ta ${i.name}`).join(', ')}`,
          amount: order.total
        });
      } else {
        client.history.unshift({
          date: 'Bugun',
          type: order.payment,
          desc: `Sotib olindi: ${order.items.map(i => `${i.qty} ta ${i.name}`).join(', ')}`,
          amount: order.total
        });
      }
    }
    this.save();
    renderTab(currentTab);
  },

  payDebt(clientId, amount) {
    const client = this.clients.find(c => c.id === clientId);
    if (client && client.debt > 0) {
      const paid = Math.min(client.debt, amount);
      client.debt -= paid;
      client.history.unshift({
        date: 'Bugun',
        type: 'To\'lov',
        desc: 'Qarz to\'lovi amalga oshirildi',
        amount: paid
      });
      this.save();
      renderTab(currentTab);
      return paid;
    }
    return 0;
  },

  returnOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (order && order.status !== 'Qaytarildi') {
      order.status = 'Qaytarildi';
      
      // Put stock back
      order.items.forEach(item => {
        const prod = this.products.find(p => p.id === item.productId);
        if (prod) {
          prod.stock += item.qty;
          prod.sold = Math.max(0, (prod.sold || 0) - item.qty);
        }
      });

      // Deduct from client spend
      const client = this.clients.find(c => c.id === order.clientId);
      if (client) {
        client.totalSpend = Math.max(0, client.totalSpend - order.total);
        if (order.payment === 'Nasiya') {
          client.debt = Math.max(0, client.debt - order.total);
        }
        client.history.unshift({
          date: 'Bugun',
          type: 'Qaytarish',
          desc: `Buyurtma qaytarildi / bekor qilindi`,
          amount: order.total
        });
      }
      this.save();
      renderTab(currentTab);
      return true;
    }
    return false;
  },

  addStock(productId, qty) {
    const prod = this.products.find(p => p.id === productId);
    if (prod) {
      prod.stock += qty;
      this.save();
      renderTab(currentTab);
      return true;
    }
    return false;
  },

  addClient(name, phone, address) {
    const newClient = {
      id: 'c_' + Date.now(),
      name,
      phone,
      address,
      totalSpend: 0,
      debt: 0,
      history: [],
      status: 'Yangi'
    };
    this.clients.unshift(newClient);
    this.save();
    renderTab(currentTab);
    return newClient;
  }
};

// Initialize State immediately
State.init();

// ══════════════════════════════════════════
// UTILITIES
// ══════════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2200);
}

function updateClock() {
  const d = new Date();
  const h = String(d.getHours()).padStart(2,'0');
  const m = String(d.getMinutes()).padStart(2,'0');
  const hdrTime = document.getElementById('hdr-time');
  if (hdrTime) hdrTime.textContent = h + ':' + m;
}
updateClock();
setInterval(updateClock, 10000);

function updateBadges() {
  const badge = document.getElementById('orders-badge');
  const activeOrders = State.orders.filter(o => o.status === 'Kutilmoqda' || o.status === 'Jo\'natildi').length;
  if (badge) {
    badge.textContent = activeOrders;
    badge.style.display = activeOrders > 0 ? 'flex' : 'none';
  }
}

// ══════════════════════════════════════════
// PIN LOGIC (Sample code: 1983)
// ══════════════════════════════════════════
let pin = '';
const CORRECT_PIN = '1983';
let pinLocked = false;

const keypad = document.getElementById('keypad');
if (keypad) {
  keypad.addEventListener('click', e => {
    if (pinLocked) return;
    const key = e.target.closest('.pin-key');
    if (!key) return;

    if (key.id === 'del-btn') {
      pin = pin.slice(0, -1);
    } else if (key.dataset.v !== undefined && pin.length < 4) {
      pin += key.dataset.v;
    }
    updateDots();

    if (pin.length === 4) {
      if (pin === CORRECT_PIN) {
        pinLocked = true;
        highlightAllDots(true);
        setTimeout(openApp, 300);
      } else {
        pinLocked = true;
        highlightAllDots(false);
        setTimeout(() => {
          shakeDots();
          setTimeout(() => {
            clearDots();
            pinLocked = false;
          }, 500);
        }, 100);
      }
    }
  });
}

function updateDots() {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById('d' + i);
    if (dot) {
      dot.classList.toggle('filled', i <= pin.length);
      dot.classList.remove('error');
    }
  }
}
function highlightAllDots(success) {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById('d' + i);
    if (dot && !success) {
      dot.classList.remove('filled');
      dot.classList.add('error');
    }
  }
}
function clearDots() {
  pin = '';
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById('d' + i);
    if (dot) dot.classList.remove('filled', 'error');
  }
}
function shakeDots() {
  const dots = document.getElementById('pin-dots');
  if (!dots) return;
  let count = 0;
  const shake = () => {
    if (count >= 5) { dots.style.transform = ''; return; }
    dots.style.transform = `translateX(${count % 2 === 0 ? -8 : 8}px)`;
    count++;
    setTimeout(shake, 80);
  };
  shake();
}

// ══════════════════════════════════════════
// APP NAVIGATION
// ══════════════════════════════════════════
function openApp() {
  document.getElementById('pin-screen').classList.remove('active');
  document.getElementById('app-screen').classList.add('active');
  initTheme();
  updateOnlineStatus();
  renderTab('dashboard');
}

let currentTab = 'dashboard';

function renderTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.tab === tab);
  });
  
  const body = document.getElementById('app-body');
  if (!body) return;

  // Show a loading skeleton for smooth navigation transitions
  body.innerHTML = `
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-card"></div>
    <div class="skeleton skeleton-card"></div>
  `;

  // Brief delay to prevent jarring transitions, simulating loading and making skeleton visible
  setTimeout(() => {
    body.innerHTML = getTabContent(tab);
    body.scrollTop = 0;

    const fab = document.getElementById('fab-btn');
    if (fab) {
      if (tab === 'orders' || tab === 'products' || tab === 'clients') {
        fab.style.display = 'flex';
      } else {
        fab.style.display = 'none';
      }
    }

    if (tab === 'dashboard') {
      updateTodayDate();
    }
    if (tab === 'analytics') {
      setTimeout(() => drawChart('week', 'chart-bars-tab', 'chart-labels-tab'), 50);
    }
    updateBadges();
  }, 120);
}

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => renderTab(btn.dataset.tab));
});

// ══════════════════════════════════════════
// DYNAMIC TAB CONTENTS RENDERER
// ══════════════════════════════════════════
function getTabContent(tab) {
  switch(tab) {
    case 'dashboard': return dashboardContent();
    case 'orders':    return ordersTabContent();
    case 'products':  return productsTabContent();
    case 'clients':   return clientsTabContent();
    case 'analytics': return analyticsTabContent();
    default: return '';
  }
}

function dashboardContent() {
  let totalKirim = 0;
  let qarzliMijozlar = 0;
  let jamiQarzSum = 0;

  State.orders.forEach(o => { if (o.status !== 'Qaytarildi') totalKirim += o.total; });
  State.clients.forEach(c => {
    if (c.debt > 0) {
      qarzliMijozlar++;
      jamiQarzSum += c.debt;
    }
  });

  const displayProfit = (totalKirim * 0.4 / 1000000).toFixed(1) + 'M';
  const displayQarz = (jamiQarzSum / 1000000).toFixed(1) + 'M';

  // Check if we should display the install banner
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  const showBannerStyle = (!isInstalled && deferredPrompt) ? 'flex' : 'none';

  return `
    <div id="pwa-install-banner" class="install-app-banner" style="display: ${showBannerStyle};">
      <div class="install-app-banner-info">
        <span class="install-app-banner-logo">📱</span>
        <div class="install-app-banner-text">
          <h4>APS Mobile App</h4>
          <p>Tezroq va qulayroq ishlash uchun o'rnating</p>
        </div>
      </div>
      <button class="btn-install" onclick="triggerInstallApp()">O'rnatish</button>
    </div>

    <div class="summary-banner">
      <div class="sb-left">
        <div class="sb-label">Sof Foyda (Joriy Oy)</div>
        <div class="sb-val">${displayProfit} UZS</div>
      </div>
      <div class="sb-right" style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
        <div class="theme-switch-wrap">
          <button class="theme-toggle-btn" id="theme-toggle-btn" onclick="toggleTheme()" title="Mavzuni almashtirish">☀️</button>
        </div>
        <div class="sb-date" id="today-date" style="margin-top: 6px;">--/--/--</div>
      </div>
    </div>

    <p class="sec-label">Bugungi ko'rsatkichlar</p>
    <div class="stat-grid" style="margin-bottom:10px">
      <div class="stat-card blue" onclick="openDetail('orders')">
        <div class="sc-icon">📋</div>
        <div class="sc-val">${State.orders.length}</div>
        <div class="sc-label">Buyurtmalar</div>
        <div class="sc-delta">${State.orders.filter(o => o.status === 'Kutilmoqda').length} ta kutilmoqda</div>
      </div>
      <div class="stat-card teal" onclick="openDetail('products')">
        <div class="sc-icon">📦</div>
        <div class="sc-val">${State.products.reduce((acc,p)=>acc+p.stock,0)}</div>
        <div class="sc-label">Ombor (birlik)</div>
        <div class="sc-delta">4 tur mahsulot</div>
      </div>
      <div class="stat-card orange" onclick="openDetail('debts')">
        <div class="sc-icon">💸</div>
        <div class="sc-val">${displayQarz} UZS</div>
        <div class="sc-label">Qarzlar oqimi</div>
        <div class="sc-delta">${qarzliMijozlar} ta mijoz qarzda</div>
      </div>
      <div class="stat-card green" onclick="openDetail('analytics')">
        <div class="sc-icon">📈</div>
        <div class="sc-val">${(totalKirim/1000000).toFixed(1)}M</div>
        <div class="sc-label">Jami Kirim UZS</div>
        <div class="sc-delta">Analitik hisobot</div>
      </div>
    </div>

    <p class="sec-label">Tizim modullari</p>
    <div class="module-list">
      <div class="module-card blue" onclick="openDetail('orders')">
        <div class="mc-icon">📋</div>
        <div class="mc-body">
          <div class="mc-title">Buyurtmalar</div>
          <div class="mc-sub">📞 Qo'ng'iroq → kiritiladi → yetkaziladi</div>
        </div>
        <div class="mc-right">
          <span class="mc-badge blue">${State.orders.length} ta</span>
          <span class="mc-arrow">›</span>
        </div>
      </div>
      <div class="module-card teal" onclick="openDetail('products')">
        <div class="mc-icon">📦</div>
        <div class="mc-body">
          <div class="mc-title">Tovarlar ombori</div>
          <div class="mc-sub">Qop/paket, narxlar va qoldiqlar</div>
        </div>
        <div class="mc-right">
          <span class="mc-badge teal">4 tur</span>
          <span class="mc-arrow">›</span>
        </div>
      </div>
      <div class="module-card coral" onclick="openDetail('clients')">
        <div class="mc-icon">👤</div>
        <div class="mc-body">
          <div class="mc-title">Mijozlar bazasi</div>
          <div class="mc-sub">Mijoz kartochkasi, tarix, qaytarishlar</div>
        </div>
        <div class="mc-right">
          <span class="mc-badge coral">${State.clients.length} ta</span>
          <span class="mc-arrow">›</span>
        </div>
      </div>
      <div class="module-card orange" onclick="openDetail('debts')">
        <div class="mc-icon">💸</div>
        <div class="mc-body">
          <div class="mc-title">Qarz daftari (Nasiya)</div>
          <div class="mc-sub">Qarz yozish, qisman to'lov va tarix</div>
        </div>
        <div class="mc-right">
          <span class="mc-badge orange">${qarzliMijozlar} ta faol</span>
          <span class="mc-arrow">›</span>
        </div>
      </div>
    </div>
  `;
}

function ordersTabContent() {
  const activeOrders = State.orders;
  let listHtml = '';
  
  if (activeOrders.length === 0) {
    listHtml = `<div style="text-align:center;padding:32px;color:var(--muted)">Buyurtmalar topilmadi.</div>`;
  } else {
    listHtml = activeOrders.map(ord => {
      let statusClass = 'status-pending';
      let icon = '⏳';
      if (ord.status === 'Jo\'natildi') { statusClass = 'status-sent'; icon = '🚚'; }
      if (ord.status === 'Yetkazildi') { statusClass = 'status-done'; icon = '✓'; }
      if (ord.status === 'Qaytarildi') { statusClass = 'status-debt'; icon = '↩️'; }
      
      return `
        <div class="order-item" onclick="openDetail('orders')">
          <div class="oi-avatar" style="background:var(--surface3);color:#fff">${ord.clientName[0]}</div>
          <div class="oi-body">
            <div class="oi-name">${ord.clientName}</div>
            <div class="oi-detail">${ord.items.map(i => `${i.qty} ta ${i.name}`).join(', ')} • ${ord.date}</div>
          </div>
          <div class="oi-right">
            <div class="oi-sum">${ord.total.toLocaleString()}</div>
            <div class="status-pill ${statusClass}">${icon} ${ord.status}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; margin-bottom:8px;">
      <p class="sec-label" style="margin:0;">Faol buyurtmalar ro'yxati</p>
      <button onclick="openDeleteModal('orders')" style="background:transparent; border:none; font-size:18px; padding:4px; color:var(--text); cursor:pointer;">🗑️</button>
    </div>
    <div class="wide-card">
      ${listHtml}
    </div>
    <div style="text-align:center;padding:12px 0">
      <button onclick="openDetail('orders')" class="btn-primary" style="background:var(--surface2); border:1px solid var(--border); color:var(--text); width:auto; padding:10px 24px; font-size:12px; border-radius:20px;">Boshqarish darchasini ochish →</button>
    </div>
  `;
}

function productsTabContent() {
  const prodHtml = State.products.map(p => {
    const isLow = p.stock <= 20;
    return `
      <div class="product-item" onclick="showAddStockForm('${p.id}')" style="cursor:pointer;">
        <div class="pi-icon">${p.icon}</div>
        <div class="pi-body">
          <div class="pi-name">${p.name}</div>
          <div class="pi-unit">${p.unit}</div>
        </div>
        <div class="pi-right">
          <div class="pi-stock ${isLow ? 'pi-low' : ''}" style="${isLow ? 'color:#ff453a;' : 'color:var(--text)'}">${isLow ? '⚠️ ' : ''}${p.stock}</div>
          <div class="pi-price">${p.price.toLocaleString()} UZS</div>
          ${isLow ? '<div class="low-indicator" style="background:rgba(255,69,58,0.15);color:#ff453a;">Kam qoldi!</div>' : ''}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; margin-bottom:8px;">
      <p class="sec-label" style="margin:0;">Ombor joriy qoldiqlari</p>
      <button onclick="openDeleteModal('products')" style="background:transparent; border:none; font-size:18px; padding:4px; color:var(--text); cursor:pointer;">🗑️</button>
    </div>
    <div class="wide-card" style="background:var(--teal-bg);border-color:var(--teal-border)">
      ${prodHtml}
    </div>
    <div style="text-align:center;">
      <button onclick="openDetail('products')" class="btn-primary" style="background:var(--surface2); border:1px solid var(--border); color:var(--text); width:auto; padding:10px 24px; font-size:12px; border-radius:20px;">Kirim / Chiqim Amallari →</button>
    </div>
  `;
}

function clientsTabContent() {
  const clientsHtml = State.clients.map(c => {
    const debtLabel = c.debt > 0 ? `<div class="status-pill status-debt" style="background:rgba(255,159,10,0.15);color:#ff9f0a;">${c.debt.toLocaleString()} UZS qarz</div>` : `<div class="status-pill status-done">✓ Qarzsiz</div>`;
    return `
      <div class="order-item" onclick="openDetail('clients')">
        <div class="oi-avatar" style="background:var(--surface2);color:#fff">${c.name[0]}</div>
        <div class="oi-body">
          <div class="oi-name">${c.name}</div>
          <div class="oi-detail">${c.address} • ${c.phone}</div>
        </div>
        <div class="oi-right">
          ${debtLabel}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; margin-bottom:8px;">
      <p class="sec-label" style="margin:0;">Mijozlar bazasi</p>
      <button onclick="openDeleteModal('clients')" style="background:transparent; border:none; font-size:18px; padding:4px; color:var(--text); cursor:pointer;">🗑️</button>
    </div>
    <div class="wide-card">
      ${clientsHtml}
    </div>
  `;
}

function analyticsTabContent() {
  let totalKirim = 0;
  State.orders.forEach(o => { if (o.status !== 'Qaytarildi') totalKirim += o.total; });
  const sofFoyda = totalKirim * 0.4;

  return `
    <div class="summary-banner" style="background:var(--green-bg);border-color:var(--green-border)">
      <div class="sb-left">
        <div class="sb-label">Jami Sof Foyda</div>
        <div class="sb-val" style="color:var(--green-text)">${sofFoyda.toLocaleString()} UZS</div>
        <div class="sb-sub" style="color:var(--text2)">Kirim: ${totalKirim.toLocaleString()} UZS</div>
      </div>
    </div>
    <p class="sec-label">Sotuv grafigi</p>
    <div class="chart-wrap">
      <div class="chart-header">
        <div class="chart-title">Haftalik sotuv</div>
        <div class="chart-tabs">
          <button class="chart-tab active" id="tab-chart-week-inside" onclick="switchChart('week',this)">Hafta</button>
          <button class="chart-tab" id="tab-chart-month-inside" onclick="switchChart('month',this)">Oy</button>
        </div>
      </div>
      <div class="chart-bars-wrap" id="chart-bars-tab"></div>
      <div class="chart-labels" id="chart-labels-tab"></div>
    </div>
    <div style="text-align:center;">
      <button onclick="openDetail('analytics')" class="btn-primary" style="background:var(--surface2); border:1px solid var(--border); color:var(--text); width:auto; padding:10px 24px; font-size:12px; border-radius:20px;">Batafsil Analitika →</button>
    </div>
  `;
}

function updateTodayDate() {
  const el = document.getElementById('today-date');
  if (!el) return;
  const d = new Date();
  const days = ['Yakshanba','Dushanba','Seshanba','Chorshanba','Payshanba','Juma','Shanba'];
  const months = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Ilyul','Avgust','Sentyabr','Oktyabr','Noyabr','Dekabr'];
  el.textContent = days[d.getDay()] + ', ' + d.getDate() + '-' + months[d.getMonth()];
}

// ══════════════════════════════════════════
// DETAIL SCREENS LOGIC
// ══════════════════════════════════════════
function openDetail(id) {
  document.getElementById('app-screen').style.display = 'none';
  document.querySelectorAll('.detail-screen').forEach(s => s.classList.remove('active'));
  
  const el = document.getElementById('detail-' + id);
  if (el) {
    el.classList.add('active');
    
    // Dynamic Render calls based on state
    if (id === 'orders') renderOrdersDetailList();
    if (id === 'products') renderProductsDetailList();
    if (id === 'clients') renderClientsDetailList();
    if (id === 'debts') renderDebtsDetailList();
    if (id === 'analytics') renderAnalyticsDetail();
  }
}

function closeDetail() {
  document.querySelectorAll('.detail-screen').forEach(s => s.classList.remove('active'));
  document.getElementById('app-screen').style.display = 'flex';
  renderTab(currentTab);
}

// ── Detail: Render Orders
function renderOrdersDetailList() {
  document.getElementById('orders-detail-subtitle').textContent = `Jami: ${State.orders.length} ta buyurtma`;
  document.getElementById('orders-stat-total').textContent = State.orders.length;
  document.getElementById('orders-stat-done').textContent = State.orders.filter(o => o.status === 'Yetkazildi').length;

  const container = document.getElementById('orders-detail-list');
  if (!container) return;

  if (State.orders.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:24px;color:var(--muted)">Buyurtmalar mavjud emas.</div>`;
    return;
  }

  container.innerHTML = State.orders.map(ord => {
    let statusClass = 'status-pending';
    let icon = '⏳';
    if (ord.status === 'Jo\'natildi') { statusClass = 'status-sent'; icon = '🚚'; }
    if (ord.status === 'Yetkazildi') { statusClass = 'status-done'; icon = '✓'; }
    if (ord.status === 'Qaytarildi') { statusClass = 'status-debt'; icon = '↩️'; }

    return `
      <div class="wide-card" style="margin-bottom:10px; cursor:pointer;" onclick="showOrderActions('${ord.id}')">
        <div class="order-item" style="border:none; padding:0;">
          <div class="oi-avatar" style="background:var(--surface2); color:#fff">${ord.clientName[0]}</div>
          <div class="oi-body">
            <div class="oi-name">${ord.clientName}</div>
            <div class="oi-detail">${ord.items.map(i => `${i.qty} ta ${i.name}`).join(', ')} • ${ord.date}</div>
          </div>
          <div class="oi-right">
            <div class="oi-sum">${ord.total.toLocaleString()} UZS</div>
            <div class="status-pill ${statusClass}">${icon} ${ord.status}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function showOrderActions(orderId) {
  const ord = State.orders.find(o => o.id === orderId);
  if (!ord) return;

  let content = `
    <div style="padding:4px 0;">
      <p style="font-size:13px; color:var(--text2); margin-bottom:16px;">Mijoz: <b>${ord.clientName}</b><br>Summa: <b>${ord.total.toLocaleString()} UZS</b><br>Holat: <b>${ord.status}</b></p>
  `;

  if (ord.status !== 'Yetkazildi' && ord.status !== 'Qaytarildi') {
    content += `
      <button class="btn-primary" style="margin-bottom:10px; background:var(--text); color:var(--bg);" onclick="updateOrderStatus('${ord.id}', 'Yetkazildi')">✓ Yetkazildi</button>
    `;
  }

  if (ord.status !== 'Qaytarildi') {
    content += `
      <button class="btn-secondary" style="color:#ff453a; border-color:rgba(255,69,58,0.2);" onclick="deleteOrder('${ord.id}')">🗑️ Buyurtmani o'chirish</button>
    `;
  } else {
    content += `<p style="text-align:center;color:var(--muted);font-size:12px;">Ushbu buyurtma bekor qilingan.</p>`;
  }

  content += `</div>`;
  openModal('Buyurtmani boshqarish', content);
}

function updateOrderStatus(orderId, newStatus) {
  const ord = State.orders.find(o => o.id === orderId);
  if (ord) {
    ord.status = newStatus;
    State.save();
    showToast(`Buyurtma holati "${newStatus}" ga o'zgartirildi!`);
    closeModal();
    renderOrdersDetailList();
  }
}

function deleteOrder(orderId) {
  if (confirm("Rostdan ham bu buyurtmani o'chirmoqchimisiz?")) {
    State.orders = State.orders.filter(o => o.id !== orderId);
    State.save();
    showToast(`Buyurtma o'chirildi!`);
    closeModal();
    renderTab(currentTab);
    if (document.getElementById('detail-orders')?.classList.contains('active')) renderOrdersDetailList();
  }
}

function deleteProduct(id) {
  if (confirm("Bu tovarni tizimdan o'chirmoqchimisiz?")) {
    State.products = State.products.filter(p => p.id !== id);
    State.save();
    showToast("Tovar o'chirildi!");
    renderTab(currentTab);
    if (document.getElementById('detail-products')?.classList.contains('active')) renderProductsDetailList();
  }
}

function deleteClient(id) {
  if (confirm("Bu mijozni tizimdan o'chirmoqchimisiz?")) {
    State.clients = State.clients.filter(c => c.id !== id);
    State.save();
    showToast("Mijoz o'chirildi!");
    renderTab(currentTab);
    if (document.getElementById('detail-clients')?.classList.contains('active')) renderClientsDetailList();
  }
}

function openDeleteModal(type) {
  let listHtml = '';
  let title = '';
  let deleteFn = '';
  
  if (type === 'orders') {
    title = "Buyurtmalarni o'chirish";
    listHtml = State.orders.map(o => `
      <label style="display:flex; align-items:center; padding:12px; border-bottom:1px solid var(--border); cursor:pointer;">
        <input type="checkbox" class="delete-checkbox" value="${o.id}" style="margin-right:12px; width:20px; height:20px;">
        <div style="flex:1">
          <div style="font-weight:600">${o.clientName}</div>
          <div style="font-size:12px; color:var(--text2)">${o.date} • ${o.total.toLocaleString()} UZS</div>
        </div>
      </label>
    `).join('');
    deleteFn = 'deleteSelectedOrders()';
  } else if (type === 'products') {
    title = "Tovarlarni o'chirish";
    listHtml = State.products.map(p => `
      <label style="display:flex; align-items:center; padding:12px; border-bottom:1px solid var(--border); cursor:pointer;">
        <input type="checkbox" class="delete-checkbox" value="${p.id}" style="margin-right:12px; width:20px; height:20px;">
        <div style="flex:1">
          <div style="font-weight:600">${p.icon} ${p.name}</div>
          <div style="font-size:12px; color:var(--text2)">${p.price.toLocaleString()} UZS • Qoldiq: ${p.stock} ${p.unit}</div>
        </div>
      </label>
    `).join('');
    deleteFn = 'deleteSelectedProducts()';
  } else if (type === 'clients') {
    title = "Mijozlarni o'chirish";
    listHtml = State.clients.map(c => `
      <label style="display:flex; align-items:center; padding:12px; border-bottom:1px solid var(--border); cursor:pointer;">
        <input type="checkbox" class="delete-checkbox" value="${c.id}" style="margin-right:12px; width:20px; height:20px;">
        <div style="flex:1">
          <div style="font-weight:600">${c.name}</div>
          <div style="font-size:12px; color:var(--text2)">${c.phone}</div>
        </div>
      </label>
    `).join('');
    deleteFn = 'deleteSelectedClients()';
  }

  if (!listHtml) {
    listHtml = "<div style=\"padding:20px; text-align:center; color:var(--muted)\">O'chirish uchun hech narsa yo'q.</div>";
    openModal(title, listHtml);
    return;
  }

  const content = `
    <div style="max-height:50vh; overflow-y:auto; margin-bottom:16px; border:1px solid var(--border); border-radius:10px;">
      ${listHtml}
    </div>
    <button class="btn-primary" style="background:#ff453a; color:#fff; border:none;" onclick="${deleteFn}">🗑️ Tanlanganlarni o'chirish</button>
  `;
  openModal(title, content);
}

function deleteSelectedOrders() {
  const selected = Array.from(document.querySelectorAll('.delete-checkbox:checked')).map(cb => cb.value);
  if (selected.length === 0) return showToast('Hech narsa tanlanmadi!');
  if (confirm(`Rostdan ham ${selected.length} ta buyurtmani o'chirmoqchimisiz?`)) {
    State.orders = State.orders.filter(o => !selected.includes(o.id));
    State.save();
    showToast(`${selected.length} ta buyurtma o'chirildi!`);
    closeModal();
    renderTab(currentTab);
    if (document.getElementById('detail-orders')?.classList.contains('active')) renderOrdersDetailList();
  }
}

function deleteSelectedProducts() {
  const selected = Array.from(document.querySelectorAll('.delete-checkbox:checked')).map(cb => cb.value);
  if (selected.length === 0) return showToast('Hech narsa tanlanmadi!');
  if (confirm(`Rostdan ham ${selected.length} ta tovarni o'chirmoqchimisiz?`)) {
    State.products = State.products.filter(p => !selected.includes(p.id));
    State.save();
    showToast(`${selected.length} ta tovar o'chirildi!`);
    closeModal();
    renderTab(currentTab);
    if (document.getElementById('detail-products')?.classList.contains('active')) renderProductsDetailList();
  }
}

function deleteSelectedClients() {
  const selected = Array.from(document.querySelectorAll('.delete-checkbox:checked')).map(cb => cb.value);
  if (selected.length === 0) return showToast('Hech narsa tanlanmadi!');
  if (confirm(`Rostdan ham ${selected.length} ta mijozni o'chirmoqchimisiz?`)) {
    State.clients = State.clients.filter(c => !selected.includes(c.id));
    State.save();
    showToast(`${selected.length} ta mijoz o'chirildi!`);
    closeModal();
    renderTab(currentTab);
    if (document.getElementById('detail-clients')?.classList.contains('active')) renderClientsDetailList();
  }
}

function returnOrder(orderId) {
  if (State.returnOrder(orderId)) {
    showToast(`Muvaffaqiyatli bekor qilindi, tovarlar omborga qaytarildi!`);
    closeModal();
    renderOrdersDetailList();
  }
}

// ── Detail: Render Products
function renderProductsDetailList() {
  const totalKinds = State.products.length;
  document.getElementById('products-detail-subtitle').textContent = `${totalKinds} turdagi tovar omborda mavjud`;
  
  let totalSold = 0;
  State.products.forEach(p => totalSold += p.sold || 0);
  document.getElementById('products-stat-chiqim').textContent = `−${totalSold}`;

  const container = document.getElementById('products-detail-list');
  if (!container) return;

  container.innerHTML = State.products.map(p => {
    const isLow = p.stock <= 20;
    return `
      <div class="product-item" onclick="showAddStockForm('${p.id}')" style="cursor:pointer;">
        <div class="pi-icon">${p.icon}</div>
        <div class="pi-body">
          <div class="pi-name">${p.name}</div>
          <div class="pi-unit">${p.unit}</div>
        </div>
        <div class="pi-right">
          <div class="pi-stock ${isLow ? 'pi-low' : ''}" style="${isLow ? 'color:#ff453a;' : 'color:var(--text)'}">${isLow ? '⚠️ ' : ''}${p.stock} ta</div>
          <div class="pi-price">${p.price.toLocaleString()} UZS / birlik</div>
          ${isLow ? '<div class="low-indicator" style="background:rgba(255,69,58,0.15);color:#ff453a;">Kam qoldi!</div>' : ''}
        </div>
      </div>
    `;
  }).join('');
}

function showAddProductForm() {
  let form = `
    <div class="form-group">
      <label class="form-label">Tovar nomi</label>
      <input type="text" class="form-input" id="new-prod-name" placeholder="Masalan: Makaron">
    </div>
    <div class="form-group">
      <label class="form-label">O'lchov birligi</label>
      <input type="text" class="form-input" id="new-prod-unit" placeholder="Masalan: kg yoki dona">
    </div>
    <div class="form-group">
      <label class="form-label">Narxi (UZS)</label>
      <input type="number" class="form-input" id="new-prod-price" placeholder="Masalan: 15000">
    </div>
    <button class="btn-primary" onclick="submitAddProduct()">📦 Tovarni Saqlash</button>
  `;
  openModal("Yangi tovar qo'shish", form);
}

function submitAddProduct() {
  const name = document.getElementById('new-prod-name').value;
  const unit = document.getElementById('new-prod-unit').value;
  const price = parseInt(document.getElementById('new-prod-price').value);

  if (!name || !unit || isNaN(price)) {
    showToast("Iltimos barcha maydonlarni to'ldiring!");
    return;
  }

  State.products.push({
    id: 'p_' + Date.now(),
    name,
    unit,
    stock: 0,
    price,
    icon: '📦',
    sold: 0
  });
  State.save();
  showToast("Yangi tovar qo'shildi!");
  closeModal();
  renderTab(currentTab);
  if (document.getElementById('detail-products')?.classList.contains('active')) renderProductsDetailList();
}

function showAddStockForm(preselectedId) {
  let selectOpts = State.products.map(p => `<option value="${p.id}" ${p.id === preselectedId ? 'selected' : ''}>${p.icon} ${p.name} (${p.unit})</option>`).join('');
  let form = `
    <div class="form-group">
      <label class="form-label">Mahsulotni tanlang</label>
      <select class="form-select" id="stock-prod-id">${selectOpts}</select>
    </div>
    <div class="form-group">
      <label class="form-label">Miqdorini kiriting</label>
      <input type="number" class="form-input" id="stock-qty-val" placeholder="Masalan: 50" min="1">
    </div>
    <button class="btn-primary" onclick="submitStockKirim()">📥 Kirimni tasdiqlash</button>
  `;
  openModal('Omborga tovar kirim qilish', form);
}

function submitStockKirim() {
  const id = document.getElementById('stock-prod-id').value;
  const qty = parseInt(document.getElementById('stock-qty-val').value);

  if (isNaN(qty) || qty <= 0) {
    showToast('Iltimos to\'g\'ri miqdor kiriting!');
    return;
  }

  if (State.addStock(id, qty)) {
    showToast('Ombor muvaffaqiyatli to\'ldirildi! 📥');
    closeModal();
    renderProductsDetailList();
  }
}

// ── Detail: Render Clients
function renderClientsDetailList() {
  document.getElementById('clients-detail-subtitle').textContent = `Jami faol: ${State.clients.length} ta mijoz`;

  // Render first client profile as selected header card preview
  const topC = State.clients[0];
  const cardWrap = document.getElementById('clients-detail-card-wrap');
  if (topC && cardWrap) {
    cardWrap.innerHTML = `
      <div class="client-header-card">
        <div class="client-avatar" style="background:var(--surface3);color:#fff">${topC.name[0]}</div>
        <div>
          <div class="client-name">${topC.name}</div>
          <div class="client-phone">📞 ${topC.phone}</div>
          <div class="client-address">📍 ${topC.address}</div>
        </div>
      </div>
      <div class="wide-card">
        <div class="info-row"><span class="ir-label">Jami xaridlar hajmi</span><span class="ir-val">${topC.totalSpend.toLocaleString()} UZS</span></div>
        <div class="info-row"><span class="ir-label">Joriy qarz balansi</span><span class="ir-val" style="color:${topC.debt > 0 ? '#ff9f0a':'var(--text)'}">${topC.debt.toLocaleString()} UZS</span></div>
      </div>
    `;
  }

  const listContainer = document.getElementById('clients-detail-list');
  if (listContainer) {
    listContainer.innerHTML = State.clients.map(c => {
      const debtLabel = c.debt > 0 ? `<span class="status-pill status-debt" style="background:rgba(255,159,10,0.15);color:#ff9f0a;">${c.debt.toLocaleString()} qarz</span>` : `<span class="status-pill status-done">Qarzsiz ✓</span>`;
      return `
        <div class="wide-card" style="margin-bottom:8px; cursor:pointer;" onclick="showClientHistory('${c.id}')">
          <div class="order-item" style="border:none; padding:0;">
            <div class="oi-avatar" style="background:var(--surface2); color:#fff">${c.name[0]}</div>
            <div class="oi-body">
              <div class="oi-name">${c.name}</div>
              <div class="oi-detail">${c.address}</div>
            </div>
            <div class="oi-right">
              ${debtLabel}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

function showClientHistory(clientId) {
  const c = State.clients.find(x => x.id === clientId);
  if (!c) return;

  let listHistory = c.history.map(h => `
    <div style="display:flex; justify-content:between; border-bottom:1px solid var(--border); padding:8px 0; font-size:12px;">
      <div style="flex:1;">
        <div style="font-weight:600;color:var(--text);">${h.desc}</div>
        <div style="color:var(--muted); font-size:10px;">${h.date} • ${h.type}</div>
      </div>
      <div style="text-align:right; font-weight:700; color:var(--text2);">${h.amount.toLocaleString()} UZS</div>
    </div>
  `).join('');

  if (c.history.length === 0) listHistory = `<div style="text-align:center;color:var(--muted);font-size:12px;padding:12px 0;">Tarix mavjud emas.</div>`;

  let content = `
    <div style="padding-top:4px;">
      <p style="font-size:12px; color:var(--muted); margin-bottom:12px;">📍 ${c.address}<br>📞 ${c.phone}</p>
      <div style="background:var(--surface2); padding:10px 14px; border-radius:10px; margin-bottom:14px; display:flex; justify-content:space-between;">
        <span style="font-size:12px; color:var(--text2)">Joriy Qarz balansi:</span>
        <span style="font-weight:700; color:${c.debt>0?'#ff9f0a':'var(--text)'}">${c.debt.toLocaleString()} UZS</span>
      </div>
      <p class="sec-label" style="margin-top:0; margin-bottom:8px;">Xarid va to'lovlar tarixi</p>
      <div style="max-height:200px; overflow-y:auto; padding-right:4px;">
        ${listHistory}
      </div>
    </div>
  `;
  openModal(c.name, content);
}

function showAddClientForm() {
  let form = `
    <div class="form-group">
      <label class="form-label">Mijoz Ismi va Familiyasi</label>
      <input type="text" class="form-input" id="c-new-name" placeholder="Masalan: Shavkat Alimov">
    </div>
    <div class="form-group">
      <label class="form-label">Telefon raqami</label>
      <input type="text" class="form-input" id="c-new-phone" placeholder="Masalan: +998 90 999 88 77">
    </div>
    <div class="form-group">
      <label class="form-label">Yashash tumani, manzili</label>
      <input type="text" class="form-input" id="c-new-addr" placeholder="Masalan: Chilonzor, 5-mavze">
    </div>
    <button class="btn-primary" onclick="submitAddClient()">👤 Mijozni Saqlash</button>
  `;
  openModal('Yangi mijoz qo\'shish', form);
}

function submitAddClient() {
  const name = document.getElementById('c-new-name').value;
  const phone = document.getElementById('c-new-phone').value;
  const addr = document.getElementById('c-new-addr').value;

  if (!name || !phone || !addr) {
    showToast('Iltimos barcha maydonlarni to\'ldiring!');
    return;
  }

  State.addClient(name, phone, addr);
  showToast('Yangi mijoz muvaffaqiyatli saqlandi! 👤');
  closeModal();
  renderClientsDetailList();
}

// ── Detail: Render Debts
function renderDebtsDetailList() {
  let totalDebts = 0;
  let qarzMijozCount = 0;
  State.clients.forEach(c => {
    if (c.debt > 0) {
      totalDebts += c.debt;
      qarzMijozCount++;
    }
  });

  document.getElementById('debts-detail-subtitle').textContent = `Tizimda ${qarzMijozCount} ta qarzli mijoz bor`;
  document.getElementById('debts-stat-count').textContent = qarzMijozCount;
  document.getElementById('debts-stat-sum').textContent = totalDebts.toLocaleString() + ' UZS';

  const container = document.getElementById('debts-detail-list');
  if (!container) return;

  const debtClients = State.clients.filter(c => c.debt > 0);
  if (debtClients.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:24px;color:var(--muted)">Hozircha qarzlar mavjud emas. Hayrli kun! 🎉</div>`;
    return;
  }

  container.innerHTML = debtClients.map(c => {
    return `
      <div class="debt-row" onclick="showClientHistory('${c.id}')" style="cursor:pointer;">
        <div class="dr-rank" style="background:rgba(255,159,10,0.15); color:#ff9f0a;">⚠️</div>
        <div class="dr-body">
          <div class="dr-name">${c.name}</div>
          <div class="dr-date">${c.address}</div>
        </div>
        <div class="dr-amount" style="color:#ff9f0a;">${c.debt.toLocaleString()} UZS</div>
      </div>
    `;
  }).join('');
}

function showCollectPaymentForm() {
  const debtClients = State.clients.filter(c => c.debt > 0);
  if (debtClients.length === 0) {
    showToast('Hozirda qarzi bor mijozlar mavjud emas!');
    return;
  }

  let options = debtClients.map(c => `<option value="${c.id}">${c.name} (Qarz: ${c.debt.toLocaleString()} UZS)</option>`).join('');
  let form = `
    <div class="form-group">
      <label class="form-label">Mijozni tanlang</label>
      <select class="form-select" id="debt-pay-client">${options}</select>
    </div>
    <div class="form-group">
      <label class="form-label">To'lov miqdori (UZS)</label>
      <input type="number" class="form-input" id="debt-pay-amount" placeholder="Miqdorni kiriting" min="1">
    </div>
    <div style="display:flex; gap:8px; margin-bottom:18px; flex-wrap: wrap;">
      <button class="btn-secondary" style="margin:0; font-size:11px; padding:8px; flex:1;" onclick="presetDebt(50000)">50,000</button>
      <button class="btn-secondary" style="margin:0; font-size:11px; padding:8px; flex:1;" onclick="presetDebt(100000)">100,000</button>
      <button class="btn-secondary" style="margin:0; font-size:11px; padding:8px; flex:1;" onclick="presetDebt(500000)">500,000</button>
      <button class="btn-secondary" style="margin:0; font-size:11px; padding:8px; flex:1; background:var(--text); color:var(--bg);" onclick="presetDebtFull()">To'liq yopish</button>
    </div>
    <button class="btn-primary" onclick="submitDebtPayment()">💳 To'lovni tasdiqlash</button>
  `;
  openModal('Qarz to\'lovini qabul qilish', form);
}

function presetDebt(val) {
  const input = document.getElementById('debt-pay-amount');
  if (input) input.value = val;
}

function presetDebtFull() {
  const clientId = document.getElementById('debt-pay-client').value;
  const c = State.clients.find(x => x.id === clientId);
  if (c) {
    presetDebt(c.debt);
  }
}

function submitDebtPayment() {
  const clientId = document.getElementById('debt-pay-client').value;
  const amount = parseInt(document.getElementById('debt-pay-amount').value);

  if (isNaN(amount) || amount <= 0) {
    showToast('To\'g\'ri to\'lov miqdori kiriting!');
    return;
  }

  const paid = State.payDebt(clientId, amount);
  if (paid > 0) {
    showToast(`To'lov muvaffaqiyatli qabul qilindi: ${paid.toLocaleString()} UZS 💳`);
    closeModal();
    renderDebtsDetailList();
  }
}

// ── Detail: Render Analytics
function renderAnalyticsDetail() {
  let totalKirim = 0;
  State.orders.forEach(o => { if (o.status !== 'Qaytarildi') totalKirim += o.total; });
  const xarajatlar = totalKirim * 0.6;
  const sofFoyda = totalKirim * 0.4;

  document.getElementById('analytics-detail-subtitle').textContent = `Foyda rentabelligi: 40% sof foyda`;
  document.getElementById('analytics-stat-kirim').textContent = totalKirim.toLocaleString() + ' UZS';
  document.getElementById('analytics-stat-xarajat').textContent = xarajatlar.toLocaleString() + ' UZS';
  document.getElementById('analytics-stat-foyda').textContent = sofFoyda.toLocaleString() + ' UZS';

  // Render Top Products
  const container = document.getElementById('analytics-top-products');
  if (container) {
    container.innerHTML = State.products.map((p, idx) => {
      const places = ['🥇', '🥈', '🥉', '4️⃣'];
      return `
        <div class="info-row">
          <span style="font-size:13px; font-weight:600;">${places[idx] || '•'} ${p.name}</span>
          <span class="ir-val" style="color:var(--text)">${p.sold || 0} ta sotildi</span>
        </div>
      `;
    }).join('');
  }

  // Draw detail chart default
  setTimeout(() => drawChart('week', 'chart-bars-detail', 'chart-labels-detail'), 50);
}

// ══════════════════════════════════════════
// CHART GRAPHIC PLOTTER
// ══════════════════════════════════════════
const staticChartData = {
  week: {
    vals: [140, 210, 180, 290, 240, 110, 260],
    labels: ['Du','Se','Ch','Pa','Ju','Sh','Ya']
  },
  month: {
    vals: [110, 130, 220, 160, 270, 200, 250, 190, 280, 220, 240, 180],
    labels: ['1','3','6','9','12','15','18','21','24','26','28','30']
  }
};

function drawChart(type, barsContainerId, labelsContainerId) {
  const data = staticChartData[type] || staticChartData.week;
  const barsContainer = document.getElementById(barsContainerId);
  const labelsContainer = document.getElementById(labelsContainerId);

  if (!barsContainer) return;

  // Compute scale based on actual sales dynamic weight if desired, otherwise use preset values
  let orderSumWeight = 0;
  State.orders.forEach(o => { if (o.status !== 'Qaytarildi') orderSumWeight += o.total; });
  const bonusMultiplier = Math.min(2.5, 1 + (orderSumWeight / 2000000));

  const scaledVals = data.vals.map(v => v * bonusMultiplier);
  const max = Math.max(...scaledVals);

  barsContainer.innerHTML = scaledVals.map((v, i) => {
    const isToday = i === data.vals.length - 1;
    const heightPercent = Math.max(5, (v / max * 100));
    return `
      <div class="bar ${isToday ? 'today' : ''}" 
           style="height:${heightPercent}%; background:${isToday ? 'var(--text)' : 'var(--muted)'}; opacity:${isToday ? 1 : 0.6}"
           title="${Math.round(v * 1000).toLocaleString()} UZS">
      </div>
    `;
  }).join('');

  if (labelsContainer) {
    labelsContainer.innerHTML = data.labels.map(l => `<span>${l}</span>`).join('');
  }
}

function switchChart(type, btn) {
  const wrap = btn.closest('.chart-wrap');
  wrap.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const barsId = wrap.querySelector('.chart-bars-wrap').id;
  const labelsId = wrap.querySelector('.chart-labels').id;
  drawChart(type, barsId, labelsId);
}

// ══════════════════════════════════════════
// GLOBAL MODAL SHEET FUNCTIONS
// ══════════════════════════════════════════
function openModal(title, htmlContent) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-content').innerHTML = htmlContent;
  const backdrop = document.getElementById('global-modal');
  backdrop.style.display = 'flex';
  setTimeout(() => backdrop.classList.add('active'), 10);
}

function closeModal() {
  const backdrop = document.getElementById('global-modal');
  backdrop.classList.remove('active');
  setTimeout(() => { backdrop.style.display = 'none'; }, 200);
}

function handleBackdropClick(e) {
  if (e.target.id === 'global-modal') {
    closeModal();
  }
}

// ══════════════════════════════════════════
// NEW ORDER FORM & FLOW
// ══════════════════════════════════════════
const fabBtn = document.getElementById('fab-btn');
if (fabBtn) {
  fabBtn.addEventListener('click', () => {
    if (currentTab === 'orders') showAddOrderForm();
    else if (currentTab === 'products') showAddProductForm();
    else if (currentTab === 'clients') showAddClientForm();
  });
}

function showAddOrderForm() {
  const clientOpts = State.clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  const prodOpts = State.products.map(p => `<option value="${p.id}">${p.icon} ${p.name} (${p.price.toLocaleString()} UZS)</option>`).join('');

  const form = `
    <div class="form-group">
      <label class="form-label">Mijozni tanlang</label>
      <select class="form-select" id="order-client-id">${clientOpts}</select>
    </div>
    <div class="form-group">
      <label class="form-label">Mahsulotni tanlang</label>
      <select class="form-select" id="order-prod-id" onchange="calculateOrderTotal()">${prodOpts}</select>
    </div>
    <div class="form-group">
      <label class="form-label">Miqdori (birlik)</label>
      <input type="number" class="form-input" id="order-qty" value="1" min="1" oninput="calculateOrderTotal()">
    </div>
    <div class="form-group">
      <label class="form-label">To'lov turi</label>
      <select class="form-select" id="order-payment">
        <option value="Naqd">Naqd to'lov</option>
        <option value="Karta">Karta (Uzcard/Humo)</option>
        <option value="Nasiya">Nasiya (Qarz yozish)</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Yetkazib berish vaqti</label>
      <select class="form-select" id="order-date">
        <option value="Bugun">Bugun</option>
        <option value="Ertaga">Ertaga</option>
      </select>
    </div>
    <div style="background:var(--surface2); padding:14px; border-radius:var(--radius-sm); margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text2)">
        <span>Jami summa:</span>
        <span style="font-weight:700; color:var(--text); font-size:15px; font-family:'Space Grotesk',sans-serif;" id="order-total-preview">0 UZS</span>
      </div>
    </div>
    <button class="btn-primary" onclick="submitNewOrder()">📋 Buyurtmani Tizimga Kiritish</button>
  `;
  openModal('Yangi Buyurtma Kiritish', form);
  calculateOrderTotal();
}

function calculateOrderTotal() {
  const prodId = document.getElementById('order-prod-id').value;
  const qty = parseInt(document.getElementById('order-qty').value);
  const p = State.products.find(x => x.id === prodId);
  const preview = document.getElementById('order-total-preview');

  if (p && !isNaN(qty) && qty > 0) {
    const total = p.price * qty;
    preview.textContent = total.toLocaleString() + ' UZS';
  } else {
    preview.textContent = '0 UZS';
  }
}

function submitNewOrder() {
  const clientId = document.getElementById('order-client-id').value;
  const prodId = document.getElementById('order-prod-id').value;
  const qty = parseInt(document.getElementById('order-qty').value);
  const payment = document.getElementById('order-payment').value;
  const date = document.getElementById('order-date').value;

  const client = State.clients.find(c => c.id === clientId);
  const product = State.products.find(p => p.id === prodId);

  if (!client || !product || isNaN(qty) || qty <= 0) {
    showToast('Iltimos ma\'lumotlarni to\'g\'ri to\'ldiring!');
    return;
  }

  if (product.stock < qty) {
    showToast(`Omborda yetarli tovar yo'q! Maksimal qoldiq: ${product.stock} ta`);
    return;
  }

  const newOrder = {
    id: 'o_' + Date.now(),
    clientId: client.id,
    clientName: client.name,
    items: [{ productId: product.id, qty: qty, name: product.name, price: product.price }],
    total: product.price * qty,
    date: date,
    status: 'Kutilmoqda',
    payment: payment
  };

  State.addOrder(newOrder);
  showToast('Buyurtma saqlandi va hisob-kitob yangilandi! 📦');
  closeModal();
}
