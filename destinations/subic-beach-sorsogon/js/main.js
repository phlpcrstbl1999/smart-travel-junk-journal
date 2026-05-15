const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
const map = L.map('subic-sorsogon-map', { scrollWheelZoom: false }).setView([12.5800,124.2400], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18 }).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());
const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });
[
  { coords:[12.5800,124.2400], icon:'🏖️', tag:'Beach', tc:'tag--main', name:'Subic Beach Sorsogon', desc:'Pristine white sand beach at the southernmost tip of Luzon in Matnog — crystal-clear water and island hopping in the San Bernardino Strait.' },
  { coords:[12.5750,124.2350], icon:'📍', tag:'Port', tc:'tag--heritage', name:'Matnog Port', desc:'The southernmost port of Luzon and ferry gateway to Samar. Jump-off point for Subic Beach and Matnog island hopping.' },
  { coords:[12.9100,123.5900], icon:'🐋', tag:'Whale Sharks', tc:'tag--nature', name:'Donsol', desc:'The whale shark capital of the world — combine with Subic Beach for the complete Sorsogon experience.' },
  { coords:[12.7700,124.0500], icon:'🌿', tag:'Crater Lake', tc:'tag--nature', name:'Lake Bulusan', desc:'Serene volcanic crater lake in Bulusan Volcano Natural Park — a beautiful addition to the Sorsogon itinerary.' },
  { coords:[12.9800,124.0050], icon:'📍', tag:'City', tc:'tag--heritage', name:'Sorsogon City', desc:'Provincial capital of Sorsogon — the base for exploring Subic Beach, Donsol, and Lake Bulusan.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => { L.marker(coords, { icon: mkIcon(icon) }).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 }); });
document.getElementById('newsletter-form').addEventListener('submit', function(e) { e.preventDefault(); const btn = this.querySelector('button'); btn.textContent = '✓ You\'re on the list!'; btn.style.background = '#0878a0'; this.querySelector('input').disabled = true; btn.disabled = true; });
