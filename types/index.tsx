// types/index.ts
export interface ResponsibilityData {
  id: number
  title: string
  description: string
  assignee: string
  status: string
  priority: string
  dueDate: string
  category: string
  code: string
  responsibility: string
  detailCode: string
  detailContent: string
}

// 임원 관리조치 데이터 타입
export interface ExecutiveResponsibilityData {
  id: number
  name: string // 성명
  position: string // 직책
  email: string // 이메일
  executiveRegistrationDate: string // 임원등록일
  executiveDismissalDate?: string // 임원해제일 (선택사항)
  organization: string // 관리대상조직
  category: string // 책무구분
  code: string // 책무코드
  responsibility: string // 책무
  detailCode: string // 책무세부코드
  detailContent: string // 책무세부내용
  assignmentDate: string // 책무배분일
  startDate: string // 책무시작일
  registrant: string // 등록자
  approver: string // 승인자
  status: '완료' | '기한경과' | '미시작' | '진행중' // 관리조치 현황
}

export interface ColumnFilter {
  [key: string]: string[]
}

export interface ResponsibilityFormData {
  category: string
  code: string
  responsibility: string
  detailCode: string
  detailContent: string
}

// 임원 관리조치 폼 데이터 타입
export interface ExecutiveResponsibilityFormData {
  name: string
  position: string
  email: string
  executiveRegistrationDate: string
  executiveDismissalDate?: string
  organization: string
  category: string
  code: string
  responsibility: string
  detailCode: string
  detailContent: string
  assignmentDate: string
  startDate: string
  registrant: string
  approver: string
  status: '완료' | '기한경과' | '미시작' | '진행중'
}
