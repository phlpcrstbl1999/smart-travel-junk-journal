const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
const map = L.map('pulag-map', { scrollWheelZoom: false }).setView([16.5900,120.8900], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18 }).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());
const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });
[
  { coords:[16.5900,120.8900], icon:'🏔️', tag:'Summit', tc:'tag--main', name:'Mt. Pulag Summit (2,922m)', desc:'Highest peak in Luzon — famous for the sea of clouds at sunrise. The Ambangeg Trail is the most popular route.' },
  { coords:[16.5800,120.8800], icon:'🏕️', tag:'Camp', tc:'tag--nature', name:'Ambangeg Ranger Station', desc:'Jump-off point for the most popular Mt. Pulag trail. Register here and meet your guide before the trek.' },
  { coords:[16.4023,120.5960], icon:'🌲', tag:'City', tc:'tag--heritage', name:'Baguio City', desc:'Main staging point for Mt. Pulag treks — 3–4 hours from the Ambangeg Ranger Station.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => { L.marker(coords, { icon: mkIcon(icon) }).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 }); });
document.getElementById('newsletter-form').addEventListener('submit', function(e) { e.preventDefault(); const btn = this.querySelector('button'); btn.textContent = '✓ You\'re on the list!'; btn.style.background = '#2a5840'; this.querySelector('input').disabled = true; btn.disabled = true; });
