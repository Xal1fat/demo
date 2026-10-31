/* 92° — данные каталога, маршрутизация, корзина, фильтры, сортировка, бронь и оформление. */

(function () {
  'use strict';

  /* ── данные ───────────────────────────────────────────────── */

  var BEANS = [
    { id: 'et-irg', country: 'Эфиопия', region: 'Гиджо', name: 'Иргагачефф', roast: 'light',
      altitude: '1 900 м', process: 'мытая', notes: ['бергамот', 'ирга', 'жасмин'],
      profile: 'Цветочный и цитрусовый: жасмин, бергамот, лёгкая сладость ирги. Чистая чашка с шелковистой кислотностью.',
      roasted: '28 октября', price: 1450, weight: '250 г', pop: 92, accent: '#C9A227', tint: '#EBE1C8' },
    { id: 'ke-kian', country: 'Кения', region: 'Ньери', name: 'Киангу', roast: 'light',
      altitude: '1 750 м', process: 'мытая', notes: ['смородина', 'томат', 'сироп'],
      profile: 'Сочная и яркая кислотность: чёрная смородина, спелый томат, малиновый сироп. Плотное тело для светлой обжарки.',
      roasted: '29 октября', price: 1390, weight: '250 г', pop: 84, accent: '#A4482A', tint: '#EAD8CC' },
    { id: 'co-huila', country: 'Колумбия', region: 'Питалито', name: 'Уила', roast: 'medium',
      altitude: '1 600 м', process: 'хани', notes: ['карамель', 'яблоко', 'какао'],
      profile: 'Сбалансированная и округлая: карамель, красное яблоко, какао. Мягкая кислотность и долгое послевкусие.',
      roasted: '27 октября', price: 1190, weight: '250 г', pop: 88, accent: '#4A6B63', tint: '#DFE7E2' },
    { id: 'br-cerrado', country: 'Бразилия', region: 'Минас-Жерайс', name: 'Серрадо', roast: 'medium',
      altitude: '1 100 м', process: 'натуральная', notes: ['орех', 'шоколад', 'тростник'],
      profile: 'Плотная и сладкая: лесной орех, молочный шоколад, тростниковый сахар. Идеальна для молочных напитков.',
      roasted: '28 октября', price: 990, weight: '250 г', pop: 95, accent: '#2C4A3B', tint: '#DDE6DE' },
    { id: 'gt-hueh', country: 'Гватемала', region: 'Уэуэтенанго', name: 'Уэуэтенанго', roast: 'medium',
      altitude: '1 500 м', process: 'мытая', notes: ['какао', 'апельсин', 'мёд'],
      profile: 'Тёплая и пряная: какао, апельсиновая цедра, цветочный мёд. Гладкая текстура, сдержанная кислотность.',
      roasted: '29 октября', price: 1290, weight: '250 г', pop: 78, accent: '#8A5A44', tint: '#E9DED3' },
    { id: 'id-mand', country: 'Суматра', region: 'Ачех', name: 'Манделинг', roast: 'dark',
      altitude: '1 300 м', process: 'гилинг-басах', notes: ['табак', 'тёмный шоколад', 'кедр'],
      profile: 'Глубокая и землистая: табак, горький шоколад, кедр. Минимум кислотности, сиропистое тело.',
      roasted: '27 октября', price: 1150, weight: '250 г', pop: 70, accent: '#3B352B', tint: '#DED8CB' },
    { id: 'cr-tar', country: 'Коста-Рика', region: 'Сан-Маркос', name: 'Тарразу', roast: 'light',
      altitude: '1 650 м', process: 'хани', notes: ['апельсин', 'мёд', 'тростник'],
      profile: 'Яркая и медово-цитрусовая: апельсин, белый мёд, тростник. Чистое и сладкое послевкусие.',
      roasted: '30 октября', price: 1340, weight: '250 г', pop: 75, accent: '#7A7344', tint: '#E7E3D2' },
    { id: 'rw-nyam', country: 'Руанда', region: 'Ньямашеке', name: 'Ньямашеке', roast: 'light',
      altitude: '1 800 м', process: 'мытая', notes: ['слива', 'карамель', 'чёрный чай'],
      profile: 'Фруктовая и чайная: слива, карамель, чёрный чай. Яркая ягодная кислотность, лёгкое тело.',
      roasted: '30 октября', price: 1280, weight: '250 г', pop: 66, accent: '#9A5B3C', tint: '#EBDDD2' },
    { id: 'ye-mocha', country: 'Йемен', region: 'Бейт-аль-Факих', name: 'Моха', roast: 'dark',
      altitude: '2 100 м', process: 'натуральная', notes: ['пряности', 'инжир', 'шоколад'],
      profile: 'Редкая и плотная: пряности, сушёный инжир, тёмный шоколад. Почти винная текстура, долгий финиш.',
      roasted: '26 октября', price: 1990, weight: '200 г', pop: 60, accent: '#5C3B4A', tint: '#E8DCE0' }
  ];

  var TECH = [
    { id: 'linea-mini', brand: 'La Marzocco', name: 'Linea Mini', category: 'machine',
      specs: [['Давление', '9 бар'], ['Бойлер', '3 л, двойной'], ['Группа', '58 мм'], ['Мощность', '1 700 Вт']],
      desc: 'Домашняя машина с коммерческой группой и двойным бойлером. Стабильная температура и настоящий пар для молока.',
      price: 385000, avail: 'stock', pop: 80, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'rocket-app', brand: 'Rocket', name: 'Appartamento', category: 'machine',
      specs: [['Давление', '9 бар'], ['Бойлер', '1,8 л, теплообменник'], ['Группа', '58 мм'], ['Мощность', '1 200 Вт']],
      desc: 'Компактная E61-группа и теплообменник. Проверенная классика для дома, рассчитанная на годы работы.',
      price: 249000, avail: 'stock', pop: 72, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'sage-express', brand: 'Sage', name: 'The Barista Express', category: 'machine',
      specs: [['Давление', '9 бар'], ['Бойлер', 'термоблок'], ['Группа', '54 мм'], ['Мельница', 'встроенная, коническая']],
      desc: 'Машина и мельница в одном корпусе. Настройка помола, темперовка и экстракция без лишних устройств.',
      price: 145000, avail: 'order', pop: 65, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'ek43', brand: 'Mahlkönig', name: 'EK43', category: 'grinder',
      specs: [['Жернова', '98 мм, плоские'], ['Производительность', 'до 20 г/с'], ['Помол', 'эспрессо и фильтр'], ['Мощность', '1 300 Вт']],
      desc: 'Эталонная мельница для эспрессо и фильтра. Однородный помол и точная регулировка на каждый метод.',
      price: 178000, avail: 'soldout', pop: 76, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'fellow-ode', brand: 'Fellow', name: 'Ode Gen 2', category: 'grinder',
      specs: [['Жернова', '64 мм, плоские'], ['Помол', 'фильтр'], ['Ёмкость', '100 г'], ['Привод', 'тихий, 220 Вт']],
      desc: 'Домашняя мельница для фильтра с плоскими жерновами. Тихий мотор и нулевое удержание помола.',
      price: 44000, avail: 'stock', pop: 69, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'baratza-esp', brand: 'Baratza', name: 'Encore ESP', category: 'grinder',
      specs: [['Жернова', '40 мм, конические'], ['Помол', 'эспрессо и фильтр'], ['Ёмкость', '40 г'], ['Регулировка', '40 ступеней']],
      desc: 'Бюджетная мельница на все случаи: от эспрессо до френч-пресса. Лёгкая чистка и стабильный помол.',
      price: 23000, avail: 'order', pop: 58, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'acaia-lunar', brand: 'Acaia', name: 'Lunar', category: 'accessory', kind: 'scale',
      specs: [['Точность', '0,1 г'], ['Таймер', 'автостарт'], ['Питание', 'USB-C'], ['Связь', 'Bluetooth']],
      desc: 'Влагозащищённые весы для эспрессо с автостартом таймера. Точность, на которую можно положиться.',
      price: 32000, avail: 'stock', pop: 74, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'motta-tamper', brand: 'Motta', name: 'Europa Tamper', category: 'accessory', kind: 'tamper',
      specs: [['База', '58,35 мм'], ['Материал', 'нержавеющая сталь'], ['Вес', '490 г'], ['Рукоять', 'алюминий']],
      desc: 'Цельный темпер с точной базой под корзину 58 мм. Уверенный хват и ровная темперовка.',
      price: 6900, avail: 'stock', pop: 52, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'rhino-pitcher', brand: 'Rhino', name: 'Milk Pitcher', category: 'accessory', kind: 'pitcher',
      specs: [['Объём', '450 мл'], ['Материал', 'нержавеющая сталь'], ['Носик', 'узкий'], ['Покрытие', 'матовое']],
      desc: 'Питчер для латте-арта с узким носиком. Удобный баланс и предсказуемый поток молока.',
      price: 3900, avail: 'soldout', pop: 48, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'hario-v60', brand: 'Hario', name: 'V60 02', category: 'accessory', kind: 'dripper',
      specs: [['Размер', '02, 1–4 чашки'], ['Материал', 'керамика'], ['Спираль', 'спиральные рёбра'], ['Совместимость', 'бумажные фильтры']],
      desc: 'Классическая керамическая воронка для фильтра. Спиральные рёбра дают ровную экстракцию.',
      price: 1900, avail: 'stock', pop: 61, accent: '#2F4858', tint: '#E3E9ED' }
  ];

  var MENU = [
    { cat: 'espresso', label: 'эспрессо', items: [
      ['Эспрессо', 200], ['Флэт уайт', 320], ['Капучино', 300], ['Кортадо', 260], ['Латте с солодом', 340], ['Раф ванильный', 360]
    ] },
    { cat: 'filter', label: 'фильтр', items: [
      ['V60, Эфиопия', 380], ['Аэропресс, Кения', 380], ['Кемекс на двоих', 520], ['Колд брю', 300], ['Чайная карта', 250]
    ] },
    { cat: 'food', label: 'к завтраку', items: [
      ['Круассан миндальный', 260], ['Банановый хлеб', 240], ['Сэндвич с индейкой', 420], ['Сырники', 380], ['Гранола с йогуртом', 340]
    ] }
  ];

  var ROAST_LEVEL = { light: 1, medium: 2, dark: 3 };
  var ROAST_RU = { light: 'светлая', medium: 'средняя', dark: 'тёмная' };
  var AVAIL = { stock: 'в наличии', order: 'под заказ', soldout: 'нет в наличии' };
  var STORE_KEY = '92cart';

  var state = {
    beanRoast: 'all',
    beanSort: 'pop',
    techCat: 'machine',
    menuCat: 'espresso'
  };

  /* ── утилиты ─────────────────────────────────────────────── */

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var money = function (n) { return n.toLocaleString('ru-RU').replace(/\u00a0/g, '\u2009') + ' ₽'; };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  function media(svg) { return '<div class="media">' + svg + '</div>'; }
  function slice(svg) { return String(svg).replace('xMidYMid meet', 'xMidYMid slice'); }

  var catalog = function () { return BEANS.concat(TECH); };
  var findItem = function (id) { return catalog().find(function (x) { return x.id === id; }); };
  var isBean = function (x) { return !!x.country; };

  /* ── корзина ─────────────────────────────────────────────── */

  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(STORE_KEY) || '[]') || []; } catch (e) { cart = []; }

  function saveCart() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch (e) { /* приватный режим */ }
  }

  function addToCart(id, silent) {
    var unit = findItem(id);
    if (!unit || unit.avail === 'soldout') return;
    var row = cart.find(function (x) { return x.id === id; });
    if (row) row.qty += 1;
    else cart.push({ id: id, qty: 1 });
    saveCart();
    renderCart();
    if (!silent) {
      openCart();
      toast(unit.name + ' — в корзине');
    }
  }

  function removeFromCart(id) {
    cart = cart.filter(function (x) { return x.id !== id; });
    saveCart();
    renderCart();
  }

  function changeQty(id, delta) {
    var row = cart.find(function (x) { return x.id === id; });
    if (!row) return;
    row.qty += delta;
    if (row.qty <= 0) cart = cart.filter(function (x) { return x.id !== id; });
    saveCart();
    renderCart();
  }

  function cartCount() { return cart.reduce(function (n, r) { return n + r.qty; }, 0); }
  function cartTotal() {
    return cart.reduce(function (sum, row) {
      var unit = findItem(row.id);
      return sum + (unit ? unit.price * row.qty : 0);
    }, 0);
  }

  function renderCart() {
    var body = $('#cartBody');
    var badge = $('#cartBadge');
    var count = cartCount();
    badge.textContent = count;
    badge.hidden = count === 0;
    $('#cartTotal').textContent = money(cartTotal());

    if (!cart.length) {
      body.innerHTML = '<p class="cart-empty">Пока пусто. Зерно — в каталоге, техника — там же.</p>' +
        '<a class="cart-empty-link" href="#/beans">Перейти к зерну</a>';
      return;
    }

    body.innerHTML = cart.map(function (row) {
      var unit = findItem(row.id);
      if (!unit) return '';
      var meta = unit.country
        ? unit.country + ' · ' + unit.weight + ' · ' + ROAST_RU[unit.roast]
        : unit.brand + ' · ' + unit.name;
      return '<article class="cart-item" data-id="' + unit.id + '">' +
        '<button class="cart-remove" type="button" data-remove="' + unit.id + '" aria-label="Удалить ' + esc(unit.name) + '">×</button>' +
        '<h4>' + esc(unit.name) + '</h4>' +
        '<p>' + esc(meta) + '</p>' +
        '<div class="qty">' +
          '<button type="button" data-act="minus" aria-label="Убрать одну позицию">−</button>' +
          '<span>' + row.qty + '</span>' +
          '<button type="button" data-act="plus" aria-label="Добавить одну позицию">+</button>' +
        '</div>' +
        '<span class="sum">' + money(unit.price * row.qty) + '</span>' +
      '</article>';
    }).join('');
  }

  /* ── корзина: открытие ───────────────────────────────────── */

  var cartEl = $('#cart');
  var veil = $('#cartVeil');

  function openCart() {
    cartEl.classList.add('is-open');
    cartEl.setAttribute('aria-hidden', 'false');
    veil.hidden = false;
    requestAnimationFrame(function () { veil.classList.add('is-open'); });
    $('#cartOpen').setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    $('#cartClose').focus();
  }

  function closeCart() {
    cartEl.classList.remove('is-open');
    cartEl.setAttribute('aria-hidden', 'true');
    veil.classList.remove('is-open');
    setTimeout(function () { veil.hidden = true; }, 250);
    $('#cartOpen').setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    $('#cartOpen').focus();
  }

  /* ── роутер ──────────────────────────────────────────────── */

  function parseHash() {
    var h = location.hash.replace(/^#\/?/, '');
    return h.split('/').filter(Boolean);
  }

  function navigate(path) { location.hash = '#/' + path; }

  function renderApp() {
    var parts = parseHash();
    var app = $('#app');
    var name = parts[0] || 'home';

    app.classList.remove('is-in');
    if (name === 'beans') { app.innerHTML = viewBeans(); }
    else if (name === 'tech') { app.innerHTML = viewTech(); }
    else if (name === 'bar') { app.innerHTML = viewBar(); }
    else if (name === 'product') { app.innerHTML = viewProduct(parts[1]); }
    else if (name === 'checkout') { app.innerHTML = viewCheckout(); }
    else { app.innerHTML = viewHome(); }

    highlightNav(name);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    void app.offsetWidth; /* перезапуск перехода */
    requestAnimationFrame(function () { app.classList.add('is-in'); });
  }

  function highlightNav(name) {
    var key = name === 'product' ? (findItem(parseHash()[1]) ? (isBean(findItem(parseHash()[1])) ? 'beans' : 'tech') : '') : name;
    $$('.nav a').forEach(function (a) {
      a.classList.toggle('is-active', a.dataset.nav === key || (key === '' && a.dataset.nav === 'home'));
    });
  }

  /* ── компоненты ──────────────────────────────────────────── */

  function roastDots(level) {
    var n = ROAST_LEVEL[level] || 1;
    return '<span class="roast" aria-label="Обжарка: ' + ROAST_RU[level] + '">' +
      [1, 2, 3].map(function (i) { return '<i class="' + (i <= n ? 'on' : '') + '"></i>'; }).join('') +
      '</span>';
  }

  function beanMedia(b) {
    return '<a class="media card-link" href="#/product/' + b.id + '" aria-label="' + esc(b.name) + ' — подробнее">' +
      Images.beanBag(b) + '<span class="media-hint">Подробнее</span></a>';
  }

  function techMedia(p) {
    var svg = p.category === 'grinder' ? Images.machine(p)
      : p.category === 'accessory' ? Images.accessory(p) : Images.machine(p);
    return '<a class="media card-link" href="#/product/' + p.id + '" aria-label="' + esc(p.name) + ' — подробнее">' +
      svg + '<span class="media-hint">Подробнее</span></a>';
  }

  function stockBadge(avail) {
    var cls = avail === 'stock' ? 'stock--ok' : avail === 'order' ? 'stock--order' : 'stock--out';
    return '<span class="stock ' + cls + '">' + AVAIL[avail] + '</span>';
  }

  function addBtn(id, cls) {
    var unit = findItem(id);
    var disabled = unit && unit.avail === 'soldout' ? ' disabled' : '';
    return '<button class="add' + (cls ? ' ' + cls : '') + '" type="button" data-add="' + id + '"' + disabled + '>' +
      (disabled ? 'нет в наличии' : 'В корзину') + '</button>';
  }

  /* ── представление: главная ──────────────────────────────── */

  function viewHome() {
    var featuredBeans = BEANS.slice().sort(function (a, b) { return b.pop - a.pop; }).slice(0, 3);
    var featuredTech = TECH.filter(function (p) { return p.category !== 'accessory'; })
      .sort(function (a, b) { return b.pop - a.pop; }).slice(0, 3);

    var dirs = [
      { accent: 'bean', idx: '01', word: 'Зерно', sub: '9 лотов обжарки', href: '#/beans', img: slice(Images.beanBag(BEANS[0])) },
      { accent: 'tech', idx: '02', word: 'Техника', sub: 'машины и мельницы', href: '#/tech', img: slice(Images.machine(TECH[0])) },
      { accent: 'bar', idx: '03', word: 'Бар', sub: 'меню и бронь', href: '#/bar', img: slice(Images.interior()) }
    ];

    return '' +
      '<section class="hero view">' +
        '<div class="hero-grid">' +
          '<div class="hero-copy">' +
            '<p class="eyebrow">Спешелти-обжарка · Москва, Покровка</p>' +
            '<h1>Кофе, который<br>говорит сам за себя<span class="dot">.</span></h1>' +
            '<p class="lead">Обжариваем малыми партиями, подбираем технику под вашу кухню и варим честный эспрессо в собственном баре. Три вещи — один стандарт качества.</p>' +
            '<div class="hero-actions">' +
              '<a class="btn btn--solid" href="#/beans">Выбрать зерно</a>' +
              '<a class="btn btn--ghost" href="#/bar">Забронировать стол</a>' +
            '</div>' +
            '<dl class="hero-stats">' +
              '<div><dt>Адрес</dt><dd>Покровка, 12</dd></div>' +
              '<div><dt>Часы</dt><dd>8:00 — 22:00</dd></div>' +
              '<div><dt>Обжарка</dt><dd>пн и вт</dd></div>' +
              '<div><dt>Лотов</dt><dd>9 в наличии</dd></div>' +
            '</dl>' +
          '</div>' +
          '<div class="hero-media">' + Images.hero() + '</div>' +
        '</div>' +
        '<div class="directions" role="list">' +
          dirs.map(function (d) {
            return '<a class="dir" href="' + d.href + '" role="listitem" data-accent="' + d.accent + '">' +
              '<span class="dir-media">' + d.img + '</span>' +
              '<span class="dir-index">' + d.idx + '</span>' +
              '<span class="dir-word">' + d.word + '</span>' +
              '<span class="dir-sub">' + d.sub + '</span>' +
              '<span class="dir-arrow" aria-hidden="true">→</span>' +
            '</a>';
          }).join('') +
        '</div>' +
      '</section>' +

      '<section class="band band--beans">' +
        '<header class="band-head">' +
          '<div><p class="eyebrow">Свежая обжарка</p><h2>Зерно недели</h2></div>' +
          '<a class="band-link" href="#/beans">Все лоты →</a>' +
        '</header>' +
        '<div class="bean-row">' +
          featuredBeans.map(function (b) {
            return '<article class="bean-card" data-roast="' + b.roast + '">' +
              beanMedia(b) +
              '<div class="bean-body">' +
                '<div class="bean-top"><span>' + esc(b.country) + '</span>' + roastDots(b.roast) + '</div>' +
                '<a class="title-link" href="#/product/' + b.id + '"><h3>' + esc(b.name) + '</h3></a>' +
                '<p class="bean-meta">' + esc(b.region) + ' · ' + esc(b.altitude) + ' · ' + esc(b.process) + '</p>' +
                '<div class="bean-foot"><span class="price">' + money(b.price) + ' <small>' + esc(b.weight) + '</small></span>' +
                addBtn(b.id) + '</div>' +
              '</div>' +
            '</article>';
          }).join('') +
        '</div>' +
      '</section>' +

      '<section class="band band--tech">' +
        '<header class="band-head">' +
          '<div><p class="eyebrow">Оборудование</p><h2>Техника под ваш способ</h2></div>' +
          '<a class="band-link" href="#/tech">Весь каталог →</a>' +
        '</header>' +
        '<div class="tech-row">' +
          featuredTech.map(function (p) {
            return '<article class="tech-card">' +
              techMedia(p) +
              '<div class="tech-body">' +
                '<div class="tech-meta"><span class="brand">' + esc(p.brand) + '</span>' + stockBadge(p.avail) + '</div>' +
                '<a class="title-link" href="#/product/' + p.id + '"><h3>' + esc(p.name) + '</h3></a>' +
                '<div class="tech-foot"><span class="price">' + money(p.price) + '</span>' + addBtn(p.id) + '</div>' +
              '</div>' +
            '</article>';
          }).join('') +
        '</div>' +
      '</section>' +

      '<section class="band band--bar">' +
        '<div class="bar-teaser">' +
          '<div class="bar-teaser-media">' + Images.interior() + '</div>' +
          '<div class="bar-teaser-copy">' +
            '<p class="eyebrow">Кофейня</p>' +
            '<h2>Бар на Покровке</h2>' +
            '<p>Шесть мест у окна, длинный стол и полка с зерном. Эспрессо, фильтр и завтраки — каждый день с восьми до десяти.</p>' +
            '<div class="hero-actions"><a class="btn btn--solid" href="#/bar">Меню и бронь</a></div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      contactsBlock();
  }

  /* ── представление: зерно ────────────────────────────────── */

  function viewBeans() {
    return '' +
      '<section class="view catalog">' +
        '<header class="page-head">' +
          '<p class="eyebrow">01 · Обжарка</p>' +
          '<h1>Зерно</h1>' +
          '<p class="page-note">Обжариваем по понедельникам и вторникам, отправляем в день обжарки. У каждого лота — дата, регион и профиль вкуса.</p>' +
        '</header>' +
        '<div class="controls">' +
          '<div class="roast-filter" role="group" aria-label="Фильтр по обжарке">' +
            ['all', 'light', 'medium', 'dark'].map(function (r) {
              var label = r === 'all' ? 'все' : ROAST_RU[r];
              return '<button class="chip" type="button" data-roast="' + r + '" aria-pressed="' + (state.beanRoast === r) + '">' + label + '</button>';
            }).join('') +
          '</div>' +
          '<label class="sort">Сортировка' +
            '<select id="beanSort">' +
              '<option value="pop"' + (state.beanSort === 'pop' ? ' selected' : '') + '>по популярности</option>' +
              '<option value="price-asc"' + (state.beanSort === 'price-asc' ? ' selected' : '') + '>сначала дешевле</option>' +
              '<option value="price-desc"' + (state.beanSort === 'price-desc' ? ' selected' : '') + '>сначала дороже</option>' +
            '</select>' +
          '</label>' +
        '</div>' +
        '<div class="beans" id="beansList">' + beansList() + '</div>' +
      '</section>';
  }

  function filteredBeans() {
    var list = BEANS.filter(function (b) { return state.beanRoast === 'all' || b.roast === state.beanRoast; });
    if (state.beanSort === 'price-asc') list.sort(function (a, b) { return a.price - b.price; });
    else if (state.beanSort === 'price-desc') list.sort(function (a, b) { return b.price - a.price; });
    else list.sort(function (a, b) { return b.pop - a.pop; });
    return list;
  }

  function beansList() {
    var list = filteredBeans();
    if (!list.length) return '<p class="empty">Под эту обжарку лотов сейчас нет.</p>';
    return list.map(function (b) {
      return '<article class="bean-card" data-roast="' + b.roast + '">' +
        beanMedia(b) +
        '<div class="bean-body">' +
          '<div class="bean-top"><span>' + esc(b.country) + ' · ' + esc(b.region) + '</span>' + roastDots(b.roast) + '</div>' +
          '<a class="title-link" href="#/product/' + b.id + '"><h3>' + esc(b.name) + '</h3></a>' +
          '<p class="bean-meta">' + esc(b.altitude) + ' · ' + esc(b.process) + ' · ' + esc(b.weight) + '</p>' +
          '<ul class="notes">' + b.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' +
          '<div class="bean-foot"><span class="price">' + money(b.price) + ' <small>' + esc(b.weight) + '</small></span>' +
          addBtn(b.id) + '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  /* ── представление: техника ──────────────────────────────── */

  function viewTech() {
    return '' +
      '<section class="view catalog catalog--tech">' +
        '<header class="page-head">' +
          '<p class="eyebrow">02 · Оборудование</p>' +
          '<h1>Техника</h1>' +
          '<p class="page-note">То, что стоит в нашем баре и что мы ставим клиентам. Привозим, подключаем, учим и обслуживаем.</p>' +
        '</header>' +
        '<div class="tech-tabs" role="tablist" aria-label="Категории техники">' +
          [['machine', 'кофемашины'], ['grinder', 'кофемолки'], ['accessory', 'аксессуары']].map(function (c) {
            return '<button class="tech-tab" type="button" role="tab" data-cat="' + c[0] + '" aria-selected="' + (state.techCat === c[0]) + '">' + c[1] + '</button>';
          }).join('') +
        '</div>' +
        '<div class="tech-grid" id="techList">' + techList() + '</div>' +
        '<div class="service-strip">' +
          '<div><strong>Установка</strong><span>подключение к воде и канализации</span></div>' +
          '<div><strong>Обучение</strong><span>два часа с бариста и настройка помола</span></div>' +
          '<div><strong>Сервис</strong><span>выезд за 24 часа, подменная машина</span></div>' +
        '</div>' +
      '</section>';
  }

  function techList() {
    var list = TECH.filter(function (p) { return p.category === state.techCat; });
    return list.map(function (p) {
      return '<article class="tech-card">' +
        techMedia(p) +
        '<div class="tech-body">' +
          '<div class="tech-meta"><span class="brand">' + esc(p.brand) + '</span>' + stockBadge(p.avail) + '</div>' +
          '<a class="title-link" href="#/product/' + p.id + '"><h3>' + esc(p.name) + '</h3></a>' +
          '<p class="tech-desc">' + esc(p.desc) + '</p>' +
          '<div class="tech-foot"><span class="price">' + money(p.price) + '</span>' + addBtn(p.id) + '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  /* ── представление: товар ────────────────────────────────── */

  function viewProduct(id) {
    var unit = findItem(id);
    if (!unit) return viewNotFound();

    var backHref = isBean(unit) ? '#/beans' : '#/tech';
    var backLabel = isBean(unit) ? 'К каталогу зерна' : 'К каталогу техники';

    if (isBean(unit)) {
      return '' +
        '<section class="view product">' +
          '<a class="back" href="' + backHref + '">← ' + backLabel + '</a>' +
          '<div class="product-grid">' +
            '<div class="product-media">' + Images.beanBag(unit) + '</div>' +
            '<div class="product-info">' +
              '<p class="eyebrow">' + esc(unit.country) + ' · ' + esc(unit.region) + '</p>' +
              '<h1>' + esc(unit.name) + '</h1>' +
              '<p class="product-sub">' + ROAST_RU[unit.roast] + ' обжарка · ' + esc(unit.weight) + '</p>' +
              '<p class="product-desc">' + esc(unit.profile) + '</p>' +
              '<dl class="product-specs">' +
                '<div><dt>Регион</dt><dd>' + esc(unit.region) + '</dd></div>' +
                '<div><dt>Высота</dt><dd>' + esc(unit.altitude) + '</dd></div>' +
                '<div><dt>Обработка</dt><dd>' + esc(unit.process) + '</dd></div>' +
                '<div><dt>Обжарено</dt><dd>' + esc(unit.roasted) + '</dd></div>' +
                '<div><dt>Вес</dt><dd>' + esc(unit.weight) + '</dd></div>' +
              '</dl>' +
              '<ul class="notes notes--big">' + unit.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' +
              '<div class="product-buy"><span class="price">' + money(unit.price) + '</span>' + addBtn(unit.id, 'btn--solid') + '</div>' +
            '</div>' +
          '</div>' +
        '</section>';
    }

    return '' +
      '<section class="view product">' +
        '<a class="back" href="' + backHref + '">← ' + backLabel + '</a>' +
        '<div class="product-grid">' +
          '<div class="product-media">' + (unit.category === 'grinder' ? Images.machine(unit) : unit.category === 'accessory' ? Images.accessory(unit) : Images.machine(unit)) + '</div>' +
          '<div class="product-info">' +
            '<p class="eyebrow">' + esc(unit.brand) + ' · ' + esc({ machine: 'кофемашина', grinder: 'кофемолка', accessory: 'аксессуар' }[unit.category]) + '</p>' +
            '<h1>' + esc(unit.name) + '</h1>' +
            '<div class="product-sub product-sub--row"><span>' + stockBadge(unit.avail) + '</span></div>' +
            '<p class="product-desc">' + esc(unit.desc) + '</p>' +
            '<dl class="product-specs">' +
              unit.specs.map(function (s) { return '<div><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></div>'; }).join('') +
            '</dl>' +
            '<div class="product-buy"><span class="price">' + money(unit.price) + '</span>' + addBtn(unit.id, 'btn--solid') + '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
  }

  function viewNotFound() {
    return '<section class="view"><div class="empty-state"><h1>Ничего не нашлось</h1>' +
      '<p>Такого товара нет — возможно, ссылка устарела.</p>' +
      '<a class="btn btn--solid" href="#/beans">К зерну</a> <a class="btn btn--ghost" href="#/tech">К технике</a></div></section>';
  }

  /* ── представление: бар ──────────────────────────────────── */

  function viewBar() {
    var cats = MENU.map(function (m) {
      return '<button class="tab" type="button" role="tab" data-cat="' + m.cat + '" aria-selected="' + (state.menuCat === m.cat) + '">' + m.label + '</button>';
    }).join('');

    var active = MENU.find(function (m) { return m.cat === state.menuCat; }) || MENU[0];
    var menuHtml = '<ul class="menu-list">' + active.items.map(function (it) {
      return '<li><span class="menu-name">' + esc(it[0]) + '</span><span class="menu-rule"></span><span class="menu-price">' + money(it[1]) + '</span></li>';
    }).join('') + '</ul>';

    return '' +
      '<section class="view bar">' +
        '<header class="page-head">' +
          '<p class="eyebrow">03 · Кофейня</p>' +
          '<h1>Бар</h1>' +
          '<p class="page-note">Покровка, 12 · каждый день с 8:00 до 22:00. Шесть мест у окна, длинный стол и полка с зерном.</p>' +
        '</header>' +

        '<div class="bar-banner">' +
          Images.interior() +
          '<div class="bar-banner-meta">' +
            '<span>Москва, Покровка, 12</span>' +
            '<span>8:00 — 22:00, без выходных</span>' +
            '<span><a href="tel:+74951234592">+7 495 123-45-92</a></span>' +
          '</div>' +
        '</div>' +

        '<div class="bar-grid">' +
          '<div class="menu">' +
            '<div class="tabs" role="tablist" aria-label="Меню бара">' + cats + '</div>' +
            '<div class="tab-panel" role="tabpanel">' + menuHtml + '</div>' +
          '</div>' +
          '<aside class="booking">' +
            '<h3>Стол на вечер</h3>' +
            '<p class="booking-note">Бронь на 1–6 человек, минимум 30 минут. Демо: заявка никуда не уходит.</p>' +
            '<form id="bookingForm">' +
              '<label>Имя<input type="text" name="name" required placeholder="Как вас встретить"></label>' +
              '<div class="booking-row">' +
                '<label>Дата<input type="date" name="date" required></label>' +
                '<label>Гостей<select name="guests"><option>1</option><option>2</option><option selected>3</option><option>4</option><option>5</option><option>6</option></select></label>' +
              '</div>' +
              '<label>Время<select name="time"><option>12:00</option><option>14:00</option><option>16:00</option><option selected>18:00</option><option>20:00</option></select></label>' +
              '<button class="btn btn--solid btn--wide" type="submit">Забронировать</button>' +
            '</form>' +
            '<p class="booking-done" id="bookingDone" hidden>Готово — стол записан на демо-сервере.</p>' +
          '</aside>' +
        '</div>' +

        '<div class="drinks-strip">' +
          [['espresso', 'Эспрессо', '#A4482A'], ['flat', 'Флэт уайт', '#C9A227'], ['filter', 'V60', '#2C4A3B']].map(function (d) {
            return '<div class="drink">' + Images.drink(d[0], d[2]) + '<span>' + d[1] + '</span></div>';
          }).join('') +
        '</div>' +

        '<div class="bar-contacts">' +
          '<div><span>Обжарка</span><strong>пн и вт, с 10:00</strong></div>' +
          '<div><span>Дегустация</span><strong>суббота, 12:00</strong></div>' +
          '<div><span>Доставка</span><strong>по Москве за 1–2 дня</strong></div>' +
          '<div><span>Телефон</span><strong><a href="tel:+74951234592">+7 495 123-45-92</a></strong></div>' +
        '</div>' +
      '</section>';
  }

  /* ── представление: оформление ───────────────────────────── */

  function viewCheckout() {
    var items = cart.map(function (row) {
      var unit = findItem(row.id);
      if (!unit) return '';
      return '<li><span class="co-name">' + esc(unit.name) + ' <small>× ' + row.qty + '</small></span>' +
        '<span class="co-sum">' + money(unit.price * row.qty) + '</span></li>';
    }).join('');

    return '' +
      '<section class="view checkout">' +
        '<header class="page-head">' +
          '<p class="eyebrow">Демо-заказ</p>' +
          '<h1>Оформление</h1>' +
          '<p class="page-note">На этом этапе списание не происходит: форма только демонстрирует процесс покупки.</p>' +
        '</header>' +
        (cart.length
          ? '<div class="checkout-grid">' +
              '<form class="checkout-form" id="checkoutForm">' +
                '<fieldset class="co-fieldset">' +
                  '<legend>Контакт</legend>' +
                  '<div class="co-row">' +
                    '<label>Имя<input type="text" name="name" required autocomplete="name" placeholder="Как к вам обращаться"></label>' +
                    '<label>Телефон<input type="tel" name="phone" required autocomplete="tel" placeholder="+7 ___ ___-__-__"></label>' +
                  '</div>' +
                  '<label>Email<input type="email" name="email" required autocomplete="email" placeholder="you@example.com"></label>' +
                '</fieldset>' +
                '<fieldset class="co-fieldset">' +
                  '<legend>Доставка</legend>' +
                  '<div class="co-row">' +
                    '<label>Город<input type="text" name="city" required autocomplete="address-level2" placeholder="Москва"></label>' +
                    '<label>Адрес<input type="text" name="address" required autocomplete="street-address" placeholder="Улица, дом, квартира"></label>' +
                  '</div>' +
                  '<div class="co-options" role="radiogroup" aria-label="Способ доставки">' +
                    '<label class="co-option"><input type="radio" name="delivery" value="courier" checked><span>Курьер — 1–2 дня, от 300 ₽</span></label>' +
                    '<label class="co-option"><input type="radio" name="delivery" value="pickup"><span>Самовывоз из бара на Покровке</span></label>' +
                  '</div>' +
                '</fieldset>' +
                '<fieldset class="co-fieldset">' +
                  '<legend>Оплата</legend>' +
                  '<div class="co-options" role="radiogroup" aria-label="Способ оплаты">' +
                    '<label class="co-option"><input type="radio" name="payment" value="card" checked><span>Картой при получении</span></label>' +
                    '<label class="co-option"><input type="radio" name="payment" value="online"><span>Онлайн (демо, без списания)</span></label>' +
                  '</div>' +
                '</fieldset>' +
                '<button class="btn btn--solid btn--wide" type="submit">Подтвердить заказ</button>' +
                '<p class="co-note">Это демо: заказ не отправляется и не оплачивается.</p>' +
              '</form>' +
              '<aside class="order-summary">' +
                '<h3>Ваш заказ</h3>' +
                '<ul class="co-list">' + items + '</ul>' +
                '<p class="co-total"><span>Итого</span><strong>' + money(cartTotal()) + '</strong></p>' +
                '<p class="co-hint">Бесплатная доставка от 3 000 ₽</p>' +
              '</aside>' +
            '</div>'
          : '<div class="empty-state"><h1>Корзина пуста</h1><p>Добавьте товар, чтобы оформить заказ.</p>' +
              '<a class="btn btn--solid" href="#/beans">К зерну</a></div>') +
      '</section>';
  }

  function contactsBlock() {
    return '' +
      '<section class="contacts" id="contacts">' +
        '<div class="contacts-grid">' +
          '<div>' +
            '<p class="eyebrow">Приходите</p>' +
            '<h2 class="contacts-title">92°</h2>' +
            '<p class="contacts-line">Москва, Покровка, 12<br>каждый день 8:00–22:00<br><a href="tel:+74951234592">+7 495 123-45-92</a></p>' +
          '</div>' +
          '<div class="contacts-hours">' +
            '<div><span>Обжарка</span><strong>пн и вт, с 10:00</strong></div>' +
            '<div><span>Дегустация</span><strong>суббота, 12:00</strong></div>' +
            '<div><span>Доставка</span><strong>по Москве за 1–2 дня</strong></div>' +
          '</div>' +
        '</div>' +
      '</section>';
  }

  /* ── события ─────────────────────────────────────────────── */

  document.addEventListener('click', function (e) {
    var add = e.target.closest('[data-add]');
    if (add) {
      addToCart(add.dataset.add);
      add.dataset.added = 'true';
      var label = add.textContent;
      add.textContent = 'Добавлено';
      setTimeout(function () {
        delete add.dataset.added;
        add.textContent = label;
      }, 1300);
      return;
    }

    var remove = e.target.closest('[data-remove]');
    if (remove) {
      removeFromCart(remove.dataset.remove);
      return;
    }

    var chip = e.target.closest('.roast-filter .chip');
    if (chip) {
      state.beanRoast = chip.dataset.roast;
      $$('.roast-filter .chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      var list = $('#beansList');
      if (list) list.innerHTML = beansList();
      return;
    }

    var ttab = e.target.closest('.tech-tab');
    if (ttab) {
      state.techCat = ttab.dataset.cat;
      $$('.tech-tab').forEach(function (t) { t.setAttribute('aria-selected', String(t === ttab)); });
      $('#techList').innerHTML = techList();
      return;
    }

    var tab = e.target.closest('.tab');
    if (tab) {
      selectMenuCat(tab.dataset.cat);
      return;
    }
  });

  document.addEventListener('change', function (e) {
    if (e.target.id === 'beanSort') {
      state.beanSort = e.target.value;
      $('#beansList').innerHTML = beansList();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var t = e.target.closest('.tab, .tech-tab');
    if (!t) return;
    e.preventDefault();
    var group = Array.prototype.slice.call(t.parentElement.children);
    var i = group.indexOf(t);
    var next = group[(i + (e.key === 'ArrowRight' ? 1 : group.length - 1)) % group.length];
    next.focus();
    next.click();
  });

  document.addEventListener('submit', function (e) {
    if (e.target.id === 'bookingForm') {
      e.preventDefault();
      var form = e.target;
      var name = form.elements.name.value.trim();
      var date = form.elements.date.value;
      if (!name || !date) { toast('Заполните имя и дату'); return; }
      $('#bookingDone').hidden = false;
      $('#bookingDone').textContent = 'Готово: стол на ' + form.elements.time.value + ', ' +
        form.elements.guests.value + ' чел., ' + date + '. Демо — заявка не отправляется.';
      form.reset();
      toast('Стол забронирован (демо)');
    } else if (e.target.id === 'checkoutForm') {
      e.preventDefault();
      submitOrder(e.target);
    }
  });

  function selectMenuCat(cat) {
    state.menuCat = cat;
    $$('.tab').forEach(function (t) { t.setAttribute('aria-selected', String(t.dataset.cat === cat)); });
    var m = MENU.find(function (x) { return x.cat === cat; });
    var panel = $('.tab-panel');
    if (m && panel) {
      panel.innerHTML = '<ul class="menu-list">' + m.items.map(function (it) {
        return '<li><span class="menu-name">' + esc(it[0]) + '</span><span class="menu-rule"></span><span class="menu-price">' + money(it[1]) + '</span></li>';
      }).join('') + '</ul>';
    }
  }

  function submitOrder(form) {
    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.trim();
    var email = form.elements.email.value.trim();
    var city = form.elements.city.value.trim();
    var address = form.elements.address.value.trim();
    if (!name || !phone || !email || !city || !address) {
      toast('Заполните все поля');
      return;
    }
    var orderNo = '92-' + Date.now().toString().slice(-6);
    var app = $('#app');
    app.innerHTML = '<section class="view">' +
      '<div class="order-done">' +
        '<p class="eyebrow">Заказ ' + orderNo + '</p>' +
        '<h1>Спасибо, ' + esc(name) + '.</h1>' +
        '<p>Это демо-заказ: оплата не списывалась, а товары никуда не поехали. В настоящем магазине на ' + esc(email) + ' пришло бы подтверждение.</p>' +
        '<dl class="order-done-meta">' +
          '<div><dt>Доставка</dt><dd>' + (form.elements.delivery.value === 'pickup' ? 'самовывоз из бара' : 'курьер · ' + esc(city) + ', ' + esc(address)) + '</dd></div>' +
          '<div><dt>Оплата</dt><dd>' + (form.elements.payment.value === 'online' ? 'онлайн (демо)' : 'картой при получении') + '</dd></div>' +
          '<div><dt>Сумма</dt><dd>' + money(cartTotal()) + '</dd></div>' +
        '</dl>' +
        '<div class="hero-actions"><a class="btn btn--solid" href="#/">На главную</a><a class="btn btn--ghost" href="#/beans">Продолжить покупки</a></div>' +
      '</div></section>';
    cart = [];
    saveCart();
    renderCart();
    document.documentElement.scrollTop = 0;
    toast('Заказ оформлен (демо)');
  }

  function toast(text) {
    var el = $('#toast');
    el.textContent = text;
    el.classList.add('is-on');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('is-on'); }, 2400);
  }

  /* ── корзина: кнопки ─────────────────────────────────────── */

  $('#cartOpen').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  veil.addEventListener('click', closeCart);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && cartEl.classList.contains('is-open')) closeCart();
  });

  $('#cartBody').addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-act]');
    if (!btn) return;
    var id = btn.closest('.cart-item').dataset.id;
    changeQty(id, btn.dataset.act === 'plus' ? 1 : -1);
  });

  $('#checkout').addEventListener('click', function () {
    if (!cart.length) { toast('Корзина пуста'); return; }
    closeCart();
    navigate('checkout');
  });

  /* ── старт ───────────────────────────────────────────────── */

  window.addEventListener('hashchange', renderApp);
  renderCart();
  renderApp();
})();
