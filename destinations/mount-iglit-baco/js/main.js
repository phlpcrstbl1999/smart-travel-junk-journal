const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('iglit-map');
mapEl.style.height='520px';
const map=L.map('iglit-map',{scrollWheelZoom:false}).setView([12.7000,121.0500],10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[12.7000,121.0500],icon:'🦬',tag:'Wildlife',tagClass:'tag--main',name:'Mount Iglit–Baco National Park',desc:'75,445-hectare UNESCO World Heritage Site — last stronghold of the Tamaraw (fewer than 600 left). Guided treks to Iglit grasslands for dawn wildlife viewing. Coordinate with DENR San Jose at least 1 week in advance.'},
  {coords:[12.7200,121.0700],icon:'🌿',tag:'Grasslands',tagClass:'tag--nature',name:'Iglit Grasslands — Tamaraw Viewing Area',desc:'Primary Tamaraw habitat — montane grasslands at altitude. Best viewing at dawn (5–8 AM) and dusk (4–6 PM). Overnight camping recommended for best sightings.'},
  {coords:[12.3500,121.0000],icon:'✈️',tag:'Airport',tagClass:'tag--heritage',name:'San Jose Airport (Occidental Mindoro)',desc:'Nearest airport — 1-hour flight from Manila. DENR Occidental Mindoro office is in San Jose — coordinate permits here before heading to the park.'},
  {coords:[12.3500,121.0800],icon:'🏝️',tag:'Dive Resort',tagClass:'tag--nature',name:'Pandan Island',desc:'Combine with a Pandan Island dive stay — both accessed from San Jose. Wildlife trekking + world-class diving in one Occidental Mindoro trip.'},
  {coords:[12.6700,120.4500],icon:'🐠',tag:'Reef',tagClass:'tag--nature',name:'Apo Reef Natural Park',desc:'2nd largest coral reef in the world — also accessed from San Jose/Sablayan. The ultimate Occidental Mindoro nature combination.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[12.3500,121.0000],[12.7000,121.0500]],{color:'#608028',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#608028;border-color:#608028';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#d8f0a0':'';});},{passive:true});
