import { create } from 'zustand'

const useAppStore = create((set, get) => ({
  // Subcontractors
  subcontractors: [],
  subcontractorsLoading: false,
  subcontractorsError: null,
  fetchSubcontractors: async () => {
    if (get().subcontractors.length > 0) return
    set({ subcontractorsLoading: true })
    try {
      const res = await fetch('/api/subcontractors')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      set({ subcontractors: data, subcontractorsLoading: false })
    } catch (err) {
      set({ subcontractorsLoading: false, subcontractorsError: err.message })
    }
  },

  // Supply Chain
  supplyChain: [],
  supplyChainLoading: false,
  supplyChainError: null,
  fetchSupplyChain: async () => {
    if (get().supplyChain.length > 0) return
    set({ supplyChainLoading: true })
    try {
      const res = await fetch('/api/supply-chain')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      set({ supplyChain: data, supplyChainLoading: false })
    } catch (err) {
      set({ supplyChainLoading: false, supplyChainError: err.message })
    }
  },

  // Risk Register
  riskRegister: [],
  riskRegisterLoading: false,
  riskRegisterError: null,
  fetchRiskRegister: async () => {
    if (get().riskRegister.length > 0) return
    set({ riskRegisterLoading: true })
    try {
      const res = await fetch('/api/risk-register')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      set({ riskRegister: data, riskRegisterLoading: false })
    } catch (err) {
      set({ riskRegisterLoading: false, riskRegisterError: err.message })
    }
  },

  // RFIs
  rfi: [],
  rfiLoading: false,
  rfiError: null,
  fetchRfi: async () => {
    if (get().rfi.length > 0) return
    set({ rfiLoading: true })
    try {
      const res = await fetch('/api/rfi')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      set({ rfi: data, rfiLoading: false })
    } catch (err) {
      set({ rfiLoading: false, rfiError: err.message })
    }
  },

  // Daily Logs
  dailyLogs: [],
  dailyLogsLoading: false,
  dailyLogsError: null,
  fetchDailyLogs: async () => {
    if (get().dailyLogs.length > 0) return
    set({ dailyLogsLoading: true })
    try {
      const res = await fetch('/api/daily-logs')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      set({ dailyLogs: data, dailyLogsLoading: false })
    } catch (err) {
      set({ dailyLogsLoading: false, dailyLogsError: err.message })
    }
  },

  // Site Photos
  sitePhotos: [],
  sitePhotosLoading: false,
  sitePhotosError: null,
  fetchSitePhotos: async () => {
    if (get().sitePhotos.length > 0) return
    set({ sitePhotosLoading: true })
    try {
      const res = await fetch('/api/site-photos')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      set({ sitePhotos: data, sitePhotosLoading: false })
    } catch (err) {
      set({ sitePhotosLoading: false, sitePhotosError: err.message })
    }
  },

  // Documents
  documents: [],
  documentsLoading: false,
  documentsError: null,
  fetchDocuments: async () => {
    if (get().documents.length > 0) return
    set({ documentsLoading: true })
    try {
      const res = await fetch('/api/documents')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      set({ documents: data, documentsLoading: false })
    } catch (err) {
      set({ documentsLoading: false, documentsError: err.message })
    }
  },
}))

export default useAppStore
