"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MessageSquare, ThumbsUp, Share2 } from "lucide-react"

interface ActivityCardProps {
  title: string
  description: string
  time: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  type: "comment" | "like" | "share" | "post"
  count?: number
}

export default function ActivityCard({ 
  title, 
  description, 
  time, 
  user, 
  type, 
  count 
}: ActivityCardProps) {
  const getIcon = () => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "like":
        return <ThumbsUp className="h-4 w-4 text-green-600" />
      case "share":
        return <Share2 className="h-4 w-4 text-purple-600" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />
    }
  }

  const getBadgeVariant = () => {
    switch (type) {
      case "comment":
        return "default"
      case "like":
        return "secondary"
      case "share":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm font-medium">{user.name}</CardTitle>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {time}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getIcon()}
          {count && (
            <Badge variant={getBadgeVariant()}>
              {count}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-medium text-sm mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
} 