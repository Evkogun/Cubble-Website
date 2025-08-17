// --- Banner Injection & Initialization ---
async function injectBanner() {
  try {
    const res = await fetch('/banner.html');
    const html = await res.text();
    document.getElementById('banner-container').innerHTML = html;

    initEnvelopeButton();
    initMobileMenu();
    initBannerScroll();
  } catch (err) {
    console.error('Banner load failed:', err);
  }
}

// --- Envelope Button ---
function initEnvelopeButton() {
  const btn = document.querySelector('.envelope-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.location.href = 'signUp.html';
    });
  }
}

// --- Mobile Menu ---
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-button');
  const menu = document.getElementById('mobile-menu');
  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    menu.classList.toggle('active');
  });

  document.addEventListener('click', e => {
    if (menu.classList.contains('active') &&
        !menu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      menu.classList.remove('active');
    }
  });
}

// --- Countdown Logic ---
function initCountdown() {
  const now = new Date();
  const currentYear = now.getFullYear();
  let targetDate = new Date(currentYear, 8, 30, 23, 59, 59); // Sep 30

  if (now > targetDate) {
    targetDate = new Date(currentYear + 1, 8, 30, 23, 59, 59);
  }

  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function update() {
    const diff = targetDate - new Date();

    if (diff <= 0) {
      [hoursEl, minutesEl, secondsEl].forEach(el => {
        if (el) el.textContent = '00';
      });
      clearInterval(timer);
      return;
    }

    const hours = Math.floor(diff / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const seconds = Math.floor((diff % 60_000) / 1000);

    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
  }

  const timer = setInterval(update, 1000);
  update();
}

// --- Banner Scroll Show/Hide ---
function initBannerScroll() {
  const banner = document.getElementById('banner');
  if (!banner) return;

  let lastScrollY = window.scrollY;
  banner.classList.add('visible');

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    if (currentY <= 50) {
      // Always visible near the very top (no flicker)
      banner.classList.add('visible');
      banner.classList.remove('hidden');
    } else if (currentY< lastScrollY) {
      // Scrolling up (but not at very top) -> show
      banner.classList.add('visible');
      banner.classList.remove('hidden');
    } else if (currentY > lastScrollY) {
      // Scrolling down -> hide
      banner.classList.remove('visible');
      banner.classList.add('hidden');
    }

    lastScrollY = currentY;
  });
}

// --- Init on DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  injectBanner().then(() => initCountdown());
});
