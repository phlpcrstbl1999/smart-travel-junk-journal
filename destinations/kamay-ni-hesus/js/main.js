const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('kamay-map');
mapEl.style.height='520px';
const map=L.map('kamay-map',{scrollWheelZoom:false}).setView([13.9300,121.6200],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[13.9300,121.6200],icon:'✝️',tag:'Shrine',tagClass:'tag--main',name:'Kamay ni Hesus Shrine',desc:'Hilltop pilgrimage shrine in Lucban, Quezon. 305 life-size Stations of the Cross, 50-foot Risen Christ statue. Healing masses by Fr. Joey Faller. Free entrance. Open daily.'},
  {coords:[13.9250,121.6150],icon:'⛪',tag:'Heritage',tagClass:'tag--heritage',name:'St. Louis Bishop Parish Church',desc:'17th-century colonial church on the Lucban town plaza — founded 1738. One of the finest heritage churches in Quezon province.'},
  {coords:[13.9280,121.6180],icon:'🌭',tag:'Food',tagClass:'tag--nature',name:'Lucban Market — Longganisa',desc:'Lucban is famous for its distinctive garlicky, vinegary longganisa sausage. Buy fresh longganisa and pancit habhab (noodles on banana leaf) from the market stalls near the plaza.'},
  {coords:[14.0500,121.4800],icon:'🌴',tag:'Plantation',tagClass:'tag--heritage',name:'Villa Escudero (San Pablo)',desc:'About 1 hour west — 800-hectare coconut plantation resort with the famous Labasin Waterfall Restaurant. Combine for the ultimate Quezon day trip.'},
  {coords:[14.1000,121.8500],icon:'🏝️',tag:'Island',tagClass:'tag--nature',name:'Alabat Island',desc:'About 1.5 hours east — a peaceful island in Quezon Bay with white sand beaches and mangrove forests. The hidden gem of Quezon province.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[13.9300,121.6200],[13.9250,121.6150],[13.9280,121.6180]],{color:'#a87020',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#a87020;border-color:#a87020';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f8e060':'';});},{passive:true});
