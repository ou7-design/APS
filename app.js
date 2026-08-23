// ══════════════════════════════════════════
// SERVICE WORKER
// ══════════════════════════════════════════
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// ══════════════════════════════════════════
// THEME MANAGEMENT (Dark Minimalist Default)
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
}

function updateThemeToggleIcon() {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
  }
}

// ══════════════════════════════════════════
// DEFAULT PRESETS (5 NFC PRODUCTS)
// ══════════════════════════════════════════
const DEFAULT_PRODUCTS = [
  { 
    id: 'prod-1', 
    name: 'NFC Classic Black', 
    unit: 'dona', 
    size: '85.5 × 54 mm',
    stock: 78, 
    price: 250000, 
    cost: 55000, 
    sold: 142 
  },
  { 
    id: 'prod-2', 
    name: 'NFC Classic White', 
    unit: 'dona', 
    size: '85.5 × 54 mm',
    stock: 54, 
    price: 250000, 
    cost: 55000, 
    sold: 98 
  },
  { 
    id: 'prod-3', 
    name: 'NFC Mini White', 
    unit: 'dona', 
    size: '22 × 30 mm',
    stock: 110, 
    price: 150000, 
    cost: 35000, 
    sold: 160 
  },
  { 
    id: 'prod-4', 
    name: 'NFC Round Black', 
    unit: 'dona', 
    size: 'Ø 25 mm',
    stock: 135, 
    price: 150000, 
    cost: 30000, 
    sold: 185 
  },
  { 
    id: 'prod-5', 
    name: 'NFC Round White', 
    unit: 'dona', 
    size: 'Ø 25 mm',
    stock: 92, 
    price: 150000, 
    cost: 30000, 
    sold: 115 
  }
];

const DEFAULT_CLIENTS = [
  { 
    id: 'c1', 
    name: 'Akmal Rahimov', 
    phone: '+998 90 123 45 67', 
    address: 'IT Park, Toshkent', 
    totalSpend: 2500000, 
    debt: 250000, 
    history: [
      { date: 'Bugun', type: 'Karta', desc: 'NFC Classic Black (2 dona)', amount: 550000 },
      { date: '12-Avg', type: 'Nasiya', desc: 'Shaxsiy NFC Karta', amount: 250000 }
    ]
  },
  { 
    id: 'c2', 
    name: 'Hilola Karimova', 
    phone: '+998 93 456 78 90', 
    address: 'Artel Media, Toshkent', 
    totalSpend: 1850000, 
    debt: 0, 
    history: [
      { date: 'Kecha', type: 'Naqd', desc: 'NFC Classic White', amount: 240000 }
    ]
  },
  { 
    id: 'c3', 
    name: 'Bobur Mirzayev', 
    phone: '+998 94 987 65 43', 
    address: 'Rayhon Lounge, Toshkent', 
    totalSpend: 3200000, 
    debt: 450000, 
    history: [
      { date: 'Bugun', type: 'Nasiya', desc: '5 ta Round Black Coin', amount: 700000 }
    ]
  },
  { 
    id: 'c4', 
    name: 'Sardor Aliyev', 
    phone: '+998 97 111 22 33', 
    address: 'Freelance Studio, Toshkent', 
    totalSpend: 400000, 
    debt: 0, 
    history: [
      { date: 'Bugun', type: 'Karta', desc: 'NFC Classic Black', amount: 280000 }
    ]
  }
];

const DEFAULT_ORDERS = [
  { 
    id: 'NP-1048', 
    clientId: 'c1', 
    clientName: 'Akmal Rahimov', 
    clientPhone: '+998 90 123 45 67',
    clientAddress: 'IT Park, Toshkent',
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
          role: 'CEO', 
          designNo: '#12', 
          insta: '@akmal_tech'
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
    clientAddress: 'Artel Media, Toshkent',
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
          insta: '@hilola_art'
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
    clientAddress: 'Rayhon Lounge, Toshkent',
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
          role: 'Menu Tag', 
          designNo: '#01', 
          insta: '@rayhon'
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
  { id: 'exp-1', category: 'Pechat & Bosma', amount: 320000, desc: 'UV Bo\'yoq to\'plami', date: '21-Avg' },
  { id: 'exp-2', category: 'Yetkazib berish', amount: 145000, desc: 'Yandex yetkazish', date: 'Bugun' },
  { id: 'exp-3', category: 'Marketing', amount: 450000, desc: 'Target reklama', date: '20-Avg' },
  { id: 'exp-4', category: 'Qadoqlash', amount: 180000, desc: 'Sovg\'abop qutilar', date: '19-Avg' }
];

// ══════════════════════════════════════════
// STATE
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

    order.items.forEach(item => {
      const prod = this.products.find(p => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.qty);
        prod.sold = (prod.sold || 0) + item.qty;
      }
    });

    const client = this.clients.find(c => c.id === order.clientId);
    if (client) {
      client.totalSpend += order.total;
      const desc = `${order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}`;
      if (order.payment === 'Nasiya') {
        client.debt += order.total;
        client.history.unshift({ date: 'Bugun', type: 'Nasiya', desc: `Qarz: ${desc}`, amount: order.total });
      } else {
        client.history.unshift({ date: 'Bugun', type: order.payment, desc: desc, amount: order.total });
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
        desc: 'Qarz to\'landi',
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
      
      order.items.forEach(item => {
        const prod = this.products.find(p => p.id === item.productId);
        if (prod) {
          prod.stock += item.qty;
          prod.sold = Math.max(0, (prod.sold || 0) - item.qty);
        }
      });

      const client = this.clients.find(c => c.id === order.clientId);
      if (client) {
        client.totalSpend = Math.max(0, client.totalSpend - order.total);
        if (order.payment === 'Nasiya') {
          client.debt = Math.max(0, client.debt - order.total);
        }
        client.history.unshift({
          date: 'Bugun',
          type: 'Qaytarish',
          desc: `#${order.id} bekor qilindi`,
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
      if (newCost && newCost > 0) prod.cost = newCost;
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
      history: []
    };
    this.clients.unshift(newClient);
    this.save();
    renderTab(currentTab);
    return newClient;
  },

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
  t._timer = setTimeout(() => t.classList.remove('show'), 2000);
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
  const activeOrders = State.orders.filter(o => o.status === 'Kutilmoqda' || o.status === 'Tayyorlanmoqda').length;
  if (badge) {
    badge.textContent = activeOrders;
    badge.style.display = activeOrders > 0 ? 'inline-block' : 'none';
  }
}

// ══════════════════════════════════════════
// PIN (7777)
// ══════════════════════════════════════════
let pin = '';
const CORRECT_PIN = '7777';
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
        setTimeout(openApp, 200);
      } else {
        pinLocked = true;
        highlightAllDots(false);
        setTimeout(() => {
          clearDots();
          pinLocked = false;
        }, 400);
      }
    }
  });
}

