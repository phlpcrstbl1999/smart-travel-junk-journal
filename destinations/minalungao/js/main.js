const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('minalungao-map');
mapEl.style.height='520px';
const map=L.map('minalungao-map',{scrollWheelZoom:false}).setView([15.4500,121.0500],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[15.4500,121.0500],icon:'🏞️',tag:'Park',tagClass:'tag--main',name:'Minalungao National Park',desc:'Limestone gorge on the Penaranda River. Boat tours, swimming, cliff jumping, and cave exploration. Entrance fee: ₱50–₱100. Located in General Tinio, Nueva Ecija.'},
  {coords:[15.7000,121.1500],icon:'🏗️',tag:'Dam',tagClass:'tag--nature',name:'Pantabangan Dam',desc:'Largest reservoir in Luzon. Submerged church ruins visible during low water season. Boat tours available. About 1.5 hours from Minalungao.'},
  {coords:[15.5500,121.3000],icon:'💧',tag:'Waterfall',tagClass:'tag--nature',name:'Gabaldon Falls',desc:'Multi-tiered waterfall in the Sierra Madre foothills. Natural swimming pools and forest trek. About 1 hour from Minalungao.'},
  {coords:[15.4800,120.9700],icon:'🏙️',tag:'City',tagClass:'tag--heritage',name:'Cabanatuan City',desc:'Commercial capital of Nueva Ecija. Main hub for accommodation, food, and transport. About 30–45 min from Minalungao.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[15.4500,121.0500],[15.7000,121.1500],[15.5500,121.3000]],{color:'#189880',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#189880;border-color:#189880';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
