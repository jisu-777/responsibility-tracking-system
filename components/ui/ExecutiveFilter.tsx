"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">그룹:</span>
          <Select value={selectedGroup} onValueChange={handleGroupChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="전체 그룹" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 그룹</SelectItem>
              {availableGroups.map(group => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">담당임원:</span>
          <Select value={selectedExecutive} onValueChange={handleExecutiveChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="전체 담당임원" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 담당임원</SelectItem>
              {availableExecutives.map(executive => (
                <SelectItem key={executive} value={executive}>
                  {executive}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="ml-auto"
        >
          초기화
        </Button>
      </div>
    </div>
  )
} 