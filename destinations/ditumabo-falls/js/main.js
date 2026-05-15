const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('ditumabo-map');
mapEl.style.height='520px';
const map=L.map('ditumabo-map',{scrollWheelZoom:false}).setView([15.7500,121.5500],12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[15.7500,121.5500],icon:'💧',tag:'Waterfall',tagClass:'tag--main',name:'Ditumabo Mother Falls',desc:'70-meter waterfall in the Sierra Madre rainforest. 1.5–2 hour river trek each way. Guide mandatory. Environmental fee: ₱50. Located in San Luis, Aurora.'},
  {coords:[15.7600,121.5600],icon:'🌿',tag:'Nature',tagClass:'tag--nature',name:'Northern Sierra Madre Natural Park',desc:'One of the largest and most biodiverse protected areas in the Philippines. Home to rare wildlife, endemic birds, and plant species found nowhere else on Earth.'},
  {coords:[15.7700,121.5700],icon:'🏄',tag:'Beach',tagClass:'tag--heritage',name:'Sabang Beach (Baler)',desc:'The birthplace of Philippine surfing. Long Pacific-facing beach with year-round waves. About 30–45 min from San Luis via Baler.'},
  {coords:[15.7650,121.5650],icon:'⛪',tag:'Heritage',tagClass:'tag--heritage',name:'Baler Church',desc:'Site of the 1898 Siege of Baler — 57 Spanish soldiers held out for 337 days. Founded 1735. Located in Baler town center.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[15.7700,121.5700],[15.7500,121.5500]],{color:'#1a7848',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#1a7848;border-color:#1a7848';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
