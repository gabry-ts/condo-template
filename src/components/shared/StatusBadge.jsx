import Badge from '../ui/Badge'

const statusMap = {
  pagata: { variant: 'success', label: 'Pagata' },
  pagato: { variant: 'success', label: 'Pagato' },
  completato: { variant: 'success', label: 'Completato' },
  completata: { variant: 'success', label: 'Completata' },
  risolto: { variant: 'success', label: 'Risolto' },
  risolta: { variant: 'success', label: 'Risolta' },
  attiva: { variant: 'success', label: 'Attiva' },
  conclusa: { variant: 'success', label: 'Conclusa' },

  non_pagata: { variant: 'destructive', label: 'Non Pagata' },
  non_pagato: { variant: 'destructive', label: 'Non Pagato' },
  aperto: { variant: 'destructive', label: 'Aperto' },
  aperta: { variant: 'destructive', label: 'Aperta' },
  critico: { variant: 'destructive', label: 'Critico' },
  moroso: { variant: 'destructive', label: 'Moroso' },

  in_scadenza: { variant: 'warning', label: 'In Scadenza' },
  in_attesa: { variant: 'warning', label: 'In Attesa' },
  convocata: { variant: 'warning', label: 'Convocata' },
  parziale: { variant: 'warning', label: 'Parziale' },

  in_lavorazione: { variant: 'info', label: 'In Lavorazione' },
  in_corso: { variant: 'info', label: 'In Corso' },
  programmata: { variant: 'info', label: 'Programmata' },
  assegnato: { variant: 'info', label: 'Assegnato' },

  bozza: { variant: 'default', label: 'Bozza' },
  annullato: { variant: 'default', label: 'Annullato' },
  annullata: { variant: 'default', label: 'Annullata' },
}

export default function StatusBadge({ status, className }) {
  const config = statusMap[status] || { variant: 'default', label: status }
  return <Badge variant={config.variant} className={className}>{config.label}</Badge>
}
