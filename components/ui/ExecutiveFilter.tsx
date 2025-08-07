"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { DataTableSelect } from "@/components/ui/DataTableSelect"
import { ManagementCheckData } from "@/data/magagement/managementCheckData"

interface ExecutiveFilterProps {
  data: ManagementCheckData[]
  onFilterChange: (filters: { group: string; executive: string }) => void
}

export function ExecutiveFilter({ data, onFilterChange }: ExecutiveFilterProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [selectedExecutive, setSelectedExecutive] = useState<string>("all")

  // 사용 가능한 그룹 목록
  const availableGroups = useMemo(() => {
    const groups = new Set(data.map(item => item.group))
    return Array.from(groups).sort()
  }, [data])

  // 선택된 그룹에 따른 사용 가능한 담당임원 목록
  const availableExecutives = useMemo(() => {
    let executives = new Set<string>()
    
    if (selectedGroup && selectedGroup !== "all") {
      // 선택된 그룹의 담당임원만 필터링
      data.forEach(item => {
        if (item.group === selectedGroup) {
          executives.add(item.responsibleExecutive)
        }
      })
    } else {
      // 모든 담당임원
      data.forEach(item => {
        executives.add(item.responsibleExecutive)
      })
    }
    
    return Array.from(executives).sort()
  }, [data, selectedGroup])

  // 그룹 변경 핸들러
  const handleGroupChange = (value: string) => {
    setSelectedGroup(value)
    setSelectedExecutive("all") // 그룹이 변경되면 담당임원 초기화
    onFilterChange({ 
      group: value === "all" ? "" : value, 
      executive: "" 
    })
  }

  // 담당임원 변경 핸들러
  const handleExecutiveChange = (value: string) => {
    setSelectedExecutive(value)
    onFilterChange({ 
      group: selectedGroup === "all" ? "" : selectedGroup, 
      executive: value === "all" ? "" : value 
    })
  }

  // 필터 초기화
  const resetFilters = () => {
    setSelectedGroup("all")
    setSelectedExecutive("all")
    onFilterChange({ group: "", executive: "" })
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">그룹:</span>
        <DataTableSelect
          placeholder="전체 그룹"
          value={selectedGroup}
          onChange={handleGroupChange}
          options={[
            { value: "all", label: "전체 그룹" },
            ...availableGroups.map(group => ({
              value: group,
              label: group
            }))
          ]}
          className="w-48"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">담당임원:</span>
        <DataTableSelect
          placeholder="전체 담당임원"
          value={selectedExecutive}
          onChange={handleExecutiveChange}
          options={[
            { value: "all", label: "전체 담당임원" },
            ...availableExecutives.map(executive => ({
              value: executive,
              label: executive
            }))
          ]}
          className="w-48"
        />
      </div>

      <Button 
        variant="outline" 
        onClick={resetFilters}
        className="ml-auto border-brand-500/50 hover:border-brand-500/80 hover:bg-brand-500/10"
      >
        초기화
      </Button>
    </div>
  )
} 