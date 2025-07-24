(function(){
  const mql = window.matchMedia('(max-width:790px)');

  function updateMobileClass(e) {
    if (e.matches) {
      document.documentElement.classList.add('is-mobile');
    } else {
      document.documentElement.classList.remove('is-mobile');
    }
  }

  updateMobileClass(mql);

  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', updateMobileClass);
  } else {
    mql.addListener(updateMobileClass);
  }
})();