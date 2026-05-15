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
const mapEl = document.getElementById('paoay-map');
mapEl.style.height = '520px';

const map = L.map('paoay-map', { scrollWheelZoom: false })
  .setView([18.0550, 120.5300], 13);

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
    coords: [18.0550, 120.5300], icon: '🏜️', tag: 'Main Site', tagClass: 'tag--main',
    name: 'Paoay Sand Dunes',
    desc: 'The main dunes area — 85+ hectares of golden sand. 4x4 rides, sandboarding, and sunset viewing available at the jump-off point.'
  },
  {
    coords: [18.0547, 120.5100], icon: '⛪', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Paoay Church (Saint Augustine)',
    desc: 'UNESCO World Heritage Site built in 1694. Massive coral-stone buttresses and Baroque architecture. One of the most iconic churches in the Philippines.'
  },
  {
    coords: [18.0600, 120.5050], icon: '🌊', tag: 'Nature', tagClass: 'tag--nature',
    name: 'Lake Paoay (Paoay Lake)',
    desc: 'A serene freshwater lake perfect for sunset viewing. Local fishermen bring in their catch here every evening.'
  },
  {
    coords: [18.1800, 120.5900], icon: '📍', tag: 'Main Site', tagClass: 'tag--main',
    name: 'Laoag City',
    desc: 'Capital of Ilocos Norte. Gateway to Paoay — 20 km away. Home to the Sinking Bell Tower, Laoag Cathedral, and the famous Laoag empanada.'
  },
  {
    coords: [18.5600, 120.7900], icon: '🌊', tag: 'Nature', tagClass: 'tag--nature',
    name: 'Bangui Windmills',
    desc: 'A row of 20 giant wind turbines along the coast. One of the most photographed landmarks in Ilocos Norte. ~30 km north of Laoag.'
  },
  {
    coords: [18.0500, 120.5400], icon: '🏠', tag: 'Main Site', tagClass: 'tag--main',
    name: 'Paoay Town Center',
    desc: 'Main hub for food, accommodation, and tricycle rentals. Try authentic Ilocano dishes like bagnet, pinakbet, and empanada.'
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

// Dashed route line (Laoag → Paoay Town → Paoay Church → Sand Dunes → Lake Paoay)
L.polyline(
  [[18.1800, 120.5900], [18.0500, 120.5400], [18.0547, 120.5100], [18.0550, 120.5300], [18.0600, 120.5050]],
  { color: '#c9920a', weight: 3, dashArray: '7 9', opacity: 0.8 }
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
