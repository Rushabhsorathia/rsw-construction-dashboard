import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2, TrendingUp, TrendingDown, Clock, AlertTriangle,
  ArrowRight, BotMessageSquare, Shield, Users, Wallet, GitBranch, Loader2
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import useAppStore from '../store/appStore'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-orange-200 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-slate-800 text-xs font-semibold">{label}</p>
        <p className="text-orange-500 text-xs">{payload[0].value} projects</p>
      </div>
    )
  }
  return null
}

// Hardcoded AI Insights placeholder cards (no API for insights yet)
const placeholderInsights = [
  { id: 1, icon: '⚠️', title: 'Supply chain delays detected', message: 'Steel delivery for Meridian Water Phase 2 may be delayed by 2 weeks due to supplier issues.', action: 'Review supply chain' },
  { id: 2, icon: '📉', title: 'Budget variance alert', message: 'CPI for Chapel Riverside has dropped below 0.95 — cost overrun risk increasing.', action: 'View budget details' },
  { id: 3, icon: '👷', title: 'Resource shortage flagged', message: 'Bricklayer allocation across London sites is at 94% capacity. Consider rebalancing.', action: 'Manage resources' },
  { id: 4, icon: '📋', title: 'H&S compliance review', message: '3 sites have upcoming safety audits within the next 14 days that need preparation.', action: 'See health & safety' },
]

