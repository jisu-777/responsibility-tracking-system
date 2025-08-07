import { useState, useEffect, useCallback } from "react"

export interface SearchState {
  searchTerm: string
  debouncedSearchTerm: string
}

export interface SearchActions {
  setSearchTerm: (term: string) => void
  clearSearch: () => void
}

export function useSearch(delay: number = 300): [SearchState, SearchActions] {
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  // 디바운스된 검색어 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, delay)

    return () => clearTimeout(timer)
  }, [searchTerm, delay])

  // 검색어 초기화
  const clearSearch = useCallback(() => {
    setSearchTerm("")
  }, [])

  const state: SearchState = {
    searchTerm,
    debouncedSearchTerm,
  }

  const actions: SearchActions = {
    setSearchTerm,
    clearSearch,
  }

  return [state, actions]
} 