// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Smooth scroll for same-page anchors (with offset for sticky header)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  const el = document.querySelector(id);
  if (!el) return;
  e.preventDefault();
  const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
  const y = el.getBoundingClientRect().top + window.scrollY - (headerHeight + 8);
  window.scrollTo({ top: y, behavior: 'smooth' });
  // Close menu on mobile after navigation
  navMenu?.classList.remove('show');
});

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Simple modal handling
function openModal(modal) {
  modal.hidden = false;
  // Trap focus
  const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  focusable?.focus();
  document.body.style.overflow = 'hidden';
}
function closeModal(modal) {
  modal.hidden = true;
  document.body.style.overflow = '';
}
document.addEventListener('click', (e) => {
  const openBtn = e.target.closest('[data-modal-target]');
  if (openBtn) {
    const sel = openBtn.getAttribute('data-modal-target');
    const modal = document.querySelector(sel);
    if (modal) openModal(modal);
  }
  if (e.target.matches('[data-modal-close]') || e.target.classList.contains('modal')) {
    const modal = e.target.closest('.modal');
    if (modal) closeModal(modal);
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal:not([hidden])').forEach(closeModal);
  }
});

// Download SVG logo
const downloadLogoBtn = document.getElementById('downloadLogo');
if (downloadLogoBtn) {
  downloadLogoBtn.addEventListener('click', () => {
    const svg = document.querySelector('.logo-lg');
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'team-logo.svg';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}
