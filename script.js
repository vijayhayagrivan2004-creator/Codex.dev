// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  }, 60);
});

document.querySelectorAll('a, button, .nav-item, .filter-btn, .faq-question, .slider-arrow, .dot').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width = '20px'; cursor.style.height = '20px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width = '12px'; cursor.style.height = '12px'; });
});

// NAVIGATION
function navigateTo(p) {
  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
  document.getElementById('page-' + p).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const a = document.querySelector('[data-page="' + p + '"]');
  if (a) a.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMobileSidebar();
  if (p === 'home') setTimeout(startCounters, 400);
}

function scrollToSection(id) {
  navigateTo('home');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 200);
  closeMobileSidebar();
}

// SIDEBAR TOGGLE
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const toggleBtn = document.getElementById('sidebarToggle');
const toggleIcon = document.getElementById('toggleIcon');
let collapsed = false;

toggleBtn.addEventListener('click', () => {
  collapsed = !collapsed;
  sidebar.classList.toggle('collapsed', collapsed);
  mainContent.classList.toggle('sidebar-collapsed', collapsed);
  toggleIcon.className = collapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
});

// MOBILE SIDEBAR
const mobileBtn = document.getElementById('mobileMenuBtn');
const overlay = document.getElementById('mobileOverlay');

mobileBtn.addEventListener('click', () => {
  sidebar.classList.contains('mobile-open') ? closeMobileSidebar() : openMobileSidebar();
});
overlay.addEventListener('click', closeMobileSidebar);

function openMobileSidebar() {
  sidebar.classList.add('mobile-open');
  overlay.classList.add('active');
  mobileBtn.classList.add('open');
}

function closeMobileSidebar() {
  sidebar.classList.remove('mobile-open');
  overlay.classList.remove('active');
  mobileBtn.classList.remove('open');
}

// HERO SLIDER
let cur = 0;
const track = document.getElementById('sliderTrack');
const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
  cur = n;
  track.style.transform = 'translateX(-' + (cur * 100) + '%)';
  dots.forEach((d, i) => d.classList.toggle('active', i === cur));
}

function nextSlide() { goToSlide((cur + 1) % 3); resetInt(); }
function prevSlide() { goToSlide((cur + 2) % 3); resetInt(); }

let si = setInterval(nextSlide, 5000);
function resetInt() { clearInterval(si); si = setInterval(nextSlide, 5000); }

// STATS COUNTER
let cStarted = false;
function startCounters() {
  if (cStarted) return;
  cStarted = true;
  document.querySelectorAll('.counter').forEach(c => {
    const t = +c.dataset.target;
    const step = t / 112;
    let v = 0;
    const timer = setInterval(() => {
      v += step;
      if (v >= t) { v = t; clearInterval(timer); }
      c.textContent = Math.floor(v);
    }, 16);
  });
}

const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) startCounters(); });
}, { threshold: 0.3 });

const statsSec = document.getElementById('stats');
if (statsSec) statsObs.observe(statsSec);

// FAQ TOGGLE
function toggleFAQ(q) {
  const item = q.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// PORTFOLIO FILTER
function filterPortfolio(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.portfolio-card').forEach(card => {
    const match = cat === 'all' || card.dataset.category === cat;
    card.style.opacity = match ? '1' : '0.3';
    card.style.transform = match ? 'scale(1)' : 'scale(0.95)';
    card.style.transition = 'all 0.3s ease';
  });
}

// CONTACT FORM
function submitForm() {
  let valid = true;
  const fields = [
    { id: 'name',    gid: 'group-name',    check: v => v.trim().length > 1 },
    { id: 'email',   gid: 'group-email',   check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'subject', gid: 'group-subject', check: v => v.trim().length > 2 },
    { id: 'message', gid: 'group-message', check: v => v.trim().length > 10 }
  ];

  fields.forEach(f => {
    const inp = document.getElementById(f.id);
    const grp = document.getElementById(f.gid);
    if (inp && grp) {
      if (!f.check(inp.value)) {
        grp.classList.add('error');
        valid = false;
      } else {
        grp.classList.remove('error');
      }
    }
  });

  if (valid) {
    const successMsg = document.getElementById('formSuccess');
    const form = document.getElementById('contactForm');
    if (successMsg) successMsg.style.display = 'block';
    if (form) form.reset();
    fields.forEach(f => {
      const grp = document.getElementById(f.gid);
      if (grp) grp.classList.remove('error');
    });
    setTimeout(() => {
      if (successMsg) successMsg.style.display = 'none';
    }, 5000);
  }
}

// BACK TO TOP
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Start counters on page load if stats section is visible
window.addEventListener('load', () => {
  const statsEl = document.getElementById('stats');
  if (statsEl) {
    const rect = statsEl.getBoundingClientRect();
    if (rect.top < window.innerHeight) startCounters();
  }
});
