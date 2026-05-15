const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('aguinaldo-map');
mapEl.style.height='520px';
const map=L.map('aguinaldo-map',{scrollWheelZoom:false}).setView([14.3500,120.9000],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.3500,120.9000],icon:'🇵🇭',tag:'Shrine',tagClass:'tag--main',name:'Aguinaldo Shrine',desc:'Ancestral home of Gen. Emilio Aguinaldo. Site of the June 12, 1898 Philippine Independence proclamation. Guided tours, hidden rooms, and museum. Open Tue–Sun 8AM–5PM.'},
  {coords:[14.3800,120.5700],icon:'⚓',tag:'Island',tagClass:'tag--heritage',name:'Corregidor Island',desc:'WWII fortress island at the mouth of Manila Bay. Malinta Tunnel, Pacific War Memorial, and ruins. Ferry from CCP Complex. Book in advance.'},
  {coords:[14.1000,120.9600],icon:'🌋',tag:'Viewpoint',tagClass:'tag--nature',name:'Tagaytay Ridge',desc:'Panoramic view of Taal Volcano and Lake. Cool highland climate, excellent bulalo, and fresh strawberries. About 1 hour from Kawit.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.3500,120.9000],[14.3800,120.5700],[14.1000,120.9600]],{color:'#2858a0',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#2858a0;border-color:#2858a0';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