function updateDots() {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById('d' + i);
    if (dot) dot.classList.toggle('filled', i <= pin.length);
  }
}
function highlightAllDots(success) {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById('d' + i);
    if (dot && !success) {
      dot.classList.add('error');
    }
  }
}
function clearDots() {
  pin = '';
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById('d' + i);
    if (dot) {
      dot.classList.remove('filled');
      dot.classList.remove('error');
    }
  }
}

// ══════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════
function openApp() {
  document.getElementById('pin-screen').classList.remove('active');
  document.getElementById('app-screen').classList.add('active');
  initTheme();
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

  body.innerHTML = getTabContent(tab);
  body.scrollTop = 0;

  const fab = document.getElementById('fab-btn');
  if (fab) {
    fab.style.display = ['orders', 'expenses', 'products', 'clients'].includes(tab) ? 'flex' : 'none';
  }

  if (tab === 'analytics') {
    setTimeout(() => drawChart('week', 'chart-bars-tab', 'chart-labels-tab'), 40);
  }
  updateBadges();
}

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => renderTab(btn.dataset.tab));
});

// ══════════════════════════════════════════
// TAB CONTENT RENDERERS (OBSIDIAN & GOLD)
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
  let jamiQarzSum = 0;
  State.clients.forEach(c => { if (c.debt > 0) jamiQarzSum += c.debt; });

  const recentOrders = State.orders.slice(0, 5).map(o => renderOrderSingleItem(o)).join('') || `<div style="color:var(--color-muted);font-size:12px;text-align:center;padding:20px 0;">Buyurtmalar yo'q</div>`;

  return `
    <div class="summary-banner" onclick="openDetail('analytics')" style="cursor:pointer;">
      <div class="sb-row">
        <div>
          <div class="sb-label">Sof Foyda</div>
          <div class="sb-val">${fin.netProfit.toLocaleString()} UZS</div>
        </div>
      </div>
      <div class="sb-sub-stats">
        <div class="sb-stat-chip">Kirim: <b>${(fin.totalRevenue/1000000).toFixed(2)}M</b></div>
        <div class="sb-stat-chip">Xarajat: <b>${(fin.totalAllCosts/1000000).toFixed(2)}M</b></div>
        <div class="sb-stat-chip">Marja: <b>${fin.marginPercent}%</b></div>
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-card" onclick="openDetail('orders')">
        <div class="sc-val">${State.orders.length} ta</div>
        <div class="sc-label">Buyurtmalar</div>
      </div>
      <div class="stat-card" onclick="openDetail('expenses')">
        <div class="sc-val">${(fin.totalDirectExpenses/1000).toLocaleString()}k</div>
        <div class="sc-label">Chiqimlar</div>
      </div>
      <div class="stat-card" onclick="openDetail('products')">
        <div class="sc-val">${State.products.reduce((acc, p) => acc + p.stock, 0)} dona</div>
        <div class="sc-label">Ombor qoldig'i</div>
      </div>
      <div class="stat-card" onclick="openDetail('debts')">
        <div class="sc-val">${(jamiQarzSum/1000).toLocaleString()}k</div>
        <div class="sc-label">Qarzlar (Nasiya)</div>
      </div>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px; margin-bottom:2px;">
      <p class="sec-label" style="margin:0;">Oxirgi buyurtmalar</p>
      <button onclick="openDetail('orders')" class="icon-text-btn">Barchasi →</button>
    </div>
    <div class="wide-card">
      ${recentOrders}
    </div>
  `;
}

// ── 2. Orders Tab
let currentOrderFilter = 'all';
let orderSearchQuery = '';

