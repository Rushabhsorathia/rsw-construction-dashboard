import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Gantt from './pages/Gantt'
import Budget from './pages/Budget'
import Resources from './pages/Resources'
import HealthSafety from './pages/HealthSafety'
import Subcontractors from './pages/Subcontractors'
import SupplyChain from './pages/SupplyChain'
import RiskRegister from './pages/RiskRegister'
import SitePhotos from './pages/SitePhotos'
import RFITracker from './pages/RFITracker'
import DailyLogs from './pages/DailyLogs'
import Documents from './pages/Documents'
import AIAssistant from './pages/AIAssistant'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155',
          },
        }}
      />
      <Routes>
        {/* Public routes (no layout) */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected routes (with layout) */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/gantt" element={<Gantt />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/health-safety" element={<HealthSafety />} />
                  <Route path="/subcontractors" element={<Subcontractors />} />
                  <Route path="/supply-chain" element={<SupplyChain />} />
                  <Route path="/risk-register" element={<RiskRegister />} />
                  <Route path="/rfi-tracker" element={<RFITracker />} />
                  <Route path="/daily-logs" element={<DailyLogs />} />
                  <Route path="/site-photos" element={<SitePhotos />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
