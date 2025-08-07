"use client"

import { useCallback, useState, useMemo } from "react"
import { DataTable, ColumnConfig } from "@/components/table/DataTable"
import { ManagementCheckData } from "@/data/magagement/managementCheckData"
import { mockManagementCheckData } from "@/data/magagement/managementCheckData"
import { useTable } from "@/hooks/table/useTable"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { ExecutiveFilter } from "@/components/ui/ExecutiveFilter"

export default function ManagementCheckPage() {
  // useTable 훅 사용
  const [state, actions] = useTable<ManagementCheckData>({
    initialData: mockManagementCheckData,
    itemsPerPage: 15,
    searchFields: ['checkPeriod', 'checkDate', 'managementAction', 'managementActionDetail', 'checkCategory', 'department', 'personInCharge', 'checkStatus', 'group', 'responsibleExecutive'],
    filterColumns: ['checkPeriod', 'checkDate', 'managementAction', 'managementActionDetail', 'checkCategory', 'department', 'personInCharge', 'checkStatus', 'completionDate', 'group', 'responsibleExecutive'],
  })

  // 페이지 레벨 필터 상태
  const [pageFilters, setPageFilters] = useState({ group: "", executive: "" })

  // 페이지 레벨 필터링된 데이터
  const filteredData = useMemo(() => {
    let filtered = mockManagementCheckData

    if (pageFilters.group) {
      filtered = filtered.filter(item => item.group === pageFilters.group)
    }

    if (pageFilters.executive) {
      filtered = filtered.filter(item => item.responsibleExecutive === pageFilters.executive)
    }

    return filtered
  }, [pageFilters])

  // 필터 변경 핸들러
  const handleFilterChange = (filters: { group: string; executive: string }) => {
    setPageFilters(filters)
  }

  // 다운로드 기능
  const handleDownload = useCallback(() => {
    const csv = [
      ["점검주기", "점검기간", "관리조치", "관리조치세부", "점검구분", "담당부서", "담당자", "점검상태", "완료일", "그룹", "담당임원"],
      ...state.filteredData.map((item) => [
        item.checkPeriod,
        item.checkDate,
        item.managementAction,
        item.managementActionDetail,
        item.checkCategory,
        item.department,
        item.personInCharge,
        item.checkStatus,
        item.completionDate || "-",
        item.group,
        item.responsibleExecutive,
      ]),
    ]
      .map((r) => r.map((f) => `"${f}"`).join(","))
      .join("\n")

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "management_check.csv"
    link.click()
  }, [state.filteredData])

  // 컬럼 설정
  const columns: ColumnConfig<ManagementCheckData>[] = [
    {
      key: "checkPeriod",
      title: "점검주기",
      width: "min-w-[80px] w-[80px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.checkPeriod}
        </div>
      )
    },
    {
      key: "checkDate",
      title: "점검기간",
      width: "min-w-[200px] w-[200px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.checkDate}
        </div>
      )
    },
    {
      key: "managementAction",
      title: "관리조치",
      width: "min-w-[200px] max-w-[200px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black truncate max-w-[200px]">
          {item.managementAction}
        </div>
      )
    },
    {
      key: "managementActionDetail",
      title: "관리조치세부",
      width: "min-w-[300px] max-w-[300px]",
      filterable: true,
      renderCell: (item) => (
        <div className={`text-sm truncate max-w-[300px] ${item.checkStatus.includes("기한경과") ? "text-red-600" : "text-black"}`}>
          {item.managementActionDetail}
        </div>
      )
    },
    {
      key: "checkCategory",
      title: "점검구분",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.checkCategory}
        </div>
      )
    },
    {
      key: "department",
      title: "담당부서",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.department}
        </div>
      )
    },
    {
      key: "personInCharge",
      title: "담당자",
      width: "min-w-[150px] w-[150px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.personInCharge}
        </div>
      )
    },
    {
      key: "checkStatus",
      title: "점검상태",
      width: "min-w-[156px] w-[156px]",
      filterable: true,
      renderCell: (item) => (
        <div className={`text-sm ${item.checkStatus.includes("기한경과") ? "text-red-600" : "text-black"}`}>
          {item.checkStatus}
        </div>
      )
    },
    {
      key: "completionDate",
      title: "완료일",
      width: "min-w-[100px] w-[100px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.completionDate || "-"}
        </div>
      )
    },
    {
      key: "group",
      title: "그룹",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.group}
        </div>
      )
    },
    {
      key: "responsibleExecutive",
      title: "담당임원",
      width: "min-w-[100px] w-[100px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.responsibleExecutive}
        </div>
      )
    }
  ]

  return (
    <>
      <div className="max-w-7xl mx-auto pt-4">
        <Breadcrumb 
          items={[
            { label: "베이스 현황", href: "/management" },
            { label: "관리조치 점검" }
          ]}
          className="mb-8"
        />
        <div className="mb-8 flex justify-between items-center border-b border-b-brandGrey-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">관리조치 점검</h1>
          <div className="flex items-center gap-4">
            <ExecutiveFilter 
              data={mockManagementCheckData}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-b border-b-brandGrey-200">
          <div className="space-y-4">
            {/* 전자결제 업무 테이블 */}
            <div className="bg-white rounded-lg">
              <div className="px-0 pb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-brandGrey-800">· 전자결재 업무</h2>
                </div>
              </div>
              <DataTable
                title="미완료 관리조치_전자결제 업무"
                description="전자결제 업무 관련 미완료 관리조치 목록"
                state={state}
                actions={actions}
                columns={columns}
                itemsPerPage={15}
                onDownload={handleDownload}
              />
            </div>

            {/* 수기결제 업무 테이블 */}
            <div className="bg-white rounded-lg">
              <div className="px-0 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">· 수기결재 업무</h2>
                </div>
              </div>
              <DataTable
                title="미완료 관리조치_수기결제 업무"
                description="수기결제 업무 관련 미완료 관리조치 목록"
                state={state}
                actions={actions}
                columns={columns}
                itemsPerPage={15}
                onDownload={handleDownload}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
