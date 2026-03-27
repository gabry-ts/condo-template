import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { buildings, units } from '../../data/buildings'
import { condomini, admins } from '../../data/users'
import {
  Building2,
  MapPin,
  Layers,
  Maximize2,
  PieChart,
  User,
  Phone,
  Mail,
  ChevronRight,
} from 'lucide-react'

export default function Property() {
  const { user } = useAuth()

  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]
  const myUnits = units.filter((u) => u.condominoId === condomino.id)
  const myBuildings = myUnits.map((unit) => {
    const building = buildings.find((b) => b.id === unit.buildingId)
    return { ...building, unit }
  })

  const admin = admins.find((a) => a.id === myBuildings[0]?.adminId)

  if (myBuildings.length === 1) {
    const { unit } = myBuildings[0]
    const building = myBuildings[0]

    return (
      <div className="space-y-8">
        <PageHeader
          title="Il Mio Immobile"
          description="Dettagli della tua proprieta"
        />

        <Card className="p-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="h-16 w-16 rounded-2xl bg-primary-50 flex items-center justify-center flex-shrink-0">
              <Building2 className="h-8 w-8 text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{building.name}</h2>
              <p className="text-lg text-gray-500 flex items-center gap-2 mt-1">
                <MapPin className="h-5 w-5" />
                {building.address}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Unita Immobiliare
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-500">Piano</p>
                    <p className="text-base font-medium text-gray-800">{unit.floor}°</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-500">Interno</p>
                    <p className="text-base font-medium text-gray-800">{unit.number}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="primary">{unit.type}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Maximize2 className="h-5 w-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-500">Superficie</p>
                    <p className="text-base font-medium text-gray-800">{unit.sqm} m²</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <PieChart className="h-5 w-5 text-primary-400" />
                  <div>
                    <p className="text-sm text-gray-500">Millesimi</p>
                    <p className="text-base font-medium text-gray-800">{unit.millesimi}/1000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Amministratore
              </h3>
              {admin && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary-400" />
                    <div>
                      <p className="text-sm text-gray-500">Nome</p>
                      <p className="text-base font-medium text-gray-800">{admin.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary-400" />
                    <div>
                      <p className="text-sm text-gray-500">Telefono</p>
                      <p className="text-base font-medium text-gray-800">{admin.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-base font-medium text-gray-800">{admin.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="I Miei Immobili"
        description={`${myBuildings.length} proprieta associate al tuo account`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myBuildings.map((building) => (
          <Card key={building.id} hover>
            <Link to={`/connect/immobili/${building.id}`}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-7 w-7 text-primary-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{building.name}</CardTitle>
                    <CardDescription className="text-base flex items-center gap-1.5 mt-1">
                      <MapPin className="h-4 w-4" />
                      {building.address}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Interno</p>
                    <p className="text-lg font-semibold text-gray-800">{building.unit.number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Piano</p>
                    <p className="text-lg font-semibold text-gray-800">{building.unit.floor}°</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Superficie</p>
                    <p className="text-lg font-semibold text-gray-800">{building.unit.sqm} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Millesimi</p>
                    <p className="text-lg font-semibold text-gray-800">{building.unit.millesimi}/1000</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <span className="text-sm text-primary-400 flex items-center gap-1">
                  Vedi dettagli <ChevronRight className="h-4 w-4" />
                </span>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
