# Кира Sale — фронтенд

Веб-версия подбора помощи: лендинг → онбординг → чат. Сейчас RU-only.

## Файлы
- `index.html` — лендинг + чат
- `en/`, `uk/`, `pl/`, `es/` — OG-шеллы с редиректом на `/`
- `share-meta.json` — title / description / картинка OG
- `legal.js` — юридические документы
- `styles.css`, `app.js`, `config.js`

## Настройка
В `config.js`:
```js
BACKEND_URL: "https://api.kira-ai.online"
```
Локально автоматически: `http://localhost:8788`.

Админка: https://api.kira-ai.online/admin

## Локальный запуск
```bash
cd Kira_web_sale_frontend
python -m http.server 5501
# http://localhost:5501
```

Отдельно подними `Kira_web_sale_backend` на порту 8788.
