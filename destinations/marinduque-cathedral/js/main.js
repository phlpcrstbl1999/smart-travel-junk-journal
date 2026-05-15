const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('cathedral-map', { scrollWheelZoom: false }).setView([13.4483, 121.8419], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[13.4483,121.8419], icon:'⛪', tag:'Heritage', tc:'tag--heritage', name:'Immaculate Conception Cathedral', desc:'The fortress-church of Boac, seat of the Diocese of Boac. Perched on a rocky hill above the Boac River.' },
  { coords:[13.4470,121.8410], icon:'📍', tag:'Main Site', tc:'tag--main', name:'Boac Town Plaza', desc:'The central plaza of Boac, surrounded by heritage buildings and local eateries. Starting point for town walks.' },
  { coords:[13.4495,121.8430], icon:'🌿', tag:'Nature', tc:'tag--nature', name:'Boac River', desc:'The scenic river flowing below the cathedral hill. A peaceful spot for an evening stroll along the promenade.' },
  { coords:[13.5200,121.8500], icon:'🏝️', tag:'Nature', tc:'tag--nature', name:'Maniwaya Island', desc:'Marinduque\'s most beautiful beach island — white sand, clear water, and coral reefs. ~1 hour by boat from Santa Cruz.' },
  { coords:[13.4300,121.8600], icon:'🦇', tag:'Nature', tc:'tag--nature', name:'Bathala Caves', desc:'A network of mystical caves near Torrijos, home to bats and stunning rock formations.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#4828a0';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
