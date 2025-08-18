document.addEventListener('DOMContentLoaded', () => {
  // Inject CSS link into <head> if not already present
  if (!document.querySelector('link[href="/css/footer.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/footer.css';
    document.head.appendChild(link);
  }

  // Inject footer HTML
  fetch('/footer.html')
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById('footer-container');
      container.innerHTML = html;

      // Set year
      const yearEl = container.querySelector('#year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    })
    .catch(err => console.error('Couldn’t load footer:', err));
});