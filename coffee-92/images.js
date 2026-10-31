/* 92° — генератор изображений.
   Локальные параметрические SVG-иллюстрации: каждый товар получает собственное,
   тематическое изображение (пакет зерна с этикеткой по происхождению, технический
   чертёж машины, напиток, интерьер). Без сетевых зависимостей и без случайных фото. */

(function (global) {
  'use strict';

  var F = {
    serif: "Iowan Old Style, 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
    sans: "Avenir Next, Avenir, 'Helvetica Neue', Helvetica, sans-serif",
    mono: "'SF Mono', SFMono-Regular, Menlo, Consolas, monospace"
  };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function wrap(w, h, inner, label) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg"' +
      (label ? ' role="img" aria-label="' + esc(label) + '"' : ' aria-hidden="true"') +
      ' preserveAspectRatio="xMidYMid meet">' + inner + '</svg>';
  }

  /* Общая текстура зёрен — лёгкая, полупрозрачная, без градиентов. */
  function beansScatter(n, tone, x0, y0, x1, y1) {
    var out = '', i, cx, cy, r;
    for (i = 0; i < n; i++) {
      cx = x0 + Math.random() * (x1 - x0);
      cy = y0 + Math.random() * (y1 - y0);
      r = 4 + Math.random() * 5;
      out += '<ellipse cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" rx="' + r.toFixed(1) +
        '" ry="' + (r * 0.62).toFixed(1) + '" fill="' + tone + '" opacity="0.16" transform="rotate(' +
        (Math.random() * 180).toFixed(0) + ' ' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ')"/>';
    }
    return out;
  }

  /* ── Пакет зерна ─────────────────────────────────────────────
     Плоская двухтоновая упаковка с этикеткой: бренд, страна, обжарка. */
  function beanBag(b) {
    var acc = b.accent || '#A4482A';
    var roastCol = { light: '#D8A45B', medium: '#B5763F', dark: '#5C3B2E' }[b.roast] || '#B5763F';
    var dots = [1, 2, 3].map(function (i) {
      var on = ({ light: 1, medium: 2, dark: 3 }[b.roast] || 1) >= i;
      return '<circle cx="' + (200 + (i - 2) * 20) + '" cy="290" r="4.5" fill="' + (on ? roastCol : 'none') +
        '" stroke="' + (on ? roastCol : '#B9B19C') + '" stroke-width="1.4"/>';
    }).join('');

    var inner =
      // фон-подложка (тон)
      '<rect x="0" y="0" width="400" height="500" fill="' + (b.tint || '#E8DED0') + '"/>' +
      beansScatter(16, acc, 20, 40, 380, 120) +
      // пакет
      '<path d="M112 132 L112 424 Q112 436 124 436 L276 436 Q288 436 288 424 L288 132 Z" fill="#EDEAE1" stroke="#17140F" stroke-width="2"/>' +
      // боковой сгиб пакета (двухтон)
      '<path d="M288 132 L288 424 Q288 436 276 436 L264 436 L264 132 Z" fill="#DFD9C9"/>' +
      // верхний зажим
      '<rect x="112" y="120" width="176" height="20" fill="#CFC8B6" stroke="#17140F" stroke-width="2"/>' +
      '<path d="M124 120 v20 M140 120 v20 M156 120 v20 M172 120 v20 M188 120 v20 M204 120 v20 M220 120 v20 M236 120 v20 M252 120 v20 M268 120 v20" stroke="#17140F" stroke-width="1" opacity="0.35"/>' +
      // этикетка
      '<rect x="146" y="166" width="108" height="150" fill="#F6F3EB" stroke="#17140F" stroke-width="1.6"/>' +
      '<text x="200" y="198" text-anchor="middle" font-family="' + F.serif + '" font-size="30" fill="#17140F">92°</text>' +
      '<line x1="164" y1="212" x2="236" y2="212" stroke="' + acc + '" stroke-width="2"/>' +
      '<text x="200" y="242" text-anchor="middle" font-family="' + F.mono + '" font-size="11" letter-spacing="2" fill="#6E6657">' + esc((b.country || '').toUpperCase()) + '</text>' +
      '<text x="200" y="266" text-anchor="middle" font-family="' + F.serif + '" font-size="19" fill="#17140F">' + esc(b.name || '') + '</text>' +
      dots +
      '<text x="200" y="308" text-anchor="middle" font-family="' + F.mono + '" font-size="10" fill="#6E6657">' + esc(b.weight || '') + ' · ' + esc(b.process || '') + '</text>' +
      // нижняя полоса-акцент
      '<rect x="112" y="412" width="176" height="6" fill="' + acc + '"/>' +
      beansScatter(10, acc, 40, 448, 360, 492);

    return wrap(400, 500, inner, 'Пакет: ' + b.country + ' ' + b.name);
  }

  /* ── Техника: эспрессо-машина ──────────────────────────────── */
  function espressoMachine(p) {
    var acc = p.accent || '#2F4858';
    var inner =
      '<rect x="0" y="0" width="460" height="380" fill="' + (p.tint || '#E3E9ED') + '"/>' +
      // фоновые размерные линии (чертёж)
      '<line x1="40" y1="40" x2="420" y2="40" stroke="#2F4858" stroke-width="1" opacity="0.25"/>' +
      '<line x1="40" y1="40" x2="40" y2="340" stroke="#2F4858" stroke-width="1" opacity="0.25"/>' +
      // корпус
      '<rect x="120" y="120" width="220" height="200" rx="10" fill="#F4F6F8" stroke="#17140F" stroke-width="2.5"/>' +
      '<rect x="120" y="120" width="220" height="34" fill="' + acc + '"/>' +
      // группа
      '<rect x="170" y="154" width="120" height="22" fill="#D5DEE4" stroke="#17140F" stroke-width="2"/>' +
      '<rect x="188" y="176" width="84" height="10" fill="#2F4858"/>' +
      // портафильтр
      '<path d="M206 186 h48 v22 h-18 l-6 10 h-20 l-6 -10 h-18 Z" fill="#D5DEE4" stroke="#17140F" stroke-width="2"/>' +
      // манометр
      '<circle cx="300" cy="180" r="20" fill="#F6F3EB" stroke="#17140F" stroke-width="2"/>' +
      '<line x1="300" y1="180" x2="312" y2="170" stroke="#17140F" stroke-width="2"/>' +
      // паровой кран
      '<path d="M180 320 q0 -40 26 -40 q26 0 26 40 Z" fill="#D5DEE4" stroke="#17140F" stroke-width="2"/>' +
      '<rect x="120" y="230" width="220" height="8" fill="' + acc + '" opacity="0.5"/>' +
      // поддон
      '<rect x="132" y="320" width="196" height="26" rx="4" fill="' + acc + '" stroke="#17140F" stroke-width="2"/>' +
      '<rect x="152" y="312" width="156" height="8" fill="#D5DEE4"/>' +
      // подпись
      '<text x="230" y="356" text-anchor="middle" font-family="' + F.mono + '" font-size="11" letter-spacing="2" fill="#2F4858">' + esc((p.brand || '').toUpperCase()) + '</text>';

    return wrap(460, 380, inner, 'Эспрессо-машина ' + p.brand + ' ' + p.name);
  }

  /* ── Техника: кофемолка ────────────────────────────────────── */
  function grinder(p) {
    var acc = p.accent || '#2F4858';
    var inner =
      '<rect x="0" y="0" width="460" height="380" fill="' + (p.tint || '#E3E9ED') + '"/>' +
      '<line x1="40" y1="40" x2="420" y2="40" stroke="#2F4858" stroke-width="1" opacity="0.25"/>' +
      '<line x1="40" y1="40" x2="40" y2="340" stroke="#2F4858" stroke-width="1" opacity="0.25"/>' +
      // бункер
      '<path d="M170 96 L196 150 L264 150 L290 96 Z" fill="#F4F6F8" stroke="#17140F" stroke-width="2.5"/>' +
      '<line x1="230" y1="96" x2="230" y2="150" stroke="#17140F" stroke-width="1.4" opacity="0.4"/>' +
      // корпус
      '<rect x="150" y="150" width="160" height="150" rx="12" fill="#F4F6F8" stroke="#17140F" stroke-width="2.5"/>' +
      '<circle cx="230" cy="196" r="26" fill="' + acc + '" stroke="#17140F" stroke-width="2"/>' +
      '<circle cx="230" cy="196" r="13" fill="#F6F3EB"/>' +
      // регулятор
      '<circle cx="230" cy="262" r="17" fill="#D5DEE4" stroke="#17140F" stroke-width="2"/>' +
      '<line x1="230" y1="262" x2="230" y2="247" stroke="#17140F" stroke-width="2"/>' +
      // лоток
      '<rect x="170" y="300" width="120" height="34" rx="4" fill="' + acc + '" stroke="#17140F" stroke-width="2"/>' +
      '<rect x="196" y="300" width="68" height="34" fill="#2F4858" opacity="0.35"/>' +
      '<text x="230" y="356" text-anchor="middle" font-family="' + F.mono + '" font-size="11" letter-spacing="2" fill="#2F4858">' + esc((p.brand || '').toUpperCase()) + '</text>';

    return wrap(460, 380, inner, 'Кофемолка ' + p.brand + ' ' + p.name);
  }

  /* ── Техника: аксессуар (темпер / питчер / весы / воронка) ─── */
  function accessory(p) {
    var kind = p.kind || 'tamper';
    var acc = p.accent || '#2F4858';
    var body = '';
    if (kind === 'tamper') {
      body =
        '<rect x="200" y="110" width="60" height="14" rx="6" fill="#2F4858"/>' +
        '<rect x="212" y="124" width="36" height="70" fill="' + acc + '" stroke="#17140F" stroke-width="2"/>' +
        '<circle cx="230" cy="212" r="34" fill="#F4F6F8" stroke="#17140F" stroke-width="2.5"/>' +
        '<circle cx="230" cy="212" r="20" fill="#D5DEE4"/>';
    } else if (kind === 'pitcher') {
      body =
        '<path d="M176 120 Q178 120 196 150 L246 234 L214 234 L176 150 Z" fill="#F4F6F8" stroke="#17140F" stroke-width="2.5"/>' +
        '<path d="M196 150 Q232 150 246 234" fill="none" stroke="#17140F" stroke-width="1.6"/>' +
        '<path d="M176 120 Q150 112 138 96" fill="none" stroke="' + acc + '" stroke-width="4" stroke-linecap="round"/>';
    } else if (kind === 'scale') {
      body =
        '<rect x="150" y="200" width="160" height="26" rx="6" fill="#F4F6F8" stroke="#17140F" stroke-width="2.5"/>' +
        '<rect x="190" y="206" width="80" height="14" rx="3" fill="#17140F"/>' +
        '<rect x="180" y="150" width="100" height="50" rx="4" fill="#F4F6F8" stroke="#17140F" stroke-width="2"/>' +
        '<line x1="230" y1="160" x2="230" y2="190" stroke="' + acc + '" stroke-width="3"/>';
    } else { // dripper (V60)
      body =
        '<path d="M168 120 L232 120 L214 210 L186 210 Z" fill="#F4F6F8" stroke="#17140F" stroke-width="2.5"/>' +
        '<path d="M176 150 L168 120 M200 168 L200 120 M224 150 L232 120" stroke="' + acc + '" stroke-width="2" opacity="0.6"/>' +
        '<rect x="150" y="214" width="160" height="10" rx="4" fill="' + acc + '"/>' +
        '<path d="M150 224 L176 250 M230 224 L284 250" stroke="#17140F" stroke-width="2" fill="none"/>';
    }
    var inner =
      '<rect x="0" y="0" width="460" height="380" fill="' + (p.tint || '#E3E9ED') + '"/>' +
      '<line x1="40" y1="40" x2="420" y2="40" stroke="#2F4858" stroke-width="1" opacity="0.25"/>' +
      '<line x1="40" y1="40" x2="40" y2="340" stroke="#2F4858" stroke-width="1" opacity="0.25"/>' +
      body +
      '<text x="230" y="356" text-anchor="middle" font-family="' + F.mono + '" font-size="11" letter-spacing="2" fill="#2F4858">' + esc((p.brand || '').toUpperCase()) + '</text>';

    return wrap(460, 380, inner, 'Аксессуар: ' + p.name);
  }

  /* ── Напиток ───────────────────────────────────────────────── */
  function drink(kind, tone) {
    var acc = tone || '#A4482A';
    var foam = kind === 'flat' ? '#E9DCC8' : (kind === 'cappuccino' ? '#D9C6A8' : '#F3E7D0');
    var inner =
      '<rect x="0" y="0" width="320" height="320" fill="' + (kind === 'filter' ? '#E8DED0' : '#EDE6D8') + '"/>' +
      // блюдце
      '<ellipse cx="160" cy="262" rx="92" ry="20" fill="#F6F3EB" stroke="#17140F" stroke-width="2"/>' +
      // чашка
      '<path d="M92 150 L112 244 Q160 258 208 244 L228 150 Z" fill="#F6F3EB" stroke="#17140F" stroke-width="2.5"/>' +
      // ручка
      '<path d="M228 162 Q268 168 266 204 Q264 232 224 230" fill="none" stroke="#17140F" stroke-width="5"/>' +
      // напиток
      '<ellipse cx="160" cy="150" rx="66" ry="14" fill="' + acc + '" stroke="#17140F" stroke-width="2"/>' +
      '<rect x="96" y="150" width="128" height="12" fill="' + acc + '"/>' +
      '<path d="M96 150 L98 154 L224 154 L226 150 Z" fill="' + acc + '"/>' +
      // латте-арт / крема
      (kind === 'flat'
        ? '<path d="M160 140 q18 -12 34 0 q-8 8 -17 8 q-9 0 -17 -8 Z" fill="' + foam + '" opacity="0.9"/>'
        : '<circle cx="160" cy="146" r="26" fill="' + foam + '" opacity="0.9"/>') +
      // пар
      '<path d="M138 110 q-8 -14 2 -24 q10 -10 0 -22" fill="none" stroke="#B9B19C" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>' +
      '<path d="M176 104 q-6 -12 3 -20 q9 -9 1 -20" fill="none" stroke="#B9B19C" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>';

    return wrap(320, 320, inner, 'Напиток');
  }

  /* ── Интерьер бара ─────────────────────────────────────────── */
  function interior() {
    var inner =
      '<rect x="0" y="0" width="720" height="420" fill="#2C4A3B"/>' +
      '<rect x="0" y="300" width="720" height="120" fill="#243D31"/>' +
      // окно
      '<rect x="60" y="70" width="180" height="200" fill="#E9E2CE" stroke="#17140F" stroke-width="3"/>' +
      '<line x1="150" y1="70" x2="150" y2="270" stroke="#17140F" stroke-width="3"/>' +
      '<line x1="60" y1="170" x2="240" y2="170" stroke="#17140F" stroke-width="3"/>' +
      // стойка
      '<rect x="300" y="180" width="360" height="18" fill="#EDEAE1" stroke="#17140F" stroke-width="2.5"/>' +
      '<rect x="330" y="198" width="24" height="120" fill="#EDEAE1" stroke="#17140F" stroke-width="2"/>' +
      '<rect x="606" y="198" width="24" height="120" fill="#EDEAE1" stroke="#17140F" stroke-width="2"/>' +
      // машина на стойке
      '<rect x="430" y="120" width="110" height="60" rx="6" fill="#F4F6F8" stroke="#17140F" stroke-width="2.5"/>' +
      '<rect x="430" y="120" width="110" height="16" fill="#A4482A"/>' +
      // табуреты
      '<circle cx="360" cy="330" r="26" fill="#EDEAE1" stroke="#17140F" stroke-width="2.5"/>' +
      '<circle cx="500" cy="330" r="26" fill="#EDEAE1" stroke="#17140F" stroke-width="2.5"/>' +
      '<rect x="352" y="356" width="16" height="50" fill="#17140F"/>' +
      '<rect x="492" y="356" width="16" height="50" fill="#17140F"/>' +
      // чашки
      '<path d="M300 260 h26 v14 h-26 Z" fill="#F6F3EB" stroke="#17140F" stroke-width="2"/>' +
      '<path d="M470 254 h22 v12 h-22 Z" fill="#F6F3EB" stroke="#17140F" stroke-width="2"/>';

    return wrap(720, 420, inner, 'Интерьер бара');
  }

  /* ── Hero: редакционный натюрморт ──────────────────────────── */
  function heroStill() {
    var inner =
      '<rect x="0" y="0" width="640" height="720" fill="#E8DED0"/>' +
      beansScatter(24, '#A4482A', 30, 30, 610, 260) +
      // чашка с зерном
      '<ellipse cx="320" cy="560" rx="150" ry="34" fill="#D9D1BF"/>' +
      '<path d="M176 320 L196 560 Q320 592 444 560 L464 320 Z" fill="#F6F3EB" stroke="#17140F" stroke-width="3"/>' +
      '<ellipse cx="320" cy="320" rx="142" ry="34" fill="#C9A227" stroke="#17140F" stroke-width="3"/>' +
      beansScatter(18, '#A4482A', 210, 300, 430, 344) +
      '<ellipse cx="320" cy="306" rx="118" ry="24" fill="#A4482A" opacity="0.92"/>' +
      beansScatter(12, '#17140F', 232, 296, 408, 318) +
      // пакет за чашкой
      '<path d="M470 240 L536 240 L536 560 Q536 576 520 576 L486 576 Q470 576 470 560 Z" fill="#EDEAE1" stroke="#17140F" stroke-width="3"/>' +
      '<rect x="482" y="300" width="42" height="120" fill="#F6F3EB" stroke="#17140F" stroke-width="1.6"/>' +
      '<text x="503" y="330" text-anchor="middle" font-family="' + F.serif + '" font-size="17" fill="#17140F">92°</text>' +
      '<line x1="492" y1="344" x2="514" y2="344" stroke="#A4482A" stroke-width="2"/>' +
      // зерно в воздухе
      '<ellipse cx="150" cy="180" rx="20" ry="13" fill="#5C3B2E" transform="rotate(-24 150 180)"/>' +
      '<ellipse cx="500" cy="150" rx="18" ry="11" fill="#B5763F" transform="rotate(30 500 150)"/>' +
      '<ellipse cx="180" cy="470" rx="16" ry="10" fill="#A4482A" transform="rotate(18 180 470)"/>' +
      '<ellipse cx="520" cy="400" rx="15" ry="10" fill="#C9A227" transform="rotate(-16 520 400)"/>';

    return wrap(640, 720, inner, 'Свежеобжаренные зёрна и упаковка 92°');
  }

  global.Images = {
    beanBag: beanBag,
    machine: function (p) {
      return p.category === 'grinder' ? grinder(p) : espressoMachine(p);
    },
    accessory: accessory,
    drink: drink,
    interior: interior,
    hero: heroStill
  };
})(window);
