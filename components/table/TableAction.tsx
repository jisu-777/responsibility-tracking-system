"use client"

import { Plus, Trash2 } from "lucide-react"

interface TableActionsProps {
  selectedItems: number[]
  onDeleteSelected: () => void
  onAddNew: () => void
}

// from-brand-400/50 to-brand-500/70 
// from-brandGrey-800 to-brandGrey-900

export function TableActions({
  selectedItems,
  onDeleteSelected,
  onAddNew,
}: TableActionsProps) {
  return (
    <div className="flex gap-2">
      <div>
        {/* 선택 삭제 버튼 */}
        <div 
          onClick={selectedItems.length > 0 ? onDeleteSelected : undefined}
          className={`w-12 h-12 bg-gradient-to-r shadow-sm rounded-[40px] shadow-[0px_10px_15px_rgba(0,0,0,0.041)] flex items-center justify-center opacity-80 cursor-pointer transition-all duration-200 hover:opacity-100 hover:-mt-2 ${
            selectedItems.length > 0 
              ? 'text-brandGrey-900 hover:text-brand-500' 
              : 'text-brandGrey-300 cursor-not-allowed'
          }`}
        >
          <Trash2 className="w-7 h-7" />
        </div>
        <div className="text-xs text-brandGrey-900 font-medium mt-1 text-center">
          삭제
        </div>
      </div>

      <div>
        {/* 새 책무 등록 버튼 */}
        <div 
          onClick={onAddNew}
          className="w-12 h-12 bg-gradient-to-r shadow-sm rounded-[40px] shadow-[0px_10px_15px_rgba(0,0,0,0.041)] flex items-center justify-center opacity-80 cursor-pointer transition-all duration-200 hover:opacity-100 hover:-mt-2 text-b hover:text-brand-500"
        >
          <Plus className="w-7 h-7" />
        </div>
        <div className="text-xs text-brandGrey-900 font-medium mt-1 text-center">
          추가
        </div>
      </div>
    </div>
  )
}
