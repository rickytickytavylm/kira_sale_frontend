// Кира Sale — адрес бэкенда подбора помощи.
// Локально: http://localhost:8788
// Прод (через RU-прокси): https://api.kira-ai.online → VPS → Railway
window.KIRA_CONFIG = {
  BACKEND_URL:
    location.hostname === "localhost" || location.hostname === "127.0.0.1"
      ? "http://localhost:8788"
      : "https://api.kira-ai.online",
  PRODUCT: "sale",
};
