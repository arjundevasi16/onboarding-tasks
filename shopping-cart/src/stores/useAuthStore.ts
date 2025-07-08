import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/services/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<any>(null)

  const setToken = (accessToken: string) => {
    token.value = accessToken
    localStorage.setItem('token', accessToken)
  }

  const signup = async (payload: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => {
    try {
      const res = await api.post('/signup', payload)
      return res.data
    } catch (err) {
      console.error('❌ Signup failed:', err)
      throw err
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/login', { email, password })
      setToken(res.data.accessToken)
      user.value = res.data.user || null
      return res.data
    } catch (err) {
      console.error('❌ Login failed:', err)
      throw err
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  return {
    token,
    user,
    signup,
    login,
    logout,
    setToken,
  }
})
