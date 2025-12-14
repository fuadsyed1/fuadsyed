// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Close mobile menu after click
    navLinks?.classList.remove("open");
  });
});

// Theme toggle (dark/light) with localStorage
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

function updateThemeIcon() {
  const current = document.documentElement.getAttribute("data-theme");
  if (themeToggle) themeToggle.textContent = current === "light" ? "🌙" : "☀️";
}
updateThemeIcon();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "" : "light";

    if (next) document.documentElement.setAttribute("data-theme", next);
    else document.documentElement.removeAttribute("data-theme");

    localStorage.setItem("theme", next || "");
    updateThemeIcon();
  });
}

// Projects: search + filter
const searchInput = document.getElementById("projectSearch");
const filterSelect = document.getElementById("projectFilter");
const projectCards = Array.from(document.querySelectorAll(".project"));

function applyProjectFilters() {
  const q = (searchInput?.value || "").toLowerCase().trim();
  const filter = filterSelect?.value || "all";

  projectCards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const tags = (card.getAttribute("data-tags") || "").split(" ");

    const matchesSearch = !q || text.includes(q);
    const matchesFilter = filter === "all" || tags.includes(filter);

    card.style.display = (matchesSearch && matchesFilter) ? "" : "none";
  });
}

searchInput?.addEventListener("input", applyProjectFilters);
filterSelect?.addEventListener("change", applyProjectFilters);

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
