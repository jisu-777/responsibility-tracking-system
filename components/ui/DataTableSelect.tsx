"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface DataTableSelectProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
}

export function DataTableSelect({ 
  placeholder = "선택하세요", 
  value, 
  onChange, 
  options, 
  className = "" 
}: DataTableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedValue(value || "")
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find(option => option.value === selectedValue)

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="w-full pl-4 pr-4 py-2 border-1 border-brand-500/50 rounded-full focus:border-brand-500/80 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-2 min-h-[40px] bg-transparent transition-all duration-200 cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedValue ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 