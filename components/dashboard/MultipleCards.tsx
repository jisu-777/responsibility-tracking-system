"use client"

import React from "react"

interface CardProps {
  title: string
  value: string
}

function Card({ title, value }: CardProps) {
  return (
    <div className="p-2 bg-white ">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-600">{title}</h3>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  )}

interface MultipleCardsProps {
  cards: CardProps[]
  title?: string
}

export default function MultipleCards({ cards, title = "통계 카드" }: MultipleCardsProps) {
  return (
    <div className="p-2 h-full">
      <div className="p-4 bg-white rounded-md h-full flex flex-col">
        <div className="px-2 font-bold text-xl pb-4">{title}</div>
        <div className="flex-1 flex flex-col justify-center space-y-3">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              value={card.value}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 