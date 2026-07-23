# Кира Sale — фронтенд (подбор помощи)

Веб-версия подбора помощи: тот же визуал, что у `Kira_web_frontend`, но **только режим «Подбор помощи»** (как Telegram-Кира). Мультиязычность: RU / EN / UK / PL / ES.

## Файлы
- `index.html` — лендинг + чат
- `styles.css` — стили (как у веб-Киры)
- `app.js` — онбординг, чат, SSE, i18n
- `config.js` — адрес Sale-бэкенда

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
```

Отдельно подними `Kira_web_sale_backend` на порту 8788.
