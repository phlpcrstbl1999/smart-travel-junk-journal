const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('barasoain-map');
mapEl.style.height='520px';
const map=L.map('barasoain-map',{scrollWheelZoom:false}).setView([14.8500,120.8100],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.8500,120.8100],icon:'⛪',tag:'Heritage',tagClass:'tag--main',name:'Barasoain Church',desc:'Site of the 1898 Malolos Congress — birthplace of the First Philippine Republic and the first democratic constitution in Asia. Free entry, open daily. Museum adjacent.'},
  {coords:[14.8600,120.8200],icon:'🏙️',tag:'City',tagClass:'tag--heritage',name:'Malolos City',desc:'Capital of Bulacan province. Heritage district with ancestral houses from the revolutionary era. Good food, accommodation, and transport connections.'},
  {coords:[15.0500,121.0500],icon:'🦇',tag:'Nature',tagClass:'tag--nature',name:'Biak-na-Bato National Park (San Miguel)',desc:'Revolutionary cave system and Madlum River. Aguinaldo\'s 1897 mountain headquarters. About 1.5 hours from Malolos.'},
  {coords:[14.7500,121.1500],icon:'⛰️',tag:'Nature',tagClass:'tag--nature',name:'Mount Balagbag (Rodriguez)',desc:'1,110m mountain with panoramic Sierra Madre views. Beginner-friendly sunrise hike. About 1.5 hours from Malolos.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.8500,120.8100],[15.0500,121.0500],[14.7500,121.1500]],{color:'#2858a0',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#2858a0;border-color:#2858a0';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
