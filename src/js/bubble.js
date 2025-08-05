document.addEventListener('DOMContentLoaded', () => {
  const bubbles = document.querySelectorAll('.bubble');
  const container = document.querySelector('.bubble-section');
  const detail = document.getElementById('bubble-detail');
  const detailTitle = document.getElementById('bubble-detail-title');
  const detailText = document.getElementById('bubble-detail-text');
  const detailImg = document.getElementById('bubble-detail-img');
  const detailClose = document.getElementById('bubble-detail-close');

  if (!container) return;

  bubbles.forEach((bubble) => {
    bubble.dataset.startX = Math.random() * window.innerWidth;
    bubble.dataset.startY = Math.random() * window.innerHeight;
  });

  let activeBubble = null;

  window.addEventListener('scroll', () => {
    if (activeBubble) return;

    const containerTop = container.offsetTop;
    const scrollY = window.scrollY;
    const offsetStart = 500;
    const scrollMultiplier = 4;
    const rawProgress = (scrollY - (containerTop - offsetStart)) / window.innerHeight;
    const progress = Math.min(1, Math.max(0, rawProgress * scrollMultiplier));

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = 400;

    bubbles.forEach((bubble) => {
      bubble.classList.remove('active', 'inactive');
      const angleDeg = parseFloat(bubble.dataset.angle);
      const angleRad = (angleDeg * Math.PI) / 180;
      const startX = parseFloat(bubble.dataset.startX);
      const startY = parseFloat(bubble.dataset.startY);
      const targetX = centerX + radius * Math.cos(angleRad);
      const targetY = centerY + radius * Math.sin(angleRad);
      const currentX = startX + progress * (targetX - startX);
      const currentY = startY + progress * (targetY - startY);
      bubble.style.transform = `translate(${currentX}px, ${currentY}px) scale(1)`;
    });
  });

  bubbles.forEach((bubble) => {
    bubble.addEventListener('click', (e) => {
      e.stopPropagation();
      activeBubble = bubble;

      bubbles.forEach((b) => {
        if (b === bubble) {
          b.classList.add('active');
          b.classList.remove('inactive');
          b.style.transform = ''; 
        } 
      });

      detailTitle.textContent = bubble.dataset.title;
      detailText.textContent = bubble.dataset.text;
      detailImg.src = bubble.dataset.img;
      detailImg.alt = bubble.dataset.title;
      detail.classList.remove('hidden');
    });
  });

  detailClose.addEventListener('click', (e) => {
    e.stopPropagation();
    detail.classList.add('hidden');
    activeBubble = null;
    bubbles.forEach((b) => b.classList.remove('active', 'inactive'));
    window.dispatchEvent(new Event('scroll'));
  });

  detail.addEventListener('click', (e) => {
    if (e.target === detail) {
      detail.classList.add('hidden');
      activeBubble = null;
      bubbles.forEach((b) => b.classList.remove('active', 'inactive'));
      window.dispatchEvent(new Event('scroll'));
    }
  });
});
