// Кира Sale — адрес бэкенда подбора помощи.
// Локально: http://localhost:8788
// Прод: https://api.kira-ai.online → Timeweb Apps
// Админка: https://api.kira-ai.online/admin
window.KIRA_CONFIG = {
  BACKEND_URL:
    location.hostname === "localhost" || location.hostname === "127.0.0.1"
      ? "http://localhost:8788"
      : "https://api.kira-ai.online",
  PRODUCT: "sale",
};
