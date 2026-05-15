const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
const map = L.map('hanging-coffins-map', { scrollWheelZoom: false }).setView([17.0800,120.9000], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18 }).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());
const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });
[
  { coords:[17.0800,120.9000], icon:'⚰️', tag:'Heritage', tc:'tag--main', name:'Hanging Coffins of Echo Valley', desc:'Ancient wooden coffins nailed to limestone cliffs — a 2,000-year-old Igorot burial tradition. 30-minute trek from Sagada town.' },
  { coords:[17.0750,120.8950], icon:'🦇', tag:'Cave', tc:'tag--nature', name:'Sumaguing Cave', desc:'The most spectacular cave in Sagada — massive limestone chambers, underground river, and dramatic formations.' },
  { coords:[17.0900,120.9100], icon:'💧', tag:'Waterfall', tc:'tag--nature', name:'Bomod-ok Falls', desc:'200-foot waterfall 2 hours from Sagada town — through rice terraces and pine forest.' },
  { coords:[17.0800,120.9000], icon:'📍', tag:'Town', tc:'tag--heritage', name:'Sagada', desc:'Mountain Province\'s most beloved highland town — cool climate, pine forests, Igorot culture, and extraordinary natural attractions.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => { L.marker(coords, { icon: mkIcon(icon) }).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 }); });
document.getElementById('newsletter-form').addEventListener('submit', function(e) { e.preventDefault(); const btn = this.querySelector('button'); btn.textContent = '✓ You\'re on the list!'; btn.style.background = '#606060'; this.querySelector('input').disabled = true; btn.disabled = true; });
