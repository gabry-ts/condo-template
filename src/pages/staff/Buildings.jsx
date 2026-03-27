import { useState } from 'react'
import { Building2, MapPin, Home } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardContent } from '../../components/ui/Card'
import SearchBar from '../../components/shared/SearchBar'
import EmptyState from '../../components/shared/EmptyState'

import { buildings } from '../../data/buildings'

export default function Buildings() {
  const [search, setSearch] = useState('')

  const filtered = buildings.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase()) ||
      b.city.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <PageHeader
        title="Immobili"
        description={`${buildings.length} immobili gestiti`}
      />

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cerca per nome, indirizzo o citta..."
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="Nessun immobile trovato"
          description="Prova a modificare i criteri di ricerca."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((building) => (
            <Card key={building.id} className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-10 w-10 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary-500" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-1">{building.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  {building.address}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Home className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">{building.unitsCount} unita</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
