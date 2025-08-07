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

interface MarkerProps {
  value: number
}

function Marker({ value }: MarkerProps) {
  return (
    <div
      className="absolute grid place-items-center"
      style={{
        width: "24px",
        height: "24px",
        top: "-40px",
        left: `${value * 3}px`,
      }}
    >
      <div className="relative w-full h-full text-sm">
        <div
          className="absolute grid place-items-center text-white font-semibold rounded-md"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "#424e82",
            width: "50px",
            height: "30px",
          }}
        >
          ${value * 10}
        </div>

        <div
          className="absolute"
          style={{
            left: "50%",
            top: "150%",
            transform: "translate(-50%, -50%)",
            width: "15px",
            height: "30px",
          }}
        >
          <svg
            className="w-full"
            viewBox="0 0 22 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.874 26.6557C12.3017 28.5519 9.61685 28.5519 9.04458 26.6557L0.999992 0H20.9186L12.874 26.6557Z"
              fill="#424e82"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function DemoC() {
  const [valueA, setValueA] = useState(25)
  const [valueB, setValueB] = useState(75)

  const handleChangeA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueA(parseInt(event.target.value, 10))
  }
  const handleChangeB = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueB(parseInt(event.target.value, 10))
  }

  const start = Math.min(valueA, valueB) * 3
  const diff = Math.abs(valueA - valueB) * 3
  return (
    <Card title="Price">
      <div style={{ padding: "0px 12px" }}>
        <div style={{ width: "300px", height: "100px" }}></div>
      </div>
      <div className="relative " style={{ width: "324px", height: "24px" }}>
        <Marker value={valueA} />
        <Marker value={valueB} />
        <input
          type="range"
          id="rangeInput"
          name="rangeInput"
          min={0}
          max={100}
          step={1}
          value={valueA}
          onChange={handleChangeA}
          style={{ opacity: 0, position: "absolute", width: "100%", height: "100%" }}
        />
        <input
          type="range"
          id="rangeInput"
          name="rangeInput"
          min={0}
          max={100}
          step={1}
          value={valueB}
          onChange={handleChangeB}
          style={{ opacity: 0, position: "absolute", width: "100%", height: "100%" }}
        />
      </div>
      <div className="flex items-center justify-between px-3 font-semibold h-8">
        <div> $0 </div>

        <div> $1000 </div>
      </div>
    </Card>
  )
} 