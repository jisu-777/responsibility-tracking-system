"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, X } from "lucide-react"

interface EvidenceModalProps {
  isOpen: boolean
  onClose: () => void
  evidence: string
  managementAction: string
  managementActionDetail: string
}

export function EvidenceModal({ 
  isOpen, 
  onClose, 
  evidence, 
  managementAction, 
  managementActionDetail 
}: EvidenceModalProps) {
  const handleDownload = () => {
    // 실제 다운로드 로직 (현재는 파일명만 표시)
    console.log(`다운로드: ${evidence}`)
    // 실제 구현에서는 파일 다운로드 API 호출
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            증빙 파일
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* 관리조치 정보 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">관리조치 정보</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">관리조치:</span>
                <span className="ml-2 text-gray-900">{managementAction}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">관리조치세부:</span>
                <span className="ml-2 text-gray-900">{managementActionDetail}</span>
              </div>
            </div>
          </div>

          {/* 증빙 파일 정보 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">증빙 파일</h3>
              <Badge variant="secondary" className="text-xs">
                PDF
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{evidence}</p>
                <p className="text-sm text-gray-500">파일 크기: 2.5MB</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                다운로드
              </Button>
            </div>
          </div>

          {/* 파일 미리보기 (실제로는 PDF 뷰어 등 구현) */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">파일 미리보기</h3>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">PDF 파일 미리보기</p>
              <p className="text-sm text-gray-500 mt-2">
                실제 구현에서는 PDF 뷰어 컴포넌트를 사용합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 