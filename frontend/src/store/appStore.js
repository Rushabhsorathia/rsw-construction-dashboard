import { create } from 'zustand'
import api from '../lib/axios'

const useAppStore = create((set, get) => ({
  // Sidebar
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  // ── Projects ──
  projects: [],
  projectsLoading: false,
  projectsError: null,
  fetchProjects: async () => {
    set({ projectsLoading: true, projectsError: null })
    try {
      const { data } = await api.get('/api/projects')
      set({ projects: data.data || data, projectsLoading: false })
    } catch (err) {
      set({ projectsError: err?.response?.data?.message || err?.message || 'Failed', projectsLoading: false })
    }
  },

  // ── Single Project ──
  currentProject: null,
  currentProjectLoading: false,
  fetchProjectById: async (id) => {
    set({ currentProjectLoading: true })
    try {
      const { data } = await api.get(`/api/projects/${id}`)
      set({ currentProject: data.data || data, currentProjectLoading: false })
    } catch {
      set({ currentProjectLoading: false })
    }
  },

  // ── Budget ──
  budget: [],
  budgetLoading: false,
  budgetError: null,
  fetchBudget: async () => {
    set({ budgetLoading: true, budgetError: null })
    try {
      const { data } = await api.get('/api/budget')
      set({ budget: data.data || data, budgetLoading: false })
    } catch (err) {
      set({ budgetError: err?.response?.data?.message || err?.message || 'Failed', budgetLoading: false })
    }
  },

  // ── Resources ──
  resources: [],
  resourcesLoading: false,
  resourcesError: null,
  fetchResources: async () => {
    set({ resourcesLoading: true, resourcesError: null })
    try {
      const { data } = await api.get('/api/resources')
      set({ resources: data.data || data, resourcesLoading: false })
    } catch (err) {
      set({ resourcesError: err?.response?.data?.message || err?.message || 'Failed', resourcesLoading: false })
    }
  },

  // ── Health & Safety ──
  healthSafety: [],
  healthSafetyLoading: false,
  healthSafetyError: null,
  fetchHealthSafety: async () => {
    set({ healthSafetyLoading: true, healthSafetyError: null })
    try {
      const { data } = await api.get('/api/health-safety')
      set({ healthSafety: data.data || data, healthSafetyLoading: false })
    } catch (err) {
      set({ healthSafetyError: err?.response?.data?.message || err?.message || 'Failed', healthSafetyLoading: false })
    }
  },

  // ── Subcontractors ──
  subcontractors: [],
  subcontractorsLoading: false,
  subcontractorsError: null,
  fetchSubcontractors: async () => {
    set({ subcontractorsLoading: true, subcontractorsError: null })
    try {
      const { data } = await api.get('/api/subcontractors')
      set({ subcontractors: data.data || data, subcontractorsLoading: false })
    } catch (err) {
      set({ subcontractorsError: err?.response?.data?.message || err?.message || 'Failed', subcontractorsLoading: false })
    }
  },

  // ── Supply Chain ──
  supplyChain: [],
  supplyChainLoading: false,
  supplyChainError: null,
  fetchSupplyChain: async () => {
    set({ supplyChainLoading: true, supplyChainError: null })
    try {
      const { data } = await api.get('/api/supply-chain')
      set({ supplyChain: data.data || data, supplyChainLoading: false })
    } catch (err) {
      set({ supplyChainError: err?.response?.data?.message || err?.message || 'Failed', supplyChainLoading: false })
    }
  },

  // ── Risk Register ──
  riskRegister: [],
  riskRegisterLoading: false,
  riskRegisterError: null,
  fetchRiskRegister: async () => {
    set({ riskRegisterLoading: true, riskRegisterError: null })
    try {
      const { data } = await api.get('/api/risk-register')
      set({ riskRegister: data.data || data, riskRegisterLoading: false })
    } catch (err) {
      set({ riskRegisterError: err?.response?.data?.message || err?.message || 'Failed', riskRegisterLoading: false })
    }
  },

  // ── RFI ──
  rfi: [],
  rfiLoading: false,
  rfiError: null,
  fetchRfi: async () => {
    set({ rfiLoading: true, rfiError: null })
    try {
      const { data } = await api.get('/api/rfi')
      set({ rfi: data.data || data, rfiLoading: false })
    } catch (err) {
      set({ rfiError: err?.response?.data?.message || err?.message || 'Failed', rfiLoading: false })
    }
  },

  // ── Daily Logs ──
  dailyLogs: [],
  dailyLogsLoading: false,
  dailyLogsError: null,
  fetchDailyLogs: async () => {
    set({ dailyLogsLoading: true, dailyLogsError: null })
    try {
      const { data } = await api.get('/api/daily-logs')
      set({ dailyLogs: data.data || data, dailyLogsLoading: false })
    } catch (err) {
      set({ dailyLogsError: err?.response?.data?.message || err?.message || 'Failed', dailyLogsLoading: false })
    }
  },

  // ── Site Photos ──
  sitePhotos: [],
  sitePhotosLoading: false,
  sitePhotosError: null,
  fetchSitePhotos: async () => {
    set({ sitePhotosLoading: true, sitePhotosError: null })
    try {
      const { data } = await api.get('/api/site-photos')
      set({ sitePhotos: data.data || data, sitePhotosLoading: false })
    } catch (err) {
      set({ sitePhotosError: err?.response?.data?.message || err?.message || 'Failed', sitePhotosLoading: false })
    }
  },

  // ── Documents ──
  documents: [],
  documentsLoading: false,
  documentsError: null,
  fetchDocuments: async () => {
    set({ documentsLoading: true, documentsError: null })
    try {
      const { data } = await api.get('/api/documents')
      set({ documents: data.data || data, documentsLoading: false })
    } catch (err) {
      set({ documentsError: err?.response?.data?.message || err?.message || 'Failed', documentsLoading: false })
    }
  },

  // ── Gantt Tasks ──
  ganttTasks: [],
  ganttTasksLoading: false,
  ganttTasksError: null,
  fetchGanttTasks: async () => {
    set({ ganttTasksLoading: true, ganttTasksError: null })
    try {
      const { data } = await api.get('/api/gantt-tasks')
      set({ ganttTasks: data.data || data, ganttTasksLoading: false })
    } catch (err) {
      set({ ganttTasksError: err?.response?.data?.message || err?.message || 'Failed', ganttTasksLoading: false })
    }
  },

  // ── AI Chat ──
  aiMessages: [],
  aiLoading: false,
  sendAiChat: async (message, context = {}) => {
    const messages = [...get().aiMessages, { role: 'user', content: message }]
    set({ aiMessages: messages, aiLoading: true })
    try {
      const { data } = await api.post('/api/ai/chat', { message, ...context })
      const reply = data.data?.response || data.response || 'No response.'
      set({ aiMessages: [...messages, { role: 'assistant', content: reply }], aiLoading: false })
    } catch {
      set({ aiMessages: [...messages, { role: 'assistant', content: 'Error: Could not get response.' }], aiLoading: false })
    }
  },
  clearAiMessages: () => set({ aiMessages: [] }),
}))

export default useAppStore
