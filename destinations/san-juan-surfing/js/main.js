// ===== FADE-UP =====
const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

// ===== MAP =====
const mapEl = document.getElementById('sanjuan-map');
mapEl.style.height = '520px';
const map = L.map('sanjuan-map', { scrollWheelZoom: false }).setView([16.6700, 120.3200], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords: [16.6700, 120.3200], icon: '🏄', tag: 'Surf Spot', tagClass: 'tag--main', name: 'Urbiztondo Beach – Main Surf Break', desc: 'The main surf area of San Juan. Consistent waves Oct–Mar. Surf schools, board rentals, and beachfront cafes all along the strip.' },
  { coords: [16.6720, 120.3180], icon: '🏄', tag: 'Surf Spot', tagClass: 'tag--main', name: 'Monaliza Point', desc: 'A popular surf break north of Urbiztondo. Better for intermediate surfers — faster, hollower waves than the main beach.' },
  { coords: [16.6680, 120.3220], icon: '🍽️', tag: 'Food & Nightlife', tagClass: 'tag--food', name: 'The Strip – Beachfront Cafes & Bars', desc: 'A row of beachfront cafes, restaurants, and bars along the surf area. Best at sunset — cold drinks, fresh seafood, and live music.' },
  { coords: [16.6650, 120.3250], icon: '🌊', tag: 'Beach', tagClass: 'tag--nature', name: 'San Juan Beach (South End)', desc: 'The quieter southern end of the beach — good for swimming, sunbathing, and watching surfers from the shore.' },
  { coords: [16.6900, 120.3100], icon: '🏮', tag: 'Attraction', tagClass: 'tag--food', name: 'Ma-Cho Temple', desc: 'A vibrant Chinese Taoist temple on Poro Point with a 7-story pagoda and panoramic sea views. 20 min by tricycle from San Juan.' },
  { coords: [16.6950, 120.3050], icon: '🔦', tag: 'Attraction', tagClass: 'tag--food', name: 'Poro Point Lighthouse', desc: 'A 19th-century Spanish-era lighthouse with sweeping coastal views. 25 min by tricycle from San Juan.' }
].forEach(({ coords, icon, tag, tagClass, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

L.polyline([[16.6720, 120.3180],[16.6700, 120.3200],[16.6680, 120.3220],[16.6650, 120.3250]], { color: '#2a90b8', weight: 3, dashArray: '7 9', opacity: 0.8 }).addTo(map);

// ===== FORM =====
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.cssText = 'background:#2a90b8;border-color:#2a90b8';
  this.querySelector('input').value = '';
  this.querySelector('input').disabled = true;
  btn.disabled = true;
});

// ===== NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id],footer[id]');
const navLinks = document.querySelectorAll('.footer__links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navLinks.forEach(l => { l.style.color = l.getAttribute('href') === `#${cur}` ? '#f0d080' : ''; });
}, { passive: true });
