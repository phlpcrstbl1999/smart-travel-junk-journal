const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('taal-volcano-map');
mapEl.style.height='520px';
const map=L.map('taal-volcano-map',{scrollWheelZoom:false}).setView([14.0020,120.9930],12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.0020,120.9930],icon:'🌋',tag:'Volcano',tagClass:'tag--main',name:'Taal Volcano — Main Crater',desc:'Active volcano island in Taal Lake. Hike 30–45 min from boat landing to crater rim. Vivid acid crater lake. Check PHIVOLCS alert level before visiting. Mandatory guide required.'},
  {coords:[14.0200,120.9300],icon:'⛵',tag:'Boat Point',tagClass:'tag--nature',name:'Talisay Boat Landing',desc:'Main departure point for boats to Volcano Island. Register at the tourism office, pay fees, and board your banca here. Crossing takes 15–20 minutes.'},
  {coords:[14.1000,120.9600],icon:'🏔️',tag:'Viewpoint',tagClass:'tag--nature',name:'Tagaytay Ridge',desc:'The famous panoramic viewpoint of Taal Volcano from above — 700m elevation. Bulalo restaurants, People\'s Park, Picnic Grove. About 30 min from Talisay.'},
  {coords:[13.8800,121.0000],icon:'⛪',tag:'Heritage',tagClass:'tag--heritage',name:'Taal Basilica (Taal Town)',desc:'The largest Catholic church in Asia — Basilica of Saint Martin de Tours. About 30 min from Talisay. A stunning colonial landmark in the heritage town of Taal.'},
  {coords:[13.9500,121.1500],icon:'🏖️',tag:'Beach',tagClass:'tag--nature',name:'Laiya Beach (San Juan)',desc:'Batangas\' most popular white sand beach — about 1.5 hours from Talisay. Crystal-clear water, coral reefs, and beach resorts.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.0200,120.9300],[14.0020,120.9930]],{color:'#a87020',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#a87020;border-color:#a87020';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f8e060':'';});},{passive:true});
