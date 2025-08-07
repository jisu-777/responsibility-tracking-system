"use client"

import React from 'react'
import { executiveList } from '@/data/executiveData'

interface ExecutiveResponsibilityPageProps {
  selectedExecutiveIndex?: number
}

export default function ExecutiveResponsibilityPage({ selectedExecutiveIndex = 0 }: ExecutiveResponsibilityPageProps) {
  // 선택된 임원의 데이터 가져오기
  const executiveData = executiveList[selectedExecutiveIndex]
  const { officer, committees, responsibilities, controlDuties } = executiveData
  return (
    <div className="max-w-7xl mx-auto p-6">

<div className="flex justify-center items-center mt-10 mb-12">
  <h1 className="text-2xl font-bold border-b-2 border-black pb-1">
    임원별 책무기술서
  </h1>
</div>
<div className="p-2 font-semibold text-xl">1. 임원 및 직책정보</div>
        <div className=" w-full text-sm">

          
  {/* 1행: 직책 */}
  <div className="flex  border-black border">
    
    
    <div className="w-[200px]  border-r border-black bg-gray-200 p-2 font-semibold text-center flex items-center justify-center">직책<sup>1)</sup></div>
    <div className=" p-2 w-[200px]">{officer.position}</div>
    <div className="flex border-l">
    <div className="w-[200px] border-r border-black bg-gray-200 p-2 font-semibold text-center flex items-center justify-center border-l">성명</div>
    <div className="flex-1 p-2">{officer.name}</div>
    </div>


  </div>

  {/* 2행: 직위 / 성명 */}
  <div className="flex border-l border-b border-black border-r">
    <div className="w-[200px] border-r border-black bg-gray-200 p-2 font-semibold text-center flex items-center justify-center ">직위<sup>2)</sup></div>
    <div className=" p-2 w-[200px]">
      <div><span className="font-semibold ">성명:</span> {officer.name}</div>
      
    </div>
    <div className="flex border-l">
    <div className="w-[200px] border-r border-black bg-gray-200 p-2 font-semibold text-center flex items-center justify-center border-l">현 직책 부여일</div>
    <div className="flex-1 p-2">현 직책 부여일: {officer.appointmentDate}</div>
    </div>
  </div>

  {/* 3행: 겸직 여부 / 사항 */}
  <div className="flex border-b border-black border-r">
    <div className="w-[201px] border-r border-l border-black bg-gray-200 p-2 font-semibold text-center flex items-center justify-center">겸직 여부<sup>3)</sup></div>
    <div className="w-[202px] border-r border-black p-2 ">{officer.dualRole}</div>
    <div className="w-[199px] border-r border-black bg-gray-200 p-2 font-semibold text-center flex items-center justify-center">겸직사항<sup>4)</sup></div>
    <div className="flex-1 p-2">{officer.dualRoleDetails || '없음'}</div>
  </div>

  {/* 4행: 소관 부서 */}
  <div className="flex border-r border-black  ">
    <div className="w-[201px] border-l border-r border-black bg-gray-200 p-2 font-semibold text-center flex items-center justify-center">소관 부서</div>
    
    <div className="flex-1 p-2">{officer.department || '없음'}</div>
  </div>
  {/* 5행: 주관 회의체*/}
  <div className="flex border-l border-r border-t border-black w-full text-sm">
  {/* 왼쪽 병합 셀 */}
  <div className="w-[200px] border-r border-black bg-gray-200 p-2 font-semibold text-center flex items-center justify-center border-b">
    주관 회의체<sup>5)</sup>
  </div>

  {/* 오른쪽 테이블 셀 */}
  <div className="flex-1 ">
  <div className="flex border-b border-black text-center font-semibold">
                    <div className="w-[200px] border-r border-black p-2">회의체명</div>
                    <div className="w-[200px] border-r border-black p-2">위원장/위원</div>
                    <div className="w-[200px] border-r border-black p-2">개최주기</div>
                    <div className="w-[200px] p-2">주요 심의·의결사항</div>
                  </div>
    {/* 테이블 헤더 */}
    {committees.map((item, idx) => (
                    <div key={idx} className="flex border-b border-black text-center">
                      <div className="w-[200px] border-r border-black p-2">{item.name}</div>
                      <div className="w-[200px] border-r border-black p-2">{item.role}</div>
                      <div className="w-[200px] border-r border-black p-2">{item.frequency}</div>
                      <div className="w-[200px] p-2">{item.responsibility}</div>
                    </div>
                  ))}
  </div>
</div>
<div className="text-sm mt-4 space-y-2 leading-relaxed">
  <p><span className="font-semibold pl-2">주 1)</span> 직무에 대한 책임과 권한(<span className="font-semibold">예: </span>대표이사, 의장, 본부장, 부문장, 그룹장 등)</p>
  <p><span className="font-semibold pl-5">&nbsp;2)</span> 직무에 따라 규정되는 사내 지위(<span className="font-semibold">예: </span>회장, 사장, 행장, 부사장, 부행장, 상무, 전무 등)</p>
  <p><span className="font-semibold pl-5">&nbsp;3)</span> 다른 회사의 업무 또는 사내 다른 직책을 겸직하는 경우 포함</p>
  <p><span className="font-semibold pl-5">&nbsp;4)</span> 다른 회사에 겸직하고 있는 경우 그 회사명(자회사등 여부) 및 업종, 겸직하고 있는 업무 및 직책, 겸직기간을 기재하고,<br/>
  사내 다른 직책을 겸직하고 있는 경우 겸직하고 있는 업무 및 직책, 겸직기간을 기재</p>
  <p><span className="font-semibold pl-5">&nbsp;5)</span> 임원이 위원장 또는 위원의 지위에서 심의·의결권을 보유한 회의체의 현황을 기재<br />
  (심의·의결사항 없이 의견 수렴 등 단순 협의 목적의 회의체 또는 심의·의결사항이 내부통제 또는 위험관리와 관련성이 없는 회의체는 제외)</p>
