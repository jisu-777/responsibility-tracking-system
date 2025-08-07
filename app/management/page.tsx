"use client"

import { ManagementActionTable } from "@/components/table/ManagementActionTable"
import { mockManagementCheckData } from "@/data/magagement/managementCheckData"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export default function ManagementPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto pt-4">
        <Breadcrumb 
          items={[
            { label: "베이스 현황" }
          ]}
          className="mb-8"
        />
        <div className="mb-8 flex justify-between items-center border-b border-b-brandGrey-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">베이스 현황</h1>
        </div>
        
        <div className="space-y-8">
          {/* 베이스 테이블 */}
          <div className="bg-white">
            <div className="  py-4 rounded-t-lg">
              
            </div>
            <ManagementActionTable
              data={mockManagementCheckData}
              title="베이스 현황"
              description="부서별 베이스 진행 상황을 확인할 수 있습니다."
            />
          </div>
        </div>
      </div>
    </>
  )
} 