"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
    <Card className={type === "warning" ? "border-orange-200 bg-orange-50" : "border-blue-200 bg-blue-50"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {type === "warning" ? (
            <AlertCircle className="h-4 w-4 text-orange-600" />
          ) : (
            <Calendar className="h-4 w-4 text-blue-600" />
          )}
          {title}
        </CardTitle>
        <Badge variant={type === "warning" ? "destructive" : "default"}>
          {count}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button variant="outline" size="sm" className="mt-4">
          자세히 보기
        </Button>
      </CardContent>
    </Card>
  )
} 