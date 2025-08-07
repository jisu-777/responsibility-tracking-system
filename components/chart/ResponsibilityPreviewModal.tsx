"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import StaticResponsibilityChart from "./StaticResponsibilityChart"
import { ExecutiveResponsibilityData } from "@/types"
import { mockExecutiveResponsibilityData } from "@/data/mockData"

interface ResponsibilityPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  selectedExecutive?: string
}

export default function ResponsibilityPreviewModal({ 
  isOpen, 
  onClose, 
  selectedExecutive 
}: ResponsibilityPreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            책무체계도 미리보기
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-lg border shadow-sm min-h-[600px]">
            <StaticResponsibilityChart 
              data={mockExecutiveResponsibilityData} 
              selectedExecutive={selectedExecutive}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4 border-t bg-gray-50 px-6 py-4">
          <Button variant="outline" onClick={onClose} className="px-6">
            닫기
          </Button>
          <Button onClick={onClose} className="px-6">
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 