function ordersTabContent() {
  const filtered = State.orders.filter(o => {
    const matchesFilter = currentOrderFilter === 'all' || o.status === currentOrderFilter;
    const matchesSearch = !orderSearchQuery || 
      o.clientName.toLowerCase().includes(orderSearchQuery.toLowerCase()) || 
      o.id.toLowerCase().includes(orderSearchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const listHtml = filtered.map(ord => renderOrderSingleItem(ord)).join('') || `<div style="text-align:center;padding:24px;color:var(--color-muted);font-size:12.5px;">Buyurtmalar topilmadi</div>`;

  return `
    <div class="section-header">
      <h2 class="section-title">Buyurtmalar</h2>
      <button class="btn-gold" onclick="showAddOrderForm()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/><path d="M12 5v14"/>
        </svg>
        Yangi
      </button>
    </div>

    <div class="search-box-wrap">
      <input type="text" class="search-input" placeholder="Buyurtma yoki mijozni qidirish..." value="${orderSearchQuery}" oninput="onTabOrderSearch(this.value)">
    </div>

    <div class="filter-chips">
      <button class="chip ${currentOrderFilter === 'all' ? 'active' : ''}" onclick="onTabOrderFilter('all')">Barchasi</button>
      <button class="chip ${currentOrderFilter === 'Kutilmoqda' ? 'active' : ''}" onclick="onTabOrderFilter('Kutilmoqda')">Kutilmoqda</button>
      <button class="chip ${currentOrderFilter === 'Tayyorlanmoqda' ? 'active' : ''}" onclick="onTabOrderFilter('Tayyorlanmoqda')">Ishlanmoqda</button>
      <button class="chip ${currentOrderFilter === 'Yetkazildi' ? 'active' : ''}" onclick="onTabOrderFilter('Yetkazildi')">Yetkazildi</button>
      <button class="chip ${currentOrderFilter === 'Qaytarildi' ? 'active' : ''}" onclick="onTabOrderFilter('Qaytarildi')">Bekor</button>
    </div>

    <div class="wide-card">
      ${listHtml}
    </div>
  `;
}

function onTabOrderSearch(val) {
  orderSearchQuery = val.trim();
  const body = document.getElementById('app-body');
  if (currentTab === 'orders' && body) {
    body.innerHTML = getTabContent('orders');
    const input = body.querySelector('.search-input');
    if (input) {
      input.focus();
      input.setSelectionRange(val.length, val.length);
    }
  }
}

function onTabOrderFilter(filter) {
  currentOrderFilter = filter;
  renderTab('orders');
}

function renderOrderSingleItem(ord) {
  const item = ord.items[0] || {};
  const isDone = ord.status === 'Yetkazildi';
  const isCanceled = ord.status === 'Qaytarildi';

  return `
    <div class="order-item" onclick="showOrderActions('${ord.id}')" style="cursor:pointer;">
      <div class="oi-body">
        <div class="oi-name">#${ord.id} • ${ord.clientName}</div>
        <div class="oi-detail">${item.qty || 1}x ${item.name || 'NFC Karta'} • ${ord.date}</div>
      </div>
      <div class="oi-right">
        <div class="oi-sum">${ord.total.toLocaleString()} UZS</div>
        <span class="status-pill ${isDone ? 'status-done' : (isCanceled ? 'status-debt' : '')}">${ord.status}</span>
      </div>
    </div>
  `;
}

// ── 3. Expenses Tab
function expensesTabContent() {
  const fin = State.getFinancials();
  const listHtml = State.expenses.map(e => `
    <div class="order-item">
      <div class="oi-body">
        <div class="oi-name">${e.category}</div>
        <div class="oi-detail">${e.desc} • ${e.date}</div>
      </div>
      <div class="oi-right">
        <div class="oi-sum" style="color:var(--color-gold);">−${e.amount.toLocaleString()} UZS</div>
      </div>
    </div>
  `).join('') || `<div style="text-align:center;padding:24px;color:var(--color-muted);font-size:12.5px;">Chiqimlar kiritilmagan</div>`;

  return `
    <div class="section-header">
      <h2 class="section-title">Xarajatlar</h2>
      <button class="btn-gold" onclick="showAddExpenseForm()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/><path d="M12 5v14"/>
        </svg>
        Chiqim
      </button>
    </div>

    <div class="summary-banner" onclick="openDetail('expenses')" style="cursor:pointer;">
      <div class="sb-label">Jami Chiqimlar</div>
      <div class="sb-val">${fin.totalDirectExpenses.toLocaleString()} UZS</div>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
      <p class="sec-label" style="margin:0;">Chiqimlar ro'yxati</p>
      <button onclick="openDetail('expenses')" class="icon-text-btn">Batafsil →</button>
    </div>
    <div class="wide-card">
      ${listHtml}
    </div>
  `;
}

// ── 4. Products Tab (Katalog & Ombor)
function productsTabContent() {
  const prodHtml = State.products.map(p => `
    <div class="product-card" onclick="showAddStockForm('${p.id}')">
      <div class="pc-top">
        <div class="pc-name">${p.name}</div>
        <span class="pc-stock-badge ${p.stock <= 15 ? 'low' : ''}">${p.stock} ${p.unit || 'dona'}</span>
      </div>
      <div class="pc-mid">
        <span class="pc-size-pill">${p.size || 'NFC Smart'}</span>
        <span class="pc-price">${p.price.toLocaleString()} UZS</span>
      </div>
      <div class="pc-bottom">
        <span>Tannarx: ${p.cost.toLocaleString()} UZS • Sotildi: ${p.sold || 0}</span>
        <span class="pc-action-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14"/><path d="M12 5v14"/>
          </svg>
          Kirim
        </span>
      </div>
    </div>
  `).join('');

  return `
    <div class="section-header">
      <h2 class="section-title">Katalog</h2>
      <button class="btn-gold" onclick="showAddStockForm()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/><path d="M12 5v14"/>
        </svg>
        Mahsulot
      </button>
    </div>

    <div class="product-card-grid">
      ${prodHtml}
    </div>
  `;
}

// ── 5. Clients Tab
let tabClientSearchQuery = '';

function clientsTabContent() {
  const filtered = State.clients.filter(c => {
    return !tabClientSearchQuery || 
      c.name.toLowerCase().includes(tabClientSearchQuery.toLowerCase()) || 
      c.phone.includes(tabClientSearchQuery);
  });

  const clientsHtml = filtered.map(c => `
    <div class="order-item" onclick="showClientHistory('${c.id}')" style="cursor:pointer;">
      <div class="oi-body">
        <div class="oi-name">${c.name}</div>
        <div class="oi-detail">${c.phone} • ${c.address}</div>
      </div>
      <div class="oi-right">
        ${c.debt > 0 ? `<span class="status-pill status-debt">${c.debt.toLocaleString()} UZS qarz</span>` : `<span class="status-pill status-done">Qarzsiz</span>`}
      </div>
    </div>
  `).join('') || `<div style="text-align:center;padding:24px;color:var(--color-muted);font-size:12.5px;">Mijozlar topilmadi</div>`;

  return `
    <div class="section-header">
      <h2 class="section-title">Mijozlar</h2>
      <button class="btn-gold" onclick="showAddClientForm()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/><path d="M12 5v14"/>
        </svg>
        Mijoz
      </button>
    </div>

    <div class="search-box-wrap">
      <input type="text" class="search-input" placeholder="Ism yoki telefon raqam..." value="${tabClientSearchQuery}" oninput="onTabClientSearch(this.value)">
    </div>

    <div class="wide-card">
      ${clientsHtml}
    </div>
  `;
}

function onTabClientSearch(val) {
  tabClientSearchQuery = val.trim();
  const body = document.getElementById('app-body');
  if (currentTab === 'clients' && body) {
    body.innerHTML = getTabContent('clients');
    const input = body.querySelector('.search-input');
    if (input) {
      input.focus();
      input.setSelectionRange(val.length, val.length);
    }
  }
}

// ── 6. Analytics Tab
function analyticsTabContent() {
  const fin = State.getFinancials();

  return `
    <div class="section-header">
      <h2 class="section-title">Analitika</h2>
    </div>

    <div class="summary-banner">
      <div class="sb-label">Sof Foyda</div>
      <div class="sb-val">${fin.netProfit.toLocaleString()} UZS</div>
      <div class="sb-sub-stats">
        <div class="sb-stat-chip">Rentabellik: <b>${fin.marginPercent}%</b></div>
      </div>
    </div>

    <div class="wide-card">
      <div class="fin-row">
        <span class="fin-label">Jami Kirim</span>
        <span class="fin-val">${fin.totalRevenue.toLocaleString()} UZS</span>
      </div>
      <div class="fin-row">
        <span class="fin-label">Xomashyo Tannarxi</span>
        <span class="fin-val">${fin.totalTannarx.toLocaleString()} UZS</span>
      </div>
      <div class="fin-row">
        <span class="fin-label">Operatsion Chiqimlar</span>
        <span class="fin-val">${fin.totalDirectExpenses.toLocaleString()} UZS</span>
      </div>
      <div class="fin-row">
        <span class="fin-label">Jami Xarajatlar</span>
        <span class="fin-val">${fin.totalAllCosts.toLocaleString()} UZS</span>
      </div>
    </div>

    <p class="sec-label">Sotuv grafigi</p>
    <div class="chart-wrap">
      <div class="chart-header">
        <div class="chart-title">Hajm dinamikasi</div>
        <div class="chart-tabs">
          <button class="chart-tab active" id="tab-chart-week-inside" onclick="switchChart('week',this)">Hafta</button>
          <button class="chart-tab" id="tab-chart-month-inside" onclick="switchChart('month',this)">Oy</button>
        </div>
      </div>
      <div class="chart-bars-wrap" id="chart-bars-tab"></div>
      <div class="chart-labels" id="chart-labels-tab"></div>
    </div>
  `;
}

// ── Global Search Modal Handler
function openGlobalSearch() {
  const content = `
    <div class="search-box-wrap">
      <input type="text" id="global-search-input" class="search-input" placeholder="Mijoz, buyurtma yoki karta qidirish..." oninput="filterGlobalSearch(this.value)" autofocus>
    </div>
    <div id="global-search-results" style="max-height: 50vh; overflow-y: auto; margin-top: 10px;">
      <div style="text-align:center; padding: 20px; color: var(--color-muted); font-size: 12px;">Qidirish uchun biror narsa yozing</div>
    </div>
  `;
  openModal("Qidiruv", content);
  setTimeout(() => {
    const input = document.getElementById('global-search-input');
    if (input) input.focus();
  }, 100);
}

function filterGlobalSearch(query) {
  const q = query.toLowerCase().trim();
  const res = document.getElementById('global-search-results');
  if (!res) return;

  if (!q) {
    res.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--color-muted); font-size: 12px;">Qidirish uchun biror narsa yozing</div>`;
    return;
  }

  const matchedOrders = State.orders.filter(o => o.id.toLowerCase().includes(q) || o.clientName.toLowerCase().includes(q));
  const matchedClients = State.clients.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q));
  const matchedProds = State.products.filter(p => p.name.toLowerCase().includes(q));

  let html = '';

  if (matchedOrders.length > 0) {
    html += `<p class="sec-label" style="margin-top:4px;">Buyurtmalar (${matchedOrders.length})</p><div class="wide-card">`;
    html += matchedOrders.map(o => renderOrderSingleItem(o)).join('');
    html += `</div>`;
  }

  if (matchedClients.length > 0) {
    html += `<p class="sec-label">Mijozlar (${matchedClients.length})</p><div class="wide-card">`;
    html += matchedClients.map(c => `
      <div class="order-item" onclick="closeModal(); showClientHistory('${c.id}')" style="cursor:pointer;">
        <div class="oi-body">
          <div class="oi-name">${c.name}</div>
          <div class="oi-detail">${c.phone}</div>
        </div>
        <div class="oi-right">
          <div class="oi-sum">${c.totalSpend.toLocaleString()} UZS</div>
        </div>
      </div>
    `).join('');
    html += `</div>`;
  }

  if (matchedProds.length > 0) {
    html += `<p class="sec-label">Ombor kartalari (${matchedProds.length})</p><div class="wide-card">`;
    html += matchedProds.map(p => `
      <div class="product-row" onclick="closeModal(); showAddStockForm('${p.id}')" style="cursor:pointer;">
        <div>
          <div class="pr-name">${p.name}</div>
          <div class="pr-sub">${p.size} • ${p.price.toLocaleString()} UZS</div>
        </div>
        <div style="text-align:right;">
          <div style="font-family:'Space Grotesk',sans-serif;font-weight:700;color:var(--color-gold);">${p.stock} dona</div>
        </div>
      </div>
    `).join('');
    html += `</div>`;
  }

  if (!html) {
    res.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--color-muted); font-size: 12px;">Hech narsa topilmadi</div>`;
  } else {
    res.innerHTML = html;
  }
}

