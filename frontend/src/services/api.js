// Base URL must be origin + /api only (e.g. .../api). Normalize so /api/menu doesn't become .../api/menu/menu
const rawBase =
  process.env.REACT_APP_API_URL || "https://restuarent-6gcf.onrender.com/api";
const API_BASE_URL = rawBase.replace(/\/$/, "").replace(/\/menu\/?$/, "");

const request = async (url, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

export default request;
