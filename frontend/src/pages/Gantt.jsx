import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GitBranch, Download, Plus, ChevronRight } from 'lucide-react'
import useAppStore from '../store/appStore'

const phaseColors = {
  1: { bar: 'bg-emerald-500', label: 'Phase 1 — Structure', complete: 'bg-emerald-600' },
  2: { bar: 'bg-blue-500', label: 'Phase 2 — Envelope', complete: 'bg-blue-600' },
  3: { bar: 'bg-blue-400', label: 'Phase 3 — First Fix', complete: 'bg-blue-500' },
  4: { bar: 'bg-orange-500', label: 'Phase 4 — Second Fix', complete: 'bg-orange-600' },
  5: { bar: 'bg-purple-500', label: 'Phase 5 — Handover', complete: 'bg-purple-600' },
}

const phases = [
  { name: 'Phase 1 — Structure', color: 'bg-emerald-500' },
  { name: 'Phase 2 — Envelope', color: 'bg-blue-500' },
  { name: 'Phase 3 — First Fix', color: 'bg-blue-400' },
  { name: 'Phase 4 — Second Fix', color: 'bg-orange-500' },
  { name: 'Phase 5 — Handover', color: 'bg-purple-500' },
]

const weeks = Array.from({ length: 26 }, (_, i) => i + 1)

export default function Gantt() {
  const [selectedPhase, setSelectedPhase] = useState(null)
  const today = 9 // Week 9 marker

  const ganttTasks = useAppStore(s => s.ganttTasks) || []
  const ganttTasksLoading = useAppStore(s => s.ganttTasksLoading)
  const fetchGanttTasks = useAppStore(s => s.fetchGanttTasks)

  useEffect(() => {
    fetchGanttTasks()
  }, [])

  if (ganttTasksLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold">Programme</h1>
          <p className="text-slate-500 text-sm">Gantt Chart · 26-Week Programme</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <Download size={15} /> Export PDF
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
            <Plus size={15} /> Add Task
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: ganttTasks.length },
          { label: 'Completed', value: ganttTasks.filter(t => t.complete === 100).length },
          { label: 'In Progress', value: ganttTasks.filter(t => t.complete > 0 && t.complete < 100).length },
          { label: 'Critical Path Tasks', value: 14 },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-orange-200 shadow-sm">
            <p className="text-slate-500 text-xs uppercase tracking-wide">{s.label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Phase Legend */}
      <div className="flex gap-2 bg-white rounded-xl p-4 border border-orange-200 shadow-sm">
        {phases.map(p => (
          <button key={p.name} onClick={() => setSelectedPhase(selectedPhase === p.name ? null : p.name)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              selectedPhase === p.name ? `${p.color.replace('bg-', 'bg-')} text-white border-transparent` : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}>
            <div className={`w-2 h-2 rounded-full ${p.color}`} />
            {p.name.replace('Phase ', 'P').replace(' — ', ' · ')}
          </button>
        ))}
      </div>

      {/* Gantt Chart */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm overflow-hidden">
        <div className="p-5">
          {/* Header - Week markers */}
          <div className="flex mb-4">
            <div className="w-48 flex-shrink-0" />
            <div className="flex-1 relative">
              <div className="flex">
                {weeks.filter((_, i) => i % 4 === 0).map(w => (
                  <div key={w} className="flex-1 text-center text-slate-400 text-[10px] border-l border-slate-100 pl-1">
                    W{w}
                  </div>
                ))}
              </div>
              {/* Today marker */}
              <div className="absolute top-0 bottom-0 w-px bg-red-400" style={{ left: `${(today / 26) * 100}%` }}>
                <span className="absolute -top-5 left-1 text-[9px] text-red-500 font-bold whitespace-nowrap">TODAY</span>
              </div>
            </div>
          </div>

          {/* Phase bands */}
          {phases.map(phase => {
            const phaseTasks = ganttTasks.filter(t => t.phase === phases.indexOf(phase) + 1)
            if (selectedPhase && phase.name !== selectedPhase) return null
            return (
              <div key={phase.name} className="mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-4 ${phase.color} rounded flex-shrink-0`} />
                  <span className="text-slate-600 text-[11px] font-semibold">{phase.name}</span>
                </div>
                {/* Tasks */}
                <div className="ml-4 space-y-1">
                  {phaseTasks.map(t => (
                    <div key={t.name} className="flex items-center gap-2 group">
                      <div className="w-48 flex-shrink-0 text-slate-500 text-[10px] truncate pr-2">{t.name}</div>
                      <div className="flex-1 h-6 bg-slate-100 rounded relative">
                        <div className={`absolute h-full rounded ${t.complete === 100 ? phase.color.replace('bg-', 'bg-').replace('-500', '-600') : t.complete > 0 ? t.complete > 50 ? 'bg-blue-500' : 'bg-blue-400' : 'bg-slate-300'}`}
                          style={{ left: `${(t.start / 26) * 100}%`, width: `${((t.end - t.start) / 26) * 100}%`, opacity: t.complete === 0 ? 0.4 : 1 }} />
                        <span className={`absolute right-1.5 top-0.5 text-white text-[10px] font-semibold ${
                          t.complete === 100 ? 'text-white' : 'text-slate-700'
                        }`}>
                          {t.complete}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-px bg-slate-100 border-t border-slate-200">
          {[
            { label: 'SPI (Schedule Performance)', value: '0.98', sub: 'On target', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'CPI (Cost Performance)', value: '1.02', sub: 'Under budget', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Critical Path Tasks At Risk', value: '2', sub: 'Of 14 total', color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Weather Delays (hrs)', value: '42', sub: 'This quarter', color: 'text-slate-600', bg: 'bg-slate-50' },
          ].map(kpi => (
            <div key={kpi.label} className={`${kpi.bg} p-4`}>
              <p className="text-slate-500 text-[10px] uppercase tracking-wide">{kpi.label}</p>
              <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
              <p className="text-slate-400 text-[10px] mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
