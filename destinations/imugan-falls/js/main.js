const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('imugan-map');
mapEl.style.height='520px';
const map=L.map('imugan-map',{scrollWheelZoom:false}).setView([16.5200,121.0800],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[16.5200,121.0800],icon:'💧',tag:'Waterfall',tagClass:'tag--main',name:'Imugan Falls',desc:'Multi-tiered waterfall in the Caraballo Mountains. 1–2 hour trek from Barangay Imugan. Crystal-clear natural pools. Guide recommended. Environmental fee: ₱30–₱50.'},
  {coords:[16.5100,121.0900],icon:'🌿',tag:'Nature',tagClass:'tag--nature',name:'Imugan-Mt. Palali Protected Landscape',desc:'Protected area encompassing the mountain forests, rivers, and biodiversity of the Caraballo highlands. Home to Ibaloi and Kalanguya indigenous communities.'},
  {coords:[16.4800,121.1700],icon:'🏙️',tag:'Town',tagClass:'tag--heritage',name:'Bayombong (Capital)',desc:'Capital of Nueva Vizcaya. Main hub for accommodation and transport. About 1.5–2 hours from Imugan Falls via Santa Fe.'},
  {coords:[16.3500,121.1500],icon:'🦇',tag:'Adventure',tagClass:'tag--nature',name:'Capisaan Cave System (Kasibu)',desc:'One of the longest cave systems in Luzon. Multiple chambers and underground rivers. About 1–2 hours from Santa Fe via Kasibu.'},
  {coords:[16.4900,121.1600],icon:'⛪',tag:'Heritage',tagClass:'tag--heritage',name:'St. Dominic Cathedral',desc:'Diocese cathedral in Bayombong founded 1739. Beautiful Spanish colonial church on the town plaza.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[16.4800,121.1700],[16.5200,121.0800]],{color:'#2a8858',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#2a8858;border-color:#2a8858';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
