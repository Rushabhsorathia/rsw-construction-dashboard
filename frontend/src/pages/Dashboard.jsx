import { Link } from 'react-router-dom'
import {
  Building2, TrendingUp, TrendingDown, Clock, AlertTriangle,
  ArrowRight, BotMessageSquare, Shield, Users, Wallet, GitBranch
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { projects, budget, resources, healthSafety, aiInsights, projectStats } from '../data/mockData'

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

export default function Dashboard() {
  const totalBudget = projectStats.totalBudget
  const totalSpent = projectStats.totalSpent
  const totalCommitted = projectStats.totalCommitted
  const avgSpi = (projects.reduce((s, p) => s + p.spi, 0) / projects.length).toFixed(2)
  const avgCpi = (projects.reduce((s, p) => s + p.cpi, 0) / projects.length).toFixed(2)

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
          { label: 'Active Projects', value: projectStats.active, icon: Building2, color: 'text-orange-500', bg: 'bg-orange-50', change: '+2 this quarter' },
          { label: 'Total Portfolio Value', value: `£${projectStats.totalValue.toFixed(1)}M`, icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50', change: 'Across 4 regions' },
          { label: 'Projects At Risk', value: projectStats.atRisk, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', change: `${projectStats.delayed} also delayed` },
          { label: 'Avg Schedule Perf.', value: avgSpi, icon: TrendingUp, color: avgSpi >= 1 ? 'text-emerald-500' : 'text-amber-500', bg: avgSpi >= 1 ? 'bg-emerald-50' : 'bg-amber-50', change: avgSpi >= 1 ? 'On schedule' : 'Behind schedule' },
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
              { label: 'Committed', value: totalCommitted, color: 'text-blue-500', pct: (totalCommitted / totalBudget) * 100 },
              { label: 'Spent', value: totalSpent, color: 'text-orange-500', pct: (totalSpent / totalBudget) * 100 },
            ].map(b => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">{b.label}</span>
                  <span className={b.color}>£{b.value.toFixed(1)}M</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${b.label === 'Total Budget' ? 'bg-slate-400' : b.label === 'Committed' ? 'bg-blue-400' : 'bg-orange-500'}`} style={{ width: `${b.pct}%` }} />
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
                  <p className="text-slate-800 text-sm font-semibold">{p.name.split(' — ')[0]}</p>
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
            {aiInsights.filter(i => i.priority === 'high').slice(0, 4).map(i => (
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
