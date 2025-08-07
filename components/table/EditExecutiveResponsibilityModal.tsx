"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Save } from "lucide-react"
import { ExecutiveResponsibilityData, ExecutiveResponsibilityFormData, ResponsibilityData } from "@/types"
import { mockResponsibilityData, mockExecutiveResponsibilityData } from "@/data/mockData"

interface EditExecutiveResponsibilityModalProps {
  isOpen: boolean
  onClose: () => void
  onEdit: (id: number, data: ExecutiveResponsibilityFormData) => void
  editingItem: ExecutiveResponsibilityData | null
}

export default function EditExecutiveResponsibilityModal({ 
  isOpen, 
  onClose, 
  onEdit, 
  editingItem 
}: EditExecutiveResponsibilityModalProps) {
  const [formData, setFormData] = useState<ExecutiveResponsibilityFormData>({
    name: "",
    position: "",
    email: "",
    executiveRegistrationDate: "",
    organization: "",
    category: "",
    code: "",
    responsibility: "",
    detailCode: "",
    detailContent: "",
    assignmentDate: "",
    startDate: "",
    registrant: "",
    approver: "",
    status: "미시작",
  })

  const [errors, setErrors] = useState<Partial<ExecutiveResponsibilityFormData>>({})

  // 임원 데이터에서 고유한 성명과 직책 조합 추출
  const executiveOptions = Array.from(
    new Set(mockExecutiveResponsibilityData.map(item => `${item.name}|${item.position}`))
  ).map(item => {
    const [name, position] = item.split('|')
    return { name, position }
  })

  // 책무 데이터에서 고유한 카테고리 추출
  const categoryOptions = Array.from(
    new Set(mockResponsibilityData.map(item => item.category))
  )

  // 선택된 책무에 따른 세부코드 옵션들
  const [detailCodeOptions, setDetailCodeOptions] = useState<Array<{code: string, content: string}>>([])

  // 편집할 아이템이 변경될 때 폼 데이터 초기화
  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        position: editingItem.position,
        email: editingItem.email,
        executiveRegistrationDate: editingItem.executiveRegistrationDate,
        organization: editingItem.organization,
        category: editingItem.category,
        code: editingItem.code,
        responsibility: editingItem.responsibility,
        detailCode: editingItem.detailCode,
        detailContent: editingItem.detailContent,
        assignmentDate: editingItem.assignmentDate,
        startDate: editingItem.startDate,
        registrant: editingItem.registrant,
        approver: editingItem.approver,
        status: editingItem.status,
      })
      setErrors({})
      
      // 편집 아이템의 카테고리에 따른 세부코드 옵션 설정
      if (editingItem.category) {
        const detailOptions = mockResponsibilityData
          .filter(item => item.category === editingItem.category)
          .map(item => ({
            code: item.detailCode,
            content: item.detailContent
          }))
        setDetailCodeOptions(detailOptions)
      }
    }
  }, [editingItem])

  const handleInputChange = (field: keyof ExecutiveResponsibilityFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 입력 시 해당 필드의 에러 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  // 임원 성명 선택 시 직책 자동 채우기
  const handleExecutiveChange = (executiveInfo: string) => {
    const [name, position] = executiveInfo.split('|')
    handleInputChange("name", name)
    handleInputChange("position", position)
  }

  // 책무구분 선택 시 코드와 책무 자동 채우기
  const handleCategoryChange = (category: string) => {
    handleInputChange("category", category)
    
    // 해당 카테고리의 첫 번째 책무 데이터 가져오기
    const responsibilityData = mockResponsibilityData.find(item => item.category === category)
    if (responsibilityData) {
      handleInputChange("code", responsibilityData.code)
      handleInputChange("responsibility", responsibilityData.responsibility)
      
      // 해당 책무의 모든 세부코드 옵션 생성
      const detailOptions = mockResponsibilityData
        .filter(item => item.category === category)
        .map(item => ({
          code: item.detailCode,
          content: item.detailContent
        }))
      setDetailCodeOptions(detailOptions)
      
      // 기존 세부코드가 새로운 옵션에 없으면 초기화
      if (!detailOptions.find(option => option.code === formData.detailCode)) {
        handleInputChange("detailCode", "")
        handleInputChange("detailContent", "")
      }
    }
  }

  // 세부코드 선택 시 내용 자동 채우기
  const handleDetailCodeChange = (detailCode: string) => {
    handleInputChange("detailCode", detailCode)
    const selectedDetail = detailCodeOptions.find(option => option.code === detailCode)
    if (selectedDetail) {
      handleInputChange("detailContent", selectedDetail.content)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ExecutiveResponsibilityFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "성명을 입력해주세요."
    }
    if (!formData.position.trim()) {
      newErrors.position = "직책을 입력해주세요."
    }
    if (!formData.organization.trim()) {
      newErrors.organization = "관리대상조직을 입력해주세요."
    }
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
      newErrors.detailCode = "책무세부코드를 선택해주세요."
    }
    if (!formData.detailContent.trim()) {
      newErrors.detailContent = "책무세부내용을 입력해주세요."
    }
    if (!formData.assignmentDate.trim()) {
      newErrors.assignmentDate = "책무배분일을 입력해주세요."
    }
    if (!formData.startDate.trim()) {
      newErrors.startDate = "책무시작일을 입력해주세요."
    }
    if (!formData.registrant.trim()) {
      newErrors.registrant = "등록자를 입력해주세요."
    }
    if (!formData.approver.trim()) {
      newErrors.approver = "승인자를 입력해주세요."
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
      name: "",
      position: "",
      email: "",
      executiveRegistrationDate: "",
      organization: "",
      category: "",
      code: "",
      responsibility: "",
      detailCode: "",
      detailContent: "",
      assignmentDate: "",
      startDate: "",
      registrant: "",
      approver: "",
      status: "미시작",
    })
    setErrors({})
    setDetailCodeOptions([])
    onClose()
  }

  if (!editingItem) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="w-5 h-5" />임원 관리조치 수정
          </DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            {/* 임원 선택 */}
            <div className="space-y-2">
              <Label htmlFor="executive" className="text-sm font-medium">
                임원 선택 <span className="text-red-500">*</span>
              </Label>
              <Select value={`${formData.name}|${formData.position}`} onValueChange={handleExecutiveChange}>
                <SelectTrigger className={errors.name ? "border-red-500" : ""}>
                  <SelectValue placeholder="임원을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {executiveOptions.map((executive) => (
                    <SelectItem key={`${executive.name}|${executive.position}`} value={`${executive.name}|${executive.position}`}>
                      {executive.name} ({executive.position})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* 직책 (자동 채워짐) */}
            <div className="space-y-2">
              <Label htmlFor="position" className="text-sm font-medium">
                직책
              </Label>
              <Input
                id="position"
                value={formData.position}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>

          {/* 관리대상조직 */}
          <div className="space-y-2">
            <Label htmlFor="organization" className="text-sm font-medium">
              관리대상조직 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="organization"
              value={formData.organization}
              onChange={(e) => handleInputChange("organization", e.target.value)}
              placeholder="관리대상조직을 입력하세요"
              className={errors.organization ? "border-red-500" : ""}
            />
            {errors.organization && <p className="text-sm text-red-500">{errors.organization}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>

            {/* 책무코드 (자동 채워짐) */}
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium">
                책무코드
              </Label>
              <Input
                id="code"
                value={formData.code}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>

          {/* 책무 (자동 채워짐) */}
          <div className="space-y-2">
            <Label htmlFor="responsibility" className="text-sm font-medium">
              책무
            </Label>
            <Textarea
              id="responsibility"
              value={formData.responsibility}
              readOnly
              rows={3}
              className="bg-gray-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 책무세부코드 */}
            <div className="space-y-2">
              <Label htmlFor="detailCode" className="text-sm font-medium">
                책무세부코드 <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.detailCode} onValueChange={handleDetailCodeChange}>
                <SelectTrigger className={errors.detailCode ? "border-red-500" : ""}>
                  <SelectValue placeholder="책무세부코드를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {detailCodeOptions.map((option) => (
                    <SelectItem key={option.code} value={option.code}>
                      {option.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.detailCode && <p className="text-sm text-red-500">{errors.detailCode}</p>}
            </div>

            {/* 관리조치 현황 (고정값) */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                관리조치 현황
              </Label>
              <Input
                id="status"
                value="미시작"
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>

          {/* 책무세부내용 (자동 채워짐) */}
          <div className="space-y-2">
            <Label htmlFor="detailContent" className="text-sm font-medium">
              책무세부내용
            </Label>
            <Textarea
              id="detailContent"
              value={formData.detailContent}
              readOnly
              rows={3}
              className="bg-gray-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 책무배분일 */}
            <div className="space-y-2">
              <Label htmlFor="assignmentDate" className="text-sm font-medium">
                책무배분일 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="assignmentDate"
                type="date"
                value={formData.assignmentDate}
                onChange={(e) => handleInputChange("assignmentDate", e.target.value)}
                className={errors.assignmentDate ? "border-red-500" : ""}
              />
              {errors.assignmentDate && <p className="text-sm text-red-500">{errors.assignmentDate}</p>}
            </div>

            {/* 책무시작일 */}
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium">
                책무시작일 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className={errors.startDate ? "border-red-500" : ""}
              />
              {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 등록자 */}
            <div className="space-y-2">
              <Label htmlFor="registrant" className="text-sm font-medium">
                등록자 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="registrant"
                value={formData.registrant}
                onChange={(e) => handleInputChange("registrant", e.target.value)}
                placeholder="등록자를 입력하세요"
                className={errors.registrant ? "border-red-500" : ""}
              />
              {errors.registrant && <p className="text-sm text-red-500">{errors.registrant}</p>}
            </div>

            {/* 승인자 */}
            <div className="space-y-2">
              <Label htmlFor="approver" className="text-sm font-medium">
                승인자 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="approver"
                value={formData.approver}
                onChange={(e) => handleInputChange("approver", e.target.value)}
                placeholder="승인자를 입력하세요"
                className={errors.approver ? "border-red-500" : ""}
              />
              {errors.approver && <p className="text-sm text-red-500">{errors.approver}</p>}
            </div>
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