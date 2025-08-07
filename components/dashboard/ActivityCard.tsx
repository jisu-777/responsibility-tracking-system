"use client"

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

  const getIconBg = () => {
    switch (type) {
      case "comment":
        return "bg-blue-50"
      case "like":
        return "bg-green-50"
      case "share":
        return "bg-purple-50"
      default:
        return "bg-gray-50"
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {user.initials}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900 text-sm">{user.name}</h4>
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${getIconBg()}`}>
                {getIcon()}
              </div>
              {count && (
                <div className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                  {count}
                </div>
              )}
            </div>
          </div>
          
          <h5 className="font-medium text-gray-900 mb-1">{title}</h5>
          <p className="text-gray-600 text-sm mb-2">{description}</p>
          
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            {time}
          </div>
        </div>
      </div>
    </div>
  )
} 