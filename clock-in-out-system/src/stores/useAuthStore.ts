import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)

    const setToken = (tokenValue: string) => {
      token.value = tokenValue
    }

    const login = async (payload: { email: string; password: string }) => {
      try {
        const response = await api.post('/auth/login', payload)
        const accessToken = response.data.data.token
        if (accessToken) {
          setToken(accessToken)
        } else {
          throw new Error('No token returned from API')
        }
      } catch (error: any) {
        console.error('Login error:', error)
        throw error.response?.data || error
      }
    }

    return {
      token,
      setToken,
      login,
    }
  },
  {
    persist: true,
  },
)
