"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText, Eye, FileSpreadsheet, FileText as FileTextIcon } from "lucide-react"

// 다운로드 타입 정의
export type DownloadType = "excel" | "pdf"

// 다운로드 버튼 props
interface DownloadButtonProps {
  type: DownloadType
  onDownload: () => void
  disabled?: boolean
  className?: string
}

// 템플릿 버튼 props
interface TemplateButtonProps {
  onTemplate: () => void
  disabled?: boolean
  className?: string
}

// 미리보기 버튼 props
interface PreviewButtonProps {
  onPreview: () => void
  disabled?: boolean
  className?: string
}

// 전체 버튼 그룹 props
interface ActionButtonGroupProps {
  downloadProps: DownloadButtonProps
  templateProps?: TemplateButtonProps
  previewProps?: PreviewButtonProps
  className?: string
}

// 다운로드 버튼 컴포넌트
function DownloadButton({ type, onDownload, disabled = false, className = "" }: DownloadButtonProps) {
  // 타입에 따른 아이콘과 텍스트 설정
  const getDownloadConfig = (type: DownloadType) => {
    switch (type) {
      case "excel":
        return {
          icon: <FileSpreadsheet className="w-4 h-4" />,
          text: "엑셀 다운로드",
          bgColor: "bg-green-600 hover:bg-green-700"
        }
      case "pdf":
        return {
          icon: <FileTextIcon className="w-4 h-4" />,
          text: "PDF 다운로드",
          bgColor: "bg-red-600 hover:bg-red-700"
        }
      default:
        return {
          icon: <Download className="w-4 h-4" />,
          text: "다운로드",
          bgColor: "bg-blue-600 hover:bg-blue-700"
        }
    }
  }

  const config = getDownloadConfig(type)

  return (
    <Button
      onClick={onDownload}
      disabled={disabled}
      className={`${config.bgColor} text-white ${className}`}
    >
      {config.icon}
      <span className="ml-2">{config.text}</span>
    </Button>
  )
}

// 템플릿 버튼 컴포넌트
function TemplateButton({ onTemplate, disabled = false, className = "" }: TemplateButtonProps) {
  return (
    <Button
      onClick={onTemplate}
      disabled={disabled}
      className={`bg-blue-600 hover:bg-blue-700 text-white ${className}`}
    >
      <FileText className="w-4 h-4" />
      <span className="ml-2">템플릿</span>
    </Button>
  )
}

// 미리보기 버튼 컴포넌트
function PreviewButton({ onPreview, disabled = false, className = "" }: PreviewButtonProps) {
  return (
    <Button
      onClick={onPreview}
      disabled={disabled}
      className={`bg-gray-600 hover:bg-gray-700 text-white ${className}`}
    >
      <Eye className="w-4 h-4" />
      <span className="ml-2">미리보기</span>
    </Button>
  )
}

// 메인 버튼 그룹 컴포넌트
export default function ActionButtonGroup({
  downloadProps,
  templateProps,
  previewProps,
  className = ""
}: ActionButtonGroupProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {/* 다운로드 버튼 */}
      <DownloadButton {...downloadProps} />
      
      {/* 템플릿 버튼 (선택적) */}
      {templateProps && <TemplateButton {...templateProps} />}
      
      {/* 미리보기 버튼 (선택적) */}
      {previewProps && <PreviewButton {...previewProps} />}
    </div>
  )
} 