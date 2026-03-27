import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wallet, AlertTriangle, Receipt } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import PageHeader from '../../components/layout/PageHeader'
import PlanGate from '../../components/shared/PlanGate'
import SearchBar from '../../components/shared/SearchBar'
import FileUpload from '../../components/shared/FileUpload'
import StatusBadge from '../../components/shared/StatusBadge'
import Stat from '../../components/ui/Stat'
import ComboSelect from '../../components/ui/ComboSelect'
import Tabs from '../../components/ui/Tabs'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ProgressBar from '../../components/ui/ProgressBar'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { transactions, rates, expenseCategories, expenseDistributionByCondomino } from '../../data/finance'
import { buildings } from '../../data/buildings'
import { condomini } from '../../data/users'
import { cn } from '../../lib/cn'
import useSort from '../../hooks/useSort'

// --- Shared helpers ---

function formatCurrency(amount) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount)
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// --- Movimenti data ---

const categoryVariants = {
  Rate: 'success',
  Pulizie: 'info',
  Manutenzione: 'warning',
  Utenze: 'accent',
  Assicurazione: 'primary',
  Giardinaggio: 'default',
}

// --- Estratti Conto data ---

const parsedTransactions = [
  { id: 1, date: '15/03/2026', description: 'Bonifico rata Q1 - Rossi Giuseppe', amount: 850.00, category: 'Rate Condominiali', confidence: 97 },
  { id: 2, date: '14/03/2026', description: 'Pagamento fattura pulizie marzo', amount: -480.00, category: 'Pulizie', confidence: 94 },
  { id: 3, date: '12/03/2026', description: 'Addebito utenza gas febbraio', amount: -215.40, category: 'Utenze', confidence: 91 },
  { id: 4, date: '10/03/2026', description: 'Bonifico rata Q1 - Esposito Maria', amount: 680.00, category: 'Rate Condominiali', confidence: 98 },
  { id: 5, date: '08/03/2026', description: 'Fattura manutenzione ascensore', amount: -1200.00, category: 'Manutenzione', confidence: 96 },
  { id: 6, date: '05/03/2026', description: 'Commissioni bancarie febbraio', amount: -12.50, category: 'Spese Bancarie', confidence: 89 },
  { id: 7, date: '03/03/2026', description: 'Bonifico rata Q1 - Ferrari Antonio', amount: 1050.00, category: 'Rate Condominiali', confidence: 99 },
  { id: 8, date: '01/03/2026', description: 'Addebito energia elettrica', amount: -320.00, category: 'Utenze', confidence: 93 },
  { id: 9, date: '28/02/2026', description: 'Pagamento intervento idraulico', amount: -350.00, category: 'Manutenzione', confidence: 92 },
  { id: 10, date: '25/02/2026', description: 'Bonifico rata Q1 - Romano Lucia', amount: 780.00, category: 'Rate Condominiali', confidence: 97 },
  { id: 11, date: '20/02/2026', description: 'Addebito polizza assicurativa', amount: -2400.00, category: 'Assicurazione', confidence: 95 },
  { id: 12, date: '15/02/2026', description: 'Pagamento fattura pulizie febbraio', amount: -480.00, category: 'Pulizie', confidence: 94 },
]

function getConfidenceVariant(conf) {
  if (conf >= 95) return 'success'
  if (conf >= 90) return 'warning'
  return 'destructive'
}

// --- Bilanci data ---

