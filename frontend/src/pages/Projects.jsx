import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Search, Filter, ArrowRight, MapPin, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { projects } from '../data/mockData'

const statusColors = {
  'On Track': 'bg-emerald-100 text-emerald-700',
  'At Risk': 'bg-amber-100 text-amber-700',
  'Delayed': 'bg-red-100 text-red-700',
}

export default function Projects() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || p.status === statusFilter
    const matchType = typeFilter === 'All' || p.type === typeFilter
    return matchSearch && matchStatus && matchType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold">Projects</h1>
          <p className="text-slate-500 text-sm">{projects.length} active projects across the UK</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
          + New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-orange-200 shadow-sm">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects or clients..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400"
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400">
          <option>All Status</option>
          <option>On Track</option>
          <option>At Risk</option>
          <option>Delayed</option>
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400">
          <option>All Types</option>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Mixed Use</option>
          <option>Infrastructure</option>
        </select>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map(p => (
          <Link key={p.id} to={`/projects/${p.id}`} className="bg-white rounded-xl border border-orange-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <Building2 size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-slate-800 text-sm font-bold leading-tight">{p.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{p.client}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusColors[p.status]}`}>{p.status}</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
              <span className="flex items-center gap-1"><MapPin size={12} /> {p.location}</span>
              <span className="flex items-center gap-1"><Building2 size={12} /> {p.type}</span>
              <span className="flex items-center gap-1"><TrendingUp size={12} /> SPI {p.spi}</span>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">{p.progress}% complete</span>
                <span className="text-slate-500">{p.daysLeft} days left</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${
                  p.health === 'green' ? 'bg-emerald-500' : p.health === 'orange' ? 'bg-amber-500' : 'bg-red-500'
                }`} style={{ width: `${p.progress}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-slate-500 text-[10px]">Value</p>
                  <p className="text-slate-800 text-sm font-bold">{p.value}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px]">SPI</p>
                  <p className={`text-sm font-bold ${p.spi >= 1 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {p.spi >= 1 ? <TrendingUp size={14} className="inline" /> : <TrendingDown size={14} className="inline" />} {p.spi}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px]">CPI</p>
                  <p className={`text-sm font-bold ${p.cpi >= 1 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {p.cpi >= 1 ? <TrendingUp size={14} className="inline" /> : <TrendingDown size={14} className="inline" />} {p.cpi}
                  </p>
                </div>
              </div>
              <ArrowRight size={16} className="text-orange-400" />
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-orange-200">
          <Building2 size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No projects match your filters</p>
          <button onClick={() => { setSearch(''); setStatusFilter('All'); setTypeFilter('All') }}
            className="mt-3 text-orange-500 text-sm font-semibold">Clear filters</button>
        </div>
      )}
    </div>
  )
}
