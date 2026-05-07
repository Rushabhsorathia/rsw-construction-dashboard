import { useState } from 'react'
import {
  Users, Plus, Star, Phone, Mail, FileText, Shield,
  TrendingUp, AlertCircle, CheckCircle2, Clock, Search, Filter
} from 'lucide-react'

const subcontractors = [
  {
    id: 1,
    name: 'Precision Steel Fixers Ltd',
    trade: 'Steel Fixers',
    rating: 4.8,
    projects: ['Battersea Phase 2', 'Manchester Metro Hub'],
    defectRate: 1.2,
    avgResponse: 2.4,
    cscsCompliant: true,
    status: 'Preferred',
    value: '£2.4M',
    contacts: [{ name: 'Mike Richards', phone: '+44 7700 123456', email: 'mike@precisionsteel.co.uk' }],
    performance: [95, 92, 98, 94, 97],
  },
  {
    id: 2,
    name: 'Metro Facades International',
    trade: 'External Cladding',
    rating: 4.2,
    projects: ['Manchester Metro Hub', 'Birmingham Central Plaza'],
    defectRate: 3.8,
    avgResponse: 5.1,
    cscsCompliant: true,
    status: 'Approved',
    value: '£3.1M',
    contacts: [{ name: 'David Chen', phone: '+44 7700 234567', email: 'dchen@metrofacades.com' }],
    performance: [88, 85, 82, 87, 84],
  },
  {
    id: 3,
    name: 'PD Plumbing & Heating',
    trade: 'M&E — Plumbing',
    rating: 3.5,
    projects: ['Battersea Phase 2', 'Leeds Green Park'],
    defectRate: 8.4,
    avgResponse: 8.2,
    cscsCompliant: true,
    status: 'On Notice',
    value: '£1.2M',
    contacts: [{ name: 'Paul Davies', phone: '+44 7700 345678', email: 'paul@pdplumbing.co.uk' }],
    performance: [72, 68, 65, 70, 62],
  },
  {
    id: 4,
    name: 'FineFinish Electrical',
    trade: 'M&E — Electrical',
    rating: 4.6,
    projects: ['Battersea Phase 2', 'Bristol Harbour Bridge'],
    defectRate: 2.1,
    avgResponse: 1.8,
    cscsCompliant: true,
    status: 'Preferred',
    value: '£1.8M',
    contacts: [{ name: 'Anna Kowalski', phone: '+44 7700 456789', email: 'anna@finefinish.com' }],
    performance: [94, 96, 93, 95, 97],
  },
  {
    id: 5,
    name: 'Apex Scaffolding Services',
    trade: 'Scaffolding',
    rating: 3.8,
    projects: ['Bristol Harbour Bridge'],
    defectRate: 4.2,
    avgResponse: 3.1,
    cscsCompliant: false,
    status: 'Approved',
    value: '£480K',
    contacts: [{ name: 'Tom Hughes', phone: '+44 7700 567890', email: 'tom@apexscaffolding.co.uk' }],
    performance: [80, 78, 82, 75, 79],
  },
  {
    id: 6,
    name: 'Continental Steel UK',
    trade: 'Steel Supply',
    rating: 4.0,
    projects: ['Manchester Metro Hub', 'Birmingham Central Plaza'],
    defectRate: 0.8,
    avgResponse: 6.0,
    cscsCompliant: true,
    status: 'Approved',
    value: '£4.2M',
    contacts: [{ name: 'Sarah Jones', phone: '+44 7700 678901', email: 'sjones@continentalsteel.co.uk' }],
    performance: [91, 88, 85, 90, 87],
  },
  {
    id: 7,
    name: 'Northern Brickwork Solutions',
    trade: 'Bricklayers',
    rating: 4.4,
    projects: ['Leeds Green Park', 'Newcastle Innovation Centre'],
    defectRate: 2.8,
    avgResponse: 2.0,
    cscsCompliant: true,
    status: 'Preferred',
    value: '£2.9M',
    contacts: [{ name: 'James O\'Brien', phone: '+44 7700 789012', email: 'james@northernbrickwork.co.uk' }],
    performance: [92, 90, 88, 91, 93],
  },
  {
    id: 8,
    name: 'Clearwater M&E Systems',
    trade: 'M&E — Full Package',
    rating: 4.1,
    projects: ['Birmingham Central Plaza'],
    defectRate: 3.2,
    avgResponse: 3.8,
    cscsCompliant: true,
    status: 'Approved',
    value: '£5.6M',
    contacts: [{ name: 'Rachel Kim', phone: '+44 7700 890123', email: 'rkim@clearwaterme.com' }],
    performance: [86, 84, 88, 82, 87],
  },
]

