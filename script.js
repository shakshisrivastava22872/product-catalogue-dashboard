const products = [
  { id: 'P-1001', name: 'Aero Wireless Headphones', category: 'Electronics', price: 3499, stock: 24, rating: 4.8, status: 'In Stock' },
  { id: 'P-1002', name: 'UrbanLite Smartwatch', category: 'Electronics', price: 4999, stock: 8, rating: 4.5, status: 'Low Stock' },
  { id: 'P-1003', name: 'Nimbus USB-C Charger', category: 'Electronics', price: 1299, stock: 36, rating: 4.4, status: 'In Stock' },
  { id: 'P-1004', name: 'PixelPro Camera Stand', category: 'Electronics', price: 2199, stock: 17, rating: 4.7, status: 'In Stock' },
  { id: 'P-1005', name: 'Crest Bluetooth Speaker', category: 'Electronics', price: 2899, stock: 0, rating: 4.2, status: 'Out of Stock' },
  { id: 'P-1101', name: 'Harbor Cotton Tee', category: 'Clothing', price: 899, stock: 42, rating: 4.3, status: 'In Stock' },
  { id: 'P-1102', name: 'Metro Denim Jacket', category: 'Clothing', price: 2499, stock: 13, rating: 4.6, status: 'In Stock' },
  { id: 'P-1103', name: 'Summit Running Shorts', category: 'Clothing', price: 1199, stock: 9, rating: 4.4, status: 'Low Stock' },
  { id: 'P-1104', name: 'Velvet Office Shirt', category: 'Clothing', price: 1699, stock: 21, rating: 4.5, status: 'In Stock' },
  { id: 'P-1105', name: 'Quill Wool Scarf', category: 'Clothing', price: 1499, stock: 0, rating: 4.1, status: 'Out of Stock' },
  { id: 'P-1201', name: 'Cedar Air Fryer', category: 'Home & Kitchen', price: 5999, stock: 10, rating: 4.7, status: 'In Stock' },
  { id: 'P-1202', name: 'Sora Glass Storage Jar', category: 'Home & Kitchen', price: 899, stock: 31, rating: 4.3, status: 'In Stock' },
  { id: 'P-1203', name: 'Mira Stainless Kettle', category: 'Home & Kitchen', price: 1899, stock: 6, rating: 4.4, status: 'Low Stock' },
  { id: 'P-1204', name: 'Northstar Coffee Grinder', category: 'Home & Kitchen', price: 2599, stock: 12, rating: 4.8, status: 'In Stock' },
  { id: 'P-1205', name: 'Luma Dinner Set', category: 'Home & Kitchen', price: 3499, stock: 0, rating: 4.2, status: 'Out of Stock' },
  { id: 'P-1301', name: 'The Silent Horizon', category: 'Books', price: 699, stock: 18, rating: 4.8, status: 'In Stock' },
  { id: 'P-1302', name: 'Code for Everyday Life', category: 'Books', price: 799, stock: 22, rating: 4.6, status: 'In Stock' },
  { id: 'P-1303', name: 'Growth Mindset Atlas', category: 'Books', price: 599, stock: 7, rating: 4.5, status: 'Low Stock' },
  { id: 'P-1304', name: 'Creative Living Journal', category: 'Books', price: 449, stock: 28, rating: 4.4, status: 'In Stock' },
  { id: 'P-1305', name: 'Designing Better Ideas', category: 'Books', price: 949, stock: 0, rating: 4.3, status: 'Out of Stock' },
  { id: 'P-1401', name: 'Atlas Travel Backpack', category: 'Accessories', price: 1899, stock: 16, rating: 4.6, status: 'In Stock' },
  { id: 'P-1402', name: 'Nova Leather Wallet', category: 'Accessories', price: 1299, stock: 14, rating: 4.7, status: 'In Stock' },
  { id: 'P-1403', name: 'Orbit Sunglasses', category: 'Accessories', price: 1599, stock: 5, rating: 4.1, status: 'Low Stock' },
  { id: 'P-1404', name: 'Tempo Desk Lamp', category: 'Accessories', price: 2199, stock: 11, rating: 4.5, status: 'In Stock' },
  { id: 'P-1405', name: 'Cinder Laptop Sleeve', category: 'Accessories', price: 1099, stock: 0, rating: 4.3, status: 'Out of Stock' },
  { id: 'P-1501', name: 'Beacon Desk Organizer', category: 'Home & Kitchen', price: 1299, stock: 19, rating: 4.4, status: 'In Stock' },
  { id: 'P-1502', name: 'Luna Fitness Band', category: 'Electronics', price: 2399, stock: 7, rating: 4.2, status: 'Low Stock' },
  { id: 'P-1503', name: 'Drift Canvas Tote', category: 'Accessories', price: 799, stock: 23, rating: 4.5, status: 'In Stock' },
  { id: 'P-1504', name: 'Horizon Notebook Set', category: 'Books', price: 549, stock: 35, rating: 4.3, status: 'In Stock' }
];

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-IN');

