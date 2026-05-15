const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('cwc-map', { scrollWheelZoom: false }).setView([13.5800, 123.2700], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[13.5800,123.2700], icon:'🏄', tag:'Water Sports', tc:'tag--main', name:'CamSur Watersports Complex', desc:'Asia\'s largest cable wakeboard park in Pili, Camarines Sur. World-class facility hosting international competitions with beginner and advanced cable systems.' },
  { coords:[13.6200,123.1900], icon:'⛪', tag:'Heritage', tc:'tag--heritage', name:'Naga Metropolitan Cathedral', desc:'Seat of the Archdiocese of Caceres and center of the Peñafrancia Festival — one of the largest Marian devotions in Asia.' },
  { coords:[13.6200,123.1950], icon:'🕯️', tag:'Shrine', tc:'tag--heritage', name:'Basilica Minore of Our Lady of Peñafrancia', desc:'Houses the venerated image of Our Lady of Peñafrancia. Center of the annual Fluvial Procession along the Naga River every September.' },
  { coords:[13.7700,123.7500], icon:'🏝️', tag:'Nature', tc:'tag--nature', name:'Caramoan Islands', desc:'Dramatic limestone karst islands in the Pacific — pristine beaches, hidden lagoons, and towering cliffs. About 3–4 hours from Naga City.' },
  { coords:[13.6200,123.1900], icon:'📍', tag:'City', tc:'tag--heritage', name:'Naga City', desc:'Regional center of Bicol and the perfect base for exploring Camarines Sur. Known for Bicol Express, the Peñafrancia Festival, and easy access to CWC and Caramoan.' },
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
