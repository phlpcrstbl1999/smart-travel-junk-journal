const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('bato-map', { scrollWheelZoom: false }).setView([13.5800,124.2400], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[13.5800,124.2400], icon:'⛪', tag:'Heritage', tc:'tag--main', name:'Bato Church', desc:'17th-century Saint John the Baptist Parish built from volcanic stone. One of the oldest churches in the Bicol Region, designed to withstand Catanduanes\' powerful typhoons.' },
  { coords:[13.6900,124.2300], icon:'🏔️', tag:'Viewpoint', tc:'tag--nature', name:'Binurong Point', desc:'Dramatic Pacific cliff viewpoint — a must-visit when combining with Bato Church on a day trip from Virac.' },
  { coords:[13.6800,124.2200], icon:'🏄', tag:'Surf', tc:'tag--nature', name:'Puraran Beach', desc:'Home of the legendary "Majestic" surf break. Complete the eastern Catanduanes circuit from Bato.' },
  { coords:[13.5800,124.2100], icon:'📍', tag:'Town', tc:'tag--heritage', name:'Baras', desc:'Eastern Catanduanes hub — jump-off for Binurong Point and Puraran Beach.' },
  { coords:[13.5800,124.0200], icon:'📍', tag:'City', tc:'tag--heritage', name:'Virac', desc:'Provincial capital of Catanduanes. Start your island circuit here.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#785010';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
