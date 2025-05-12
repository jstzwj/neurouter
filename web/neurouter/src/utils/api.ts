import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  login: (email: string, password: string) => api.post("/auth/login", { email, password }),
  register: (email: string, password: string) => api.post("/auth/register", { email, password }),
  getProfile: () => api.get("/auth/profile"),
}

// Models API
export const modelsAPI = {
  getModels: () => api.get("/models"),
  getModel: (id: string) => api.get(`/models/${id}`),
  getFeaturedModels: () => api.get("/models/featured"),
}

// Providers API
export const providersAPI = {
  getProviders: () => api.get("/providers"),
  getProvider: (id: string) => api.get(`/providers/${id}`),
}

// Datasets API
export const datasetsAPI = {
  getDatasets: () => api.get("/datasets"),
  getDataset: (id: string) => api.get(`/datasets/${id}`),
}

// Rankings API
export const rankingsAPI = {
  getRankings: () => api.get("/rankings"),
}

// Chat API
export const chatAPI = {
  sendMessage: (message: string, modelId: string) => api.post("/chat", { message, modelId }),
}

// Admin API
export const adminAPI = {
  getStats: () => api.get("/admin/stats"),
  getUsers: () => api.get("/admin/users"),
}

export default api
