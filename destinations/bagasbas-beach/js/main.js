const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('bagasbas-map', { scrollWheelZoom: false }).setView([14.1200, 122.9400], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[14.1350,122.9550], icon:'🏄', tag:'Surf Beach', tc:'tag--main', name:'Bagasbas Beach', desc:'Camarines Norte\'s premier surf beach — dark volcanic sand, consistent Pacific swells, and affordable surf schools. 3 km from Daet town.' },
  { coords:[14.1100,122.9600], icon:'📍', tag:'Town', tc:'tag--heritage', name:'Daet Town Center', desc:'Capital of Camarines Norte. Bus terminal, hotels, restaurants, and the Daet Cathedral. Gateway to Bagasbas and Calaguas Islands.' },
  { coords:[14.1100,122.9500], icon:'⚓', tag:'Port', tc:'tag--heritage', name:'Paracale Port', desc:'Jump-off point for bangka boats to Calaguas Islands. 2–3 hour crossing across Lamon Bay.' },
  { coords:[14.2800,122.8700], icon:'🏝️', tag:'Island', tc:'tag--nature', name:'Calaguas Islands', desc:'Pristine white sand islands with no electricity — the perfect complement to a Bagasbas surf trip. 2–3 hours by boat.' },
  { coords:[14.1080,122.9580], icon:'⛪', tag:'Heritage', tc:'tag--heritage', name:'Daet Cathedral', desc:'Parroquia de San Juan Bautista — the historic cathedral at the heart of Daet town, a short walk from the bus terminal.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#0878a0';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