const state = {
  searchTerm: '',
  category: 'All Categories',
  stockFilter: 'all',
  sortBy: 'name-asc'
};

let dialogTrigger = null;

function getStockStatus(stock) {
  if (stock === 0) return 'Out of Stock';
  if (stock > 0 && stock < 10) return 'Low Stock';
  return 'In Stock';
}

function getCategories() {
  return ['All Categories', ...new Set(products.map((product) => product.category))];
}

function getVisibleProducts(options = {}) {
  let filtered = [...products];

  const search = state.searchTerm.trim().toLowerCase();
  if (search) {
    filtered = filtered.filter((product) => {
      const searchTarget = `${product.name} ${product.category} ${product.id}`.toLowerCase();
      return searchTarget.includes(search);
    });
  }

  if (!options.ignoreCategory && state.category !== 'All Categories') {
    filtered = filtered.filter((product) => product.category === state.category);
  }

  if (state.stockFilter !== 'all') {
    filtered = filtered.filter((product) => {
      const status = getStockStatus(product.stock);
      if (state.stockFilter === 'in-stock') return status === 'In Stock';
      if (state.stockFilter === 'low-stock') return status === 'Low Stock';
      if (state.stockFilter === 'out-of-stock') return status === 'Out of Stock';
      return true;
    });
  }

  switch (state.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'stock-asc':
      filtered.sort((a, b) => a.stock - b.stock);
      break;
    case 'rating-desc':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return filtered;
}

function updateCategoryOptions() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '';

  getCategories().forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    if (category === state.category) {
      option.selected = true;
    }
    categoryFilter.appendChild(option);
  });
}

function updateKpis(items) {
  const totalProducts = items.length;
  const averagePrice = totalProducts > 0 ? items.reduce((sum, product) => sum + product.price, 0) / totalProducts : 0;
  const inventoryValue = items.reduce((sum, product) => sum + product.price * product.stock, 0);
  const lowStockProducts = items.filter((product) => product.stock < 10).length;

  document.getElementById('totalProductsValue').textContent = numberFormatter.format(totalProducts);
  document.getElementById('averagePriceValue').textContent = currencyFormatter.format(averagePrice);
  document.getElementById('inventoryValue').textContent = currencyFormatter.format(inventoryValue);
  document.getElementById('lowStockValue').textContent = numberFormatter.format(lowStockProducts);
}

function updateInsights(items) {
  const outOfStockCount = items.filter((product) => product.stock === 0).length;
  const categoryMap = new Map();

  items.forEach((product) => {
    categoryMap.set(product.category, (categoryMap.get(product.category) || 0) + 1);
  });

  const topCategory = [...categoryMap.entries()].sort((a, b) => b[1] - a[1])[0];

  document.getElementById('topCategory').textContent = topCategory ? topCategory[0] : '—';
  document.getElementById('outOfStockCount').textContent = numberFormatter.format(outOfStockCount);
  document.getElementById('visibleProductsCount').textContent = numberFormatter.format(items.length);
  document.getElementById('visibleProductCount').textContent = `${numberFormatter.format(items.length)} products`;

  const lastUpdated = new Date();
  document.getElementById('lastUpdatedLabel').textContent = lastUpdated.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function renderTable(items) {
  const tableBody = document.getElementById('productTableBody');
  const emptyState = document.getElementById('emptyState');

  tableBody.innerHTML = '';

  if (!items.length) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  items.forEach((product) => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = product.id;

    const nameCell = document.createElement('td');
    const name = document.createElement('button');
    name.className = 'product-name';
    name.type = 'button';
    name.textContent = product.name;
    name.dataset.productId = product.id;
    name.setAttribute('aria-label', `View details for ${product.name}`);
    nameCell.appendChild(name);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = product.category;

    const priceCell = document.createElement('td');
    priceCell.className = 'price-cell';
    priceCell.textContent = currencyFormatter.format(product.price);

    const stockCell = document.createElement('td');
    stockCell.textContent = numberFormatter.format(product.stock);

    const ratingCell = document.createElement('td');
    ratingCell.textContent = `${product.rating.toFixed(1)} ★`;

    const statusCell = document.createElement('td');
    const badge = document.createElement('span');
    const status = getStockStatus(product.stock);
    badge.textContent = status;
    badge.className = `badge ${status.toLowerCase().replace(/\s+/g, '-')}`;
    statusCell.appendChild(badge);

    row.append(idCell, nameCell, categoryCell, priceCell, stockCell, ratingCell, statusCell);
    tableBody.appendChild(row);
  });
}

