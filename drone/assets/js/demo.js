/* =========================================================
   DR.one — shared demo interactions
   Vanilla JS. No external dependencies.
   ========================================================= */
(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /* =========================================================
     Menu + sticky header
     ========================================================= */
  const header = $("[data-header]");
  const menu = $("[data-menu]");
  const menuToggle = $("[data-menu-toggle]");
  const menuClose = $("[data-menu-close]");

  const syncBodyLock = () => {
    const modalOpen = $(".lead-modal:not([hidden])");
    const menuOpen = menu?.classList.contains("is-open");
    document.body.classList.toggle("is-locked", Boolean(modalOpen || menuOpen));
  };

  const openMenu = () => {
    if (!menu || !menuToggle) return;
    menu.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Закрити меню");
    document.body.classList.add("is-locked");
    menuClose?.focus({ preventScroll: true });
  };

  const closeMenu = () => {
    if (!menu || !menuToggle) return;
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Відкрити меню");
    syncBodyLock();
  };

  menuToggle?.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) closeMenu();
    else openMenu();
  });
  menuClose?.addEventListener("click", closeMenu);
  $$("[data-menu] a").forEach((link) => link.addEventListener("click", closeMenu));

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* =========================================================
     Reveal
     ========================================================= */
  const revealItems = $$("[data-reveal]");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));
  }

  /* =========================================================
     Lead modal
     ========================================================= */
  const modalTemplate = `
    <div class="lead-modal" id="lead-modal" hidden>
      <div class="lead-modal__backdrop" data-modal-close></div>
      <div class="lead-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
        <button class="modal-close" type="button" aria-label="Закрити" data-modal-close>
          <svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>
        </button>
        <div class="modal-visual">
          <img src="../assets/img/study-sage.webp" alt="Інтер’єр студії DR.one">
          <div class="modal-visual__overlay">
            <span class="modal-visual__mark">DR.one</span>
            <div>
              <p class="modal-visual__text">Обговоримо ваш простір — від ідеї до ключів.</p>
              <p class="modal-visual__meta">Київ · БЦ «Гулівер» · 068-098-1111</p>
            </div>
          </div>
        </div>
        <div class="modal-main">
          <div data-form-view>
            <p class="modal-kicker">Консультація</p>
            <h2 class="modal-title" id="lead-modal-title">Розкажіть про ваш проєкт</h2>
            <p class="modal-subtitle">Залиште контакти — повернемося з питаннями та запропонуємо зручний час для зустрічі.</p>
            <form class="lead-form" data-lead-form novalidate>
              <input type="hidden" name="source" value="demo">
              <div class="hp-field" aria-hidden="true"><label>Не заповнюйте<input type="text" name="company" tabindex="-1" autocomplete="off"></label></div>
              <div class="form-grid">
                <div class="form-field">
                  <label for="lead-name">Ім’я *</label>
                  <input id="lead-name" name="name" type="text" autocomplete="name" placeholder="Олена" required>
                </div>
                <div class="form-field">
                  <label for="lead-phone">Телефон *</label>
                  <input id="lead-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+380 (__) ___-__-__" required>
                </div>
                <div class="form-field">
                  <label for="lead-type">Що плануєте? *</label>
                  <select id="lead-type" name="type" required>
                    <option value="">Оберіть</option>
                    <option>Дизайн-проєкт</option>
                    <option>Ремонт під ключ</option>
                    <option>Дизайн + ремонт</option>
                    <option>Авторський нагляд</option>
                    <option>Інше</option>
                  </select>
                </div>
                <div class="form-field">
                  <label for="lead-area">Площа, м² *</label>
                  <input id="lead-area" name="area" type="number" inputmode="numeric" min="10" max="2000" placeholder="107" required>
                </div>
                <div class="form-field form-field--full">
                  <label for="lead-comment">Коментар</label>
                  <textarea id="lead-comment" name="comment" rows="3" placeholder="Наприклад: квартира 107 м², хочемо дизайн і ремонт під ключ"></textarea>
                </div>
              </div>
              <label class="form-consent">
                <input type="checkbox" name="consent" required>
                <span>Погоджуюся з <a href="#" data-demo-link>політикою конфіденційності</a> та обробкою даних. *</span>
              </label>
              <button class="btn" type="submit"><span>Надіслати заявку</span><svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg></button>
              <p class="form-note">Це демо-форма. У робочій версії заявка надходить у Telegram або CRM.</p>
              <p class="form-message" role="alert" aria-live="assertive"></p>
            </form>
          </div>
          <div class="form-success" hidden>
            <span class="form-success__icon"><svg viewBox="0 0 24 24"><path d="m20 6-11 11-5-5"/></svg></span>
            <p class="modal-kicker">Заявку прийнято</p>
            <h3>Дякуємо!</h3>
            <p>Це демонстраційна форма. У робочій версії менеджер отримає заявку <strong data-order>DR-0000</strong> і зв’яжеться протягом 30 хвилин у робочі години.</p>
            <div class="form-success__actions">
              <a class="btn" href="https://www.instagram.com/design.remont.one/" target="_blank" rel="noopener">Instagram</a>
              <button class="btn btn--outline" type="button" data-modal-close>Закрити</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  if (!document.getElementById("lead-modal")) {
    document.body.insertAdjacentHTML("beforeend", modalTemplate);
  }

  const modal = document.getElementById("lead-modal");
  const form = $("[data-lead-form]", modal);
  const formView = $("[data-form-view]", modal);
  const successView = $(".form-success", modal);
  const typeSelect = $("#lead-type", modal);
  const commentInput = $("#lead-comment", modal);
  let lastFocused = null;

  const resetModal = () => {
    formView.hidden = false;
    successView.hidden = true;
    form.reset();
    $$(".has-error", form).forEach((node) => node.classList.remove("has-error"));
    $$(".form-error", form).forEach((node) => node.remove());
    const message = $(".form-message", form);
    if (message) message.textContent = "";
  };

  const focusables = (scope) =>
    $$('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', scope).filter(
      (el) => el.offsetParent !== null
    );

  const openModal = (trigger) => {
    lastFocused = document.activeElement;
    if (!modal.hidden) return;
    resetModal();
    const project = trigger?.getAttribute("data-project");
    const service = trigger?.getAttribute("data-service");
    if (project && commentInput) commentInput.value = `Цікавить проєкт: ${project}`;
    if (service && typeSelect) {
      const option = $$("option", typeSelect).find((o) => o.textContent.toLowerCase().includes(service.toLowerCase()));
      if (option) typeSelect.value = option.textContent;
    }
    modal.hidden = false;
    document.body.classList.add("is-locked");
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      window.setTimeout(() => $("#lead-name", modal)?.focus({ preventScroll: true }), 80);
    });
  };

  const closeModal = () => {
    if (modal.hidden) return;
    modal.classList.remove("is-open");
    window.setTimeout(() => {
      modal.hidden = true;
      syncBodyLock();
      if (lastFocused instanceof HTMLElement) lastFocused.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 230);
  };

  $$("[data-open-lead]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      closeMenu();
      openModal(trigger);
    });
  });
  $$("[data-modal-close]", modal).forEach((el) => el.addEventListener("click", closeModal));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (menu?.classList.contains("is-open")) {
        closeMenu();
        return;
      }
      if (!modal.hidden) {
        closeModal();
        return;
      }
    }
    if (event.key !== "Tab" || modal.hidden) return;
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

  $$("[data-demo-link]").forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });

  /* =========================================================
     Phone mask + validation
     ========================================================= */
  const phoneToDisplay = (digits) => {
    const local = String(digits).replace(/^380/, "").slice(0, 9);
    if (!local) return "";
    let out = "+380";
    if (local.length > 0) out += ` (${local.slice(0, 2)}`;
    if (local.length >= 2) out += ")";
    if (local.length > 2) out += ` ${local.slice(2, 5)}`;
    if (local.length > 5) out += `-${local.slice(5, 7)}`;
    if (local.length > 7) out += `-${local.slice(7, 9)}`;
    return out;
  };

  const phoneInput = $('input[name="phone"]', modal);
  phoneInput?.addEventListener("focus", () => {
    if (!phoneInput.value.trim()) phoneInput.value = "+380";
  });
  phoneInput?.addEventListener("input", () => {
    let digits = phoneInput.value.replace(/\D/g, "");
    if (!digits) {
      phoneInput.value = "";
      return;
    }
    let local = digits.startsWith("380") ? digits.slice(3) : digits;
    if (local.startsWith("0")) local = local.slice(1);
    local = local.slice(0, 9);
    phoneInput.value = local ? phoneToDisplay(`380${local}`) : "+380";
  });
  phoneInput?.addEventListener("blur", () => {
    if (phoneInput.value.replace(/\D/g, "").length <= 3) phoneInput.value = "";
  });

  const setError = (input, message) => {
    const wrap = input.closest(".form-field") || input.closest(".form-consent");
    if (!wrap) return;
    wrap.classList.add("has-error");
    input.setAttribute("aria-invalid", "true");
    let error = wrap.querySelector(".form-error");
    if (!error) {
      error = document.createElement("p");
      error.className = "form-error";
      error.id = `${input.name}-error`;
      wrap.append(error);
    }
    error.textContent = message;
    input.setAttribute("aria-describedby", error.id);
  };

  const clearError = (input) => {
    const wrap = input.closest(".form-field") || input.closest(".form-consent");
    if (!wrap) return;
    wrap.classList.remove("has-error");
    input.removeAttribute("aria-invalid");
    wrap.querySelector(".form-error")?.remove();
    input.removeAttribute("aria-describedby");
  };

  const validate = (input) => {
    const value = input.value.trim();
    if (input.name === "name") {
      if (value.length < 2) return "Вкажіть ім’я — мінімум 2 символи.";
      if (/\d/.test(value)) return "Ім’я не повинно містити цифр.";
    }
    if (input.name === "phone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length !== 12 || !digits.startsWith("380")) return "Введіть номер у форматі +380.";
    }
    if (input.name === "type" && !value) return "Оберіть тип робіт.";
    if (input.name === "area") {
      const n = Number(value);
      if (!value || Number.isNaN(n) || n < 10 || n > 2000) return "Вкажіть площу від 10 до 2000 м².";
    }
    if (input.name === "consent" && !input.checked) return "Потрібна згода на обробку даних.";
    return "";
  };

  $$("input, select, textarea", form)
    .filter((input) => input.type !== "hidden" && input.name !== "company")
    .forEach((input) => {
      input.addEventListener("blur", () => {
        if (input.value.trim() || input.type === "checkbox") {
          const message = validate(input);
          if (message) setError(input, message);
          else clearError(input);
        }
      });
      input.addEventListener("input", () => {
        if (input.closest(".has-error")) clearError(input);
      });
      input.addEventListener("change", () => {
        if (input.closest(".has-error")) clearError(input);
      });
    });

  const validateForm = () => {
    let valid = true;
    $$("[required]", form).forEach((input) => {
      const message = validate(input);
      if (message) {
        setError(input, message);
        valid = false;
      } else clearError(input);
    });
    if (!valid) {
      const first = $(".has-error input, .has-error select, .has-error textarea", form);
      first?.focus();
      const message = $(".form-message", form);
      if (message) message.textContent = "Перевірте виділені поля.";
    }
    return valid;
  };

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const button = $('button[type="submit"]', form);
    const original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = "<span>Надсилаємо…</span>";
    await sleep(650);
    const order = `DR-${Math.floor(1000 + Math.random() * 9000)}`;
    $("[data-order]", modal).textContent = order;
    formView.hidden = true;
    successView.hidden = false;
    button.disabled = false;
    button.innerHTML = original;
    successView.querySelector("h3")?.focus?.();
    form.reset();
  });

  /* =========================================================
     Concept switcher
     ========================================================= */
  const variant = document.body.dataset.variant || "1";
  const concepts = {
    "1": "Тиха архітектура",
    "2": "After Dark",
    "3": "Світла галерея",
    "4": "Контраст",
  };
  const switcher = document.createElement("details");
  switcher.className = "concept-switch";
  switcher.innerHTML = `
    <summary><span>Концепт</span><strong>${variant}</strong><span>/ 04</span></summary>
    <div class="concept-switch__menu">
      ${Object.entries(concepts)
        .map(([key, name]) => `<a href="../v${key}/" class="${key === variant ? "is-current" : ""}"><span>0${key}</span>${name}</a>`)
        .join("")}
      <a class="concept-switch__all" href="../"><span>↗</span>Усі концепти</a>
    </div>`;
  document.body.append(switcher);

  document.addEventListener("click", (event) => {
    if (!switcher.open) return;
    if (!switcher.contains(event.target)) switcher.open = false;
  });
  $$("a", switcher).forEach((link) => link.addEventListener("click", () => (switcher.open = false)));

  /* =========================================================
     Small utilities
     ========================================================= */
  $$("[data-current-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));

  // Keep all clicks inside demo links from jumping to an empty anchor.
  $$('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });
})();
