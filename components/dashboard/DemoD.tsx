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

interface TestTubeProps {
  value: number
}

function TestTube({ value }: TestTubeProps) {
  return (
    <svg
      width="119"
      height="324"
      viewBox="0 0 119 324"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 0C28.3431 0 27 1.34315 27 3V6C27 7.65685 28.3431 9 30 9H34V287C34 300.807 45.1929 312 59 312C72.8071 312 84 300.807 84 287V9H89C90.6569 9 92 7.65685 92 6V3C92 1.34315 90.6569 0 89 0H30Z"
        fill="#E8EBF9"
      />
      <g clipPath="url(#test_tube_clip)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30 0C28.3431 0 27 1.34315 27 3V6C27 7.65685 28.3431 9 30 9H34V287C34 300.807 45.1929 312 59 312C72.8071 312 84 300.807 84 287V9H89C90.6569 9 92 7.65685 92 6V3C92 1.34315 90.6569 0 89 0H30Z"
          fill="#424E82"
        />
      </g>
      <defs>
        <clipPath id="test_tube_clip">
          <rect width="119" height="324" fill="white" y={value * 3 + 12} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default function DemoD() {
  const [value, setValue] = useState(24)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10))
  }
  return (
    <Card title="Volume">
      <div className="relative " style={{ width: "324px", height: "324px" }}>
        <div
          className="absolute rounded-full"
          style={{
            width: "24px",
            height: "24px",
            left: "90px",
            top: `${12 + value * 3}px `,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative w-full h-full">
            <div
              className="absolute grid place-items-center rounded-md text-white font-semibold"
              style={{
                width: "60px",
                height: "24px",
                background: "#424E82",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {100 - value}ml
            </div>
            <div
              className="absolute rounded-md"
              style={{
                width: "20px",
                height: "3px",
                background: "#424E82",
                left: "35px",
                top: "50%",
                transform: "translate(0, -50%)",
              }}
            ></div>
          </div>
        </div>
        <div className="absolute" style={{ top: 0, left: "100px" }}>
          <TestTube value={value} />
        </div>
        <div className="absolute" style={{ top: "150px", left: "-50px" }}>
          <div className="relative" style={{ width: "324px" }}>
            <input
              className="rt90"
              type="range"
              id="rangeInput"
              name="rangeInput"
              min={0}
              max={100}
              step={1}
              value={value}
              onChange={handleChange}
              style={{ opacity: 0, position: "absolute", width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
} 