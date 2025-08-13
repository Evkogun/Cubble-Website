function injectBanner() {
  return fetch('/banner.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('banner-container').innerHTML = html;

      const envelopeBtn = document.querySelector('.envelope-btn');
      if (envelopeBtn) {
        envelopeBtn.addEventListener('click', () => {
          window.location.href = 'signUp.html';
        });
      }
      const registerBtn = document.querySelector('.register-btn');
      if (registerBtn) {
        registerBtn.addEventListener('click', () => {
          window.location.href = 'signUp.html';
        });
      }
      const hamburgerButton = document.getElementById('hamburger-button');
      const mobileMenu = document.getElementById('mobile-menu');

      if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', (event) => {
          event.stopPropagation();
          mobileMenu.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
          if (mobileMenu.classList.contains('active') && !mobileMenu.contains(event.target) && !hamburgerButton.contains(event.target)) {
            mobileMenu.classList.remove('active');
          }
        });
      }

      // --- Countdown logic ---
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(currentYear, 8, 30, 23, 59, 59); // September 30, 23:59:59

      if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 8, 30, 23, 59, 59);
      }

      function updateCountdown() {
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();

        if (diff <= 0) {
          document.getElementById('hours').textContent = '00';
          document.getElementById('minutes').textContent = '00';
          document.getElementById('seconds').textContent = '00';
          clearInterval(countdownInterval);
          return;
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
      }

      const countdownInterval = setInterval(updateCountdown, 1000);
      updateCountdown();
      // --- End countdown logic ---
    });
}

function initBannerScroll() {
  const banner = document.getElementById('banner');
  let lastScrollY = window.scrollY;

  banner.classList.add('visible');

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY === 0 || currentY < lastScrollY) {
      banner.classList.add('visible');
    } else {
      banner.classList.remove('visible');
    }
    lastScrollY = currentY;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectBanner()
    .then(initBannerScroll)
    .catch(err => console.error('Banner load failed:', err));
});