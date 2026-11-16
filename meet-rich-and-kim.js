/* Read copy and links from Pages CMS without changing the shared Rise City header/footer. */
(() => {
  'use strict';
  const get=(o,path)=>path.split('.').reduce((a,k)=>a==null?undefined:a[k],o);
  const hex=/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i;
  const safeHref=(value)=>{
    if(typeof value!=='string')return null;
    const v=value.trim();
    if(/^(?:https:\/\/[^\s]+|mailto:[^\s]+|(?:index|beliefs|events|give|connect|meet-rich-and-kim)\.html(?:#[a-z0-9_-]+)?|#[a-z0-9_-]+)$/i.test(v))return v;
    return null;
  };
  const safeAsset=v=>(typeof v==='string' && /^(?:assets\/)[-a-z0-9_/.]+\.(?:png|jpe?g|webp|svg)$/i.test(v) && !v.includes('..'))?v:null;
  function apply(d){
    if(!d||typeof d!=='object')return;
    document.querySelectorAll('[data-meet]').forEach(el=>{
      const value=get(d,el.dataset.meet);
      if(typeof value==='string')el.textContent=value;
    });
    document.querySelectorAll('[data-meet-link]').forEach(el=>{
      const href=safeHref(get(d,el.dataset.meetLink));
      if(href)el.setAttribute('href',href);
    });
    const img=document.querySelector('[data-meet-image]');
    if(img){const path=safeAsset(get(d,img.dataset.meetImage));if(path)img.src=path;const alt=get(d,'page.photo_alt');if(typeof alt==='string')img.alt=alt;}
    if(typeof d.page?.title==='string')document.title=d.page.title;
    const desc=document.querySelector('meta[name="description"]');if(desc&&typeof d.page?.description==='string')desc.content=d.page.description;
    const ogTitle=document.querySelector('meta[property="og:title"]');if(ogTitle&&typeof d.page?.title==='string')ogTitle.content=d.page.title;
    const ogDesc=document.querySelector('meta[property="og:description"]');if(ogDesc&&typeof d.page?.description==='string')ogDesc.content=d.page.description;
    const root=document.documentElement;const colors={hero_background:'--meet-hero-bg',content_background:'--meet-content-bg',soft_background:'--meet-soft-bg',dark_background:'--meet-dark-bg',dark_text:'--meet-dark-ink',photo_background:'--meet-photo-bg'};
    for(const [key,css] of Object.entries(colors)){if(hex.test(d.design?.[key]||''))root.style.setProperty(css,d.design[key]);}
    const numbers=[['hero_top_space','--meet-hero-space-top',20,200],['hero_bottom_space','--meet-hero-space-bottom',20,200],['hero_width','--meet-hero-width',800,1600]];
    for(const [key,css,min,max] of numbers){const n=Number(d.design?.[key]);if(Number.isFinite(n)&&n>=min&&n<=max)root.style.setProperty(css,n+'px');}
    for(const [key,sel] of [['show_roots','.meet-roots'],['show_professional','.meet-professional'],['show_faith','.meet-faith'],['show_friendship','.meet-friendship']]){const el=document.querySelector(sel);if(el&&typeof d.design?.[key]==='boolean')el.hidden=!d.design[key];}
    const homeLink=document.querySelector('[data-meet-home-link]');
    if(homeLink){if(typeof d.page?.home_button_label==='string')homeLink.querySelector('.meet-home-link-text').textContent=d.page.home_button_label;
      const dest=safeHref(d.page?.home_button_url);if(dest)homeLink.href=dest;}
  }
  fetch('content/meet-rich-and-kim.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(apply).catch(()=>{});
})();
