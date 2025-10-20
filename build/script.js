/**
 * About Me Site - Progressive Disclosure
 * Pure vanilla JavaScript - no frameworks
 */

(function() {
  'use strict';

  // Depth map for pages
  const depthMap = {
    '/': 0,
    '/index.html': 0,
    '/projects/': 1,
    '/projects/index.html': 1,
    '/thinking/': 1,
    '/thinking/index.html': 1,
    '/tech/': 1,
    '/tech/index.html': 1,
    '/projects/sparkii-rag.html': 2,
    '/projects/wotc-tax.html': 2,
    '/projects/israeli-tech.html': 2,
    '/thinking/how-i-learn.html': 2,
    '/thinking/the-disconnect.html': 2,
    '/thinking/what-im-not.html': 2,
    '/about/full-story.html': 4
  };

  /**
   * Update depth meter based on current page
   */
  function updateDepthMeter() {
    const depthMeterEl = document.querySelector('.depth-meter');
    if (!depthMeterEl) return;

    const path = window.location.pathname;
    const depth = depthMap[path] || 0;

    const dots = depthMeterEl.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index <= depth) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  /**
   * Save expanded sections state to localStorage
   */
  function saveExpandedState() {
    const expanded = [];
    document.querySelectorAll('details[open]').forEach(detail => {
      const summary = detail.querySelector('summary');
      if (summary) {
        expanded.push(summary.textContent.trim());
      }
    });

    try {
      localStorage.setItem('expandedSections', JSON.stringify(expanded));
    } catch (e) {
      // localStorage might be disabled
      console.log('Could not save state to localStorage');
    }
  }

  /**
   * Restore expanded sections state from localStorage
   */
  function restoreExpandedState() {
    try {
      const expanded = JSON.parse(localStorage.getItem('expandedSections') || '[]');

      document.querySelectorAll('details').forEach(detail => {
        const summary = detail.querySelector('summary');
        if (summary && expanded.includes(summary.textContent.trim())) {
          detail.open = true;
        }
      });
    } catch (e) {
      // localStorage might be disabled or data corrupted
      console.log('Could not restore state from localStorage');
    }
  }

  /**
   * Setup smooth scrolling for hash links
   */
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        }
      });
    });
  }

  /**
   * Track when sections are expanded/collapsed
   */
  function setupExpandableTracking() {
    document.querySelectorAll('details').forEach(detail => {
      detail.addEventListener('toggle', saveExpandedState);
    });
  }

  /**
   * Highlight current nav item
   */
  function highlightCurrentNav() {
    const currentPath = window.location.pathname;

    document.querySelectorAll('.nav-links a').forEach(link => {
      const linkPath = new URL(link.href).pathname;

      // Check if current page is under this nav item
      if (currentPath.startsWith(linkPath) && linkPath !== '/') {
        link.classList.add('active');
      } else if (currentPath === '/' && linkPath === '/') {
        link.classList.add('active');
      }
    });
  }

  /**
   * Setup tech tag filtering (if on tech page)
   */
  function setupTechTagFiltering() {
    // If there's a hash in URL, scroll to that tech section
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });

          // Highlight the section briefly
          target.style.transition = 'background-color 0.5s ease';
          target.style.backgroundColor = 'var(--code-bg)';
          setTimeout(() => {
            target.style.backgroundColor = '';
          }, 2000);
        }
      }, 100);
    }
  }

  /**
   * Initialize everything when DOM is ready
   */
  function init() {
    updateDepthMeter();
    restoreExpandedState();
    setupSmoothScrolling();
    setupExpandableTracking();
    highlightCurrentNav();
    setupTechTagFiltering();
  }

  /**
   * Save state before leaving page
   */
  function cleanup() {
    saveExpandedState();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Save state before leaving
  window.addEventListener('beforeunload', cleanup);

  // Handle browser back/forward
  window.addEventListener('popstate', function() {
    updateDepthMeter();
    highlightCurrentNav();
  });

})();
