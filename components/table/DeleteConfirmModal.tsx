"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2, AlertTriangle } from "lucide-react"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  selectedCount: number
}

export default function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  selectedCount 
}: DeleteConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            삭제 확인
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-700 mb-2">
            선택된 <span className="font-semibold text-red-600">{selectedCount}개</span> 항목을 삭제하시겠습니까?
          </p>
          <p className="text-sm text-gray-500">
            이 작업은 되돌릴 수 없습니다.
          </p>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirm}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 