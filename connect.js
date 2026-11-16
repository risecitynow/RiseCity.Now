/* Rise City Connect — content controls, secure form settings, no personal-data storage. */
(() => {
  'use strict';
  const root=document.documentElement;
  const form=document.getElementById('connection-form');
  const q=(sel)=>document.querySelector(sel);
  const get=(obj,path)=>path.split('.').reduce((v,key)=>v==null?undefined:v[key],obj);
  const color=/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i;
  const allowedLocal=(url)=>/^(?:index|beliefs|give|events|connect|connect-thanks)\.html(?:#[\w-]+)?$/.test(url);
  function apply(data){
    if(!data||typeof data!=='object')return;
    document.querySelectorAll('[data-connect]').forEach(el=>{const value=get(data,el.dataset.connect);if(typeof value==='string')el.textContent=value});
    if(typeof data.page?.browser_title==='string')document.title=data.page.browser_title;
    const desc=q('meta[name="description"]');if(desc&&typeof data.page?.meta_description==='string')desc.content=data.page.meta_description;
    const ogTitle=q('meta[property="og:title"]');if(ogTitle&&data.page?.browser_title)ogTitle.content=data.page.browser_title;
    const ogDesc=q('meta[property="og:description"]');if(ogDesc&&data.page?.meta_description)ogDesc.content=data.page.meta_description;
    const fields=data.form||{};
    const reasons=q('#connect-reason');
    if(reasons&&Array.isArray(fields.reasons)&&fields.reasons.length){
      const selected=reasons.value;
      reasons.replaceChildren();
      const placeholder=new Option(fields.reason_placeholder||'Choose what brings you here','');placeholder.disabled=true;reasons.add(placeholder);
      fields.reasons.forEach(r=>{if(typeof r==='string'&&r.trim()&&r.length<100)reasons.add(new Option(r.trim(),r.trim()))});
      reasons.value=selected||'';
    }
    const phone=q('#connect-phone-field');if(phone&&typeof fields.show_phone==='boolean'){phone.hidden=!fields.show_phone;const inp=q('#connect-phone');if(inp)inp.disabled=!fields.show_phone}
    const msg=q('#connect-message-field');if(msg&&typeof fields.show_message==='boolean'){msg.hidden=!fields.show_message;const inp=q('#connect-message');if(inp)inp.disabled=!fields.show_message}
    const privacy=q('#connect-privacy');if(privacy&&typeof fields.show_privacy_note==='boolean')privacy.hidden=!fields.show_privacy_note;
    const delivery=data.delivery||{};
    if(form){
      const email=(delivery.recipient_email||'').trim();
      if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))form.action='https://formsubmit.co/'+email;
      const subject=q('input[name="_subject"]');if(subject&&typeof delivery.email_subject==='string')subject.value=delivery.email_subject.slice(0,150);
      const next=q('input[name="_next"]');if(next&&typeof delivery.thank_you_url==='string'){
        try{const u=new URL(delivery.thank_you_url,location.href);if(u.origin==='https://risecity.now'&&u.pathname.endsWith('/connect-thanks.html'))next.value=u.href}catch{}
      }
      const cap=q('input[name="_captcha"]');if(cap)cap.value=delivery.captcha_enabled===false?'false':'true';
    }
    const back=q('#connect-return-link');if(back&&typeof data.closing?.return_url==='string'&&allowedLocal(data.closing.return_url))back.href=data.closing.return_url;
    const d=data.design||{};const palette={page_background:'--connect-page',panel_background:'--connect-panel',divider_color:'--connect-rule',muted_text:'--connect-muted'};
    for(const [key,variable] of Object.entries(palette))if(color.test(d[key]||''))root.style.setProperty(variable,d[key]);
    const width=Number(d.form_max_width);if(Number.isFinite(width)&&width>=400&&width<=900)root.style.setProperty('--connect-form-width',width+'px');
    if(typeof d.show_callout==='boolean')q('#connect-callout').hidden=!d.show_callout;
    // The existing closing visibility toggle now controls the dark homepage-style block.
    if(typeof d.show_closing==='boolean')q('#connect-closing').hidden=!d.show_closing;
    // Keep the original light closing available for legacy CMS content, but off by default.
    const original=q('#connect-original-closing');
    if(original)original.hidden=d.show_original_closing!==true;
    applyQueryInterest();
  }
  function applyQueryInterest(){
    const value=new URLSearchParams(location.search).get('interest');const s=q('#connect-reason');if(!s||!value)return;
    const normalized=value.toLowerCase().replace(/[_-]/g,' ');
    const match=[...s.options].find(o=>o.value.toLowerCase()===normalized)||[...s.options].find(o=>o.value.toLowerCase().includes(normalized));
    if(match)s.value=match.value;
  }
  function keepConnectCTA(){
    const a=q('.nav-right > a.btn');if(a)a.href='connect.html';
    document.querySelectorAll('#mobile-menu a').forEach(a=>{if(a.textContent.toLowerCase().includes('connected'))a.href='connect.html';});
  }
  keepConnectCTA();
  window.addEventListener('risecity:content-loaded',keepConnectCTA);
  fetch('content/connect.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(apply).catch(()=>{applyQueryInterest()});
})();
