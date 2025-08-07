"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface Card1Props {
  subtitle?: string
  icon?: React.ReactNode
  title: string
  mainValue: string | number
  subValue?: string | number
  subValueLabel?: string
  backgroundColor?: string
  className?: string
}

export default function Card1({
  subtitle,
  icon,
  title,
  mainValue,
  subValue,
  subValueLabel,
  backgroundColor = "bg-white",
  className
}: Card1Props) {
  return (
    <div className={cn(
      "rounded-lg p-4 lg:p-6 w-full",
      backgroundColor,
      className
    )}>
      <div className="flex flex-col items-center text-center w-full">
        {/* 아이콘/그림 */}
        {icon && (
          <div className="mb-3 lg:mb-4">
            {icon}
          </div>
        )}
        
        {/* 소제목 */}
        {subtitle && (
          <p className="text-sm lg:text-base text-white mb-1 break-words">{subtitle}</p>
        )}
      
        {/* 제목 */}
        <h3 className="text-lg lg:text-xl font-semibold text-white mb-1 break-words">{title}</h3>
        
        {/* 메인 수치 */}
        <div className="mb-2 lg:mb-3">
          <span className="text-2xl lg:text-3xl font-bold text-white">{mainValue}</span>
        </div>
        
        {/* 서브 수치 */}
        {subValue && (
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs lg:text-sm text-gray-600 break-words">{subValueLabel}</span>
            <span className="text-xs lg:text-sm font-medium text-gray-900">{subValue}</span>
          </div>
        )}
      </div>
    </div>
  )
}
