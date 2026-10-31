/* Xal1fat — логіка портфоліо: i18n (UK/RU), галерея з фільтрами, кейси, AI-чат, форма, аналітика. */

(function () {
  'use strict';

  var LANG = (function () { try { return localStorage.getItem('xal1fat.lang') || 'ua'; } catch (e) { return 'ua'; } })();

  function L(v) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      return (v[LANG] !== undefined) ? v[LANG] : (v.ru !== undefined ? v.ru : v.ua);
    }
    return v;
  }

  var I18N = {
    ua: {
      'brand.tag': 'digital studio',
      'nav.work': 'Роботи', 'nav.services': 'Послуги', 'nav.packs': 'Пакети', 'nav.process': 'Процес', 'nav.contact': 'Контакти',
      'nav.cta': 'Обговорити проєкт',
      'hero.kicker': 'Незалежна розробка для малого бізнесу',
      'hero.h1': 'Сайти й AI-рішення, які <span class="accent">допомагають рости</span>',
      'hero.lead': 'Розробляю сучасні сайти, інтернет-магазини та AI-асистентів для малого і середнього бізнесу. Без шаблонів і зайвих обіцянок — тільки те, що реально працює.',
      'hero.cta1': 'Обговорити проєкт', 'hero.cta2': 'Отримати консультацію',
      'cap.1': 'Сайти', 'cap.1.sub': 'Лендинги, сайти послуг, онлайн-запис',
      'cap.2': 'Інтернет-магазини', 'cap.2.sub': 'Каталоги, фільтри, кошик, оформлення',
      'cap.3': 'AI-автоматизація', 'cap.3.sub': 'Асистенти для Instagram і Telegram',
      'honesty': 'Працюю як незалежний розробник. Не вигадую команду, клієнтів чи результати продажів — показую реальні можливості на демо, які можна відкрити до оплати.',
      'sec.services.title': 'Що я роблю', 'sec.services.sub': 'Три напрями. Кожен вирішує конкретну задачу бізнесу — від першого контакту до замовлення.',
      'svc.1.title': 'Розробка сайтів', 'svc.1.desc': 'Сайт, який зрозуміло розповідає про бізнес і приймає клієнта: форма, онлайн-запис або дзвінок — без «напишіть у директ».',
      'svc.2.title': 'Інтернет-магазини', 'svc.2.desc': 'Повноцінний каталог із фільтрами, картками товарів, кошиком та оформленням замовлення. Інтеграція необхідних сервісів під ваш процес.',
      'svc.3.title': 'AI-асистенти та автоматизація', 'svc.3.desc': 'Автоматичні відповіді на звернення, підбір послуг, збір заявок і передача їх власнику. Автоматизація запису через Telegram.',
      'scope.done': 'готово', 'scope.order': 'під замовлення',
      'svc.1.items': 'Лендинги|Сайти-візитки|Корпоративні сайти|Сайти послуг|Онлайн-запис',
      'svc.2.items': 'Каталоги товарів|Фільтрація|Картки товарів|Кошик і оформлення|Інтеграції',
      'svc.3.items': 'Асистент для Instagram|Автовідповіді|Підбір послуг|Збір заявок|Передача в Telegram|Запис клієнтів',
      'sec.work.title': 'Роботи', 'sec.work.sub': 'Кожен проєкт — демо з власною візуальною подачею. Відкрийте й помацайте до оплати.',
      'filter.all': 'Усі', 'filter.service': 'Сайти послуг', 'filter.ecommerce': 'Інтернет-магазини', 'filter.automation': 'Автоматизація',
      'status.real': 'живий · бекенд', 'status.demo': 'демо',
      'proj.open': 'Відкрити демо', 'proj.case': 'Детальніше', 'proj.more': 'Ще роботи',
      'case.task': 'Задача бізнесу', 'case.concept': 'Візуальне рішення', 'case.functions': 'Основні функції', 'case.open': 'Відкрити демо', 'case.cta': 'Обговорити схожий проєкт',
      'sec.ai.title': 'AI-асистенти, які працюють разом із вашим бізнесом', 'sec.ai.sub': 'Автоматизуємо відповіді на запитання клієнтів, допомагаємо з підбором послуг і збираємо заявки, поки ви займаєтесь бізнесом.',
      'ai.h3': 'AI-асистент салону краси', 'ai.desc': 'Інтерактивна демонстрація: асистент допомагає обрати процедуру, майстра й час, а потім формує заявку власнику.',
      'ai.points': 'Відповідає на звернення в Instagram і Telegram|Підбирає послугу й майстра|Збирає контакт і час|Передає заявку власнику бізнесу|Працює цілодобово',
      'ai.note': 'Інтерактивне демо. Реальні AI-асистенти налаштовуються індивідуально під бізнес.',
      'ai.cta': 'Замовити AI-асистента',
      'sec.process.title': 'Як проходить робота', 'sec.process.sub': 'Чотири зрозумілі етапи — від першої розмови до запуску.',
      'step.1.t': 'Обговорення', 'step.1.d': 'Вивчаю бізнес, задачі та побажання. Визначаємо, що саме має робити сайт.',
      'step.2.t': 'Концепція', 'step.2.d': 'Готую візуальне рішення та структуру. Показую макет — правимо до «так».',
      'step.3.t': 'Розробка', 'step.3.d': 'Верстка, адаптив, налаштування функцій і тестування на реальних пристроях.',
      'step.4.t': 'Запуск', 'step.4.d': 'Публікація, підключення домену та необхідних інтеграцій.',
      'sec.contact.title': 'Обговоримо ваш проєкт', 'sec.contact.sub': 'Розкажіть про задачу — підкажу, який формат підійде і скільки це коштуватиме.',
      'contact.lead': 'Напишіть у Telegram або заповніть форму — вона одразу відкриє діалог із готовим повідомленням.',
      'form.name': "Ім'я", 'form.name.ph': 'Як до вас звертатися',
      'form.service': 'Що цікавить', 'form.service.opts': 'Сайт для бізнесу|Інтернет-магазин|AI-асистент / автоматизація|Інше',
      'form.contact': 'Телефон або Telegram', 'form.contact.ph': '+380 … або @нік',
      'form.msg': 'Опишіть задачу', 'form.msg.ph': 'Коротко: чим займаєтесь і що потрібно',
      'form.submit': 'Відкрити діалог у Telegram', 'form.note': 'Форма формує повідомлення і відкриває Telegram — дані нікуди не зберігаються.',
      'final.h2': 'Є ідея для проєкту?', 'final.p': 'Давайте обговоримо, як її реалізувати. Відповідаю протягом дня.',
      'final.cta': 'Написати в Telegram',
      'footer.note': 'Xal1fat — незалежна розробка сайтів та автоматизації. Назви, ціни та дані в демо-проєктах вигадані; реальні кейси позначено окремо.',
      'ai.chat.title': 'Асистент салону',
      'tg.site': 'Вітаю! Побачив ваше портфоліо. Хочу обговорити розробку сайту для мого бізнесу.',
      'tg.ai': 'Вітаю! Цікавить розробка AI-асистента для мого бізнесу.',
      'tg.consult': 'Вітаю! Хочу отримати консультацію щодо розробки сайту.',
      'tg.pkg1': 'Вітаю! Цікавить пакет Website Start.',
      'tg.pkg2': 'Вітаю! Цікавить пакет Business Website.',
      'tg.pkg3': 'Вітаю! Цікавить пакет Website + AI.',
      'sec.packs.title': 'Пакети',
      'sec.packs.sub': 'Зрозуміла вартість і формат співпраці. Оберіть пакет або напишіть — підберу рішення під вашу задачу.',
      'pack.popular': 'популярний', 'pack.from': 'від',
      'pack.1.name': 'Website Start', 'pack.1.price': '4 900 ₴',
      'pack.1.desc': 'Для невеликих компаній і спеціалістів, яким потрібна професійна присутність в інтернеті.',
      'pack.1.items': "Односторінковий сайт|Адаптивна мобільна версія|Блоки послуг і переваг|Галерея зображень|Контакти та кнопки зв'язку|Форма заявки|Базова SEO-оптимізація|Публікація сайту",
      'pack.2.name': 'Business Website', 'pack.2.price': '7 900 ₴',
      'pack.2.desc': 'Для бізнесу, якому потрібен функціональніший сайт із каталогом і формами.',
      'pack.2.items': 'Індивідуальна структура|Кілька розділів або сторінок|Каталог товарів чи послуг|Картки товарів|Фільтрація (за потреби)|Форми заявок|Інтеграція з Telegram|Адаптивна версія|Базова SEO-оптимізація|Публікація сайту',
      'pack.3.name': 'Website + AI', 'pack.3.price': 'індивідуально',
      'pack.3.desc': 'Для бізнесу, який хоче автоматизувати спілкування з клієнтами.',
      'pack.3.items': 'Розробка сайту|AI-асистент|Відповіді на часті питання|Консультації по послугах чи товарах|Збір контактних даних|Передача заявок менеджеру|Інтеграції з Telegram|Додаткова автоматизація за домовленістю',
      'pack.cta': 'Обрати пакет',
      'pack.note': 'Остаточна вартість залежить від функціональності та обсягу робіт.',
      'pack.terms': 'Умови: передоплата 50%, решта після узгодження результату, два раунди правок у межах узгодженого обсягу.',
      'ai.scen.title': 'Три сценарії використання',
      'ai.scen.a.t': 'AI-консультант', 'ai.scen.a.d': 'Відповідає на питання про компанію, пояснює послуги та ціни, допомагає обрати підходящу послугу.',
      'ai.scen.b.t': 'AI-адміністратор', 'ai.scen.b.d': "Відповідає на типові питання, допомагає обрати послугу й спеціаліста, збирає ім'я та контакт і передає заявку співробітнику.",
      'ai.scen.c.t': 'AI-помічник магазину', 'ai.scen.c.d': 'Консультує по товарах, допомагає порівняти варіанти й спрямовує до оформлення або менеджера.',
      'ai.restart': 'Почати заново', 'ai.typing': 'друкує…',
      'case.tech': 'Технології', 'case.status': 'Статус',
      'case.real': 'реальний проєкт · працюючий бекенд', 'case.demo': 'демонстраційний концепт'
    },
    ru: {
      'brand.tag': 'digital studio',
      'nav.work': 'Работы', 'nav.services': 'Услуги', 'nav.packs': 'Пакеты', 'nav.process': 'Процесс', 'nav.contact': 'Контакты',
      'nav.cta': 'Обсудить проект',
      'hero.kicker': 'Независимая разработка для малого бизнеса',
      'hero.h1': 'Сайты и AI-решения, которые <span class="accent">помогают расти</span>',
      'hero.lead': 'Разрабатываю современные сайты, интернет-магазины и AI-ассистентов для малого и среднего бизнеса. Без шаблонов и лишних обещаний — только то, что реально работает.',
      'hero.cta1': 'Обсудить проект', 'hero.cta2': 'Получить консультацию',
      'cap.1': 'Сайты', 'cap.1.sub': 'Лендинги, сайты услуг, онлайн-запись',
      'cap.2': 'Интернет-магазины', 'cap.2.sub': 'Каталоги, фильтры, корзина, оформление',
      'cap.3': 'AI-автоматизация', 'cap.3.sub': 'Ассистенты для Instagram и Telegram',
      'honesty': 'Работаю как независимый разработчик. Не выдумываю команду, клиентов или результаты продаж — показываю реальные возможности на демо, которые можно открыть до оплаты.',
      'sec.services.title': 'Что я делаю', 'sec.services.sub': 'Три направления. Каждое решает конкретную задачу бизнеса — от первого контакта до заказа.',
      'svc.1.title': 'Разработка сайтов', 'svc.1.desc': 'Сайт, который понятно рассказывает о бизнесе и принимает клиента: форма, онлайн-запись или звонок — без «напишите в директ».',
      'svc.2.title': 'Интернет-магазины', 'svc.2.desc': 'Полноценный каталог с фильтрами, карточками товаров, корзиной и оформлением заказа. Интеграция нужных сервисов под ваш процесс.',
      'svc.3.title': 'AI-ассистенты и автоматизация', 'svc.3.desc': 'Автоматические ответы на обращения, подбор услуг, сбор заявок и передача их владельцу. Автоматизация записи через Telegram.',
      'scope.done': 'готово', 'scope.order': 'под заказ',
      'svc.1.items': 'Лендинги|Сайты-визитки|Корпоративные сайты|Сайты услуг|Онлайн-запись',
      'svc.2.items': 'Каталоги товаров|Фильтрация|Карточки товаров|Корзина и оформление|Интеграции',
      'svc.3.items': 'Ассистент для Instagram|Автоответы|Подбор услуг|Сбор заявок|Передача в Telegram|Запись клиентов',
      'sec.work.title': 'Работы', 'sec.work.sub': 'Каждый проект — демо со своей визуальной подачей. Откройте и потрогайте до оплаты.',
      'filter.all': 'Все', 'filter.service': 'Сайты услуг', 'filter.ecommerce': 'Интернет-магазины', 'filter.automation': 'Автоматизация',
      'status.real': 'живой · бэкенд', 'status.demo': 'демо',
      'proj.open': 'Открыть демо', 'proj.case': 'Подробнее', 'proj.more': 'Ещё работы',
      'case.task': 'Задача бизнеса', 'case.concept': 'Визуальное решение', 'case.functions': 'Основные функции', 'case.open': 'Открыть демо', 'case.cta': 'Обсудить похожий проект',
      'sec.ai.title': 'AI-ассистенты, которые работают вместе с вашим бизнесом', 'sec.ai.sub': 'Автоматизируем ответы на вопросы клиентов, помогаем с подбором услуг и собираем заявки, пока вы занимаетесь бизнесом.',
      'ai.h3': 'AI-ассистент салона красоты', 'ai.desc': 'Интерактивная демонстрация: ассистент помогает выбрать процедуру, мастера и время, а затем формирует заявку владельцу.',
      'ai.points': 'Отвечает на обращения в Instagram и Telegram|Подбирает услугу и мастера|Собирает контакт и время|Передаёт заявку владельцу бизнеса|Работает круглосуточно',
      'ai.note': 'Интерактивное демо. Реальные AI-ассистенты настраиваются индивидуально под бизнес.',
      'ai.cta': 'Заказать AI-ассистента',
      'sec.process.title': 'Как проходит работа', 'sec.process.sub': 'Четыре понятных этапа — от первого разговора до запуска.',
      'step.1.t': 'Обсуждение', 'step.1.d': 'Изучаю бизнес, задачи и пожелания. Определяем, что именно должен делать сайт.',
      'step.2.t': 'Концепция', 'step.2.d': 'Готовлю визуальное решение и структуру. Показываю макет — правим до «да».',
      'step.3.t': 'Разработка', 'step.3.d': 'Вёрстка, адаптив, настройка функций и тестирование на реальных устройствах.',
      'step.4.t': 'Запуск', 'step.4.d': 'Публикация, подключение домена и нужных интеграций.',
      'sec.contact.title': 'Обсудим ваш проект', 'sec.contact.sub': 'Расскажите о задаче — подскажу, какой формат подойдёт и сколько это будет стоить.',
      'contact.lead': 'Напишите в Telegram или заполните форму — она сразу откроет диалог с готовым сообщением.',
      'form.name': 'Имя', 'form.name.ph': 'Как к вам обращаться',
      'form.service': 'Что интересует', 'form.service.opts': 'Сайт для бизнеса|Интернет-магазин|AI-ассистент / автоматизация|Другое',
      'form.contact': 'Телефон или Telegram', 'form.contact.ph': '+380 … или @ник',
      'form.msg': 'Опишите задачу', 'form.msg.ph': 'Коротко: чем занимаетесь и что нужно',
      'form.submit': 'Открыть диалог в Telegram', 'form.note': 'Форма формирует сообщение и открывает Telegram — данные никуда не сохраняются.',
      'final.h2': 'Есть идея для проекта?', 'final.p': 'Давайте обсудим, как её реализовать. Отвечаю в течение дня.',
      'final.cta': 'Написать в Telegram',
      'footer.note': 'Xal1fat — независимая разработка сайтов и автоматизации. Названия, цены и данные в демо-проектах выдуманы; реальные кейсы отмечены отдельно.',
      'ai.chat.title': 'Ассистент салона',
      'tg.site': 'Здравствуйте! Увидел ваше портфолио. Хочу обсудить разработку сайта для моего бизнеса.',
      'tg.ai': 'Здравствуйте! Интересует разработка AI-ассистента для моего бизнеса.',
      'tg.consult': 'Здравствуйте! Хочу получить консультацию по разработке сайта.',
      'tg.pkg1': 'Здравствуйте! Интересует пакет Website Start.',
      'tg.pkg2': 'Здравствуйте! Интересует пакет Business Website.',
      'tg.pkg3': 'Здравствуйте! Интересует пакет Website + AI.',
      'sec.packs.title': 'Пакеты',
      'sec.packs.sub': 'Понятная стоимость и формат сотрудничества. Выберите пакет или напишите — подберу решение под вашу задачу.',
      'pack.popular': 'популярный', 'pack.from': 'от',
      'pack.1.name': 'Website Start', 'pack.1.price': '4 900 ₴',
      'pack.1.desc': 'Для небольших компаний и специалистов, которым нужно профессиональное присутствие в интернете.',
      'pack.1.items': 'Одностраничный сайт|Адаптивная мобильная версия|Блоки услуг и преимуществ|Галерея изображений|Контакты и кнопки связи|Форма заявки|Базовая SEO-оптимизация|Публикация сайта',
      'pack.2.name': 'Business Website', 'pack.2.price': '7 900 ₴',
      'pack.2.desc': 'Для бизнеса, которому нужен более функциональный сайт с каталогом и формами.',
      'pack.2.items': 'Индивидуальная структура|Несколько разделов или страниц|Каталог товаров или услуг|Карточки товаров|Фильтрация (при необходимости)|Формы заявок|Интеграция с Telegram|Адаптивная версия|Базовая SEO-оптимизация|Публикация сайта',
      'pack.3.name': 'Website + AI', 'pack.3.price': 'индивидуально',
      'pack.3.desc': 'Для бизнеса, который хочет автоматизировать общение с клиентами.',
      'pack.3.items': 'Разработка сайта|AI-ассистент|Ответы на частые вопросы|Консультации по услугам или товарам|Сбор контактных данных|Передача заявок менеджеру|Интеграции с Telegram|Дополнительная автоматизация по согласованию',
      'pack.cta': 'Выбрать пакет',
      'pack.note': 'Окончательная стоимость зависит от функциональности и объёма работ.',
      'pack.terms': 'Условия: предоплата 50%, остальное после согласования результата, два раунда правок в рамках согласованного объёма.',
      'ai.scen.title': 'Три сценария использования',
      'ai.scen.a.t': 'AI-консультант', 'ai.scen.a.d': 'Отвечает на вопросы о компании, объясняет услуги и цены, помогает выбрать подходящую услугу.',
      'ai.scen.b.t': 'AI-администратор', 'ai.scen.b.d': 'Отвечает на типичные вопросы, помогает выбрать услугу и специалиста, собирает имя и контакт и передаёт заявку сотруднику.',
      'ai.scen.c.t': 'AI-помощник магазина', 'ai.scen.c.d': 'Консультирует по товарам, помогает сравнить варианты и направляет к оформлению или менеджеру.',
      'ai.restart': 'Начать заново', 'ai.typing': 'печатает…',
      'case.tech': 'Технологии', 'case.status': 'Статус',
      'case.real': 'реальный проект · работающий бэкенд', 'case.demo': 'демонстрационный концепт'
    }
  };

  function t(k) { return (I18N[LANG] && I18N[LANG][k]) || (I18N.ua[k]) || k; }

  var TG = 'https://t.me/massiveboy';

  var PROJECTS = [
    {
      id: 'beauty', cat: 'service', status: 'real', size: 'hero', cover: 'salon.jpg',
      demo: 'https://beauty-studio-blue.vercel.app',
      title: { ua: 'Салон краси з онлайн-записом', ru: 'Салон красоты с онлайн-записью' },
      desc: { ua: 'Преміальний сайт салону: каталог послуг, майстри, галерея та запис на процедуру без дзвінка.', ru: 'Премиальный сайт салона: каталог услуг, мастера, галерея и запись на процедуру без звонка.' },
      feats: { ua: ['Каталог послуг', 'Майстри', 'Онлайн-запис', 'Telegram-сповіщення'], ru: ['Каталог услуг', 'Мастера', 'Онлайн-запись', 'Telegram-уведомления'] },
      task: { ua: 'Дати клієнту можливість записатися самому — без дзвінків і «напишіть у директ».', ru: 'Дать клиенту возможность записаться самому — без звонков и «напишите в директ».' },
      concept: { ua: 'Спокійна преміальна естетика: м\'які тони, великі фото, чітка типографіка.', ru: 'Спокойная премиальная эстетика: мягкие тона, крупные фото, чёткая типографика.' },
      tech: ['Next.js', 'Supabase', 'Telegram Bot API', 'Tailwind CSS'],
      caseFeats: { ua: ['Онлайн-запис без дзвінка', 'Вибір послуги та майстра', 'Вибір дати й часу', 'Перевірка доступності слотів', 'Серверна обробка бронювання', 'Адміністративна панель', 'Сповіщення в Telegram'], ru: ['Онлайн-запись без звонка', 'Выбор услуги и мастера', 'Выбор даты и времени', 'Проверка доступности слотов', 'Серверная обработка бронирования', 'Административная панель', 'Уведомления в Telegram'] },
      shots: ['salon.jpg', 'case-desktop.jpg', 'case-mobile.jpg']
    },
    {
      id: 'coffee', cat: 'ecommerce', status: 'demo', size: 'half', cover: 'coffee-92.jpg',
      demo: 'https://xal1fat.github.io/coffee-92/',
      title: { ua: 'Кава 92° — зерно, техніка, бар', ru: 'Кофе 92° — зерно, техника, бар' },
      desc: { ua: 'Інтернет-магазин спешелті-кави: каталог зерна з фільтрами, техніка, кошик і оформлення.', ru: 'Интернет-магазин спешелти-кофе: каталог зерна с фильтрами, техника, корзина и оформление.' },
      feats: { ua: ['Каталог зерна', 'Фільтри', 'Кошик', 'Оформлення'], ru: ['Каталог зерна', 'Фильтры', 'Корзина', 'Оформление'] },
      task: { ua: 'Показати асортимент кави й техніки та дати клієнту оформити замовлення самостійно.', ru: 'Показать ассортимент кофе и техники и дать клиенту оформить заказ самостоятельно.' },
      concept: { ua: 'Редакційна подача: папір, графіт і терракота, серифні заголовки, ілюстрації упаковок.', ru: 'Редакционная подача: бумага, графит и терракота, серифные заголовки, иллюстрации упаковок.' },
      tech: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
      caseFeats: { ua: ['Каталог зерна з фільтрами', 'Картки товарів', 'Категорії техніки', 'Кошик із перерахунком', 'Оформлення замовлення (демо)', 'Візуальна презентація бренду'], ru: ['Каталог зерна с фильтрами', 'Карточки товаров', 'Категории техники', 'Корзина с пересчётом', 'Оформление заказа (демо)', 'Визуальная презентация бренда'] },
      shots: ['coffee-92.jpg']
    },
    {
      id: 'restaurant', cat: 'service', status: 'demo', size: 'half', cover: 'restaurant.jpg',
      demo: 'https://xal1fat.github.io/restaurant/',
      title: { ua: 'Ресторан з меню та бронюванням', ru: 'Ресторан с меню и бронированием' },
      desc: { ua: 'Атмосферний сайт ресторану: меню з категоріями, фото страв, бронювання столиків і контакти.', ru: 'Атмосферный сайт ресторана: меню с категориями, фото блюд, бронирование столиков и контакты.' },
      feats: { ua: ['Меню', 'Категорії', 'Бронювання', 'Контакти'], ru: ['Меню', 'Категории', 'Бронирование', 'Контакты'] },
      task: { ua: 'Показати меню й атмосферу та зібрати бронювання столиків без дзвінка.', ru: 'Показать меню и атмосферу и собрать бронирования столиков без звонка.' },
      concept: { ua: 'Тепла гастрономічна подача: глибокі тони, апетитні фото, акцент на страву.', ru: 'Тёплая гастрономическая подача: глубокие тона, аппетитные фото, акцент на блюдо.' },
      tech: ['HTML', 'CSS', 'JavaScript'],
      shots: ['restaurant.jpg']
    },
    {
      id: 'detailing', cat: 'service', status: 'demo', size: 'half', cover: 'detailing.jpg',
      demo: 'https://xal1fat.github.io/auto-detailing/',
      title: { ua: 'Студія автодетейлінгу', ru: 'Студия автодетейлинга' },
      desc: { ua: 'Послуги, прайс, галерея до/після та калькулятор орієнтовної вартості.', ru: 'Услуги, прайс, галерея до/после и калькулятор примерной стоимости.' },
      feats: { ua: ['Послуги', 'Прайс', 'До/після', 'Калькулятор'], ru: ['Услуги', 'Прайс', 'До/после', 'Калькулятор'] },
      task: { ua: 'Пояснити послуги й ціни та зібрати заявку з попереднім розрахунком.', ru: 'Объяснить услуги и цены и собрать заявку с предварительным расчётом.' },
      concept: { ua: 'Технічна, «чиста» естетика: контраст, графіка, акцент на результат роботи.', ru: 'Техничная, «чистая» эстетика: контраст, графика, акцент на результат работы.' },
      tech: ['HTML', 'CSS', 'JavaScript'],
      shots: ['detailing.jpg']
    },
    {
      id: 'dental', cat: 'service', status: 'demo', size: 'half', cover: 'dental.jpg',
      demo: 'https://xal1fat.github.io/dental/',
      title: { ua: 'Стоматологічна клініка', ru: 'Стоматологическая клиника' },
      desc: { ua: 'Напрями лікування, лікарі, ціни та онлайн-заявка. Зручна мобільна версія.', ru: 'Направления лечения, врачи, цены и онлайн-заявка. Удобная мобильная версия.' },
      feats: { ua: ['Напрями лікування', 'Лікарі', 'Ціни', 'Онлайн-заявка'], ru: ['Направления лечения', 'Врачи', 'Цены', 'Онлайн-заявка'] },
      task: { ua: 'Викликати довіру та зібрати заявку на прийом без телефонної розмови.', ru: 'Вызвать доверие и собрать заявку на приём без телефонного разговора.' },
      concept: { ua: 'Чиста медична подача: світлі тони, спокій, довіра через прозорість цін.', ru: 'Чистая медицинская подача: светлые тона, спокойствие, доверие через прозрачность цен.' },
      tech: ['HTML', 'CSS', 'JavaScript'],
      shots: ['dental.jpg']
    },
    {
      id: 'ai', cat: 'automation', status: 'demo', size: 'wide', cover: 'ai.jpg',
      demo: '#ai',
      title: { ua: 'AI-асистент для бізнесу', ru: 'AI-ассистент для бизнеса' },
      desc: { ua: 'Автоматичні відповіді в Instagram і Telegram, підбір послуг, збір заявок.', ru: 'Автоматические ответы в Instagram и Telegram, подбор услуг, сбор заявок.' },
      feats: { ua: ['Автовідповіді', 'Підбір послуг', 'Збір заявок', 'Telegram'], ru: ['Автоответы', 'Подбор услуг', 'Сбор заявок', 'Telegram'] },
      task: { ua: 'Зняти з власника рутинне листування й не втрачати жодного звернення.', ru: 'Снять с владельца рутинную переписку и не терять ни одно обращение.' },
      concept: { ua: 'Інтерактивна демонстрація діалогу з асистентом у реальному чат-інтерфейсі.', ru: 'Интерактивная демонстрация диалога с ассистентом в реальном чат-интерфейсе.' },
      shots: ['ai.jpg']
    }
  ];

  var MORE_WORKS = [
    { title: 'Ремонт і резиденції', href: 'https://xal1fat.github.io/terra/', cover: 'terra.jpg' },
    { title: 'Кондитерська yoda.cake', href: 'https://xal1fat.github.io/yoda-cake/', cover: 'yoda-cake.jpg' },
    { title: 'KUB MARKET — каталог', href: 'https://xal1fat.github.io/kub-market/', cover: 'kub-market.jpg' },
    { title: 'Портфоліо колориста', href: 'https://xal1fat.github.io/colorist/', cover: 'colorist.jpg' },
    { title: 'Таунхауси — генплан', href: 'https://xal1fat.github.io/estate/', cover: 'estate.jpg' }
  ];

  var state = { filter: 'all' };
  var CAT_LABEL = { service: 'filter.service', ecommerce: 'filter.ecommerce', automation: 'filter.automation' };

  /* ── рендер ── */

  function render() {
    var app = $('#app');
    app.classList.remove('is-in');
    app.innerHTML = viewHome();
    document.documentElement.scrollTop = 0;
    void app.offsetWidth;
    requestAnimationFrame(function () { app.classList.add('is-in'); });
    bind();
    initChat();
  }

  function viewHome() {
    return '' +
      hero() +
      services() +
      packages() +
      work() +
      ai() +
      process() +
      contact() +
      finalCta() +
      caseMarkup();
  }

  function hero() {
    return '<section class="hero view"><div class="wrap">' +
      '<p class="hero-kicker">' + t('hero.kicker') + '</p>' +
      '<h1>' + t('hero.h1') + '</h1>' +
      '<p class="hero-lead">' + t('hero.lead') + '</p>' +
      '<div class="hero-cta">' +
        '<a class="btn btn--solid" href="' + TG + '?text=' + enc(t('tg.site')) + '" target="_blank" rel="noopener" data-track="cta" data-value="hero_main">' + t('hero.cta1') + '</a>' +
        '<a class="btn btn--ghost" href="' + TG + '?text=' + enc(t('tg.consult')) + '" target="_blank" rel="noopener" data-track="cta" data-value="hero_consult">' + t('hero.cta2') + '</a>' +
      '</div>' +
      '<div class="capabilities">' +
        [['1', 'cap.1', 'cap.1.sub'], ['2', 'cap.2', 'cap.2.sub'], ['3', 'cap.3', 'cap.3.sub']].map(function (c, i) {
          return '<div class="cap"><span class="cap-index">0' + (i + 1) + '</span>' +
            '<span class="cap-word">' + t(c[1]) + '</span><span class="cap-sub">' + t(c[2]) + '</span></div>';
        }).join('') +
      '</div>' +
      '<p class="honesty">' + t('honesty') + '</p>' +
    '</div></section>';
  }

  function services() {
    return '<section class="section" id="services"><div class="wrap">' +
      '<header class="section-head"><h2 class="section-title">' + t('sec.services.title') + '</h2>' +
      '<p class="section-sub">' + t('sec.services.sub') + '</p></header>' +
      '<div class="services">' +
        [['svc.1', 'svc.1.items', ['done']], ['svc.2', 'svc.2.items', ['done']], ['svc.3', 'svc.3.items', ['done', 'order']]].map(function (s, i) {
          var items = t(s[1]).split('|').map(function (x) { return '<li>' + x + '</li>'; }).join('');
          var scopes = s[2].map(function (k) { return '<span class="' + k + '">' + t(k === 'done' ? 'scope.done' : 'scope.order') + '</span>'; }).join('');
          return '<div class="service"><span class="service-index">0' + (i + 1) + '</span>' +
            '<div><h3 class="service-title">' + t(s[0] + '.title') + '</h3>' +
            '<p class="service-desc">' + t(s[0] + '.desc') + '</p></div>' +
            '<div><ul class="service-list">' + items + '</ul><div class="scope">' + scopes + '</div></div>' +
          '</div>';
        }).join('') +
      '</div></div></section>';
  }

  function packages() {
    var packs = [['1', 'tg.pkg1'], ['2', 'tg.pkg2'], ['3', 'tg.pkg3']];
    return '<section class="section" id="packs"><div class="wrap">' +
      '<header class="section-head"><h2 class="section-title">' + t('sec.packs.title') + '</h2>' +
      '<p class="section-sub">' + t('sec.packs.sub') + '</p></header>' +
      '<div class="packs">' +
        packs.map(function (p) {
          var items = t('pack.' + p[0] + '.items').split('|').map(function (x) { return '<li>' + x + '</li>'; }).join('');
          var popular = p[0] === '2' ? '<span class="pack-badge">' + t('pack.popular') + '</span>' : '';
          return '<article class="pack' + (p[0] === '2' ? ' pack--popular' : '') + '">' +
            '<div class="pack-top"><h3 class="pack-name">' + t('pack.' + p[0] + '.name') + '</h3>' + popular + '</div>' +
            '<p class="pack-price">' + (p[0] === '3' ? '' : '<span>' + t('pack.from') + '</span> ') + t('pack.' + p[0] + '.price') + '</p>' +
            '<p class="pack-desc">' + t('pack.' + p[0] + '.desc') + '</p>' +
            '<ul class="pack-list">' + items + '</ul>' +
            '<a class="btn ' + (p[0] === '2' ? 'btn--solid' : 'btn--ghost') + ' btn--wide" href="' + TG + '?text=' + enc(t(p[1])) + '" target="_blank" rel="noopener" data-track="package" data-value="' + t('pack.' + p[0] + '.name') + '">' + t('pack.cta') + '</a>' +
          '</article>';
        }).join('') +
      '</div>' +
      '<p class="pack-note">' + t('pack.note') + '</p>' +
      '<p class="pack-terms">' + t('pack.terms') + '</p>' +
    '</div></section>';
  }

  function work() {
    var filters = [['all', 'filter.all'], ['service', 'filter.service'], ['ecommerce', 'filter.ecommerce'], ['automation', 'filter.automation']]
      .map(function (f) {
        return '<button class="filter-btn' + (state.filter === f[0] ? ' is-on' : '') + '" type="button" data-filter="' + f[0] + '">' + t(f[1]) + '</button>';
      }).join('');
    var list = PROJECTS.filter(function (p) { return state.filter === 'all' || p.cat === state.filter; });
    var cards = list.map(projCard).join('');
    var more = MORE_WORKS.map(function (m) {
      return '<a class="more-item" href="' + m.href + '" target="_blank" rel="noopener">' +
        '<span class="more-cover"><img src="' + m.cover + '" alt="' + m.title + '" loading="lazy"></span><span>' + m.title + '</span></a>';
    }).join('');
    return '<section class="section" id="work"><div class="wrap">' +
      '<header class="section-head"><h2 class="section-title">' + t('sec.work.title') + '</h2>' +
      '<p class="section-sub">' + t('sec.work.sub') + '</p></header>' +
      '<div class="filters" role="group" aria-label="Фільтр">' + filters + '</div>' +
      '<div class="gallery" id="gallery">' + cards + '</div>' +
      '<div class="more"><h3 class="more-title">' + t('proj.more') + '</h3><div class="more-row">' + more + '</div></div>' +
    '</div></section>';
  }

  function projCard(p) {
    var feats = L(p.feats).map(function (f) { return '<li>' + f + '</li>'; }).join('');
    return '<article class="proj proj--' + p.size + '" data-cat="' + p.cat + '">' +
      '<div class="proj-media"><img src="' + p.cover + '" alt="' + esc(L(p.title)) + '" loading="lazy">' +
      '<span class="proj-status ' + (p.status === 'real' ? 'real' : '') + '">' + t(p.status === 'real' ? 'status.real' : 'status.demo') + '</span></div>' +
      '<div class="proj-body">' +
        '<span class="proj-cat">' + t(CAT_LABEL[p.cat]) + '</span>' +
        '<h3 class="proj-title">' + L(p.title) + '</h3>' +
        '<p class="proj-desc">' + L(p.desc) + '</p>' +
        '<ul class="proj-feats">' + feats + '</ul>' +
        '<div class="proj-actions">' +
          '<a class="proj-open" href="' + p.demo + '"' + (p.demo.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') + '>' + t('proj.open') + '</a>' +
          '<button class="proj-case" type="button" data-case="' + p.id + '">' + t('proj.case') + '</button>' +
        '</div>' +
      '</div></article>';
  }

  function ai() {
    var points = t('ai.points').split('|').map(function (x) { return '<li>' + x + '</li>'; }).join('');
    var scen = [['a', 'ai.scen.a'], ['b', 'ai.scen.b'], ['c', 'ai.scen.c']].map(function (s) {
      return '<div class="scen"><span class="scen-l">' + s[0].toUpperCase() + '</span>' +
        '<div><h4>' + t(s[1] + '.t') + '</h4><p>' + t(s[1] + '.d') + '</p></div></div>';
    }).join('');
    return '<section class="section ai" id="ai"><div class="wrap">' +
      '<header class="section-head"><h2 class="section-title">' + t('sec.ai.title') + '</h2>' +
      '<p class="section-sub">' + t('sec.ai.sub') + '</p></header>' +
      '<div class="scens"><h3 class="scens-title">' + t('ai.scen.title') + '</h3><div class="scen-row">' + scen + '</div></div>' +
      '<div class="ai-grid">' +
        '<div class="ai-copy"><h3>' + t('ai.h3') + '</h3><p>' + t('ai.desc') + '</p>' +
        '<ul class="ai-points">' + points + '</ul>' +
        '<p class="ai-note">' + t('ai.note') + '</p>' +
        '<a class="btn btn--solid" style="margin-top:20px" href="' + TG + '?text=' + enc(t('tg.ai')) + '" target="_blank" rel="noopener" data-track="cta" data-value="ai">' + t('ai.cta') + '</a></div>' +
        '<div class="chat" role="log" aria-label="' + t('ai.chat.title') + '">' +
          '<div class="chat-head"><span class="dot"></span><span class="who">' + t('ai.chat.title') + ' · ' + (LANG === 'ua' ? 'онлайн' : 'онлайн') + '</span>' +
          '<button class="chat-restart" type="button" id="chatRestart">' + t('ai.restart') + '</button></div>' +
          '<div class="chat-msgs" id="chatMsgs"></div>' +
          '<div class="chat-quick" id="chatQuick"></div>' +
        '</div>' +
      '</div></div></section>';
  }

  function process() {
    var steps = [['step.1'], ['step.2'], ['step.3'], ['step.4']];
    return '<section class="section" id="process"><div class="wrap">' +
      '<header class="section-head"><h2 class="section-title">' + t('sec.process.title') + '</h2>' +
      '<p class="section-sub">' + t('sec.process.sub') + '</p></header>' +
      '<div class="process">' + steps.map(function (s, i) {
        return '<div class="step"><span class="step-n">0' + (i + 1) + '</span>' +
          '<div><h3 class="step-title">' + t(s[0] + '.t') + '</h3><p class="step-desc">' + t(s[0] + '.d') + '</p></div></div>';
      }).join('') + '</div></div></section>';
  }

  function contact() {
    var opts = t('form.service.opts').split('|').map(function (o) { return '<option>' + o + '</option>'; }).join('');
    return '<section class="section" id="contact"><div class="wrap">' +
      '<header class="section-head"><h2 class="section-title">' + t('sec.contact.title') + '</h2>' +
      '<p class="section-sub">' + t('sec.contact.sub') + '</p></header>' +
      '<div class="contact-grid">' +
        '<div class="contact-info"><p>' + t('contact.lead') + '</p>' +
        '<div class="contact-channel"><p class="lbl">Telegram</p>' +
        '<a class="tg" href="' + TG + '" target="_blank" rel="noopener">@massiveboy</a></div></div>' +
        '<form class="contact-form" id="contactForm">' +
          '<div class="field"><label>' + t('form.name') + '</label><input type="text" name="name" required maxlength="120" placeholder="' + t('form.name.ph') + '"></div>' +
          '<div class="field"><label>' + t('form.service') + '</label><select name="service">' + opts + '</select></div>' +
          '<div class="field"><label>' + t('form.contact') + '</label><input type="text" name="contact" required maxlength="120" placeholder="' + t('form.contact.ph') + '"></div>' +
          '<div class="field"><label>' + t('form.msg') + '</label><textarea name="msg" maxlength="600" placeholder="' + t('form.msg.ph') + '"></textarea></div>' +
          '<button class="btn btn--solid btn--wide" type="submit">' + t('form.submit') + '</button>' +
          '<p class="form-note">' + t('form.note') + '</p>' +
        '</form>' +
      '</div></div></section>';
  }

  function finalCta() {
    return '<section class="final"><div class="wrap">' +
      '<h2>' + t('final.h2') + '</h2><p>' + t('final.p') + '</p>' +
      '<a class="btn" href="' + TG + '?text=' + enc(t('tg.site')) + '" target="_blank" rel="noopener">' + t('final.cta') + '</a>' +
    '</div></section>';
  }

  function caseMarkup() {
    return '<div class="case-veil" id="caseVeil" hidden></div>' +
      '<aside class="case-panel" id="casePanel" aria-hidden="true" aria-label="Кейс">' +
        '<div class="case-head"><span class="cat" id="caseCat"></span>' +
        '<button class="case-close" type="button" id="caseClose" aria-label="Закрити">×</button></div>' +
        '<div class="case-body" id="caseBody"></div>' +
      '</aside>';
  }

  /* ── кейс ── */

  function openCase(id) {
    var p = PROJECTS.find(function (x) { return x.id === id; });
    if (!p) return;
    $('#caseCat').textContent = t(CAT_LABEL[p.cat]);
    var feats = L(p.caseFeats || p.feats).map(function (f) { return '<li>' + f + '</li>'; }).join('');
    var shots = p.shots.map(function (s) { return '<img src="' + s + '" alt="' + esc(L(p.title)) + '" loading="lazy">'; }).join('');
    var tech = (p.tech && p.tech.length) ? '<div class="case-block"><h4>' + t('case.tech') + '</h4><div class="case-tech">' + p.tech.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div></div>' : '';
    var statusLine = '<span class="case-status' + (p.status === 'real' ? ' real' : '') + '">' + t(p.status === 'real' ? 'case.real' : 'case.demo') + '</span>';
    $('#caseBody').innerHTML =
      '<h2>' + L(p.title) + '</h2>' + statusLine +
      '<p class="case-lead">' + L(p.desc) + '</p>' +
      '<div class="case-block"><h4>' + t('case.task') + '</h4><p>' + L(p.task) + '</p></div>' +
      '<div class="case-block"><h4>' + t('case.concept') + '</h4><p>' + L(p.concept) + '</p></div>' +
      '<div class="case-block"><h4>' + t('case.functions') + '</h4><ul class="service-list">' + feats + '</ul></div>' +
      tech +
      '<div class="case-shots">' + shots + '</div>' +
      '<div class="case-actions">' +
        '<a class="btn btn--solid" href="' + p.demo + '"' + (p.demo.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') + '>' + t('case.open') + '</a>' +
        '<a class="btn btn--ghost" href="' + TG + '?text=' + enc(t('tg.site')) + '" target="_blank" rel="noopener" data-track="cta" data-value="case_' + p.id + '">' + t('case.cta') + '</a>' +
      '</div>';
    var panel = $('#casePanel'), veil = $('#caseVeil');
    panel.classList.add('is-open'); panel.setAttribute('aria-hidden', 'false');
    veil.hidden = false; requestAnimationFrame(function () { veil.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    $('#caseClose').focus();
    track('case_open', id);
  }

  function closeCase() {
    $('#casePanel').classList.remove('is-open'); $('#casePanel').setAttribute('aria-hidden', 'true');
    $('#caseVeil').classList.remove('is-open');
    setTimeout(function () { $('#caseVeil').hidden = true; }, 280);
    document.body.style.overflow = '';
  }

  /* ── AI-чат (симуляція) ── */

  var CHAT = {
    ua: {
      '0': { bot: 'Вітаю! Я — демо AI-асистент салону краси. Допоможу підібрати процедуру й записати вас. Що вас цікавить?', q: ['Манікюр', 'Стрижка', 'Консультація'] },
      'manik': { bot: 'Чудово! Манікюр з покриттям чи без?', q: ['З покриттям', 'Без покриття'] },
      'str': { bot: 'Допоможу підібрати майстра-стиліста. Бажаєте стрижку чи укладку?', q: ['Стрижка', 'Укладка'] },
      'kons': { bot: 'Звісно! Підберу час для консультації з майстром. Вам зручно завтра о 12:00?', q: ['Так', 'Інший час'] },
      'final': { bot: 'Готово — я сформував заявку й передав її власнику в Telegram. Це демо-сценарій: реальна інтеграція налаштовується під ваші процеси.', q: ['Почати спочатку'] }
    },
    ru: {
      '0': { bot: 'Здравствуйте! Я — демо AI-ассистент салона красоты. Помогу подобрать процедуру и записать вас. Что вас интересует?', q: ['Маникюр', 'Стрижка', 'Консультация'] },
      'manik': { bot: 'Отлично! Маникюр с покрытием или без?', q: ['С покрытием', 'Без покрытия'] },
      'str': { bot: 'Помогу подобрать мастера-стилиста. Хотите стрижку или укладку?', q: ['Стрижка', 'Укладка'] },
      'kons': { bot: 'Конечно! Подберу время для консультации с мастером. Вам удобно завтра в 12:00?', q: ['Да', 'Другое время'] },
      'final': { bot: 'Готово — я сформировал заявку и передал её владельцу в Telegram. Это демо-сценарий: реальная интеграция настраивается под ваши процессы.', q: ['Начать сначала'] }
    }
  };

  function addMsg(text, who) {
    var box = $('#chatMsgs');
    var div = document.createElement('div');
    div.className = 'msg msg--' + who;
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function showTyping() {
    removeTyping();
    var box = $('#chatMsgs');
    var div = document.createElement('div');
    div.className = 'msg msg--bot msg--typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function removeTyping() {
    var t = $('#chatMsgs .msg--typing');
    if (t) t.remove();
  }

  function chatStep(key) {
    var d = CHAT[LANG];
    var node = d[key] || d['final'];
    showTyping();
    setTimeout(function () {
      removeTyping();
      addMsg(node.bot, 'bot');
      var quick = $('#chatQuick');
      quick.innerHTML = node.q.map(function (q, i) {
        var nk = key === '0' ? (i === 0 ? 'manik' : i === 1 ? 'str' : 'kons') : (key === 'final' ? '0' : 'final');
        return '<button type="button" data-next="' + nk + '" data-label="' + esc(q) + '">' + q + '</button>';
      }).join('');
    }, 700);
  }

  function initChat() {
    $('#chatMsgs').innerHTML = '';
    chatStep('0');
  }

  /* ── контактна форма ── */

  function submitContact(form) {
    var name = form.elements.name.value.trim();
    var contact = form.elements.contact.value.trim();
    if (!name || !contact) return;
    var service = form.elements.service.value;
    var msg = form.elements.msg.value.trim().slice(0, 600);
    var text = (LANG === 'ua'
      ? 'Здрастуйте! Хочу обговорити проєкт.\n\nПослуга: ' + service + '\nІм\'я: ' + name + '\nКонтакт: ' + contact + (msg ? '\n\nЗадача: ' + msg : '')
      : 'Здравствуйте! Хочу обсудить проект.\n\nУслуга: ' + service + '\nИмя: ' + name + '\nКонтакт: ' + contact + (msg ? '\n\nЗадача: ' + msg : ''));
    window.open(TG + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    track('form_submit', service);
  }

  /* ── аналітика (заглушка без сторонніх сервісів) ── */

  function track(event, value) {
    try { console.info('[analytics]', event, value || ''); } catch (e) {}
  }

  /* ── хром ── */

  function applyChrome() {
    document.documentElement.lang = LANG === 'ua' ? 'uk' : 'ru';
    document.title = LANG === 'ua' ? 'Xal1fat — розробка сайтів, інтернет-магазинів та AI-рішень' : 'Xal1fat — разработка сайтов, интернет-магазинов и AI-решений';
    var nodes = document.querySelectorAll('[data-i18n]');
    Array.prototype.forEach.call(nodes, function (el) {
      var k = el.getAttribute('data-i18n'); if (k) el.textContent = t(k);
    });
    var btns = document.querySelectorAll('.lang-btn');
    Array.prototype.forEach.call(btns, function (b) {
      var on = b.getAttribute('data-lang') === LANG;
      b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on));
    });
    var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  }

  function setLang(l) {
    LANG = l;
    try { localStorage.setItem('xal1fat.lang', l); } catch (e) {}
    var y = window.scrollY || document.documentElement.scrollTop;
    applyChrome();
    render();
    requestAnimationFrame(function () { window.scrollTo(0, y); });
    track('lang_switch', l);
  }

  /* ── події ── */

  function bind() {
    $('#gallery').addEventListener('click', function (e) {
      var c = e.target.closest('[data-case]');
      if (c) { openCase(c.getAttribute('data-case')); return; }
    });
    $('#chatQuick').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      addMsg(b.getAttribute('data-label'), 'user');
      track('ai_interact', b.getAttribute('data-label'));
      setTimeout(function () { chatStep(b.getAttribute('data-next')); }, 420);
    });
    var restart = $('#chatRestart');
    if (restart) restart.addEventListener('click', function () { initChat(); track('ai_restart'); });
  }

  document.addEventListener('click', function (e) {
    var dt = e.target.closest('[data-track]');
    if (dt) track(dt.getAttribute('data-track'), dt.getAttribute('data-value') || '');
    var lb = e.target.closest('.lang-btn'); if (lb) { setLang(lb.getAttribute('data-lang')); return; }
    var fb = e.target.closest('.filter-btn');
    if (fb) {
      state.filter = fb.getAttribute('data-filter');
      document.querySelectorAll('.filter-btn').forEach(function (x) { x.classList.toggle('is-on', x === fb); });
      var list = PROJECTS.filter(function (p) { return state.filter === 'all' || p.cat === state.filter; });
      $('#gallery').innerHTML = list.map(projCard).join('');
      bind();
      return;
    }
    if (e.target.closest('#caseClose') || (e.target.closest('#caseVeil'))) { closeCase(); return; }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCase();
  });

  document.addEventListener('submit', function (e) {
    if (e.target.id === 'contactForm') { e.preventDefault(); submitContact(e.target); }
  });

  /* ── утиліти ── */

  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function enc(s) { return encodeURIComponent(s); }

  window.addEventListener('hashchange', function () {
    if (location.hash === '#ai') { var el = document.getElementById('ai'); if (el) el.scrollIntoView(); }
  });

  /* ── старт ── */

  applyChrome();
  render();
})();
