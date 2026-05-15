const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('portirene-map');
mapEl.style.height='520px';
const map=L.map('portirene-map',{scrollWheelZoom:false}).setView([18.0500,122.1300],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[18.0500,122.1300],icon:'⚓',tag:'Port',tagClass:'tag--main',name:'Port Irene',desc:'Deep-water port and jump-off point for Palaui Island. Part of the Cagayan Special Economic Zone. Scenic coastal views of the Pacific Ocean and Palaui Island.'},
  {coords:[18.0700,122.1500],icon:'🏝️',tag:'Island',tagClass:'tag--nature',name:'Palaui Island',desc:'Pristine 3,500-hectare protected wildlife sanctuary. Cape Engaño Lighthouse, Siwangag Cove, and pristine coral reefs. 15–20 min boat ride from Port Irene.'},
  {coords:[18.0900,122.1700],icon:'🔦',tag:'Island',tagClass:'tag--nature',name:'Cape Engaño Lighthouse',desc:'Spanish colonial lighthouse built 1892 at the northeastern tip of Palaui Island. 2–3 hour jungle trek. Panoramic Pacific views.'},
  {coords:[18.0480,122.1280],icon:'🏙️',tag:'Town',tagClass:'tag--heritage',name:'Santa Ana Town Center',desc:'Nearest town to Port Irene. Accommodation, restaurants, and boat operators. DENR office for Palaui Island registration. 3–4 hours from Tuguegarao.'},
  {coords:[17.6200,121.7300],icon:'🏙️',tag:'Gateway',tagClass:'tag--heritage',name:'Tuguegarao City',desc:'Capital of Cagayan. Main gateway to the region. Flights from Manila (1 hour). Starting point for the journey to Santa Ana and Port Irene.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[17.6200,121.7300],[18.0480,122.1280],[18.0500,122.1300],[18.0700,122.1500],[18.0900,122.1700]],{color:'#2a5890',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#2a5890;border-color:#2a5890';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
