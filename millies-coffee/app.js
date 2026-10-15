(() => {
  document.documentElement.classList.add('has-js');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileQuery = window.matchMedia('(max-width: 900px)');

  // Persistent, accessible palette switcher. Each theme changes the whole site's CSS tokens.
  const paletteNames = { roast: 'ROAST', sage: 'SAGE', fig: 'FIG', caramel: 'CARAMEL' };
  const paletteButtons = [...document.querySelectorAll('[data-theme-choice]')];
  const paletteName = document.querySelector('#palette-name');
  const setPalette = (name, persist = true) => {
    if (!paletteNames[name]) return;
    document.documentElement.dataset.theme = name;
    paletteButtons.forEach((button) => {
      const active = button.dataset.themeChoice === name;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (paletteName) paletteName.textContent = paletteNames[name];
    if (persist) {
      try { window.localStorage.setItem('millies-coffee-theme', name); } catch (_) { /* Storage can be unavailable in private contexts. */ }
    }
  };
  let savedPalette = 'roast';
  try {
    const stored = window.localStorage.getItem('millies-coffee-theme');
    if (stored && paletteNames[stored]) savedPalette = stored;
  } catch (_) { /* Use the roast theme when storage is unavailable. */ }
  setPalette(savedPalette, false);
  paletteButtons.forEach((button) => button.addEventListener('click', () => setPalette(button.dataset.themeChoice)));

  // Compact nav closes on Escape, link activation, outside click, or desktop resize.
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const setMenuOpen = (open, returnFocus = false) => {
    if (!header || !menuButton) return;
    header.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (returnFocus) menuButton.focus();
  };
  if (header && menuButton && nav) {
    menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
    document.querySelector('.brand')?.addEventListener('click', () => setMenuOpen(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMenuOpen(false, true);
    });
    document.addEventListener('pointerdown', (event) => {
      if (menuButton.getAttribute('aria-expanded') === 'true' && !header.contains(event.target)) setMenuOpen(false);
    });
    mobileQuery.addEventListener?.('change', (event) => { if (!event.matches) setMenuOpen(false); });
  }

  // Motion reveals progressively, while every section stays visible without JS/IO support.
  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if (revealItems.length) {
    if ('IntersectionObserver' in window && !reducedMotion.matches) {
      const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        });
      }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });
      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }
  }

  // Build a 48-facet, tapered 3D cup and wrap the real drink photo across its front facets.
  // Unlike a billboard image, each narrow texture strip turns with the cup and foreshortens at the sides.
  const cupShell = document.querySelector('.cup-shell');
  const cupModel = document.querySelector('.cup-model');
  const cupWaveSegments = [];
  const cupRadius = 107;
  const cupFaceWidth = 14;
  if (cupShell && cupModel) {
    const faces = 48;
    const textureWidth = Math.PI * cupRadius;
    const textureHeight = 363;
    const textureTop = -73;
    const photoPath = cupModel.dataset.cupPhoto || 'assets/sage-seance-glass-curved.webp';
    const photoUrl = new URL(photoPath, document.baseURI).href;
    const photoFallback = 'linear-gradient(180deg,#eee9dc 0%,#d4ddc1 10%,#a8bf83 17%,#7b995f 25%,#627d4d 60%,#293724 78%,#171510 100%)';

    for (let index = 0; index < faces; index += 1) {
      const angle = index * (360 / faces);
      const signedAngle = angle > 180 ? angle - 360 : angle;
      const face = document.createElement('span');
      face.className = 'cup-face';
      face.setAttribute('aria-hidden', 'true');
      face.style.setProperty('--face-angle', `${angle}deg`);
      const towardLight = Math.max(0, Math.cos(angle * Math.PI / 180));
      face.style.setProperty('--face-brightness', (0.78 + towardLight * .26).toFixed(2));

      // The cutout is sampled in order around the front semicircle and painted onto
      // the polygon faces. The back half stays a shaded, drink-colored 3D surface.
      if (Math.abs(signedAngle) <= 90) {
        face.classList.add('cup-face--photo');
        const u = (signedAngle + 90) / 180;
        const imageX = -u * textureWidth + cupFaceWidth / 2;
        face.style.backgroundImage = `url(${JSON.stringify(photoUrl)}), ${photoFallback}`;
        face.style.backgroundSize = `${textureWidth.toFixed(2)}px ${textureHeight}px, 100% 100%`;
        face.style.backgroundPosition = `${imageX.toFixed(2)}px ${textureTop}px, 0 0`;
        face.style.backgroundRepeat = 'no-repeat, no-repeat';

        const wave = document.createElement('span');
        wave.className = 'cup-face-wave';
        wave.setAttribute('aria-hidden', 'true');
        wave.style.setProperty('--wave-delay', `${-(index % 8) * 110}ms`);
        face.appendChild(wave);
        cupWaveSegments.push({ element: wave, angle: signedAngle });
      }
      cupShell.appendChild(face);
    }
    cupModel.classList.add('has-css-facets', 'has-photo');
  }

  // Scroll rotates the 3D cup; fine-pointer movement pitches it; tap spins a full turn.
  const cupStage = document.querySelector('[data-cup-stage]');
  const cupButton = document.querySelector('.cup-interaction');
  const cupTurntable = document.querySelector('.cup-scroll-layer');
  const cupTilt = document.querySelector('.cup-tilt-layer');
  let cupRotationTarget = 0;
  let cupRotationCurrent = 0;
  let rotationFrame = 0;
  let previousScrollY = window.scrollY;
  let sloshTimer = 0;
  const setCupSlosh = (rollDegrees) => {
    const roll = Math.tan(rollDegrees * Math.PI / 180);
    cupWaveSegments.forEach(({ element, angle }) => {
      const horizontal = cupRadius * Math.sin(angle * Math.PI / 180);
      element.style.setProperty('--wave-shift', `${(-horizontal * roll).toFixed(2)}px`);
    });
  };
  const animateCupRotation = () => {
    if (!cupTurntable) { rotationFrame = 0; return; }
    cupRotationCurrent += (cupRotationTarget - cupRotationCurrent) * .16;
    if (Math.abs(cupRotationTarget - cupRotationCurrent) < .04) cupRotationCurrent = cupRotationTarget;
    cupTurntable.style.setProperty('--cup-scroll-angle', `${cupRotationCurrent.toFixed(2)}deg`);
    if (Math.abs(cupRotationTarget - cupRotationCurrent) > .04) {
      rotationFrame = window.requestAnimationFrame(animateCupRotation);
    } else {
      rotationFrame = 0;
    }
  };
  const requestCupScroll = () => {
    const scrollY = window.scrollY;
    const delta = scrollY - previousScrollY;
    previousScrollY = scrollY;
    cupRotationTarget = reducedMotion.matches ? 0 : scrollY * .09;
    if (cupWaveSegments.length && !reducedMotion.matches && Math.abs(delta) > 0) {
      const roll = Math.max(-8, Math.min(8, delta * .11));
      setCupSlosh(roll);
      window.clearTimeout(sloshTimer);
      sloshTimer = window.setTimeout(() => setCupSlosh(0), 220);
    } else if (cupWaveSegments.length && reducedMotion.matches) {
      setCupSlosh(0);
    }
    if (!rotationFrame) rotationFrame = window.requestAnimationFrame(animateCupRotation);
  };
  window.addEventListener('scroll', requestCupScroll, { passive: true });
  window.addEventListener('resize', requestCupScroll, { passive: true });
  requestCupScroll();

  if (cupButton && cupTilt && cupStage) {
    const cupHint = document.querySelector('.cup-interaction-hint');
    if (reducedMotion.matches) {
      cupButton.disabled = true;
      cupButton.setAttribute('aria-label', 'Sage Séance three-dimensional cup illustration; motion is reduced by your device settings');
      if (cupHint) cupHint.textContent = 'STATIC VIEW / REDUCED MOTION';
    }
    if (!reducedMotion.matches && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      cupStage.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse') return;
        const box = cupStage.getBoundingClientRect();
        const nx = (event.clientX - box.left) / box.width - .5;
        const ny = (event.clientY - box.top) / box.height - .5;
        cupTilt.style.setProperty('--cup-yaw', `${(nx * 12).toFixed(2)}deg`);
        cupTilt.style.setProperty('--cup-pitch', `${(-ny * 8).toFixed(2)}deg`);
      });
      cupStage.addEventListener('pointerleave', () => {
        cupTilt.style.setProperty('--cup-yaw', '0deg');
        cupTilt.style.setProperty('--cup-pitch', '0deg');
      });
    }
    let spinTimer = 0;
    cupButton.addEventListener('click', () => {
      if (reducedMotion.matches) return;
      cupButton.classList.remove('is-spinning');
      void cupButton.offsetWidth;
      cupButton.classList.add('is-spinning');
      window.clearTimeout(spinTimer);
      spinTimer = window.setTimeout(() => cupButton.classList.remove('is-spinning'), 1000);
    });
    cupButton.addEventListener('animationend', (event) => {
      if (event.animationName === 'cup-tap-spin') cupButton.classList.remove('is-spinning');
    });
  }

  // Live category filters for the drink deck.
  const filterButtons = [...document.querySelectorAll('.drink-filter')];
  const drinkCards = [...document.querySelectorAll('.drink-card')];
  const filterStatus = document.querySelector('#drink-filter-status');
  const filterDrinks = (filter) => {
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    drinkCards.forEach((card) => {
      const categories = (card.dataset.drinkCategory || '').split(/\s+/);
      const show = filter === 'all' || categories.includes(filter);
      card.hidden = !show;
      card.setAttribute('aria-hidden', String(!show));
      if (show) {
        visible += 1;
        card.classList.remove('is-filtering-out');
        if (!reducedMotion.matches) {
          card.animate?.([{ opacity: .55, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'cubic-bezier(.19,.74,.22,1)' });
        }
      }
    });
    if (filterStatus) filterStatus.textContent = `Showing ${visible} ${visible === 1 ? 'drink' : 'drinks'}.`;
  };
  filterButtons.forEach((button) => button.addEventListener('click', () => filterDrinks(button.dataset.filter || 'all')));

  // Points widget mirrors Toast's listed points-per-dollar and join bonus; not a redemption calculator.
  const spendSlider = document.querySelector('#spend-slider');
  const spendValue = document.querySelector('#spend-value');
  const pointsResult = document.querySelector('#points-result');
  const pointsFill = document.querySelector('#points-fill');
  if (spendSlider && spendValue && pointsResult && pointsFill) {
    const updatePoints = () => {
      const dollars = Number(spendSlider.value);
      const earned = dollars * 10;
      const total = earned + 50;
      spendValue.textContent = `$${dollars}`;
      pointsResult.textContent = `$${dollars} spend = ${earned} points, plus 50 signup points.`;
      pointsFill.style.width = `${Math.min(100, total / 350 * 100)}%`;
      spendSlider.setAttribute('aria-valuetext', `$${dollars} example spend, ${total} points including signup bonus`);
    };
    spendSlider.addEventListener('input', updatePoints);
    spendSlider.addEventListener('change', updatePoints);
    updatePoints();
  }

  // Interactive flavor finder, also opened by the drink cards' “Pick this mood” buttons.
  const moodDetails = {
    sage: { title: 'Sage Séance', description: 'A seasonal matcha with fig, sage, and vanilla cold foam.' },
    purple: { title: 'Purple Crown Latte', description: 'An espresso-and-ube direction, with cheesecake cold foam noted in local coverage.' },
    bright: { title: 'Manila Mist Espresso Tonic', description: 'A bright-sounding espresso tonic from Millie’s signature-drink list.' },
    matcha: { title: 'Strawberry Fields Matcha Latte', description: 'A fruity matcha option on Millie’s Toast menu.' },
    cozy: { title: 'Rice & Shine Oat Latte', description: 'A signature oat latte listed on Millie’s Toast menu.' }
  };
  const moodButtons = [...document.querySelectorAll('.mood-button')];
  const moodResult = document.querySelector('#mood-result');
  const moodDescription = document.querySelector('#mood-description');
  let moodTimer = 0;
  const setMood = (mood, scrollToFinder = false) => {
    const detail = moodDetails[mood];
    if (!detail) return;
    moodButtons.forEach((button) => {
      const active = button.dataset.mood === mood;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (moodResult) {
      moodResult.classList.add('is-changing');
      window.clearTimeout(moodTimer);
      moodTimer = window.setTimeout(() => {
        moodResult.textContent = detail.title;
        if (moodDescription) moodDescription.textContent = detail.description;
        moodResult.classList.remove('is-changing');
      }, reducedMotion.matches ? 0 : 100);
    }
    if (scrollToFinder) document.querySelector('#finder')?.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
  };
  moodButtons.forEach((button) => button.addEventListener('click', () => setMood(button.dataset.mood)));
  document.querySelectorAll('[data-pick]').forEach((button) => button.addEventListener('click', () => setMood(button.dataset.pick, true)));
})();
