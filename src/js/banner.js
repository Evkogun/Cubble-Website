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

      const closeBtn = document.getElementById("closeBtn");
      if (closeBtn) {
        closeBtn.addEventListener("click", function () {
          const notificationBar = document.getElementById("notificationBar");
          if (notificationBar) notificationBar.remove();
          const banner = document.getElementById("banner");
          if (banner) banner.style.top = "0";
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
        const hoursN = document.getElementById('hours');
        const minutesN = document.getElementById('minutes');
        const secondsN = document.getElementById('seconds');


        if (diff <= 0) {
          if (hoursN) hoursN.textContent = '00';
          if (minutesN) minutesN.textContent = '00';
          if (secondsN) secondsN.textContent = '00';
          clearInterval(countdownInterval);
          return;
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (hoursN) hoursN.textContent = hours.toString().padStart(2, '0');
        if (minutesN) minutesN.textContent = minutes.toString().padStart(2, '0');
        if (secondsN) secondsN.textContent = seconds.toString().padStart(2, '0');
      }

      const countdownInterval = setInterval(updateCountdown, 1000);
      updateCountdown();
      // --- End countdown logic ---
    });
}

function initBannerScroll() {
  const banner = document.getElementById('banner');
  if (!banner) return; // Null Protection
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