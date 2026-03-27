import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import { condomini } from '../../data/users'
import { assemblies } from '../../data/assemblies'
import { CalendarDays, MapPin, Clock, ChevronRight, Users } from 'lucide-react'

export default function ConnectAssemblies() {
  const { user } = useAuth()
  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]

  const myAssemblies = assemblies.filter((a) => a.buildingId === condomino.buildingId)
  const upcoming = myAssemblies.filter((a) => a.status === 'convocata')
  const past = myAssemblies.filter((a) => a.status === 'conclusa')

  const typeLabel = { ordinaria: 'Ordinaria', straordinaria: 'Straordinaria' }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Assemblee"
        description="Assemblee del tuo condominio"
      />

      {upcoming.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Prossime Assemblee</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((assembly) => (
              <Link key={assembly.id} to={`/connect/assemblee/${assembly.id}`}>
                <Card hover variant="elevated" className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{assembly.title}</CardTitle>
                      <StatusBadge status={assembly.status} />
                    </div>
                    <CardDescription className="text-base">{assembly.buildingName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-base text-gray-600">
                        <CalendarDays className="h-5 w-5 text-primary-400" />
                        {new Date(assembly.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-3 text-base text-gray-600">
                        <Clock className="h-5 w-5 text-primary-400" />
                        I convocazione: {assembly.firstCall} &mdash; II convocazione: {assembly.secondCall}
                      </div>
                      <div className="flex items-center gap-3 text-base text-gray-600">
                        <MapPin className="h-5 w-5 text-primary-400" />
                        {assembly.location}
                      </div>
                      <div className="pt-2">
                        <Badge variant={assembly.type === 'straordinaria' ? 'warning' : 'primary'}>
                          {typeLabel[assembly.type]}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <span className="text-sm text-primary-400 flex items-center gap-1">
                      Dettagli <ChevronRight className="h-4 w-4" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Assemblee Passate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {past.map((assembly) => (
              <Link key={assembly.id} to={`/connect/assemblee/${assembly.id}`}>
                <Card hover className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{assembly.title}</CardTitle>
                      <StatusBadge status={assembly.status} />
                    </div>
                    <CardDescription>{assembly.buildingName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-base text-gray-600">
                        <CalendarDays className="h-5 w-5 text-gray-400" />
                        {new Date(assembly.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-3 text-base text-gray-600">
                        <Users className="h-5 w-5 text-gray-400" />
                        {assembly.participants.filter((p) => p.present).length} partecipanti
                      </div>
                      <Badge variant={assembly.type === 'straordinaria' ? 'warning' : 'default'}>
                        {typeLabel[assembly.type]}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <span className="text-sm text-primary-400 flex items-center gap-1">
                      Vedi verbale <ChevronRight className="h-4 w-4" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {myAssemblies.length === 0 && (
        <EmptyState
          icon={CalendarDays}
          title="Nessuna assemblea"
          description="Non ci sono assemblee programmate per il tuo condominio."
        />
      )}
    </div>
  )
}
