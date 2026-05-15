const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);} }); }, {threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl = document.getElementById('falls-map');
mapEl.style.height = '520px';
const map = L.map('falls-map',{scrollWheelZoom:false}).setView([16.4100,119.9200],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk = e => L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[16.4100,119.9200],icon:'💧',tag:'Waterfall',tagClass:'tag--main',name:'Bolinao Falls 1',desc:'Main waterfall — wide, powerful cascade into a deep clear pool. Most accessible tier. Life jackets available for rent. Small food stalls nearby.'},
  {coords:[16.4120,119.9220],icon:'💧',tag:'Waterfall',tagClass:'tag--main',name:'Bolinao Falls 2',desc:'Second tier — quieter and more intimate. 15–20 min hike upstream from Falls 1. Mossy rocks and a shaded pool. Far fewer visitors.'},
  {coords:[16.4140,119.9240],icon:'💧',tag:'Waterfall',tagClass:'tag--main',name:'Bolinao Falls 3',desc:'Most remote tier — 20–30 min further upstream with a guide. Pristine, secluded waterfall. Requires river crossings and some scrambling.'},
  {coords:[16.4200,119.9300],icon:'🏙️',tag:'Town',tagClass:'tag--heritage',name:'Bolinao Town Center',desc:'Main hub for food, accommodation, and transport. 15–20 min by tricycle from the falls. Stock up on supplies before heading out.'},
  {coords:[16.3800,119.8900],icon:'🏖️',tag:'Beach',tagClass:'tag--nature',name:'Patar Beach',desc:'Wild coastal beach with dramatic rock formations and spectacular sunsets. 30 min from the falls. Perfect afternoon destination after a morning at the waterfalls.'},
  {coords:[16.1700,119.9800],icon:'🏝️',tag:'Nearby',tagClass:'tag--heritage',name:'Hundred Islands National Park',desc:'124 islands in the Lingayen Gulf. Island hopping, snorkeling, and cliff jumping. About 1 hour east via Alaminos.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[16.4100,119.9200],[16.4120,119.9220],[16.4140,119.9240]],{color:'#2a9048',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#2a9048;border-color:#2a9048';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
