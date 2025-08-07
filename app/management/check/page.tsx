"use client"

import { useState, useMemo } from "react"
import { ManagementCheckTable } from "@/components/table/ManagementCheckTable"
import { ExecutiveFilter } from "@/components/ui/ExecutiveFilter"
import { mockManagementCheckData } from "@/data/magagement/managementCheckData"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export default function ManagementCheckPage() {
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
        </div>
        
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto py-6">
            {/* 페이지 레벨 필터 */}
            <ExecutiveFilter 
              data={mockManagementCheckData}
              onFilterChange={handleFilterChange}
            />

            <div className="space-y-8">
              {/* 전자결제 업무 테이블 */}
              <div className="bg-white rounded-lg shadow">
                <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">미완료 관리조치_전자결제 업무</h2>
                    <div className="text-sm">
                      미완료 / 점검대상 : {filteredData.length}/{mockManagementCheckData.length}
                    </div>
                  </div>
                </div>
                <ManagementCheckTable
                  data={filteredData}
                  title="미완료 관리조치_전자결제 업무"
                  description="전자결제 업무 관련 미완료 관리조치 목록"
                />
              </div>

              {/* 수기결제 업무 테이블 */}
              <div className="bg-white rounded-lg shadow">
                <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">미완료 관리조치_수기결제 업무</h2>
                    <div className="text-sm">
                      미완료 / 점검대상 : {filteredData.length}/{mockManagementCheckData.length}
                    </div>
                  </div>
                </div>
                <ManagementCheckTable
                  data={filteredData}
                  title="미완료 관리조치_수기결제 업무"
                  description="수기결제 업무 관련 미완료 관리조치 목록"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
