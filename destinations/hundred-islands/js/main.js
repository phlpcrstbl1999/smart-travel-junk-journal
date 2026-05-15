const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);} }); }, {threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl = document.getElementById('hundred-map');
mapEl.style.height = '520px';
const map = L.map('hundred-map',{scrollWheelZoom:false}).setView([16.1700,119.9800],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk = e => L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[16.1700,119.9800],icon:'⛵',tag:'Jump-off',tagClass:'tag--food',name:'Lucap Wharf',desc:'Main jump-off point for Hundred Islands. Register here, pay entrance fees, and hire your banca boat. Boat rentals: ₱800–₱1,500/day.'},
  {coords:[16.1750,119.9850],icon:'🏝️',tag:'Island',tagClass:'tag--main',name:"Governor's Island",desc:'Largest and most developed island. Caves, viewing deck, and snorkeling. The best panoramic view of the archipelago.'},
  {coords:[16.1720,119.9900],icon:'🏝️',tag:'Island',tagClass:'tag--main',name:"Quezon Island",desc:'Famous for cliff jumping platforms at 5, 8, and 12 meters. Beautiful beach and good snorkeling around the coral formations.'},
  {coords:[16.1680,119.9820],icon:'🏝️',tag:'Island',tagClass:'tag--main',name:"Children's Island",desc:'Best beach in the park — wide, white sand, and calm shallow water. Perfect for families and swimming. Great for a picnic lunch.'},
  {coords:[16.1760,119.9780],icon:'🤿',tag:'Activity',tagClass:'tag--nature',name:'Snorkeling Spots',desc:'Coral formations around several islands offer excellent snorkeling. Bring your own gear for the best experience.'},
  {coords:[16.1650,119.9750],icon:'🏝️',tag:'Island',tagClass:'tag--main',name:'Hidden Islands (Smaller)',desc:'Ask your boatman to take you to the smaller, less-visited islands. Hidden lagoons, sea caves, and secluded beaches await.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[16.1700,119.9800],[16.1750,119.9850],[16.1720,119.9900],[16.1680,119.9820]],{color:'#18a8a0',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#18a8a0;border-color:#18a8a0';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
