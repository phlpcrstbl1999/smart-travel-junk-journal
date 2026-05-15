const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('daranak-map');
mapEl.style.height='520px';
const map=L.map('daranak-map',{scrollWheelZoom:false}).setView([14.5700,121.3800],12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.5700,121.3800],icon:'💧',tag:'Waterfall',tagClass:'tag--main',name:'Daranak Falls',desc:'15-meter waterfall on the Daranak River in Tanay, Rizal. Wide natural swimming pool of crystal-clear mountain water. Eco-park with cottages, picnic areas, and changing rooms. 2 hours from Manila.'},
  {coords:[14.5720,121.3820],icon:'🌊',tag:'Waterfall',tagClass:'tag--main',name:'Batlag Falls',desc:'Smaller, more secluded waterfall 15–20 minutes upstream from Daranak. Less crowded and more intimate. Combine with Daranak for the full Tanay waterfall experience.'},
  {coords:[14.6200,121.3200],icon:'🏔️',tag:'Georeserve',tagClass:'tag--heritage',name:'Masungi Georeserve',desc:'One of the most spectacular conservation areas in the Philippines — limestone karst formations, hanging bridges, and net hammocks in the Sierra Madre. Must book weeks in advance.'},
  {coords:[14.6300,121.1700],icon:'🌅',tag:'Viewpoint',tagClass:'tag--nature',name:'Antipolo City',desc:'Hilltop city with panoramic views of Metro Manila. Padi\'s Point, Crescent Moon Café, and the Antipolo Cathedral. Perfect for dinner after a Rizal nature day.'},
  {coords:[14.5800,121.1800],icon:'💧',tag:'Waterfall',tagClass:'tag--main',name:'Hinulugang Taktak',desc:'Historic waterfall in Antipolo — the most famous waterfall in Rizal province. A cultural landmark and the subject of a beloved Filipino folk song.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.5700,121.3800],[14.5720,121.3820]],{color:'#128850',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#128850;border-color:#128850';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#a0f0d0':'';});},{passive:true});
