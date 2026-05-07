import { useState, useEffect } from 'react'
import {
  Camera, Upload, Download, Calendar, Filter, Search,
  ChevronLeft, ChevronRight, Maximize2, MapPin, Clock, Image, Loader2
} from 'lucide-react'
import useAppStore from '../store/appStore'

const categories = ['All', 'Progress', 'Construction', 'M&E', 'Cladding', 'Technical', 'Welfare', 'Site Setup']
const projects = ['All Projects', 'Battersea Phase 2', 'Manchester Metro Hub', 'Bristol Harbour Bridge', 'Leeds Green Park', 'Birmingham Central Plaza', 'Newcastle Innovation Centre']

export default function SitePhotos() {
  const { sitePhotos, sitePhotosLoading, fetchSitePhotos } = useAppStore()
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [projFilter, setProjFilter] = useState('All Projects')
  const [gallery, setGallery] = useState(null)

  useEffect(() => {
    fetchSitePhotos()
  }, [fetchSitePhotos])

  const photos = sitePhotos || []

  const filtered = photos.filter(p => {
    const matchSearch = p.location.toLowerCase().includes(search.toLowerCase()) || p.project.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'All' || p.category === catFilter
    const matchProj = projFilter === 'All Projects' || p.project === projFilter
    return matchSearch && matchCat && matchProj
  })

  if (sitePhotosLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-orange-500" />
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-800 text-2xl font-bold">Site Photography</h1>
            <p className="text-slate-500 text-sm">Photo management across projects</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
              <Download size={15} /> Export All
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
              <Upload size={15} /> Upload Photos
            </button>
          </div>
        </div>
        <div className="text-center py-16 bg-white rounded-xl border border-orange-200 shadow-sm">
          <Camera size={48} className="mx-auto text-slate-300 mb-4" />
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
          <h1 className="text-slate-800 text-2xl font-bold">Site Photography</h1>
          <p className="text-slate-500 text-sm">{photos.length} photos across 6 projects</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <Download size={15} /> Export All
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
            <Upload size={15} /> Upload Photos
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Photos', value: photos.length, color: 'text-slate-800' },
          { label: 'This Week', value: photos.filter(p => p.date >= '20 Apr 2026').length, color: 'text-orange-500' },
          { label: 'Most Viewed', value: 'Bristol Tower', color: 'text-blue-600' },
          { label: 'Storage Used', value: '2.4 GB', color: 'text-slate-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-orange-200 shadow-sm">
            <p className="text-slate-400 text-xs">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 bg-white rounded-xl p-4 border border-orange-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by location or project..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400" />
          </div>
          <select value={projFilter} onChange={e => setProjFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400">
            {projects.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                catFilter === c ? 'bg-orange-500 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-orange-300'
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <div key={p.id} className="group relative bg-white rounded-xl border border-orange-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="aspect-video bg-slate-100 relative overflow-hidden">
              <img src={p.url} alt={p.location} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <button onClick={() => setGallery(i)} className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-lg px-3 py-1.5 text-slate-700 text-xs font-semibold flex items-center gap-1">
                  <Maximize2 size={12} /> View
                </button>
              </div>
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] font-semibold rounded">{p.category}</span>
            </div>
            <div className="p-3">
              <p className="text-slate-800 text-sm font-semibold truncate">{p.location}</p>
              <p className="text-slate-400 text-xs mt-0.5">{p.project}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-slate-400 text-[10px]">
                  <span className="flex items-center gap-0.5"><Calendar size={10} />{p.date}</span>
                  <span className="flex items-center gap-0.5"><Image size={10} />{p.views}</span>
                </div>
                <span className="text-slate-400 text-[10px]">by {p.author.split(' ')[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && photos.length > 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-orange-200">
          <Camera size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500">No photos match your filters</p>
        </div>
      )}

      {/* Gallery Modal */}
      {gallery !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setGallery(null)}>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-light" onClick={() => setGallery(null)}>x</button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl" onClick={e => { e.stopPropagation(); setGallery(Math.max(0, gallery - 1)) }}>
            <ChevronLeft size={36} />
          </button>
          <img src={filtered[gallery]?.url} alt={filtered[gallery]?.location} className="max-w-4xl max-h-[80vh] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl" onClick={e => { e.stopPropagation(); setGallery(Math.min(filtered.length - 1, gallery + 1)) }}>
            <ChevronRight size={36} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="text-sm font-semibold">{filtered[gallery]?.location}</p>
            <p className="text-xs text-white/60">{filtered[gallery]?.project} · {filtered[gallery]?.date}</p>
          </div>
        </div>
      )}
    </div>
  )
}
