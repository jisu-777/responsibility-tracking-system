"use client"

import { useCallback, useState } from "react"

import { DataTable, ColumnConfig } from "@/components/table/DataTable"
import AddExecutiveResponsibilityModal from "@/components/table/AddExecutiveResponsibilityModal"
import EditExecutiveResponsibilityModal from "@/components/table/EditExecutiveResponsibilityModal"
import DeleteConfirmModal from "@/components/table/DeleteConfirmModal"

import {
  ExecutiveResponsibilityData,
  ExecutiveResponsibilityFormData,
} from "@/types"
import { mockExecutiveResponsibilityData } from "@/data/mockData"
import { useTable } from "@/hooks/table/useTable"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { ExecutiveStatusBadge } from "@/components/ui/ExecutiveStatusBadge"

export default function ExecutiveResponsibilityPage() {
  // useTable 훅 사용
  const [state, actions] = useTable<ExecutiveResponsibilityData>({
    initialData: mockExecutiveResponsibilityData,
    itemsPerPage: 15,
    searchFields: ['name', 'position', 'organization', 'category', 'code', 'responsibility', 'detailCode', 'detailContent', 'registrant', 'approver'],
    filterColumns: ['name', 'position', 'organization', 'category', 'code', 'responsibility', 'detailCode', 'detailContent', 'assignmentDate', 'startDate', 'registrant', 'approver', 'status'],
  })

  // 툴팁 상태 관리
  const [tooltipState, setTooltipState] = useState({
    isVisible: false,
    content: "",
    position: { x: 0, y: 0 }
  })

  // 툴팁 표시 핸들러
  const handleTooltipShow = useCallback((content: string, event: React.MouseEvent) => {
    setTooltipState({
      isVisible: true,
      content,
      position: { x: event.clientX, y: event.clientY }
    })
  }, [])

  // 툴팁 숨김 핸들러
  const handleTooltipHide = useCallback(() => {
    setTooltipState(prev => ({ ...prev, isVisible: false }))
  }, [])

  // 다운로드 기능
  const handleDownload = useCallback(() => {
    const csv = [
      ["성명", "직책", "관리대상조직", "책무구분", "책무코드", "책무", "책무세부코드", "책무세부내용", "책무배분일", "책무시작일", "등록자", "승인자", "관리조치 현황"],
      ...state.filteredData.map((item) => [
        item.name,
        item.position,
        item.organization,
        item.category,
        item.code,
        item.responsibility,
        item.detailCode,
        item.detailContent,
        item.assignmentDate,
        item.startDate,
        item.registrant,
        item.approver,
        item.status,
      ]),
    ]
      .map((r) => r.map((f) => `"${f}"`).join(","))
      .join("\n")

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "executive_responsibility.csv"
    link.click()
  }, [state.filteredData])

  // 책무 추가 핸들러
  const handleAddResponsibility = useCallback((formData: ExecutiveResponsibilityFormData) => {
    const newId = Math.max(...state.data.data.map((d) => d.id), 0) + 1
    const newResponsibility: ExecutiveResponsibilityData = {
      id: newId,
      name: formData.name,
      position: formData.position,
      organization: formData.organization,
      category: formData.category,
      code: formData.code,
      responsibility: formData.responsibility,
      detailCode: formData.detailCode,
      detailContent: formData.detailContent,
      assignmentDate: formData.assignmentDate,
      startDate: formData.startDate,
      registrant: formData.registrant,
      approver: formData.approver,
      status: formData.status,
      email: formData.email || "",
      executiveRegistrationDate: formData.executiveRegistrationDate || "",
      executiveDismissalDate: formData.executiveDismissalDate,
    }
    actions.handleAdd(newResponsibility)
  }, [state.data.data, actions])

  // 책무 수정 핸들러
  const handleEditSubmit = useCallback((id: number, formData: ExecutiveResponsibilityFormData) => {
    actions.handleUpdate(id, {
      name: formData.name,
      position: formData.position,
      organization: formData.organization,
      category: formData.category,
      code: formData.code,
      responsibility: formData.responsibility,
      detailCode: formData.detailCode,
      detailContent: formData.detailContent,
      assignmentDate: formData.assignmentDate,
      startDate: formData.startDate,
      registrant: formData.registrant,
      approver: formData.approver,
      status: formData.status,
      email: formData.email || "",
      executiveRegistrationDate: formData.executiveRegistrationDate || "",
      executiveDismissalDate: formData.executiveDismissalDate,
    })
  }, [actions])

  // 컬럼 설정
  const columns: ColumnConfig<ExecutiveResponsibilityData>[] = [
    
         {
       key: "name",
       title: "성명",
       width: "min-w-[100px] w-[100px]",
       filterable: true,
       renderCell: (item) => (
         <div className="text-sm text-black truncate max-w-[100px]" title={item.name}>
           {item.name}
         </div>
       )
     },
    {
      key: "position",
      title: "직책",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black truncate max-w-[120px] ">
          {item.position}
        </div>
      ),
    },
    {
      key: "organization",
      title: "관리대상조직",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.organization}
        </div>
      ),
    },
    {
      key: "code",
      title: "책무코드",
      width: "min-w-[180px] w-[180px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.code}
        </div>
      ),
    },
    {
      key: "responsibility",
      title: "책무",
      width: "min-w-[200px] max-w-[200px]",
      filterable: true,
      renderCell: (item) => (
        <div 
          className="text-sm text-black truncate max-w-[200px]"
         
          
        >
          {item.responsibility}
        </div>
      ),
    },
    {
      key: "detailCode",
      title: "책무세부코드",
      width: "min-w-[180px] w-[180px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.detailCode}
        </div>
      ),
    },
    {
      key: "detailContent",
      title: "책무세부내용",
      width: "min-w-[400px] max-w-[600px]",
      filterable: true,
      renderCell: (item) => (
        <div 
          className="text-sm text-black truncate"
          onMouseEnter={(e) => handleTooltipShow(item.detailContent, e)}
          onMouseLeave={handleTooltipHide}
        >
          {item.detailContent}
        </div>
      ),
    },
    {
      key: "assignmentDate",
      title: "책무배분일",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.assignmentDate}
        </div>
      ),
    },
    {
      key: "startDate",
      title: "책무시작일",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.startDate}
        </div>
      ),
    },
    {
      key: "registrant",
      title: "등록자",
      width: "min-w-[100px] w-[100px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.registrant}
        </div>
      ),
    },
    {
      key: "approver",
      title: "승인자",
      width: "min-w-[100px] w-[100px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.approver}
        </div>
      ),
    },
    {
      key: "status",
      title: "관리조치 현황",
      width: "min-w-[120px] w-[120px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm">
          <ExecutiveStatusBadge status={item.status} />
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="max-w-7xl mx-auto pt-4">
        <Breadcrumb 
          items={[
            { label: "임원" }
          ]}
          className="mb-8"
        />
        <div className="mb-8 flex justify-between items-center border-b border-b-brandGrey-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 ">임원 책무 관리</h1>
          

        </div>
        
        <DataTable
          title="임원 관리조치"
          description="임원의 책무 관리조치 현황을 관리합니다."
          state={state}
          actions={actions}
          columns={columns}
          itemsPerPage={15}
          onAdd={actions.modals.openAddModal}
          onDownload={handleDownload}
          onEdit={actions.handleEdit}
          onDelete={actions.handleConfirmDelete}
          onUpdate={actions.handleUpdate}
        />

        <AddExecutiveResponsibilityModal
          isOpen={state.modals.isAddModalOpen}
          onClose={actions.modals.closeAddModal}
          onAdd={handleAddResponsibility}
        />

        <EditExecutiveResponsibilityModal
          isOpen={state.modals.isEditModalOpen}
          onClose={actions.modals.closeEditModal}
          onEdit={handleEditSubmit}
          editingItem={state.modals.editingItem}
        />

        <DeleteConfirmModal
          isOpen={state.modals.isDeleteModalOpen}
          onClose={actions.modals.closeDeleteModal}
          onConfirm={actions.handleConfirmDelete}
          selectedCount={state.data.selectedItems.length}
        />

        {/* 툴팁 - 페이지 레벨에서 렌더링 */}
        {tooltipState.isVisible && (
          <div 
            className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-normal max-w-xs break-words pointer-events-none"
            style={{
              left: tooltipState.position.x + 10,
              top: tooltipState.position.y - 60
            }}
          >
            {tooltipState.content}
            {/* 말풍선 꼬리 */}
            <div 
              className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"
            ></div>
          </div>
        )}
      </div>
    </>
  )
} 