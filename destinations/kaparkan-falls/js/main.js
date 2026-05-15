const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
const map = L.map('kaparkan-map', { scrollWheelZoom: false }).setView([17.6500,120.9000], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18 }).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());
const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });
[
  { coords:[17.7200,120.8500], icon:'💧', tag:'Waterfall', tc:'tag--main', name:'Kaparkan Falls', desc:'Extraordinary travertine waterfall in Tineg, Abra — white limestone terraces and turquoise pools nicknamed the Niagara of the Philippines.' },
  { coords:[17.5950,120.6200], icon:'⛪', tag:'Heritage', tc:'tag--heritage', name:'Bangued Cathedral', desc:'Seat of the Diocese of Bangued — the spiritual heart of Abra province and the base for the Kaparkan Falls trip.' },
  { coords:[17.6100,120.6300], icon:'⛪', tag:'Heritage', tc:'tag--heritage', name:'Tayum Church', desc:'One of the oldest churches in the Cordillera — just 10 km from Bangued, a beautiful colonial Augustinian church.' },
  { coords:[17.5950,120.6200], icon:'📍', tag:'City', tc:'tag--heritage', name:'Bangued', desc:'Capital of Abra province and the essential base for the Kaparkan Falls adventure. 8–9 hours from Manila by bus.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => { L.marker(coords, { icon: mkIcon(icon) }).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 }); });
document.getElementById('newsletter-form').addEventListener('submit', function(e) { e.preventDefault(); const btn = this.querySelector('button'); btn.textContent = '✓ You\'re on the list!'; btn.style.background = '#0a6838'; this.querySelector('input').disabled = true; btn.disabled = true; });
