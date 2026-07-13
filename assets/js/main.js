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
      btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      btn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      btn.setAttribute('title', 'Switch to Light Mode');
    }
  });
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

// 5. HIGH-FIDELITY GLOBAL FONT AWESOME COMPATIBILITY LAYER / POLYFILL
window.lucide = {
  createIcons: function() {
    const iconMap = {
      'activity': 'fa-solid fa-chart-line',
      'alert-circle': 'fa-solid fa-circle-exclamation',
      'alert-triangle': 'fa-solid fa-triangle-exclamation',
      'arrow-left': 'fa-solid fa-arrow-left',
      'arrow-left-right': 'fa-solid fa-arrows-left-right',
      'arrow-right': 'fa-solid fa-arrow-right',
      'award': 'fa-solid fa-award',
      'badge-check': 'fa-solid fa-circle-check',
      'bath': 'fa-solid fa-bath',
      'bell-ring': 'fa-solid fa-bell',
      'book-open': 'fa-solid fa-book-open',
      'briefcase': 'fa-solid fa-briefcase',
      'building': 'fa-solid fa-building',
      'building-2': 'fa-solid fa-building',
      'calendar': 'fa-solid fa-calendar-days',
      'check': 'fa-solid fa-check',
      'check-circle': 'fa-solid fa-circle-check',
      'check-square': 'fa-solid fa-square-check',
      'chevron-down': 'fa-solid fa-chevron-down',
      'chevron-left': 'fa-solid fa-chevron-left',
      'chevron-right': 'fa-solid fa-chevron-right',
      'clock': 'fa-solid fa-clock',
      'cpu': 'fa-solid fa-microchip',
      'credit-card': 'fa-solid fa-credit-card',
      'crown': 'fa-solid fa-crown',
      'dollar-sign': 'fa-solid fa-dollar-sign',
      'download': 'fa-solid fa-download',
      'droplet': 'fa-solid fa-droplet',
      'external-link': 'fa-solid fa-up-right-from-square',
      'eye': 'fa-solid fa-eye',
      'facebook': 'fa-brands fa-facebook',
      'file-check': 'fa-solid fa-file-circle-check',
      'file-text': 'fa-solid fa-file-lines',
      'flag': 'fa-solid fa-flag',
      'flame': 'fa-solid fa-fire',
      'gift': 'fa-solid fa-gift',
      'git-compare': 'fa-solid fa-code-compare',
      'globe': 'fa-solid fa-globe',
      'graduation-cap': 'fa-solid fa-graduation-cap',
      'hammer': 'fa-solid fa-hammer',
      'headphones': 'fa-solid fa-headphones',
      'heart': 'fa-solid fa-heart',
      'heart-pulse': 'fa-solid fa-heart-pulse',
      'help-circle': 'fa-solid fa-circle-question',
      'home': 'fa-solid fa-house',
      'info': 'fa-solid fa-circle-info',
      'instagram': 'fa-brands fa-instagram',
      'layers': 'fa-solid fa-layer-group',
      'linkedin': 'fa-brands fa-linkedin-in',
      'mail': 'fa-solid fa-envelope',
      'map-pin': 'fa-solid fa-map-pin',
      'menu': 'fa-solid fa-bars',
      'message-square': 'fa-solid fa-comment',
      'minus': 'fa-solid fa-minus',
      'moon': 'fa-solid fa-moon',
      'navigation': 'fa-solid fa-location-arrow',
      'phone': 'fa-solid fa-phone',
      'phone-call': 'fa-solid fa-phone-volume',
      'play': 'fa-solid fa-play',
      'plus': 'fa-solid fa-plus',
      'plus-circle': 'fa-solid fa-circle-plus',
      'refresh-cw': 'fa-solid fa-arrows-rotate',
      'rotate-ccw': 'fa-solid fa-arrow-rotate-left',
      'scale': 'fa-solid fa-scale-balanced',
      'search': 'fa-solid fa-magnifying-glass',
      'send': 'fa-solid fa-paper-plane',
      'settings': 'fa-solid fa-gear',
      'shield': 'fa-solid fa-shield-halved',
      'shield-alert': 'fa-solid fa-shield-halved',
      'shield-check': 'fa-solid fa-shield-halved',
      'shopping-bag': 'fa-solid fa-bag-shopping',
      'shopping-cart': 'fa-solid fa-cart-shopping',
      'sliders': 'fa-solid fa-sliders',
      'smile': 'fa-solid fa-face-smile',
      'sparkles': 'fa-solid fa-wand-magic-sparkles',
      'star': 'fa-solid fa-star',
      'sun': 'fa-solid fa-sun',
      'tag': 'fa-solid fa-tag',
      'target': 'fa-solid fa-bullseye',
      'thermometer': 'fa-solid fa-temperature-half',
      'thumbs-up': 'fa-solid fa-thumbs-up',
      'trash-2': 'fa-solid fa-trash-can',
      'trending-up': 'fa-solid fa-chart-line',
      'trophy': 'fa-solid fa-trophy',
      'truck': 'fa-solid fa-truck',
      'twitter': 'fa-brands fa-twitter',
      'upload': 'fa-solid fa-upload',
      'upload-cloud': 'fa-solid fa-cloud-arrow-up',
      'user': 'fa-solid fa-user',
      'user-check': 'fa-solid fa-user-check',
      'users': 'fa-solid fa-users',
      'utensils': 'fa-solid fa-utensils',
      'video': 'fa-solid fa-video',
      'volume-x': 'fa-solid fa-volume-xmark',
      'wallet': 'fa-solid fa-wallet',
      'wrench': 'fa-solid fa-wrench',
      'x': 'fa-solid fa-xmark',
      'zap': 'fa-solid fa-bolt',
      'zoom-in': 'fa-solid fa-magnifying-glass-plus'
    };

    document.querySelectorAll('[data-lucide]').forEach(el => {
      const iconName = el.getAttribute('data-lucide');
      const faClass = iconMap[iconName] || 'fa-solid fa-question';
      
      const existingClasses = el.className || '';
      el.className = (faClass + ' ' + existingClasses).strip || (faClass + ' ' + existingClasses).trim();
      el.removeAttribute('data-lucide');
      
      const style = el.getAttribute('style');
      if (style) {
        const widthMatch = style.match(/width:\s*(\d+)px/);
        if (widthMatch) {
          const pxVal = widthMatch[1];
          if (!style.includes('font-size')) {
            el.setAttribute('style', style + `; font-size: ${pxVal}px; line-height: 1; display: inline-flex; align-items: center; justify-content: center;`);
          }
        }
      }
    });
  }
};

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
