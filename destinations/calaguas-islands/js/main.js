const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('calaguas-map', { scrollWheelZoom: false }).setView([14.2000, 122.8500], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[14.2800,122.8700], icon:'🏝️', tag:'Island', tc:'tag--main', name:'Calaguas Islands – Mahabang Buhangin', desc:'Over 1km of pristine white sand with no permanent structures. No electricity, no resorts — camping only. One of the Philippines\' most unspoiled beaches.' },
  { coords:[14.1100,122.9500], icon:'⚓', tag:'Jump-off', tc:'tag--heritage', name:'Paracale Port', desc:'Main jump-off point for bangka boats to Calaguas Islands. 2–3 hour crossing across Lamon Bay.' },
  { coords:[14.1800,122.9000], icon:'⚓', tag:'Jump-off', tc:'tag--heritage', name:'Vinzons Port', desc:'Alternative jump-off point for Calaguas. Some tour operators depart from here.' },
  { coords:[14.1100,122.9600], icon:'📍', tag:'City', tc:'tag--heritage', name:'Daet, Camarines Norte', desc:'Capital of Camarines Norte and main gateway to Calaguas Islands. Bus terminal, hotels, and tour operators based here.' },
  { coords:[14.1200,122.9400], icon:'🏖️', tag:'Beach', tc:'tag--nature', name:'Bagasbas Beach', desc:'Camarines Norte\'s famous surfing beach — just minutes from Daet town. Combine with Calaguas for a full Cam Norte trip.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

L.polyline([[14.1100, 122.9500], [14.2800, 122.8700]], {
  color: '#1078d0', weight: 2, dashArray: '7 9', opacity: 0.7
}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#0858a8';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
