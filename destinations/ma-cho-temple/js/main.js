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
const mapEl = document.getElementById('macho-map');
mapEl.style.height = '520px';
const map = L.map('macho-map', { scrollWheelZoom: false }).setView([16.6900, 120.3100], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18
}).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });

[
  { coords: [16.6900, 120.3100], icon: '🏮', tag: 'Main Site', tagClass: 'tag--main', name: 'Ma-Cho Temple', desc: 'Chinese Taoist temple built in 1978. Dedicated to Mazu, goddess of the sea. 7-story pagoda with panoramic views. Free entry, open daily 6AM–6PM.' },
  { coords: [16.6950, 120.3050], icon: '🔦', tag: 'Nature & Views', tagClass: 'tag--nature', name: 'Poro Point Lighthouse', desc: 'A 19th-century Spanish-era lighthouse built in 1892. Sweeping views of the South China Sea. 5–10 min walk from the temple.' },
  { coords: [16.6700, 120.3200], icon: '🏄', tag: 'Activity', tagClass: 'tag--heritage', name: 'San Juan Surf Area', desc: 'The surf capital of northern Luzon. Consistent waves Oct–Mar, surf schools, and beachfront cafes. 20 min by tricycle from the temple.' },
  { coords: [16.6800, 120.3150], icon: '🏙️', tag: 'Main Site', tagClass: 'tag--main', name: 'San Fernando City Center', desc: 'Capital of La Union. Local market, Ilocano food, and the San Fernando Cathedral. Good base for exploring the province.' },
  { coords: [16.6920, 120.3080], icon: '🌊', tag: 'Nature & Views', tagClass: 'tag--nature', name: 'Poro Point Coastline', desc: 'Rocky coastline surrounding the Poro Point promontory. Dramatic sea views, crashing waves, and excellent photography spots.' }
].forEach(({ coords, icon, tag, tagClass, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) }).addTo(map)
    .bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tagClass}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 });
});

L.polyline([[16.6900, 120.3100],[16.6950, 120.3050],[16.6920, 120.3080]], { color: '#c82020', weight: 3, dashArray: '7 9', opacity: 0.8 }).addTo(map);

// ===== FORM =====
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.cssText = 'background:#c82020;border-color:#c82020';
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
  navLinks.forEach(l => { l.style.color = l.getAttribute('href') === `#${cur}` ? '#f0c040' : ''; });
}, { passive: true });
