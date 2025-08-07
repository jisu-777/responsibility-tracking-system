"use client"

interface ProgressBadgeProps {
  progress: number
  actualCompletionDate?: string
  className?: string
}

export function ProgressBadge({ progress, actualCompletionDate, className = "" }: ProgressBadgeProps) {
  // 진행상태 결정
  const getProgressStatus = (progress: number, actualCompletionDate?: string) => {
    if (actualCompletionDate) return "완료"
    if (progress >= 80) return "진행중"
    if (progress >= 40) return "진행중"
    return "대기"
  }

  // 진행상태에 따른 아이콘 결정
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "완료":
        return "/images/checked.png"
      case "진행중":
        return "/images/load.png"
      case "대기":
        return "/images/pending (1).png"
      default:
        return "/images/pending (1).png"
    }
  }

  const status = getProgressStatus(progress, actualCompletionDate)
  const iconSrc = getStatusIcon(status)

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={iconSrc} 
        alt={status} 
        className="w-4 h-4"
      />
      <span className="text-sm ">{status}</span>
    </div>
  )
} 