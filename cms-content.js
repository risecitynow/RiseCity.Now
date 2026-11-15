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
    return new URL(path.replace(/^\/+/,''), new URL('./', document.baseURI)).href;
  }
  function applyHome(data) {
    if (!data || typeof data !== 'object') return;
    const h=data.hero||{}, m=data.message||{}, s=data.story||{}, t=data.heart||{},
          b=data.belief_preview||{}, f=data.foundation||{}, mission=data.mission||{}, c=data.connect||{};
    applyHomeHeadings(data.headings||{});
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
      ['.calling-verse blockquote',m.scripture_quote],

      ['.foundation-bottom small',f.verse_reference],
      ['.story-footer > span strong',s.footer_line2],
      ['.contact-muted',c.empty_contact_message],
      ['.visit-intro > p',mission.introduction],
      ['.connect-right > p',c.invitation]
    ]) text(selector,val);
    firstText('.story-footer > span',s.footer_line1);
    firstText('.foundation-bottom > span',f.verse);
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
    makeHeading('.bel-hero-title',[{text:data.intro?.title_first},{text:data.intro?.title_second,outlined:true}]);
    text('.beliefs-aside h2',data.intro?.toc_heading);
    text('.bel-hero-sub',data.intro?.subtitle);
    text('.bel-hero-desc',data.intro?.description);
    if(typeof data.foundation?.heading==='string'){
      const target=one('.beliefs-end h2');if(target){target.replaceChildren();
      data.foundation.heading.split('\n').forEach((line,i)=>{if(i)target.append(document.createElement('br'));target.append(document.createTextNode(line));});
      }
    }
    text('.beliefs-end blockquote',data.foundation?.verse);
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
  function applySettings(data, home) {
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
      } else { detail.replaceChildren(); const span=document.createElement('span'); span.className='contact-muted'; span.textContent=home?.connect?.empty_contact_message || 'Contact information and online links will be announced soon.'; detail.append(span); }
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

  // Lines of editable headings are text nodes, not editor-controlled HTML.
  // The outlined line is kept as an actual styled <span>.
  function makeHeading(selector,lines) {
    const el=one(selector);
    if(!el || !lines.some(x=>typeof x.text==='string')) return;
    el.replaceChildren();
    lines.forEach((line,i)=>{
      if(i)el.append(document.createElement('br'));
      const value=typeof line.text==='string'?line.text:'';
      if(line.outlined){const sp=document.createElement('span');sp.className='outline-word';sp.textContent=value;el.append(sp);}
      else el.append(document.createTextNode(value));
    });
  }
  function mixHeading(selector,first,prefix,outlined) {
    const el=one(selector); if(!el)return;
    if(typeof first!=='string' || typeof prefix!=='string' || typeof outlined!=='string')return;
    el.replaceChildren(document.createTextNode(first),document.createElement('br'),document.createTextNode(prefix+' '));
    const span=document.createElement('span');span.className='outline-word';span.textContent=outlined;el.append(span);
  }
  function applyHomeHeadings(h) {
    const line=(k)=>typeof h[k]==='string'?h[k]:null;
    if(line('message_line1')!=null)makeHeading('#calling-heading',[
      {text:line('message_line1')},{text:line('message_outline'),outlined:true},
      {text:line('message_line3')},{text:line('message_line4')}]);
    if(line('story_line1')!=null)mixHeading('#story-heading',line('story_line1'),line('story_line2'),line('story_outline'));
    if(line('heart_line1')!=null)makeHeading('#heart-heading',[
      {text:line('heart_line1')},{text:line('heart_outline'),outlined:true}]);
    if(line('belief_line1')!=null)makeHeading('#beliefs-heading',[
      {text:line('belief_line1')},{text:line('belief_outline'),outlined:true}]);
    if(line('foundation_line1')!=null)makeHeading('#foundation-heading',[
      {text:line('foundation_line1')},{text:line('foundation_line2')},{text:line('foundation_outline'),outlined:true}]);
    if(line('mission_line1')!=null) {
      const el=one('#mission-heading'); if(el){el.replaceChildren(document.createTextNode(line('mission_line1')),document.createElement('br'));
        const outline=document.createElement('span');outline.className='outline-word';outline.textContent=line('mission_outline');
        el.append(outline,document.createTextNode(' '+line('mission_line2')));
      }
    }
    if(line('connect_line1')!=null)makeHeading('#connect-heading',[
      {text:line('connect_line1')},{text:line('connect_line2')},{text:line('connect_line3'),outlined:true}]);
  }
  const safeHref=(val)=>{
    if(typeof val!=='string'||!val.trim())return null;
    const v=val.trim();
    if(/^(mailto:|tel:)/i.test(v))return v;
    if(/^\s*(?:javascript|data|vbscript):/i.test(v))return null;
    if(/^#[-_a-z0-9]+$/i.test(v))return v;
    if(/^(?:index|beliefs)\.html(?:#[-_a-z0-9]+)?$/i.test(v)){
      return v.startsWith('index.html#') && !location.pathname.endsWith('beliefs.html')?v.slice('index.html'.length):v;
    }
    return safeUrl(v);
  };
  const setLink=(el, data)=>{
    if(!el||!data||typeof data!=='object')return;
    const dest=safeHref(data.url);
    if(dest)el.setAttribute('href',dest);
    if(typeof data.label==='string')firstTextIn(el,data.label);
    if(/^https?:\/\//.test(dest||'')){el.setAttribute('rel','noopener noreferrer');}
  };
  function firstTextIn(el,value){
    const node=[...el.childNodes].find(n=>n.nodeType===Node.TEXT_NODE && n.textContent.trim());
    if(node)node.textContent=value+' ';
    else el.insertBefore(document.createTextNode(value+' '),el.firstChild);
  }
  function applyChrome(data){
    if(!data||typeof data!=='object')return;
    const site=data.site||{};
    const beliefsPage=location.pathname.endsWith('/beliefs.html');
    const title=beliefsPage?site.beliefs_title:site.home_title;
    if(typeof title==='string'&&title)document.title=title;
    const description=beliefsPage?site.beliefs_description:site.home_description;
    if(typeof description==='string'){
      const meta=one('meta[name="description"]'); if(meta)meta.content=description;
    }
    if(typeof site.social_title==='string')all('meta[property="og:title"]').forEach(el=>el.content=site.social_title);
    if(typeof site.social_description==='string')all('meta[property="og:description"]').forEach(el=>el.content=site.social_description);
    const announce=data.announcement||{};
    firstText('.topbar-inner>span:first-child',announce.left);
    text('.topbar-inner>span:first-child .topline-star', '✳');
    const top=one('.topbar-inner>span:first-child');
    if(top && typeof announce.reference==='string'){
      const star=one('.topline-star',top);
      if(star){[...top.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE).forEach((n,i)=>{if(i>0)n.textContent=' '+announce.reference;});}
    }
    text('.topbar-inner>span:last-child',announce.right);
    const nav=data.navigation||{};
    const wordmark=one('.brand span');
    if(wordmark && typeof nav.wordmark_left==='string'){
      wordmark.replaceChildren(document.createTextNode(nav.wordmark_left+' '));
      const strong=document.createElement('strong');strong.textContent=nav.wordmark_right||'CITY';wordmark.append(strong);
    }
    if(Array.isArray(nav.links)&&nav.links.length){
      const desktop=one('.nav-links'), mobile=one('#mobile-menu');
      if(desktop)desktop.replaceChildren();
      if(mobile)mobile.replaceChildren();
      for(const item of nav.links){
        const dest=safeHref(item?.url);if(!dest)continue;
        const label=String(item.label||'Link');
        if(desktop){const a=document.createElement('a');a.href=dest;a.textContent=label;
          if((beliefsPage && dest.includes('beliefs.html'))||(!beliefsPage && ['index.html','#top'].includes(dest)))a.className='nav-active';
          desktop.append(a);}
        if(mobile){const a=document.createElement('a');a.href=dest;
          a.append(document.createTextNode(label+' '));const arrow=document.createElement('span');arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';a.append(arrow);mobile.append(a);}
      }
      if(mobile && typeof nav.cta_label==='string'){
        const dest=safeHref(nav.cta_url)||'index.html#connect';
        const a=document.createElement('a');a.href=dest;a.textContent=nav.cta_label+' ↗';mobile.append(a);

      }
    }
    setLink(one('.nav-right > .btn'),{label:nav.cta_label,url:nav.cta_url});
    const buttons=data.buttons||{};
    for(const [key,sel] of Object.entries({hero_primary:'.hero-bottom-right .btn',
      hero_secondary:'.hero-bottom-right .text-link',message_link:'.calling-copy .text-link',
      beliefs_preview:'.believers-intro .intro-right .btn',connect:'.connect-right>.btn',
      beliefs_back:'.bel-back-link'}))setLink(one(sel),buttons[key]);
    const l=data.labels||{};
    for(const [key,sel] of Object.entries({
      hero_welcome:'.hero-topline > span:first-child',hero_reference:'.hero-topline > span:last-child',
      hero_kicker:'.hero-message .section-kicker',message_kicker:'.calling .section-kicker',
      story_kicker:'.story .section-kicker',heart_kicker:'.pillars .section-kicker',
      beliefs_kicker:'.beliefs-preview .section-kicker',foundation_kicker:'.foundation .section-kicker',
      mission_kicker:'.visit .section-kicker',connect_kicker:'.connect-section .section-kicker',
      story_image_caption:'.image-corner',beliefs_page_kicker:'.bel-line > span:first-child',
beliefs_end_label:'.beliefs-end>span',
      verse_reference:'.calling-verse cite',verse_caption:'.calling-verse > span'
    }))firstText(sel,l[key]);
    const footer=data.footer||{};
    const motto=one('.footer-motto');
    if(motto && typeof footer.motto_first==='string'){
      motto.replaceChildren(document.createTextNode(footer.motto_first),document.createElement('br'),
        document.createTextNode(footer.motto_second||''),document.createElement('br'));
      const span=document.createElement('span');span.textContent=footer.motto_third||'';motto.append(span);
    }
    const copyright=one('.footer-bottom>span:first-child');
    if(copyright && typeof footer.copyright_text==='string'){
      const currentYear=new Date().getFullYear();
      copyright.replaceChildren(document.createTextNode('© '));
      const year=document.createElement('span');year.id='year';year.textContent=String(currentYear);
      copyright.append(year,document.createTextNode(' '+footer.copyright_text));
    }
    const footerLinks=all('.footer-bottom > span:last-child a');
    if(footerLinks[0])footerLinks[0].textContent=footer.nav_beliefs_label||footerLinks[0].textContent;
    if(footerLinks[1])footerLinks[1].textContent=footer.nav_mission_label||footerLinks[1].textContent;
    if(footerLinks[2])footerLinks[2].textContent=footer.nav_back_label||footerLinks[2].textContent;

  }
  function applyAppearance(data){
    if(!data||typeof data!=='object')return;
    const root=document.documentElement, p=data.palette||{},ty=data.typography||{},lay=data.layout||{};
    const color=/^#[a-f\d]{3}(?:[a-f\d]{3})?(?:[a-f\d]{2})?$/i;
    const colors={page_background:'--cms-bg',body_text:'--cms-ink',muted_text:'--cms-muted',
      card_background:'--cms-surface',alternate_background:'--cms-alt',divider:'--cms-border',
      header_background:'--cms-header-bg',header_text:'--cms-header-ink',
      announcement_background:'--cms-top-bg',announcement_text:'--cms-top-ink',
      accent:'--cms-accent',outline_text:'--cms-outline',
      button_background:'--cms-btn-bg',button_text:'--cms-btn-ink',
      light_button_background:'--cms-light-btn-bg',light_button_text:'--cms-light-btn-ink',
      dark_background:'--cms-dark-bg',dark_text:'--cms-dark-ink',footer_background:'--cms-footer-bg'};
    for(const [key,css] of Object.entries(colors))if(color.test(p[key]||''))root.style.setProperty(css,p[key]);

    // Footer colors must follow the editable footer background.
    // A pale footer needs dark text/black logo; a dark footer needs
    // white text/inverted logo. Use WCAG relative luminance to choose.
    const footerBg=color.test(p.footer_background||'')?p.footer_background:'#090909';
    function channel(v){const x=v/255;return x<=0.04045?x/12.92:Math.pow((x+0.055)/1.055,2.4);}
    function luminance(hex){
      let h=hex.slice(1,7);
      if(h.length===3)h=h.split('').map(x=>x+x).join('');
      const rgb=[0,2,4].map(i=>channel(parseInt(h.slice(i,i+2),16)));
      return 0.2126*rgb[0]+0.7152*rgb[1]+0.0722*rgb[2];
    }
    const lightFooter=luminance(footerBg)>=0.18;
    root.style.setProperty('--cms-footer-ink',lightFooter?'#111111':'#ffffff');
    root.style.setProperty('--cms-footer-muted',lightFooter?'#383838':'#d6d6d6');
    root.style.setProperty('--cms-footer-rule',lightFooter?'rgba(0,0,0,.20)':'rgba(255,255,255,.25)');
    root.style.setProperty('--cms-footer-logo-filter',lightFooter?'none':'invert(1)');

    const fonts={Manrope:'"Manrope",Arial,sans-serif','DM Sans':'"DM Sans",Arial,sans-serif',
      Inter:'"Inter",Arial,sans-serif','Space Grotesk':'"Space Grotesk",Arial,sans-serif',
      Arial:'Arial,sans-serif',Georgia:'Georgia,serif','Playfair Display':'"Playfair Display",Georgia,serif'};
    if(fonts[ty.headings_font]){root.style.setProperty('--cms-headfont',fonts[ty.headings_font]);root.style.setProperty('--serif',fonts[ty.headings_font]);}
    if(fonts[ty.body_font]){root.style.setProperty('--cms-bodyfont',fonts[ty.body_font]);root.style.setProperty('--sans',fonts[ty.body_font]);}
    const num=(v,lo,hi)=>Number.isFinite(Number(v))?Math.max(lo,Math.min(hi,Number(v))):null;
    const numberStyles=[['body_font_size','--cms-body-size',12,24,'px'],
      ['heading_scale','--cms-heading-scale',65,150,'%'],['body_line_height','--cms-line-height',1.2,2.5,''],
      ['navigation_font_size','--cms-nav-size',10,20,'px'],['letter_spacing','--cms-head-tracking',-12,3,'em']];
    for(const [key,css,lo,hi,unit] of numberStyles){const n=num(ty[key],lo,hi);if(n!==null){
      const val=key==='heading_scale'?String(n/100):key==='letter_spacing'?String(n/100)+'em':String(n)+unit;
      root.style.setProperty(css,val);
    }}
    for(const [key,css,lo,hi,unit] of [
      ['content_max_width','--width',860,1800,'px'],
      ['section_padding_desktop','--cms-section-desktop',32,220,'px'],
      ['section_padding_mobile','--cms-section-mobile',24,150,'px'],
      ['button_corner_radius','--cms-radius-button',0,50,'px'],
      ['card_corner_radius','--cms-radius-card',0,60,'px'],
      ['hero_image_radius','--cms-hero-radius',0,65,'px'],
      ['pillars_columns_desktop','--cms-pillars-columns',1,3,''],
      ['mission_columns_desktop','--cms-mission-columns',1,3,'']
    ]){const n=num(lay[key],lo,hi);if(n!==null)root.style.setProperty(css,String(n)+unit);}
    if(lay.header_sticky===false){const header=one('.site-header');if(header)header.style.position='relative';}
    if(lay.smooth_scrolling===false)root.style.scrollBehavior='auto';
    if(lay.show_announcement_bar===false){const bar=one('.topline');if(bar)bar.hidden=true;}
    const story=one('.story');
    if(story){if(['grayscale','color','sepia'].includes(lay.story_image_style))story.dataset.imageStyle=lay.story_image_style;
      if(['left','right'].includes(lay.story_photo_position))story.dataset.imageSide=lay.story_photo_position;}
    if(lay.hero_image_display==='cover')root.classList.add('cms-hero-cover');
    // Image *fit* and image *width* are separate controls.
    // A full-width image must escape the 1240px page container.
    if(lay.hero_image_width==='contained')root.classList.add('cms-hero-contained');
    if(lay.hero_height_mode==='screen')root.classList.add('cms-hero-screen-height');
    if(lay.hero_mobile_image_display==='cover')root.classList.add('cms-hero-mobile-cover');
    if(['center','left','right'].includes(lay.hero_image_position))
      root.style.setProperty('--cms-hero-object-position',lay.hero_image_position+' center');
    const screenPercent=num(lay.hero_height_screen_percentage,40,100);
    if(screenPercent!==null)
      root.style.setProperty('--cms-hero-viewport-height',screenPercent+'svh');
    const mobileHeight=num(lay.hero_mobile_cover_height,180,650);
    if(mobileHeight!==null)
      root.style.setProperty('--cms-hero-mobile-height',mobileHeight+'px');
    const sect=data.sections||{};
    const selectors={hero:'.hero',ticker:'.statement-bar',message:'.calling',story:'.story',
      heart:'.pillars',belief_preview:'.beliefs-preview',foundation:'.foundation',
      mission:'.visit',connect:'.connect-section',beliefs_hero:'.beliefs-hero',beliefs_body:'.beliefs-body'};
    if(one('.hero'))document.body.classList.add('cms-home');
    for(const [key,selector] of Object.entries(selectors)){
      const el=one(selector), section=sect[key]||{};if(!el)continue;
      el.dataset.cmsSection=key;
      if(section.visible===false)el.hidden=true;
      if(color.test(section.background_color||''))el.style.backgroundColor=section.background_color;
      if(el.parentElement?.tagName==='MAIN'){
        const n=num(section.order,1,15);if(n!==null)el.style.order=String(n);
      }
      const bg=resolveAsset(section.background_image);
      if(bg){el.dataset.hasBackgroundImage='true';el.style.setProperty('--cms-section-image','url("'+bg.replace(/["\\]/g,'')+'")');
        el.style.setProperty('--cms-image-opacity',String(num(section.image_opacity,0,100)/100));
        if(['center','top','bottom','left','right'].includes(section.image_position))el.style.setProperty('--cms-section-position',section.image_position);
      }
    }
    const themeMeta=one('meta[name="theme-color"]');
    if(themeMeta && color.test(p.header_background||''))themeMeta.content=p.header_background;
  }

  async function read(name){
    try {
      const response=await fetch('content/'+name+'.json',{cache:'no-cache'});
      if(!response.ok) throw new Error(response.statusText);
      return await response.json();
    }catch(err){console.warn('Rise City CMS: fallback HTML used for '+name,err);return null;}
  }
  Promise.all([read('home'),read('beliefs'),read('settings'),read('appearance'),read('chrome')]).then(([home,beliefs,settings,appearance,chrome])=>{
    if(appearance) applyAppearance(appearance);
    if(home) applyHome(home);
    if(beliefs) applyBeliefs(beliefs);
    if(chrome) applyChrome(chrome);
    if(settings) applySettings(settings,home);
    window.dispatchEvent(new CustomEvent('risecity:content-loaded'));
  });
})();
