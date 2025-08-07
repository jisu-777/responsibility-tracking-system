"use client"

import { OrgNode, ExecutiveResponsibility, Responsibility } from "@/data/mockData2"
import { ExecutiveResponsibilityData } from "@/types"
import { mockExecutiveEvaluationData } from "@/data/mockData3"

interface StaticResponsibilityChartProps {
  data: ExecutiveResponsibilityData[]
  selectedExecutive?: string
}

export default function StaticResponsibilityChart({ data, selectedExecutive }: StaticResponsibilityChartProps) {
  // 책무 코드에서 마지막 번호 추출하는 함수
  const extractResponsibilityCodes = (responsibilities: ExecutiveResponsibilityData[]) => {
    return responsibilities
      .map(item => {
        const code = item.code || ""
        const lastNumber = code.split('-').pop() || ""
        // 숫자인지 확인하고 숫자인 경우만 반환
        return /^\d+$/.test(lastNumber) ? lastNumber : ""
      })
      .filter(code => code !== "")
      .sort((a, b) => parseInt(a) - parseInt(b)) // 숫자 순으로 정렬
  }

  // 6단계 전체 데이터를 기존 구조로 변환
  const convertToOrgStructure = () => {
    const executives = mockExecutiveEvaluationData
    
    // 대표이사 (1단계)
    const ceo = executives.find(exec => exec.level === 1)
    const directors = executives.filter(exec => exec.level === 2)
    const managers = executives.filter(exec => exec.level === 3)
    const seniors = executives.filter(exec => exec.level === 4)
    const juniors = executives.filter(exec => exec.level === 5)
    const assistants = executives.filter(exec => exec.level === 6)
    
    const orgStructure: OrgNode = {
      id: ceo?.executiveId || "ceo",
      name: ceo?.name || "대표이사",
      title: ceo?.position || "대표이사",
      children: directors.map(director => ({
        id: director.executiveId,
        name: director.name,
        title: director.position,
        children: managers
          .filter(manager => manager.parentId === director.executiveId)
          .map(manager => ({
            id: manager.executiveId,
            name: manager.name,
            title: manager.position,
            children: seniors
              .filter(senior => senior.parentId === manager.executiveId)
              .map(senior => ({
                id: senior.executiveId,
                name: senior.name,
                title: senior.position,
                children: juniors
                  .filter(junior => junior.parentId === senior.executiveId)
                  .map(junior => ({
                    id: junior.executiveId,
                    name: junior.name,
                    title: junior.position,
                    children: assistants
                      .filter(assistant => assistant.parentId === junior.executiveId)
                      .map(assistant => ({
                        id: assistant.executiveId,
                        name: assistant.name,
                        title: assistant.position
                      }))
                  }))
              }))
          }))
      }))
    }
    
    return [orgStructure]
  }

  // 필터 적용 시 해당 임원을 루트로 하는 계층구조 생성
  const convertToFilteredOrgStructure = () => {
    if (!selectedExecutive || selectedExecutive === "all") {
      return convertToOrgStructure()
    }

    const executives = mockExecutiveEvaluationData
    const selectedExec = executives.find(exec => exec.executiveId === selectedExecutive)
    
    if (!selectedExec) {
      return convertToOrgStructure()
    }

    // 선택된 임원을 루트로 하는 새로운 구조 생성
    const createSubTree = (execId: string): OrgNode | null => {
      const exec = executives.find(e => e.executiveId === execId)
      if (!exec) return null

      const children = executives
        .filter(e => e.parentId === execId)
        .map(child => createSubTree(child.executiveId))
        .filter(Boolean) as OrgNode[]

      return {
        id: exec.executiveId,
        name: exec.name,
        title: exec.position,
        children: children.length > 0 ? children : undefined
      }
    }

    const filteredStructure = createSubTree(selectedExecutive)
    return filteredStructure ? [filteredStructure] : convertToOrgStructure()
  }

  const renderNode = (node: OrgNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isSelected = selectedExecutive === node.id

    // 해당 노드의 책무 데이터 찾기 (모든 레벨 포함)
    const nodeResponsibilities = data.filter(item => {
      const executive = mockExecutiveEvaluationData.find(exec => exec.executiveId === node.id)
      return executive && item.name === executive.name
    })

    // 책무 코드 번호들 추출
    const responsibilityCodes = extractResponsibilityCodes(nodeResponsibilities)

    return (
      <li key={node.id}>
        <div
          className={`
            ${isSelected 
              ? 'border-2 border-brand-500 bg-brand-500/10 shadow-lg' 
              : 'border border-gray-300 bg-white'
            }
            ${level === 0 ? 'bg-blue-50 border-blue-300 shadow-md' : ''}
            ${level === 1 ? 'bg-gray-50 border-gray-300' : ''}
            ${level >= 2 ? 'bg-white border-gray-200' : ''}
            cursor-default
            rounded-lg
            p-3
            min-w-[120px]
          `}
        >
          <div className="text-center">
            <div className="font-semibold text-sm text-gray-900">{node.name}</div>
            <div className="text-xs text-gray-600 mt-1">{node.title}</div>
            {responsibilityCodes.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {responsibilityCodes.map((code, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium bg-brand-100 text-brand-700 rounded-full min-w-[20px] h-5"
                  >
                    {code}
                  </span>
                ))}
              </div>
            ) : nodeResponsibilities.length > 0 && (
              <div className="text-xs text-gray-500 mt-1">
                (책무 있음)
              </div>
            )}
          </div>
        </div>
        
        {hasChildren && (
          <ul>
            {node.children!.map((child) => renderNode(child, level + 1))}
          </ul>
        )}
      </li>
    )
  }

  // 필터 적용 여부에 따라 다른 구조 사용
  const displayData = selectedExecutive && selectedExecutive !== "all" 
    ? convertToFilteredOrgStructure()
    : convertToOrgStructure()

  return (
    <div className="w-full overflow-x-auto">
      <div className="p-6">
        {/* 조직도 */}
        <div className="tree">
          <ul>
            {displayData.map((node) => renderNode(node))}
          </ul>
        </div>
      </div>
    </div>
  )
} 