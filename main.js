
'use strict';
const nav=document.getElementById('primaryNav');
const toggle=document.getElementById('menuToggle');
toggle.addEventListener('click',()=>{
  const open=nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','Open navigation');
}));
const motion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals=document.querySelectorAll('.reveal');
if(!motion && 'IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('in-view');io.unobserve(entry.target)}
  }),{threshold:.07,rootMargin:'0px 0px 30px 0px'});
  reveals.forEach(el=>io.observe(el));
}else reveals.forEach(el=>el.classList.add('in-view'));
const progress=document.getElementById('readProgress');
const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?Math.round(scrollY/max*100):0}%`};
window.addEventListener('scroll',update,{passive:true});update();
// User-controlled filters and lightbox
const filters=document.querySelectorAll('.filter');
const imgs=document.querySelectorAll('.gallery-item');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  const cat=btn.dataset.filter;
  filters.forEach(x=>{x.classList.toggle('is-active',x===btn);x.setAttribute('aria-pressed',String(x===btn))});
  imgs.forEach(el=>el.hidden=!(cat==='all'||el.dataset.cat===cat));
}));
const lightbox=document.getElementById('lightbox');
const lbImg=document.getElementById('lightboxImage');
const lbCaption=document.getElementById('lightboxCaption');
imgs.forEach(btn=>btn.addEventListener('click',()=>{
  lbImg.src=btn.dataset.full;
  lbImg.alt=btn.querySelector('img').alt;
  lbCaption.textContent=btn.dataset.caption;
  if(typeof lightbox.showModal==='function')lightbox.showModal();
}));
document.getElementById('lightboxClose').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
document.getElementById('year').textContent=new Date().getFullYear();
