# DR.one — 4 demo concepts

Four standalone landing-page concepts for the DR.one interior design & turnkey renovation studio. Built from the public Instagram content of [@design.remont.one](https://www.instagram.com/design.remont.one/).

## Pages

- `/` — concept selector
- `/v1/` — **Тиха архітектура** — warm editorial minimalism, Lora + Manrope
- `/v2/` — **After Dark** — cinematic dark, Unbounded + Manrope
- `/v3/` — **Світла галерея** — light gallery minimalism, Manrope only
- `/v4/` — **Контраст** — editorial burgundy, Playfair Display + Manrope

## Local run

From this folder:

```powershell
python -m http.server 4174
```

Open <http://localhost:4174>.

## What works

- Responsive mobile menu on every concept
- “Обговорити проєкт” modal with name, phone, project type, area and consent
- Phone mask and validation
- Demo success state with generated request number
- Project cards prefill the request with the selected project
- Concept switcher on each page
- Responsive at 360–1440+ px, no horizontal scrolling

The forms are front-end simulations. For production they need a real endpoint, Telegram bot or CRM integration.

## Content / photo note

All photos are from DR.one’s public Instagram and are used as demo placeholders. For a final site, use the original files without Instagram compression and watermarks, and confirm publication rights with the studio.
