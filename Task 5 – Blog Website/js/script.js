
"use strict";

const articles = [
  {
    id: 1,
    title: "Building a calmer relationship with technology",
    category: "Technology",
    tags: ["Productivity", "Digital Wellness"],
    author: "Jordan Lee",
    date: "Oct 12, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    excerpt: "Small, intentional changes can help us use our devices with more purpose.",
    content: "Technology is part of almost every area of our lives. Instead of trying to avoid it completely, we can learn to use it intentionally. Turn off unnecessary notifications, create screen-free moments, and choose tools that genuinely help you. A calmer digital life starts with small daily decisions."
  },
  {
    id: 2,
    title: "The quiet art of slowing down",
    category: "Lifestyle",
    tags: ["Mindfulness", "Slow Living"],
    author: "Maya Wilson",
    date: "Oct 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
    excerpt: "Discover why making space in your day can help you enjoy life more.",
    content: "A busy schedule can make every day feel like a race. Slowing down does not mean giving up on your goals. It means making room to notice the small things around you. Take a short walk, enjoy your morning drink without a screen, or spend a few minutes writing down your thoughts."
  },
  {
    id: 3,
    title: "Finding inspiration in everyday places",
    category: "Creativity",
    tags: ["Inspiration", "Creativity"],
    author: "Alex Morgan",
    date: "Oct 8, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    excerpt: "Creative ideas often begin with the simple things we usually overlook.",
    content: "Creativity does not always arrive as a sudden brilliant idea. Sometimes it begins with a conversation, a walk, or a question you cannot stop thinking about. Keep a notebook of interesting observations. Give yourself permission to experiment and remember that your first attempt does not have to be perfect."
  },
  {
    id: 4,
    title: "A weekend guide to travelling mindfully",
    category: "Travel",
    tags: ["Travel Tips", "Mindful Travel"],
    author: "Sam Carter",
    date: "Oct 6, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
    excerpt: "Make your next short trip more memorable by focusing on the experience.",
    content: "A memorable trip does not need a packed itinerary. Leave some time to explore without a strict plan, speak with local people, and try something new. Take photographs when you want to remember a moment, but also put your camera away and enjoy being there."
  },
  {
    id: 5,
    title: "Learning new skills one day at a time",
    category: "Lifestyle",
    tags: ["Learning", "Personal Growth"],
    author: "Maya Wilson",
    date: "Oct 4, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
    excerpt: "A practical approach to learning without feeling overwhelmed.",
    content: "Learning a new skill can feel difficult when you focus only on the final goal. Break the process into small tasks. Practise regularly, review what you have learned, and make notes about questions that remain. Progress becomes easier to see when you record your efforts."
  },
  {
    id: 6,
    title: "How the web keeps changing",
    category: "Technology",
    tags: ["Web Development", "Technology"],
    author: "Jordan Lee",
    date: "Oct 2, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    excerpt: "Explore how modern web tools are changing the way we build digital experiences.",
    content: "The web continues to evolve as developers find new ways to create useful digital experiences. Modern tools can improve performance, accessibility, and development workflows. However, good websites still depend on clear content, thoughtful design, and a focus on the people who use them."
  },
  {
    id: 7,
    title: "Make room for a little more reading",
    category: "Lifestyle",
    tags: ["Reading", "Daily Habits"],
    author: "Maya Wilson",
    date: "Sep 29, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80",
    excerpt: "Simple ways to make reading a comfortable part of your routine.",
    content: "Reading regularly does not require finishing a book every week. Start with a few pages a day. Keep a book near your favourite chair or choose a regular time to read. Try different subjects until you find the kinds of stories that make you want to return."
  },
  {
    id: 8,
    title: "The beauty of exploring somewhere new",
    category: "Travel",
    tags: ["Exploration", "Adventure"],
    author: "Sam Carter",
    date: "Sep 26, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    excerpt: "You do not need to travel far to discover a different perspective.",
    content: "Exploration can begin in your own neighbourhood or in a place you have passed many times. Choose a different route, visit a local market, or spend time in a nearby park. Paying attention to unfamiliar details can make even an ordinary afternoon feel like an adventure."
  },
  {
    id: 9,
    title: "A simple routine for creative thinking",
    category: "Creativity",
    tags: ["Creative Habits", "Inspiration"],
    author: "Alex Morgan",
    date: "Sep 23, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    excerpt: "Build a small daily habit that gives new ideas room to grow.",
    content: "Creative thinking benefits from regular practice. Set aside a short period to write, sketch, plan, or explore a question. Do not judge every idea while you are creating it. Collect your thoughts first, then return later to decide which ones deserve more attention."
  },
  {
    id: 10,
    title: "Designing a workspace that helps you focus",
    category: "Technology",
    tags: ["Workspace", "Productivity"],
    author: "Jordan Lee",
    date: "Sep 20, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    excerpt: "Small changes to your work environment can make tasks feel easier.",
    content: "A helpful workspace does not need expensive furniture. Keep frequently used items nearby, remove distractions, and make sure your lighting is comfortable. Organise your digital files as well as your physical desk. The goal is to make it easier to begin and continue your work."
  }
];

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

