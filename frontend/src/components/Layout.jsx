import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, GitBranch, Wallet, Users,
  ShieldCheck, FileText, BotMessageSquare, Bell, Search,
  ChevronDown, Menu, X, LogOut, Settings, AlertTriangle,
  Camera, Truck, FileSpreadsheet, ClipboardList
} from 'lucide-react'
import useAuthStore from '../store/authStore'

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: Building2 },
  { to: '/gantt', label: 'Programme', icon: GitBranch },
  { to: '/budget', label: 'Budget', icon: Wallet },
  { to: '/resources', label: 'Resources', icon: Users },
  { to: '/health-safety', label: 'Health & Safety', icon: ShieldCheck },
  { to: '/subcontractors', label: 'Subcontractors', icon: Users },
  { to: '/supply-chain', label: 'Supply Chain', icon: Truck },
  { to: '/risk-register', label: 'Risk Register', icon: AlertTriangle },
  { to: '/rfi-tracker', label: 'RFI Tracker', icon: FileSpreadsheet },
  { to: '/daily-logs', label: 'Daily Logs', icon: ClipboardList },
  { to: '/site-photos', label: 'Site Photos', icon: Camera },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/ai-assistant', label: 'AI Assistant', icon: BotMessageSquare },
]

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    navigate('/signin')
  }

  const initials = user?.initials || (user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U')
  const displayName = user?.name || 'User'

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 flex flex-col transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow flex-shrink-0">
            <span className="text-white font-black text-sm">RSW</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">RainStreamWeb</p>
            <p className="text-slate-400 text-[10px]">Construction Portal</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Live Status */}
        <div className="mx-4 mt-3 mb-1 px-3 py-2 bg-green-900/40 border border-green-700/50 rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
          <span className="text-green-300 text-[11px] font-medium">6 Active Projects</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {NAV.map(item => {
            const Icon = item.icon
            const active = item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to)
            return (
              <Link key={item.to} to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Icon size={17} className={active ? 'text-white' : 'text-slate-500'} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-slate-700 p-3 space-y-1">
          <Link to="/settings"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              location.pathname.startsWith('/settings')
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Settings size={17} className={location.pathname.startsWith('/settings') ? 'text-white' : 'text-slate-500'} />
            Settings
          </Link>
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-all"
          >
            <LogOut size={17} className="text-slate-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-700">
              <Menu size={20} />
            </button>
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects, documents..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400 w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">3</span>
            </button>
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">{initials}</div>
                <span className="hidden sm:block text-slate-700 text-sm font-medium">{displayName}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-50">
                  <Link to="/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Settings size={14} /> Settings
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
