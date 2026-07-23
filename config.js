// Кира Sale — адрес бэкенда подбора помощи.
// Локально: http://localhost:8788
// Прод: адрес задеплоенного Sale-бэкенда (Railway/Render/VPS).
window.KIRA_CONFIG = {
  BACKEND_URL:
    location.hostname === "localhost" || location.hostname === "127.0.0.1"
      ? "http://localhost:8788"
      : "https://kira-sale-backend.up.railway.app",
  PRODUCT: "sale",
};
