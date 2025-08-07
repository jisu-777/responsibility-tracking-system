"use client"

import { Search } from "lucide-react"
import { InputHTMLAttributes } from "react"

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  placeholder?: string
  className?: string
}

export function SearchInput({ placeholder = "검색어를 입력하세요", className = "", ...props }: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-brand-500/50 w-6 h-6" />
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full pl-4 pr-10 py-2 border-1 border-brand-500/50 rounded-full focus:border-brand-500/80 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-2 min-h-[40px] bg-transparent transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  )
} 