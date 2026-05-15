const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
const map = L.map('tayum-map', { scrollWheelZoom: false }).setView([17.6100,120.6300], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18 }).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());
const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });
[
  { coords:[17.6100,120.6300], icon:'⛪', tag:'Heritage', tc:'tag--main', name:'Tayum Church', desc:'Saint Augustine Parish — one of the oldest churches in the Cordillera, established by Augustinian missionaries during the Spanish colonial period.' },
  { coords:[17.5950,120.6200], icon:'⛪', tag:'Cathedral', tc:'tag--main', name:'Bangued Cathedral', desc:'Seat of the Diocese of Bangued — just 10 km from Tayum. Visit both on the same heritage day.' },
  { coords:[17.7200,120.8500], icon:'💧', tag:'Waterfall', tc:'tag--nature', name:'Kaparkan Falls', desc:'Extraordinary travertine waterfall in Tineg — the crown jewel of Abra, 3–4 hours from Bangued.' },
  { coords:[17.5950,120.6200], icon:'📍', tag:'City', tc:'tag--heritage', name:'Bangued City', desc:'Capital of Abra province — the base for exploring Tayum Church, Bangued Cathedral, and Kaparkan Falls.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => { L.marker(coords, { icon: mkIcon(icon) }).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 }); });
document.getElementById('newsletter-form').addEventListener('submit', function(e) { e.preventDefault(); const btn = this.querySelector('button'); btn.textContent = '✓ You\'re on the list!'; btn.style.background = '#6a4a10'; this.querySelector('input').disabled = true; btn.disabled = true; });
