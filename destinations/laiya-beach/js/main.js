const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('laiya-map');
mapEl.style.height='520px';
const map=L.map('laiya-map',{scrollWheelZoom:false}).setView([13.9500,121.1500],12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[13.9500,121.1500],icon:'🏖️',tag:'Beach',tagClass:'tag--main',name:'Laiya Beach (San Juan, Batangas)',desc:'Batangas\' most popular white sand beach. Fine white sand, crystal-clear turquoise water, coral reefs for snorkeling. Dozens of beach resorts from budget to mid-range. 3 hours from Manila via SLEX.'},
  {coords:[13.9400,121.1400],icon:'🤿',tag:'Diving',tagClass:'tag--nature',name:'Laiya Dive Sites',desc:'Accessible coral reefs off Laiya beach — vibrant marine life visible from the surface. Dive shops along the beach offer equipment rental and guided dives. Best snorkeling in the morning.'},
  {coords:[13.9600,121.1600],icon:'⛵',tag:'Island Hop',tagClass:'tag--nature',name:'Island Hopping (San Juan)',desc:'Boat tours to nearby islands and snorkeling spots along the San Juan coastline. Arrange through your resort for a half-day island hopping trip.'},
  {coords:[13.8800,121.0000],icon:'⛪',tag:'Heritage',tagClass:'tag--heritage',name:'Taal Basilica (Taal Town)',desc:'About 1.5 hours west — the largest Catholic church in Asia. A perfect heritage complement to the Laiya beach weekend on the drive back to Manila.'},
  {coords:[14.0020,120.9930],icon:'🌋',tag:'Volcano',tagClass:'tag--heritage',name:'Taal Volcano',desc:'About 2 hours west — the famous active volcano island in Taal Lake. Combine with Laiya for a full Batangas adventure weekend.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[13.9500,121.1500],[13.9400,121.1400],[13.9600,121.1600]],{color:'#0a98c8',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#0a98c8;border-color:#0a98c8';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f8e080':'';});},{passive:true});
