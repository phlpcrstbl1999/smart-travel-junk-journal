const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

const map = L.map('maniwaya-map', { scrollWheelZoom: false }).setView([13.5200, 121.8700], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords:[13.5200,121.8700], icon:'🏝️', tag:'Island', tc:'tag--main', name:'Maniwaya Island', desc:'The main beach — white sand, turquoise water, and healthy coral reefs. Best snorkeling spot in Marinduque.' },
  { coords:[13.5150,121.8650], icon:'🐠', tag:'Marine Site', tc:'tag--nature', name:'Maniwaya Coral Reef', desc:'Vibrant reef just off the main beach. Home to sea turtles, colorful fish, and diverse coral formations.' },
  { coords:[13.5250,121.8750], icon:'🏝️', tag:'Island', tc:'tag--main', name:'Polo Island', desc:'Second of the Three Islands — known for its calm lagoon and excellent snorkeling.' },
  { coords:[13.5100,121.8800], icon:'🏝️', tag:'Island', tc:'tag--main', name:'Elephant Island', desc:'Third of the Three Islands — dramatic rock formations and a secluded beach.' },
  { coords:[13.4800,121.8600], icon:'📍', tag:'Jump-off', tc:'tag--heritage', name:'Santa Cruz Port', desc:'The jump-off point for Maniwaya Island. Hire a bangka here for the 20–30 minute crossing.' },
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
