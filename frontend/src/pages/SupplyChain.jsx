import { useState } from 'react'
import {
  Truck, Package, AlertTriangle, CheckCircle2, Clock, Plus,
  Search, Filter, RefreshCw, MapPin, Calendar
} from 'lucide-react'

const deliveries = [
  { id: 'DEL-001', item: 'Structural Steel — Batch 3', supplier: 'Continental Steel UK', project: 'Manchester Metro Hub', expected: '01 May 2026', actual: '03 May 2026', status: 'Delayed', delay: 2, qty: '24 tonnes', value: '£186,000', priority: 'Critical' },
  { id: 'DEL-002', item: 'Pre-cast Concrete Panels', supplier: 'Benson Concrete', project: 'Battersea Phase 2', expected: '28 Apr 2026', actual: '28 Apr 2026', status: 'On Time', delay: 0, qty: '48 panels', value: '£94,000', priority: 'High' },
  { id: 'DEL-003', item: 'M&E Ductwork Package', supplier: 'Clearwater M&E', project: 'Birmingham Central Plaza', expected: '30 Apr 2026', actual: '29 Apr 2026', status: 'Early', delay: -1, qty: '12 bundles', value: '£67,000', priority: 'Medium' },
  { id: 'DEL-004', item: 'Cladding Panels — Aluminium', supplier: 'Metro Facades', project: 'Manchester Metro Hub', expected: '05 May 2026', actual: '—', status: 'Expected', delay: 0, qty: '200 panels', value: '£142,000', priority: 'High' },
  { id: 'DEL-005', item: 'Steel Fixings & Bolts', supplier: 'British Steel', project: 'Bristol Harbour Bridge', expected: '02 May 2026', actual: '—', status: 'Expected', delay: 0, qty: '500 boxes', value: '£28,000', priority: 'Critical' },
  { id: 'DEL-006', item: 'Brick — Class A Engineering', supplier: 'Forterra', project: 'Leeds Green Park', expected: '29 Apr 2026', actual: '01 May 2026', status: 'Delayed', delay: 2, qty: '12,000 bricks', value: '£18,000', priority: 'Medium' },
  { id: 'DEL-007', item: 'Windows — Triple Glazed', supplier: 'Safestyle UK', project: 'Battersea Phase 2', expected: '15 May 2026', actual: '—', status: 'Expected', delay: 0, qty: '84 units', value: '£224,000', priority: 'High' },
  { id: 'DEL-008', item: 'Scaffold Equipment —补充', supplier: 'Apex Scaffolding', project: 'Bristol Harbour Bridge', expected: '30 Apr 2026', actual: '30 Apr 2026', status: 'On Time', delay: 0, qty: '4 sets', value: '£12,000', priority: 'Low' },
]

const materials = [
  { name: 'Structural Steel', unit: 'tonnes', ordered: 840, delivered: 712, pending: 128, leadTime: '4 weeks', pricePerUnit: 7750, supplier: 'Continental Steel UK' },
  { name: 'Pre-cast Concrete', unit: 'panels', ordered: 1240, delivered: 892, pending: 348, leadTime: '3 weeks', pricePerUnit: 1950, supplier: 'Benson Concrete' },
  { name: 'Cladding Panels', unit: 'panels', ordered: 4200, delivered: 2100, pending: 2100, leadTime: '6 weeks', pricePerUnit: 710, supplier: 'Metro Facades' },
  { name: 'Reinforcement Bar', unit: 'tonnes', ordered: 320, delivered: 295, pending: 25, leadTime: '2 weeks', pricePerUnit: 6800, supplier: 'British Steel' },
  { name: 'Brick — Class A', unit: '1000s', ordered: 480, delivered: 312, pending: 168, leadTime: '1 week', pricePerUnit: 1500, supplier: 'Forterra' },
  { name: 'M&E Ductwork', unit: 'bundles', ordered: 180, delivered: 132, pending: 48, leadTime: '3 weeks', pricePerUnit: 5580, supplier: 'Clearwater M&E' },
]

