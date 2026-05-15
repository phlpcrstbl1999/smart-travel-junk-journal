const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
const map = L.map('batad-map', { scrollWheelZoom: false }).setView([16.9100,121.0600], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18 }).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());
const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });
[
  { coords:[16.9100,121.0600], icon:'🌾', tag:'Terraces', tc:'tag--main', name:'Batad Rice Terraces', desc:'The most spectacular of the Ifugao terrace clusters — a perfect natural amphitheater of 2,000-year-old stone-walled terraces. UNESCO World Heritage Site.' },
  { coords:[16.9200,121.0700], icon:'💧', tag:'Waterfall', tc:'tag--nature', name:'Tappiyah Waterfall', desc:'A beautiful 25-meter waterfall 30 minutes from Batad village — with a natural swimming pool at the base.' },
  { coords:[16.9200,121.0600], icon:'🌾', tag:'Terraces', tc:'tag--main', name:'Banaue Rice Terraces', desc:'The most famous Ifugao terrace cluster — the classic panoramic view that appears on the Philippine 1,000-peso bill.' },
  { coords:[16.9200,121.0600], icon:'📍', tag:'Town', tc:'tag--heritage', name:'Banaue', desc:'The main hub for Ifugao terrace visits — base for Batad, Hapao, and the Banaue viewpoint.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => { L.marker(coords, { icon: mkIcon(icon) }).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 }); });
document.getElementById('newsletter-form').addEventListener('submit', function(e) { e.preventDefault(); const btn = this.querySelector('button'); btn.textContent = '✓ You\'re on the list!'; btn.style.background = '#3a6818'; this.querySelector('input').disabled = true; btn.disabled = true; });
