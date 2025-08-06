document.addEventListener('DOMContentLoaded', () => {

  // If you are reading this you should not be here

  const bubbles = document.querySelectorAll('.bubble'); // Bubble instance
  const container = document.querySelector('.bubble-section'); // Used to measure relative position
  let activeBubble = null; // Central bubble defining

  bubbles.forEach(bubble => { // Assigns initial spacing on the page (not too close to the edge)
    bubble.dataset.startX = (0.1 + 0.8 * Math.random()) * window.innerWidth;
    bubble.dataset.startY = (0.1 + 0.8 * Math.random()) * window.innerHeight;
  });

  window.addEventListener('scroll', () => {
    if (activeBubble) {
      activeBubble.classList.remove('active'); // This removes the central circle if you scroll, preventing freezing
      activeBubble.style.transform = '';
      const img = activeBubble.querySelector('.bubble-img');
      if (img) img.src = '';
      activeBubble = null;
    }

    const scrollY = window.scrollY; // Ye
    const offsetStart = 400; // When the animation starts playing
    const scrollMultiplier = 4; // How fast the animation plays relative to scroll progress
    const rawProgress = (scrollY - (container.offsetTop - offsetStart)) / window.innerHeight;
    const progress = Math.min(1, Math.max(0, rawProgress * scrollMultiplier));

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = 400;

    // Set up click handlers to open/close each bubble
    bubbles.forEach(bubble => {
      bubble.classList.remove('active', 'inactive');
      const angleRad = (parseFloat(bubble.dataset.angle) * Math.PI) / 180; // Radian converter
      const startX = parseFloat(bubble.dataset.startX); // Retrieves previously assigned co-ords
      const startY = parseFloat(bubble.dataset.startY);
      const targetX = centerX + radius * Math.cos(angleRad); // Calculate circle position
      const targetY = centerY + radius * Math.sin(angleRad);
      const currentX = startX + progress * (targetX - startX); // Calulate where it is between start and circle
      const currentY = startY + progress * (targetY - startY);
      bubble.style.transform = `translate(${currentX}px, ${currentY}px)`; // CSS shorthand to move elements (had to look this up)
    });
  });

  bubbles.forEach(bubble => {
    bubble.addEventListener('click', e => {
      e.stopPropagation(); // Prevent document click from immediately closing

      if (activeBubble && activeBubble !== bubble) {
        activeBubble.classList.remove('active'); // Close previous active bubbles to allow for new ones
        activeBubble.style.transform = '';
        activeBubble = null;
        window.dispatchEvent(new Event('scroll')); // First co-ordinate logic again to prevent 0, 0 position
      }

      bubble.style.transform = ''; // Clear lingering elements

      const willOpen = !bubble.classList.contains('active'); // Active check
      bubble.classList.toggle('active', willOpen); // Activates with active check
      activeBubble = willOpen ? bubble : null;

      if (willOpen) {
        const img = bubble.querySelector('.bubble-img');
        img.src = bubble.dataset.img; // Loads image from CSS
        img.alt = bubble.dataset.title;
      } else {
        bubble.querySelector('.bubble-img').src = ''; // Error prevention
      }
    });
  });


  window.addEventListener('click', () => {
    if (activeBubble) {
      activeBubble.classList.remove('active'); // Used to reset the active bubble when another area is clicked
      activeBubble = null;
    }
    window.dispatchEvent(new Event('scroll')); // Without this it resets to the top left corner
  });
});


/* —————————————————————————————— get baited lol, I tend to remove these from others work to save face if I ever use this on my github portfolio —————————————————————————————— */