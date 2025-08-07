"use client"

interface ProgressBarProps {
  progress: number
  showPercentage?: boolean
  className?: string
}

export function ProgressBar({ progress, showPercentage = true, className = "" }: ProgressBarProps) {
  // 진행률 색상 결정

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-16 bg-[repeating-linear-gradient(45deg,_#ddd_0px,_#ddd_1px,_transparent_1px,_transparent_3px)] rounded-full h-2">
        <div 
          className={`h-2 rounded-full bg-brandGrey-700`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {showPercentage && (
        <span className="text-sm text-brandGrey-700">{progress}%</span>
      )}
    </div>
  )
} 