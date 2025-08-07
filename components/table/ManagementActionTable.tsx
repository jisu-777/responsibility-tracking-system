"use client"

import { useMemo, useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RefreshCw, FileText, Search, X } from "lucide-react"
import { ManagementCheckData } from "@/data/magagement/managementCheckData"
import { ColumnFilterPopover } from "@/components/table/ColumnFilterPopover"
import { Pagination } from "@/components/table/Pagination"
import { EvidenceModal } from "@/components/ui/EvidenceModal"
import { ProgressBar } from "@/components/ui/ProgressBar"

interface ManagementActionTableProps {
  data: ManagementCheckData[]
  title: string
  description: string
}

export function ManagementActionTable({ data, title, description }: ManagementActionTableProps) {
  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1)
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string[] }>({})
  const [openFilter, setOpenFilter] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [evidenceModal, setEvidenceModal] = useState<{
    isOpen: boolean
    evidence: string
    managementAction: string
    managementActionDetail: string
  }>({
    isOpen: false,
    evidence: "",
    managementAction: "",
    managementActionDetail: ""
  })
  const itemsPerPage = 10

  // 검색 필드 정의
  const searchFields = [
    'group',
    'responsibleExecutive', 
    'department',
    'managementAction',
    'managementActionDetail',
    'remarks'
  ]

  // 초기 필터 설정
  useEffect(() => {
    if (data.length > 0) {
      // 초기 필터 설정 - 첫 번째 그룹과 담당임원으로 시작
      const initialGroup = data[0].group
      const initialExecutive = data[0].responsibleExecutive
      
      setColumnFilters({
        group: [initialGroup],
        responsibleExecutive: [initialExecutive]
      })
    }
  }, [data])

  // 검색 및 필터링된 데이터 계산
  const filteredData = useMemo(() => {
    let filtered = data

    // 검색 필터링
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(item => {
        return searchFields.some(field => {
          const value = item[field as keyof ManagementCheckData]
          return value && value.toString().toLowerCase().includes(searchLower)
        })
      })
    }

    // 컬럼 필터링 (순서대로 적용)
    Object.entries(columnFilters).forEach(([column, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(item => {
          const itemValue = item[column as keyof ManagementCheckData]
          return values.includes(itemValue.toString())
        })
      }
    })

    return filtered
  }, [data, searchTerm, columnFilters])

  // 페이지네이션된 데이터
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage])

  // 총 페이지 수
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  // 사용 가능한 값들 가져오기 (현재 필터링된 데이터 기반)
  const getAvailableValues = useCallback((column: string) => {
    const values = new Set<string>()
    
    // 현재 필터 상태에서 해당 컬럼을 제외한 필터들을 적용한 데이터에서 값들을 가져옴
    let tempFiltered = data
    Object.entries(columnFilters).forEach(([filterColumn, filterValues]) => {
      if (filterColumn !== column && filterValues.length > 0) {
        tempFiltered = tempFiltered.filter(item => {
          const itemValue = item[filterColumn as keyof ManagementCheckData]
          return filterValues.includes(itemValue.toString())
        })
      }
    })
    
    tempFiltered.forEach(item => {
      const value = item[column as keyof ManagementCheckData]
      if (value) {
        values.add(value.toString())
      }
    })
    
    return Array.from(values).sort()
  }, [data, columnFilters])

  // 컬럼 필터 변경 핸들러
  const handleColumnFilterChange = useCallback((column: string, value: string, checked: boolean) => {
    setColumnFilters(prev => {
      const currentValues = prev[column] || []
      let newValues: string[]
      
      if (checked) {
        newValues = [...currentValues, value]
      } else {
        newValues = currentValues.filter(v => v !== value)
      }
      
      // 필터가 변경되면 다른 컬럼들의 필터도 재계산
      const newFilters = { ...prev, [column]: newValues }
      
      // 다른 컬럼들의 필터가 현재 데이터에 없는 값들을 포함하고 있다면 제거
      Object.keys(newFilters).forEach(otherColumn => {
        if (otherColumn !== column && newFilters[otherColumn].length > 0) {
          const availableValues = getAvailableValues(otherColumn)
          newFilters[otherColumn] = newFilters[otherColumn].filter(value => 
            availableValues.includes(value)
          )
        }
      })
      
      return newFilters
    })
    setCurrentPage(1) // 필터 변경 시 첫 페이지로 이동
  }, [getAvailableValues])

  // 전체 선택/해제 핸들러
  const handleSelectAll = useCallback((column: string, checked: boolean) => {
    const values = getAvailableValues(column)
    setColumnFilters(prev => ({
      ...prev,
      [column]: checked ? values : []
    }))
    setCurrentPage(1)
  }, [getAvailableValues])

  // 모든 필터 초기화
  const resetAll = useCallback(() => {
    setColumnFilters({})
    setSearchTerm("")
    setCurrentPage(1)
    setOpenFilter(null)
  }, [])

  // 검색어 초기화
  const clearSearch = useCallback(() => {
    setSearchTerm("")
    setCurrentPage(1)
  }, [])

  // 증빙 모달 열기
  const openEvidenceModal = useCallback((item: ManagementCheckData) => {
    setEvidenceModal({
      isOpen: true,
      evidence: item.evidence,
      managementAction: item.managementAction,
      managementActionDetail: item.managementActionDetail
    })
  }, [])

  // 증빙 모달 닫기
  const closeEvidenceModal = useCallback(() => {
    setEvidenceModal(prev => ({ ...prev, isOpen: false }))
  }, [])



  // 진행상태 결정
  const getProgressStatus = (progress: number, actualCompletionDate: string) => {
    if (actualCompletionDate) return "완료"
    if (progress >= 80) return "진행중"
    if (progress >= 40) return "진행중"
    return "대기"
  }

  // 진행상태 색상 결정
  const getStatusColor = (status: string) => {
    switch (status) {
      case "완료":
        return "bg-green-100 text-green-800"
      case "진행중":
        return "bg-blue-100 text-blue-800"
      case "대기":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 테이블 컬럼 정의
  const columns = [
    { key: "group", title: "그룹", width: "w-36", filterable: true },
    { key: "responsibleExecutive", title: "담당임원", width: "w-32", filterable: true },
    { key: "department", title: "부서명", width: "w-36", filterable: true },
    { key: "managementAction", title: "관리조치명", width: "w-48", filterable: true },
    { key: "startDate", title: "시작일", width: "w-32", filterable: true },
    { key: "expectedCompletionDate", title: "완료예정일", width: "w-32", filterable: true },
    { key: "actualCompletionDate", title: "실제완료일", width: "w-32", filterable: true },
    { key: "progress", title: "진행률", width: "w-32", filterable: true },
    { key: "status", title: "진행상태", width: "w-32", filterable: true },
    { key: "remarks", title: "비고", width: "w-48", filterable: true },
    { key: "evidence", title: "증빙", width: "w-20", filterable: true }
  ]

  return (
    <>
      <div className="">
        <div className="p-6">
          {/* 검색 및 초기화 버튼 */}
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-brand-500/50 w-6 h-6" />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-4 pr-10 py-2 border-1 border-brand-500/50 rounded-full focus:border-brand-500/80 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-2 min-h-[40px] bg-transparent transition-all duration-200"
              />
            </div>
            <div 
              onClick={resetAll}
              className="flex items-center gap-2 px-3 py-2 border border-brandGrey-300 rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <img src="/images/undo (1).png" alt="지우개" className="w-6 h-6" />
              필터 초기화
            </div>
          </div>

                     {/* 검색 결과 표시 */}
           {searchTerm && (
             <div className="mb-4 text-base text-gray-600">
               "{searchTerm}" 검색 결과: {filteredData.length}건
             </div>
           )}

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-full caption-bottom text-sm border-collapse table-fixed border-b border-b-brandGrey-700">
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
                {paginatedData.map((item, index) => {
                  const status = getProgressStatus(item.progress, item.actualCompletionDate)
                  return (
                                         <tr key={item.id} className="align-top border-b transition-colors hover:bg-brandGrey-100">
                       <td className="z-10 border-r px-2 py-1.5 align-middle text-base text-gray-900 w-16">
                         {(currentPage - 1) * itemsPerPage + index + 1}
                       </td>
                       <td className="z-10 border-r px-2 py-1.5 align-middle text-base text-gray-900 w-48">{item.group}</td>
                       <td className="z-10 border-r px-2 py-1.5 align-middle text-base text-gray-900 w-32">{item.responsibleExecutive}</td>
                       <td className="z-10 border-r px-2 py-1.5 align-middle text-base text-gray-900 w-32">{item.department}</td>
                       <td className="z-10 border-r px-2 py-1.5 align-middle text-base text-gray-900 w-48">{item.managementAction}</td>
                       <td className="z-10 border-r px-2 py-1.5 align-middle text-base text-gray-900 w-24">{item.startDate}</td>
                       <td className="z-10 border-r px-2 py-1.5 align-middle text-base text-gray-900 w-24">{item.expectedCompletionDate}</td>
                       <td className="z-10 border-r px-2 py-1.5 align-middle text-base text-gray-900 w-24">{item.actualCompletionDate || "-"}</td>
                                               <td className="z-10 border-r px-2 py-1.5 align-middle text-base w-24">
                          <ProgressBar progress={item.progress} />
                        </td>
                       <td className="z-10 border-r px-2 py-1.5 align-middle text-base w-20">
                         <Badge className={`text-xs ${getStatusColor(status)}`}>
                           {status}
                         </Badge>
                       </td>
                       <td className="z-10 border-r px-2 py-1.5 align-middle text-base text-gray-900 w-48">
                         <div className="max-w-xs truncate" title={item.remarks}>
                           {item.remarks}
                         </div>
                       </td>
                       <td className="z-10 border-r px-2 py-1.5 align-middle text-base w-20">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEvidenceModal(item)}
                          className="gap-1"
                        >
                          <FileText className="w-3 h-3" />
                          보기
                        </Button>
                      </td>
                    </tr>
                  )
                })}
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

      <EvidenceModal
        isOpen={evidenceModal.isOpen}
        onClose={closeEvidenceModal}
        evidence={evidenceModal.evidence}
        managementAction={evidenceModal.managementAction}
        managementActionDetail={evidenceModal.managementActionDetail}
      />
    </>
  )
} 