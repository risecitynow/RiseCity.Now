/* Rise City shared navigation + personal coffee invitation.
 * Updated against risecitynow/RiseCity.Now main, 2026-11-24.
 * Uses existing site header/footer colors, typography and Pages CMS data.
 * No HTML, YAML, photos, biographies or saved content files are replaced.
 */
(() => {
  'use strict';
  const pages = {
    events: {href:'events.html', label:'Events', showNav:true, showFooter:true},
    give: {href:'give.html', label:'Give', showNav:true, showFooter:true}
  };
  const ABOUT = 'meet-rich-and-kim.html';
  const DEFAULT_BOOKING = 'https://calendar.app.google/rResX4KfWwvQAiDc8';
  let activeBookingUrl = DEFAULT_BOOKING;
  let activeBookingLabel = 'Let’s Get Coffee';
  const pageName = () => location.pathname.split('/').pop() || 'index.html';
  const atHome = () => pageName() === 'index.html';
  const isPage = filename => pageName() === filename;

  // Compare relative, absolute and CMS-normalized URLs without changing destinations.
  function localTarget(href) {
    if (!href || typeof href !== 'string') return null;
    try {
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return null;
      return {filename:url.pathname.split('/').pop() || 'index.html', hash:url.hash};
    } catch { return null; }
  }
  const matchesPage = (anchor, href) => {
    const target = localTarget(anchor.getAttribute('href'));
    return Boolean(target && target.filename === href && !target.hash);
  };
  const findPageLink = (container, href) =>
    [...container.querySelectorAll('a[href]')].find(a => matchesPage(a, href));

  function normalizeInternalLinks() {
    if (atHome()) return;
    document.querySelectorAll('.nav-links a, #mobile-menu a, .nav-right > .btn, .footer-bottom a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === '#top' && a.closest('.footer-bottom')) return;
      if (/^#(?:top|our-story|mission|connect)$/.test(href)) {
        a.setAttribute('href', href === '#top' ? 'index.html' : 'index.html' + href);
      }
    });
  }

  function insertPage(nav, p, mobile) {
    const old = findPageLink(nav, p.href);
    if (!p.showNav) { old?.remove(); return; }
    const a = old || document.createElement('a');
    a.href = p.href;
    // Do not overwrite a user-defined label if already present in the CMS menu.
    if (!old) { a.dataset.riseDynamic = p.href; a.textContent = p.label + (mobile ? ' ↗' : ''); }
    else if (old.dataset.riseDynamic === p.href) a.textContent = p.label + (mobile ? ' ↗' : '');
    if (!old) {
      if (mobile) {
        const connection = [...nav.querySelectorAll('a')].find(x => /connect/i.test(x.textContent));
        connection ? nav.insertBefore(a, connection) : nav.append(a);
      } else nav.append(a);
    }
  }

  // Insert About Us next to Our Story; retain any existing CMS-defined About link.
  function ensureAbout(nav, mobile) {
    const existing = findPageLink(nav, ABOUT);
    if (existing) return;
    const a = document.createElement('a');
    a.href = ABOUT;
    a.textContent = mobile ? 'About Us ↗' : 'About Us';
    a.setAttribute('data-rise-about', 'true');
    const anchors = [...nav.querySelectorAll('a')];
    const story = anchors.find(x => {
      const href = x.getAttribute('href') || '';
      return href.includes('#our-story') || /^our story$/i.test(x.textContent.trim());
    });
    if (story) story.after(a);
    else {
      const beliefs = anchors.find(x => matchesPage(x, 'beliefs.html'));
      beliefs ? nav.insertBefore(a, beliefs) : nav.prepend(a);
    }
  }

  function ensureFooter(p) {
    const footer = document.querySelector('.footer-bottom > span:last-child');
    if (!footer) return;
    const old = findPageLink(footer, p.href);
    if (!p.showFooter) { old?.remove(); return; }
    const a = old || document.createElement('a');
    a.href = p.href;
    if (!old) { a.dataset.riseDynamic = p.href; a.textContent = p.label.toUpperCase(); footer.insertBefore(a, footer.querySelector('a[href="#top"]') || null); }
    else if (old.dataset.riseDynamic === p.href) a.textContent = p.label.toUpperCase();
  }

  // The About Us link must be highlighted on the actual Rich & Kim page.
  function updateActive() {
    for (const a of document.querySelectorAll('.nav-links a, #mobile-menu a')) {
      const h = localTarget(a.getAttribute('href'));
      const active = Boolean(h && h.filename === pageName() && !h.hash && (
        pageName() !== 'index.html' || /^(?:home)$/i.test(a.textContent.trim())
      ));
      a.classList.toggle('nav-active', active);
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    }
  }

  function addSharedStyles() {
    if (document.getElementById('rise-about-coffee-style')) return;
    const style = document.createElement('style');
    style.id = 'rise-about-coffee-style';
    style.textContent = `
      /* Spacing only; site palette, fonts, header and footer remain inherited. */
      @media (min-width:901px) and (max-width:1270px) {
        .nav-shell{gap:12px!important}
        .nav-links{gap:clamp(9px,1.15vw,18px)!important;margin-right:8px!important}
        .nav-links a{font-size:clamp(10px,.92vw,12px)!important;white-space:nowrap}
        .nav-right>.btn{padding-inline:12px;gap:10px}
      }
      .connect-coffee-invite {
        margin-top:35px;padding:27px 0 5px;
        border-top:1px solid var(--connect-rule,var(--cms-border,#ddd));
        max-width:465px;
      }
      .connect-coffee-invite .connect-coffee-eyebrow {
        display:block;margin-bottom:13px;font-size:10px;font-weight:800;
        letter-spacing:.15em;text-transform:uppercase;
        color:var(--connect-muted,var(--cms-muted,#555));
      }
      .connect-coffee-invite h2 {
        font-family:var(--cms-headfont,var(--serif,'Manrope',sans-serif));
        font-size:clamp(29px,3vw,44px);font-weight:800;
        letter-spacing:-.065em;line-height:1.03;
        margin:0 0 12px;color:var(--cms-ink,#101010);
      }
      .connect-coffee-invite p {
        font-size:14px;line-height:1.7;
        color:var(--connect-muted,var(--cms-muted,#555));
        margin:0 0 20px;
      }
      .connect-coffee-invite .connect-coffee-actions {
        display:flex;align-items:center;flex-wrap:wrap;gap:16px;
      }
      .connect-coffee-invite .connect-coffee-secondary {
        display:inline-block;font-size:12px;font-weight:800;
        text-decoration:underline;text-underline-offset:5px;
        color:var(--cms-ink,#101010);
      }
      .connect-coffee-invite .btn{white-space:normal;text-align:center}
      /* Keep the new buttons within the existing monochrome Rise City design. */
      .rise-story-actions {
        margin-top:24px;display:flex;align-items:center;flex-wrap:wrap;
        gap:12px;
      }
      .rise-story-actions>.btn {margin:0!important;gap:17px;max-width:100%;}
      .rise-coffee-outline {
        background:transparent;color:var(--cms-ink,#101010);
        border:1px solid currentColor;text-decoration:none;
      }
      .rise-coffee-outline:hover {
        background:var(--cms-ink,#101010);color:var(--cms-bg,#fff);
      }
      .page-meet-rich-kim .rise-meet-intro-actions {
        display:flex;align-items:center;flex-wrap:wrap;gap:12px 24px;
      }
      .page-meet-rich-kim .rise-meet-intro-actions .rise-meet-top-coffee {
        margin:0;flex:0 0 auto;max-width:100%;white-space:normal;
        text-decoration:none;letter-spacing:.02em;font-size:12px;
      }
      @media(max-width:650px) {
        .rise-story-actions {align-items:stretch;}
        .rise-story-actions>.btn {min-height:48px;flex:1 1 190px;}
        .page-meet-rich-kim .rise-meet-intro-actions .rise-meet-top-coffee {
          min-height:43px;padding:0 14px;
        }
      }
    `;
    document.head.append(style);
  }

  function safeBookingUrl(candidate) {
    try {
      const u = new URL(candidate);
      return u.protocol === 'https:' && !u.username && !u.password ? u.href : null;
    } catch {return null;}
  }
  // Reuse the single existing CMS booking URL on all coffee invitations.
  function createBookingButton(context, outline=false) {
    const link=document.createElement('a');
    link.dataset.riseCoffeeButton=context;
    link.href=activeBookingUrl;
    link.target='_blank';
    link.rel='noopener noreferrer';
    link.className=outline?'btn rise-coffee-outline':'btn btn-black btn-small rise-meet-top-coffee';
    link.setAttribute('aria-label','Let’s Get Coffee — opens calendar booking in a new tab');
    const label=document.createElement('span');
    label.className='rise-coffee-button-label';
    label.textContent=activeBookingLabel;
    const arrow=document.createElement('span');
    arrow.textContent='↗';
    arrow.setAttribute('aria-hidden','true');
    link.append(label,arrow);
    return link;
  }

  // Story already has a Meet Rich & Kim link. Place the new coffee CTA alongside it.
  function ensureStoryCoffee() {
    if (!atHome()) return;
    const story=document.querySelector('#our-story .story-copy');
    if (!story) return;
    let row=story.querySelector('#rise-story-actions');
    if (!row) {
      const about=[...story.querySelectorAll('a.btn[href]')].find(a=>matchesPage(a,ABOUT));
      if (!about) return; // Never create an unrelated floating button.
      row=document.createElement('div');
      row.id='rise-story-actions';
      row.className='rise-story-actions';
      about.before(row);
      about.style.marginTop='0';
      row.append(about);
    }
    if (!row.querySelector('[data-rise-coffee-button="story"]')) {
      row.append(createBookingButton('story',true));
    }
  }

  // Place the booking button immediately beside the existing Get to know us link.
  function ensureMeetTopCoffee() {
    if (!isPage(ABOUT)) return;
    const intro=document.querySelector('.page-meet-rich-kim .meet-hero-intro');
    const journey=intro?.querySelector('a[href="#our-journey"]');
    if (!journey) return;
    let row=intro.querySelector('.rise-meet-intro-actions');
    if (!row) {
      row=document.createElement('div');
      row.className='rise-meet-intro-actions';
      journey.before(row);
      row.append(journey);
    }
    const buttons=[...document.querySelectorAll('[data-rise-coffee-button="meet-top"]')];
    const coffee=buttons.shift() || createBookingButton('meet-top');
    buttons.forEach(button=>button.remove());
    if (coffee.parentElement!==row || coffee.previousElementSibling!==journey) journey.after(coffee);
  }

  function updateCoffeeButtons(url,label) {
    if (url) activeBookingUrl=url;
    if (typeof label==='string' && label.trim()) activeBookingLabel=label.trim();
    document.querySelectorAll('[data-rise-coffee-button]').forEach(link=>{
      link.href=activeBookingUrl;
      const text=link.querySelector('.rise-coffee-button-label');
      if(text) text.textContent=activeBookingLabel;
      link.setAttribute('aria-label', activeBookingLabel+' — opens calendar booking in a new tab');
    });
    const onConnect=document.getElementById('connect-coffee-booking-link');
    if(onConnect) onConnect.href=activeBookingUrl;
  }

  function ensureCoffee() {
    if (!isPage('connect.html')) return;
    const parent = document.querySelector('.page-connect .connect-copy');
    if (!parent) return;
    let box = document.getElementById('connect-coffee-on-us');
    if (box) return;
    box = document.createElement('aside');
    box.id = 'connect-coffee-on-us';
    box.className = 'connect-coffee-invite';
    box.setAttribute('aria-labelledby', 'connect-coffee-title');
    const eyebrow = document.createElement('span');
    eyebrow.className = 'connect-coffee-eyebrow';
    eyebrow.textContent = 'A PERSONAL INVITATION / MEET RICH & KIM';
    const heading = document.createElement('h2');
    heading.id = 'connect-coffee-title';
    heading.textContent = 'COFFEE’S ON US.';
    const description = document.createElement('p');
    description.textContent = 'No agenda. No pressure. Just a chance to connect, hear your story, and get to know each other.';
    const actions = document.createElement('div');
    actions.className = 'connect-coffee-actions';
    const book = document.createElement('a');
    book.id = 'connect-coffee-booking-link';
    book.className = 'btn btn-black';
    book.href = DEFAULT_BOOKING;
    book.target = '_blank';
    book.rel = 'noopener noreferrer';
    book.append(document.createTextNode('Schedule coffee '));
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden','true');
    arrow.textContent = '↗';
    book.append(arrow);
    const about = document.createElement('a');
    about.href = ABOUT;
    about.className = 'connect-coffee-secondary';
    about.textContent = 'Meet Rich & Kim ↗';
    actions.append(book, about);
    box.append(eyebrow, heading, description, actions);
    parent.append(box);
  }

  function install() {
    normalizeInternalLinks();
    addSharedStyles();
    document.querySelectorAll('.nav-links').forEach(nav => {
      ensureAbout(nav, false);
      insertPage(nav, pages.events, false);
      insertPage(nav, pages.give, false);
    });
    document.querySelectorAll('#mobile-menu').forEach(nav => {
      ensureAbout(nav, true);
      insertPage(nav, pages.events, true);
      insertPage(nav, pages.give, true);
    });
    ensureFooter(pages.events);
    ensureFooter(pages.give);
    ensureCoffee();
    ensureStoryCoffee();
    ensureMeetTopCoffee();
    updateCoffeeButtons();
    updateActive();
  }

  install();
  // Pages CMS rebuilds the nav asynchronously: reapply links after that happens.
  window.addEventListener('risecity:content-loaded', install);
  Promise.allSettled([
    fetch('content/give.json', {cache:'no-store'}).then(r => r.ok ? r.json() : null),
    fetch('content/events.json', {cache:'no-store'}).then(r => r.ok ? r.json() : null),
    fetch('content/meet-rich-and-kim.json', {cache:'no-store'}).then(r => r.ok ? r.json() : null)
  ]).then(([giveResult, eventsResult, meetResult]) => {
    const gd = giveResult.status === 'fulfilled' ? giveResult.value : null;
    const ed = eventsResult.status === 'fulfilled' ? eventsResult.value : null;
    const md = meetResult.status === 'fulfilled' ? meetResult.value : null;
    for (const [page, data] of [[pages.give, gd], [pages.events, ed]]) {
      if (data?.page) {
        page.label = data.page.nav_label || page.label;
        page.showNav = data.page.show_in_navigation !== false;
        page.showFooter = data.page.show_in_footer !== false;
      }
    }
    const booking = safeBookingUrl(md?.friendship?.button_url);
    updateCoffeeButtons(booking, md?.friendship?.button_label);
    install();
  }).catch(() => {});
})();
