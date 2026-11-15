(() => {
  const menuButton = document.querySelector('#menu-button');
  const mobileMenu = document.querySelector('#mobile-menu');
  const toggleMenu = (open) => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileMenu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  };
  menuButton?.addEventListener('click', () => toggleMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') toggleMenu(false); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {if (e.matches) toggleMenu(false)});
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const c = window.RISE_CITY_CONFIG || {};
  const val = key => (typeof c[key] === 'string' ? c[key].trim() : '');
  const detail = document.getElementById('contact-details');
  if (detail) {
    const links = [];
    if (val('email')) links.push({label: val('email'), href: `mailto:${val('email')}`});
    if (val('phone')) links.push({label: val('phone'), href: `tel:${val('phone').replace(/[^\d+]/g,'')}`});
    if (links.length) {
      detail.replaceChildren();
      for (const item of links) {
        const a = document.createElement('a');
        a.textContent = item.label;
        a.href = item.href;
        detail.append(a);
      }
    }
  }
  const socials = document.getElementById('social-links');
  if (socials) for (const [key, label] of [['instagram','Instagram'],['facebook','Facebook'],['youtube','YouTube'],['givingUrl','Give Online']]) {
    const input = val(key);
    if (!input) continue;
    try {
      const u = new URL(input);
      if (!['https:', 'http:'].includes(u.protocol)) continue;
      const a = document.createElement('a');
      a.href = u.href; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.textContent = `${label} ↗`;
      socials.append(a);
    } catch { /* Ignore invalid URLs */ }
  }
})();
