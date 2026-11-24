/* Rise City legal links + voluntary SMS consent. Does not replace existing navigation. */
(() => {
  'use strict';
  if (window.__riseLegalInstalled) return;
  window.__riseLegalInstalled = true;
  const policy = 'privacy-policy.html';
  const terms = 'terms-of-use.html';
  const disclosure = 'I agree to receive recurring text messages from Rise City about ministry updates, events, reminders, and follow-up communications. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is optional and is not required to participate or give.';
  const makeLink = (href, label, newTab = false) => {
    const a = document.createElement('a'); a.href = href; a.textContent = label;
    if (newTab) { a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('aria-label', label + ' (opens in a new tab)'); }
    return a;
  };
  function install() {
    if (!document.getElementById('rise-legal-styles')) {
      const css = document.createElement('style'); css.id = 'rise-legal-styles';
      css.textContent = '.rise-legal-footer{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:12px 20px;padding:0 0 22px;font-size:12px;color:var(--cms-footer-ink,inherit);line-height:1.5}.rise-legal-footer a{color:inherit;text-decoration:underline;text-underline-offset:3px}.rise-legal-footer a:hover,.rise-legal-footer a:focus-visible{opacity:.85}.rise-form-legal{font-size:12px;line-height:1.55;margin:12px 0;color:inherit}.rise-form-legal a{color:inherit;text-decoration:underline;text-underline-offset:3px}.rise-sms-consent{border:1px solid var(--cms-border,#ddd);padding:13px;margin:16px 0;font-size:13px;line-height:1.55}.rise-sms-consent[hidden]{display:none!important}.rise-sms-consent label{display:flex!important;align-items:flex-start;gap:10px;cursor:pointer;line-height:1.55;font-weight:400!important;font-size:13px!important}.rise-sms-consent input[type=checkbox]{appearance:auto!important;width:18px!important;height:18px!important;min-height:0!important;flex:0 0 18px;margin:3px 0 0!important;padding:0!important;accent-color:#111}.rise-sms-consent strong{display:block;margin-bottom:4px}@media(max-width:650px){.rise-legal-footer{justify-content:flex-start}}';
      document.head.append(css);
    }
    const footer = document.querySelector('footer.footer .wrap') || document.querySelector('footer.footer');
    if (footer && !footer.querySelector('.rise-legal-footer')) {
      const nav = document.createElement('nav'); nav.className = 'rise-legal-footer'; nav.setAttribute('aria-label','Legal information');
      nav.append(makeLink(policy,'Privacy Policy'),makeLink(terms,'Terms of Use')); footer.append(nav);
    }
    const form = document.querySelector('#connection-form');
    if (form && !form.querySelector('.rise-form-legal')) {
      const note = document.createElement('p'); note.className = 'rise-form-legal';
      note.append('Read our ',makeLink(policy,'Privacy Policy',true),' and ',makeLink(terms,'Terms of Use',true),'.');
      form.append(note);
    }
    const phone = document.querySelector('#connect-phone');
    if (form && phone && !form.querySelector('#rise-sms-opt-in')) {
      // An unchecked opt-in is independent of the connection card; do not enroll from a phone number alone.
      const box = document.createElement('div'); box.className = 'rise-sms-consent';
      const label = document.createElement('label'); label.htmlFor = 'rise-sms-opt-in';
      const check = document.createElement('input'); check.type = 'checkbox'; check.id = 'rise-sms-opt-in'; check.name = 'sms_consent'; check.value = 'Yes'; check.checked = false;
      const copy = document.createElement('span'); const strong = document.createElement('strong'); strong.textContent = 'Text updates (optional)'; copy.append(strong,document.createTextNode(disclosure));
      label.append(check,copy); box.append(label);
      const legal = document.createElement('p'); legal.className = 'rise-form-legal'; legal.append(makeLink(policy,'Privacy Policy',true),' · ',makeLink(terms,'Terms of Use',true)); box.append(legal);
      const version = document.createElement('input'); version.type = 'hidden'; version.name = 'sms_consent_disclosure'; version.value = disclosure + ' [2026-11-24]'; version.disabled = true;
      const actions = form.querySelector('.connect-form-actions'); if (actions) actions.before(box,version); else form.append(box,version);
      const phoneField = document.querySelector('#connect-phone-field'); const initialRequired = phone.required;
      const sync = () => {
        const unavailable = phone.disabled || !!phoneField?.hidden;
        box.hidden = unavailable; check.disabled = unavailable;
        if (unavailable) check.checked = false;
        phone.required = initialRequired || (!unavailable && check.checked);
        version.disabled = unavailable || !check.checked;
      };
      check.addEventListener('change',sync); form.addEventListener('reset',()=>setTimeout(sync,0));
      const observer = new MutationObserver(sync); observer.observe(phone,{attributes:true,attributeFilter:['disabled']});
      if (phoneField) observer.observe(phoneField,{attributes:true,attributeFilter:['hidden']});
      sync();
    }
    // Shared CMS currently applies home metadata to interior pages; restore only legal-page metadata.
    if (document.body?.dataset.legalTitle) {
      document.title = document.body.dataset.legalTitle;
      const d = document.body.dataset.legalDescription;
      for (const [sel,value] of [['meta[name="description"]',d],['meta[property="og:description"]',d],['meta[property="og:title"]',document.title]]) {
        const el = document.querySelector(sel); if (el && value) el.content = value;
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, {once:true}); else install();
  window.addEventListener('risecity:content-loaded',install);
})();
