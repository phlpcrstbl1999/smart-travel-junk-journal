const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('masungi-map');
mapEl.style.height='520px';
const map=L.map('masungi-map',{scrollWheelZoom:false}).setView([14.6200,121.3200],12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.6200,121.3200],icon:'🏔️',tag:'Georeserve',tagClass:'tag--main',name:'Masungi Georeserve',desc:'2,700-hectare protected limestone karst landscape in Baras, Rizal. Discovery Trail (2.5km) with hanging bridges, rope ladders, and the iconic Sapot net hammock. Mandatory advance booking at masungigeoreserve.com. No walk-ins.'},
  {coords:[14.5700,121.3800],icon:'💧',tag:'Waterfall',tagClass:'tag--nature',name:'Daranak Falls (Tanay)',desc:'15-meter waterfall with natural swimming pool — 30 minutes from Masungi. Combine for the ultimate Rizal nature day: waterfalls in the morning, limestone karst in the afternoon.'},
  {coords:[14.5800,121.1800],icon:'💧',tag:'Waterfall',tagClass:'tag--nature',name:'Hinulugang Taktak (Antipolo)',desc:'Historic waterfall in Antipolo — the most famous waterfall in Rizal province. About 45 minutes west of Masungi.'},
  {coords:[14.6300,121.1700],icon:'🌅',tag:'Viewpoint',tagClass:'tag--heritage',name:'Antipolo City',desc:'Hilltop city with panoramic views of Metro Manila. Padi\'s Point, Crescent Moon Café, and the Antipolo Cathedral. Perfect for dinner after a Masungi day.'},
  {coords:[14.6500,121.3500],icon:'🌿',tag:'Forest',tagClass:'tag--nature',name:'Sierra Madre Mountains',desc:'The longest mountain range in the Philippines and one of the most biodiverse ecosystems in Southeast Asia. Masungi sits at the foot of the Sierra Madre within the Upper Marikina River Basin Protected Landscape.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.6200,121.3200],[14.5700,121.3800]],{color:'#3a7858',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#3a7858;border-color:#3a7858';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#c8f0d8':'';});},{passive:true});
