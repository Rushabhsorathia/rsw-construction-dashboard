import { useState } from 'react'
import {
  FileText, Upload, Download, Search, Filter, FolderOpen,
  RefreshCw, ExternalLink, Eye, Clock, User, MoreHorizontal,
  FileArchive, FileCode, FileSpreadsheet, Image, ChevronDown,
  CheckCircle2, AlertCircle, Cloud
} from 'lucide-react'

const documents = [
  { id: 1, name: 'Architectural Drawing Rev. 4.2', type: 'DWG', updated: '26 Apr 2026', size: '14.2 MB', by: 'Arup & Partners', status: 'Current', project: 'Battersea Phase 2', category: 'Drawings', downloads: 24, version: '4.2', approved: true },
  { id: 2, name: 'M&E Coordination Drawing', type: 'PDF', updated: '25 Apr 2026', size: '8.7 MB', by: 'Mott MacDonald', status: 'Current', project: 'Battersea Phase 2', category: 'M&E', downloads: 18, version: '2.1', approved: true },
  { id: 3, name: 'Structural Steel RFI #34 — Response', type: 'PDF', updated: '24 Apr 2026', size: '1.3 MB', by: 'Buro Happold', status: 'Pending Review', project: 'Manchester Metro Hub', category: 'RFI', downloads: 7, version: '1.0', approved: false },
  { id: 4, name: 'Programme Update — Week 17', type: 'XLSX', updated: '23 Apr 2026', size: '2.1 MB', by: 'Project Team', status: 'Current', project: 'All Projects', category: 'Programme', downloads: 45, version: '17', approved: true },
  { id: 5, name: 'CDM Pre-Construction Info Pack', type: 'PDF', updated: '22 Apr 2026', size: '22.4 MB', by: 'SafetyFirst Consultancy', status: 'Current', project: 'All Projects', category: 'H&S', downloads: 12, version: '3.0', approved: true },
  { id: 6, name: 'Golden Thread Log — BS Act', type: 'JSON', updated: '26 Apr 2026', size: '4.8 MB', by: 'Auto-sync', status: 'Current', project: 'Battersea Phase 2', category: 'Compliance', downloads: 31, version: '2.4', approved: true },
  { id: 7, name: 'Bill of Quantities — Rev 3', type: 'XLSX', updated: '20 Apr 2026', size: '18.6 MB', by: 'Turner & Townsend', status: 'Pending Review', project: 'Manchester Metro Hub', category: 'Commercial', downloads: 9, version: '3.0', approved: false },
  { id: 8, name: '3D BIM Model — Coordinated', type: 'IFC', updated: '25 Apr 2026', size: '248.0 MB', by: 'Arup & Partners', status: 'Current', project: 'Birmingham Central Plaza', category: 'BIM', downloads: 8, version: '5.3', approved: true },
  { id: 9, name: 'Piling Method Statement', type: 'PDF', updated: '19 Apr 2026', size: '3.4 MB', by: 'Buro Happold', status: 'Current', project: 'Bristol Harbour Bridge', category: 'Method Statements', downloads: 14, version: '2.0', approved: true },
  { id: 10, name: 'Fire Risk Assessment', type: 'PDF', updated: '18 Apr 2026', size: '5.2 MB', by: 'SafetyFirst Consultancy', status: 'Current', project: 'Leeds Green Park', category: 'H&S', downloads: 6, version: '1.0', approved: true },
  { id: 11, name: 'Site Investigation Report', type: 'PDF', updated: '17 Apr 2026', size: '31.0 MB', by: 'WSP UK', status: 'Archived', project: 'Newcastle Innovation Centre', category: 'Reports', downloads: 3, version: '1.0', approved: true },
  { id: 12, name: 'Labour Schedule — Week 17', type: 'XLSX', updated: '23 Apr 2026', size: '1.1 MB', by: 'Project Team', status: 'Current', project: 'All Projects', category: 'Commercial', downloads: 22, version: '17', approved: true },
]

const versionHistory = [
  { doc: 'Architectural Drawing Rev. 4.2', versions: [
    { v: '4.2', date: '26 Apr 2026', by: 'Arup & Partners', changes: 'Updated window schedules Floor 8-12, revised curtain wall detail' },
    { v: '4.1', date: '18 Apr 2026', by: 'Arup & Partners', changes: 'M&E coordination changes, revised slab penetrations' },
    { v: '4.0', date: '10 Apr 2026', by: 'Arup & Partners', changes: 'Planning condition discharge, updated elevations' },
    { v: '3.0', date: '02 Mar 2026', by: 'Arup & Partners', changes: 'Full revision post-tender value engineering' },
  ]},
  { doc: 'Programme Update — Week 17', versions: [
    { v: '17', date: '23 Apr 2026', by: 'Project Team', changes: 'Week 17 update — cladding start brought forward 3 days' },
    { v: '16', date: '16 Apr 2026', by: 'Project Team', changes: 'Week 16 update — steel delivery delayed, float consumed' },
    { v: '15', date: '09 Apr 2026', by: 'Project Team', changes: 'Week 15 update — UXO delay incorporated, EOT claimed' },
  ]},
]

