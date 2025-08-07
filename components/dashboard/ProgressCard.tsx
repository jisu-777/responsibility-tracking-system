"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressCardProps {
  title: string
  value: number
  target: number
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export default function ProgressCard({ 
  title, 
  value, 
  target, 
  description, 
  icon: Icon 
}: ProgressCardProps) {
  const percentage = (value / target) * 100

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}%</div>
        <p className="text-xs text-muted-foreground mb-4">{description}</p>
        <Progress value={percentage} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          목표: {target}%
        </p>
      </CardContent>
    </Card>
  )
} 