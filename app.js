// ══════════════════════════════════════════
// PWA SERVICE WORKER REGISTRATION
// ══════════════════════════════════════════
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('[PWA] NP Prime Service Worker registered:', reg.scope))
      .catch(err => console.error('[PWA] NP Prime Service Worker registration failed:', err));
  });
}

// ══════════════════════════════════════════
// PWA INSTALL PROMPT & OFFLINE DETECTION
// ══════════════════════════════════════════
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
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
      console.log('[PWA] User installed NP Prime app');
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
      showToast('Tizim onlayn rejimda ishlamoqda ✨');
    } else {
      offlineBanner.classList.add('active');
      showToast('Oflayn rejim: Barcha ma\'lumotlar xavfsiz saqlanmoqda ⚠️');
    }
  }
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// ══════════════════════════════════════════
// LIGHT / DARK THEME MANAGEMENT
// ══════════════════════════════════════════
function initTheme() {
  const savedTheme = localStorage.getItem('np_theme') || 'dark';
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
  localStorage.setItem('np_theme', activeTheme);
  updateThemeToggleIcon();
  showToast(activeTheme === 'light' ? 'Yorug\' mavzuga o\'tildi' : 'Obsidian Gold mavzusi yoqildi 🌙');
}

function updateThemeToggleIcon() {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
  }
}

// ══════════════════════════════════════════
// DEFAULT PRESETS (5 NFC FORM FACTORS & FINANCES)
// ══════════════════════════════════════════
const DEFAULT_PRODUCTS = [
  { 
    id: 'prod-1', 
    name: 'NFC Classic Black', 
    unit: 'dona', 
    size: '85.5 × 54 mm',
    material: 'Matte Black PVC / Smart Chip',
    stock: 78, 
    price: 250000, 
    cost: 55000, 
    icon: '💳', 
    substrate: 'sub-black',
    sold: 142 
  },
  { 
    id: 'prod-2', 
    name: 'NFC Classic White', 
    unit: 'dona', 
    size: '85.5 × 54 mm',
    material: 'Studio White PVC / Smart Chip',
    stock: 54, 
    price: 250000, 
    cost: 55000, 
    icon: '🪪', 
    substrate: 'sub-white',
    sold: 98 
  },
  { 
    id: 'prod-3', 
    name: 'NFC Mini White', 
    unit: 'dona', 
    size: '22 × 30 mm',
    material: 'Compact White Keycard Tag',
    stock: 110, 
    price: 150000, 
    cost: 35000, 
    icon: '🏷️', 
    substrate: 'sub-mini',
    sold: 160 
  },
  { 
    id: 'prod-4', 
    name: 'NFC Round Black', 
    unit: 'dona', 
    size: 'Ø 25 mm',
    material: 'Matte Black NFC Coin / Token',
    stock: 135, 
    price: 150000, 
    cost: 30000, 
    icon: '🪙', 
    substrate: 'sub-black',
    sold: 185 
  },
  { 
    id: 'prod-5', 
    name: 'NFC Round White', 
    unit: 'dona', 
    size: 'Ø 25 mm',
    material: 'Studio White NFC Coin / Token',
    stock: 92, 
    price: 150000, 
    cost: 30000, 
    icon: '🔘', 
    substrate: 'sub-white',
    sold: 115 
  }
];

const DEFAULT_CLIENTS = [
  { 
    id: 'c1', 
    name: 'Akmal Rahimov', 
    phone: '+998 90 123 45 67', 
    address: 'IT Park, Mirzo Ulug\'bek tumani', 
    totalSpend: 2500000, 
    debt: 250000, 
    history: [
      { date: 'Bugun', type: 'Karta', desc: 'NFC Classic Black (2 dona) buyurtma qilindi', amount: 550000 },
      { date: '12-Avgust', type: 'Nasiya', desc: 'VIP Shaxsiy NFC Karta buyurtmasi', amount: 250000 }
    ], 
    status: 'VIP' 
  },
  { 
    id: 'c2', 
    name: 'Hilola Karimova', 
    phone: '+998 93 456 78 90', 
    address: 'Artel Media Markazi, Shayxontohur', 
    totalSpend: 1850000, 
    debt: 0, 
    history: [
      { date: 'Kecha', type: 'Naqd', desc: 'NFC Classic White buyurtma qilindi', amount: 240000 },
      { date: '04-Avgust', type: 'Karta', desc: 'Kompaniya jamoasi uchun 5 ta mini tag', amount: 750000 }
    ], 
    status: 'Faol' 
  },
  { 
    id: 'c3', 
    name: 'Bobur Mirzayev', 
    phone: '+998 94 987 65 43', 
    address: 'Rayhon Lounge & Restoran, Chilonzor', 
    totalSpend: 3200000, 
    debt: 450000, 
    history: [
      { date: 'Bugun', type: 'Nasiya', desc: 'Stollar uchun 5 ta Round Black Coin', amount: 700000 },
      { date: '28-Iyul', type: 'To\'lov', desc: 'Qarz to\'lovi amalga oshirildi', amount: 300000 }
    ], 
    status: 'VIP' 
  },
  { 
    id: 'c4', 
    name: 'Sardor Aliyev', 
    phone: '+998 97 111 22 33', 
    address: 'Freelance Studio, Yunusobod', 
    totalSpend: 400000, 
    debt: 0, 
    history: [
      { date: 'Bugun', type: 'Karta', desc: 'NFC Classic Black (Shaxsiy dizayn)', amount: 280000 }
    ], 
    status: 'Yangi' 
  }
];

const DEFAULT_ORDERS = [
  { 
    id: 'NP-1048', 
    clientId: 'c1', 
    clientName: 'Akmal Rahimov', 
    clientPhone: '+998 90 123 45 67',
    clientAddress: 'IT Park, Mirzo Ulug\'bek tumani',
    items: [
      { 
        productId: 'prod-1', 
        name: 'NFC Classic Black', 
        qty: 2, 
        unitPrice: 250000, 
        designFee: 50000, 
        cost: 55000,
        specs: { 
          name: 'Akmal Rahimov', 
          role: 'Chief Executive Officer', 
          designNo: '#12', 
          insta: '@akmal_tech',
          email: 'akmal@itpark.uz'
        } 
      }
    ], 
    total: 550000, 
    date: 'Bugun', 
    status: 'Tayyorlanmoqda', 
    payment: 'Karta' 
  },
  { 
    id: 'NP-1047', 
    clientId: 'c2', 
    clientName: 'Hilola Karimova', 
    clientPhone: '+998 93 456 78 90',
    clientAddress: 'Artel Media Markazi, Shayxontohur',
    items: [
      { 
        productId: 'prod-2', 
        name: 'NFC Classic White', 
        qty: 1, 
        unitPrice: 240000, 
        designFee: 0, 
        cost: 55000,
        specs: { 
          name: 'Hilola Karimova', 
          role: 'Art Director', 
          designNo: '#05', 
          insta: '@hilola_art',
          email: 'hilola@artel.uz'
        } 
      }
    ], 
    total: 240000, 
    date: 'Kecha', 
    status: 'Yetkazildi', 
    payment: 'Naqd' 
  },
  { 
    id: 'NP-1046', 
    clientId: 'c3', 
    clientName: 'Bobur Mirzayev', 
    clientPhone: '+998 94 987 65 43',
    clientAddress: 'Rayhon Lounge & Restoran, Chilonzor',
    items: [
      { 
        productId: 'prod-4', 
        name: 'NFC Round Black', 
        qty: 5, 
        unitPrice: 130000, 
        designFee: 50000, 
        cost: 30000,
        specs: { 
          name: 'Rayhon Lounge', 
          role: 'Contactless Smart Menu', 
          designNo: '#01', 
          insta: '@rayhon_tashkent',
          email: 'info@rayhon.uz'
        } 
      }
    ], 
    total: 700000, 
    date: 'Bugun', 
    status: 'Kutilmoqda', 
    payment: 'Nasiya' 
  }
];

const DEFAULT_EXPENSES = [
  { id: 'exp-1', category: 'Pechat & Bosma', amount: 320000, desc: 'UV Bo\'yoq va lazer primeri to\'plami', date: '21-Avgust' },
  { id: 'exp-2', category: 'Yetkazib berish', amount: 145000, desc: 'Yandex Delivery (5 ta buyurtma yetkazish)', date: 'Bugun' },
  { id: 'exp-3', category: 'Marketing & Reklama', amount: 450000, desc: 'Instagram Target reklama kampaniyasi', date: '20-Avgust' },
  { id: 'exp-4', category: 'Qadoqlash', amount: 180000, desc: 'Obsidian Gold sovg\'abop qutilar (50 dona)', date: '19-Avgust' }
];

