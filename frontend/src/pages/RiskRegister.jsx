import { useState } from 'react'
import {
  AlertTriangle, Shield, TrendingUp, TrendingDown, Plus, Filter,
  ChevronDown, Clock, Users, MapPin, DollarSign, Calendar
} from 'lucide-react'

const risks = [
  {
    id: 1,
    title: 'Steel Delivery Delay — Continental Steel',
    project: 'Manchester Metro Hub',
    category: 'Supply Chain',
    likelihood: 4,
    impact: 4,
    score: 16,
    owner: 'Sarah Collins',
    status: 'High',
    due: '15 May 2026',
    mitigation: 'Source backup supplier from British Steel. Pre-order next batch. Maintain 2-week buffer stock on site.',
    contingency: 'PD Steel UK — 3-week lead time, premium 8%',
  },
  {
    id: 2,
    title: 'Planning Permission Risk — Leeds Green Park',
    project: 'Leeds Green Park',
    category: 'External',
    likelihood: 3,
    impact: 5,
    score: 15,
    owner: 'Priya Sharma',
    status: 'High',
    due: '30 May 2026',
    mitigation: 'Engage planning consultant early. Pre-application meeting with Leeds City Council. Prepare community benefits package.',
    contingency: 'Appeal process — 6-month delay, £180K additional costs',
  },
  {
    id: 3,
    title: 'Labour Shortage — Scaffolders Bristol',
    project: 'Bristol Harbour Bridge',
    category: 'Labour',
    likelihood: 5,
    impact: 3,
    score: 15,
    owner: 'James Whitfield',
    status: 'High',
    due: 'Ongoing',
    mitigation: 'Source 2 backup scaffolders via CFAA. Brief recruitment agency. Offer retention bonus.',
    contingency: 'Use mobile access towers for non-critical areas — slower but prevents delay',
  },
  {
    id: 4,
    title: 'Groundworks Unexpected UXO — Manchester',
    project: 'Manchester Metro Hub',
    category: 'Technical',
    likelihood: 2,
    impact: 5,
    score: 10,
    owner: 'Sarah Collins',
    status: 'Medium',
    due: 'Completed',
    mitigation: 'Commission UXO survey before works. Brief groundworks team on emergency procedure.',
    contingency: 'UXO discovered — 3-week delay, £85K remediation cost (insurance covered 80%)',
  },
  {
    id: 5,
    title: 'Material Price Inflation — Above Budget 8%',
    project: 'All Projects',
    category: 'Commercial',
    likelihood: 4,
    impact: 3,
    score: 12,
    owner: 'Tom Mitchell',
    status: 'Medium',
    due: 'Ongoing',
    mitigation: 'Forward-order steel and concrete. Lock in prices quarterly. Review BoQ rates monthly.',
    contingency: 'Variation claims to client. Budget contingency release.',
  },
  {
    id: 6,
    title: 'Subcontractor Insolvency — cladding firm',
    project: 'Battersea Phase 2',
    category: 'Financial',
    likelihood: 2,
    impact: 4,
    score: 8,
    owner: 'Tom Mitchell',
    status: 'Low',
    due: 'Ongoing',
    mitigation: 'Monitor subcontractor financial health. Take bonds/parent company guarantees on large packages.',
    contingency: 'Pre-qualify 2 backup cladding firms. Contract allows step-in rights.',
  },
  {
    id: 7,
    title: 'Weather Delays — Q2 2026',
    project: 'Bristol Harbour Bridge',
    category: 'External',
    likelihood: 3,
    impact: 2,
    score: 6,
    owner: 'James Whitfield',
    status: 'Low',
    due: '30 Jun 2026',
    mitigation: 'Programme float of 14 days. Weather-sensitive activities scheduled May-Sep.',
    contingency: 'Extension of time claim under JCT. Client notified.',
  },
  {
    id: 8,
    title: 'CDM Compliance Gap — H&S File Missing',
    project: 'Leeds Green Park',
    category: 'Compliance',
    likelihood: 3,
    impact: 3,
    score: 9,
    owner: 'Priya Sharma',
    status: 'Medium',
    due: '20 May 2026',
    mitigation: 'Assign H&S File responsibility. Commission safety consultant. Set monthly review meetings.',
    contingency: 'HSE enforcement — prohibition notice, reputational damage',
  },
]

const categories = ['All', 'Supply Chain', 'External', 'Labour', 'Technical', 'Commercial', 'Financial', 'Compliance']
const statusColors = { High: 'bg-red-100 text-red-700', Medium: 'bg-amber-100 text-amber-700', Low: 'bg-emerald-100 text-emerald-700' }

