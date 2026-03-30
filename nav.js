// ─── CATEGORY ROUTES ───────────────────────────────────────────────────────
// Maps filter button text to their dedicated category pages.
// Add new entries here as you create more category pages.
const categoryRoutes = {
  'Data Visualizations': 'data_viz/data_viz.html',
  // 'Machine Learning': 'machine-learning.html',
  // 'NLP': 'nlp.html',
  // 'Computer Vision': 'computer-vision.html',
};

// ─── FILTER BUTTONS ────────────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const label = this.textContent.trim().replace(/\d+$/, '').trim();

    // If this category has a dedicated page, navigate to it
    if (categoryRoutes[label]) {
      window.location.href = categoryRoutes[label];
      return;
    }

    // Otherwise just toggle the active state within the section
    const group = this.closest('.sidebar-section');
    if (group) {
      group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// ─── VIEW TOGGLE ───────────────────────────────────────────────────────────
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// ─── ACTIVE STATE ON LOAD ──────────────────────────────────────────────────
// Highlights the correct filter button if returning from a category page.
// Reads ?category=Data+Viz from the URL e.g. index.html?category=Data+Viz
const params = new URLSearchParams(window.location.search);
const activeCategory = params.get('category');

if (activeCategory) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const label = btn.textContent.trim().replace(/\d+$/, '').trim();
    if (label === activeCategory) {
      const group = btn.closest('.sidebar-section');
      if (group) {
        group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      }
      btn.classList.add('active');
    }
  });
}