"use client"

import { X } from "lucide-react"

interface SelectedResponsibility {
  id: number
  category: string
  code: string
  responsibility: string
  detailCode: string
  detailContent: string
  selected: boolean
}

interface Props {
  selectedResponsibilities: SelectedResponsibility[]
  onRemove: (id: number) => void
  onClearAll?: () => void
}

export default function SelectedResponsibilityPanel({ selectedResponsibilities, onRemove, onClearAll }: Props) {
  // 카테고리별로 책무 그룹화
  const groupedResponsibilities = selectedResponsibilities.reduce((groups, responsibility) => {
    const category = responsibility.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(responsibility)
    return groups
  }, {} as Record<string, SelectedResponsibility[]>)

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-hidden">
      {/* 헤더 */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-xl font-bold flex items-center gap-2 text-brandGrey-800">선택된 책무 ({selectedResponsibilities.length}개)</h3>
        </div>
        {selectedResponsibilities.length > 0 && onClearAll && (
          <div
            onClick={onClearAll}
            className=" text-brandGrey-900 hover:bg-red-200 px-3 py-1 rounded-full text-sm font-medium hover:text-red-700 transition-colors cursor-pointer border border-brandGrey-500/50"
          >
            전체 해제
          </div>
        )}
      </div>

      {/* 책무 목록 */}
      {selectedResponsibilities.length === 0 ? ( 
        <div className="text-center py-4 text-gray-500 text-base">선택된 책무가 없습니다</div>
      ) : (
        <>
          <div className="space-y-1 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
            {Object.entries(groupedResponsibilities).map(([category, responsibilityList]) => (
              <div key={category} className="space-y-1">
                <h4 className="text-base font-semibold border-b border-brand-200 pb-1 sticky top-0 z-10 py-2 text-brand-400 bg-white">
                  {category} ({responsibilityList.length})
                </h4>
                <div className="space-y-1">
                  {responsibilityList.map((responsibility) => (
                    <div key={responsibility.id} className="bg-white hover:bg-brand-100 hover:rounded transition-colors duration-300 p-1 pt-2 border-b border-brandGrey-100">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-base font-medium text-gray-900">{responsibility.code}</span>

                          </div>
                          <h5 className="text-base line-clamp-2 font-medium  text-brandGrey-600 ">{responsibility.responsibility}</h5>
                          
                        </div>
                        <div
                          onClick={() => onRemove(responsibility.id)}
                          className="text-red-600 hover:text-red-800 p-1 h-auto transition-colors cursor-pointer"
                        >
                          <X className="h-4 w-4 text-brandGrey-900" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
} 