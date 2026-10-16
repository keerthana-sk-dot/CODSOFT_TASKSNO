
const STORAGE_KEY = "expenseTrackerTransactions";
const THEME_KEY = "expenseTrackerTheme";
const PAGE_SIZE = 5;

const CATEGORY_COLORS = {
  Food: "#7548e8",
  Transport: "#ffae32",
  Shopping: "#e968a9",
  Bills: "#3188ef",
  Health: "#26b2c1",
  Entertainment: "#b54ce8",
  Salary: "#20ad8c",
  Freelance: "#f47c42",
  Other: "#8791b5"
};

const form = document.getElementById("transactionForm");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");
const formError = document.getElementById("formError");
const transactionRows = document.getElementById("transactionRows");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sideCategoryFilter = document.getElementById("sideCategoryFilter");
const toast = document.getElementById("toast");

let transactions = loadTransactions();
let selectedType = "income";
let editingId = null;
let currentPage = 1;
let toastTimer;

function localISODate(date = new Date()) {
  const local = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );

  return local.toISOString().slice(0, 10);
}

dateInput.value = localISODate();
 
function loadTransactions() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    return Array.isArray(stored)
      ? stored.filter(
          item =>
            item &&
            typeof item.id === "string" &&
            Number.isFinite(Number(item.amount)) &&
            Number(item.amount) > 0 &&
            (item.type === "income" || item.type === "expense") &&
            typeof item.description === "string" &&
            typeof item.category === "string" &&
            typeof item.date === "string"
        )
      : [];
  } catch {
    return [];
  }
}

function saveTransactions() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(transactions)
    );
  } catch {
    showToast("Unable to save data in this browser.");
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(value);
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function getTotals() {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return {
    income,
    expenses,
    balance: income - expenses
  };
}

function renderSummary() {
  const totals = getTotals();

  document.getElementById("totalIncome").textContent =
    formatCurrency(totals.income);

  document.getElementById("totalExpenses").textContent =
    formatCurrency(totals.expenses);

  document.getElementById("currentBalance").textContent =
    formatCurrency(totals.balance);

  document.getElementById("incomeCount").textContent =
    `↑ ${transactions.filter(t => t.type === "income").length} transactions`;

  document.getElementById("expenseCount").textContent =
    `↑ ${transactions.filter(t => t.type === "expense").length} transactions`;

  document.getElementById("donutTotal").textContent =
    formatCurrency(totals.expenses);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function getFilteredTransactions() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  return [...transactions]
    .filter(transaction => {
      const searchableText =
        `${transaction.description} ${transaction.category} ${transaction.type}`
          .toLowerCase();

      const matchesSearch = searchableText.includes(query);

      const matchesCategory =
        category === "all" ||
        transaction.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) =>
      b.date.localeCompare(a.date) ||
      (b.createdAt || 0) - (a.createdAt || 0)
    );
}

function renderTransactions() {
  const filtered = getFilteredTransactions();

  const pageCount = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  currentPage = Math.min(currentPage, pageCount);

  const start = (currentPage - 1) * PAGE_SIZE;

  const visible = filtered.slice(
    start,
    start + PAGE_SIZE
  );

  transactionRows.innerHTML = visible.map(transaction => `
    <tr>
      <td>
        <input
          class="row-check"
          type="checkbox"
          aria-label="Select ${escapeHTML(transaction.description)}">
      </td>

      <td>${formatDate(transaction.date)}</td>

      <td>${escapeHTML(transaction.description)}</td>

      <td>
        <span class="transaction-category">
          ${escapeHTML(transaction.category)}
        </span>
      </td>

      <td>
        <span class="transaction-type ${transaction.type}">
          ${transaction.type === "income" ? "Income" : "Expense"}
        </span>
      </td>

      <td class="amount ${transaction.type}">
        ${transaction.type === "income" ? "+" : "−"}
        ${formatCurrency(Number(transaction.amount))}
      </td>

      <td>
        <button
          class="action-btn edit-btn"
          data-action="edit"
          data-id="${transaction.id}"
          aria-label="Edit ${escapeHTML(transaction.description)}"
          title="Edit">
          ✎
        </button>

        <button
          class="action-btn delete-btn"
          data-action="delete"
          data-id="${transaction.id}"
          aria-label="Delete ${escapeHTML(transaction.description)}"
          title="Delete">
          🗑
        </button>
      </td>
    </tr>
  `).join("");

  emptyState.hidden = visible.length > 0;

  document.getElementById("transactionCount").textContent =
    filtered.length
      ? `Showing ${start + 1}–${Math.min(
          start + PAGE_SIZE,
          filtered.length
        )} of ${filtered.length} transactions`
      : "Showing 0 transactions";

  document.getElementById("pageNumber").textContent =
    currentPage;

  document.getElementById("prevPage").disabled =
    currentPage <= 1;

  document.getElementById("nextPage").disabled =
    currentPage >= pageCount;
}

function renderCategoryChart() {
  const expenses = transactions.filter(
    transaction => transaction.type === "expense"
  );

  const total = expenses.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  );

  const categoryTotals = {};

  expenses.forEach(transaction => {
    categoryTotals[transaction.category] =
      (categoryTotals[transaction.category] || 0) +
      Number(transaction.amount);
  });

  const entries = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]);

  const chart = document.getElementById("donutChart");
  const legend = document.getElementById("categoryLegend");

  if (total === 0 || entries.length === 0) {
    chart.style.background =
      "conic-gradient(#dfe3f2 0 100%)";

    legend.innerHTML =
      '<p class="legend-value">No expenses yet</p>';

    return;
  }

  let position = 0;

  const segments = entries.map(([category, amount]) => {
    const start = position;

    position += (amount / total) * 100;

    const color =
      CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;

    return `${color} ${start}% ${position}%`;
  });

  chart.style.background =
    `conic-gradient(${segments.join(",")})`;

  legend.innerHTML = entries.map(([category, amount]) => `
    <div class="legend-row">
      <span
        class="legend-color"
        style="background:${CATEGORY_COLORS[category] || CATEGORY_COLORS.Other}">
      </span>

      <span>${escapeHTML(category)}</span>

      <span class="legend-value">
        ${Math.round((amount / total) * 100)}%
        &nbsp; ${formatCurrency(amount)}
      </span>
    </div>
  `).join("");
}

