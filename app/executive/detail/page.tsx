"use client"

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { ExecutiveDetailFilter } from "@/components/ui/ExecutiveDetailFilter"
import ExecutiveDetailCard from "@/components/executive_doc/executive_detail_card"
import ResponsibilitySidebarModal from "@/components/executive_doc/ResponsibilitySidebarModal"
import SimpleTable from "@/components/ui/SimpleTable"
import { Tooltip } from "@/components/ui/Tooltip"
import { 
  mockExecutiveEvaluationData, 
  ExecutiveEvaluationData
} from "@/data/mockData3"
import { mockExecutiveResponsibilityData } from "@/data/mockData"
import { ExecutiveResponsibilityData } from "@/types"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

// 전역 상태 관리를 위한 커스텀 훅
function useModalState() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    responsibility: null as ExecutiveResponsibilityData | null
  })

  const openModal = useCallback((responsibility: ExecutiveResponsibilityData) => {
    setModalState({ isOpen: true, responsibility })
  }, [])

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, responsibility: null })
  }, [])

  return { modalState, openModal, closeModal }
}

export default function ExecutiveDetail() {
  // 선택된 임원 상태 관리 (첫 번째 임원을 기본값으로 설정)
  const [selectedExecutive, setSelectedExecutive] = useState<string>(mockExecutiveEvaluationData[0]?.executiveId || "")
  
  // 모달 상태 관리 (별도 훅 사용)
  const { modalState, openModal, closeModal } = useModalState()

  // 툴팁 상태 관리
  const [tooltipState, setTooltipState] = useState({
    isVisible: false,
    content: "",
    position: { x: 0, y: 0 }
  })

  // 툴팁 표시 핸들러
  const handleTooltipShow = useCallback((content: string, event: React.MouseEvent) => {
    setTooltipState({
      isVisible: true,
      content,
      position: { x: event.clientX, y: event.clientY }
    })
  }, [])

  // 툴팁 숨김 핸들러
  const handleTooltipHide = useCallback(() => {
    setTooltipState(prev => ({ ...prev, isVisible: false }))
  }, [])

  // 필터링된 평가대상 임원 데이터 계산
  const filteredExecutiveData = useMemo(() => {
    return mockExecutiveEvaluationData.filter(item => item.executiveId === selectedExecutive)
  }, [selectedExecutive])

  // 선택된 임원의 책임 데이터 계산 (이름으로 연결)
  const selectedExecutiveName = useMemo(() => {
    const executive = mockExecutiveEvaluationData.find(item => item.executiveId === selectedExecutive)
    return executive?.name || ""
  }, [selectedExecutive])

  const executiveResponsibilityData = useMemo(() => {
    return mockExecutiveResponsibilityData.filter(item => item.name === selectedExecutiveName)
  }, [selectedExecutiveName])

  // 임원 선택 핸들러
  const handleExecutiveChange = useCallback((executiveId: string) => {
    setSelectedExecutive(executiveId)
  }, [])

  // 책무 클릭 핸들러
  const handleResponsibilityClick = useCallback((responsibility: ExecutiveResponsibilityData) => {
    openModal(responsibility)
  }, [openModal])

  // 책무 테이블 컬럼 정의
  const responsibilityColumns = [
    {
      key: "no",
      header: "No",
      widthClass: "w-10",
      renderCell: (item: ExecutiveResponsibilityData) => {
        const index = executiveResponsibilityData.findIndex(data => data.id === item.id)
        return index + 1
      }
    },
    {
      key: "category",
      header: "책무구분",
      widthClass: "w-40",
      renderCell: (item: ExecutiveResponsibilityData) => (
        <div 
          className=" p-1 rounded"
          
        >
          {item.category}
        </div>
      )
    },





    
    {
      key: "code",
      header: "책무코드",
      widthClass: "w-40",
      renderCell: (item: ExecutiveResponsibilityData) => (
        <div 
          className="  p-1 rounded"
          
        >
          {item.code}
        </div>
      )
    },
    {
      key: "responsibility",
      header: "책무",
      widthClass: "w-64",
      renderCell: (item: ExecutiveResponsibilityData) => (
        <div 
          className="cursor-pointer hover:bg-gray-50 p-1 rounded truncate"
          onClick={() => handleResponsibilityClick(item)}
          onMouseEnter={(e) => handleTooltipShow(item.responsibility, e)}
          onMouseLeave={handleTooltipHide}
        >
          {item.responsibility}
        </div>
      )
    },
    {
      key: "startDate",
      header: "책무시작일",
      widthClass: "w-32",
      renderCell: (item: ExecutiveResponsibilityData) => (
        <div 
          className="  p-1 rounded"
        
        >
          {item.startDate}
        </div>
      )
    },
    {
      key: "status",
      header: "상태",
      widthClass: "w-24",
      renderCell: (item: ExecutiveResponsibilityData) => (
        <div 
          className=" p-1"
          
        >
       
            {item.status}
         
        </div>
      )
    }
  ]

    const responsibilityCount = mockExecutiveResponsibilityData.filter(
    item => item.name === selectedExecutiveName
  ).length

  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrumb 
        items={[
          { label: "임원", href: "/executive" },
          { label: "임원 상세" }
        ]}
        className="mb-8"
      />
      <div className="mb-8 flex justify-between items-center border-b border-b-brandGrey-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">임원 상세</h1>
        
        <div className="mb-8">
          <ExecutiveDetailFilter
            executives={mockExecutiveEvaluationData}
            selectedExecutive={selectedExecutive}
            onExecutiveChange={handleExecutiveChange}
          />
        </div>
      </div>

      {/* 임원 상세 정보 카드 */}
      <div className="mb-8">
        {filteredExecutiveData.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {filteredExecutiveData.map((executive) => (
              <ExecutiveDetailCard 
                key={executive.id} 
                executive={executive} 
              />
            ))}
          </div>
        )}
      </div>

      {/* 임원 책임 정보 */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-brand-400 mb-4">· 현재 배분된 책무 ({responsibilityCount}개)</h2>
        
        {executiveResponsibilityData.length > 0 ? (
          <div className="bg-white border-t-2 border-b border-t-brand-500 border-b-brandGrey-700 overflow-hidden">
            <SimpleTable
              data={executiveResponsibilityData}
              columns={responsibilityColumns}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg border shadow-sm p-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">책임 정보가 없습니다</h3>
              <p className="text-gray-500">
                선택하신 임원의 책임 배분 정보가 등록되지 않았습니다.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 데이터가 없을 때 메시지 */}
      {filteredExecutiveData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">선택된 임원의 정보가 없습니다.</p>
        </div>
      )}

      {/* 사이드바 모달 - 별도 렌더링 */}
      <ResponsibilitySidebarModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        responsibility={modalState.responsibility}
      />

      {/* 툴팁 - 페이지 레벨에서 렌더링 */}
      {tooltipState.isVisible && (
        <div 
          className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-normal max-w-xs break-words pointer-events-none"
          style={{
            left: tooltipState.position.x + 10,
            top: tooltipState.position.y - 60
          }}
        >
          {tooltipState.content}
          {/* 말풍선 꼬리 */}
          <div 
            className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"
          ></div>
        </div>
      )}
    </div>
  )
}
