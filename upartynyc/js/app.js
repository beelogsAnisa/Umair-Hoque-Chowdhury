/* U Party — catalog, basket, planner, quote form and motion */
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var moneyFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  var money = function (n) { return moneyFmt.format(n); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var todayISO = function () { return new Date().toLocaleDateString('en-CA'); };
  var KEY = 'uparty-basket-v1';
  var byId = {};
  PRODUCTS.forEach(function (p) { byId[p.id] = p; });
  var basket = load();
  var activeCat = 'all';
  var query = '';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(basket)); } catch (e) { /* private mode */ }
  }
  function qtyOf(id) { return basket[id] || 0; }

  function totals() {
    var priced = 0, quoteItems = 0, units = 0;
    Object.keys(basket).forEach(function (id) {
      var p = byId[id]; if (!p) return;
      var q = basket[id];
      units += q;
      if (p.price == null) quoteItems += q; else priced += p.price * q;
    });
    return { priced: priced, quoteItems: quoteItems, units: units };
  }

  function setQty(id, n) {
    n = Math.max(0, Math.min(500, Math.round(Number(n) || 0)));
    if (n === 0) delete basket[id]; else basket[id] = n;
    save();
    refresh();
  }

  function refresh() {
    $$('[data-qty-display]').forEach(function (el) { el.textContent = qtyOf(el.getAttribute('data-qty-display')); });
    var t = totals();
    $('#fabCount').textContent = t.units;
    $('#fabCount2').textContent = t.units;
    $('#mobileCount').textContent = t.units;
    $('#heroTotal').textContent = money(t.priced);
    renderDrawer(t);
    renderSummary(t);
  }

  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }

  /* ---------- icons ---------- */
  var ICONS = {
    seating: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10v9H7z"/><path d="M7 12v9M17 12v9M7 16h10"/></svg>',
    tables: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><ellipse cx="12" cy="8" rx="9" ry="3"/><path d="M12 11v9M8 20h8"/></svg>',
    decor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z"/></svg>',
    tents: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M2 20L12 4l10 16z"/><path d="M12 4v16M7 20l5-8 5 8"/></svg>',
    entertainment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4a3 3 0 016 0v6a3 3 0 01-6 0z"/><path d="M5 11a7 7 0 0014 0M12 18v3M9 21h6"/></svg>',
    concessions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M5 9h14l-2 12H7z"/><path d="M8 9a2.5 2.5 0 010-5 2.5 2.5 0 014-1 2.5 2.5 0 014 1 2.5 2.5 0 010 5"/></svg>'
  };

  /* ---------- catalog ---------- */
  function cardHTML(p) {
    var priceBlock = p.price == null
      ? '<span class="tag-quote">Quote</span>'
      : '<span class="price">' + money(p.price) + '<small> / ' + esc(p.unit || 'each') + '</small></span>';
    var note = p.note || (p.price == null ? 'Quoted on request.' : 'Listed rate.');
    return '' +
      '<article class="card glass tilt" data-id="' + p.id + '">' +
        '<div class="card-top"><span class="icon">' + (ICONS[p.cat] || ICONS.decor) + '</span>' + priceBlock + '</div>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p>' + esc(note) + '</p>' +
        '<div class="card-foot">' +
          '<div class="stepper" role="group" aria-label="Quantity for ' + esc(p.name) + '">' +
            '<button class="step" type="button" data-act="dec" data-id="' + p.id + '" aria-label="Decrease ' + esc(p.name) + '">\u2212</button>' +
            '<span class="qty" data-qty-display="' + p.id + '">' + qtyOf(p.id) + '</span>' +
            '<button class="step" type="button" data-act="inc" data-id="' + p.id + '" aria-label="Increase ' + esc(p.name) + '">+</button>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function renderCatalog() {
    var q = query.trim().toLowerCase();
    var items = PRODUCTS.filter(function (p) {
      var catOk = activeCat === 'all' || p.cat === activeCat;
      var hay = (p.name + ' ' + (p.note || '') + ' ' + p.cat).toLowerCase();
      return catOk && (!q || hay.indexOf(q) !== -1);
    });
    var grid = $('#grid');
    grid.innerHTML = items.length ? items.map(cardHTML).join('') : '<p class="empty-state">No items match that search. Try “chairs” or “tent”.</p>';
    $$('.card', grid).forEach(bindTilt);
    $$('.card', grid).forEach(function (el, i) { el.style.animationDelay = Math.min(i * 40, 400) + 'ms'; });
    refresh();
  }

  function renderChips() {
    var all = [{ id: 'all', label: 'All items' }].concat(CATEGORIES);
    $('#chips').innerHTML = all.map(function (c) {
      return '<button class="chip' + (c.id === activeCat ? ' active' : '') + '" type="button" role="tab" aria-selected="' + (c.id === activeCat) + '" data-cat="' + c.id + '">' + esc(c.label) + '</button>';
    }).join('');
  }

  /* ---------- drawer ---------- */
  function renderDrawer(t) {
    t = t || totals();
    var lines = Object.keys(basket).map(function (id) {
      var p = byId[id]; if (!p) return '';
      var q = basket[id];
      var lineTotal = p.price == null ? 'Quote' : money(p.price * q);
      var sub = p.price == null ? 'Price on request' : money(p.price) + ' / ' + esc(p.unit || 'each');
      return '<li class="line"><div><b>' + esc(p.name) + '</b><small>' + sub + '</small></div>' +
        '<div class="line-right">' +
          '<div class="stepper sm">' +
            '<button class="step" type="button" data-act="dec" data-id="' + id + '" aria-label="Decrease">\u2212</button>' +
            '<span class="qty">' + q + '</span>' +
            '<button class="step" type="button" data-act="inc" data-id="' + id + '" aria-label="Increase">+</button>' +
          '</div>' +
          '<span class="line-total">' + lineTotal + '</span>' +
        '</div></li>';
    }).join('');
    $('#drawerList').innerHTML = lines || '<li class="empty">Your basket is empty. Add chairs, tables or extras from the catalog.</li>';
    $('#drawerSubtotal').textContent = money(t.priced);
    $('#drawerQuoteCount').textContent = t.quoteItems ? '+ ' + t.quoteItems + ' item(s) to be quoted by U Party' : '';
  }

  function openDrawer() {
    $('#drawer').classList.add('open');
    $('#drawer').setAttribute('aria-hidden', 'false');
    $('#overlay').hidden = false;
  }
  function closeDrawer() {
    $('#drawer').classList.remove('open');
    $('#drawer').setAttribute('aria-hidden', 'true');
    $('#overlay').hidden = true;
  }

  /* ---------- quote summary ---------- */
  function isPickup() {
    var r = document.querySelector('input[name="mode"]:checked');
    return !!r && r.value === 'pickup';
  }

  function summaryRows() {
    return Object.keys(basket).map(function (id) {
      var p = byId[id]; if (!p) return null;
      var q = basket[id];
      return { p: p, q: q, total: p.price == null ? null : p.price * q };
    }).filter(Boolean);
  }

  function renderSummary(t) {
    t = t || totals();
    var box = $('#quoteSummary');
    var rows = summaryRows();
    if (!rows.length) {
      box.innerHTML = '<h3>Your quote</h3><p class="empty">Nothing added yet. Use the catalog or the planner to start.</p>';
    } else {
      box.innerHTML = '<h3>Your quote</h3><ul class="sum-list">' + rows.map(function (r) {
        return '<li><span>' + r.q + ' × ' + esc(r.p.name) + '</span><span>' + (r.total == null ? 'Quote' : money(r.total)) + '</span></li>';
      }).join('') + '</ul>' +
      '<div class="sum-total"><span>Priced subtotal</span><b>' + money(t.priced) + '</b></div>' +
      (t.quoteItems ? '<p class="small muted" style="margin:8px 0 0">Plus ' + t.quoteItems + ' item(s) to be quoted.</p>' : '') +
      '<p class="small muted" style="margin:8px 0 0">Excludes delivery, setup and tax.</p>';
    }
    var tableIn60 = !!basket['table-60'];
    $('#modeWarn').hidden = !(tableIn60 && isPickup());
  }

  /* ---------- planner ---------- */
  function planner() {
    var g = parseInt($('#guests').value, 10);
    if (!g || g < 1) g = 1;
    if (g > 400) g = 400;
    var chairId = $('#chairType').value;
    var chairs = Math.ceil(g * 1.1);
    var tables = Math.ceil(g / 4);
    var est = chairs * byId[chairId].price + tables * byId['round-48'].price;
    $('#planChairs').textContent = chairs;
    $('#planTables').textContent = tables;
    $('#planEst').textContent = money(est);
    return { chairId: chairId, chairs: chairs, tables: tables };
  }

  /* ---------- form ---------- */
  var RULES = {
    name: function (v) { return v.trim().length >= 2 || 'Please enter your name.'; },
    phone: function (v) { return v.replace(/\D/g, '').length >= 10 || 'Enter a phone number with area code.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.'; },
    eventDate: function (v) {
      if (!v) return 'Choose your event date.';
      return v >= todayISO() || 'Pick today or a future date.';
    },
    address: function (v) {
      if (!isPickup()) return v.trim().length >= 5 || 'Add a delivery address so we can quote delivery.';
      return true;
    }
  };

  function setError(name, msg) {
    var input = document.querySelector('[name="' + name + '"]');
    var field = input && input.closest('.field');
    var err = document.getElementById('err-' + name);
    if (field) field.classList.toggle('invalid', msg !== '');
    if (err) err.textContent = msg || '';
  }

  function validate(form) {
    var ok = true;
    Object.keys(RULES).forEach(function (name) {
      var el = form.elements[name];
      var v = el ? el.value : '';
      var res = RULES[name](v);
      if (res !== true) { setError(name, res); ok = false; }
      else setError(name, '');
    });
    return ok;
  }

  function composeBody(form) {
    var fd = new FormData(form);
    var g = function (k) { return (fd.get(k) || '').toString().trim(); };
    var rows = summaryRows();
    var t = totals();
    var itemLines = rows.map(function (r) {
      return '- ' + r.q + ' x ' + r.p.name + (r.total == null ? ' (quote requested)' : ' @ ' + money(r.p.price) + '/' + (r.p.unit || 'each') + ' = ' + money(r.total));
    });
    var lines = [
      'NEW QUOTE REQUEST — U Party website',
      '',
      'Name: ' + g('name'),
      'Phone: ' + g('phone'),
      'Email: ' + g('email'),
      'Event type: ' + g('eventType'),
      'Event date: ' + g('eventDate') + (g('eventTime') ? ' at ' + g('eventTime') : ''),
      'Guests: ' + (g('guests') || 'not given'),
      'Delivery or pickup: ' + g('mode'),
      'Address: ' + (g('address') || 'n/a') + (g('zip') ? ' (ZIP ' + g('zip') + ')' : ''),
      'Notes: ' + (g('notes') || 'none'),
      '',
      'ITEMS:',
      itemLines.length ? itemLines.join('\n') : '(no items selected)',
      '',
      'Priced subtotal (excl. delivery, setup, tax): ' + money(t.priced),
      t.quoteItems ? 'Items to be quoted: ' + t.quoteItems : ''
    ];
    return lines.join('\n').replace(/\n+$/, '');
  }

  function showSuccess() {
    $('#success').hidden = false;
    $('#quoteForm').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  function submitForm(e) {
    e.preventDefault();
    var form = e.currentTarget;
    if (form.elements.company && form.elements.company.value) return; // honeypot
    if (!validate(form)) { toast('Please fix the highlighted fields.'); return; }
    if (!Object.keys(basket).length) {
      toast('Add at least one item to your basket first.');
      $('#catalog').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      return;
    }
    if (isPickup() && basket['table-60']) {
      toast('The 60" table is delivery only. Please choose delivery.');
      return;
    }

    var body = composeBody(form);
    var fd = new FormData(form);
    var btn = $('#submitBtn');
    var endpoint = (typeof SITE !== 'undefined' && SITE.formEndpoint) || '';

    if (endpoint) {
      btn.disabled = true; btn.textContent = 'Sending…';
      var payload = { name: fd.get('name'), phone: fd.get('phone'), email: fd.get('email'), eventType: fd.get('eventType'), eventDate: fd.get('eventDate'), eventTime: fd.get('eventTime'), guests: fd.get('guests'), mode: fd.get('mode'), address: fd.get('address'), zip: fd.get('zip'), notes: fd.get('notes'), items: body, subtotal: totals().priced };
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (r) { if (!r.ok) throw new Error('bad'); form.reset(); afterSend(); })
        .catch(function () { toast('Could not send. Please call 917-587-9846.'); })
        .finally(function () { btn.disabled = false; btn.textContent = 'Send quote request'; });
      return;
    }

    var subject = 'Quote request: ' + (fd.get('eventType') || 'Event') + ' on ' + fd.get('eventDate') + ' (' + fd.get('name') + ')';
    var href = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = href;
    afterSend();
  }

  function afterSend() {
    showSuccess();
    toast('Quote request ready to send ✦');
  }

  function copySummary() {
    var form = $('#quoteForm');
    if (!validate(form)) { toast('Fill in the required fields first.'); return; }
    var text = composeBody(form);
    var done = function () { toast('Summary copied to clipboard'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* ---------- motion ---------- */
  function bindTilt(el) {
    if (!canHover || reduceMotion) return;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = 'perspective(900px) rotateX(' + (-y * 6).toFixed(2) + 'deg) rotateY(' + (x * 8).toFixed(2) + 'deg) translateY(-3px)';
      el.style.setProperty('--mx', ((x + 0.5) * 100).toFixed(1) + '%');
      el.style.setProperty('--my', ((y + 0.5) * 100).toFixed(1) + '%');
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  }

  function bindMagnetic() {
    if (!canHover || reduceMotion) return;
    $$('.magnetic').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + (x * 0.18).toFixed(1) + 'px,' + (y * 0.25).toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  function bindGlow() {
    if (!canHover || reduceMotion) return;
    var glow = $('.glow');
    window.addEventListener('pointermove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.style.opacity = '1';
    }, { passive: true });
  }

  function bindRipple() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('.btn');
      if (!b || reduceMotion) return;
      var r = b.getBoundingClientRect();
      var s = Math.max(r.width, r.height);
      var span = document.createElement('span');
      span.className = 'ripple';
      span.style.width = span.style.height = s + 'px';
      span.style.left = (e.clientX - r.left - s / 2) + 'px';
      span.style.top = (e.clientY - r.top - s / 2) + 'px';
      b.appendChild(span);
      setTimeout(function () { span.remove(); }, 700);
    });
  }

  function bindReveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  function countUp() {
    var el = $('#itemCount');
    var target = PRODUCTS.length;
    if (reduceMotion) { el.textContent = target + '+'; return; }
    var start = null, dur = 1200;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + '+';
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function bindParallax() {
    if (reduceMotion) return;
    var sun = $('.sun'), palm = $('.palm-l');
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          sun.style.transform = 'translateY(' + (y * 0.22).toFixed(1) + 'px)';
          palm.style.translate = '0 ' + (y * -0.1).toFixed(1) + 'px';
        }
        $('#nav').classList.toggle('scrolled', y > 40);
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- wiring ---------- */
  function init() {
    renderChips();
    renderCatalog();

    document.addEventListener('click', function (e) {
      var stepBtn = e.target.closest('[data-act]');
      if (stepBtn) {
        var id = stepBtn.getAttribute('data-id');
        var cur = qtyOf(id);
        setQty(id, stepBtn.getAttribute('data-act') === 'inc' ? cur + 1 : cur - 1);
        return;
      }
      var chip = e.target.closest('.chip');
      if (chip) {
        activeCat = chip.getAttribute('data-cat');
        renderChips();
        renderCatalog();
        return;
      }
      if (e.target.closest('.basket-open')) { openDrawer(); return; }
    });

    $('#drawerClose').addEventListener('click', closeDrawer);
    $('#overlay').addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDrawer(); $('#navLinks').classList.remove('open'); } });
    $('#drawerQuote').addEventListener('click', closeDrawer);
    $('#clearBasket').addEventListener('click', function () {
      if (!Object.keys(basket).length) return;
      basket = {}; save(); refresh(); toast('Basket cleared');
    });

    $('#search').addEventListener('input', function (e) { query = e.target.value; renderCatalog(); });

    ['#guests', '#chairType'].forEach(function (s) { $(s).addEventListener('input', planner); $(s).addEventListener('change', planner); });
    $('#planAdd').addEventListener('click', function () {
      var p = planner();
      PLANNER_CHAIRS.forEach(function (cid) { if (cid !== p.chairId && basket[cid]) setQty(cid, 0); });
      setQty(p.chairId, p.chairs);
      setQty('round-48', p.tables);
      toast(p.chairs + ' chairs and ' + p.tables + ' tables added to your basket');
      openDrawer();
    });
    planner();

    var form = $('#quoteForm');
    form.addEventListener('submit', submitForm);
    $('#copyBtn').addEventListener('click', copySummary);
    $$('[name="mode"]').forEach(function (r) { r.addEventListener('change', function () { renderSummary(); setError('address', ''); }); });
    $$('#quoteForm input, #quoteForm select').forEach(function (el) {
      el.addEventListener('blur', function () {
        if (RULES[el.name]) { var r = RULES[el.name](el.value); setError(el.name, r === true ? '' : r); }
      });
    });
    form.elements.eventDate.min = todayISO();

    $('#burger').addEventListener('click', function () {
      var open = $('#navLinks').classList.toggle('open');
      this.setAttribute('aria-expanded', String(open));
    });
    $$('#navLinks a').forEach(function (a) {
      a.addEventListener('click', function () {
        $('#navLinks').classList.remove('open');
        $('#burger').setAttribute('aria-expanded', 'false');
      });
    });

    $$('.tilt').forEach(bindTilt);
    bindMagnetic();
    bindGlow();
    bindRipple();
    bindReveal();
    bindParallax();
    countUp();
    refresh();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