export default function Dashboard() {
  const projects = useAppStore(s => s.projects) || []
  const budget = useAppStore(s => s.budget) || []
  const projectsLoading = useAppStore(s => s.projectsLoading)
  const budgetLoading = useAppStore(s => s.budgetLoading)
  const projectsError = useAppStore(s => s.projectsError)
  const budgetError = useAppStore(s => s.budgetError)
  const fetchProjects = useAppStore(s => s.fetchProjects)
  const fetchBudget = useAppStore(s => s.fetchBudget)
  const fetchGanttTasks = useAppStore(s => s.fetchGanttTasks)

  useEffect(() => {
    fetchProjects()
    fetchBudget()
    fetchGanttTasks()
  }, [])

  // Derived stats
  const active = projects.length
  const atRisk = projects.filter(p => p.status === 'At Risk').length
  const delayed = projects.filter(p => p.status === 'Delayed').length
  const totalValue = projects.reduce((s, p) => s + (typeof p.value === 'string' ? parseFloat(p.value.replace(/[^0-9.]/g, '')) : (p.value || 0)), 0)

  const totalBudget = budget.reduce((s, b) => s + (parseFloat(b.budget) || 0), 0)
  const totalSpent = budget.reduce((s, b) => s + (parseFloat(b.spent) || 0), 0)
  const totalCommitted = budget.reduce((s, b) => s + (parseFloat(b.committed) || 0), 0)

  const avgSpi = projects.length > 0 ? (projects.reduce((s, p) => s + (p.spi || 0), 0) / projects.length).toFixed(2) : '—'
  const avgCpi = projects.length > 0 ? (projects.reduce((s, p) => s + (p.cpi || 0), 0) / projects.length).toFixed(2) : '—'

  // Loading / Error states
  if (projectsLoading || budgetLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-orange-500 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading dashboard data…</p>
        </div>
      </div>
    )
  }

  if (projectsError || budgetError) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle size={32} className="text-red-400 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Failed to load dashboard data</p>
          {projectsError && <p className="text-slate-400 text-xs mt-1">{projectsError}</p>}
          {budgetError && <p className="text-slate-400 text-xs mt-1">{budgetError}</p>}
          <button
            onClick={() => { fetchProjects(); fetchBudget() }}
            className="mt-3 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">UK Construction Portfolio Overview</p>
        </div>
        <Link to="/ai-assistant" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
          <BotMessageSquare size={16} />
          Ask AI
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Active Projects', value: active, icon: Building2, color: 'text-orange-500', bg: 'bg-orange-50', change: `Across portfolio` },
          { label: 'Total Portfolio Value', value: `£${totalValue.toFixed(1)}M`, icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50', change: `${projects.length} projects` },
          { label: 'Projects At Risk', value: atRisk, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', change: `${delayed} also delayed` },
          { label: 'Avg Schedule Perf.', value: avgSpi, icon: TrendingUp, color: Number(avgSpi) >= 1 ? 'text-emerald-500' : 'text-amber-500', bg: Number(avgSpi) >= 1 ? 'bg-emerald-50' : 'bg-amber-50', change: Number(avgSpi) >= 1 ? 'On schedule' : 'Behind schedule' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-xs uppercase tracking-wide">{s.label}</p>
              <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center`}>
                <s.icon size={15} className={s.color} />
              </div>
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs mt-1 text-slate-400">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Projects by Health */}
        <div className="col-span-2 bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-semibold">Project Health Overview</h3>
            <Link to="/projects" className="text-orange-500 hover:text-orange-600 text-xs font-medium flex items-center gap-1">View all <ArrowRight size={12} /></Link>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={[
              { name: 'On Track', count: projects.filter(p => p.health === 'green').length },
              { name: 'At Risk', count: projects.filter(p => p.health === 'orange').length },
              { name: 'Delayed', count: projects.filter(p => p.health === 'red').length },
            ]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(249,115,22,0.08)' }} />
              <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Summary */}
        <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-semibold text-sm">Budget Summary</h3>
            <Link to="/budget" className="text-orange-500 hover:text-orange-600 text-xs flex items-center gap-1">More <ArrowRight size={12} /></Link>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Total Budget', value: totalBudget, color: 'text-slate-800', pct: 100 },
              { label: 'Committed', value: totalCommitted, color: 'text-blue-500', pct: totalBudget > 0 ? (totalCommitted / totalBudget) * 100 : 0 },
              { label: 'Spent', value: totalSpent, color: 'text-orange-500', pct: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0 },
            ].map(b => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">{b.label}</span>
                  <span className={b.color}>£{b.value.toFixed(1)}M</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${b.label === 'Total Budget' ? 'bg-slate-400' : b.label === 'Committed' ? 'bg-blue-400' : 'bg-orange-500'}`} style={{ width: `${Math.min(b.pct, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Remaining</span>
              <span className="text-emerald-600 font-semibold">£{(totalBudget - totalSpent).toFixed(1)}M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Active Projects */}
        <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-semibold flex items-center gap-2">
              <Building2 size={16} className="text-orange-500" />
              Active Projects
            </h3>
            <Link to="/projects" className="text-orange-500 hover:text-orange-600 text-xs font-medium flex items-center gap-1">All <ArrowRight size={12} /></Link>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 4).map(p => (
              <Link key={p.id} to={`/projects/${p.id}`} className="flex items-center justify-between p-3 bg-orange-50/50 hover:bg-orange-50 rounded-lg transition-colors border border-orange-100">
                <div>
                  <p className="text-slate-800 text-sm font-semibold">{p.name?.split(' — ')[0]}</p>
                  <p className="text-slate-500 text-xs">{p.client}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    p.status === 'On Track' ? 'bg-emerald-100 text-emerald-700' :
                    p.status === 'At Risk' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>{p.status}</span>
                  <p className="text-slate-400 text-[10px] mt-0.5">{p.progress}% complete</p>
                </div>
              </Link>
            ))}
            {projects.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-4">No projects loaded yet</p>
            )}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-semibold flex items-center gap-2">
              <BotMessageSquare size={16} className="text-orange-500" />
              AI Insights
            </h3>
            <Link to="/ai-assistant" className="text-orange-500 hover:text-orange-600 text-xs font-medium flex items-center gap-1">AI Chat <ArrowRight size={12} /></Link>
          </div>
          <div className="space-y-3">
            {placeholderInsights.map(i => (
              <div key={i.id} className="p-3 bg-red-50/60 rounded-lg border border-red-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{i.icon}</span>
                  <p className="text-slate-800 text-xs font-bold">{i.title}</p>
                  <span className="ml-auto px-1.5 py-0.5 bg-orange-500 text-white text-[9px] rounded font-bold">ACTION</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{i.message}</p>
                <button className="mt-1.5 text-orange-500 hover:text-orange-600 text-[11px] font-semibold">{i.action} →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
