/* =========================================================
   Lux Service — demo interactions
   Vanilla JS, no external dependencies.
   ========================================================= */
(() => {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const money = new Intl.NumberFormat("uk-UA");

  const storage = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* storage can be unavailable in private mode — demo still works */
      }
    },
  };

  const track = (event, params = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    // Demo hook: in production this is where GA4/GTM receives the event.
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      console.debug("[analytics]", event, params);
    }
  };

  const digitsOnly = (value) => String(value).replace(/\D/g, "");

  /* =========================================================
     1. Header, mobile menu, active section
     ========================================================= */
  const header = $("#site-header");
  const burger = $("[data-burger]");
  const mobileMenu = $("#mobile-menu");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const updateBodyLock = () => {
    const modalOpen = $$(".modal").some((modal) => !modal.hidden);
    const menuOpen = mobileMenu && !mobileMenu.hidden;
    document.body.classList.toggle("is-locked", modalOpen || Boolean(menuOpen));
  };

  const closeMenu = () => {
    if (!mobileMenu || mobileMenu.hidden) return;
    mobileMenu.hidden = true;
    burger?.classList.remove("is-active");
    burger?.setAttribute("aria-expanded", "false");
    burger?.setAttribute("aria-label", "Відкрити меню");
    if (!$$(".modal").some((modal) => !modal.hidden)) setPageInert(false);
    updateBodyLock();
  };

  const openMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.hidden = false;
    burger?.classList.add("is-active");
    burger?.setAttribute("aria-expanded", "true");
    burger?.setAttribute("aria-label", "Закрити меню");
    setPageInert(true);
    updateBodyLock();
    $(".mobile-menu__close", mobileMenu)?.focus();
  };

  burger?.addEventListener("click", () => {
    if (mobileMenu.hidden) openMenu();
    else closeMenu();
  });
  $("[data-close-menu]")?.addEventListener("click", closeMenu);
  $$("#mobile-menu a").forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) closeMenu();
  });

  /* Active nav link */
  const navLinks = $$(".main-nav a");
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute("href");
      return id && id.startsWith("#") ? $(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* =========================================================
     2. Reveal on scroll
     ========================================================= */
  const revealItems = $$("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -34px 0px" }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* =========================================================
     3. Calculator
     ========================================================= */
  const calculatorData = {
    smartphone: {
      label: "Смартфон",
      services: [
        { name: "Заміна дисплея", from: 1200, term: "1–2 години", warranty: "до 12 місяців" },
        { name: "Заміна акумулятора", from: 690, term: "40–60 хвилин", warranty: "до 6 місяців" },
        { name: "Ремонт після води", from: 1500, term: "1–3 дні", warranty: "до 3 місяців" },
        { name: "Заміна скла / корпусу", from: 900, term: "1–3 години", warranty: "до 6 місяців" },
        { name: "Чистка та профілактика", from: 500, term: "40–60 хвилин", warranty: "до 3 місяців" },
        { name: "Інша несправність", from: 500, term: "після діагностики", warranty: "за результатом" },
      ],
    },
    laptop: {
      label: "Ноутбук",
      services: [
        { name: "Чистка та термопаста", from: 850, term: "2–3 години", warranty: "до 3 місяців" },
        { name: "Заміна клавіатури", from: 1400, term: "1–2 дні", warranty: "до 6 місяців" },
        { name: "Заміна акумулятора", from: 1800, term: "2–3 години", warranty: "до 6 місяців" },
        { name: "Заміна матриці", from: 2500, term: "1–2 дні", warranty: "до 12 місяців" },
        { name: "Ремонт після заливання", from: 1900, term: "1–3 дні", warranty: "до 3 місяців" },
        { name: "Інша несправність", from: 600, term: "після діагностики", warranty: "за результатом" },
      ],
    },
    tablet: {
      label: "Планшет",
      services: [
        { name: "Заміна скла / дисплея", from: 900, term: "1–2 години", warranty: "до 6 місяців" },
        { name: "Заміна акумулятора", from: 1100, term: "1–2 години", warranty: "до 6 місяців" },
        { name: "Заміна роз’єму зарядки", from: 700, term: "1–2 години", warranty: "до 3 місяців" },
        { name: "Ремонт після води", from: 1400, term: "1–3 дні", warranty: "до 3 місяців" },
        { name: "Інша несправність", from: 500, term: "після діагностики", warranty: "за результатом" },
      ],
    },
    other: {
      label: "Інший пристрій",
      services: [
        { name: "Заміна акумулятора", from: 600, term: "40–60 хвилин", warranty: "до 3 місяців" },
        { name: "Чистка та профілактика", from: 400, term: "40–60 хвилин", warranty: "до 3 місяців" },
        { name: "Ремонт після води", from: 800, term: "1–3 дні", warranty: "до 3 місяців" },
        { name: "Діагностика", from: 0, term: "15–30 хвилин", warranty: "—" },
        { name: "Інша несправність", from: 400, term: "після діагностики", warranty: "за результатом" },
      ],
    },
  };

  const brands = [
    { id: "apple", label: "Apple", factor: 1.4 },
    { id: "samsung", label: "Samsung", factor: 1.15 },
    { id: "xiaomi", label: "Xiaomi", factor: 1 },
    { id: "lenovo", label: "Lenovo / Asus", factor: 1 },
    { id: "other", label: "Інший бренд", factor: 1 },
  ];

  const calcState = { device: "smartphone", serviceIndex: 0, brandIndex: 0 };

  const calcServiceEl = $("#calc-service");
  const calcBrandEl = $("#calc-brand");
  const calcPriceEl = $("[data-calc-price]");
  const calcServiceNameEl = $("[data-calc-service-name]");
  const calcTermEl = $("[data-calc-term]");
  const calcGuaranteeEl = $("[data-calc-guarantee]");
  const calcPriceBox = $(".calculator__price");

  const currentCalc = () => calculatorData[calcState.device];
  const currentService = () => currentCalc().services[calcState.serviceIndex] || currentCalc().services[0];
  const currentBrand = () => brands[calcState.brandIndex] || brands[0];

  const fillSelect = (select, options, selectedIndex = 0) => {
    if (!select) return;
    select.innerHTML = "";
    options.forEach((option, index) => {
      const el = document.createElement("option");
      el.value = String(index);
      el.textContent = option;
      select.append(el);
    });
    select.selectedIndex = selectedIndex;
  };

  const roundPrice = (value) => {
    if (value <= 0) return 0;
    if (value < 500) return Math.max(100, Math.round(value / 50) * 50);
    return Math.round(value / 100) * 100;
  };

  const currentEstimate = () => {
    const service = currentService();
    const brand = currentBrand();
    return {
      service,
      brand,
      price: roundPrice(service.from * brand.factor),
    };
  };

  const updateCalculator = (announce = false) => {
    const data = currentCalc();
    const service = currentService();
    const brand = currentBrand();
    const estimate = currentEstimate();

    fillSelect(calcServiceEl, data.services.map((item) => `${item.name} · від ${money.format(item.from)} ₴`), calcState.serviceIndex);
    fillSelect(calcBrandEl, brands.map((item) => item.label), calcState.brandIndex);

    calcPriceBox?.classList.add("is-changing");
    window.setTimeout(() => calcPriceBox?.classList.remove("is-changing"), 170);

    if (calcPriceEl) calcPriceEl.textContent = money.format(estimate.price);
    if (calcServiceNameEl) calcServiceNameEl.textContent = `${service.name} · ${brand.label}`;
    if (calcTermEl) calcTermEl.textContent = service.term;
    if (calcGuaranteeEl) calcGuaranteeEl.textContent = service.warranty;

    if (announce) {
      track("calculator_use", {
        device: data.label,
        service: service.name,
        price_from: estimate.price,
      });
    }
  };

  $$(".device-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const device = tab.dataset.device;
      if (!device || !calculatorData[device]) return;
      calcState.device = device;
      calcState.serviceIndex = 0;
      calcState.brandIndex = 0;
      $$(".device-tab").forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      updateCalculator(true);
    });
  });

  calcServiceEl?.addEventListener("change", () => {
    calcState.serviceIndex = Number(calcServiceEl.value) || 0;
    updateCalculator(true);
  });

  calcBrandEl?.addEventListener("change", () => {
    calcState.brandIndex = Number(calcBrandEl.value) || 0;
    updateCalculator(true);
  });

  /* Deep-link from service cards into the calculator */
  $$("[data-calc-device][data-calc-service]").forEach((card) => {
    card.addEventListener("click", () => {
      const device = card.dataset.calcDevice;
      const serviceName = card.dataset.calcService;
      if (!calculatorData[device]) return;
      calcState.device = device;
      const serviceIndex = calculatorData[device].services.findIndex((item) => item.name === serviceName);
      calcState.serviceIndex = serviceIndex >= 0 ? serviceIndex : 0;
      calcState.brandIndex = 0;
      $$(".device-tab").forEach((tab) => {
        const active = tab.dataset.device === device;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-pressed", String(active));
      });
      updateCalculator(false);
      $("#calculator")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      track("calculator_use", { device: calculatorData[device].label, service: serviceName });
    });
  });

  updateCalculator(false);

  /* =========================================================
     4. Price table filters
     ========================================================= */
  const priceRows = $$("#price-body tr");
  const filterTabs = $$(".filter-tab");
  const priceSearch = $("#price-search");
  const priceEmpty = $("#price-empty");
  let activeFilter = "all";

  const filterPrices = (trackEvent = false) => {
    const query = (priceSearch?.value || "").trim().toLowerCase();
    let visible = 0;

    priceRows.forEach((row) => {
      const category = row.dataset.category || "";
      const categoryMatch = activeFilter === "all" || category === activeFilter || category === "all";
      const searchMatch = !query || row.textContent.toLowerCase().includes(query);
      const show = categoryMatch && searchMatch;
      row.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });

    if (priceEmpty) priceEmpty.hidden = visible !== 0;
    const table = $(".price-table");
    if (table) table.hidden = visible === 0;

    if (trackEvent) {
      track("price_filter", {
        device: activeFilter,
        query,
        results: visible,
      });
    }
  };

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeFilter = tab.dataset.filter || "all";
      filterTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      filterPrices(true);
    });
  });

  priceSearch?.addEventListener("input", () => filterPrices(false));
  priceSearch?.addEventListener("change", () => filterPrices(true));

  $("[data-reset-filters]")?.addEventListener("click", () => {
    activeFilter = "all";
    if (priceSearch) priceSearch.value = "";
    filterTabs.forEach((tab) => {
      const active = tab.dataset.filter === "all";
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    filterPrices(false);
    priceSearch?.focus();
  });

  /* =========================================================
     5. Modal controller
     ========================================================= */
  const bookingModal = $("#booking-modal");
  const statusModal = $("#status-modal");
  const modalStack = [];
  let lastFocused = null;

  const pageRegions = [$(".topbar"), header, $("#main"), $(".site-footer"), $(".mobile-cta"), $("#cookie-banner")].filter(Boolean);
  const setPageInert = (state) => {
    pageRegions.forEach((region) => {
      region.inert = state;
    });
  };

  const focusables = (modal) =>
    $$(
      'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      modal
    ).filter((el) => el.offsetParent !== null);

  const openModal = (modal) => {
    if (!modal) return;
    if (modalStack.includes(modal)) return;
    if (!modal.hidden && modal.classList.contains("is-open")) return;

    lastFocused = document.activeElement;
    modal.hidden = false;
    setPageInert(true);
    updateBodyLock();
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      const target =
        $(".modal__main input:not([type='hidden'])", modal) ||
        $(".status-form input", modal) ||
        $(".modal__close", modal);
      window.setTimeout(() => target?.focus({ preventScroll: true }), 60);
    });
    modalStack.push(modal);
  };

  const closeModal = (modal, restoreFocus = true) => {
    if (!modal || modal.hidden) return;
    modal.classList.remove("is-open");
    const index = modalStack.indexOf(modal);
    if (index >= 0) modalStack.splice(index, 1);
    window.setTimeout(() => {
      modal.hidden = true;
      if (modalStack.length === 0) setPageInert(false);
      updateBodyLock();
      if (restoreFocus && modalStack.length === 0 && lastFocused instanceof HTMLElement) {
        lastFocused.focus({ preventScroll: true });
      }
    }, reduceMotion ? 0 : 240);
  };

  const closeTopModal = () => {
    const modal = modalStack[modalStack.length - 1];
    if (modal) closeModal(modal);
  };

  $$("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => closeModal(el.closest(".modal")));
  });

  $$(".modal__backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", () => closeModal(backdrop.closest(".modal")));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (mobileMenu && !mobileMenu.hidden) {
        closeMenu();
        return;
      }
      closeTopModal();
      return;
    }

    if (event.key !== "Tab" || !modalStack.length) return;
    const modal = modalStack[modalStack.length - 1];
    const items = focusables(modal);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const resetBookingViews = () => {
    if (!bookingModal) return;
    const formView = $(".modal__form-view", bookingModal);
    const success = $(".form-success--modal", bookingModal);
    if (formView) formView.hidden = false;
    if (success) success.hidden = true;
    $(".modal__dialog", bookingModal)?.setAttribute("aria-labelledby", "booking-title");
  };

  const openBooking = (prefill = {}) => {
    if (!bookingModal) return;
    resetBookingViews();
    if (prefill.device) {
      const select = $("#modal-device");
      if (select) {
        const normalized = String(prefill.device).toLowerCase();
        const option = $$("option", select).find((item) => item.value.toLowerCase() === normalized || normalized.includes(item.value.toLowerCase()));
        if (option) select.value = option.value;
      }
    }
    if (prefill.problem) {
      const problem = $("#modal-problem");
      if (problem && !problem.value.trim()) problem.value = prefill.problem;
    }
    openModal(bookingModal);
  };

  $$("[data-open-booking]").forEach((button) => {
    button.addEventListener("click", () => {
      closeMenu();
      openBooking();
    });
  });

  $$("[data-book-service]").forEach((button) => {
    button.addEventListener("click", () => {
      openBooking({
        device: button.dataset.bookDevice || "",
        problem: button.dataset.bookService || "",
      });
    });
  });

  $("[data-calc-book]")?.addEventListener("click", () => {
    const estimate = currentEstimate();
    const deviceLabel = currentCalc().label === "Інший пристрій" ? "Інше" : currentCalc().label;
    openBooking({
      device: deviceLabel,
      problem: `${estimate.service.name}, ${estimate.brand.label}. Орієнтир: від ${money.format(estimate.price)} ₴`,
    });
  });

  /* =========================================================
     6. Forms — validation and demo submission
     ========================================================= */
  const phoneToDisplay = (digits) => {
    const local = digits.replace(/^380/, "").slice(0, 9);
    if (!local) return "";
    let out = "+380";
    if (local.length > 0) out += ` (${local.slice(0, 2)}`;
    if (local.length >= 2) out += ")";
    if (local.length > 2) out += ` ${local.slice(2, 5)}`;
    if (local.length > 5) out += `-${local.slice(5, 7)}`;
    if (local.length > 7) out += `-${local.slice(7, 9)}`;
    return out;
  };

  const formatPhoneInput = (input) => {
    let digits = digitsOnly(input.value);
    if (!digits) {
      input.value = "";
      return;
    }

    // Normalise both "+380..." and local "0XX..." input into 380 + 9 digits.
    let local = digits.startsWith("380") ? digits.slice(3) : digits;
    if (local.startsWith("0")) local = local.slice(1);
    local = local.slice(0, 9);

    input.value = local ? phoneToDisplay(`380${local}`) : "+380";
  };

  $$('input[name="phone"]').forEach((input) => {
    input.addEventListener("focus", () => {
      if (!input.value.trim()) input.value = "+380";
    });
    input.addEventListener("input", () => formatPhoneInput(input));
    input.addEventListener("blur", () => {
      if (digitsOnly(input.value).length <= 3) input.value = "";
    });
  });

  $$("textarea[maxlength]").forEach((textarea) => {
    const counter = $(`[data-counter-for="${textarea.id}"]`);
    if (!counter) return;
    const update = () => {
      counter.textContent = `${textarea.value.length} / ${textarea.getAttribute("maxlength")}`;
    };
    textarea.addEventListener("input", update);
    update();
  });

  const setFieldError = (input, message) => {
    const wrapper = input.closest(".field") || input.closest(".checkbox");
    if (!wrapper) return;

    wrapper.classList.add("has-error");
    input.setAttribute("aria-invalid", "true");

    let error = wrapper.querySelector(".field__error");
    if (!error) {
      error = document.createElement("p");
      error.className = "field__error";
      error.id = `${input.name || "field"}-error-${Math.random().toString(36).slice(2, 7)}`;
      wrapper.append(error);
    }
    error.textContent = message;
    input.setAttribute("aria-describedby", error.id);
  };

  const clearFieldError = (input) => {
    const wrapper = input.closest(".field") || input.closest(".checkbox");
    if (!wrapper) return;
    wrapper.classList.remove("has-error");
    input.removeAttribute("aria-invalid");
    const error = wrapper.querySelector(".field__error");
    if (error) error.remove();
    input.removeAttribute("aria-describedby");
  };

  const validateInput = (input) => {
    const name = input.name;
    const value = input.value.trim();

    if (name === "name") {
      if (value.length < 2) return "Вкажіть ім’я — мінімум 2 символи.";
      if (value.length > 40) return "Ім’я має бути не довшим за 40 символів.";
      if (/\d/.test(value)) return "Ім’я не повинно містити цифр.";
    }

    if (name === "phone") {
      const digits = digitsOnly(value);
      if (digits.length !== 12 || !digits.startsWith("380")) return "Введіть український номер у форматі +380 (XX) XXX-XX-XX.";
    }

    if (name === "device" && !value) return "Оберіть тип пристрою.";

    if (name === "problem") {
      if (value.length < 5) return "Опишіть проблему хоча б у кількох словах.";
      if (value.length > 500) return "Опис має бути не довшим за 500 символів.";
    }

    if (name === "consent" && !input.checked) return "Потрібна згода на обробку персональних даних.";

    return "";
  };

  const validateField = (input) => {
    const message = validateInput(input);
    if (message) {
      setFieldError(input, message);
      return false;
    }
    clearFieldError(input);
    return true;
  };

  $$("[data-lead-form] input, [data-lead-form] select, [data-lead-form] textarea").forEach((input) => {
    if (input.type === "hidden" || input.name === "company") return;
    input.addEventListener("blur", () => {
      if (input.value.trim() || input.type === "checkbox") validateField(input);
    });
    input.addEventListener("input", () => {
      if (input.closest(".has-error")) clearFieldError(input);
    });
    input.addEventListener("change", () => {
      if (input.closest(".has-error")) clearFieldError(input);
    });
  });

  const showFormMessage = (form, message) => {
    const box = $(".form-message", form);
    if (!box) return;
    box.textContent = message;
    if (message) track("form_error", { field: "general", error_type: message });
  };

  const validateForm = (form) => {
    const fields = $$("[required]", form).filter((field) => field.type !== "hidden");
    let valid = true;
    fields.forEach((field) => {
      if (!validateField(field)) valid = false;
    });
    if (!valid) {
      const firstError = $(".has-error input, .has-error select, .has-error textarea", form) || $(".has-error input", form);
      firstError?.focus();
      showFormMessage(form, "Перевірте виділені поля — цього достатньо, щоб ми могли зв’язатися.");
      track("form_error", { field: "form", error_type: "validation" });
    } else {
      showFormMessage(form, "");
    }
    return valid;
  };

  const setSubmitting = (form, state) => {
    const button = $('button[type="submit"]', form);
    if (!button) return;
    button.classList.toggle("is-loading", state);
    button.disabled = state;
    form.setAttribute("aria-busy", String(state));
  };

  const createOrderNumber = () => `LS-${Math.floor(1000 + Math.random() * 9000)}`;

  const saveOrder = (order) => {
    const orders = storage.get("lux_orders", []);
    orders.unshift(order);
    storage.set("lux_orders", orders.slice(0, 30));
  };

  const renderSuccess = (form, order) => {
    const wrapper = form.closest(".contact__form-wrap") || form.closest(".modal__main");
    if (!wrapper) return;
    const success = $(".form-success", wrapper);
    if (!success) return;

    $$("[data-order-id]", success).forEach((el) => {
      el.textContent = order.id;
    });
    $$("[data-success-name]", success).forEach((el) => {
      el.textContent = order.name.split(" ")[0];
    });

    if (success.classList.contains("form-success--modal")) {
      const formView = $(".modal__form-view", wrapper);
      if (formView) formView.hidden = true;
      form.closest(".modal__dialog")?.setAttribute("aria-labelledby", "booking-success-title");
    } else {
      form.hidden = true;
    }

    success.hidden = false;
    const heading = $("h2, h3", success);
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
    success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    form.reset();
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.dataset.submitting === "true") return;

    const honeypot = $('[name="company"]', form);
    if (honeypot?.value) return;

    if (!validateForm(form)) return;

    form.dataset.submitting = "true";
    setSubmitting(form, true);
    showFormMessage(form, "");

    const formData = new FormData(form);
    const phoneDigits = digitsOnly(formData.get("phone") || "");
    const name = String(formData.get("name") || "").trim();
    const device = String(formData.get("device") || "");
    const problem = String(formData.get("problem") || "").trim();
    const contact = String(formData.get("contact") || "Дзвінок");
    const source = String(formData.get("source") || "site");
    const params = new URLSearchParams(window.location.search);

    const order = {
      id: createOrderNumber(),
      name,
      phone: phoneToDisplay(phoneDigits),
      phone4: phoneDigits.slice(-4),
      device,
      problem,
      contact,
      source,
      utm: {
        source: params.get("utm_source") || "",
        medium: params.get("utm_medium") || "",
        campaign: params.get("utm_campaign") || "",
      },
      statusIndex: 0,
      createdAt: new Date().toISOString(),
    };

    // Demo latency so the loading state is visible and realistic.
    await sleep(760);

    saveOrder(order);
    setSubmitting(form, false);
    form.dataset.submitting = "false";
    track("form_submit", { page: "home", service: problem, device, source });
    renderSuccess(form, order);
  };

  $$("[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", handleLeadSubmit);
  });

  $$("[data-reset-lead-form]").forEach((button) => {
    button.addEventListener("click", () => {
      const wrapper = button.closest(".contact__form-wrap");
      const form = $("[data-lead-form]", wrapper);
      const success = $(".form-success", wrapper);
      if (!form || !success) return;
      success.hidden = true;
      form.hidden = false;
      form.reset();
      $$(".has-error", form).forEach((el) => el.classList.remove("has-error"));
      $$(".field__error", form).forEach((el) => el.remove());
      $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
      const firstField = $("input, select, textarea", form);
      firstField?.focus();
      form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
  });

  /* Copy order id */
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy-order]");
    if (!button) return;
    const order = button.closest(".form-success")?.querySelector("[data-order-id]")?.textContent?.trim();
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order);
      showToast("Номер заявки скопійовано");
    } catch {
      showToast(`Номер заявки: ${order}`);
    }
  });

  /* =========================================================
     7. Repair status
     ========================================================= */
  const statusForm = $("[data-status-form]");
  const statusResult = $(".status-result");
  const demoOrder = {
    id: "LS-4821",
    name: "Олена",
    phone4: "6111",
    device: "iPhone 13 Pro",
    service: "Заміна дисплея",
    place: "ТРЦ Dream, 3 поверх",
    statusIndex: 4,
  };
  const statusMeta = [
    { title: "Прийнято", badge: "Прийнято", badgeClass: "status-badge--progress" },
    { title: "На діагностиці", badge: "Діагностика", badgeClass: "status-badge--progress" },
    { title: "Очікує погодження", badge: "Погодження", badgeClass: "status-badge--progress" },
    { title: "У ремонті", badge: "У ремонті", badgeClass: "status-badge--progress" },
    { title: "Готово до видачі", badge: "Готово", badgeClass: "status-badge--success" },
  ];

  const findOrder = (id, phone4) => {
    const normalizedId = id.trim().toUpperCase();
    const normalizedPhone = phone4.trim();
    if (normalizedId === demoOrder.id && normalizedPhone === demoOrder.phone4) return demoOrder;

    const orders = storage.get("lux_orders", []);
    return orders.find(
      (order) => String(order.id).toUpperCase() === normalizedId && String(order.phone4) === normalizedPhone
    );
  };

  const renderStatus = (order) => {
    if (!statusResult) return;
    const index = Math.min(Math.max(Number(order.statusIndex) || 0, 0), statusMeta.length - 1);
    const meta = statusMeta[index];

    $("[data-status-order]", statusResult).textContent = order.id;
    $("[data-status-title]", statusResult).textContent = meta.title;
    $("[data-status-device]", statusResult).textContent = order.device || "Пристрій";
    $("[data-status-service]", statusResult).textContent = order.service || order.problem || "Діагностика";
    $("[data-status-place]", statusResult).textContent = order.place || "ТРЦ Dream, 3 поверх";

    const badge = $("[data-status-badge]", statusResult);
    if (badge) {
      badge.textContent = meta.badge;
      badge.className = `status-badge ${meta.badgeClass}`;
    }

    $$(".status-step", statusResult).forEach((step, stepIndex) => {
      step.classList.toggle("is-done", stepIndex < index);
      step.classList.toggle("is-active", stepIndex === index);
    });

    statusForm.hidden = true;
    statusResult.hidden = false;
    track("status_check", { result: "found", order: order.id });
  };

  const handleStatusCheck = (event) => {
    event?.preventDefault();
    if (!statusForm) return;
    const orderInput = $("#status-order");
    const phoneInput = $("#status-phone");
    const orderValue = orderInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const message = $(".form-message", statusForm);

    if (!orderValue || !/^LS-\d{4}$/i.test(orderValue)) {
      if (message) message.textContent = "Введіть номер заявки у форматі LS-1234.";
      orderInput.focus();
      return;
    }
    if (!/^\d{4}$/.test(phoneValue)) {
      if (message) message.textContent = "Введіть останні 4 цифри телефону.";
      phoneInput.focus();
      return;
    }

    if (message) message.textContent = "";
    const order = findOrder(orderValue, phoneValue);
    if (!order) {
      if (message) message.textContent = "Не знайшли заявку. Перевірте номер і останні 4 цифри телефону.";
      track("status_check", { result: "not_found" });
      return;
    }
    renderStatus(order);
  };

  const resetStatusView = () => {
    if (!statusForm || !statusResult) return;
    statusForm.hidden = false;
    statusResult.hidden = true;
    const message = $(".form-message", statusForm);
    if (message) message.textContent = "";
  };

  statusForm?.addEventListener("submit", handleStatusCheck);
  $$("[data-open-status]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      closeMenu();
      resetStatusView();
      openModal(statusModal);
    });
  });

  $("[data-demo-status]")?.addEventListener("click", () => {
    const orderInput = $("#status-order");
    const phoneInput = $("#status-phone");
    if (orderInput) orderInput.value = demoOrder.id;
    if (phoneInput) phoneInput.value = demoOrder.phone4;
    handleStatusCheck();
  });

  $("[data-status-back]")?.addEventListener("click", () => {
    if (!statusForm || !statusResult) return;
    statusResult.hidden = true;
    statusForm.hidden = false;
    $("#status-order")?.focus();
  });

  /* =========================================================
     8. FAQ — one open at a time
     ========================================================= */
  const faqItems = $$(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* =========================================================
     9. Cookie banner
     ========================================================= */
  const cookieBanner = $("#cookie-banner");
  const cookieChoice = storage.get("lux_cookie_choice", null);

  if (!cookieChoice && cookieBanner) {
    window.setTimeout(() => {
      cookieBanner.hidden = false;
    }, 1100);
  }

  $$("[data-cookie]").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.cookie;
      storage.set("lux_cookie_choice", { value: choice, date: new Date().toISOString() });
      if (cookieBanner) cookieBanner.hidden = true;
      track("cookie_consent", { choice });
      showToast(choice === "all" ? "Дякуємо! Аналітику ввімкнено." : "Залишили лише необхідні cookies.");
    });
  });

  /* =========================================================
     10. Toast + analytics click hooks + UTM
     ========================================================= */
  const toast = $("#toast");
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("is-visible"));
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
      window.setTimeout(() => {
        toast.hidden = true;
      }, 230);
    }, 2800);
  }

  $$("[data-analytics='call_click']").forEach((link) => {
    link.addEventListener("click", () => {
      track("call_click", { page: "home", location: link.closest("header, footer, .hero, .mobile-cta") ? link.closest("header, footer, .hero, .mobile-cta").className.split(" ")[0] : "site" });
    });
  });

  $$('a[href*="t.me"], a[href*="viber"], a[href*="instagram.com"], a[href*="tiktok.com"]').forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href") || "";
      const messenger = href.includes("t.me") ? "telegram" : href.includes("viber") ? "viber" : href.includes("instagram") ? "instagram" : "tiktok";
      track("messenger_click", { page: "home", messenger });
    });
  });

  // Preserve UTM parameters with every lead.
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const urlParams = new URLSearchParams(window.location.search);
  $$("[data-lead-form]").forEach((form) => {
    utmKeys.forEach((key) => {
      if (!urlParams.get(key)) return;
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = urlParams.get(key);
      form.append(input);
    });
  });

  // Year is static by design; make it obvious where to update.
  const year = new Date().getFullYear();
  const copyright = $(".site-footer__bottom p");
  if (copyright && year !== 2026) {
    copyright.textContent = `© ${year} Lux Service. Усі права захищені.`;
  }
})();
