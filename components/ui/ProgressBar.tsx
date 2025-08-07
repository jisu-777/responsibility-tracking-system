"use client"

interface ProgressBarProps {
  progress: number
  showPercentage?: boolean
  className?: string
}

export function ProgressBar({ progress, showPercentage = true, className = "" }: ProgressBarProps) {
  // 진행률 색상 결정
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-blue-500"
    if (progress >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-16 bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${getProgressColor(progress)}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {showPercentage && (
        <span className="text-xs text-gray-600">{progress}%</span>
      )}
    </div>
  )
} 