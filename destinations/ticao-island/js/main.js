const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('ticao-map', { scrollWheelZoom: false }).setView([12.5000, 123.6500], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[12.5000,123.6500], icon:'🐋', tag:'Marine Life', tc:'tag--main', name:'Ticao Pass', desc:'Deep-water channel between Ticao Island and the Bondoc Peninsula — feeding ground for whale sharks, manta rays, and thresher sharks.' },
  { coords:[12.5200,123.6800], icon:'📍', tag:'Town', tc:'tag--heritage', name:'San Jacinto', desc:'Main town of Ticao Island and base for whale shark tours and dive operators.' },
  { coords:[12.3500,123.6200], icon:'🐠', tag:'Dive Site', tc:'tag--nature', name:'Buntod Reef Marine Sanctuary', desc:'Protected coral reef near Masbate City — excellent snorkeling with healthy corals, sea turtles, and a stunning white sandbar.' },
  { coords:[12.3700,123.6100], icon:'📍', tag:'City', tc:'tag--heritage', name:'Masbate City', desc:'Provincial capital of Masbate. Gateway to Ticao Island and Buntod Reef. Known as the Cattle Capital of the Philippines.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#0a6880';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
