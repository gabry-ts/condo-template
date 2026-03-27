import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  KeyRound, LogIn, UserX, UserCheck, Eye, MoreHorizontal,
  Mail, Search, Shield, Users,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Tabs from '../../components/ui/Tabs'
import Dropdown from '../../components/ui/Dropdown'
import SearchBar from '../../components/shared/SearchBar'
import { useToast } from '../../components/ui/Toast'
import { useAuth } from '../../context/AuthContext'

import { admins, condomini } from '../../data/users'
import { buildings, units } from '../../data/buildings'

const planVariant = { pro: 'accent', free: 'default' }
const registrationDates = {
  '1': '15/01/2025',
  '2': '03/06/2025',
  '3': '22/09/2025',
}

export default function Admins() {
  const toast = useToast()
  const navigate = useNavigate()
  const { switchRole } = useAuth()

  const [search, setSearch] = useState('')
  const [adminStatuses, setAdminStatuses] = useState(() =>
    Object.fromEntries(admins.map((a) => [a.id, 'attivo']))
  )
  const [impersonateModal, setImpersonateModal] = useState(null)
  const [detailModal, setDetailModal] = useState(null)
  const [condominoDetail, setCondominoDetail] = useState(null)

  const handleResetPassword = (email) => {
    toast(`Link inviato a ${email}`, 'success')
  }

  const handleToggleStatus = (admin) => {
    const current = adminStatuses[admin.id]
    const next = current === 'attivo' ? 'sospeso' : 'attivo'
    setAdminStatuses((prev) => ({ ...prev, [admin.id]: next }))
    toast(
      next === 'sospeso'
        ? `Account di ${admin.name} sospeso`
        : `Account di ${admin.name} riattivato`,
      'success'
    )
  }

  const handleImpersonate = () => {
    switchRole('admin')
    navigate('/studio/dashboard')
  }

  const getAdminDropdownItems = (admin) => [
    {
      icon: KeyRound,
      label: 'Invia Link Reset Password',
      onClick: () => handleResetPassword(admin.email),
    },
    {
      icon: LogIn,
      label: 'Accedi come',
      onClick: () => setImpersonateModal(admin),
    },
    { divider: true },
    adminStatuses[admin.id] === 'attivo'
      ? {
          icon: UserX,
          label: 'Sospendi Account',
          onClick: () => handleToggleStatus(admin),
          destructive: true,
        }
      : {
          icon: UserCheck,
          label: 'Riattiva Account',
          onClick: () => handleToggleStatus(admin),
        },
    { divider: true },
    {
      icon: Eye,
      label: 'Dettaglio',
      onClick: () => setDetailModal(admin),
    },
  ]

  const getCondominoDropdownItems = (cond) => [
    {
      icon: KeyRound,
      label: 'Invia Link Reset Password',
      onClick: () => handleResetPassword(cond.email),
    },
    { divider: true },
    {
      icon: Eye,
      label: 'Dettaglio',
      onClick: () => setCondominoDetail(cond),
    },
  ]

  const filteredAdmins = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.studio.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  )

  const filteredCondomini = condomini.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  const getBuildingName = (buildingId) => {
    const b = buildings.find((x) => x.id === buildingId)
    return b ? b.name : '-'
  }

  const getUnitLabel = (unitId) => {
    const u = units.find((x) => x.id === unitId)
    return u ? u.number : '-'
  }

  const adminTable = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Studio</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Piano</TableHead>
          <TableHead>Immobili</TableHead>
          <TableHead>Stato</TableHead>
          <TableHead>Data Registrazione</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAdmins.map((admin) => (
          <TableRow key={admin.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar name={admin.name} size="sm" />
                <span className="font-medium text-gray-800">{admin.name}</span>
              </div>
            </TableCell>
            <TableCell>{admin.studio}</TableCell>
            <TableCell className="text-gray-500">{admin.email}</TableCell>
            <TableCell>
              <Badge variant={planVariant[admin.plan]}>
                {admin.plan === 'pro' ? 'Pro' : 'Freemium'}
              </Badge>
            </TableCell>
            <TableCell>
              <span className="font-mono">{admin.buildingsCount}</span>
            </TableCell>
            <TableCell>
              <Badge variant={adminStatuses[admin.id] === 'attivo' ? 'success' : 'destructive'}>
                {adminStatuses[admin.id] === 'attivo' ? 'Attivo' : 'Sospeso'}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-500">
              {registrationDates[admin.id] || '01/01/2026'}
            </TableCell>
            <TableCell>
              <Dropdown items={getAdminDropdownItems(admin)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const condominoTable = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Immobile</TableHead>
          <TableHead>Unita</TableHead>
          <TableHead>Millesimi</TableHead>
          <TableHead>Stato</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCondomini.map((cond) => (
          <TableRow key={cond.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar name={cond.name} size="sm" />
                <span className="font-medium text-gray-800">{cond.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-gray-500">{cond.email}</TableCell>
            <TableCell>{getBuildingName(cond.buildingId)}</TableCell>
            <TableCell>{getUnitLabel(cond.unitId)}</TableCell>
            <TableCell>
              <span className="font-mono">{cond.millesimi}</span>
            </TableCell>
            <TableCell>
              <Badge variant="success">Attivo</Badge>
            </TableCell>
            <TableCell>
              <Dropdown items={getCondominoDropdownItems(cond)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const tabs = [
    {
      id: 'admins',
      label: `Amministratori (${admins.length})`,
      content: adminTable,
    },
    {
      id: 'condomini',
      label: `Utenti / Condomini (${condomini.length})`,
      content: condominoTable,
    },
  ]

  return (
    <div>
      <PageHeader
        title="Gestione Utenti"
        description={`${admins.length} amministratori e ${condomini.length} condomini registrati`}
      />

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cerca per nome, studio o email..."
          className="max-w-md"
        />
      </div>

      <Tabs tabs={tabs} defaultTab="admins" />

      {/* Modal Impersonate */}
      <Modal
        open={!!impersonateModal}
        onClose={() => setImpersonateModal(null)}
        title="Accedi come Amministratore"
        footer={
          <>
            <Button variant="ghost" onClick={() => setImpersonateModal(null)}>
              Annulla
            </Button>
            <Button onClick={handleImpersonate}>
              <LogIn className="h-4 w-4 mr-1.5" />
              Accedi
            </Button>
          </>
        }
      >
        {impersonateModal && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-warning-50 border border-warning-200 rounded-xl">
              <Shield className="h-5 w-5 text-warning-500 flex-shrink-0" />
              <p className="text-sm text-warning-700">
                Stai per accedere come <strong>{impersonateModal.studio}</strong>. Questo ti
                permettera di vedere e operare come questo amministratore.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Nome</span>
                <p className="font-medium text-gray-800">{impersonateModal.name}</p>
              </div>
              <div>
                <span className="text-gray-500">Studio</span>
                <p className="font-medium text-gray-800">{impersonateModal.studio}</p>
              </div>
              <div>
                <span className="text-gray-500">Email</span>
                <p className="font-medium text-gray-800">{impersonateModal.email}</p>
              </div>
              <div>
                <span className="text-gray-500">Piano</span>
                <p className="font-medium text-gray-800">
                  {impersonateModal.plan === 'pro' ? 'Pro' : 'Freemium'}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Dettaglio Admin */}
      <Modal
        open={!!detailModal}
        onClose={() => setDetailModal(null)}
        title="Dettaglio Amministratore"
        size="md"
        footer={
          <Button variant="ghost" onClick={() => setDetailModal(null)}>
            Chiudi
          </Button>
        }
      >
        {detailModal && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar name={detailModal.name} size="lg" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{detailModal.name}</h3>
                <p className="text-sm text-gray-500">{detailModal.studio}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm pt-2">
              <div>
                <span className="text-gray-500">Email</span>
                <p className="font-medium text-gray-800">{detailModal.email}</p>
              </div>
              <div>
                <span className="text-gray-500">Telefono</span>
                <p className="font-medium text-gray-800">{detailModal.phone}</p>
              </div>
              <div>
                <span className="text-gray-500">Piano</span>
                <p className="font-medium text-gray-800">
                  {detailModal.plan === 'pro' ? 'Pro' : 'Freemium'}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Immobili Gestiti</span>
                <p className="font-medium text-gray-800">{detailModal.buildingsCount}</p>
              </div>
              <div>
                <span className="text-gray-500">Stato</span>
                <p className="font-medium text-gray-800">
                  <Badge
                    variant={adminStatuses[detailModal.id] === 'attivo' ? 'success' : 'destructive'}
                  >
                    {adminStatuses[detailModal.id] === 'attivo' ? 'Attivo' : 'Sospeso'}
                  </Badge>
                </p>
              </div>
              <div>
                <span className="text-gray-500">Data Registrazione</span>
                <p className="font-medium text-gray-800">
                  {registrationDates[detailModal.id] || '01/01/2026'}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Dettaglio Condomino */}
      <Modal
        open={!!condominoDetail}
        onClose={() => setCondominoDetail(null)}
        title="Dettaglio Condomino"
        size="md"
        footer={
          <Button variant="ghost" onClick={() => setCondominoDetail(null)}>
            Chiudi
          </Button>
        }
      >
        {condominoDetail && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar name={condominoDetail.name} size="lg" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{condominoDetail.name}</h3>
                <p className="text-sm text-gray-500">{condominoDetail.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm pt-2">
              <div>
                <span className="text-gray-500">Email</span>
                <p className="font-medium text-gray-800">{condominoDetail.email}</p>
              </div>
              <div>
                <span className="text-gray-500">Telefono</span>
                <p className="font-medium text-gray-800">{condominoDetail.phone}</p>
              </div>
              <div>
                <span className="text-gray-500">Immobile</span>
                <p className="font-medium text-gray-800">
                  {getBuildingName(condominoDetail.buildingId)}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Unita</span>
                <p className="font-medium text-gray-800">
                  {getUnitLabel(condominoDetail.unitId)}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Millesimi</span>
                <p className="font-medium text-gray-800">{condominoDetail.millesimi}</p>
              </div>
              <div>
                <span className="text-gray-500">Stato</span>
                <p className="font-medium text-gray-800">
                  <Badge variant="success">Attivo</Badge>
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
