const style=document.createElement('style');
style.textContent=`.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el=>{el.classList.add('fade-up');observer.observe(el);});
const mapEl=document.getElementById('tagaytay-map');
mapEl.style.height='520px';
const map=L.map('tagaytay-map',{scrollWheelZoom:false}).setView([14.1000,120.9600],12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:18}).addTo(map);
map.on('click',()=>map.scrollWheelZoom.enable());
const mk=e=>L.divIcon({className:'',html:`<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`,iconSize:[28,28],iconAnchor:[14,28],popupAnchor:[0,-30]});
[
  {coords:[14.1000,120.9600],icon:'🌋',tag:'Viewpoint',tagClass:'tag--main',name:'Tagaytay Ridge',desc:'Panoramic view of Taal Volcano and Lake. 700m above sea level. Cool highland climate, bulalo, tawilis, and fresh strawberries. Manila\'s most popular weekend escape.'},
  {coords:[14.1050,120.9650],icon:'🏔️',tag:'Viewpoint',tagClass:'tag--main',name:"People's Park in the Sky",desc:'Highest viewpoint in Tagaytay. 360° panoramic views of Taal Lake, the volcano, and the surrounding countryside.'},
  {coords:[14.0950,120.9550],icon:'🎡',tag:'Viewpoint',tagClass:'tag--main',name:'Picnic Grove',desc:'Popular park with cable car rides and excellent views of Taal Volcano. Good for families.'},
  {coords:[14.0200,120.9900],icon:'🌋',tag:'Volcano',tagClass:'tag--nature',name:'Taal Volcano Island',desc:'Active volcano island within Taal Lake. Boat from Talisay, Batangas. 30-min hike to crater. Check activity advisories before visiting.'},
  {coords:[14.3500,120.9000],icon:'🇵🇭',tag:'Heritage',tagClass:'tag--heritage',name:'Aguinaldo Shrine (Kawit)',desc:'Birthplace of Philippine independence. About 1 hour from Tagaytay.'}
].forEach(({coords,icon,tag,tagClass,name,desc})=>{
  L.marker(coords,{icon:mk(icon)}).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`,{maxWidth:260});
});
L.polyline([[14.1000,120.9600],[14.1050,120.9650],[14.0950,120.9550],[14.0200,120.9900]],{color:'#2a7848',weight:3,dashArray:'7 9',opacity:.8}).addTo(map);
document.getElementById('newsletter-form').addEventListener('submit',function(e){
  e.preventDefault();const btn=this.querySelector('button');
  btn.textContent="✓ You're on the list!";btn.style.cssText='background:#2a7848;border-color:#2a7848';
  this.querySelector('input').value='';this.querySelector('input').disabled=true;btn.disabled=true;
});
const sections=document.querySelectorAll('section[id],footer[id]'),navLinks=document.querySelectorAll('.footer__links a');
window.addEventListener('scroll',()=>{let cur='';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});navLinks.forEach(l=>{l.style.color=l.getAttribute('href')===`#${cur}`?'#f0d080':'';});},{passive:true});
