export const admins = [
  { id: '1', name: 'Marco Bianchi', email: 'marco.bianchi@studiobianchi.it', studio: 'Studio Bianchi Amministrazioni', phone: '+39 02 1234567', plan: 'pro', buildingsCount: 12 },
  { id: '2', name: 'Francesca Moretti', email: 'f.moretti@gestionemoretti.it', studio: 'Moretti Gestioni Immobiliari', phone: '+39 06 7654321', plan: 'free', buildingsCount: 3 },
  { id: '3', name: 'Roberto Colombo', email: 'r.colombo@colomboamm.it', studio: 'Colombo & Associati', phone: '+39 011 9876543', plan: 'pro', buildingsCount: 8 },
]

export const staff = [
  { id: '10', name: 'Laura Verdi', email: 'laura.verdi@studiobianchi.it', role: 'staff', adminId: '1' },
  { id: '11', name: 'Paolo Fontana', email: 'p.fontana@studiobianchi.it', role: 'staff', adminId: '1' },
]

export const condomini = [
  { id: '20', name: 'Giuseppe Rossi', email: 'giuseppe.rossi@email.it', phone: '+39 333 1112222', buildingId: 'b1', unitId: 'u1', millesimi: 125 },
  { id: '21', name: 'Maria Esposito', email: 'maria.esposito@email.it', phone: '+39 338 3334444', buildingId: 'b1', unitId: 'u2', millesimi: 98 },
  { id: '22', name: 'Antonio Ferrari', email: 'a.ferrari@email.it', phone: '+39 347 5556666', buildingId: 'b1', unitId: 'u3', millesimi: 150 },
  { id: '23', name: 'Lucia Romano', email: 'l.romano@email.it', phone: '+39 340 7778888', buildingId: 'b1', unitId: 'u4', millesimi: 112 },
  { id: '24', name: 'Giovanni Conti', email: 'g.conti@email.it', phone: '+39 329 9990000', buildingId: 'b2', unitId: 'u5', millesimi: 88 },
  { id: '25', name: 'Anna Mancini', email: 'a.mancini@email.it', phone: '+39 320 1113333', buildingId: 'b2', unitId: 'u6', millesimi: 145 },
  { id: '26', name: 'Carlo Ricci', email: 'c.ricci@email.it', phone: '+39 345 2224444', buildingId: 'b3', unitId: 'u7', millesimi: 200 },
  { id: '27', name: 'Paola Greco', email: 'p.greco@email.it', phone: '+39 335 5557777', buildingId: 'b3', unitId: 'u8', millesimi: 82 },
]

export const fornitori = [
  { id: '30', name: 'Andrea Neri', email: 'info@idraulicaneri.it', company: 'Idraulica Neri S.r.l.' },
  { id: '31', name: 'Stefano Galli', email: 'info@gallielettrici.it', company: 'Galli Impianti Elettrici' },
]
