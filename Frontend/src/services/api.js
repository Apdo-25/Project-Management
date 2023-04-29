import { axiosInstance } from '../../utils/axios'
import { useMainStore } from '../stores/main'

export default function useApi() {
  const mainStore = useMainStore()

  axiosInstance.interceptors.request.use(
    (config) => {
      return config
    },

    (error) => Promise.reject(error)
  )

  axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
      return Promise.reject(error)
    }
  )

  return axiosInstance
}
