"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface DeleteSelectedButtonProps {
  onClick: () => void
  selectedCount: number
  disabled?: boolean
}

export default function DeleteSelectedButton({ 
  onClick, 
  selectedCount, 
  disabled = false 
}: DeleteSelectedButtonProps) {
  return (
    <Button 
      onClick={onClick} 
      disabled={disabled || selectedCount === 0}
      variant="destructive"
      className="flex items-center gap-2"
    >
      <Trash2 className="w-4 h-4" />
      선택 삭제 {selectedCount > 0 && `(${selectedCount})`}
    </Button>
  )
} 