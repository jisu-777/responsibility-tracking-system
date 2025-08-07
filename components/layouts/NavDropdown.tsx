"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface SubItem {
  name: string
  path: string
}

interface NavDropdownProps {
  name: string
  path: string
  subItems: SubItem[]
  isCurrentPage: (path: string) => boolean
  onNavClick: (path: string) => void
}

export default function NavDropdown({
  name,
  path,
  subItems,
  isCurrentPage,
  onNavClick,
}: NavDropdownProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => onNavClick(path)}
        className={`underline-hover text-lg font-medium ${
          isCurrentPage(path) ? 'active font-semibold' : ""
        }`}
      >
        <span className="hidden xl:inline">{name}</span>
        <ChevronDown className="w-4 h-4 inline-block ml-1" />
      </button>
      
      {/* 카드형식 드롭다운 메뉴 */}
      {isHovered && (
        <div 
          className="absolute top-full left-0 mt-1 bg-white border border-brandGrey-200 rounded-lg shadow-lg py-2 min-w-[200px] z-50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {subItems.map((subItem) => (
            <button
              key={subItem.name}
              onClick={() => onNavClick(subItem.path)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-brandGrey-50 transition-colors ${
                isCurrentPage(subItem.path) ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-700'
              }`}
            >
              {subItem.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 