const postsContainer = $("#posts");
const searchInput = $("#search");
const sidebarSearch = $("#sidebarSearch");
const categoryFilters = $("#categoryFilters");
const countElement = $("#count");
const emptyMessage = $("#empty");
const loadMoreButton = $("#loadMore");
const sortPosts = $("#sortPosts");

const themeButton = $("#theme");
const menuButton = $("#menu");
const navigation = $("#nav");

const dialog = $("#dialog");
const closeButton = $("#close");
const articleContent = $("#articleContent");

const newsletterForm = $("#newsletter");
const newsletterMessage = $("#newsletterMessage");
const toast = $("#toast");

let activeCategory = "All";
let activeTag = "";
let visibleCount = 6;
let currentArticleId = null;
let toastTimer;


function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function parseArticleDate(date) {
  return new Date(`${date}, 2026`);
}

function getSearchTerm() {
  return (searchInput?.value || "").trim().toLowerCase();
}

function syncSearchInputs(value) {
  if (searchInput) searchInput.value = value;
  if (sidebarSearch) sidebarSearch.value = value;
}

function getRelatedArticles(article, limit = 3) {
  return articles
    .filter(item => item.id !== article.id)
    .map(item => ({
      article: item,
      score:
        (item.category === article.category ? 2 : 0) +
        item.tags.filter(tag => article.tags.includes(tag)).length
    }))
    .filter(item => item.score > 0)
    .sort((a, b) =>
      b.score - a.score ||
      parseArticleDate(b.article.date) -
      parseArticleDate(a.article.date)
    )
    .slice(0, limit)
    .map(item => item.article);
}


function getFilteredArticles() {
  const searchTerm = getSearchTerm();

  let filtered = articles.filter(article => {
    const matchesCategory =
      activeCategory === "All" ||
      article.category === activeCategory;

    const matchesTag =
      !activeTag ||
      article.tags.some(tag =>
        tag.toLowerCase() === activeTag.toLowerCase()
      );

    const searchableText = [
      article.title,
      article.category,
      article.author,
      article.excerpt,
      article.content,
      ...article.tags
    ].join(" ").toLowerCase();

    return (
      matchesCategory &&
      matchesTag &&
      searchableText.includes(searchTerm)
    );
  });

  const sortValue = sortPosts?.value || "latest";

  if (sortValue === "oldest") {
    filtered.sort((a, b) =>
      parseArticleDate(a.date) - parseArticleDate(b.date)
    );
  } else if (sortValue === "title") {
    filtered.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else {
    filtered.sort((a, b) =>
      parseArticleDate(b.date) - parseArticleDate(a.date)
    );
  }

  return filtered;
}

function renderArticles() {
  if (!postsContainer) return;

  const filteredArticles = getFilteredArticles();
  const displayedArticles = filteredArticles.slice(0, visibleCount);

  postsContainer.innerHTML = displayedArticles.map(article => `
    <article class="post-card">
      <div class="post-image">
        <img
          src="${escapeHTML(article.image)}"
          alt="${escapeHTML(article.title)}"
          loading="lazy"
        >
        <span class="post-category">
          ${escapeHTML(article.category)}
        </span>
      </div>

      <div class="post-content">
        <div class="post-meta">
          <span>${escapeHTML(article.date)}</span>
          <span>·</span>
          <span>${escapeHTML(article.readTime)}</span>
        </div>

        <h3>${escapeHTML(article.title)}</h3>
        <p>${escapeHTML(article.excerpt)}</p>

        <div class="post-tags" aria-label="Article tags">
          ${article.tags.map(tag => `
            <button
              type="button"
              class="post-tag tag-button"
              data-tag="${escapeHTML(tag)}"
              aria-label="Filter by ${escapeHTML(tag)}"
            >${escapeHTML(tag)}</button>
          `).join("")}
        </div>

        <div class="post-actions">
          <button type="button" data-open="${article.id}">
            Read story ↗
          </button>
          <button
            type="button"
            data-share="${article.id}"
            aria-label="Share ${escapeHTML(article.title)}"
          >Share ↗</button>
        </div>
      </div>
    </article>
  `).join("");

  if (countElement) {
    countElement.textContent =
      `${filteredArticles.length} ` +
      `${filteredArticles.length === 1 ? "story" : "stories"}`;
  }

  if (emptyMessage) {
    emptyMessage.classList.toggle(
      "hidden",
      filteredArticles.length !== 0
    );
  }

  if (loadMoreButton) {
    loadMoreButton.classList.toggle(
      "hidden",
      visibleCount >= filteredArticles.length
    );
  }
}


function setCategory(category) {
  activeCategory = category;
  activeTag = "";
  visibleCount = 6;

  if (categoryFilters) {
    $$("[data-category]", categoryFilters).forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.category === category
      );
    });
  }

  renderArticles();
}

