const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('skyline-map', { scrollWheelZoom: false }).setView([13.2200, 123.7400], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[13.2200,123.7400], icon:'🌋', tag:'View Deck', tc:'tag--main', name:'Mayon Skyline View Deck', desc:'Closest road-accessible viewpoint to Mayon Volcano. The 2,463m cone fills the sky above you on clear days.' },
  { coords:[13.3300,123.6900], icon:'🌋', tag:'Volcano', tc:'tag--main', name:'Mayon Volcano Summit', desc:'The world\'s most perfect volcanic cone at 2,463m. Over 50 eruptions since 1616. PHIVOLCS monitors activity continuously.' },
  { coords:[13.1400,123.7350], icon:'📍', tag:'City', tc:'tag--nature', name:'Legazpi City', desc:'Main gateway to Albay. Airport, hotels, restaurants, and the Legazpi Boulevard waterfront sunset strip.' },
  { coords:[13.1503,123.6897], icon:'🏛️', tag:'Heritage', tc:'tag--heritage', name:'Cagsawa Ruins', desc:'Iconic buried church bell tower with Mayon backdrop. Best at sunrise. 2 km from Daraga Church.' },
  { coords:[13.1600,123.7200], icon:'⛪', tag:'Heritage', tc:'tag--heritage', name:'Daraga Church', desc:'Baroque church built 1773 from Mayon volcanic stone. Hilltop location with elevated Mayon views.' },
  { coords:[13.2100,123.7500], icon:'🌿', tag:'Nature', tc:'tag--nature', name:'Lignon Hill Nature Park', desc:'Nature park with Mayon viewpoint, zipline, and forest trails. A short tricycle ride from Legazpi City.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#7a5010';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
