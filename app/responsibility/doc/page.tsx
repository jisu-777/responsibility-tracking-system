"use client"

import React, { useState, useMemo } from 'react'
import { executiveList } from '@/data/executiveData'
import ExecutiveResponsibilityPage from '@/components/executive_doc/excutive_res'
import { Breadcrumb } from "@/components/ui/Breadcrumb"

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-2"
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
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{executive.officer.name}</h3>
            <p className="text-blue-100 mt-1">{executive.officer.position} • {executive.officer.rank}</p>
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

  const handleOpenPopup = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
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
        </div>
        
        <div className="max-w-7xl mx-auto p-6">
          {/* 헤더 */}
          <div className="mb-8">
            <p className="text-gray-600 mt-2">임원들의 책무 정보를 확인하고 관리할 수 있습니다.</p>
          </div>

        {/* 필터 섹션 */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">임원 선택:</label>
            <select
              value={selectedExecutive}
              onChange={(e) => setSelectedExecutive(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            >
              {executiveList.map((executive, index) => (
                <option key={index} value={index}>
                  {executive.officer.name} ({executive.officer.position})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 임원 정보 카드 */}
        <div className="mb-8">
          <ExecutiveCard executive={executiveList[selectedExecutive]} />
        </div>

        {/* 상세 보기 버튼 */}
        <div className="text-center">
          <button 
            onClick={handleOpenPopup}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            상세 책무기술서 보기
          </button>
          <p className="text-sm text-gray-500 mt-3">
            선택한 임원의 상세한 책무기술서를 확인할 수 있습니다.
          </p>
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
    </div>
    </>
  )
}
