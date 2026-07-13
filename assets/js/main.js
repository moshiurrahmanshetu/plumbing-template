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
  initBackToTop();
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
 * 3. INTERACTIVE MOBILE DRAWER MENU & COLLAPSIBLES (DYNAMIC BOOTSTRAP 5 OFFCANVAS)
 * Generates and manages the responsive mobile offcanvas accordion menu based on the desktop menu tree.
 */
function initMobileNav() {
  const desktopMenu = document.querySelector('.nav-menu');
  if (!desktopMenu) return;

  const offcanvasId = 'mobileMenuOffcanvas';
  
  // Clean up any existing injected offcanvas to prevent duplicates
  const existingOffcanvas = document.getElementById(offcanvasId);
  if (existingOffcanvas) {
    existingOffcanvas.remove();
  }

  const offcanvas = document.createElement('div');
  offcanvas.className = 'offcanvas offcanvas-end mobile-menu-offcanvas';
  offcanvas.id = offcanvasId;
  offcanvas.setAttribute('tabindex', '-1');
  offcanvas.setAttribute('aria-labelledby', 'mobileMenuOffcanvasLabel');

  // Build the Header
  let headerHtml = `
    <div class="offcanvas-header">
      <a href="index.html" class="logo-brand text-decoration-none d-flex align-items-center gap-2">
        <div class="logo-icon" style="background-color: var(--color-orange); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <i class="fa-solid fa-wrench" style="font-size: 16px;"></i>
        </div>
        <span style="font-family: var(--font-heading); font-weight: 800; font-size: 18px; letter-spacing: 1px; color: var(--text-primary);">PLUMB<span style="color: var(--color-orange);">MASTER</span></span>
      </a>
      <button type="button" class="btn-close-custom" data-bs-dismiss="offcanvas" aria-label="Close Mobile Menu">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `;

  // Build the Accordion body
  let bodyHtml = `<div class="offcanvas-body"><div class="accordion accordion-flush mobile-menu-accordion" id="mobileAccordion">`;

  // Select all top-level .nav-item
  const navItems = desktopMenu.querySelectorAll('.nav-item');
  
  navItems.forEach((navItem, index) => {
    // Only process actual top-level items
    if (navItem.parentElement !== desktopMenu) return;

    const mainLink = navItem.querySelector('a.nav-link');
    if (!mainLink) return;

    // Clone and strip children to get raw text
    const tempLink = mainLink.cloneNode(true);
    const chevrons = tempLink.querySelectorAll('i, svg');
    chevrons.forEach(ch => ch.remove());
    const linkText = tempLink.textContent.trim();
    const linkHref = mainLink.getAttribute('href') || '#';
    
    // Check dropdowns
    const isMega = navItem.classList.contains('mega-menu-wrapper');
    const dropdown = navItem.querySelector('.dropdown-menu-custom');
    
    if (isMega) {
      const megaMenu = navItem.querySelector('.mega-menu');
      const columns = megaMenu ? megaMenu.querySelectorAll('.row > div') : [];
      
      let columnAccordions = '';
      columns.forEach((col, colIndex) => {
        const titleEl = col.querySelector('.mega-title');
        const links = col.querySelectorAll('a.dropdown-item-custom');
        
        if (titleEl && links.length > 0) {
          const titleText = titleEl.textContent.trim();
          let nestedLinks = '';
          links.forEach(l => {
            nestedLinks += `<a href="${l.getAttribute('href')}" class="mobile-submenu-link">${l.textContent.trim()}</a>`;
          });

          columnAccordions += `
            <div class="accordion-item">
              <h2 class="accordion-header" id="nestedHeading_${index}_${colIndex}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nestedCollapse_${index}_${colIndex}" aria-expanded="false" aria-controls="nestedCollapse_${index}_${colIndex}">
                  ${titleText}
                  <i class="fa-solid fa-chevron-down accordion-button-icon"></i>
                </button>
              </h2>
              <div id="nestedCollapse_${index}_${colIndex}" class="accordion-collapse collapse" aria-labelledby="nestedHeading_${index}_${colIndex}" data-bs-parent="#nestedAccordion_${index}">
                <div class="accordion-body">
                  ${nestedLinks}
                </div>
              </div>
            </div>
          `;
        } else {
          const banner = col.querySelector('.emergency-banner-box');
          if (banner) {
            const h4 = banner.querySelector('h4') || banner.querySelector('h3');
            const p = banner.querySelector('p');
            const btn = banner.querySelector('a');
            columnAccordions += `
              <div class="mt-3 p-3 text-center" style="background: var(--bg-surface-hover); border: 1px dashed var(--color-orange); border-radius: var(--border-radius-sm);">
                <span class="badge bg-danger mb-2">Special Offer</span>
                <h5 class="fs-6 mb-1" style="color: var(--text-primary); font-weight: 700;">${h4 ? h4.textContent.trim() : 'Free Inspections'}</h5>
                <p class="small text-muted mb-3">${p ? p.textContent.trim() : 'Claim a free system audit.'}</p>
                <a href="${btn ? btn.getAttribute('href') : 'appointment.html'}" class="btn-premium py-1 px-3 fs-7" style="display: inline-flex; height: 32px; align-items: center; justify-content: center; font-size: 11px !important;">Claim Now</a>
              </div>
            `;
          }
        }
      });

      bodyHtml += `
        <div class="accordion-item">
          <h2 class="accordion-header" id="heading_${index}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${index}" aria-expanded="false" aria-controls="collapse_${index}">
              ${linkText}
              <i class="fa-solid fa-chevron-down accordion-button-icon"></i>
            </button>
          </h2>
          <div id="collapse_${index}" class="accordion-collapse collapse" aria-labelledby="heading_${index}" data-bs-parent="#mobileAccordion">
            <div class="accordion-body p-0">
              <div class="accordion accordion-flush mobile-nested-accordion" id="nestedAccordion_${index}">
                ${columnAccordions}
              </div>
            </div>
          </div>
        </div>
      `;

    } else if (dropdown) {
      const links = dropdown.querySelectorAll('a.dropdown-item-custom');
      let submenuLinks = '';
      links.forEach(l => {
        submenuLinks += `<a href="${l.getAttribute('href')}" class="mobile-submenu-link">${l.textContent.trim()}</a>`;
      });

      bodyHtml += `
        <div class="accordion-item">
          <h2 class="accordion-header" id="heading_${index}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${index}" aria-expanded="false" aria-controls="collapse_${index}">
              ${linkText}
              <i class="fa-solid fa-chevron-down accordion-button-icon"></i>
            </button>
          </h2>
          <div id="collapse_${index}" class="accordion-collapse collapse" aria-labelledby="heading_${index}" data-bs-parent="#mobileAccordion">
            <div class="accordion-body">
              ${submenuLinks}
            </div>
          </div>
        </div>
      `;

    } else {
      const isActive = mainLink.classList.contains('text-orange') || mainLink.classList.contains('active');
      bodyHtml += `
        <div class="mobile-menu-item-simple">
          <a href="${linkHref}" class="mobile-menu-simple-link ${isActive ? 'active' : ''}">
            ${linkText}
            <i class="fa-solid fa-chevron-right" style="font-size: 10px; color: var(--text-muted);"></i>
          </a>
        </div>
      `;
    }
  });

  bodyHtml += `</div>`; // Close Accordion

  // Add utility contact details and socials
  bodyHtml += `
    <div class="mt-4 pt-4 border-top">
      <div class="d-flex flex-column gap-3">
        <a href="tel:1-800-555-0199" class="text-decoration-none d-flex align-items-center gap-3 py-2" style="color: var(--text-primary); font-weight: 600; font-size: 15px;">
          <div style="width: 40px; height: 40px; background-color: rgba(255, 87, 34, 0.1); color: var(--color-orange); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <i class="fa-solid fa-phone"></i>
          </div>
          1-800-555-0199
        </a>
        <a href="mailto:emergency@plumbmaster.com" class="text-decoration-none d-flex align-items-center gap-3 py-2" style="color: var(--text-secondary); font-weight: 500; font-size: 14px;">
          <div style="width: 40px; height: 40px; background-color: var(--bg-surface-hover); color: var(--text-secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <i class="fa-solid fa-envelope"></i>
          </div>
          emergency@plumbmaster.com
        </a>
      </div>
      <div class="d-flex align-items-center gap-3 mt-4">
        <a href="#" class="top-bar-link" aria-label="Facebook" style="font-size: 18px; color: var(--text-secondary);"><i class="fa-brands fa-facebook"></i></a>
        <a href="#" class="top-bar-link" aria-label="Twitter" style="font-size: 18px; color: var(--text-secondary);"><i class="fa-brands fa-twitter"></i></a>
        <a href="#" class="top-bar-link" aria-label="Instagram" style="font-size: 18px; color: var(--text-secondary);"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" class="top-bar-link" aria-label="LinkedIn" style="font-size: 18px; color: var(--text-secondary);"><i class="fa-brands fa-linkedin-in"></i></a>
      </div>
    </div>
  `;

  bodyHtml += `</div>`; // Close offcanvas-body

  offcanvas.innerHTML = headerHtml + bodyHtml;
  document.body.appendChild(offcanvas);

  // Set Bootstrap 5 Offcanvas attributes on the mobile menu triggers
  const triggers = document.querySelectorAll('.mobile-menu-trigger');
  triggers.forEach(trig => {
    trig.setAttribute('data-bs-toggle', 'offcanvas');
    trig.setAttribute('data-bs-target', '#' + offcanvasId);
    trig.setAttribute('role', 'button');
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

/**
 * 7. GLOBAL BACK TO TOP SCROLL PROGRESS ENGINE
 * Dynamically constructs and injects a circular floating Back To Top action button with real-time SVG scroll progress feedback.
 */
function initBackToTop() {
  const containerId = 'backToTopContainer';
  
  // Clean up any existing instances
  const existing = document.getElementById(containerId);
  if (existing) {
    existing.remove();
  }

  // Create markup
  const container = document.createElement('div');
  container.className = 'back-to-top-container';
  container.id = containerId;

  // Circle radius r=23, Circumference = 2 * PI * r = 144.513
  const circumference = 144.513;

  container.innerHTML = `
    <button class="back-to-top-btn" aria-label="Scroll Back to Top" title="Back to Top">
      <svg class="back-to-top-svg" width="48" height="48">
        <circle class="back-to-top-circle-bg" cx="24" cy="24" r="23"></circle>
        <circle class="back-to-top-circle-progress" cx="24" cy="24" r="23"></circle>
      </svg>
      <i class="fa-solid fa-arrow-up"></i>
    </button>
  `;

  document.body.appendChild(container);

  const btn = container.querySelector('.back-to-top-btn');
  const progressCircle = container.querySelector('.back-to-top-circle-progress');

  // Configure initial SVG dashes
  if (progressCircle) {
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
  }

  // Update visibility and scroll progress stroke
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Toggle class based on scroll depth
    if (scrollTop > 300) {
      container.classList.add('is-visible');
    } else {
      container.classList.remove('is-visible');
    }

    // Calculate percentage and update dashoffset
    if (scrollHeight > 0 && progressCircle) {
      const scrollPercent = scrollTop / scrollHeight;
      const offset = circumference - (Math.min(scrollPercent, 1) * circumference);
      progressCircle.style.strokeDashoffset = offset;
    }
  };

  // Scroll to Top action
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Attach event listeners
  window.addEventListener('scroll', updateScrollProgress);
  window.addEventListener('resize', updateScrollProgress);
  
  // Run once initially to set proper state
  updateScrollProgress();
}
