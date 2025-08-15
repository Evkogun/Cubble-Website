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
          // Clear previous bubble content
          const prevImg = activeBubble.querySelector('.bubble-img');
          const prevTitle = activeBubble.querySelector('.bubble-title');
          const prevText = activeBubble.querySelector('.bubble-text');
          if (prevImg) prevImg.src = '';
          if (prevTitle) prevTitle.textContent = '';
          if (prevText) prevText.textContent = '';
          activeBubble = null;
          window.dispatchEvent(new Event('scroll')); // First co-ordinate logic again to prevent 0, 0 position
        }

        bubble.style.transform = ''; // Clear lingering elements

        const willOpen = !bubble.classList.contains('active'); // Active check
        bubble.classList.toggle('active', willOpen); // Activates with active check
        activeBubble = willOpen ? bubble : null;

        if (willOpen) {
          // Populate all content when opening
          const img = bubble.querySelector('.bubble-img');
          const title = bubble.querySelector('.bubble-title');
          const text = bubble.querySelector('.bubble-text');
          
          if (img) {
            img.src = bubble.dataset.img; // Loads image from CSS
            img.alt = bubble.dataset.title;
          }
          if (title) {
            title.textContent = bubble.dataset.title;
          }
          if (text) {
            text.textContent = bubble.dataset.text;
          }
        } else {
          // Clear content when closing
          const img = bubble.querySelector('.bubble-img');
          const title = bubble.querySelector('.bubble-title');
          const text = bubble.querySelector('.bubble-text');
          if (img) img.src = '';
          if (title) title.textContent = '';
          if (text) text.textContent = '';
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
      const title = activeBubble.querySelector('.bubble-title');
      const text = activeBubble.querySelector('.bubble-text');
      if (img) img.src = '';
      if (title) title.textContent = '';
      if (text) text.textContent = '';
      activeBubble = null;
    }

    const scrollY = window.scrollY; // Ye
    const offsetStart = -800; // When the animation starts playing
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
      const img = activeBubble.querySelector('.bubble-img');
      const title = activeBubble.querySelector('.bubble-title');
      const text = activeBubble.querySelector('.bubble-text');
      if (img) img.src = '';
      if (title) title.textContent = '';
      if (text) text.textContent = '';
      activeBubble = null;
    }
    window.dispatchEvent(new Event('scroll')); // Without this it resets to the top left corner
  });

  const fillerContainer = document.getElementById('filler-bubbles');
  const fillerCount = 20;
  const fillerBubbles = [];

  for (let i = 0; i < fillerCount; i++) {
      const bub = document.createElement('div');
      bub.classList.add('filler-bubble');
      bub.dataset.depth = 0.6 + Math.random() * 0.4;
      const size = (Math.random() * 10 + 60) * parseFloat(bub.dataset.depth);

      bub.style.width = size + 'px';
      bub.style.height = size + 'px';

      let startX, startY;
      let isTooClose;
      const minDistance = 75; // how close bubbles can get px = good (changing this can break the software)

      // Repeat until far enough
      do {
          isTooClose = false;
          startX = (0.1 + 0.8 * Math.random()) * window.innerWidth;
          startY = (0.05 + 0.9 * Math.random()) * window.innerHeight;

          // Check against other filler bubbles
          for (const other of fillerBubbles) {
              const dx = startX - parseFloat(other.dataset.baseX);
              const dy = startY - parseFloat(other.dataset.baseY);
              const dist = Math.sqrt(dx * dx + dy * dy);
              // This was fun to make
              // Compare against sum of rad + minDistance
              const otherRadius = parseFloat(other.style.width) / 2;
              const thisRadius = size / 2;
              if (dist < otherRadius + thisRadius + minDistance) {
                  isTooClose = true;
                  break;
              }
          }

          // Check against the start and end positions of the "real" bubbles
          if (!isTooClose) {
              const rect = container.getBoundingClientRect();
              const centreX = rect.left + rect.width / 2;
              const centreY = window.innerHeight / 2;
              const radius = 400;

              for (const main of bubbles) {
                  const mainStartX = parseFloat(main.dataset.startX);
                  const mainStartY = parseFloat(main.dataset.startY);
                  const angleRad = (parseFloat(main.dataset.angle) * Math.PI) / 180;
                  const targetX = centreX + radius * Math.cos(angleRad);
                  const targetY = centreY + radius * Math.sin(angleRad);

                  const thisRadius = size / 2;
                  const mainRadius = 50; 

                  // Check against start position
                  const dxStart = startX - mainStartX;
                  const dyStart = startY - mainStartY;
                  const distStart = Math.sqrt(dxStart * dxStart + dyStart * dyStart);
                  if (distStart < mainRadius + thisRadius + minDistance) {
                      isTooClose = true;
                      break;
                  }

                  // Check against target position
                  const dxTarget = startX - targetX;
                  const dyTarget = startY - targetY;
                  const distTarget = Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget);
                  if (distTarget < mainRadius + thisRadius + minDistance) {
                      isTooClose = true;
                      break;
                  }
              }
          }
      } while (isTooClose);

      bub.dataset.baseX = startX;
      bub.dataset.baseY = startY;

      bub.dataset.phase = Math.random() * Math.PI * 2;
      bub.dataset.speed = 0.5 + Math.random() * 0.5;

      fillerContainer.appendChild(bub);
      fillerBubbles.push(bub);
  }

  function animateFiller() {
    const t = Date.now() / 1000;

    fillerBubbles.forEach((bub) => {
      const depth = parseFloat(bub.dataset.depth);
      const baseX = parseFloat(bub.dataset.baseX);
      const baseY = parseFloat(bub.dataset.baseY);
      const phase = parseFloat(bub.dataset.phase);
      const speed = parseFloat(bub.dataset.speed);

      const driftX = Math.sin(t * speed + phase) * 2;
      const driftY = Math.cos(t * speed + phase) * 20;
      bub.style.filter = `brightness(${depth * 4 + 1} )`;

      bub.style.transform = `translate(${baseX + driftX}px, ${baseY + driftY}px)`;
    });

    requestAnimationFrame(animateFiller);
  }
  animateFiller();
  
  // Makes bubbles invisible past a certain point
  // Redundant but makes transitions smoother and was useful for early testing
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const container = document.querySelector('.bubble-section');
    const rect = container.getBoundingClientRect();
    const triggerPoint = rect.top + scrollY + 45;
    const fadeDistance = 200;

    fillerBubbles.forEach((bub) => {
      const depth = parseFloat(bub.dataset.depth);
      const baseY = parseFloat(bub.dataset.baseY);
      const newY = baseY + scrollY * depth;
      bub.style.transform = `translate(${bub.dataset.baseX}px, ${newY}px)`;

      const opacity = Math.max(0, 1 - (scrollY - triggerPoint) / fadeDistance);
      bub.style.opacity = opacity * (0.3 + Math.random() * 0.5);
    });
  });
});
































/* —————————————————————————————— get baited lol, I tend to remove these from others work to save face if I ever use this on my github portfolio —————————————————————————————— */
