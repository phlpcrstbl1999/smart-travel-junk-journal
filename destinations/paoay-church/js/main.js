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
  .setView([18.0547, 120.5100], 13);

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
    coords: [18.0547, 120.5100], icon: '⛪', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Paoay Church (Saint Augustine)',
    desc: 'UNESCO World Heritage Site built 1694–1710. Famous for its 24 massive coral-stone buttresses and Earthquake Baroque architecture. Free entry, open daily 6AM–6PM.'
  },
  {
    coords: [18.0530, 120.5090], icon: '🔔', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Paoay Bell Tower',
    desc: 'A 26-meter detached bell tower built separately from the church to prevent earthquake damage. Climb to the top for a view of the town and surrounding rice fields.'
  },
  {
    coords: [18.0600, 120.5050], icon: '🌊', tag: 'Nature', tagClass: 'tag--nature',
    name: 'Lake Paoay (Paoay Lake)',
    desc: 'A serene freshwater lake 2 km from the church. Perfect for sunset viewing and peaceful walks. Local fishermen bring in their catch here every evening.'
  },
  {
    coords: [18.0620, 120.5080], icon: '🏛️', tag: 'Heritage', tagClass: 'tag--heritage',
    name: 'Malacañang of the North',
    desc: 'Former residence of President Ferdinand Marcos, now a museum. Located along the shores of Paoay Lake. Exhibits include personal belongings, vintage cars, and historical photos.'
  },
  {
    coords: [18.0550, 120.5300], icon: '📍', tag: 'Main Site', tagClass: 'tag--main',
    name: 'Paoay Sand Dunes',
    desc: '85+ hectares of golden sand dunes just 5 km from the church. Book a 4x4 ride or try sandboarding. A surreal contrast to the 300-year-old church nearby.'
  },
  {
    coords: [18.1800, 120.5900], icon: '📍', tag: 'Main Site', tagClass: 'tag--main',
    name: 'Laoag City',
    desc: 'Capital of Ilocos Norte, 20 km from Paoay. Home to the Sinking Bell Tower, Saint William Cathedral, and the famous Laoag empanada. Gateway to the region.'
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

// Dashed route line connecting key sites
L.polyline(
  [[18.1800, 120.5900], [18.0547, 120.5100], [18.0530, 120.5090], [18.0600, 120.5050], [18.0620, 120.5080], [18.0550, 120.5300]],
  { color: '#c0522a', weight: 3, dashArray: '7 9', opacity: 0.8 }
).addTo(map);

// ===== NEWSLETTER FORM =====
document.getElementById('newsletter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = this.querySelector('input[type="email"]');
  const btn   = this.querySelector('button');
  btn.textContent = '✓ You\'re on the list!';
  btn.style.background = '#c0522a';
  btn.style.borderColor = '#c0522a';
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
