document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('cblb-grid');
  const toggleBtn = document.getElementById('cblb-toggle');

  // Your feature data 
  const features = [
    { image: '../img/Logo.jpg', title: 'Smart Matching', text: 'Cubble places you in a private "bubble" with 10 like-minded people for 48 hours You chat, connect, and see what clicks, no swiping, no endless scrolling.' },
    { image: '../img/Logo.jpg', title: 'how-block reverse', text: "Our on-device AI suggests icebreakers, nudges better conversations, and flag sharmful messages before theyr'e ever sent, all without invading your privacy.." },
    { image: '../img/Logo.jpg', title: 'From Chat to Real-World Connections', text: "Whether you're looking for new friends or a date, Cubble helps build trust first. Verified video intros and community moderation ensure everyone feels safe showing up. " },
    { image: '../img/Logo.jpg', title: 'Built for Students (and Beyond)', text: "Our campus edition connects students using .edu emails in localised bubbles,making it easy to find people in your area. Broader community rollouts coming soon. " },
    { image: '../img/Logo.jpg', title: 'Cross-Platform Sync', text: 'Seamless switching between desktop and mobile with real-time updates.' },
    { image: '../img/Logo.jpg', title: 'Automated Reporting', text: 'Generate detailed project reports with one click.' },
    { image: '../img/Logo.jpg', title: 'Custom Workflows', text: 'Tailor Cubble to match your team’s unique processes.' },
    { image: '../img/Logo.jpg', title: 'Integrated Calendar', text: 'Sync deadlines across all your productivity tools.' },
    { image: '../img/Logo.jpg', title: 'AI Assistance', text: 'Get smart suggestions for task prioritization and resource allocation.' },
   
  ];

  let showAll = false;
  const initialRows = 2;

  function itemsPerRow() {
    // match CSS breakpoints
    const w = window.innerWidth;
    if (w <= 768) return 1;
    if (w <= 1024) return 2;
    return 3;
  }

  function render() {
    grid.innerHTML = '';
    const perRow = itemsPerRow();
    const limit = showAll ? features.length : Math.min(features.length, initialRows * perRow);

    features.slice(0, limit).forEach(f => {
      const el = document.createElement('article');
      el.className = 'cblb-item';
      el.innerHTML = `
        <figure class="cblb-imgwrap">
          <img class="cblb-img" src="${f.image}" alt="${f.title}">
        </figure>
        <div class="cblb-textwrap">
          <h3 class="cblb-item-title">${f.title}</h3>
          <p class="cblb-item-desc">${f.text}</p>
        </div>
      `;
      grid.appendChild(el);
    });

    // Toggle visibility / label
    if (limit >= features.length && !showAll) {
      // if all visible even in collapsed state, hide button
      toggleBtn.style.display = 'none';
    } else {
      toggleBtn.style.display = 'inline-block';
      toggleBtn.textContent = showAll ? `Show Less (${itemsPerRow()} Rows)` : `Load More (+${itemsPerRow()} Rows)`;
    }
  }

  render();
  window.addEventListener('resize', render);
  toggleBtn.addEventListener('click', () => { showAll = !showAll; render(); });
});
