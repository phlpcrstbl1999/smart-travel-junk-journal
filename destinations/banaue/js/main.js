// ===== FADE-UP STYLES =====
const style = document.createElement('style');
style.textContent = `
  .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.step, .tip-card, .timeline__event, .testimonial-card, .intro__grid')
  .forEach(el => { el.classList.add('fade-up'); observer.observe(el); });

// ===== INTERACTIVE MAP =====
const mapEl = document.getElementById('banaue-map');
mapEl.style.height = '520px';   // guarantee height before Leaflet init

const map = L.map('banaue-map', { scrollWheelZoom: false })
  .setView([16.9000, 121.0650], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(map);

map.on('click', () => map.scrollWheelZoom.enable());

const mkIcon = emoji => L.divIcon({
  className: '',
  html: `<div style="font-size:1.8rem;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.45))">${emoji}</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30]
});

const locations = [
  {
    coords: [16.9167, 121.0583], icon: '📍', tag: 'Main Site', tagClass: 'tag--main',
    name: 'Banaue Main Viewpoint',
    desc: 'The iconic panoramic overlook of the terraces. Best at sunrise or golden hour. ~10 min from town by jeepney.'
  },
  {
    coords: [16.9167, 121.0500], icon: '🏠', tag: 'Main Site', tagClass: 'tag--main',
    name: 'Banaue Town Center',
    desc: 'Main hub for accommodation, food, and transport. Night buses from Manila arrive here. Bring cash — ATMs are scarce.'
  },
  {
    coords: [16.9200, 121.0550], icon: '🏘️', tag: 'Village', tagClass: 'tag--village',
    name: 'Tam-an Village',
    desc: 'A living cultural village near Banaue town. See traditional Ifugao bale houses, meet weavers, and buy authentic handicrafts.'
  },
  {
    coords: [16.9050, 121.0650], icon: '🏘️', tag: 'Village', tagClass: 'tag--village',
    name: 'Bangaan Village',
    desc: 'A traditional Ifugao village nestled deep among the terraces. Reached by a 1.5-hour guided trek from Banaue town.'
  },
  {
    coords: [16.8833, 121.0917], icon: '🏘️', tag: 'Village', tagClass: 'tag--village',
    name: 'Batad Village & Terraces',
    desc: 'Amphitheater-shaped terraces — the most dramatic in the region. 45-min hike down from Batad Saddle.'
  },
  {
    coords: [16.8750, 121.0833], icon: '💧', tag: 'Nature', tagClass: 'tag--nature',
    name: 'Tappiyah Waterfall',
    desc: 'A stunning 27-meter waterfall reachable by a 30-min hike from Batad Village. Bring swimwear!'
  }
];

locations.forEach(({ coords, icon, tag, tagClass, name, desc }) => {
  L.marker(coords, { icon: mkIcon(icon) })
    .addTo(map)
    .bindPopup(
      `<div class="map-popup">
        <span class="map-popup__tag ${tagClass}">${tag}</span>
        <h4>${name}</h4>
        <p>${desc}</p>
      </div>`,
      { maxWidth: 260 }
    );
});

// Dashed trekking route
L.polyline(
  [[16.9167, 121.0583], [16.9050, 121.0650], [16.8833, 121.0917], [16.8750, 121.0833]],
  { color: '#d4a017', weight: 3, dashArray: '7 9', opacity: 0.8 }
).addTo(map);

// ===== NEWSLETTER FORM =====
document.getElementById('newsletter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = this.querySelector('input[type="email"]');
  const btn   = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#52b788';
  btn.style.borderColor = '#52b788';
  input.value = '';
  input.disabled = true;
  btn.disabled = true;
});

// ===== FOOTER NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.footer__links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? '#f0c040' : '';
  });
}, { passive: true });
