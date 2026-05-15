const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});

const mapEl=document.getElementById('magat-map');
mapEl.style.height='520px';
const map=L.map('magat-map',{scrollWheelZoom:false}).setView([16.9500,121.5500],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[16.9500,121.5500],icon:'🏗️',tag:'Dam',tagClass:'tag--main',name:'Magat Dam',desc:'One of the largest dams in the Philippines — 114m high, 1,140m crest length. Walk the dam crest for reservoir and valley views. Free entry with valid ID. Register at NIA office.'},
  {coords:[16.9600,121.5600],icon:'🌊',tag:'Reservoir',tagClass:'tag--nature',name:'Magat Reservoir',desc:'Vast reservoir created by the dam. Surrounded by rolling green hills. Popular for fishing, boating, and scenic photography. Beautiful at sunrise and sunset.'},
  {coords:[17.1200,121.8700],icon:'🪖',tag:'Heritage',tagClass:'tag--heritage',name:'Ilagan Japanese Tunnel',desc:'World War II underground complex in Ilagan City. Guided tours available. About 50 km northeast of Magat Dam.'},
  {coords:[17.1500,121.8000],icon:'⛪',tag:'Heritage',tagClass:'tag--heritage',name:'Tumauini Church',desc:'Unique terracotta tile Baroque church completed 1783. UNESCO Tentative List. About 60 km northeast of Magat Dam.'},
  {coords:[17.1300,121.8500],icon:'🏙️',tag:'City',tagClass:'tag--heritage',name:'Ilagan City',desc:'Capital of Isabela province. Main hub for accommodation and transport. About 30 km east of Magat Dam.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[17.1500,121.8000],[17.1200,121.8700],[16.9500,121.5500]],{color:'#2a68b0',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#2a68b0;border-color:#2a68b0';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
