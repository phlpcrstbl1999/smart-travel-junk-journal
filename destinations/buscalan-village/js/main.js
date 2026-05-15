const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
const map = L.map('buscalan-map', { scrollWheelZoom: false }).setView([17.3800,121.1200], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18 }).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());
const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });
[
  { coords:[17.3800,121.1200], icon:'🪡', tag:'Village', tc:'tag--main', name:'Buscalan Village', desc:'Home of Whang-Od Oggay — the world\'s oldest mambabatok. Traditional Kalinga tattooing using the hand-tapping method. 2-hour trek from Tinglayan.' },
  { coords:[17.3900,121.1300], icon:'🏔️', tag:'Mountain', tc:'tag--nature', name:'Sleeping Beauty Mountain', desc:'Sacred Kalinga mountain visible from Buscalan — combine with the village visit for the complete Tinglayan experience.' },
  { coords:[17.4500,121.1500], icon:'🌊', tag:'River', tc:'tag--nature', name:'Chico River', desc:'Sacred river of the Kalinga people — whitewater rafting and kayaking through dramatic Cordillera gorges.' },
  { coords:[17.3800,121.1200], icon:'📍', tag:'Town', tc:'tag--heritage', name:'Tinglayan', desc:'Jump-off point for Buscalan Village — 3–4 hours from Tabuk City by jeepney.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => { L.marker(coords, { icon: mkIcon(icon) }).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 }); });
document.getElementById('newsletter-form').addEventListener('submit', function(e) { e.preventDefault(); const btn = this.querySelector('button'); btn.textContent = '✓ You\'re on the list!'; btn.style.background = '#785010'; this.querySelector('input').disabled = true; btn.disabled = true; });
