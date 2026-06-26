import { env } from "@/config/env"
import axios from "axios"

const signalingApi = axios.create({
  baseURL: env.SIGNALING_API_URL,
  withCredentials: true, // important to send cookies
})

// Response interceptor to handle 401 globally
signalingApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error)
    if (error.response?.status === 401) {
      window.location.href = `/`
    }
    return Promise.reject(error)
  }
)

export default signalingApi
