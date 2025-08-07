"use client"

import React, { useState } from "react"

interface CardProps {
  title: string
  children: React.ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <div className="p-2">
      <div className="p-4 bg-white shadow-md rounded-md inline-block">
        <div className="px-3 font-bold text-xl pb-4">{title}</div>
        {children}
      </div>
    </div>
  )
}

interface DonutChartProps {
  value1: number
  value2: number
  value3: number
}

function DonutChart({ value1, value2, value3 }: DonutChartProps) {
  const total = value1 + value2 + value3
  const radius = 80
  const strokeWidth = 35 // 더 굵게 변경
  const centerX = 150
  const centerY = 150
  
  // 각 섹션의 각도 계산
  const angle1 = (value1 / total) * 360
  const angle2 = (value2 / total) * 360
  const angle3 = (value3 / total) * 360
  
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
  
  const path1 = createArc(0, angle1)
  const path2 = createArc(angle1, angle1 + angle2)
  const path3 = createArc(angle1 + angle2, 360)
  
  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
      
      {/* 섹션 1 - 파란색 */}
      <path
        d={path1}
        stroke="#3B82F6" // Tailwind blue-500
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
      
      {/* 섹션 2 - 초록색 */}
      <path
        d={path2}
        stroke="#10B981" // Tailwind emerald-500
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
      
      {/* 섹션 3 - 주황색 */}
      <path
        d={path3}
        stroke="#F59E0B" // Tailwind amber-500
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
      
      {/* 중앙 텍스트 */}
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="#1F2937" // Tailwind gray-800
      >
        {total}%
      </text>
      <text
        x={centerX}
        y={centerY + 15}
        textAnchor="middle"
        fontSize="14"
        fill="#6B7280" // Tailwind gray-500
      >
        Total
      </text>
    </svg>
  )
}

export default function DemoG() {
  const [value1, setValue1] = useState(40)
  const [value2, setValue2] = useState(35)
  const [value3, setValue3] = useState(25)

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(parseInt(event.target.value, 10))
  }
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue2(parseInt(event.target.value, 10))
  }
  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue3(parseInt(event.target.value, 10))
  }

  const total = value1 + value2 + value3

  return (
    <Card title="Donut Chart">
      <div className="px-3">
        <div style={{ width: "300px" }}>
          <DonutChart value1={value1} value2={value2} value3={value3} />
        </div>
      </div>
      
      {/* 범례 */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm">Section 1: {value1}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
          <span className="text-sm">Section 2: {value2}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-500"></div>
          <span className="text-sm">Section 3: {value3}%</span>
        </div>
      </div>
      
      {/* 슬라이더들 */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm w-16">Section 1:</span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={value1}
            onChange={handleChange1}
            style={{ opacity: 0, position: "absolute", width: "100%", height: "100%" }}
          />
          <span className="text-sm">{value1}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm w-16">Section 2:</span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={value2}
            onChange={handleChange2}
            style={{ opacity: 0, position: "absolute", width: "100%", height: "100%" }}
          />
          <span className="text-sm">{value2}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm w-16">Section 3:</span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={value3}
            onChange={handleChange3}
            style={{ opacity: 0, position: "absolute", width: "100%", height: "100%" }}
          />
          <span className="text-sm">{value3}%</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-3 font-semibold h-8 mt-2">
        <div> 0% </div>
        <div> Total: {total}% </div>
        <div> 100% </div>
      </div>
    </Card>
  )
} 