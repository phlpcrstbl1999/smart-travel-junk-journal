const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
const map = L.map('bulusan-map', { scrollWheelZoom: false }).setView([12.7700,124.0500], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18 }).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());
const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });
[
  { coords:[12.7700,124.0500], icon:'🌿', tag:'Crater Lake', tc:'tag--main', name:'Lake Bulusan', desc:'Serene volcanic crater lake in Bulusan Volcano Natural Park — surrounded by old-growth rainforest, endemic birds, and rare orchids.' },
  { coords:[12.7690,124.0510], icon:'🌋', tag:'Volcano', tc:'tag--nature', name:'Bulusan Volcano', desc:'Active stratovolcano rising above Lake Bulusan — one of the most active volcanoes in the Philippines. Check PHIVOLCS alert levels before visiting.' },
  { coords:[12.9100,123.5900], icon:'🐋', tag:'Whale Sharks', tc:'tag--nature', name:'Donsol', desc:'The whale shark capital of the world — wild, natural butanding encounters in Donsol Bay from November to June.' },
  { coords:[12.9700,124.0100], icon:'🏖️', tag:'Beach', tc:'tag--nature', name:'Subic Beach Sorsogon', desc:'Pristine white sand beach at the tip of Luzon in Matnog — perfect for relaxing after the Lake Bulusan visit.' },
  { coords:[12.9800,124.0050], icon:'📍', tag:'City', tc:'tag--heritage', name:'Sorsogon City', desc:'Provincial capital of Sorsogon — the base for exploring Lake Bulusan, Donsol, and Subic Beach.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => { L.marker(coords, { icon: mkIcon(icon) }).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 }); });
document.getElementById('newsletter-form').addEventListener('submit', function(e) { e.preventDefault(); const btn = this.querySelector('button'); btn.textContent = '✓ You\'re on the list!'; btn.style.background = '#0a6838'; this.querySelector('input').disabled = true; btn.disabled = true; });
