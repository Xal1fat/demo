import re, json, time, urllib.parse, urllib.request, html
UA={'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36'}
QUERIES=["тури","авторські тури","подорожі","екскурсії","карпати","ісландія","туроператор","походи","групові тури"]
BAD={'lyzembot','lyzemcom','editorpost_bot','mlyzembot','discovery_ny','telegram','joinchat','s'}
def get(u,t=20):
    return urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=t).read().decode('utf-8','ignore')
found={}
for q in QUERIES:
    try: h=get("https://lyzem.com/search?q=%s&type=channels"%urllib.parse.quote(q))
    except Exception as e: print('ERR',q,e); continue
    for m in re.findall(r't\.me/([A-Za-z0-9_]{4,})',h):
        if m.lower() in BAD: continue
        found.setdefault(m,set()).add(q)
    time.sleep(1.0)
print('discovered',len(found),flush=True)
def strip(s): return re.sub(r'\s+',' ',re.sub(r'<[^>]+>','',s)).strip()
def parse(u):
    d={'u':u}
    try: h=get(f"https://t.me/s/{u}")
    except Exception as e: d['err']=str(e)[:50]; return d
    if 'tgme_channel_info' not in h: d['err']='no channel'; return d
    m=re.search(r'tgme_channel_info_header_title"[^>]*>\s*<span dir="auto">(.*?)</span>',h,re.S)
    d['title']=html.unescape(strip(m.group(1))) if m else u
    m=re.search(r'<div class="tgme_channel_info_description">(.*?)</div>',h,re.S)
    dh=m.group(1) if m else ''
    d['desc']=html.unescape(strip(dh.replace('<br/>','\n').replace('<br>','\n')))
    d['links']=list(dict.fromkeys(re.findall(r'href="(https?://[^"]+)"',dh)))
    d['mentions']=list(dict.fromkeys(re.findall(r'(?<![\w/])@([A-Za-z0-9_]{4,})',d['desc'])))
    s=re.search(r'tgme_channel_info_counter"><span class="counter_value">([\d\s.,KkMm\u00a0]+)</span> <span class="counter_type">subscribers',h)
    d['subs']=s.group(1).replace('\u00a0',' ').strip() if s else ''
    t=re.findall(r'<time datetime="([^"]+)"',h); d['last']=t[-1] if t else ''
    d['cmt']=h.count('tgme_widget_message_comments')
    posts=re.findall(r'<div class="tgme_widget_message_text[^"]*"[^>]*>(.*?)</div>',h,re.S)
    d['last_post']=html.unescape(strip(posts[-1]))[:220] if posts else ''
    d['n_posts']=len(posts)
    d['queries']=sorted(found[u])
    return d
rows=[]
for u in list(found):
    rows.append(parse(u)); time.sleep(0.45)
json.dump(rows,open('channels.json','w'),ensure_ascii=False,indent=1)
print('done',len(rows),flush=True)
