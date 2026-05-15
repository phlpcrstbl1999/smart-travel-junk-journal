const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('callao-map');
mapEl.style.height='520px';
const map=L.map('callao-map',{scrollWheelZoom:false}).setView([17.7500,121.8200],12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[17.7500,121.8200],icon:'🦇',tag:'Cave',tagClass:'tag--main',name:'Callao Cave',desc:'7-chamber cave system with a natural skylight and active chapel in the first chamber. 184 steps to the entrance. Guides available. Entrance fee: ₱50–₱100.'},
  {coords:[17.7480,121.8180],icon:'🌊',tag:'Nature',tagClass:'tag--nature',name:'Pinacanauan River',desc:'Scenic river at the base of Callao Cave. Boat rides and swimming available. The river approach to the cave is one of the most beautiful in the Philippines.'},
  {coords:[17.6200,121.7300],icon:'🏙️',tag:'Gateway',tagClass:'tag--heritage',name:'Tuguegarao City',desc:'Capital of Cagayan province. Main gateway to Callao Cave and Palaui Island. Flights from Manila (1 hour). Try the local pancit batil patong noodle dish.'},
  {coords:[17.7600,121.8300],icon:'🌿',tag:'Nature',tagClass:'tag--nature',name:'Peñablanca Protected Landscape',desc:'Protected area encompassing Callao Cave, the Pinacanauan River, and surrounding karst formations. Home to rare wildlife and endemic species.'},
  {coords:[18.0500,122.1000],icon:'🏝️',tag:'Nearby',tagClass:'tag--heritage',name:'Palaui Island (Santa Ana)',desc:'Pristine protected island sanctuary with the Cape Engaño Lighthouse. About 3–4 hours from Tuguegarao via Santa Ana. A perfect multi-day Cagayan itinerary.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[17.6200,121.7300],[17.7500,121.8200],[17.7480,121.8180]],{color:'#7848c0',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#7848c0;border-color:#7848c0';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
