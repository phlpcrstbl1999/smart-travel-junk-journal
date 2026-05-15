const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('malasimbo-map');
mapEl.style.height='520px';
const map=L.map('malasimbo-map',{scrollWheelZoom:false}).setView([13.5000,121.0300],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[13.5000,121.0300],icon:'🏔️',tag:'Mountain',tagClass:'tag--main',name:'Mount Malasimbo',desc:'Scenic mountain above Puerto Galera Bay — panoramic views of the Verde Island Passage. Home of the Malasimbo Music and Arts Festival (March annually). Accessible by motorbike or tricycle from White Beach in 20–30 min.'},
  {coords:[13.5100,121.0200],icon:'🏖️',tag:'Beach',tagClass:'tag--nature',name:'White Beach, Puerto Galera',desc:'Main beach hub — 20–30 min from Mount Malasimbo. Fine white sand, clear water, dive shops, restaurants. Ferry from Batangas City (~1 hr).'},
  {coords:[13.4800,121.0000],icon:'💧',tag:'Waterfall',tagClass:'tag--nature',name:'Tamaraw Falls',desc:'30-meter waterfall 15 km from Puerto Galera. Combine with Mount Malasimbo for the perfect Puerto Galera inland half-day.'},
  {coords:[13.5200,121.0500],icon:'🤿',tag:'Dive Hub',tagClass:'tag--heritage',name:'Sabang Beach',desc:'Puerto Galera\'s world-famous dive hub — The Canyons, Hole in the Wall, Shark Cave. Numerous dive shops and liveaboard operators.'},
  {coords:[13.5300,121.0100],icon:'🏖️',tag:'Beach',tagClass:'tag--nature',name:'Aninuan & Talipanan Beaches',desc:'Quieter alternatives to White Beach — less developed, more peaceful. Short tricycle ride west of White Beach.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[13.5100,121.0200],[13.5000,121.0300],[13.4800,121.0000]],{color:'#5040c8',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#5040c8;border-color:#5040c8';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f8e060':'';});},{passive:true});
