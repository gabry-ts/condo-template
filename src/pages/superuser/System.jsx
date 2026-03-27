import { Activity, AlertTriangle, HardDrive, Shield, Server, Clock, Database } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import ProgressBar from '../../components/ui/ProgressBar'
import Badge from '../../components/ui/Badge'

export default function System() {
  return (
    <div>
      <PageHeader
        title="Sistema"
        description="Monitoraggio e stato dei servizi"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-success-50 flex items-center justify-center">
                <Activity className="h-5 w-5 text-success-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Uptime</p>
                <p className="text-2xl font-bold text-gray-800">99.9%</p>
              </div>
            </div>
            <Badge variant="success">Operativo</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-warning-50 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-warning-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Errori Ultimi 7gg</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
            </div>
            <Badge variant="warning">Minori</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-primary-100 flex items-center justify-center">
                <HardDrive className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Storage</p>
                <p className="text-2xl font-bold text-gray-800">45 GB</p>
              </div>
            </div>
            <ProgressBar value={45} max={100} color="primary" size="sm" />
            <p className="text-xs text-gray-500 mt-2">45 GB / 100 GB utilizzati</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-success-50 flex items-center justify-center">
                <Database className="h-5 w-5 text-success-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Backup</p>
                <p className="text-2xl font-bold text-gray-800">OK</p>
              </div>
            </div>
            <Badge variant="success">Ultimo: oggi 03:00</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Metriche Server</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">CPU</span>
                  <span className="text-sm font-mono text-gray-500">32%</span>
                </div>
                <ProgressBar value={32} max={100} color="primary" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Memoria RAM</span>
                  <span className="text-sm font-mono text-gray-500">6.2 GB / 16 GB</span>
                </div>
                <ProgressBar value={62} max={100} color="accent" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Disco</span>
                  <span className="text-sm font-mono text-gray-500">45 GB / 100 GB</span>
                </div>
                <ProgressBar value={45} max={100} color="warning" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Rete</span>
                  <span className="text-sm font-mono text-gray-500">12 Mbps</span>
                </div>
                <ProgressBar value={12} max={100} color="success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Log Recenti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: '14:32', message: 'Backup giornaliero completato', level: 'success' },
                { time: '12:15', message: 'Nuovo amministratore registrato', level: 'info' },
                { time: '09:45', message: 'Timeout connessione database (ripristinato)', level: 'warning' },
                { time: '08:00', message: 'Deploy v2.4.1 completato', level: 'success' },
                { time: '03:00', message: 'Backup automatico eseguito', level: 'success' },
                { time: 'Ieri 22:10', message: 'Errore invio email notifica', level: 'error' },
                { time: 'Ieri 18:30', message: 'Pulizia cache completata', level: 'info' },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    log.level === 'success' ? 'bg-success-500' :
                    log.level === 'warning' ? 'bg-warning-500' :
                    log.level === 'error' ? 'bg-destructive-500' :
                    'bg-info-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800">{log.message}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
