import json, re
rows=json.load(open('channels.json'))
def num(s):
    s=str(s or '').replace('\u00a0',' ').replace(' ','').replace(',','.')
    m=re.match(r'([\d.]+)\s*([KkMm])?',s)
    if not m: return 0
    v=float(m.group(1))
    if m.group(2) and m.group(2).lower()=='k': v*=1000
    if m.group(2) and m.group(2).lower()=='m': v*=1e6
    return int(v)
SOCIAL=('instagram','facebook','t.me','telegram','youtube','youtu.be','wa.me','viber','vk.com','threads','linktr.ee','taplink','tiktok','maps.google','google.com/maps')
CITIES=['Київ','Львів','Вінниця','Луцьк','Тернопіль','Івано-Франківськ','Чернівці','Дніпро','Одеса','Харків','Ужгород','Рівне','Житомир','Бровари','Суми','Полтава','Запоріжжя','Миколаїв','Хмельницький','Черкаси']
DROP=('speka','English Specialists','фінансового прориву','Беларуси','квитки на автобус','tripmydream','Lowcost.UA')
def site_flag(links):
    for l in links:
        if not any(s in l for s in SOCIAL): return 'yes'
    return 'no'
def city_of(r):
    blob=(r.get('title','')+' '+r.get('desc',''))
    for c in CITIES:
        if c.lower() in blob.lower(): return c
    return ''
def tmpl(r):
    t=r.get('title','').strip().strip('|').strip()
    d=(r.get('desc','')+' '+t).lower()
    city=city_of(r)
    if 'туроператор' in d or 'туроператор' in t.lower():
        return f"""Вітаю! Пишу щодо «{t}».

Туроператору канал замінює сайт тільки наполовину: агенти й клієнти хочуть бачити умови, напрямки й ціни в одному місці, а не гортати десятки постів.

Роблю сайти для туроператорів: напрямки й дати, умови для агентів, заявка в Telegram.

Можу показати 2 скрини — подивитесь, чи підходить формат. Скинути?"""
    if 'екскурсі' in d:
        return f"""Вітаю! Пишу щодо «{t}».

Екскурсії продаються датою й місцем: людина хоче побачити, що буде в суботу, скільки коштує і чи є місця. У каналі це тоне в стрічці.

Роблю сторінку з розкладом екскурсій, цінами й заявкою в Telegram.

Показати, як це виглядає?"""
    if 'похід' in d or 'рафтинг' in d or 'карпат' in d:
        return f"""Вітаю! Пишу щодо «{t}».

Походи й виїзди продаються датою: людина вирішує за два дні до виїзду. У каналі ці дати вже внизу стрічки, і їх не знайти.

Роблю сторінку з афішею виїздів: дата, складність, ціна, вільні місця, заявка в Telegram.

Скинути 2 скрини?"""
    if city:
        return f"""Вітаю! Пишу щодо «{t}».

Ваші клієнти шукають «гарячі тури {city}» у Google — і потрапляють до агрегаторів, які продають вас же за комісію. У Telegram вас бачать тільки підписники.

Роблю сторінки для турагентств: напрямки, дати, ціни, заявка в Telegram. Плюс вас починають знаходити в пошуку.

Скинути 2 скрини?"""
    return f"""Вітаю! Пишу щодо «{t}».

У каналі у вас є все — напрямки, дати, ціни, — але тільки для тих, хто гортає стрічку. Новий клієнт так не робить.

Роблю сторінки для турів: напрямки, дати, ціни, заявка в Telegram.

Скинути 2 скрини?"""

out=[]
for r in rows:
    if not r.get('title') or r.get('err'): continue
    blob=(r.get('title','')+' '+r.get('desc','')).lower()
    if any(x in (r.get('title','')+r.get('desc','')) for x in DROP): continue
    RELEV=('тур','подорож','екскурс','похід','відпочинок','мандрів','круїз','рафтинг','карпат','резорт','віза')
    if not any(k in blob for k in RELEV): continue
    if any(k in blob for k in ('знайомств','новини','офіційно','bolt','робота','оренда')):
        continue
    last=r.get('last','') or ''
    if last < '2026-04': continue
    subs=num(r.get('subs'))
    if subs and subs<40: continue
    ad=''
    for m in r.get('mentions',[]):
        if m.lower()!=r['u'].lower(): ad=m; break
    out.append({'u':r['u'],'t':r['title'],'d':re.sub(r'\s+',' ',r.get('desc','')).strip(),
                's':subs,'l':last,'site':site_flag(r.get('links',[])),'ad':ad,'m':tmpl(r)})
out.sort(key=lambda x:(x['site']=='yes', -x['s']))
js="window.TG = [\n" + ",\n".join("  "+json.dumps(x,ensure_ascii=False) for x in out) + "\n];\n"
open('/Users/nm/Documents/deepseek-harness/default-workspace/demo-review/outreach-tours-tg/data.js','w',encoding='utf-8').write(js)
print('entries',len(out),'| no-site',sum(1 for x in out if x['site']=='no'),'| с админом',sum(1 for x in out if x['ad']))
for x in out: print(f"{x['u'][:22]:22}{x['s']:>7} {x['l'][:10]} site={x['site']:3} ad={x['ad'][:14]:14} {x['t'][:30]}")