function renderBarChart(svgElement, data, options = {}) {
  const {
    valueKey = 'value',
    labelKey = 'label',
    colorClass = 'bar',
    valueFormatter = (value) => value,
    interactive = false
  } = options;

  const width = 420;
  const height = 260;
  const chartPadding = { top: 18, right: 24, bottom: 36, left: 42 };
  const innerWidth = width - chartPadding.left - chartPadding.right;
  const innerHeight = height - chartPadding.top - chartPadding.bottom;

  svgElement.innerHTML = '';

  if (!data.length) {
    const emptyText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    emptyText.setAttribute('x', '50%');
    emptyText.setAttribute('y', '50%');
    emptyText.setAttribute('text-anchor', 'middle');
    emptyText.setAttribute('fill', '#64748b');
    emptyText.textContent = 'No data available';
    svgElement.appendChild(emptyText);
    return;
  }

  const maxValue = Math.max(...data.map((entry) => Number(entry[valueKey]) || 0), 1);
  const barWidth = innerWidth / data.length - 18;

  const axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  axis.setAttribute('x1', chartPadding.left);
  axis.setAttribute('y1', height - chartPadding.bottom);
  axis.setAttribute('x2', width - chartPadding.right);
  axis.setAttribute('y2', height - chartPadding.bottom);
  axis.setAttribute('class', 'axis-line');
  svgElement.appendChild(axis);

  data.forEach((entry, index) => {
    const value = Number(entry[valueKey]) || 0;
    const x = chartPadding.left + index * (barWidth + 18) + 8;
    const barHeight = (value / maxValue) * innerHeight;
    const y = height - chartPadding.bottom - barHeight;

    const mark = document.createElementNS('http://www.w3.org/2000/svg', interactive ? 'g' : 'rect');
    if (interactive) {
      mark.setAttribute('class', `chart-bar-button${state.category === entry[labelKey] ? ' is-active' : ''}`);
      mark.setAttribute('role', 'button');
      mark.setAttribute('tabindex', '0');
      mark.setAttribute('aria-label', `Filter by ${entry[labelKey]}, ${valueFormatter(value)}${colorClass === 'bar-alt' ? ' inventory value' : ' products'}`);
      mark.setAttribute('aria-pressed', String(state.category === entry[labelKey]));
      mark.dataset.category = entry[labelKey];
    }

    const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bar.setAttribute('x', x);
    bar.setAttribute('y', y);
    bar.setAttribute('width', barWidth);
    bar.setAttribute('height', barHeight);
    bar.setAttribute('rx', '8');
    bar.setAttribute('class', colorClass === 'bar-alt' ? 'bar-alt' : 'bar');
    mark.appendChild(bar);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', x + barWidth / 2);
    label.setAttribute('y', height - 14);
    label.setAttribute('text-anchor', 'middle');
    label.textContent = entry[labelKey].slice(0, 8);
    mark.appendChild(label);

    const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    valueLabel.setAttribute('x', x + barWidth / 2);
    valueLabel.setAttribute('y', y - 8);
    valueLabel.setAttribute('text-anchor', 'middle');
    valueLabel.setAttribute('class', 'label');
    valueLabel.textContent = valueFormatter(value);
    mark.appendChild(valueLabel);

    svgElement.appendChild(mark);
  });
}

function createCategoryData(items) {
  const categoryMap = new Map();

  items.forEach((product) => {
    categoryMap.set(product.category, (categoryMap.get(product.category) || 0) + 1);
  });

  return Array.from(categoryMap, ([label, value]) => ({ label, value }));
}

function createInventoryData(items) {
  const inventoryMap = new Map();

  items.forEach((product) => {
    inventoryMap.set(product.category, (inventoryMap.get(product.category) || 0) + product.price * product.stock);
  });

  return Array.from(inventoryMap, ([label, value]) => ({ label, value }));
}

function renderCharts(items) {
  const categoryData = createCategoryData(items);
  const inventoryData = createInventoryData(items);

  renderBarChart(document.getElementById('categoryChart'), categoryData, {
    valueKey: 'value',
    labelKey: 'label',
    valueFormatter: (value) => `${value}`,
    interactive: true
  });

  renderBarChart(document.getElementById('inventoryChart'), inventoryData, {
    valueKey: 'value',
    labelKey: 'label',
    valueFormatter: (value) => currencyFormatter.format(value).replace('₹', '₹'),
    colorClass: 'bar-alt',
    interactive: true
  });
}

function renderDashboard() {
  const visibleProducts = getVisibleProducts();
  updateKpis(visibleProducts);
  updateInsights(visibleProducts);
  renderTable(visibleProducts);
  renderCharts(getVisibleProducts({ ignoreCategory: true }));
  updateQuickFilterStates();
  updateExportState(visibleProducts);
}

function updateQuickFilterStates() {
  document.querySelectorAll('[data-stock-filter]').forEach((button) => {
    button.setAttribute('aria-pressed', String(state.stockFilter === button.dataset.stockFilter));
  });
}

