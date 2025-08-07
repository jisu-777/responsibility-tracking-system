"use client"

import React, { useState } from "react"

interface CardProps {
  title: string
  children: React.ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <div className="p-2">
      <div className="p-4 bg-white shadow-md rounded-md inline-block w-full">
        <div className="px-3 font-bold text-lg pb-4 break-words">{title}</div>
        {children}
      </div>
    </div>
  )
}

interface DemoBGraphProps {
  start: number
  diff: number
}

function DemoBGraph({ start, diff }: DemoBGraphProps) {
  return (
    <svg
      width="280"
      height="100"
      viewBox="0 0 280 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-w-full"
    >
      <g id="background">
        <path
          d="M280 100H0C0 100 20.121 79.019 30 68C40.127 56.704 49.453 34.101 60 33C69.551 32.003 80 56 90 56C100 56 110.08 40.931 120 33C130.083 24.939 140.16 7.63699 150 7.99999C160.171 8.37499 169.563 28.791 180 37C189.628 44.573 199.889 55.623 210 56C219.894 56.369 230.323 39.006 240 40C250.371 41.066 260.381 55.514 270 65C280.45 75.306 280 100 280 100Z"
          fill="#E8EBF9"
        />
      </g>
      <g id="foreground" clipPath="url(#highlight2)">
        <path
          d="M280 100H0C0 100 20.121 79.019 30 68C40.127 56.704 49.453 34.101 60 33C69.551 32.003 80 56 90 56C100 56 110.08 40.931 120 33C130.083 24.939 140.16 7.63699 150 7.99999C160.171 8.37499 169.563 28.791 180 37C189.628 44.573 199.889 55.623 210 56C219.894 56.369 230.323 39.006 240 40C250.371 41.066 260.381 55.514 270 65C280.45 75.306 280 100 280 100Z"
          fill="#424E82"
        />
      </g>
      <defs>
        <clipPath id="highlight2">
          <rect x={start} width={diff} height="100" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default function DemoB() {
  const [valueA, setValueA] = useState(35) // 완료율
  const [valueB, setValueB] = useState(65) // 진행률

  const handleChangeA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueA(parseInt(event.target.value, 10))
  }
  const handleChangeB = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueB(parseInt(event.target.value, 10))
  }

  const start = Math.min(valueA, valueB) * 2.8
  const diff = Math.abs(valueA - valueB) * 2.8
  
  return (
    <Card title="임원 책무 진행률">
      <div className="px-3">
        <div className="w-full max-w-[280px]">
          <DemoBGraph start={start} diff={diff} />
        </div>
      </div>
      <div className="relative w-full max-w-[304px] h-6">
        <input
          type="range"
          id="demoBInputA"
          name="demoBInputA"
          min={0}
          max={100}
          step={1}
          value={valueA}
          onChange={handleChangeA}
          style={{ opacity: 0, position: "absolute", width: "100%", height: "100%" }}
        />
        <input
          type="range"
          id="demoBInputB"
          name="demoBInputB"
          min={0}
          max={100}
          step={1}
          value={valueB}
          onChange={handleChangeB}
          style={{ opacity: 0, position: "absolute", width: "100%", height: "100%" }}
        />
      </div>
      <div className="flex items-center justify-between px-3 font-semibold h-8 text-sm">
        <div className="text-gray-600"> 0% </div>
        <div className="text-blue-600">
          {Math.min(valueA, valueB)}% - {Math.max(valueA, valueB)}%
        </div>
        <div className="text-gray-600"> 100% </div>
      </div>
      <div className="px-3 mt-2 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>완료: {valueA}%</span>
          <span>진행중: {valueB}%</span>
        </div>
      </div>
    </Card>
  )
} 