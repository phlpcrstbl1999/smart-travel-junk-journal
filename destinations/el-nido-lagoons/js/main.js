const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('elnido-map', { scrollWheelZoom: false }).setView([11.1800, 119.4500], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[11.1650,119.4050], icon:'🏝️', tag:'Lagoon', tc:'tag--main', name:'Big Lagoon – Miniloc Island', desc:'El Nido\'s most iconic lagoon — a vast emerald body of water enclosed by sheer limestone walls. Explore by kayak or swimming.' },
  { coords:[11.1620,119.4020], icon:'🏝️', tag:'Lagoon', tc:'tag--main', name:'Small Lagoon – Miniloc Island', desc:'Enter through a narrow crack in the limestone by swimming or kayaking. A perfectly enclosed turquoise world inside.' },
  { coords:[11.1700,119.3900], icon:'🏖️', tag:'Beach', tc:'tag--main', name:'Secret Beach', desc:'Accessible only by diving under a rock. A hidden cove completely enclosed by limestone — one of El Nido\'s greatest secrets.' },
  { coords:[11.1800,119.4500], icon:'📍', tag:'Town', tc:'tag--heritage', name:'El Nido Town', desc:'The main hub for accommodation, restaurants, and island hopping tour bookings. Pay your Environmental User Fee here.' },
  { coords:[11.2100,119.3800], icon:'🐠', tag:'Snorkeling', tc:'tag--nature', name:'Tapiutan Strait', desc:'One of El Nido\'s best snorkeling sites — diverse coral, abundant fish, and frequent sea turtle sightings.' },
  { coords:[11.2000,119.3700], icon:'🏖️', tag:'Beach', tc:'tag--main', name:'Hidden Beach', desc:'A secluded white sand cove on Tour C, accessible through a narrow gap in the limestone cliffs.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#0858a8';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