function updateExportState(items) {
  const exportButton = document.getElementById('exportCsv');
  const feedback = document.getElementById('exportFeedback');
  exportButton.disabled = items.length === 0;
  feedback.hidden = items.length > 0;
  feedback.textContent = 'No products match the current filters. There is nothing to export.';
}

function escapeCsvCell(value) {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function exportFilteredCsv() {
  const items = getVisibleProducts();
  if (!items.length) return;

  const columns = ['Product ID', 'Product Name', 'Category', 'Price (INR)', 'Stock', 'Rating', 'Stock Status'];
  const rows = items.map((product) => [
    product.id,
    product.name,
    product.category,
    product.price,
    product.stock,
    product.rating.toFixed(1),
    getStockStatus(product.stock)
  ]);
  const csv = [columns, ...rows].map((row) => row.map(escapeCsvCell).join(',')).join('\r\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = `product-catalogue-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function openProductDetails(productId, trigger) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  document.getElementById('dialogProductName').textContent = product.name;
  document.getElementById('dialogProductId').textContent = product.id;
  document.getElementById('dialogProductCategory').textContent = product.category;
  document.getElementById('dialogProductPrice').textContent = currencyFormatter.format(product.price);
  document.getElementById('dialogInventoryValue').textContent = currencyFormatter.format(product.price * product.stock);
  document.getElementById('dialogProductStock').textContent = numberFormatter.format(product.stock);
  document.getElementById('dialogProductRating').textContent = `${product.rating.toFixed(1)} / 5`;
  document.getElementById('dialogProductStatus').textContent = getStockStatus(product.stock);

  const dialog = document.getElementById('productDialog');
  dialog.returnValue = '';
  dialogTrigger = trigger;
  dialog.showModal();
}

function closeProductDetails() {
  const dialog = document.getElementById('productDialog');
  if (dialog.open) dialog.close();
}

function filterByChartCategory(category) {
  state.category = state.category === category ? 'All Categories' : category;
  updateCategoryOptions();
  renderDashboard();
}

function attachEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const stockFilter = document.getElementById('stockFilter');
  const sortSelect = document.getElementById('sortSelect');
  const resetButton = document.getElementById('resetFilters');
  const exportButton = document.getElementById('exportCsv');
  const dialog = document.getElementById('productDialog');

  searchInput.addEventListener('input', (event) => {
    state.searchTerm = event.target.value;
    renderDashboard();
  });

  categoryFilter.addEventListener('change', (event) => {
    state.category = event.target.value;
    renderDashboard();
  });

  stockFilter.addEventListener('change', (event) => {
    state.stockFilter = event.target.value;
    renderDashboard();
  });

  sortSelect.addEventListener('change', (event) => {
    state.sortBy = event.target.value;
    renderDashboard();
  });

  resetButton.addEventListener('click', () => {
    state.searchTerm = '';
    state.category = 'All Categories';
    state.stockFilter = 'all';
    state.sortBy = 'name-asc';

    searchInput.value = '';
    updateCategoryOptions();
    stockFilter.value = 'all';
    sortSelect.value = 'name-asc';
    renderDashboard();
  });

  document.querySelectorAll('[data-stock-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      state.stockFilter = state.stockFilter === button.dataset.stockFilter ? 'all' : button.dataset.stockFilter;
      stockFilter.value = state.stockFilter;
      renderDashboard();
    });
  });

  exportButton.addEventListener('click', exportFilteredCsv);

  document.getElementById('productTableBody').addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-product-id]');
    if (trigger) openProductDetails(trigger.dataset.productId, trigger);
  });

  document.getElementById('categoryChart').addEventListener('click', (event) => {
    const bar = event.target.closest('.chart-bar-button');
    if (bar) filterByChartCategory(bar.dataset.category);
  });

  document.getElementById('inventoryChart').addEventListener('click', (event) => {
    const bar = event.target.closest('.chart-bar-button');
    if (bar) filterByChartCategory(bar.dataset.category);
  });

  [document.getElementById('categoryChart'), document.getElementById('inventoryChart')].forEach((chart) => {
    chart.addEventListener('keydown', (event) => {
      const bar = event.target.closest('.chart-bar-button');
      if (bar && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        filterByChartCategory(bar.dataset.category);
      }
    });
  });

  document.getElementById('closeProductDialog').addEventListener('click', closeProductDetails);
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) {
      event.preventDefault();
      closeProductDetails();
    }
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeProductDetails();
  });
  dialog.addEventListener('close', () => {
    if (dialogTrigger && dialogTrigger.isConnected) dialogTrigger.focus();
    dialogTrigger = null;
  });
}

function init() {
  updateCategoryOptions();
  attachEventListeners();
  renderDashboard();
}

init();
