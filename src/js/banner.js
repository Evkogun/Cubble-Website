function injectBanner() {
  return fetch('/banner.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('banner-container').innerHTML = html;
      
      // Initialize envelope button
      const envelopeBtn = document.querySelector('.envelope-btn');
      if (envelopeBtn) {
        envelopeBtn.addEventListener('click', () => {
          window.location.href = 'signUp.html';
        });
      }
      
      // Initialize mobile menu
      const hamburgerButton = document.getElementById('hamburger-button');
      const mobileMenu = document.getElementById('mobile-menu');
      
      if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', (event) => {
          event.stopPropagation();
          mobileMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', (event) => {
          if (mobileMenu.classList.contains('active') && 
              !mobileMenu.contains(event.target) && 
              !hamburgerButton.contains(event.target)) {
            mobileMenu.classList.remove('active');
          }
        });
      }
    })
    .catch(err => console.error('Banner load failed:', err));
}

function initBannerScroll() {
  const banner = document.getElementById('banner');
  if (!banner) return;
  
  let lastScrollY = window.scrollY;
  banner.classList.add('visible');
  
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    
    if (currentY === 0 || currentY < lastScrollY) {
      banner.classList.add('visible');
      banner.classList.remove('hidden');
    } else {
      banner.classList.remove('visible');
      banner.classList.add('hidden');
    }
    
    lastScrollY = currentY;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectBanner()
    .then(() => {

      // Initialize scroll behavior after banner is loaded
      initBannerScroll();
    })
    .catch(err => console.error('Banner initialization failed:', err));
});