const statusColors = {
  'Preferred': 'bg-emerald-100 text-emerald-700',
  'Approved': 'bg-blue-100 text-blue-700',
  'On Notice': 'bg-amber-100 text-amber-700',
  'Blacklisted': 'bg-red-100 text-red-700',
}

const statusBadge = {
  'Preferred': <Star size={12} className="inline mr-1" />,
  'Approved': <CheckCircle2 size={12} className="inline mr-1" />,
  'On Notice': <AlertCircle size={12} className="inline mr-1" />,
}

export default function Subcontractors() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const filtered = subcontractors.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.trade.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || s.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold">Subcontractors</h1>
          <p className="text-slate-500 text-sm">{subcontractors.length} registered firms · {subcontractors.filter(s => s.status === 'Preferred').length} preferred suppliers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
          <Plus size={16} /> Add Subcontractor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Contract Value', value: `£${(subcontractors.reduce((s, sc) => s + parseFloat(sc.value.replace('£','').replace('M','')), 0)).toFixed(1)}M`, icon: FileText, color: 'text-slate-800', bg: 'bg-slate-50' },
          { label: 'Preferred Suppliers', value: subcontractors.filter(s => s.status === 'Preferred').length, icon: Star, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'On Notice', value: subcontractors.filter(s => s.status === 'On Notice').length, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Avg Rating', value: (subcontractors.reduce((s, sc) => s + sc.rating, 0) / subcontractors.length).toFixed(1), icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
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
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or trade..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400">
          <option>All Status</option>
          <option>Preferred</option>
          <option>Approved</option>
          <option>On Notice</option>
        </select>
      </div>

      {/* Subcontractor Cards */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map(sc => (
          <div key={sc.id} className="bg-white rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                    {sc.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                  </div>
                  <div>
                    <p className="text-slate-800 text-sm font-bold">{sc.name}</p>
                    <p className="text-slate-500 text-xs">{sc.trade}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusColors[sc.status]}`}>
                    {statusBadge[sc.status]}{sc.status}
                  </span>
                  <div className="flex items-center gap-0.5 mt-1 justify-end">
                    <Star size={11} className="text-amber-400 fill-amber-400" />
                    <span className="text-slate-700 text-xs font-semibold">{sc.rating}</span>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { label: 'Defect Rate', value: `${sc.defectRate}%`, color: sc.defectRate > 5 ? 'text-red-500' : 'text-emerald-600' },
                  { label: 'Response', value: `${sc.avgResponse}h`, color: 'text-slate-600' },
                  { label: 'Contract', value: sc.value, color: 'text-slate-600' },
                  { label: 'Projects', value: sc.projects.length, color: 'text-blue-600' },
                ].map(s => (
                  <div key={s.label} className="text-center p-2 bg-slate-50 rounded-lg">
                    <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Performance bars */}
              <div className="mb-3">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-1.5">Performance Trend (5 projects)</p>
                <div className="flex gap-0.5 items-end h-6">
                  {sc.performance.map((p, i) => (
                    <div key={i} className="flex-1 bg-blue-400 rounded-t transition-all" style={{ height: `${p}%` }} />
                  ))}
                </div>
              </div>

              {/* CSCS status */}
              <div className="flex items-center gap-2 mb-3">
                <Shield size={12} className={sc.cscsCompliant ? 'text-emerald-500' : 'text-red-500'} />
                <span className={`text-xs font-medium ${sc.cscsCompliant ? 'text-emerald-600' : 'text-red-600'}`}>
                  CSCS {sc.cscsCompliant ? 'Compliant' : 'NON-COMPLIANT'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button onClick={() => setExpanded(expanded === sc.id ? null : sc.id)}
                  className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors">
                  {expanded === sc.id ? 'Hide Details' : 'View Details'}
                </button>
                <button className="px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-semibold rounded-lg border border-orange-200 transition-colors">
                  <Phone size={12} className="inline" />
                </button>
                <button className="px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-semibold rounded-lg border border-orange-200 transition-colors">
                  <Mail size={12} className="inline" />
                </button>
              </div>
            </div>

            {/* Expanded details */}
            {expanded === sc.id && (
              <div className="border-t border-slate-100 bg-slate-50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-2">Projects</p>
                    {sc.projects.map(p => (
                      <p key={p} className="text-xs text-slate-600 mb-1 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />{p}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-2">Contacts</p>
                    {sc.contacts.map(c => (
                      <div key={c.name} className="mb-2">
                        <p className="text-xs font-semibold text-slate-700">{c.name}</p>
                        <p className="text-[10px] text-slate-400">{c.phone}</p>
                        <p className="text-[10px] text-slate-400">{c.email}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {sc.status === 'On Notice' && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-amber-700 text-xs font-semibold mb-1">Performance Improvement Plan Active</p>
                    <p className="text-amber-600 text-[10px]">PD Plumbing has 60 days to improve defect rate below 5%. Review date: 15 July 2026.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