// ══════════════════════════════════════════
// DETAIL SCREENS
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

  document.getElementById('orders-detail-subtitle').textContent = `Jami: ${State.orders.length} ta buyurtma`;

  const container = document.getElementById('orders-detail-list');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:24px;color:var(--text-dim);font-size:12px;">Topilmadi</div>`;
    return;
  }

  container.innerHTML = `
    <div class="wide-card">
      ${filtered.map(ord => renderOrderSingleItem(ord)).join('')}
    </div>
  `;
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
  document.getElementById('expenses-detail-subtitle').textContent = `Jami: ${State.expenses.length} ta qayd`;
  document.getElementById('expenses-total-banner').textContent = fin.totalDirectExpenses.toLocaleString() + ' UZS';

  const catSums = {};
  State.expenses.forEach(e => { catSums[e.category] = (catSums[e.category] || 0) + e.amount; });

  const catBreakdown = document.getElementById('expenses-category-breakdown');
  if (catBreakdown) {
    const cats = Object.keys(catSums);
    catBreakdown.innerHTML = cats.map(cat => `
      <div class="fin-row">
        <span class="fin-label">${cat}</span>
        <span class="fin-val">${catSums[cat].toLocaleString()} UZS</span>
      </div>
    `).join('');
  }

  const container = document.getElementById('expenses-detail-list');
  if (!container) return;

  container.innerHTML = `
    <div class="wide-card">
      ${State.expenses.map(e => `
        <div class="order-item">
          <div class="oi-body">
            <div class="oi-name">${e.category}</div>
            <div class="oi-detail">${e.desc} • ${e.date}</div>
          </div>
          <div class="oi-right">
            <div class="oi-sum">−${e.amount.toLocaleString()} UZS</div>
            <button onclick="deleteExpenseItem('${e.id}')" style="background:transparent;border:none;color:var(--muted);font-size:10px;cursor:pointer;margin-top:2px;">O'chirish</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function showAddExpenseForm() {
  const form = `
    <div class="form-group">
      <label class="form-label">Toifa</label>
      <select class="form-select" id="exp-category">
        <option value="Pechat & Bosma">Pechat & Bosma</option>
        <option value="Yetkazib berish">Yetkazib berish (Yandex/BTS)</option>
        <option value="Marketing">Marketing & Reklama</option>
        <option value="Qadoqlash">Qadoqlash</option>
        <option value="Xomashyo">Blank NFC kartalar</option>
        <option value="Boshqa">Boshqa</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Summasi (UZS)</label>
      <input type="number" class="form-input" id="exp-amount" placeholder="Masalan: 50000" min="1">
    </div>
    <div class="form-group">
      <label class="form-label">Izoh</label>
      <input type="text" class="form-input" id="exp-desc" placeholder="Tavsif">
    </div>
    <button class="btn-primary" onclick="submitAddExpense()">Saqlash</button>
  `;
  openModal('Chiqim kiritish', form);
}

