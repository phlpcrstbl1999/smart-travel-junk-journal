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
const mapEl = document.getElementById('syquia-map');
mapEl.style.height = '520px';

const map = L.map('syquia-map', { scrollWheelZoom: false })
  .setView([17.5755, 120.3865], 15);

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
    coords: [17.5755, 120.3865], icon: '🏠', tag: 'Main Site', tagClass: 'tag--main',
    name: 'Syquia Mansion',
    desc: 'Ancestral home of President Elpidio Quirino, built in the 1830s. Now a museum with original 19th-century furniture, presidential artifacts, and the azotea terrace. Entry: ₱30–₱50. Open Tue–Sun 9AM–5PM.'
  },
  {
    coords: [17.5747, 120.3869], icon: '🏛️', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Calle Crisologo',
    desc: 'The iconic cobblestone street of Vigan — lined with 16th–19th century ancestral houses. Best visited at dawn or dusk. The heart of Vigan\'s UNESCO heritage zone.'
  },
  {
    coords: [17.5740, 120.3880], icon: '⛪', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Saint Paul Metropolitan Cathedral',
    desc: 'A massive Baroque church built in 1641. One of the most impressive church facades in the Philippines, adjacent to Plaza Salcedo.'
  },
  {
    coords: [17.5745, 120.3885], icon: '🏛️', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Plaza Salcedo',
    desc: 'The main plaza in front of the cathedral. Features a dancing fountain show on weekend evenings. Perfect for sunset watching and people-watching.'
  },
  {
    coords: [17.5760, 120.3870], icon: '🏛️', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Crisologo Museum',
    desc: 'Ancestral home of the Crisologo political family. Houses personal belongings, political memorabilia, and Ilocano cultural artifacts. A natural companion to the Syquia Mansion.'
  },
  {
    coords: [17.5750, 120.3860], icon: '🍽️', tag: 'Food & Culture', tagClass: 'tag--food',
    name: 'Plaza Burgos & Empanada Stalls',
    desc: 'A lively plaza surrounded by restaurants and the famous Vigan Empanada stalls. Try the crispy Vigan empanada — a must-eat Ilocano street food.'
  },
  {
    coords: [17.5820, 120.3900], icon: '🔔', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Bantay Bell Tower',
    desc: 'A 400-year-old colonial watchtower built in 1591. Climb to the top for a 360° panoramic view of Vigan and the Abra River. Free entry, 10 min by tricycle.'
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

// Dashed walking route through the heritage zone
L.polyline(
  [
    [17.5755, 120.3865],
    [17.5747, 120.3869],
    [17.5745, 120.3885],
    [17.5760, 120.3870],
    [17.5750, 120.3860],
    [17.5710, 120.3840]
  ],
  { color: '#a05828', weight: 3, dashArray: '7 9', opacity: 0.8 }
).addTo(map);

// ===== NEWSLETTER FORM =====
document.getElementById('newsletter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = this.querySelector('input[type="email"]');
  const btn   = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#a05828';
  btn.style.borderColor = '#a05828';
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
    link.style.color = link.getAttribute('href') === `#${current}` ? '#f0d080' : '';
  });
}, { passive: true });
