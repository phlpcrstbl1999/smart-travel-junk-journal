const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('rizal-map');
mapEl.style.height='520px';
const map=L.map('rizal-map',{scrollWheelZoom:false}).setView([14.1920,121.1650],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.1920,121.1650],icon:'🏛️',tag:'Heritage',tagClass:'tag--main',name:'Rizal Shrine (Calamba)',desc:'Ancestral home and birthplace of Dr. José Rizal, June 19, 1861. National Cultural Treasure. Guided tours of the restored bahay na bato, museum, and garden. Open Tue–Sun, 8AM–5PM.'},
  {coords:[14.1910,121.1640],icon:'⛪',tag:'Church',tagClass:'tag--heritage',name:'San Juan Bautista Parish Church',desc:'Historic colonial church closely associated with the Rizal family. Adjacent to the Calamba City Hall plaza. Rizal was baptized here.'},
  {coords:[14.1500,121.1200],icon:'♨️',tag:'Hot Springs',tagClass:'tag--nature',name:'Calamba Hot Springs',desc:'Natural hot spring resort complexes in Calamba — a relaxing complement to the heritage visit. Several resorts offer day use of hot spring pools.'},
  {coords:[14.2700,121.4700],icon:'🌊',tag:'Waterfall',tagClass:'tag--nature',name:'Pagsanjan Falls',desc:'30 minutes east of Calamba — the Philippines\' most famous waterfall. Bamboo banca ride through 14 shooting rapids in the Pagsanjan Gorge.'},
  {coords:[14.3000,121.0800],icon:'🎡',tag:'Theme Park',tagClass:'tag--heritage',name:'Enchanted Kingdom (Santa Rosa)',desc:'15 minutes north of Calamba — the Philippines\' premier theme park. Perfect for families combining heritage and fun in one day.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.1920,121.1650],[14.1910,121.1640]],{color:'#b02020',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#b02020;border-color:#b02020';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0c880':'';});},{passive:true});
