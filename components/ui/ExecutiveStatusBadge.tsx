"use client"

interface ExecutiveStatusBadgeProps {
  status: string
  className?: string
}

export function ExecutiveStatusBadge({ status, className = "" }: ExecutiveStatusBadgeProps) {
  // 상태에 따른 아이콘 결정
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "완료":
        return "/images/checked.png"
      case "진행중":
        return "/images/load.png"
      case "대기":
        return "/images/pending (1).png"
      case "기한경과":
        return "/images/danger.png"
      default:
        return "/images/pending (1).png"
    }
  }

  const iconSrc = getStatusIcon(status)

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={iconSrc} 
        alt={status} 
        className="w-4 h-4"
      />
      <span className="text-sm">{status}</span>
    </div>
  )
} 