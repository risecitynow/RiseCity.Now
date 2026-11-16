/* Rise City Events content. No header/footer styling is applied here. */
(()=>{'use strict';
const $=(s,p=document)=>p.querySelector(s);
const get=(o,p)=>p.split('.').reduce((v,k)=>v==null?undefined:v[k],o);
const hex=/^#[0-9a-f]{6}$/i;
const assetPath=s=>typeof s==='string'&&/^assets\/[a-z0-9_.-]+\.(?:png|jpg|jpeg|webp)$/i.test(s)?s:null;
function node(tag,cls,content){const e=document.createElement(tag);if(cls)e.className=cls;if(content!==undefined)e.textContent=String(content);return e}
function add(p,t,c,v){const el=node(t,c,v);p.append(el);return el}
function eventCard(it,i){
 const el=node('article','ev-card');
 el.style.setProperty('--event-accent',hex.test(it.accent||'')?it.accent:'#8c725e');
 el.style.setProperty('--event-accent-soft',hex.test(it.accent_soft||'')?it.accent_soft:'#f3eee9');
 const photo=add(el,'div','ev-card-photo');const img=add(photo,'img');img.src=assetPath(it.image)||'assets/events-anywhere-original.webp';img.alt=it.image_alt||'';img.loading=i===0?'eager':'lazy';
 const top=add(el,'div','ev-card-top');add(top,'span','ev-card-number','0'+(i+1)+' / RISE CITY');add(top,'span','ev-card-tag','✳');
 const mark=add(el,'div','ev-card-mark');add(mark,'span','ev-rise',it.rise_word||'RISE');add(mark,'span','ev-name',it.name||'');add(mark,'span','ev-symbol').setAttribute('aria-hidden','true');
 add(el,'div','ev-card-rule');add(el,'p','ev-card-summary',it.summary||'');
 const meta=add(el,'div','ev-card-meta');add(meta,'span','ev-status-label',it.status||'DATE TO BE DETERMINED');
 const a=add(el,'a','ev-card-link');const href=it.cta_url||'#connect-next-step';a.href=/^(?:#[-_a-z0-9]+|(?:index|beliefs|give|events)\.html(?:#[-_a-z0-9]+)?)$/i.test(href)?href:'#connect-next-step';add(a,'span','',it.cta_label||'Learn more');add(a,'span','','↗').setAttribute('aria-hidden','true');return el;
}
function expCard(it){const e=node('article','ev-step');add(e,'span','ev-step-number',it.number||'');add(e,'h3','',it.title||'');add(e,'p','',it.description||'');return e}
function faqCard(it){const d=node('details'),s=add(d,'summary');add(s,'strong','',it.question||'');add(s,'span','','+').setAttribute('aria-hidden','true');add(d,'p','',it.answer||'');return d}
let state=null;
function apply(d){if(!d||typeof d!=='object')return;state=d;
 document.querySelectorAll('[data-events]').forEach(e=>{const value=get(d,e.dataset.events);if(typeof value==='string')e.textContent=value});
 if(typeof d.page?.browser_title==='string')document.title=d.page.browser_title;
 const meta=$('meta[name="description"]');if(meta&&typeof d.page?.meta_description==='string')meta.content=d.page.meta_description;
 const grid=$('#events-grid');if(grid&&Array.isArray(d.featured?.items))grid.replaceChildren(...d.featured.items.slice(0,3).map(eventCard));
 const exp=$('#experience-grid');if(exp&&Array.isArray(d.experience?.items))exp.replaceChildren(...d.experience.items.map(expCard));
 const faq=$('#faq-list');if(faq&&Array.isArray(d.faq?.items))faq.replaceChildren(...d.faq.items.map(faqCard));
 const safeUrl=s=>typeof s==='string'&&/^(?:#[-_a-z0-9]+|(?:index|beliefs|give|events)\.html(?:#[-_a-z0-9]+)?)$/i.test(s)?s:null;
 for(const [sel,url] of [['#events-primary-link',d.bottom?.primary_url],['#events-secondary-link',d.bottom?.secondary_url]])if(safeUrl(url)&&$(sel))$(sel).href=url;
 const s=d.design||{},root=document.documentElement;
 const cs={page_bg:'--ev-bg',panel_bg:'--ev-panel',text_color:'--ev-ink',muted_color:'--ev-muted',line_color:'--ev-rule'};
 for(const [key,prop] of Object.entries(cs))if(hex.test(s[key]||''))root.style.setProperty(prop,s[key]);
 for(const [key,prop,min,max,mul,unit] of [['photo_opacity_percent','--ev-photo-opacity',0,80,.01,''],['photo_blur_px','--ev-photo-blur',0,10,1,'px'],['photo_saturation_percent','--ev-photo-sat',0,120,.01,''],['hero_spacing_desktop','--ev-space-desktop',10,200,1,'px'],['hero_spacing_mobile','--ev-space-mobile',10,140,1,'px']]){const n=Number(s[key]);if(Number.isFinite(n)&&n>=min&&n<=max)root.style.setProperty(prop,n*mul+unit)}
 for(const [k,sel] of Object.entries({show_status_panel:'#event-status-panel',show_experience:'#what-to-expect',show_faq:'#event-faq',show_bottom_cta:'#connect-next-step'})){const e=$(sel);if(e&&typeof s[k]==='boolean')e.hidden=!s[k]}
 const columns=Number(s.cards_per_row);if(grid&&Number.isInteger(columns)&&columns>=1&&columns<=3)grid.style.setProperty('--ev-grid-cols',columns);
}
fetch('content/events.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(apply).catch(()=>{});
window.addEventListener('risecity:content-loaded',()=>{if(state)apply(state)});
})();