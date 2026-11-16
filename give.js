/* Rise City Giving page: editable content + safe Zelle email copy. */
(() => {
  'use strict';
  const get=(obj,path)=>path.split('.').reduce((a,k)=>a==null?null:a[k],obj);
  const color=/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i;
  let data=null;
  function apply(d){
    if(!d || typeof d!=='object')return;
    data=d;
    document.querySelectorAll('[data-give]').forEach(el=>{
      const value=get(d,el.dataset.give);
      if(typeof value!=='string')return;
      el.textContent=value;
    });
    if(typeof d.page?.browser_title==='string')document.title=d.page.browser_title;
    const meta=document.querySelector('meta[name="description"]');
    if(meta&&typeof d.page?.meta_description==='string')meta.content=d.page.meta_description;
    const ogtitle=document.querySelector('meta[property="og:title"]');
    if(ogtitle&&typeof d.page?.browser_title==='string')ogtitle.content=d.page.browser_title;
    const desc=document.querySelector('meta[property="og:description"]');
    if(desc&&typeof d.page?.meta_description==='string')desc.content=d.page.meta_description;
    if(d.bottom?.secondary_url && /^(index\.html|beliefs\.html|give\.html)(?:#[-_a-z0-9]+)?$/i.test(d.bottom.secondary_url)){
      const a=document.querySelector('#give-return');if(a)a.href=d.bottom.secondary_url;
    }
    const design=d.design||{};
    const vars={page_bg:'--give-page',hero_bg:'--give-hero-bg',text_color:'--give-ink',panel_bg:'--give-panel',panel_text:'--give-panel-text',card_bg:'--give-card',muted_color:'--give-muted',line_color:'--give-rule'};
    for(const [key,css] of Object.entries(vars))if(color.test(design[key]||''))document.documentElement.style.setProperty(css,design[key]);
    const hero=document.querySelector('.give-hero');if(hero&&color.test(design.hero_bg||''))hero.style.backgroundColor=design.hero_bg;
    const numeric=[['hero_spacing_desktop','--give-hero-space',30,180],['hero_spacing_mobile','--give-hero-mobile-space',20,130],['content_width','--width',900,1600]];
    numeric.forEach(([key,css,min,max])=>{const v=Number(design[key]);if(Number.isFinite(v)&&v>=min&&v<=max)document.documentElement.style.setProperty(css,v+'px');});
    const show={show_impact:'.give-impact',show_scripture:'.give-scripture',show_faq:'.give-faq',show_bottom_cta:'.give-bottom',show_safety_note:'.give-payment-warning'};
    for(const [key,selector] of Object.entries(show)){const el=document.querySelector(selector);if(el && typeof design[key]==='boolean')el.hidden=!design[key]}
  }
  async function copy(){
    const email=document.querySelector('#zelle-email')?.textContent?.trim()||'risecitynow@gmail.com';
    const status=document.querySelector('#zelle-copy-status');
    try{
      if(navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
      else {const el=document.createElement('textarea');el.value=email;el.style.position='fixed';el.style.opacity='0';document.body.append(el);el.select();if(!document.execCommand('copy'))throw new Error('Copy unavailable');el.remove()}
      if(status)status.textContent=data?.zelle?.copied_label||'Email copied';
      const btn=document.querySelector('#zelle-copy span[data-give]');
      if(btn){btn.textContent=data?.zelle?.copied_label||'Email copied';setTimeout(()=>btn.textContent=data?.zelle?.copy_label||'Copy Zelle email',2200)}
    }catch{ if(status)status.textContent=data?.zelle?.copy_error_label||'Select the email to copy';const el=document.querySelector('#zelle-email');if(el){const r=document.createRange();r.selectNodeContents(el);const s=window.getSelection();s.removeAllRanges();s.addRange(r)}}
  }
  document.querySelector('#zelle-copy')?.addEventListener('click',copy);
  document.querySelector('#zelle-copy-bottom')?.addEventListener('click',copy);
  fetch('content/give.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(apply).catch(()=>{});
  window.addEventListener('risecity:content-loaded',()=>{if(data)apply(data)});
})();
