import { useMemo, useCallback, useEffect } from "react"
import { useTableData, TableDataState, TableDataActions } from "./useTableData"
import { useColumnFilters, ColumnFilterState, ColumnFilterActions } from "./useColumnFilters"
import { useSearch, SearchState, SearchActions } from "./useSearch"
import { useModals, ModalState, ModalActions } from "./useModals"

export interface TableHookOptions<T> {
  initialData: T[]
  itemsPerPage?: number
  searchFields?: (keyof T)[]
  filterColumns?: string[]
}

export interface TableState<T> {
  data: TableDataState<T>
  filters: ColumnFilterState
  search: SearchState
  modals: ModalState
  // 계산된 값들
  filteredData: T[]
  paginatedData: T[]
  isAllCurrentPageSelected: boolean
  isSomeCurrentPageSelected: boolean
}

export interface TableActions<T> {
  data: TableDataActions<T>
  filters: ColumnFilterActions
  search: SearchActions
  modals: ModalActions
  // 통합된 액션들
  handleEdit: (id: number) => void
  handleDelete: () => void
  handleConfirmDelete: () => void
  handleAdd: (item: T) => void
  handleUpdate: (id: number, updatedItem: Partial<T>) => void
  resetAll: () => void
}

export function useTable<T extends { id: number }>(
  options: TableHookOptions<T>
): [TableState<T>, TableActions<T>] {
  const { initialData, itemsPerPage = 10, searchFields = [], filterColumns = [] } = options

  // 각각의 훅 사용
  const [dataState, dataActions] = useTableData<T>({
    initialData: initialData || [],
    itemsPerPage,
  })

  const [filterState, filterActions] = useColumnFilters<T>(filterColumns)
  const [searchState, searchActions] = useSearch()
  const [modalState, modalActions] = useModals<T>()

  // 검색과 필터가 적용된 최종 데이터 - useMemo로 최적화
  const filteredData = useMemo(() => {
    // dataState.data가 undefined일 수 있으므로 안전하게 처리
    let result = dataState.data || []

    // 검색 필터 적용
    if (searchState.debouncedSearchTerm.trim() && searchFields.length > 0) {
      const searchLower = searchState.debouncedSearchTerm.toLowerCase()
      result = result.filter((item) => {
        return searchFields.some((field) => {
          const value = item[field]
          return value && String(value).toLowerCase().includes(searchLower)
        })
      })
    }

    // 컬럼 필터 적용
    if (filterState.columnFilters) {
      result = result.filter((item) =>
        Object.entries(filterState.columnFilters).every(([column, values]) =>
          values.length === 0 ? true : values.includes(String(item[column as keyof T]))
        )
      )
    }

    return result
  }, [dataState.data, searchState.debouncedSearchTerm, searchFields, filterState.columnFilters])

  // 페이지네이션된 데이터 - useMemo로 최적화
  const paginatedData = useMemo(() => {
    const startIndex = (dataState.currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }, [filteredData, dataState.currentPage, itemsPerPage])

  // 필터링된 데이터의 총 페이지 수 계산
  const totalPages = useMemo(() => Math.ceil(filteredData.length / itemsPerPage), [filteredData.length, itemsPerPage])

  // 선택 상태 계산 - useMemo로 최적화
  const isAllCurrentPageSelected = useMemo(() => 
    paginatedData.length > 0 && paginatedData.every((i) => dataState.selectedItems.includes(i.id)),
    [paginatedData, dataState.selectedItems]
  )
  
  const isSomeCurrentPageSelected = useMemo(() => 
    paginatedData.some((i) => dataState.selectedItems.includes(i.id)),
    [paginatedData, dataState.selectedItems]
  )

  // 통합된 액션들 - useCallback으로 최적화
  const handleEdit = useCallback((id: number) => {
    const item = (dataState.data || []).find((d) => d.id === id)
    if (item) {
      modalActions.openEditModal(item)
    }
  }, [dataState.data, modalActions])

  const handleDelete = useCallback(() => {
    if (dataState.selectedItems.length === 0) return
    modalActions.openDeleteModal()
  }, [dataState.selectedItems.length, modalActions])

  const handleConfirmDelete = useCallback(() => {
    dataActions.deleteItems(dataState.selectedItems)
    modalActions.closeDeleteModal()
  }, [dataActions, dataState.selectedItems, modalActions])

  const handleAdd = useCallback((item: T) => {
    dataActions.addItem(item)
    modalActions.closeAddModal()
  }, [dataActions, modalActions])

  const handleUpdate = useCallback((id: number, updatedItem: Partial<T>) => {
    dataActions.updateItem(id, updatedItem)
    modalActions.closeEditModal()
  }, [dataActions, modalActions])

  const resetAll = useCallback(() => {
    searchActions.clearSearch()
    filterActions.resetFilters()
    dataActions.resetFilters()
  }, [searchActions, filterActions, dataActions])

  // 검색 상태를 dataState에 반영
  useEffect(() => {
    // 검색어가 변경되면 첫 페이지로 이동
    if (searchState.debouncedSearchTerm !== searchState.searchTerm) {
      dataActions.setCurrentPage(1)
    }
  }, [searchState.debouncedSearchTerm, searchState.searchTerm, dataActions])

  const state: TableState<T> = {
    data: {
      ...dataState,
      totalPages, // 필터링된 데이터의 총 페이지 수로 덮어쓰기
    },
    filters: filterState,
    search: searchState,
    modals: modalState,
    filteredData,
    paginatedData,
    isAllCurrentPageSelected,
    isSomeCurrentPageSelected,
  }

  const actions: TableActions<T> = {
    data: dataActions,
    filters: filterActions,
    search: searchActions,
    modals: modalActions,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleAdd,
    handleUpdate,
    resetAll,
  }

  return [state, actions]
} 