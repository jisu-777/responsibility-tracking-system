"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{value}</div>
        <p className={`text-xs flex items-center gap-1 ${
          changeType === "positive" ? "text-green-600" : "text-red-600"
        }`}>
          {changeType === "positive" ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {change}
        </p>
        <div className="h-16 bg-gray-100 rounded mt-4 flex items-center justify-center">
          <span className="text-gray-500 text-xs">미니 차트</span>
        </div>
      </CardContent>
    </Card>
  )
} 