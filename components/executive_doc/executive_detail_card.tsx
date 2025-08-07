"use client"

import React from 'react'
import { ExecutiveEvaluationData } from '@/data/mockData3'
import { mockExecutiveResponsibilityData } from '@/data/mockData'
import Image from 'next/image'

interface ExecutiveDetailCardProps {
  executive: ExecutiveEvaluationData
}

export default function ExecutiveDetailCard({ executive }: ExecutiveDetailCardProps) {
  // 해당 임원의 책무 수 계산
 

  return (
    <div className="bg-white max-w-7xl">

<div className="flex items-center justify-between mb-8">
                <h3 className="text-4xl font-bold truncate text-brand-400">{executive.name} </h3>
               
              </div>
              


      
      <div className="flex gap-8">

{/* 프로필 이미지 */}
<div className="flex-shrink-0 mr-8">
              <div className="w-56 h-56 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={executive.profileImageUrl}
                  alt={`${executive.name} 프로필`}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>



        {/* 디브 1: 임원 기본 정보 */}
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-6 border-r border-dashed border-brandGrey-200">
            
            {/* 임원 정보 */}
            <div className="flex-1 min-w-0">
              
            <h4 className="text-xl font-bold text-brandGrey-800 mb-4">기본 정보</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-base font-medium  w-20">직책:</span>
                  <span className="text-base ">{executive.position}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-base font-medium w-20">이메일:</span>
                  <span className="text-base truncate">{executive.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-base font-medium  w-20">연락처:</span>
                  <span className="text-base">010-1234-5678</span>
                </div>
                <div className="flex items-center">
                  <span className="text-base font-medium  w-20">직위:</span>
                  <span className="text-base">{executive.title}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-base font-medium  w-20">사번:</span>
                  <span className="text-base ">{executive.executiveId}</span>
                </div>
              </div>
            </div> 
          </div>
        </div>

        {/* 디브 2: 임원 등록/해제 정보 + 상태 표시 */}
        <div className="flex-1">
          {/* 임원 등록/해제 정보 */}
          <div className="mb-6">
            <h4 className="text-xl font-bold text-brandGrey-800 mb-4">등록 정보</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-base font-medium  w-24">등록일:</span>
                <span className="text-base ">{executive.executiveRegistrationDate}</span>
              </div>
              <div className="flex items-center">
                <span className="text-base font-medium  w-24 ">해제일:</span>
                <span className="text-base ">
                  {executive.executiveDismissalDate || "-"}
                </span>
              </div>
              <div className="flex items-center ">
            <span className="text-base font-medium  w-24">현재 상태:</span>
              
            <span className="text-base "> {executive.executiveDismissalDate ? '해제' : '재직'}</span>
            </div>
            





            </div>
          </div>

         
        </div>
      </div>
    </div>
  )
} 