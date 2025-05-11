import axios from "axios"

// 创建 axios 实例
const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 未授权，清除 token 并重定向到登录页
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// 模拟 API 调用
export const login = async (data: { email: string; password: string }) => {
  // 在实际项目中，这里会调用后端 API
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem("token", "mock-jwt-token")
      resolve({ success: true })
    }, 1000)
  })
}

export const register = async (data: { name: string; email: string; password: string }) => {
  // 在实际项目中，这里会调用后端 API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 1000)
  })
}

export const getModels = async () => {
  // 在实际项目中，这里会调用后端 API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Claude 3.5 Sonnet",
          provider: "Anthropic",
          tokens: "262.0B",
          latency: "1.6s",
          growth: "-8.98%",
        },
        // 更多模型...
      ])
    }, 1000)
  })
}

export const sendMessage = async (modelId: string, message: string) => {
  // 在实际项目中，这里会调用后端 API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        content: `这是来自模型 ${modelId} 的回复: ${message}`,
        timestamp: new Date(),
      })
    }, 1000)
  })
}

export default api
