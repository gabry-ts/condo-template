import { useState } from 'react'
import { User } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'

import { suppliers } from '../../data/suppliers'

const currentSupplierId = 's1'

export default function Profile() {
  const supplier = suppliers.find((s) => s.id === currentSupplierId)
  const toast = useToast()

  const [form, setForm] = useState({
    contact: supplier?.contact || '',
    email: supplier?.email || '',
    phone: supplier?.phone || '',
    address: supplier?.address || '',
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast('Profilo aggiornato')
  }

  return (
    <div>
      <PageHeader
        title="Profilo Aziendale"
        description="Gestisci le informazioni della tua azienda"
      />

      <div className="space-y-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Dati Aziendali</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Ragione Sociale</label>
                <p className="text-sm text-gray-800 bg-gray-50 rounded-2xl px-4 py-2.5">{supplier?.company}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Categoria</label>
                <p className="text-sm text-gray-800 bg-gray-50 rounded-2xl px-4 py-2.5">{supplier?.category}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">P.IVA</label>
                <p className="text-sm text-gray-800 font-mono bg-gray-50 rounded-2xl px-4 py-2.5">{supplier?.piva}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">IBAN</label>
                <p className="text-sm text-gray-800 font-mono bg-gray-50 rounded-2xl px-4 py-2.5">{supplier?.iban}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informazioni di Contatto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Referente"
                  value={form.contact}
                  onChange={handleChange('contact')}
                />
                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                />
                <Input
                  label="Telefono"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Indirizzo"
                    value={form.address}
                    onChange={handleChange('address')}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary">
                  Salva Modifiche
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