function submitAddExpense() {
  const category = document.getElementById('exp-category').value;
  const amount = parseInt(document.getElementById('exp-amount').value);
  const desc = document.getElementById('exp-desc').value;

  if (isNaN(amount) || amount <= 0 || !desc) {
    showToast('Barcha maydonlarni to\'ldiring');
    return;
  }

  State.addExpense(category, amount, desc, 'Bugun');
  showToast('Chiqim saqlandi');
  closeModal();
  if (document.getElementById('detail-expenses')?.classList.contains('active')) renderExpensesDetailList();
}

function deleteExpenseItem(id) {
  if (confirm("O'chirmoqchimisiz?")) {
    State.deleteExpense(id);
    showToast("O'chirildi");
    if (document.getElementById('detail-expenses')?.classList.contains('active')) renderExpensesDetailList();
  }
}

// ── Detail: Products
function renderProductsDetailList() {
  const totalStock = State.products.reduce((acc, p) => acc + p.stock, 0);
  document.getElementById('products-detail-subtitle').textContent = `Jami omborda: ${totalStock} dona`;

  const container = document.getElementById('products-detail-list');
  if (!container) return;

  container.innerHTML = State.products.map(p => `
    <div class="product-card" onclick="showAddStockForm('${p.id}')">
      <div class="pc-top">
        <div class="pc-name">${p.name}</div>
        <span class="pc-stock-badge ${p.stock <= 15 ? 'low' : ''}">${p.stock} ${p.unit || 'dona'}</span>
      </div>
      <div class="pc-mid">
        <span class="pc-size-pill">${p.size || 'NFC Smart'}</span>
        <span class="pc-price">${p.price.toLocaleString()} UZS</span>
      </div>
      <div class="pc-bottom">
        <span>Tannarx: ${p.cost.toLocaleString()} UZS • Sotildi: ${p.sold || 0}</span>
        <span class="pc-action-link">+ Kirim qilish</span>
      </div>
    </div>
  `).join('');
}

function showAddStockForm(preselectedId) {
  const selectOpts = State.products.map(p => `<option value="${p.id}" ${p.id === preselectedId ? 'selected' : ''}>${p.name} (${p.stock} dona)</option>`).join('');
  const preProd = State.products.find(p => p.id === preselectedId) || State.products[0];
  const form = `
    <div class="form-group">
      <label class="form-label">Mahsulot</label>
      <select class="form-select" id="stock-prod-id">${selectOpts}</select>
    </div>
    <div class="form-group">
      <label class="form-label">Miqdor (dona)</label>
      <input type="number" class="form-input" id="stock-qty-val" placeholder="50" min="1">
    </div>
    <div class="form-group">
      <label class="form-label">Tannarxi (UZS / dona)</label>
      <input type="number" class="form-input" id="stock-cost-val" value="${preProd ? preProd.cost : 50000}">
    </div>
    <button class="btn-primary" onclick="submitStockKirim()">Kirim qilish</button>
  `;
  openModal('Omborga kirim', form);
}

