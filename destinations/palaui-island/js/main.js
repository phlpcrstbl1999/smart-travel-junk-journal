const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('palaui-map');
mapEl.style.height='520px';
const map=L.map('palaui-map',{scrollWheelZoom:false}).setView([18.0700,122.1500],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[18.0900,122.1700],icon:'🔦',tag:'Island Site',tagClass:'tag--main',name:'Cape Engaño Lighthouse',desc:'Spanish colonial lighthouse built 1892 at the northeastern tip of Palaui Island. 2–3 hour jungle trek from the beach. Panoramic views of the Pacific and Babuyan Channel.'},
  {coords:[18.0700,122.1500],icon:'🏖️',tag:'Beach',tagClass:'tag--nature',name:'Siwangag Cove',desc:'Most popular beach on Palaui Island. White sand, clear water, and excellent snorkeling around pristine coral formations. Main camping area for overnight visitors.'},
  {coords:[18.0600,122.1400],icon:'⛵',tag:'Gateway',tagClass:'tag--heritage',name:'Port Irene / Santa Ana Jump-off',desc:'Main jump-off point for Palaui Island. Register at the DENR office here. Boat crossing: 15–20 minutes. Boat rental: ₱800–₱1,200.'},
  {coords:[18.0800,122.1600],icon:'🌿',tag:'Island Site',tagClass:'tag--main',name:'Palaui Island Jungle Trail',desc:'Dense tropical forest covering most of the island. Home to rare wildlife and endemic species. The lighthouse trek passes through this jungle — hire a guide.'},
  {coords:[18.0500,122.1300],icon:'🏙️',tag:'Gateway',tagClass:'tag--heritage',name:'Santa Ana Town',desc:'Nearest town to Palaui Island. Accommodation, food, and boat operators available here. 3–4 hours from Tuguegarao City by van.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[18.0600,122.1400],[18.0700,122.1500],[18.0800,122.1600],[18.0900,122.1700]],{color:'#189070',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#189070;border-color:#189070';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
