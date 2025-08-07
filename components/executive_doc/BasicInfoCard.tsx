"use client"

import { Plus } from "lucide-react"
import { DataTableInput } from "@/components/ui/DataTableInput"
import { DataTableDateInput } from "@/components/ui/DataTableDateInput"
import { DataTableSelect } from "@/components/ui/DataTableSelect"

interface BasicInfo {
  name: string
  position: string
  email: string
  executiveRegistrationDate: string
  executiveDismissalDate: string
  organization: string
  assignmentDate: string
  startDate: string
  registrant: string
  approver: string
}

interface ExecutiveOption {
  name: string
  position: string
}

interface BasicInfoCardProps {
  basicInfo: BasicInfo
  setBasicInfo: (info: BasicInfo) => void
  executiveOptions: ExecutiveOption[]
  onExecutiveChange: (executiveInfo: string) => void
}

export default function BasicInfoCard({
  basicInfo,
  setBasicInfo,
  executiveOptions,
  onExecutiveChange
}: BasicInfoCardProps) {
  // 셀렉트 옵션 변환
  const selectOptions = executiveOptions.map(executive => ({
    value: `${executive.name}|${executive.position}`,
    label: `${executive.name} (${executive.position})`
  }))

  return (
    <div className="bg-white sticky top-20 overflow-y-auto border-b border-b-brandGrey-200 pb-6" style={{ borderBottomStyle: 'dashed' }}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-brandGrey-800">
        
      기본 정보
      </h2>
      
      <div className="grid grid-cols-3 gap-6 p-4">
        {/* 임원 선택 */}
        <div className="space-y-2">
          <div className="text-base font-medium">
            임원 선택 <span className="text-red-500">*</span>
          </div>
          <DataTableSelect
            placeholder="임원을 선택하세요"
            options={selectOptions}
            onChange={onExecutiveChange}
          />
        </div>

        {/* 관리대상조직 */}
        <div className="space-y-2">
          <div className="text-base font-medium">
            관리대상조직 <span className="text-red-500">*</span>
          </div>
          <DataTableInput
            id="organization"
            value={basicInfo.organization}
            onChange={(e) => setBasicInfo({ ...basicInfo, organization: e.target.value })}
            placeholder="관리대상조직을 입력하세요"
          />
        </div>

        {/* 직책 */}
        <div className="space-y-2">
          <div className="text-base font-medium">
            직책
          </div>
          <DataTableInput
            id="position"
            value={basicInfo.position}
            readOnly
          />
        </div>

        {/* 이메일 */}
        <div className="space-y-2">
          <div className="text-base font-medium">
            이메일
          </div>
          <DataTableInput
            id="email"
            value={basicInfo.email}
            readOnly
          />
        </div>

        {/* 책무배분일 */}
        <div className="space-y-2">
          <div className="text-base font-medium">
            책무배분일 <span className="text-red-500">*</span>
          </div>
          <DataTableDateInput
            id="assignmentDate"
            value={basicInfo.assignmentDate}
            onChange={(e) => setBasicInfo({ ...basicInfo, assignmentDate: e.target.value })}
          />
        </div>

        {/* 책무시작일 */}
        <div className="space-y-2">
          <div className="text-base font-medium">
            책무시작일 <span className="text-red-500">*</span>
          </div>
          <DataTableDateInput
            id="startDate"
            value={basicInfo.startDate}
            onChange={(e) => setBasicInfo({ ...basicInfo, startDate: e.target.value })}
          />
        </div>

        {/* 등록자 */}
        <div className="space-y-2">
          <div className="text-base font-medium">
            등록자 <span className="text-red-500">*</span>
          </div>
          <DataTableInput
            id="registrant"
            value={basicInfo.registrant}
            onChange={(e) => setBasicInfo({ ...basicInfo, registrant: e.target.value })}
            placeholder="등록자를 입력하세요"
          />
        </div>

        {/* 승인자 */}
        <div className="space-y-2">
          <div className="text-base font-medium">
            승인자 <span className="text-red-500">*</span>
          </div>
          <DataTableInput
            id="approver"
            value={basicInfo.approver}
            onChange={(e) => setBasicInfo({ ...basicInfo, approver: e.target.value })}
            placeholder="승인자를 입력하세요"
          />
        </div>
      </div>
    </div>
  )
} 