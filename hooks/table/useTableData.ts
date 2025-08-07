import { useState, useMemo, useCallback } from "react"

export interface TableDataHookOptions<T> {
  initialData: T[]
  itemsPerPage?: number
  searchFields?: (keyof T)[]
}

export interface TableDataState<T> {
  data: T[]
  currentPage: number
  totalPages: number
  selectedItems: number[]
}

export interface TableDataActions<T> {
  setData: (data: T[]) => void
  setCurrentPage: (page: number) => void
  setSelectedItems: (items: number[]) => void
  handleSelectItem: (id: number, checked: boolean) => void
  handleSelectAllItems: (checked: boolean) => void
  addItem: (item: T) => void
  updateItem: (id: number, updatedItem: Partial<T>) => void
  deleteItems: (ids: number[]) => void
  resetFilters: () => void
}

export function useTableData<T extends { id: number }>(
  options: TableDataHookOptions<T>
): [TableDataState<T>, TableDataActions<T>] {
  const { initialData, itemsPerPage = 10, searchFields = [] } = options

  const [data, setData] = useState<T[]>(initialData || [])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  // 페이지네이션 계산 - useMemo로 최적화
  const totalPages = useMemo(() => Math.ceil((data || []).length / itemsPerPage), [data, itemsPerPage])

  // 이벤트 핸들러들 - useCallback으로 최적화
  const handleSelectItem = useCallback((id: number, checked: boolean) => {
    setSelectedItems((prev) => 
      checked ? [...prev, id] : prev.filter((v) => v !== id)
    )
  }, [])

  const handleSelectAllItems = useCallback((checked: boolean) => {
    // 현재 페이지의 아이템들을 선택/해제
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageItems = (data || []).slice(startIndex, endIndex)
    setSelectedItems(checked ? currentPageItems.map((item) => item.id) : [])
  }, [data, currentPage, itemsPerPage])

  const addItem = useCallback((item: T) => {
    setData((prev) => [item, ...prev])
    setCurrentPage(1)
  }, [])

  const updateItem = useCallback((id: number, updatedItem: Partial<T>) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    )
  }, [])

  const deleteItems = useCallback((ids: number[]) => {
    setData((prev) => prev.filter((item) => !ids.includes(item.id)))
    setSelectedItems([])
  }, [])

  const resetFilters = useCallback(() => {
    setSelectedItems([])
    setCurrentPage(1)
  }, [])

  const state: TableDataState<T> = {
    data: data || [],
    currentPage,
    totalPages,
    selectedItems,
  }

  const actions: TableDataActions<T> = {
    setData,
    setCurrentPage,
    setSelectedItems,
    handleSelectItem,
    handleSelectAllItems,
    addItem,
    updateItem,
    deleteItems,
    resetFilters,
  }

  return [state, actions]
} 