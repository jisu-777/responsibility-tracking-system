"use client"

import { MoreHorizontal } from "lucide-react"

export default function Segmentation() {
  const segmentationData = [
    { c1: "Desktop", c2: "35.3%", c3: "#4318FF", color: "#4318FF" },
    { c1: "Tablet", c2: "24.3%", c3: "#6AD2FF", color: "#6AD2FF" },
    { c1: "Mobile", c2: "27.7%", c3: "#EFF4FB", color: "#EFF4FB" },
    { c1: "Other", c2: "12.7%", c3: "#EFF4FB", color: "#EFF4FB" },
  ]

  return (
    <div className="p-4 h-full bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center">
        <div className="text-gray-900 font-bold">Segmentation</div>
        <MoreHorizontal className="w-4 h-4 text-gray-500" />
      </div>
      <div className="mt-3 text-gray-600">All users</div>
      {segmentationData.map(({ c1, c2, c3, color }) => (
        <div className="flex items-center mt-3" key={c1}>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: color,
            }}
          />
          <div className="ml-2 text-sm" style={{ color }}>
            {c1}
          </div>
          <div className="flex-grow" />
          <div className="text-sm font-medium" style={{ color }}>
            {c2}
          </div>
          <div className="ml-2 w-12 border-l border-gray-200" />
          <div className="ml-2 h-8">
            <div
              className="w-20 h-28 rounded-lg overflow-hidden"
              style={{
                background: c3,
              }}
            >
              {c1 === 'Other' && (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex mt-3 px-3 items-center justify-between bg-gray-50 rounded-xl w-36 h-12">
        <div className="text-sm font-medium text-gray-700">Details</div>
        <div className="w-4 h-4 text-gray-500">→</div>
      </div>
    </div>
  )
} 