const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
const map = L.map('intramuros-map', { scrollWheelZoom: false }).setView([14.5893,120.9750], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18 }).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());
const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });
[
  { coords:[14.5893,120.9750], icon:'🏰', tag:'Heritage', tc:'tag--heritage', name:'Intramuros', desc:'The Walled City of Manila — 16th-century Spanish colonial fortifications enclosing Fort Santiago, Manila Cathedral, and cobblestone streets.' },
  { coords:[14.5921,120.9742], icon:'⚔️', tag:'Heritage', tc:'tag--heritage', name:'Fort Santiago', desc:'A 16th-century citadel at the mouth of the Pasig River — where José Rizal was imprisoned before his execution in 1896.' },
  { coords:[14.5876,120.9784], icon:'⛪', tag:'Heritage', tc:'tag--heritage', name:'Manila Cathedral', desc:'The seat of the Archdiocese of Manila, rebuilt eight times since 1571 — the spiritual heart of Catholic Philippines.' },
  { coords:[14.5869,120.9756], icon:'🎭', tag:'Culture', tc:'tag--main', name:'Casa Manila Museum', desc:'A reconstructed 19th-century colonial house showcasing the lifestyle of Manila\'s ilustrado class during the Spanish era.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => { L.marker(coords, { icon: mkIcon(icon) }).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 }); });
document.getElementById('newsletter-form').addEventListener('submit', function(e) { e.preventDefault(); const btn = this.querySelector('button'); btn.textContent = '✓ You\'re on the list!'; btn.style.background = '#6a4a10'; this.querySelector('input').disabled = true; btn.disabled = true; });
