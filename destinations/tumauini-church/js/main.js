const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('tumauini-map');
mapEl.style.height='520px';
const map=L.map('tumauini-map',{scrollWheelZoom:false}).setView([17.1500,121.8000],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[17.1500,121.8000],icon:'⛪',tag:'Heritage',tagClass:'tag--main',name:'Tumauini Church',desc:'Saint Matthias Parish Church — unique terracotta tile Baroque facade completed 1783. UNESCO Tentative List. Free entry, open daily. Located on the Tumauini town plaza.'},
  {coords:[17.1200,121.8700],icon:'🪖',tag:'Historical',tagClass:'tag--heritage',name:'Ilagan Japanese Tunnel',desc:'World War II underground complex in Ilagan City. Guided tours available. Entrance fee: ₱30–₱50. About 30 km south of Tumauini.'},
  {coords:[16.9500,121.5500],icon:'🏗️',tag:'Nature',tagClass:'tag--nature',name:'Magat Dam',desc:'One of the largest dams in the Philippines. Walk the 1,140m crest for reservoir views. Free entry with valid ID. About 50 km southwest of Ilagan.'},
  {coords:[17.1300,121.8500],icon:'🏙️',tag:'Heritage',tagClass:'tag--heritage',name:'Ilagan City',desc:'Capital of Isabela province. Main hub for accommodation, food, and transport. Gateway to Tumauini Church, the Japanese Tunnel, and Magat Dam.'},
  {coords:[16.9200,121.7700],icon:'🏙️',tag:'Heritage',tagClass:'tag--heritage',name:'Cauayan City',desc:'Second largest city in Isabela. Home to Cauayan Airport — the main air gateway to the province. About 1 hour from Tumauini.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[17.1500,121.8000],[17.1200,121.8700],[16.9500,121.5500]],{color:'#c05030',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#c05030;border-color:#c05030';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
