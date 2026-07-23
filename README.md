# Кира Sale — фронтенд (подбор помощи)

Веб-версия подбора помощи: тот же визуал, что у `Kira_web_frontend`, но **только режим «Подбор помощи»** (как Telegram-Кира). Мультиязычность: RU / EN / UK / PL / ES.

## Файлы
- `index.html` — лендинг + чат (RU entry / тело страницы)
- `en/`, `uk/`, `pl/`, `es/` — языковые URL для превью при пересылке
- `share-meta.json` — title / description / картинка OG по языкам
- `promo-{lang}.jpg` — картинки превью (сейчас плейсхолдеры = `promo.jpg`)
- `styles.css`, `app.js`, `config.js`

## Превью при пересылке (OG)
Мессенджеры не выполняют JS — поэтому у каждого языка свой URL:

| Язык | Ссылка | Картинка |
|------|--------|----------|
| RU | https://kira-ai.online/ | `promo-ru.jpg` |
| EN | https://kira-ai.online/en/ | `promo-en.jpg` |
| UK | https://kira-ai.online/uk/ | `promo-uk.jpg` |
| PL | https://kira-ai.online/pl/ | `promo-pl.jpg` |
| ES | https://kira-ai.online/es/ | `promo-es.jpg` |

Чтобы сменить текст/картинку превью: правь `share-meta.json` и/или замени `promo-{lang}.jpg`, затем:
```bash
node build-lang-pages.mjs
```

Смена языка в меню ведёт на соответствующий URL — копируешь адрес из браузера и шаришь уже с нужным превью.

## Настройка
В `config.js`:
```js
BACKEND_URL: "https://твой-sale-бэкенд.up.railway.app"
```
Локально автоматически: `http://localhost:8788`.

## Локальный запуск
```bash
cd Kira_web_sale_frontend
python -m http.server 5501
# http://localhost:5501
# http://localhost:5501/en/
```

Отдельно подними `Kira_web_sale_backend` на порту 8788.
