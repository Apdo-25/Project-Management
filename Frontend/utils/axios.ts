import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URI, // Replace with your backend API endpoint
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
