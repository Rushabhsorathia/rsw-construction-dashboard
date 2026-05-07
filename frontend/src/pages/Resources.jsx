import { useState } from 'react'
import { Users, AlertTriangle, TrendingUp } from 'lucide-react'
import { resources } from '../data/mockData'

export default function Resources() {
  const [filter, setFilter] = useState('All')

  const shortfall = resources.filter(r => r.pct >= 90)
  const totalWorkforce = resources.reduce((s, r) => s + r.allocated, 0)
  const totalAvailable = resources.reduce((s, r) => s + r.available, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold">Resources</h1>
          <p className="text-slate-500 text-sm">Labour allocation · Subcontractor management</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            + Add Subcontractor
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Workforce On-Site', value: totalWorkforce, icon: Users, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Subcontractor Firms', value: 18, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Trades At Risk (90%+)', value: shortfall.length, icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Available Capacity', value: `${totalAvailable - totalWorkforce}`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-xs uppercase tracking-wide">{s.label}</p>
              <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center`}>
                <s.icon size={15} className={s.color} />
              </div>
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Allocation Table */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm overflow-hidden">
        <div className="p-5">
          <h3 className="text-slate-800 font-semibold mb-4">Labour Allocation by Trade</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-y border-slate-200">
            <tr className="text-slate-500 text-xs uppercase">
              <th className="text-left px-5 py-3 font-semibold">Trade</th>
              <th className="text-left px-4 py-3 font-semibold">Allocated</th>
              <th className="text-left px-4 py-3 font-semibold">Available</th>
              <th className="text-left px-4 py-3 font-semibold">Forecast</th>
              <th className="text-left px-4 py-3 font-semibold">Utilisation</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r, i) => (
              <tr key={r.trade} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${r.pct >= 100 ? 'bg-red-500' : r.pct >= 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                    <span className="text-slate-800 font-medium text-sm">{r.trade}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{r.allocated}</td>
                <td className="px-4 py-3 text-slate-600">{r.available}</td>
                <td className="px-4 py-3 text-slate-600">{r.forecast}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${
                        r.pct >= 100 ? 'bg-red-500' : r.pct >= 80 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} style={{ width: `${Math.min(r.pct, 100)}%` }} />
                    </div>
                    <span className={`text-sm font-semibold ${r.pct >= 100 ? 'text-red-600' : r.pct >= 80 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {r.pct}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    r.pct >= 100 ? 'bg-red-100 text-red-700' :
                    r.pct >= 80 ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {r.pct >= 100 ? 'Over-allocated' : r.pct >= 80 ? 'At Risk' : 'Available'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shortfall Alert */}
      {shortfall.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-600" />
            <h3 className="text-amber-800 font-semibold text-sm">Labour Shortfall Alert</h3>
          </div>
          <p className="text-amber-700 text-xs mb-3">{shortfall.length} trades are at or above 90% utilisation. Any absence or delay will cause critical path impact.</p>
          <div className="flex gap-2">
            {shortfall.map(r => (
              <span key={r.trade} className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-lg border border-amber-200">
                {r.trade}: {r.pct}%
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
