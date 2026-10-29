(() => {
  "use strict";

  const SITE = window.GRAM.site;
  const PRODUCTS = window.GRAM.products;
  const REVIEWS = window.GRAM.reviews;
  const FAQ = window.GRAM.faq;
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const body = document.body;
  const page = body.dataset.page || "";
  const CART_KEY = "gram_cart_v1";
  const ORDERS_KEY = "gram_orders_v1";
  const SESSION_KEY = "gram_session_v1";
  const COOKIE_KEY = "gram_cookie_v1";
  const DEMO_FILE = "assets/files/gram-sample.pdf";

  window.dataLayer = window.dataLayer || [];
  const track = (event, payload = {}) => {
    window.dataLayer.push({ event, ...payload });
  };

  document.documentElement.classList.add("js");

  /* ---------------------------------------------------------
     Utilities
     --------------------------------------------------------- */

  const money = (value) => `${Number(value).toLocaleString("uk-UA")}\u00A0₴`;

  const formatDate = (value) => {
    const date = value instanceof Date ? value : new Date(value);
    return date.toLocaleDateString("uk-UA", { day: "2-digit", month: "long", year: "numeric" });
  };

  const shortDate = (value) => {
    const date = value instanceof Date ? value : new Date(value);
    return date.toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const plural = (count, forms) => {
    const n = Math.abs(count) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];
    return forms[2];
  };

  const escapeHTML = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const productBySlug = (slug) => PRODUCTS.find((product) => product.slug === slug);

  const params = () => new URLSearchParams(window.location.search);

  const loadJSON = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  };

  const saveJSON = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      /* private mode */
    }
  };

  const removeStored = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      /* noop */
    }
  };

  const setMeta = (attribute, name, content) => {
    let node = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute(attribute, name);
      document.head.append(node);
    }
    node.setAttribute("content", content);
  };

  const addJsonLd = (data) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.gramJsonld = "true";
    script.textContent = JSON.stringify(data);
    document.head.append(script);
  };

  /* ---------------------------------------------------------
     Icons
     --------------------------------------------------------- */

  const SPRITE = `
  <svg class="svg-sprite" aria-hidden="true" focusable="false">
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-up-right" viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="m4 12.5 5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></symbol>
    <symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></symbol>
    <symbol id="i-cart" viewBox="0 0 24 24"><path d="M4 5h2l2.1 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="20" r="1.2" fill="currentColor"/><circle cx="18" cy="20" r="1.2" fill="currentColor"/></symbol>
    <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 20a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m16 16 4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
    <symbol id="i-download" viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-refresh" viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-card" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 10h18M7 15h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
    <symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>
    <symbol id="i-telegram" viewBox="0 0 24 24"><path d="m21 4-3.2 16-6.1-4.6L8 19l-.2-5.2L21 4Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m7.8 13.8 10.7-7.1-6 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></symbol>
    <symbol id="i-instagram" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m4 6.5 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></symbol>
    <symbol id="i-file" viewBox="0 0 24 24"><path d="M6 3.5h8.5L19 8v12.5H6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 3.5V8h4.5M9 12h6M9 15.5h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3.5 19 6v5.5c0 4.5-3 7-7 9.5-4-2.5-7-5-7-9.5V6l7-2.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-filter" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></symbol>
    <symbol id="i-trash" viewBox="0 0 24 24"><path d="M5 7h14M10 4h4M7 7l1 13h8l1-13M10 11v5M14 11v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" fill="currentColor"/></symbol>
    <symbol id="i-apple" viewBox="0 0 24 24"><path d="M15.5 7.2c1.6 0 2.7.8 2.7.8s-1.2 1.4-1.2 3.2c0 2.2 1.7 3 1.7 3s-1.2 3.1-3.3 3.1c-1 0-1.5-.6-2.7-.6s-1.8.6-2.7.6c-2.3 0-4.5-3.7-4.5-6.3 0-3.5 2.4-5.4 4.7-5.4 1.1 0 2 .7 2.7.7.7 0 1.2-.8 2.6-.8Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M13.2 4.4c.6-.8 1.1-1.4 2.2-1.4.1 1.3-.4 2.3-1.1 3-.6.7-1.4 1.1-2.2 1.1-.1-1.2.4-2.1 1.1-2.7Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></symbol>
    <symbol id="i-google" viewBox="0 0 24 24"><path d="M20.4 12.3c0-.7-.1-1.3-.2-1.9H12v3.6h4.7a4 4 0 0 1-1.7 2.6v2.2h2.8c1.6-1.5 2.6-3.7 2.6-6.5Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 21c2.4 0 4.4-.8 5.8-2.2l-2.8-2.2c-.8.5-1.8.8-3 .8-2.3 0-4.3-1.6-5-3.7H4.1v2.3A9 9 0 0 0 12 21Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 13.7a5.4 5.4 0 0 1 0-3.4V8H4.1a9 9 0 0 0 0 8l2.9-2.3Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 6.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 4.1 8l2.9 2.3c.7-2.1 2.7-3.7 5-3.7Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></symbol>
    <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 11v5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="8" r="1" fill="currentColor"/></symbol>
  </svg>`;

  const icon = (name, className = "") =>
    `<svg class="icon ${className}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

  /* ---------------------------------------------------------
     Shell: header, footer, dialogs
     --------------------------------------------------------- */

  const navItems = [
    { href: "catalog.html", label: "Набори", pages: ["catalog", "product"] },
    { href: "about.html", label: "Про нас", pages: ["about"] },
    { href: "reviews.html", label: "Відгуки", pages: ["reviews"] },
    { href: "faq.html", label: "Питання", pages: ["faq"] }
  ];

  function headerHTML() {
    const nav = navItems
      .map((item) => {
        const active = item.pages.includes(page);
        return `<a href="${item.href}" class="${active ? "is-active" : ""}"${active ? ' aria-current="page"' : ""}>${item.label}</a>`;
      })
      .join("");

    return `
      <div class="announce">
        <div class="shell">
          <span>Цифрові техкарти · PDF одразу після оплати · доступ 12 місяців</span>
          <a href="${SITE.telegram}" target="_blank" rel="noopener">${icon("telegram")} Підтримка в Telegram</a>
        </div>
      </div>
      <header class="site-header" id="siteHeader">
        <div class="shell header-inner">
          <a class="brand" href="index.html" aria-label="ГРАМ — на головну">ГРАМ<span>.</span></a>
          <nav class="nav" aria-label="Головна навігація">${nav}</nav>
          <div class="header-actions">
            <button class="icon-btn" type="button" data-search-open aria-label="Пошук наборів">${icon("search")}</button>
            <a class="account-link" href="account.html">${icon("user")} Кабінет</a>
            <button class="icon-btn" type="button" data-cart-open aria-label="Відкрити кошик">
              ${icon("cart")}<span class="cart-count is-empty" data-cart-count>0</span>
            </button>
            <button class="burger" type="button" data-menu-open aria-label="Відкрити меню" aria-expanded="false" aria-controls="mobileMenu">
              <span></span><span></span>
            </button>
          </div>
        </div>
      </header>
      <div class="mobile-menu" id="mobileMenu" aria-hidden="true" inert>
        <div class="mobile-menu__head">
          <a class="brand" href="index.html">ГРАМ<span>.</span></a>
          <button class="icon-btn" type="button" data-menu-close aria-label="Закрити меню">${icon("close")}</button>
        </div>
        <nav class="mobile-menu__links" aria-label="Мобільна навігація">
          ${navItems.map((item, index) => `<a href="${item.href}">${item.label}<small>0${index + 1}</small></a>`).join("")}
          <a href="account.html">Кабінет<small>05</small></a>
        </nav>
        <div class="mobile-menu__foot">
          <a class="btn btn--primary" href="catalog.html">Обрати набір ${icon("arrow")}</a>
          <p>PDF одразу після оплати. Доступ 12 місяців. Підтримка в Telegram.</p>
        </div>
      </div>`;
  }

  function footerHTML() {
    const year = new Date().getFullYear();
    return `
      <footer class="site-footer">
        <div class="shell">
          <div class="footer-top">
            <div class="footer-brand">
              <a class="brand" href="index.html" aria-label="ГРАМ — на головну">ГРАМ<span>.</span></a>
              <p>Технологічні картки для кондитерів, які хочуть працювати стабільно. Рецептури, технологія, собівартість — в одному PDF.</p>
              <div class="footer-social">
                <a href="${SITE.telegram}" target="_blank" rel="noopener" aria-label="Telegram">${icon("telegram")}</a>
                <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
                <a href="mailto:${SITE.email}" aria-label="Написати на email">${icon("mail")}</a>
              </div>
            </div>
            <div class="footer-cols">
              <div class="footer-col">
                <h4>Набори</h4>
                <a href="catalog.html">Усі набори</a>
                <a href="product.html?slug=torty">Торти</a>
                <a href="product.html?slug=mousse">Муссові десерти</a>
                <a href="product.html?slug=cookies">Печиво</a>
                <a href="product.html?slug=glutenfree">Без глютену</a>
              </div>
              <div class="footer-col">
                <h4>Інформація</h4>
                <a href="about.html">Про ГРАМ</a>
                <a href="reviews.html">Відгуки</a>
                <a href="faq.html">Питання та відповіді</a>
                <a href="payment.html">Оплата й отримання</a>
                <a href="returns.html">Повернення коштів</a>
                <a href="contacts.html">Контакти</a>
              </div>
              <div class="footer-col">
                <h4>Документи</h4>
                <a href="offer.html">Публічна оферта</a>
                <a href="privacy.html">Конфіденційність</a>
                <a href="privacy.html#cookies">Політика cookie</a>
                <a href="offer.html#rights">Права використання</a>
              </div>
            </div>
          </div>
          <div class="footer-payments">
            <span>${SITE.legalName} · ${SITE.taxId} · ${SITE.address}</span>
            <span class="pay-badges">
              <span class="pay-badge">VISA</span>
              <span class="pay-badge">Mastercard</span>
              <span class="pay-badge">Apple Pay</span>
              <span class="pay-badge">Google Pay</span>
              <span class="pay-badge">LiqPay</span>
            </span>
          </div>
          <div class="footer-bottom">
            <span>© ${year} ГРАМ. Усі права захищені.</span>
            <span>Демонстраційний прототип. Перед запуском замініть реквізити та перевірте юридичні тексти.</span>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
          </div>
        </div>
      </footer>`;
  }

  function overlaysHTML() {
    return `
      <dialog class="drawer" id="cartDrawer" aria-labelledby="cartDrawerTitle">
        <div class="drawer__inner">
          <div class="drawer__head">
            <h2 id="cartDrawerTitle">Кошик</h2>
            <button class="icon-btn" type="button" data-close-dialog aria-label="Закрити кошик">${icon("close")}</button>
          </div>
          <div class="drawer__body" id="cartDrawerBody"></div>
          <div class="drawer__foot" id="cartDrawerFoot"></div>
        </div>
      </dialog>

      <dialog class="search-dialog" id="searchDialog" aria-labelledby="searchTitle">
        <div class="search__inner">
          <div class="search__head">
            <h2 id="searchTitle">Пошук наборів</h2>
            <button class="icon-btn" type="button" data-close-dialog aria-label="Закрити пошук">${icon("close")}</button>
          </div>
          <label class="search__field">
            ${icon("search")}
            <span class="sr-only">Назва або склад набору</span>
            <input type="search" id="globalSearchInput" placeholder="Торти, муссові, без глютену…" autocomplete="off">
          </label>
          <div class="search-results" id="globalSearchResults"></div>
        </div>
      </dialog>

      <div class="toast-stack" id="toastStack" aria-live="polite"></div>`;
  }

  function renderShell() {
    const header = $("#site-header");
    const footer = $("#site-footer");
    if (header) header.innerHTML = headerHTML();
    if (footer) footer.innerHTML = footerHTML();
    document.body.insertAdjacentHTML("beforeend", overlaysHTML());
  }

  /* ---------------------------------------------------------
     Cart
     --------------------------------------------------------- */

  function readCart() {
    const value = loadJSON(CART_KEY, { items: [], promo: "" });
    if (Array.isArray(value)) return { items: value.filter(productBySlug), promo: "" };
    return {
      items: Array.isArray(value.items) ? value.items.filter(productBySlug) : [],
      promo: typeof value.promo === "string" ? value.promo : ""
    };
  }

  function writeCart(cart) {
    saveJSON(CART_KEY, {
      items: [...new Set(cart.items.filter(productBySlug))],
      promo: cart.promo || ""
    });
    updateCartChrome();
  }

  function cartItems() {
    return readCart().items.map(productBySlug).filter(Boolean);
  }

  const PROMOS = {
    GRAM10: { type: "percent", value: 10, label: "−10% за промокодом GRAM10" },
    START50: { type: "fixed", value: 50, label: "−50 ₴ за промокодом START50" }
  };

  function cartTotals() {
    const items = cartItems();
    const subtotal = items.reduce((sum, product) => sum + product.price, 0);
    const cart = readCart();
    const promo = cart.promo && PROMOS[cart.promo] ? PROMOS[cart.promo] : null;
    let discount = 0;
    if (promo && subtotal > 0) {
      discount = promo.type === "percent" ? Math.round((subtotal * promo.value) / 100) : Math.min(promo.value, subtotal);
    }
    return {
      items,
      subtotal,
      discount,
      total: Math.max(0, subtotal - discount),
      promo: promo ? cart.promo : "",
      promoLabel: promo ? promo.label : ""
    };
  }

  function addToCart(slug, options = {}) {
    const product = productBySlug(slug);
    if (!product) return;
    const cart = readCart();
    if (cart.items.includes(slug)) {
      toast(`«${product.title}» уже в кошику.`);
      if (options.openCart) openCart();
      return;
    }
    cart.items.push(slug);
    writeCart(cart);
    track("add_to_cart", { item_id: slug, value: product.price, currency: "UAH" });
    toast(`«${product.title}» додано в кошик.`);
    if (options.openCart) openCart();
  }

  function removeFromCart(slug) {
    const cart = readCart();
    cart.items = cart.items.filter((item) => item !== slug);
    if (!cart.items.length) cart.promo = "";
    writeCart(cart);
    renderCartDrawer();
    if (page === "cart") renderCartPage();
  }

  function clearCart() {
    writeCart({ items: [], promo: "" });
    renderCartDrawer();
  }

  function updateCartChrome() {
    const count = cartItems().length;
    $$("[data-cart-count]").forEach((node) => {
      node.textContent = String(count);
      node.classList.toggle("is-empty", count === 0);
    });
    if (page === "cart") renderCartPage();
  }

  function cartLineHTML(product) {
    return `
      <div class="cart-line">
        <div class="cart-line__cover"><img src="assets/img/${product.cover}-480.jpg" alt="Обкладинка «${product.title}»" width="480" height="600"></div>
        <div>
          <div class="cart-line__title">${product.title}</div>
          <div class="cart-line__meta">PDF · ${product.pages} сторінок</div>
          <button class="cart-line__remove" type="button" data-remove="${product.slug}">${icon("trash")} Прибрати</button>
        </div>
        <div class="cart-line__price">${money(product.price)}</div>
      </div>`;
  }

  function renderCartDrawer() {
    const drawerBody = $("#cartDrawerBody");
    const drawerFoot = $("#cartDrawerFoot");
    if (!drawerBody || !drawerFoot) return;
    const totals = cartTotals();
    if (!totals.items.length) {
      drawerBody.innerHTML = `
        <div class="drawer-empty">
          ${icon("cart")}
          <h3>Поки порожньо</h3>
          <p>Оберіть набір техкарт — і він з’явиться тут.</p>
          <a class="btn btn--primary btn--sm" href="catalog.html">До каталогу</a>
        </div>`;
      drawerFoot.innerHTML = "";
      return;
    }
    drawerBody.innerHTML = totals.items.map(cartLineHTML).join("");
    drawerFoot.innerHTML = `
      <div class="drawer-total"><span>Разом</span><b>${money(totals.total)}</b></div>
      <p class="drawer-note">PDF одразу після оплати · доступ 12 місяців</p>
      <a class="btn btn--primary btn--wide" href="checkout.html">Оформити замовлення ${icon("arrow")}</a>`;
  }

  function openCart() {
    const dialog = $("#cartDrawer");
    if (!dialog) return;
    renderCartDrawer();
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("no-scroll");
  }

  function closeDialog(dialog) {
    if (dialog && dialog.open) dialog.close();
    document.body.classList.remove("no-scroll");
  }

  /* ---------------------------------------------------------
     Toast
     --------------------------------------------------------- */

  function toast(message, type = "success") {
    const stack = $("#toastStack");
    if (!stack) return;
    const node = document.createElement("div");
    node.className = `toast${type === "error" ? " toast--error" : ""}`;
    node.innerHTML = `${icon(type === "error" ? "info" : "check")}<span>${message}</span>`;
    stack.append(node);
    window.setTimeout(() => {
      node.style.opacity = "0";
      node.style.transform = "translateY(6px)";
      window.setTimeout(() => node.remove(), 250);
    }, 3800);
  }

  /* ---------------------------------------------------------
     Cookie banner
     --------------------------------------------------------- */

  function initCookie() {
    if (loadJSON(COOKIE_KEY, null)) return;
    const banner = document.createElement("div");
    banner.className = "cookie";
    banner.innerHTML = `
      <p>Ми використовуємо необхідні cookie для роботи кошика й кабінету. Аналітичні та рекламні скрипти в цьому прототипі не підключені. <a href="privacy.html#cookies">Детальніше</a>.</p>
      <div class="cookie-actions">
        <button class="btn btn--cream" type="button" data-cookie="all">Прийняти всі</button>
        <button class="btn btn--outline" type="button" data-cookie="essential" style="color:var(--cream);border-color:rgba(251,246,240,.3)">Тільки необхідні</button>
        <a class="cookie-more" href="privacy.html#cookies">Налаштування</a>
      </div>`;
    document.body.append(banner);
    banner.addEventListener("click", (event) => {
      const button = event.target.closest("[data-cookie]");
      if (!button) return;
      saveJSON(COOKIE_KEY, { choice: button.dataset.cookie, at: new Date().toISOString() });
      banner.remove();
      toast("Налаштування cookie збережено.");
    });
  }

  /* ---------------------------------------------------------
     Header interactions
     --------------------------------------------------------- */

  function initHeader() {
    const header = $("#siteHeader");
    const menu = $("#mobileMenu");
    const searchDialog = $("#searchDialog");
    const searchInput = $("#globalSearchInput");
    const results = $("#globalSearchResults");

    const onScroll = () => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    $$("[data-cart-open]").forEach((btn) => btn.addEventListener("click", openCart));

    $$("[data-close-dialog]").forEach((btn) => {
      btn.addEventListener("click", () => closeDialog(btn.closest("dialog")));
    });

    $$("dialog").forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) closeDialog(dialog);
      });
      dialog.addEventListener("close", () => document.body.classList.remove("no-scroll"));
    });

    const openMenu = () => {
      if (!menu) return;
      menu.inert = false;
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      const main = $("#main");
      const footer = $(".site-footer");
      if (main) main.inert = true;
      if (footer) footer.inert = true;
      const burger = $("[data-menu-open]");
      if (burger) {
        burger.setAttribute("aria-expanded", "true");
        burger.setAttribute("aria-label", "Закрити меню");
      }
      const first = $(".mobile-menu__links a", menu);
      if (first) first.focus({ preventScroll: true });
    };

    const closeMenu = () => {
      if (!menu) return;
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      menu.inert = true;
      document.body.classList.remove("no-scroll");
      const main = $("#main");
      const footer = $(".site-footer");
      if (main) main.inert = false;
      if (footer) footer.inert = false;
      const burger = $("[data-menu-open]");
      if (burger) {
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Відкрити меню");
        burger.focus({ preventScroll: true });
      }
    };

    $$("[data-menu-open]").forEach((btn) => btn.addEventListener("click", openMenu));
    $$("[data-menu-close]").forEach((btn) => btn.addEventListener("click", closeMenu));
    $$(".mobile-menu__links a").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
      if (!menu || !menu.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = [$("[data-menu-close]", menu), ...$$("a, button", menu)].filter(Boolean);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    $$("[data-search-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!searchDialog) return;
        if (!searchDialog.open) searchDialog.showModal();
        document.body.classList.add("no-scroll");
        if (searchInput) {
          searchInput.value = "";
          searchInput.focus();
        }
        renderSearchResults("");
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", () => renderSearchResults(searchInput.value));
      searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const query = searchInput.value.trim();
          window.location.href = query ? `catalog.html?q=${encodeURIComponent(query)}` : "catalog.html";
        }
      });
    }

    function renderSearchResults(query) {
      if (!results) return;
      const q = query.trim().toLowerCase();
      const matches = q.length < 2
        ? PRODUCTS.slice(0, 4)
        : PRODUCTS.filter((product) => {
            const haystack = [product.title, product.category, product.short, ...product.items.map((item) => item.title)]
              .join(" ")
              .toLowerCase();
            return haystack.includes(q);
          });
      if (!matches.length) {
        results.innerHTML = '<div class="search-empty">Нічого не знайшли. Спробуйте «торти», «муссові» або «без глютену».</div>';
        return;
      }
      results.innerHTML = matches
        .slice(0, 6)
        .map(
          (product) => `
          <a class="search-result" href="product.html?slug=${product.slug}">
            <span><b>${product.title}</b><small>${product.category} · ${product.pages} сторінок</small></span>
            <span>${money(product.price)}</span>
          </a>`
        )
        .join("");
    }

    // Cart drawer remove
    document.addEventListener("click", (event) => {
      const remove = event.target.closest("[data-remove]");
      if (remove) {
        removeFromCart(remove.dataset.remove);
        toast("Набір прибрано з кошика.");
      }
    });
  }

  /* ---------------------------------------------------------
     Reusable markup
     --------------------------------------------------------- */

  function coverHTML(product, options = {}) {
    const index = PRODUCTS.findIndex((item) => item.slug === product.slug) + 1;
    const issue = String(index).padStart(2, "0");
    const loading = options.priority ? "eager" : "lazy";
    const fetchPriority = options.priority ? ' fetchpriority="high"' : "";
    const sizes = options.small ? "(max-width: 700px) 45vw, 240px" : "(max-width: 700px) 92vw, (max-width: 1023px) 44vw, 380px";
    return `
      <div class="cover${options.small ? " cover--small" : ""}">
        <picture>
          <source type="image/webp" srcset="assets/img/${product.cover}-480.webp 480w, assets/img/${product.cover}-720.webp 720w" sizes="${sizes}">
          <img class="cover__img" src="assets/img/${product.cover}-720.jpg" alt="Обкладинка набору «${product.title}» — ${product.recipes} рецептур" width="720" height="900" loading="${loading}"${fetchPriority}>
        </picture>
        <span class="cover__shade"></span>
        <span class="cover__top"><span class="cover__brand">ГРАМ</span><span class="cover__issue">${issue}</span></span>
        <span class="cover__bottom">
          <span class="cover__cat">Технологічні картки</span>
          <strong class="cover__title">${product.title}</strong>
          <span class="cover__meta">${product.recipes} рецептур · ${product.pages} сторінок</span>
        </span>
      </div>`;
  }

  function badgeHTML(product) {
    if (!product.badge) return "";
    const tone = product.badgeTone || "outline";
    return `<span class="card-badge card-badge--${tone}">${product.badge}</span>`;
  }

  function productCardHTML(product) {
    return `
      <article class="product-card">
        <a class="card-cover" href="product.html?slug=${product.slug}" aria-label="Детальніше про набір «${product.title}»">
          ${coverHTML(product)}
          ${badgeHTML(product)}
        </a>
        <div class="card-body">
          <div class="card-meta"><span>${product.category}</span><span>${product.pages} стор.</span></div>
          <h3><a href="product.html?slug=${product.slug}">${product.title}</a></h3>
          <p class="card-desc">${product.short}</p>
          <div class="card-foot">
            <span class="price">${money(product.price)}</span>
            <div class="card-actions">
              <button class="card-add" type="button" data-add="${product.slug}" aria-label="Додати «${product.title}» у кошик">${icon("plus")}</button>
              <a class="card-more" href="product.html?slug=${product.slug}">Детальніше</a>
            </div>
          </div>
        </div>
      </article>`;
  }

  function starsHTML(rating = 5) {
    return `<span class="stars" aria-label="Оцінка ${rating} з 5">${Array.from({ length: 5 }, (_, i) => icon("star", i < rating ? "" : "is-empty")).join("")}</span>`;
  }

  function reviewCardHTML(review) {
    const product = productBySlug(review.product);
    const initials = review.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);
    return `
      <article class="review-card">
        <div class="review-card__top">
          ${starsHTML(review.rating)}
          <span class="review-card__product">${product ? product.title : "Набір"}</span>
        </div>
        <blockquote>«${review.text}»</blockquote>
        <div class="review-card__author">
          <span class="review-avatar" aria-hidden="true">${initials}</span>
          <span><b>${review.name}</b><small>${review.role}</small></span>
          ${review.verified ? `<span class="review-card__verified">${icon("check")} Перевірена покупка</span>` : ""}
        </div>
      </article>`;
  }

  function faqHTML(items, prefix = "faq") {
    return items
      .map(
        (item, index) => `
        <div class="faq-item${index === 0 ? " is-open" : ""}">
          <button class="faq-q" type="button" id="${prefix}-q${index}" aria-expanded="${index === 0}" aria-controls="${prefix}-a${index}">
            <span>${item.q}</span><i class="faq-icon" aria-hidden="true"></i>
          </button>
          <div class="faq-a" id="${prefix}-a${index}" role="region" aria-labelledby="${prefix}-q${index}"${index === 0 ? "" : ' aria-hidden="true"'}>
            <div><p>${item.a}</p></div>
          </div>
        </div>`
      )
      .join("");
  }

  function bindFaq(container) {
    if (!container) return;
    $$(".faq-item", container).forEach((item) => {
      const button = $(".faq-q", item);
      const panel = $(".faq-a", item);
      if (!button || !panel) return;
      const initiallyOpen = item.classList.contains("is-open");
      panel.inert = !initiallyOpen;
      button.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        $$(".faq-item", container).forEach((other) => {
          other.classList.remove("is-open");
          const otherButton = $(".faq-q", other);
          const otherPanel = $(".faq-a", other);
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
          if (otherPanel) {
            otherPanel.setAttribute("aria-hidden", "true");
            otherPanel.inert = true;
          }
        });
        if (!isOpen) {
          item.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
          panel.setAttribute("aria-hidden", "false");
          panel.inert = false;
        }
      });
    });
  }

  function paperSheetHTML(product, type = "recipe") {
    const preview = product.preview || {
      name: product.items[0].title,
      yield: "1 десерт · 1,2 кг",
      time: "2 год 30 хв",
      ingredients: [
        ["Борошно пшеничне", "160", "160"],
        ["Цукор", "180", "180"],
        ["Масло 82,5%", "140", "140"],
        ["Яйця", "160", "160"],
        ["Сметана 20%", "90", "90"],
        ["Розпушувач", "4", "4"]
      ],
      steps: [
        "Підготувати інгредієнти за температури 20–22 °C. Збити масло з цукром.",
        "Поступово ввести яйця та сухі складники. Не перемішувати занадто довго.",
        "Випікати за 175 °C 32–35 хв. Перевірити сухою шпажкою, охолодити."
      ],
      cost: [
        ["Сировина", "186 ₴"],
        ["Робота", "154 ₴"],
        ["Рекомендована ціна", "590 ₴"]
      ]
    };

    const top = `
      <div class="paper-sheet__top">
        <span class="paper-sheet__logo">ГРАМ.</span>
        <span class="paper-sheet__type">Технологічна картка<br>${product.recipes} рецептур · ${product.pages} стор.</span>
      </div>
      <div class="paper-sheet__title">${preview.name}</div>
      <div class="paper-sheet__meta">${product.title} · ${preview.yield} · ${preview.time}</div>
      <div class="paper-sheet__photo"><img src="assets/img/${product.cover}-480.jpg" alt="" width="480" height="600"></div>`;

    if (type === "recipe") {
      return `<div class="paper-sheet">${top}
        <div class="paper-sheet__section">Рецептура · брутто / нетто, г</div>
        <div class="paper-table">
          <div class="paper-table__row"><span>Інгредієнт</span><span>Брутто</span><span>Нетто</span></div>
          ${preview.ingredients.map((row) => `<div class="paper-table__row"><span>${row[0]}</span><span>${row[1]}</span><span>${row[2]}</span></div>`).join("")}
        </div>
        <div class="paper-sheet__section">Вихід</div>
        <div class="paper-sheet__cost"><div class="paper-sheet__cost-row"><span>Вихід готового виробу</span><b>${preview.yield}</b></div></div>
      </div>`;
    }

    if (type === "method") {
      return `<div class="paper-sheet">${top}
        <div class="paper-sheet__section">Технологія</div>
        <div class="paper-sheet__steps">
          ${preview.steps.map((step, index) => `<div class="paper-sheet__step"><b>${index + 1}</b><span>${step}</span></div>`).join("")}
        </div>
        <div class="paper-sheet__section">Критерії готовності</div>
        <div class="paper-sheet__cost">
          <div class="paper-sheet__cost-row"><span>Температура в центрі</span><b>96–98 °C</b></div>
          <div class="paper-sheet__cost-row"><span>Охолодження</span><b>4 год за 4 °C</b></div>
        </div>
        <div class="paper-sheet__section">Зберігання</div>
        <div class="paper-line"></div><div class="paper-line short"></div>
      </div>`;
    }

    return `<div class="paper-sheet">${top}
      <div class="paper-sheet__section">Собівартість</div>
      <div class="paper-table">
        ${preview.cost.map((row) => `<div class="paper-table__row"><span>${row[0]}</span><span></span><span>${row[1]}</span></div>`).join("")}
      </div>
      <div class="paper-sheet__section">Розрахунок</div>
      <div class="paper-sheet__step"><b>i</b><span>Собівартість порахована за середніми цінами інгредієнтів на жовтень 2026 року. Ви можете замінити ціни у своїй копії.</span></div>
      <div class="paper-line"></div><div class="paper-line short"></div>
    </div>`;
  }

  /* ---------------------------------------------------------
     Home
     --------------------------------------------------------- */

  function initHome() {
    addJsonLd({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ГРАМ",
      url: window.location.origin,
      description: "Технологічні картки для кондитерів: рецептури, технологія та собівартість.",
      sameAs: [SITE.telegram, SITE.instagram]
    });

    const heroMain = $("#heroMainCover");
    const heroBack = $("#heroBackCover");
    if (heroMain && productBySlug("torty")) heroMain.innerHTML = coverHTML(productBySlug("torty"), { priority: true });
    if (heroBack && productBySlug("mousse")) heroBack.innerHTML = coverHTML(productBySlug("mousse"));

    const grid = $("#homeGrid");
    if (grid) grid.innerHTML = PRODUCTS.map(productCardHTML).join("");

    const reviews = $("#homeReviews");
    if (reviews) reviews.innerHTML = REVIEWS.slice(0, 3).map(reviewCardHTML).join("");

    const faq = $("#homeFaq");
    if (faq) {
      faq.innerHTML = faqHTML(FAQ.slice(0, 6), "home-faq");
      bindFaq(faq);
    }

    $$("[data-buy]").forEach((button) => {
      button.addEventListener("click", () => {
        addToCart(button.dataset.buy);
        window.location.href = "checkout.html";
      });
    });
  }

  /* ---------------------------------------------------------
     Catalog
     --------------------------------------------------------- */

  function initCatalog() {
    const grid = $("#catalogGrid");
    const count = $("#resultCount");
    const empty = $("#catalogEmpty");
    const active = $("#activeFilters");
    const search = $("#catalogSearch");
    const sort = $("#catalogSort");
    const suggest = $("#searchSuggest");
    const filters = $("#filtersPanel");
    const filterOverlay = $("#filtersOverlay");
    const maxPrice = $("#maxPrice");
    const maxPriceLabel = $("#maxPriceLabel");
    if (!grid) return;

    const initial = params();
    const state = {
      categories: (initial.get("category") || "").split(",").filter(Boolean),
      levels: (initial.get("level") || "").split(",").filter(Boolean),
      tags: (initial.get("tag") || "").split(",").filter(Boolean),
      q: initial.get("q") || "",
      max: Number(initial.get("max") || 1000),
      sort: initial.get("sort") || "popular"
    };

    if (search) search.value = state.q;
    if (sort) sort.value = state.sort;
    if (maxPrice) maxPrice.value = String(state.max);
    if (maxPriceLabel) maxPriceLabel.textContent = money(state.max);

    const filterGroups = $$("[data-filter-group]", filters);
    filterGroups.forEach((group) => {
      const type = group.dataset.filterGroup;
      $$("input[type=checkbox]", group).forEach((input) => {
        const value = input.value;
        const list = type === "category" ? state.categories : type === "level" ? state.levels : state.tags;
        input.checked = list.includes(value);
        input.addEventListener("change", () => {
          const current = type === "category" ? state.categories : type === "level" ? state.levels : state.tags;
          if (input.checked && !current.includes(value)) current.push(value);
          if (!input.checked) {
            const index = current.indexOf(value);
            if (index >= 0) current.splice(index, 1);
          }
          apply();
        });
      });
    });

    if (maxPrice) {
      maxPrice.addEventListener("input", () => {
        state.max = Number(maxPrice.value);
        if (maxPriceLabel) maxPriceLabel.textContent = money(state.max);
        apply();
      });
    }

    if (sort) {
      sort.addEventListener("change", () => {
        state.sort = sort.value;
        apply();
      });
    }

    if (search) {
      let timer = 0;
      search.addEventListener("input", () => {
        state.q = search.value;
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          apply();
          renderSuggest();
        }, 160);
      });
      search.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          apply();
          if (suggest) suggest.innerHTML = "";
        }
      });
      search.addEventListener("blur", () => window.setTimeout(() => { if (suggest) suggest.innerHTML = ""; }, 160));
    }

    function renderSuggest() {
      if (!suggest) return;
      const q = state.q.trim().toLowerCase();
      if (q.length < 2) {
        suggest.innerHTML = "";
        return;
      }
      const matches = PRODUCTS.filter((product) =>
        [product.title, product.category, product.short, ...product.items.map((item) => item.title)]
          .join(" ")
          .toLowerCase()
          .includes(q)
      ).slice(0, 4);
      suggest.innerHTML = matches.length
        ? matches.map((product) => `<a href="product.html?slug=${product.slug}"><span>${product.title}</span><small>${product.pages} стор.</small></a>`).join("")
        : `<div class="search-empty" style="padding:10px">Нічого не знайшли</div>`;
    }

    function filtered() {
      let list = PRODUCTS.filter((product) => {
        if (state.categories.length && !state.categories.includes(product.slug)) return false;
        if (state.levels.length && !state.levels.includes(product.level)) return false;
        if (state.tags.length && !state.tags.every((tag) => product.tags.includes(tag))) return false;
        if (product.price > state.max) return false;
        if (state.q.trim()) {
          const q = state.q.trim().toLowerCase();
          const haystack = [product.title, product.category, product.short, ...product.items.map((item) => item.title)]
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      });
      if (state.sort === "new") list = [...list].reverse();
      if (state.sort === "price-asc" || state.sort === "price-desc") {
        list = [...list].sort((a, b) => state.sort === "price-asc" ? a.price - b.price : b.price - a.price);
      }
      return list;
    }

    function updateURL() {
      const next = new URLSearchParams();
      if (state.categories.length) next.set("category", state.categories.join(","));
      if (state.levels.length) next.set("level", state.levels.join(","));
      if (state.tags.length) next.set("tag", state.tags.join(","));
      if (state.q.trim()) next.set("q", state.q.trim());
      if (state.max < 1000) next.set("max", String(state.max));
      if (state.sort !== "popular") next.set("sort", state.sort);
      const url = `${window.location.pathname}${next.toString() ? `?${next.toString()}` : ""}`;
      window.history.replaceState({}, "", url);
    }

    function renderActive() {
      if (!active) return;
      const chips = [];
      state.categories.forEach((slug) => {
        const category = PRODUCTS.find((p) => p.slug === slug);
        chips.push({ label: category ? category.title : slug, type: "category", value: slug });
      });
      state.levels.forEach((level) => chips.push({ label: level, type: "level", value: level }));
      state.tags.forEach((tag) => chips.push({ label: tag, type: "tag", value: tag }));
      if (state.max < 1000) chips.push({ label: `до ${money(state.max)}`, type: "max", value: String(state.max) });
      if (state.q.trim()) chips.push({ label: `«${state.q.trim()}»`, type: "q", value: state.q.trim() });
      active.innerHTML = chips
        .map((chip) => `<span class="chip">${chip.label}<button type="button" data-chip-type="${chip.type}" data-chip-value="${chip.value}" aria-label="Прибрати фільтр ${chip.label}">${icon("close")}</button></span>`)
        .join("");
      $$(".chip button", active).forEach((button) => {
        button.addEventListener("click", () => {
          const type = button.dataset.chipType;
          const value = button.dataset.chipValue;
          if (type === "category") state.categories = state.categories.filter((item) => item !== value);
          if (type === "level") state.levels = state.levels.filter((item) => item !== value);
          if (type === "tag") state.tags = state.tags.filter((item) => item !== value);
          if (type === "max") state.max = 1000;
          if (type === "q") { state.q = ""; if (search) search.value = ""; }
          syncInputs();
          apply();
        });
      });
    }

    function syncInputs() {
      filterGroups.forEach((group) => {
        const type = group.dataset.filterGroup;
        const list = type === "category" ? state.categories : type === "level" ? state.levels : state.tags;
        $$("input[type=checkbox]", group).forEach((input) => {
          input.checked = list.includes(input.value);
        });
      });
      if (maxPrice) maxPrice.value = String(state.max);
      if (maxPriceLabel) maxPriceLabel.textContent = money(state.max);
      if (search) search.value = state.q;
      if (sort) sort.value = state.sort;
    }

    function apply() {
      const list = filtered();
      grid.innerHTML = list.map(productCardHTML).join("");
      if (count) count.textContent = `${list.length} ${plural(list.length, ["набір", "набори", "наборів"])}`;
      if (empty) empty.hidden = list.length > 0;
      renderActive();
      updateURL();
    }

    $$("[data-reset-filters]").forEach((button) => {
      button.addEventListener("click", () => {
        state.categories = [];
        state.levels = [];
        state.tags = [];
        state.q = "";
        state.max = 1000;
        state.sort = "popular";
        syncInputs();
        apply();
      });
    });

    const openFilters = () => {
      document.body.classList.add("filters-open", "no-scroll");
    };
    const closeFilters = () => {
      document.body.classList.remove("filters-open", "no-scroll");
    };
    $$("[data-filters-open]").forEach((button) => button.addEventListener("click", openFilters));
    $$("[data-filters-close]").forEach((button) => button.addEventListener("click", closeFilters));
    if (filterOverlay) filterOverlay.addEventListener("click", closeFilters);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeFilters();
    });

    apply();
  }

  /* ---------------------------------------------------------
     Product
     --------------------------------------------------------- */

  function initProduct() {
    const root = $("#productRoot");
    if (!root) return;
    const slug = params().get("slug") || "torty";
    const product = productBySlug(slug);
    if (!product) {
      root.innerHTML = `
        <div class="empty-state" style="margin:40px 0">
          <h2>Набір не знайдено</h2>
          <p>Можливо, посилання застаріло. Перегляньте актуальний каталог.</p>
          <a class="btn btn--primary" href="catalog.html">До каталогу ${icon("arrow")}</a>
        </div>`;
      return;
    }

    document.title = `${product.title} — технологічні картки ГРАМ`;
    track("view_item", { item_id: product.slug, price: product.price, currency: "UAH" });
    const meta = $('meta[name="description"]');
    if (meta) meta.setAttribute("content", `${product.short} Ціна ${money(product.price)}. PDF одразу після оплати, доступ 12 місяців.`);
    setMeta("property", "og:title", `${product.title} — технологічні картки ГРАМ`);
    setMeta("property", "og:description", `${product.short} Ціна ${money(product.price)}.`);
    setMeta("property", "og:type", "product");
    setMeta("property", "og:image", new URL(`assets/img/${product.cover}-720.jpg`, window.location.href).href);

    const gallery = [
      { type: "cover", label: "Обкладинка", html: coverHTML(product, { priority: true }) },
      { type: "recipe", label: "Рецептура", html: paperSheetHTML(product, "recipe") },
      { type: "method", label: "Технологія", html: paperSheetHTML(product, "method") },
      { type: "cost", label: "Собівартість", html: paperSheetHTML(product, "cost") }
    ];

    const related = PRODUCTS.filter((item) => item.slug !== product.slug).slice(0, 3);
    const productReviews = REVIEWS.filter((review) => review.product === product.slug).slice(0, 3);

    root.innerHTML = `
      <div class="breadcrumbs" aria-label="Хлібні крихти">
        <a href="index.html">Головна</a><span class="sep">/</span>
        <a href="catalog.html">Набори</a><span class="sep">/</span>
        <span aria-current="page">${product.title}</span>
      </div>
      <div class="product-top">
        <div class="gallery">
          <div class="gallery-main" id="galleryMain">${gallery[0].html}</div>
          <div class="gallery-thumbs" role="tablist" aria-label="Перегляд набору">
            ${gallery.map((item, index) => {
              const thumb = item.type === "cover"
                ? `<img src="assets/img/${product.cover}-480.jpg" alt="" width="480" height="600">`
                : `<span class="mini-paper"></span>`;
              return `<button class="gallery-thumb${index === 0 ? " is-active" : ""}${item.type === "cover" ? "" : " gallery-thumb--paper"}" type="button" role="tab" aria-selected="${index === 0}" data-gallery="${index}" aria-label="${item.label}">${thumb}<span class="gallery-thumb__label">${item.label}</span></button>`;
            }).join("")}
          </div>
          <button class="text-link mt-16" type="button" id="openPreview">${icon("file")} Подивитися 2 сторінки</button>
        </div>
        <aside class="buybox">
          <div class="buybox__badges">
            <span class="pill pill--dark">${product.category}</span>
            <span class="pill">${product.level}</span>
            <span class="pill pill--gold">Оновлено: ${product.updated}</span>
          </div>
          <h1>${product.title}</h1>
          <p class="buybox__tagline">${product.tagline}</p>
          <div class="buybox__rating">${starsHTML(5)} <span class="rating">4,9 · ${productReviews.length || 3} ${plural(productReviews.length || 3, ["відгук", "відгуки", "відгуків"])}</span></div>
          <p class="buybox__short">${product.short}</p>
          <div class="buybox__price">
            <span class="price">${money(product.price)}</span>
            <small>за один набір · PDF</small>
          </div>
          <div class="buybox__actions">
            <button class="btn btn--primary" type="button" data-buy-product="${product.slug}">Купити за ${money(product.price)} ${icon("arrow")}</button>
            <button class="btn btn--outline" type="button" data-add-product="${product.slug}">${icon("cart")} Додати в кошик</button>
          </div>
          <p class="buybox__note">${icon("check")} PDF одразу після оплати · доступ 12 місяців</p>
          <ul class="buybox__benefits">
            <li>${icon("file")} ${product.pages} сторінок, ${product.recipes} рецептур</li>
            <li>${icon("refresh")} Безкоштовні оновлення</li>
            <li>${icon("download")} Скачування без обмежень</li>
            <li>${icon("shield")} Використання у своєму закладі</li>
          </ul>
          <div class="buybox__pay">
            <span>VISA</span><span>Mastercard</span><span>Apple Pay</span><span>Google Pay</span>
          </div>
        </aside>
      </div>

      <div class="product-sections">
        <section class="product-section" id="contents">
          <div class="product-section__head">
            <div><span class="kicker">Склад</span><h2>Що входить у набір</h2></div>
            <span class="page-head__count">${product.pages} сторінок · ${product.recipes} рецептур</span>
          </div>
          <div class="contents-list">
            ${product.items.map((item, index) => `
              <div class="content-row">
                <span class="content-row__num">${String(index + 1).padStart(2, "0")}</span>
                <div><b>${item.title}</b><p>${item.description}</p></div>
                <span class="content-row__pages">${item.pages} стор.</span>
              </div>`).join("")}
          </div>
        </section>

        <section class="product-section">
          <div class="product-section__head"><div><span class="kicker">Для кого</span><h2>Кому підійде цей набір</h2></div></div>
          <div class="audience-mini">${product.audience.map((text) => `<div>${text}</div>`).join("")}</div>
        </section>

        <section class="product-section" id="format">
          <div class="product-section__head"><div><span class="kicker">Формат</span><h2>Формат і доставка</h2></div></div>
          <div class="info-grid">
            <div class="info-card">${icon("file")}<b>PDF · A4</b><span>${product.pages} сторінок, текстові, з грамуванням</span></div>
            <div class="info-card">${icon("download")}<b>Одразу після оплати</b><span>Кнопка на сторінці «Дякуємо» та в кабінеті</span></div>
            <div class="info-card">${icon("clock")}<b>Доступ 12 місяців</b><span>Повторне завантаження без обмежень</span></div>
            <div class="info-card">${icon("refresh")}<b>Оновлення</b><span>Нова версія з’являється автоматично</span></div>
          </div>
          <div class="update-card mt-16">
            <div><b>Оновлено: ${product.updated}</b><p>Купуєте один раз — отримуєте всі наступні версії цього набору безкоштовно.</p></div>
            <a class="text-link" href="faq.html">Про оновлення ${icon("arrow")}</a>
          </div>
        </section>

        <section class="product-section" id="reviews">
          <div class="product-section__head">
            <div><span class="kicker">Відгуки</span><h2>Що кажуть покупці</h2></div>
            <a class="text-link" href="reviews.html">Усі відгуки ${icon("arrow")}</a>
          </div>
          <div class="review-grid">${(productReviews.length ? productReviews : REVIEWS.slice(0, 3)).map(reviewCardHTML).join("")}</div>
        </section>

        <section class="product-section">
          <div class="product-section__head"><div><span class="kicker">Також</span><h2>Схожі набори</h2></div></div>
          <div class="cards-grid">${related.map(productCardHTML).join("")}</div>
        </section>
      </div>

      <div class="sticky-buy" id="stickyBuy">
        <div class="sticky-buy__price">${money(product.price)}<small>за набір · PDF</small></div>
        <button class="btn btn--primary" type="button" data-buy-product="${product.slug}">Купити ${icon("arrow")}</button>
      </div>`;

    // Gallery
    const main = $("#galleryMain");
    $$("[data-gallery]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.gallery);
        const item = gallery[index];
        if (!main || !item) return;
        main.innerHTML = item.type === "cover" ? item.html : `<div class="gallery-stage-paper">${item.html}</div>`;
        $$("[data-gallery]").forEach((other) => {
          other.classList.toggle("is-active", other === button);
          other.setAttribute("aria-selected", String(other === button));
        });
      });
    });

    // Preview modal
    const preview = $("#openPreview");
    if (preview) {
      preview.addEventListener("click", () => {
        const dialog = document.createElement("dialog");
        dialog.className = "preview-dialog";
        dialog.innerHTML = `
          <div class="preview-dialog__head"><h2>${product.title} — розворот</h2><button class="icon-btn" type="button" aria-label="Закрити">${icon("close")}</button></div>
          <div class="preview-dialog__body">
            ${paperSheetHTML(product, "recipe")}
            ${paperSheetHTML(product, "method")}
            <p class="preview-dialog__note">Демонстраційні сторінки. Повний PDF — ${product.pages} сторінок — доступний після оплати.</p>
          </div>`;
        document.body.append(dialog);
        dialog.showModal();
        document.body.classList.add("no-scroll");
        $("[aria-label='Закрити']", dialog).addEventListener("click", () => {
          dialog.close();
          dialog.remove();
          document.body.classList.remove("no-scroll");
        });
        dialog.addEventListener("click", (event) => {
          if (event.target === dialog) {
            dialog.close();
            dialog.remove();
            document.body.classList.remove("no-scroll");
          }
        });
        dialog.addEventListener("close", () => {
          dialog.remove();
          document.body.classList.remove("no-scroll");
        });
      });
    }

    // Buy / add
    $$("[data-buy-product]").forEach((button) => {
      button.addEventListener("click", () => {
        const cart = readCart();
        if (!cart.items.includes(product.slug)) {
          cart.items.push(product.slug);
          writeCart(cart);
        }
        window.location.href = "checkout.html";
      });
    });
    $$("[data-add-product]").forEach((button) => {
      button.addEventListener("click", () => addToCart(product.slug));
    });

    // Sticky mobile buy
    const buybox = $(".buybox");
    const sticky = $("#stickyBuy");
    if (buybox && sticky) {
      const updateSticky = () => {
        const show = window.scrollY > 700;
        sticky.classList.toggle("is-visible", show);
      };
      window.addEventListener("scroll", updateSticky, { passive: true });
      window.addEventListener("resize", updateSticky);
      updateSticky();
    }

    // Product structured data
    addJsonLd({
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Набір техкарт «${product.title}»`,
      description: product.short,
      image: new URL(`assets/img/${product.cover}-720.jpg`, window.location.href).href,
      brand: { "@type": "Brand", name: "ГРАМ" },
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "UAH",
        availability: "https://schema.org/InStock",
        url: window.location.href
      }
    });
    addJsonLd({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Головна", item: new URL("index.html", window.location.href).href },
        { "@type": "ListItem", position: 2, name: "Набори", item: new URL("catalog.html", window.location.href).href },
        { "@type": "ListItem", position: 3, name: product.title, item: window.location.href }
      ]
    });
  }

  /* ---------------------------------------------------------
     Cart page
     --------------------------------------------------------- */

  function initCartPage() {
    renderCartPage();
  }

  function renderCartPage() {
    const root = $("#cartRoot");
    if (!root) return;
    const totals = cartTotals();
    if (!totals.items.length) {
      root.innerHTML = `
        <div class="cart-empty">
          <h2>Кошик порожній</h2>
          <p>Оберіть набір техкарт — і почнемо. Усі набори по ${money(SITE.price)}, PDF одразу після оплати.</p>
          <a class="btn btn--primary" href="catalog.html">Обрати набір ${icon("arrow")}</a>
        </div>`;
      return;
    }

    root.innerHTML = `
      <div class="cart-layout">
        <div>
          <div class="cart-list">
            ${totals.items.map((product) => `
              <div class="cart-row">
                <a class="cart-row__cover" href="product.html?slug=${product.slug}"><img src="assets/img/${product.cover}-480.jpg" alt="Обкладинка «${product.title}»" width="480" height="600"></a>
                <div>
                  <h2><a href="product.html?slug=${product.slug}">${product.title}</a></h2>
                  <p>PDF · ${product.pages} сторінок · ${product.recipes} рецептур</p>
                  <button class="cart-row__remove" type="button" data-remove="${product.slug}">Прибрати</button>
                </div>
                <span class="cart-row__price">${money(product.price)}</span>
              </div>`).join("")}
          </div>
          <div class="cross-sell">
            <h2>Додайте до замовлення</h2>
            <div class="cards-grid">${PRODUCTS.filter((p) => !totals.items.some((item) => item.slug === p.slug)).slice(0, 3).map(productCardHTML).join("")}</div>
          </div>
        </div>
        <aside class="cart-summary">
          <h2>Разом</h2>
          <div class="summary-lines">
            <div class="summary-line"><span>Набори (${totals.items.length})</span><b>${money(totals.subtotal)}</b></div>
            <div class="summary-line"><span>Доставка</span><b>0 ₴</b></div>
            ${totals.discount ? `<div class="summary-line"><span>${totals.promoLabel}</span><b>−${money(totals.discount)}</b></div>` : ""}
          </div>
          <div class="summary-total"><span>До сплати</span><span>${money(totals.total)}</span></div>
          <a class="btn btn--primary" href="checkout.html">Оформити замовлення ${icon("arrow")}</a>
          <p class="summary-note">${icon("lock")} Оплата на стороні банку. PDF одразу після підтвердження.</p>
          <div class="promo">
            <label for="promoInput">Промокод</label>
            <div class="promo__row">
              <input id="promoInput" type="text" placeholder="Наприклад, GRAM10" autocomplete="off">
              <button type="button" id="applyPromo">Застосувати</button>
            </div>
            <p class="promo-message" id="promoMessage">${totals.promo ? "Промокод застосовано." : ""}</p>
          </div>
        </aside>
      </div>`;

    const promoButton = $("#applyPromo");
    if (promoButton) {
      promoButton.addEventListener("click", () => {
        const input = $("#promoInput");
        const message = $("#promoMessage");
        const code = (input ? input.value : "").trim().toUpperCase();
        const cart = readCart();
        if (PROMOS[code]) {
          cart.promo = code;
          writeCart(cart);
          renderCartPage();
          const freshMessage = $("#promoMessage");
          if (freshMessage) {
            freshMessage.textContent = `Промокод ${code} застосовано.`;
            freshMessage.classList.remove("is-error");
          }
          toast(`Промокод ${code} застосовано.`);
        } else {
          if (message) {
            message.textContent = "Такого промокоду немає. Перевірте написання.";
            message.classList.add("is-error");
          }
        }
      });
    }
  }

  /* ---------------------------------------------------------
     Checkout
     --------------------------------------------------------- */

  function initCheckout() {
    const summary = $("#checkoutSummary");
    const items = $("#checkoutItems");
    const totalNode = $("#checkoutTotal");
    const form = $("#checkoutForm");
    const payBtn = $("#payButton");
    if (!form || !summary) return;
    const totals = cartTotals();
    if (!totals.items.length) {
      const root = $("#checkoutRoot");
      if (root) {
        root.innerHTML = `
          <div class="cart-empty">
            <h2>Кошик порожній</h2>
            <p>Спочатку оберіть набір технологічних карт — після цього поверніться до оформлення.</p>
            <a class="btn btn--primary" href="catalog.html">До каталогу ${icon("arrow")}</a>
          </div>`;
      }
      return;
    }

    if (items) {
      items.innerHTML = totals.items.map((product) => `
        <div class="checkout-item">
          <div class="checkout-item__cover"><img src="assets/img/${product.cover}-480.jpg" alt="" width="480" height="600"></div>
          <div><b>${product.title}</b><small>PDF · ${product.pages} сторінок</small></div>
          <span>${money(product.price)}</span>
        </div>`).join("");
    }
    if (totalNode) totalNode.textContent = money(totals.total);
    track("begin_checkout", { value: totals.total, items: totals.items.map((item) => item.slug) });

    const summaryLines = $(".checkout-summary .summary-lines");
    if (summaryLines) {
      summaryLines.insertAdjacentHTML(
        "afterbegin",
        `<div class="summary-line"><span>Набори (${totals.items.length})</span><b>${money(totals.subtotal)}</b></div>${
          totals.discount
            ? `<div class="summary-line"><span>${totals.promoLabel}</span><b>−${money(totals.discount)}</b></div>`
            : ""
        }`
      );
    }

    const offer = $("#offerCheck");
    const payLabel = $("#payLabel");
    const methods = $$("input[name=payment]");
    const updatePayButton = () => {
      if (!payBtn) return;
      const method = methods.find((input) => input.checked)?.value || "card";
      const labels = {
        card: `Оплатити ${money(totals.total)}`,
        apple: "Оплатити Apple Pay",
        google: "Оплатити Google Pay",
        iban: "Отримати рахунок"
      };
      if (payLabel) payLabel.textContent = labels[method] || labels.card;
      payBtn.disabled = !(offer && offer.checked);
    };
    if (offer) offer.addEventListener("change", updatePayButton);
    methods.forEach((input) => input.addEventListener("change", updatePayButton));
    updatePayButton();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = $("#emailField");
      const name = $("#nameField");
      const phone = $("#phoneField");
      const comment = $("#commentField");
      let valid = true;

      const setError = (field, message) => {
        const wrapper = field.closest(".field");
        const error = wrapper ? $(".field-error", wrapper) : null;
        if (wrapper) wrapper.classList.toggle("has-error", Boolean(message));
        if (error) error.textContent = message || "";
        field.setAttribute("aria-invalid", message ? "true" : "false");
        if (message) valid = false;
      };

      setError(email, "");
      setError(phone, "");
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        setError(email, "Вкажіть коректний email — на нього надійдуть файли та чек.");
      }
      if (phone.value.trim() && !/^\+?380\d{9}$/.test(phone.value.replace(/\s/g, ""))) {
        setError(phone, "Телефон у форматі +380 XX XXX XX XX.");
      }
      if (!offer.checked) {
        toast("Підтвердьте згоду з офертою.", "error");
        offer.focus();
        valid = false;
      }
      if (!valid) {
        const firstError = $(".field.has-error .input");
        if (firstError) firstError.focus();
        return;
      }

      const method = methods.find((input) => input.checked)?.value || "card";
      openPaymentDialog({
        email: email.value.trim(),
        name: name.value.trim(),
        phone: phone.value.trim(),
        comment: comment.value.trim(),
        method,
        totals
      });
    });
  }

  function openPaymentDialog(payload) {
    const methodLabels = {
      card: "LiqPay · картка",
      apple: "Apple Pay",
      google: "Google Pay",
      iban: "Оплата за реквізитами"
    };
    const dialog = document.createElement("dialog");
    dialog.className = "payment-dialog";
    dialog.innerHTML = `
      <div class="payment-dialog__inner">
        <div class="payment-dialog__brand">${icon(methodIcon(payload.method))} ${methodLabels[payload.method]}</div>
        <h2>${payload.method === "iban" ? "Рахунок для оплати" : "Тестова оплата"}</h2>
        <p>${payload.method === "iban"
          ? "Ми створимо замовлення зі статусом «очікує оплати». Реквізити надійдуть на email, файли відкриються після підтвердження."
          : "Це демонстраційний прототип. Реальні кошти не списуються, дані картки не вводяться."}</p>
        <div class="payment-amount"><span>До сплати</span><b>${money(payload.totals.total)}</b></div>
        <div class="payment-dialog__actions">
          <button class="btn btn--primary" type="button" id="confirmPayment">${payload.method === "iban" ? "Створити рахунок" : "Підтвердити тестову оплату"} ${icon("arrow")}</button>
          <button class="btn btn--outline" type="button" data-cancel-payment>Скасувати</button>
        </div>
        <p class="payment-demo-note">Демо-режим · без реального списання · дані не передаються</p>
      </div>`;
    document.body.append(dialog);
    dialog.showModal();
    document.body.classList.add("no-scroll");

    const close = () => {
      dialog.close();
      dialog.remove();
      document.body.classList.remove("no-scroll");
    };
    $$("[data-cancel-payment]", dialog).forEach((button) => button.addEventListener("click", close));
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) close();
    });
    dialog.addEventListener("close", () => {
      dialog.remove();
      document.body.classList.remove("no-scroll");
    });

    const confirm = $("#confirmPayment", dialog);
    confirm.addEventListener("click", () => {
      confirm.disabled = true;
      confirm.textContent = "Створюємо замовлення…";
      window.setTimeout(() => {
        const order = createOrder({ ...payload, totals: cartTotals() });
        clearCart();
        close();
        window.location.href = `thank-you.html?order=${encodeURIComponent(order.number)}`;
      }, 900);
    });
  }

  function methodIcon(method) {
    if (method === "apple") return "apple";
    if (method === "google") return "google";
    if (method === "iban") return "file";
    return "card";
  }

  function readOrders() {
    return loadJSON(ORDERS_KEY, []);
  }

  function saveOrders(orders) {
    saveJSON(ORDERS_KEY, orders);
  }

  function createOrder(payload) {
    const totals = payload.totals;
    const date = new Date();
    const number = `TK-${date.getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const order = {
      number,
      email: payload.email,
      name: payload.name || "",
      phone: payload.phone || "",
      comment: payload.comment || "",
      method: payload.method,
      status: "pending",
      items: totals.items.map((product) => ({ slug: product.slug, title: product.title, price: product.price, pages: product.pages })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      total: totals.total,
      promo: totals.promo || "",
      createdAt: date.toISOString(),
      paidAt: null
    };
    const orders = readOrders();
    orders.unshift(order);
    saveOrders(orders);
    return order;
  }

  function initThankYou() {
    const root = $("#thankYouRoot");
    if (!root) return;
    const number = params().get("order");
    const orders = readOrders();
    const order = number ? orders.find((item) => item.number === number) : orders[0];
    if (!order) {
      root.innerHTML = `
        <div class="thanks-inner">
          <div class="success-mark">${icon("info")}</div>
          <h1>Замовлення не знайдено</h1>
          <p class="thanks__lead">Можливо, ви відкрили демонстраційну сторінку без оформлення замовлення. Це нормально — почніть із каталогу.</p>
          <div class="thanks-actions">
            <a class="btn btn--primary" href="catalog.html">Обрати набір ${icon("arrow")}</a>
            <a class="btn btn--outline" href="account.html">Кабінет</a>
          </div>
        </div>`;
      return;
    }

    const render = (current) => {
      const paid = current.status === "paid";
      if (paid) {
        const trackedKey = `gram_purchase_${current.number}`;
        try {
          if (!sessionStorage.getItem(trackedKey)) {
            track("purchase", { transaction_id: current.number, value: current.total, currency: "UAH" });
            sessionStorage.setItem(trackedKey, "1");
          }
        } catch (error) {
          /* noop */
        }
      }
      root.innerHTML = `
        <div class="thanks-inner">
          <div class="success-mark">${icon(paid ? "check" : "clock")}</div>
          <span class="status-pill ${paid ? "" : "status-pill--wait"}">${paid ? "Оплачено" : "Очікує оплати"}</span>
          <h1>${paid ? "Дякуємо! Файли вже у вашому кабінеті" : "Замовлення створено"}</h1>
          <p class="thanks__lead">${paid
            ? `Лист із посиланням надіслано на ${current.email}. Завантажте PDF нижче або поверніться пізніше — доступ збережеться на 12 місяців.`
            : `Рахунок для оплати надіслано на ${current.email}. Після надходження коштів файли автоматично з’являться в кабінеті.`}</p>
          <div class="thanks-card">
            <div class="thanks-card__head">
              <div><b>Замовлення ${current.number}</b><small>${formatDate(current.createdAt)} · ${current.method === "iban" ? "Оплата за реквізитами" : "Оплата карткою"}</small></div>
              <span class="status-pill ${paid ? "" : "status-pill--wait"}">${paid ? "Готово до завантаження" : "Очікує оплати"}</span>
            </div>
            ${paid ? `<div class="download-list">${current.items.map((item) => {
              const product = productBySlug(item.slug);
              return `<div class="download-row">
                <div class="download-row__cover"><img src="assets/img/${product ? product.cover : "cover-torty"}-480.jpg" alt="" width="480" height="600"></div>
                <div><b>${item.title}</b><small>PDF · ${item.pages} сторінок · доступ 12 місяців</small></div>
                <a class="btn btn--dark" href="${DEMO_FILE}" download>${icon("download")} Завантажити</a>
              </div>`;
            }).join("")}</div>` : `<div class="demo-note mt-16">Реквізити для оплати: отримувач ${SITE.legalName}, IBAN UA00 0000 0000 0000 0000 0000 000, призначення — ${current.number}. Це демонстраційні реквізити.</div>`}
            <div class="thanks-card__head" style="margin-top:14px;padding-top:14px;border-top:1px solid var(--line);border-bottom:0;padding-bottom:0">
              <div><b>${money(current.total)}</b><small>${current.discount ? `Знижка ${money(current.discount)} · промокод ${current.promo}` : "Без знижки"} · ${current.items.length} ${plural(current.items.length, ["набір", "набори", "наборів"])}</small></div>
              <a class="text-link" href="account.html">Відкрити кабінет ${icon("arrow")}</a>
            </div>
          </div>
          <div class="thanks-next">
            <div><b>1. Завантажте PDF</b>Файл доступний одразу та в кабінеті.</div>
            <div><b>2. Перевірте пошту</b>Лист із посиланням і чеком надіслано на ${current.email}.</div>
            <div><b>3. Повертайтеся</b>Доступ до файлів — 12 місяців.</div>
          </div>
          <div class="thanks-actions">
            <a class="btn btn--outline" href="catalog.html">Додати ще набір</a>
            <a class="btn btn--ghost" href="${SITE.telegram}" target="_blank" rel="noopener">${icon("telegram")} Написати в підтримку</a>
          </div>
          <p class="thanks-help">Не бачите листа? Перевірте папку «Спам» або <a href="mailto:${SITE.email}">напишіть нам</a>.</p>
        </div>`;
    };

    if (order.status === "pending" && order.method !== "iban") {
      render({ ...order, status: "pending" });
      window.setTimeout(() => {
        const fresh = readOrders();
        const target = fresh.find((item) => item.number === order.number);
        if (!target) return;
        target.status = "paid";
        target.paidAt = new Date().toISOString();
        saveOrders(fresh);
        render(target);
        toast("Оплату підтверджено тестовим вебхуком.");
      }, 1500);
    } else {
      render(order);
    }
  }

  /* ---------------------------------------------------------
     Account
     --------------------------------------------------------- */

  function initAccount() {
    const root = $("#accountRoot");
    if (!root) return;
    const session = loadJSON(SESSION_KEY, null);
    if (!session) renderAuth();
    else renderAccount(session);

    function renderAuth() {
      root.innerHTML = `
        <div class="account-auth">
          <h1>Вхід без пароля</h1>
          <p>Введіть email, який використовували під час покупки. Ми надішлемо посилання для входу — воно діє 15 хвилин.</p>
          <form id="authForm" novalidate>
            <div class="field">
              <label for="authEmail">Email</label>
              <input class="input" id="authEmail" type="email" autocomplete="email" placeholder="you@example.com" required>
              <span class="field-error"></span>
            </div>
            <button class="btn btn--primary btn--wide" type="submit">Отримати посилання ${icon("arrow")}</button>
          </form>
          <p class="auth-note">Якщо посилання не прийшло, перевірте «Спам» або скористайтеся входом за одноразовим кодом у листі підтримки. У демо-версії доступний одразу.</p>
          <button class="demo-link" type="button" id="demoLogin">Увійти в демо-кабінет</button>
        </div>`;

      const form = $("#authForm");
      const email = $("#authEmail");
      const demo = $("#demoLogin");
      if (demo) {
        demo.addEventListener("click", () => {
          signIn("olena@example.com", "Олена");
        });
      }
      if (form) {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const value = email.value.trim();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
            const field = email.closest(".field");
            field.classList.add("has-error");
            $(".field-error", field).textContent = "Вкажіть коректний email.";
            email.focus();
            return;
          }
          const field = email.closest(".field");
          field.classList.remove("has-error");
          toast("Посилання для входу надіслано. У демо-версії можна увійти одразу.");
          if (demo) demo.hidden = false;
          signIn(value, "");
        });
      }
    }

    function signIn(email, name) {
      saveJSON(SESSION_KEY, { email, name, at: new Date().toISOString() });
      const orders = readOrders();
      if (!orders.length) {
        const demoDate = new Date();
        demoDate.setDate(demoDate.getDate() - 18);
        const demoOrder = {
          number: `TK-${demoDate.getFullYear()}-0142`,
          email,
          name,
          phone: "",
          method: "card",
          status: "paid",
          items: [
            { slug: "torty", title: "Торти", price: 449, pages: 28 },
            { slug: "mousse", title: "Муссові десерти", price: 449, pages: 22 }
          ],
          subtotal: 898,
          discount: 0,
          total: 898,
          promo: "",
          createdAt: demoDate.toISOString(),
          paidAt: demoDate.toISOString()
        };
        saveOrders([demoOrder]);
      }
      renderAccount(loadJSON(SESSION_KEY, null));
    }

    function renderAccount(sessionData) {
      const orders = readOrders();
      const email = sessionData.email;
      const paidOrders = orders.filter((order) => order.status === "paid");
      const allItems = paidOrders.flatMap((order) => order.items.map((item) => ({ ...item, order, paidAt: order.paidAt })));
      root.innerHTML = `
        <div class="account-head">
          <div><span class="kicker">Кабінет</span><h1>Вітаємо${sessionData.name ? `, ${sessionData.name}` : ""}</h1><p>${email} · доступ до файлів зберігається 12 місяців після оплати</p></div>
          <button class="btn btn--outline btn--sm" type="button" id="logout">Вийти</button>
        </div>
        <div class="account-tabs" role="tablist" aria-label="Розділи кабінету">
          <button class="account-tab is-active" type="button" data-tab="orders" role="tab" aria-selected="true">Замовлення</button>
          <button class="account-tab" type="button" data-tab="files" role="tab" aria-selected="false">Файли</button>
        </div>
        <div id="accountOrders" class="orders-list">
          ${orders.length ? orders.map((order) => {
            const download = order.status === "paid";
            return `<article class="order-card">
              <div class="order-card__head">
                <div><div class="order-card__num">${order.number}</div><div class="order-card__date">${formatDate(order.createdAt)} · ${order.method === "iban" ? "за реквізитами" : "картка"}</div></div>
                <span class="status-pill ${download ? "" : "status-pill--wait"}">${download ? "Оплачено" : "Очікує оплати"}</span>
              </div>
              <div class="order-card__items">${order.items.map((item) => `<span>${item.title} · PDF, ${item.pages} стор.</span>`).join("")}</div>
              <div class="order-card__foot">
                <span class="order-card__total">${money(order.total)}</span>
                <div class="order-card__actions">
                  ${download ? `<a class="btn btn--dark" href="${DEMO_FILE}" download>${icon("download")} Завантажити</a>` : `<a class="btn btn--outline" href="payment.html">Як оплатити</a>`}
                  <a class="btn btn--outline" href="contacts.html">Підтримка</a>
                </div>
              </div>
            </article>`;
          }).join("") : '<div class="account-empty">Замовлень поки немає. <a class="text-link" href="catalog.html">Обрати набір</a></div>'}
        </div>
        <div id="accountFiles" class="files-grid" hidden>
          ${allItems.length ? allItems.map((item) => {
            const product = productBySlug(item.slug);
            return `<article class="file-card">
              <div class="file-card__cover"><img src="assets/img/${product ? product.cover : "cover-torty"}-480.jpg" alt="" width="480" height="600"></div>
              <div><b>${item.title}</b><small>PDF · ${item.pages} сторінок · до ${item.paidAt ? formatDate(new Date(new Date(item.paidAt).setFullYear(new Date(item.paidAt).getFullYear() + 1))) : "—"}</small><a class="btn btn--dark" href="${DEMO_FILE}" download>${icon("download")} Завантажити</a></div>
            </article>`;
          }).join("") : '<div class="account-empty">Файли з’являться після оплати.</div>'}
        </div>`;
      const logout = $("#logout");
      if (logout) {
        logout.addEventListener("click", () => {
          removeStored(SESSION_KEY);
          renderAuth();
        });
      }
      $$(".account-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          $$(".account-tab").forEach((other) => {
            other.classList.toggle("is-active", other === tab);
            other.setAttribute("aria-selected", String(other === tab));
          });
          const ordersPanel = $("#accountOrders");
          const filesPanel = $("#accountFiles");
          if (ordersPanel) ordersPanel.hidden = tab.dataset.tab !== "orders";
          if (filesPanel) filesPanel.hidden = tab.dataset.tab !== "files";
        });
      });
    }
  }

  /* ---------------------------------------------------------
     Reviews / FAQ / legal / 404
     --------------------------------------------------------- */

  function initReviewsPage() {
    const grid = $("#reviewsGrid");
    const filter = $("#reviewsFilter");
    const score = $("#reviewsScore");
    if (!grid) return;
    if (score) score.textContent = "4,9";
    const options = [{ slug: "", title: "Усі набори" }, ...PRODUCTS.map((product) => ({ slug: product.slug, title: product.title }))];
    if (filter) {
      filter.innerHTML = options.map((option) => `<option value="${option.slug}">${option.title}</option>`).join("");
      filter.addEventListener("change", () => render(filter.value));
    }
    function render(slug = "") {
      const list = slug ? REVIEWS.filter((review) => review.product === slug) : REVIEWS;
      grid.innerHTML = list.map(reviewCardHTML).join("");
    }
    render("");
  }

  function initFaqPage() {
    const list = $("#faqList");
    const cats = $("#faqCats");
    if (!list) return;
    addJsonLd({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a }
      }))
    });
    const categories = ["Усі", ...new Set(FAQ.map((item) => item.cat))];
    let active = "Усі";
    if (cats) {
      cats.innerHTML = categories.map((cat) => `<button class="faq-cat${cat === "Усі" ? " is-active" : ""}" type="button" data-cat="${cat}">${cat}</button>`).join("");
      $$(".faq-cat", cats).forEach((button) => {
        button.addEventListener("click", () => {
          active = button.dataset.cat;
          $$(".faq-cat", cats).forEach((other) => other.classList.toggle("is-active", other === button));
          render();
        });
      });
    }
    function render() {
      const items = active === "Усі" ? FAQ : FAQ.filter((item) => item.cat === active);
      list.innerHTML = faqHTML(items, `faq-page-${active}`);
      bindFaq(list);
    }
    render();
  }

  function initNotFound() {
    const covers = $("#notFoundCovers");
    if (covers) covers.innerHTML = PRODUCTS.slice(0, 3).map((product) => `<a href="product.html?slug=${product.slug}" aria-label="${product.title}">${coverHTML(product, { small: true })}</a>`).join("");
  }

  /* ---------------------------------------------------------
     Global click handlers
     --------------------------------------------------------- */

  function initGlobalClicks() {
    document.addEventListener("click", (event) => {
      const add = event.target.closest("[data-add]");
      if (add) {
        event.preventDefault();
        addToCart(add.dataset.add);
      }
      const download = event.target.closest("a[download]");
      if (download) {
        track("file_download", { file: download.getAttribute("href") });
      }
    });
  }

  function initContactForm() {
    const form = $("#contactForm");
    if (!form) return;
    const email = $("#contactEmail");
    const message = $("#contactMessage");
    const status = $("#contactStatus");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const honeypot = $("#contactCompany");
      if (honeypot && honeypot.value.trim()) return;

      let valid = true;
      const setError = (field, text) => {
        const wrapper = field.closest(".field");
        if (wrapper) wrapper.classList.toggle("has-error", Boolean(text));
        const error = wrapper ? $(".field-error", wrapper) : null;
        if (error) error.textContent = text || "";
        field.setAttribute("aria-invalid", text ? "true" : "false");
        if (text) valid = false;
      };

      setError(email, "");
      setError(message, "");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        setError(email, "Вкажіть коректний email.");
      }
      if (!message.value.trim()) {
        setError(message, "Напишіть, будь ласка, повідомлення.");
      }
      if (!valid) {
        const first = $(".field.has-error .input, .field.has-error .textarea");
        if (first) first.focus();
        return;
      }

      if (status) {
        status.classList.remove("is-error");
        status.textContent = "Повідомлення надіслано. Відповімо на email протягом робочого дня.";
      }
      form.reset();
      toast("Повідомлення надіслано. Дякуємо!");
    });
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */

  function init() {
    document.body.insertAdjacentHTML("afterbegin", SPRITE);
    renderShell();
    initHeader();
    updateCartChrome();
    initCookie();
    initGlobalClicks();
    initContactForm();

    const pageInit = {
      home: initHome,
      catalog: initCatalog,
      product: initProduct,
      cart: initCartPage,
      checkout: initCheckout,
      "thank-you": initThankYou,
      account: initAccount,
      reviews: initReviewsPage,
      faq: initFaqPage,
      "not-found": initNotFound
    };
    if (pageInit[page]) pageInit[page]();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
