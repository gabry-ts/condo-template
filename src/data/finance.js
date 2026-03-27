export const transactions = [
  { id: 't1', date: '2026-03-15', description: 'Pulizie scale marzo', amount: -480.00, type: 'uscita', buildingId: 'b1', supplierId: 's3', category: 'Pulizie', source: 'supplier', supplierName: 'Pulizie Express S.r.l.' },
  { id: 't2', date: '2026-03-10', description: 'Rata condominiale Q1 - Rossi', amount: 850.00, type: 'entrata', buildingId: 'b1', condominoId: '20', rateId: 'r1', category: 'Rate', source: 'building' },
  { id: 't3', date: '2026-03-08', description: 'Manutenzione ascensore', amount: -1200.00, type: 'uscita', buildingId: 'b1', supplierId: 's4', maintenanceId: 'm2', category: 'Manutenzione', source: 'supplier', supplierName: 'Ascensori Rapidi S.r.l.' },
  { id: 't4', date: '2026-03-05', description: 'Rata condominiale Q1 - Esposito', amount: 680.00, type: 'entrata', buildingId: 'b1', condominoId: '21', rateId: 'r3', category: 'Rate', source: 'building' },
  { id: 't5', date: '2026-03-01', description: 'Fornitura energia elettrica febbraio', amount: -320.00, type: 'uscita', buildingId: 'b1', category: 'Utenze', source: 'third_party', thirdPartyName: 'Enel Energia S.p.A.' },
  { id: 't6', date: '2026-02-28', description: 'Intervento idraulico appartamento 3', amount: -350.00, type: 'uscita', buildingId: 'b1', supplierId: 's1', maintenanceId: 'm1', category: 'Manutenzione', source: 'supplier', supplierName: 'Idraulica Neri S.r.l.' },
  { id: 't7', date: '2026-02-20', description: 'Rata condominiale Q1 - Ferrari', amount: 1050.00, type: 'entrata', buildingId: 'b1', condominoId: '22', rateId: 'r5', category: 'Rate', source: 'building' },
  { id: 't8', date: '2026-02-15', description: 'Pulizie scale febbraio', amount: -480.00, type: 'uscita', buildingId: 'b1', supplierId: 's3', category: 'Pulizie', source: 'supplier', supplierName: 'Pulizie Express S.r.l.' },
  { id: 't9', date: '2026-02-10', description: 'Assicurazione annuale fabbricato', amount: -2400.00, type: 'uscita', buildingId: 'b1', category: 'Assicurazione', source: 'third_party', thirdPartyName: 'Generali Assicurazioni' },
  { id: 't10', date: '2026-01-30', description: 'Giardinaggio trimestrale', amount: -350.00, type: 'uscita', buildingId: 'b2', supplierId: 's5', category: 'Giardinaggio', source: 'supplier', supplierName: 'Verde Vivo S.r.l.' },
  { id: 't11', date: '2026-01-15', description: 'Compenso amministratore Q1', amount: -750.00, type: 'uscita', buildingId: 'b1', category: 'Compenso', source: 'studio' },
  { id: 't12', date: '2026-01-10', description: 'Commissioni bancarie dicembre', amount: -12.50, type: 'uscita', buildingId: 'b1', category: 'Spese Bancarie', source: 'third_party', thirdPartyName: 'Intesa Sanpaolo' },
]

export const rates = [
  { id: 'r1', condominoId: '20', buildingId: 'b1', year: 2026, quarter: 'Q1', amount: 850.00, dueDate: '2026-03-31', status: 'pagata', paidDate: '2026-03-10' },
  { id: 'r2', condominoId: '20', buildingId: 'b1', year: 2026, quarter: 'Q2', amount: 850.00, dueDate: '2026-06-30', status: 'non_pagata', paidDate: null },
  { id: 'r3', condominoId: '21', buildingId: 'b1', year: 2026, quarter: 'Q1', amount: 680.00, dueDate: '2026-03-31', status: 'pagata', paidDate: '2026-03-05' },
  { id: 'r4', condominoId: '21', buildingId: 'b1', year: 2026, quarter: 'Q2', amount: 680.00, dueDate: '2026-06-30', status: 'non_pagata', paidDate: null },
  { id: 'r5', condominoId: '22', buildingId: 'b1', year: 2026, quarter: 'Q1', amount: 1050.00, dueDate: '2026-03-31', status: 'pagata', paidDate: '2026-02-20' },
  { id: 'r6', condominoId: '23', buildingId: 'b1', year: 2026, quarter: 'Q1', amount: 780.00, dueDate: '2026-03-31', status: 'in_scadenza', paidDate: null },
  { id: 'r7', condominoId: '24', buildingId: 'b2', year: 2026, quarter: 'Q1', amount: 620.00, dueDate: '2026-03-31', status: 'non_pagata', paidDate: null },
  { id: 'r8', condominoId: '25', buildingId: 'b2', year: 2026, quarter: 'Q1', amount: 980.00, dueDate: '2026-03-31', status: 'pagata', paidDate: '2026-03-12' },
]

export const balanceHistory = [
  { month: 'Ott', value: 18500 },
  { month: 'Nov', value: 16200 },
  { month: 'Dic', value: 14800 },
  { month: 'Gen', value: 19200 },
  { month: 'Feb', value: 17400 },
  { month: 'Mar', value: 15420 },
]

export const expenseCategories = [
  { category: 'Pulizie', amount: 5760, percentage: 22, source: 'supplier', supplierName: 'Pulizie Express S.r.l.' },
  { category: 'Manutenzione', amount: 7800, percentage: 30, source: 'supplier' },
  { category: 'Utenze', amount: 3840, percentage: 15, source: 'third_party' },
  { category: 'Assicurazione', amount: 2400, percentage: 9, source: 'third_party', thirdPartyName: 'Generali' },
  { category: 'Ascensore', amount: 3600, percentage: 14, source: 'supplier', supplierName: 'Ascensori Rapidi S.r.l.' },
  { category: 'Giardinaggio', amount: 1400, percentage: 5, source: 'supplier', supplierName: 'Verde Vivo S.r.l.' },
  { category: 'Compenso Amm.', amount: 3000, percentage: 3, source: 'studio' },
  { category: 'Spese Bancarie', amount: 150, percentage: 1, source: 'third_party', thirdPartyName: 'Intesa Sanpaolo' },
  { category: 'Altro', amount: 1050, percentage: 1, source: 'building' },
]

// Ripartizione spese per condomino
export const expenseDistributionByCondomino = [
  { condominoId: '20', name: 'Giuseppe Rossi', millesimi: 125, totalAmount: 3680, paidAmount: 2580, unpaidAmount: 1100 },
  { condominoId: '21', name: 'Maria Esposito', millesimi: 98, totalAmount: 2886, paidAmount: 2886, unpaidAmount: 0 },
  { condominoId: '22', name: 'Antonio Ferrari', millesimi: 150, totalAmount: 4416, paidAmount: 4416, unpaidAmount: 0 },
  { condominoId: '23', name: 'Lucia Romano', millesimi: 112, totalAmount: 3298, paidAmount: 1738, unpaidAmount: 1560 },
]
