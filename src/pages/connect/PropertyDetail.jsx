import { useParams, Link } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { buildings, units } from '../../data/buildings'
import { admins } from '../../data/users'
import { notifications } from '../../data/notifications'
import {
  Building2,
  MapPin,
  Layers,
  Maximize2,
  PieChart,
  User,
  Phone,
  Mail,
  CreditCard,
  Bell,
} from 'lucide-react'

export default function PropertyDetail() {
  const { id } = useParams()
  const building = buildings.find((b) => b.id === id)
  const admin = admins.find((a) => a.id === building?.adminId)
  const buildingUnits = units.filter((u) => u.buildingId === id)
  const myUnit = buildingUnits[0]

  const buildingNotifications = notifications.slice(0, 4)

  if (!building) {
    return (
      <div className="space-y-8">
        <PageHeader title="Immobile non trovato" />
        <p className="text-lg text-gray-500">L'immobile richiesto non esiste.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={building.name}
        description={building.address}
        breadcrumbs={[
          { label: 'Immobili', to: '/connect/immobili' },
          { label: building.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary-400" />
              Informazioni Edificio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Indirizzo</p>
                  <p className="text-base font-medium text-gray-800">{building.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Layers className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Piani</p>
                  <p className="text-base font-medium text-gray-800">{building.floors}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Unita</p>
                  <p className="text-base font-medium text-gray-800">{building.unitsCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">IBAN</p>
                  <p className="text-base font-mono font-medium text-gray-800">{building.iban}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="h-5 w-5 text-primary-400" />
              Amministratore
            </CardTitle>
          </CardHeader>
          <CardContent>
            {admin && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Nome</p>
                    <p className="text-base font-medium text-gray-800">{admin.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Telefono</p>
                    <p className="text-base font-medium text-gray-800">{admin.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-base font-medium text-gray-800">{admin.email}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {myUnit && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">La Mia Unita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div>
                <p className="text-sm text-gray-500">Piano</p>
                <p className="text-xl font-semibold text-gray-800">{myUnit.floor}°</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Interno</p>
                <p className="text-xl font-semibold text-gray-800">{myUnit.number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tipologia</p>
                <Badge variant="primary" className="mt-1">{myUnit.type}</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Superficie</p>
                <p className="text-xl font-semibold text-gray-800">{myUnit.sqm} m²</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Millesimi</p>
                <p className="text-xl font-semibold text-gray-800">{myUnit.millesimi}/1000</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary-400" />
            Notifiche Recenti
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {buildingNotifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 py-2">
                <div className={`h-2.5 w-2.5 rounded-full mt-2 flex-shrink-0 ${notif.read ? 'bg-gray-300' : 'bg-primary-400'}`} />
                <div>
                  <p className="text-base font-medium text-gray-800">{notif.title}</p>
                  <p className="text-sm text-gray-500">{notif.body}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
