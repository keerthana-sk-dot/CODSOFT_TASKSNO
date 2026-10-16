"use strict";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskCategory = document.getElementById("task-category");
const taskPriority = document.getElementById("task-priority");
const taskDueDate = document.getElementById("task-due-date");

const taskError = document.getElementById("task-error");
const tasksList = document.getElementById("tasks-list");
const emptyState = document.getElementById("empty-state");
const taskStatus = document.getElementById("task-status");

const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter-select");
const clearCompletedButton = document.getElementById("clear-completed");

const submitButton = document.getElementById("submit-btn");
const cancelEditButton = document.getElementById("cancel-edit");
const formHeading = document.getElementById("form-heading");
const themeToggle = document.getElementById("theme-toggle");

const STORAGE_KEY = "taskflow-todo-tasks";
const THEME_KEY = "taskflow-theme";

let tasks = loadTasks();
let editingTaskId = null;

function renderLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function loadTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === "dark";
  } catch (error) {
    console.error("Unable to load theme preference:", error);
    return false;
  }
}

function applyTheme(isDark, savePreference = true) {
  document.body.classList.toggle("dark-mode", isDark);

  themeToggle.innerHTML = isDark
    ? '<i data-lucide="sun" aria-hidden="true"></i><span>Light Mode</span>'
    : '<i data-lucide="moon" aria-hidden="true"></i><span>Dark Mode</span>';

  themeToggle.setAttribute("aria-pressed", String(isDark));

  renderLucideIcons();

  if (savePreference) {
    try {
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    } catch (error) {
      console.error("Unable to save theme preference:", error);
      showStatus("Theme changed, but the preference could not be saved.", true);
    }
  }
}

themeToggle.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark-mode");
  applyTheme(isDark);
});

function loadTasks() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return [];
    }

    const parsedData = JSON.parse(savedData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    return parsedData.filter((task) => {
      return (
        task &&
        typeof task.id === "string" &&
        typeof task.text === "string" &&
        typeof task.completed === "boolean"
      );
    });
  } catch (error) {
    console.error("Unable to load saved tasks:", error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error("Unable to save tasks:", error);
    return false;
  }
}

function createTaskId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function showStatus(message, isError = false) {
  taskStatus.textContent = message;
  taskStatus.classList.toggle("error", isError);
}

function clearStatus() {
  taskStatus.textContent = "";
  taskStatus.classList.remove("error");
}

function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const parts = dateString.split("-").map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDateClass(dateString, isCompleted) {
  if (!dateString || isCompleted) {
    return "";
  }

  const today = getTodayString();

  if (dateString < today) {
    return "overdue";
  }

  if (dateString === today) {
    return "due-today";
  }

  return "";
}

function reportSaveResult(successMessage) {
  if (saveTasks()) {
    showStatus(successMessage);
  } else {
    showStatus(
      "Your change is visible, but could not be saved in Local Storage.",
      true,
    );
  }
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearStatus();

  const text = taskInput.value.trim();

  if (!text) {
    taskError.textContent = "Please enter a task name.";
    taskInput.focus();
    return;
  }

  if (text.length < 2) {
    taskError.textContent = "Task name must contain at least 2 characters.";
    taskInput.focus();
    return;
  }

  taskError.textContent = "";

  if (editingTaskId !== null) {
    const taskToUpdate = tasks.find((task) => task.id === editingTaskId);

    if (!taskToUpdate) {
      resetEditMode();
      showStatus("This task could not be found. Please try again.", true);
      return;
    }

    taskToUpdate.text = text;
    taskToUpdate.category = taskCategory.value;
    taskToUpdate.priority = taskPriority.value;
    taskToUpdate.dueDate = taskDueDate.value;

    resetEditMode();
    renderTasks();
    reportSaveResult("Task updated successfully.");
    return;
  }

  const newTask = {
    id: createTaskId(),
    text: text,
    category: taskCategory.value,
    priority: taskPriority.value,
    dueDate: taskDueDate.value,
    completed: false,
    createdAt: Date.now(),
  };

  tasks.unshift(newTask);

  taskForm.reset();
  taskCategory.value = "Personal";
  taskPriority.value = "Medium";

  renderTasks();
  reportSaveResult("Task added successfully.");
});

function resetEditMode() {
  editingTaskId = null;

  taskForm.reset();

  taskCategory.value = "Personal";
  taskPriority.value = "Medium";

  taskError.textContent = "";
  submitButton.textContent = "+ Add Task";
  formHeading.textContent = "Add a New Task";
  cancelEditButton.hidden = true;
}

cancelEditButton.addEventListener("click", function () {
  resetEditMode();
  clearStatus();
});

