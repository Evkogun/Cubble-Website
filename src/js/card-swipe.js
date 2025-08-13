class CardSwipeManager {
  constructor() {
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupSections());
    } else {
      this.setupSections();
    }
  }

  setupSections() {
    this.initCardSlider();
    this.initSafeSpace();
    this.initWhyUs();
    this.initIntersectionObserver();
  }

  // ========== CARD SLIDER ========== //
  initCardSlider() {
    const container = document.querySelector('#stuff-container');
    if (!container || container.hasAttribute('data-slider-initialized')) return;

    container.setAttribute('data-slider-initialized', 'true');
    
    const cards = this.getDefaultCards();
    this.createSliderHTML(container, cards);
    this.setupSliderEvents(container);
  }

  getDefaultCards() {
    return [
      {
        image: '../img/temp.jpg',
        title: 'Join a group of 10 people and spark real conversations',
        description: 'Form your group, talk for a while, and see who clicks.'
      },
      {
        image: '../img/temp.jpg',
        title: 'Connect, chat and explore shared interests safely',
        description: 'Group up around activities or topics you love.'
      },
      {
        image: '../img/temp.jpg',
        title: 'Meet up with confidence, friends or dates, your way',
        description: 'From chat to meetup: build friendships or spark romance.'
      },
      {
        image: '../img/temp.jpg',
        title: 'AI-powered matching for meaningful connections',
        description: 'Smart algorithms help you find your perfect group.'
      },
      {
        image: '../img/temp.jpg',
        title: 'Safe and verified community spaces',
        description: 'Every member is verified for your peace of mind.'
      }
    ];
  }

  createSliderHTML(container, cards) {
    container.innerHTML = '';
    
    const slider = document.createElement('div');
    slider.className = 'slider';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'nav nav--prev';
    prevBtn.setAttribute('aria-label', 'Previous');
    prevBtn.innerHTML = '<span class="chevron chevron--left"></span>';
    
    const viewport = document.createElement('div');
    viewport.className = 'viewport';
    
    const track = document.createElement('ul');
    track.className = 'track';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'nav nav--next';
    nextBtn.setAttribute('aria-label', 'Next');
    nextBtn.innerHTML = '<span class="chevron chevron--right"></span>';
    
    const slides = cards.map((card, index) => {
      const slide = document.createElement('li');
      slide.className = 'card';
      slide.innerHTML = `
        <div class="card__image">
          <img src="${card.image}" alt="${card.title}" loading="lazy">
          <div class="card__overlay"></div>
        </div>
        <div class="card__content">
          <h3 class="card__title">${card.title}</h3>
          <p class="card__description">${card.description}</p>
        </div>
      `;
      return slide;
    });

    slides.forEach(slide => track.appendChild(slide));

    const firstClones = slides.map(slide => slide.cloneNode(true));
    const lastClones = slides.map(slide => slide.cloneNode(true));
    
    firstClones.forEach(clone => track.appendChild(clone));
    lastClones.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));

    viewport.appendChild(track);
    slider.appendChild(prevBtn);
    slider.appendChild(viewport);
    slider.appendChild(nextBtn);
    container.appendChild(slider);
    
    container.sliderState = {
      track,
      cards: slides,
      currentIndex: cards.length, 
      cardWidth: 0,
      isTransitioning: false,
      totalCards: track.children.length
    };
    
    this.updateSliderResponsive(container);
  }

  setupSliderEvents(container) {
    const state = container.sliderState;
    const prevBtn = container.querySelector('.nav--prev');
    const nextBtn = container.querySelector('.nav--next');
    const track = state.track;
    const viewport = container.querySelector('.viewport');
    prevBtn.addEventListener('click', () => this.slideCard(container, 'prev'));
    nextBtn.addEventListener('click', () => this.slideCard(container, 'next'));
    
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.slideCard(container, 'prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.slideCard(container, 'next');
      }
    });

    track.addEventListener('transitionend', () => {
      this.handleSliderTransitionEnd(container);
    });
    

    this.setupSliderTouch(container);
    
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.updateSliderResponsive(container);
      }, 150);
    });
  }

  setupSliderTouch(container) {
    const viewport = container.querySelector('.viewport');
    let startX = null;
    let startY = null;
    
    viewport.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    
    viewport.addEventListener('touchmove', (e) => {
      if (!startX || !startY) return;
      
      const deltaX = Math.abs(e.touches[0].clientX - startX);
      const deltaY = Math.abs(e.touches[0].clientY - startY);
      
      if (deltaX > deltaY) {
        e.preventDefault();
      }
    }, { passive: false });
    
    viewport.addEventListener('touchend', (e) => {
      if (!startX) return;
      
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { 
        if (diff > 0) {
          this.slideCard(container, 'next');
        } else {
          this.slideCard(container, 'prev');
        }
      }
      
      startX = null;
      startY = null;
    }, { passive: true });
  }

  slideCard(container, direction) {
    const state = container.sliderState;
    if (state.isTransitioning) return;

    state.currentIndex += direction === 'next' ? 1 : -1;
    this.updateSliderTransform(container, true);
  }

  updateSliderTransform(container, animate = true) {
    const state = container.sliderState;
    const track = state.track;
    
    state.isTransitioning = animate;
    
    if (!animate) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    const offset = -state.currentIndex * state.cardWidth;
    track.style.transform = `translateX(${offset}px)`;
    
    if (!animate) {
    
      track.offsetHeight;
      track.style.transition = '';
    }
  }

  handleSliderTransitionEnd(container) {
    const state = container.sliderState;
    const originalLength = state.cards.length;
    
    state.isTransitioning = false;
    

    if (state.currentIndex >= state.totalCards - originalLength) {
      state.currentIndex = originalLength;
      this.updateSliderTransform(container, false);
    } else if (state.currentIndex < originalLength) {
      state.currentIndex = state.totalCards - originalLength - 1;
      this.updateSliderTransform(container, false);
    }
  }

  updateSliderResponsive(container) {
    const state = container.sliderState;
    const width = window.innerWidth;
    let visibleCards;
    
    if (width < 768) {
      visibleCards = 1;
    } else if (width < 1024) {
      visibleCards = 2;
    } else {
      visibleCards = 3;
    }
    
    const viewport = container.querySelector('.viewport');
    const containerWidth = viewport.offsetWidth;
    const gap = visibleCards > 1 ? (visibleCards - 1) * 32 : 0;
    state.cardWidth = (containerWidth + 32) / visibleCards; 
    
 
    container.style.setProperty('--visible-cards', visibleCards);
    

    this.updateSliderTransform(container, false);
  }

  // ========== SAFE SPACE SECTION ========== //
  initSafeSpace() {
    const section = document.querySelector('#safe-space');
    if (!section) return;


    if (!section.querySelector('.safe-space__container')) {
      section.innerHTML = `
        <div class="safe-space__container">
          <h2 class="safe-space__headline">Recovering and Creating a Safe Space for You</h2>
          <p class="safe-space__subcopy">
            We've designed Cubble to be a more mindful alternative to traditional dating apps,
            with less pressure, less noise, and no exploitation.
          </p>
          <button class="safe-space__cta">
            <span>See What's New</span>
            <svg class="safe-space__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      `;
    }


    const cta = section.querySelector('.safe-space__cta');
    if (cta) {
      cta.addEventListener('click', () => {

        console.log('Safe space CTA clicked');
      });
    }
  }

  // ========== WHY US SECTION ========== //
  initWhyUs() {
    const section = document.querySelector('#why-us');
    if (!section) return;


    if (!section.querySelector('.why-us__container')) {
      section.innerHTML = `
        <div class="why-us__container">
          <div class="why-us__header">
            <h2 class="why-us__headline">Why Choose Cubble</h2>
            <p class="why-us__subtitle">
              Cubble isn't just another dating app. We focus on authenticity, emotional safety,
              and meaningful connections through thoughtfully designed group experiences.
            </p>
          </div>
          <div class="why-us__grid">
            <div class="why-us__feature">
              <div class="why-us__icon">
                <div class="why-us__icon-inner"></div>
              </div>
              <h3 class="why-us__feature-title">Authentic Connections</h3>
              <p class="why-us__feature-description">
                Meet people in natural group settings that encourage genuine interactions and reduce pressure.
              </p>
            </div>
            <div class="why-us__feature">
              <div class="why-us__icon">
                <div class="why-us__icon-inner"></div>
              </div>
              <h3 class="why-us__feature-title">Safety First</h3>
              <p class="why-us__feature-description">
                Every member is verified, and our AI moderates conversations to maintain a respectful environment.
              </p>
            </div>
            <div class="why-us__feature">
              <div class="why-us__icon">
                <div class="why-us__icon-inner"></div>
              </div>
              <h3 class="why-us__feature-title">Meaningful Matches</h3>
              <p class="why-us__feature-description">
                Our algorithm focuses on shared interests and values, not just appearance, for lasting connections.
              </p>
            </div>
          </div>
        </div>
      `;
    }


    const features = section.querySelectorAll('.why-us__feature');
    features.forEach((feature, index) => {
      feature.addEventListener('mouseenter', () => {
        feature.style.transform = 'translateY(-6px)';
      });
      
      feature.addEventListener('mouseleave', () => {
        feature.style.transform = '';
      });
    });
  }

  // ========== INTERSECTION OBSERVER ========== //
  initIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
    
          this.animateChildren(entry.target);
          
         
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

   
    const sections = document.querySelectorAll('#stuff-container, #safe-space, #why-us');
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  animateChildren(section) {
    const children = section.querySelectorAll('.card, .safe-space__headline, .safe-space__subcopy, .safe-space__cta, .why-us__headline, .why-us__subtitle, .why-us__feature');
    
    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.add('animate-in');
      }, index * 100);
    });
  }

  // ========== UTILITY METHODS ========== //
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }


  goToSlide(index) {
    const container = document.querySelector('#stuff-container');
    if (!container || !container.sliderState) return;

    const state = container.sliderState;
    state.currentIndex = index + state.cards.length;
    this.updateSliderTransform(container, true);
  }

  nextSlide() {
    const container = document.querySelector('#stuff-container');
    if (container) {
      this.slideCard(container, 'next');
    }
  }

  prevSlide() {
    const container = document.querySelector('#stuff-container');
    if (container) {
      this.slideCard(container, 'prev');
    }
  }
}


const cardSwipeManager = new CardSwipeManager();


window.CardSwipeManager = CardSwipeManager;
window.cardSwipeManager = cardSwipeManager;
