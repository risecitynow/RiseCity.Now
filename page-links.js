
(() => {
  'use strict';
  const pages={
    give:{href:'give.html',label:'Give',footerLabel:'GIVE',showNav:true,showFooter:true},
    events:{href:'events.html',label:'Events',footerLabel:'EVENTS',showNav:true,showFooter:true}
  };
  function current(href){ return new RegExp('/'+href.replace('.','\\.')+'$').test(location.pathname); }
  function ensureLink(nav, page, mobile){
    const old=nav.querySelector(`a[href="${page.href}"]`);
    if(page.showNav===false){ old?.remove(); return; }
    const text=page.label + (mobile?' ↗':'');
    if(old){ old.textContent=text; old.classList.toggle('nav-active', current(page.href)); return; }
    const a=document.createElement('a'); a.href=page.href; a.textContent=text; if(current(page.href)) a.className='nav-active';
    if(mobile){ const cta=Array.from(nav.querySelectorAll('a')).find(a=>/connect/i.test(a.textContent)); cta?nav.insertBefore(a, cta):nav.append(a); }
    else nav.append(a);
  }
  function ensureFooter(page){
    const footer=document.querySelector('.footer-bottom > span:last-child'); if(!footer) return;
    const old=footer.querySelector(`a[href="${page.href}"]`);
    if(page.showFooter===false){ old?.remove(); return; }
    if(old){ old.textContent=page.footerLabel; return; }
    const a=document.createElement('a'); a.href=page.href; a.textContent=page.footerLabel; footer.insertBefore(a, footer.lastElementChild || null);
  }
  function install(){
    document.querySelectorAll('.nav-links').forEach(nav=>{ ensureLink(nav, pages.events, false); ensureLink(nav, pages.give, false); });
    const mobile=document.getElementById('mobile-menu'); if(mobile){ ensureLink(mobile, pages.events, true); ensureLink(mobile, pages.give, true); }
    ensureFooter(pages.events); ensureFooter(pages.give);
  }
  install();
  window.addEventListener('risecity:content-loaded',install);
  Promise.allSettled([
    fetch('content/give.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null),
    fetch('content/events.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null)
  ]).then(([g,e])=>{
    const gd=g.status==='fulfilled'?g.value:null; const ed=e.status==='fulfilled'?e.value:null;
    if(gd?.page){ pages.give.label=gd.page.nav_label||pages.give.label; pages.give.footerLabel=(gd.page.nav_label||pages.give.label).toUpperCase(); pages.give.showNav=gd.page.show_in_navigation!==false; pages.give.showFooter=gd.page.show_in_footer!==false; }
    if(ed?.page){ pages.events.label=ed.page.nav_label||pages.events.label; pages.events.footerLabel=(ed.page.nav_label||pages.events.label).toUpperCase(); pages.events.showNav=ed.page.show_in_navigation!==false; pages.events.showFooter=ed.page.show_in_footer!==false; }
    install();
  }).catch(()=>{});
})();
