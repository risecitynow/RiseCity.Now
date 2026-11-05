/* RISE CITY — tiny static-site enhancements. Runs on GitHub Pages. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const config = window.RISE_CITY_CONFIG || {};
  const byId = (id) => document.getElementById(id);

  // Navigation: keyboard-friendly mobile menu.
  const toggle = byId('menu-toggle');
  const menu = byId('mobile-nav');
  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    menu.hidden = true;
    document.body.classList.remove('menu-open');
  };
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) { closeMenu(); return; }
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      menu.hidden = false;
      document.body.classList.add('menu-open');
      menu.querySelector('a')?.focus();
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !menu.hidden) { closeMenu(); toggle.focus(); }
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
  }

  // Visible progress bar and footer copyright.
  const indicator = byId('scroll-indicator');
  let scrollTicking = false;
  const updateProgress = () => {
    const total = document.documentElement.scrollHeight - innerHeight;
    if (indicator) indicator.style.width = `${total > 0 ? Math.min(100, scrollY / total * 100) : 0}%`;
    scrollTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollTicking) { requestAnimationFrame(updateProgress); scrollTicking = true; }
  }, { passive: true });
  updateProgress();
  if (byId('year')) byId('year').textContent = String(new Date().getFullYear());

  // Animate section reveals, leaving all text visible when JS is unavailable.
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -30px 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // Gathering time/location: leave the honest "coming soon" state if blank.
  const gatheringDay = String(config.gatheringDay || '').trim();
  const gatheringTime = String(config.gatheringTime || '').trim();
  const campusName = String(config.campusName || '').trim();
  const address = String(config.address || '').trim();
  if (gatheringDay || gatheringTime) {
    byId('gathering-headline').textContent = [gatheringDay, gatheringTime].filter(Boolean).join(' · ');
    byId('gathering-description').textContent = 'We would love to see you there. Come as you are and join us!';
    const badge = $('.visit-status');
    if (badge) badge.textContent = 'JOIN US';
  }
  if (campusName || address) {
    byId('service-location').textContent = [campusName, address].filter(Boolean).join(' — ');
    if (address) {
      const directionsLink = byId('directions-link');
      directionsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      directionsLink.hidden = false;
    }
  }

  // Social profiles and giving links are displayed only after configured.
  const socialContainer = byId('social-links');
  const socials = [['Instagram', config.instagram], ['Facebook', config.facebook], ['YouTube', config.youtube]];
  socials.forEach(([label, value]) => {
    if (!value || !/^https:\/\//i.test(value)) return;
    const link = document.createElement('a');
    link.href = value;
    link.textContent = `${label} ↗`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    socialContainer.appendChild(link);
  });
  if (socialContainer.children.length > 0) socialContainer.hidden = false;
  if (config.givingUrl && /^https:\/\//i.test(config.givingUrl)) {
    for (const id of ['giving-link', 'footer-give']) {
      const link = byId(id);
      link.href = config.givingUrl;
      link.hidden = false;
    }
  }

  // On static GitHub Pages, the contact form uses the visitor's email app.
  // Do not imply there is a backend or silently collect submissions.
  const email = String(config.email || '').trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    byId('connection-placeholder').hidden = true;
    byId('contact-form-wrap').hidden = false;
    byId('contact-form').addEventListener('submit', event => {
      event.preventDefault();
      const name = byId('contact-name').value.trim();
      const sender = byId('contact-email').value.trim();
      const topic = byId('contact-topic').value;
      const message = byId('contact-message').value.trim();
      if (!name || !sender || !message) return;
      const subject = encodeURIComponent(`Rise City website — ${topic}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${sender}\nTopic: ${topic}\n\n${message}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });
  }
})();
