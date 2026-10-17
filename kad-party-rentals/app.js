(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const products = [
    { id: 'table-round-48', name: '48-inch round table', category: 'tables', categoryLabel: 'Tables', detail: 'Round · 48-inch', price: 12, rateNote: 'rate shown online · confirm unit', image: 'assets/round-table.webp', alt: 'KAD-listed round rental table', fit: 'contain' },
    { id: 'table-round-60', name: '60-inch round table', category: 'tables', categoryLabel: 'Tables', detail: 'Round · 60-inch', price: 15, rateNote: 'shown as “15” online†', image: 'assets/round-table.webp', alt: 'KAD-listed round rental table', fit: 'contain' },
    { id: 'table-folding-6', name: '6-foot folding table', category: 'tables', categoryLabel: 'Tables', detail: 'Folding · 6-foot', price: 7, rateNote: 'rate shown online · confirm unit', image: 'assets/folding-table.webp', alt: 'White six-foot folding rental table', fit: 'contain' },
    { id: 'chair-folding', name: 'Folding chair', category: 'chairs', categoryLabel: 'Chairs', detail: 'Black or white, as listed', price: 2, rateNote: 'rate shown online · per chair', image: 'assets/folding-chairs.webp', alt: 'White folding chairs', fit: 'contain' },
    { id: 'chair-wooden', name: 'Wooden chair', category: 'chairs', categoryLabel: 'Chairs', detail: 'Black, as listed', price: 10, rateNote: 'rate shown online · confirm unit', image: 'assets/wooden-chair.webp', alt: 'Black wooden rental chair', fit: 'contain' },
    { id: 'shower-bench-plain', name: 'Shower bench · undecorated', category: 'chairs', categoryLabel: 'Chairs', detail: 'White', price: 80, rateNote: 'rate shown online · confirm unit', image: 'assets/gallery-furniture.webp', alt: 'White shower bench with pink bows pictured in KAD’s public gallery', fit: 'contain' },
    { id: 'shower-bench-decorated', name: 'Shower bench · decorated', category: 'chairs', categoryLabel: 'Chairs', detail: 'White · decorated option', price: 110, rateNote: 'rate shown online · confirm unit', image: 'assets/gallery-furniture.webp', alt: 'White shower bench with pink bows pictured in KAD’s public gallery', fit: 'contain' },
    { id: 'throne-chair', name: 'Throne chair', category: 'chairs', categoryLabel: 'Chairs', detail: 'White statement chair', price: 125, rateNote: 'rate shown online · confirm unit', image: 'assets/throne-chair.webp', alt: 'White throne chair', fit: 'contain' },
    { id: 'tent-10x10', name: '10 × 10 tent', category: 'tents', categoryLabel: 'Tents', detail: 'Canopy · 10 × 10 ft', price: 50, rateNote: 'rate shown online · confirm unit', image: 'assets/event-tent.webp', alt: 'Outdoor canopy tent with tables and chairs', fit: 'cover' },
    { id: 'tent-20x20', name: '20 × 20 tent', category: 'tents', categoryLabel: 'Tents', detail: 'Canopy · 20 × 20 ft', price: 300, rateNote: 'rate shown online · confirm unit', image: 'assets/event-tent.webp', alt: 'Outdoor canopy tent with tables and chairs', fit: 'cover' },
    { id: 'bounce-house', name: 'Bounce house', category: 'inflatables', categoryLabel: 'Inflatables', detail: 'Public page specifies a 4-hour rate', price: 200, rateNote: 'per 4 hours, as listed', image: 'assets/event-bounce.webp', alt: 'Children playing on a colorful inflatable', fit: 'cover' },
    { id: 'snow-cone-maker', name: 'Snow-cone maker', category: 'concessions', categoryLabel: 'Concessions', detail: '50 servings, as listed', price: 75, rateNote: 'rate shown online · 50 servings', image: 'assets/snow-cone.webp', alt: 'Snow-cone concession machine', fit: 'contain' },
    { id: 'cotton-candy-machine', name: 'Cotton-candy machine', category: 'concessions', categoryLabel: 'Concessions', detail: '50 servings, as listed', price: 75, rateNote: 'rate shown online · 50 servings', image: 'assets/cotton-candy.webp', alt: 'Pink cotton-candy machine', fit: 'contain' },
    { id: 'popcorn-machine', name: 'Popcorn machine', category: 'concessions', categoryLabel: 'Concessions', detail: '50 servings, as listed', price: 75, rateNote: 'rate shown online · 50 servings', image: 'assets/popcorn.webp', alt: 'Popcorn concession machine', fit: 'contain' },
    { id: 'frank-warmer', name: 'Frank warmer', category: 'concessions', categoryLabel: 'Concessions', detail: 'Food-service equipment', price: 40, rateNote: 'rate shown online · confirm unit', image: 'assets/frank-warmer.webp', alt: 'Frankfurter warmer', fit: 'contain' },
    { id: 'chair-covers', name: 'Chair covers', category: 'linen', categoryLabel: 'Linen', detail: 'Chair linen', price: 2, rateNote: 'rate shown online · confirm unit', image: 'assets/chair-covers.webp', alt: 'Chair covers available from KAD', fit: 'contain' },
    { id: 'tablecloths', name: 'Tablecloths', category: 'linen', categoryLabel: 'Linen', detail: 'Table linen', price: 5, rateNote: 'rate shown online · confirm unit', image: 'assets/tablecloths.webp', alt: 'Folded table linens', fit: 'contain' },
    { id: 'garment-rack', name: 'Garment rack', category: 'linen', categoryLabel: 'Linen', detail: 'Event coat / garment rack', price: 6, rateNote: 'rate shown online · confirm unit', image: 'assets/garment-rack.webp', alt: 'Garment rack', fit: 'contain' },
    { id: 'chafing-dish', name: 'Chafing dish', category: 'food', categoryLabel: 'Food service', detail: 'Food-service equipment', price: 10, rateNote: 'per dish, as listed', image: 'assets/chafing-dish.webp', alt: 'Stainless chafing dish', fit: 'contain' },
    { id: 'bbq-grill', name: 'BBQ grill', category: 'food', categoryLabel: 'Food service', detail: 'Grill', price: 60, rateNote: 'rate shown online · confirm unit', image: 'assets/bbq-grill.webp', alt: 'BBQ grill available from KAD', fit: 'contain' },
    { id: 'pa-system', name: 'PA system', category: 'entertainment', categoryLabel: 'Entertainment', detail: 'Sound equipment', price: 300, rateNote: 'rate shown online · confirm unit', image: 'assets/pa-system.webp', alt: 'PA system equipment', fit: 'contain' },
    { id: 'character-costumes', name: 'Character costumes', category: 'costumes', categoryLabel: 'Costumes', detail: 'Mickey, Minnie, Elmo, Mario, Spider-Man, Iron Man · ask about availability', price: null, rateNote: 'call for current price', image: 'assets/event-costume.webp', alt: 'Character costume appearance at a family event', fit: 'cover' }
  ];

  const categoryNames = {
    all: 'all rentals',
    tables: 'tables',
    chairs: 'chairs',
    tents: 'tents',
    inflatables: 'inflatables',
    concessions: 'concessions',
    linen: 'linen',
    food: 'food service',
    entertainment: 'entertainment',
    costumes: 'costumes'
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
  const rateFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const STORAGE_KEY = 'kad-party-rentals-quote-v1';
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

  function money(amount) { return rateFormatter.format(amount); }
  function getProduct(id) { return products.find((product) => product.id === id); }
  function countItems() { return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0); }
  function subtotal() {
    return Object.entries(cart).reduce((sum, [id, quantity]) => {
      const product = getProduct(id);
      return sum + (product && product.price !== null ? product.price * quantity : 0);
    }, 0);
  }
  function hasUnpricedItems() {
    return Object.keys(cart).some((id) => {
      const product = getProduct(id);
      return product && product.price === null;
    });
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
        const priceMarkup = product.price === null
          ? `<div class="product-card__rate product-card__rate--call"><strong>Ask KAD</strong><span>${product.rateNote}</span></div>`
          : `<div class="product-card__rate"><strong>${money(product.price)}*</strong><span>${product.rateNote}</span></div>`;
        const imgClass = product.fit === 'cover' ? 'product-card__image--cover' : '';
        const badge = qty ? `<span class="product-card__in-list" aria-label="${qty} in your quote list">${qty}</span>` : '';
        const buttonText = qty ? `Added · ${qty}` : 'Add to list';
        return `<article class="product-card" data-product-id="${product.id}">
          <div class="product-card__media">
            <span class="product-card__category">${product.categoryLabel}</span>
            ${badge}
            <img class="${imgClass}" src="${product.image}" alt="${product.alt}" loading="lazy" decoding="async">
          </div>
          <div class="product-card__body">
            <h3 class="product-card__name">${product.name}</h3>
            <p class="product-card__details">${product.detail}</p>
            <div class="product-card__footer">
              ${priceMarkup}
              <button class="product-add${qty ? ' is-added' : ''}" type="button" data-add-to-quote="${product.id}" aria-label="Add ${product.name} to your quote list"><span aria-hidden="true">${qty ? '✓' : '+'}</span> ${buttonText}</button>
            </div>
          </div>
        </article>`;
      }).join('');
    }

    if (activeOccasion) {
      inventoryStatus.textContent = `Showing ${visible.length} suggested rental items. Clear the occasion filter to view all categories.`;
    } else {
      inventoryStatus.textContent = `Showing ${visible.length} ${categoryNames[activeFilter] || 'rentals'}${query ? ` matching “${searchInput.value.trim()}”` : ''}.`;
    }
  }

  function renderDock() {
    const count = countItems();
    quoteDock.hidden = count === 0;
    document.getElementById('quote-dock-count').textContent = `${count} item${count === 1 ? '' : 's'} in your list`;
    const currentTotal = subtotal();
    document.getElementById('quote-dock-total').textContent = currentTotal > 0
      ? `Items-only estimate ${money(currentTotal)}${hasUnpricedItems() ? ' · plus items to price' : ' · confirm with KAD'}`
      : 'Some items require a current price check';
  }

  function renderQuote() {
    const entries = Object.entries(cart).filter(([id, quantity]) => getProduct(id) && quantity > 0);
    quoteEmpty.hidden = entries.length > 0;
    quoteItems.hidden = entries.length === 0;
    quoteItems.innerHTML = entries.map(([id, quantity]) => {
      const product = getProduct(id);
      const linePrice = product.price === null ? 'Ask KAD' : money(product.price * quantity);
      const unitLine = product.price === null ? product.rateNote : `${money(product.price)} · ${product.rateNote}`;
      return `<div class="quote-line" data-quote-line="${id}">
        <div class="quote-line__name"><strong>${product.name}</strong><small>${quantity} × ${unitLine}</small></div>
        <div class="quote-line__tools">
          <button type="button" class="qty-button" data-quote-action="decrease" data-quote-id="${id}" data-quote-control="decrease-${id}" aria-label="Remove one ${product.name}">−</button>
          <span class="quote-line__qty" aria-label="Quantity ${quantity}">${quantity}</span>
          <button type="button" class="qty-button" data-quote-action="increase" data-quote-id="${id}" data-quote-control="increase-${id}" aria-label="Add one ${product.name}">+</button>
          <span class="quote-line__price">${linePrice}</span>
          <button type="button" class="quote-line__remove" data-quote-action="remove" data-quote-id="${id}" aria-label="Remove ${product.name} from your list">×</button>
        </div>
      </div>`;
    }).join('');

    const currentTotal = subtotal();
    document.getElementById('quote-subtotal').textContent = currentTotal > 0 ? money(currentTotal) : '—';
    const note = document.getElementById('quote-price-note');
    note.textContent = entries.length === 0
      ? 'No delivery or setup included. KAD must confirm the current rate.'
      : `${hasUnpricedItems() ? 'Unpriced items are not included. ' : ''}Rates are public-site figures only; delivery, setup, tax, and other fees are excluded.`;
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

  document.querySelectorAll('[data-open-quote]').forEach((button) => button.addEventListener('click', openQuote));
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
    family: ['inflatables', 'concessions', 'costumes'],
    showers: ['chairs', 'tables', 'linen', 'costumes'],
    treats: ['concessions', 'food']
  };
  document.querySelectorAll('[data-occasion]').forEach((button) => button.addEventListener('click', () => {
    activeFilter = 'all';
    activeOccasion = occasionCategory[button.dataset.occasion] || null;
    searchInput.value = '';
    renderProducts();
    document.getElementById('inventory').scrollIntoView({ behavior: 'smooth', block: 'start' });
    const labels = { outdoors: 'Outdoor-event ideas', family: 'Family-party ideas', showers: 'Showers and milestones', treats: 'Food and treats' };
    showToast(`${labels[button.dataset.occasion] || 'Suggested'} selected—add any item you like.`);
  }));

  function buildRequestText(formValues) {
    const lines = [];
    lines.push('KAD PARTY RENTALS — QUOTE REQUEST');
    lines.push('');
    lines.push(`Name: ${formValues.name || 'Not provided'}`);
    if (formValues.email) lines.push(`Email: ${formValues.email}`);
    if (formValues.phone) lines.push(`Phone: ${formValues.phone}`);
    lines.push(`Event date: ${formValues.eventDate || 'Not provided'}`);
    if (formValues.eventType) lines.push(`Occasion: ${formValues.eventType}`);
    lines.push(`Event location: ${formValues.location || 'Not provided'}`);
    lines.push(`Delivery / pickup: ${formValues.delivery || 'Please discuss'}`);
    if (formValues.notes) lines.push(`Notes: ${formValues.notes}`);
    lines.push('');
    lines.push('ITEMS TO CHECK');
    const entries = Object.entries(cart).filter(([id, quantity]) => getProduct(id) && quantity > 0);
    if (!entries.length) lines.push('No items selected yet — please advise.');
    entries.forEach(([id, quantity]) => {
      const product = getProduct(id);
      const rate = product.price === null ? 'current rate requested' : `${money(product.price)} public-site rate × ${quantity}; ${product.rateNote}`;
      lines.push(`- ${quantity} × ${product.name} — ${rate}`);
    });
    if (subtotal() > 0) lines.push(`Items-only estimate from public-site rates: ${money(subtotal())}`);
    lines.push('');
    lines.push('Please confirm current pricing, date availability, rental period, delivery / setup options, and booking terms. This message is an inquiry, not a reservation.');
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
      delivery: String(data.get('delivery') || '').trim(),
      notes: String(data.get('notes') || '').trim()
    };
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
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
      formStatus.textContent = 'Please add an email address or phone number so KAD can reach you.';
      formStatus.classList.add('is-error');
      const input = form.querySelector('[name="email"]');
      input.focus();
      return;
    }
    const body = buildRequestText(values);
    const subject = values.eventDate ? `Rental request · ${values.eventDate}` : 'Party rental quote request';
    const mailto = `mailto:kadpartyrental@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formStatus.textContent = 'Your email app should open with the request. If it does not, choose “Copy request” below.';
    try { window.location.href = mailto; } catch (_) { /* The copy option remains available. */ }
  });

  document.getElementById('copy-quote').addEventListener('click', async () => {
    const values = getFormValues();
    const body = buildRequestText(values);
    try {
      await copyText(body);
      formStatus.textContent = 'Request copied. Paste it into an email to kadpartyrental@gmail.com.';
      formStatus.classList.remove('is-error');
      showToast('Quote request copied to your clipboard.');
    } catch (_) {
      formStatus.textContent = 'Clipboard access was blocked. You can still use “Prepare email to KAD”.';
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
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
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

  // Portfolio strip and accessible image lightbox.
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

  // Small reveal motion, disabled for users who request reduced motion.
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
