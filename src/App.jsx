import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import RoleSwitcher from './components/shared/RoleSwitcher'

// Layouts
import StudioLayout from './components/layout/StudioLayout'
import ConnectLayout from './components/layout/ConnectLayout'
import FornitoreLayout from './components/layout/FornitoreLayout'
import SuperuserLayout from './components/layout/SuperuserLayout'

// Landing
import Home from './pages/landing/Home'
import Faq from './pages/landing/Faq'
import Webinar from './pages/landing/Webinar'
import Contact from './pages/landing/Contact'
import Incentivi from './pages/landing/Incentivi'

// Auth
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import QrActivation from './pages/auth/QrActivation'
import TwoFactor from './pages/auth/TwoFactor'
import ForgotPassword from './pages/auth/ForgotPassword'
import PlanSelection from './pages/auth/PlanSelection'

// Studio
import StudioDashboard from './pages/studio/Dashboard'
import Buildings from './pages/studio/Buildings'
import BuildingDetail from './pages/studio/BuildingDetail'
import UnitDetail from './pages/studio/UnitDetail'
import Finance from './pages/studio/Finance'
import BankStatements from './pages/studio/BankStatements'
import BalanceSheets from './pages/studio/BalanceSheets'
import RateGeneration from './pages/studio/RateGeneration'
import ExpenseDistribution from './pages/studio/ExpenseDistribution'
import Preventivi from './pages/studio/Preventivi'
import TransactionDetail from './pages/studio/TransactionDetail'
import Delinquency from './pages/studio/Delinquency'
import DelinquencyDetail from './pages/studio/DelinquencyDetail'
import Documents from './pages/studio/Documents'
import DocumentUpload from './pages/studio/DocumentUpload'
import DocumentDetail from './pages/studio/DocumentDetail'
import Maintenance from './pages/studio/Maintenance'
import MaintenanceDetail from './pages/studio/MaintenanceDetail'
import Assemblies from './pages/studio/Assemblies'
import AssemblyDetail from './pages/studio/AssemblyDetail'
import AssemblyCreate from './pages/studio/AssemblyCreate'
import Agenda from './pages/studio/Agenda'
import Communications from './pages/studio/Communications'
import CommunicationCreate from './pages/studio/CommunicationCreate'
import CommunicationDetail from './pages/studio/CommunicationDetail'
import Tickets from './pages/studio/Tickets'
import TicketDetail from './pages/studio/TicketDetail'
import Billing from './pages/studio/Billing'
import Settings from './pages/studio/Settings'
import Help from './pages/studio/Help'
import Suppliers from './pages/studio/Suppliers'
import SupplierDetail from './pages/studio/SupplierDetail'
import SupplierCreate from './pages/studio/SupplierCreate'
import CondominoDetail from './pages/studio/CondominoDetail'
import CondominoCreate from './pages/studio/CondominoCreate'
import UnitCreate from './pages/studio/UnitCreate'
import Condomini from './pages/studio/Condomini'
import BuildingCreate from './pages/studio/BuildingCreate'
import MaintenanceCreate from './pages/studio/MaintenanceCreate'
import StudioMore from './pages/studio/More'
import StudioSettings from './pages/studio/StudioSettings'
import Upgrade from './pages/studio/Upgrade'

// Connect
import ConnectDashboard from './pages/connect/Dashboard'
import ConnectProperty from './pages/connect/Property'
import ConnectPropertyDetail from './pages/connect/PropertyDetail'
import ConnectRates from './pages/connect/Rates'
import ConnectBalanceSheets from './pages/connect/ConnectBalanceSheets'
import ConnectPreventivi from './pages/connect/ConnectPreventivi'
import ConnectAssemblies from './pages/connect/ConnectAssemblies'
import ConnectAssemblyDetail from './pages/connect/ConnectAssemblyDetail'
import ConnectTickets from './pages/connect/ConnectTickets'
import ConnectTicketCreate from './pages/connect/TicketCreate'
import ConnectTicketDetail from './pages/connect/ConnectTicketDetail'
import ConnectDocuments from './pages/connect/ConnectDocuments'
import ConnectSuppliers from './pages/connect/ConnectSuppliers'
import ConnectSupplierDetail from './pages/connect/ConnectSupplierDetail'
import ConnectMaintenance from './pages/connect/ConnectMaintenance'
import ConnectNotifications from './pages/connect/ConnectNotifications'
import ConnectCommunications from './pages/connect/ConnectCommunications'
import ConnectProfile from './pages/connect/ConnectProfile'
import ConnectMore from './pages/connect/More'

// Supplier Portal
import SupplierPortalDashboard from './pages/supplier/Dashboard'
import SupplierJobs from './pages/supplier/Jobs'
import SupplierJobDetail from './pages/supplier/JobDetail'
import SupplierPayments from './pages/supplier/Payments'
import SupplierProfile from './pages/supplier/Profile'

// Superuser
import SuperDashboard from './pages/superuser/Dashboard'
import SuperAdmins from './pages/superuser/Admins'
import SuperPlans from './pages/superuser/Plans'
import SuperSystem from './pages/superuser/System'

// 404
function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Pagina non trovata</p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
          Torna alla Home
        </a>
      </div>
    </div>
  )
}

