import axios from "axios";

const api = axios.create({
  baseUrl: "http://localhost:5000",
  headers: {},
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    }
    return Promise.reject(new Error("No token"));
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
