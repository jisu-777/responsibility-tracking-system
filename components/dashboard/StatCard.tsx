"use client"

import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import Image from "next/image"

interface StatCardProps {
  title: string
  value: string
  value2: string | number
  subtitle: string
  className?: string
  image: React.ComponentType<{ className?: string }>
}

export default function StatCard({ 
  title, 
  value, 
  value2,
  subtitle,
  className,
  image
}: StatCardProps) {
  return (
    <div className={` border border-gray-200 rounded-lg p-4 ${className} flex items-center justify-between w-72 h-48`}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <Image src={image} alt={title} width={25} height={25} />
        </div>
       
      </div>
      
      <div>
        <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
        <span className="text-gray-600 text-sm mb-1">{subtitle}</span>
          <p className="text-2xl font-bold text-gray-900 flex justify-between items-center">
          <span>{value}</span>
          <span>{value2}</span>
        </p>
      </div>
    </div>
  )
} 