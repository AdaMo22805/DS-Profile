// ─── DATA VIZ PAGE — PROJECT SORT + DYNAMIC COUNT ──────────────────────────
// Sorts .project-row elements by the year in .row-year while keeping
// the .row-num labels fixed (01, 02, 03…) at their original positions.
// Also derives the project count from the DOM and syncs all count surfaces.

(function () {
  const list = document.querySelector('.project-list');
  const sortBtns = document.querySelectorAll('.sort-btn');

  if (!list) return;

  // ── Helpers ───────────────────────────────────────────────────────────────

  function getRows() {
    return Array.from(list.querySelectorAll('.project-row'));
  }

  function getYear(row) {
    const yearEl = row.querySelector('.row-year');
    return yearEl ? parseInt(yearEl.textContent.trim(), 10) : 0;
  }

  function extractContent(row) {
    return Array.from(row.children)
      .filter(child => !child.classList.contains('row-num'))
      .map(child => child.cloneNode(true));
  }

  // ── Dynamic count ─────────────────────────────────────────────────────────
  // Counts .project-row elements in the DOM and pushes the number to every
  // surface that displays it, so adding or removing a row in the HTML is
  // the only change needed — no hardcoded numbers elsewhere.

  function updateCount() {
    const count = getRows().length;

    // Hero badge
    const badge = document.querySelector('.count-badge');
    if (badge) badge.textContent = count;

    // Footer "Data Visualization · N projects"
    const footerSpans = document.querySelectorAll('footer span');
    footerSpans.forEach(span => {
      if (span.textContent.includes('projects')) {
        span.textContent = `Data Visualization · ${count} project${count !== 1 ? 's' : ''}`;
      }
    });

    // list-heading "All projects (N)"
    const heading = list.querySelector('.list-heading');
    if (heading) {
      heading.textContent = `All projects (${count})`;
    }
  }

  // ── Sort ──────────────────────────────────────────────────────────────────

  function sortRows(direction, animate = true) {
    const rows = getRows();

    const snapshots = rows.map(row => ({
      year: getYear(row),
      content: extractContent(row),
      isHighlight: row.classList.contains('highlight'),
    }));

    snapshots.sort((a, b) =>
      direction === 'asc' ? a.year - b.year : b.year - a.year
    );

    const apply = () => {
      rows.forEach((row, i) => {
        Array.from(row.children)
          .filter(child => !child.classList.contains('row-num'))
          .forEach(child => child.remove());
        row.classList.toggle('highlight', snapshots[i].isHighlight);
        snapshots[i].content.forEach(node => row.appendChild(node));
      });
      rows.forEach(row => row.classList.remove('sorting'));
      updateSortLabel(direction);
    };

    if (animate) {
      rows.forEach(row => row.classList.add('sorting'));
      setTimeout(apply, 200);
    } else {
      apply();
    }
  }

  function updateSortLabel(direction) {
    const label = list.querySelector('.sort-label');
    if (label) {
      label.textContent =
        direction === 'desc' ? 'Sorted by year ↓' : 'Sorted by year ↑';
    }
  }

  // ── Wire up sort buttons ──────────────────────────────────────────────────

  sortBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      sortBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      sortRows(this.dataset.sort, true);
    });
  });

  // ── Init on load ──────────────────────────────────────────────────────────

  // Count first — before any DOM changes
  updateCount();

  // Default sort: newest first, no fade animation
  const defaultBtn = document.querySelector('.sort-btn[data-sort="desc"]');
  if (defaultBtn) defaultBtn.classList.add('active');
  sortRows('desc', false);
})();

//link to projects after clicking row-arrow
document.querySelectorAll('.row-arrow').forEach(arrow => {
  arrow.addEventListener('click', function () {
    const row = this.closest('.project-row');
    if (row) {
      const titleEl = row.querySelector('.row-title');
      if (titleEl) {
        const title = titleEl.textContent.trim();
        // Map project titles to their respective URLs
        const projectLinks = {
          'Montessori Public Presence': 'https://public.tableau.com/app/profile/isabellacai/viz/MontessoriPublicPresence/largewebuse',
          'Bike Watching': 'https://adamo22805.github.io/bikewatching_Boston/',
          'Which Age Group is the Most Fit?': 'https://seashello.github.io/dsc106-final-project/',
        };
        if (projectLinks[title]) {
          window.open(projectLinks[title], '_blank');
        }
      }
    }
  });
});