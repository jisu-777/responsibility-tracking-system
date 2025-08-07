"use client"

import { Button } from "@/components/ui/button"
import CustomCheckbox from "@/components/ui/CustomCheckbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ChevronDown } from "lucide-react"
import { ResponsibilityData, ColumnFilter } from "@/types"

interface ColumnFilterPopoverProps {
  column: string
  title: string
  responsibilityData: ResponsibilityData[]
  columnFilters: ColumnFilter
  openFilter: string | null
  setOpenFilter: (val: string | null) => void
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter>>
  getAvailableValues: (column: keyof ResponsibilityData) => string[]
  handleColumnFilterChange: (column: string, value: string, checked: boolean) => void
  handleSelectAll: (column: string, checked: boolean) => void
}

export const ColumnFilterPopover = ({
  column,
  title,
  responsibilityData,
  columnFilters,
  openFilter,
  setOpenFilter,
  setColumnFilters,
  getAvailableValues,
  handleColumnFilterChange,
  handleSelectAll,
}: ColumnFilterPopoverProps) => {
  const availableValues = getAvailableValues(column as keyof ResponsibilityData)
  const selectedValues = columnFilters[column] || []
  const isAllSelected = selectedValues.length === availableValues.length && availableValues.length > 0
  const hasFilter = selectedValues.length > 0

  const allPossibleValues = Array.from(
    new Set(responsibilityData.map((item) => item[column as keyof ResponsibilityData] as string)),
  )
  const unavailableValues = allPossibleValues.filter((v) => !availableValues.includes(v))

  return (
    <Popover open={openFilter === column} onOpenChange={(open: boolean) => setOpenFilter(open ? column : null)}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={`h-auto p-2 justify-between font-medium hover:bg-gray-50 relative ${
            hasFilter ? "bg-blue-50 border-blue-200 text-blue-700" : ""
          }`}
          onClick={() => setOpenFilter(openFilter === column ? null : column)}
        >
          <span className="text-base text-black">{title}</span>
          <div className="flex items-center gap-1">
            {hasFilter && (
              <span className="text-xs bg-blue-600 text-white rounded-full px-1.5 py-0.5 min-w-[16px] text-center">
                {selectedValues.length}
              </span>
            )}
            <ChevronDown className="w-4 h-4" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">{title} 필터</h4>
            <div className="flex items-center space-x-2">
                             <CustomCheckbox
                 checked={isAllSelected}
                 onChange={(checked) => handleSelectAll(column, checked)}
                 disabled={availableValues.length === 0}
                 size={16}
               />
              <span className="text-xs text-gray-500">
                전체선택
              </span>
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {availableValues.map((value) => (
              <div key={value} className="flex items-center space-x-2">
                                 <CustomCheckbox
                   checked={selectedValues.includes(value)}
                   onChange={(checked) => handleColumnFilterChange(column, value, checked)}
                   size={16}
                 />
                <span
                  className="text-sm text-gray-700 cursor-pointer flex-1 truncate"
                  title={value}
                >
                  {value}
                </span>
              </div>
            ))}

            {unavailableValues.length > 0 && (
              <>
                {availableValues.length > 0 && <Separator className="my-2" />}
                <div className="text-xs text-gray-400 mb-2">현재 필터에서 사용할 수 없음:</div>
                                 {unavailableValues.map((value) => (
                   <div key={`unavailable-${value}`} className="flex items-center space-x-2 opacity-50">
                                           <CustomCheckbox checked={false} onChange={() => {}} disabled={true} size={16} />
                     <span className="text-sm text-gray-400 cursor-not-allowed flex-1 truncate">{value}</span>
                   </div>
                 ))}
              </>
            )}
          </div>

          <Separator className="my-4" />

          <div className="flex gap-2">
            <Button onClick={() => setOpenFilter(null)} className="flex-1" size="sm">
              적용
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setColumnFilters((prev: ColumnFilter) => ({ ...prev, [column]: [] }))
              }}
              className="flex-1"
              size="sm"
            >
              초기화
            </Button>
          </div>

          <div className="mt-3 pt-3 border-t text-xs text-gray-500">
            <div className="flex justify-between">
              <span>사용 가능: {availableValues.length}개</span>
              <span>선택됨: {selectedValues.length}개</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