function renderMonthlyChart() {
  const now = new Date();
  const months = [];

  for (let offset = 5; offset >= 0; offset--) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - offset,
      1
    );

    const key =
      `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

    const income = transactions
      .filter(t =>
        t.type === "income" &&
        t.date.startsWith(key)
      )
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
      .filter(t =>
        t.type === "expense" &&
        t.date.startsWith(key)
      )
      .reduce((sum, t) => sum + Number(t.amount), 0);

    months.push({
      label: date.toLocaleDateString("en-IN", {
        month: "short"
      }),
      income,
      expense
    });
  }

  const max = Math.max(
    1,
    ...months.flatMap(month => [
      month.income,
      month.expense
    ])
  );

  document.getElementById("monthlyChart").innerHTML =
    months.map(month => `
      <div
        class="month-group"
        title="${month.label}: income ${formatCurrency(month.income)}, expenses ${formatCurrency(month.expense)}">

        <div class="bar-pair">
          <div
            class="bar income"
            style="height:${month.income ? Math.max(4, month.income / max * 100) : 0}%">
          </div>

          <div
            class="bar expense"
            style="height:${month.expense ? Math.max(4, month.expense / max * 100) : 0}%">
          </div>
        </div>

        <span class="month-label">${month.label}</span>
      </div>
    `).join("");
}

function renderInsight() {
  const expenses = transactions.filter(
    transaction => transaction.type === "expense"
  );

  const total = expenses.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  );

  const categoryTotals = {};

  expenses.forEach(transaction => {
    categoryTotals[transaction.category] =
      (categoryTotals[transaction.category] || 0) +
      Number(transaction.amount);
  });

  const topCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0];

  const insight = document.getElementById("quickInsight");

  if (!topCategory || total === 0) {
    insight.textContent =
      "Add a few transactions to see your spending insights here.";
    return;
  }

  const percentage = Math.round(
    (topCategory[1] / total) * 100
  );

  insight.textContent =
    `You’ve spent ${percentage}% of your expenses on ${topCategory[0]}. Review this category to plan your budget and save more!`;
}

function renderAll() {
  renderSummary();
  renderTransactions();
  renderCategoryChart();
  renderMonthlyChart();
  renderInsight();
}

function setType(type) {
  selectedType = type;

  document.querySelectorAll(".type-button").forEach(button => {
    const active = button.dataset.type === type;

    button.classList.toggle("selected", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (
    type === "income" &&
    !["Salary", "Freelance", "Other"].includes(categoryInput.value)
  ) {
    categoryInput.value = "Salary";
  }

  if (
    type === "expense" &&
    ["Salary", "Freelance"].includes(categoryInput.value)
  ) {
    categoryInput.value = "Food";
  }
}

function resetForm() {
  form.reset();

  editingId = null;
  dateInput.value = localISODate();
  categoryInput.value = "Salary";

  setType("income");

  document.getElementById("formTitle").textContent =
    "Add Transaction";

  document.getElementById("submitButton").textContent =
    "Add Transaction";

  document.getElementById("cancelEdit").hidden = true;

  formError.textContent = "";
}

function startEdit(id) {
  const transaction = transactions.find(
    item => item.id === id
  );

  if (!transaction) return;

  editingId = id;

  amountInput.value = transaction.amount;
  categoryInput.value = transaction.category;
  dateInput.value = transaction.date;
  descriptionInput.value = transaction.description;

  setType(transaction.type);
  categoryInput.value = transaction.category;

  document.getElementById("formTitle").textContent =
    "Edit Transaction";

  document.getElementById("submitButton").textContent =
    "Save Changes";

  document.getElementById("cancelEdit").hidden = false;

  formError.textContent = "";

  document.querySelector(".add-panel").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  const date = dateInput.value;
  const description = descriptionInput.value.trim();

  if (!Number.isFinite(amount) || amount <= 0) {
    formError.textContent =
      "Please enter an amount greater than zero.";

    amountInput.focus();
    return;
  }

  if (!date || date > localISODate()) {
    formError.textContent =
      "Please choose a valid date that is not in the future.";

    dateInput.focus();
    return;
  }

  if (!description) {
    formError.textContent =
      "Please enter a short description.";

    descriptionInput.focus();
    return;
  }

  const transactionData = {
    amount,
    category,
    date,
    description,
    type: selectedType
  };

  if (editingId) {
    transactions = transactions.map(transaction =>
      transaction.id === editingId
        ? { ...transaction, ...transactionData }
        : transaction
    );

    showToast("Transaction updated successfully.");
  } else {
    const id = window.crypto?.randomUUID
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;

    transactions.push({
      id,
      ...transactionData,
      createdAt: Date.now()
    });

    showToast("Transaction added successfully.");
  }

  saveTransactions();
  resetForm();

  currentPage = 1;
  renderAll();
});

document.querySelectorAll(".type-button").forEach(button => {
  button.addEventListener("click", () => {
    setType(button.dataset.type);
  });
});

document.getElementById("cancelEdit").addEventListener(
  "click",
  resetForm
);

transactionRows.addEventListener("click", event => {
  const button = event.target.closest(
    "button[data-action]"
  );

  if (!button) return;

  const { action, id } = button.dataset;

  if (action === "edit") {
    startEdit(id);
  }

  if (action === "delete") {
    const transaction = transactions.find(
      item => item.id === id
    );

    if (!transaction) return;

    if (confirm(`Delete "${transaction.description}"?`)) {
      transactions = transactions.filter(
        item => item.id !== id
      );

      saveTransactions();

      if (editingId === id) {
        resetForm();
      }

      renderAll();
      showToast("Transaction deleted.");
    }
  }
});

searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderTransactions();
});

categoryFilter.addEventListener("change", () => {
  sideCategoryFilter.value = categoryFilter.value;
  currentPage = 1;
  renderTransactions();
});

sideCategoryFilter.addEventListener("change", () => {
  categoryFilter.value = sideCategoryFilter.value;
  currentPage = 1;
  renderTransactions();
});

document.getElementById("prevPage").addEventListener(
  "click",
  () => {
    currentPage--;
    renderTransactions();
  }
);

document.getElementById("nextPage").addEventListener(
  "click",
  () => {
    currentPage++;
    renderTransactions();
  }
);

document.getElementById("themeToggle").addEventListener(
  "click",
  () => {
    const dark = document.body.classList.toggle("dark-mode");

    localStorage.setItem(
      THEME_KEY,
      dark ? "dark" : "light"
    );

    document.getElementById("themeToggle").setAttribute(
      "aria-pressed",
      String(dark)
    );
  }
);

if (localStorage.getItem(THEME_KEY) === "dark") {
  document.body.classList.add("dark-mode");

  document.getElementById("themeToggle").setAttribute(
    "aria-pressed",
    "true"
  );
}

document.getElementById("mobileMenu").addEventListener(
  "click",
  () => {
    document.getElementById("sidebar").classList.toggle("open");
  }
);

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(item => {
      item.classList.remove("active");
    });

    link.classList.add("active");

    if (window.innerWidth <= 760) {
      document.getElementById("sidebar").classList.remove("open");
    }
  });
});

categoryInput.value = "Salary";
setType("income");
renderAll();
