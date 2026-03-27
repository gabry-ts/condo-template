import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'
import { condomini } from '../../data/users'
import { documents, documentCategories } from '../../data/documents'
import { cn } from '../../lib/cn'
import {
  FileText, Download, FileSpreadsheet, File,
  ShieldCheck, Scale, ScrollText, Receipt, Landmark, FolderOpen,
} from 'lucide-react'

const categoryIcons = {
  Regolamento: Scale,
  Bilancio: Landmark,
  Verbale: ScrollText,
  Contratto: FileText,
  Certificazione: ShieldCheck,
  Assicurazione: ShieldCheck,
  'Estratto Conto': Receipt,
  Altro: FolderOpen,
}

const categoryColors = {
  Regolamento: 'bg-violet-50 text-violet-500',
  Bilancio: 'bg-emerald-50 text-emerald-500',
  Verbale: 'bg-blue-50 text-blue-500',
  Contratto: 'bg-amber-50 text-amber-500',
  Certificazione: 'bg-red-50 text-red-500',
  Assicurazione: 'bg-pink-50 text-pink-500',
  'Estratto Conto': 'bg-cyan-50 text-cyan-500',
  Altro: 'bg-gray-100 text-gray-500',
}

function getFileIcon(type) {
  switch (type) {
    case 'XLSX': return FileSpreadsheet
    case 'PDF': return FileText
    default: return File
  }
}

export default function ConnectDocuments() {
  const { user } = useAuth()
  const [category, setCategory] = useState('Tutte')
  const toast = useToast()

  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]

  const myDocuments = documents
    .filter((d) => d.buildingId === condomino.buildingId)
    .filter((d) => category === 'Tutte' || d.category === category)
    .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))

  const categories = ['Tutte', ...documentCategories]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Documenti</h1>
        <p className="text-sm text-gray-500 mt-0.5">Documenti del tuo condominio</p>
      </div>

      {/* Category Filter Pills - Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0',
              category === cat
                ? 'bg-primary-400 text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {myDocuments.length === 0 ? (
        <div className="text-center py-16">
          <div className="h-20 w-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-10 w-10 text-primary-300" />
          </div>
          <p className="text-lg font-semibold text-gray-700">Nessun documento</p>
          <p className="text-sm text-gray-400 mt-1">Non ci sono documenti per questa categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {myDocuments.map((doc) => {
            const CatIcon = categoryIcons[doc.category] || FolderOpen
            const catColor = categoryColors[doc.category] || 'bg-gray-100 text-gray-500'
            return (
              <div
                key={doc.id}
                className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 flex flex-col active:scale-[0.98] transition-transform"
              >
                <div className={`h-11 w-11 rounded-xl ${catColor} flex items-center justify-center mb-3`}>
                  <CatIcon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight flex-1">
                  {doc.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1.5">
                  {doc.type} &middot; {doc.size}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(doc.uploadDate).toLocaleDateString('it-IT')}
                </p>
                <button
                  className="mt-3 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-medium transition-colors w-full"
                  onClick={() => toast('Download avviato: ' + doc.name)}
                >
                  <Download className="h-3.5 w-3.5" />
                  Scarica
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
