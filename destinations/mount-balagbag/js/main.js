const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('balagbag-map');
mapEl.style.height='520px';
const map=L.map('balagbag-map',{scrollWheelZoom:false}).setView([14.7500,121.1500],12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.7500,121.1500],icon:'⛰️',tag:'Mountain',tagClass:'tag--main',name:'Mount Balagbag',desc:'1,110m summit in the Sierra Madre range. Beginner-friendly trail through pine and mossy forest. Panoramic views of Metro Manila, Marikina Valley, and the Sierra Madre. Sunrise hikes popular.'},
  {coords:[14.7400,121.1400],icon:'🌿',tag:'Nature',tagClass:'tag--nature',name:'Sierra Madre Forest Trail',desc:'Pine and mossy forest trail leading to the summit. Rich in birdlife and endemic species. The vegetation changes character as you ascend.'},
  {coords:[14.8500,120.8100],icon:'⛪',tag:'Heritage',tagClass:'tag--heritage',name:'Barasoain Church (Malolos)',desc:'Birthplace of the First Philippine Republic. Site of the 1898 Malolos Congress. About 1.5 hours from Mount Balagbag.'},
  {coords:[15.0500,121.0500],icon:'🦇',tag:'Nature',tagClass:'tag--nature',name:'Biak-na-Bato National Park',desc:'Revolutionary cave system and Madlum River. About 1 hour from Mount Balagbag via San Miguel.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.7500,121.1500],[14.7400,121.1400]],{color:'#a85818',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#a85818;border-color:#a85818';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
