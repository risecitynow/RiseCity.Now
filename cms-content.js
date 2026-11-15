/* Rise City content layer for Pages CMS.
 * Pages CMS edits content/*.json on GitHub; this script displays that content
 * in the original HTML design. No site build or server-side code is needed.
 * If content cannot load, the original HTML remains a usable fallback.
 */
(() => {
  'use strict';
  const one = (s, root=document) => root.querySelector(s);
  const all = (s, root=document) => [...root.querySelectorAll(s)];
  const text = (s, value, root=document) => {
    if (typeof value !== 'string') return;
    const el = one(s, root);
    if (el) el.textContent = value;
  };
  const firstText = (s, value) => {
    if (typeof value !== 'string') return;
    const el = one(s);
    if (!el) return;
    const node = [...el.childNodes].find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    if (node) node.textContent = value + ' ';
  };
  const safeUrl = val => {
    try {
      const url = new URL(val, window.location.href);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch {return null;}
  };
  function resolveAsset(path) {
    if (typeof path !== 'string' || !path) return null;
    if (/^https?:\/\//i.test(path)) return safeUrl(path);
    // Pages CMS outputs /assets/...; normalize to work both on custom domains
    // and GitHub Pages projects under /repository-name/.
    return new URL(path.replace(/^\/+/,''), new URL('./', window.location.href)).href;
  }
  function applyHome(data) {
    if (!data || typeof data !== 'object') return;
    const h=data.hero||{}, m=data.message||{}, s=data.story||{}, t=data.heart||{},
          b=data.belief_preview||{}, f=data.foundation||{}, mission=data.mission||{}, c=data.connect||{};
    firstText('#hero-heading',h.title_first);
    text('#hero-heading .outline-word',h.title_second);
    firstText('.hero-verse',h.verse);
    text('.hero-invitation',h.invitation);
    for (const [selector, val] of [
      ['.calling-copy p.lead',m.lead],
      ['.calling-copy p:nth-of-type(2)',m.paragraph_one],
      ['.calling-copy p:nth-of-type(3)',m.paragraph_two],
      ['.calling-copy p:nth-of-type(4)',m.paragraph_three],
      ['.story-copy p.lead',s.lead],
      ['.story-copy p:nth-of-type(2)',s.paragraph_one],
      ['.story-copy p:nth-of-type(3)',s.paragraph_two],
      ['.split-heading > p',t.introduction],
      ['.believers-intro .lead',b.lead],
      ['.believers-intro .intro-right > p',b.introduction],
      ['.foundation-bottom > p',f.introduction],
      ['.visit-intro > p',mission.introduction],
      ['.connect-right > p',c.invitation]
    ]) text(selector,val);
    const fill = (arr, css, keys) => {
      if (!Array.isArray(arr)) return;
      const nodes=all(css);
      arr.forEach((item,i) => {
        if (!item || !nodes[i]) return;
        keys.forEach(([key,sel]) => text(sel,item[key],nodes[i]));
      });
    };
    fill(m.steps,'.calling-steps article',[['title','h3'],['description','p']]);
    fill(t.pillars,'.pillar',[['title','h3'],['description','p']]);
    fill(mission.cards,'.visit-card',[['title','h3'],['description','p'],['tagline','.under-label']]);
  }
  function safeHTML(html) {
    // Allow formatted paragraphs only; strip active embedded content/attributes.
    const template=document.createElement('template');
    template.innerHTML=html;
    const allowed=new Set(['P','STRONG','EM','B','I','U','BR','A','UL','OL','LI']);
    const walk=node => {
      [...node.children].forEach(child => {
        walk(child);
        if (!allowed.has(child.tagName)) child.replaceWith(...child.childNodes);
        else {
          for(const attr of [...child.attributes]) child.removeAttribute(attr.name);
        }
      });
    };
    walk(template.content);
    return template.content;
  }
  function applyBeliefs(data) {
    if (!data || typeof data !== 'object') return;
    const beliefs=Array.isArray(data.beliefs)?data.beliefs:[];
    text('.bel-hero-sub',data.intro?.subtitle);
    text('.bel-hero-desc',data.intro?.description);
    text('.beliefs-end p:nth-of-type(1)',data.foundation?.paragraph_one);
    text('.beliefs-end p:nth-of-type(2)',data.foundation?.paragraph_two);
    beliefs.forEach((entry, i)=>{
      if (!entry || typeof entry !== 'object') return;
      const el=one('.beliefs-article#'+CSS.escape(entry.id||''));
      if (el) {
        text('h2',`${i+1}. ${entry.title||''}`,el);
        const existing=all('p:not(.scripture)',el);
        if (typeof entry.body==='string') {
          const fragment=safeHTML(entry.body);
          if(existing.length) existing[0].before(fragment);
          else one('.scripture',el)?.before(fragment);
          existing.forEach(p=>p.remove());
        }
        const sc=one('.scripture',el);
        if(sc && typeof entry.scriptures==='string') {
          sc.replaceChildren();
          const caption=document.createElement('strong'); caption.textContent='SCRIPTURE';
          sc.append(caption,document.createTextNode(entry.scriptures));
        }
      }
      const homeLink=all('.belief-link-grid .belief-link:not(.belief-link-all)')[i];
      if(homeLink && typeof entry.home_label==='string') text('strong',entry.home_label,homeLink);
      const toc=all('.toc a')[i];
      if(toc && typeof entry.menu_label==='string') {
        const num=one('span',toc);
        toc.replaceChildren(num||document.createTextNode(String(i+1).padStart(2,'0')),document.createTextNode(entry.menu_label));
      }
    });
  }
  function applySettings(data) {
    if (!data || typeof data !== 'object') return;
    const images=data.images||{};
    const mapping={
      'hero_banner':['.hero-banner-image'],
      'mobile_wordmark':['.mobile-wordmark','.footer-top img'],
      'people_photo':['.mobile-people','.story-image-wrap > img'],
      'monogram':['.brand img','.foundation-watermark'],
      'social_preview':[],
      'favicon':['link[rel="icon"]']
    };
    for(const [key,sels] of Object.entries(mapping)) {
      const path=resolveAsset(images[key]);
      if(!path) continue;
      for(const sel of sels) all(sel).forEach(img=>{ if(img.tagName==='LINK') img.href=path; else img.src=path; });
    }
    const social=resolveAsset(images.social_preview);
    if(social) all('meta[property="og:image"]').forEach(el=>el.setAttribute('content',social));
    const contact=data.contact||{};
    const detail=one('#contact-details');
    if(detail) {
      const items=[];
      if(contact.email) items.push({label:contact.email,href:'mailto:'+contact.email});
      if(contact.phone) items.push({label:contact.phone,href:'tel:'+contact.phone.replace(/[^\d+]/g,'')});
      if(items.length){
        detail.replaceChildren();
        items.forEach(item=>{const a=document.createElement('a');a.href=item.href;a.textContent=item.label;detail.append(a);});
      } else detail.innerHTML='<span class="contact-muted">Contact information and online links will be announced soon.</span>';
    }
    const socials=one('#social-links');
    if(socials){
      socials.replaceChildren();
      for(const [key,label] of [['instagram','Instagram'],['facebook','Facebook'],['youtube','YouTube'],['giving_url','Give Online']]){
        const href=safeUrl(contact[key]);
        if(!href)continue;
        const a=document.createElement('a');a.href=href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label+' ↗';socials.append(a);
      }
    }
  }
  async function read(name){
    try {
      const response=await fetch('content/'+name+'.json',{cache:'no-cache'});
      if(!response.ok) throw new Error(response.statusText);
      return await response.json();
    }catch(err){console.warn('Rise City CMS: fallback HTML used for '+name,err);return null;}
  }
  Promise.all([read('home'),read('beliefs'),read('settings')]).then(([home,beliefs,settings])=>{
    if(home) applyHome(home);
    if(beliefs) applyBeliefs(beliefs);
    if(settings) applySettings(settings);
    window.dispatchEvent(new CustomEvent('risecity:content-loaded'));
  });
})();
