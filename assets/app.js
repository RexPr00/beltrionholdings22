const $$ = (s, p = document) => [...p.querySelectorAll(s)];

$$('[data-lang]').forEach((wrap) => {
  const btn = wrap.querySelector('.lang-btn');
  const menu = wrap.querySelector('.lang-menu');
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    wrap.classList.toggle('open');
    btn.setAttribute('aria-expanded', wrap.classList.contains('open'));
  });
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) {
      wrap.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
  menu.addEventListener('click', () => wrap.classList.remove('open'));
});

const drawer = document.getElementById('mobile-drawer');
const burger = document.querySelector('.burger');
const closeBtn = document.querySelector('.drawer-close');
let focusables = [];

function openDrawer() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  burger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
  focusables = $$('button,a,input,[tabindex]:not([tabindex="-1"])', drawer);
  focusables[0]?.focus();
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}
burger?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
drawer?.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDrawer();
    closePrivacy();
  }
  if (e.key === 'Tab' && drawer.classList.contains('open') && focusables.length) {
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

const faqItems = $$('details');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach((other) => { if (other !== item) other.open = false; });
  });
});

const modal = document.querySelector('.privacy-modal');
const openPrivacyBtn = document.querySelector('[data-open-privacy]');
const closePrivacyBtn = document.querySelector('[data-close-privacy]');
const closePrivacyX = document.querySelector('.modal-x');

function openPrivacy(e) {
  e.preventDefault();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  closePrivacyX.focus();
}
function closePrivacy() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}
openPrivacyBtn?.addEventListener('click', openPrivacy);
closePrivacyBtn?.addEventListener('click', closePrivacy);
closePrivacyX?.addEventListener('click', closePrivacy);
modal?.addEventListener('click', (e) => { if (e.target === modal) closePrivacy(); });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.15 });
$$('.card, .form-card, h2').forEach((el) => observer.observe(el));