function submitStockKirim() {
  const id = document.getElementById('stock-prod-id').value;
  const qty = parseInt(document.getElementById('stock-qty-val').value);
  const cost = parseInt(document.getElementById('stock-cost-val').value);

  if (isNaN(qty) || qty <= 0) {
    showToast('Miqdorni kiriting');
    return;
  }

  if (State.addStock(id, qty, cost)) {
    showToast('Ombor yangilandi');
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
      c.phone.includes(clientSearchQuery);
  });

  document.getElementById('clients-detail-subtitle').textContent = `Jami: ${State.clients.length} ta mijoz`;

  const listContainer = document.getElementById('clients-detail-list');
  if (listContainer) {
    listContainer.innerHTML = `
      <div class="wide-card">
        ${filtered.map(c => `
          <div class="order-item" onclick="showClientHistory('${c.id}')" style="cursor:pointer;">
            <div class="oi-body">
              <div class="oi-name">${c.name}</div>
              <div class="oi-detail">${c.phone} • ${c.address}</div>
            </div>
            <div class="oi-right">
              ${c.debt > 0 ? `<span class="status-pill status-debt">${c.debt.toLocaleString()} UZS qarz</span>` : `<span style="font-size:11px;color:var(--text-dim);">Qarzsiz</span>`}
            </div>
          </div>
        `).join('')}
      </div>
    `;
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

  const listHistory = c.history.map(h => `
    <div class="fin-row">
      <div>
        <div style="font-weight:600;color:var(--text);font-size:12px;">${h.desc}</div>
        <div style="color:var(--muted);font-size:10px;">${h.date} • ${h.type}</div>
      </div>
      <div class="fin-val">${h.amount.toLocaleString()} UZS</div>
    </div>
  `).join('') || `<div style="text-align:center;color:var(--muted);font-size:12px;padding:12px 0;">Tarix yo'q</div>`;

  const content = `
    <div>
      <div style="font-size:12px;color:var(--text-dim);margin-bottom:10px;">📞 ${c.phone} • 📍 ${c.address}</div>
      <div class="summary-banner" style="margin-bottom:12px;padding:10px 14px;">
        <div class="sb-label">Qarz balansi</div>
        <div class="sb-val" style="font-size:20px;">${c.debt.toLocaleString()} UZS</div>
      </div>
      <p class="sec-label">Tarix</p>
      <div class="wide-card" style="max-height:200px;overflow-y:auto;">
        ${listHistory}
      </div>
    </div>
  `;
  openModal(c.name, content);
}

function showAddClientForm() {
  const form = `
    <div class="form-group">
      <label class="form-label">Ism va Familiya</label>
      <input type="text" class="form-input" id="c-new-name" placeholder="Masalan: Jamshid">
    </div>
    <div class="form-group">
      <label class="form-label">Telefon</label>
      <input type="text" class="form-input" id="c-new-phone" placeholder="+998 90 123 45 67">
    </div>
    <div class="form-group">
      <label class="form-label">Manzil / Kompaniya</label>
      <input type="text" class="form-input" id="c-new-addr" placeholder="Toshkent">
    </div>
    <button class="btn-primary" onclick="submitAddClient()">Saqlash</button>
  `;
  openModal('Yangi mijoz', form);
}

function submitAddClient() {
  const name = document.getElementById('c-new-name').value;
  const phone = document.getElementById('c-new-phone').value;
  const addr = document.getElementById('c-new-addr').value;

  if (!name || !phone) {
    showToast('Ism va telefonni kiriting');
    return;
  }

  State.addClient(name, phone, addr || 'Toshkent');
  showToast('Mijoz saqlandi');
  closeModal();
  renderClientsDetailList();
}

// ── Detail: Debts
function renderDebtsDetailList() {
  let totalDebts = 0;
  State.clients.forEach(c => { if (c.debt > 0) totalDebts += c.debt; });

  document.getElementById('debts-detail-subtitle').textContent = `Jami qarzlar`;
  document.getElementById('debts-stat-sum').textContent = totalDebts.toLocaleString() + ' UZS';

  const container = document.getElementById('debts-detail-list');
  if (!container) return;

  const debtClients = State.clients.filter(c => c.debt > 0);
  if (debtClients.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:16px;color:var(--text-dim);font-size:12px;">Qarzdorlar yo'q</div>`;
    return;
  }

  container.innerHTML = debtClients.map(c => `
    <div class="order-item" onclick="showClientHistory('${c.id}')" style="cursor:pointer;">
      <div class="oi-body">
        <div class="oi-name">${c.name}</div>
        <div class="oi-detail">${c.phone}</div>
      </div>
      <div class="oi-right">
        <div class="oi-sum">${c.debt.toLocaleString()} UZS</div>
      </div>
    </div>
  `).join('');
}

function showCollectPaymentForm() {
  const debtClients = State.clients.filter(c => c.debt > 0);
  if (debtClients.length === 0) {
    showToast('Qarzdorlar yo\'q');
    return;
  }

  const options = debtClients.map(c => `<option value="${c.id}">${c.name} (${c.debt.toLocaleString()} UZS)</option>`).join('');
  const form = `
    <div class="form-group">
      <label class="form-label">Mijoz</label>
      <select class="form-select" id="debt-pay-client">${options}</select>
    </div>
    <div class="form-group">
      <label class="form-label">To'lov summasi (UZS)</label>
      <input type="number" class="form-input" id="debt-pay-amount" placeholder="Summa" min="1">
    </div>
    <button class="btn-primary" onclick="submitDebtPayment()">To'lovni tasdiqlash</button>
  `;
  openModal('Qarz to\'lovi', form);
}

function submitDebtPayment() {
  const clientId = document.getElementById('debt-pay-client').value;
  const amount = parseInt(document.getElementById('debt-pay-amount').value);

  if (isNaN(amount) || amount <= 0) {
    showToast('Summani kiriting');
    return;
  }

  const paid = State.payDebt(clientId, amount);
  if (paid > 0) {
    showToast(`To'lov qabul qilindi: ${paid.toLocaleString()} UZS`);
    closeModal();
    renderDebtsDetailList();
  }
}

