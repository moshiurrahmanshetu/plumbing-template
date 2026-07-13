/**
 * ===================================================================
 * Premium Plumbing Service HTML Template - Global JS Controller
 * ThemeForest Quality - Original Craftsmanship
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Global Controllers
  initThemeSwitcher();
  initStickyHeader();
  initMobileNav();
  initSearchModal();
  initLucideIcons();
  initAosAnimation();
});

/**
 * 1. PREMIUM DARK / LIGHT THEME TOGGLE
 * Implements smooth theme updates and persistent client storage.
 */
function initThemeSwitcher() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  
  // Set default theme to Dark if not configured
  const savedTheme = localStorage.getItem('plumbing-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Animate transition using a momentary pulse classes
      document.body.style.opacity = '0.98';
      setTimeout(() => {
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('plumbing-theme', nextTheme);
        updateThemeIcons(nextTheme);
        document.body.style.opacity = '1';
      }, 100);
    });
  });
}

function updateThemeIcons(theme) {
  const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
  toggleButtons.forEach(btn => {
    if (theme === 'light') {
      btn.innerHTML = '<i data-lucide="moon"></i>';
      btn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      btn.innerHTML = '<i data-lucide="sun"></i>';
      btn.setAttribute('title', 'Switch to Light Mode');
    }
  });
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * 2. STICKY HEADER SCROLL CONTROLLER
 * Applies shrinking, shadows and entry animations to the header during scrolling.
 */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  const topbar = document.querySelector('.top-bar');
  const stickyOffset = topbar ? topbar.offsetHeight + 10 : 60;

  window.addEventListener('scroll', () => {
    if (window.scrollY > stickyOffset) {
      if (!header.classList.contains('is-sticky')) {
        header.classList.add('is-sticky');
      }
    } else {
      if (header.classList.contains('is-sticky')) {
        header.classList.remove('is-sticky');
      }
    }
  });
}

/**
 * 3. INTERACTIVE MOBILE DRAWER MENU & COLLAPSIBLES
 * Manages offcanvas drawer drawer with smooth sub-navigation slide toggle controls.
 */
function initMobileNav() {
  const trigger = document.querySelector('.mobile-menu-trigger');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const itemsWithSubmenu = document.querySelectorAll('.mobile-nav-item');

  if (!trigger || !overlay || !drawer) return;

  const openDrawer = () => {
    overlay.classList.add('is-active');
    drawer.classList.add('is-active');
    document.body.style.overflow = 'hidden'; // Prevents body scrolling
  };

  const closeDrawer = () => {
    overlay.classList.remove('is-active');
    drawer.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  trigger.addEventListener('click', openDrawer);
  overlay.addEventListener('click', closeDrawer);
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  // Handle collapsible mobile submenus
  itemsWithSubmenu.forEach(item => {
    const link = item.querySelector('.mobile-nav-link');
    const submenu = item.querySelector('.mobile-nav-submenu');
    
    if (link && submenu) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Toggle submenu display with visual indicator
        const isCollapsed = submenu.style.display !== 'block';
        submenu.style.display = isCollapsed ? 'block' : 'none';
        
        const chevron = link.querySelector('i');
        if (chevron) {
          chevron.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      });
    }
  });
}

/**
 * 4. SEARCH MODAL CONTROLLER
 * Launches interactive modal overlays when the search button is clicked.
 */
function initSearchModal() {
  const searchTriggers = document.querySelectorAll('.search-trigger');
  const searchOverlay = document.querySelector('.search-modal-overlay');
  const searchClose = document.querySelector('.search-modal-close');
  const searchInput = document.querySelector('.search-modal-input');

  if (!searchOverlay) return;

  searchTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      searchOverlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 300);
    });
  });

  const closeModal = () => {
    searchOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (searchClose) {
    searchClose.addEventListener('click', closeModal);
  }

  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      closeModal();
    }
  });

  // Close search modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/**
 * 5. LUCIDE ICONS PARSER
 * Renders beautiful inline SVGs for all elements marked with `data-lucide` attributes.
 */
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * 6. AOS ANIMATION SYSTEM
 * Initializes Scroll Reveal animation blocks across layouts.
 */
function initAosAnimation() {
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: 'mobile' // Disable scroll animations on small mobile screens to preserve performance
    });
  }
}