export default function RiskRegister() {
  const [catFilter, setCatFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const [showAdd, setShowAdd] = useState(false)

  const filtered = risks.filter(r => catFilter === 'All' || r.category === catFilter)
  const total = filtered.reduce((s, r) => s + r.score, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold">Risk Register</h1>
          <p className="text-slate-500 text-sm">{risks.length} active risks · Total risk score: {total}</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
          <Plus size={16} /> Add Risk
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Risks', value: risks.length, color: 'text-slate-800', bg: 'bg-slate-50' },
          { label: 'High Risk (12+)', value: risks.filter(r => r.score >= 12).length, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Medium Risk (6-11)', value: risks.filter(r => r.score >= 6 && r.score < 12).length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Low Risk (<6)', value: risks.filter(r => r.score < 6).length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-slate-200`}>
            <p className="text-slate-500 text-xs">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              catFilter === c ? 'bg-orange-500 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300'
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* Risk Matrix */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-500 text-xs uppercase">
              <th className="text-left px-5 py-3 font-semibold">Risk</th>
              <th className="text-left px-4 py-3 font-semibold">Project</th>
              <th className="text-left px-4 py-3 font-semibold">Category</th>
              <th className="text-center px-3 py-3 font-semibold">L</th>
              <th className="text-center px-3 py-3 font-semibold">I</th>
              <th className="text-center px-3 py-3 font-semibold">Score</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-left px-4 py-3 font-semibold">Owner</th>
              <th className="text-left px-4 py-3 font-semibold">Due</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <>
                <tr key={r.id} className={`border-t border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
                  onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={14} className={`flex-shrink-0 ${r.score >= 12 ? 'text-red-500' : r.score >= 6 ? 'text-amber-500' : 'text-emerald-500'}`} />
                      <span className="text-slate-800 font-medium text-sm">{r.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 text-xs">{r.project}</td>
                  <td className="px-4 py-3.5"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">{r.category}</span></td>
                  <td className="px-3 py-3.5 text-center">
                    <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mx-auto">{r.likelihood}</div>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <div className="w-6 h-6 rounded bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center mx-auto">{r.impact}</div>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <span className={`text-sm font-bold ${r.score >= 12 ? 'text-red-600' : r.score >= 6 ? 'text-amber-600' : 'text-emerald-600'}`}>{r.score}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusColors[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 text-xs">{r.owner}</td>
                  <td className="px-4 py-3.5 text-slate-500 text-xs">{r.due}</td>
                  <td className="px-4 py-3.5">
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${expanded === r.id ? 'rotate-180' : ''}`} />
                  </td>
                </tr>
                {expanded === r.id && (
                  <tr className="bg-blue-50/50 border-t border-blue-100">
                    <td colSpan={10} className="px-5 py-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Mitigation Plan</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{r.mitigation}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-red-600 mb-2 uppercase tracking-wide">Contingency Plan</p>
                          <p className="text-sm text-slate-700 leading-relaxed bg-red-50 rounded-lg p-3 border border-red-100">{r.contingency}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Risk Matrix Visual */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5">
        <h3 className="text-slate-800 font-semibold mb-4">Risk Matrix — Likelihood vs Impact</h3>
        <div className="grid grid-cols-5 gap-1 relative">
          {/* Y-axis label */}
          <div className="col-span-5 flex">
            {[5,4,3,2,1].map(y => (
              <div key={y} className="flex-1 text-center text-[10px] text-slate-400 font-medium py-1">{y}</div>
            ))}
          </div>
          <div className="col-span-5 grid grid-cols-5 gap-1">
            {[5,4,3,2,1].map(y => (
              [1,2,3,4,5].map(x => {
                const score = x * y
                const color = score >= 12 ? 'bg-red-500/30' : score >= 6 ? 'bg-amber-500/30' : 'bg-emerald-500/30'
                return (
                  <div key={`${x}-${y}`} className={`h-12 rounded ${color} border border-white flex items-center justify-center relative`}>
                    <span className="text-[9px] font-bold text-slate-500">{score}</span>
                    {risks.filter(r => r.likelihood === x && r.impact === y).map(r => (
                      <div key={r.id} className="absolute w-2 h-2 rounded-full bg-red-500 -top-0.5 -right-0.5" title={r.title} />
                    ))}
                  </div>
                )
              })
            ))}
          </div>
          <div className="col-span-5 flex mt-1">
            {[1,2,3,4,5].map(x => (
              <div key={x} className="flex-1 text-center text-[10px] text-slate-400 font-medium">{x}</div>
            ))}
          </div>
          <div className="col-span-5 text-center text-xs text-slate-400 mt-1">LIKELIHOOD →</div>
        </div>
      </div>
    </div>
  )
}
