import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const mockUsers = {
  admin: {
    id: '1',
    name: 'Marco Bianchi',
    email: 'marco.bianchi@studiobianchi.it',
    role: 'admin',
    plan: 'pro',
    studio: 'Studio Bianchi Amministrazioni',
  },
  staff: {
    id: '2',
    name: 'Laura Verdi',
    email: 'laura.verdi@studiobianchi.it',
    role: 'staff',
    plan: 'pro',
    studio: 'Studio Bianchi Amministrazioni',
  },
  condomino: {
    id: '3',
    name: 'Giuseppe Rossi',
    email: 'giuseppe.rossi@email.it',
    role: 'condomino',
    plan: 'pro',
  },
  fornitore: {
    id: '4',
    name: 'Andrea Neri',
    email: 'info@idraulicaneri.it',
    role: 'fornitore',
    company: 'Idraulica Neri S.r.l.',
  },
  superuser: {
    id: '5',
    name: 'Admin Sistema',
    email: 'superuser@domea.it',
    role: 'superuser',
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(mockUsers.admin)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const login = useCallback((role = 'admin') => {
    setUser(mockUsers[role] || mockUsers.admin)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const switchRole = useCallback((role) => {
    setUser(mockUsers[role] || mockUsers.admin)
  }, [])

  const switchPlan = useCallback((plan) => {
    setUser((prev) => prev ? { ...prev, plan } : prev)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, switchRole, switchPlan, mockUsers }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
