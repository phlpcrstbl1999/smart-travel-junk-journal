const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('apo-reef-map');
mapEl.style.height='520px';
const map=L.map('apo-reef-map',{scrollWheelZoom:false}).setView([12.6700,120.4500],10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[12.6700,120.4500],icon:'🐠',tag:'Reef',tagClass:'tag--main',name:'Apo Reef Natural Park',desc:'2nd largest contiguous coral reef in the world — 34 km², 500+ fish species, 400+ coral species. UNESCO WH candidate. Accessed from Sablayan, Occidental Mindoro (2–3 hr boat). Best Nov–May.'},
  {coords:[12.6800,120.4600],icon:'🦈',tag:'Dive Site',tagClass:'tag--nature',name:'Apo Reef Wall & Shark Ridge',desc:'The signature dive — dramatic outer wall drop-off with grey reef sharks, whitetip sharks, and large pelagics. Visibility often 30m+. Advanced divers only.'},
  {coords:[12.6600,120.4400],icon:'🌊',tag:'Dive Site',tagClass:'tag--nature',name:'Binangaan Pass',desc:'Exhilarating drift dive through the pass — strong currents, enormous schools of barracuda, jacks, and snappers. One of the best drift dives in the Philippines.'},
  {coords:[12.8500,120.7700],icon:'⛴️',tag:'Access',tagClass:'tag--heritage',name:'Sablayan, Occidental Mindoro',desc:'Main jump-off point for Apo Reef — 2–3 hour boat crossing. Dive operators, basic guesthouses, and the Sablayan Tourism Office are here.'},
  {coords:[13.5000,121.0000],icon:'🤿',tag:'Dive Hub',tagClass:'tag--heritage',name:'Puerto Galera (Oriental Mindoro)',desc:'Major dive hub — liveaboard trips to Apo Reef depart from here. Also home to White Beach and excellent local diving.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[12.8500,120.7700],[12.6700,120.4500]],{color:'#0a60c8',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#0a60c8;border-color:#0a60c8';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#80e8f8':'';});},{passive:true});