// ── Detail: Analytics
function renderAnalyticsDetail() {
  const fin = State.getFinancials();

  document.getElementById('analytics-detail-subtitle').textContent = `Rentabellik: ${fin.marginPercent}%`;
  document.getElementById('analytics-stat-margin').textContent = fin.marginPercent + '%';
  document.getElementById('analytics-stat-foyda').textContent = fin.netProfit.toLocaleString() + ' UZS';
  document.getElementById('analytics-stat-kirim').textContent = fin.totalRevenue.toLocaleString() + ' UZS';
  document.getElementById('analytics-stat-tannarx').textContent = fin.totalTannarx.toLocaleString() + ' UZS';
  document.getElementById('analytics-stat-xarajat').textContent = fin.totalDirectExpenses.toLocaleString() + ' UZS';
  document.getElementById('analytics-stat-all-costs').textContent = fin.totalAllCosts.toLocaleString() + ' UZS';

  const container = document.getElementById('analytics-top-products');
  if (container) {
    const sorted = [...State.products].sort((a,b) => (b.sold || 0) - (a.sold || 0));
    container.innerHTML = sorted.map(p => `
      <div class="fin-row">
        <span class="fin-label">${p.name}</span>
        <span class="fin-val">${p.sold || 0} dona</span>
      </div>
    `).join('');
  }

  setTimeout(() => drawChart('week', 'chart-bars-detail', 'chart-labels-detail'), 40);
}

// ══════════════════════════════════════════
// CHART PLOTTER
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
    return `<div class="bar ${isToday ? 'today' : ''}" style="height:${heightPercent}%;"></div>`;
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
// MODALS
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
  setTimeout(() => { backdrop.style.display = 'none'; }, 150);
}

function handleBackdropClick(e) {
  if (e.target.id === 'global-modal') closeModal();
}

// ══════════════════════════════════════════
// NEW ORDER FORM (DYNAMIC PRICING)
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
  const clientOpts = State.clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  const prodOpts = State.products.map(p => `<option value="${p.id}" data-price="${p.price}">${p.name}</option>`).join('');
  const defaultProd = State.products[0];

  const form = `
    <div class="form-group">
      <label class="form-label">Mijoz</label>
      <select class="form-select" id="order-client-id">${clientOpts}</select>
    </div>

    <div class="form-group">
      <label class="form-label">NFC Karta Turi</label>
      <select class="form-select" id="order-prod-id" onchange="onOrderProductChanged()">${prodOpts}</select>
    </div>

    <div class="form-grid-2">
      <div class="form-group">
        <label class="form-label">Dona narxi (UZS)</label>
        <input type="number" class="form-input" id="order-unit-price" value="${defaultProd.price}" oninput="calculateDynamicOrderTotal()">
      </div>
      <div class="form-group">
        <label class="form-label">Soni</label>
        <input type="number" class="form-input" id="order-qty" value="1" min="1" oninput="calculateDynamicOrderTotal()">
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Qo'shimcha xizmat / Dizayn (UZS)</label>
      <input type="number" class="form-input" id="order-service-fee" value="0" oninput="calculateDynamicOrderTotal()">
    </div>

    <div class="form-grid-2">
      <div class="form-group">
        <label class="form-label">To'lov</label>
        <select class="form-select" id="order-payment">
          <option value="Karta">Karta</option>
          <option value="Naqd">Naqd</option>
          <option value="Nasiya">Nasiya (Qarz)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Jami summa</label>
        <div style="font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;color:var(--gold);padding-top:8px;" id="order-total-preview">0 UZS</div>
      </div>
    </div>

    <button class="btn-primary" onclick="submitNewOrder()">Buyurtmani saqlash</button>
  `;
  openModal('Yangi buyurtma', form);
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

  const total = (unitPrice * qty) + fee;
  const preview = document.getElementById('order-total-preview');
  if (preview) preview.textContent = total.toLocaleString() + ' UZS';
}

function submitNewOrder() {
  const clientId = document.getElementById('order-client-id').value;
  const prodId = document.getElementById('order-prod-id').value;
  const unitPrice = parseInt(document.getElementById('order-unit-price').value);
  const qty = parseInt(document.getElementById('order-qty').value);
  const fee = parseInt(document.getElementById('order-service-fee').value) || 0;
  const payment = document.getElementById('order-payment').value;

  const client = State.clients.find(c => c.id === clientId);
  const product = State.products.find(p => p.id === prodId);

  if (!client || !product || isNaN(qty) || qty <= 0 || isNaN(unitPrice)) {
    showToast('Ma\'lumotlarni to\'g\'ri kiriting');
    return;
  }

  if (product.stock < qty) {
    showToast(`Omborda faqat ${product.stock} ta qolgan`);
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
        cost: product.cost
      }
    ],
    total: total,
    date: 'Bugun',
    status: 'Tayyorlanmoqda',
    payment: payment
  };

  State.addOrder(newOrder);
  showToast(`Buyurtma #${orderId} saqlandi`);
  closeModal();
}

