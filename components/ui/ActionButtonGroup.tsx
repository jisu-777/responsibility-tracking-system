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
          icon: <img src="/images/logo.png" alt="Excel" className="w-7 h-7" />,
          text: "다운로드",
          bgColor: "text-green-600 hover:text-green-700"
        }
      case "pdf":
        return {
          icon: <img src="/images/pdf.png" alt="PDF" className="w-7 h-7" />,
          text: "다운로드",
          bgColor: "text-red-600 hover:text-red-700"
        }
      default:
        return {
          icon: <Download className="w-7 h-7" />,
          text: "다운로드",
          bgColor: "text-blue-600 hover:text-blue-700"
        }
    }
  }

  const config = getDownloadConfig(type)

  return (
    <div>
      <div 
        onClick={disabled ? undefined : onDownload}
        className={`w-12 h-12 bg-gradient-to-r shadow-sm rounded-[40px] shadow-[0px_10px_15px_rgba(0,0,0,0.041)] flex items-center justify-center  cursor-pointer transition-all duration-200 hover:opacity-100 hover:-mt-2 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${config.bgColor}`}
      >
        {config.icon}
      </div>
      <div className="text-xs text-brandGrey-900 font-medium mt-1 text-center">
        {config.text}
      </div>
    </div>
  )
}

// 템플릿 버튼 컴포넌트
function TemplateButton({ onTemplate, disabled = false, className = "" }: TemplateButtonProps) {
  return (
    <div>
      <div 
        onClick={disabled ? undefined : onTemplate}
        className={`w-12 h-12 bg-gradient-to-r shadow-sm rounded-[40px] shadow-[0px_10px_15px_rgba(0,0,0,0.041)] flex items-center justify-center  cursor-pointer transition-all duration-200 hover:opacity-100 hover:-mt-2 text-brandGrey-900 hover:text-brandGrey-700 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <img src="/images/web-design.png" alt="템플릿" className="w-7 h-7" />
      </div>
      <div className="text-xs text-brandGrey-900 font-medium mt-1 text-center">
        템플릿
      </div>
    </div>
  )
}

// 미리보기 버튼 컴포넌트
function PreviewButton({ onPreview, disabled = false, className = "" }: PreviewButtonProps) {
  return (
    <div>
      <div 
        onClick={disabled ? undefined : onPreview}
        className={`w-12 h-12 bg-gradient-to-r shadow-sm rounded-[40px] shadow-[0px_10px_15px_rgba(0,0,0,0.041)] flex items-center justify-center  cursor-pointer transition-all duration-200 hover:opacity-100 hover:-mt-2 text-gray-600 hover:text-gray-700 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <img src="/images/search (3).png" alt="미리보기" className="w-7 h-7" />
      </div>
      <div className="text-xs text-brandGrey-900 font-medium mt-1 text-center">
        미리보기
      </div>
    </div>
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
    <div className={`flex gap-2 -mt-2 ${className}`}>
      {/* 다운로드 버튼 */}
      <DownloadButton {...downloadProps} />
      
      {/* 템플릿 버튼 (선택적) */}
      {templateProps && <TemplateButton {...templateProps} />}
      
      {/* 미리보기 버튼 (선택적) */}
      {previewProps && <PreviewButton {...previewProps} />}
    </div>
  )
} 