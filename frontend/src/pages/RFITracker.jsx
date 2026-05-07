import { useState } from 'react'
import {
  FileText, Plus, Search, Filter, Clock, AlertCircle,
  CheckCircle2, ChevronDown, ChevronRight, Send, User,
  Building2, MessageSquare, Calendar, ArrowRight
} from 'lucide-react'

const rfis = [
  {
    id: 'RFI-001',
    number: 34,
    subject: 'Structural Steel Connection Detail — Bay 7-9',
    project: 'Manchester Metro Hub',
    sentTo: 'Buro Happold',
    sentDate: '18 Apr 2026',
    dueDate: '25 Apr 2026',
    status: 'Closed',
    priority: 'High',
    trade: 'Structural',
    daysOpen: 7,
    responseDate: '24 Apr 2026',
    assignee: 'James Whitfield',
    costImpact: '£0',
    description: 'Request for approval of alternate beam-to-column connection detail at grid lines 7-9, Level 3. Original detail conflicts with M&E service route through slab.',
    response: 'Alternate connection detail approved. Engineer to issue revised detail RFI-34-A. Hilti post-installed anchors accepted for this application.',
    attachments: 2,
  },
  {
    id: 'RFI-002',
    number: 35,
    subject: 'M&E Coordination Clash — Floor 5 M&E Above Ceiling',
    project: 'Battersea Phase 2',
    sentTo: 'Mott MacDonald',
    sentDate: '20 Apr 2026',
    dueDate: '27 Apr 2026',
    status: 'Closed',
    priority: 'Medium',
    trade: 'M&E',
    daysOpen: 5,
    responseDate: '25 Apr 2026',
    assignee: 'Tom Mitchell',
    costImpact: '£4,200',
    description: 'HVACT ductwork at grid F/5 conflicts with structural beam soffit. 150mm clearance required, currently 80mm. Coordination meeting held 19 Apr.',
    response: 'Duct routing revised. Reduced duct height from 400mm to 300mm with volume boosters to maintain air flow. Approved by all parties.',
    attachments: 4,
  },
  {
    id: 'RFI-003',
    number: 36,
    subject: 'Cladding Anchor Spacing — Revised Wind Loads',
    project: 'Manchester Metro Hub',
    sentTo: 'Buro Happold',
    sentDate: '22 Apr 2026',
    dueDate: '29 Apr 2026',
    status: 'Open',
    priority: 'High',
    trade: 'Cladding',
    daysOpen: 3,
    responseDate: null,
    assignee: 'Sarah Collins',
    costImpact: 'TBC',
    description: 'Wind load calculations revised following CFD analysis. New anchor spacing required: 450mm max vs original 600mm. Impact on programme and cost to be confirmed.',
    attachments: 3,
  },
  {
    id: 'RFI-004',
    number: 37,
    subject: 'Brickwork Specification — Leeds Site',
    project: 'Leeds Green Park',
    sentTo: 'Arup & Partners',
    sentDate: '23 Apr 2026',
    dueDate: '30 Apr 2026',
    status: 'Open',
    priority: 'Medium',
    trade: 'Brickwork',
    daysOpen: 2,
    responseDate: null,
    assignee: 'Priya Sharma',
    costImpact: '£0',
    description: 'Local brick from Forterra specified. Colour match to sample approved by client. Request formal approval and updated specification sheet.',
    attachments: 5,
  },
  {
    id: 'RFI-005',
    number: 38,
    subject: 'Fire Damper Requirements — Ventilation System',
    project: 'Birmingham Central Plaza',
    sentTo: 'Mott MacDonald',
    sentDate: '24 Apr 2026',
    dueDate: '01 May 2026',
    status: 'Open',
    priority: 'Critical',
    trade: 'M&E',
    daysOpen: 1,
    responseDate: null,
    assignee: 'Rachel Okafor',
    costImpact: '£18,000',
    description: 'Building regs require fire dampers at all floor penetrations. M&E proposal uses intumescent grilles instead. Need structural engineer approval for structural implications.',
    attachments: 2,
  },
  {
    id: 'RFI-006',
    number: 39,
    subject: 'Foundation Design Change — Unexpected Ground Conditions',
    project: 'Leeds Green Park',
    sentTo: 'Buro Happold',
    sentDate: '25 Apr 2026',
    dueDate: '02 May 2026',
    status: 'Open',
    priority: 'Critical',
    trade: 'Geotechnical',
    daysOpen: 0,
    responseDate: null,
    assignee: 'Priya Sharma',
    costImpact: '£85,000',
    description: 'UXO survey revealed underground obstruction at Grid G/12. Proposed solution: redesigned pad foundation with ground beam bypass. Programme impact 5 days.',
    attachments: 6,
  },
  {
    id: 'RFI-007',
    number: 33,
    subject: 'Scaffold Loading Bay — Vehicle Access',
    project: 'Bristol Harbour Bridge',
    sentTo: 'Apex Scaffolding',
    sentDate: '10 Apr 2026',
    dueDate: '17 Apr 2026',
    status: 'Closed',
    priority: 'Low',
    trade: 'Scaffolding',
    daysOpen: 6,
    responseDate: '16 Apr 2026',
    assignee: 'James Whitfield',
    costImpact: '£0',
    description: 'Clarification on max loading for scaffold loading bay at ground level. Need to accommodate concrete wagon access.',
    response: 'Loading bay designed for 44T concrete wagon. Additional scaffold bearer required. Apex to issue revised design by 16 April.',
    attachments: 1,
  },
  {
    id: 'RFI-008',
    number: 40,
    subject: 'Glazing Specification — Triple Glazed Units',
    project: 'Newcastle Innovation Centre',
    sentTo: 'Safestyle UK',
    sentDate: '26 Apr 2026',
    dueDate: '03 May 2026',
    status: 'Open',
    priority: 'Low',
    trade: 'Glazing',
    daysOpen: 0,
    responseDate: null,
    assignee: 'Alex Thornton',
    costImpact: '£0',
    description: 'Confirmation required on triple glazing specification. U-value 0.8W/m2K required, quoted unit is 0.7W/m2K. Client spec compliance question.',
    attachments: 2,
  },
]

