const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('pandan-map');
mapEl.style.height='520px';
const map=L.map('pandan-map',{scrollWheelZoom:false}).setView([12.3500,121.0800],10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[12.3500,121.0800],icon:'🏝️',tag:'Island',tagClass:'tag--main',name:'Pandan Island Dive Resort',desc:'Small eco-resort island off San Jose, Occidental Mindoro. 20+ dive sites, 30m+ visibility. No day-trippers — resort guests only. Gateway to Apo Reef. Fly Manila–San Jose (~1hr) then resort boat transfer.'},
  {coords:[12.3600,121.0900],icon:'🤿',tag:'Dive Site',tagClass:'tag--nature',name:'Pandan Wall',desc:'Signature dive — dramatic wall from 5m to 40m+, covered in sea fans and black coral. Regular turtle and reef shark sightings.'},
  {coords:[12.3400,121.0700],icon:'🦈',tag:'Dive Site',tagClass:'tag--nature',name:'Shark Point',desc:'Reliable shark dive — grey reef sharks and whitetip sharks at a cleaning station. One of the best shark dives in Occidental Mindoro.'},
  {coords:[12.6700,120.4500],icon:'🐠',tag:'Reef',tagClass:'tag--heritage',name:'Apo Reef Natural Park',desc:'2–3 hours by boat — the world\'s 2nd largest coral reef. Day trips and liveaboard trips arranged from Pandan Island resort.'},
  {coords:[12.3500,121.0000],icon:'✈️',tag:'Airport',tagClass:'tag--heritage',name:'San Jose Airport (Occidental Mindoro)',desc:'Nearest airport — 1-hour flight from Manila. Resort arranges boat transfers from San Jose to Pandan Island.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[12.3500,121.0000],[12.3500,121.0800]],{color:'#1090a8',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#1090a8;border-color:#1090a8';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#80f0e8':'';});},{passive:true});
