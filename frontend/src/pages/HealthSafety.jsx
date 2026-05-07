import { useState } from 'react'
import { ShieldCheck, AlertTriangle, CheckCircle2, Clock, FileText, Shield } from 'lucide-react'
import { healthSafety, cdmCompliance, goldenThread } from '../data/mockData'

export default function HealthSafety() {
  const [tab, setTab] = useState('overview')

  const completed = cdmCompliance.filter(c => c.done).length
  const total = cdmCompliance.length
  const goldenPct = Math.round(goldenThread.filter(g => g.status === 'Complete').length / goldenThread.length * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold">Health & Safety</h1>
          <p className="text-slate-500 text-sm">CDM Compliance · Building Safety Act · Golden Thread</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <FileText size={15} /> Export H&S Report
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow">
            + Log Incident
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'RIDDOR Incidents', value: '1', sub: 'No change vs last month', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
          { label: 'Near Miss Reports', value: '12', sub: '+3 vs last month', color: 'text-amber-500', bg: 'bg-amber-50', icon: AlertTriangle },
          { label: 'Toolbox Talks', value: '47', sub: '+8 vs last month', color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
          { label: 'CDM Compliance', value: `${completed}/${total}`, sub: 'Documents complete', color: 'text-orange-500', bg: 'bg-orange-50', icon: ShieldCheck },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-xs uppercase tracking-wide">{s.label}</p>
              <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center`}>
                <s.icon size={15} className={s.color} />
              </div>
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-slate-400 text-[10px] mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* CDM Compliance */}
        <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-semibold flex items-center gap-2">
              <ShieldCheck size={16} className="text-orange-500" />
              CDM Compliance Status
            </h3>
            <span className="text-xs text-slate-500">{completed}/{total} complete</span>
          </div>
          <div className="space-y-2.5">
            {cdmCompliance.map(item => (
              <div key={item.item} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                  item.done ? 'bg-emerald-500' : 'bg-slate-200'
                }`}>
                  {item.done && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <span className={`text-sm flex-1 ${item.done ? 'text-slate-700' : 'text-amber-600'}`}>{item.item}</span>
                {!item.done && item.due && (
                  <span className="text-amber-400 text-xs">Due: {item.due}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Golden Thread */}
        <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-semibold flex items-center gap-2">
              <Shield size={16} className="text-orange-500" />
              Building Safety Act — Golden Thread
            </h3>
            <span className="text-xs font-semibold text-orange-500">{goldenPct}% Complete</span>
          </div>
          <div className="space-y-3">
            {goldenThread.map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <span className={item.status === 'Complete' ? 'text-emerald-600 font-semibold' : 'text-amber-500 font-semibold'}>
                    {item.status}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.status === 'Complete' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Metrics */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5">
        <h3 className="text-slate-800 font-semibold mb-4">Safety Metrics — Year to Date</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Hours Worked', value: '184,420', sub: 'Across all projects' },
            { label: 'Accident Frequency Rate', value: '0.08', sub: 'Industry avg: 0.36' },
            { label: 'Days Lost to Injury', value: '3', sub: 'This quarter' },
            { label: 'PPE Compliance', value: '99%', sub: 'Target: 100%' },
          ].map(m => (
            <div key={m.label} className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-slate-500 text-[10px] uppercase tracking-wide mb-1">{m.label}</p>
              <p className="text-xl font-bold text-slate-800">{m.value}</p>
              <p className="text-slate-400 text-[10px] mt-0.5">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