const projects = ['All Projects', 'Manchester Metro Hub', 'Battersea Phase 2', 'Leeds Green Park', 'Birmingham Central Plaza', 'Bristol Harbour Bridge', 'Newcastle Innovation Centre']
const trades = ['All Trades', 'Structural', 'M&E', 'Cladding', 'Brickwork', 'Geotechnical', 'Scaffolding', 'Glazing']
const statuses = ['All', 'Open', 'Closed']
const priorityColors = { Critical: 'bg-red-100 text-red-700', High: 'bg-amber-100 text-amber-700', Medium: 'bg-blue-100 text-blue-700', Low: 'bg-slate-100 text-slate-600' }
const statusColors = { Open: 'bg-amber-50 border-amber-300', Closed: 'bg-emerald-50 border-emerald-300' }
const tradeIcons = { Structural: '🔩', 'M&E': '⚡', Cladding: '🧱', Brickwork: '🧱', Geotechnical: '🪨', Scaffolding: '🏗️', Glazing: '🪟' }

export default function RFITracker() {
  const [projFilter, setProjFilter] = useState('All Projects')
  const [tradeFilter, setTradeFilter] = useState('All Trades')
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [showNew, setShowNew] = useState(false)

  const filtered = rfis.filter(r => {
    const matchProj = projFilter === 'All Projects' || r.project === projFilter
    const matchTrade = tradeFilter === 'All Trades' || r.trade === tradeFilter
    const matchStatus = statusFilter === 'All' || r.status === statusFilter
    const matchSearch = r.subject.toLowerCase().includes(search.toLowerCase()) || r.number.toString().includes(search)
    return matchProj && matchTrade && matchStatus && matchSearch
  })

  const openCount = rfis.filter(r => r.status === 'Open').length
  const overdueCount = rfis.filter(r => r.status === 'Open' && r.daysOpen > 5).length
  const totalCost = rfis.filter(r => r.status === 'Open').reduce((s, r) => s + (r.costImpact !== '£0' && r.costImpact !== 'TBC' ? parseFloat(r.costImpact.replace('£','').replace(',','')) : 0), 0)
  const closedCount = rfis.filter(r => r.status === 'Closed').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold">RFI Tracker</h1>
          <p className="text-slate-500 text-sm">{rfis.length} total · {openCount} open · {overdueCount} overdue</p>
        </div>
        <button onClick={() => setShowNew(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
          <Plus size={16} /> New RFI
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Open RFIs', value: openCount, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
          { label: 'Closed RFIs', value: closedCount, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          { label: 'Overdue (5+ days)', value: overdueCount, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
          { label: 'Open Cost Impact', value: totalCost > 0 ? `£${(totalCost/1000).toFixed(0)}K` : '£0', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
          { label: 'Avg Days to Close', value: Math.round(rfis.filter(r => r.status === 'Closed').reduce((s, r) => s + r.daysOpen, 0) / closedCount), color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} ${s.border} rounded-xl p-4 border`}>
            <p className="text-slate-500 text-xs">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 bg-white rounded-xl p-4 border border-orange-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by subject or RFI number..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400" />
          </div>
          <select value={projFilter} onChange={e => setProjFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400">
            {projects.map(p => <option key={p}>{p}</option>)}
          </select>
          <select value={tradeFilter} onChange={e => setTradeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400">
            {trades.map(t => <option key={t}>{t}</option>)}
          </select>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {statuses.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  statusFilter === s ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500'
                }`}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* RFI List */}
      <div className="space-y-3">
        {filtered.map(rfi => {
          const isOpen = rfi.status === 'Open'
          const isOverdue = isOpen && rfi.daysOpen > 5
          return (
            <div key={rfi.id} className={`bg-white rounded-xl border ${isOpen ? isOverdue ? 'border-red-300 bg-red-50/30' : 'border-amber-200' : 'border-emerald-200'} shadow-sm overflow-hidden transition-all`}>
              {/* Header */}
              <div className="p-5 cursor-pointer" onClick={() => setExpanded(expanded === rfi.id ? null : rfi.id)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${
                      isOpen ? isOverdue ? 'bg-red-100' : 'bg-amber-100' : 'bg-emerald-100'
                    }`}>
                      {tradeIcons[rfi.trade]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-xs font-mono">#{rfi.number}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${priorityColors[rfi.priority]}`}>{rfi.priority}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          isOpen ? isOverdue ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {isOpen ? isOverdue ? 'OVERDUE' : 'OPEN' : 'CLOSED'}
                        </span>
                      </div>
                      <p className="text-slate-800 text-sm font-semibold mt-1">{rfi.subject}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{rfi.project} · {rfi.trade} trade</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="flex items-center gap-1 text-slate-400 text-xs mb-1">
                      <Clock size={11} />
                      <span>{rfi.daysOpen}d {isOpen ? 'open' : 'to close'}</span>
                    </div>
                    <div className="text-slate-500 text-xs">Due: {rfi.dueDate}</div>
                    {rfi.costImpact !== '£0' && (
                      <span className={`text-xs font-semibold ${rfi.costImpact === 'TBC' ? 'text-amber-500' : 'text-red-500'}`}>
                        {rfi.costImpact}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded */}
              {expanded === rfi.id && (
                <div className="border-t border-slate-100 bg-slate-50 p-5 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">RFI Details</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2"><span className="text-slate-400 w-28 flex-shrink-0">Sent to:</span><span className="text-slate-700">{rfi.sentTo}</span></div>
                      <div className="flex gap-2"><span className="text-slate-400 w-28 flex-shrink-0">Sent date:</span><span className="text-slate-700">{rfi.sentDate}</span></div>
                      <div className="flex gap-2"><span className="text-slate-400 w-28 flex-shrink-0">Due date:</span><span className={`${isOverdue ? 'text-red-600 font-semibold' : 'text-slate-700'}`}>{rfi.dueDate}</span></div>
                      <div className="flex gap-2"><span className="text-slate-400 w-28 flex-shrink-0">Assignee:</span><span className="text-slate-700">{rfi.assignee}</span></div>
                      <div className="flex gap-2"><span className="text-slate-400 w-28 flex-shrink-0">Cost impact:</span><span className={`font-semibold ${rfi.costImpact === '£0' ? 'text-emerald-600' : 'text-red-500'}`}>{rfi.costImpact}</span></div>
                      <div className="flex gap-2"><span className="text-slate-400 w-28 flex-shrink-0">Attachments:</span><span className="text-slate-700">{rfi.attachments} files</span></div>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Description</p>
                      <p className="text-slate-700 text-sm leading-relaxed bg-white rounded-lg p-3 border border-slate-200">{rfi.description}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Response</p>
                    {rfi.status === 'Closed' ? (
                      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 size={16} className="text-emerald-600" />
                          <span className="text-emerald-700 text-xs font-bold">Response received {rfi.responseDate}</span>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">{rfi.response}</p>
                        <div className="mt-3 flex gap-2">
                          <button className="px-3 py-1.5 bg-white border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-colors">Download Response</button>
                          <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors">View Attachments</button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle size={16} className="text-amber-600" />
                          <span className="text-amber-700 text-xs font-bold">Awaiting response</span>
                          <span className="ml-auto text-amber-600 text-xs">{rfi.daysOpen} days</span>
                        </div>
                        <p className="text-amber-700 text-xs mb-3">Follow up with {rfi.sentTo} to chase response before due date.</p>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 bg-amber-100 border border-amber-200 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-1">
                            <Send size={11} /> Chase {rfi.sentTo}
                          </button>
                          <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors">Log Communication</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-orange-200">
          <FileText size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500">No RFIs match your filters</p>
        </div>
      )}
    </div>
  )
}
