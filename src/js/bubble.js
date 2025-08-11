document.addEventListener('DOMContentLoaded', () => {

  // If you are reading this you should not be here

  const bubbles = document.querySelectorAll('.bubble'); // Bubble instance
  const bubbles_main = document.querySelector('.bubble-section-content');
  const container = document.querySelector('.bubble-section'); // Used to measure relative position
  let activeBubble = null; // Central bubble defining

  function initBubbles() {
    bubbles.forEach((bubble, i) => {
      // Assigns initial spacing on the page (not too close to the edge)
      bubble.dataset.startX = (0.1 + 0.8 * Math.random()) * window.innerWidth;
      bubble.dataset.startY = (0.1 + 0.8 * Math.random()) * window.innerHeight;
      bubble.dataset.angle = (i / bubbles.length) * 360;

      // Set up click handler for this bubble
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
  }

  initBubbles();

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
    const progressMerge = rawProgress * scrollMultiplier;

    const rect = container.getBoundingClientRect();
    const centreX = rect.left + rect.width / 2;
    const centreY = window.innerHeight / 2;
    const radius = 400;
    if (!document.body.classList.contains('merged')){
      bubbles.forEach(bubble => {
        bubble.classList.remove('active', 'inactive');
        const angleRad = (parseFloat(bubble.dataset.angle) * Math.PI) / 180; // Radian converter
        const startX = parseFloat(bubble.dataset.startX); // Retrieves previously assigned co-ords
        const startY = parseFloat(bubble.dataset.startY);
        const targetX = centreX + radius * Math.cos(angleRad); // Calculate circle position
        const targetY = centreY + radius * Math.sin(angleRad);
        const currentX = startX + progress * (targetX - startX); // Calulate where it is between start and circle
        const currentY = startY + progress * (targetY - startY);
        bubble.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`; // CSS shorthand to move elements
      });
    }

      if (progressMerge > 2 && !document.body.classList.contains('merged')) {
        document.body.classList.add('merged');
        document.querySelector('.bubble-section-content').classList.add('visible');

        bubbles.forEach(bubble => {
          bubble.style.transition = 'all 0.8s ease';
          bubble.style.transform = `translate(${centreX}px, ${centreY}px) translate(-50%, -50%) scale(0.2)`; 
        });

        bubbles_main.style.transition = 'all 1s ease';
        bubbles_main.style.transform = `translate(-50%, -50%) scale(1)`;
        bubbles_main.classList.add('visible');

        bubbles.forEach(bubble => {
          bubble.style.opacity = '0';
        });

      } else if (progress < 1 && document.body.classList.contains('merged')) {
      document.body.classList.remove('merged');
      document.querySelector('.bubble-section-content').classList.remove('visible');

      bubbles.forEach((bubble) => {
        bubble.style.transition = 'all 0.8s ease';
        bubble.style.opacity = '1';
        const angleRad = (parseFloat(bubble.dataset.angle) * Math.PI) / 180;
        const startX = parseFloat(bubble.dataset.startX);
        const startY = parseFloat(bubble.dataset.startY);
        const targetX = centreX + radius * Math.cos(angleRad);
        const targetY = centreY + radius * Math.sin(angleRad);
        const currentX = startX + progress * (targetX - startX);
        const currentY = startY + progress * (targetY - startY);
        bubble.style.transform = `translate(${centreX}px, ${centreY}px) translate(-50%, -50%) scale(0.2)`;
      });
    }
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
