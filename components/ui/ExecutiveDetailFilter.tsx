"use client"

import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExecutiveEvaluationData } from "@/data/mockData3"

interface ExecutiveDetailFilterProps {
  executives: ExecutiveEvaluationData[]
  selectedExecutive: string
  onExecutiveChange: (executiveId: string) => void
}

const ExecutiveDetailFilter = React.memo(function ExecutiveDetailFilter({
  executives,
  selectedExecutive,
  onExecutiveChange,
}: ExecutiveDetailFilterProps) {
  // 본부장(3번째 계층)까지만 필터링
  const filteredExecutives = executives.filter(executive => executive.level <= 3)
  
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">임원 선택:</label>
      <Select value={selectedExecutive} onValueChange={onExecutiveChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="임원을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          {filteredExecutives.map((executive) => (
            <SelectItem key={executive.executiveId} value={executive.executiveId}>
              {executive.name} ({executive.position})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
})

export { ExecutiveDetailFilter } 