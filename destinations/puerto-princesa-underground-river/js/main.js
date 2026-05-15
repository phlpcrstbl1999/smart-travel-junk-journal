const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('ppur-map', { scrollWheelZoom: false }).setView([10.1800, 118.9200], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[10.1900,118.9100], icon:'🌊', tag:'Cave & River', tc:'tag--main', name:'Underground River Cave Entrance', desc:'The entrance to the 8.2km subterranean river. Reached by bangka from Sabang Beach. Life jackets and headlamps provided.' },
  { coords:[10.1750,118.9200], icon:'🏖️', tag:'Beach', tc:'tag--nature', name:'Sabang Beach', desc:'The jump-off point for the Underground River. Beautiful jungle-backed beach with restaurants and the Monkey Trail nature walk.' },
  { coords:[10.1780,118.9180], icon:'🐒', tag:'Nature', tc:'tag--nature', name:'Monkey Trail', desc:'A jungle trail through the national park forest. Long-tailed macaques, monitor lizards, and hornbills are commonly spotted.' },
  { coords:[9.7392,118.7353], icon:'📍', tag:'City', tc:'tag--heritage', name:'Puerto Princesa City', desc:'The capital of Palawan and main gateway. Fly here from Manila, get your Underground River permit at CENRO, then head to Sabang.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#1848a0';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
