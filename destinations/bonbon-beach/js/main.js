const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('bonbon-map', { scrollWheelZoom: false }).setView([12.5800, 122.2700], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[12.5950,122.2650], icon:'🏖️', tag:'Beach', tc:'tag--main', name:'Bonbon Beach', desc:'Romblon\'s iconic sandbar beach. Visit at low tide for the full sandbar experience — white sand with turquoise water on both sides.' },
  { coords:[12.5780,122.2720], icon:'📍', tag:'Town', tc:'tag--heritage', name:'Romblon Town', desc:'The provincial capital of Romblon. Jump-off point for Bonbon Beach, home to marble workshops, Fort San Andres, and the cathedral.' },
  { coords:[12.5800,122.2750], icon:'⚓', tag:'Port', tc:'tag--heritage', name:'Romblon Port', desc:'Main ferry port for arrivals from Batangas. Ferries from Montenegro Lines and other operators dock here.' },
  { coords:[12.5760,122.2700], icon:'🏛️', tag:'Heritage', tc:'tag--heritage', name:'Fort San Andres', desc:'A Spanish colonial fort built in 1640 overlooking Romblon Bay. Panoramic views of the harbor and surrounding islands.' },
  { coords:[12.5820,122.2680], icon:'🪨', tag:'Heritage', tc:'tag--heritage', name:'Marble Workshops', desc:'Romblon is the Marble Capital of the Philippines. Visit workshops to see artisans carve statues and tiles from locally quarried marble.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#1060b0';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
