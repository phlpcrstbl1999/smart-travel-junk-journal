const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('baler-map');
mapEl.style.height='520px';
const map=L.map('baler-map',{scrollWheelZoom:false}).setView([15.7650,121.5650],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[15.7650,121.5650],icon:'⛪',tag:'Heritage',tagClass:'tag--main',name:'Baler Church (San Luis Obispo de Tolosa)',desc:'Site of the 1898 Siege of Baler — 57 Spanish soldiers held out for 337 days. Founded 1735. Free entry, open daily. Museo de Baler adjacent.'},
  {coords:[15.7660,121.5660],icon:'🏛️',tag:'Heritage',tagClass:'tag--main',name:'Museo de Baler',desc:'Museum documenting the Siege of Baler, Aurora province history, and the indigenous Agta people. Entrance: ₱30–₱50. Open Tue–Sun 9AM–5PM.'},
  {coords:[15.7720,121.5720],icon:'🌳',tag:'Heritage',tagClass:'tag--main',name:'Balete Park',desc:'Home to a 600-year-old balete tree — one of the largest in the Philippines. A short walk from the church in Baler town.'},
  {coords:[15.7700,121.5700],icon:'🏄',tag:'Activity',tagClass:'tag--nature',name:'Sabang Beach',desc:'Birthplace of Philippine surfing. Long Pacific-facing beach with year-round waves. About 10–15 min by tricycle from Baler Church.'},
  {coords:[15.7500,121.5500],icon:'💧',tag:'Nature',tagClass:'tag--heritage',name:'Ditumabo Mother Falls',desc:'70-meter waterfall in the Sierra Madre rainforest. 1.5–2 hour river trek. About 30–45 min from Baler via San Luis.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[15.7650,121.5650],[15.7700,121.5700],[15.7500,121.5500]],{color:'#9a6020',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#9a6020;border-color:#9a6020';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
