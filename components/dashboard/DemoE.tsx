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

export default function DemoE() {
  const [value, setValue] = useState(20)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10))
  }
  return (
    <Card title="Percentage">
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
              stroke="#E8EBF9"
              strokeWidth="22"
            />
            <path
              strokeDasharray="434"
              strokeDashoffset={`${434 - 4.34 * value}`}
              d="M12 150C12 131.878 15.5695 113.933 22.5046 97.1897C29.4398 80.4467 39.6048 65.2337 52.4193 52.4193C65.2338 39.6048 80.4468 29.4398 97.1897 22.5046C113.933 15.5695 131.878 12 150 12C168.122 12 186.067 15.5695 202.81 22.5046C219.553 29.4398 234.766 39.6048 247.581 52.4193C260.395 65.2338 270.56 80.4468 277.495 97.1897C284.431 113.933 288 131.878 288 150"
              stroke="#424E82"
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
              color: "#424E82",
            }}
          >
            {value}%
          </div>
        </div>
      </div>
      <div className="relative " style={{ width: "324px", height: "24px" }}>
        <input
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
      <div className="flex items-center justify-between px-3 font-semibold h-8">
        <div> 0 </div>
        <div> 100 </div>
      </div>
    </Card>
  )
} 