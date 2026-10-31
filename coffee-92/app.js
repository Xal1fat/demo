/* 92° — дані каталогу, маршрутизація, кошик, фільтри, сортування, бронь і оформлення.
   Дві мови: українська (головна) і російська. Валюта — гривня. */

(function () {
  'use strict';

  /* ── мова ────────────────────────────────────────────────── */

  var LANG = (function () {
    try { return localStorage.getItem('92lang') || 'ua'; } catch (e) { return 'ua'; }
  })();

  function setLang(l) {
    LANG = l;
    try { localStorage.setItem('92lang', l); } catch (e) {}
    applyChrome();
    renderApp();
  }

  /* значення поля: рядок (однакове) або {ua, ru} */
  function L(v) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      return (v[LANG] !== undefined) ? v[LANG] : (v.ru !== undefined ? v.ru : v.ua);
    }
    return v;
  }

  var I18N = {
    ua: {
      'nav.home': 'Головна', 'nav.beans': 'Зерно', 'nav.tech': 'Техніка', 'nav.bar': 'Бар', 'nav.cart': 'Кошик',
      'footer.brand': 'обсмажка · техніка · бар',
      'footer.note': '92° — демо-сайт. Назви, ціни й адреса вигадані, кошик зберігає дані лише в браузері, замовлення нікуди не надсилаються.',
      'hero.eyebrow': 'Спешелті-обсмажка · Київ',
      'hero.h1': 'Кава, яка<br>говорить сама за себе',
      'hero.lead': 'Обсмажуємо малими партіями, підбираємо техніку під вашу кухню і варимо чесний еспресо у власному барі. Три речі — один стандарт якості.',
      'hero.cta1': 'Обрати зерно', 'hero.cta2': 'Забронювати столик',
      'hero.addr': 'Адреса', 'hero.hours': 'Години', 'hero.roast': 'Обсмажка', 'hero.lots': 'Лотів',
      'hero.addr.v': 'вул. Володимирська, 12', 'hero.hours.v': '8:00 — 22:00', 'hero.roast.v': 'пн і вт', 'hero.lots.v': '9 у наявності',
      'dir.bean.sub': '9 лотів обсмажки', 'dir.tech.sub': 'машини і млини', 'dir.bar.sub': 'меню і бронь',
      'band.beans.eyebrow': 'Свіжа обсмажка', 'band.beans.h2': 'Зерно тижня', 'band.beans.link': 'Усі лоти →',
      'band.tech.eyebrow': 'Обладнання', 'band.tech.h2': 'Техніка під ваш спосіб', 'band.tech.link': 'Весь каталог →',
      'band.bar.eyebrow': "Кав'ярня", 'band.bar.h2': 'Бар на Володимирській',
      'band.bar.desc': 'Шість місць біля вікна, довгий стіл і полиця з зерном. Еспресо, фільтр і сніданки — щодня з восьмої до десятої.',
      'band.bar.cta': 'Меню і бронь',
      'contacts.eyebrow': 'Приходьте', 'contacts.line': 'Київ, вул. Володимирська, 12<br>щодня 8:00–22:00<br><a href="tel:+380961234592">+38 096 123-45-92</a>',
      'contacts.roast': 'Обсмажка', 'contacts.roast.v': 'пн і вт, з 10:00',
      'contacts.taste': 'Дегустація', 'contacts.taste.v': 'субота, 12:00',
      'contacts.delivery': 'Доставка', 'contacts.delivery.v': 'по Києву за 1–2 дні',
      'beans.note': 'Обсмажуємо по понеділках і вівторках, відправляємо в день обсмаження. У кожного лота — дата, регіон і профіль смаку.',
      'filter.all': 'усі', 'filter.light': 'світла', 'filter.medium': 'середня', 'filter.dark': 'темна',
      'sort.label': 'Сортування', 'sort.pop': 'за популярністю', 'sort.asc': 'спочатку дешевші', 'sort.desc': 'спочатку дорожчі',
      'add': 'У кошик', 'added': 'Додано', 'hint': 'Детальніше', 'soldout': 'немає в наявності', 'obzhareno': 'обсмажено',
      'tech.note': 'Те, що стоїть у нашому барі і що ми ставимо клієнтам. Привозимо, підключаємо, вчимо й обслуговуємо.',
      'tech.machine': 'кавомашини', 'tech.grinder': 'кавомолки', 'tech.accessory': 'аксесуари',
      'avail.stock': 'в наявності', 'avail.order': 'під замовлення', 'avail.out': 'немає в наявності',
      'service.install': 'Встановлення', 'service.install.v': 'підключення до води й каналізації',
      'service.learn': 'Навчання', 'service.learn.v': 'дві години з бариста і налаштування помелу',
      'service.care': 'Сервіс', 'service.care.v': 'виїзд за 24 години, підмінна машина',
      'back.beans': 'До каталогу зерна', 'back.tech': 'До каталогу техніки',
      'roast.light': 'світла', 'roast.medium': 'середня', 'roast.dark': 'темна',
      'spec.region': 'Регіон', 'spec.altitude': 'Висота', 'spec.process': 'Обробка', 'spec.roasted': 'Обсмажено', 'spec.weight': 'Вага',
      'cat.machine': 'кавомашина', 'cat.grinder': 'кавомолка', 'cat.accessory': 'аксесуар',
      'bar.note': 'Київ, вул. Володимирська, 12 · щодня з 8:00 до 22:00. Шість місць біля вікна, довгий стіл і полиця з зерном.',
      'bar.addr': 'Київ, вул. Володимирська, 12', 'bar.hours': '8:00 — 22:00, без вихідних',
      'menu.espresso': 'еспресо', 'menu.filter': 'фільтр', 'menu.food': 'до сніданку',
      'book.h3': 'Столик на вечір', 'book.note': 'Бронь на 1–6 осіб, мінімум 30 хвилин. Демо: заявка нікуди не йде.',
      'book.name': "Ім'я", 'book.name.ph': 'Як вас зустріти', 'book.date': 'Дата', 'book.guests': 'Гостей', 'book.time': 'Час',
      'book.submit': 'Забронювати', 'book.done': 'Готово — столик записано на демо-сервері.',
      'bar.phone': 'Телефон',
      'co.eyebrow': 'Демо-замовлення', 'co.h1': 'Оформлення',
      'co.note': 'На цьому етапі списання не відбувається: форма лише демонструє процес покупки.',
      'co.contact': 'Контакт', 'co.delivery': 'Доставка', 'co.payment': 'Оплата',
      'co.name': "Ім'я", 'co.name.ph': 'Як до вас звертатися', 'co.phone': 'Телефон', 'co.email': 'Email',
      'co.city': 'Місто', 'co.address': 'Адреса',
      'co.d.courier': "Кур'єр — 1–2 дні, від 300 ₴", 'co.d.pickup': 'Самовивіз із бару на Володимирській',
      'co.p.card': 'Карткою при отриманні', 'co.p.online': 'Онлайн (демо, без списання)',
      'co.submit': 'Підтвердити замовлення', 'co.disclaimer': 'Це демо: замовлення не надсилається й не оплачується.',
      'co.summary': 'Ваше замовлення', 'co.total': 'Разом', 'co.free': 'Безкоштовна доставка від 3 000 ₴',
      'cart.title': 'Кошик', 'cart.empty': 'Поки порожньо. Зерно — у каталозі, техніка — там само.', 'cart.to.beans': 'До зерна',
      'cart.checkout': 'Оформити замовлення',
      'done.h1': 'Дякуємо', 'done.p': 'Це демо-замовлення: оплата не списувалась, а товари нікуди не поїхали. У справжньому магазині на',
      'done.would': 'прийшло б підтвердження.', 'done.delivery': 'Доставка', 'done.payment': 'Оплата', 'done.sum': 'Сума',
      'done.pickup': 'самовивіз із бару', 'done.courier': "кур'єр · ", 'done.online': 'онлайн (демо)', 'done.card': 'карткою при отриманні',
      'done.home': 'На головну', 'done.more': 'Продовжити покупки',
      'nf.h1': 'Нічого не знайшлось', 'nf.p': 'Такого товару немає — можливо, посилання застаріло.',
      'nf.beans': 'До зерна', 'nf.tech': 'До техніки',
      'empty.beans': 'Під цю обсмажку лотів зараз немає.',
      'toast.added': 'у кошику', 'toast.empty': 'Кошик порожній', 'toast.fill': 'Заповніть усі поля',
      'toast.fillbd': "Заповніть ім'я та дату", 'toast.booked': 'Столик заброньовано (демо)', 'toast.ordered': 'Замовлення оформлено (демо)',
      'book.done.msg': 'Готово: столик на', 'book.done.mid': ',', 'book.done.end': '. Демо — заявка не надсилається.'
    },
    ru: {
      'nav.home': 'Главная', 'nav.beans': 'Зерно', 'nav.tech': 'Техника', 'nav.bar': 'Бар', 'nav.cart': 'Корзина',
      'footer.brand': 'обжарка · техника · бар',
      'footer.note': '92° — демо-сайт. Названия, цены и адрес выдуманы, корзина хранит данные только в браузере, заказы никуда не отправляются.',
      'hero.eyebrow': 'Спешелти-обжарка · Киев',
      'hero.h1': 'Кофе, который<br>говорит сам за себя',
      'hero.lead': 'Обжариваем малыми партиями, подбираем технику под вашу кухню и варим честный эспрессо в собственном баре. Три вещи — один стандарт качества.',
      'hero.cta1': 'Выбрать зерно', 'hero.cta2': 'Забронировать стол',
      'hero.addr': 'Адрес', 'hero.hours': 'Часы', 'hero.roast': 'Обжарка', 'hero.lots': 'Лотов',
      'hero.addr.v': 'ул. Владимирская, 12', 'hero.hours.v': '8:00 — 22:00', 'hero.roast.v': 'пн и вт', 'hero.lots.v': '9 в наличии',
      'dir.bean.sub': '9 лотов обжарки', 'dir.tech.sub': 'машины и мельницы', 'dir.bar.sub': 'меню и бронь',
      'band.beans.eyebrow': 'Свежая обжарка', 'band.beans.h2': 'Зерно недели', 'band.beans.link': 'Все лоты →',
      'band.tech.eyebrow': 'Оборудование', 'band.tech.h2': 'Техника под ваш способ', 'band.tech.link': 'Весь каталог →',
      'band.bar.eyebrow': 'Кофейня', 'band.bar.h2': 'Бар на Владимирской',
      'band.bar.desc': 'Шесть мест у окна, длинный стол и полка с зерном. Эспрессо, фильтр и завтраки — каждый день с восьми до десяти.',
      'band.bar.cta': 'Меню и бронь',
      'contacts.eyebrow': 'Приходите', 'contacts.line': 'Киев, ул. Владимирская, 12<br>каждый день 8:00–22:00<br><a href="tel:+380961234592">+38 096 123-45-92</a>',
      'contacts.roast': 'Обжарка', 'contacts.roast.v': 'пн и вт, с 10:00',
      'contacts.taste': 'Дегустация', 'contacts.taste.v': 'суббота, 12:00',
      'contacts.delivery': 'Доставка', 'contacts.delivery.v': 'по Киеву за 1–2 дня',
      'beans.note': 'Обжариваем по понедельникам и вторникам, отправляем в день обжарки. У каждого лота — дата, регион и профиль вкуса.',
      'filter.all': 'все', 'filter.light': 'светлая', 'filter.medium': 'средняя', 'filter.dark': 'тёмная',
      'sort.label': 'Сортировка', 'sort.pop': 'по популярности', 'sort.asc': 'сначала дешевле', 'sort.desc': 'сначала дороже',
      'add': 'В корзину', 'added': 'Добавлено', 'hint': 'Подробнее', 'soldout': 'нет в наличии', 'obzhareno': 'обжарено',
      'tech.note': 'То, что стоит в нашем баре и что мы ставим клиентам. Привозим, подключаем, учим и обслуживаем.',
      'tech.machine': 'кофемашины', 'tech.grinder': 'кофемолки', 'tech.accessory': 'аксессуары',
      'avail.stock': 'в наличии', 'avail.order': 'под заказ', 'avail.out': 'нет в наличии',
      'service.install': 'Установка', 'service.install.v': 'подключение к воде и канализации',
      'service.learn': 'Обучение', 'service.learn.v': 'два часа с бариста и настройка помола',
      'service.care': 'Сервис', 'service.care.v': 'выезд за 24 часа, подменная машина',
      'back.beans': 'К каталогу зерна', 'back.tech': 'К каталогу техники',
      'roast.light': 'светлая', 'roast.medium': 'средняя', 'roast.dark': 'тёмная',
      'spec.region': 'Регион', 'spec.altitude': 'Высота', 'spec.process': 'Обработка', 'spec.roasted': 'Обжарено', 'spec.weight': 'Вес',
      'cat.machine': 'кофемашина', 'cat.grinder': 'кофемолка', 'cat.accessory': 'аксессуар',
      'bar.note': 'Киев, ул. Владимирская, 12 · каждый день с 8:00 до 22:00. Шесть мест у окна, длинный стол и полка с зерном.',
      'bar.addr': 'Киев, ул. Владимирская, 12', 'bar.hours': '8:00 — 22:00, без выходных',
      'menu.espresso': 'эспрессо', 'menu.filter': 'фильтр', 'menu.food': 'к завтраку',
      'book.h3': 'Стол на вечер', 'book.note': 'Бронь на 1–6 человек, минимум 30 минут. Демо: заявка никуда не уходит.',
      'book.name': 'Имя', 'book.name.ph': 'Как вас встретить', 'book.date': 'Дата', 'book.guests': 'Гостей', 'book.time': 'Время',
      'book.submit': 'Забронировать', 'book.done': 'Готово — стол записан на демо-сервере.',
      'bar.phone': 'Телефон',
      'co.eyebrow': 'Демо-заказ', 'co.h1': 'Оформление',
      'co.note': 'На этом этапе списание не происходит: форма только демонстрирует процесс покупки.',
      'co.contact': 'Контакт', 'co.delivery': 'Доставка', 'co.payment': 'Оплата',
      'co.name': 'Имя', 'co.name.ph': 'Как к вам обращаться', 'co.phone': 'Телефон', 'co.email': 'Email',
      'co.city': 'Город', 'co.address': 'Адрес',
      'co.d.courier': 'Курьер — 1–2 дня, от 300 ₴', 'co.d.pickup': 'Самовывоз из бара на Владимирской',
      'co.p.card': 'Картой при получении', 'co.p.online': 'Онлайн (демо, без списания)',
      'co.submit': 'Подтвердить заказ', 'co.disclaimer': 'Это демо: заказ не отправляется и не оплачивается.',
      'co.summary': 'Ваш заказ', 'co.total': 'Итого', 'co.free': 'Бесплатная доставка от 3 000 ₴',
      'cart.title': 'Корзина', 'cart.empty': 'Пока пусто. Зерно — в каталоге, техника — там же.', 'cart.to.beans': 'К зерну',
      'cart.checkout': 'Оформить заказ',
      'done.h1': 'Спасибо', 'done.p': 'Это демо-заказ: оплата не списывалась, а товары никуда не поехали. В настоящем магазине на',
      'done.would': 'пришло бы подтверждение.', 'done.delivery': 'Доставка', 'done.payment': 'Оплата', 'done.sum': 'Сумма',
      'done.pickup': 'самовывоз из бара', 'done.courier': 'курьер · ', 'done.online': 'онлайн (демо)', 'done.card': 'картой при получении',
      'done.home': 'На главную', 'done.more': 'Продолжить покупки',
      'nf.h1': 'Ничего не нашлось', 'nf.p': 'Такого товара нет — возможно, ссылка устарела.',
      'nf.beans': 'К зерну', 'nf.tech': 'К технике',
      'empty.beans': 'Под эту обжарку лотов сейчас нет.',
      'toast.added': 'в корзине', 'toast.empty': 'Корзина пуста', 'toast.fill': 'Заполните все поля',
      'toast.fillbd': 'Заполните имя и дату', 'toast.booked': 'Стол забронирован (демо)', 'toast.ordered': 'Заказ оформлен (демо)',
      'book.done.msg': 'Готово: стол на', 'book.done.mid': ',', 'book.done.end': '. Демо — заявка не отправляется.'
    }
  };

  function t(k) { return (I18N[LANG] && I18N[LANG][k]) || (I18N.ru && I18N.ru[k]) || k; }

  function applyChrome() {
    document.documentElement.lang = LANG === 'ua' ? 'uk' : 'ru';
    document.title = LANG === 'ua' ? '92° — зерно, техніка і бар' : '92° — зерно, техника и бар';
    var nodes = document.querySelectorAll('[data-i18n]');
    Array.prototype.forEach.call(nodes, function (el) {
      var k = el.getAttribute('data-i18n');
      if (k) el.textContent = t(k);
    });
    var btns = document.querySelectorAll('.lang-btn');
    Array.prototype.forEach.call(btns, function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-lang') === LANG);
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === LANG));
    });
  }

  /* ── дані ────────────────────────────────────────────────── */

  var BEANS = [
    { id: 'et-irg', country: { ua: 'Ефіопія', ru: 'Эфиопия' }, region: { ua: 'Гіджо', ru: 'Гиджо' }, name: 'Іргагачефф / Иргагачефф', roast: 'light',
      altitude: '1 900 м', process: { ua: 'мита', ru: 'мытая' },
      notes: { ua: ['бергамот', 'ірга', 'жасмін'], ru: ['бергамот', 'ирга', 'жасмин'] },
      profile: { ua: 'Квітковий і цитрусовий: жасмін, бергамот, легка солодкість ірги. Чиста чашка з шовковистою кислотністю.',
                 ru: 'Цветочный и цитрусовый: жасмин, бергамот, лёгкая сладость ирги. Чистая чашка с шелковистой кислотностью.' },
      roasted: { ua: '28 жовтня', ru: '28 октября' }, price: 1450, weight: '250 г', pop: 92, accent: '#C9A227', tint: '#EBE1C8' },
    { id: 'ke-kian', country: { ua: 'Кенія', ru: 'Кения' }, region: { ua: "Ньєрі", ru: 'Ньери' }, name: 'Кіангу / Киангу', roast: 'light',
      altitude: '1 750 м', process: { ua: 'мита', ru: 'мытая' },
      notes: { ua: ['смородина', 'томат', 'сироп'], ru: ['смородина', 'томат', 'сироп'] },
      profile: { ua: 'Соковита і яскрава кислотність: чорна смородина, стиглий томат, малиновий сироп. Щільне тіло для світлої обсмажки.',
                 ru: 'Сочная и яркая кислотность: чёрная смородина, спелый томат, малиновый сироп. Плотное тело для светлой обжарки.' },
      roasted: { ua: '29 жовтня', ru: '29 октября' }, price: 1390, weight: '250 г', pop: 84, accent: '#A4482A', tint: '#EAD8CC' },
    { id: 'co-huila', country: { ua: 'Колумбія', ru: 'Колумбия' }, region: { ua: 'Піталіто', ru: 'Питалито' }, name: 'Уїла / Уила', roast: 'medium',
      altitude: '1 600 м', process: { ua: 'хані', ru: 'хани' },
      notes: { ua: ['карамель', 'яблуко', 'какао'], ru: ['карамель', 'яблоко', 'какао'] },
      profile: { ua: 'Збалансована й округла: карамель, червоне яблуко, какао. М’яка кислотність і довгий післясмак.',
                 ru: 'Сбалансированная и округлая: карамель, красное яблоко, какао. Мягкая кислотность и долгое послевкусие.' },
      roasted: { ua: '27 жовтня', ru: '27 октября' }, price: 1190, weight: '250 г', pop: 88, accent: '#4A6B63', tint: '#DFE7E2' },
    { id: 'br-cerrado', country: { ua: 'Бразілія', ru: 'Бразилия' }, region: { ua: 'Мінас-Жерайс', ru: 'Минас-Жерайс' }, name: 'Серрадо / Серрадо', roast: 'medium',
      altitude: '1 100 м', process: { ua: 'натуральна', ru: 'натуральная' },
      notes: { ua: ['горіх', 'шоколад', 'тростина'], ru: ['орех', 'шоколад', 'тростник'] },
      profile: { ua: 'Щільна і солодка: лісовий горіх, молочний шоколад, тростинний цукор. Ідеальна для молочних напоїв.',
                 ru: 'Плотная и сладкая: лесной орех, молочный шоколад, тростниковый сахар. Идеальна для молочных напитков.' },
      roasted: { ua: '28 жовтня', ru: '28 октября' }, price: 990, weight: '250 г', pop: 95, accent: '#2C4A3B', tint: '#DDE6DE' },
    { id: 'gt-hueh', country: { ua: 'Гватемала', ru: 'Гватемала' }, region: { ua: 'Уеуетенанго', ru: 'Уэуэтенанго' }, name: 'Уеуетенанго', roast: 'medium',
      altitude: '1 500 м', process: { ua: 'мита', ru: 'мытая' },
      notes: { ua: ['какао', 'апельсин', 'мед'], ru: ['какао', 'апельсин', 'мёд'] },
      profile: { ua: 'Тепла і пряна: какао, апельсинова цедра, квітковий мед. Гладка текстура, стримана кислотність.',
                 ru: 'Тёплая и пряная: какао, апельсиновая цедра, цветочный мёд. Гладкая текстура, сдержанная кислотность.' },
      roasted: { ua: '29 жовтня', ru: '29 октября' }, price: 1290, weight: '250 г', pop: 78, accent: '#8A5A44', tint: '#E9DED3' },
    { id: 'id-mand', country: { ua: 'Суматра', ru: 'Суматра' }, region: { ua: 'Ачех', ru: 'Ачех' }, name: 'Манделінг / Манделинг', roast: 'dark',
      altitude: '1 300 м', process: { ua: 'гілінг-басах', ru: 'гилинг-басах' },
      notes: { ua: ['тютюн', 'темний шоколад', 'кедр'], ru: ['табак', 'тёмный шоколад', 'кедр'] },
      profile: { ua: 'Глибока і землиста: тютюн, гіркий шоколад, кедр. Мінімум кислотності, сирописте тіло.',
                 ru: 'Глубокая и землистая: табак, горький шоколад, кедр. Минимум кислотности, сиропистое тело.' },
      roasted: { ua: '27 жовтня', ru: '27 октября' }, price: 1150, weight: '250 г', pop: 70, accent: '#3B352B', tint: '#DED8CB' },
    { id: 'cr-tar', country: { ua: 'Коста-Рика', ru: 'Коста-Рика' }, region: { ua: 'Сан-Маркос', ru: 'Сан-Маркос' }, name: 'Тарразу / Тарразу', roast: 'light',
      altitude: '1 650 м', process: { ua: 'хані', ru: 'хани' },
      notes: { ua: ['апельсин', 'мед', 'тростина'], ru: ['апельсин', 'мёд', 'тростник'] },
      profile: { ua: 'Яскрава й медово-цитрусова: апельсин, білий мед, тростина. Чистий і солодкий післясмак.',
                 ru: 'Яркая и медово-цитрусовая: апельсин, белый мёд, тростник. Чистое и сладкое послевкусие.' },
      roasted: { ua: '30 жовтня', ru: '30 октября' }, price: 1340, weight: '250 г', pop: 75, accent: '#7A7344', tint: '#E7E3D2' },
    { id: 'rw-nyam', country: { ua: 'Руанда', ru: 'Руанда' }, region: { ua: 'Ньямашеке', ru: 'Ньямашеке' }, name: 'Ньямашеке', roast: 'light',
      altitude: '1 800 м', process: { ua: 'мита', ru: 'мытая' },
      notes: { ua: ['слива', 'карамель', 'чорний чай'], ru: ['слива', 'карамель', 'чёрный чай'] },
      profile: { ua: 'Фруктова і чайна: слива, карамель, чорний чай. Яскрава ягідна кислотність, легке тіло.',
                 ru: 'Фруктовая и чайная: слива, карамель, чёрный чай. Яркая ягодная кислотность, лёгкое тело.' },
      roasted: { ua: '30 жовтня', ru: '30 октября' }, price: 1280, weight: '250 г', pop: 66, accent: '#9A5B3C', tint: '#EBDDD2' },
    { id: 'ye-mocha', country: { ua: 'Ємен', ru: 'Йемен' }, region: { ua: 'Бейт-аль-Факіх', ru: 'Бейт-аль-Факих' }, name: 'Моха / Моха', roast: 'dark',
      altitude: '2 100 м', process: { ua: 'натуральна', ru: 'натуральная' },
      notes: { ua: ['прянощі', 'інжир', 'шоколад'], ru: ['пряности', 'инжир', 'шоколад'] },
      profile: { ua: 'Рідкісна і щільна: прянощі, сушений інжир, темний шоколад. Майже винна текстура, довгий фініш.',
                 ru: 'Редкая и плотная: пряности, сушёный инжир, тёмный шоколад. Почти винная текстура, долгий финиш.' },
      roasted: { ua: '26 жовтня', ru: '26 октября' }, price: 1990, weight: '200 г', pop: 60, accent: '#5C3B4A', tint: '#E8DCE0' }
  ];

  var TECH = [
    { id: 'linea-mini', brand: 'La Marzocco', name: 'Linea Mini', category: 'machine',
      specs: { ua: [['Тиск', '9 бар'], ['Бойлер', '3 л, подвійний'], ['Група', '58 мм'], ['Потужність', '1 700 Вт']],
               ru: [['Давление', '9 бар'], ['Бойлер', '3 л, двойной'], ['Группа', '58 мм'], ['Мощность', '1 700 Вт']] },
      desc: { ua: 'Домашня машина з комерційною групою і подвійним бойлером. Стабільна температура і справжня пара для молока.',
              ru: 'Домашняя машина с коммерческой группой и двойным бойлером. Стабильная температура и настоящий пар для молока.' },
      price: 385000, avail: 'stock', pop: 80, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'rocket-app', brand: 'Rocket', name: 'Appartamento', category: 'machine',
      specs: { ua: [['Тиск', '9 бар'], ['Бойлер', '1,8 л, теплообмінник'], ['Група', '58 мм'], ['Потужність', '1 200 Вт']],
               ru: [['Давление', '9 бар'], ['Бойлер', '1,8 л, теплообменник'], ['Группа', '58 мм'], ['Мощность', '1 200 Вт']] },
      desc: { ua: 'Компактна E61-група і теплообмінник. Перевірена класика для дому, розрахована на роки роботи.',
              ru: 'Компактная E61-группа и теплообменник. Проверенная классика для дома, рассчитанная на годы работы.' },
      price: 249000, avail: 'stock', pop: 72, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'sage-express', brand: 'Sage', name: 'The Barista Express', category: 'machine',
      specs: { ua: [['Тиск', '9 бар'], ['Бойлер', 'термоблок'], ['Група', '54 мм'], ['Млин', 'вбудований, конічний']],
               ru: [['Давление', '9 бар'], ['Бойлер', 'термоблок'], ['Группа', '54 мм'], ['Мельница', 'встроенная, коническая']] },
      desc: { ua: 'Машина і млин в одному корпусі. Налаштування помелу, темперування й екстракція без зайвих пристроїв.',
              ru: 'Машина и мельница в одном корпусе. Настройка помола, темперовка и экстракция без лишних устройств.' },
      price: 145000, avail: 'order', pop: 65, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'ek43', brand: 'Mahlkönig', name: 'EK43', category: 'grinder',
      specs: { ua: [['Жорна', '98 мм, плоскі'], ['Продуктивність', 'до 20 г/с'], ['Помел', 'еспресо і фільтр'], ['Потужність', '1 300 Вт']],
               ru: [['Жернова', '98 мм, плоские'], ['Производительность', 'до 20 г/с'], ['Помол', 'эспрессо и фильтр'], ['Мощность', '1 300 Вт']] },
      desc: { ua: 'Еталонний млин для еспресо і фільтра. Однорідний помел і точне регулювання на кожен метод.',
              ru: 'Эталонная мельница для эспрессо и фильтра. Однородный помол и точная регулировка на каждый метод.' },
      price: 178000, avail: 'soldout', pop: 76, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'fellow-ode', brand: 'Fellow', name: 'Ode Gen 2', category: 'grinder',
      specs: { ua: [['Жорна', '64 мм, плоскі'], ['Помел', 'фільтр'], ['Ємність', '100 г'], ['Привід', 'тихий, 220 Вт']],
               ru: [['Жернова', '64 мм, плоские'], ['Помол', 'фильтр'], ['Ёмкость', '100 г'], ['Привод', 'тихий, 220 Вт']] },
      desc: { ua: 'Домашній млин для фільтра з плоскими жорнами. Тихий мотор і нульове утримання помелу.',
              ru: 'Домашняя мельница для фильтра с плоскими жерновами. Тихий мотор и нулевое удержание помола.' },
      price: 44000, avail: 'stock', pop: 69, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'baratza-esp', brand: 'Baratza', name: 'Encore ESP', category: 'grinder',
      specs: { ua: [['Жорна', '40 мм, конічні'], ['Помел', 'еспресо і фільтр'], ['Ємність', '40 г'], ['Регулювання', '40 ступенів']],
               ru: [['Жернова', '40 мм, конические'], ['Помол', 'эспрессо и фильтр'], ['Ёмкость', '40 г'], ['Регулировка', '40 ступеней']] },
      desc: { ua: 'Бюджетний млин на всі випадки: від еспресо до френч-преса. Легке чищення і стабільний помел.',
              ru: 'Бюджетная мельница на все случаи: от эспрессо до френч-пресса. Лёгкая чистка и стабильный помол.' },
      price: 23000, avail: 'order', pop: 58, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'acaia-lunar', brand: 'Acaia', name: 'Lunar', category: 'accessory', kind: 'scale',
      specs: { ua: [['Точність', '0,1 г'], ['Таймер', 'автостарт'], ['Живлення', 'USB-C'], ["Зв'язок", 'Bluetooth']],
               ru: [['Точность', '0,1 г'], ['Таймер', 'автостарт'], ['Питание', 'USB-C'], ['Связь', 'Bluetooth']] },
      desc: { ua: 'Вологозахищені ваги для еспресо з автостартом таймера. Точність, на яку можна покластися.',
              ru: 'Влагозащищённые весы для эспрессо с автостартом таймера. Точность, на которую можно положиться.' },
      price: 32000, avail: 'stock', pop: 74, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'motta-tamper', brand: 'Motta', name: 'Europa Tamper', category: 'accessory', kind: 'tamper',
      specs: { ua: [['База', '58,35 мм'], ['Матеріал', 'нержавіюча сталь'], ['Вага', '490 г'], ["Руків'я", 'алюміній']],
               ru: [['База', '58,35 мм'], ['Материал', 'нержавеющая сталь'], ['Вес', '490 г'], ['Рукоять', 'алюминий']] },
      desc: { ua: 'Цільний темпер з точною базою під корзину 58 мм. Впевнений хват і рівне темперування.',
              ru: 'Цельный темпер с точной базой под корзину 58 мм. Уверенный хват и ровная темперовка.' },
      price: 6900, avail: 'stock', pop: 52, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'rhino-pitcher', brand: 'Rhino', name: 'Milk Pitcher', category: 'accessory', kind: 'pitcher',
      specs: { ua: [["Об'єм", '450 мл'], ['Матеріал', 'нержавіюча сталь'], ['Носик', 'вузький'], ['Покриття', 'матове']],
               ru: [['Объём', '450 мл'], ['Материал', 'нержавеющая сталь'], ['Носик', 'узкий'], ['Покрытие', 'матовое']] },
      desc: { ua: 'Пітчер для лате-арту з вузьким носиком. Зручний баланс і передбачуваний потік молока.',
              ru: 'Питчер для латте-арта с узким носиком. Удобный баланс и предсказуемый поток молока.' },
      price: 3900, avail: 'soldout', pop: 48, accent: '#2F4858', tint: '#E3E9ED' },
    { id: 'hario-v60', brand: 'Hario', name: 'V60 02', category: 'accessory', kind: 'dripper',
      specs: { ua: [['Розмір', '02, 1–4 чашки'], ['Матеріал', 'кераміка'], ['Спіраль', 'спіральні ребра'], ['Сумісність', 'паперові фільтри']],
               ru: [['Размер', '02, 1–4 чашки'], ['Материал', 'керамика'], ['Спираль', 'спиральные рёбра'], ['Совместимость', 'бумажные фильтры']] },
      desc: { ua: 'Класична керамічна воронка для фільтра. Спіральні ребра дають рівну екстракцію.',
              ru: 'Классическая керамическая воронка для фильтра. Спиральные рёбра дают ровную экстракцию.' },
      price: 1900, avail: 'stock', pop: 61, accent: '#2F4858', tint: '#E3E9ED' }
  ];

  var MENU = [
    { cat: 'espresso', label: { ua: 'еспресо', ru: 'эспрессо' },
      items: { ua: [['Еспресо', 200], ['Флет вайт', 320], ['Капучино', 300], ['Кортадо', 260], ['Лате з солодом', 340], ['Раф ванільний', 360]],
               ru: [['Эспрессо', 200], ['Флэт уайт', 320], ['Капучино', 300], ['Кортадо', 260], ['Латте с солодом', 340], ['Раф ванильный', 360]] } },
    { cat: 'filter', label: { ua: 'фільтр', ru: 'фильтр' },
      items: { ua: [['V60, Ефіопія', 380], ['Аеропрес, Кенія', 380], ['Кемекс на двох', 520], ['Колд брю', 300], ['Чайна карта', 250]],
               ru: [['V60, Эфиопия', 380], ['Аэропресс, Кения', 380], ['Кемекс на двоих', 520], ['Колд брю', 300], ['Чайная карта', 250]] } },
    { cat: 'food', label: { ua: 'до сніданку', ru: 'к завтраку' },
      items: { ua: [['Круасан мигдальний', 260], ['Банановий хліб', 240], ['Сендвіч з індичкою', 420], ['Сирники', 380], ['Гранола з йогуртом', 340]],
               ru: [['Круассан миндальный', 260], ['Банановый хлеб', 240], ['Сэндвич с индейкой', 420], ['Сырники', 380], ['Гранола с йогуртом', 340]] } }
  ];

  var ROAST_LEVEL = { light: 1, medium: 2, dark: 3 };
  var ROAST_KEY = { light: 'roast.light', medium: 'roast.medium', dark: 'roast.dark' };
  var AVAIL_KEY = { stock: 'avail.stock', order: 'avail.order', soldout: 'avail.out' };
  var CAT_KEY = { machine: 'cat.machine', grinder: 'cat.grinder', accessory: 'cat.accessory' };
  var STORE_KEY = '92cart';

  var state = { beanRoast: 'all', beanSort: 'pop', techCat: 'machine', menuCat: 'espresso' };

  /* ── утиліти ─────────────────────────────────────────────── */

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var money = function (n) { return n.toLocaleString('ru-RU').replace(/\u00a0/g, '\u2009') + ' ₴'; };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  function slice(svg) { return String(svg).replace('xMidYMid meet', 'xMidYMid slice'); }

  var catalog = function () { return BEANS.concat(TECH); };
  var findItem = function (id) { return catalog().find(function (x) { return x.id === id; }); };
  var isBean = function (x) { return !!x.country; };

  /* розв'язаний об'єкт для зображення пакета */
  function beanVis(b) {
    return { country: L(b.country), name: b.name, weight: b.weight, process: L(b.process), roast: b.roast, accent: b.accent, tint: b.tint };
  }

  /* ── кошик ───────────────────────────────────────────────── */

  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(STORE_KEY) || '[]') || []; } catch (e) { cart = []; }

  function saveCart() { try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch (e) {} }

  function addToCart(id, silent) {
    var unit = findItem(id);
    if (!unit || unit.avail === 'soldout') return;
    var row = cart.find(function (x) { return x.id === id; });
    if (row) row.qty += 1; else cart.push({ id: id, qty: 1 });
    saveCart(); renderCart();
    if (!silent) { openCart(); toast(unit.name + ' — ' + t('toast.added')); }
  }

  function removeFromCart(id) { cart = cart.filter(function (x) { return x.id !== id; }); saveCart(); renderCart(); }
  function changeQty(id, delta) {
    var row = cart.find(function (x) { return x.id === id; });
    if (!row) return;
    row.qty += delta;
    if (row.qty <= 0) cart = cart.filter(function (x) { return x.id !== id; });
    saveCart(); renderCart();
  }
  function cartCount() { return cart.reduce(function (n, r) { return n + r.qty; }, 0); }
  function cartTotal() { return cart.reduce(function (sum, row) { var u = findItem(row.id); return sum + (u ? u.price * row.qty : 0); }, 0); }

  function renderCart() {
    var body = $('#cartBody'); var badge = $('#cartBadge'); var count = cartCount();
    badge.textContent = count; badge.hidden = count === 0;
    $('#cartTotal').textContent = money(cartTotal());
    if (!cart.length) {
      body.innerHTML = '<p class="cart-empty">' + t('cart.empty') + '</p>' +
        '<a class="cart-empty-link" href="#/beans">' + t('cart.to.beans') + '</a>';
      return;
    }
    body.innerHTML = cart.map(function (row) {
      var unit = findItem(row.id); if (!unit) return '';
      var meta = unit.country ? L(unit.country) + ' · ' + unit.weight + ' · ' + t(ROAST_KEY[unit.roast]) : unit.brand + ' · ' + unit.name;
      return '<article class="cart-item" data-id="' + unit.id + '">' +
        '<button class="cart-remove" type="button" data-remove="' + unit.id + '" aria-label="' + t('hint') + ' ' + esc(unit.name) + '">×</button>' +
        '<h4>' + esc(unit.name) + '</h4><p>' + esc(meta) + '</p>' +
        '<div class="qty">' +
          '<button type="button" data-act="minus" aria-label="−1">−</button>' +
          '<span>' + row.qty + '</span>' +
          '<button type="button" data-act="plus" aria-label="+1">+</button>' +
        '</div>' +
        '<span class="sum">' + money(unit.price * row.qty) + '</span>' +
      '</article>';
    }).join('');
  }

  var cartEl = $('#cart'); var veil = $('#cartVeil');

  function openCart() {
    cartEl.classList.add('is-open'); cartEl.setAttribute('aria-hidden', 'false');
    veil.hidden = false; requestAnimationFrame(function () { veil.classList.add('is-open'); });
    $('#cartOpen').setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; $('#cartClose').focus();
  }
  function closeCart() {
    cartEl.classList.remove('is-open'); cartEl.setAttribute('aria-hidden', 'true');
    veil.classList.remove('is-open'); setTimeout(function () { veil.hidden = true; }, 250);
    $('#cartOpen').setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; $('#cartOpen').focus();
  }

  /* ── роутер ──────────────────────────────────────────────── */

  function parseHash() { return location.hash.replace(/^#\/?/, '').split('/').filter(Boolean); }
  function navigate(path) { location.hash = '#/' + path; }

  function renderApp() {
    var parts = parseHash(); var app = $('#app'); var name = parts[0] || 'home';
    app.classList.remove('is-in');
    if (name === 'beans') app.innerHTML = viewBeans();
    else if (name === 'tech') app.innerHTML = viewTech();
    else if (name === 'bar') app.innerHTML = viewBar();
    else if (name === 'product') app.innerHTML = viewProduct(parts[1]);
    else if (name === 'checkout') app.innerHTML = viewCheckout();
    else app.innerHTML = viewHome();
    highlightNav(name);
    document.documentElement.scrollTop = 0; document.body.scrollTop = 0;
    void app.offsetWidth;
    requestAnimationFrame(function () { app.classList.add('is-in'); });
  }

  function highlightNav(name) {
    var key = name;
    if (name === 'product') { var u = findItem(parseHash()[1]); key = u ? (isBean(u) ? 'beans' : 'tech') : ''; }
    $$('.nav a').forEach(function (a) { a.classList.toggle('is-active', a.dataset.nav === key); });
  }

  /* ── компоненти ──────────────────────────────────────────── */

  function roastDots(level) {
    var n = ROAST_LEVEL[level] || 1;
    return '<span class="roast" aria-label="' + t(ROAST_KEY[level]) + '">' +
      [1, 2, 3].map(function (i) { return '<i class="' + (i <= n ? 'on' : '') + '"></i>'; }).join('') + '</span>';
  }
  function beanMedia(b) {
    return '<a class="media card-link" href="#/product/' + b.id + '" aria-label="' + esc(b.name) + '">' +
      Images.beanBag(beanVis(b)) + '<span class="media-hint">' + t('hint') + '</span></a>';
  }
  function techMedia(p) {
    var svg = p.category === 'grinder' ? Images.machine(p) : p.category === 'accessory' ? Images.accessory(p) : Images.machine(p);
    return '<a class="media card-link" href="#/product/' + p.id + '" aria-label="' + esc(p.name) + '">' +
      svg + '<span class="media-hint">' + t('hint') + '</span></a>';
  }
  function stockBadge(avail) {
    var cls = avail === 'stock' ? 'stock--ok' : avail === 'order' ? 'stock--order' : 'stock--out';
    return '<span class="stock ' + cls + '">' + t(AVAIL_KEY[avail]) + '</span>';
  }
  function addBtn(id, cls) {
    var unit = findItem(id);
    var disabled = unit && unit.avail === 'soldout' ? ' disabled' : '';
    return '<button class="add' + (cls ? ' ' + cls : '') + '" type="button" data-add="' + id + '"' + disabled + '>' +
      (disabled ? t('soldout') : t('add')) + '</button>';
  }

  /* ── головна ─────────────────────────────────────────────── */

  function viewHome() {
    var featuredBeans = BEANS.slice().sort(function (a, b) { return b.pop - a.pop; }).slice(0, 3);
    var featuredTech = TECH.filter(function (p) { return p.category !== 'accessory'; }).sort(function (a, b) { return b.pop - a.pop; }).slice(0, 3);
    var dirs = [
      { accent: 'bean', idx: '01', word: t('nav.beans'), sub: t('dir.bean.sub'), href: '#/beans', img: slice(Images.beanBag(beanVis(BEANS[0]))) },
      { accent: 'tech', idx: '02', word: t('nav.tech'), sub: t('dir.tech.sub'), href: '#/tech', img: slice(Images.machine(TECH[0])) },
      { accent: 'bar', idx: '03', word: t('nav.bar'), sub: t('dir.bar.sub'), href: '#/bar', img: slice(Images.interior()) }
    ];
    return '' +
      '<section class="hero view">' +
        '<div class="hero-grid"><div class="hero-copy">' +
          '<p class="eyebrow">' + t('hero.eyebrow') + '</p>' +
          '<h1>' + t('hero.h1') + '<span class="dot">.</span></h1>' +
          '<p class="lead">' + t('hero.lead') + '</p>' +
          '<div class="hero-actions"><a class="btn btn--solid" href="#/beans">' + t('hero.cta1') + '</a>' +
          '<a class="btn btn--ghost" href="#/bar">' + t('hero.cta2') + '</a></div>' +
          '<dl class="hero-stats">' +
            '<div><dt>' + t('hero.addr') + '</dt><dd>' + t('hero.addr.v') + '</dd></div>' +
            '<div><dt>' + t('hero.hours') + '</dt><dd>' + t('hero.hours.v') + '</dd></div>' +
            '<div><dt>' + t('hero.roast') + '</dt><dd>' + t('hero.roast.v') + '</dd></div>' +
            '<div><dt>' + t('hero.lots') + '</dt><dd>' + t('hero.lots.v') + '</dd></div>' +
          '</dl></div>' +
          '<div class="hero-media">' + Images.hero() + '</div></div>' +
        '<div class="directions" role="list">' + dirs.map(function (d) {
          return '<a class="dir" href="' + d.href + '" role="listitem" data-accent="' + d.accent + '">' +
            '<span class="dir-media">' + d.img + '</span>' +
            '<span class="dir-index">' + d.idx + '</span>' +
            '<span class="dir-word">' + d.word + '</span>' +
            '<span class="dir-sub">' + d.sub + '</span>' +
            '<span class="dir-arrow" aria-hidden="true">→</span></a>';
        }).join('') + '</div>' +
      '</section>' +
      '<section class="band band--beans"><header class="band-head">' +
        '<div><p class="eyebrow">' + t('band.beans.eyebrow') + '</p><h2>' + t('band.beans.h2') + '</h2></div>' +
        '<a class="band-link" href="#/beans">' + t('band.beans.link') + '</a></header>' +
        '<div class="bean-row">' + featuredBeans.map(beanCard).join('') + '</div></section>' +
      '<section class="band band--tech"><header class="band-head">' +
        '<div><p class="eyebrow">' + t('band.tech.eyebrow') + '</p><h2>' + t('band.tech.h2') + '</h2></div>' +
        '<a class="band-link" href="#/tech">' + t('band.tech.link') + '</a></header>' +
        '<div class="tech-row">' + featuredTech.map(techCard).join('') + '</div></section>' +
      '<section class="band band--bar"><div class="bar-teaser">' +
        '<div class="bar-teaser-media">' + Images.interior() + '</div>' +
        '<div class="bar-teaser-copy"><p class="eyebrow">' + t('band.bar.eyebrow') + '</p>' +
          '<h2>' + t('band.bar.h2') + '</h2><p>' + t('band.bar.desc') + '</p>' +
          '<div class="hero-actions"><a class="btn btn--solid" href="#/bar">' + t('band.bar.cta') + '</a></div></div>' +
      '</div></section>' + contactsBlock();
  }

  function beanCard(b) {
    return '<article class="bean-card" data-roast="' + b.roast + '">' + beanMedia(b) +
      '<div class="bean-body">' +
        '<div class="bean-top"><span>' + esc(L(b.country)) + ' · ' + esc(L(b.region)) + '</span>' + roastDots(b.roast) + '</div>' +
        '<a class="title-link" href="#/product/' + b.id + '"><h3>' + esc(b.name) + '</h3></a>' +
        '<p class="bean-meta">' + esc(b.altitude) + ' · ' + esc(L(b.process)) + ' · ' + esc(b.weight) + '</p>' +
        '<ul class="notes">' + L(b.notes).map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' +
        '<div class="bean-foot"><span class="price">' + money(b.price) + ' <small>' + esc(b.weight) + '</small></span>' + addBtn(b.id) + '</div>' +
      '</div></article>';
  }

  function techCard(p) {
    return '<article class="tech-card">' + techMedia(p) +
      '<div class="tech-body">' +
        '<div class="tech-meta"><span class="brand">' + esc(p.brand) + '</span>' + stockBadge(p.avail) + '</div>' +
        '<a class="title-link" href="#/product/' + p.id + '"><h3>' + esc(p.name) + '</h3></a>' +
        '<p class="tech-desc">' + esc(L(p.desc)) + '</p>' +
        '<div class="tech-foot"><span class="price">' + money(p.price) + '</span>' + addBtn(p.id) + '</div>' +
      '</div></article>';
  }

  /* ── зерно ───────────────────────────────────────────────── */

  function viewBeans() {
    return '<section class="view catalog"><header class="page-head">' +
      '<p class="eyebrow">01 · ' + t('hero.roast') + '</p><h1>' + t('nav.beans') + '</h1>' +
      '<p class="page-note">' + t('beans.note') + '</p></header>' +
      '<div class="controls">' +
        '<div class="roast-filter" role="group" aria-label="' + t('sort.label') + '">' +
          ['all', 'light', 'medium', 'dark'].map(function (r) {
            var label = r === 'all' ? t('filter.all') : t(ROAST_KEY[r]);
            return '<button class="chip" type="button" data-roast="' + r + '" aria-pressed="' + (state.beanRoast === r) + '">' + label + '</button>';
          }).join('') + '</div>' +
        '<label class="sort">' + t('sort.label') + '<select id="beanSort">' +
          '<option value="pop"' + (state.beanSort === 'pop' ? ' selected' : '') + '>' + t('sort.pop') + '</option>' +
          '<option value="price-asc"' + (state.beanSort === 'price-asc' ? ' selected' : '') + '>' + t('sort.asc') + '</option>' +
          '<option value="price-desc"' + (state.beanSort === 'price-desc' ? ' selected' : '') + '>' + t('sort.desc') + '</option>' +
        '</select></label></div>' +
      '<div class="beans" id="beansList">' + beansList() + '</div></section>';
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
    if (!list.length) return '<p class="empty">' + t('empty.beans') + '</p>';
    return list.map(beanCard).join('');
  }

  /* ── техніка ─────────────────────────────────────────────── */

  function viewTech() {
    return '<section class="view catalog catalog--tech"><header class="page-head">' +
      '<p class="eyebrow">02 · ' + t('band.tech.eyebrow') + '</p><h1>' + t('nav.tech') + '</h1>' +
      '<p class="page-note">' + t('tech.note') + '</p></header>' +
      '<div class="tech-tabs" role="tablist" aria-label="' + t('nav.tech') + '">' +
        [['machine', t('tech.machine')], ['grinder', t('tech.grinder')], ['accessory', t('tech.accessory')]].map(function (c) {
          return '<button class="tech-tab" type="button" role="tab" data-cat="' + c[0] + '" aria-selected="' + (state.techCat === c[0]) + '">' + c[1] + '</button>';
        }).join('') + '</div>' +
      '<div class="tech-grid" id="techList">' + techList() + '</div>' +
      '<div class="service-strip">' +
        '<div><strong>' + t('service.install') + '</strong><span>' + t('service.install.v') + '</span></div>' +
        '<div><strong>' + t('service.learn') + '</strong><span>' + t('service.learn.v') + '</span></div>' +
        '<div><strong>' + t('service.care') + '</strong><span>' + t('service.care.v') + '</span></div>' +
      '</div></section>';
  }
  function techList() {
    var list = TECH.filter(function (p) { return p.category === state.techCat; });
    return list.map(techCard).join('');
  }

  /* ── товар ───────────────────────────────────────────────── */

  function viewProduct(id) {
    var unit = findItem(id);
    if (!unit) return viewNotFound();
    var backHref = isBean(unit) ? '#/beans' : '#/tech';
    var backLabel = isBean(unit) ? t('back.beans') : t('back.tech');
    if (isBean(unit)) {
      return '<section class="view product"><a class="back" href="' + backHref + '">← ' + backLabel + '</a>' +
        '<div class="product-grid"><div class="product-media">' + Images.beanBag(beanVis(unit)) + '</div>' +
        '<div class="product-info">' +
          '<p class="eyebrow">' + esc(L(unit.country)) + ' · ' + esc(L(unit.region)) + '</p>' +
          '<h1>' + esc(unit.name) + '</h1>' +
          '<p class="product-sub">' + t(ROAST_KEY[unit.roast]) + ' · ' + esc(unit.weight) + '</p>' +
          '<p class="product-desc">' + esc(L(unit.profile)) + '</p>' +
          '<dl class="product-specs">' +
            '<div><dt>' + t('spec.region') + '</dt><dd>' + esc(L(unit.region)) + '</dd></div>' +
            '<div><dt>' + t('spec.altitude') + '</dt><dd>' + esc(unit.altitude) + '</dd></div>' +
            '<div><dt>' + t('spec.process') + '</dt><dd>' + esc(L(unit.process)) + '</dd></div>' +
            '<div><dt>' + t('spec.roasted') + '</dt><dd>' + esc(L(unit.roasted)) + '</dd></div>' +
            '<div><dt>' + t('spec.weight') + '</dt><dd>' + esc(unit.weight) + '</dd></div>' +
          '</dl>' +
          '<ul class="notes notes--big">' + L(unit.notes).map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' +
          '<div class="product-buy"><span class="price">' + money(unit.price) + '</span>' + addBtn(unit.id, 'btn--solid') + '</div>' +
        '</div></div></section>';
    }
    var svg = unit.category === 'grinder' ? Images.machine(unit) : unit.category === 'accessory' ? Images.accessory(unit) : Images.machine(unit);
    return '<section class="view product"><a class="back" href="' + backHref + '">← ' + backLabel + '</a>' +
      '<div class="product-grid"><div class="product-media">' + svg + '</div>' +
      '<div class="product-info">' +
        '<p class="eyebrow">' + esc(unit.brand) + ' · ' + t(CAT_KEY[unit.category]) + '</p>' +
        '<h1>' + esc(unit.name) + '</h1>' +
        '<div class="product-sub product-sub--row"><span>' + stockBadge(unit.avail) + '</span></div>' +
        '<p class="product-desc">' + esc(L(unit.desc)) + '</p>' +
        '<dl class="product-specs">' + L(unit.specs).map(function (s) {
          return '<div><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></div>';
        }).join('') + '</dl>' +
        '<div class="product-buy"><span class="price">' + money(unit.price) + '</span>' + addBtn(unit.id, 'btn--solid') + '</div>' +
      '</div></div></section>';
  }

  function viewNotFound() {
    return '<section class="view"><div class="empty-state"><h1>' + t('nf.h1') + '</h1><p>' + t('nf.p') + '</p>' +
      '<a class="btn btn--solid" href="#/beans">' + t('nf.beans') + '</a> <a class="btn btn--ghost" href="#/tech">' + t('nf.tech') + '</a></div></section>';
  }

  /* ── бар ─────────────────────────────────────────────────── */

  function viewBar() {
    var cats = MENU.map(function (m) {
      return '<button class="tab" type="button" role="tab" data-cat="' + m.cat + '" aria-selected="' + (state.menuCat === m.cat) + '">' + L(m.label) + '</button>';
    }).join('');
    var active = MENU.find(function (m) { return m.cat === state.menuCat; }) || MENU[0];
    var menuHtml = '<ul class="menu-list">' + L(active.items).map(function (it) {
      return '<li><span class="menu-name">' + esc(it[0]) + '</span><span class="menu-rule"></span><span class="menu-price">' + money(it[1]) + '</span></li>';
    }).join('') + '</ul>';

    return '<section class="view bar"><header class="page-head">' +
      '<p class="eyebrow">03 · ' + t('band.bar.eyebrow') + '</p><h1>' + t('nav.bar') + '</h1>' +
      '<p class="page-note">' + t('bar.note') + '</p></header>' +
      '<div class="bar-banner">' + Images.interior() +
        '<div class="bar-banner-meta"><span>' + t('bar.addr') + '</span><span>' + t('bar.hours') + '</span>' +
        '<span><a href="tel:+380961234592">+38 096 123-45-92</a></span></div></div>' +
      '<div class="bar-grid"><div class="menu">' +
        '<div class="tabs" role="tablist" aria-label="' + t('nav.bar') + '">' + cats + '</div>' +
        '<div class="tab-panel" role="tabpanel">' + menuHtml + '</div></div>' +
      '<aside class="booking"><h3>' + t('book.h3') + '</h3>' +
        '<p class="booking-note">' + t('book.note') + '</p>' +
        '<form id="bookingForm">' +
          '<label>' + t('book.name') + '<input type="text" name="name" required placeholder="' + t('book.name.ph') + '"></label>' +
          '<div class="booking-row">' +
            '<label>' + t('book.date') + '<input type="date" name="date" required></label>' +
            '<label>' + t('book.guests') + '<select name="guests"><option>1</option><option>2</option><option selected>3</option><option>4</option><option>5</option><option>6</option></select></label>' +
          '</div>' +
          '<label>' + t('book.time') + '<select name="time"><option>12:00</option><option>14:00</option><option>16:00</option><option selected>18:00</option><option>20:00</option></select></label>' +
          '<button class="btn btn--solid btn--wide" type="submit">' + t('book.submit') + '</button>' +
        '</form><p class="booking-done" id="bookingDone" hidden>' + t('book.done') + '</p></aside></div>' +
      '<div class="drinks-strip">' +
        [['espresso', 'Еспресо', '#A4482A'], ['flat', 'Флет вайт', '#C9A227'], ['filter', 'V60', '#2C4A3B']].map(function (d) {
          return '<div class="drink">' + Images.drink(d[0], d[2]) + '<span>' + d[1] + '</span></div>';
        }).join('') + '</div>' +
      '<div class="bar-contacts">' +
        '<div><span>' + t('contacts.roast') + '</span><strong>' + t('contacts.roast.v') + '</strong></div>' +
        '<div><span>' + t('contacts.taste') + '</span><strong>' + t('contacts.taste.v') + '</strong></div>' +
        '<div><span>' + t('contacts.delivery') + '</span><strong>' + t('contacts.delivery.v') + '</strong></div>' +
        '<div><span>' + t('bar.phone') + '</span><strong><a href="tel:+380961234592">+38 096 123-45-92</a></strong></div>' +
      '</div></section>';
  }

  /* ── оформлення ──────────────────────────────────────────── */

  function viewCheckout() {
    var items = cart.map(function (row) {
      var unit = findItem(row.id); if (!unit) return '';
      return '<li><span class="co-name">' + esc(unit.name) + ' <small>× ' + row.qty + '</small></span>' +
        '<span class="co-sum">' + money(unit.price * row.qty) + '</span></li>';
    }).join('');
    return '<section class="view checkout"><header class="page-head">' +
      '<p class="eyebrow">' + t('co.eyebrow') + '</p><h1>' + t('co.h1') + '</h1>' +
      '<p class="page-note">' + t('co.note') + '</p></header>' +
      (cart.length
        ? '<div class="checkout-grid"><form class="checkout-form" id="checkoutForm">' +
            '<fieldset class="co-fieldset"><legend>' + t('co.contact') + '</legend>' +
              '<div class="co-row"><label>' + t('co.name') + '<input type="text" name="name" required autocomplete="name" placeholder="' + t('co.name.ph') + '"></label>' +
              '<label>' + t('co.phone') + '<input type="tel" name="phone" required autocomplete="tel" placeholder="+38 ___ ___-__-__"></label></div>' +
              '<label>' + t('co.email') + '<input type="email" name="email" required autocomplete="email" placeholder="you@example.com"></label></fieldset>' +
            '<fieldset class="co-fieldset"><legend>' + t('co.delivery') + '</legend>' +
              '<div class="co-row"><label>' + t('co.city') + '<input type="text" name="city" required autocomplete="address-level2" placeholder="Київ"></label>' +
              '<label>' + t('co.address') + '<input type="text" name="address" required autocomplete="street-address" placeholder="' + t('hero.addr.v') + '"></label></div>' +
              '<div class="co-options" role="radiogroup"><label class="co-option"><input type="radio" name="delivery" value="courier" checked><span>' + t('co.d.courier') + '</span></label>' +
              '<label class="co-option"><input type="radio" name="delivery" value="pickup"><span>' + t('co.d.pickup') + '</span></label></div></fieldset>' +
            '<fieldset class="co-fieldset"><legend>' + t('co.payment') + '</legend>' +
              '<div class="co-options" role="radiogroup"><label class="co-option"><input type="radio" name="payment" value="card" checked><span>' + t('co.p.card') + '</span></label>' +
              '<label class="co-option"><input type="radio" name="payment" value="online"><span>' + t('co.p.online') + '</span></label></div></fieldset>' +
            '<button class="btn btn--solid btn--wide" type="submit">' + t('co.submit') + '</button>' +
            '<p class="co-note">' + t('co.disclaimer') + '</p></form>' +
          '<aside class="order-summary"><h3>' + t('co.summary') + '</h3>' +
            '<ul class="co-list">' + items + '</ul>' +
            '<p class="co-total"><span>' + t('co.total') + '</span><strong>' + money(cartTotal()) + '</strong></p>' +
            '<p class="co-hint">' + t('co.free') + '</p></aside></div>'
        : '<div class="empty-state"><h1>' + t('cart.title') + '</h1><p>' + t('cart.empty') + '</p>' +
            '<a class="btn btn--solid" href="#/beans">' + t('cart.to.beans') + '</a></div>') +
      '</section>';
  }

  function contactsBlock() {
    return '<section class="contacts" id="contacts"><div class="contacts-grid">' +
      '<div><p class="eyebrow">' + t('contacts.eyebrow') + '</p><h2 class="contacts-title">92°</h2>' +
      '<p class="contacts-line">' + t('contacts.line') + '</p></div>' +
      '<div class="contacts-hours">' +
        '<div><span>' + t('contacts.roast') + '</span><strong>' + t('contacts.roast.v') + '</strong></div>' +
        '<div><span>' + t('contacts.taste') + '</span><strong>' + t('contacts.taste.v') + '</strong></div>' +
        '<div><span>' + t('contacts.delivery') + '</span><strong>' + t('contacts.delivery.v') + '</strong></div>' +
      '</div></div></section>';
  }

  /* ── події ───────────────────────────────────────────────── */

  document.addEventListener('click', function (e) {
    var langBtn = e.target.closest('.lang-btn');
    if (langBtn) { setLang(langBtn.getAttribute('data-lang')); return; }

    var add = e.target.closest('[data-add]');
    if (add) {
      addToCart(add.dataset.add);
      add.dataset.added = 'true';
      var label = add.textContent;
      add.textContent = t('added');
      setTimeout(function () { delete add.dataset.added; add.textContent = label; }, 1300);
      return;
    }
    var remove = e.target.closest('[data-remove]');
    if (remove) { removeFromCart(remove.dataset.remove); return; }
    var chip = e.target.closest('.roast-filter .chip');
    if (chip) {
      state.beanRoast = chip.dataset.roast;
      $$('.roast-filter .chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      var list = $('#beansList'); if (list) list.innerHTML = beansList();
      return;
    }
    var ttab = e.target.closest('.tech-tab');
    if (ttab) {
      state.techCat = ttab.dataset.cat;
      $$('.tech-tab').forEach(function (x) { x.setAttribute('aria-selected', String(x === ttab)); });
      $('#techList').innerHTML = techList();
      return;
    }
    var tab = e.target.closest('.tab');
    if (tab) { selectMenuCat(tab.dataset.cat); return; }
  });

  document.addEventListener('change', function (e) {
    if (e.target.id === 'beanSort') { state.beanSort = e.target.value; $('#beansList').innerHTML = beansList(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var x = e.target.closest('.tab, .tech-tab');
    if (!x) return;
    e.preventDefault();
    var group = Array.prototype.slice.call(x.parentElement.children);
    var i = group.indexOf(x);
    var next = group[(i + (e.key === 'ArrowRight' ? 1 : group.length - 1)) % group.length];
    next.focus(); next.click();
  });

  document.addEventListener('submit', function (e) {
    if (e.target.id === 'bookingForm') {
      e.preventDefault();
      var form = e.target; var name = form.elements.name.value.trim(); var date = form.elements.date.value;
      if (!name || !date) { toast(t('toast.fillbd')); return; }
      $('#bookingDone').hidden = false;
      $('#bookingDone').textContent = t('book.done.msg') + ' ' + form.elements.time.value + t('book.done.mid') + ' ' +
        form.elements.guests.value + ' ' + (LANG === 'ua' ? 'осіб' : 'чел.') + ', ' + date + t('book.done.end');
      form.reset(); toast(t('toast.booked'));
    } else if (e.target.id === 'checkoutForm') {
      e.preventDefault(); submitOrder(e.target);
    }
  });

  function selectMenuCat(cat) {
    state.menuCat = cat;
    $$('.tab').forEach(function (x) { x.setAttribute('aria-selected', String(x.dataset.cat === cat)); });
    var m = MENU.find(function (x) { return x.cat === cat; });
    var panel = $('.tab-panel');
    if (m && panel) {
      panel.innerHTML = '<ul class="menu-list">' + L(m.items).map(function (it) {
        return '<li><span class="menu-name">' + esc(it[0]) + '</span><span class="menu-rule"></span><span class="menu-price">' + money(it[1]) + '</span></li>';
      }).join('') + '</ul>';
    }
  }

  function submitOrder(form) {
    var name = form.elements.name.value.trim(), phone = form.elements.phone.value.trim(), email = form.elements.email.value.trim();
    var city = form.elements.city.value.trim(), address = form.elements.address.value.trim();
    if (!name || !phone || !email || !city || !address) { toast(t('toast.fill')); return; }
    var orderNo = '92-' + Date.now().toString().slice(-6);
    $('#app').innerHTML = '<section class="view"><div class="order-done">' +
      '<p class="eyebrow">' + (LANG === 'ua' ? 'Замовлення ' : 'Заказ ') + orderNo + '</p>' +
      '<h1>' + t('done.h1') + ', ' + esc(name) + '.</h1>' +
      '<p>' + t('done.p') + ' ' + esc(email) + ' ' + t('done.would') + '</p>' +
      '<dl class="order-done-meta">' +
        '<div><dt>' + t('done.delivery') + '</dt><dd>' + (form.elements.delivery.value === 'pickup' ? t('done.pickup') : t('done.courier') + esc(city) + ', ' + esc(address)) + '</dd></div>' +
        '<div><dt>' + t('done.payment') + '</dt><dd>' + (form.elements.payment.value === 'online' ? t('done.online') : t('done.card')) + '</dd></div>' +
        '<div><dt>' + t('done.sum') + '</dt><dd>' + money(cartTotal()) + '</dd></div>' +
      '</dl>' +
      '<div class="hero-actions"><a class="btn btn--solid" href="#/">' + t('done.home') + '</a><a class="btn btn--ghost" href="#/beans">' + t('done.more') + '</a></div>' +
      '</div></section>';
    cart = []; saveCart(); renderCart();
    document.documentElement.scrollTop = 0;
    toast(t('toast.ordered'));
  }

  function toast(text) {
    var el = $('#toast'); el.textContent = text; el.classList.add('is-on');
    clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove('is-on'); }, 2400);
  }

  /* ── кошик: кнопки ───────────────────────────────────────── */

  $('#cartOpen').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  veil.addEventListener('click', closeCart);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && cartEl.classList.contains('is-open')) closeCart(); });
  $('#cartBody').addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-act]'); if (!btn) return;
    var id = btn.closest('.cart-item').dataset.id;
    changeQty(id, btn.dataset.act === 'plus' ? 1 : -1);
  });
  $('#checkout').addEventListener('click', function () {
    if (!cart.length) { toast(t('toast.empty')); return; }
    closeCart(); navigate('checkout');
  });

  /* ── старт ───────────────────────────────────────────────── */

  window.addEventListener('hashchange', renderApp);
  applyChrome();
  renderCart();
  renderApp();
})();
