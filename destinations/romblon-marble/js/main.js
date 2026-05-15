const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('marble-map', { scrollWheelZoom: false }).setView([12.5780, 122.2720], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[12.5850,122.2680], icon:'🪨', tag:'Quarry', tc:'tag--main', name:'Romblon Marble Quarries', desc:'Active marble quarries in the hills above Romblon town. Watch quarrymen extract massive blocks of world-class marble from the hillside.' },
  { coords:[12.5780,122.2720], icon:'🏛️', tag:'Heritage', tc:'tag--heritage', name:'Marble Workshops & Showrooms', desc:'Family-run workshops in Romblon town where craftsmen carve marble into statues, tiles, and decorative pieces. Open to visitors.' },
  { coords:[12.5760,122.2700], icon:'🏰', tag:'Heritage', tc:'tag--heritage', name:'Fort San Andres', desc:'Spanish colonial fort built in 1640. Panoramic views of Romblon Bay and the surrounding islands.' },
  { coords:[12.5770,122.2730], icon:'⛪', tag:'Heritage', tc:'tag--heritage', name:'Saint Joseph Cathedral', desc:'One of the oldest churches in MIMAROPA, featuring marble floors and altars sourced from local Romblon quarries.' },
  { coords:[12.5950,122.2650], icon:'🏖️', tag:'Beach', tc:'tag--nature', name:'Bonbon Beach', desc:'Romblon\'s iconic sandbar beach — a short tricycle ride from town. Best visited at low tide.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#606060';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
