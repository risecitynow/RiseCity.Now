/* Rise City Events: Pages CMS fields backed by content/events.json. */
(()=>{'use strict';
const $=(s,p=document)=>p.querySelector(s);
const get=(o,p)=>p.split('.').reduce((v,k)=>v==null?undefined:v[k],o);
const color=/^#[0-9a-f]{6}$/i;
const assetPath=s=>typeof s==='string'&&/^assets\/[a-z0-9_.-]+\.(?:png|jpg|jpeg|webp)$/i.test(s)?s:null;
function node(tag,cls,content){const e=document.createElement(tag);if(cls)e.className=cls;if(content!=null)e.textContent=String(content);return e}
function addText(parent,tag,cls,value){const n=node(tag,cls,value);parent.append(n);return n}
function eventCard(it,i){
 const el=node('article','event-card');
 el.style.setProperty('--accent',color.test(it.accent||'')?it.accent:'#617d9b');
 el.style.setProperty('--accent-soft',color.test(it.accent_soft||'')?it.accent_soft:'#e9f0f5');
 el.style.setProperty('--accent-ink',color.test(it.logo_text||'')?it.logo_text:'#354d64');
 const frame=node('div','event-image');const im=node('img');im.src=assetPath(it.image)||'assets/rise-anywhere-film.webp';im.alt=it.image_alt||'';im.loading=i===0?'eager':'lazy';frame.append(im);addText(frame,'span','event-photo-label',String(i+1).padStart(2,'0')+' / '+(it.eyebrow||'UPCOMING').split(' ')[0]);el.append(frame);
 const body=node('div','event-content'),logo=node('div','event-logo');addText(logo,'span','event-logo-rise',it.rise_word||'RISE');addText(logo,'span','event-logo-name',it.name||'');addText(logo,'span','event-logo-star','✳');body.append(logo);
 addText(body,'div','event-category',it.eyebrow||'');addText(body,'span','event-status',it.status||'DATE COMING SOON');addText(body,'p','',it.summary||'');addText(body,'div','event-highlight',it.highlight||'');
 const a=node('a','event-cta');const href=it.cta_url||'#connect-next-step';a.href=href.startsWith('#')||/^(?:index|beliefs|give|events)\.html(?:#[a-z0-9_-]+)?$/i.test(href)?href:'#connect-next-step';a.append(document.createTextNode(it.cta_label||'Learn more'));addText(a,'span','','↗').setAttribute('aria-hidden','true');body.append(a);el.append(body);return el;
}
function experienceCard(it){const el=node('article','events-impact-card');addText(el,'span','',it.number||'');addText(el,'h3','',it.title||'');addText(el,'p','',it.description||'');return el}
function faqItem(it){const d=node('details'),s=node('summary');s.append(document.createTextNode(it.question||''));addText(s,'span','','+').setAttribute('aria-hidden','true');d.append(s);addText(d,'p','',it.answer||'');return d}
function apply(d){if(!d||typeof d!=='object')return;
 document.querySelectorAll('[data-events]').forEach(e=>{const v=get(d,e.dataset.events);if(typeof v==='string')e.textContent=v});
 if(typeof d.page?.browser_title==='string')document.title=d.page.browser_title;
 const meta=$('meta[name="description"]');if(meta&&typeof d.page?.meta_description==='string')meta.content=d.page.meta_description;
 const ogt=$('meta[property="og:title"]');if(ogt&&typeof d.page?.browser_title==='string')ogt.content=d.page.browser_title;
 const ogd=$('meta[property="og:description"]');if(ogd&&typeof d.page?.meta_description==='string')ogd.content=d.page.meta_description;
 const g=$('#events-grid');if(g&&Array.isArray(d.featured?.items))g.replaceChildren(...d.featured.items.slice(0,9).map(eventCard));
 const eg=$('#experience-grid');if(eg&&Array.isArray(d.experience?.items))eg.replaceChildren(...d.experience.items.slice(0,9).map(experienceCard));
 const f=$('#faq-list');if(f&&Array.isArray(d.faq?.items))f.replaceChildren(...d.faq.items.slice(0,20).map(faqItem));
 const safeUrl=s=>typeof s==='string'&&(s.startsWith('#')||/^(?:index|beliefs|give|events)\.html(?:#[a-z0-9_-]+)?$/i.test(s))?s:null;
 const pri=$('#events-primary-link'),sec=$('#events-secondary-link');if(pri&&safeUrl(d.bottom?.primary_url))pri.href=d.bottom.primary_url;if(sec&&safeUrl(d.bottom?.secondary_url))sec.href=d.bottom.secondary_url;
 const style=d.design||{};
 const vars={page_bg:'--events-page',hero_bg:'--events-hero-bg',panel_bg:'--events-panel',card_bg:'--events-card',text_color:'--events-ink',muted_color:'--events-muted',line_color:'--events-line'};
 for(const [k,name]of Object.entries(vars))if(color.test(style[k]||''))document.documentElement.style.setProperty(name,style[k]);
 for(const [k,name,min,max]of [['hero_spacing_desktop','--events-hero-space',10,250],['hero_spacing_mobile','--events-hero-mobile-space',10,220]]){let v=Number(style[k]);if(Number.isFinite(v)&&v>=min&&v<=max)document.documentElement.style.setProperty(name,v+'px')}
 const width=Number(style.content_width);if(Number.isFinite(width)&&width>=800&&width<=1900)document.documentElement.style.setProperty('--width',width+'px');
 const c=Number(style.cards_per_row);if(g&&Number.isInteger(c)&&c>=1&&c<=3)g.style.setProperty('--desktop-card-columns',c);
 for(const [k,selector]of Object.entries({show_status_panel:'#event-status-panel',show_experience:'#what-to-expect',show_faq:'#event-faq',show_bottom_cta:'#connect-next-step'})){const e=$(selector);if(e&&typeof style[k]==='boolean')e.hidden=!style[k]}
}
fetch('content/events.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(apply).catch(()=>{});
})();