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
