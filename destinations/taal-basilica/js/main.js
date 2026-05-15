const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('taal-basilica-map');
mapEl.style.height='520px';
const map=L.map('taal-basilica-map',{scrollWheelZoom:false}).setView([13.8800,121.0000],12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[13.8800,121.0000],icon:'⛪',tag:'Basilica',tagClass:'tag--main',name:'Taal Basilica — Basilica of Saint Martin de Tours',desc:'The largest Catholic church in Asia. Built 1755–1865. 96m long, 48m wide, twin 42m bell towers. 144 steps to the entrance. National Cultural Treasure. Active parish church.'},
  {coords:[13.8780,120.9980],icon:'🏘️',tag:'Heritage',tagClass:'tag--heritage',name:'Taal Heritage Town',desc:'One of the best-preserved Spanish colonial towns in the Philippines. Ancestral houses, balisong (butterfly knife) workshops, barong Tagalog weavers, and local delicacies.'},
  {coords:[13.8760,120.9960],icon:'🔪',tag:'Craft',tagClass:'tag--heritage',name:'Balisong Workshops',desc:'Taal is the balisong (butterfly knife) capital of the Philippines. Visit the workshops to see the knives being handcrafted and buy authentic pieces directly from the makers.'},
  {coords:[14.0200,120.9300],icon:'⛵',tag:'Boat Point',tagClass:'tag--nature',name:'Talisay Boat Landing (Taal Volcano)',desc:'About 30 minutes north — departure point for boats to Taal Volcano Island. Combine with the basilica for the ultimate Batangas day trip.'},
  {coords:[13.9500,121.1500],icon:'🏖️',tag:'Beach',tagClass:'tag--nature',name:'Laiya Beach (San Juan)',desc:'About 1.5 hours east — Batangas\' most popular white sand beach. Crystal-clear water and coral reefs.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[13.8800,121.0000],[13.8780,120.9980],[13.8760,120.9960]],{color:'#9a6c18',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#9a6c18;border-color:#9a6c18';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f8d840':'';});},{passive:true});
