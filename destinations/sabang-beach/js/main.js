const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('sabang-map');
mapEl.style.height='520px';
const map=L.map('sabang-map',{scrollWheelZoom:false}).setView([15.7700,121.5700],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[15.7700,121.5700],icon:'🏄',tag:'Surf Spot',tagClass:'tag--main',name:'Sabang Beach',desc:'Birthplace of Philippine surfing. Long Pacific-facing beach with year-round waves. Surf schools, board rentals, and beachfront cafes along the shore.'},
  {coords:[15.7680,121.5650],icon:'🏄',tag:'Surf Spot',tagClass:'tag--main',name:'Cemento Reef',desc:'Popular surf break for intermediate and advanced surfers. Faster, more powerful waves than the main beach. Best during northeast monsoon season.'},
  {coords:[15.7650,121.5650],icon:'⛪',tag:'Heritage',tagClass:'tag--heritage',name:'Baler Church',desc:'Site of the 1898 Siege of Baler. Founded 1735. Located in Baler town center — a short tricycle ride from Sabang Beach.'},
  {coords:[15.7500,121.5500],icon:'💧',tag:'Nature',tagClass:'tag--nature',name:'Ditumabo Mother Falls',desc:'70-meter waterfall in the Sierra Madre rainforest. 1.5–2 hour river trek. About 30–45 min from Baler via San Luis.'},
  {coords:[15.7720,121.5720],icon:'🌳',tag:'Heritage',tagClass:'tag--heritage',name:'Balete Park',desc:'Home to a 600-year-old balete tree — one of the largest in the Philippines. A short stop in Baler town before or after surfing.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[15.7700,121.5700],[15.7650,121.5650],[15.7500,121.5500]],{color:'#1870a8',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#1870a8;border-color:#1870a8';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
