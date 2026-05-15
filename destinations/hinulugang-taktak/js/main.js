const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('taktak-map');
mapEl.style.height='520px';
const map=L.map('taktak-map',{scrollWheelZoom:false}).setView([14.5800,121.1800],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.5800,121.1800],icon:'💧',tag:'Waterfall',tagClass:'tag--main',name:'Hinulugang Taktak National Park',desc:'The most famous waterfall in Rizal province — a beloved cultural landmark in Antipolo City immortalized in the Filipino folk song "Sa Ugoy ng Duyan." National park with picnic areas, walking trails, and a small zoo. 30 minutes from Manila.'},
  {coords:[14.5850,121.1750],icon:'⛪',tag:'Heritage',tagClass:'tag--heritage',name:'Antipolo Cathedral',desc:'Shrine of Our Lady of Peace and Good Voyage — one of the most important Marian shrines in the Philippines. Major pilgrimage site, especially during Holy Week and May.'},
  {coords:[14.5900,121.1700],icon:'🌅',tag:'Viewpoint',tagClass:'tag--nature',name:"Padi's Point / Crescent Moon Café",desc:'Hilltop restaurants in Antipolo with panoramic views of Metro Manila. Perfect for sunset dinner after a Rizal nature day. The city lights spread out below as the sun sets.'},
  {coords:[14.5700,121.3800],icon:'💧',tag:'Waterfall',tagClass:'tag--nature',name:'Daranak Falls (Tanay)',desc:'45 minutes east — the most popular waterfall near Manila. 15-meter cascade with natural swimming pool. Combine with Hinulugang Taktak for a full Rizal waterfall day.'},
  {coords:[14.6200,121.3200],icon:'🏔️',tag:'Georeserve',tagClass:'tag--nature',name:'Masungi Georeserve (Baras)',desc:'About 1 hour east — limestone karst formations, hanging bridges, and the iconic Sapot net hammock. Must book weeks in advance at masungigeoreserve.com.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.5800,121.1800],[14.5850,121.1750],[14.5900,121.1700]],{color:'#2878a0',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#2878a0;border-color:#2878a0';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#d0f0f8':'';});},{passive:true});
