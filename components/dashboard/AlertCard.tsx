"use client"

import { AlertCircle, Calendar } from "lucide-react"

interface AlertCardProps {
  title: string
  description: string
  count: number
  type: "warning" | "info"
}

export default function AlertCard({ 
  title, 
  description, 
  count, 
  type 
}: AlertCardProps) {
  return (
    <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200 ${
      type === "warning" 
        ? "bg-orange-50 border-orange-200" 
        : "bg-blue-50 border-blue-200"
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
            type === "warning" ? "bg-orange-100" : "bg-blue-100"
          }`}>
            {type === "warning" ? (
              <AlertCircle className="h-5 w-5 text-orange-600" />
            ) : (
              <Calendar className="h-5 w-5 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          </div>
        </div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
          type === "warning" 
            ? "bg-orange-100 text-orange-700" 
            : "bg-blue-100 text-blue-700"
        }`}>
          {count}
        </div>
      </div>
      
      <button className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
        type === "warning"
          ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
      }`}>
        자세히 보기
      </button>
    </div>
  )
} 