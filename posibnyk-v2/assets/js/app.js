(() => {
  "use strict";

  const SITE = window.GRAM.site;
  const MANUAL = window.GRAM.manual;
  const CHAPTERS = window.GRAM.chapters;
  const REVIEWS = window.GRAM.reviews;
  const FAQ = window.GRAM.faq;
  const AUTHOR = window.GRAM.author;
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const body = document.body;
  const page = body.dataset.page || "";
  const COOKIE_KEY = "gram_manual_cookie_v1";
  const ORDER_KEY = "gram_manual_orders_v1";
  const SESSION_KEY = "gram_manual_session_v1";
  const DEMO_FILE = "assets/files/gram-manual-sample.pdf";

  window.dataLayer = window.dataLayer || [];
  const track = (event, payload = {}) => window.dataLayer.push({ event, ...payload });

  const money = (value) => `${Number(value).toLocaleString("uk-UA")}\u00A0₴`;

  const formatDate = (value) => {
    const date = value instanceof Date ? value : new Date(value);
    return date.toLocaleDateString("uk-UA", { day: "2-digit", month: "long", year: "numeric" });
  };

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

  const icon = (name, className = "") =>
    `<svg class="icon ${className}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

  /* ---------------------------------------------------------
     Icons
     --------------------------------------------------------- */

  const SPRITE = `
  <svg class="svg-sprite" aria-hidden="true" focusable="false">
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-up-right" viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="m4 12.5 5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
    <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 20a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
    <symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" fill="currentColor"/></symbol>
    <symbol id="i-card" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 10h18M7 15h4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
    <symbol id="i-apple" viewBox="0 0 24 24"><path d="M15.5 7.2c1.6 0 2.7.8 2.7.8s-1.2 1.4-1.2 3.2c0 2.2 1.7 3 1.7 3s-1.2 3.1-3.3 3.1c-1 0-1.5-.6-2.7-.6s-1.8.6-2.7.6c-2.3 0-4.5-3.7-4.5-6.3 0-3.5 2.4-5.4 4.7-5.4 1.1 0 2 .7 2.7.7.7 0 1.2-.8 2.6-.8Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M13.2 4.4c.6-.8 1.1-1.4 2.2-1.4.1 1.3-.4 2.3-1.1 3-.6.7-1.4 1.1-2.2 1.1-.1-1.2.4-2.1 1.1-2.7Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></symbol>
    <symbol id="i-google" viewBox="0 0 24 24"><path d="M20.4 12.3c0-.7-.1-1.3-.2-1.9H12v3.6h4.7a4 4 0 0 1-1.7 2.6v2.2h2.8c1.6-1.5 2.6-3.7 2.6-6.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M12 21c2.4 0 4.4-.8 5.8-2.2l-2.8-2.2c-.8.5-1.8.8-3 .8-2.3 0-4.3-1.6-5-3.7H4.1v2.3A9 9 0 0 0 12 21Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M7 13.7a5.4 5.4 0 0 1 0-3.4V8H4.1a9 9 0 0 0 0 8l2.9-2.3Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M12 6.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 4.1 8l2.9 2.3c.7-2.1 2.7-3.7 5-3.7Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></symbol>
    <symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" fill="none" stroke="currentColor" stroke-width="1.5"/></symbol>
    <symbol id="i-download" viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-refresh" viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-file" viewBox="0 0 24 24"><path d="M6 3.5h8.5L19 8v12.5H6z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 3.5V8h4.5M9 12h6M9 15.5h4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3.5 19 6v5.5c0 4.5-3 7-7 9.5-4-2.5-7-5-7-9.5V6l7-2.5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-telegram" viewBox="0 0 24 24"><path d="m21 4-3.2 16-6.1-4.6L8 19l-.2-5.2L21 4Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m7.8 13.8 10.7-7.1-6 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
    <symbol id="i-instagram" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m4 6.5 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>
    <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="8" r="1" fill="currentColor"/></symbol>
  </svg>`;

  /* ---------------------------------------------------------
     Shell
     --------------------------------------------------------- */

  const navItems = [
    { href: "index.html#about", label: "Про посібник", pages: ["home"] },
    { href: "index.html#inside", label: "Зміст", pages: [] },
    { href: "index.html#author", label: "Автор", pages: [] },
    { href: "index.html#reviews", label: "Відгуки", pages: [] },
    { href: "index.html#faq", label: "Питання", pages: [] }
  ];

  function headerHTML() {
    return `
      <div class="topline">
        <div class="shell">
          <b>Видання 01 · 2026</b>
          <span>PDF одразу після оплати · доступ 12 місяців <a href="${SITE.telegram}" target="_blank" rel="noopener">${icon("telegram")} Telegram</a></span>
        </div>
      </div>
      <header class="site-header" id="siteHeader">
        <div class="shell header-inner">
          <a class="brand" href="index.html" aria-label="ГРАМ — на головну">
            <span><span class="brand__word">ГРАМ<span>.</span></span><span class="brand__sub">видавництво</span></span>
          </a>
          <nav class="nav" aria-label="Головна навігація">
            ${navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
          </nav>
          <div class="header-actions">
            <span class="header-price">499&nbsp;₴<small>за посібник</small></span>
            <a class="btn btn--primary header-buy" href="checkout.html">Придбати</a>
            <a class="icon-btn" href="account.html" aria-label="Кабінет">${icon("user")}</a>
            <button class="burger" type="button" data-menu-open aria-label="Відкрити меню" aria-expanded="false" aria-controls="mobileMenu">
              <span></span><span></span>
            </button>
          </div>
        </div>
      </header>
      <div class="mobile-menu" id="mobileMenu" aria-hidden="true" inert>
        <div class="mobile-menu__head">
          <a class="brand" href="index.html"><span><span class="brand__word">ГРАМ<span>.</span></span><span class="brand__sub">видавництво</span></span></a>
          <button class="icon-btn" type="button" data-menu-close aria-label="Закрити меню">${icon("close")}</button>
        </div>
        <nav class="mobile-menu__links" aria-label="Мобільна навігація">
          <a href="index.html#about">Про посібник<small>01</small></a>
          <a href="index.html#inside">Зміст<small>02</small></a>
          <a href="index.html#author">Автор<small>03</small></a>
          <a href="index.html#reviews">Відгуки<small>04</small></a>
          <a href="index.html#faq">Питання<small>05</small></a>
          <a href="account.html">Кабінет<small>06</small></a>
        </nav>
        <div class="mobile-menu__foot">
          <a class="btn btn--primary" href="checkout.html">Придбати за 499 ₴ ${icon("arrow")}</a>
          <p>PDF одразу після оплати. Один посібник — усі розділи.</p>
        </div>
      </div>`;
  }

  function footerHTML() {
    return `
      <footer class="site-footer">
        <div class="shell">
          <div class="footer-top">
            <div class="footer-brand">
              <a class="brand" href="index.html"><span><span class="brand__word">ГРАМ<span>.</span></span><span class="brand__sub">видавництво</span></span></a>
              <p>Технологічні посібники для кондитерів, які хочуть працювати спокійно. Рецептури, технологія, собівартість — в одному PDF.</p>
              <div class="footer-social">
                <a href="${SITE.telegram}" target="_blank" rel="noopener" aria-label="Telegram">${icon("telegram")}</a>
                <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
                <a href="mailto:${SITE.email}" aria-label="Email">${icon("mail")}</a>
              </div>
            </div>
            <div class="footer-cols">
              <div class="footer-col">
                <h4>Посібник</h4>
                <a href="index.html#about">Про посібник</a>
                <a href="index.html#inside">Зміст</a>
                <a href="index.html#author">Автор</a>
                <a href="index.html#reviews">Відгуки</a>
                <a href="index.html#faq">Питання</a>
              </div>
              <div class="footer-col">
                <h4>Інформація</h4>
                <a href="legal.html?doc=payment">Оплата й отримання</a>
                <a href="legal.html?doc=returns">Повернення коштів</a>
                <a href="legal.html?doc=contacts">Контакти</a>
                <a href="account.html">Кабінет</a>
              </div>
              <div class="footer-col">
                <h4>Документи</h4>
                <a href="legal.html?doc=offer">Публічна оферта</a>
                <a href="legal.html?doc=privacy">Конфіденційність</a>
                <a href="legal.html?doc=privacy#cookies">Політика cookie</a>
              </div>
            </div>
          </div>
          <div class="footer-payments">
            <span>${SITE.legalName} · ${SITE.taxId} · ${SITE.address}</span>
            <span class="pay-badges"><span class="pay-badge">VISA</span><span class="pay-badge">Mastercard</span><span class="pay-badge">Apple Pay</span><span class="pay-badge">Google Pay</span><span class="pay-badge">LiqPay</span></span>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} ГРАМ. Усі права захищені.</span>
            <span>Демонстраційний прототип. Перед запуском замініть реквізити та перевірте юридичні тексти.</span>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
          </div>
        </div>
      </footer>`;
  }

  function renderShell() {
    const header = $("#site-header");
    const footer = $("#site-footer");
    if (header) header.innerHTML = headerHTML();
    if (footer) footer.innerHTML = footerHTML();
    document.body.insertAdjacentHTML("beforeend", '<div class="toast-stack" id="toastStack" aria-live="polite"></div>');
  }

  /* ---------------------------------------------------------
     Sheet / preview
     --------------------------------------------------------- */

  function sheetHTML(type = "recipe") {
    const top = `
      <div class="sheet__top"><span class="sheet__logo">ГРАМ.</span><span class="sheet__type">Технологічний посібник<br>Видання 01 · 2026</span></div>
      <div class="sheet__title">Торт «Оксамит»</div>
      <div class="sheet__meta">Торти · 1 торт, 1,8 кг · 3 год 20 хв</div>`;

    if (type === "recipe") {
      return `<div class="sheet">${top}
        <div class="sheet__photo"><img src="assets/img/cover-torty-480.jpg" alt="" width="480" height="600"></div>
        <div class="sheet__section">Рецептура · брутто / нетто, г</div>
        <div class="sheet-table">
          <div class="sheet-table__row"><span>Інгредієнт</span><span>Брутто</span><span>Нетто</span></div>
          <div class="sheet-table__row"><span>Борошно</span><span>180</span><span>180</span></div>
          <div class="sheet-table__row"><span>Цукор</span><span>220</span><span>220</span></div>
          <div class="sheet-table__row"><span>Какао 22%</span><span>45</span><span>45</span></div>
          <div class="sheet-table__row"><span>Яйця</span><span>180</span><span>180</span></div>
          <div class="sheet-table__row"><span>Масло 82,5%</span><span>160</span><span>160</span></div>
          <div class="sheet-table__row"><span>Сметана 20%</span><span>120</span><span>120</span></div>
        </div>
        <div class="sheet__footer">48 сторінок · 24 рецептури · PDF</div>
      </div>`;
    }

    if (type === "method") {
      return `<div class="sheet">${top}
        <div class="sheet__section">Технологія</div>
        <div class="sheet__steps">
          <div class="sheet__step"><b>1</b><span>Підготувати інгредієнти за 20–22 °C. Духовку розігріти до 170 °C.</span></div>
          <div class="sheet__step"><b>2</b><span>Збити яйця з цукром 7–8 хв. Обережно ввести сухі складники та масло.</span></div>
          <div class="sheet__step"><b>3</b><span>Випікати 34–36 хв. Перевірити сухою шпажкою, охолодити 40 хв.</span></div>
          <div class="sheet__step"><b>4</b><span>Приготувати ганаш, охолодити до 28 °C, скласти торт і стабілізувати 4 год.</span></div>
        </div>
        <div class="sheet__section">Критерії готовності</div>
        <div class="sheet__cost">
          <div class="sheet__cost-row"><span>Температура в центрі</span><b>96–98 °C</b></div>
          <div class="sheet__cost-row"><span>Охолодження</span><b>4 год за 4 °C</b></div>
        </div>
        <div class="sheet__photo"><img src="assets/img/hero-chocolate.jpg" alt="" width="900" height="1125"></div>
        <div class="sheet__footer">ГРАМ. · Технологічний посібник · 2026</div>
      </div>`;
    }

    return `<div class="sheet">${top}
      <div class="sheet__section">Собівартість</div>
      <div class="sheet-table">
        <div class="sheet-table__row"><span>Сировина</span><span></span><span>214 ₴</span></div>
        <div class="sheet-table__row"><span>Робота (3 год 20 хв)</span><span></span><span>180 ₴</span></div>
        <div class="sheet-table__row"><span>Рекомендована ціна</span><span></span><span>690 ₴</span></div>
      </div>
      <div class="sheet__section">Перерахунок на форму</div>
      <div class="sheet__steps">
        <div class="sheet__step"><b>16</b><span>Діаметр 16 см — коефіцієнт 0,79 до базової форми 18 см.</span></div>
        <div class="sheet__step"><b>20</b><span>Діаметр 20 см — коефіцієнт 1,23. Вихід і час випікання змінюються.</span></div>
      </div>
      <div class="sheet__photo"><img src="assets/img/cover-mousse-480.jpg" alt="" width="480" height="600"></div>
      <div class="sheet__footer">48 сторінок · 24 рецептури · PDF</div>
    </div>`;
  }

  function openPreview() {
    const dialog = document.createElement("dialog");
    dialog.className = "preview-dialog";
    dialog.innerHTML = `
      <div class="preview-dialog__head"><h2>Технологічний посібник — розворот</h2><button class="icon-btn" type="button" aria-label="Закрити">${icon("close")}</button></div>
      <div class="preview-dialog__body">
        ${sheetHTML("recipe")}
        ${sheetHTML("method")}
        <p class="preview-dialog__note">Демонстраційні сторінки. Повний PDF — 48 сторінок — доступний після оплати.</p>
      </div>`;
    document.body.append(dialog);
    dialog.showModal();
    document.body.classList.add("no-scroll");
    const close = () => {
      dialog.close();
      dialog.remove();
      document.body.classList.remove("no-scroll");
    };
    $("[aria-label='Закрити']", dialog).addEventListener("click", close);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) close();
    });
    dialog.addEventListener("close", () => {
      dialog.remove();
      document.body.classList.remove("no-scroll");
    });
  }

  /* ---------------------------------------------------------
     FAQ / reviews
     --------------------------------------------------------- */

  function bindFaq(container) {
    if (!container) return;
    $$(".faq-item", container).forEach((item) => {
      const button = $(".faq-q", item);
      const panel = $(".faq-a", item);
      if (!button || !panel) return;
      const open = item.classList.contains("is-open");
      panel.inert = !open;
      button.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        $$(".faq-item", container).forEach((other) => {
          other.classList.remove("is-open");
          const b = $(".faq-q", other);
          const a = $(".faq-a", other);
          if (b) b.setAttribute("aria-expanded", "false");
          if (a) {
            a.setAttribute("aria-hidden", "true");
            a.inert = true;
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

  function renderFaq() {
    const list = $("#faqList");
    if (!list) return;
    list.innerHTML = FAQ.map((item, index) => `
      <div class="faq-item${index === 0 ? " is-open" : ""}">
        <button class="faq-q" type="button" id="manual-faq-q${index}" aria-expanded="${index === 0}" aria-controls="manual-faq-a${index}">
          <span>${item.q}</span><i class="faq-icon" aria-hidden="true"></i>
        </button>
        <div class="faq-a" id="manual-faq-a${index}" role="region" aria-labelledby="manual-faq-q${index}"${index === 0 ? "" : ' aria-hidden="true"'}>
          <div><p>${item.a}</p></div>
        </div>
      </div>`).join("");
    bindFaq(list);
  }

  function renderReviews() {
    const grid = $("#reviewGrid");
    if (!grid) return;
    grid.innerHTML = REVIEWS.slice(1).map((review) => `
      <article class="review-card">
        <span class="review-stars" aria-label="${review.rating} з 5">${Array.from({ length: 5 }, (_, i) => icon("star", i < review.rating ? "" : "is-empty")).join("")}</span>
        <p>«${review.text}»</p>
        <b>${review.name}</b>
        <small>${review.role}</small>
      </article>`).join("");
  }

  function renderPreviews() {
    const stage = $("#previewStage");
    if (!stage) return;
    stage.innerHTML = ["recipe", "method", "cost"].map((type, index) => `
      <button class="preview-card" type="button" data-preview aria-label="Відкрити сторінку ${index + 1}">
        ${sheetHTML(type)}
        <span class="preview-caption"><span>${["Рецептура", "Технологія", "Собівартість"][index]}</span><span>0${index + 1}</span></span>
      </button>`).join("");
    $$("[data-preview]", stage).forEach((button) => button.addEventListener("click", openPreview));
  }

  /* ---------------------------------------------------------
     Header / footer interactions
     --------------------------------------------------------- */

  function initShell() {
    const header = $("#siteHeader");
    const menu = $("#mobileMenu");
    const onScroll = () => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
      const sticky = $("#stickyBuy");
      if (sticky) sticky.classList.toggle("is-visible", window.scrollY > 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const openMenu = () => {
      if (!menu) return;
      menu.inert = false;
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      const main = $("#main");
      if (main) main.inert = true;
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
      if (main) main.inert = false;
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

    $$("[data-preview]").forEach((button) => button.addEventListener("click", openPreview));

    $$("dialog").forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
          dialog.close();
          document.body.classList.remove("no-scroll");
        }
      });
    });
  }

  /* ---------------------------------------------------------
     Cookie / toast
     --------------------------------------------------------- */

  function toast(message) {
    const stack = $("#toastStack");
    if (!stack) return;
    const node = document.createElement("div");
    node.className = "toast";
    node.innerHTML = `${icon("check")}<span>${message}</span>`;
    stack.append(node);
    window.setTimeout(() => node.remove(), 4000);
  }

  function initCookie() {
    if (loadJSON(COOKIE_KEY, null)) return;
    const banner = document.createElement("div");
    banner.className = "cookie";
    banner.innerHTML = `
      <p>Ми використовуємо необхідні cookie для роботи кабінету й запам’ятовування вибору. Аналітичні та рекламні скрипти в цьому прототипі не підключені. <a href="legal.html?doc=privacy#cookies">Детальніше</a>.</p>
      <div class="cookie-actions">
        <button class="btn btn--cream" type="button" data-cookie="all">Прийняти всі</button>
        <button class="btn btn--outline" type="button" data-cookie="essential" style="color:var(--paper);border-color:rgba(248,242,233,.3)">Тільки необхідні</button>
        <a class="cookie-more" href="legal.html?doc=privacy#cookies">Налаштування</a>
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
     Checkout
     --------------------------------------------------------- */

  function setMeta(attribute, name, content) {
    let node = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute(attribute, name);
      document.head.append(node);
    }
    node.setAttribute("content", content);
  }

  function addJsonLd(data) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.append(script);
  }

  function readOrders() {
    return loadJSON(ORDER_KEY, []);
  }

  function saveOrders(orders) {
    saveJSON(ORDER_KEY, orders);
  }

  function createOrder(payload) {
    const date = new Date();
    const number = `GR-${date.getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const order = {
      number,
      email: payload.email,
      name: payload.name || "",
      phone: payload.phone || "",
      comment: payload.comment || "",
      method: payload.method,
      status: "pending",
      items: [{ slug: "manual", title: MANUAL.title, price: MANUAL.price, pages: MANUAL.pages }],
      subtotal: MANUAL.price,
      discount: 0,
      total: MANUAL.price,
      promo: "",
      createdAt: date.toISOString(),
      paidAt: null
    };
    const orders = readOrders();
    orders.unshift(order);
    saveOrders(orders);
    return order;
  }

  function initCheckout() {
    const form = $("#checkoutForm");
    if (!form) return;
    const payBtn = $("#payButton");
    const offer = $("#offerCheck");
    const methods = $$("input[name=payment]");
    const payLabel = $("#payLabel");
    const updatePay = () => {
      payBtn.disabled = !(offer && offer.checked);
      const method = methods.find((input) => input.checked)?.value || "card";
      const labels = {
        card: `Оплатити ${money(MANUAL.price)}`,
        apple: "Оплатити Apple Pay",
        google: "Оплатити Google Pay",
        iban: "Отримати рахунок"
      };
      if (payLabel) payLabel.textContent = labels[method] || labels.card;
    };
    if (offer) offer.addEventListener("change", updatePay);
    methods.forEach((input) => input.addEventListener("change", updatePay));
    updatePay();
    track("begin_checkout", { value: MANUAL.price, currency: "UAH" });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = $("#emailField");
      const phone = $("#phoneField");
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
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        setError(email, "Вкажіть коректний email — на нього надійдуть файли та чек.");
      }
      if (phone.value.trim() && !/^\+?380\d{9}$/.test(phone.value.replace(/\s/g, ""))) {
        setError(phone, "Телефон у форматі +380 XX XXX XX XX.");
      }
      if (!offer.checked) {
        toast("Підтвердьте згоду з офертою.");
        offer.focus();
        valid = false;
      }
      if (!valid) {
        const first = $(".field.has-error .input");
        if (first) first.focus();
        return;
      }
      openPaymentDialog({
        email: email.value.trim(),
        name: $("#nameField").value.trim(),
        phone: phone.value.trim(),
        comment: $("#commentField").value.trim(),
        method: methods.find((input) => input.checked)?.value || "card"
      });
    });
  }

  function openPaymentDialog(payload) {
    const labels = { card: "LiqPay · картка", apple: "Apple Pay", google: "Google Pay", iban: "Оплата за реквізитами" };
    const icons = { card: "card", apple: "apple", google: "google", iban: "file" };
    const dialog = document.createElement("dialog");
    dialog.className = "payment-dialog";
    dialog.innerHTML = `
      <div class="payment-dialog__inner">
        <div class="payment-dialog__brand">${icon(icons[payload.method])} ${labels[payload.method]}</div>
        <h2>${payload.method === "iban" ? "Рахунок для оплати" : "Тестова оплата"}</h2>
        <p>${payload.method === "iban"
          ? "Ми створимо замовлення зі статусом «очікує оплати». Реквізити надійдуть на email, файли відкриються після підтвердження."
          : "Це демонстраційний прототип. Реальні кошти не списуються, дані картки не вводяться."}</p>
        <div class="payment-amount"><span>До сплати</span><b>${money(MANUAL.price)}</b></div>
        <div class="payment-dialog__actions">
          <button class="btn btn--primary" type="button" id="confirmPayment">${payload.method === "iban" ? "Створити рахунок" : "Підтвердити тестову оплату"} ${icon("arrow")}</button>
          <button class="btn btn--outline" type="button" data-cancel>Скасувати</button>
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
    $("[data-cancel]", dialog).addEventListener("click", close);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) close();
    });
    dialog.addEventListener("close", () => {
      dialog.remove();
      document.body.classList.remove("no-scroll");
    });
    $("#confirmPayment", dialog).addEventListener("click", () => {
      const button = $("#confirmPayment", dialog);
      button.disabled = true;
      button.textContent = "Створюємо замовлення…";
      window.setTimeout(() => {
        const order = createOrder(payload);
        close();
        window.location.href = `thank-you.html?order=${encodeURIComponent(order.number)}`;
      }, 900);
    });
  }

  function initThankYou() {
    const root = $("#thankYouRoot");
    if (!root) return;
    const number = new URLSearchParams(window.location.search).get("order");
    const orders = readOrders();
    const order = number ? orders.find((item) => item.number === number) : orders[0];
    if (!order) {
      root.innerHTML = `
        <div class="thanks-inner">
          <div class="success-mark">${icon("info")}</div>
          <h1>Замовлення не знайдено</h1>
          <p class="thanks__lead">Можливо, ви відкрили демонстраційну сторінку без оформлення замовлення. Це нормально — поверніться до посібника.</p>
          <div class="thanks-actions"><a class="btn btn--primary" href="index.html">До посібника ${icon("arrow")}</a></div>
        </div>`;
      return;
    }

    const render = (current) => {
      const paid = current.status === "paid";
      const awaitingInvoice = current.method === "iban";
      if (paid) {
        const key = `gram_manual_purchase_${current.number}`;
        try {
          if (!sessionStorage.getItem(key)) {
            track("purchase", { transaction_id: current.number, value: current.total, currency: "UAH" });
            sessionStorage.setItem(key, "1");
          }
        } catch (error) {}
      }
      const pendingLead = awaitingInvoice
        ? `Рахунок для оплати надіслано на ${current.email}. Після надходження коштів файл з’явиться в кабінеті.`
        : `Підтверджуємо оплату. Зазвичай це займає кілька секунд. Якщо статус не оновиться — перевірте кабінет або напишіть у підтримку.`;
      const pendingDetails = awaitingInvoice
        ? `<div class="demo-note mt-16">Реквізити: отримувач ${SITE.legalName}, IBAN UA00 0000 0000 0000 0000 0000 000, призначення — ${current.number}. Демонстраційні дані.</div>`
        : `<div class="demo-note mt-16">Демонстраційний прототип: оплата вже підтверджується тестовим вебхуком. Файл з’явиться тут автоматично.</div>`;
      root.innerHTML = `
        <div class="thanks-inner">
          <div class="success-mark">${icon(paid ? "check" : "clock")}</div>
          <span class="status-pill ${paid ? "" : "status-pill--wait"}">${paid ? "Оплачено" : "Очікує оплати"}</span>
          <h1>${paid ? "Дякуємо. Посібник уже ваш." : "Замовлення створено"}</h1>
          <p class="thanks__lead">${paid
            ? `Лист із посиланням надіслано на ${current.email}. Завантажте PDF нижче або поверніться пізніше — доступ збережеться на 12 місяців.`
            : pendingLead}</p>
          <div class="thanks-card">
            <div class="thanks-card__head">
              <div><b>Замовлення ${current.number}</b><small>${formatDate(current.createdAt)} · ${current.method === "iban" ? "оплата за реквізитами" : "оплата карткою"}</small></div>
              <span class="status-pill ${paid ? "" : "status-pill--wait"}">${paid ? "Готово до завантаження" : "Очікує оплати"}</span>
            </div>
            ${paid ? `<div class="download-row">
              <div class="download-row__cover"><img src="assets/img/cover-torty-480.jpg" alt="" width="480" height="600"></div>
              <div><b>Технологічний посібник</b><small>PDF · 48 сторінок · доступ 12 місяців</small></div>
              <a class="btn btn--dark" href="${DEMO_FILE}" download>${icon("download")} Завантажити</a>
            </div>` : pendingDetails}
            <div class="thanks-total"><span>${paid ? "Сплачено" : "Сума замовлення"}</span><b>${money(current.total)}</b></div>
          </div>
          <div class="thanks-next">
            ${paid ? `<div><b>1. Завантажте PDF</b>Файл доступний одразу та в кабінеті.</div>
            <div><b>2. Перевірте пошту</b>Лист із посиланням і чеком надіслано на ${current.email}.</div>
            <div><b>3. Повертайтеся</b>Доступ до посібника — 12 місяців.</div>` : `<div><b>1. Підтвердження</b>Оновлюємо статус після відповіді банку.</div>
            <div><b>2. Перевірте пошту</b>Рахунок і чек надійдуть на ${current.email}.</div>
            <div><b>3. Доступ</b>Файл з’явиться тут і в кабінеті.</div>`}
          </div>
          <div class="thanks-actions">
            <a class="btn btn--outline" href="account.html">Відкрити кабінет</a>
            <a class="btn btn--ghost" href="${SITE.telegram}" target="_blank" rel="noopener">${icon("telegram")} Підтримка</a>
          </div>
          <p class="thanks-help">Не бачите листа? Перевірте «Спам» або <a href="mailto:${SITE.email}">напишіть нам</a>.</p>
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

  function initAccount() {
    const root = $("#accountRoot");
    if (!root) return;
    const session = loadJSON(SESSION_KEY, null);
    if (!session) renderAuth();
    else renderPanel(session);

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
          <p class="auth-note">У демо-версії доступний одразу. У продакшні тут буде magic link із листом.</p>
          <button class="demo-link" type="button" id="demoLogin">Увійти в демо-кабінет</button>
        </div>`;
      const form = $("#authForm");
      const email = $("#authEmail");
      $("#demoLogin")?.addEventListener("click", () => signIn("olena@example.com", "Олена"));
      form?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
          const field = email.closest(".field");
          field.classList.add("has-error");
          $(".field-error", field).textContent = "Вкажіть коректний email.";
          email.focus();
          return;
        }
        signIn(email.value.trim(), "");
      });
    }

    function signIn(email, name) {
      saveJSON(SESSION_KEY, { email, name, at: new Date().toISOString() });
      const orders = readOrders();
      if (!orders.length) {
        const date = new Date();
        date.setDate(date.getDate() - 18);
        saveOrders([{
          number: `GR-${date.getFullYear()}-0142`,
          email,
          name,
          method: "card",
          status: "paid",
          items: [{ slug: "manual", title: MANUAL.title, price: MANUAL.price, pages: MANUAL.pages }],
          subtotal: MANUAL.price,
          discount: 0,
          total: MANUAL.price,
          createdAt: date.toISOString(),
          paidAt: date.toISOString()
        }]);
      }
      renderPanel(loadJSON(SESSION_KEY, null));
    }

    function renderPanel(sessionData) {
      const orders = readOrders();
      const paidOrders = orders.filter((order) => order.status === "paid");
      root.innerHTML = `
        <div class="account-head">
          <div><span class="kicker">Кабінет</span><h1>Вітаємо${sessionData.name ? `, ${sessionData.name}` : ""}</h1><p>${sessionData.email} · доступ до файлів 12 місяців після оплати</p></div>
          <button class="btn btn--outline btn--sm" type="button" id="logout">Вийти</button>
        </div>
        <div class="account-tabs" role="tablist">
          <button class="account-tab is-active" type="button" data-tab="orders" role="tab" aria-selected="true">Замовлення</button>
          <button class="account-tab" type="button" data-tab="files" role="tab" aria-selected="false">Файли</button>
        </div>
        <div id="accountOrders">
          ${orders.length ? orders.map((order) => `<article class="order-card">
            <div class="order-card__head"><div><div class="order-card__num">${order.number}</div><div class="order-card__date">${formatDate(order.createdAt)}</div></div><span class="status-pill ${order.status === "paid" ? "" : "status-pill--wait"}">${order.status === "paid" ? "Оплачено" : "Очікує оплати"}</span></div>
            <div class="order-card__items">${order.items.map((item) => `<span>${item.title} · PDF, ${item.pages} стор.</span>`).join("")}</div>
            <div class="order-card__foot"><span class="order-card__total">${money(order.total)}</span><div class="order-card__actions">${order.status === "paid" ? `<a class="btn btn--dark" href="${DEMO_FILE}" download>${icon("download")} Завантажити</a>` : `<a class="btn btn--outline" href="legal.html?doc=payment">Як оплатити</a>`}<a class="btn btn--outline" href="legal.html?doc=contacts">Підтримка</a></div></div>
          </article>`).join("") : '<div class="account-empty">Замовлень поки немає. <a class="text-link" href="index.html#buy">Придбати посібник</a></div>'}
        </div>
        <div id="accountFiles" hidden>
          ${paidOrders.length ? `<div class="files-grid">${paidOrders.map((order) => `<article class="file-card"><div class="file-card__cover"><img src="assets/img/cover-torty-480.jpg" alt="" width="480" height="600"></div><div><b>${MANUAL.title}</b><small>PDF · 48 сторінок</small><a class="btn btn--dark" href="${DEMO_FILE}" download>${icon("download")} Завантажити</a></div></article>`).join("")}</div>` : '<div class="account-empty">Файли з’являться після оплати.</div>'}
        </div>`;
      $("#logout")?.addEventListener("click", () => {
        try { localStorage.removeItem(SESSION_KEY); } catch (error) {}
        renderAuth();
      });
      $$(".account-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          $$(".account-tab").forEach((other) => {
            other.classList.toggle("is-active", other === tab);
            other.setAttribute("aria-selected", String(other === tab));
          });
          $("#accountOrders").hidden = tab.dataset.tab !== "orders";
          $("#accountFiles").hidden = tab.dataset.tab !== "files";
        });
      });
    }
  }

  function initContactForm() {
    const form = $("#contactForm");
    if (!form) return;
    const email = $("#contactEmail");
    const message = $("#contactMessage");
    const status = $("#contactStatus");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const setError = (field, text) => {
        const wrapper = field.closest(".field");
        const error = wrapper ? $(".field-error", wrapper) : null;
        if (wrapper) wrapper.classList.toggle("has-error", Boolean(text));
        if (error) error.textContent = text || "";
        field.setAttribute("aria-invalid", text ? "true" : "false");
      };
      setError(email, "");
      setError(message, "");
      let valid = true;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        setError(email, "Вкажіть коректний email — на нього відповімо.");
        valid = false;
      }
      if (message.value.trim().length < 10) {
        setError(message, "Опишіть питання хоча б кількома реченнями.");
        valid = false;
      }
      if (!valid) {
        const first = $(".field.has-error .input, .field.has-error .textarea");
        if (first) first.focus();
        return;
      }
      if (status) status.textContent = "Повідомлення надіслано. Відповімо на email протягом робочого дня.";
      form.reset();
    });
  }

  function initLegal() {
    const doc = new URLSearchParams(window.location.search).get("doc") || "offer";
    $$(".legal-doc").forEach((node) => {
      node.hidden = node.dataset.doc !== doc;
    });
    $$(".legal-nav a").forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href")?.includes(`doc=${doc}`));
    });
    const titles = { offer: "Публічна оферта", privacy: "Політика конфіденційності", returns: "Повернення коштів", payment: "Оплата й отримання", contacts: "Контакти" };
    document.title = `${titles[doc] || "Документи"} — ГРАМ`;
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) window.setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }

  function initHome() {
    addJsonLd({
      "@context": "https://schema.org",
      "@type": "Book",
      name: MANUAL.title,
      author: { "@type": "Person", name: AUTHOR.name },
      description: MANUAL.short,
      numberOfPages: MANUAL.pages,
      image: new URL("assets/img/cover-torty-720.jpg", window.location.href).href,
      offers: { "@type": "Offer", price: MANUAL.price, priceCurrency: "UAH", availability: "https://schema.org/InStock", url: new URL("checkout.html", window.location.href).href }
    });
    addJsonLd({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } }))
    });
  }

  function init() {
    document.body.insertAdjacentHTML("afterbegin", SPRITE);
    renderShell();
    initShell();
    initCookie();
    if (page === "home") {
      renderPreviews();
      renderReviews();
      renderFaq();
      initHome();
    }
    if (page === "checkout") initCheckout();
    if (page === "thank-you") initThankYou();
    if (page === "account") initAccount();
    if (page === "legal") {
      initLegal();
      initContactForm();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
