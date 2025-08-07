"use client"

import { InputHTMLAttributes } from "react"

interface DataTableDateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  className?: string
  readOnly?: boolean
}

export function DataTableDateInput({ 
  className = "", 
  readOnly = false,
  ...props 
}: DataTableDateInputProps) {
  const baseClasses = "w-full pl-4 pr-4 py-2 border-1 border-brand-500/50 rounded-full focus:border-brand-500/80 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-2 min-h-[40px] bg-transparent transition-all duration-200"
  const readOnlyClasses = readOnly ? "bg-gray-50 cursor-not-allowed" : ""
  
  return (
    <input
      type="date"
      readOnly={readOnly}
      className={`${baseClasses} ${readOnlyClasses} ${className}`}
      {...props}
    />
  )
} 