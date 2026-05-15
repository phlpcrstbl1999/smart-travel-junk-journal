const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('villa-escudero-map');
mapEl.style.height='520px';
const map=L.map('villa-escudero-map',{scrollWheelZoom:false}).setView([14.0500,121.4800],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.0500,121.4800],icon:'🌴',tag:'Plantation',tagClass:'tag--main',name:'Villa Escudero Plantations',desc:'800-hectare working coconut plantation and heritage resort in San Pablo, Quezon. Labasin Waterfall Restaurant — dine with feet in the river. Carabao cart rides, bamboo rafting, folk arts museum, cultural shows. Book at villaescudero.com.'},
  {coords:[14.0600,121.4900],icon:'💧',tag:'Waterfall',tagClass:'tag--nature',name:'Labasin Waterfall Restaurant',desc:'The most unique dining experience in the Philippines — a bamboo pavilion at the base of a natural waterfall where guests eat Filipino buffet with their feet in the cool river water.'},
  {coords:[13.9300,121.6200],icon:'✝️',tag:'Shrine',tagClass:'tag--heritage',name:'Kamay ni Hesus (Lucban)',desc:'About 1 hour east — a hilltop shrine in Lucban with a giant Christ statue and 305 life-size Stations of the Cross. A major pilgrimage site in Quezon province.'},
  {coords:[14.1000,121.8500],icon:'🏝️',tag:'Island',tagClass:'tag--nature',name:'Alabat Island',desc:'About 2.5 hours east — a peaceful island in Quezon Bay with white sand beaches, mangrove forests, and a slow island pace. The hidden gem of Quezon province.'},
  {coords:[14.0700,121.3200],icon:'🏙️',tag:'City',tagClass:'tag--heritage',name:'San Pablo City',desc:'The City of Seven Lakes — San Pablo is famous for its seven volcanic crater lakes. Sampaloc Lake is the largest and most accessible, just minutes from Villa Escudero.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.0500,121.4800],[14.0600,121.4900]],{color:'#508828',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#508828;border-color:#508828';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#e8f0a0':'';});},{passive:true});
