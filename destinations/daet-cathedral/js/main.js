const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('daet-map', { scrollWheelZoom: false }).setView([14.1100, 122.9600], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[14.1080,122.9580], icon:'⛪', tag:'Cathedral', tc:'tag--main', name:'Parroquia de San Juan Bautista', desc:'Daet Cathedral — seat of the Diocese of Daet, founded 1578. Located at the Daet town plaza, the spiritual heart of Camarines Norte.' },
  { coords:[14.1100,122.9600], icon:'📍', tag:'Town', tc:'tag--heritage', name:'Daet Town Plaza', desc:'The civic and social center of Daet. Historical markers, a monument to local heroes, and the cathedral facing the plaza.' },
  { coords:[14.1350,122.9550], icon:'🏄', tag:'Beach', tc:'tag--nature', name:'Bagasbas Beach', desc:'Camarines Norte\'s premier surf beach — 3 km from the cathedral. Dark volcanic sand, consistent Pacific waves, and affordable surf schools.' },
  { coords:[14.1100,122.9500], icon:'⚓', tag:'Port', tc:'tag--heritage', name:'Paracale Port', desc:'Jump-off point for bangka boats to Calaguas Islands. Arrange your Calaguas tour from Daet town.' },
  { coords:[14.2800,122.8700], icon:'🏝️', tag:'Island', tc:'tag--nature', name:'Calaguas Islands', desc:'Pristine white sand islands with no electricity — the crown jewel of Camarines Norte. 2–3 hours by boat from Paracale.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#785010';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
