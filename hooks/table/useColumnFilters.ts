import { useState, useMemo, useCallback } from "react"

export interface ColumnFilter {
  [column: string]: string[]
}

export interface ColumnFilterState {
  columnFilters: ColumnFilter
  openFilter: string | null
  activeFiltersCount: number
}

export interface ColumnFilterActions {
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter>>
  setOpenFilter: (val: string | null) => void
  handleColumnFilterChange: (column: string, value: string, checked: boolean) => void
  handleSelectAll: (column: string, checked: boolean, availableValues: string[]) => void
  removeFilter: (column: string, value: string) => void
  resetFilters: () => void
  getAvailableValues: (column: string, filteredData: any[]) => string[]
}

export function useColumnFilters<T extends Record<string, any>>(
  columns: string[]
): [ColumnFilterState, ColumnFilterActions] {
  const [columnFilters, setColumnFilters] = useState<ColumnFilter>(() => {
    const initial: ColumnFilter = {}
    columns.forEach(column => {
      initial[column] = []
    })
    return initial
  })
  
  const [openFilter, setOpenFilter] = useState<string | null>(null)

  // 활성 필터 개수 계산 - useMemo로 최적화
  const activeFiltersCount = useMemo(() => 
    Object.values(columnFilters).reduce((sum, arr) => sum + arr.length, 0),
    [columnFilters]
  )

  // 컬럼 필터 변경 핸들러 - useCallback으로 최적화
  const handleColumnFilterChange = useCallback((column: string, value: string, checked: boolean) => {
    setColumnFilters((prev) => {
      const currentValues = prev[column] || []
      return {
        ...prev,
        [column]: checked 
          ? [...currentValues, value] 
          : currentValues.filter((v) => v !== value),
      }
    })
  }, [])

  // 전체 선택/해제 핸들러 - useCallback으로 최적화
  const handleSelectAll = useCallback((column: string, checked: boolean, availableValues: string[]) => {
    setColumnFilters((prev) => ({ 
      ...prev, 
      [column]: checked ? availableValues : [] 
    }))
  }, [])

  // 필터 제거 핸들러 - useCallback으로 최적화
  const removeFilter = useCallback((column: string, value: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [column]: prev[column].filter((v) => v !== value),
    }))
  }, [])

  // 필터 초기화 핸들러 - useCallback으로 최적화
  const resetFilters = useCallback(() => {
    const reset: ColumnFilter = {}
    columns.forEach(column => {
      reset[column] = []
    })
    setColumnFilters(reset)
  }, [columns])

  // 사용 가능한 값들 계산 - useCallback으로 최적화
  const getAvailableValues = useCallback((column: string, filteredData: T[]) => {
    if (column === 'id') return []
    
    // filteredData가 undefined일 수 있으므로 안전하게 처리
    const safeData = filteredData || []
    
    // 현재 컬럼을 제외한 다른 필터들이 적용된 데이터에서 사용 가능한 값들 추출
    const availableData = safeData.filter((item) =>
      Object.entries(columnFilters).every(([col, values]) =>
        col === column || values.length === 0 || col === 'id'
          ? true
          : values.includes(String(item[col]))
      )
    )
    
    return Array.from(new Set(availableData.map((item) => String(item[column]))))
  }, [columnFilters])

  const state: ColumnFilterState = {
    columnFilters,
    openFilter,
    activeFiltersCount,
  }

  const actions: ColumnFilterActions = {
    setColumnFilters,
    setOpenFilter,
    handleColumnFilterChange,
    handleSelectAll,
    removeFilter,
    resetFilters,
    getAvailableValues,
  }

  return [state, actions]
} 