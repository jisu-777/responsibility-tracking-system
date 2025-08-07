"use client"

import { useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { DataTable, ColumnConfig } from "@/components/table/DataTable"
import { ExecutiveMasterData } from "@/types"
import { useTable } from "@/hooks/table/useTable"

interface ExecutiveMasterTableProps {
  data: ExecutiveMasterData[]
  title?: string
  description?: string
}

export function ExecutiveMasterTable({ data, title, description }: ExecutiveMasterTableProps) {
  // useTable 훅 사용
  const [state, actions] = useTable<ExecutiveMasterData>({
    initialData: data,
    itemsPerPage: 10,
    searchFields: [
      'departmentCode', 'departmentName', 'departmentPath',
      'groupCode', 'groupName', 'positionName', 'responsibleCommittee', 'chairmanMember', 'meetingFrequency', 'keyDeliberationMatter',
      'rank', 'name', 'employeeId', 'email', 'executiveRegistrationDate', 'executiveDismissalDate'
    ],
    filterColumns: [
      'departmentCode', 'departmentName', 'departmentPath',
      'groupCode', 'groupName', 'positionName', 'responsibleCommittee', 'chairmanMember', 'meetingFrequency', 'keyDeliberationMatter',
      'rank', 'name', 'employeeId', 'email', 'executiveRegistrationDate', 'executiveDismissalDate'
    ],
  })

  // 다운로드 기능
  const handleDownload = useCallback(() => {
    const csv = [
      ["부서코드", "부서명", "부서경로", "그룹코드", "그룹명", "직책명", "주관회의체", "위원장/위원", "개최주기", "주요 심의 의결사항", "직위", "성명", "행번", "이메일", "임원 등록일", "임원 해제일"],
      ...state.filteredData.map((item) => [
        item.departmentCode,
        item.departmentName,
        item.departmentPath,
        item.groupCode,
        item.groupName,
        item.positionName,
        item.responsibleCommittee,
        item.chairmanMember,
        item.meetingFrequency,
        item.keyDeliberationMatter,
        item.rank,
        item.name,
        item.employeeId,
        item.email,
        item.executiveRegistrationDate,
        item.executiveDismissalDate || "-",
      ]),
    ]
      .map((r) => r.map((f) => `"${f}"`).join(","))
      .join("\n")

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "executive_master.csv"
    link.click()
  }, [state.filteredData])

  // 컬럼 설정
  const columns: ColumnConfig<ExecutiveMasterData>[] = [
    // 조직정보
    {
      key: "departmentCode",
      title: "부서코드",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.departmentCode}
        </div>
      ),
    },
    {
      key: "departmentName",
      title: "부서명",
      width: "min-w-[150px] w-[150px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.departmentName}
        </div>
      ),
    },
    {
      key: "departmentPath",
      title: "부서경로",
      width: "min-w-[200px] w-[200px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black" title={item.departmentPath}>
          {item.departmentPath}
        </div>
      ),
    },
    // 그룹정보
    {
      key: "groupCode",
      title: "그룹코드",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.groupCode}
        </div>
      ),
    },
    {
      key: "groupName",
      title: "그룹명",
      width: "min-w-[150px] w-[150px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.groupName}
        </div>
      ),
    },
    {
      key: "positionName",
      title: "직책명",
      width: "min-w-[150px] w-[150px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.positionName}
        </div>
      ),
    },
    {
      key: "responsibleCommittee",
      title: "주관회의체",
      width: "min-w-[150px] w-[150px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.responsibleCommittee}
        </div>
      ),
    },
    {
      key: "chairmanMember",
      title: "위원장/위원",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.chairmanMember}
        </div>
      ),
    },
    {
      key: "meetingFrequency",
      title: "개최주기",
      width: "min-w-[100px] w-[100px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.meetingFrequency}
        </div>
      ),
    },
    {
      key: "keyDeliberationMatter",
      title: "주요 심의 의결사항",
      width: "min-w-[300px] max-w-[400px]",
      filterable: true,
      renderCell: (item) => (
        <div className="whitespace-normal break-words text-sm text-black" title={item.keyDeliberationMatter}>
          {item.keyDeliberationMatter}
        </div>
      ),
    },
    // 임원정보
    {
      key: "rank",
      title: "직위",
      width: "min-w-[100px] w-[100px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.rank}
        </div>
      ),
    },
    {
      key: "name",
      title: "성명",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="font-medium text-sm text-black">
          {item.name}
        </div>
      ),
    },
    {
      key: "employeeId",
      title: "행번",
      width: "min-w-[80px] w-[80px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.employeeId}
        </div>
      ),
    },
    {
      key: "email",
      title: "이메일",
      width: "min-w-[200px] w-[200px]",
      filterable: true,
      renderCell: (item) => (
        <a 
          href={`mailto:${item.email}`}
          className="text-blue-600 hover:text-blue-800 underline text-sm"
          title={`${item.email}로 이메일 보내기`}
        >
          {item.email}
        </a>
      ),
    },
    {
      key: "executiveRegistrationDate",
      title: "임원 등록일",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.executiveRegistrationDate}
        </div>
      ),
    },
    {
      key: "executiveDismissalDate",
      title: "임원 해제일",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.executiveDismissalDate || "-"}
        </div>
      ),
    },
  ]

  return (
    <DataTable
      title={title || "임원 마스터"}
      description={description || "임원 정보를 관리합니다."}
      state={state}
      actions={actions}
      columns={columns}
      itemsPerPage={10}
      onDownload={handleDownload}
      onEdit={actions.handleEdit}
      onDelete={actions.handleConfirmDelete}
      onUpdate={actions.handleUpdate}
    />
  )
} 