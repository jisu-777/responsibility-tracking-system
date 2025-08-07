"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface AddResponsibilityButtonProps {
  onClick: () => void
  disabled?: boolean
}

export default function AddResponsibilityButton({ onClick, disabled = false }: AddResponsibilityButtonProps) {
  return (
    <Button 
      onClick={onClick} 
      disabled={disabled}
      className="flex items-center gap-2"
    >
      <Plus className="w-4 h-4" />
      새 책무 등록
    </Button>
  )
} 