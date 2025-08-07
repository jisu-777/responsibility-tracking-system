"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Save } from "lucide-react"
import { ResponsibilityData, ResponsibilityFormData } from "@/types"

interface EditResponsibilityModalProps {
  isOpen: boolean
  onClose: () => void
  onEdit: (id: number, data: ResponsibilityFormData) => void
  editingItem: ResponsibilityData | null
}

const CATEGORY_OPTIONS = [
  "경영관리 관련 책무",
  "리스크관리 관련 책무",
  "컴플라이언스 관련 책무",
  "IT관리 관련 책무",
  "인사관리 관련 책무",
]

export default function EditResponsibilityModal({ 
  isOpen, 
  onClose, 
  onEdit, 
  editingItem 
}: EditResponsibilityModalProps) {
  const [formData, setFormData] = useState<ResponsibilityFormData>({
    category: "",
    code: "",
    responsibility: "",
    detailCode: "",
    detailContent: "",
  })

  const [errors, setErrors] = useState<Partial<ResponsibilityFormData>>({})

  // 편집할 아이템이 변경될 때 폼 데이터 초기화
  useEffect(() => {
    if (editingItem) {
      setFormData({
        category: editingItem.category,
        code: editingItem.code,
        responsibility: editingItem.responsibility,
        detailCode: editingItem.detailCode,
        detailContent: editingItem.detailContent,
      })
      setErrors({})
    }
  }, [editingItem])

  const handleInputChange = (field: keyof ResponsibilityFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 입력 시 해당 필드의 에러 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ResponsibilityFormData> = {}

    if (!formData.category.trim()) {
      newErrors.category = "책무구분을 선택해주세요."
    }
    if (!formData.code.trim()) {
      newErrors.code = "책무코드를 입력해주세요."
    }
    if (!formData.responsibility.trim()) {
      newErrors.responsibility = "책무를 입력해주세요."
    }
    if (!formData.detailCode.trim()) {
      newErrors.detailCode = "책무세부코드를 입력해주세요."
    }
    if (!formData.detailContent.trim()) {
      newErrors.detailContent = "책무세부내용을 입력해주세요."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm() && editingItem) {
      onEdit(editingItem.id, formData)
      handleClose()
    }
  }

  const handleClose = () => {
    setFormData({
      category: "",
      code: "",
      responsibility: "",
      detailCode: "",
      detailContent: "",
    })
    setErrors({})
    onClose()
  }

  const generateCodeSuggestion = (category: string) => {
    const codeMap: { [key: string]: string } = {
      "경영관리 관련 책무": "경영관리-RB-",
      "리스크관리 관련 책무": "리스크관리-RB-",
      "컴플라이언스 관련 책무": "컴플라이언스-RB-",
      "IT관리 관련 책무": "IT관리-RB-",
      "인사관리 관련 책무": "인사관리-RB-",
    }
    return codeMap[category] || ""
  }

  const handleCategoryChange = (category: string) => {
    handleInputChange("category", category)
    // 카테고리 변경 시 코드 자동 생성 (기존 코드가 비어있을 때만)
    const codePrefix = generateCodeSuggestion(category)
    if (codePrefix && !formData.code) {
      handleInputChange("code", codePrefix + "01")
    }
  }

  if (!editingItem) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="w-5 h-5" />책무 수정
          </DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 책무구분 */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              책무구분 <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="책무구분을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
          </div>

          {/* 책무코드 */}
          <div className="space-y-2">
            <Label htmlFor="code" className="text-sm font-medium">
              책무코드 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => handleInputChange("code", e.target.value)}
              placeholder="예: 경영관리-RB-01"
              className={errors.code ? "border-red-500" : ""}
            />
            {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
            <p className="text-xs text-gray-500">책무구분에 따라 자동으로 생성됩니다. 필요시 수정 가능합니다.</p>
          </div>

          {/* 책무 */}
          <div className="space-y-2">
            <Label htmlFor="responsibility" className="text-sm font-medium">
              책무 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="responsibility"
              value={formData.responsibility}
              onChange={(e) => handleInputChange("responsibility", e.target.value)}
              placeholder="책무 내용을 입력하세요"
              rows={3}
              className={errors.responsibility ? "border-red-500" : ""}
            />
            {errors.responsibility && <p className="text-sm text-red-500">{errors.responsibility}</p>}
          </div>

          {/* 책무세부코드 */}
          <div className="space-y-2">
            <Label htmlFor="detailCode" className="text-sm font-medium">
              책무세부코드 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="detailCode"
              value={formData.detailCode}
              onChange={(e) => handleInputChange("detailCode", e.target.value)}
              placeholder="예: 경영관리-RB-01-A"
              className={errors.detailCode ? "border-red-500" : ""}
            />
            {errors.detailCode && <p className="text-sm text-red-500">{errors.detailCode}</p>}
          </div>

          {/* 책무세부내용 */}
          <div className="space-y-2">
            <Label htmlFor="detailContent" className="text-sm font-medium">
              책무세부내용 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="detailContent"
              value={formData.detailContent}
              onChange={(e) => handleInputChange("detailContent", e.target.value)}
              placeholder="책무세부내용을 입력하세요"
              rows={3}
              className={errors.detailContent ? "border-red-500" : ""}
            />
            {errors.detailContent && <p className="text-sm text-red-500">{errors.detailContent}</p>}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose}>
            취소
          </Button>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            수정
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 