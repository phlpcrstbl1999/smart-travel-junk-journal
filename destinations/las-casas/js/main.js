const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('lascasas-map');
mapEl.style.height='520px';
const map=L.map('lascasas-map',{scrollWheelZoom:false}).setView([14.6800,120.5200],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.6800,120.5200],icon:'🏛️',tag:'Heritage',tagClass:'tag--main',name:'Las Casas Filipinas de Acuzar',desc:'Living heritage museum with 25+ restored Spanish colonial houses on a beachfront property in Bagac. Guided tours, calesa rides, heritage dining. Book in advance.'},
  {coords:[14.6500,120.4800],icon:'✝️',tag:'Shrine',tagClass:'tag--nature',name:'Mount Samat National Shrine',desc:'92-meter cross war memorial. Diorama museum, memorial wall, and observation deck. About 30 min from Las Casas.'},
  {coords:[14.6200,120.4500],icon:'🌊',tag:'Nature',tagClass:'tag--nature',name:'Five Fingers Cove (Morong)',desc:'Five rocky peninsulas jutting into the South China Sea. Hilltop viewpoint, hidden coves, and swimming. About 30–40 min from Las Casas.'},
  {coords:[14.6700,120.5500],icon:'🏙️',tag:'Heritage',tagClass:'tag--heritage',name:'Balanga City',desc:'Capital of Bataan province. Main hub for accommodation, food, and transport. About 45 min from Las Casas.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.6500,120.4800],[14.6800,120.5200],[14.6200,120.4500]],{color:'#b07830',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#b07830;border-color:#b07830';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
