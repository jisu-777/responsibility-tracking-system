"use client"

import React, { useState } from "react"
import { Pie, PieChart, Sector } from "recharts"

interface DonutChartProps {
  sections: Array<{
    value: number
    label: string
    color: string
  }>
}

function DonutChart({ sections, subtitle, value }: DonutChartProps & { subtitle: string, value: number }) {
  
  // Recharts용 데이터 형식으로 변환
  const chartData = sections.map(section => ({
    name: section.label,
    value: section.value,
    fill: section.color
  }))

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
      <PieChart width={280} height={280} className="max-w-full max-h-full">
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={110}
          strokeWidth={5}
        />
      </PieChart>
      
      {/* 중앙 텍스트 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-2xl font-bold text-gray-800 leading-none">{value}%</div>
        <div className="text-lg font-semibold text-gray-800 leading-none">완료</div>
      </div>
    </div>
  )
}

interface DemoGProps {
  mainTitle?: string
  subtitle?: string
  sections?: Array<{
    value: number
    label: string
    color: string
  }>
  height?: string
}

export default function DemoG({ 
  mainTitle = "Donut Chart",
  subtitle = "Total",
  sections: propSections,
  height = "400px" 
}: DemoGProps) {
  const defaultSections = [
    { value: 40, label: "완료", color: "#FE9A5A" }, // 브랜드 500과 400 사이
    { value: 35, label: "진행중", color: "#DFE3E6" }, // 브랜드그레이 200
    { value: 25, label: "대기", color: "#EEEFF1" } // 브랜드그레이 100
  ]
  
  const [sections, setSections] = useState(propSections || defaultSections)

  const handleChange = (index: number, newValue: number) => {
    const newSections = [...sections]
    newSections[index].value = newValue
    setSections(newSections)
  } 

  const sumDefaultSections = defaultSections.reduce((sum, section) => sum + section.value, 0)
  
  return (
    <div className="w-full">
      <div className="p-4 bg-white rounded-md w-full flex flex-col items-center">
        <div className="px-3 font-bold text-xl pb-4 text-center break-words">{mainTitle}</div>
        <div className="px-3 flex flex-col items-center w-full">
          <div className="w-full max-w-[300px] min-w-[250px]">
            <DonutChart sections={sections} subtitle={subtitle} value={Math.round(defaultSections[0].value/sumDefaultSections*100)}/>
          </div>
        </div>
        
        {/* 범례 */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 w-full">
          {sections.map((section, index) => (
            <div key={index} className="flex items-center gap-2 flex-shrink-0">
              <div 
                className="w-4 h-4 rounded-full flex-shrink-0" 
                style={{ backgroundColor: section.color }}
              ></div>
              <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">{section.label}:</span>
              <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{section.value}건</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 