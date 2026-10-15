(() => {
  document.documentElement.classList.add('has-js');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileQuery = window.matchMedia('(max-width: 850px)');

  // Compact navigation: Escape and outside click both return focus predictably.
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
    menuButton.addEventListener('click', () => {
      setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
    document.querySelector('.brand')?.addEventListener('click', () => setMenuOpen(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false, true);
      }
    });
    document.addEventListener('pointerdown', (event) => {
      if (menuButton.getAttribute('aria-expanded') === 'true' && !header.contains(event.target)) setMenuOpen(false);
    });
    mobileQuery.addEventListener?.('change', (event) => {
      if (!event.matches) setMenuOpen(false);
    });
  }

  // In-view entrances are subtle and always disabled for reduced-motion preferences.
  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if (revealItems.length) {
    if ('IntersectionObserver' in window && !reducedMotion.matches) {
      const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }
  }

  // Brand-menu highlights. The Queens order page remains the source for local availability.
  const menuHighlights = {
    crepes: {
      kicker: 'CREPE · SIGNATURE',
      title: 'Yummy Dips Special',
      description: 'Milk chocolate, strawberries, blueberries, bananas, white-chocolate drizzle, and vanilla ice cream.',
      image: 'assets/steinway-dessert-spread.webp',
      alt: 'An overhead spread of loaded dessert plates from Yummy Dips II.',
      caption: 'YUMMY DIPS II · OFFICIAL PHOTO',
      stamp: 'MENU\nHIGHLIGHT'
    },
    waffles: {
      kicker: 'WAFFLE · FRUITY',
      title: 'Fruity Pebbles Waffle',
      description: 'White chocolate, Fruity Pebbles, and strawberries. Confirm current Astoria availability on the live order page.',
      image: 'assets/steinway-dessert-spread.webp',
      alt: 'An overhead spread of loaded dessert plates from Yummy Dips II.',
      caption: 'YUMMY DIPS II · OFFICIAL PHOTO',
      stamp: 'MENU\nHIGHLIGHT'
    },
    dips: {
      kicker: 'YUMMY ICE CREAM DIP · DUBAI',
      title: 'Dubai Ice Cream Dip',
      description: 'A dipped mini waffle with milk chocolate, a strawberry ice cream bar, pistachio sauce, crushed pistachios, kunafa, fresh strawberries, and two scoops of ice cream.',
      image: 'assets/cup-in-cup-feature.webp',
      alt: 'A Yummy Dips cup-in-cup drink photographed against the brand’s pink backdrop.',
      caption: 'YUMMY DIPS · BRAND PHOTO',
      stamp: 'MENU\nHIGHLIGHT'
    },
    cheesecake: {
      kicker: 'CHEESECAKE · DUBAI',
      title: 'Dubai Cheesecake Dip',
      description: 'Brooklyn-style cheesecake topped with milk chocolate, pistachio sauce, crushed pistachios, and kunafa.',
      image: 'assets/cheesecake-trio.webp',
      alt: 'Three slices of Yummy Dips cheesecake with colorful, pistachio, and chocolate toppings.',
      caption: 'YUMMY DIPS · BRAND PHOTO',
      stamp: 'MENU\nHIGHLIGHT'
    },
    refreshers: {
      kicker: 'SIGNATURE DRINK · CUP-IN-CUP',
      title: 'Cup-in-cup Refreshers',
      description: 'A signature Yummy Dips drink style. Use the live Astoria order page to check current flavors and availability.',
      image: 'assets/cup-in-cup-lineup.webp',
      alt: 'Yummy Dips cup-in-cup drinks and desserts arranged against a bright pink background.',
      caption: 'YUMMY DIPS · BRAND PHOTO',
      stamp: 'MENU\nHIGHLIGHT'
    }
  };

  const tabs = [...document.querySelectorAll('.menu-tab[role="tab"]')];
  const tablist = document.querySelector('.menu-tabs[role="tablist"]');
  const panel = document.querySelector('#menu-panel');
  const panelImage = document.querySelector('#menu-image');
  const panelCaption = document.querySelector('#menu-image-caption');
  const panelStamp = document.querySelector('.menu-panel__photo-stamp');
  const panelKicker = document.querySelector('#menu-item-kicker');
  const panelTitle = document.querySelector('#menu-item-title');
  const panelDescription = document.querySelector('#menu-item-description');
  let imageSwapTimer = 0;
  let imageSwapToken = 0;

  const updateTabOrientation = () => {
    if (tablist) tablist.setAttribute('aria-orientation', mobileQuery.matches ? 'horizontal' : 'vertical');
  };
  updateTabOrientation();
  mobileQuery.addEventListener?.('change', updateTabOrientation);

  const activateTab = (activeTab, moveFocus = false) => {
    if (!activeTab || !tabs.length) return;
    const requestToken = ++imageSwapToken;
    tabs.forEach((tab) => {
      const active = tab === activeTab;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    if (moveFocus) activeTab.focus();

    const item = menuHighlights[activeTab.dataset.category];
    if (!item || !panel) return;
    panel.setAttribute('aria-labelledby', activeTab.id);
    panel.classList.add('is-switching');
    window.clearTimeout(imageSwapTimer);

    if (panelKicker) panelKicker.textContent = item.kicker;
    if (panelTitle) panelTitle.textContent = item.title;
    if (panelDescription) panelDescription.textContent = item.description;
    if (panelCaption) {
      const label = panelCaption.querySelector('span:first-child');
      if (label) label.textContent = item.caption;
    }
    if (panelStamp) panelStamp.textContent = item.stamp;

    if (!panelImage) {
      panel.classList.remove('is-switching');
      return;
    }
    panelImage.classList.add('is-changing');
    const targetPath = new URL(item.image, window.location.href).pathname;
    const currentPath = new URL(panelImage.src, window.location.href).pathname;
    if (targetPath === currentPath) {
      panelImage.alt = item.alt;
      panelImage.classList.remove('is-changing');
      panel.classList.remove('is-switching');
      return;
    }

    const setImage = () => {
      if (requestToken !== imageSwapToken) return;
      panelImage.alt = item.alt;
      const finish = () => {
        if (requestToken !== imageSwapToken) return;
        panelImage.classList.remove('is-changing');
        panel.classList.remove('is-switching');
      };
      panelImage.addEventListener('load', finish, { once: true });
      panelImage.addEventListener('error', finish, { once: true });
      panelImage.src = item.image;
      if (panelImage.complete && panelImage.naturalWidth > 0) window.requestAnimationFrame(finish);
    };
    if (reducedMotion.matches) setImage();
    else imageSwapTimer = window.setTimeout(setImage, 85);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      const horizontal = tablist?.getAttribute('aria-orientation') === 'horizontal';
      let nextIndex = index;
      if (event.key === (horizontal ? 'ArrowRight' : 'ArrowDown')) nextIndex = (index + 1) % tabs.length;
      else if (event.key === (horizontal ? 'ArrowLeft' : 'ArrowUp')) nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;
      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });

  // Photo-strip arrows supplement native touch/trackpad scrolling.
  const photoTrack = document.querySelector('#photo-track');
  const prevPhoto = document.querySelector('[data-photo-prev]');
  const nextPhoto = document.querySelector('[data-photo-next]');
  const updatePhotoControls = () => {
    if (!photoTrack) return;
    const max = photoTrack.scrollWidth - photoTrack.clientWidth;
    const atStart = photoTrack.scrollLeft <= 2;
    const atEnd = photoTrack.scrollLeft >= max - 2;
    if (prevPhoto) {
      prevPhoto.disabled = atStart;
      prevPhoto.setAttribute('aria-disabled', String(atStart));
    }
    if (nextPhoto) {
      nextPhoto.disabled = atEnd;
      nextPhoto.setAttribute('aria-disabled', String(atEnd));
    }
  };
  const movePhotos = (direction) => {
    if (!photoTrack) return;
    const amount = Math.max(260, photoTrack.clientWidth * .72) * direction;
    photoTrack.scrollBy({ left: amount, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  };
  prevPhoto?.addEventListener('click', () => movePhotos(-1));
  nextPhoto?.addEventListener('click', () => movePhotos(1));
  if (photoTrack) {
    photoTrack.addEventListener('scroll', updatePhotoControls, { passive: true });
    window.addEventListener('resize', updatePhotoControls, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(updatePhotoControls).observe(photoTrack);
    updatePhotoControls();
  }

  // Scroll-linked poster drift + mouse parallax give the lead photo a tactile response.
  const stage = document.querySelector('[data-scroll-stage]');
  const photoCard = document.querySelector('[data-scroll-card]');
  if (!stage || !photoCard || reducedMotion.matches) return;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  let scrollPose = { x: 0, y: 0, rotate: 2, yaw: 0 };
  let pointerPose = { yaw: 0, pitch: 0 };
  let posePending = false;
  const renderPose = () => {
    photoCard.style.setProperty('--poster-x', `${scrollPose.x.toFixed(2)}px`);
    photoCard.style.setProperty('--poster-y', `${scrollPose.y.toFixed(2)}px`);
    photoCard.style.setProperty('--poster-rotate', `${scrollPose.rotate.toFixed(2)}deg`);
    photoCard.style.setProperty('--poster-yaw', `${(scrollPose.yaw + pointerPose.yaw).toFixed(2)}deg`);
    photoCard.style.setProperty('--poster-pitch', `${pointerPose.pitch.toFixed(2)}deg`);
  };
  const updateScrollPose = () => {
    const box = stage.getBoundingClientRect();
    const progress = clamp((window.innerHeight - box.top) / Math.max(window.innerHeight + box.height, 1), 0, 1);
    const centered = clamp((progress - .42) / .58, 0, 1);
    const compact = mobileQuery.matches;
    scrollPose = {
      x: Math.sin(progress * Math.PI) * (compact ? 2 : 4),
      y: -centered * (compact ? 7 : 12),
      rotate: 2 - centered * 2.2,
      yaw: -1 + centered * 2
    };
    renderPose();
    posePending = false;
  };
  const requestScrollPose = () => {
    if (posePending) return;
    posePending = true;
    window.requestAnimationFrame(updateScrollPose);
  };
  window.addEventListener('scroll', requestScrollPose, { passive: true });
  window.addEventListener('resize', requestScrollPose, { passive: true });
  updateScrollPose();

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    stage.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const box = stage.getBoundingClientRect();
      const normalizedX = (event.clientX - box.left) / box.width - .5;
      const normalizedY = (event.clientY - box.top) / box.height - .5;
      pointerPose = { yaw: normalizedX * 5, pitch: -normalizedY * 3.5 };
      renderPose();
    });
    stage.addEventListener('pointerleave', () => {
      pointerPose = { yaw: 0, pitch: 0 };
      renderPose();
    });
  }
})();
