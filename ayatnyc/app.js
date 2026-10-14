(() => {
  const root = document.documentElement;
  root.classList.add('has-js');

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setMenu = (isOpen, returnFocus = false) => {
    if (!header || !menuButton) return;
    header.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    if (returnFocus) menuButton.focus();
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenu(false, true);
      }
    });

    document.addEventListener('pointerdown', (event) => {
      if (menuButton.getAttribute('aria-expanded') !== 'true') return;
      if (!header.contains(event.target)) setMenu(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && menuButton.getAttribute('aria-expanded') === 'true') setMenu(false);
    }, { passive: true });
  }

  const revealItems = document.querySelectorAll('[data-reveal]');
  if (revealItems.length) {
    if ('IntersectionObserver' in window && !reduceMotion.matches) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }
  }

  const hero = document.querySelector('.hero');
  const food = document.querySelector('[data-scroll-food]');
  if (!hero || !food || reduceMotion.matches) return;

  let frameRequested = false;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const updateFoodPose = () => {
    const bounds = hero.getBoundingClientRect();
    const progress = clamp((-bounds.top) / Math.max(bounds.height * 0.82, 1), 0, 1);
    const isCompact = window.innerWidth <= 860;
    const rotateX = (isCompact ? 6 : 10) - progress * (isCompact ? 12 : 19);
    const rotateY = (isCompact ? -7 : -12) + progress * (isCompact ? 15 : 27);
    const rotateZ = -4 + progress * 9;
    const shiftY = 9 - progress * (isCompact ? 18 : 28);
    const scale = .985 + progress * .035;

    food.style.setProperty('--food-rotate-x', `${rotateX.toFixed(2)}deg`);
    food.style.setProperty('--food-rotate-y', `${rotateY.toFixed(2)}deg`);
    food.style.setProperty('--food-rotate-z', `${rotateZ.toFixed(2)}deg`);
    food.style.setProperty('--food-y', `${shiftY.toFixed(1)}px`);
    food.style.setProperty('--food-x', `${(Math.sin(progress * Math.PI) * (isCompact ? 5 : 11)).toFixed(1)}px`);
    food.style.setProperty('--food-scale', scale.toFixed(3));
    frameRequested = false;
  };

  const requestPoseUpdate = () => {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(updateFoodPose);
  };

  window.addEventListener('scroll', requestPoseUpdate, { passive: true });
  window.addEventListener('resize', requestPoseUpdate, { passive: true });
  updateFoodPose();

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const stage = document.querySelector('[data-food-stage]');
  if (stage && finePointer.matches) {
    stage.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      food.style.setProperty('--pointer-rotate-y', `${(x * 5).toFixed(2)}deg`);
      food.style.setProperty('--pointer-rotate-x', `${(-y * 4).toFixed(2)}deg`);
    });
    stage.addEventListener('pointerleave', () => {
      food.style.setProperty('--pointer-rotate-y', '0deg');
      food.style.setProperty('--pointer-rotate-x', '0deg');
    });
  }
})();
