"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit } from "lucide-react"
import { ColumnFilterPopover } from "@/components/table/ColumnFilterPopover"
import { ResponsibilityData, ColumnFilter } from "@/types"
import React from "react"

export type TableColumn<T = any> = {
  key: string
  header?: React.ReactNode
  className?: string
  widthClass?: string
  renderCell?: (item: T, index: number) => React.ReactNode
}

interface Props<T = any> {
  paginatedData: T[]
  selectedItems: number[]
  currentPage: number
  itemsPerPage: number
  columnFilters: ColumnFilter
  responsibilityData: T[]
  openFilter: string | null
  setOpenFilter: (val: string | null) => void
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter>>
  getAvailableValues: (column: keyof T) => string[]
  handleColumnFilterChange: (column: string, value: string, checked: boolean) => void
  handleSelectAll: (column: string, checked: boolean) => void
  handleSelectItem: (id: number, checked: boolean) => void
  handleSelectAllItems: (checked: boolean) => void
  handleEdit: (id: number) => void
  isAllCurrentPageSelected: boolean
  isSomeCurrentPageSelected: boolean
  columns: TableColumn<T>[]
}

const ResponsibilityTable = React.memo(function ResponsibilityTable<T = any>({
  paginatedData,
  selectedItems,
  currentPage,
  itemsPerPage,
  columnFilters,
  responsibilityData,
  openFilter,
  setOpenFilter,
  setColumnFilters,
  getAvailableValues,
  handleColumnFilterChange,
  handleSelectAll,
  handleSelectItem,
  handleSelectAllItems,
  handleEdit,
  
  columns,
}: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full caption-bottom text-sm border-collapse table-auto border-b border-b-brandGrey-400">
                 <thead className="[&_tr]:border-b border-t-2 border-t-brand-500/50 ">
          <tr>
            {columns.map((col) => (
                             <th
                 key={col.key}
                                   className={[
                    col.widthClass,
                    "z-20 border-r border-b border-b-brandGrey-200 bg-brandGrey-50 px-2 py-0.5 text-left align-middle font-semibold text-sm "
                  ].join(" ")}
                >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr
                key={(item as any).id || index}
                className={`align-top border-b transition-colors hover:bg-brandGrey-100 ${
                  selectedItems.includes((item as any).id) ? "bg-brandGrey-50" : ""
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={[
                      col.widthClass,
                      "z-10 border-r px-2 py-0.5 align-middle text-sm",
                    ].join(" ")}
                  >
                    {col.renderCell?.(item, index)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-gray-500">
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
})

export { ResponsibilityTable }
