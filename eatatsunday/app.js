(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const menuCards = [...document.querySelectorAll('.menu-card')];
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const menuStatus = document.getElementById('menu-status');
  const menuGrid = document.getElementById('menu-grid');
  const surpriseButton = document.getElementById('surprise-me');
  const categoryNames = {
    all: 'all menu highlights',
    bakes: 'bakery highlights',
    coffee: 'coffee and café highlights',
    savory: 'savory highlights'
  };
  let activeFilter = 'all';
  let highlightTimer;

  if (!reducedMotion) root.classList.add('js-motion');

  function applyFilter(filter, announce = true) {
    activeFilter = categoryNames[filter] ? filter : 'all';

    filterButtons.forEach((button) => {
      const selected = button.dataset.filter === activeFilter;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });

    menuCards.forEach((card) => {
      const matches = activeFilter === 'all' || card.dataset.category === activeFilter;
      card.hidden = !matches;
      card.classList.remove('is-highlighted');
    });

    if (announce && menuStatus) {
      const visibleCount = menuCards.filter((card) => !card.hidden).length;
      menuStatus.textContent = `Showing ${visibleCount} ${categoryNames[activeFilter]}. These are menu highlights, not a live availability list.`;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter));
  });

  surpriseButton?.addEventListener('click', () => {
    const visibleCards = menuCards.filter((card) => !card.hidden);
    if (!visibleCards.length) return;

    const pick = visibleCards[Math.floor(Math.random() * visibleCards.length)];
    menuCards.forEach((card) => card.classList.remove('is-highlighted'));
    pick.classList.add('is-highlighted');

    if (menuStatus) {
      menuStatus.textContent = `Your little pick: ${pick.dataset.name}. This is a menu highlight, not a guarantee it is available today.`;
    }
    window.clearTimeout(highlightTimer);
    highlightTimer = window.setTimeout(() => pick.classList.remove('is-highlighted'), 2300);
    pick.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  });

  // Keep the selected dock item in sync with the section under the reading line.
  const dockLinks = [...document.querySelectorAll('[data-dock-section]')];
  const dockSections = dockLinks
    .map((link) => document.getElementById(link.dataset.dockSection))
    .filter(Boolean);
  let scrollFrame = 0;

  function updateDock() {
    scrollFrame = 0;
    if (!dockSections.length) return;
    const readingLine = Math.min(190, Math.max(100, window.innerHeight * 0.29));
    let currentId = dockSections[0].id;

    for (const section of dockSections) {
      const bounds = section.getBoundingClientRect();
      if (bounds.top <= readingLine && bounds.bottom > readingLine) currentId = section.id;
    }

    // Keep the visit destination active at the very end of the page.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) {
      currentId = 'visit';
    }

    dockLinks.forEach((link) => {
      const selected = link.dataset.dockSection === currentId;
      link.classList.toggle('is-current', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function scheduleDockUpdate() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateDock);
  }
  window.addEventListener('scroll', scheduleDockUpdate, { passive: true });
  window.addEventListener('resize', scheduleDockUpdate, { passive: true });
  dockLinks.forEach((link) => link.addEventListener('click', () => window.setTimeout(updateDock, 220)));
  updateDock();

  // Reveal content as it enters the viewport, while keeping a no-JS/reduced-motion path visible.
  const revealTargets = document.querySelectorAll(
    '.section-topline, .menu-heading, .menu-card, .menu-note, .story-image, .story-copy, .visit-copy, .visit-photo-wrap'
  );
  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    if (element.classList.contains('menu-card')) {
      element.dataset.delay = String((index % 4) + 1);
    }
  });

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealTargets.forEach((element) => revealObserver.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }

  // A small, fine-pointer-only parallax on the hero photo. It is intentionally absent on touch.
  const hero = document.querySelector('.hero');
  const heroArt = document.querySelector('.hero-art');
  const finePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false;
  if (hero && heroArt && finePointer && !reducedMotion) {
    let pointerFrame = 0;
    hero.addEventListener('pointermove', (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        heroArt.style.setProperty('--art-x', `${(x * -7).toFixed(1)}px`);
        heroArt.style.setProperty('--art-y', `${(y * -7).toFixed(1)}px`);
      });
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      heroArt.style.setProperty('--art-x', '0px');
      heroArt.style.setProperty('--art-y', '0px');
    }, { passive: true });
  }
})();
