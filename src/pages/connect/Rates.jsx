import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Card, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import StatusBadge from '../../components/shared/StatusBadge'
import { useToast } from '../../components/ui/Toast'
import { condomini } from '../../data/users'
import { rates } from '../../data/finance'
import { CheckCircle2, Clock, AlertCircle, Download } from 'lucide-react'
import { cn } from '../../lib/cn'

const quarterLabels = {
  Q1: 'Gen - Mar',
  Q2: 'Apr - Giu',
  Q3: 'Lug - Set',
  Q4: 'Ott - Dic',
}

const statusGradients = {
  pagata: 'from-green-50 to-emerald-50 border-green-100',
  non_pagata: 'from-red-50 to-rose-50 border-red-100',
  in_scadenza: 'from-amber-50 to-orange-50 border-amber-100',
}

const statusIcons = {
  pagata: CheckCircle2,
  non_pagata: AlertCircle,
  in_scadenza: Clock,
}

export default function Rates() {
  const { user } = useAuth()
  const toast = useToast()
  const [year, setYear] = useState('2026')
  const years = ['2026', '2025']

  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]
  const myRates = rates.filter((r) => r.condominoId === condomino.id && r.year === parseInt(year))

  const totalYear = myRates.reduce((sum, r) => sum + r.amount, 0)
  const totalPaid = myRates.filter((r) => r.status === 'pagata').reduce((sum, r) => sum + r.amount, 0)
  const totalDue = totalYear - totalPaid
  const paidCount = myRates.filter((r) => r.status === 'pagata').length
  const totalCount = myRates.length

  const fmt = (val) => val.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })

  const paidPercentage = totalYear > 0 ? Math.round((totalPaid / totalYear) * 100) : 0
  const circumference = 2 * Math.PI * 40

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Le Mie Rate</h1>
        <p className="text-sm text-gray-500 mt-0.5">Riepilogo dei pagamenti condominiali</p>
      </div>

      {/* Year Selector Pills */}
      <div className="flex gap-2">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-semibold transition-all',
              year === y
                ? 'bg-primary-400 text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            )}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Summary Ring + Numbers */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-6">
            {/* Ring Chart */}
            <div className="relative flex-shrink-0">
              <svg width="100" height="100" className="-rotate-90">
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="8"
                />
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - (circumference * paidPercentage) / 100}
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-800">{paidPercentage}%</span>
              </div>
            </div>
            {/* Numbers */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Totale anno</span>
                <span className="text-sm font-semibold text-gray-800 font-mono">{fmt(totalYear)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-400" /> Pagato
                </span>
                <span className="text-sm font-semibold text-green-700 font-mono">{fmt(totalPaid)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-gray-300" /> Da pagare
                </span>
                <span className="text-sm font-semibold text-gray-600 font-mono">{fmt(totalDue)}</span>
              </div>
              <p className="text-xs text-gray-400 pt-1">{paidCount}/{totalCount} rate pagate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rate Cards */}
      {myRates.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Nessuna rata per il {year}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myRates.map((rate) => {
            const gradient = statusGradients[rate.status] || 'from-gray-50 to-gray-50 border-gray-100'
            const StatusIcon = statusIcons[rate.status] || Clock
            return (
              <div
                key={rate.id}
                className={cn(
                  'rounded-2xl border p-4 bg-gradient-to-r transition-all',
                  gradient
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-base font-semibold text-gray-800">{rate.quarter}</span>
                      <span className="text-xs text-gray-500">{quarterLabels[rate.quarter]}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-mono font-bold text-gray-800">
                    {fmt(rate.amount)}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={rate.status} />
                    <span className="text-xs text-gray-400">
                      Scade il {new Date(rate.dueDate).toLocaleDateString('it-IT')}
                    </span>
                  </div>
                  {rate.status === 'pagata' && (
                    <button className="text-xs text-gray-400 flex items-center gap-1 hover:text-gray-600 transition-colors" onClick={() => toast('Download ricevuta ' + rate.quarter + ' ' + rate.year)}>
                      <Download className="h-3.5 w-3.5" />
                      Ricevuta
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
