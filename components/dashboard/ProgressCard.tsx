"use client"

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-50 rounded-lg">
            <Icon className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-gray-900 font-semibold">{title}</h3>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{value}%</div>
          <div className="text-sm text-gray-500">목표: {target}%</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">진행률</span>
          <span className="text-gray-900 font-medium">{percentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
} 