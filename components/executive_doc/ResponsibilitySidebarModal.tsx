"use client"

import React, { useEffect, useMemo } from 'react'
import { ExecutiveResponsibilityData } from '@/types'
import { mockExecutiveResponsibilityData } from '@/data/mockData'
import { mockExecutiveEvaluationData } from '@/data/mockData3'

interface ResponsibilitySidebarModalProps {
  isOpen: boolean
  onClose: () => void
  responsibility: ExecutiveResponsibilityData | null
  allResponsibilities?: ExecutiveResponsibilityData[] // 해당 임원의 모든 책무
}

export default function ResponsibilitySidebarModal({
  isOpen,
  onClose,
  responsibility,
  allResponsibilities = []
}: ResponsibilitySidebarModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // 해당 임원의 모든 책무 데이터 계산
  const executiveResponsibilities = useMemo(() => {
    if (allResponsibilities.length > 0) {
      return allResponsibilities
    }
    
    if (!responsibility) return []
    
    // 선택된 책무의 임원 이름으로 모든 책무 찾기
    return mockExecutiveResponsibilityData.filter(item => item.name === responsibility.name)
  }, [responsibility, allResponsibilities])

  // 임원 정보 찾기
  const executiveInfo = useMemo(() => {
    if (!responsibility) return null
    return mockExecutiveEvaluationData.find(exec => exec.name === responsibility.name)
  }, [responsibility])

  if (!isOpen) return null

  return (
    <>
      {/* 화이트 오버레이 - 투명도 10% */}
      <div
        className="fixed inset-0 z-50 bg-white/30 backdrop-blur-[5px]"
        onClick={onClose}
      />

      {/* 사이드바 모달 */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white border-l shadow-2xl border-brand-300 z-50 transform transition-all duration-300 ease-in-out flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-dashed border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-brand-400">책무 상세 정보</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto p-6">
          {responsibility && executiveInfo ? (
            <div className="space-y-6">
              
              {/* 임원 정보 */}
              <div>
                <h3 className="font-bold text-xl text-brandGrey-800 mb-3">· 임원 정보</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">이름:</span>
                    <span className="">{executiveInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">직책:</span>
                    <span className="">{executiveInfo.position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">레벨:</span>
                    <span className="">{executiveInfo.level}단계</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">총 책무:</span>
                    <span className="text-brand-600 font-semibold">{executiveResponsibilities.length}개</span>
                  </div>
                </div>
              </div>

              {/* 모든 책무 목록 */}
              <div>
                <h3 className="font-bold text-xl text-brandGrey-800 mb-3">· 배분된 책무 목록</h3>
                <div className="space-y-3">
                  {executiveResponsibilities.map((resp, index) => (
                    <div key={resp.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-brand-600">책무 {index + 1}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          resp.status === '완료' ? 'bg-green-100 text-green-800' :
                          resp.status === '진행중' ? 'bg-blue-100 text-blue-800' :
                          resp.status === '미시작' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {resp.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="font-medium">책무구분:</span>
                          <span className="ml-2">{resp.category}</span>
                        </div>
                        <div>
                          <span className="font-medium">책무코드:</span>
                          <span className="ml-2">{resp.code}</span>
                        </div>
                        <div>
                          <span className="font-medium">책무:</span>
                          <span className="ml-2">{resp.responsibility}</span>
                        </div>
                        <div>
                          <span className="font-medium">시작일:</span>
                          <span className="ml-2">{resp.startDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 선택된 책무 상세 정보 */}
              <div>
                <h3 className="font-bold text-xl text-brandGrey-800 mb-3">· 선택된 책무 상세</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">책무구분:</span>
                    <p className="mt-1">{responsibility.category}</p>
                  </div>
                  <div>
                    <span className="font-medium">책무코드:</span>
                    <p className="mt-1">{responsibility.code}</p>
                  </div>
                  <div>
                    <span className="font-medium">책무제목:</span>
                    <p className="mt-1">{responsibility.responsibility}</p>
                  </div>
                  <div>
                    <span className="font-medium">책무설명:</span>
                    <p className="mt-1">{responsibility.detailContent}</p>
                  </div>
                </div>
              </div>

              {/* 관리 정보 */}
              <div>
                <h3 className="font-bold text-xl text-brandGrey-800 mb-3">· 관리 정보</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">책무ID:</span>
                    <span className="">{responsibility.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">카테고리:</span>
                    <span className="">{responsibility.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">책무시작일:</span>
                    <span className="">{responsibility.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">등록자:</span>
                    <span className="">{responsibility.registrant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">승인자:</span>
                    <span className="">{responsibility.approver}</span>
                  </div>
                </div>
              </div>

              {/* 상태 */}
              <div>
                <h3 className="text-lg font-bold text-brandGrey-800 mb-3">· 현재 상태</h3>
                <div className="flex items-center justify-between">
                  <span className="font-medium">상태:</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    responsibility.status === '완료' ? 'bg-green-100 text-green-800' :
                    responsibility.status === '진행중' ? 'bg-blue-100 text-blue-800' :
                    responsibility.status === '미시작' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {responsibility.status}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">책무 정보를 불러올 수 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}