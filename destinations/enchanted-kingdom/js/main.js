const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('ek-map');
mapEl.style.height='520px';
const map=L.map('ek-map',{scrollWheelZoom:false}).setView([14.3000,121.0800],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.3000,121.0800],icon:'🎡',tag:'Theme Park',tagClass:'tag--main',name:'Enchanted Kingdom',desc:'The Philippines\' premier theme park in Santa Rosa, Laguna. 7 themed zones, 25+ rides including Space Shuttle roller coaster, Anchor\'s Away, Rio Grande Rapids. EKstravaganza fireworks show on weekends.'},
  {coords:[14.2800,121.0700],icon:'🏙️',tag:'City',tagClass:'tag--heritage',name:'Santa Rosa City',desc:'One of the fastest-growing cities in the Philippines. Home to Enchanted Kingdom, Nuvali eco-urban development, and several international schools and business parks.'},
  {coords:[14.3200,121.0900],icon:'🌿',tag:'Nature',tagClass:'tag--nature',name:'Nuvali (Ayala Land)',desc:'A 2,290-hectare eco-urban development in Santa Rosa with parks, bike trails, a lake, and outdoor dining. A pleasant complement to an Enchanted Kingdom day.'},
  {coords:[14.1920,121.1650],icon:'🏛️',tag:'Heritage',tagClass:'tag--heritage',name:'Rizal Shrine (Calamba)',desc:'15 minutes south of Enchanted Kingdom — birthplace of Dr. José Rizal. Combine for a heritage-and-fun Laguna day trip.'},
  {coords:[14.2700,121.4700],icon:'🌊',tag:'Waterfall',tagClass:'tag--nature',name:'Pagsanjan Falls',desc:'About 1 hour east of Enchanted Kingdom — the Philippines\' most famous waterfall. Bamboo banca ride through 14 shooting rapids.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.3000,121.0800],[14.2800,121.0700],[14.3200,121.0900]],{color:'#6830c0',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#6830c0;border-color:#6830c0';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f8d860':'';});},{passive:true});
