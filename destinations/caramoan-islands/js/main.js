const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('caramoan-map', { scrollWheelZoom: false }).setView([13.7800, 123.8600], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[13.7800,123.8700], icon:'🏝️', tag:'Island', tc:'tag--main', name:'Matukad Island', desc:'Caramoan\'s most dramatic island — climb to the hidden lagoon enclosed by limestone walls. One of the most stunning sights in Bicol.' },
  { coords:[13.7900,123.8500], icon:'🏖️', tag:'Island', tc:'tag--main', name:'Lahos Island', desc:'Long white sand beach with excellent snorkeling over healthy coral reefs. A full-day island hopping highlight.' },
  { coords:[13.7700,123.8600], icon:'🏖️', tag:'Sandbar', tc:'tag--nature', name:'Sabitang Laya', desc:'A narrow sandbar that appears at low tide — walk its full length with water on both sides for the classic Caramoan photo.' },
  { coords:[13.7850,123.8400], icon:'🤿', tag:'Snorkeling', tc:'tag--nature', name:'Cotivas Island', desc:'Best snorkeling in Caramoan — diverse coral gardens, abundant fish life, and crystal-clear water.' },
  { coords:[13.7600,123.8300], icon:'🎬', tag:'Beach', tc:'tag--main', name:'Gota Beach', desc:'The most famous beach on the peninsula and a Survivor filming location. Fine white sand backed by dramatic limestone cliffs.' },
  { coords:[13.7750,123.8200], icon:'⚓', tag:'Town', tc:'tag--heritage', name:'Caramoan Town Port', desc:'Main jump-off point for island hopping tours. Book your boat here or through your guesthouse the evening before.' },
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
