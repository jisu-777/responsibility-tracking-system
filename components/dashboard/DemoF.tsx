"use client"

import React from "react"

function deriveData(index: number, value: number, color: string) {
  const r1 = 100 // 130에서 100으로 축소
  const r2 = 120 // 150에서 120으로 축소
  const r3 = 110 // 140에서 110으로 축소
  const delta = Math.PI / 40
  const angle = delta * index - Math.PI

  const ss = Math.sin(angle)
  const cc = Math.cos(angle)

  const rs = index % 5 === 0 ? r1 : r3

  const x1 = rs * cc
  const y1 = rs * ss
  const x2 = r2 * cc
  const y2 = r2 * ss

  // 눈금 색상도 props로 받은 색상으로 변경
  const tickColor = Math.ceil(value * (41 / 100)) > index ? color : "#E8EBF9"
  return { x1, y1, x2, y2, color: tickColor }
}

interface TickProps {
  index: number
  value: number
  color: string
}

function Tick({ index, value, color }: TickProps) {
  const { x1, y1, x2, y2, color: tickColor } = deriveData(index, value, color)
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={tickColor}
      strokeWidth="3"
      strokeLinecap="round"
    />
  )
}

interface DemoFProps {
  title?: string
  subtitle?: string // 서브타이틀 추가
  numerator: number // 분자
  denominator: number // 분모
  color?: string
  showPercentage?: boolean // 퍼센트 표시 여부 (옵션)
}

export default function DemoF({ 
  title = "Gauge", 
  subtitle,
  numerator,
  denominator,
  color = "#424E82",
  showPercentage = true
}: DemoFProps) {
  // 퍼센트 계산 (0-100 사이로 제한)
  const percentage = Math.min(Math.max(Math.round((numerator / denominator) * 100), 0), 100)

  return (
    <div className="p-2">
      <div className="p-4 bg-white rounded-md ">
        <div className="px-3 font-bold text-2xl pb-4 text-center">{title}</div>
      
        <div style={{ padding: "0px 12px" }} className="flex justify-center">
          <div className="relative" style={{ width: "240px" }}>
            <svg
              width="240"
              height="144"
              viewBox="0 0 240 144"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="240" height="144" fill="white" />

              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M122.393 27.736C122.165 24.7824 117.835 24.7824 117.607 27.736L110.957 113.711C109.116 115.821 108 118.58 108 121.6C108 128.227 113.373 133.6 120 133.6C126.627 133.6 132 128.227 132 121.6C132 118.58 130.885 115.821 129.043 113.711L122.393 27.736Z"
                fill={color}
                transform={`rotate(${-90 + 1.8 * percentage}, 120, 121.6)`}
              />

              <g transform="translate(120, 121.6)">
                <circle r="6" fill="#FFF" />
                {Array(41)
                  .fill(0)
                  .map((_, i) => (
                    <Tick key={i} index={i} value={percentage} color={color} />
                  ))}
              </g>
            </svg>
          </div>
        </div>
        
        {/* 퍼센트 정보 표시 */}
        {showPercentage && (
          <div className="flex justify-center items-center gap-2 mt-2 px-3">
             {subtitle && (
          <div className="px-1 text-xl text-gray-700  font-semibold">{subtitle}</div>
        )}
            <span className="text-xl font-bold" style={{ color: color }}>{percentage}%</span>
          </div>
        )}
      </div>
    </div>
  )
} 