import { useState, useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import { z } from 'zod'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  BotMessageSquare, Send, RefreshCw, MessageSquare,
  BrainCircuit, Trash2, Plus, ChevronRight, AlertTriangle,
  TrendingUp, Shield, Users, DollarSign, Clock, AlertCircle,
  CheckCircle2, Target, Lightbulb, BarChart3
} from 'lucide-react'
import useAppStore from '../store/appStore'

const API_BASE = 'http://138.252.201.18:7997'

const CATEGORIES = [
  { label: 'Project Intelligence', icon: TrendingUp, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50 border-orange-200', text: 'text-orange-600' },
  { label: 'Health & Safety', icon: Shield, color: 'from-red-500 to-red-600', bg: 'bg-red-50 border-red-200', text: 'text-red-600' },
  { label: 'Resources & Labour', icon: Users, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-600' },
  { label: 'Commercial & Contracts', icon: DollarSign, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-600' },
  { label: 'Market Intelligence', icon: BrainCircuit, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50 border-purple-200', text: 'text-purple-600' },
]

const PRESETS = [
  { label: 'Schedule Analysis', category: 'Project Intelligence', icon: TrendingUp, prompt: 'Our SPI dropped to 0.91 on the Manchester Metro Hub project. 14 critical path tasks, 2 at risk. Identify root causes and suggest recovery measures.' },
  { label: 'Cost Forecasting', category: 'Project Intelligence', icon: DollarSign, prompt: 'Material inflation running 8% above budget on Bristol Harbour Bridge. £12.8M project, CPI at 1.04. What cost control measures should we implement?' },
  { label: 'Delay Analysis', category: 'Project Intelligence', icon: Clock, prompt: 'Leeds Green Park is 412 days behind schedule with SPI at 0.85. Groundworks phase taking twice as long. Provide a recovery schedule analysis.' },
  { label: 'Risk Register', category: 'Project Intelligence', icon: AlertTriangle, prompt: 'Generate a risk register for a £38M mixed-use construction project in Manchester. Focus on supply chain, labour, and planning permission risks.' },
  { label: 'CDM Compliance Review', category: 'Health & Safety', icon: Shield, prompt: 'Audit our CDM 2015 compliance status. We have 6 active projects. What documents are typically missing for mid-size construction firms?' },
  { label: 'RIDDOR Analysis', category: 'Health & Safety', icon: AlertCircle, prompt: 'We had 1 RIDDOR incident and 12 near misses this month — 3x higher than usual at Leeds site. What immediate H&S interventions do you recommend?' },
  { label: 'Building Safety Act', category: 'Health & Safety', icon: CheckCircle2, prompt: 'Summarize the Golden Thread requirements under the Building Safety Act 2022. What digital records are mandatory for occupied buildings?' },
  { label: 'Labour Shortfall', category: 'Resources & Labour', icon: Users, prompt: 'Scaffolder utilisation is at 100% on Bristol Harbour Bridge. Lead time for steel fixers is now 4 weeks. What is the impact on our 48-day programme?' },
  { label: 'Contract Risk Review', category: 'Commercial & Contracts', icon: BarChart3, prompt: 'We are the main contractor on a £38M mixed-use project. What are the top 5 contract risks in a traditional JCT contract for the client?' },
  { label: 'Tender Review', category: 'Commercial & Contracts', icon: Target, prompt: 'We are bidding for a £9.7M commercial project in Newcastle. Labour £3.2M, materials £4.1M, prelims £800K, overheads 5%. Advise on markup strategy.' },
  { label: 'Market Opportunity', category: 'Market Intelligence', icon: Lightbulb, prompt: 'Based on UK construction market data: £170-185B output, 40-50% projects delayed, only 15-20% digitally mature. Where is RainStreamWeb\'s entry point?' },
]

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
})

export default function AIAssistant() {
  const aiMessages = useAppStore(s => s.aiMessages)
  const aiLoading = useAppStore(s => s.aiLoading)
  const sendAiChat = useAppStore(s => s.sendAiChat)
  const clearAiMessages = useAppStore(s => s.clearAiMessages)

  const [hermesStatus, setHermesStatus] = useState('checking')
  const [activeTab, setActiveTab] = useState('chat')
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].label)
  const chatEndRef = useRef(null)

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [aiMessages, aiLoading])

  // Health check
  useEffect(() => {
    checkHealth()
  }, [])

  const checkHealth = async () => {
    setHermesStatus('checking')
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(4000) })
      setHermesStatus(res.ok ? 'online' : 'error')
    } catch {
      setHermesStatus('offline')
    }
  }

  const handleNewChat = () => {
    clearAiMessages()
  }

  const runPreset = async (preset) => {
    await sendAiChat(preset.prompt)
  }

  const formik = useFormik({
    initialValues: { message: '' },
    validate: (values) => {
      const result = chatSchema.safeParse(values)
      if (result.success) return {}
      return Object.fromEntries(result.error.issues.map(i => [i.path.join('.'), i.message]))
    },
    onSubmit: (values, { resetForm }) => {
      sendAiChat(values.message)
      resetForm()
    },
  })

  const statusConfig = {
    online: { color: 'bg-green-500', text: 'Online', pulse: true },
    offline: { color: 'bg-slate-400', text: 'Offline', pulse: false },
    error: { color: 'bg-amber-500', text: 'Degraded', pulse: false },
    checking: { color: 'bg-blue-400', text: 'Connecting', pulse: false },
  }
  const status = statusConfig[hermesStatus]
  const currentCategoryPresets = PRESETS.filter(p => p.category === selectedCategory)

  return (
    <div className="flex gap-6 h-[calc(100vh-160px)]">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 flex flex-col gap-3">
        <button onClick={handleNewChat}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-xs font-bold shadow transition-all">
          <Plus size={14} /> New Conversation
        </button>

        <div className="flex-1 overflow-y-auto space-y-1">
          {aiMessages.length === 0 && (
            <p className="text-slate-400 text-xs text-center py-8">No messages yet.<br />Start a conversation.</p>
          )}
          {aiMessages.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
              <p className="text-orange-700 text-xs font-semibold">Active Conversation</p>
              <p className="text-orange-500 text-[10px] mt-0.5">{aiMessages.length} messages</p>
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow">
              <BotMessageSquare className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-slate-800 text-2xl font-bold">AI Assistant</h1>
              <p className="text-slate-500 text-sm">Hermes · UK Construction Intelligence</p>
            </div>
          </div>
          <button onClick={checkHealth} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-colors">
            <RefreshCw size={12} className={`text-slate-400 ${hermesStatus === 'checking' ? 'animate-spin' : ''}`} />
            <div className={`w-2 h-2 rounded-full ${status.color} ${status.pulse ? 'animate-pulse' : ''}`} />
            <span className="text-slate-600 text-xs font-medium">{status.text}</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
          {[
            { key: 'chat', label: 'Chat', icon: MessageSquare },
            { key: 'presets', label: 'AI Capabilities', icon: BrainCircuit },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.key ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}>
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'chat' && (
          <>
            {hermesStatus !== 'online' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
                <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 text-xs font-bold">Running in demo mode</p>
                  <p className="text-amber-600 text-xs">Connect Hermes on port 7997 for live AI responses.</p>
                </div>
              </div>
            )}

            <div className="flex-1 bg-white rounded-xl border border-orange-200 shadow flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {aiMessages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mx-auto mb-4">
                      <BotMessageSquare size={24} className="text-orange-500" />
                    </div>
                    <h3 className="text-slate-700 font-bold text-sm mb-1">Start a conversation</h3>
                    <p className="text-slate-400 text-xs">Ask about delays, H&S, labour, costs, CDM compliance...<br />Or use the AI Capabilities tab for quick prompts.</p>
                  </div>
                )}

                {aiMessages.map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {m.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <BotMessageSquare className="text-white" size={14} />
                      </div>
                    )}
                    <div className={`max-w-[82%] rounded-xl p-4 ${m.role === 'assistant' ? 'bg-slate-50 text-slate-700 border border-slate-200' : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow'}`}>
                      {m.role === 'assistant' ? (
                        <div className="text-sm leading-relaxed [&_p]:mb-2 [&_ul]:mb-2 [&_ol]:mb-2 [&_li]:mb-0.5 [&_strong]:text-orange-700 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-semibold [&_h1]:mb-2 [&_h2]:mb-2 [&_h3]:mb-1 [&_code]:bg-slate-200 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_pre]:bg-slate-800 [&_pre]:text-slate-100 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:text-xs [&_blockquote]:border-l-2 [&_blockquote]:border-orange-300 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-500">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {aiLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      <BotMessageSquare className="text-white" size={14} />
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={formik.handleSubmit} className="p-4 border-t border-orange-100">
                <div className="flex gap-2">
                  <input
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        formik.handleSubmit()
                      }
                    }}
                    placeholder="Ask about delays, H&S, labour, costs, CDM compliance..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-400"
                  />
                  <button type="submit" disabled={!formik.values.message.trim() || aiLoading}
                    className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all shadow">
                    <Send size={16} />
                  </button>
                </div>
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-500 text-[10px] mt-1">{formik.errors.message}</p>
                )}
              </form>
            </div>
          </>
        )}

        {activeTab === 'presets' && (
          <div className="flex-1 overflow-y-auto space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon
                return (
                  <button key={cat.label} onClick={() => setSelectedCategory(cat.label)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat.label ? `bg-gradient-to-r ${cat.color} text-white shadow` : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300'
                    }`}>
                    <Icon size={14} />
                    {cat.label}
                  </button>
                )
              })}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {currentCategoryPresets.map((preset, idx) => {
                const cat = CATEGORIES.find(c => c.label === preset.category)
                return (
                  <button key={idx} onClick={() => runPreset(preset)} disabled={aiLoading}
                    className={`p-4 rounded-xl border text-left transition-all hover:shadow-md disabled:opacity-50 ${cat?.bg} hover:-translate-y-0.5`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/80 shadow-sm">
                        <preset.icon size={16} className={cat?.text} />
                      </div>
                      <div>
                        <p className="text-slate-800 text-xs font-bold">{preset.label}</p>
                        <p className="text-slate-400 text-[10px]">{preset.category}</p>
                      </div>
                      <ChevronRight size={14} className={`ml-auto ${cat?.text}`} />
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">{preset.prompt}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${hermesStatus === 'online' ? 'bg-green-400' : 'bg-amber-400'}`} />
                      <span className="text-[10px] text-slate-400">{hermesStatus === 'online' ? 'Live analysis' : 'Demo mode'}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
