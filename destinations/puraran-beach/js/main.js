const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('puraran-map', { scrollWheelZoom: false }).setView([13.6800, 124.2200], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[13.6800,124.2200], icon:'🏄', tag:'Surf', tc:'tag--main', name:'Puraran Beach', desc:'Home of the legendary "Majestic" surf break — one of the most powerful and consistent reef breaks in the Philippines. Best from August to November.' },
  { coords:[13.6900,124.2300], icon:'🏔️', tag:'Viewpoint', tc:'tag--nature', name:'Binurong Point', desc:'Dramatic cliff viewpoint overlooking the Pacific Ocean. A short trek leads to the edge where limestone cliffs plunge into the sea.' },
  { coords:[13.5800,124.2400], icon:'⛪', tag:'Heritage', tc:'tag--heritage', name:'Bato Church', desc:'17th-century Spanish colonial church built from volcanic stone. One of the oldest churches in the Bicol Region.' },
  { coords:[13.5800,124.2100], icon:'📍', tag:'Town', tc:'tag--heritage', name:'Baras', desc:'The main town of eastern Catanduanes and the jump-off point for Puraran Beach and Binurong Point.' },
  { coords:[13.5800,124.0200], icon:'📍', tag:'City', tc:'tag--heritage', name:'Virac', desc:'The provincial capital of Catanduanes. Main gateway to the island with the airport, hotels, and transport connections.' },
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
