// 책임 데이터 타입 정의
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
  [key: string]: string | number | boolean // 인덱스 시그니처 추가
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

// 임원 마스터 데이터 타입
export interface ExecutiveMasterData {
  id: number
  // 조직정보
  departmentCode: string // 부서코드
  departmentName: string // 부서명
  departmentPath: string // 부서경로
  // 그룹정보
  groupCode: string // 그룹코드
  groupName: string // 그룹명
  positionName: string // 직책명
  responsibleCommittee: string // 주관회의체
  chairmanMember: string // 위원장/위원
  meetingFrequency: string // 개최주기
  keyDeliberationMatter: string // 주요 심의 의결사항
  // 임원정보
  rank: string // 직위
  name: string // 성명
  employeeId: string // 행번
  email: string // 이메일
  executiveRegistrationDate: string // 임원 등록일
  executiveDismissalDate?: string // 임원 해제일
}

// 책임 폼 데이터 타입 정의
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

// 컬럼 필터 타입 정의
export interface ColumnFilter {
  [column: string]: string[]
} 