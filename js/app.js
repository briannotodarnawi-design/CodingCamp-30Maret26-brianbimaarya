// ===== State =====
let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
let categories = JSON.parse(localStorage.getItem('categories') || '["Food","Transport","Fun"]');
let spendingLimit = parseFloat(localStorage.getItem('spendingLimit') || '0');
let chartInstance = null;

// ===== DOM =====
const form = document.getElementById('expenseForm');
const nameInput = document.getElementById('itemName');
const amountInput = document.getElementById('itemAmount');
const categorySelect = document.getElementById('itemCategory');
const customCategoryInput = document.getElementById('customCategory');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const formError = document.getElementById('formError');
const totalBalanceEl = document.getElementById('totalBalance');
const balanceCard = document.getElementById('balanceCard');
const transactionList = document.getElementById('transactionList');
const emptyMsg = document.getElementById('emptyMsg');
const chartEmpty = document.getElementById('chartEmpty');
const sortSelect = document.getElementById('sortSelect');
const themeToggle = document.getElementById('themeToggle');
const limitInput = document.getElementById('limitInput');
const setLimitBtn = document.getElementById('setLimitBtn');

// ===== Init =====
function init() {
  applyTheme(localStorage.getItem('theme') || 'light');
  if (spendingLimit > 0) limitInput.value = spendingLimit;
  renderCategories();
  renderAll();
}

// ===== Render All =====
function renderAll() {
  renderBalance();
  renderList();
  renderChart();
}

// ===== Balance =====
function renderBalance() {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  totalBalanceEl.textContent = formatRp(total);
  if (spendingLimit > 0 && total > spendingLimit) {
    balanceCard.classList.add('over-limit');
    totalBalanceEl.title = `⚠️ Over limit by ${formatRp(total - spendingLimit)}`;
  } else {
    balanceCard.classList.remove('over-limit');
    totalBalanceEl.title = '';
  }
}

// ===== Transaction List =====
function renderList() {
  const sorted = getSorted([...transactions]);
  transactionList.innerHTML = '';
  emptyMsg.style.display = sorted.length ? 'none' : 'block';

  sorted.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="tx-info">
        <span class="tx-name">${escHtml(t.name)}</span>
        <span class="tx-meta">${escHtml(t.category)}</span>
      </div>
      <span class="tx-amount">${formatRp(t.amount)}</span>
      <button class="delete-btn" data-id="${t.id}" title="Delete">🗑</button>
    `;
    transactionList.appendChild(li);
  });
}

// ===== Chart =====
function renderChart() {
  const ctx = document.getElementById('pieChart').getContext('2d');
  const totals = {};
  transactions.forEach(t => {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  });

  const labels = Object.keys(totals);
  const data = Object.values(totals);

  chartEmpty.style.display = labels.length ? 'none' : 'block';

  if (chartInstance) chartInstance.destroy();
  if (!labels.length) return;

  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{ data, backgroundColor: generateColors(labels.length), borderWidth: 2 }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
    }
  });
}

// ===== Add Transaction =====
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;

  if (!name || !amount || amount <= 0 || !category) {
    formError.textContent = 'Please fill in all fields correctly.';
    return;
  }
  formError.textContent = '';

  transactions.push({ id: Date.now().toString(), name, amount, category });
  save();
  renderAll();
  form.reset();
});

// ===== Delete Transaction =====
transactionList.addEventListener('click', e => {
  const btn = e.target.closest('.delete-btn');
  if (!btn) return;
  transactions = transactions.filter(t => t.id !== btn.dataset.id);
  save();
  renderAll();
});

// ===== Sort =====
sortSelect.addEventListener('change', renderList);

function getSorted(arr) {
  const val = sortSelect.value;
  if (val === 'amount-asc') return arr.sort((a, b) => a.amount - b.amount);
  if (val === 'amount-desc') return arr.sort((a, b) => b.amount - a.amount);
  if (val === 'category') return arr.sort((a, b) => a.category.localeCompare(b.category));
  return arr;
}

// ===== Custom Category =====
addCategoryBtn.addEventListener('click', () => {
  const val = customCategoryInput.value.trim();
  if (!val || categories.includes(val)) return;
  categories.push(val);
  localStorage.setItem('categories', JSON.stringify(categories));
  renderCategories();
  categorySelect.value = val;
  customCategoryInput.value = '';
});

function renderCategories() {
  const current = categorySelect.value;
  categorySelect.innerHTML = '<option value="">-- Category --</option>';
  categories.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    categorySelect.appendChild(opt);
  });
  if (current) categorySelect.value = current;
}

// ===== Spending Limit =====
setLimitBtn.addEventListener('click', () => {
  const val = parseFloat(limitInput.value);
  spendingLimit = val > 0 ? val : 0;
  localStorage.setItem('spendingLimit', spendingLimit);
  renderBalance();
});

// ===== Dark/Light Mode =====
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ===== Helpers =====
function save() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function formatRp(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function generateColors(n) {
  const palette = ['#6366f1','#f59e0b','#10b981','#ef4444','#3b82f6','#ec4899','#8b5cf6','#14b8a6'];
  return Array.from({ length: n }, (_, i) => palette[i % palette.length]);
}

// ===== Start =====
init();
