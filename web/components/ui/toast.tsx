"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export type ToastProps = {
  title: string
  description: string
  variant?: "default" | "destructive" | "success"
  duration?: number
}

export type ToastActionElement = React.ReactNode

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: toast.visible ? 1 : 0, y: toast.visible ? 0 : -20, scale: toast.visible ? 1 : 0.95 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`rounded-lg shadow-lg p-4 ${
              toast.variant === "destructive"
                ? "bg-red-600 text-white"
                : toast.variant === "success"
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{toast.title}</h3>
                <p
                  className={`text-sm ${
                    toast.variant === "destructive" || toast.variant === "success"
                      ? "text-white/90"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {toast.description}
                </p>
              </div>
              <button
                className={`ml-4 p-1 rounded-full ${
                  toast.variant === "destructive" || toast.variant === "success"
                    ? "text-white/80 hover:text-white hover:bg-white/20"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