// ══════════════════════════════════════════
// APP STATE MANAGER
// ══════════════════════════════════════════
const State = {
  products: [],
  clients: [],
  orders: [],
  expenses: [],

  init() {
    this.products = JSON.parse(localStorage.getItem('np_products')) || DEFAULT_PRODUCTS;
    this.clients = JSON.parse(localStorage.getItem('np_clients')) || DEFAULT_CLIENTS;
    this.orders = JSON.parse(localStorage.getItem('np_orders')) || DEFAULT_ORDERS;
    this.expenses = JSON.parse(localStorage.getItem('np_expenses')) || DEFAULT_EXPENSES;
    this.save();
  },

  save() {
    localStorage.setItem('np_products', JSON.stringify(this.products));
    localStorage.setItem('np_clients', JSON.stringify(this.clients));
    localStorage.setItem('np_orders', JSON.stringify(this.orders));
    localStorage.setItem('np_expenses', JSON.stringify(this.expenses));
    updateBadges();
  },

  addOrder(order) {
    this.orders.unshift(order);

    // Deduct stock and record sold counts
    order.items.forEach(item => {
      const prod = this.products.find(p => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.qty);
        prod.sold = (prod.sold || 0) + item.qty;
      }
    });

    // Update Client spend & history
    const client = this.clients.find(c => c.id === order.clientId);
    if (client) {
      client.totalSpend += order.total;
      const desc = `${order.items.map(i => `${i.qty}x ${i.name} (${i.unitPrice.toLocaleString()} UZS)`).join(', ')}`;
      if (order.payment === 'Nasiya') {
        client.debt += order.total;
        client.history.unshift({
          date: 'Bugun',
          type: 'Nasiya',
          desc: `Qarzga buyurtma: ${desc}`,
          amount: order.total
        });
      } else {
        client.history.unshift({
          date: 'Bugun',
          type: order.payment,
          desc: `Sotib olindi: ${desc}`,
          amount: order.total
        });
      }
    }
    this.save();
    renderTab(currentTab);
  },

  addExpense(category, amount, desc, date) {
    const newExp = {
      id: 'exp-' + Date.now(),
      category,
      amount,
      desc,
      date: date || 'Bugun'
    };
    this.expenses.unshift(newExp);
    this.save();
    renderTab(currentTab);
    return newExp;
  },

  deleteExpense(id) {
    this.expenses = this.expenses.filter(e => e.id !== id);
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
        desc: 'Nasiya qarz to\'lovi qabul qilindi',
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
      
      // Restore stock
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
          desc: `Buyurtma (#${order.id}) bekor qilindi`,
          amount: order.total
        });
      }
      this.save();
      renderTab(currentTab);
      return true;
    }
    return false;
  },

  addStock(productId, qty, newCost) {
    const prod = this.products.find(p => p.id === productId);
    if (prod) {
      prod.stock += qty;
      if (newCost && newCost > 0) {
        prod.cost = newCost;
      }
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
  },

  // Calculate Real Financial Metrics
  getFinancials() {
    let totalRevenue = 0;
    let totalTannarx = 0;

    this.orders.forEach(o => {
      if (o.status !== 'Qaytarildi') {
        totalRevenue += o.total;
        o.items.forEach(item => {
          const prod = this.products.find(p => p.id === item.productId);
          const itemCost = item.cost || (prod ? prod.cost : 40000);
          totalTannarx += (itemCost * item.qty);
        });
      }
    });

    let totalDirectExpenses = 0;
    this.expenses.forEach(e => {
      totalDirectExpenses += e.amount;
    });

    const totalAllCosts = totalTannarx + totalDirectExpenses;
    const netProfit = totalRevenue - totalAllCosts;
    const marginPercent = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : '0';

    return {
      totalRevenue,
      totalTannarx,
      totalDirectExpenses,
      totalAllCosts,
      netProfit,
      marginPercent
    };
  }
};

// Initialize State
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
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const hdrTime = document.getElementById('hdr-time');
  if (hdrTime) hdrTime.textContent = h + ':' + m;
}
updateClock();
setInterval(updateClock, 10000);

function updateBadges() {
  const badge = document.getElementById('orders-badge');
  const activeOrders = State.orders.filter(o => o.status === 'Kutilmoqda' || o.status === 'Tayyorlanmoqda' || o.status === 'Jo\'natildi').length;
  if (badge) {
    badge.textContent = activeOrders;
    badge.style.display = activeOrders > 0 ? 'flex' : 'none';
  }
}

// ══════════════════════════════════════════
// PIN SECURITY LOGIC (PIN: 7777)
// ══════════════════════════════════════════
let pin = '';
const CORRECT_PIN = '7777'; // Updated to 7777 as requested
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
        setTimeout(openApp, 250);
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

  body.innerHTML = `
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-card"></div>
    <div class="skeleton skeleton-card"></div>
  `;

  setTimeout(() => {
    body.innerHTML = getTabContent(tab);
    body.scrollTop = 0;

    const fab = document.getElementById('fab-btn');
    if (fab) {
      if (['orders', 'expenses', 'products', 'clients'].includes(tab)) {
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
  }, 80);
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
    case 'expenses':  return expensesTabContent();
    case 'products':  return productsTabContent();
    case 'clients':   return clientsTabContent();
    case 'analytics': return analyticsTabContent();
    default: return '';
  }
}

// ── 1. Dashboard Tab
function dashboardContent() {
  const fin = State.getFinancials();
  let qarzliMijozlar = 0;
  let jamiQarzSum = 0;

  State.clients.forEach(c => {
    if (c.debt > 0) {
      qarzliMijozlar++;
      jamiQarzSum += c.debt;
    }
  });

  const displayProfit = (fin.netProfit / 1000000).toFixed(2) + 'M';
  const displayQarz = (jamiQarzSum / 1000000).toFixed(2) + 'M';
  const displayRevenue = (fin.totalRevenue / 1000000).toFixed(2) + 'M';

  const isInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  const showBannerStyle = (!isInstalled && deferredPrompt) ? 'flex' : 'none';

  return `
    <div id="pwa-install-banner" class="install-app-banner" style="display: ${showBannerStyle};">
      <div class="install-app-banner-info">
        <span class="install-app-banner-logo">⚡</span>
        <div class="install-app-banner-text">
          <h4>NP PRIME Manager</h4>
          <p>Tezkor smart vizitka CRM ilovasini o'rnating</p>
        </div>
      </div>
      <button class="btn-install" onclick="triggerInstallApp()">O'rnatish</button>
    </div>

    <div class="summary-banner">
      <div class="sb-left">
        <div class="sb-label">Sof Foyda (Joriy Oy)</div>
        <div class="sb-val" style="color:var(--gold);">${displayProfit} UZS</div>
        <div class="sb-sub">Kirim: ${displayRevenue} UZS • Marja: ${fin.marginPercent}%</div>
      </div>
      <div class="sb-right" style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
        <div class="theme-switch-wrap">
          <button class="theme-toggle-btn" id="theme-toggle-btn" onclick="toggleTheme()" title="Mavzuni almashtirish">☀️</button>
        </div>
        <div class="sb-date" id="today-date" style="margin-top: 6px;">--/--/--</div>
      </div>
    </div>

    <p class="sec-label">Bugungi asosiy ko'rsatkichlar</p>
    <div class="stat-grid">
      <div class="stat-card gold" onclick="openDetail('orders')">
        <div class="sc-icon">📋</div>
        <div class="sc-val">${State.orders.length}</div>
        <div class="sc-label">NFC Buyurtmalar</div>
        <div class="sc-delta">${State.orders.filter(o => o.status === 'Kutilmoqda' || o.status === 'Tayyorlanmoqda').length} ta faol ish jarayonida</div>
      </div>
      <div class="stat-card coral" onclick="openDetail('expenses')">
        <div class="sc-icon">💸</div>
        <div class="sc-val">${(fin.totalDirectExpenses/1000).toLocaleString()}k</div>
        <div class="sc-label">Operatsion Chiqimlar</div>
        <div class="sc-delta">${State.expenses.length} ta xarajat qaydi</div>
      </div>
      <div class="stat-card teal" onclick="openDetail('products')">
        <div class="sc-icon">💳</div>
        <div class="sc-val">${State.products.reduce((acc, p) => acc + p.stock, 0)}</div>
        <div class="sc-label">Ombordagi Kartalar</div>
        <div class="sc-delta">5 xil NFC form-faktor</div>
      </div>
      <div class="stat-card orange" onclick="openDetail('debts')">
        <div class="sc-icon">⏳</div>
        <div class="sc-val">${displayQarz} UZS</div>
        <div class="sc-label">Nasiya (Qarzlar)</div>
        <div class="sc-delta">${qarzliMijozlar} ta mijozda qarz bor</div>
      </div>
    </div>

    <p class="sec-label">Tizim boshqaruv modullari</p>
    <div class="module-list">
      <div class="module-card gold" onclick="openDetail('orders')">
        <div class="mc-icon">📋</div>
        <div class="mc-body">
          <div class="mc-title">NFC Buyurtmalar</div>
          <div class="mc-sub">Dinamik narxlash, shaxsiy dizayn va Telegram dispatch</div>
        </div>
        <div class="mc-right">
          <span class="mc-badge gold">${State.orders.length} ta</span>
          <span class="mc-arrow">›</span>
        </div>
      </div>
      <div class="module-card coral" onclick="openDetail('expenses')">
        <div class="mc-icon">💸</div>
        <div class="mc-body">
          <div class="mc-title">Xarajatlar & Chiqimlar</div>
          <div class="mc-sub">UV pechat, yetkazib berish, target reklama va qadoqlash</div>
        </div>
        <div class="mc-right">
          <span class="mc-badge coral">${State.expenses.length} ta</span>
          <span class="mc-arrow">›</span>
        </div>
      </div>
      <div class="module-card teal" onclick="openDetail('products')">
        <div class="mc-icon">💳</div>
        <div class="mc-body">
          <div class="mc-title">NFC Form Faktorlar (Ombor)</div>
          <div class="mc-sub">Classic Black, White, Mini Tag va Round Coin qoldiqlari</div>
        </div>
        <div class="mc-right">
          <span class="mc-badge teal">5 tur</span>
          <span class="mc-arrow">›</span>
        </div>
      </div>
      <div class="module-card blue" onclick="openDetail('clients')">
        <div class="mc-icon">👥</div>
        <div class="mc-body">
          <div class="mc-title">Mijozlar & Brendlar</div>
          <div class="mc-sub">VIP mijozlar profili, xaridlar tarixi va aloqa ma'lumotlari</div>
        </div>
        <div class="mc-right">
          <span class="mc-badge blue">${State.clients.length} ta</span>
          <span class="mc-arrow">›</span>
        </div>
      </div>
      <div class="module-card green" onclick="openDetail('analytics')">
        <div class="mc-icon">📈</div>
        <div class="mc-body">
          <div class="mc-title">Moliya & Rentabellik</div>
          <div class="mc-sub">Haqiqiy Sof Foyda, Tannarx va Sotuv grafiklari</div>
        </div>
        <div class="mc-right">
          <span class="mc-badge green">${fin.marginPercent}%</span>
          <span class="mc-arrow">›</span>
        </div>
      </div>
    </div>
  `;
}

