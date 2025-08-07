"use client"

import { useState, useCallback } from "react"
import { Label } from "@/components/ui/label"
import ResponsibilityChart from "@/components/chart/ResponsibilityChart"
import ActionButtonGroup from "@/components/ui/ActionButtonGroup"
import { DataTableSelect } from "@/components/ui/DataTableSelect"
import { mockExecutiveEvaluationData } from "@/data/mockData3"
import { mockExecutiveResponsibilityData } from "@/data/mockData"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import ResponsibilitySidebarModal from "@/components/executive_doc/ResponsibilitySidebarModal"
import ResponsibilityPreviewModal from "@/components/chart/ResponsibilityPreviewModal"
import { ExecutiveResponsibilityData } from "@/types"

export default function ResponsibilityListPage() {
  const [selectedExecutive, setSelectedExecutive] = useState<string>("all")
  const [modalState, setModalState] = useState({
    isOpen: false,
    responsibility: null as ExecutiveResponsibilityData | null,
    allResponsibilities: [] as ExecutiveResponsibilityData[]
  })
  const [previewModalOpen, setPreviewModalOpen] = useState(false)

  // 본부장(3번째 계층)까지만 필터링된 임원 옵션 생성
  const executiveOptions = [
    { id: "all", name: "전체 보기", position: "" },
    ...mockExecutiveEvaluationData
      .filter(executive => executive.level <= 3)
      .map(executive => ({
        id: executive.executiveId,
        name: executive.name,
        position: executive.position
      }))
  ]

  // 다운로드 기능
  const handleDownload = useCallback(() => {
    // 실제 다운로드 로직 구현
    console.log("책무체계도 다운로드")
    alert("책무체계도가 다운로드되었습니다.")
  }, [])

  // 템플릿 기능
  const handleTemplate = useCallback(() => {
    console.log("템플릿 다운로드")
    alert("템플릿이 다운로드되었습니다.")
  }, [])

  // 미리보기 기능
  const handlePreview = useCallback(() => {
    console.log("미리보기")
    setPreviewModalOpen(true)
  }, [])

  // 책무 클릭 핸들러
  const handleResponsibilityClick = useCallback((responsibility: ExecutiveResponsibilityData, allResponsibilities?: ExecutiveResponsibilityData[]) => {
    setModalState({ 
      isOpen: true, 
      responsibility,
      allResponsibilities: allResponsibilities || []
    })
  }, [])

  // 모달 닫기 핸들러
  const handleCloseModal = useCallback(() => {
    setModalState({ isOpen: false, responsibility: null, allResponsibilities: [] })
  }, [])

  return (
    <>
      <div className="max-w-7xl mx-auto pt-4">
        <Breadcrumb 
          items={[
            { label: "책무체계도" }
          ]}
          className="mb-8"
        />
        <div className="mb-8 flex justify-between items-center border-b border-b-brandGrey-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">책무체계도</h1>
          <div className="flex items-center gap-4">
            <Label htmlFor="executive" className="text-semibold text-base font-medium">
              임원 선택
            </Label>
            <div className="w-64 pr-4 mr-4">
              <DataTableSelect
                placeholder="임원을 선택하세요"
                value={selectedExecutive}
                onChange={setSelectedExecutive}
                options={executiveOptions.map((executive) => ({
                  value: executive.id,
                  label: `${executive.name} ${executive.position ? `(${executive.position})` : ''}`
                }))}
              />
            </div>
            <ActionButtonGroup
              downloadProps={{
                type: "pdf",
                onDownload: handleDownload
              }}
              templateProps={{
                onTemplate: handleTemplate
              }}
              previewProps={{
                onPreview: handlePreview
              }}
            />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="">
            {/* 체계도 */}
            <div className="bg-white rounded-lg border shadow-sm">
              <ResponsibilityChart 
                data={mockExecutiveResponsibilityData} 
                selectedExecutive={selectedExecutive}
                onResponsibilityClick={handleResponsibilityClick}
              />
            </div>
          </div>
        </div>

      {/* 사이드바 모달 */}
      <ResponsibilitySidebarModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        responsibility={modalState.responsibility}
        allResponsibilities={modalState.allResponsibilities}
      />

      {/* 미리보기 팝업 */}
      <ResponsibilityPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        selectedExecutive={selectedExecutive}
      />
    </div>
    </>
  )
}
