const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('capas-map');
mapEl.style.height='520px';
const map=L.map('capas-map',{scrollWheelZoom:false}).setView([15.3300,120.5900],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[15.3300,120.5900],icon:'🕊️',tag:'Shrine',tagClass:'tag--main',name:'Capas National Shrine',desc:'Memorial to victims of the 1942 Bataan Death March and Camp O\'Donnell. Obelisk monument, memorial wall, and museum. Free entry. Open daily 8AM–5PM.'},
  {coords:[15.5000,120.4500],icon:'✝️',tag:'Monastery',tagClass:'tag--heritage',name:'Monasterio de Tarlac',desc:'Hilltop Benedictine monastery with relic of the True Cross, Risen Christ statue, and panoramic views. Free entry. About 1 hour from Capas.'},
  {coords:[15.4800,120.5800],icon:'🌾',tag:'Farm',tagClass:'tag--nature',name:'Sumino Farm',desc:'Agri-tourism farm with vegetable picking, animal feeding, and farm-to-table dining. Book in advance. About 45 min from Capas.'},
  {coords:[15.4700,120.5900],icon:'🏙️',tag:'City',tagClass:'tag--heritage',name:'Tarlac City',desc:'Capital of Tarlac province. Main hub for accommodation, food, and transport. About 30 min from Capas National Shrine.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[15.3300,120.5900],[15.5000,120.4500],[15.4800,120.5800]],{color:'#686848',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#686848;border-color:#686848';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
