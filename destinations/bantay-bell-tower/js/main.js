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
const mapEl = document.getElementById('bantay-map');
mapEl.style.height = '520px';

const map = L.map('bantay-map', { scrollWheelZoom: false })
  .setView([17.5820, 120.3900], 14);

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
    coords: [17.5820, 120.3900], icon: '🔔', tag: 'Main Site', tagClass: 'tag--main',
    name: 'Bantay Bell Tower',
    desc: 'Built in 1591. A 20-meter detached watchtower used to warn of pirate attacks. Climb to the top for a 360° panoramic view of Vigan and the Abra River. Free entry.'
  },
  {
    coords: [17.5815, 120.3895], icon: '⛪', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Saint Augustine Church of Bantay',
    desc: 'A 16th-century Augustinian church standing 50 meters from the bell tower. Simple but beautiful interior. An active parish church — dress modestly when visiting.'
  },
  {
    coords: [17.5747, 120.3869], icon: '🏛️', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Calle Crisologo',
    desc: 'The iconic cobblestone street of Vigan — lined with 16th–19th century ancestral houses. Best visited at dawn or dusk. The heart of Vigan\'s UNESCO heritage zone.'
  },
  {
    coords: [17.5740, 120.3880], icon: '⛪', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Saint Paul Metropolitan Cathedral',
    desc: 'A massive Baroque church built in 1641 in the heart of Vigan. One of the most impressive church facades in the Philippines, adjacent to Plaza Salcedo.'
  },
  {
    coords: [17.5745, 120.3885], icon: '🌿', tag: 'Viewpoint', tagClass: 'tag--nature',
    name: 'Plaza Salcedo',
    desc: 'The main plaza in front of the cathedral. Features a dancing fountain show on weekend evenings. Perfect for sunset watching and people-watching.'
  },
  {
    coords: [17.5755, 120.3865], icon: '🏛️', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Syquia Mansion Museum',
    desc: 'Ancestral home of President Elpidio Quirino, now a museum. Well-preserved 19th-century Ilocano-Chinese Mestizo interiors and period furniture.'
  },
  {
    coords: [17.5710, 120.3840], icon: '🏺', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Burnay Pottery (Pagburnayan)',
    desc: 'Traditional burnay pottery workshops — a 400-year-old craft unique to Vigan. Watch artisans shape clay on foot-powered wheels and buy authentic pieces.'
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

// Dashed route from Bell Tower down to Vigan heritage zone
L.polyline(
  [
    [17.5820, 120.3900],
    [17.5815, 120.3895],
    [17.5755, 120.3865],
    [17.5747, 120.3869],
    [17.5740, 120.3880],
    [17.5710, 120.3840]
  ],
  { color: '#b05828', weight: 3, dashArray: '7 9', opacity: 0.8 }
).addTo(map);

// ===== NEWSLETTER FORM =====
document.getElementById('newsletter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = this.querySelector('input[type="email"]');
  const btn   = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#b05828';
  btn.style.borderColor = '#b05828';
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
    link.style.color = link.getAttribute('href') === `#${current}` ? '#f5d080' : '';
  });
}, { passive: true });
