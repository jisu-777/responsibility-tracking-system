"use client"

import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { ColumnFilter } from "@/types"
import React from "react"

interface FilterTagsProps {
  columnFilters: ColumnFilter
  removeFilter: (column: string, value: string) => void
}

const FilterTags = React.memo(function FilterTags({ columnFilters, removeFilter }: FilterTagsProps) {
  const columnLabels: Record<string, string> = {
    category: "구분",
    code: "코드",
    responsibility: "책무",
    detailCode: "세부코드",
    detailContent: "세부내용",
  }

  const hasFilters = Object.values(columnFilters).some((v) => v.length > 0)

  if (!hasFilters) return null

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(columnFilters).map(([column, values]) =>
          values.map((value) => (
            <Badge key={`${column}-${value}`} variant="secondary" className="flex items-center gap-1">
              <span className="text-xs opacity-70">
                {columnLabels[column] ?? column}:
              </span>
              {value.length > 20 ? `${value.substring(0, 20)}...` : value}
              <button
                onClick={() => removeFilter(column, value)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))
        )}
      </div>
    </div>
  )
})

export { FilterTags }
