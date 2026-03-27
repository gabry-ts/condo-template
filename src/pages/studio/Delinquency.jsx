import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Users, Euro, Send, Eye, BarChart3 } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import PlanGate from '../../components/shared/PlanGate'
import Stat from '../../components/ui/Stat'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import StatusBadge from '../../components/shared/StatusBadge'
import Dropdown from '../../components/ui/Dropdown'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { useToast } from '../../components/ui/Toast'
import { delinquencies, delinquencySummary } from '../../data/delinquency'

export default function Delinquency() {
  const navigate = useNavigate()
  const toast = useToast()

  const maxAmount = Math.max(...delinquencySummary.byBuilding.map((b) => b.amount))

  return (
    <PlanGate feature="la gestione morosita">
      <PageHeader title="Morosita" description="Gestione morosita condominiali" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Stat
          icon={Euro}
          label="Totale Morosita"
          value={`€ ${delinquencySummary.totalAmount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`}
        />
        <Stat
          icon={Users}
          label="Condomini Morosi"
          value={delinquencySummary.totalMorosi}
        />
        <Stat
          icon={AlertTriangle}
          iconColor="bg-destructive-50 text-destructive-500"
          label="Casi Critici"
          value={delinquencySummary.criticalCount}
        />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Elenco Morosita</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Condomino</TableHead>
                <TableHead>Immobile</TableHead>
                <TableHead>Importo Dovuto</TableHead>
                <TableHead>Mesi Ritardo</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="w-12">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {delinquencies.map((d) => (
                <TableRow key={d.id} className="cursor-pointer" onClick={() => navigate(`/studio/morosita/${d.id}`)}>
                  <TableCell className="font-medium">{d.condominoName}</TableCell>
                  <TableCell>{d.buildingName}</TableCell>
                  <TableCell className="font-mono text-destructive-500">
                    € {d.totalOwed.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>{d.monthsOverdue}</TableCell>
                  <TableCell>
                    <StatusBadge status={d.status} />
                  </TableCell>
                  <TableCell>
                    <Dropdown
                      items={[
                        { icon: Send, label: 'Invia Sollecito', onClick: () => toast('Sollecito inviato a ' + d.condominoName) },
                        { icon: Eye, label: 'Dettaglio', onClick: () => navigate(`/studio/morosita/${d.id}`) },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary-400" />
            <CardTitle>Morosita per Immobile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {delinquencySummary.byBuilding.map((b) => (
              <div key={b.buildingId}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{b.name}</span>
                  <span className="text-sm font-mono text-gray-800">
                    € {b.amount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-400 rounded-full transition-all duration-500"
                    style={{ width: `${(b.amount / maxAmount) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 mt-0.5">{b.count} morosi</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PlanGate>
  )
}
