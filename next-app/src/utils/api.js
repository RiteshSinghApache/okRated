import axios from "axios";
const apiURL= process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});

// Add token to Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: refresh token logic on 401/403
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh-token");
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh failed", err);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
