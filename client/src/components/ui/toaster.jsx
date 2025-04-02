
import React from "react"

import { useState } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

// Create a toast context
const ToastContext = React.createContext({
  toast: () => {},
})

export function Toaster() {
  const [toasts, setToasts] = useState([])

  const addToast = (toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, ...toast }
    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  // Create portal for toasts
  return createPortal(
    <ToastContext.Provider value={{ toast: addToast }}>
      <div className="fixed bottom-0 right-0 p-4 w-full md:max-w-sm z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-md shadow-md flex justify-between items-start ${
              toast.variant === "destructive"
                ? "bg-red-100 text-red-800 border-l-4 border-red-500"
                : "bg-emerald-100 text-emerald-800 border-l-4 border-emerald-500"
            }`}
          >
            <div>
              {toast.title && <h3 className="font-medium">{toast.title}</h3>}
              {toast.description && <p className="text-sm">{toast.description}</p>}
            </div>
            <button onClick={() => removeToast(toast.id)} className="text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>,
    document.body,
  )
}

// Hook to use toast
export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Simplified toast function for use in components
export const toast = {
  custom: (props) => {
    const { toast } = useToast()
    toast(props)
  },
  success: (props) => {
    const { toast } = useToast()
    toast({ ...props, variant: "success" })
  },
  error: (props) => {
    const { toast } = useToast()
    toast({ ...props, variant: "destructive" })
  },
}

