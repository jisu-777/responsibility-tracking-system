"use client"

import { useState, useCallback } from "react"
import { Save, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { ExecutiveResponsibilityFormData } from "@/types"
import { mockResponsibilityData, mockExecutiveResponsibilityData } from "@/data/mockData"
import BasicInfoCard from "@/components/executive_doc/BasicInfoCard"
import ResponsibilitySelectionCard from "@/components/executive_doc/ResponsibilitySelectionCard"
import SelectedResponsibilityPanel from "@/components/executive_doc/SelectedResponsibilityPanel"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

interface SelectedResponsibility {
  id: number
  category: string
  code: string
  responsibility: string
  detailCode: string
  detailContent: string
  selected: boolean
}

export default function ExecutiveRegisterPage() {
  const router = useRouter()
  
  // 기본 정보 (한번만 입력)
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    position: "",
    email: "",
    executiveRegistrationDate: "",
    executiveDismissalDate: "",
    organization: "",
    assignmentDate: "",
    startDate: "",
    registrant: "",
    approver: "",
  })

  // 선택된 책무들
  const [selectedResponsibilities, setSelectedResponsibilities] = useState<SelectedResponsibility[]>([])

  // 임원 데이터에서 고유한 성명과 직책 조합 추출
  const executiveOptions = Array.from(
    new Set(mockExecutiveResponsibilityData.map(item => `${item.name}|${item.position}`))
  ).map(item => {
    const [name, position] = item.split('|')
    return { name, position }
  })

  // 책무 데이터에서 책무구분별로 그룹화
  const responsibilityGroups = mockResponsibilityData.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = []
    }
    groups[item.category].push({
      id: item.id,
      category: item.category,
      code: item.code,
      responsibility: item.responsibility,
      detailCode: item.detailCode,
      detailContent: item.detailContent,
      selected: false
    })
    return groups
  }, {} as Record<string, SelectedResponsibility[]>)

  // 임원 선택 시 정보 자동 채우기
  const handleExecutiveChange = (executiveInfo: string) => {
    const [name, position] = executiveInfo.split('|')
    const selectedExecutive = mockExecutiveResponsibilityData.find(
      item => item.name === name && item.position === position
    )
    
    if (selectedExecutive) {
      setBasicInfo(prev => ({
        ...prev,
        name,
        position,
        email: selectedExecutive.email,
        executiveRegistrationDate: selectedExecutive.executiveRegistrationDate,
        executiveDismissalDate: selectedExecutive.executiveDismissalDate || "",
      }))
    }
  }

  // 책무 선택/해제
  const handleResponsibilityToggle = (category: string, responsibilityId: number) => {
    setSelectedResponsibilities(prev => {
      const existing = prev.find(item => item.id === responsibilityId)
      if (existing) {
        return prev.filter(item => item.id !== responsibilityId)
      } else {
        const responsibility = responsibilityGroups[category].find(item => item.id === responsibilityId)
        if (responsibility) {
          return [...prev, { ...responsibility, selected: true }]
        }
      }
      return prev
    })
  }

  // 전체 선택/해제
  const handleSelectAll = (category: string, checked: boolean) => {
    if (checked) {
      const newSelected = responsibilityGroups[category].map(item => ({ ...item, selected: true }))
      setSelectedResponsibilities(prev => {
        const filtered = prev.filter(item => !responsibilityGroups[category].some(groupItem => groupItem.id === item.id))
        return [...filtered, ...newSelected]
      })
    } else {
      setSelectedResponsibilities(prev => 
        prev.filter(item => !responsibilityGroups[category].some(groupItem => groupItem.id === item.id))
      )
    }
  }

  // 전체 선택 해제
  const handleClearAll = () => {
    setSelectedResponsibilities([])
  }

  // 개별 책무 제거
  const handleRemoveResponsibility = (id: number) => {
    setSelectedResponsibilities(prev => prev.filter(item => item.id !== id))
  }

  // 등록 처리
  const handleRegister = useCallback(() => {
    if (!basicInfo.name || !basicInfo.position || selectedResponsibilities.length === 0) {
      alert("필수 정보를 모두 입력하고 책무를 선택해주세요.")
      return
    }

    // 선택된 책무들을 ExecutiveResponsibilityData 형태로 변환
    const newExecutiveResponsibilities = selectedResponsibilities.map((item, index) => ({
      id: Date.now() + index, // 임시 ID
      name: basicInfo.name,
      position: basicInfo.position,
      email: basicInfo.email,
      executiveRegistrationDate: basicInfo.executiveRegistrationDate,
      executiveDismissalDate: basicInfo.executiveDismissalDate || undefined,
      organization: basicInfo.organization,
      category: item.category,
      code: item.code,
      responsibility: item.responsibility,
      detailCode: item.detailCode,
      detailContent: item.detailContent,
      assignmentDate: basicInfo.assignmentDate,
      startDate: basicInfo.startDate,
      registrant: basicInfo.registrant,
      approver: basicInfo.approver,
      status: "미시작" as const,
    }))

    // 여기서 실제 데이터 저장 로직을 구현할 수 있습니다
    console.log("등록된 임원 관리조치:", newExecutiveResponsibilities)
    
    alert("임원 신규등록이 완료되었습니다!")
    router.push("/executive")
  }, [basicInfo, selectedResponsibilities, router])

  return (
    <div className="max-w-7xl mx-auto pt-4">
      <Breadcrumb 
        items={[
          { label: "임원", href: "/executive" },
          { label: "임원 신규등록" }
        ]}
        className="mb-8"
      />
              <div className="mb-8 flex justify-between items-center border-b border-b-brandGrey-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">임원 신규등록</h1>

          <div className="flex gap-3 mb-4">
            <div>
              <div 
                className="w-12 h-12 bg-gradient-to-r shadow-sm rounded-[40px] shadow-[0px_10px_15px_rgba(0,0,0,0.041)] flex items-center justify-center opacity-80 cursor-pointer transition-all duration-200 hover:opacity-100 hover:-mt-2"
              >
                <img src="/images/star.png" alt="별표" className="w-7 h-7" />
              </div>
              <div className="text-xs text-brandGrey-900 font-medium mt-1 text-center">
                임시저장
              </div>
            </div>
            
            <div>
              <div 
                onClick={!basicInfo.name || !basicInfo.position || selectedResponsibilities.length === 0 ? undefined : handleRegister}
                className={`w-12 h-12 bg-gradient-to-r shadow-sm rounded-[40px] shadow-[0px_10px_15px_rgba(0,0,0,0.041)] flex items-center justify-center opacity-80 cursor-pointer transition-all duration-200 hover:opacity-100 hover:-mt-2 ${
                  !basicInfo.name || !basicInfo.position || selectedResponsibilities.length === 0
                    ? 'text-brandGrey-300 cursor-not-allowed'
                    : 'text-brandGrey-900 hover:text-brand-500'
                }`}
              >
                <CheckCircle className="w-7 h-7" />
              </div>
              <div className="text-xs text-brandGrey-900 font-medium mt-1 text-center">
                등록하기
              </div>
            </div>
          </div>
        </div>
      {/* 기본 정보 입력 */}
      <div className="mb-8">
        <BasicInfoCard
          basicInfo={basicInfo}
          setBasicInfo={setBasicInfo}
          executiveOptions={executiveOptions}
          onExecutiveChange={handleExecutiveChange}
        />
      </div>

      {/* 책무 선택 및 선택된 책무 목록 */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        {/* 책무 선택 - 5/7 비율 (약 2.5배) */}
        <div className="lg:col-span-5">
          <ResponsibilitySelectionCard
            responsibilityGroups={responsibilityGroups}
            selectedResponsibilities={selectedResponsibilities}
            onResponsibilityToggle={handleResponsibilityToggle}
            onSelectAll={handleSelectAll}
          />
        </div>

        {/* 선택된 책무 목록 - 2/7 비율 */}
        <div className="lg:col-span-2">
          <SelectedResponsibilityPanel
            selectedResponsibilities={selectedResponsibilities}
            onRemove={handleRemoveResponsibility}
            onClearAll={handleClearAll}
          />
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="mt-8 flex justify-end gap-4">
        
      </div>
    </div>
  )
} 