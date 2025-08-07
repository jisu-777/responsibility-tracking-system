"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  icon: React.ComponentType<{ className?: string }>
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon 
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs flex items-center gap-1 mt-1 ${
          changeType === "positive" ? "text-green-600" : "text-red-600"
        }`}>
          {changeType === "positive" ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {change}
        </p>
      </CardContent>
    </Card>
  )
} 