"use client"

import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface MiniChartProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
}

export default function MiniChart({ 
  title, 
  value, 
  change, 
  changeType 
}: MiniChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="mb-4">
        <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
        <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
        <div className={`flex items-center gap-1 text-xs font-medium ${
          changeType === "positive" ? "text-green-600" : "text-red-600"
        }`}>
          {changeType === "positive" ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {change}
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 h-16 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-3 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-4 bg-blue-300 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-3 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
} 