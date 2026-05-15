const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
const map = L.map('chico-map', { scrollWheelZoom: false }).setView([17.4500,121.1500], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18 }).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());
const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });
[
  { coords:[17.4500,121.1500], icon:'🌊', tag:'River', tc:'tag--main', name:'Chico River', desc:'Sacred river of the Kalinga people — whitewater rafting, kayaking, and swimming through dramatic Cordillera gorges.' },
  { coords:[17.3800,121.1200], icon:'🪡', tag:'Village', tc:'tag--heritage', name:'Buscalan Village', desc:'Home of Whang-Od — the world\'s oldest mambabatok (traditional Kalinga tattoo artist). 3–4 hours from Tabuk.' },
  { coords:[17.3900,121.1300], icon:'🏔️', tag:'Mountain', tc:'tag--nature', name:'Sleeping Beauty Mountain', desc:'Sacred Kalinga mountain with a distinctive reclining silhouette — panoramic views of the Kalinga highlands.' },
  { coords:[17.4500,121.1500], icon:'📍', tag:'City', tc:'tag--heritage', name:'Tabuk City', desc:'Capital of Kalinga province — base for all Kalinga adventures including the Chico River and Buscalan Village.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => { L.marker(coords, { icon: mkIcon(icon) }).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 }); });
document.getElementById('newsletter-form').addEventListener('submit', function(e) { e.preventDefault(); const btn = this.querySelector('button'); btn.textContent = '✓ You\'re on the list!'; btn.style.background = '#0878a0'; this.querySelector('input').disabled = true; btn.disabled = true; });
