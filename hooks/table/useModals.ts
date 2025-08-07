import { useState, useCallback } from "react"

export interface ModalState {
  isAddModalOpen: boolean
  isEditModalOpen: boolean
  isDeleteModalOpen: boolean
  editingItem: any | null
}

export interface ModalActions {
  openAddModal: () => void
  closeAddModal: () => void
  openEditModal: (item: any) => void
  closeEditModal: () => void
  openDeleteModal: () => void
  closeDeleteModal: () => void
  setEditingItem: (item: any | null) => void
}

export function useModals<T = any>(): [ModalState, ModalActions] {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)

  // 모달 열기/닫기 핸들러들 - useCallback으로 최적화
  const openAddModal = useCallback(() => {
    setIsAddModalOpen(true)
  }, [])

  const closeAddModal = useCallback(() => {
    setIsAddModalOpen(false)
  }, [])

  const openEditModal = useCallback((item: T) => {
    setEditingItem(item)
    setIsEditModalOpen(true)
  }, [])

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false)
    setEditingItem(null)
  }, [])

  const openDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(true)
  }, [])

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false)
  }, [])

  const state: ModalState = {
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    editingItem,
  }

  const actions: ModalActions = {
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
    setEditingItem,
  }

  return [state, actions]
} 