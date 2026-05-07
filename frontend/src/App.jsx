import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
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

export default function App() {
  return (
    <BrowserRouter>
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
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
