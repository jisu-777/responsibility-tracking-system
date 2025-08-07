"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DownloadButtonProps {
  onDownload: () => void
  disabled?: boolean
  className?: string
}

export default function DownloadButton({ onDownload, disabled = false, className = "" }: DownloadButtonProps) {
  return (
    <Button
      onClick={onDownload}
      disabled={disabled}
      className={`bg-red-600 hover:bg-red-700 text-white ${className}`}
    >
      <Download className="w-4 h-4 mr-2" />
      다운로드
    </Button>
  )
} 