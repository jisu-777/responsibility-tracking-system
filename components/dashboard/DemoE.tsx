"use client"

import React from "react"

interface DemoEProps {
  title?: string
  numerator: number // 분자
  denominator: number // 분모
  color?: string
  strokeColor?: string
}

export default function DemoE({ 
  title = "Percentage",
  numerator,
  denominator,
  color = "#424E82",
  strokeColor = "#E8EBF9"
}: DemoEProps) {
  // 퍼센트 계산
  const percentage = Math.round((numerator / denominator) * 100)
  
  // SVG 경로의 총 길이 (strokeDasharray 값)
  const totalLength = 434
  const strokeDashoffset = totalLength - (totalLength * percentage / 100)

  return (
    <div className="p-2">
      <div className="p-4 bg-white rounded-md inline-block">
        <div className="px-3 font-bold text-xl pb-4">{title}</div>
        <div style={{ height: "30px" }}></div>
        <div style={{ padding: "0px 12px" }}>
          <div className="relative" style={{ width: "300px" }}>
            <svg
              width="300"
              height="150"
              viewBox="0 0 300 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 150C12 131.878 15.5695 113.933 22.5046 97.1897C29.4398 80.4467 39.6048 65.2337 52.4193 52.4193C65.2338 39.6048 80.4468 29.4398 97.1897 22.5046C113.933 15.5695 131.878 12 150 12C168.122 12 186.067 15.5695 202.81 22.5046C219.553 29.4398 234.766 39.6048 247.581 52.4193C260.395 65.2338 270.56 80.4468 277.495 97.1897C284.431 113.933 288 131.878 288 150"
                stroke={strokeColor}
                strokeWidth="22"
              />
              <path
                strokeDasharray={totalLength}
                strokeDashoffset={strokeDashoffset}
                d="M12 150C12 131.878 15.5695 113.933 22.5046 97.1897C29.4398 80.4467 39.6048 65.2337 52.4193 52.4193C65.2338 39.6048 80.4468 29.4398 97.1897 22.5046C113.933 15.5695 131.878 12 150 12C168.122 12 186.067 15.5695 202.81 22.5046C219.553 29.4398 234.766 39.6048 247.581 52.4193C260.395 65.2338 270.56 80.4468 277.495 97.1897C284.431 113.933 288 131.878 288 150"
                stroke={color}
                strokeWidth="22"
                strokeLinecap="round"
              />
            </svg>
            <div
              className="absolute text-4xl font-bold"
              style={{
                left: "50%",
                top: "75%",
                transform: "translate(-50%, -50%)",
                color: color,
              }}
            >
              {percentage}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 