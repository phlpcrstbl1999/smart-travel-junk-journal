const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
const map = L.map('baguio-map', { scrollWheelZoom: false }).setView([16.4023,120.5960], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18 }).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());
const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });
[
  { coords:[16.4023,120.5960], icon:'🌲', tag:'City', tc:'tag--main', name:'Baguio City', desc:'The Summer Capital of the Philippines at 1,500m elevation — cool climate, pine forests, Burnham Park, Session Road, and the gateway to the Cordillera.' },
  { coords:[16.4600,120.5900], icon:'🍓', tag:'Farm', tc:'tag--nature', name:'La Trinidad Strawberry Farm', desc:'The strawberry capital of the Philippines — pick fresh strawberries directly from the fields, just 15 minutes from Baguio.' },
  { coords:[16.5900,120.8900], icon:'🏔️', tag:'Mountain', tc:'tag--nature', name:'Mt. Pulag', desc:'Highest peak in Luzon at 2,922m — famous for the sea of clouds at sunrise. 3–4 hours from Baguio via Kabayan.' },
  { coords:[16.4023,120.5960], icon:'📍', tag:'District', tc:'tag--heritage', name:'Session Road', desc:'The main commercial street of Baguio — restaurants, cafes, shops, and the heart of the city\'s vibrant urban life.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => { L.marker(coords, { icon: mkIcon(icon) }).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 }); });
document.getElementById('newsletter-form').addEventListener('submit', function(e) { e.preventDefault(); const btn = this.querySelector('button'); btn.textContent = '✓ You\'re on the list!'; btn.style.background = '#1a5878'; this.querySelector('input').disabled = true; btn.disabled = true; });
