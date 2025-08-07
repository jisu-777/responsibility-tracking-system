"use client"

import React, { useState, useMemo } from 'react'
import { executiveList } from '@/data/executiveData'
import ExecutiveResponsibilityPage from '@/components/executive_doc/excutive_res'
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import ActionButtonGroup from "@/components/ui/ActionButtonGroup"
import { Label } from "@/components/ui/label"
import { DataTableSelect } from "@/components/ui/DataTableSelect"

// 팝업 컴포넌트
interface PopupProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-[20px] flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-7xl max-h-[90vh] overflow-hidden rounded-lg border border-brand-400">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* 컨텐츠 */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

// 임원 정보 카드 컴포넌트
interface ExecutiveCardProps {
  executive: {
    officer: {
      name: string
      position: string
      rank: string
      department: string
      appointmentDate: string
      dualRole: string
      dualRoleDetails: string
    }
    committees: Array<{
      name: string
      role: string
      frequency: string
      responsibility: string
    }>
    responsibilities: {
      summary: string
      date: string
      details: Array<{
        duty: string
        description: string
        regulation: string
      }>
    }
    controlDuties: string[]
  }
}

const ExecutiveCard: React.FC<ExecutiveCardProps> = ({ executive }) => {
  return (
    <div className="bg-white overflow-hidden">
      {/* 헤더 섹션 */}
      <div className="text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{executive.officer.name}</h3>
            <p className="text-gray-700 mt-1">{executive.officer.position} • {executive.officer.rank}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">임명일</div>
            <div className="font-semibold">{executive.officer.appointmentDate}</div>
          </div>
        </div>
      </div>

      {/* 기본 정보 섹션 */}
      <div className="p-6 border-b border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">소관부서</span>
            <p className="font-medium text-gray-900">{executive.officer.department}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">겸직여부</span>
            <p className="font-medium text-gray-900">{executive.officer.dualRole}</p>
          </div>
          {executive.officer.dualRoleDetails && (
            <div className="col-span-2">
              <span className="text-sm text-gray-500">겸직사항</span>
              <p className="font-medium text-gray-900">{executive.officer.dualRoleDetails}</p>
            </div>
          )}
        </div>
      </div>

      {/* 주관회의체 섹션 */}
      <div className="p-6 border-b border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">주관회의체 ({executive.committees.length}개)</h4>
        <div className="space-y-3">
          {executive.committees.map((committee, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-gray-900">{committee.name}</h5>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  {committee.role}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">개최주기:</span>
                  <span className="ml-2 text-gray-900">{committee.frequency}</span>
                </div>
                <div>
                  <span className="text-gray-500">주요사항:</span>
                  <span className="ml-2 text-gray-900">{committee.responsibility}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 책무 섹션 */}
      <div className="p-6 border-b border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">책무 정보</h4>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">책무 개요</span>
                <p className="font-medium text-gray-900">{executive.responsibilities.summary}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">배분일자</span>
                <p className="font-medium text-gray-900">{executive.responsibilities.date}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">책무 세부내용 ({executive.responsibilities.details.length}개)</h5>
            <div className="space-y-3">
              {executive.responsibilities.details.map((detail, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h6 className="font-semibold text-gray-900">{detail.duty}</h6>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                      {detail.regulation}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{detail.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 관리의무 섹션 */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">관리의무 ({executive.controlDuties.length}개)</h4>
        <div className="space-y-2">
          {executive.controlDuties.map((duty, index) => (
            <div key={index} className="flex items-start">
              <span className="text-blue-600 font-bold mr-3 mt-1">•</span>
              <span className="text-gray-700">{duty}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ResponsibilityDocPage() {
  const [selectedExecutive, setSelectedExecutive] = useState<number>(0)
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)

  // 임원 옵션 생성
  const executiveOptions = executiveList.map((executive, index) => ({
    id: index.toString(),
    name: executive.officer.name,
    position: executive.officer.position
  }))

  const handleOpenPopup = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  // 다운로드 기능
  const handleDownload = () => {
    console.log("책무기술서 다운로드")
    alert("책무기술서가 다운로드되었습니다.")
  }

  // 템플릿 기능
  const handleTemplate = () => {
    console.log("템플릿 다운로드")
    alert("템플릿이 다운로드되었습니다.")
  }

  // 미리보기 기능
  const handlePreview = () => {
    setIsPopupOpen(true)
  }

  return (
    <>
      <div className="max-w-7xl mx-auto pt-4">
        <Breadcrumb 
          items={[
            { label: "책무체계도", href: "/responsibility" },
            { label: "임원별 책무기술서 관리" }
          ]}
          className="mb-8"
        />
        <div className="mb-8 flex justify-between items-center border-b border-b-brandGrey-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">임원별 책무기술서 관리</h1>
          <div className="flex items-center gap-4">
            <Label htmlFor="executive" className="text-semibold text-base font-medium">
              임원 선택
            </Label>
            <div className="w-64 pr-4 mr-4">
              <DataTableSelect
                placeholder="임원을 선택하세요"
                value={selectedExecutive.toString()}
                onChange={(value) => setSelectedExecutive(Number(value))}
                options={executiveOptions.map((executive) => ({
                  value: executive.id,
                  label: `${executive.name} ${executive.position ? `(${executive.position})` : ''}`
                }))}
              />
            </div>
            <ActionButtonGroup
              downloadProps={{
                type: "excel",
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
        
        <div className="max-w-7xl mx-auto pb-20">
          <div className="">
            {/* 임원 정보 카드 */}
            <div className="mb-8">
              <ExecutiveCard executive={executiveList[selectedExecutive]} />
            </div>
          </div>
        </div>

        {/* 팝업 */}
        <Popup 
          isOpen={isPopupOpen} 
          onClose={handleClosePopup}
          title={`${executiveList[selectedExecutive]?.officer.name} 상세 책무기술서`}
        >
          <ExecutiveResponsibilityPage selectedExecutiveIndex={selectedExecutive} />
        </Popup>
      </div>
    </>
  )
}
