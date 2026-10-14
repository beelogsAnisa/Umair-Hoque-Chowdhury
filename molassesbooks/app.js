(() => {
  const BOOKS = [
    {
      id: "all-fall-down",
      title: "SIGNED All Fall Down",
      author: "James Leo Herlihy",
      price: 600,
      image: "all-fall-down.jpg",
      label: "Signed · rare",
      categories: ["signed", "fiction"],
      status: "listed",
      description: "A signed copy listed in the Molasses Books online catalog. Ask the shop to confirm current availability, condition, and edition details."
    },
    {
      id: "trio",
      title: "TRIO",
      author: "Dorothy Baker",
      price: 70,
      image: "book-trio.jpg",
      label: "Vintage fiction",
      categories: ["fiction"],
      status: "listed",
      description: "A vintage copy of Dorothy Baker’s novel, listed among the shop’s online finds. Availability and condition can change, so check with the shop before making a special trip."
    },
    {
      id: "professor",
      title: "The Professor Etc.",
      author: "Charlotte Brontë",
      price: 275,
      image: "professor.jpg",
      label: "Vintage fiction",
      categories: ["fiction"],
      status: "listed",
      description: "A Charlotte Brontë title from the current Molasses Books online catalog. Ask the shop for current availability and edition details."
    },
    {
      id: "factotum",
      title: "Factotum",
      author: "Charles Bukowski",
      price: 170,
      image: "factotum.jpg",
      label: "Used fiction",
      categories: ["fiction"],
      status: "listed",
      description: "A copy of Charles Bukowski’s Factotum from the shop’s online catalog. Ask the shop to confirm whether this copy is still available."
    },
    {
      id: "half-cents",
      title: "SIGNED 1/2 Cents",
      author: "Richard Bissell",
      price: 150,
      image: "half-cents.jpg",
      label: "Signed · rare",
      categories: ["signed", "fiction"],
      status: "listed",
      description: "A signed Richard Bissell title listed by Molasses Books. Ask the shop to confirm current availability and details about this copy."
    },
    {
      id: "black-tickets",
      title: "SIGNED Black Tickets",
      author: "Jayne Anne Phillips",
      price: 175,
      image: "black-tickets.jpg",
      label: "Signed · rare",
      categories: ["signed", "fiction"],
      status: "listed",
      description: "A signed copy listed in the shop’s online catalog. Current stock can change; contact Molasses Books to ask about this copy."
    },
    {
      id: "hollywood-babylon",
      title: "SIGNED Hollywood Babylon",
      author: "Kenneth Anger",
      price: 850,
      image: "hollywood-babylon.jpg",
      label: "Signed · film",
      categories: ["signed", "art"],
      status: "listed",
      description: "A signed Kenneth Anger title appearing in the current online catalog. Ask the shop to confirm availability, condition, and edition details."
    },
    {
      id: "quarterly",
      title: "Molasses Quarterly #1",
      author: "Molasses Books Publishing",
      price: 25,
      image: "quarterly.jpg",
      label: "Small press",
      categories: ["press", "poetry"],
      status: "listed",
      description: "Issue one brings together fiction, poetry, art, interviews, and essays. Listed on the Molasses Books Publishing releases page; check with the shop for current availability."
    },
    {
      id: "clown-car",
      title: "CLOWN CAR",
      author: "Hen Win",
      price: 12,
      image: "clown-car.jpg",
      label: "Molasses Books Press",
      categories: ["press", "poetry"],
      status: "sold-out",
      description: "The second edition of Molasses Books’ first release, expanded by thirty pages with the addition of MOBRO, a verse retelling of the Mobro-4000 garbage barge. The official listing currently marks it sold out."
    },
    {
      id: "ghetto-poems",
      title: "The Ghetto and Other Poems",
      author: "Lola Ridge",
      price: 12,
      image: "ghetto-poems.jpg",
      label: "Poetry · small press",
      categories: ["poetry", "press"],
      status: "sold-out",
      description: "A Molasses Books Publishing edition of Lola Ridge’s poetry collection. The official listing currently marks it sold out."
    },
    {
      id: "galactic-pot-healer",
      title: "Galactic Pot-Healer",
      author: "Philip K. Dick",
      price: 125,
      image: "galactic-pot-healer.jpg",
      label: "Science fiction",
      categories: ["fiction"],
      status: "sold-out",
      description: "A Philip K. Dick title from the online catalog. The official listing currently marks this copy sold out."
    },
    {
      id: "under-my-feet",
      title: "Under My Feet the Sky",
      author: "Dave Morse",
      price: 28,
      image: "under-my-feet.jpg",
      label: "Poetry · small press",
      categories: ["press", "poetry"],
      status: "sold-out",
      description: "A Molasses Books Publishing collection by Dave Morse. The official releases listing currently marks it sold out."
    }
  ];

  const STORAGE_KEY = "molasses-books-demo-bag-v1";
  const bookById = new Map(BOOKS.map(book => [book.id, book]));
  const grid = document.getElementById("bookGrid");
  const searchInput = document.getElementById("bookSearch");
  const sortSelect = document.getElementById("bookSort");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const resultCount = document.getElementById("resultCount");
  const productDialog = document.getElementById("productDialog");
  const productDialogContent = document.getElementById("productDialogContent");
  const inquiryDialog = document.getElementById("inquiryDialog");
  const drawerLayer = document.getElementById("drawerLayer");
  const cartItems = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const drawerFooter = document.getElementById("drawerFooter");
  const bagCount = document.getElementById("bagCount");
  const cartTitleCount = document.getElementById("cartTitleCount");
  const cartTotal = document.getElementById("cartTotal");
  const toast = document.getElementById("toast");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  let activeFilter = "all";
  let toastTimer;
  let lastFocus = null;
  let cart = loadCart();

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const motionBound = new WeakSet();
  const revealObserved = new WeakSet();
  document.documentElement.classList.add("js-ready");
  const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" })
    : null;

  function activateMotion(root = document) {
    const selector = ".hero-photo-shell, .experience-card, .book-card, .press-cover, .visit-map-card, .glass-card, .address-card, .press-feature, .intro-heading, .visit-copy, .publishing-copy, .visit-image-note";
    const elements = root.querySelectorAll(selector);
    elements.forEach((element, index) => {
      if (!element.classList.contains("motion-reveal")) {
        element.classList.add("motion-reveal");
        element.style.setProperty("--reveal-delay", `${(index % 4) * 75}ms`);
      }
      if (!motionBound.has(element)) {
        motionBound.add(element);
        element.addEventListener("pointermove", event => {
          const rect = element.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
          const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
          element.style.setProperty("--mx", `${x}%`);
          element.style.setProperty("--my", `${y}%`);
          if (!prefersReducedMotion && event.pointerType !== "touch" && element.matches(".hero-photo-shell, .experience-card, .book-card, .press-cover, .visit-map-card")) {
            const intensity = element.matches(".hero-photo-shell, .visit-map-card") ? 4.8 : 7;
            element.style.setProperty("--rx", `${((50 - y) / 50 * intensity).toFixed(2)}deg`);
            element.style.setProperty("--ry", `${((x - 50) / 50 * intensity).toFixed(2)}deg`);
          }
        }, { passive: true });
        const resetMotion = () => {
          element.style.setProperty("--rx", "0deg");
          element.style.setProperty("--ry", "0deg");
          element.style.setProperty("--mx", "50%");
          element.style.setProperty("--my", "0%");
        };
        element.addEventListener("pointerleave", resetMotion, { passive: true });
        element.addEventListener("pointercancel", resetMotion, { passive: true });
      }
      if (revealObserver && !revealObserved.has(element)) {
        revealObserved.add(element);
        revealObserver.observe(element);
      } else if (!revealObserver) {
        element.classList.add("is-revealed");
      }
    });
  }

  function loadCart() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(stored)) return [];
      return stored
        .filter(item => item && bookById.has(item.id) && bookById.get(item.id).status !== "sold-out")
        .map(item => ({ id: item.id, quantity: Math.max(1, Math.min(10, Number(item.quantity) || 1)) }));
    } catch (_error) {
      return [];
    }
  }

  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (_error) { /* private browsing can disable storage */ }
  }

  function currency(amount) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
  }

  function categoryText(book) {
    if (book.categories.includes("signed")) return "Rare & signed";
    if (book.categories.includes("press")) return "Small press";
    if (book.categories.includes("poetry")) return "Poetry";
    if (book.categories.includes("art")) return "Art & film";
    return "Used fiction";
  }

  function matchesFilter(book) {
    if (activeFilter === "all") return true;
    if (activeFilter === "listed") return book.status === "listed";
    if (activeFilter === "sold-out") return book.status === "sold-out";
    return book.categories.includes(activeFilter);
  }

  function renderCatalog() {
    if (!grid) return;
    const query = (searchInput?.value || "").trim().toLowerCase();
    let matches = BOOKS.filter(book => {
      const searchable = `${book.title} ${book.author} ${book.label} ${book.categories.join(" ")}`.toLowerCase();
      return matchesFilter(book) && (!query || searchable.includes(query));
    });

    const sort = sortSelect?.value || "featured";
    if (sort === "title") matches.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "low") matches.sort((a, b) => a.price - b.price);
    if (sort === "high") matches.sort((a, b) => b.price - a.price);

    grid.innerHTML = matches.length ? matches.map(book => {
      const soldOut = book.status === "sold-out";
      const price = currency(book.price);
      return `
        <article class="book-card">
          <button class="book-media-button" type="button" data-open-product="${book.id}" aria-label="View ${escapeHTML(book.title)} by ${escapeHTML(book.author)}">
            <span class="book-media" style="--media-bg:${book.categories.includes("press") ? "#e8d6c4" : book.categories.includes("art") ? "#ded7d2" : "#e9dfcf"}">
              <span class="book-tag ${soldOut ? "is-sold" : ""}">${soldOut ? "Sold out online" : escapeHTML(book.label)}</span>
              <img src="./assets/${escapeHTML(book.image)}" alt="${escapeHTML(book.title)} by ${escapeHTML(book.author)}" loading="lazy">
              <span class="book-look" aria-hidden="true">↗</span>
            </span>
          </button>
          <div class="book-info">
            <span class="book-category">${escapeHTML(categoryText(book))}</span>
            <h3>${escapeHTML(book.title)}</h3>
            <p class="book-author">${escapeHTML(book.author)}</p>
            <div class="book-card-bottom">
              <span class="book-price">${price}</span>
              ${soldOut
                ? `<span class="book-ask is-sold" aria-label="Sold out">Sold out</span>`
                : `<button class="book-ask" type="button" data-add="${book.id}" aria-label="Add ${escapeHTML(book.title)} to your inquiry bag">Ask about it <span aria-hidden="true">↗</span></button>`}
            </div>
          </div>
        </article>`;
    }).join("") : `
      <div class="empty-results">
        <div><strong>No books by that name.</strong><span>Try another title, author, or filter.</span></div>
      </div>`;

    activateMotion(grid);
    if (resultCount) {
      const suffix = matches.length === 1 ? "find" : "finds";
      resultCount.textContent = query || activeFilter !== "all" ? `${matches.length} ${suffix} to browse` : `${matches.length} curious finds`;
    }
  }

  function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + bookById.get(item.id).price * item.quantity, 0);
    bagCount.textContent = String(count);
    cartTitleCount.textContent = `(${count})`;
    cartItems.innerHTML = cart.map(item => {
      const book = bookById.get(item.id);
      return `
        <article class="cart-line">
          <img src="./assets/${escapeHTML(book.image)}" alt="" loading="lazy">
          <div class="cart-line-info">
            <h3>${escapeHTML(book.title)}</h3>
            <p>${escapeHTML(book.author)}</p>
            <div class="quantity-control" aria-label="Quantity for ${escapeHTML(book.title)}">
              <button type="button" data-quantity="${book.id}" data-change="-1" aria-label="Remove one ${escapeHTML(book.title)}">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-quantity="${book.id}" data-change="1" aria-label="Add one ${escapeHTML(book.title)}">+</button>
            </div>
          </div>
          <div class="cart-line-end">
            <span class="cart-line-price">${currency(book.price * item.quantity)}</span>
            <button class="remove-line" type="button" data-remove="${book.id}">Remove</button>
          </div>
        </article>`;
    }).join("");
    cartEmpty.hidden = count > 0;
    drawerFooter.hidden = count === 0;
    cartTotal.textContent = currency(total);
    saveCart();
  }

  function addToCart(id) {
    const book = bookById.get(id);
    if (!book) return;
    if (book.status === "sold-out") {
      showToast("This title is marked sold out on the current listing.");
      return;
    }
    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity = Math.min(10, existing.quantity + 1);
    else cart.push({ id, quantity: 1 });
    renderCart();
    const bagButton = document.querySelector(".bag-button");
    bagButton?.classList.remove("is-bumping");
    if (bagButton) {
      void bagButton.offsetWidth;
      bagButton.classList.add("is-bumping");
      window.setTimeout(() => bagButton.classList.remove("is-bumping"), 650);
    }
    showToast(`${book.title} added to your inquiry bag.`);
  }

  function setFilter(filter) {
    activeFilter = filter;
    filterButtons.forEach(button => {
      const active = button.dataset.filter === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderCatalog();
  }

  function openProduct(id) {
    const book = bookById.get(id);
    if (!book) return;
    const soldOut = book.status === "sold-out";
    productDialogContent.innerHTML = `
      <div class="book-dialog-inner">
        <div class="dialog-book-media"><img src="./assets/${escapeHTML(book.image)}" alt="${escapeHTML(book.title)} by ${escapeHTML(book.author)}"></div>
        <div class="dialog-book-content">
          <button class="icon-button dialog-close" type="button" data-close-dialog aria-label="Close book details">×</button>
          <p class="eyebrow eyebrow-dark"><span class="eyebrow-rule"></span> ${escapeHTML(book.label)}</p>
          <h2 id="productDialogTitle">${escapeHTML(book.title)}</h2>
          <p class="dialog-author">${escapeHTML(book.author)}</p>
          <p class="dialog-description">${escapeHTML(book.description)}</p>
          <div class="dialog-book-bottom">
            <span class="dialog-price">${currency(book.price)}</span>
            ${soldOut
              ? `<span class="book-ask is-sold">Sold out online</span>`
              : `<button class="button button-dark" type="button" data-add="${book.id}">Add to inquiry bag <span class="arrow" aria-hidden="true">↗</span></button>`}
          </div>
          <p class="dialog-availability">Listed price and availability can change. Please confirm with the shop.</p>
        </div>
      </div>`;
    if (typeof productDialog.showModal === "function") productDialog.showModal();
    else productDialog.setAttribute("open", "");
  }

  function openCart() {
    lastFocus = document.activeElement;
    closeMenu();
    drawerLayer.hidden = false;
    document.body.classList.add("drawer-open");
    renderCart();
    window.setTimeout(() => document.getElementById("cartDrawer").focus(), 20);
  }

  function closeCart() {
    if (drawerLayer.hidden) return;
    drawerLayer.hidden = true;
    document.body.classList.remove("drawer-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function inquiryMessage() {
    const lines = cart.map(item => {
      const book = bookById.get(item.id);
      return `• ${item.quantity} × ${book.title} — ${book.author} (${currency(book.price)} each)`;
    });
    const total = cart.reduce((sum, item) => sum + bookById.get(item.id).price * item.quantity, 0);
    return ["Hello Molasses Books!", "", "I’m interested in asking about:", ...lines, "", `Listed total: ${currency(total)}`, "Could you let me know what’s currently available?"].join("\n");
  }

  function openInquiry() {
    if (!cart.length) return;
    document.getElementById("inquiryText").textContent = inquiryMessage();
    closeCart();
    if (typeof inquiryDialog.showModal === "function") inquiryDialog.showModal();
    else inquiryDialog.setAttribute("open", "");
  }

  async function copyText(text, successMessage) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      showToast(successMessage);
    } catch (_error) {
      showToast("Copy wasn’t available here—please select the text instead.");
    }
  }

  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    mainNav.classList.remove("is-open");
  }

  function updateFilterCounts() {
    const allCount = BOOKS.length;
    document.querySelectorAll('[data-count-for="all"]').forEach(element => element.textContent = allCount);
  }

  document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add]");
    if (addButton) {
      addToCart(addButton.dataset.add);
      if (productDialog.open) productDialog.close();
      return;
    }

    const productButton = event.target.closest("[data-open-product]");
    if (productButton) {
      openProduct(productButton.dataset.openProduct);
      return;
    }

    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
      setFilter(filterButton.dataset.filter);
      return;
    }

    if (event.target.closest("[data-cart-open]")) {
      openCart();
      return;
    }

    if (event.target.closest("[data-cart-close]")) {
      closeCart();
      return;
    }

    const quantityButton = event.target.closest("[data-quantity]");
    if (quantityButton) {
      const item = cart.find(entry => entry.id === quantityButton.dataset.quantity);
      if (item) {
        const change = Number(quantityButton.dataset.change);
        item.quantity += change;
        if (item.quantity < 1) cart = cart.filter(entry => entry.id !== item.id);
        if (item.quantity > 10) item.quantity = 10;
        renderCart();
      }
      return;
    }

    const removeButton = event.target.closest("[data-remove]");
    if (removeButton) {
      cart = cart.filter(item => item.id !== removeButton.dataset.remove);
      renderCart();
      showToast("Removed from your inquiry bag.");
      return;
    }

    if (event.target.closest("[data-close-dialog]")) {
      const dialog = event.target.closest("dialog");
      if (dialog?.open) dialog.close();
      else dialog?.removeAttribute("open");
      return;
    }
  });

  searchInput?.addEventListener("input", renderCatalog);
  sortSelect?.addEventListener("change", renderCatalog);
  document.getElementById("surpriseButton")?.addEventListener("click", () => {
    const shelf = BOOKS.filter(book => book.status === "listed");
    const pick = shelf[Math.floor(Math.random() * shelf.length)];
    const button = document.getElementById("surpriseButton");
    button.classList.remove("is-spinning");
    void button.offsetWidth;
    button.classList.add("is-spinning");
    window.setTimeout(() => button.classList.remove("is-spinning"), 700);
    openProduct(pick.id);
  });

  menuToggle?.addEventListener("click", () => { 
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    mainNav.classList.toggle("is-open", !isOpen);
  });
  mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeCart();
      closeMenu();
    }
  });

  document.getElementById("startInquiry")?.addEventListener("click", openInquiry);
  document.getElementById("copyInquiry")?.addEventListener("click", () => copyText(inquiryMessage(), "Your book list is copied and ready to send."));
  document.getElementById("copyAddress")?.addEventListener("click", () => copyText("770 Hart Street, Brooklyn, NY 11237", "Shop address copied."));

  document.getElementById("newsletterForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const email = document.getElementById("newsletterEmail");
    const status = document.getElementById("newsletterStatus");
    if (!email.checkValidity()) {
      email.reportValidity();
      return;
    }
    status.textContent = "Thanks for trying the signup — this demo doesn’t send or store email yet.";
    email.value = "";
    showToast("Thanks for stopping by.");
  });

  productDialog?.addEventListener("click", event => {
    if (event.target === productDialog) productDialog.close();
  });
  inquiryDialog?.addEventListener("click", event => {
    if (event.target === inquiryDialog) inquiryDialog.close();
  });
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("close", () => {
      if (dialog === productDialog) productDialogContent.innerHTML = "";
    });
  });

  const scrollProgress = document.getElementById("scrollProgress");
  let progressFrame = 0;
  function updateScrollProgress() {
    const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = availableScroll > 0 ? Math.min(1, window.scrollY / availableScroll) : 0;
    scrollProgress?.style.setProperty("--page-progress", progress.toFixed(4));
    progressFrame = 0;
  }
  window.addEventListener("scroll", () => {
    if (!progressFrame) progressFrame = window.requestAnimationFrame(updateScrollProgress);
  }, { passive: true });
  window.addEventListener("resize", updateScrollProgress, { passive: true });
  updateScrollProgress();

  document.querySelectorAll(".hero, .publishing-section").forEach(area => {
    area.addEventListener("pointermove", event => {
      if (event.pointerType === "touch") return;
      const rect = area.getBoundingClientRect();
      area.style.setProperty("--spot-x", `${((event.clientX - rect.left) / rect.width * 100).toFixed(1)}%`);
      area.style.setProperty("--spot-y", `${((event.clientY - rect.top) / rect.height * 100).toFixed(1)}%`);
    }, { passive: true });
  });

  document.getElementById("currentYear").textContent = new Date().getFullYear();
  updateFilterCounts();
  renderCatalog();
  activateMotion(document);
  renderCart();
})();