</div>

<div className="p-2 font-semibold mt-4 mb-2 text-xl">2. 책무</div>

<div className="border border-black text-sm w-full">
  {/* 상단: 제목 */}
  

  {/* 1행: 개요 & 배분일자 */}
  <div className="flex border-black">
    <div className="w-3/4 border-r border-black bg-gray-100 p-2 font-semibold text-center flex items-center justify-center">
      책무 개요<sup>1)</sup>
    </div>
    <div className="w-1/4 bg-gray-100 p-2 font-semibold text-center flex items-center justify-center">
      책무 배분일자<sup>2)</sup>
    </div>
  </div>
  {/* 2행: 개요 내용 */}
  <div className="flex border-t border-black">
    <div className="w-3/4 border-r border-black p-2">{responsibilities.summary}</div>
    <div className="w-1/4 p-2">{responsibilities.date}</div>
  </div>

  {/* 3행: "책무 내용" 병합 셀 */}
  <div className="text-center border-t border-black font-semibold p-2  bg-gray-100 ">책무 내용</div>

  {/* 4행: 하위 3열 제목 */}
  <div className="flex border-t border-black text-center font-semibold bg-gray-100">
    <div className="w-1/4 border-r border-black p-2">책무<sup>3)</sup></div>
    <div className="w-1/2 border-r border-black p-2">책무 세부내용<sup>4)</sup></div>
    <div className="w-1/4 p-2">관련 법령 및 내규<sup>5)</sup></div>
  </div>

  {/* 5~7행: 내용 행들 */}
  {responsibilities.details.map((row, idx) => (
                <div key={idx} className="flex border-t border-black">
                  <div className="w-1/4 border-r border-black p-2">{row.duty}</div>
                  <div className="w-1/2 border-r border-black p-2">{row.description}</div>
                  <div className="w-1/4 p-2">{row.regulation}</div>
                </div>
              ))}
</div>

<div className="text-sm mt-4 space-y-2 leading-relaxed">
  <p><span className="font-semibold">주 1)</span> 영 &lt;별표 1&gt; 제2호의 경우 고객, 금융상품, 판매채널, 담당지역 등의 구분기준에 따른 개요를 기재하고, 영 &lt;별표 1&gt; 제1·3호의 경우 책무의 내용을 요약하여 기재</p>
  <p><span className="font-semibold">2)</span> 임원의 직책 변경, 책무의 추가·변경 등에 따른 현 책무의 배분일자 기재</p>
  <p><span className="font-semibold">3)</span> 영 &lt;별표 1&gt;에 기재된 각 목의 책무를 참고하여 기재(각 금융회사별 조직, 업무특성, 업무범위 등을 고려하여 세분·병합, 추가 등 조정 가능)</p>
  <p><span className="font-semibold">4)</span> 소관책무와 관련하여 임원이 수행·운영·결정하거나 관리·감독할 책임 등 책무의 세부내용을 기재(법 제30조의2 및 제30조의4 등에서 규정하는 관리의무 등 책임을 수행하는 방법을 기재하는 것이 아님을 유의)하며, 동일 업무와 관련된 책임이 다른 임원과 분할되어 있는 등 제한 또는 한정된 내용을 명확히 설명할 것(<span className="font-semibold">예: </span>기업고객 관련 업무에 한함)</p>
  <p><span className="font-semibold">5)</span> 책무의 근거, 내용, 업무수행의 기준 등과 관련된 법령명 및 내규명 기재</p>
</div>


<div className="text-sm space-y-4 mt-6">
  {/* 제목 */}
  <div className="font-semibold">
    3. 책무 이행을 위한 주요 관리의무<sup>1)</sup>
  </div>

  {/* 박스 형태의 리스트 */}
  <div className="border border-black px-4 py-3 leading-relaxed">
    {controlDuties.map((duty, idx) => (
                  <p key={idx}>ㆍ{duty}</p>
                ))}
  </div>

  {/* 각주 */}
  <div className="text-sm  leading-relaxed mt-2">
    <p>
      <span className="font-semibold">주 1)</span> '2. 책무'와 관련하여 법 제30조의2 및 제30조의4 등에 따라 부담하는 주요 관리·총괄의무(이하 '관리의무등')의 내용을 기재
    </p>
    <p className="mt-1">
      (<span className="font-semibold">※</span> 표에 기재한 관리의무등은 임원 및 대표이사등(법 제30조의2제2항의 대표이사등을 말한다)이 수행할 구체적인 관리조치를 의미하는 것은 아니며,<br />
      회사 자체적으로 임원별 세부적인 관리조치·활동 계획을 별도 마련하여야 함에 유의)
    </p>
  </div>
</div>

</div>



  
    </div>
  )
}
