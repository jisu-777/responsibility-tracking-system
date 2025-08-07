"use client"

import CustomCheckbox from "@/components/ui/CustomCheckbox"
import { Badge } from "@/components/ui/badge"
import { Save } from "lucide-react"

interface SelectedResponsibility {
  id: number
  category: string
  code: string
  responsibility: string
  detailCode: string
  detailContent: string
  selected: boolean
}

interface ResponsibilitySelectionCardProps {
  responsibilityGroups: Record<string, SelectedResponsibility[]>
  selectedResponsibilities: SelectedResponsibility[]
  onResponsibilityToggle: (category: string, responsibilityId: number) => void
  onSelectAll: (category: string, checked: boolean) => void
}

export default function ResponsibilitySelectionCard({
  responsibilityGroups,
  selectedResponsibilities,
  onResponsibilityToggle,
  onSelectAll
}: ResponsibilitySelectionCardProps) {
  return (
    <div className="bg-white  px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-brandGrey-800">
          
          책무 선택
        </h2>
       
      </div>

      <div className="space-y-6 ">
        {Object.entries(responsibilityGroups).map(([category, responsibilities]) => (
          <div key={category} className=" rounded-lg  bg-brandGrey-300/20 p-5 rounded-lg pt-5">
            <div className="flex items-center justify-between mb-5 ">
              <h3 className="text-xl font-semibold text-gray-900">· {category}</h3>
              <div className="flex items-center gap-2">
                <div
                  onClick={() => onSelectAll(category, !responsibilities.every(item => 
                    selectedResponsibilities.some(selected => selected.id === item.id)
                  ))}
                  className={`text-brandGrey-800 px-3 py-1 rounded-full text-base font-medium transition-all duration-200 cursor-pointer ${
                    responsibilities.every(item => 
                      selectedResponsibilities.some(selected => selected.id === item.id)
                    ) 
                      ? "border border-brandGrey-500/50 bg-brandGrey-400/50  hover:bg-brandGrey-400/20" 
                      : "border border-brandGrey-500/50 bg-white  hover:bg-brandGrey-500/20"
                  }`}
                  style={{
                    borderStyle: responsibilities.every(item => 
                      selectedResponsibilities.some(selected => selected.id === item.id)
                    ) ? 'dashed' : 'solid'
                  }}
                >
                  {responsibilities.every(item => 
                    selectedResponsibilities.some(selected => selected.id === item.id)
                  ) ? "전체 해제" : "전체 선택"}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {responsibilities.map((item) => (
                <div key={item.id} className={`flex items-start gap-2 p-3 rounded-lg transition-all duration-200 border-2 border-transparent ${
                  selectedResponsibilities.some(selected => selected.id === item.id) 
                    ? "bg-white " 
                    : "bg-brandGrey-200/30"
                } hover:bg-brand-100/50 hover:border-brand-500/50`}>
                                     <CustomCheckbox
                     checked={selectedResponsibilities.some(selected => selected.id === item.id)}
                     onChange={() => onResponsibilityToggle(category, item.id)}
                     className="mt-1"
                     size={20}
                   />
                   <div className="flex-1 min-w-0 hover:scale-[1.02] origin-left transition-transform duration-200">
                     <div className="flex items-center gap-2 mb-1">
                       <span className={`text-base font-semibold hover:text-gray-900 ${
                   selectedResponsibilities.some(selected => selected.id === item.id) 
                     ? "font-bold " 
                     : "font-semibold text-brandGrey-800"
                 }`}>{item.code} </span>
                  <div className={`text-base font-medium hover:text-gray-900  ${
                   selectedResponsibilities.some(selected => selected.id === item.id) 
                     ? "font-bold " 
                     : "font-semibold text-brandGrey-800"
                 }`}>: {item.responsibility}</div>
                       
                     </div>
                    
                     <div className="text-base font-medium line-clamp-2 text-brandGrey-700">{item.detailContent}</div>
                   </div>
                 </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 