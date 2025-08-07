"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ChartCardProps {
  title: string
  description: string
  value: string
  change: string
  changeType: "positive" | "negative"
}

export default function ChartCard({ 
  title, 
  description, 
  value, 
  change, 
  changeType 
}: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <Badge variant={changeType === "positive" ? "default" : "secondary"}>
            {change}
          </Badge>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-4">{value}</div>
        <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">차트 영역</span>
        </div>
      </CardContent>
    </Card>
  )
} 