function renderTasks() {
  tasksList.replaceChildren();

  const query = searchInput.value.trim().toLowerCase();
  const selectedFilter = filterSelect.value;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.length - completedTasks;

  totalCount.textContent = tasks.length;
  pendingCount.textContent = pendingTasks;
  completedCount.textContent = completedTasks;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = [task.text, task.category, task.priority].some(
      (value) => {
        return String(value || "")
          .toLowerCase()
          .includes(query);
      },
    );

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "pending" && !task.completed) ||
      (selectedFilter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  filteredTasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return Number(a.completed) - Number(b.completed);
    }

    return (b.createdAt || 0) - (a.createdAt || 0);
  });

  filteredTasks.forEach((task) => {
    tasksList.appendChild(createTaskCard(task));
  });

  emptyState.hidden = filteredTasks.length > 0;

  if (filteredTasks.length === 0 && tasks.length > 0) {
    emptyState.textContent = "No tasks match your search or filter.";
  } else if (tasks.length === 0) {
    emptyState.textContent = "No tasks yet. Add your first task above!";
  }
}

function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = "task-card";

  if (task.completed) {
    card.classList.add("is-completed");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.completed;

  checkbox.setAttribute(
    "aria-label",
    `Mark ${task.text} as ${task.completed ? "pending" : "completed"}`,
  );

  checkbox.addEventListener("change", function () {
    task.completed = checkbox.checked;
    renderTasks();

    reportSaveResult(
      task.completed ? "Task marked as completed." : "Task marked as pending.",
    );
  });

  const content = document.createElement("div");
  content.className = "task-content";

  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.text;

  const meta = document.createElement("div");
  meta.className = "task-meta";

  const categoryBadge = document.createElement("span");
  categoryBadge.className = "task-badge";
  categoryBadge.textContent = task.category || "Personal";

  const priorityBadge = document.createElement("span");

  const priorityClass = ["High", "Medium", "Low"].includes(task.priority)
    ? task.priority.toLowerCase()
    : "medium";

  priorityBadge.className = `task-badge priority-${priorityClass}`;

  priorityBadge.textContent = `${task.priority || "Medium"} Priority`;

  meta.append(categoryBadge, priorityBadge);

  if (task.dueDate) {
    const dateLabel = document.createElement("span");
    dateLabel.className = "task-date";

    const dateClass = getDateClass(task.dueDate, task.completed);

    if (dateClass) {
      dateLabel.classList.add(dateClass);
    }

    let dateText = `Due: ${formatDate(task.dueDate)}`;

    if (!task.completed && dateClass === "overdue") {
      dateText += " (Overdue)";
    } else if (!task.completed && dateClass === "due-today") {
      dateText += " (Today)";
    }

    dateLabel.textContent = dateText;
    meta.appendChild(dateLabel);
  }

  content.append(title, meta);

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "btn btn-secondary btn-small";
  editButton.textContent = "Edit";
  editButton.setAttribute("aria-label", `Edit ${task.text}`);

  editButton.addEventListener("click", function () {
    editingTaskId = task.id;

    taskInput.value = task.text;
    taskCategory.value = task.category || "Personal";
    taskPriority.value = task.priority || "Medium";
    taskDueDate.value = task.dueDate || "";

    taskError.textContent = "";
    clearStatus();

    submitButton.textContent = "Update Task";
    formHeading.textContent = "Edit Task";
    cancelEditButton.hidden = false;

    taskForm.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    taskInput.focus();
  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "btn btn-danger btn-small";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", `Delete ${task.text}`);

  deleteButton.addEventListener("click", function () {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.text}"?`,
    );

    if (!confirmed) {
      return;
    }

    tasks = tasks.filter((item) => item.id !== task.id);

    if (editingTaskId === task.id) {
      resetEditMode();
    }

    renderTasks();
    reportSaveResult("Task deleted successfully.");
  });

  actions.append(editButton, deleteButton);
  card.append(checkbox, content, actions);

  return card;
}

searchInput.addEventListener("input", function () {
  renderTasks();
});

filterSelect.addEventListener("change", function () {
  renderTasks();
});

clearCompletedButton.addEventListener("click", function () {
  const completedTasks = tasks.filter((task) => task.completed);

  if (completedTasks.length === 0) {
    showStatus("There are no completed tasks to clear.");
    return;
  }

  const confirmed = window.confirm(
    `Delete all ${completedTasks.length} completed task(s)?`,
  );

  if (!confirmed) {
    return;
  }

  tasks = tasks.filter((task) => !task.completed);

  if (
    editingTaskId !== null &&
    !tasks.some((task) => task.id === editingTaskId)
  ) {
    resetEditMode();
  }

  renderTasks();
  reportSaveResult("Completed tasks cleared.");
});

applyTheme(loadTheme(), false);
renderTasks();