if (categoryFilters) {
  categoryFilters.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (button) setCategory(button.dataset.category);
  });
}

$$("[data-sidebar-category]").forEach(button => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.sidebarCategory);

    $("#articles")?.scrollIntoView({ behavior: "smooth" });
  });
});


document.addEventListener("click", event => {
  const tagButton = event.target.closest("[data-tag]");
  if (!tagButton) return;

  activeTag = tagButton.dataset.tag;
  activeCategory = "All";
  visibleCount = 6;

  if (categoryFilters) {
    $$("[data-category]", categoryFilters).forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.category === "All"
      );
    });
  }

  syncSearchInputs("");
  renderArticles();

  $("#articles")?.scrollIntoView({ behavior: "smooth" });
});


if (searchInput) {
  searchInput.addEventListener("input", () => {
    syncSearchInputs(searchInput.value);
    visibleCount = 6;
    renderArticles();
  });
}

if (sidebarSearch) {
  sidebarSearch.addEventListener("input", () => {
    syncSearchInputs(sidebarSearch.value);
    visibleCount = 6;
    renderArticles();
  });
}


if (sortPosts) {
  sortPosts.addEventListener("change", () => {
    visibleCount = 6;
    renderArticles();
  });
}

if (loadMoreButton) {
  loadMoreButton.addEventListener("click", () => {
    visibleCount += 3;
    renderArticles();
  });
}


function openArticle(articleId) {
  const article = articles.find(
    item => item.id === Number(articleId)
  );

  if (!article || !dialog || !articleContent) return;

  currentArticleId = article.id;

  const related = getRelatedArticles(article);

  articleContent.innerHTML = `
    <small class="eyebrow">
      ${escapeHTML(article.category)} ·
      ${escapeHTML(article.readTime)}
    </small>

    <h2>${escapeHTML(article.title)}</h2>

    <p class="muted">
      By ${escapeHTML(article.author)} ·
      ${escapeHTML(article.date)}
    </p>

    <img
      src="${escapeHTML(article.image)}"
      alt="${escapeHTML(article.title)}"
    >

    <div class="post-tags" aria-label="Article tags">
      ${article.tags.map(tag => `
        <button
          type="button"
          class="post-tag tag-button"
          data-tag="${escapeHTML(tag)}"
        >${escapeHTML(tag)}</button>
      `).join("")}
    </div>

    <p>${escapeHTML(article.content)}</p>

    <div class="post-actions">
      <button type="button" data-share="${article.id}">
        Share story ↗
      </button>
    </div>

    <section class="related-section">
      <h3>Related stories</h3>
      <div class="related-list">
        ${related.length ? related.map(item => `
          <button
            type="button"
            class="related-story"
            data-open="${item.id}"
          >
            <img src="${escapeHTML(item.image)}"
              alt="" loading="lazy">
            <span>
              <strong>${escapeHTML(item.title)}</strong>
              <small>${escapeHTML(item.category)} · ${escapeHTML(item.readTime)}</small>
            </span>
            <span aria-hidden="true">↗</span>
          </button>
        `).join("") : `
          <p class="muted">No related stories yet.</p>
        `}
      </div>
    </section>

    <section class="comments-section">
      <h3>Comments</h3>
      <div id="commentsList"></div>

      <form id="commentForm">
        <label for="commentName">Your name</label>
        <input
          id="commentName"
          name="name"
          type="text"
          maxlength="50"
          placeholder="Enter your name"
          required
        >

        <label for="commentText">Your comment</label>
        <textarea
          id="commentText"
          name="comment"
          maxlength="500"
          placeholder="Write your thoughts..."
          required
        ></textarea>

        <button class="button primary" type="submit">
          Post comment
        </button>
      </form>
    </section>
  `;

  renderComments(article.id);

  if (!dialog.open) dialog.showModal();
}

