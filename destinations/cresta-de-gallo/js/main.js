const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('cresta-map', { scrollWheelZoom: false }).setView([12.6200, 122.4500], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[12.6500,122.5200], icon:'🏝️', tag:'Island', tc:'tag--main', name:'Cresta de Gallo Island', desc:'Uninhabited island in the Sibuyan Sea. White sand, pristine reef, and no permanent structures. One of the most remote and beautiful islands in the Philippines.' },
  { coords:[12.6520,122.5220], icon:'🐠', tag:'Marine Site', tc:'tag--nature', name:'Cresta de Gallo Reef', desc:'World-class reef surrounding the island. Sea turtles, reef sharks, giant clams, and exceptional visibility. Best snorkeling on the eastern drop-off.' },
  { coords:[12.5780,122.2720], icon:'⚓', tag:'Departure', tc:'tag--heritage', name:'Romblon Port', desc:'Main departure point for chartered boats to Cresta de Gallo. Arrange your boat charter here the day before your trip.' },
  { coords:[12.5950,122.2650], icon:'🏖️', tag:'Beach', tc:'tag--nature', name:'Bonbon Beach', desc:'Romblon\'s iconic sandbar beach — combine with Cresta de Gallo for the ultimate Romblon island experience.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

L.polyline([[12.5780, 122.2720], [12.6500, 122.5200]], {
  color: '#1088a8', weight: 2, dashArray: '7 9', opacity: 0.7
}).addTo(map);

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#0a6880';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
