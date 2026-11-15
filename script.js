// Rise City menu and footer. All editable text/images are loaded by cms-content.js.
(() => {
  const btn=document.querySelector('#menu-button');
  const menu=document.querySelector('#mobile-menu');
  const toggle=(open)=>{
    if(!btn||!menu)return;
    btn.setAttribute('aria-expanded',String(open));
    btn.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    menu.hidden=!open;
    document.body.classList.toggle('menu-open',open);
  };
  btn?.addEventListener('click',()=>toggle(btn.getAttribute('aria-expanded')!=='true'));
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggle(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
  window.matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)toggle(false)});
  const year=document.querySelector('#year');
  if(year)year.textContent=String(new Date().getFullYear());
})();