if (closeButton && dialog) {
  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    currentArticleId = null;
  });
}


function getComments(articleId) {
  try {
    const saved = JSON.parse(
      localStorage.getItem("lumeBlogComments") || "{}"
    );

    return Array.isArray(saved[articleId])
      ? saved[articleId]
      : [];
  } catch {
    return [];
  }
}

function renderComments(articleId) {
  const commentsList = $("#commentsList");
  if (!commentsList) return;

  const comments = getComments(articleId);

  if (comments.length === 0) {
    commentsList.innerHTML = `
      <p class="muted">Be the first to share your thoughts.</p>
    `;
    return;
  }

  commentsList.innerHTML = comments.map(comment => `
    <div class="comment">
      <strong>${escapeHTML(comment.name)}</strong>
      <p>${escapeHTML(comment.text)}</p>
      <small class="muted">${escapeHTML(comment.date)}</small>
    </div>
  `).join("");
}

if (articleContent) {
  articleContent.addEventListener("submit", event => {
    if (event.target.id !== "commentForm") return;

    event.preventDefault();

    const name = $("#commentName", articleContent)?.value.trim();
    const text = $("#commentText", articleContent)?.value.trim();

    if (!name || !text || !currentArticleId) {
      showToast("Please complete both comment fields.");
      return;
    }

    try {
      const saved = JSON.parse(
        localStorage.getItem("lumeBlogComments") || "{}"
      );

      if (!Array.isArray(saved[currentArticleId])) {
        saved[currentArticleId] = [];
      }

      saved[currentArticleId].push({
        name,
        text,
        date: new Date().toLocaleDateString()
      });

      localStorage.setItem(
        "lumeBlogComments",
        JSON.stringify(saved)
      );

      renderComments(currentArticleId);
      event.target.reset();
      showToast("Comment saved on this browser.");
    } catch {
      showToast("Unable to save the comment.");
    }
  });
}


async function shareArticle(articleId) {
  const article = articles.find(
    item => item.id === Number(articleId)
  );

  if (!article) return;

  const shareText = `${article.title} — ${article.excerpt}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: shareText,
        url: window.location.href
      });
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(
        `${shareText}\n${window.location.href}`
      );

      showToast("Story details copied!");
    } else {
      showToast("Sharing is not supported in this browser.");
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      showToast("Unable to share this story.");
    }
  }
}

document.addEventListener("click", event => {
  const openButton = event.target.closest("[data-open]");
  const shareButton = event.target.closest("[data-share]");

  if (openButton) {
    openArticle(openButton.dataset.open);
  } else if (shareButton) {
    shareArticle(shareButton.dataset.share);
  }
});

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);

  if (themeButton) {
    themeButton.textContent = isDark ? "☀" : "☾";
    themeButton.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

let isDarkMode = false;

try {
  isDarkMode = localStorage.getItem("lumeBlogTheme") === "dark";
} catch {
  isDarkMode = false;
}

applyTheme(isDarkMode);

if (themeButton) {
  themeButton.addEventListener("click", () => {
    isDarkMode = !document.body.classList.contains("dark");
    applyTheme(isDarkMode);

    try {
      localStorage.setItem(
        "lumeBlogTheme",
        isDarkMode ? "dark" : "light"
      );
    } catch {
    }
  });
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuButton.textContent = isOpen ? "×" : "☰";
  });

  $$("a", navigation).forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.textContent = "☰";
    });
  });
}


if (newsletterForm && newsletterMessage) {
  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();

    const emailInput = $("#email");
    const email = emailInput?.value.trim() || "";

    if (!email) {
      newsletterMessage.textContent =
        "Please enter your email address.";
      return;
    }

    newsletterMessage.textContent =
      "Thanks for your interest! This is a demo; no email was sent.";

    newsletterForm.reset();
  });
}


const yearElement = $("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

renderArticles();
