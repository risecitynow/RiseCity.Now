/* Add Give to desktop/mobile/footer nav without editing saved CMS menu JSON. */
(() => {
  'use strict';
  let prefs={nav_label:'Give',show_in_navigation:true,show_in_footer:true};
  const current=()=>/\/give\.html$/.test(location.pathname);
  function install(){
    document.querySelectorAll('.nav-links, #mobile-menu').forEach(nav=>{
      const old=nav.querySelector('a[href="give.html"]');
      if(prefs.show_in_navigation===false){old?.remove();return;}
      if(old){old.textContent=prefs.nav_label+(nav.id==='mobile-menu'?' ↗':'');old.classList.toggle('nav-active',current());return;}
      const a=document.createElement('a');a.href='give.html';a.textContent=prefs.nav_label+(nav.id==='mobile-menu'?' ↗':'');
      if(current())a.className='nav-active';
      if(nav.id==='mobile-menu'){const cta=nav.lastElementChild;cta?nav.insertBefore(a,cta):nav.append(a)}
      else nav.append(a);
    });
    const footer=document.querySelector('.footer-bottom>span:last-child');
    if(footer){const old=footer.querySelector('a[href="give.html"]');
      if(prefs.show_in_footer===false){old?.remove();return;}
      if(old)old.textContent=prefs.nav_label.toUpperCase();
      else{const a=document.createElement('a');a.href='give.html';a.textContent=prefs.nav_label.toUpperCase();footer.append(a);}
    }
  }
  install();
  window.addEventListener('risecity:content-loaded',install);
  fetch('content/give.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(d=>{
    if(d?.page){prefs={...prefs,...d.page};install();}
  }).catch(()=>{});
})();
