import { create } from 'zustand'
import api from '../lib/axios'

const getToken = () => localStorage.getItem('rsw_token')
const getUser = () => {
  try { return JSON.parse(localStorage.getItem('rsw_user')) } catch { return null }
}

const useAuthStore = create((set, get) => ({
  user: getUser(),
  token: getToken(),
  isAuthenticated: !!getToken(),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      const { user, token } = data.data || data
      localStorage.setItem('rsw_token', token)
      localStorage.setItem('rsw_user', JSON.stringify(user))
      set({ user, token, isAuthenticated: true, loading: false, error: null })
      return { success: true }
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Login failed.'
      set({ loading: false, error: message })
      return { success: false, error: message }
    }
  },

  logout: async () => {
    try {
      await api.post('/api/auth/logout')
    } catch { /* ignore */ }
    localStorage.removeItem('rsw_token')
    localStorage.removeItem('rsw_user')
    set({ user: null, token: null, isAuthenticated: false, error: null })
  },

  setUser: (user) => {
    localStorage.setItem('rsw_user', JSON.stringify(user))
    set({ user })
  },

  fetchCurrentUser: async () => {
    try {
      const { data } = await api.get('/api/auth/me')
      const user = data.data || data
      localStorage.setItem('rsw_user', JSON.stringify(user))
      set({ user })
      return user
    } catch (err) {
      if (err?.response?.status === 401) get().logout()
      throw err
    }
  },

  updateProfile: async (profileData) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.put('/api/auth/profile', profileData)
      const user = data.data || data
      get().setUser(user)
      set({ loading: false })
      return { success: true, user }
    } catch (err) {
      const message = err?.response?.data?.message || 'Profile update failed.'
      set({ loading: false, error: message })
      return { success: false, error: message }
    }
  },

  changePassword: async (passwordData) => {
    set({ loading: true, error: null })
    try {
      await api.put('/api/auth/password', passwordData)
      set({ loading: false })
      return { success: true }
    } catch (err) {
      const message = err?.response?.data?.message || 'Password change failed.'
      set({ loading: false, error: message })
      return { success: false, error: message }
    }
  },

  clearError: () => set({ error: null }),
}))

export default useAuthStore
