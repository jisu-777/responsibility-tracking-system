// 임원별 책무기술서 목업 데이터

// 임원 및 직책 정보 데이터 타입
export interface ExecutivePositionData {
  id: number
  executiveId: string
  position: string // 직
  title: string // 책
  name: string // 성명
  assignmentDate: string // 현 직책 부여일
  concurrentPosition: string // 겸직여부
  concurrentDetails: string // 겸직사항
  department: string // 소관부서
}

// 주관회의체 데이터 타입
export interface CommitteeData {
  id: number
  executiveId: string
  committeeName: string // 회의체명
  role: string // 위원장/위원
  frequency: string // 개최주기
  deliberationMatters: string // 주요 심의·의결사항
}

// 책무 데이터 타입
export interface ResponsibilityData {
  id: number
  executiveId: string
  overview: string // 책무 개요
  assignmentDate: string // 책무 배분일자
  responsibility: string // 책무
  detailedContent: string // 책무 세부내용
  relatedLaws: string // 관련 법령 및 내규
}

// 관리의무 데이터 타입
export interface ManagementDutyData {
  id: number
  executiveId: string
  dutyNumber: string // 번호
  dutyContent: string // 관리의무 내용
}

// 목업 데이터 - 한 사람만
export const mockExecutivePositionData: ExecutivePositionData[] = [
  {
    id: 1,
    executiveId: "exec_001",
    position: "대표이사",
    title: "은행장",
    name: "김철수",
    assignmentDate: "2023.01.01",
    concurrentPosition: "N",
    concurrentDetails: "-",
    department: "대표이사실"
  }
]

export const mockCommitteeData: CommitteeData[] = [
  {
    id: 1,
    executiveId: "exec_001",
    committeeName: "이사회",
    role: "위원장",
    frequency: "월 1회",
    deliberationMatters: "경영전략, 예산안, 조직개편 등 주요 경영사항"
  },
  {
    id: 2,
    executiveId: "exec_001",
    committeeName: "경영진회의",
    role: "위원장",
    frequency: "주 1회",
    deliberationMatters: "일상 경영사항, 부서간 협의사항"
  },
  {
    id: 3,
    executiveId: "exec_001",
    committeeName: "리스크관리위원회",
    role: "위원장",
    frequency: "월 1회",
    deliberationMatters: "리스크 관리 정책, 위험도 측정 및 관리"
  }
]

export const mockResponsibilityData: ResponsibilityData[] = [
  {
    id: 1,
    executiveId: "exec_001",
    overview: "전체 경영활동을 총괄하고 이사회를 대표하여 회사의 경영목표 달성을 위한 전략적 의사결정을 수행하며, 이해관계자와의 원활한 소통을 통해 지속가능한 성장을 추진",
    assignmentDate: "2023.01.01",
    responsibility: "경영총괄",
    detailedContent: "회사 전체 경영활동을 총괄하고, 이사회를 대표하여 회사의 경영목표 달성을 위한 전략적 의사결정을 수행하며, 이해관계자와의 원활한 소통을 통해 지속가능한 성장을 추진",
    relatedLaws: "상법 제393조, 은행법 제23조"
  },
  {
    id: 2,
    executiveId: "exec_001",
    overview: "전체 경영활동을 총괄하고 이사회를 대표하여 회사의 경영목표 달성을 위한 전략적 의사결정을 수행하며, 이해관계자와의 원활한 소통을 통해 지속가능한 성장을 추진",
    assignmentDate: "2023.01.01",
    responsibility: "리스크관리",
    detailedContent: "회사의 전반적인 리스크 관리 체계를 구축하고 운영하며, 각종 위험요인을 사전에 식별하고 대응방안을 수립하여 회사의 건전성을 확보",
    relatedLaws: "은행법 제23조의2, 리스크관리규정"
  },
  {
    id: 3,
    executiveId: "exec_001",
    overview: "전체 경영활동을 총괄하고 이사회를 대표하여 회사의 경영목표 달성을 위한 전략적 의사결정을 수행하며, 이해관계자와의 원활한 소통을 통해 지속가능한 성장을 추진",
    assignmentDate: "2023.01.01",
    responsibility: "내부통제",
    detailedContent: "내부통제 체계를 구축하고 운영하며, 법규준수 여부를 점검하여 위험을 사전에 방지하고 회사의 건전한 경영을 지원",
    relatedLaws: "은행법 제23조의3, 내부통제규정"
  }
]

export const mockManagementDutyData: ManagementDutyData[] = [
  {
    id: 1,
    executiveId: "exec_001",
    dutyNumber: "①",
    dutyContent: "경영진의 건전한 경영을 위한 의사결정 지원 및 감독"
  },
  {
    id: 2,
    executiveId: "exec_001",
    dutyNumber: "②",
    dutyContent: "리스크 관리 체계의 구축 및 운영"
  },
  {
    id: 3,
    executiveId: "exec_001",
    dutyNumber: "③",
    dutyContent: "내부통제 체계의 구축 및 운영"
  },
  {
    id: 4,
    executiveId: "exec_001",
    dutyNumber: "④",
    dutyContent: "법규준수 체계의 구축 및 운영"
  },
  {
    id: 5,
    executiveId: "exec_001",
    dutyNumber: "⑤",
    dutyContent: "고객보호 체계의 구축 및 운영"
  }
] 