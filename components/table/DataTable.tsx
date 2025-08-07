"use client"

import { useMemo, useCallback } from "react"

import { Button } from "@/components/ui/button"

import { Search, RefreshCw } from "lucide-react"

import { ResponsibilityTable, TableColumn } from "@/components/table/ResponsibilityTable"
import { FilterTags } from "@/components/table/FilterTag"
import { Pagination } from "@/components/table/Pagination"
import { TableActions } from "@/components/table/TableAction"
import { ColumnFilterPopover } from "@/components/table/ColumnFilterPopover"
import CustomCheckbox from "@/components/ui/CustomCheckbox"

export interface ColumnConfig<T> {
  key: string
  title: string
  width: string
  renderCell: (item: T, index: number) => React.ReactNode
  searchable?: boolean
  filterable?: boolean
}

export interface DataTableProps<T extends { id: number }> {
  title: string
  description: string
  // 외부 상태와 액션들
  state: any
  actions: any
  columns: ColumnConfig<T>[]
  itemsPerPage?: number
  onAdd?: () => void
  onDownload?: () => void
  onEdit?: (id: number) => void
  onDelete?: (ids: number[]) => void
  onUpdate?: (id: number, updatedItem: Partial<T>) => void
}

export function DataTable<T extends { id: number }>({
  title,
  description,
  state,
  actions,
  columns,
  itemsPerPage = 10,
  onAdd,
  onDownload,
  onEdit,
  onDelete,
  onUpdate,
}: DataTableProps<T>) {
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
          <CustomCheckbox
            checked={safeState.data.selectedItems.includes(row.id)}
            onChange={(checked) => actions.data.handleSelectItem(row.id, checked)}
            size={16}
          />
        ),
        header: (
          <CustomCheckbox
            checked={safeState.isAllCurrentPageSelected}
            onChange={actions.data.handleSelectAllItems}
            size={16}
          />
        ),
      },
      {
        key: "index",
        header: (
          <div className="text-base text-black">
            No.
          </div>
        ),
        widthClass: "w-16",
        renderCell: (_, idx) => (safeState.data.currentPage - 1) * itemsPerPage + idx + 1,
      },
    ]

    // 동적 컬럼 추가
    const dynamicColumns: TableColumn[] = columns.map((col) => ({
      key: col.key,
      widthClass: col.width,
      header: col.filterable ? createFilterPopover(col.key, col.title) : (
        <div className="text-base text-black">
          {col.title}
        </div>
      ),
      renderCell: (row: any, idx: number) => col.renderCell(row, idx),
    }))

    // 액션 컬럼 추가
    if (onEdit) {
      dynamicColumns.push({
        key: "actions",
        header: (
          <div className="text-base text-black">
            작업
          </div>
        ),
        widthClass: "w-20 text-center",
        renderCell: (row) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(row.id)}
            className="h-8 px-3 flex items-center gap-1"
          >
            수정
          </Button>
        ),
      })
    }

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
    onEdit,
  ])

  // 커스텀 핸들러들
  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete(safeState.data.selectedItems)
      actions.data.setSelectedItems([])
    } else {
      // 기본 삭제 로직
      console.log("Delete selected items:", safeState.data.selectedItems)
    }
  }, [onDelete, safeState.data.selectedItems, actions.data])

  const handleAdd = useCallback(() => {
    if (onAdd) {
      onAdd()
    } else {
      actions.modals.openAddModal()
    }
  }, [onAdd, actions.modals])

  const handleEdit = useCallback((id: number) => {
    if (onEdit) {
      onEdit(id)
    } else {
      actions.modals.openEditModal(id)
    }
  }, [onEdit, actions.modals])

  return (
    
      <main className="max-w-7xl mx-auto ">
        

        <div className="">
     

          <div className="">
            <div className=" flex gap-2 mb-4 ">
              <div className="relative flex-1">
                <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-brand-500/50  w-6 h-6" />
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  value={safeState.search.searchTerm}
                  onChange={(e) => actions.search.setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border-1 border-brand-500/50 rounded-full focus:border-brand-500/80 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-2 min-h-[40px] bg-transparent transition-all duration-200"
                />
              </div>
              <div 
                onClick={actions.resetAll}
                className="flex items-center gap-2 px-3 py-2 border border-brandGrey-300 rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <img src="/images/undo (1).png" alt="지우개" className="w-6 h-6" />
                필터 초기화
              </div>
              <TableActions
                selectedItems={safeState.data.selectedItems}
                onDeleteSelected={handleDelete}
               
                onAddNew={handleAdd}
              />

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
              handleEdit={handleEdit}
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