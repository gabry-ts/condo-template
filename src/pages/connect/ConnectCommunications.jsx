import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { Mail, Paperclip, ChevronRight, Eye } from 'lucide-react'
import { condomini } from '../../data/users'
import { communications } from '../../data/communications'

export default function ConnectCommunications() {
  const { user } = useAuth()
  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]
  const [selectedId, setSelectedId] = useState(null)

  const myComms = communications
    .filter((c) => c.buildingId === condomino.buildingId)
    .sort((a, b) => new Date(b.sentDate) - new Date(a.sentDate))

  const selected = myComms.find((c) => c.id === selectedId)

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedId(null)} className="text-sm text-primary-400 hover:text-primary-500 font-medium">
          &larr; Torna alle comunicazioni
        </button>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-800">{selected.subject}</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Da: {selected.sentBy} · {new Date(selected.sentDate).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed border-t border-gray-100 pt-4">
              {selected.body}
            </div>

            {selected.attachments.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Allegati ({selected.attachments.length})</p>
                <div className="space-y-2">
                  {selected.attachments.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                      <Paperclip className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">{a.name}</p>
                        <p className="text-xs text-gray-400">{a.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Comunicazioni"
        description={`${myComms.length} comunicazioni ricevute`}
      />

      {myComms.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Nessuna comunicazione ricevuta</p>
        </div>
      ) : (
        <div className="space-y-2">
          {myComms.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className="w-full text-left flex items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{c.subject}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Da: {c.sentBy} · {new Date(c.sentDate).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {c.attachments.length > 0 && (
                  <div className="flex items-center gap-1 text-gray-400">
                    <Paperclip className="h-3.5 w-3.5" />
                    <span className="text-xs">{c.attachments.length}</span>
                  </div>
                )}
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
