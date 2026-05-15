const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('coron-map', { scrollWheelZoom: false }).setView([11.9980, 120.2040], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[11.9800,120.1600], icon:'⚓', tag:'Shipwreck', tc:'tag--main', name:'Okikawa Maru', desc:'The largest wreck in Coron — a 160m oil tanker at 15–20m. Perfect for Open Water divers. Covered in coral and surrounded by fish.' },
  { coords:[11.9900,120.1800], icon:'⚓', tag:'Shipwreck', tc:'tag--main', name:'Kogyo Maru', desc:'Supply ship at 15–30m with visible cargo of construction equipment. One of the most atmospheric wrecks in Coron.' },
  { coords:[11.9700,120.1900], icon:'⚓', tag:'Shipwreck', tc:'tag--main', name:'Irako', desc:'Advanced wreck at 42m — a refrigeration ship covered in enormous sea fans and black coral. One of the deepest and most beautiful wrecks.' },
  { coords:[12.0100,120.1400], icon:'⚓', tag:'Shipwreck', tc:'tag--main', name:'East Tangat Gunboat', desc:'Shallow wreck snorkelable from the surface. Excellent for non-divers wanting to experience the shipwrecks.' },
  { coords:[12.0050,120.1700], icon:'🏝️', tag:'Lake', tc:'tag--nature', name:'Kayangan Lake', desc:'Considered the cleanest lake in Asia. Crystal-clear water, dramatic limestone scenery, and excellent snorkeling.' },
  { coords:[12.0000,120.1650], icon:'🏝️', tag:'Lagoon', tc:'tag--nature', name:'Twin Lagoon', desc:'Two connected lagoons separated by limestone. Swim through the underwater passage — the inner lagoon is warmed by hot springs.' },
  { coords:[11.9980,120.2040], icon:'📍', tag:'Town', tc:'tag--heritage', name:'Coron Town', desc:'Main hub for accommodation, dive shops, and restaurants. Pay your environmental fee here before heading out.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#1a5878';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});
