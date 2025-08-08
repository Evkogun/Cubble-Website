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
