document.addEventListener('DOMContentLoaded', () => {
  const bubbles = document.querySelectorAll('.bubble');
  const container = document.querySelector('.bubble-section');

  if (!container) return;

  bubbles.forEach((bubble) => {
    bubble.dataset.startX = Math.random() * window.innerWidth;
    bubble.dataset.startY = Math.random() * window.innerHeight;
  });

  window.addEventListener('scroll', () => {
    const containerTop = container.offsetTop;
    const scrollY = window.scrollY;
    const scrollMultiplier = 3;
    const offsetStart = 500;
    const rawProgress = (scrollY - (containerTop - offsetStart)) / window.innerHeight;
    const progress = Math.min(1, Math.max(0, rawProgress * scrollMultiplier));

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = 150;

    bubbles.forEach((bubble) => {
      const angleDeg = parseFloat(bubble.dataset.angle);
      const angleRad = (angleDeg * Math.PI) / 180;

      const startX = parseFloat(bubble.dataset.startX);
      const startY = parseFloat(bubble.dataset.startY);

      const targetX = centerX + radius * Math.cos(angleRad);
      const targetY = centerY + radius * Math.sin(angleRad);

      const currentX = startX + progress * (targetX - startX);
      const currentY = startY + progress * (targetY - startY);

      bubble.style.transform = `translate(${currentX}px, ${currentY}px)`;
    });
  });
});
