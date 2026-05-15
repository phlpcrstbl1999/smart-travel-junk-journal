const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('anawangin-map');
mapEl.style.height='520px';
const map=L.map('anawangin-map',{scrollWheelZoom:false}).setView([15.2200,119.9500],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[15.2200,119.9500],icon:'⛺',tag:'Cove',tagClass:'tag--main',name:'Anawangin Cove',desc:'Grey volcanic sand and Agoho pine trees. Boat access only. Camping destination. 20–30 min from Pundaquit Beach.'},
  {coords:[15.2400,119.9300],icon:'🏖️',tag:'Cove',tagClass:'tag--main',name:'Nagsasa Cove',desc:'Wider than Anawangin with a freshwater lagoon. Fewer visitors. 30–40 min from Pundaquit Beach.'},
  {coords:[15.2600,119.9100],icon:'🔦',tag:'Lighthouse',tagClass:'tag--nature',name:'Capones Island Lighthouse',desc:'Spanish colonial lighthouse built 1890. 30–45 min jungle trek from the island landing. Panoramic views of the Zambales coastline.'},
  {coords:[15.2000,119.9700],icon:'⛵',tag:'Jump-off',tagClass:'tag--heritage',name:'Pundaquit Beach',desc:'Main jump-off point for all three Zambales coves. Register here, hire your boat, and begin the island hopping adventure.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[15.2000,119.9700],[15.2200,119.9500],[15.2400,119.9300],[15.2600,119.9100]],{color:'#487040',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#487040;border-color:#487040';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
