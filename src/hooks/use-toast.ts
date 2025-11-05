import { useState, useCallback } from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((options: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { ...options, id }
    
    setToasts((prev) => [...prev, newToast])
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
    
    // Show toast notification (simple alert for now, can be enhanced with a toast component)
    if (options.variant === "destructive") {
      console.error(options.title || "Error", options.description)
    } else {
      console.log(options.title || "Success", options.description)
    }
  }, [])

  return { toast, toasts }
}


