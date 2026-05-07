import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Building2, ArrowLeft, MapPin, User, Calendar, TrendingUp, TrendingDown,
  Clock, Wallet, GitBranch, Users, ShieldCheck, FileText, BotMessageSquare, Loader2, AlertTriangle
} from 'lucide-react'
import useAppStore from '../store/appStore'

export default function ProjectDetail() {
  const { id } = useParams()
  const [tab, setTab] = useState('overview')

  const currentProject = useAppStore(s => s.currentProject)
  const currentProjectLoading = useAppStore(s => s.currentProjectLoading)
  const budget = useAppStore(s => s.budget)
  const resources = useAppStore(s => s.resources)
  const ganttTasks = useAppStore(s => s.ganttTasks)
  const fetchProjectById = useAppStore(s => s.fetchProjectById)
  const fetchBudget = useAppStore(s => s.fetchBudget)
  const fetchResources = useAppStore(s => s.fetchResources)
  const fetchGanttTasks = useAppStore(s => s.fetchGanttTasks)

  useEffect(() => {
    fetchProjectById(id)
    fetchBudget()
    fetchResources()
    fetchGanttTasks()
  }, [id])

  if (currentProjectLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-orange-500 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading project details…</p>
        </div>
      </div>
    )
  }

  if (!currentProject) return (
    <div className="text-center py-20">
      <AlertTriangle size={32} className="mx-auto text-slate-300 mb-3" />
      <p className="text-slate-500">Project not found.</p>
      <Link to="/projects" className="text-orange-500 text-sm font-semibold mt-2 inline-block">← Back to Projects</Link>
    </div>
  )

  const project = currentProject

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'programme', label: 'Programme' },
    { key: 'budget', label: 'Budget' },
    { key: 'team', label: 'Team' },
  ]

  const statusColors = {
    'On Track': 'bg-emerald-100 text-emerald-700',
    'At Risk': 'bg-amber-100 text-amber-700',
    'Delayed': 'bg-red-100 text-red-700',
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm transition-colors">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow">
              <Building2 size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-slate-800 text-xl font-bold">{project.name}</h1>
              <p className="text-slate-500 text-sm mt-0.5">{project.client}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[project.status] || 'bg-slate-100 text-slate-700'}`}>{project.status}</span>
                <span className="flex items-center gap-1 text-slate-400 text-xs"><MapPin size={12} /> {project.location}</span>
                <span className="flex items-center gap-1 text-slate-400 text-xs"><Calendar size={12} /> {project.startDate} — {project.endDate}</span>
              </div>
            </div>
          </div>
          <Link to="/ai-assistant" className="flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg text-orange-600 text-xs font-semibold hover:bg-orange-100 transition-colors">
            <BotMessageSquare size={14} /> Ask AI
          </Link>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-5 gap-4 mt-5 pt-5 border-t border-slate-100">
          {[
            { label: 'Project Value', value: project.value, icon: Wallet },
            { label: 'Progress', value: `${project.progress}%`, icon: GitBranch },
            { label: 'Days Remaining', value: project.daysLeft, icon: Clock },
            { label: 'Schedule (SPI)', value: project.spi, icon: project.spi >= 1 ? TrendingUp : TrendingDown, color: project.spi >= 1 ? 'text-emerald-600' : 'text-amber-600' },
            { label: 'Cost (CPI)', value: project.cpi, icon: project.cpi >= 1 ? TrendingUp : TrendingDown, color: project.cpi >= 1 ? 'text-emerald-600' : 'text-amber-600' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-slate-400 text-[10px] uppercase tracking-wide mb-1">{s.label}</p>
              <div className="flex items-center justify-center gap-1">
                <s.icon size={14} className={s.color || 'text-slate-600'} />
                <p className={`text-lg font-bold ${s.color || 'text-slate-800'}`}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${
              project.health === 'green' ? 'bg-emerald-500' : project.health === 'orange' ? 'bg-amber-500' : 'bg-red-500'
            }`} style={{ width: `${project.progress}%` }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-1">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key ? 'text-orange-600 border-orange-500' : 'text-slate-500 border-transparent hover:text-slate-700'
              }`}>
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {tab === 'overview' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5">
            <h3 className="text-slate-800 font-semibold mb-4">Budget Overview</h3>
            <div className="space-y-3">
              {budget.map(b => (
                <div key={b.category}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{b.category}</span>
                    <span className="text-slate-500">£{b.spent}M / £{b.budget}M</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(b.spent / b.budget) * 100}%` }} />
                  </div>
                </div>
              ))}
              {budget.length === 0 && <p className="text-slate-400 text-sm text-center py-4">No budget data</p>}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5">
            <h3 className="text-slate-800 font-semibold mb-4">Key Resources</h3>
            <div className="space-y-3">
              {resources.slice(0, 6).map(r => (
                <div key={r.trade} className="flex items-center justify-between">
                  <span className="text-slate-700 text-sm">{r.trade}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs">{r.allocated} allocated</span>
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${r.pct >= 90 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                </div>
              ))}
              {resources.length === 0 && <p className="text-slate-400 text-sm text-center py-4">No resource data</p>}
            </div>
          </div>
        </div>
      )}

      {tab === 'programme' && (
        <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5">
          <h3 className="text-slate-800 font-semibold mb-4">Programme — {project.name}</h3>
          <div className="flex gap-2 mb-4">
            {['W1', 'W5', 'W9', 'W13', 'W17', 'W21', 'W25'].map((w, i) => (
              <div key={w} className="flex-1 text-center text-slate-400 text-xs border-l border-slate-200 pl-1">{w}</div>
            ))}
          </div>
          <div className="space-y-2">
            {ganttTasks.map(t => (
              <div key={t.name} className="flex items-center gap-2 mb-1">
                <div className="w-48 text-slate-600 text-xs truncate">{t.name}</div>
                <div className="flex-1 h-5 bg-slate-100 rounded relative">
                  <div className={`absolute h-full rounded ${
                    t.complete === 100 ? 'bg-emerald-500' : t.complete > 50 ? 'bg-blue-500' : t.complete > 0 ? 'bg-blue-400' : 'bg-slate-300'
                  }`} style={{ left: `${(t.start / 26) * 100}%`, width: `${((t.end - t.start) / 26) * 100}%` }} />
                </div>
                <div className="w-12 text-right">
                  <span className={`text-xs font-semibold ${t.complete === 100 ? 'text-emerald-600' : 'text-slate-500'}`}>{t.complete}%</span>
                </div>
              </div>
            ))}
            {ganttTasks.length === 0 && <p className="text-slate-400 text-sm text-center py-4">No programme data</p>}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <div><p className="text-slate-400 text-xs">SPI</p><p className="text-slate-800 font-bold text-lg">{project.spi}</p></div>
            <div><p className="text-slate-400 text-xs">CPI</p><p className="text-slate-800 font-bold text-lg">{project.cpi}</p></div>
            <div><p className="text-slate-400 text-xs">Start</p><p className="text-slate-800 font-bold text-lg">{project.startDate}</p></div>
            <div><p className="text-slate-400 text-xs">End</p><p className="text-slate-800 font-bold text-lg">{project.endDate}</p></div>
          </div>
        </div>
      )}

      {tab === 'budget' && (
        <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5">
          <h3 className="text-slate-800 font-semibold mb-4">Cost Breakdown</h3>
          <div className="space-y-4">
            {budget.map(b => (
              <div key={b.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-700 text-sm font-medium">{b.category}</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-slate-400">Spent: <span className="text-orange-500 font-semibold">£{b.spent}M</span></span>
                    <span className="text-slate-400">Committed: <span className="text-blue-500 font-semibold">£{b.committed}M</span></span>
                    <span className="text-slate-400">Budget: <span className="text-slate-700 font-semibold">£{b.budget}M</span></span>
                  </div>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-orange-500 h-full" style={{ width: `${(b.spent / b.budget) * 100}%` }} />
                  <div className="bg-blue-400/60 h-full" style={{ width: `${((b.committed - b.spent) / b.budget) * 100}%` }} />
                  <div className="bg-slate-200 h-full flex-1" />
                </div>
              </div>
            ))}
            {budget.length === 0 && <p className="text-slate-400 text-sm text-center py-4">No budget data</p>}
          </div>
          <div className="mt-4 flex gap-4 text-xs text-slate-400 pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded" /> Spent</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-400/60 rounded" /> Committed</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-200 rounded" /> Remaining</span>
          </div>
        </div>
      )}

      {tab === 'team' && (
        <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5">
          <h3 className="text-slate-800 font-semibold mb-4">Project Team</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Tom Mitchell', role: 'Project Manager', firm: 'Hartwell Developments' },
              { name: 'Sarah Collins', role: 'Site Manager', firm: 'Metro City Group' },
              { name: 'James Whitfield', role: 'Quantity Surveyor', firm: 'Buro Happold' },
              { name: 'Priya Sharma', role: 'H&S Officer', firm: 'SafetyFirst Consultancy' },
              { name: 'Alex Thornton', role: 'Design Lead', firm: 'Arup & Partners' },
            ].map(member => (
              <div key={member.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-slate-800 text-xs font-semibold">{member.name}</p>
                  <p className="text-slate-500 text-[10px]">{member.role}</p>
                  <p className="text-slate-400 text-[10px]">{member.firm}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
