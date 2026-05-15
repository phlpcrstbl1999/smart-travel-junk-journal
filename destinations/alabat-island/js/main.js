const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('alabat-map');
mapEl.style.height='520px';
const map=L.map('alabat-map',{scrollWheelZoom:false}).setView([14.1000,121.8500],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.1000,121.8500],icon:'🏝️',tag:'Island',tagClass:'tag--main',name:'Alabat Island',desc:'Quiet island municipality in Quezon Bay — white sand beaches, mangrove forests, coconut plantations, and fishing communities. Ferry from Perez, Quezon (20–30 min crossing). Bring cash — no ATMs on the island.'},
  {coords:[14.0800,121.7800],icon:'⛴️',tag:'Ferry',tagClass:'tag--heritage',name:'Perez Ferry Terminal',desc:'Jump-off point for the Alabat Island ferry. Ferries run several times daily — check schedule at the port. Crossing takes 20–30 minutes.'},
  {coords:[14.1100,121.8600],icon:'🌿',tag:'Nature',tagClass:'tag--nature',name:'Alabat Mangrove Forest',desc:'Well-preserved mangrove forests with boardwalks — a peaceful walk through the coastal wetlands at low tide. Rich in marine life and birdlife.'},
  {coords:[13.9300,121.6200],icon:'✝️',tag:'Shrine',tagClass:'tag--heritage',name:'Kamay ni Hesus (Lucban)',desc:'About 1.5 hours west — hilltop pilgrimage shrine with 305 Stations of the Cross and a 50-foot Risen Christ statue. Combine on the return journey to Manila.'},
  {coords:[14.0500,121.4800],icon:'🌴',tag:'Plantation',tagClass:'tag--heritage',name:'Villa Escudero (San Pablo)',desc:'About 2.5 hours west — the famous waterfall restaurant and coconut plantation resort. Combine for a full Quezon province itinerary.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.0800,121.7800],[14.1000,121.8500]],{color:'#108878',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#108878;border-color:#108878';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#a0f0e0':'';});},{passive:true});
