import { useState, useEffect } from 'react'
import {
  FileText, Plus, Search, Calendar, Sun, Cloud, CloudRain,
  Thermometer, Wind, Users, Clock, CheckCircle2, AlertTriangle,
  ChevronDown, Download, Image, Building2, TrendingUp, TrendingDown, Loader2
} from 'lucide-react'
import useAppStore from '../store/appStore'

const projects = ['All Sites', 'Battersea Phase 2', 'Manchester Metro Hub', 'Bristol Harbour Bridge', 'Leeds Green Park', 'Birmingham Central Plaza', 'Newcastle Innovation Centre']

export default function DailyLogs() {
  const { dailyLogs, dailyLogsLoading, fetchDailyLogs } = useAppStore()
  const [projFilter, setProjFilter] = useState('All Sites')
  const [dateFilter, setDateFilter] = useState('')
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    fetchDailyLogs()
  }, [fetchDailyLogs])

  const logs = dailyLogs || []

  const filtered = logs.filter(log => {
    const matchProj = projFilter === 'All Sites' || log.project === projFilter
    const matchDate = !dateFilter || log.date === dateFilter
    return matchProj && matchDate
  })

  const totalWorkforce = logs.reduce((s, l) => s + l.workforce, 0)
  const totalHours = logs.reduce((s, l) => s + l.workHours, 0)
  const accidentFree = logs.filter(l => l.accidentFree).length
  const todayLog = logs[0]

  if (dailyLogsLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-orange-500" />
      </div>
    )
  }

  if (logs.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-800 text-2xl font-bold">Daily Site Logs</h1>
            <p className="text-slate-500 text-sm">Track daily site activity</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
            <Plus size={16} /> New Daily Log
          </button>
        </div>
        <div className="text-center py-16 bg-white rounded-xl border border-orange-200 shadow-sm">
          <FileText size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-slate-600 text-lg font-semibold mb-1">No data yet</h3>
          <p className="text-slate-400 text-sm">Connect the backend to see live data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold">Daily Site Logs</h1>
          <p className="text-slate-500 text-sm">{logs.length} logs this week · {accidentFree}/{logs.length} accident-free days</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
          <Plus size={16} /> New Daily Log
        </button>
      </div>

      {/* Today Summary */}
      {todayLog && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <FileText size={22} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Today — {todayLog.date}</p>
                <p className="text-orange-100 text-xs">{todayLog.project}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right mr-4">
                <p className="text-orange-100 text-xs">Submitted by</p>
                <p className="text-white text-sm font-semibold">{todayLog.submittedBy}</p>
              </div>
              <CheckCircle2 size={20} className="text-white/80" />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white/15 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                {(() => { const WI = todayLog.weatherIcon; return WI ? <WI size={16} className="text-white" /> : null; })()}
                <span className="text-white text-xs">{todayLog.weather}</span>
              </div>
              <p className="text-white/80 text-[10px]">{todayLog.temp}°C · {todayLog.wind}</p>
            </div>
            <div className="bg-white/15 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users size={16} className="text-white" />
                <span className="text-white font-bold text-lg">{todayLog.workforce}</span>
              </div>
              <p className="text-white/80 text-[10px]">Workforce</p>
            </div>
            <div className="bg-white/15 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock size={16} className="text-white" />
                <span className="text-white font-bold text-lg">{todayLog.workHours}</span>
              </div>
              <p className="text-white/80 text-[10px]">Work Hours</p>
            </div>
            <div className="bg-white/15 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Image size={16} className="text-white" />
                <span className="text-white font-bold text-lg">{todayLog.photos}</span>
              </div>
              <p className="text-white/80 text-[10px]">Photos</p>
            </div>
            <div className="bg-white/15 rounded-lg p-3 text-center">
              <div className={`flex items-center justify-center gap-1 mb-1 ${todayLog.accidentFree ? 'text-white' : 'text-red-200'}`}>
                {todayLog.accidentFree
                  ? <CheckCircle2 size={16} />
                  : <AlertTriangle size={16} />
                }
                <span className="text-white font-bold text-lg">{todayLog.accidentFree ? '0' : '1'}</span>
              </div>
              <p className="text-white/80 text-[10px]">Incidents</p>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Workforce Week', value: totalWorkforce, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Work Hours Week', value: `${totalHours.toLocaleString()}h`, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Avg Daily Hours', value: Math.round(totalHours / logs.length), icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Accident-Free Days', value: accidentFree, icon: CheckCircle2, color: 'text-slate-700', bg: 'bg-slate-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-slate-200`}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon size={14} className={s.color} />
              <p className="text-slate-500 text-xs">{s.label}</p>
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-orange-200 shadow-sm">
        <select value={projFilter} onChange={e => setProjFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400">
          {projects.map(p => <option key={p}>{p}</option>)}
        </select>
        <div className="relative flex-1">
          <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400" />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
          <Download size={14} /> Export Week
        </button>
      </div>

      {/* Logs */}
      <div className="space-y-4">
        {filtered.map(log => {
          const WeatherIcon = log.weatherIcon
          return (
            <div key={log.id} className="bg-white rounded-xl border border-orange-200 shadow-sm overflow-hidden">
              {/* Log Header */}
              <div className="p-5 cursor-pointer" onClick={() => setExpanded(expanded === log.id ? null : log.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <WeatherIcon size={22} className="text-orange-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-800 text-sm font-bold">{log.date}</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">{log.project.split(' ').slice(0, 2).join(' ')}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 ${log.accidentFree ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {log.accidentFree ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
                          {log.accidentFree ? 'No Incidents' : 'Incident'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-slate-400 text-xs"><Thermometer size={11} />{log.temp}°C</span>
                        <span className="flex items-center gap-1 text-slate-400 text-xs"><Wind size={11} />{log.wind}</span>
                        <span className="flex items-center gap-1 text-slate-400 text-xs"><Users size={11} />{log.workforce} on site</span>
                        <span className="flex items-center gap-1 text-slate-400 text-xs"><Clock size={11} />{log.workHours}h logged</span>
                        <span className="flex items-center gap-1 text-slate-400 text-xs"><Image size={11} />{log.photos} photos</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right mr-2">
                      <p className="text-slate-700 text-xs font-semibold">{log.submittedBy}</p>
                      <p className="text-slate-400 text-[10px]">Submitted {log.submittedAt}</p>
                    </div>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${expanded === log.id ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>

              {/* Expanded Sections */}
              {expanded === log.id && (
                <div className="border-t border-slate-100 bg-slate-50 p-5">
                  <div className="grid grid-cols-2 gap-4">
                    {log.sections.map(section => (
                      <div key={section.title} className="bg-white rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-slate-800 text-sm font-bold">{section.title}</h4>
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded">{section.items} items</span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{section.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold rounded-lg hover:bg-orange-100 transition-colors">
                      <Image size={12} /> View {log.photos} Photos
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                      <Download size={12} /> Export PDF
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                      Print Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
