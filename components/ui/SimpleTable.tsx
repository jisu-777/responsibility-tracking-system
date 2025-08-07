"use client"

import React from "react"

export type SimpleTableColumn<T = any> = {
  key: string
  header?: React.ReactNode
  widthClass?: string
  renderCell?: (item: T) => React.ReactNode
}

interface SimpleTableProps<T = any> {
  data: T[]
  columns: SimpleTableColumn<T>[]
}

const SimpleTable = React.memo(function SimpleTable<T>({
  data,
  columns,
}: SimpleTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-full caption-bottom text-base border-collapse table-auto">
        <thead className="[&_tr]:border-b bg-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={
                  col.widthClass + "z-20 border-r border-b border-b-brand-500/50 bg-brand-500/10 shadow-sm px-2 py-3 text-left align-middle font-semibold "
                }
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className="align-top border-b transition-colors hover:bg-muted/50"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={[
                      col.widthClass,
                      "z-10 border-r shadow-sm px-2 py-1.5 align-top bg-white",
                    ].join(" ")}
                  >
                    {col.renderCell ? col.renderCell(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-gray-500">
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
})

export default SimpleTable as <T>(props: SimpleTableProps<T>) => React.JSX.Element 