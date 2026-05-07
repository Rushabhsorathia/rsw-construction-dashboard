import { useState } from 'react'
import { Wallet, Download, TrendingUp, TrendingDown } from 'lucide-react'
import { budget } from '../data/mockData'

export default function Budget() {
  const totalBudget = budget.reduce((s, b) => s + b.budget, 0)
  const totalSpent = budget.reduce((s, b) => s + b.spent, 0)
  const totalCommitted = budget.reduce((s, b) => s + b.committed, 0)
  const totalRemaining = totalBudget - totalSpent

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-2xl font-bold">Budget</h1>
          <p className="text-slate-500 text-sm">Cost tracking · Committed vs Spent analysis</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
            <Download size={15} /> Export XLSX
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Budget', value: `£${totalBudget.toFixed(1)}M`, color: 'text-slate-800', bg: 'bg-slate-50', border: 'border-slate-200' },
          { label: 'Committed', value: `£${totalCommitted.toFixed(1)}M`, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
          { label: 'Spent to Date', value: `£${totalSpent.toFixed(1)}M`, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
          { label: 'Remaining', value: `£${totalRemaining.toFixed(1)}M`, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
        ].map(card => (
          <div key={card.label} className={`${card.bg} rounded-xl p-5 border ${card.border} shadow-sm`}>
            <p className="text-slate-500 text-xs uppercase tracking-wide">{card.label}</p>
            <p className={`text-2xl font-bold mt-2 ${card.color}`}>{card.value}</p>
            <p className="text-slate-400 text-[10px] mt-1">
              {card.label === 'Committed' ? `${((totalCommitted / totalBudget) * 100).toFixed(0)}% of budget` :
               card.label === 'Spent to Date' ? `${((totalSpent / totalBudget) * 100).toFixed(0)}% of budget` :
               card.label === 'Remaining' ? `${((totalRemaining / totalBudget) * 100).toFixed(0)}% of budget` : ''}
            </p>
          </div>
        ))}
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-xl border border-orange-200 shadow-sm p-6">
        <h3 className="text-slate-800 font-semibold mb-5">Cost Breakdown by Category</h3>
        <div className="space-y-5">
          {budget.map(b => {
            const spentPct = (b.spent / b.budget) * 100
            const committedPct = (b.committed / b.budget) * 100
            const isOverBudget = b.committed > b.budget
            return (
              <div key={b.category} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-700 text-sm font-semibold w-40">{b.category}</span>
                    {isOverBudget && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded">OVER BUDGET</span>
                    )}
                  </div>
                  <div className="flex gap-6 text-xs">
                    <span className="text-slate-400">Spent: <span className="text-orange-500 font-semibold">£{b.spent}M</span></span>
                    <span className="text-slate-400">Committed: <span className="text-blue-500 font-semibold">£{b.committed}M</span></span>
                    <span className="text-slate-400">Budget: <span className="text-slate-700 font-semibold">£{b.budget}M</span></span>
                    <span className={`font-semibold w-12 text-right ${isOverBudget ? 'text-red-500' : 'text-emerald-500'}`}>
                      {isOverBudget ? '+' : ''}{((b.committed - b.budget)).toFixed(1)}M
                    </span>
                  </div>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-orange-400 h-full transition-all" style={{ width: `${Math.min(spentPct, 100)}%` }} />
                  <div className="bg-blue-400/70 h-full transition-all" style={{ width: `${Math.max(0, Math.min(committedPct - spentPct, 100 - spentPct))}%` }} />
                  {isOverBudget && (
                    <div className="bg-red-400/80 h-full" style={{ width: `${((b.committed - b.budget) / b.budget) * 100}%` }} />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex gap-6 text-xs text-slate-400 pt-4 border-t border-slate-100">
          <span className="flex items-center gap-1.5"><div className="w-4 h-2 bg-orange-400 rounded" /> Spent</span>
          <span className="flex items-center gap-1.5"><div className="w-4 h-2 bg-blue-400/70 rounded" /> Committed (not yet spent)</span>
          <span className="flex items-center gap-1.5"><div className="w-4 h-2 bg-red-400/80 rounded" /> Over budget</span>
          <span className="flex items-center gap-1.5"><div className="w-4 h-2 bg-slate-100 rounded border border-slate-200" /> Remaining budget</span>
        </div>
      </div>

      {/* Cost Performance */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Cost Performance Index (CPI)', value: '1.02', sub: '£0.4M under budget overall', positive: true },
          { label: 'Earned Value (EV)', value: '£17.4M', sub: 'Work completed to date', positive: true },
          { label: 'Planned Value (PV)', value: '£17.1M', sub: 'Scheduled work to date', positive: true },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl p-5 border border-orange-200 shadow-sm">
            <p className="text-slate-500 text-xs">{kpi.label}</p>
            <p className={`text-2xl font-bold mt-2 ${kpi.positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {kpi.value}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {kpi.positive
                ? <TrendingUp size={13} className="text-emerald-500" />
                : <TrendingDown size={13} className="text-red-500" />
              }
              <p className="text-slate-400 text-[10px]">{kpi.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
