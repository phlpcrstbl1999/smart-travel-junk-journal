const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('masbate-cathedral-map', { scrollWheelZoom: false }).setView([12.3700, 123.6100], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[12.3800,123.6050], icon:'⛪', tag:'Heritage', tc:'tag--main', name:'Masbate Cathedral', desc:'Saint Anthony of Padua Parish — the spiritual center of Masbate City and seat of the Diocese of Masbate. Host of the annual Rodeo Masbateño festival.' },
  { coords:[12.3700,123.6100], icon:'📍', tag:'City', tc:'tag--heritage', name:'Masbate City', desc:'Provincial capital of Masbate — the Cattle Capital of the Philippines. Known for exceptional beef, the Rodeo Masbateño, and access to Buntod Reef and Ticao Island.' },
  { coords:[12.3900,123.6000], icon:'🐠', tag:'Marine Sanctuary', tc:'tag--nature', name:'Buntod Reef Marine Sanctuary', desc:'Protected coral reef with a stunning white sandbar — a short boat ride from Masbate City.' },
  { coords:[12.5000,123.6500], icon:'🐋', tag:'Marine Life', tc:'tag--nature', name:'Ticao Island', desc:'Premier whale shark encounter destination in Masbate — combine with the cathedral and Buntod Reef for a complete Masbate experience.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#6a4a10';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
