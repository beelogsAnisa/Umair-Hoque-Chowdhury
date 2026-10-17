(() => {
  'use strict';

  document.documentElement.classList.add('js');

  // Inventory is transcribed from Rent A Party NY's public service pages.
  // No current item rates were confirmed, so the concept never calculates prices.
  const products = [
    { id: 'table-fold-8', name: 'Folding plastic table · 8 ft', category: 'tables', categoryLabel: 'Tables', detail: 'Public page lists seating for about 10', image: 'assets/folding-table.webp', alt: 'White folding rental table shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'table-fold-6', name: 'Folding plastic table · 6 ft', category: 'tables', categoryLabel: 'Tables', detail: 'Public page lists seating for about 8', image: 'assets/folding-table.webp', alt: 'White folding rental table shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'table-fold-4', name: 'Folding plastic table · 4 ft', category: 'tables', categoryLabel: 'Tables', detail: 'Public page lists seating for about 6', image: 'assets/folding-table.webp', alt: 'White folding rental table shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'table-round-60', name: 'Round table · 60 in', category: 'tables', categoryLabel: 'Tables', detail: '60-inch diameter · 8–10 seats listed', image: 'assets/round-table.webp', alt: 'Round table options shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'table-round-48', name: 'Round table · 48 in', category: 'tables', categoryLabel: 'Tables', detail: '48-inch diameter · about 6 seats listed', image: 'assets/round-table.webp', alt: 'Round table options shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'table-cocktail', name: 'Cocktail table · 30 in', category: 'tables', categoryLabel: 'Tables', detail: '30-inch cocktail table listed', image: 'assets/cocktail-table.webp', alt: 'Cocktail table rental option shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'table-linens', name: 'Table linens & chair covers', category: 'tables', categoryLabel: 'Tables', detail: 'Covers listed in different colors, styles, materials, and sizes', image: 'assets/table-linens.webp', alt: 'Table linen setup shown on Rent A Party NY’s site', fit: 'contain' },

    { id: 'chair-folding', name: 'Folding plastic chair', category: 'chairs', categoryLabel: 'Chairs', detail: 'Folding chair rental listed', image: 'assets/folding-chair.webp', alt: 'White folding chair rental option shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'chair-cushion', name: 'Cushioned chair', category: 'chairs', categoryLabel: 'Chairs', detail: 'Cushioned chair rental listed', image: 'assets/cushion-chair.webp', alt: 'Black cushioned chair shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'chair-kids', name: 'Kids chair', category: 'chairs', categoryLabel: 'Chairs', detail: 'Kids’ chair rental listed · confirm current style', image: 'assets/folding-chair.webp', alt: 'Folding chair rental option shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'chair-chiavari', name: 'Chiavari-style chair', category: 'chairs', categoryLabel: 'Chairs', detail: 'Listed online with the spelling “Chivary”', image: 'assets/chiavari-chair.webp', alt: 'Chiavari-style chair rental option shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'chair-baby-shower', name: 'Baby-shower chair', category: 'chairs', categoryLabel: 'Chairs', detail: 'Decorative chair option listed', image: 'assets/baby-shower-chair.webp', alt: 'Decorative baby-shower chair shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'chair-sleeves', name: 'Chair sleeves', category: 'chairs', categoryLabel: 'Chairs', detail: 'Chair sleeves listed · ask about available colors', image: 'assets/chair-sleeves.webp', alt: 'Chair sleeves shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'chair-sashes', name: 'Chair sashes', category: 'chairs', categoryLabel: 'Chairs', detail: 'Chair sashes listed · ask about available colors', image: '', symbol: '✳', alt: '', fit: 'contain' },

    { id: 'tent-frame', name: 'Frame tent', category: 'tents', categoryLabel: 'Tents', detail: 'Commercial tent rental · different sizes; confirm structure and options', image: 'assets/tent-setup.webp', alt: 'White frame-style event tent shown on Rent A Party NY’s site', fit: 'cover' },
    { id: 'tent-pole', name: 'Pole tent', category: 'tents', categoryLabel: 'Tents', detail: 'Pole tent rental listed · sizes and options to confirm', image: 'assets/garden-party.webp', alt: 'Canopy tent at an outdoor event shown on Rent A Party NY’s site', fit: 'cover' },

    { id: 'inflatable-bounce', name: 'Castle / bounce house', category: 'inflatables', categoryLabel: 'Bouncers & slides', detail: 'Inflatable bouncers listed · confirm current options', image: 'assets/castle-bouncer.webp', alt: 'Colorful inflatable castle bouncer shown on Rent A Party NY’s site', fit: 'cover' },
    { id: 'inflatable-water-slide', name: 'Water slide', category: 'inflatables', categoryLabel: 'Bouncers & slides', detail: 'One public listing shows a 6 × 6 ft pool and 12 × 25 × 15 ft overall size; confirm model', image: 'assets/water-slide.webp', alt: 'Inflatable water slide shown on Rent A Party NY’s site', fit: 'cover' },

    { id: 'concession-cotton-candy', name: 'Cotton-candy machine', category: 'concessions', categoryLabel: 'Treats', detail: 'Cotton-candy machine rental listed', image: 'assets/cotton-candy.webp', alt: 'Cotton-candy machine shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'concession-popcorn', name: 'Popcorn machine', category: 'concessions', categoryLabel: 'Treats', detail: 'Popcorn machine rental listed', image: 'assets/popcorn.webp', alt: 'Popcorn machine shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'concession-ice', name: 'Crushed-ice / snow-cone machine', category: 'concessions', categoryLabel: 'Treats', detail: 'Crushed-ice machine listed · often used for snow cones', image: 'assets/snow-cone.webp', alt: 'Crushed-ice and snow-cone machine shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'concession-fountain', name: 'Chocolate fountain', category: 'concessions', categoryLabel: 'Treats', detail: 'Listed on the services page · confirm current options', image: '', symbol: '✳', alt: '', fit: 'contain' },

    { id: 'generator-2000', name: 'Generator · 2,000 W', category: 'extras', categoryLabel: 'Extra services', detail: '2,000-watt generator listed', image: 'assets/generators.webp', alt: 'Generator rental options shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'generator-4000', name: 'Generator · 4,000 W', category: 'extras', categoryLabel: 'Extra services', detail: '4,000-watt generator listed', image: 'assets/generators.webp', alt: 'Generator rental options shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'generator-7000', name: 'Generator · 7,000 W', category: 'extras', categoryLabel: 'Extra services', detail: '7,000-watt generator listed', image: 'assets/generators.webp', alt: 'Generator rental options shown on Rent A Party NY’s site', fit: 'contain' },
    { id: 'extra-steamer-trays', name: 'Steamer trays', category: 'extras', categoryLabel: 'Extra services', detail: 'Steam trays listed · confirm current style and quantity', image: 'assets/steamer-trays.webp', alt: 'Steamer trays arranged for service, shown on Rent A Party NY’s site', fit: 'cover' },
    { id: 'service-tent-repair', name: 'Tent repair service', category: 'extras', categoryLabel: 'Extra services', detail: 'Tent repairs listed as a service', image: 'assets/tent-main.webp', alt: 'Event tent shown on Rent A Party NY’s site', fit: 'cover' },
    { id: 'service-bouncer-repair', name: 'Bouncer repair service', category: 'extras', categoryLabel: 'Extra services', detail: 'Bouncer repairs listed as a service', image: 'assets/castle-bouncer.webp', alt: 'Inflatable bouncer shown on Rent A Party NY’s site', fit: 'cover' }
  ];

  const categoryNames = {
    all: 'all rentals',
    tables: 'tables',
    chairs: 'chairs',
    tents: 'tents',
    inflatables: 'bouncers and slides',
    concessions: 'treats',
    extras: 'extra services'
  };
  const inventory = document.getElementById('product-grid');
  const inventoryStatus = document.getElementById('inventory-status');
  const searchInput = document.getElementById('inventory-search');
  const quoteDialog = document.getElementById('quote-dialog');
  const quoteItems = document.getElementById('quote-items');
  const quoteEmpty = document.getElementById('quote-empty');
  const quoteDock = document.getElementById('quote-dock');
  const formStatus = document.getElementById('form-status');
  const toast = document.getElementById('toast');
  const STORAGE_KEY = 'rent-a-party-ny-quote-v1';
  let activeFilter = 'all';
  let activeOccasion = null;
  let toastTimer;
  let heroIndex = 0;
  let heroTimer;
  let heroPausedByUser = false;
  let lightboxIndex = 0;
  const heroSlides = Array.from(document.querySelectorAll('[data-hero-slide]'));
  const heroDots = Array.from(document.querySelectorAll('[data-hero-go]'));
  const heroToggle = document.querySelector('[data-hero-toggle]');
  const lightboxButtons = Array.from(document.querySelectorAll('[data-lightbox]'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');

  function getProduct(id) { return products.find((product) => product.id === id); }
  function countItems() { return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0); }

  function readCart() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
      const valid = {};
      for (const [id, quantity] of Object.entries(parsed)) {
        if (products.some((product) => product.id === id) && Number.isInteger(quantity) && quantity > 0 && quantity <= 999) valid[id] = quantity;
      }
      return valid;
    } catch (_) {
      return {};
    }
  }

  let cart = readCart();

  function saveCart() {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (_) { /* Local storage is optional. */ }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3000);
  }

  function renderProducts() {
    const query = (searchInput.value || '').trim().toLocaleLowerCase();
    const visible = products.filter((product) => {
      const categoryMatch = activeOccasion ? activeOccasion.includes(product.category) : activeFilter === 'all' || product.category === activeFilter;
      const text = `${product.name} ${product.detail} ${product.categoryLabel}`.toLocaleLowerCase();
      return categoryMatch && (!query || text.includes(query));
    });

    document.querySelectorAll('[data-filter]').forEach((button) => {
      const isActive = button.dataset.filter === activeFilter && !activeOccasion;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    document.querySelectorAll('[data-filter-count]').forEach((countNode) => {
      const filter = countNode.dataset.filterCount;
      const count = filter === 'all' ? products.length : products.filter((product) => product.category === filter).length;
      countNode.textContent = String(count);
    });

    if (!visible.length) {
      inventory.innerHTML = '<div class="no-results"><strong>No rentals found.</strong><p>Try another search or browse the full list.</p><button type="button" data-clear-search>Show all rentals</button></div>';
    } else {
      inventory.innerHTML = visible.map((product) => {
        const qty = cart[product.id] || 0;
        const media = product.image
          ? `<img class="${product.fit === 'cover' ? 'product-card__image--cover' : ''}" src="${product.image}" alt="${product.alt}" loading="lazy" decoding="async">`
          : `<div class="product-card__placeholder" aria-hidden="true"><span>${product.symbol || '✳'}</span><small>ASK ABOUT OPTIONS</small></div>`;
        const badge = qty ? `<span class="product-card__in-list" aria-label="${qty} in your quote list">${qty}</span>` : '';
        const buttonText = qty ? `Added · ${qty}` : 'Add to list';
        return `<article class="product-card" data-product-id="${product.id}">
          <div class="product-card__media">
            <span class="product-card__category">${product.categoryLabel}</span>
            ${badge}
            ${media}
          </div>
          <div class="product-card__body">
            <h3 class="product-card__name">${product.name}</h3>
            <p class="product-card__details">${product.detail}</p>
            <div class="product-card__footer">
              <div class="product-card__rate product-card__rate--call"><strong>Request a quote</strong><span>Confirm current rate</span></div>
              <button class="product-add${qty ? ' is-added' : ''}" type="button" data-add-to-quote="${product.id}" aria-label="Add ${product.name} to your quote list"><span aria-hidden="true">${qty ? '✓' : '+'}</span> ${buttonText}</button>
            </div>
          </div>
        </article>`;
      }).join('');
    }

    inventoryStatus.textContent = activeOccasion
      ? `Showing ${visible.length} suggested rental items. Clear the occasion filter to view all categories.`
      : `Showing ${visible.length} ${categoryNames[activeFilter] || 'rentals'}${query ? ` matching “${searchInput.value.trim()}”` : ''}.`;
  }

  function renderDock() {
    const count = countItems();
    quoteDock.hidden = count === 0;
    document.getElementById('quote-dock-count').textContent = `${count} item${count === 1 ? '' : 's'} in your list`;
    document.getElementById('quote-dock-total').textContent = count
      ? 'Request current pricing · no rates shown'
      : 'Add a few pieces to start';
  }

  function renderQuote() {
    const entries = Object.entries(cart).filter(([id, quantity]) => getProduct(id) && quantity > 0);
    quoteEmpty.hidden = entries.length > 0;
    quoteItems.hidden = entries.length === 0;
    quoteItems.innerHTML = entries.map(([id, quantity]) => {
      const product = getProduct(id);
      return `<div class="quote-line" data-quote-line="${id}">
        <div class="quote-line__name"><strong>${product.name}</strong><small>${quantity} × ${product.detail} · current price requested</small></div>
        <div class="quote-line__tools">
          <button type="button" class="qty-button" data-quote-action="decrease" data-quote-id="${id}" data-quote-control="decrease-${id}" aria-label="Remove one ${product.name}">−</button>
          <span class="quote-line__qty" aria-label="Quantity ${quantity}">${quantity}</span>
          <button type="button" class="qty-button" data-quote-action="increase" data-quote-id="${id}" data-quote-control="increase-${id}" aria-label="Add one ${product.name}">+</button>
          <span class="quote-line__price">Quote</span>
          <button type="button" class="quote-line__remove" data-quote-action="remove" data-quote-id="${id}" aria-label="Remove ${product.name} from your list">×</button>
        </div>
      </div>`;
    }).join('');

    document.getElementById('quote-subtotal').textContent = 'By request';
    document.getElementById('quote-price-note').textContent = entries.length === 0
      ? 'Add items to ask about. Rent A Party NY must confirm rates and availability.'
      : 'No prices are calculated in this concept. Ask the team to confirm current rates, availability, and any service details.';
    document.getElementById('clear-quote').disabled = entries.length === 0;
    renderDock();
  }

  function updateCardBadges() {
    document.querySelectorAll('.product-card[data-product-id]').forEach((card) => {
      const id = card.dataset.productId;
      const qty = cart[id] || 0;
      const badge = card.querySelector('.product-card__in-list');
      const button = card.querySelector('.product-add');
      if (qty && !badge) {
        const newBadge = document.createElement('span');
        newBadge.className = 'product-card__in-list';
        newBadge.setAttribute('aria-label', `${qty} in your quote list`);
        newBadge.textContent = String(qty);
        card.querySelector('.product-card__media').append(newBadge);
      } else if (!qty && badge) {
        badge.remove();
      } else if (qty && badge) {
        badge.textContent = String(qty);
        badge.setAttribute('aria-label', `${qty} in your quote list`);
      }
      if (button) {
        button.classList.toggle('is-added', qty > 0);
        button.innerHTML = `<span aria-hidden="true">${qty ? '✓' : '+'}</span> ${qty ? `Added · ${qty}` : 'Add to list'}`;
      }
    });
  }

  function updateAllQuoteViews() {
    saveCart();
    updateCardBadges();
    renderQuote();
  }

  function setQuantity(id, value) {
    if (!getProduct(id)) return;
    const next = Math.max(0, Math.min(999, value));
    if (next === 0) delete cart[id];
    else cart[id] = next;
    updateAllQuoteViews();
  }

  function openQuote() {
    renderQuote();
    if (!quoteDialog.open) quoteDialog.showModal();
  }

  function closeQuote() {
    if (quoteDialog.open) quoteDialog.close();
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  document.querySelectorAll('[data-open-quote]').forEach((button) => button.addEventListener('click', () => {
    primaryNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    openQuote();
  }));
  document.querySelectorAll('[data-close-quote]').forEach((button) => button.addEventListener('click', () => {
    const fromEmpty = button.closest('.quote-empty');
    closeQuote();
    if (fromEmpty) window.setTimeout(() => document.getElementById('inventory').scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }));
  quoteDialog.addEventListener('click', (event) => { if (event.target === quoteDialog) closeQuote(); });

  document.querySelector('.filter-list').addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    activeFilter = button.dataset.filter;
    activeOccasion = null;
    renderProducts();
  });
  searchInput.addEventListener('input', renderProducts);
  inventory.addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-add-to-quote]');
    if (addButton) {
      const id = addButton.dataset.addToQuote;
      setQuantity(id, (cart[id] || 0) + 1);
      showToast(`${getProduct(id).name} added to your list.`);
      return;
    }
    if (event.target.closest('[data-clear-search]')) {
      searchInput.value = '';
      activeFilter = 'all';
      activeOccasion = null;
      renderProducts();
      searchInput.focus();
    }
  });
  quoteItems.addEventListener('click', (event) => {
    const button = event.target.closest('[data-quote-action]');
    if (!button) return;
    const id = button.dataset.quoteId;
    const action = button.dataset.quoteAction;
    const previousQuantity = cart[id] || 0;
    if (action === 'increase') setQuantity(id, previousQuantity + 1);
    if (action === 'decrease') setQuantity(id, previousQuantity - 1);
    if (action === 'remove') setQuantity(id, 0);
    if (action !== 'remove' && cart[id]) {
      window.requestAnimationFrame(() => quoteItems.querySelector(`[data-quote-control="${action}-${id}"]`)?.focus());
    }
  });
  document.getElementById('clear-quote').addEventListener('click', () => {
    cart = {};
    updateAllQuoteViews();
    showToast('Your rental list has been cleared.');
  });

  const occasionCategory = {
    outdoors: ['tents', 'tables', 'chairs'],
    tables: ['tables', 'chairs'],
    inflatables: ['inflatables'],
    treats: ['concessions']
  };
  document.querySelectorAll('[data-occasion]').forEach((button) => button.addEventListener('click', () => {
    activeFilter = 'all';
    activeOccasion = occasionCategory[button.dataset.occasion] || null;
    searchInput.value = '';
    renderProducts();
    document.getElementById('inventory').scrollIntoView({ behavior: 'smooth', block: 'start' });
    const labels = { outdoors: 'Outdoor-event rentals', tables: 'Tables and chairs', inflatables: 'Bouncers and slides', treats: 'Treat machines' };
    showToast(`${labels[button.dataset.occasion] || 'Suggested'} selected—add any item to your list.`);
  }));

  function buildRequestText(formValues) {
    const lines = [];
    lines.push('RENT A PARTY NY — RENTAL QUOTE REQUEST');
    lines.push('');
    lines.push(`Name: ${formValues.name || 'Not provided'}`);
    if (formValues.email) lines.push(`Email: ${formValues.email}`);
    if (formValues.phone) lines.push(`Phone: ${formValues.phone}`);
    lines.push(`Event date: ${formValues.eventDate || 'Not provided'}`);
    if (formValues.eventType) lines.push(`Occasion: ${formValues.eventType}`);
    lines.push(`Event borough / venue: ${formValues.location || 'Not provided'}`);
    lines.push(`Please advise about: ${formValues.service || 'Equipment options and service details'}`);
    if (formValues.notes) lines.push(`Notes: ${formValues.notes}`);
    lines.push('');
    lines.push('ITEMS TO QUOTE');
    const entries = Object.entries(cart).filter(([id, quantity]) => getProduct(id) && quantity > 0);
    if (!entries.length) lines.push('No items selected yet — please advise on options.');
    entries.forEach(([id, quantity]) => {
      const product = getProduct(id);
      lines.push(`- ${quantity} × ${product.name} — ${product.detail}; please confirm current price and availability`);
    });
    lines.push('');
    lines.push('Please confirm current pricing, date availability, item options, service area, delivery/setup details, and booking terms. This message is an inquiry, not a reservation.');
    return lines.join('\n');
  }

  function getFormValues() {
    const form = document.getElementById('quote-form');
    const data = new FormData(form);
    return {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      eventDate: String(data.get('event-date') || '').trim(),
      eventType: String(data.get('event-type') || '').trim(),
      location: String(data.get('location') || '').trim(),
      service: String(data.get('service') || '').trim(),
      notes: String(data.get('notes') || '').trim()
    };
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
      const temp = document.createElement('textarea');
      temp.value = text;
      temp.setAttribute('readonly', '');
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      temp.style.pointerEvents = 'none';
      document.body.append(temp);
      temp.select();
      try {
        const ok = document.execCommand('copy');
        temp.remove();
        ok ? resolve() : reject(new Error('Copy failed'));
      } catch (error) {
        temp.remove();
        reject(error);
      }
    });
  }

  document.getElementById('quote-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    formStatus.classList.remove('is-error');
    const values = getFormValues();
    if (!values.email && !values.phone) {
      formStatus.textContent = 'Add an email address or phone number so Rent A Party NY can reach you.';
      formStatus.classList.add('is-error');
      form.querySelector('[name="email"]').focus();
      return;
    }
    const body = buildRequestText(values);
    const subject = values.eventDate ? `Rental quote request · ${values.eventDate}` : 'Party rental quote request';
    const mailto = `mailto:rentapartyny@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formStatus.textContent = 'Your email app should open with the request. If it does not, choose “Copy request”.';
    try { window.location.href = mailto; } catch (_) { /* The copy option remains available. */ }
  });

  document.getElementById('copy-quote').addEventListener('click', async () => {
    const values = getFormValues();
    const body = buildRequestText(values);
    try {
      await copyText(body);
      formStatus.textContent = 'Request copied. Paste it into an email to rentapartyny@gmail.com.';
      formStatus.classList.remove('is-error');
      showToast('Quote request copied to your clipboard.');
    } catch (_) {
      formStatus.textContent = 'Clipboard access was blocked. You can still use “Prepare email request”.';
      formStatus.classList.add('is-error');
    }
  });

  function localISODate() {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
  }
  document.querySelector('[name="event-date"]').min = localISODate();
  document.getElementById('current-year').textContent = String(new Date().getFullYear());

  // Responsive navigation
  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    primaryNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      primaryNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    }
  });

  // Hero carousel: manual controls, restrained autoplay, and swipe on touch screens.
  function setHero(index) {
    if (!heroSlides.length) return;
    heroIndex = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === heroIndex));
    heroDots.forEach((dot, i) => {
      const active = i === heroIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-pressed', String(active));
    });
    const count = document.querySelector('[data-hero-count]');
    if (count) count.textContent = String(heroIndex + 1).padStart(2, '0');
  }
  const hero = document.querySelector('[data-hero]');
  function scheduleHero() {
    window.clearInterval(heroTimer);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    heroToggle.hidden = reduced;
    heroToggle.setAttribute('aria-label', heroPausedByUser ? 'Resume automatic image rotation' : 'Pause automatic image rotation');
    heroToggle.querySelector('span').textContent = heroPausedByUser ? '▶' : 'Ⅱ';
    if (!reduced && !document.hidden && !heroPausedByUser && !hero.matches(':hover') && !hero.contains(document.activeElement)) {
      heroTimer = window.setInterval(() => setHero(heroIndex + 1), 7200);
    }
  }
  document.querySelector('[data-hero-prev]').addEventListener('click', () => { setHero(heroIndex - 1); scheduleHero(); });
  document.querySelector('[data-hero-next]').addEventListener('click', () => { setHero(heroIndex + 1); scheduleHero(); });
  heroDots.forEach((dot) => dot.addEventListener('click', () => { setHero(Number(dot.dataset.heroGo)); scheduleHero(); }));
  heroToggle.addEventListener('click', () => { heroPausedByUser = !heroPausedByUser; scheduleHero(); });
  hero.addEventListener('pointerenter', () => window.clearInterval(heroTimer));
  hero.addEventListener('pointerleave', scheduleHero);
  hero.addEventListener('focusin', () => window.clearInterval(heroTimer));
  hero.addEventListener('focusout', scheduleHero);
  document.addEventListener('visibilitychange', scheduleHero);
  let swipeStartX = 0;
  hero.addEventListener('touchstart', (event) => { swipeStartX = event.changedTouches[0].screenX; }, { passive: true });
  hero.addEventListener('touchend', (event) => {
    const delta = event.changedTouches[0].screenX - swipeStartX;
    if (Math.abs(delta) > 55) { setHero(heroIndex + (delta < 0 ? 1 : -1)); scheduleHero(); }
  }, { passive: true });
  scheduleHero();

  // Scrollable photo strip and accessible lightbox.
  const galleryTrack = document.getElementById('gallery-track');
  document.querySelector('[data-gallery-prev]').addEventListener('click', () => galleryTrack.scrollBy({ left: -galleryTrack.clientWidth * .72, behavior: 'smooth' }));
  document.querySelector('[data-gallery-next]').addEventListener('click', () => galleryTrack.scrollBy({ left: galleryTrack.clientWidth * .72, behavior: 'smooth' }));
  function showLightbox(index) {
    lightboxIndex = (index + lightboxButtons.length) % lightboxButtons.length;
    const button = lightboxButtons[lightboxIndex];
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.dataset.lightboxAlt || '';
    lightboxCaption.textContent = button.dataset.lightboxAlt || '';
    if (!lightbox.open) lightbox.showModal();
  }
  lightboxButtons.forEach((button, index) => button.addEventListener('click', () => showLightbox(index)));
  document.querySelector('[data-close-lightbox]').addEventListener('click', () => lightbox.close());
  document.querySelector('[data-lightbox-prev]').addEventListener('click', () => showLightbox(lightboxIndex - 1));
  document.querySelector('[data-lightbox-next]').addEventListener('click', () => showLightbox(lightboxIndex + 1));
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') showLightbox(lightboxIndex + 1);
    if (event.key === 'ArrowLeft') showLightbox(lightboxIndex - 1);
  });

  // Small reveal motion, disabled for visitors who request reduced motion.
  const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  renderProducts();
  updateAllQuoteViews();
})();