const statusConfig = {
  'On Time': { color: 'text-emerald-600', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700' },
  'Delayed': { color: 'text-red-600', bg: 'bg-red-50', badge: 'bg-red-100 text-red-700' },
  'Early': { color: 'text-blue-600', bg: 'bg-blue-50', badge: 'bg-blue-100 text-blue-700' },
  'Expected': { color: 'text-amber-600', bg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-700' },
}

export default function SupplyChain() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = deliveries.filter(d => {
    const matchSearch = d.item.toLowerCase().includes(search.toLowerCase()) || d.supplier.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || d.status === statusFilter
    return matchSearch && matchStatus
  })

  const delayedCount = deliveries.filter(d => d.status === 'Delayed').length
  const expectedCount = deliveries.filter(d => d.status === 'Expected').length
  const totalValue = deliveries.reduce((s, d) => s + parseFloat(d.value.replace('£','').replace(',','')), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold">Supply Chain</h1>
          <p className="text-slate-500 text-sm">Material tracking · Delivery management · Lead times</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <RefreshCw size={15} /> Sync Portal
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
            <Plus size={15} /> Log Delivery
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Active Suppliers', value: '6', icon: Truck, color: 'text-slate-800', bg: 'bg-slate-50' },
          { label: 'Expected Deliveries', value: expectedCount, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Delayed Deliveries', value: delayedCount, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Total Order Value', value: `£${(totalValue / 1000).toFixed(0)}K`, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
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
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search materials or supplier..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400" />
        </div>
        {['All', 'On Time', 'Delayed', 'Expected', 'Early'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === s ? 'bg-orange-500 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-orange-300'
            }`}>{s}</button>
        ))}
      </div>

      {/* Delivery Schedule */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-slate-800 font-semibold">Upcoming Deliveries</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-500 text-xs uppercase">
              <th className="text-left px-5 py-3 font-semibold">Material</th>
              <th className="text-left px-4 py-3 font-semibold">Supplier</th>
              <th className="text-left px-4 py-3 font-semibold">Project</th>
              <th className="text-left px-4 py-3 font-semibold">Qty</th>
              <th className="text-left px-4 py-3 font-semibold">Value</th>
              <th className="text-left px-4 py-3 font-semibold">Expected</th>
              <th className="text-left px-4 py-3 font-semibold">Actual</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-left px-4 py-3 font-semibold">Priority</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => {
              const s = statusConfig[d.status]
              return (
                <tr key={d.id} className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Package size={14} className="text-slate-400 flex-shrink-0" />
                      <div>
                        <p className="text-slate-800 font-medium text-sm">{d.item}</p>
                        <p className="text-slate-400 text-[10px]">{d.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 text-xs">{d.supplier}</td>
                  <td className="px-4 py-3.5 text-slate-600 text-xs">{d.project}</td>
                  <td className="px-4 py-3.5 text-slate-600 text-xs">{d.qty}</td>
                  <td className="px-4 py-3.5 text-slate-700 font-semibold text-xs">{d.value}</td>
                  <td className="px-4 py-3.5 text-slate-500 text-xs">{d.expected}</td>
                  <td className="px-4 py-3.5 text-slate-500 text-xs">{d.actual}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${s.badge}`}>{d.status}</span>
                      {d.delay > 0 && <span className="text-red-400 text-[10px]">+{d.delay}d</span>}
                      {d.delay < 0 && <span className="text-blue-400 text-[10px]">{d.delay}d</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      d.priority === 'Critical' ? 'bg-red-100 text-red-600' :
                      d.priority === 'High' ? 'bg-amber-100 text-amber-600' :
                      d.priority === 'Medium' ? 'bg-blue-100 text-blue-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>{d.priority}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Material Tracker */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-5">
        <h3 className="text-slate-800 font-semibold mb-4">Material Delivery Tracker</h3>
        <div className="space-y-4">
          {materials.map(m => {
            const pct = Math.round((m.delivered / m.ordered) * 100)
            return (
              <div key={m.name} className="border border-slate-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-slate-800 text-sm font-semibold">{m.name}</p>
                    <p className="text-slate-400 text-[10px]">{m.supplier} · {m.leadTime} lead time</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-700 text-sm font-bold">{m.delivered}/{m.ordered} {m.unit}</p>
                    <p className="text-slate-400 text-[10px]">£{(m.pricePerUnit * m.ordered / 1000).toFixed(0)}K total</p>
                  </div>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: `${pct}%` }} />
                  <div className="bg-amber-400 h-full" style={{ width: `${100 - pct}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>{pct}% delivered</span>
                  <span>{m.ordered - m.delivered} {m.unit} pending</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lead Time Warnings */}
      {delayedCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-red-600" />
            <h3 className="text-red-800 font-semibold text-sm">Delivery Delay Alert</h3>
          </div>
          <p className="text-red-700 text-xs mb-3">{delayedCount} deliveries delayed. Critical path impact on Manchester Metro Hub and Leeds Green Park.</p>
          <div className="flex gap-2">
            {deliveries.filter(d => d.status === 'Delayed').map(d => (
              <span key={d.id} className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-lg border border-red-200">
                {d.project}: +{d.delay} days ({d.item.split(' — ')[0]})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