const COLORS = ['#1e3a5f', '#e8734a', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#6b7280']

const consuntivoTotal = expenseCategories.reduce((sum, c) => sum + c.amount, 0)

const preventivoCategories = [
  { category: 'Pulizie', amount: 6000 },
  { category: 'Manutenzione', amount: 8500 },
  { category: 'Utenze', amount: 4200 },
  { category: 'Assicurazione', amount: 2400 },
  { category: 'Ascensore', amount: 3800 },
  { category: 'Giardinaggio', amount: 1600 },
  { category: 'Altro', amount: 1500 },
]
const preventivoTotal = preventivoCategories.reduce((sum, c) => sum + c.amount, 0)

// --- Ripartizione data ---

const progressColors = ['primary', 'accent', 'primary', 'success', 'warning', 'primary', 'primary']
const expenseTotal = expenseCategories.reduce((sum, c) => sum + c.amount, 0)

// --- Preventivi data ---

const budgetItems = [
  { voce: 'Pulizie condominiali', preventivo: 6000, consuntivo: 5760 },
  { voce: 'Manutenzione ordinaria', preventivo: 5000, consuntivo: 5400 },
  { voce: 'Manutenzione straordinaria', preventivo: 3500, consuntivo: 2400 },
  { voce: 'Utenze energia elettrica', preventivo: 2000, consuntivo: 1920 },
  { voce: 'Utenze gas e riscaldamento', preventivo: 2200, consuntivo: 1920 },
  { voce: 'Assicurazione fabbricato', preventivo: 2400, consuntivo: 2400 },
  { voce: 'Manutenzione ascensore', preventivo: 3800, consuntivo: 3600 },
  { voce: 'Giardinaggio e aree verdi', preventivo: 1600, consuntivo: 1400 },
  { voce: 'Compenso amministratore', preventivo: 3000, consuntivo: 3000 },
  { voce: 'Spese bancarie', preventivo: 200, consuntivo: 150 },
  { voce: 'Fondo riserva', preventivo: 1500, consuntivo: 1050 },
]

const totalPreventivo = budgetItems.reduce((sum, item) => sum + item.preventivo, 0)
const totalConsuntivo = budgetItems.reduce((sum, item) => sum + item.consuntivo, 0)
const totalDiff = totalConsuntivo - totalPreventivo

// --- Tab content components ---

const sourceLabels = {
  building: 'Condominio',
  studio: 'Studio',
  supplier: 'Fornitore',
  third_party: 'Terzi',
}
const sourceVariants = {
  building: 'primary',
  studio: 'info',
  supplier: 'accent',
  third_party: 'default',
}

const typeOptions = [{ value: '', label: 'Tutti' }, { value: 'entrata', label: 'Entrata' }, { value: 'uscita', label: 'Uscita' }]
const catFilterOptions = [{ value: '', label: 'Tutte' }, ...['Rate', 'Pulizie', 'Manutenzione', 'Utenze', 'Assicurazione', 'Giardinaggio', 'Compenso', 'Spese Bancarie', 'Altro'].map((c) => ({ value: c, label: c }))]
const sourceFilterOptions = [{ value: '', label: 'Tutte' }, { value: 'building', label: 'Condominio' }, { value: 'studio', label: 'Studio' }, { value: 'supplier', label: 'Fornitore' }, { value: 'third_party', label: 'Terzi' }]

function MovimentiTab({ buildingTransactions, navigate }) {
  const [txSearch, setTxSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [srcFilter, setSrcFilter] = useState('')
  const searched = buildingTransactions.filter((t) => {
    const matchSearch = t.description.toLowerCase().includes(txSearch.toLowerCase()) || t.category.toLowerCase().includes(txSearch.toLowerCase()) || (t.supplierName || '').toLowerCase().includes(txSearch.toLowerCase()) || (t.thirdPartyName || '').toLowerCase().includes(txSearch.toLowerCase())
    const matchType = !typeFilter || t.type === typeFilter
    const matchCat = !catFilter || t.category === catFilter
    const matchSrc = !srcFilter || t.source === srcFilter
    return matchSearch && matchType && matchCat && matchSrc
  })
  const { sorted, toggle, getSorted } = useSort(searched, 'date', 'desc')
  return (
    <div className="space-y-4">
    <div className="flex flex-col sm:flex-row gap-3">
      <SearchBar value={txSearch} onChange={setTxSearch} placeholder="Cerca movimento..." className="flex-1" />
      <ComboSelect options={typeOptions} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} placeholder="Tipo" />
      <ComboSelect searchable options={catFilterOptions} value={catFilter} onChange={(e) => setCatFilter(e.target.value)} placeholder="Categoria" />
      <ComboSelect options={sourceFilterOptions} value={srcFilter} onChange={(e) => setSrcFilter(e.target.value)} placeholder="Origine" />
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead sortable sorted={getSorted('date')} onSort={() => toggle('date')}>Data</TableHead>
          <TableHead sortable sorted={getSorted('description')} onSort={() => toggle('description')}>Descrizione</TableHead>
          <TableHead sortable sorted={getSorted('category')} onSort={() => toggle('category')}>Categoria</TableHead>
          <TableHead sortable sorted={getSorted('source')} onSort={() => toggle('source')}>Origine</TableHead>
          <TableHead sortable sorted={getSorted('amount')} onSort={() => toggle('amount')} className="text-right">Importo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((t) => (
          <TableRow key={t.id} onClick={() => navigate(`/studio/finanze/movimenti/${t.id}`)}>
            <TableCell>{formatDate(t.date)}</TableCell>
            <TableCell>
              <div>
                <p className="text-sm text-gray-800">{t.description}</p>
                {(t.supplierName || t.thirdPartyName) && (
                  <p className="text-xs text-gray-500">{t.supplierName || t.thirdPartyName}</p>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={categoryVariants[t.category] || 'default'}>{t.category}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={sourceVariants[t.source] || 'default'}>{sourceLabels[t.source] || t.source}</Badge>
            </TableCell>
            <TableCell mono className={cn('text-right', t.type === 'entrata' ? 'text-success-600' : 'text-destructive-500')}>
              {t.type === 'entrata' ? '+' : ''}{formatCurrency(t.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

function EstrattiContoTab() {
  const [step, setStep] = useState('upload')

  const handleUpload = () => {
    setStep('results')
  }

  return (
    <div className="space-y-8">
      <FileUpload
        accept=".pdf,.csv"
        label="Carica estratto conto (PDF o CSV)"
        onUpload={handleUpload}
      />

      {step === 'results' && (
        <>
          <Card>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold font-mono text-gray-800">12</p>
                  <p className="text-xs text-gray-500 mt-1">Movimenti trovati</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold font-mono text-gray-800">4</p>
                  <p className="text-xs text-gray-500 mt-1">Categorie identificate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold font-mono text-primary-500">EUR 15.420,50</p>
                  <p className="text-xs text-gray-500 mt-1">Saldo finale</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrizione</TableHead>
                <TableHead className="text-right">Importo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-center">Confidenza</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parsedTransactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell mono className={cn('text-right', t.amount >= 0 ? 'text-success-600' : 'text-destructive-500')}>
                    {t.amount >= 0 ? '+' : ''}{formatCurrency(t.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="primary">{t.category}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getConfidenceVariant(t.confidence)}>{t.confidence}%</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  )
}

function BilanciTab() {
  const [year, setYear] = useState('2026')

  return (
    <div>
      <div className="mb-8 max-w-[160px]">
        <ComboSelect
          label="Anno"
          options={[
            { value: '2026', label: '2026' },
            { value: '2025', label: '2025' },
          ]}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card variant="elevated" className="rounded-2xl">
          <CardHeader>
            <CardTitle>Bilancio Consuntivo {year}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500">Totale Spese</span>
              <span className="text-lg sm:text-2xl font-bold font-mono text-gray-800">{formatCurrency(consuntivoTotal)}</span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseCategories} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                  <YAxis dataKey="category" type="category" width={100} tick={{ fontSize: 12 }} />
                  <RechartsTooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
                    {expenseCategories.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="rounded-2xl">
          <CardHeader>
            <CardTitle>Bilancio Preventivo {year}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500">Totale Previsto</span>
              <span className="text-lg sm:text-2xl font-bold font-mono text-gray-800">{formatCurrency(preventivoTotal)}</span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={preventivoCategories} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                  <YAxis dataKey="category" type="category" width={100} tick={{ fontSize: 12 }} />
                  <RechartsTooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Bar dataKey="amount" fill="#e8734a" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RateTab({ selectedBuilding }) {
  const [selectedYear, setSelectedYear] = useState('2026')
  const [selectedQuarter, setSelectedQuarter] = useState('Q1')
  const [generating, setGenerating] = useState(false)

  const filteredRates = rates.filter(
    (r) => r.buildingId === selectedBuilding && r.year === Number(selectedYear) && r.quarter === selectedQuarter
  )

  const totalAmount = filteredRates.reduce((sum, r) => sum + r.amount, 0)
  const paidAmount = filteredRates.filter((r) => r.status === 'pagata').reduce((sum, r) => sum + r.amount, 0)
  const paidPercentage = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0

  const getCondomino = (id) => condomini.find((c) => c.id === id)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => setGenerating(false), 2000)
  }

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 mb-8">
        <div className="w-32">
          <ComboSelect
            label="Anno"
            options={[
              { value: '2026', label: '2026' },
              { value: '2025', label: '2025' },
            ]}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />
        </div>
        <div className="w-32">
          <ComboSelect
            label="Trimestre"
            options={[
              { value: 'Q1', label: 'Q1' },
              { value: 'Q2', label: 'Q2' },
              { value: 'Q3', label: 'Q3' },
              { value: 'Q4', label: 'Q4' },
            ]}
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
          />
        </div>
        <Button variant="pro" onClick={handleGenerate} disabled={generating}>
          <Sparkles className={cn('h-4 w-4', generating && 'animate-spin')} style={generating ? { animationDuration: '1.5s' } : undefined} />
          {generating ? 'Generazione...' : 'Genera Rate'}
        </Button>
      </div>

      <Card variant="elevated" className="rounded-2xl mb-8">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Totale da Incassare</p>
              <p className="text-xl font-bold font-mono text-gray-800">{formatCurrency(totalAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Incassato</p>
              <p className="text-xl font-bold font-mono text-success-600">{formatCurrency(paidAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Percentuale Incasso</p>
              <div className="flex items-center gap-3">
                <ProgressBar value={paidPercentage} color={paidPercentage >= 75 ? 'success' : paidPercentage >= 50 ? 'warning' : 'destructive'} size="md" className="flex-1" />
                <span className="text-sm font-mono font-semibold text-gray-700">{paidPercentage}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Condomino</TableHead>
            <TableHead>Unita</TableHead>
            <TableHead className="text-right">Millesimi</TableHead>
            <TableHead className="text-right">Importo</TableHead>
            <TableHead>Scadenza</TableHead>
            <TableHead>Stato</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRates.map((r) => {
            const cond = getCondomino(r.condominoId)
            return (
              <TableRow key={r.id}>
                <TableCell>{cond?.name || '-'}</TableCell>
                <TableCell>{cond?.unitId || '-'}</TableCell>
                <TableCell mono className="text-right">{cond?.millesimi || '-'}</TableCell>
                <TableCell mono className="text-right">{formatCurrency(r.amount)}</TableCell>
                <TableCell>{formatDate(r.dueDate)}</TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
              </TableRow>
            )
          })}
          {filteredRates.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-gray-400 py-8" colSpan={6}>
                Nessuna rata trovata per i filtri selezionati
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function RipartizioneTab() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card variant="elevated" className="rounded-2xl">
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Distribuzione per Categoria</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={60}
                    paddingAngle={3}
                    label={({ category, percentage }) => `${category} ${percentage}%`}
                  >
                    {expenseCategories.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="rounded-2xl">
          <CardContent>
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Totale Spese</h3>
              <span className="text-2xl font-bold font-mono text-gray-800">{formatCurrency(expenseTotal)}</span>
            </div>
            <div className="space-y-5">
              {expenseCategories.map((cat, i) => (
                <div key={cat.category}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-sm text-gray-700">{cat.category}</span>
                    </div>
                    <span className="text-sm font-mono font-medium text-gray-700">{formatCurrency(cat.amount)}</span>
                  </div>
                  <ProgressBar value={cat.percentage} color={progressColors[i]} size="sm" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Importo</TableHead>
            <TableHead className="text-right">Percentuale</TableHead>
            <TableHead className="w-48">Distribuzione</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenseCategories.map((cat, i) => (
            <TableRow key={cat.category}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                  {cat.category}
                </div>
              </TableCell>
              <TableCell mono className="text-right">{formatCurrency(cat.amount)}</TableCell>
              <TableCell mono className="text-right">{cat.percentage}%</TableCell>
              <TableCell>
                <ProgressBar value={cat.percentage} color={progressColors[i]} size="sm" />
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-gray-50 font-semibold">
            <TableCell className="font-semibold text-gray-800">Totale</TableCell>
            <TableCell mono className="text-right font-semibold text-gray-800">{formatCurrency(expenseTotal)}</TableCell>
            <TableCell mono className="text-right font-semibold text-gray-800">100%</TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>

      {/* Ripartizione per condomino */}
      <Card variant="elevated" className="rounded-2xl mt-8">
        <CardHeader>
          <CardTitle>Ripartizione per Condomino</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Condomino</TableHead>
                <TableHead className="text-right">Millesimi</TableHead>
                <TableHead className="text-right">Totale Dovuto</TableHead>
                <TableHead className="text-right">Pagato</TableHead>
                <TableHead className="text-right">Residuo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseDistributionByCondomino.map((c) => (
                <TableRow key={c.condominoId}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell mono className="text-right">{c.millesimi}</TableCell>
                  <TableCell mono className="text-right">{formatCurrency(c.totalAmount)}</TableCell>
                  <TableCell mono className="text-right text-success-600">{formatCurrency(c.paidAmount)}</TableCell>
                  <TableCell mono className={`text-right ${c.unpaidAmount > 0 ? 'text-destructive-500' : 'text-success-600'}`}>{formatCurrency(c.unpaidAmount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function PreventiviTab() {
  const [year, setYear] = useState('2026')

  return (
    <div>
      <div className="mb-8 max-w-[160px]">
        <ComboSelect
          label="Anno"
          options={[
            { value: '2026', label: '2026' },
            { value: '2025', label: '2025' },
          ]}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Voce</TableHead>
            <TableHead className="text-right">Preventivo</TableHead>
            <TableHead className="text-right">Consuntivo</TableHead>
            <TableHead className="text-right">Differenza</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgetItems.map((item) => {
            const diff = item.consuntivo - item.preventivo
            return (
              <TableRow key={item.voce}>
                <TableCell>{item.voce}</TableCell>
                <TableCell mono className="text-right">{formatCurrency(item.preventivo)}</TableCell>
                <TableCell mono className="text-right">{formatCurrency(item.consuntivo)}</TableCell>
                <TableCell mono className={cn('text-right', diff > 0 ? 'text-destructive-500' : diff < 0 ? 'text-success-600' : 'text-gray-500')}>
                  {diff > 0 ? '+' : ''}{formatCurrency(diff)}
                </TableCell>
              </TableRow>
            )
          })}
          <TableRow className="bg-gray-50">
            <TableCell className="font-semibold text-gray-800">Totale</TableCell>
            <TableCell mono className="text-right font-semibold text-gray-800">{formatCurrency(totalPreventivo)}</TableCell>
            <TableCell mono className="text-right font-semibold text-gray-800">{formatCurrency(totalConsuntivo)}</TableCell>
            <TableCell mono className={cn('text-right font-semibold', totalDiff > 0 ? 'text-destructive-500' : 'text-success-600')}>
              {totalDiff > 0 ? '+' : ''}{formatCurrency(totalDiff)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

// --- Main Finance page ---

export default function Finance() {
  const navigate = useNavigate()
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0].id)
  const building = buildings.find((b) => b.id === selectedBuilding)

  const buildingTransactions = [...transactions]
    .filter((t) => t.buildingId === selectedBuilding)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const unpaidTotal = rates
    .filter((r) => r.buildingId === selectedBuilding && r.status !== 'pagata')
    .reduce((sum, r) => sum + r.amount, 0)

  const tabs = [
    { id: 'movimenti', label: 'Movimenti', content: <MovimentiTab buildingTransactions={buildingTransactions} navigate={navigate} /> },
    { id: 'estratti-conto', label: 'Estratti Conto', content: <EstrattiContoTab /> },
    { id: 'bilanci', label: 'Bilanci', content: <BilanciTab /> },
    { id: 'rate', label: 'Rate', content: <RateTab selectedBuilding={selectedBuilding} /> },
    { id: 'ripartizione', label: 'Ripartizione', content: <RipartizioneTab /> },
    { id: 'preventivi', label: 'Preventivi', content: <PreventiviTab /> },
  ]

  return (
    <PlanGate feature="la gestione finanziaria">
      <PageHeader title="Finanze" description="Panoramica finanziaria dei tuoi condomini" />

      <div className="mb-8 max-w-xs">
        <ComboSelect
          searchable
          label="Condominio"
          options={buildings.map((b) => ({ value: b.id, label: b.name }))}
          value={selectedBuilding}
          onChange={(e) => setSelectedBuilding(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Stat
          icon={Wallet}
          iconColor="bg-primary-100 text-primary-500"
          label="Saldo Cassa"
          value={formatCurrency(building.balance)}
        />
        <Stat
          icon={AlertTriangle}
          iconColor="bg-destructive-50 text-destructive-500"
          label="Morosita Totale"
          value={formatCurrency(building.delinquencyTotal)}
        />
        <Stat
          icon={Receipt}
          iconColor="bg-warning-50 text-warning-600"
          label="Rate da Incassare"
          value={formatCurrency(unpaidTotal)}
        />
      </div>

      <Tabs tabs={tabs} defaultTab="movimenti" />
    </PlanGate>
  )
}
