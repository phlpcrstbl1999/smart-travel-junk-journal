const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);} }); }, {threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl = document.getElementById('patar-map');
mapEl.style.height = '520px';
const map = L.map('patar-map',{scrollWheelZoom:false}).setView([16.3800,119.8900],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk = e => L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[16.3800,119.8900],icon:'🏖️',tag:'Beach',tagClass:'tag--main',name:'Patar Beach',desc:'Wild, windswept coastline with dramatic rock formations and spectacular sunsets. Faces west over the South China Sea. Best at low tide and sunset.'},
  {coords:[16.3750,119.8850],icon:'🔦',tag:'Heritage',tagClass:'tag--heritage',name:'Cape Bolinao Lighthouse',desc:'19th-century lighthouse at the tip of Cape Bolinao. Sweeping views of the South China Sea and the Pangasinan coastline. Built 1892.'},
  {coords:[16.3820,119.8920],icon:'🌊',tag:'Nature',tagClass:'tag--nature',name:'Rock Formations & Tide Pools',desc:'Ancient coral limestone boulders sculpted by centuries of wind and waves. Tide pools teeming with sea urchins, starfish, and marine life at low tide.'},
  {coords:[16.4000,119.9100],icon:'💧',tag:'Nature',tagClass:'tag--nature',name:'Bolinao Falls',desc:'3-tiered waterfalls with natural swimming pools in the jungle. 30 min from Patar Beach. Perfect morning visit before an afternoon at the beach.'},
  {coords:[16.4200,119.9300],icon:'🏙️',tag:'Town',tagClass:'tag--heritage',name:'Bolinao Town Center',desc:'Main hub for food, accommodation, and transport. Stock up on supplies here before heading to Patar Beach. 20–30 min by tricycle.'},
  {coords:[16.1700,119.9800],icon:'🏝️',tag:'Nearby',tagClass:'tag--heritage',name:'Hundred Islands National Park',desc:'124 islands in the Lingayen Gulf. Island hopping, snorkeling, and cliff jumping. About 1 hour east of Bolinao via Alaminos.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[16.3800,119.8900],[16.3750,119.8850],[16.3820,119.8920]],{color:'#c89030',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#c89030;border-color:#c89030';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