// ── 2. Orders Tab
let currentOrderFilter = 'all';
let orderSearchQuery = '';

function ordersTabContent() {
  const activeOrders = State.orders;
  let listHtml = '';
  
  if (activeOrders.length === 0) {
    listHtml = `<div style="text-align:center;padding:32px;color:var(--muted)">Buyurtmalar mavjud emas.</div>`;
  } else {
    listHtml = activeOrders.slice(0, 5).map(ord => renderOrderSingleItem(ord)).join('');
  }

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; margin-bottom:8px;">
      <p class="sec-label" style="margin:0;">Oxirgi buyurtmalar ro'yxati</p>
      <button onclick="showAddOrderForm()" class="icon-text-btn" style="color:var(--gold);">+ Yangi Buyurtma</button>
    </div>
    <div class="wide-card">
      ${listHtml}
    </div>
    <div style="text-align:center; padding:8px 0;">
      <button onclick="openDetail('orders')" class="btn-primary" style="background:var(--surface2); border:1px solid var(--border); color:var(--text); width:auto; padding:10px 24px; font-size:12px; border-radius:20px;">Barcha buyurtmalarni ko'rish (${State.orders.length}) →</button>
    </div>
  `;
}

function renderOrderSingleItem(ord) {
  let statusClass = 'status-pending';
  let icon = '⏳';
  if (ord.status === 'Tayyorlanmoqda') { statusClass = 'status-prep'; icon = '⚡'; }
  if (ord.status === 'Yetkazildi')     { statusClass = 'status-done'; icon = '✓'; }
  if (ord.status === 'Qaytarildi')    { statusClass = 'status-debt'; icon = '↩️'; }

  const itemSummary = ord.items.map(i => `${i.qty}x ${i.name}`).join(', ');
  const specHint = ord.items[0]?.specs?.designNo ? `Naqsh: ${ord.items[0].specs.designNo}` : '';

  return `
    <div class="order-item" onclick="showOrderActions('${ord.id}')" style="cursor:pointer;">
      <div class="oi-avatar">${ord.clientName ? ord.clientName[0] : 'N'}</div>
      <div class="oi-body">
        <div class="oi-header-row">
          <span class="oi-id">#${ord.id}</span>
          <span class="oi-name">${ord.clientName}</span>
        </div>
        <div class="oi-detail">${itemSummary} • ${ord.date}</div>
        ${specHint ? `<div class="oi-specs">${specHint} • ${ord.payment}</div>` : `<div class="oi-specs">${ord.payment}</div>`}
      </div>
      <div class="oi-right">
        <div class="oi-sum">${ord.total.toLocaleString()} UZS</div>
        <div class="status-pill ${statusClass}">${icon} ${ord.status}</div>
      </div>
    </div>
  `;
}

// ── 3. Expenses Tab
function expensesTabContent() {
  const fin = State.getFinancials();
  const listHtml = State.expenses.slice(0, 5).map(e => `
    <div class="order-item">
      <div class="oi-avatar" style="background:rgba(248,113,113,0.12); color:#f87171;">💸</div>
      <div class="oi-body">
        <div class="oi-name">${e.category}</div>
        <div class="oi-detail">${e.desc} • ${e.date}</div>
      </div>
      <div class="oi-right">
        <div class="oi-sum" style="color:#f87171;">−${e.amount.toLocaleString()} UZS</div>
      </div>
    </div>
  `).join('') || `<div style="text-align:center;padding:24px;color:var(--muted)">Xarajatlar kiritilmagan.</div>`;

  return `
    <div class="summary-banner" style="background:rgba(248,113,113,0.08); border-color:rgba(248,113,113,0.25);">
      <div class="sb-left">
        <div class="sb-label" style="color:#f87171;">Operatsion Xarajatlar</div>
        <div class="sb-val" style="color:#f87171;">${fin.totalDirectExpenses.toLocaleString()} UZS</div>
        <div class="sb-sub">${State.expenses.length} ta qayd • UV bosma, yetkazish, reklama</div>
      </div>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; margin-bottom:8px;">
      <p class="sec-label" style="margin:0;">Oxirgi chiqimlar</p>
      <button onclick="showAddExpenseForm()" class="icon-text-btn" style="color:#f87171;">+ Yangi Chiqim</button>
    </div>
    <div class="wide-card">
      ${listHtml}
    </div>
    <div style="text-align:center; padding:8px 0;">
      <button onclick="openDetail('expenses')" class="btn-primary" style="background:var(--surface2); border:1px solid var(--border); color:var(--text); width:auto; padding:10px 24px; font-size:12px; border-radius:20px;">Barcha xarajatlar jurnali →</button>
    </div>
  `;
}

// ── 4. Products Tab
function productsTabContent() {
  const prodHtml = State.products.map(p => {
    const isLow = p.stock <= 15;
    return `
      <div class="product-item" onclick="showAddStockForm('${p.id}')" style="cursor:pointer;">
        <div class="pi-icon">${p.icon}</div>
        <div class="pi-body">
          <div class="pi-name">${p.name}</div>
          <div class="pi-unit">${p.size} • <span class="substrate-pill ${p.substrate}">${p.material.split('/')[0]}</span></div>
          <div class="pi-cost-hint">Tannarx: ~${p.cost.toLocaleString()} UZS</div>
        </div>
        <div class="pi-right">
          <div class="pi-stock ${isLow ? 'pi-low' : ''}" style="${isLow ? 'color:#ff453a;' : 'color:var(--text)'}">${isLow ? '⚠️ ' : ''}${p.stock} dona</div>
          <div class="pi-price">${p.price.toLocaleString()} UZS</div>
          ${isLow ? '<div class="low-indicator" style="background:rgba(255,69,58,0.15);color:#ff453a;">Kam qoldi!</div>' : ''}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; margin-bottom:8px;">
      <p class="sec-label" style="margin:0;">NFC Form Faktorlari & Ombor</p>
      <button onclick="showAddStockForm()" class="icon-text-btn" style="color:var(--gold);">📥 Kirim Qilish</button>
    </div>
    <div class="wide-card">
      ${prodHtml}
    </div>
    <div style="text-align:center;">
      <button onclick="openDetail('products')" class="btn-primary" style="background:var(--surface2); border:1px solid var(--border); color:var(--text); width:auto; padding:10px 24px; font-size:12px; border-radius:20px;">Omborni boshqarish →</button>
    </div>
  `;
}

// ── 5. Clients Tab
function clientsTabContent() {
  const clientsHtml = State.clients.map(c => {
    const debtLabel = c.debt > 0 ? `<div class="status-pill status-debt">${c.debt.toLocaleString()} UZS qarz</div>` : `<div class="status-pill status-done">✓ Qarzsiz</div>`;
    return `
      <div class="order-item" onclick="showClientHistory('${c.id}')" style="cursor:pointer;">
        <div class="oi-avatar">${c.name[0]}</div>
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
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; margin-bottom:8px;">
      <p class="sec-label" style="margin:0;">Mijozlar & Brendlar bazasi</p>
      <button onclick="showAddClientForm()" class="icon-text-btn" style="color:var(--gold);">+ Yangi Mijoz</button>
    </div>
    <div class="wide-card">
      ${clientsHtml}
    </div>
  `;
}

// ── 6. Analytics Tab
function analyticsTabContent() {
  const fin = State.getFinancials();

  return `
    <div class="financial-card">
      <div class="fc-header">
        <span class="fc-badge">MOLIYAVIY KO'RSATKICHLAR</span>
        <span class="fc-margin">Marja: ${fin.marginPercent}%</span>
      </div>
      <div class="fc-label">Jami Sof Foyda (Aniq hisob-kitob)</div>
      <div class="fc-profit">${fin.netProfit.toLocaleString()} UZS</div>
      <div class="fc-divider"></div>
      <div class="fc-grid">
        <div class="fc-sub-item">
          <span class="fcs-label">🟢 Jami Kirim:</span>
          <span class="fcs-val">${fin.totalRevenue.toLocaleString()} UZS</span>
        </div>
        <div class="fc-sub-item">
          <span class="fcs-label">🟡 Xomashyo Tannarxi:</span>
          <span class="fcs-val">${fin.totalTannarx.toLocaleString()} UZS</span>
        </div>
        <div class="fc-sub-item">
          <span class="fcs-label">🔴 Operatsion Chiqim:</span>
          <span class="fcs-val">${fin.totalDirectExpenses.toLocaleString()} UZS</span>
        </div>
        <div class="fc-sub-item">
          <span class="fcs-label">⚖️ Jami Xarajatlar:</span>
          <span class="fcs-val" style="color:#ff6b6b">${fin.totalAllCosts.toLocaleString()} UZS</span>
        </div>
      </div>
    </div>

    <p class="sec-label">Sotuv grafigi</p>
    <div class="chart-wrap">
      <div class="chart-header">
        <div class="chart-title">Haftalik sotuv hajmi</div>
        <div class="chart-tabs">
          <button class="chart-tab active" id="tab-chart-week-inside" onclick="switchChart('week',this)">Hafta</button>
          <button class="chart-tab" id="tab-chart-month-inside" onclick="switchChart('month',this)">Oy</button>
        </div>
      </div>
      <div class="chart-bars-wrap" id="chart-bars-tab"></div>
      <div class="chart-labels" id="chart-labels-tab"></div>
    </div>
    <div style="text-align:center;">
      <button onclick="openDetail('analytics')" class="btn-primary" style="background:var(--surface2); border:1px solid var(--border); color:var(--text); width:auto; padding:10px 24px; font-size:12px; border-radius:20px;">To'liq Moliya Hisobotini Ko'rish →</button>
    </div>
  `;
}

function updateTodayDate() {
  const el = document.getElementById('today-date');
  if (!el) return;
  const d = new Date();
  const days = ['Yakshanba','Dushanba','Seshanba','Chorshanba','Payshanba','Juma','Shanba'];
  const months = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentyabr','Oktyabr','Noyabr','Dekabr'];
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
    
    if (id === 'orders') renderOrdersDetailList();
    if (id === 'expenses') renderExpensesDetailList();
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

// ── Detail: Orders
function renderOrdersDetailList() {
  const filtered = State.orders.filter(o => {
    const matchesFilter = currentOrderFilter === 'all' || o.status === currentOrderFilter;
    const matchesSearch = !orderSearchQuery || 
      o.clientName.toLowerCase().includes(orderSearchQuery.toLowerCase()) || 
      o.id.toLowerCase().includes(orderSearchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  document.getElementById('orders-detail-subtitle').textContent = `Jami: ${State.orders.length} ta buyurtma (${filtered.length} ta ko'rsatilmoqda)`;
  document.getElementById('orders-stat-total').textContent = State.orders.length;
  document.getElementById('orders-stat-done').textContent = State.orders.filter(o => o.status === 'Yetkazildi').length;

  const container = document.getElementById('orders-detail-list');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:32px;color:var(--muted)">Mos keluvchi buyurtmalar topilmadi.</div>`;
    return;
  }

  container.innerHTML = filtered.map(ord => `
    <div class="wide-card" style="margin-bottom:10px; cursor:pointer;" onclick="showOrderActions('${ord.id}')">
      ${renderOrderSingleItem(ord)}
    </div>
  `).join('');
}

