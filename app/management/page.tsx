"use client"

import { useCallback, useState } from "react"
import { DataTable, ColumnConfig } from "@/components/table/DataTable"
import { ManagementCheckData } from "@/data/magagement/managementCheckData"
import { mockManagementCheckData } from "@/data/magagement/managementCheckData"
import { useTable } from "@/hooks/table/useTable"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

import { ProgressBar } from "@/components/ui/ProgressBar"
import { ProgressBadge } from "@/components/ui/ProgressBadge"

import { EvidenceModal } from "@/components/ui/EvidenceModal"

export default function ManagementPage() {
  // useTable 훅 사용
  const [state, actions] = useTable<ManagementCheckData>({
    initialData: mockManagementCheckData,
    itemsPerPage: 20,
    searchFields: ['group', 'responsibleExecutive', 'department', 'managementAction', 'managementActionDetail', 'remarks'],
    filterColumns: ['group', 'responsibleExecutive', 'department', 'managementAction', 'startDate', 'expectedCompletionDate', 'actualCompletionDate', 'progress', 'status', 'remarks'],
  })

  // 증빙 모달 상태 관리
  const [evidenceModal, setEvidenceModal] = useState<{
    isOpen: boolean
    evidence: string
    managementAction: string
    managementActionDetail: string
  }>({
    isOpen: false,
    evidence: "",
    managementAction: "",
    managementActionDetail: ""
  })

  // 증빙 모달 열기
  const openEvidenceModal = useCallback((item: ManagementCheckData) => {
    setEvidenceModal({
      isOpen: true,
      evidence: item.evidence,
      managementAction: item.managementAction,
      managementActionDetail: item.managementActionDetail
    })
  }, [])

  // 증빙 모달 닫기
  const closeEvidenceModal = useCallback(() => {
    setEvidenceModal(prev => ({ ...prev, isOpen: false }))
  }, [])



  // 다운로드 기능
  const handleDownload = useCallback(() => {
    const csv = [
      ["그룹", "담당임원", "부서명", "관리조치명", "시작일", "완료예정일", "실제완료일", "진행률", "진행상태", "비고"],
      ...state.filteredData.map((item) => {
        // ProgressBadge 컴포넌트의 로직을 직접 사용
        const getProgressStatus = (progress: number, actualCompletionDate?: string) => {
          if (actualCompletionDate) return "완료"
          if (progress >= 80) return "진행중"
          if (progress >= 40) return "진행중"
          return "대기"
        }
        const status = getProgressStatus(item.progress, item.actualCompletionDate)
        return [
          item.group,
          item.responsibleExecutive,
          item.department,
          item.managementAction,
          item.startDate,
          item.expectedCompletionDate,
          item.actualCompletionDate || "-",
          `${item.progress}%`,
          status,
          item.remarks,
        ]
      }),
    ]
      .map((r) => r.map((f) => `"${f}"`).join(","))
      .join("\n")

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "management_check.csv"
    link.click()
  }, [state.filteredData])

  // 컬럼 설정
  const columns: ColumnConfig<ManagementCheckData>[] = [
    {
      key: "group",
      title: "그룹",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.group}
        </div>
      )
    },
    {
      key: "responsibleExecutive",
      title: "담당임원",
      width: "min-w-[100px] w-[100px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.responsibleExecutive}
        </div>
      )
    },
    {
      key: "department",
      title: "부서명",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.department}
        </div>
      )
    },
    {
      key: "managementAction",
      title: "관리조치명",
      width: "min-w-[200px] max-w-[200px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black truncate max-w-[200px]">
          {item.managementAction}
        </div>
      )
    },
    {
      key: "startDate",
      title: "시작일",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.startDate}
        </div>
      )
    },
    {
      key: "expectedCompletionDate",
      title: "완료예정일",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.expectedCompletionDate}
        </div>
      )
    },
    {
      key: "actualCompletionDate",
      title: "실제완료일",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.actualCompletionDate || "-"}
        </div>
      )
    },
    {
      key: "progress",
      title: "진행률",
      width: "min-w-[100px] w-[100px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm">
          <ProgressBar progress={item.progress} />
        </div>
      )
    },
    {
      key: "status",
      title: "진행상태",
      width: "min-w-[100px] w-[100px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm">
          <ProgressBadge 
            progress={item.progress} 
            actualCompletionDate={item.actualCompletionDate}
          />
        </div>
      )
    },
    {
      key: "remarks",
      title: "비고",
      width: "min-w-[200px] max-w-[200px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black truncate max-w-[200px]" title={item.remarks}>
          {item.remarks}
        </div>
      )
    },
    {
      key: "evidence",
      title: "증빙",
      width: "min-w-[80px] w-[80px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm">
          <button
            onClick={() => openEvidenceModal(item)}
            className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
          >
            보기
          </button>
        </div>
      )
    }
  ]

  return (
    <>
      <div className="max-w-7xl mx-auto pt-4">
        <Breadcrumb 
          items={[
            { label: "관리조치 현황" }
          ]}
          className="mb-8"
        />
        <div className="mb-8 flex justify-between items-center border-b border-b-brandGrey-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">관리조치 현황</h1>
        </div>
        
        <DataTable
          title="베이스 현황"
          description="부서별 베이스 진행 상황을 확인할 수 있습니다."
          state={state}
          actions={actions}
          columns={columns}
          itemsPerPage={15}
          onDownload={handleDownload}
        />

        <EvidenceModal
          isOpen={evidenceModal.isOpen}
          onClose={closeEvidenceModal}
          evidence={evidenceModal.evidence}
          managementAction={evidenceModal.managementAction}
          managementActionDetail={evidenceModal.managementActionDetail}
        />
      </div>
    </>
  )
} 