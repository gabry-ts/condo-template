import { createContext, useCallback, useContext, useState } from 'react'
import { cn } from '../../lib/cn'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const styles = {
  success: 'border-l-success-500',
  error: 'border-l-destructive-500',
  warning: 'border-l-warning-500',
  info: 'border-l-info-500',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success', duration = 5000) => {
    const id = Date.now()
    setToasts((prev) => [...prev.slice(-2), { id, message, type }])
    if (type !== 'error') {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-80">
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          return (
            <div
              key={toast.id}
              className={cn(
                'flex items-start gap-3 bg-white rounded-xl shadow-lg border border-gray-200 border-l-4 p-4 animate-toast-enter',
                styles[toast.type]
              )}
              role="alert"
            >
              <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 flex-1">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="h-5 w-5 flex-shrink-0 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const addToast = useContext(ToastContext)
  if (!addToast) throw new Error('useToast must be used within ToastProvider')
  return addToast
}
