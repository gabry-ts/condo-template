import { useParams, Link } from 'react-router-dom'
import {
  ArrowUpRight, ArrowDownRight, Calendar, Tag, Building2,
  Truck, Euro, Wrench, Receipt, ExternalLink, FileText,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

import { transactions } from '../../data/finance'
import { buildings } from '../../data/buildings'
import { documents } from '../../data/documents'

function fmt(a) { return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(a) }
function fmtDate(d) { return new Date(d).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) }

const sourceLabels = { building: 'Condominio', studio: 'Studio', supplier: 'Fornitore', third_party: 'Terzi' }
const sourceVariants = { building: 'primary', studio: 'info', supplier: 'accent', third_party: 'default' }

export default function TransactionDetail() {
  const { txId } = useParams()
  const tx = transactions.find((t) => t.id === txId)
  const building = tx ? buildings.find((b) => b.id === tx.buildingId) : null
  const relatedDocs = tx ? documents.filter((d) => d.buildingId === tx.buildingId && d.category === (tx.category === 'Assicurazione' ? 'Assicurazione' : tx.category === 'Rate' ? 'Bilancio' : 'Contratto')).slice(0, 3) : []

  if (!tx) return <div className="text-center py-16"><p className="text-lg text-gray-500">Movimento non trovato</p></div>

  const isEntrata = tx.type === 'entrata'

  return (
    <div>
      <PageHeader
        title="Dettaglio Movimento"
        breadcrumbs={[{ label: 'Finanze', to: '/studio/finanze' }, { label: tx.description }]}
      />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Amount hero */}
        <Card variant="elevated">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${isEntrata ? 'bg-success-50' : 'bg-destructive-50'}`}>
                {isEntrata ? <ArrowDownRight className="h-7 w-7 text-success-500" /> : <ArrowUpRight className="h-7 w-7 text-destructive-500" />}
              </div>
              <div>
                <p className={`text-2xl font-bold font-mono ${isEntrata ? 'text-success-600' : 'text-destructive-500'}`}>
                  {isEntrata ? '+' : ''}{fmt(tx.amount)}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{tx.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card>
          <CardHeader><CardTitle className="text-base">Informazioni</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Info icon={Calendar} label="Data" value={fmtDate(tx.date)} />
              <Info icon={Tag} label="Categoria" value={<Badge variant="primary">{tx.category}</Badge>} />
              <Info icon={Euro} label="Tipo" value={<Badge variant={isEntrata ? 'success' : 'destructive'}>{isEntrata ? 'Entrata' : 'Uscita'}</Badge>} />
              <Info icon={Building2} label="Immobile" value={building?.name || '-'} />
              <Info icon={Truck} label="Origine" value={
                <div className="flex items-center gap-2">
                  <Badge variant={sourceVariants[tx.source]}>{sourceLabels[tx.source]}</Badge>
                  {(tx.supplierName || tx.thirdPartyName) && <span className="text-sm text-gray-600">{tx.supplierName || tx.thirdPartyName}</span>}
                </div>
              } />
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        {(tx.maintenanceId || tx.rateId || tx.supplierId) && (
          <Card>
            <CardHeader><CardTitle className="text-base">Collegati</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tx.maintenanceId && (
                  <Link to={`/studio/manutenzioni/${tx.maintenanceId}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Wrench className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-800 flex-1">Manutenzione collegata</span>
                    <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                  </Link>
                )}
                {tx.rateId && (
                  <Link to="/studio/finanze" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Receipt className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-800 flex-1">Rata collegata</span>
                    <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                  </Link>
                )}
                {tx.supplierId && (
                  <Link to={`/studio/fornitori/${tx.supplierId}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-800 flex-1">{tx.supplierName || 'Fornitore'}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documenti correlati */}
        {relatedDocs.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-base">Documenti Correlati</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {relatedDocs.map((doc) => (
                  <Link key={doc.id} to={`/studio/documenti/${doc.id}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.category} · {doc.type} · {doc.size}</p>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2"><Icon className="h-4 w-4 text-gray-400" /><span className="text-sm text-gray-500">{label}</span></div>
      <div>{typeof value === 'string' ? <span className="text-sm font-medium text-gray-800">{value}</span> : value}</div>
    </div>
  )
}
