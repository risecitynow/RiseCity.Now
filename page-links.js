(() => {
'use strict';
const pages={give:{href:'give.html',label:'Give',showNav:true,showFooter:true},events:{href:'events.html',label:'Events',showNav:true,showFooter:true}};
const atHome=()=>location.pathname==='/'||/\/index\.html$/.test(location.pathname);
const isPage=(href)=>location.pathname.endsWith('/'+href);
function normalizeInternalLinks(){
 if(atHome())return;
 document.querySelectorAll('.nav-links a, #mobile-menu a, .nav-right>.btn, .footer-bottom a').forEach(a=>{
   const h=a.getAttribute('href')||'';
   if(h==='#top' && a.closest('.footer-bottom'))return;
   if(/^#(top|our-story|mission|connect)$/.test(h))a.setAttribute('href',h==='#top'?'index.html':'index.html'+h);
 });
}
function insert(nav,p,mobile){
 const old=nav.querySelector(`a[href="${p.href}"]`);
 if(!p.showNav){old?.remove();return}
 const a=old||document.createElement('a');a.href=p.href;a.textContent=p.label+(mobile?' ↗':'');
 if(!old){if(mobile){const last=Array.from(nav.querySelectorAll('a')).find(x=>/connect/i.test(x.textContent));last?nav.insertBefore(a,last):nav.append(a)}else nav.append(a)}
}
function install(){
 normalizeInternalLinks();
 document.querySelectorAll('.nav-links').forEach(n=>{insert(n,pages.events,false);insert(n,pages.give,false)});
 const mob=document.getElementById('mobile-menu');if(mob){insert(mob,pages.events,true);insert(mob,pages.give,true)}
 const foot=document.querySelector('.footer-bottom>span:last-child');
 if(foot)for(const p of [pages.events,pages.give]){const old=foot.querySelector(`a[href="${p.href}"]`);if(!p.showFooter){old?.remove();continue}const a=old||document.createElement('a');a.href=p.href;a.textContent=p.label.toUpperCase();if(!old)foot.insertBefore(a,foot.querySelector('a[href="#top"]')||null)}
 const active=atHome()?'index.html':isPage('beliefs.html')?'beliefs.html':isPage('events.html')?'events.html':isPage('give.html')?'give.html':'';
 document.querySelectorAll('.nav-links a').forEach(a=>{const h=a.getAttribute('href')||'';a.classList.toggle('nav-active',Boolean(active&&(h===active||(active==='index.html'&&h==='#top'))));if(h===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
}
install();window.addEventListener('risecity:content-loaded',install);
Promise.allSettled([fetch('content/give.json',{cache:'no-store'}).then(r=>r.ok?r.json():null),fetch('content/events.json',{cache:'no-store'}).then(r=>r.ok?r.json():null)]).then(([g,e])=>{
 const a=g.status==='fulfilled'?g.value:null,b=e.status==='fulfilled'?e.value:null;
 for(const [p,d] of [[pages.give,a],[pages.events,b]])if(d?.page){p.label=d.page.nav_label||p.label;p.showNav=d.page.show_in_navigation!==false;p.showFooter=d.page.show_in_footer!==false;}
 install();
}).catch(()=>{});
})();