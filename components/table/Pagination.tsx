"use client"

import { Button } from "@/components/ui/button"
import React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onChangePage: (page: number) => void
}

const Pagination = React.memo(function Pagination({ currentPage, totalPages, onChangePage }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const range = []

    const start = Math.max(1, Math.min(totalPages - 4, currentPage - 2))
    const end = Math.min(totalPages, start + 4)

    for (let i = start; i <= end; i++) {
      range.push(i)
    }

    return range
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </Button>

      <div className="flex gap-1">
        {getPageNumbers().map((pageNum) => (
          <Button
            key={pageNum}
            variant={currentPage === pageNum ? "default" : "outline"}
            size="sm"
            onClick={() => onChangePage(pageNum)}
            className="w-8 h-8 p-0"
          >
            {pageNum}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </Button>
    </div>
  )
})

export { Pagination }
