import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import PageHeader from '../../components/layout/PageHeader'
import Badge from '../../components/ui/Badge'
import { condomini } from '../../data/users'
import { suppliers } from '../../data/suppliers'
import { Phone, Mail, Star, Wrench } from 'lucide-react'

export default function ConnectSuppliers() {
  const { user } = useAuth()
  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]
  const mySuppliers = suppliers.filter((s) => s.buildings.includes(condomino.buildingId))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fornitori Accreditati"
        description="Fornitori di servizi del tuo condominio"
      />

      {mySuppliers.length === 0 ? (
        <div className="text-center py-12">
          <Wrench className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Nessun fornitore accreditato</p>
        </div>
      ) : (
        <div className="space-y-2">
          {mySuppliers.map((s) => (
            <Link key={s.id} to={`/connect/fornitori/${s.id}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="h-11 w-11 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Wrench className="h-5 w-5 text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-gray-800 truncate">{s.company}</p>
                  <Badge variant="primary">{s.category}</Badge>
                </div>
                <p className="text-xs text-gray-500">{s.contact}</p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Phone className="h-3 w-3" />{s.phone}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Mail className="h-3 w-3" /><span className="truncate max-w-[160px]">{s.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i <= Math.round(s.rating) ? 'text-warning-500 fill-warning-500' : 'text-gray-200'}`} />
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
