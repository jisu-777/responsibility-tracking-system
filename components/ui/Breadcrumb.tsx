"use client"

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-1 text-base text-gray-500 ${className}`}>
      <Link 
        href="/" 
        className="flex items-center hover:text-brand-500 transition-colors"
      >
        <Home className="w-5 h-5" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-5 h-5 mx-1" />
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-brand-500 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
} 