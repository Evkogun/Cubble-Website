document.addEventListener('DOMContentLoaded', () => {
  fetch('/footer.html')
    .then(response => {
      if (!response.ok) throw new Error(response.statusText);
      return response.text();
    })
    .then(htmlString => {
      document.getElementById('footer-container').innerHTML = htmlString;
    })
    .catch(err => console.error('Couldn’t load footer:', err));
});
