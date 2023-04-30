import { watchEffect } from 'vue'
import { axiosInstance } from '../../utils/axios'
import { useMainStore } from '../stores/main'

export default function useApi() {
  const mainStore = useMainStore()

  watchEffect(() => {
    axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${mainStore.accessToken}`
        }
        return config
      },

      (error) => Promise.reject(error)
    )

    axiosInstance.interceptors.response.use(
      (response) => response,

      async (error) => {
        const prevRequest = error?.config

        if (
          (error?.response?.status === 403 || error?.response?.status === 401) &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true
          await mainStore.refreshTokens()

          prevRequest.headers['Authorization'] = mainStore.accessToken

          return axiosInstance(prevRequest)
        }
        return Promise.reject(error)
      }
    )
  })

  return axiosInstance
}
