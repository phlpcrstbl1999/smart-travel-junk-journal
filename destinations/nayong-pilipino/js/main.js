const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('nayong-map');
mapEl.style.height='520px';
const map=L.map('nayong-map',{scrollWheelZoom:false}).setView([15.1300,120.6900],12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[15.1300,120.6900],icon:'🇵🇭',tag:'Cultural Park',tagClass:'tag--main',name:'Nayong Pilipino Clark',desc:'Cultural theme park with miniature replicas of Philippine heritage sites from Luzon, Visayas, and Mindanao. Cultural performances, craft demos, and regional food. Entrance: ₱100–₱200. Open daily 8AM–6PM.'},
  {coords:[15.1200,120.6800],icon:'🏙️',tag:'City',tagClass:'tag--heritage',name:'Angeles City',desc:'Major city in Pampanga. Gateway to Clark Freeport Zone. Excellent Kapampangan restaurants and accommodation. About 5–10 min from Nayong Pilipino.'},
  {coords:[15.0200,120.6300],icon:'⛪',tag:'Heritage',tagClass:'tag--heritage',name:'Bacolor Sunken Church',desc:'San Guillermo Parish Church buried to roofline by 1991 Pinatubo lahar. Active parish and National Cultural Treasure. About 30 min from Nayong Pilipino.'},
  {coords:[15.0500,120.6900],icon:'🏙️',tag:'City',tagClass:'tag--heritage',name:'San Fernando City',desc:'Capital of Pampanga. Giant Lantern Festival capital. Pampanga Museum and excellent Kapampangan food. About 20 min from Nayong Pilipino.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[15.0200,120.6300],[15.1300,120.6900]],{color:'#1848a8',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#1848a8;border-color:#1848a8';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
