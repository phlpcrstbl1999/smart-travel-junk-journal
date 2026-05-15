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
const mapEl = document.getElementById('vigan-map');
mapEl.style.height = '520px';

const map = L.map('vigan-map', { scrollWheelZoom: false })
  .setView([17.5747, 120.3869], 15);

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
    coords: [17.5747, 120.3869], icon: '🏛️', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Calle Crisologo',
    desc: 'The iconic cobblestone street lined with 16th–19th century ancestral houses. Best visited at dawn or dusk. The heart of Vigan\'s UNESCO heritage zone.'
  },
  {
    coords: [17.5740, 120.3880], icon: '⛪', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Saint Paul Metropolitan Cathedral',
    desc: 'A massive Baroque church built in 1641. One of the most impressive church facades in the Philippines. Adjacent to Plaza Salcedo.'
  },
  {
    coords: [17.5745, 120.3885], icon: '📍', tag: 'Main Site', tagClass: 'tag--main',
    name: 'Plaza Salcedo',
    desc: 'The main plaza in front of the cathedral. Features a dancing fountain show on weekend evenings. Perfect for sunset watching and people-watching.'
  },
  {
    coords: [17.5750, 120.3860], icon: '📍', tag: 'Main Site', tagClass: 'tag--main',
    name: 'Plaza Burgos',
    desc: 'A lively plaza surrounded by restaurants, souvenir shops, and the famous Vigan Empanada stalls. The social hub of the heritage zone.'
  },
  {
    coords: [17.5755, 120.3865], icon: '🏛️', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Syquia Mansion Museum',
    desc: 'Ancestral home of President Elpidio Quirino, now a museum. Well-preserved 19th-century Ilocano-Chinese Mestizo interiors and period furniture.'
  },
  {
    coords: [17.5760, 120.3870], icon: '🏛️', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Crisologo Museum',
    desc: 'Ancestral home of the Crisologo political family. Houses personal belongings, political memorabilia, and Ilocano cultural artifacts.'
  },
  {
    coords: [17.5820, 120.3900], icon: '⛪', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Bantay Church & Bell Tower',
    desc: 'A 16th-century church with a detached bell tower used as a watchtower during the Spanish era. Climb for panoramic views of Vigan.'
  },
  {
    coords: [17.5730, 120.3850], icon: '🍽️', tag: 'Food & Market', tagClass: 'tag--food',
    name: 'Vigan Empanada Plaza',
    desc: 'The best place for Vigan empanada — crispy deep-fried pastry filled with egg, longganisa, and vegetables. A must-try Ilocano street food.'
  },
  {
    coords: [17.5710, 120.3840], icon: '🏺', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Burnay Pottery (Pagburnayan)',
    desc: 'Traditional burnay pottery workshops where artisans shape clay using foot-powered wheels — a 400-year-old craft. Buy authentic pieces to take home.'
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
    [17.5747, 120.3869],
    [17.5740, 120.3880],
    [17.5745, 120.3885],
    [17.5750, 120.3860],
    [17.5755, 120.3865],
    [17.5760, 120.3870],
    [17.5820, 120.3900]
  ],
  { color: '#b07830', weight: 3, dashArray: '7 9', opacity: 0.8 }
).addTo(map);

// ===== NEWSLETTER FORM =====
document.getElementById('newsletter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = this.querySelector('input[type="email"]');
  const btn   = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#b07830';
  btn.style.borderColor = '#b07830';
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