// ══════════════════════════════════════════
// ORDER ACTIONS & TELEGRAM
// ══════════════════════════════════════════
function showOrderActions(orderId) {
  const ord = State.orders.find(o => o.id === orderId);
  if (!ord) return;

  const item = ord.items[0] || {};

  const content = `
    <div>
      <div style="font-size:13px;color:var(--text);margin-bottom:12px;">
        <b>#${ord.id}</b> • ${ord.clientName} (${ord.clientPhone || ''})<br>
        Karta: <b>${item.qty || 1}x ${item.name || 'NFC'}</b><br>
        Summa: <b>${ord.total.toLocaleString()} UZS</b> (${ord.payment})<br>
        Holat: <b>${ord.status}</b>
      </div>

      <button class="btn-primary" style="margin-bottom:8px;" onclick="forwardOrderToTelegram('${ord.id}')">
        Telegramga jo'natish
      </button>

      ${ord.status !== 'Yetkazildi' ? `
        <button class="btn-secondary" onclick="updateOrderStatus('${ord.id}', 'Yetkazildi')">✓ Yetkazildi</button>
      ` : ''}

      ${ord.status !== 'Qaytarildi' ? `
        <button class="btn-secondary" style="color:#ff453a;" onclick="cancelAndReturnOrder('${ord.id}')">Bekor qilish (Omborga qaytarish)</button>
      ` : ''}

      <button class="btn-secondary" style="color:var(--muted);" onclick="deleteOrderPermanently('${ord.id}')">O'chirish</button>
    </div>
  `;
  openModal(`Buyurtma #${ord.id}`, content);
}

function forwardOrderToTelegram(orderId) {
  const ord = State.orders.find(o => o.id === orderId);
  if (!ord) return;

  const item = ord.items[0] || {};

  const message = `BUYURTMA: #${ord.id}\n` +
    `Mijoz: ${ord.clientName} (${ord.clientPhone || '-'})\n` +
    `Karta: ${item.qty || 1}x ${item.name || 'NFC'}\n` +
    `Summa: ${ord.total.toLocaleString()} UZS\n` +
    `To'lov: ${ord.payment}\n` +
    `Holat: ${ord.status}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(message);
    showToast('Nusxalandi va Telegram ochilmoqda');
  }

  const encoded = encodeURIComponent(message);
  setTimeout(() => {
    window.open(`https://t.me/share/url?url=${encoded}`, '_blank');
  }, 300);
}

function updateOrderStatus(orderId, newStatus) {
  const ord = State.orders.find(o => o.id === orderId);
  if (ord) {
    ord.status = newStatus;
    State.save();
    showToast('Holat yangilandi');
    closeModal();
    if (document.getElementById('detail-orders')?.classList.contains('active')) renderOrdersDetailList();
    renderTab(currentTab);
  }
}

function cancelAndReturnOrder(orderId) {
  if (confirm("Buyurtmani bekor qilmoqchimisiz?")) {
    if (State.returnOrder(orderId)) {
      showToast("Buyurtma bekor qilindi");
      closeModal();
      if (document.getElementById('detail-orders')?.classList.contains('active')) renderOrdersDetailList();
    }
  }
}

function deleteOrderPermanently(orderId) {
  if (confirm("Butunlay o'chirmoqchimisiz?")) {
    State.orders = State.orders.filter(o => o.id !== orderId);
    State.save();
    showToast("O'chirildi");
    closeModal();
    if (document.getElementById('detail-orders')?.classList.contains('active')) renderOrdersDetailList();
    renderTab(currentTab);
  }
}

// ══════════════════════════════════════════
// DELETE MODALS
// ══════════════════════════════════════════
function openDeleteModal(type) {
  let listHtml = '';
  let title = '';
  let deleteFn = '';
  
  if (type === 'expenses') {
    title = "Chiqimlarni o'chirish";
    listHtml = State.expenses.map(e => `
      <label style="display:flex; align-items:center; padding:10px 0; border-bottom:1px solid var(--border); cursor:pointer;">
        <input type="checkbox" class="delete-checkbox" value="${e.id}" style="margin-right:10px;">
        <div style="flex:1">
          <div style="font-weight:600;font-size:12.5px;">${e.category}</div>
          <div style="font-size:11px; color:var(--text-dim)">${e.amount.toLocaleString()} UZS</div>
        </div>
      </label>
    `).join('');
    deleteFn = 'deleteSelectedExpenses()';
  } else if (type === 'clients') {
    title = "Mijozlarni o'chirish";
    listHtml = State.clients.map(c => `
      <label style="display:flex; align-items:center; padding:10px 0; border-bottom:1px solid var(--border); cursor:pointer;">
        <input type="checkbox" class="delete-checkbox" value="${c.id}" style="margin-right:10px;">
        <div style="flex:1">
          <div style="font-weight:600;font-size:12.5px;">${c.name}</div>
          <div style="font-size:11px; color:var(--text-dim)">${c.phone}</div>
        </div>
      </label>
    `).join('');
    deleteFn = 'deleteSelectedClients()';
  }

  if (!listHtml) {
    openModal(title, "<div style=\"padding:16px; text-align:center; color:var(--text-dim); font-size:12px;\">Ma'lumot yo'q</div>");
    return;
  }

  const content = `
    <div style="max-height:45vh; overflow-y:auto; margin-bottom:12px;">
      ${listHtml}
    </div>
    <button class="btn-primary" style="background:#ff453a; color:#fff;" onclick="${deleteFn}">Tanlanganlarni o'chirish</button>
  `;
  openModal(title, content);
}

function deleteSelectedExpenses() {
  const selected = Array.from(document.querySelectorAll('.delete-checkbox:checked')).map(cb => cb.value);
  if (selected.length === 0) return showToast('Tanlanmadi');
  if (confirm(`${selected.length} ta xarajat o'chirilsinmi?`)) {
    State.expenses = State.expenses.filter(e => !selected.includes(e.id));
    State.save();
    showToast("O'chirildi");
    closeModal();
    if (document.getElementById('detail-expenses')?.classList.contains('active')) renderExpensesDetailList();
    renderTab(currentTab);
  }
}

function deleteSelectedClients() {
  const selected = Array.from(document.querySelectorAll('.delete-checkbox:checked')).map(cb => cb.value);
  if (selected.length === 0) return showToast('Tanlanmadi');
  if (confirm(`${selected.length} ta mijoz o'chirilsinmi?`)) {
    State.clients = State.clients.filter(c => !selected.includes(c.id));
    State.save();
    showToast("O'chirildi");
    closeModal();
    if (document.getElementById('detail-clients')?.classList.contains('active')) renderClientsDetailList();
    renderTab(currentTab);
  }
}
