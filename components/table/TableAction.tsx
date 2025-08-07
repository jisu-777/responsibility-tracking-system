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
    <div className="w-27 h-10 bg-gradient-to-r   shadow-sm rounded-[40px] shadow-[0px_10px_15px_rgba(0,0,0,0.041)] flex items-center justify-center">
      <div className="w-full flex justify-between items-center px-5">
        {/* 선택 삭제 버튼 */}
        <div 
          onClick={selectedItems.length > 0 ? onDeleteSelected : undefined}
          className={`opacity-80 cursor-pointer transition-all duration-200 hover:opacity-100 hover:-mt-2 ${
            selectedItems.length > 0 
              ? 'text-brandGrey-900 hover:text-brand-500' 
              : 'text-brandGrey-300 cursor-not-allowed'
          }`}
        >
          <Trash2 className="w-6 h-6" />
        </div>

        {/* 새 책무 등록 버튼 */}
        <div 
          onClick={onAddNew}
          className="opacity-80 cursor-pointer transition-all duration-200 hover:opacity-100 hover:-mt-2 text-b hover:text-brand-500 "
        >
          <Plus className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
