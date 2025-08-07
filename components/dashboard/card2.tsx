"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface Card2Props {
  subtitle?: string
  icon?: React.ReactNode
  title: string
  mainValue: string | number
  subValue?: string | number
  subValueLabel?: string
  backgroundColor?: string
  className?: string
}

export default function Card2({
  subtitle,
  icon,
  title,
  mainValue,
  subValue,
  subValueLabel,
  backgroundColor = "bg-white",
  className
}: Card2Props) {
  return (
    <div className={cn(
      "rounded-lg p-4 lg:p-6 w-full",
      backgroundColor,
      className
    )}>
      <div className="flex items-start justify-between w-full">
        <div className="flex-1 min-w-0">
          {/* 소제목 */}
          {subtitle && (
            <p className="text-xs lg:text-sm text-gray-500 mb-1 break-words">{subtitle}</p>
          )}
          
          {/* 제목 */}
          <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 break-words">{title}</h3>
          
          {/* 메인 수치 */}
          <div className="mb-2">
            <span className="text-2xl lg:text-3xl font-bold text-gray-900">{mainValue}</span>
          </div>
          
          {/* 서브 수치 */}
          {subValue && (
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-xs lg:text-sm text-gray-600 break-words">{subValueLabel}</span>
              <span className="text-xs lg:text-sm font-medium text-gray-900">{subValue}</span>
            </div>
          )}
        </div>
        
        {/* 아이콘/그림 */}
        {icon && (
          <div className="flex-shrink-0 ml-3 lg:ml-4">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
