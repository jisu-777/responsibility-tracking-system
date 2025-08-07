"use client"

import { useCallback } from "react"
import { Badge } from "@/components/ui/badge"

import { DataTable, ColumnConfig } from "@/components/table/DataTable"
import AddResponsibilityModal from "@/components/table/AddResponsibilityModal"
import EditResponsibilityModal from "@/components/table/EditResponsibilityModal"
import DeleteConfirmModal from "@/components/table/DeleteConfirmModal"

import {
  ResponsibilityData,
  ResponsibilityFormData,
} from "@/types"
import { mockResponsibilityData } from "@/data/mockData"
import { useTable } from "@/hooks/table/useTable"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export default function ResponsibilityManagementPage() {
  // useTable 훅 사용
  const [state, actions] = useTable<ResponsibilityData>({
    initialData: mockResponsibilityData,
    itemsPerPage: 10,
    searchFields: ['category', 'code', 'responsibility', 'detailCode', 'detailContent'],
    filterColumns: ['category', 'code', 'responsibility', 'detailCode', 'detailContent'],
  })

  // 다운로드 기능
  const handleDownload = useCallback(() => {
    const csv = [
      ["책무구분", "책무코드", "책무", "책무세부코드", "책무세부내용"],
      ...state.filteredData.map((item) => [
        item.category,
        item.code,
        item.responsibility,
        item.detailCode,
        item.detailContent,
      ]),
    ]
      .map((r) => r.map((f) => `"${f}"`).join(","))
      .join("\n")

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "responsibility_master.csv"
    link.click()
  }, [state.filteredData])

  // 책무 추가 핸들러
  const handleAddResponsibility = useCallback((formData: ResponsibilityFormData) => {
    const newId = Math.max(...state.data.data.map((d) => d.id), 0) + 1
    const newResponsibility: ResponsibilityData = {
      id: newId,
      title: formData.responsibility,
      description: formData.detailContent,
      assignee: "",
      status: "활성",
      priority: "보통",
      dueDate: "",
      category: formData.category,
      code: formData.code,
      responsibility: formData.responsibility,
      detailCode: formData.detailCode,
      detailContent: formData.detailContent,
    }
    actions.handleAdd(newResponsibility)
  }, [state.data.data, actions])

  // 책무 수정 핸들러
  const handleEditSubmit = useCallback((id: number, formData: ResponsibilityFormData) => {
    actions.handleUpdate(id, {
      category: formData.category,
      code: formData.code,
      responsibility: formData.responsibility,
      detailCode: formData.detailCode,
      detailContent: formData.detailContent,
    })
  }, [actions])

  // 컬럼 설정
  const columns: ColumnConfig<ResponsibilityData>[] = [
    {
      key: "category",
      title: "책무구분",
      width: "w-40",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black">
          {item.category}
        </div>
      ),
    },
    {
      key: "code",
      title: "책무코드",
      width: "w-32",
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
      width: "min-w-[500px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black whitespace-normal break-words" title={item.responsibility}>
          {item.responsibility}
        </div>
      ),
    },
    {
      key: "detailCode",
      title: "책무세부코드",
      width: "min-w-32",
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
      width: "min-w-[400px]",
      filterable: true,
      renderCell: (item) => (
        <div className="text-sm text-black whitespace-normal break-words" title={item.detailContent}>
          {item.detailContent}
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="max-w-7xl mx-auto pt-4">
        <Breadcrumb 
          items={[
            { label: "책무 관리" }
          ]}
          className="mb-8"
        />
        <div className="mb-8 flex justify-between items-center border-b border-b-brandGrey-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">책무 관리</h1>
        </div>
        
        <DataTable
          title="마스터 관리"
          description="책무 구조 및 세부 내용을 관리합니다."
          state={state}
          actions={actions}
          columns={columns}
          itemsPerPage={10}
          onAdd={actions.modals.openAddModal}
          onDownload={handleDownload}
          onEdit={actions.handleEdit}
          onDelete={actions.handleConfirmDelete}
          onUpdate={actions.handleUpdate}
        />

        <AddResponsibilityModal
          isOpen={state.modals.isAddModalOpen}
          onClose={actions.modals.closeAddModal}
          onAdd={handleAddResponsibility}
        />

        <EditResponsibilityModal
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
      </div>
    </>
  )
}
