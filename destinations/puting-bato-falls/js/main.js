const style = document.createElement('style');
style.textContent = `.fade-up{opacity:0;transform:translateY(28px);transition:opacity .55s ease,transform .55s ease}.fade-up.visible{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }); }, { threshold: 0.12 });
document.querySelectorAll('.step,.tip-card,.timeline__event,.testimonial-card,.intro__grid').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
const map = L.map('puting-bato-map', { scrollWheelZoom: false }).setView([18.0500,121.1500], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 18 }).addTo(map);
map.on('click', () => map.scrollWheelZoom.enable());
const mkIcon = e => L.divIcon({ className: '', html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">${e}</div>`, iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30] });
[
  { coords:[18.0800,121.1800], icon:'💧', tag:'Waterfall', tc:'tag--main', name:'Puting Bato Falls', desc:'White Rock Falls — water cascading over brilliant white limestone into a crystal-clear turquoise pool in Luna, Apayao.' },
  { coords:[18.0500,121.1500], icon:'🌊', tag:'River', tc:'tag--nature', name:'Apayao River', desc:'One of the most pristine river systems in the Philippines — crystal-clear water, forested banks, and indigenous Isneg communities.' },
  { coords:[18.0600,121.1600], icon:'🌉', tag:'Bridge', tc:'tag--nature', name:'Pudtol Hanging Bridge', desc:'Dramatic suspension bridge over the Apayao River gorge — thrilling views of the river far below.' },
  { coords:[18.0500,121.1500], icon:'📍', tag:'Town', tc:'tag--heritage', name:'Kabugao', desc:'Capital of Apayao province — the base for all Apayao adventures. Reached via Tuguegarao, Cagayan.' },
].forEach(({ coords, icon, tag, tc, name, desc }) => { L.marker(coords, { icon: mkIcon(icon) }).addTo(map).bindPopup(`<div class="map-popup"><span class="map-popup__tag ${tc}">${tag}</span><h4>${name}</h4><p>${desc}</p></div>`, { maxWidth: 260 }); });
document.getElementById('newsletter-form').addEventListener('submit', function(e) { e.preventDefault(); const btn = this.querySelector('button'); btn.textContent = '✓ You\'re on the list!'; btn.style.background = '#0a6838'; this.querySelector('input').disabled = true; btn.disabled = true; });
