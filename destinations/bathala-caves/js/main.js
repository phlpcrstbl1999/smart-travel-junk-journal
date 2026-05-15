const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('bathala-map', { scrollWheelZoom: false }).setView([13.4300, 121.9000], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[13.4300,121.9000], icon:'🦇', tag:'Cave Site', tc:'tag--main', name:'Bathala Caves', desc:'Seven interconnected cave chambers named after the ancient Filipino deity Bathala. Home to thousands of bats and underground streams.' },
  { coords:[13.4350,121.8950], icon:'📍', tag:'Town Center', tc:'tag--heritage', name:'Torrijos Town', desc:'The nearest town to Bathala Caves. Jump-off point for tricycles to the cave entrance. Local eateries and basic accommodation available.' },
  { coords:[13.4400,121.9100], icon:'🌿', tag:'Nature', tc:'tag--nature', name:'Torrijos Coastline', desc:'Scenic eastern coastline of Marinduque with quiet beaches, fishing villages, and dramatic rock formations.' },
  { coords:[13.5200,121.8700], icon:'🏝️', tag:'Nature', tc:'tag--nature', name:'Maniwaya Island', desc:'Marinduque\'s most beautiful beach island — combine with Bathala Caves for a full Marinduque adventure.' },
  { coords:[13.4483,121.8419], icon:'⛪', tag:'Heritage', tc:'tag--heritage', name:'Boac Cathedral', desc:'The iconic fortress-church of Boac, seat of the Diocese of Boac. About 1 hour from Torrijos by van.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#6028a0';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
