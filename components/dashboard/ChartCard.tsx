"use client"

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-gray-900 font-semibold text-lg">{title}</h3>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
          changeType === "positive" 
            ? "bg-green-50 text-green-700" 
            : "bg-red-50 text-red-700"
        }`}>
          {change}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 h-32 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          </div>
          <span className="text-gray-600 text-sm font-medium">차트 영역</span>
        </div>
      </div>
    </div>
  )
} 