const typeIcons = {
  PDF: { icon: FileText, color: 'text-red-500', bg: 'bg-red-50' },
  DWG: { icon: FileCode, color: 'text-blue-500', bg: 'bg-blue-50' },
  XLSX: { icon: FileSpreadsheet, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  IFC: { icon: Image, color: 'text-purple-500', bg: 'bg-purple-50' },
  JSON: { icon: FileArchive, color: 'text-amber-500', bg: 'bg-amber-50' },
}

const categories = ['All', 'Drawings', 'M&E', 'RFI', 'Programme', 'H&S', 'Compliance', 'BIM', 'Method Statements', 'Commercial', 'Reports']
const projects = ['All Projects', 'Battersea Phase 2', 'Manchester Metro Hub', 'Bristol Harbour Bridge', 'Leeds Green Park', 'Birmingham Central Plaza', 'Newcastle Innovation Centre']

export default function Documents() {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [projFilter, setProjFilter] = useState('All Projects')
  const [statusFilter, setStatusFilter] = useState('All')
  const [expandedVersions, setExpandedVersions] = useState(null)

  const filtered = documents.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'All' || d.category === catFilter
    const matchProj = projFilter === 'All Projects' || d.project === projFilter
    const matchStatus = statusFilter === 'All' || d.status === statusFilter
    return matchSearch && matchCat && matchProj && matchStatus
  })

  const totalDocs = documents.length
  const totalSize = documents.reduce((s, d) => s + parseFloat(d.size), 0)
  const pendingReview = documents.filter(d => d.status === 'Pending Review').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold">Documents</h1>
          <p className="text-slate-500 text-sm">{totalDocs} documents · {totalSize} GB stored · BIM model linked</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <RefreshCw size={14} /> BIM Sync
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <Download size={14} /> Export
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
            <Upload size={14} /> Upload
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Total Documents', value: totalDocs, color: 'text-slate-800', bg: 'bg-slate-50' },
          { label: 'Total Storage', value: `${totalSize} GB`, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Review', value: pendingReview, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Open RFIs', value: 18, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'BIM Model', value: 'Linked', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-slate-200`}>
            <p className="text-slate-500 text-xs">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* BIM Sync Status */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Cloud size={18} className="text-purple-600" />
          </div>
          <div>
            <p className="text-slate-800 text-sm font-bold">BIM Coordination Model — Connected</p>
            <p className="text-slate-500 text-xs">Last sync: 26 Apr 2026, 14:32 · 3 coordination clashes detected</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-lg border border-purple-200 hover:bg-purple-200 transition-colors">
            View Clashes
          </button>
          <button className="px-3 py-1.5 bg-white text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
            Re-sync
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 bg-white rounded-xl p-4 border border-orange-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400" />
          </div>
          <select value={projFilter} onChange={e => setProjFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400">
            {projects.map(p => <option key={p}>{p}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400">
            <option>All Status</option>
            <option>Current</option>
            <option>Pending Review</option>
            <option>Archived</option>
          </select>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                catFilter === c ? 'bg-orange-500 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-orange-300'
              }`}>{c}</button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-500 text-xs uppercase">
              <th className="text-left px-5 py-3 font-semibold">Document</th>
              <th className="text-left px-4 py-3 font-semibold">Project</th>
              <th className="text-left px-4 py-3 font-semibold">Category</th>
              <th className="text-left px-4 py-3 font-semibold">Version</th>
              <th className="text-left px-4 py-3 font-semibold">Updated</th>
              <th className="text-left px-4 py-3 font-semibold">Size</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-left px-4 py-3 font-semibold">Downloads</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => {
              const type = typeIcons[d.type] || typeIcons.PDF
              const TypeIcon = type.icon
              return (
                <>
                  <tr key={d.id} className={`border-t border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}
                    onClick={() => setExpandedVersions(expandedVersions === d.id ? null : d.id)}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${type.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <TypeIcon size={15} className={type.color} />
                        </div>
                        <div>
                          <p className="text-slate-800 font-medium text-sm">{d.name}</p>
                          <p className="text-slate-400 text-[10px]">by {d.by}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 text-xs">{d.project}</td>
                    <td className="px-4 py-3.5"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">{d.category}</span></td>
                    <td className="px-4 py-3.5"><span className="text-slate-500 text-xs font-mono">v{d.version}</span></td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs">{d.updated}</td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs">{d.size}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 w-fit ${
                        d.status === 'Current' ? 'bg-emerald-100 text-emerald-700' :
                        d.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {d.status === 'Current' && <CheckCircle2 size={10} />}
                        {d.status === 'Pending Review' && <AlertCircle size={10} />}
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs">{d.downloads}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View">
                          <Eye size={13} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors" title="Download">
                          <Download size={13} />
                        </button>
                        <ChevronDown size={13} className={`text-slate-400 transition-transform ${expandedVersions === d.id ? 'rotate-180' : ''}`} />
                      </div>
                    </td>
                  </tr>
                  {expandedVersions === d.id && (
                    <tr className="bg-blue-50/50 border-t border-blue-100">
                      <td colSpan={9} className="px-5 py-4">
                        <p className="text-xs font-bold text-slate-600 mb-3 uppercase tracking-wide">Version History — {d.name}</p>
                        <div className="space-y-2">
                          {versionHistory.find(h => h.doc === d.name)?.versions.map(v => (
                            <div key={v.v} className="flex items-start gap-4 p-3 bg-white rounded-lg border border-blue-100">
                              <div className="w-16 flex-shrink-0 text-center">
                                <span className="text-xs font-mono font-bold text-blue-600">v{v.v}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-slate-700 text-xs font-semibold">{v.by}</span>
                                  <span className="text-slate-400 text-[10px]">{v.date}</span>
                                </div>
                                <p className="text-slate-600 text-xs">{v.changes}</p>
                              </div>
                              <button className="text-blue-500 hover:text-blue-700 text-xs font-semibold flex-shrink-0">
                                <Download size={12} className="inline mr-1" />Download this version
                              </button>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
