"use client"

import React, { useState } from "react"

interface DonutChartProps {
  sections: Array<{
    value: number
    label: string
    color: string
  }>
}

function DonutChart({ sections }: DonutChartProps) {
  const total = sections.reduce((sum, section) => sum + section.value, 0)
  const radius = 45
  const strokeWidth = 20
  const centerX = 70
  const centerY = 70
  
  // SVG path 계산 함수
  const createArc = (startAngle: number, endAngle: number) => {
    const startRad = (startAngle - 90) * (Math.PI / 180)
    const endRad = (endAngle - 90) * (Math.PI / 180)
    
    const x1 = centerX + radius * Math.cos(startRad)
    const y1 = centerY + radius * Math.sin(startRad)
    const x2 = centerX + radius * Math.cos(endRad)
    const y2 = centerY + radius * Math.sin(endRad)
    
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
  }
  
  // 각 섹션의 경로 생성
  let currentAngle = 0
  const paths = sections.map((section, index) => {
    const angle = (section.value / total) * 360
    const path = createArc(currentAngle, currentAngle + angle)
    const startAngle = currentAngle
    currentAngle += angle
    return { path, color: section.color, startAngle, endAngle: currentAngle }
  })
  
  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-w-full max-h-full"
    >
      {/* 배경 원 */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        stroke="#E8EBF9"
        strokeWidth={strokeWidth}
        fill="none"
      />
      
      {/* 각 섹션 그리기 */}
      {paths.map((pathData, index) => (
        <path
          key={index}
          d={pathData.path}
          stroke={pathData.color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

interface DemoGWithDescriptionProps {
  mainTitle?: string
  title1?: string
  title2?: string
  title3?: string
  description1?: string
  description2?: string
  description3?: string
  height?: string
}

export default function DemoGWithDescription({ 
  mainTitle = "Donut Chart with Description",
  title1 = "제목 1",
  title2 = "제목 2",
  title3 = "제목 3",
  description1 = "첫 번째 설명입니다.",
  description2 = "두 번째 설명입니다.", 
  description3 = "세 번째 설명입니다.",
  height = "400px"
}: DemoGWithDescriptionProps) {
  const [sections, setSections] = useState([
    { value: 40, label: "완료", color: "#FE9A5A" }, // 브랜드 500과 400 사이
    { value: 35, label: "진행중", color: "#DFE3E6" }, // 브랜드그레이 200
    { value: 25, label: "대기", color: "#EEEFF1" } // 브랜드그레이 100
  ])

  const handleChange = (index: number, newValue: number) => {
    const newSections = [...sections]
    newSections[index].value = newValue
    setSections(newSections)
  }

  const total = sections.reduce((sum, section) => sum + section.value, 0)

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 bg-white rounded-md w-full h-full flex flex-col min-w-[320px]">
        <div className="px-3 font-bold text-lg pb-3 break-words flex-shrink-0">{mainTitle}</div>
        <div className="flex gap-4 flex-wrap flex-1">
          {/* 왼쪽: 차트 영역 */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="px-3">
              <div className="w-[160px] h-[160px] flex items-center justify-center">
                <DonutChart sections={sections} />
              </div>
            </div>
          </div>

          {/* 오른쪽: 설명 영역 */}
          <div className="flex-1 min-w-[140px] flex flex-col justify-center">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: "#FE9A5A" }}></div>
                <span className="text-sm font-semibold text-gray-700 min-w-[50px] whitespace-nowrap">{title1}:</span>
                <span className="text-sm font-medium text-gray-600 break-words">{description1}</span>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: "#DFE3E6" }}></div>
                <span className="text-sm font-semibold text-gray-700 min-w-[50px] whitespace-nowrap">{title2}:</span>
                <span className="text-sm font-medium text-gray-600 break-words">{description2}</span>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: "#EEEFF1" }}></div>
                <span className="text-sm font-semibold text-gray-700 min-w-[50px] whitespace-nowrap">{title3}:</span>
                <span className="text-sm font-medium text-gray-600 break-words">{description3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 