(() => {
  const root = document.documentElement;
  root.classList.add('js-motion');

  const ORDER_URL = 'https://order.chownow.com/order/33202/locations/49635?add_cn_ordering_class=true';

  // Mobile navigation
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    const menuWord = menuToggle.querySelector('.menu-toggle-word');
    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      if (menuWord) menuWord.textContent = 'Menu';
      mobileMenu.hidden = true;
    };
    menuToggle.addEventListener('click', () => {
      const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(willOpen));
      menuToggle.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
      if (menuWord) menuWord.textContent = willOpen ? 'Close' : 'Menu';
      mobileMenu.hidden = !willOpen;
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 800) closeMenu();
    }, { passive: true });
  }

  // Filter the featured online-menu picks.
  const filterButtons = [...document.querySelectorAll('[data-menu-filter]')];
  const menuCards = [...document.querySelectorAll('.menu-card[data-category]')];
  const menuStatus = document.getElementById('menu-status');
  let currentFilter = 'sandwiches';
  function setMenuFilter(category) {
    currentFilter = category;
    let shown = 0;
    filterButtons.forEach((button) => {
      const isActive = button.dataset.menuFilter === category;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    menuCards.forEach((card) => {
      const visible = card.dataset.category === category;
      card.hidden = !visible;
      card.classList.remove('is-highlighted');
      if (visible) shown += 1;
    });
    if (menuStatus) {
      menuStatus.textContent = category === 'sandwiches'
        ? `Showing ${shown} sandwich highlights.`
        : `Showing ${shown} comfort-food highlights.`;
    }
  }
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => setMenuFilter(button.dataset.menuFilter));
  });
  setMenuFilter(currentFilter);

  // A tiny, no-pressure menu picker.
  const surpriseButton = document.getElementById('surprise-me');
  if (surpriseButton) {
    surpriseButton.addEventListener('click', () => {
      const choices = menuCards.filter((card) => card.dataset.category === currentFilter);
      if (!choices.length) return;
      const pick = choices[Math.floor(Math.random() * choices.length)];
      setMenuFilter(currentFilter);
      pick.classList.add('is-highlighted');
      if (menuStatus) {
        menuStatus.textContent = `Wheelhouse pick: ${pick.dataset.name}. Order online when you’re ready.`;
      }
      window.setTimeout(() => pick.classList.remove('is-highlighted'), 2400);
    });
  }

  // The official site lists all-day opening hours in New York time. Keep the
  // status label tied to America/New_York, regardless of the viewer's device zone.
  function getNewYorkClock(date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return { weekday: values.weekday, hour: Number(values.hour), minute: Number(values.minute) };
  }
  function clockLabel(hour, minute = 0) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const twelveHour = hour % 12 || 12;
    return minute ? `${twelveHour}:${String(minute).padStart(2, '0')} ${period}` : `${twelveHour} ${period}`;
  }
  function updateBusinessStatus() {
    const status = document.getElementById('open-status');
    const happyHour = document.getElementById('happy-hour-live');
    if (!status) return;
    const { weekday, hour, minute } = getNewYorkClock();
    const now = hour * 60 + minute;
    const openAt = 11 * 60 + 30;
    const closeHour = (weekday === 'Fri' || weekday === 'Sat') ? 23 : 22;
    const closeAt = closeHour * 60;
    const openNow = now >= openAt && now < closeAt;
    const label = openNow
      ? `OPEN NOW · UNTIL ${clockLabel(closeHour)}`
      : now < openAt
        ? 'CLOSED NOW · OPENS TODAY AT 11:30 AM'
        : 'CLOSED NOW · OPENS TOMORROW AT 11:30 AM';
    status.querySelector('span').textContent = label;
    status.classList.toggle('is-closed', !openNow);
    if (happyHour) {
      const inHappyHour = now >= 15 * 60 && now < 19 * 60;
      happyHour.textContent = inHappyHour ? 'HAPPENING NOW' : 'EVERY DAY';
      happyHour.classList.toggle('is-live', inHappyHour);
    }
  }
  updateBusinessStatus();
  window.setInterval(updateBusinessStatus, 60 * 1000);

  // Soft reveal as sections enter the viewport; content remains visible if the
  // browser does not support IntersectionObserver or asks for reduced motion.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('.menu-card, .story-photo, .story-copy, .promo-card, .visit-card');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealTargets.forEach((target) => {
      target.classList.add('reveal');
      observer.observe(target);
    });
  }

  // Keep menu links pointed at the verified live ordering location if the URL
  // is changed in one place later.
  document.querySelectorAll('a[href*="order.chownow.com"]').forEach((link) => {
    link.href = ORDER_URL;
  });
})();
