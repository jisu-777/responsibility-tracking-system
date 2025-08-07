"use client"

import { useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw } from "lucide-react"

import { ResponsibilityTable, TableColumn } from "@/components/table/ResponsibilityTable"
import { FilterTags } from "@/components/table/FilterTag"
import { Pagination } from "@/components/table/Pagination"
import { ColumnFilterPopover } from "@/components/table/ColumnFilterPopover"
import { Checkbox } from "@/components/ui/checkbox"

export interface ColumnConfig<T> {
  key: string
  title: string
  width: string
  renderCell: (item: T, index: number) => React.ReactNode
  searchable?: boolean
  filterable?: boolean
}

export interface DataTableReadOnlyProps<T extends { id: number }> {
  title: string
  description: string
  // 외부 상태와 액션들
  state: any
  actions: any
  columns: ColumnConfig<T>[]
  itemsPerPage?: number
  onDownload?: () => void
}

export function DataTableReadOnly<T extends { id: number }>({
  title,
  description,
  state,
  actions,
  columns,
  itemsPerPage = 10,
  onDownload,
}: DataTableReadOnlyProps<T>) {
  // 상태 안전성 확인 - 기본값만 제공
  const safeState = {
    data: state?.data || { selectedItems: [], currentPage: 1, totalPages: 1, data: [], filteredData: [] },
    filters: state?.filters || { columnFilters: {}, openFilter: null, activeFiltersCount: 0 },
    search: state?.search || { searchTerm: "" },
    filteredData: state?.filteredData || [],
    paginatedData: state?.paginatedData || [],
    isAllCurrentPageSelected: state?.isAllCurrentPageSelected || false,
    isSomeCurrentPageSelected: state?.isSomeCurrentPageSelected || false,
  }

  // ColumnFilterPopover 생성 함수 - 중복 제거
  const createFilterPopover = useCallback((column: string, title: string) => (
    <ColumnFilterPopover
      column={column}
      title={title}
      columnFilters={safeState.filters.columnFilters}
      responsibilityData={safeState.data.data as any}
      openFilter={safeState.filters.openFilter}
      setOpenFilter={actions.filters.setOpenFilter}
      setColumnFilters={actions.filters.setColumnFilters}
      getAvailableValues={(column) => actions.filters.getAvailableValues(column as string, safeState.filteredData || [])}
      handleColumnFilterChange={actions.filters.handleColumnFilterChange}
      handleSelectAll={(column, checked) => {
        const values = actions.filters.getAvailableValues(column as string, safeState.filteredData || [])
        actions.filters.handleSelectAll(column, checked, values)
      }}
    />
  ), [
    safeState.filters.columnFilters,
    safeState.data.data,
    safeState.filters.openFilter,
    safeState.filteredData,
    actions.filters.setOpenFilter,
    actions.filters.setColumnFilters,
    actions.filters.getAvailableValues,
    actions.filters.handleColumnFilterChange,
    actions.filters.handleSelectAll,
  ])

  // 테이블 컬럼 정의
  const tableColumns: TableColumn[] = useMemo(() => {
    const baseColumns: TableColumn[] = [
      {
        key: "checkbox",
        widthClass: "w-12",
        renderCell: (row) => (
          <Checkbox
            checked={safeState.data.selectedItems.includes(row.id)}
            onCheckedChange={(checked) => actions.data.handleSelectItem(row.id, checked as boolean)}
          />
        ),
        header: (
          <Checkbox
            checked={safeState.isAllCurrentPageSelected}
            onCheckedChange={actions.data.handleSelectAllItems}
            indeterminate={safeState.isSomeCurrentPageSelected && !safeState.isAllCurrentPageSelected}
          />
        ),
      },
      {
        key: "index",
        header: "No.",
        widthClass: "w-16",
        renderCell: (_, idx) => (safeState.data.currentPage - 1) * itemsPerPage + idx + 1,
      },
    ]

    // 동적 컬럼 추가 (수정 버튼 제거)
    const dynamicColumns: TableColumn[] = columns.map((col) => ({
      key: col.key,
      widthClass: col.width,
      header: col.filterable ? createFilterPopover(col.key, col.title) : col.title,
      renderCell: (row: any, idx: number) => col.renderCell(row, idx),
    }))

    return [...baseColumns, ...dynamicColumns]
  }, [
    safeState.data.selectedItems,
    safeState.isAllCurrentPageSelected,
    safeState.isSomeCurrentPageSelected,
    safeState.data.currentPage,
    itemsPerPage,
    columns,
    createFilterPopover,
    actions.data.handleSelectItem,
    actions.data.handleSelectAllItems,
  ])

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{title} 목록</span>
              <Badge variant="secondary">Total {safeState.filteredData.length}</Badge>
              {safeState.filters.activeFiltersCount > 0 && (
                <Badge variant="destructive">필터 {safeState.filters.activeFiltersCount}개 적용</Badge>
              )}
              {safeState.data.selectedItems.length > 0 && <Badge>{safeState.data.selectedItems.length}개 선택됨</Badge>}
            </div>

            {/* 다운로드 버튼만 표시 */}
            {onDownload && (
              <Button variant="outline" onClick={onDownload} className="gap-2">
                다운로드
              </Button>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="전체 내용 검색..."
                value={safeState.search.searchTerm}
                onChange={(e) => actions.search.setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={actions.resetAll} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              초기화
            </Button>
          </div>

          <FilterTags 
            columnFilters={safeState.filters.columnFilters} 
            removeFilter={actions.filters.removeFilter} 
          />

          <ResponsibilityTable
            paginatedData={safeState.paginatedData as any}
            selectedItems={safeState.data.selectedItems}
            currentPage={safeState.data.currentPage}
            itemsPerPage={itemsPerPage}
            columnFilters={safeState.filters.columnFilters}
            responsibilityData={safeState.data.data as any}
            openFilter={safeState.filters.openFilter}
            setOpenFilter={actions.filters.setOpenFilter}
            setColumnFilters={actions.filters.setColumnFilters}
            getAvailableValues={(column) => actions.filters.getAvailableValues(column as string, safeState.filteredData || [])}
            handleColumnFilterChange={actions.filters.handleColumnFilterChange}
            handleSelectAll={(column, checked) => {
              const values = actions.filters.getAvailableValues(column as string, safeState.filteredData || [])
              actions.filters.handleSelectAll(column, checked, values)
            }}
            handleSelectItem={actions.data.handleSelectItem}
            handleSelectAllItems={actions.data.handleSelectAllItems}
            isAllCurrentPageSelected={safeState.isAllCurrentPageSelected}
            isSomeCurrentPageSelected={safeState.isSomeCurrentPageSelected}
            columns={tableColumns}
          />

          <Pagination
            currentPage={safeState.data.currentPage}
            totalPages={safeState.data.totalPages}
            onChangePage={actions.data.setCurrentPage}
          />
        </div>
      </div>
    </main>
  )
} 