function setOrderFilter(filter, btn) {
  currentOrderFilter = filter;
  document.querySelectorAll('#orders-filter-chips .chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderOrdersDetailList();
}

function filterOrdersList() {
  const input = document.getElementById('orders-search-input');
  if (input) {
    orderSearchQuery = input.value.trim();
    renderOrdersDetailList();
  }
}

// ── Detail: Expenses
function renderExpensesDetailList() {
  const fin = State.getFinancials();
  document.getElementById('expenses-detail-subtitle').textContent = `Jami: ${State.expenses.length} ta chiqim qaydi`;
  document.getElementById('expenses-total-banner').textContent = fin.totalDirectExpenses.toLocaleString() + ' UZS';
  document.getElementById('expenses-count-banner').textContent = `${State.expenses.length} ta operatsion chiqimlar`;

  // Category breakdown
  const catSums = {};
  State.expenses.forEach(e => {
    catSums[e.category] = (catSums[e.category] || 0) + e.amount;
  });

  const catBreakdown = document.getElementById('expenses-category-breakdown');
  if (catBreakdown) {
    const cats = Object.keys(catSums);
    if (cats.length === 0) {
      catBreakdown.innerHTML = `<div style="color:var(--muted);text-align:center;font-size:12px;">Hozircha xarajat toifalari yo'q</div>`;
    } else {
      catBreakdown.innerHTML = cats.map(cat => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid var(--border); font-size:12px;">
          <span style="font-weight:600; color:var(--text);">${cat}</span>
          <span style="font-weight:700; color:#f87171;">${catSums[cat].toLocaleString()} UZS</span>
        </div>
      `).join('');
    }
  }

  const container = document.getElementById('expenses-detail-list');
  if (!container) return;

  if (State.expenses.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:24px;color:var(--muted)">Xarajatlar mavjud emas.</div>`;
    return;
  }

  container.innerHTML = State.expenses.map(e => `
    <div class="wide-card" style="margin-bottom:8px;">
      <div class="order-item" style="border:none; padding:0;">
        <div class="oi-avatar" style="background:rgba(248,113,113,0.12); color:#f87171;">💸</div>
        <div class="oi-body">
          <div class="oi-name">${e.category}</div>
          <div class="oi-detail">${e.desc} • ${e.date}</div>
        </div>
        <div class="oi-right">
          <div class="oi-sum" style="color:#f87171;">−${e.amount.toLocaleString()} UZS</div>
          <button onclick="deleteExpenseItem('${e.id}')" style="background:transparent; border:none; color:var(--muted); font-size:11px; margin-top:4px; cursor:pointer;">🗑️ O'chirish</button>
        </div>
      </div>
    </div>
  `).join('');
}

function showAddExpenseForm() {
  const form = `
    <div class="form-group">
      <label class="form-label">Xarajat toifasi</label>
      <select class="form-select" id="exp-category">
        <option value="Pechat & Bosma">🎨 UV Pechat, Bo'yoq & Lenta</option>
        <option value="Yetkazib berish">🚚 Yetkazib berish (Yandex / BTS / Pochta)</option>
        <option value="Marketing & Reklama">📢 Marketing & Instagram Target</option>
        <option value="Qadoqlash">📦 Sovg'abop qutilar & Lenta</option>
        <option value="Xomashyo & Blank kartalar">💳 Xomashyo & Blank NFC kartalar</option>
        <option value="Ofis & Kommunal">🏢 Ofis, Internet & Boshqa</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Chiqim summasi (UZS)</label>
      <input type="number" class="form-input" id="exp-amount" placeholder="Masalan: 85000" min="1">
    </div>
    <div class="form-group">
      <label class="form-label">Tavsif / Izoh</label>
      <input type="text" class="form-input" id="exp-desc" placeholder="Masalan: 3 ta buyurtmani Yandex orqali yetkazish">
    </div>
    <div class="form-group">
      <label class="form-label">Sana</label>
      <select class="form-select" id="exp-date">
        <option value="Bugun">Bugun</option>
        <option value="Kecha">Kecha</option>
      </select>
    </div>
    <button class="btn-primary" onclick="submitAddExpense()">💸 Xarajatni Saqlash</button>
  `;
  openModal('Yangi Chiqim / Xarajat Kiritish', form);
}

function submitAddExpense() {
  const category = document.getElementById('exp-category').value;
  const amount = parseInt(document.getElementById('exp-amount').value);
  const desc = document.getElementById('exp-desc').value;
  const date = document.getElementById('exp-date').value;

  if (isNaN(amount) || amount <= 0 || !desc) {
    showToast('Iltimos ma\'lumotlarni to\'liq to\'ldiring!');
    return;
  }

  State.addExpense(category, amount, desc, date);
  showToast('Xarajat muvaffaqiyatli saqlandi va moliya yangilandi! 💸');
  closeModal();
  if (document.getElementById('detail-expenses')?.classList.contains('active')) renderExpensesDetailList();
}

function deleteExpenseItem(id) {
  if (confirm("Ushbu xarajatni o'chirmoqchimisiz?")) {
    State.deleteExpense(id);
    showToast("Xarajat o'chirildi!");
    if (document.getElementById('detail-expenses')?.classList.contains('active')) renderExpensesDetailList();
  }
}

// ── Detail: Products & Stock
function renderProductsDetailList() {
  const totalKinds = State.products.length;
  const totalStock = State.products.reduce((acc, p) => acc + p.stock, 0);
  const totalSold = State.products.reduce((acc, p) => acc + (p.sold || 0), 0);

  document.getElementById('products-detail-subtitle').textContent = `${totalKinds} turdagi NFC kartalar mavjud (${totalStock} dona omborda)`;
  document.getElementById('products-stat-stock').textContent = totalStock;
  document.getElementById('products-stat-chiqim').textContent = totalSold;

  const container = document.getElementById('products-detail-list');
  if (!container) return;

  container.innerHTML = State.products.map(p => {
    const isLow = p.stock <= 15;
    return `
      <div class="product-item" onclick="showAddStockForm('${p.id}')" style="cursor:pointer;">
        <div class="pi-icon">${p.icon}</div>
        <div class="pi-body">
          <div class="pi-name">${p.name}</div>
          <div class="pi-unit">${p.size} • <span class="substrate-pill ${p.substrate}">${p.material.split('/')[0]}</span></div>
          <div class="pi-cost-hint">Tannarx: ~${p.cost.toLocaleString()} UZS • Tavsiya: ${p.price.toLocaleString()} UZS</div>
        </div>
        <div class="pi-right">
          <div class="pi-stock ${isLow ? 'pi-low' : ''}" style="${isLow ? 'color:#ff453a;' : 'color:var(--text)'}">${isLow ? '⚠️ ' : ''}${p.stock} dona</div>
          <div class="pi-price">${p.price.toLocaleString()} UZS</div>
          ${isLow ? '<div class="low-indicator" style="background:rgba(255,69,58,0.15);color:#ff453a;">Kam qoldi!</div>' : ''}
        </div>
      </div>
    `;
  }).join('');
}

function showAddProductForm() {
  const form = `
    <div class="form-group">
      <label class="form-label">NFC Form-faktor Nomi</label>
      <input type="text" class="form-input" id="new-prod-name" placeholder="Masalan: NFC Metal Gold Card">
    </div>
    <div class="form-group">
      <label class="form-label">O'lchami va Materiali</label>
      <input type="text" class="form-input" id="new-prod-size" placeholder="Masalan: 85.5 × 54 mm, Zanglamas Po'lat">
    </div>
    <div class="form-grid-2">
      <div class="form-group">
        <label class="form-label">Tavsiya narx (UZS)</label>
        <input type="number" class="form-input" id="new-prod-price" placeholder="450000">
      </div>
      <div class="form-group">
        <label class="form-label">Xomashyo tannarxi</label>
        <input type="number" class="form-input" id="new-prod-cost" placeholder="120000">
      </div>
    </div>
    <button class="btn-primary" onclick="submitAddProduct()">💳 Yangi Form Faktorni Saqlash</button>
  `;
  openModal('Yangi NFC Form Faktor Qo\'shish', form);
}

function submitAddProduct() {
  const name = document.getElementById('new-prod-name').value;
  const size = document.getElementById('new-prod-size').value;
  const price = parseInt(document.getElementById('new-prod-price').value);
  const cost = parseInt(document.getElementById('new-prod-cost').value) || 40000;

  if (!name || !size || isNaN(price)) {
    showToast('Iltimos barcha maydonlarni to\'ldiring!');
    return;
  }

  State.products.push({
    id: 'prod-' + Date.now(),
    name,
    unit: 'dona',
    size,
    material: size,
    stock: 0,
    price,
    cost,
    icon: '💳',
    substrate: 'sub-black',
    sold: 0
  });
  State.save();
  showToast('Yangi NFC mahsulot qo\'shildi! ✨');
  closeModal();
  renderProductsDetailList();
}

function showAddStockForm(preselectedId) {
  const selectOpts = State.products.map(p => `<option value="${p.id}" ${p.id === preselectedId ? 'selected' : ''}>${p.icon} ${p.name} (Qoldiq: ${p.stock} dona)</option>`).join('');
  const preProd = State.products.find(p => p.id === preselectedId) || State.products[0];
  const form = `
    <div class="form-group">
      <label class="form-label">NFC Mahsulotni tanlang</label>
      <select class="form-select" id="stock-prod-id" onchange="updateStockCostHint()">${selectOpts}</select>
    </div>
    <div class="form-group">
      <label class="form-label">Kirim qilinayotgan miqdor (dona)</label>
      <input type="number" class="form-input" id="stock-qty-val" placeholder="Masalan: 50" min="1">
    </div>
    <div class="form-group">
      <label class="form-label">Xarid / Yetkazib kelish tannarxi (dona / UZS)</label>
      <input type="number" class="form-input" id="stock-cost-val" value="${preProd ? preProd.cost : 50000}">
      <span class="form-hint">Ushbu tannarx keyingi foyda hisob-kitobida inobatga olinadi</span>
    </div>
    <button class="btn-primary" onclick="submitStockKirim()">📥 Omborga Kirim Qilish</button>
  `;
  openModal('Omborga Blank Kartalar Kirim Qilish', form);
}

function updateStockCostHint() {
  const id = document.getElementById('stock-prod-id').value;
  const p = State.products.find(x => x.id === id);
  if (p) {
    document.getElementById('stock-cost-val').value = p.cost;
  }
}

function submitStockKirim() {
  const id = document.getElementById('stock-prod-id').value;
  const qty = parseInt(document.getElementById('stock-qty-val').value);
  const cost = parseInt(document.getElementById('stock-cost-val').value);

  if (isNaN(qty) || qty <= 0) {
    showToast('To\'g\'ri miqdor kiriting!');
    return;
  }

  if (State.addStock(id, qty, cost)) {
    showToast('Ombor muvaffaqiyatli to\'ldirildi! 📥');
    closeModal();
    renderProductsDetailList();
  }
}

// ── Detail: Clients
let clientSearchQuery = '';

function renderClientsDetailList() {
  const filtered = State.clients.filter(c => {
    return !clientSearchQuery || 
      c.name.toLowerCase().includes(clientSearchQuery.toLowerCase()) || 
      c.address.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
      c.phone.includes(clientSearchQuery);
  });

  document.getElementById('clients-detail-subtitle').textContent = `Jami: ${State.clients.length} ta mijoz`;

  const topC = filtered[0] || State.clients[0];
  const cardWrap = document.getElementById('clients-detail-card-wrap');
  if (topC && cardWrap) {
    cardWrap.innerHTML = `
      <div class="client-header-card" style="background:var(--surface); border:1px solid var(--gold-border); padding:14px; border-radius:var(--radius); margin-bottom:12px;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
          <div class="oi-avatar" style="background:var(--gold-bg); color:var(--gold); font-size:18px;">${topC.name[0]}</div>
          <div>
            <div style="font-weight:700; color:var(--text); font-size:15px;">${topC.name}</div>
            <div style="font-size:11px; color:var(--text2);">📞 ${topC.phone}</div>
            <div style="font-size:11px; color:var(--muted);">📍 ${topC.address}</div>
          </div>
        </div>
        <div class="fc-grid">
          <div class="fc-sub-item">
            <span class="fcs-label">Jami buyurtmalar:</span>
            <span class="fcs-val">${topC.totalSpend.toLocaleString()} UZS</span>
          </div>
          <div class="fc-sub-item">
            <span class="fcs-label">Qarz balansi:</span>
            <span class="fcs-val" style="color:${topC.debt > 0 ? '#ff9f0a' : 'var(--text)'}">${topC.debt.toLocaleString()} UZS</span>
          </div>
        </div>
      </div>
    `;
  }

  const listContainer = document.getElementById('clients-detail-list');
  if (listContainer) {
    listContainer.innerHTML = filtered.map(c => {
      const debtLabel = c.debt > 0 ? `<span class="status-pill status-debt">${c.debt.toLocaleString()} qarz</span>` : `<span class="status-pill status-done">Qarzsiz ✓</span>`;
      return `
        <div class="wide-card" style="margin-bottom:8px; cursor:pointer;" onclick="showClientHistory('${c.id}')">
          <div class="order-item" style="border:none; padding:0;">
            <div class="oi-avatar">${c.name[0]}</div>
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

function filterClientsList() {
  const input = document.getElementById('clients-search-input');
  if (input) {
    clientSearchQuery = input.value.trim();
    renderClientsDetailList();
  }
}

function showClientHistory(clientId) {
  const c = State.clients.find(x => x.id === clientId);
  if (!c) return;

  let listHistory = c.history.map(h => `
    <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding:8px 0; font-size:12px;">
      <div style="flex:1;">
        <div style="font-weight:600;color:var(--text);">${h.desc}</div>
        <div style="color:var(--muted); font-size:10px;">${h.date} • ${h.type}</div>
      </div>
      <div style="text-align:right; font-weight:700; color:var(--text);">${h.amount.toLocaleString()} UZS</div>
    </div>
  `).join('');

  if (c.history.length === 0) listHistory = `<div style="text-align:center;color:var(--muted);font-size:12px;padding:12px 0;">Tarix mavjud emas.</div>`;

  const content = `
    <div style="padding-top:4px;">
      <p style="font-size:12px; color:var(--muted); margin-bottom:12px;">📍 ${c.address}<br>📞 ${c.phone}</p>
      <div style="background:var(--surface2); padding:10px 14px; border-radius:10px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:12px; color:var(--text2)">Joriy Nasiya Qarz:</span>
        <span style="font-weight:700; color:${c.debt > 0 ? '#ff9f0a' : 'var(--text)'}; font-size:14px;">${c.debt.toLocaleString()} UZS</span>
      </div>
      <p class="sec-label" style="margin-top:0; margin-bottom:8px;">Xarid va to'lovlar tarixi</p>
      <div style="max-height:220px; overflow-y:auto; padding-right:4px;">
        ${listHistory}
      </div>
    </div>
  `;
  openModal(c.name, content);
}

function showAddClientForm() {
  const form = `
    <div class="form-group">
      <label class="form-label">Mijoz Ismi va Familiyasi</label>
      <input type="text" class="form-input" id="c-new-name" placeholder="Masalan: Jamshid Usmonov">
    </div>
    <div class="form-group">
      <label class="form-label">Telefon raqami</label>
      <input type="text" class="form-input" id="c-new-phone" placeholder="+998 90 123 45 67">
    </div>
    <div class="form-group">
      <label class="form-label">Kompaniya / Manzil</label>
      <input type="text" class="form-input" id="c-new-addr" placeholder="Masalan: Tashkent City, IT Agency">
    </div>
    <button class="btn-primary" onclick="submitAddClient()">👤 Mijozni Saqlash</button>
  `;
  openModal('Yangi Mijoz Qo\'shish', form);
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
  showToast('Yangi mijoz saqlandi! 👤');
  closeModal();
  renderClientsDetailList();
}

// ── Detail: Debts
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
    container.innerHTML = `<div style="text-align:center;padding:24px;color:var(--muted)">Ajoyib! Hozirda hech kimda qarz yo'q 🎉</div>`;
    return;
  }

  container.innerHTML = debtClients.map(c => `
    <div class="order-item" onclick="showClientHistory('${c.id}')" style="cursor:pointer;">
      <div class="oi-avatar" style="background:rgba(251,146,60,0.15); color:#fb923c;">⚠️</div>
      <div class="oi-body">
        <div class="oi-name">${c.name}</div>
        <div class="oi-detail">${c.address} • ${c.phone}</div>
      </div>
      <div class="oi-right">
        <div class="oi-sum" style="color:#fb923c;">${c.debt.toLocaleString()} UZS</div>
      </div>
    </div>
  `).join('');
}

function showCollectPaymentForm() {
  const debtClients = State.clients.filter(c => c.debt > 0);
  if (debtClients.length === 0) {
    showToast('Hozirda qarzi bor mijozlar mavjud emas!');
    return;
  }

  const options = debtClients.map(c => `<option value="${c.id}">${c.name} (Qarz: ${c.debt.toLocaleString()} UZS)</option>`).join('');
  const form = `
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
      <button class="btn-secondary" style="margin:0; font-size:11px; padding:8px; flex:1; background:var(--gold); color:#000; font-weight:700;" onclick="presetDebtFull()">To'liq yopish</button>
    </div>
    <button class="btn-primary" onclick="submitDebtPayment()">💳 To'lovni Tasdiqlash</button>
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
  if (c) presetDebt(c.debt);
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
    showToast(`To'lov qabul qilindi: ${paid.toLocaleString()} UZS 💳`);
    closeModal();
    renderDebtsDetailList();
  }
}

// ── Detail: Analytics & Financials
function renderAnalyticsDetail() {
  const fin = State.getFinancials();

  document.getElementById('analytics-detail-subtitle').textContent = `Sof Rentabellik: ${fin.marginPercent}%`;
  document.getElementById('analytics-stat-margin').textContent = `Marja: ${fin.marginPercent}%`;
  document.getElementById('analytics-stat-foyda').textContent = fin.netProfit.toLocaleString() + ' UZS';
  document.getElementById('analytics-stat-kirim').textContent = fin.totalRevenue.toLocaleString() + ' UZS';
  document.getElementById('analytics-stat-tannarx').textContent = fin.totalTannarx.toLocaleString() + ' UZS';
  document.getElementById('analytics-stat-xarajat').textContent = fin.totalDirectExpenses.toLocaleString() + ' UZS';
  document.getElementById('analytics-stat-all-costs').textContent = fin.totalAllCosts.toLocaleString() + ' UZS';

  // Render Top NFC Products
  const container = document.getElementById('analytics-top-products');
  if (container) {
    const sorted = [...State.products].sort((a,b) => (b.sold || 0) - (a.sold || 0));
    container.innerHTML = sorted.map((p, idx) => {
      const places = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--border); font-size:12px;">
          <span style="font-weight:600; color:var(--text);">${places[idx] || '•'} ${p.name} (${p.size})</span>
          <span style="font-weight:700; color:var(--gold);">${p.sold || 0} dona sotildi</span>
        </div>
      `;
    }).join('');
  }

  setTimeout(() => drawChart('week', 'chart-bars-detail', 'chart-labels-detail'), 50);
}

// ══════════════════════════════════════════
// CHART GRAPHIC PLOTTER
// ══════════════════════════════════════════
const staticChartData = {
  week: {
    vals: [180, 290, 240, 380, 310, 160, 420],
    labels: ['Du','Se','Ch','Pa','Ju','Sh','Ya']
  },
  month: {
    vals: [140, 190, 280, 220, 340, 260, 390, 310, 450, 380, 410, 320],
    labels: ['1','3','6','9','12','15','18','21','24','26','28','30']
  }
};

function drawChart(type, barsContainerId, labelsContainerId) {
  const data = staticChartData[type] || staticChartData.week;
  const barsContainer = document.getElementById(barsContainerId);
  const labelsContainer = document.getElementById(labelsContainerId);

  if (!barsContainer) return;

  let orderSumWeight = 0;
  State.orders.forEach(o => { if (o.status !== 'Qaytarildi') orderSumWeight += o.total; });
  const bonusMultiplier = Math.min(2.5, 1 + (orderSumWeight / 3000000));

  const scaledVals = data.vals.map(v => v * bonusMultiplier);
  const max = Math.max(...scaledVals);

  barsContainer.innerHTML = scaledVals.map((v, i) => {
    const isToday = i === data.vals.length - 1;
    const heightPercent = Math.max(8, (v / max * 100));
    return `
      <div class="bar ${isToday ? 'today' : ''}" 
           style="height:${heightPercent}%;"
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
// NEW ORDER FORM WITH DYNAMIC PRICING & PERSONALIZATION
// ══════════════════════════════════════════
const fabBtn = document.getElementById('fab-btn');
if (fabBtn) {
  fabBtn.addEventListener('click', () => {
    if (currentTab === 'orders') showAddOrderForm();
    else if (currentTab === 'expenses') showAddExpenseForm();
    else if (currentTab === 'products') showAddStockForm();
    else if (currentTab === 'clients') showAddClientForm();
  });
}

function showAddOrderForm() {
  const clientOpts = State.clients.map(c => `<option value="${c.id}">${c.name} (${c.phone})</option>`).join('');
  const prodOpts = State.products.map(p => `<option value="${p.id}" data-price="${p.price}">${p.icon} ${p.name} — ${p.size}</option>`).join('');
  const defaultProd = State.products[0];

  const form = `
    <div class="form-group">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <label class="form-label" style="margin:0;">Mijozni tanlang</label>
        <button onclick="closeModal(); showAddClientForm();" class="icon-text-btn" style="color:var(--gold);">+ Yangi mijoz</button>
      </div>
      <select class="form-select" id="order-client-id">${clientOpts}</select>
    </div>

    <div class="form-group">
      <label class="form-label">NFC Mahsulot Form-faktori</label>
      <select class="form-select" id="order-prod-id" onchange="onOrderProductChanged()">${prodOpts}</select>
    </div>

    <!-- Dynamic Pricing Controls -->
    <div class="form-grid-2">
      <div class="form-group">
        <label class="form-label">Kelishilgan Narxi (UZS / dona)</label>
        <input type="number" class="form-input" id="order-unit-price" value="${defaultProd.price}" oninput="calculateDynamicOrderTotal()">
        <span class="form-hint">Erkin kelishilgan narx</span>
      </div>
      <div class="form-group">
        <label class="form-label">Miqdori (dona)</label>
        <input type="number" class="form-input" id="order-qty" value="1" min="1" oninput="calculateDynamicOrderTotal()">
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Dizayn / Maxsus Bosma xizmat haqi (UZS)</label>
      <input type="number" class="form-input" id="order-service-fee" value="0" placeholder="0" oninput="calculateDynamicOrderTotal()">
    </div>

    <!-- Personalization Specs for Smart NFC Card -->
    <p class="sec-label" style="margin-top:14px; margin-bottom:8px;">Karta Shaxsiylashtirish (Ixtiyoriy)</p>
    <div class="form-grid-2">
      <div class="form-group">
        <label class="form-label">Kartadagi Ism</label>
        <input type="text" class="form-input" id="order-spec-name" placeholder="Masalan: Aziz Azizov">
      </div>
      <div class="form-group">
        <label class="form-label">Mutaxassislik / Kasb</label>
        <input type="text" class="form-input" id="order-spec-role" placeholder="Masalan: Founder & CEO">
      </div>
    </div>
    <div class="form-grid-2">
      <div class="form-group">
        <label class="form-label">Dizayn Naqshi #</label>
        <input type="text" class="form-input" id="order-spec-design" placeholder="#1..#43 (Masalan: #12)">
      </div>
      <div class="form-group">
        <label class="form-label">Instagram Username</label>
        <input type="text" class="form-input" id="order-spec-insta" placeholder="@username">
      </div>
    </div>

    <div class="form-grid-2">
      <div class="form-group">
        <label class="form-label">To'lov usuli</label>
        <select class="form-select" id="order-payment">
          <option value="Karta">Karta (Uzcard / Humo)</option>
          <option value="Naqd">Naqd to'lov</option>
          <option value="Nasiya">Nasiya (Qarzga yozish)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Yetkazish muddati</label>
        <select class="form-select" id="order-date">
          <option value="Bugun">Bugun</option>
          <option value="Ertaga">Ertaga</option>
          <option value="2-3 kun">2-3 kun ichida</option>
        </select>
      </div>
    </div>

    <!-- Dynamic Total Live Calculation Box -->
    <div class="dynamic-price-box">
      <div class="dp-row">
        <span>Kartalar summasi:</span>
        <span id="dp-cards-sum">0 UZS</span>
      </div>
      <div class="dp-row">
        <span>Qo'shimcha xizmat:</span>
        <span id="dp-fee-sum">0 UZS</span>
      </div>
      <div class="dp-row" style="margin-top:8px; padding-top:8px; border-top:1px dashed var(--border);">
        <span style="font-weight:700; color:var(--text);">Jami Buyurtma Summasi:</span>
        <span class="dp-total-val" id="order-total-preview">0 UZS</span>
      </div>
    </div>

    <button class="btn-primary" onclick="submitNewOrder()">📋 Buyurtmani Rasmiylashtirish</button>
  `;
  openModal('Yangi NFC Smart Buyurtma', form);
  calculateDynamicOrderTotal();
}

function onOrderProductChanged() {
  const prodId = document.getElementById('order-prod-id').value;
  const p = State.products.find(x => x.id === prodId);
  if (p) {
    document.getElementById('order-unit-price').value = p.price;
  }
  calculateDynamicOrderTotal();
}

function calculateDynamicOrderTotal() {
  const unitPrice = parseInt(document.getElementById('order-unit-price')?.value) || 0;
  const qty = parseInt(document.getElementById('order-qty')?.value) || 1;
  const fee = parseInt(document.getElementById('order-service-fee')?.value) || 0;

  const cardsSum = unitPrice * qty;
  const total = cardsSum + fee;

  const cardsEl = document.getElementById('dp-cards-sum');
  const feeEl = document.getElementById('dp-fee-sum');
  const preview = document.getElementById('order-total-preview');

  if (cardsEl) cardsEl.textContent = cardsSum.toLocaleString() + ' UZS';
  if (feeEl) feeEl.textContent = fee.toLocaleString() + ' UZS';
  if (preview) preview.textContent = total.toLocaleString() + ' UZS';
}

function submitNewOrder() {
  const clientId = document.getElementById('order-client-id').value;
  const prodId = document.getElementById('order-prod-id').value;
  const unitPrice = parseInt(document.getElementById('order-unit-price').value);
  const qty = parseInt(document.getElementById('order-qty').value);
  const fee = parseInt(document.getElementById('order-service-fee').value) || 0;
  const payment = document.getElementById('order-payment').value;
  const date = document.getElementById('order-date').value;

  const specName = document.getElementById('order-spec-name').value;
  const specRole = document.getElementById('order-spec-role').value;
  const specDesign = document.getElementById('order-spec-design').value;
  const specInsta = document.getElementById('order-spec-insta').value;

  const client = State.clients.find(c => c.id === clientId);
  const product = State.products.find(p => p.id === prodId);

  if (!client || !product || isNaN(qty) || qty <= 0 || isNaN(unitPrice) || unitPrice < 0) {
    showToast('Iltimos barcha kerakli maydonlarni to\'g\'ri to\'ldiring!');
    return;
  }

  if (product.stock < qty) {
    showToast(`Omborda yetarli blank karta yo'q! Qoldiq: ${product.stock} dona`);
    return;
  }

  const orderNum = Math.floor(1000 + Math.random() * 9000);
  const orderId = `NP-${orderNum}`;
  const total = (unitPrice * qty) + fee;

  const newOrder = {
    id: orderId,
    clientId: client.id,
    clientName: client.name,
    clientPhone: client.phone,
    clientAddress: client.address,
    items: [
      {
        productId: product.id,
        name: product.name,
        qty: qty,
        unitPrice: unitPrice,
        designFee: fee,
        cost: product.cost,
        specs: {
          name: specName || client.name,
          role: specRole || '',
          designNo: specDesign || '#01',
          insta: specInsta || ''
        }
      }
    ],
    total: total,
    date: date,
    status: 'Tayyorlanmoqda',
    payment: payment
  };

  State.addOrder(newOrder);
  showToast(`Buyurtma #${orderId} muvaffaqiyatli saqlandi! ⚡`);
  closeModal();
  showOrderActions(orderId);
}

// ══════════════════════════════════════════
// ORDER ACTIONS & TELEGRAM DISPATCH
// ══════════════════════════════════════════
function showOrderActions(orderId) {
  const ord = State.orders.find(o => o.id === orderId);
  if (!ord) return;

  const item = ord.items[0] || {};
  const specs = item.specs || {};

  let content = `
    <div style="padding:4px 0;">
      <div style="background:var(--surface2); padding:12px; border-radius:10px; margin-bottom:14px; border:1px solid var(--border);">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <span style="color:var(--gold); font-weight:700;">#${ord.id}</span>
          <span style="color:var(--text); font-weight:700;">${ord.total.toLocaleString()} UZS</span>
        </div>
        <div style="font-size:12px; color:var(--text2);">
          👤 Mijoz: <b>${ord.clientName}</b> (${ord.clientPhone || ''})<br>
          📍 Manzil: ${ord.clientAddress || 'Toshkent'}<br>
          💳 Karta: <b>${item.qty || 1}x ${item.name || 'NFC Card'}</b> (Dona: ${(item.unitPrice||0).toLocaleString()} UZS)<br>
          ${item.designFee ? `🎨 Dizayn xizmati: ${item.designFee.toLocaleString()} UZS<br>` : ''}
          💳 To'lov: <b>${ord.payment}</b> • Holat: <b>${ord.status}</b>
        </div>
        ${specs.name ? `
          <div style="margin-top:8px; padding-top:8px; border-top:1px solid var(--border); font-size:11px; color:var(--gold);">
            🪪 <b>Karta parametrlari:</b> ${specs.name} | ${specs.role || ''} | Naqsh: ${specs.designNo || ''} | ${specs.insta || ''}
          </div>
        ` : ''}
      </div>

      <button class="btn-primary btn-telegram" style="margin-bottom:10px;" onclick="forwardOrderToTelegram('${ord.id}')">
        ✈️ Telegramga Jo'natish (@nfcprime_admin)
      </button>
  `;

  if (ord.status !== 'Yetkazildi' && ord.status !== 'Qaytarildi') {
    content += `
      <div class="quick-action-row" style="margin-bottom:10px;">
        <button class="btn-secondary" style="margin:0; background:rgba(52,211,153,0.15); color:#34d399; border-color:rgba(52,211,153,0.3);" onclick="updateOrderStatus('${ord.id}', 'Yetkazildi')">✓ Yetkazildi</button>
        <button class="btn-secondary" style="margin:0; background:rgba(56,189,248,0.15); color:#38bdf8; border-color:rgba(56,189,248,0.3);" onclick="updateOrderStatus('${ord.id}', 'Tayyorlanmoqda')">⚡ Tayyorlanmoqda</button>
      </div>
    `;
  }

  if (ord.status !== 'Qaytarildi') {
    content += `
      <button class="btn-secondary" style="color:#ff453a; border-color:rgba(255,69,58,0.2);" onclick="cancelAndReturnOrder('${ord.id}')">↩️ Buyurtmani bekor qilish & Omborni qaytarish</button>
    `;
  } else {
    content += `<p style="text-align:center;color:var(--muted);font-size:12px;margin:8px 0;">Ushbu buyurtma bekor qilingan.</p>`;
  }

  content += `
      <button class="btn-secondary" style="margin-top:8px; color:var(--muted);" onclick="deleteOrderPermanently('${ord.id}')">🗑️ Butunlay o'chirish</button>
    </div>
  `;
  openModal(`Buyurtma #${ord.id}`, content);
}

function forwardOrderToTelegram(orderId) {
  const ord = State.orders.find(o => o.id === orderId);
  if (!ord) return;

  const item = ord.items[0] || {};
  const specs = item.specs || {};

  const message = `⚡ YANGI NFC PRIME BUYURTMA: #${ord.id}\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `💳 Model: ${item.name || 'NFC Smart Card'}\n` +
    `📦 Miqdor: ${item.qty || 1} dona\n` +
    `💰 Kelishilgan narx: ${(item.unitPrice||0).toLocaleString()} UZS / dona\n` +
    (item.designFee ? `🎨 Dizayn xizmati: ${item.designFee.toLocaleString()} UZS\n` : '') +
    `💵 Jami summa: ${ord.total.toLocaleString()} UZS\n` +
    `💳 To'lov: ${ord.payment}\n\n` +
    `👤 Mijoz: ${ord.clientName}\n` +
    `📞 Tel: ${ord.clientPhone || '-'}\n` +
    `📍 Manzil: ${ord.clientAddress || '-'}\n\n` +
    `🪪 KARTAGA YOZILADIGAN MA'LUMOTLAR:\n` +
    `• Ism: ${specs.name || ord.clientName}\n` +
    `• Lavozim: ${specs.role || '-'}\n` +
    `• Dizayn: ${specs.designNo || '#01'}\n` +
    `• Instagram: ${specs.insta || '-'}\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `🚀 NFC PRIME (nfcprime.uz)`;

  // Copy to clipboard
  if (navigator.clipboard) {
    navigator.clipboard.writeText(message);
    showToast('Buyurtma nusxalandi va Telegram ochilmoqda! ✈️');
  }

  // Open telegram
  const encoded = encodeURIComponent(message);
  setTimeout(() => {
    window.open(`https://t.me/share/url?url=${encoded}`, '_blank');
  }, 400);
}

function updateOrderStatus(orderId, newStatus) {
  const ord = State.orders.find(o => o.id === orderId);
  if (ord) {
    ord.status = newStatus;
    State.save();
    showToast(`Buyurtma holati "${newStatus}" ga yangilandi!`);
    closeModal();
    if (document.getElementById('detail-orders')?.classList.contains('active')) renderOrdersDetailList();
    renderTab(currentTab);
  }
}

function cancelAndReturnOrder(orderId) {
  if (confirm("Buyurtmani bekor qilib, NFC kartalarni omborga qaytarmoqchimisiz?")) {
    if (State.returnOrder(orderId)) {
      showToast("Buyurtma bekor qilindi, kartalar omborga qaytarildi ↩️");
      closeModal();
      if (document.getElementById('detail-orders')?.classList.contains('active')) renderOrdersDetailList();
    }
  }
}

function deleteOrderPermanently(orderId) {
  if (confirm("Rostdan ham ushbu buyurtmani butunlay o'chirmoqchimisiz?")) {
    State.orders = State.orders.filter(o => o.id !== orderId);
    State.save();
    showToast("Buyurtma o'chirildi!");
    closeModal();
    if (document.getElementById('detail-orders')?.classList.contains('active')) renderOrdersDetailList();
    renderTab(currentTab);
  }
}

// ══════════════════════════════════════════
// BATCH DELETE MODALS
// ══════════════════════════════════════════
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
          <div style="font-weight:600">#${o.id} • ${o.clientName}</div>
          <div style="font-size:12px; color:var(--text2)">${o.date} • ${o.total.toLocaleString()} UZS</div>
        </div>
      </label>
    `).join('');
    deleteFn = 'deleteSelectedOrders()';
  } else if (type === 'expenses') {
    title = "Xarajatlarni o'chirish";
    listHtml = State.expenses.map(e => `
      <label style="display:flex; align-items:center; padding:12px; border-bottom:1px solid var(--border); cursor:pointer;">
        <input type="checkbox" class="delete-checkbox" value="${e.id}" style="margin-right:12px; width:20px; height:20px;">
        <div style="flex:1">
          <div style="font-weight:600">${e.category}</div>
          <div style="font-size:12px; color:var(--text2)">${e.desc} • ${e.amount.toLocaleString()} UZS</div>
        </div>
      </label>
    `).join('');
    deleteFn = 'deleteSelectedExpenses()';
  } else if (type === 'clients') {
    title = "Mijozlarni o'chirish";
    listHtml = State.clients.map(c => `
      <label style="display:flex; align-items:center; padding:12px; border-bottom:1px solid var(--border); cursor:pointer;">
        <input type="checkbox" class="delete-checkbox" value="${c.id}" style="margin-right:12px; width:20px; height:20px;">
        <div style="flex:1">
          <div style="font-weight:600">${c.name}</div>
          <div style="font-size:12px; color:var(--text2)">${c.phone} • ${c.address}</div>
        </div>
      </label>
    `).join('');
    deleteFn = 'deleteSelectedClients()';
  }

  if (!listHtml) {
    openModal(title, "<div style=\"padding:20px; text-align:center; color:var(--muted)\">O'chirish uchun ma'lumot yo'q.</div>");
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
  if (confirm(`${selected.length} ta buyurtmani o'chirmoqchimisiz?`)) {
    State.orders = State.orders.filter(o => !selected.includes(o.id));
    State.save();
    showToast(`${selected.length} ta buyurtma o'chirildi!`);
    closeModal();
    if (document.getElementById('detail-orders')?.classList.contains('active')) renderOrdersDetailList();
    renderTab(currentTab);
  }
}

function deleteSelectedExpenses() {
  const selected = Array.from(document.querySelectorAll('.delete-checkbox:checked')).map(cb => cb.value);
  if (selected.length === 0) return showToast('Hech narsa tanlanmadi!');
  if (confirm(`${selected.length} ta xarajatni o'chirmoqchimisiz?`)) {
    State.expenses = State.expenses.filter(e => !selected.includes(e.id));
    State.save();
    showToast(`${selected.length} ta xarajat o'chirildi!`);
    closeModal();
    if (document.getElementById('detail-expenses')?.classList.contains('active')) renderExpensesDetailList();
    renderTab(currentTab);
  }
}

function deleteSelectedClients() {
  const selected = Array.from(document.querySelectorAll('.delete-checkbox:checked')).map(cb => cb.value);
  if (selected.length === 0) return showToast('Hech narsa tanlanmadi!');
  if (confirm(`${selected.length} ta mijozni o'chirmoqchimisiz?`)) {
    State.clients = State.clients.filter(c => !selected.includes(c.id));
    State.save();
    showToast(`${selected.length} ta mijoz o'chirildi!`);
    closeModal();
    if (document.getElementById('detail-clients')?.classList.contains('active')) renderClientsDetailList();
    renderTab(currentTab);
  }
}
