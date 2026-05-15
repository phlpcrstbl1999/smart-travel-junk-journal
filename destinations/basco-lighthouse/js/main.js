const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('basco-map');
mapEl.style.height='520px';
const map=L.map('basco-map',{scrollWheelZoom:false}).setView([20.4500,121.9700],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[20.4500,121.9700],icon:'🔦',tag:'Lighthouse',tagClass:'tag--main',name:'Basco Lighthouse (Naidi Hills)',desc:'Spanish colonial lighthouse on Naidi Hills above Basco town. 360° panoramic view of the Pacific Ocean, South China Sea, and Batan Island. Free entry to grounds.'},
  {coords:[20.4480,121.9680],icon:'🏙️',tag:'Heritage',tagClass:'tag--heritage',name:'Basco Town Center',desc:'Capital of Batanes. Ivatan Heritage Village, Spanish-era stone houses, local market, and traditional Ivatan food. Starting point for all island tours.'},
  {coords:[20.4200,121.9600],icon:'🐎',tag:'Nature',tagClass:'tag--nature',name:'Marlboro Hills (Rakuh-a-Idi)',desc:'Rolling green hills with wild horses and Pacific Ocean views. Horse riding available. One of the most dramatic landscapes in the Philippines. ~12 km south of Basco.'},
  {coords:[20.4100,121.9550],icon:'☕',tag:'Heritage',tagClass:'tag--heritage',name:'Honesty Coffee Shop (Ivana)',desc:'Famous unmanned store in Ivana where visitors pay on the honor system. Local snacks, coffee, and souvenirs. A unique symbol of Ivatan trust and integrity.'},
  {coords:[20.4600,121.9800],icon:'🌋',tag:'Nature',tagClass:'tag--nature',name:'Mount Iraya',desc:'Active volcano rising 1,009 meters above Batan Island. Visible from almost everywhere on the island. Trekking to the summit is possible with a local guide.'},
  {coords:[20.4550,121.9900],icon:'🌊',tag:'Nature',tagClass:'tag--nature',name:'Valugan Boulder Beach',desc:'A beach covered entirely in massive volcanic boulders shaped by Pacific waves. One of the most unusual and dramatic beaches in the Philippines.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[20.4500,121.9700],[20.4480,121.9680],[20.4200,121.9600],[20.4100,121.9550]],{color:'#1858a0',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#1858a0;border-color:#1858a0';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
