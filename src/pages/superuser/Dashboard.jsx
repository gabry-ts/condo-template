import {
  Shield, Building2, Crown, Activity, Cpu, HardDrive, MemoryStick,
  LogIn, XCircle, Building, FileText, Database, Receipt, UserPlus, Settings,
} from 'lucide-react'

import Stat from '../../components/ui/Stat'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import ProgressBar from '../../components/ui/ProgressBar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

import { admins } from '../../data/users'
import { buildings } from '../../data/buildings'

const recentActivities = [
  {
    icon: Building,
    color: 'text-primary-500',
    text: 'Marco Bianchi ha creato un nuovo immobile',
    time: '2 ore fa',
  },
  {
    icon: FileText,
    color: 'text-info-500',
    text: 'Francesca Moretti ha caricato un documento',
    time: '5 ore fa',
  },
  {
    icon: Database,
    color: 'text-success-600',
    text: 'Sistema: Backup automatico completato',
    time: '8 ore fa',
  },
  {
    icon: Receipt,
    color: 'text-accent-500',
    text: 'Roberto Colombo ha generato le rate Q1',
    time: '1 giorno fa',
  },
  {
    icon: UserPlus,
    color: 'text-primary-400',
    text: 'Nuovo condomino registrato: Anna Mancini',
    time: '1 giorno fa',
  },
  {
    icon: Settings,
    color: 'text-gray-500',
    text: 'Sistema: Aggiornamento pianificato completato',
    time: '2 giorni fa',
  },
  {
    icon: FileText,
    color: 'text-info-500',
    text: 'Marco Bianchi ha esportato il bilancio annuale',
    time: '3 giorni fa',
  },
  {
    icon: Building,
    color: 'text-primary-500',
    text: 'Roberto Colombo ha aggiunto 2 nuove unita',
    time: '4 giorni fa',
  },
]

export default function Dashboard() {
  const proAdmins = admins.filter((a) => a.plan === 'pro').length

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat
          icon={Shield}
          iconColor="bg-primary-100 text-primary-500"
          label="Amministratori Attivi"
          value={admins.length}
        />
        <Stat
          icon={Building2}
          iconColor="bg-info-50 text-info-500"
          label="Immobili Totali"
          value={buildings.length}
        />
        <Stat
          icon={Crown}
          iconColor="bg-accent-50 text-accent-500"
          label="Piano Pro"
          value={proAdmins}
        />
        <Stat
          icon={Activity}
          iconColor="bg-success-50 text-success-600"
          label="Uptime"
          value="99.9%"
        />
      </div>

      {/* Sessione Impersonata Attiva */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5 text-warning-500" />
            Sessioni Impersonate Attive
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-warning-50 border border-warning-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-warning-100 flex items-center justify-center">
                <LogIn className="h-4 w-4 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Attualmente connesso come: <strong>Studio Bianchi Amministrazioni</strong>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Sessione avviata 15 minuti fa</p>
              </div>
            </div>
            <Button variant="destructive" size="sm">
              <XCircle className="h-4 w-4 mr-1.5" />
              Termina Sessione
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attivita Recente */}
      <Card>
        <CardHeader>
          <CardTitle>Attivita Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-b-0">
                <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metriche di Sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Metriche di Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="h-4 w-4 text-primary-400" />
                <span className="text-sm font-medium text-gray-700">CPU</span>
              </div>
              <ProgressBar value={32} max={100} color="primary" showValue label="Utilizzo" />
              <p className="text-xs text-gray-500">4 core - 32% utilizzo medio</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <MemoryStick className="h-4 w-4 text-accent-400" />
                <span className="text-sm font-medium text-gray-700">Memoria</span>
              </div>
              <ProgressBar value={6.2} max={16} color="accent" showValue label="RAM (GB)" />
              <p className="text-xs text-gray-500">6.2 GB / 16 GB utilizzati</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="h-4 w-4 text-warning-500" />
                <span className="text-sm font-medium text-gray-700">Storage</span>
              </div>
              <ProgressBar value={45} max={100} color="warning" showValue label="Disco (GB)" />
              <p className="text-xs text-gray-500">45 GB / 100 GB utilizzati</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
