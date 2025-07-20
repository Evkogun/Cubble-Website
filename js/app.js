(function() {
  // Grab banner element
  const banner = document.getElementById('banner');
  // Keep track of the last scroll position
  let lastScrollY = window.scrollY;

  // Shows banner on top of page (default loading position)
  if (lastScrollY === 0) {
    banner.classList.add('visible');
  }

  // On every scroll event
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;

    // If at top, or scrolling up, show the banner
    if (currentY === 0 || currentY < lastScrollY) {
      banner.classList.add('visible');
    }
    // Otherwise, hide it
    else {
      banner.classList.remove('visible');
    }

    // Update lastScrollY
    lastScrollY = currentY;
  });
})();
