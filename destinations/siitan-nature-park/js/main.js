const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('siitan-map');
mapEl.style.height='520px';
const map=L.map('siitan-map',{scrollWheelZoom:false}).setView([16.4600,121.4900],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[16.4600,121.4900],icon:'🌿',tag:'Park',tagClass:'tag--main',name:'Siitan Nature\'s Park',desc:'Community ecotourism park along the Siitan River. Crystal-clear swimming holes, Sierra Madre forest walks, and riverside picnic areas. Entrance fee: ₱30–₱50.'},
  {coords:[16.4800,121.4700],icon:'🏙️',tag:'Town',tagClass:'tag--heritage',name:'Cabarroguis (Capital)',desc:'Capital of Quirino province. Main hub for accommodation, food, and transport. About 20–40 minutes from Siitan Nature\'s Park.'},
  {coords:[16.5000,121.4500],icon:'🦇',tag:'Nature',tagClass:'tag--nature',name:'Aglipay Caves National Park',desc:'Protected cave network with bat colonies and national park forest. Perfect morning destination before Siitan in the afternoon.'},
  {coords:[16.5200,121.4300],icon:'🌊',tag:'Nature',tagClass:'tag--nature',name:'Governor Rapids',desc:'Dramatic rapids on the Cagayan River with swimming holes and kayaking. Great midday stop between Aglipay Caves and Siitan.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[16.5000,121.4500],[16.5200,121.4300],[16.4600,121.4900]],{color:'#309868',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#309868;border-color:#309868';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
