"use client"

import { useMemo, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { ManagementCheckData } from "@/data/magagement/managementCheckData"
import { ColumnFilterPopover } from "@/components/table/ColumnFilterPopover"
import { Pagination } from "@/components/table/Pagination"

interface ManagementCheckTableProps {
  data: ManagementCheckData[]
  title: string
  description: string
}

export function ManagementCheckTable({ data, title, description }: ManagementCheckTableProps) {
  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1)
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string[] }>({})
  const [openFilter, setOpenFilter] = useState<string | null>(null)
  const itemsPerPage = 10

  // 필터링된 데이터 계산
  const filteredData = useMemo(() => {
    let filtered = data

    // 컬럼 필터링
    Object.entries(columnFilters).forEach(([column, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(item => {
          const itemValue = item[column as keyof ManagementCheckData]
          return values.includes(itemValue.toString())
        })
      }
    })

    return filtered
  }, [data, columnFilters])

  // 페이지네이션된 데이터
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage])

  // 총 페이지 수
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  // 사용 가능한 값들 가져오기 (필터링된 데이터 기반)
  const getAvailableValues = useCallback((column: string) => {
    const values = new Set<string>()
    filteredData.forEach(item => {
      const value = item[column as keyof ManagementCheckData]
      if (value) {
        values.add(value.toString())
      }
    })
    return Array.from(values).sort()
  }, [filteredData])

  // 컬럼 필터 변경 핸들러
  const handleColumnFilterChange = useCallback((column: string, value: string, checked: boolean) => {
    setColumnFilters(prev => {
      const currentValues = prev[column] || []
      if (checked) {
        return { ...prev, [column]: [...currentValues, value] }
      } else {
        return { ...prev, [column]: currentValues.filter(v => v !== value) }
      }
    })
  }, [])

  // 전체 선택/해제 핸들러
  const handleSelectAll = useCallback((column: string, checked: boolean) => {
    const values = getAvailableValues(column)
    setColumnFilters(prev => ({
      ...prev,
      [column]: checked ? values : []
    }))
  }, [getAvailableValues])

  // 모든 필터 초기화
  const resetAll = useCallback(() => {
    setColumnFilters({})
    setCurrentPage(1)
    setOpenFilter(null)
  }, [])

  // 테이블 컬럼 정의
  const columns = [
    { key: "checkPeriod", title: "점검주기", width: "w-24", filterable: true },
    { key: "checkDate", title: "점검기간", width: "w-48", filterable: true },
    { key: "managementAction", title: "관리조치", width: "w-48", filterable: true },
    { key: "managementActionDetail", title: "관리조치세부", width: "w-64", filterable: true },
    { key: "checkCategory", title: "점검구분", width: "w-32", filterable: true },
    { key: "department", title: "담당부서", width: "w-32", filterable: true },
    { key: "personInCharge", title: "담당자", width: "w-24", filterable: true },
    { key: "checkStatus", title: "점검상태", width: "w-32", filterable: true },
    { key: "completionDate", title: "완료일", width: "w-24", filterable: true },
    { key: "group", title: "그룹", width: "w-32", filterable: true },
    { key: "responsibleExecutive", title: "담당임원", width: "w-24", filterable: true }
  ]

  return (
    <div className="">
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <Button variant="outline" onClick={resetAll} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            초기화
          </Button>
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-full caption-bottom text-sm border-collapse table-auto border-b border-b-brandGrey-700">
            <thead className="[&_tr]:border-b border-t-2 border-t-brand-500">
              <tr>
                <th className="z-20 border-r border-b border-b-brand-500/50 bg-brand-500/10 px-2 py-1.5 text-left align-middle font-semibold text-base text-black w-16">No.</th>
                {columns.map((column) => (
                  <th key={column.key} className={`z-20 border-r border-b border-b-brand-500/50 bg-brand-500/10 px-2 py-1.5 text-left align-middle font-semibold text-base text-black ${column.width}`}>
                    <ColumnFilterPopover
                      column={column.key}
                      title={column.title}
                      columnFilters={columnFilters}
                      responsibilityData={filteredData as any}
                      openFilter={openFilter}
                      setOpenFilter={setOpenFilter}
                      setColumnFilters={setColumnFilters}
                      getAvailableValues={(column) => getAvailableValues(column as string)}
                      handleColumnFilterChange={handleColumnFilterChange}
                      handleSelectAll={handleSelectAll}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {paginatedData.map((item, index) => (
                <tr key={item.id} className="align-top border-b transition-colors hover:bg-brandGrey-100">
                  <td className="z-10 border-r px-2 py-1.5 align-middle text-sm text-gray-900">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="z-10 border-r px-2 py-1.5 align-middle text-sm text-gray-900">{item.checkPeriod}</td>
                  <td className="z-10 border-r px-2 py-1.5 align-middle text-sm text-gray-900">{item.checkDate}</td>
                  <td className="z-10 border-r px-2 py-1.5 align-middle text-sm text-gray-900">{item.managementAction}</td>
                  <td className="z-10 border-r px-2 py-1.5 align-middle text-sm">
                    <span className={item.checkStatus.includes("기한경과") ? "text-red-600" : "text-gray-900"}>
                      {item.managementActionDetail}
                    </span>
                  </td>
                  <td className="z-10 border-r px-2 py-1.5 align-middle text-sm text-gray-900">{item.checkCategory}</td>
                  <td className="z-10 border-r px-2 py-1.5 align-middle text-sm text-gray-900">{item.department}</td>
                  <td className="z-10 border-r px-2 py-1.5 align-middle text-sm text-gray-900">{item.personInCharge}</td>
                  <td className="z-10 border-r px-2 py-1.5 align-middle text-sm">
                    <span className={item.checkStatus.includes("기한경과") ? "text-red-600" : "text-gray-900"}>
                      {item.checkStatus}
                    </span>
                  </td>
                  <td className="z-10 border-r px-2 py-1.5 align-middle text-sm text-gray-900">{item.completionDate || "-"}</td>
                  <td className="z-10 border-r px-2 py-1.5 align-middle text-sm text-gray-900">{item.group}</td>
                  <td className="z-10 border-r px-2 py-1.5 align-middle text-sm text-gray-900">{item.responsibleExecutive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={setCurrentPage}
        />
      </div>
    </div>
  )
} 