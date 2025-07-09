import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://onboarding-tasks-1ijc.onrender.com/api',
  withCredentials: true,
})