export default function App() {
  const { user, isAuthenticated } = useAuth()

  return (
    <>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/contattaci" element={<Contact />} />
        <Route path="/incentivi" element={<Incentivi />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/registrazione" element={<Register />} />
        <Route path="/attivazione-qr" element={<QrActivation />} />
        <Route path="/verifica-2fa" element={<TwoFactor />} />
        <Route path="/recupera-password" element={<ForgotPassword />} />
        <Route path="/scegli-piano" element={<PlanSelection />} />

        {/* Studio (Admin + Staff) */}
        <Route path="/studio" element={<StudioLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudioDashboard />} />
          <Route path="condomini" element={<Condomini />} />
          <Route path="condomini/nuovo" element={<CondominoCreate />} />
          <Route path="immobili" element={<Buildings />} />
          <Route path="immobili/nuovo" element={<BuildingCreate />} />
          <Route path="immobili/:id" element={<BuildingDetail />} />
          <Route path="immobili/:id/unita/nuova" element={<UnitCreate />} />
          <Route path="immobili/:id/unita/:uid" element={<UnitDetail />} />
          <Route path="immobili/:id/condomini/nuovo" element={<CondominoCreate />} />
          <Route path="immobili/:id/condomini/:condominoId" element={<CondominoDetail />} />
          <Route path="finanze" element={<Finance />} />
          <Route path="finanze/estratti-conto" element={<BankStatements />} />
          <Route path="finanze/bilanci" element={<BalanceSheets />} />
          <Route path="finanze/rate" element={<RateGeneration />} />
          <Route path="finanze/ripartizione" element={<ExpenseDistribution />} />
          <Route path="finanze/preventivi" element={<Preventivi />} />
          <Route path="finanze/movimenti/:txId" element={<TransactionDetail />} />
          <Route path="morosita" element={<Delinquency />} />
          <Route path="morosita/:id" element={<DelinquencyDetail />} />
          <Route path="fornitori" element={<Suppliers />} />
          <Route path="fornitori/nuovo" element={<SupplierCreate />} />
          <Route path="fornitori/:id" element={<SupplierDetail />} />
          <Route path="manutenzioni" element={<Maintenance />} />
          <Route path="manutenzioni/nuova" element={<MaintenanceCreate />} />
          <Route path="manutenzioni/:id" element={<MaintenanceDetail />} />
          <Route path="assemblee" element={<Assemblies />} />
          <Route path="assemblee/nuova" element={<AssemblyCreate />} />
          <Route path="assemblee/:id" element={<AssemblyDetail />} />
          <Route path="documenti" element={<Documents />} />
          <Route path="documenti/upload" element={<DocumentUpload />} />
          <Route path="documenti/:docId" element={<DocumentDetail />} />
          <Route path="ticket" element={<Tickets />} />
          <Route path="ticket/:id" element={<TicketDetail />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="comunicazioni" element={<Communications />} />
          <Route path="comunicazioni/nuova" element={<CommunicationCreate />} />
          <Route path="comunicazioni/:comId" element={<CommunicationDetail />} />
          <Route path="abbonamento" element={<Billing />} />
          <Route path="profilo" element={<Settings />} />
          <Route path="aiuto" element={<Help />} />
          <Route path="impostazioni-studio" element={<StudioSettings />} />
          <Route path="upgrade" element={<Upgrade />} />
          <Route path="more" element={<StudioMore />} />
        </Route>

        {/* Connect (Condomino) */}
        <Route path="/connect" element={<ConnectLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<ConnectDashboard />} />
          <Route path="immobili" element={<ConnectProperty />} />
          <Route path="immobili/:id" element={<ConnectPropertyDetail />} />
          <Route path="finanze" element={<Navigate to="rate" replace />} />
          <Route path="finanze/rate" element={<ConnectRates />} />
          <Route path="finanze/bilanci" element={<ConnectBalanceSheets />} />
          <Route path="finanze/preventivi" element={<ConnectPreventivi />} />
          <Route path="assemblee" element={<ConnectAssemblies />} />
          <Route path="assemblee/:id" element={<ConnectAssemblyDetail />} />
          <Route path="segnalazioni" element={<ConnectTickets />} />
          <Route path="segnalazioni/nuova" element={<ConnectTicketCreate />} />
          <Route path="segnalazioni/:id" element={<ConnectTicketDetail />} />
          <Route path="documenti" element={<ConnectDocuments />} />
          <Route path="fornitori" element={<ConnectSuppliers />} />
          <Route path="fornitori/:supplierId" element={<ConnectSupplierDetail />} />
          <Route path="manutenzioni" element={<ConnectMaintenance />} />
          <Route path="comunicazioni" element={<ConnectCommunications />} />
          <Route path="notifiche" element={<ConnectNotifications />} />
          <Route path="profilo" element={<ConnectProfile />} />
          <Route path="more" element={<ConnectMore />} />
        </Route>

        {/* Fornitore */}
        <Route path="/fornitore" element={<FornitoreLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SupplierPortalDashboard />} />
          <Route path="lavori" element={<SupplierJobs />} />
          <Route path="lavori/:id" element={<SupplierJobDetail />} />
          <Route path="pagamenti" element={<SupplierPayments />} />
          <Route path="profilo" element={<SupplierProfile />} />
        </Route>

        {/* Superuser */}
        <Route path="/admin" element={<SuperuserLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SuperDashboard />} />
          <Route path="amministratori" element={<SuperAdmins />} />
          <Route path="piani" element={<SuperPlans />} />
          <Route path="sistema" element={<SuperSystem />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Dev Role Switcher — always visible */}
      <RoleSwitcher />
    </>
  )
}
