const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('pagsanjan-map');
mapEl.style.height='520px';
const map=L.map('pagsanjan-map',{scrollWheelZoom:false}).setView([14.2700,121.4700],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.2700,121.4700],icon:'🌊',tag:'Waterfall',tagClass:'tag--main',name:'Pagsanjan Falls (Magdapio Falls)',desc:'The Philippines\' most famous waterfall — 100-foot cascade at the end of the Pagsanjan Gorge. Reached by bamboo banca through 14 shooting rapids. Raft under the falls into the Devil\'s Pool.'},
  {coords:[14.2750,121.4650],icon:'🚣',tag:'Boat Station',tagClass:'tag--main',name:'Pagsanjan Boat Station',desc:'Starting point for the gorge journey. Register here, pay the boat fee, and meet your two bangkeros. Life jackets provided. Full trip takes 4–5 hours.'},
  {coords:[14.2680,121.4720],icon:'🏞️',tag:'Gorge',tagClass:'tag--nature',name:'Pagsanjan Gorge',desc:'A dramatic canyon of 90-meter limestone and volcanic rock cliffs draped in tropical jungle. 14 shooting rapids between the boat station and the falls.'},
  {coords:[14.1920,121.3500],icon:'🏛️',tag:'Heritage',tagClass:'tag--heritage',name:'Rizal Shrine (Calamba)',desc:'Birthplace of Dr. José Rizal — about 30 minutes from Pagsanjan. Combine for a full Laguna day trip.'},
  {coords:[14.3000,121.0800],icon:'🎡',tag:'Theme Park',tagClass:'tag--heritage',name:'Enchanted Kingdom (Santa Rosa)',desc:'The Philippines\' premier theme park — about 1 hour from Pagsanjan via SLEX.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.2750,121.4650],[14.2700,121.4700]],{color:'#148060',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#148060;border-color:#148060';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#80e8c8':'';});},{passive:true});
