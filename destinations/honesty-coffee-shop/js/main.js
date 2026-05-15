const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('honesty-map');
mapEl.style.height='520px';
const map=L.map('honesty-map',{scrollWheelZoom:false}).setView([20.4100,121.9550],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[20.4100,121.9550],icon:'☕',tag:'Main Site',tagClass:'tag--main',name:'Honesty Coffee Shop',desc:'Unmanned honor-system store in Ivana since 1999. Local snacks, coffee, drinks, and Batanes souvenirs. Pay exact amount in the collection box. No cashier, no CCTV.'},
  {coords:[20.4200,121.9600],icon:'🐎',tag:'Nature',tagClass:'tag--nature',name:'Marlboro Hills (Rakuh-a-Idi)',desc:'Rolling green hills with wild horses and Pacific Ocean views. Horse riding available. Just minutes from the Honesty Coffee Shop.'},
  {coords:[20.4050,121.9500],icon:'🏘️',tag:'Heritage',tagClass:'tag--heritage',name:'Diura Fishing Village',desc:'Traditional Ivatan fishing village. Watch fishermen bring in their catch using tataya outrigger boats. Authentic Ivatan coastal life.'},
  {coords:[20.4500,121.9700],icon:'🔦',tag:'Heritage',tagClass:'tag--heritage',name:'Basco Lighthouse (Naidi Hills)',desc:'Spanish colonial lighthouse with 360° panoramic views. Best at sunset. ~12 km north in Basco town.'},
  {coords:[20.4080,121.9530],icon:'🏘️',tag:'Heritage',tagClass:'tag--heritage',name:'Ivana Municipality',desc:'The municipality where the Honesty Coffee Shop is located. Traditional Ivatan stone houses, local church, and a peaceful rural atmosphere.'},
  {coords:[20.4550,121.9900],icon:'🌊',tag:'Nature',tagClass:'tag--nature',name:'Valugan Boulder Beach',desc:'A beach covered entirely in massive volcanic boulders. One of the most unusual beaches in the Philippines. Near Basco town.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[20.4500,121.9700],[20.4200,121.9600],[20.4100,121.9550],[20.4050,121.9500]],{color:'#a06020',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#a06020;border-color:#a06020';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
