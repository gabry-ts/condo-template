import { useParams } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { Phone, Mail, MapPin, Star, Wrench, Building2, Tag } from 'lucide-react'
import { suppliers } from '../../data/suppliers'

export default function ConnectSupplierDetail() {
  const { supplierId } = useParams()
  const supplier = suppliers.find((s) => s.id === supplierId)

  if (!supplier) {
    return <div className="text-center py-16"><p className="text-lg text-gray-500">Fornitore non trovato</p></div>
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={supplier.company}
        breadcrumbs={[
          { label: 'Fornitori', to: '/connect/fornitori' },
          { label: supplier.company },
        ]}
      />

      {/* Header */}
      <Card>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center flex-shrink-0">
              <Wrench className="h-7 w-7 text-primary-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h2 className="text-lg font-bold text-gray-800">{supplier.company}</h2>
                <Badge variant="primary">{supplier.category}</Badge>
              </div>
              <p className="text-sm text-gray-500">{supplier.contact}</p>
              <div className="flex items-center gap-0.5 mt-2">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className={`h-4 w-4 ${i <= Math.round(supplier.rating) ? 'text-warning-500 fill-warning-500' : 'text-gray-200'}`} />
                ))}
                <span className="text-sm font-medium text-gray-600 ml-1.5">{supplier.rating}/5</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contatti */}
      <Card>
        <CardHeader><CardTitle className="text-base">Informazioni di Contatto</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Telefono</p>
                <a href={`tel:${supplier.phone}`} className="text-sm font-medium text-primary-400 hover:text-primary-500">{supplier.phone}</a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <a href={`mailto:${supplier.email}`} className="text-sm font-medium text-primary-400 hover:text-primary-500">{supplier.email}</a>
              </div>
            </div>
            {supplier.address && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Indirizzo</p>
                  <p className="text-sm font-medium text-gray-800">{supplier.address}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <Tag className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Categoria</p>
                <p className="text-sm font-medium text-gray-800">{supplier.category}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info aggiuntive */}
      <Card>
        <CardHeader><CardTitle className="text-base">Dettagli</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-gray-50 text-center">
              <p className="text-2xl font-bold font-mono text-gray-800">{supplier.completedJobs || 0}</p>
              <p className="text-xs text-gray-500 mt-0.5">Lavori completati</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 text-center">
              <p className="text-2xl font-bold font-mono text-gray-800">{supplier.buildings?.length || 0}</p>
              <p className="text-xs text-gray-500 mt-0.5">Condomini serviti</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
