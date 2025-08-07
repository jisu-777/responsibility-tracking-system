"use client"

import { ExecutiveMasterTable } from "@/components/executive_doc/executive_master"
import { mockExecutiveMasterData } from "@/data/executiveData"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export default function ExecutiveMasterPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto pt-4">
        <Breadcrumb 
          items={[
            { label: "임원", href: "/executive" },
            { label: "임원 Master" }
          ]}
          className="mb-8"
        />
        <div className="mb-8 flex justify-between items-center border-b border-b-brandGrey-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">임원 Master</h1>
        </div>

        {/* 임원 마스터 테이블 */}
        <div className="bg-white">
          <ExecutiveMasterTable
            data={mockExecutiveMasterData}
          />
        </div>
      </div>
    </>
  )
}
