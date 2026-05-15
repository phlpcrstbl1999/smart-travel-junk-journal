const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('marlboro-map');
mapEl.style.height='520px';
const map=L.map('marlboro-map',{scrollWheelZoom:false}).setView([20.4200,121.9600],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[20.4200,121.9600],icon:'🐎',tag:'Main Site',tagClass:'tag--main',name:'Marlboro Hills (Rakuh-a-Idi)',desc:'Rolling green hills with wild horses and Pacific Ocean views. Horse riding available at the base. Sacred Ivatan ancestral land. No entrance fee.'},
  {coords:[20.4100,121.9550],icon:'☕',tag:'Heritage',tagClass:'tag--heritage',name:'Honesty Coffee Shop (Ivana)',desc:'Famous unmanned store in Ivana. Pay on the honor system for local snacks, coffee, and souvenirs. Just minutes from Marlboro Hills.'},
  {coords:[20.4500,121.9700],icon:'🔦',tag:'Nature',tagClass:'tag--nature',name:'Basco Lighthouse (Naidi Hills)',desc:'Spanish colonial lighthouse with 360° panoramic views. Best at sunset. ~12 km north of Marlboro Hills in Basco town.'},
  {coords:[20.4550,121.9900],icon:'🌊',tag:'Nature',tagClass:'tag--nature',name:'Valugan Boulder Beach',desc:'A beach covered entirely in massive volcanic boulders. One of the most unusual beaches in the Philippines. Near Basco town.'},
  {coords:[20.4050,121.9500],icon:'🏘️',tag:'Heritage',tagClass:'tag--heritage',name:'Diura Fishing Village',desc:'Traditional Ivatan fishing village where fishermen still use tataya outrigger boats. Watch the boats come in with the day\'s catch.'},
  {coords:[20.4600,121.9800],icon:'🌋',tag:'Nature',tagClass:'tag--nature',name:'Mount Iraya',desc:'Active volcano rising 1,009 meters. Visible from Marlboro Hills. Trekking to the summit is possible with a local guide.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[20.4500,121.9700],[20.4200,121.9600],[20.4100,121.9550],[20.4050,121.9500]],{color:'#2a8840',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#2a8840;border-color:#2a8840';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
