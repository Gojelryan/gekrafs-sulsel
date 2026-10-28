'use strict';

// The deferred CDN script runs before this file; keep navigation usable if it fails.
if (window.lucide) {
  window.lucide.createIcons();
}

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
const icon = document.getElementById('menu-icon');

function setMenu(open) {
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
  icon.setAttribute('d', open ? 'M6 6l12 12M6 18L18 6' : 'M4 6h16M4 12h16M4 18h16');
}

toggle.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  setMenu(false);
  if (link.hash && link.origin === location.origin) {
    const destination = document.querySelector(link.hash);
    if (destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !menu.hidden) {
    setMenu(false);
    toggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!menu.hidden && !event.target.closest('header')) setMenu(false);
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});

// Missing photos keep their reserved space and show a descriptive placeholder.
document.querySelectorAll('.asset-frame img, img[data-hero]').forEach((img) => {
  const placeholder = img.parentElement.querySelector('.asset-placeholder');
  function updateImage() {
    const loaded = img.naturalWidth > 0;
    img.hidden = !loaded;
    if (placeholder) placeholder.hidden = loaded;
  }
  img.addEventListener('error', updateImage);
  img.addEventListener('load', updateImage);
  if (img.complete) updateImage();
});

const navigationLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = [...document.querySelectorAll('main section[id]')];
let queued = false;
function updateNavigation() {
  const current =
    sections.filter((section) => section.getBoundingClientRect().top <= 150).at(-1) || sections[0];
  navigationLinks.forEach((link) => {
    if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  queued = false;
}
window.addEventListener(
  'scroll',
  () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(updateNavigation);
    }
  },
  { passive: true },
);
window.addEventListener('resize', updateNavigation);
updateNavigation();
