// 임원 평가 데이터 타입
export interface ExecutiveEvaluationData {
  id: number
  executiveId: string
  name: string
  position: string
  title: string
  email: string
  executiveRegistrationDate: string
  executiveDismissalDate?: string
  profileImageUrl: string // 임원 프로필 이미지 URL
  level: number // 계층 레벨 (1: 대표이사, 2: 2계열, 3-6: 나머지 계열)
  parentId?: string // 상위 임원 ID
}

// 임원 평가 데이터 - 6단계 계층 구조
export const mockExecutiveEvaluationData: ExecutiveEvaluationData[] = [
  // 1단계: 대표이사 (1명)
  {
    id: 1,
    executiveId: "exec_ceo",
    name: "김대표",
    position: "대표이사",
    title: "대표이사",
    email: "ceo@company.com",
    executiveRegistrationDate: "2020-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 1
  },

  // 2단계: 2계열 (3명씩, 총 6명)
  {
    id: 2,
    executiveId: "exec_finance_director",
    name: "박재무",
    position: "재무본부장",
    title: "본부장",
    email: "finance.director@company.com",
    executiveRegistrationDate: "2021-03-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 2,
    parentId: "exec_ceo"
  },
  {
    id: 3,
    executiveId: "exec_hr_director",
    name: "이인사",
    position: "인사본부장",
    title: "본부장",
    email: "hr.director@company.com",
    executiveRegistrationDate: "2021-03-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 2,
    parentId: "exec_ceo"
  },
  {
    id: 4,
    executiveId: "exec_it_director",
    name: "최IT",
    position: "IT본부장",
    title: "본부장",
    email: "it.director@company.com",
    executiveRegistrationDate: "2021-03-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 2,
    parentId: "exec_ceo"
  },
  {
    id: 5,
    executiveId: "exec_risk_director",
    name: "정리스크",
    position: "리스크본부장",
    title: "본부장",
    email: "risk.director@company.com",
    executiveRegistrationDate: "2021-03-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 2,
    parentId: "exec_ceo"
  },
  {
    id: 6,
    executiveId: "exec_compliance_director",
    name: "한컴플라이언스",
    position: "컴플라이언스본부장",
    title: "본부장",
    email: "compliance.director@company.com",
    executiveRegistrationDate: "2021-03-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 2,
    parentId: "exec_ceo"
  },
  {
    id: 7,
    executiveId: "exec_business_director",
    name: "윤사업",
    position: "사업본부장",
    title: "본부장",
    email: "business.director@company.com",
    executiveRegistrationDate: "2021-03-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 2,
    parentId: "exec_ceo"
  },

  // 3단계: 재무본부 하위 (2명)
  {
    id: 8,
    executiveId: "exec_finance_manager1",
    name: "송재무1",
    position: "재무팀장",
    title: "팀장",
    email: "finance.manager1@company.com",
    executiveRegistrationDate: "2022-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 3,
    parentId: "exec_finance_director"
  },
  {
    id: 9,
    executiveId: "exec_finance_manager2",
    name: "임재무2",
    position: "회계팀장",
    title: "팀장",
    email: "finance.manager2@company.com",
    executiveRegistrationDate: "2022-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 3,
    parentId: "exec_finance_director"
  },

  // 3단계: 인사본부 하위 (2명)
  {
    id: 10,
    executiveId: "exec_hr_manager1",
    name: "강인사1",
    position: "인사팀장",
    title: "팀장",
    email: "hr.manager1@company.com",
    executiveRegistrationDate: "2022-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 3,
    parentId: "exec_hr_director"
  },
  {
    id: 11,
    executiveId: "exec_hr_manager2",
    name: "조인사2",
    position: "교육팀장",
    title: "팀장",
    email: "hr.manager2@company.com",
    executiveRegistrationDate: "2022-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 3,
    parentId: "exec_hr_director"
  },

  // 3단계: IT본부 하위 (2명)
  {
    id: 12,
    executiveId: "exec_it_manager1",
    name: "백IT1",
    position: "개발팀장",
    title: "팀장",
    email: "it.manager1@company.com",
    executiveRegistrationDate: "2022-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 3,
    parentId: "exec_it_director"
  },
  {
    id: 13,
    executiveId: "exec_it_manager2",
    name: "남IT2",
    position: "인프라팀장",
    title: "팀장",
    email: "it.manager2@company.com",
    executiveRegistrationDate: "2022-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 3,
    parentId: "exec_it_director"
  },

  // 3단계: 리스크본부 하위 (2명)
  {
    id: 14,
    executiveId: "exec_risk_manager1",
    name: "서리스크1",
    position: "리스크팀장",
    title: "팀장",
    email: "risk.manager1@company.com",
    executiveRegistrationDate: "2022-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 3,
    parentId: "exec_risk_director"
  },
  {
    id: 15,
    executiveId: "exec_risk_manager2",
    name: "오리스크2",
    position: "감사팀장",
    title: "팀장",
    email: "risk.manager2@company.com",
    executiveRegistrationDate: "2022-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 3,
    parentId: "exec_risk_director"
  },

  // 3단계: 컴플라이언스본부 하위 (2명)
  {
    id: 16,
    executiveId: "exec_compliance_manager1",
    name: "구컴플라이언스1",
    position: "컴플라이언스팀장",
    title: "팀장",
    email: "compliance.manager1@company.com",
    executiveRegistrationDate: "2022-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 3,
    parentId: "exec_compliance_director"
  },
  {
    id: 17,
    executiveId: "exec_compliance_manager2",
    name: "신컴플라이언스2",
    position: "법무팀장",
    title: "팀장",
    email: "compliance.manager2@company.com",
    executiveRegistrationDate: "2022-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 3,
    parentId: "exec_compliance_director"
  },

  // 3단계: 사업본부 하위 (2명)
  {
    id: 18,
    executiveId: "exec_business_manager1",
    name: "양사업1",
    position: "영업팀장",
    title: "팀장",
    email: "business.manager1@company.com",
    executiveRegistrationDate: "2022-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 3,
    parentId: "exec_business_director"
  },
  {
    id: 19,
    executiveId: "exec_business_manager2",
    name: "구사업2",
    position: "마케팅팀장",
    title: "팀장",
    email: "business.manager2@company.com",
    executiveRegistrationDate: "2022-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 3,
    parentId: "exec_business_director"
  },

  // 4단계: 재무팀 하위 (2명)
  {
    id: 20,
    executiveId: "exec_finance_senior1",
    name: "장재무시니어1",
    position: "재무대리",
    title: "대리",
    email: "finance.senior1@company.com",
    executiveRegistrationDate: "2023-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 4,
    parentId: "exec_finance_manager1"
  },
  {
    id: 21,
    executiveId: "exec_finance_senior2",
    name: "전재무시니어2",
    position: "회계대리",
    title: "대리",
    email: "finance.senior2@company.com",
    executiveRegistrationDate: "2023-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 4,
    parentId: "exec_finance_manager2"
  },

  // 4단계: 인사팀 하위 (2명)
  {
    id: 22,
    executiveId: "exec_hr_senior1",
    name: "고인사시니어1",
    position: "인사대리",
    title: "대리",
    email: "hr.senior1@company.com",
    executiveRegistrationDate: "2023-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 4,
    parentId: "exec_hr_manager1"
  },
  {
    id: 23,
    executiveId: "exec_hr_senior2",
    name: "문인사시니어2",
    position: "교육대리",
    title: "대리",
    email: "hr.senior2@company.com",
    executiveRegistrationDate: "2023-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 4,
    parentId: "exec_hr_manager2"
  },

  // 4단계: IT팀 하위 (2명)
  {
    id: 24,
    executiveId: "exec_it_senior1",
    name: "양IT시니어1",
    position: "개발대리",
    title: "대리",
    email: "it.senior1@company.com",
    executiveRegistrationDate: "2023-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 4,
    parentId: "exec_it_manager1"
  },
  {
    id: 25,
    executiveId: "exec_it_senior2",
    name: "구IT시니어2",
    position: "인프라대리",
    title: "대리",
    email: "it.senior2@company.com",
    executiveRegistrationDate: "2023-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 4,
    parentId: "exec_it_manager2"
  },

  // 4단계: 리스크팀 하위 (2명)
  {
    id: 26,
    executiveId: "exec_risk_senior1",
    name: "신리스크시니어1",
    position: "리스크대리",
    title: "대리",
    email: "risk.senior1@company.com",
    executiveRegistrationDate: "2023-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 4,
    parentId: "exec_risk_manager1"
  },
  {
    id: 27,
    executiveId: "exec_risk_senior2",
    name: "오리스크시니어2",
    position: "감사대리",
    title: "대리",
    email: "risk.senior2@company.com",
    executiveRegistrationDate: "2023-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 4,
    parentId: "exec_risk_manager2"
  },

  // 4단계: 컴플라이언스팀 하위 (2명)
  {
    id: 28,
    executiveId: "exec_compliance_senior1",
    name: "양컴플라이언스시니어1",
    position: "컴플라이언스대리",
    title: "대리",
    email: "compliance.senior1@company.com",
    executiveRegistrationDate: "2023-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 4,
    parentId: "exec_compliance_manager1"
  },
  {
    id: 29,
    executiveId: "exec_compliance_senior2",
    name: "구컴플라이언스시니어2",
    position: "법무대리",
    title: "대리",
    email: "compliance.senior2@company.com",
    executiveRegistrationDate: "2023-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 4,
    parentId: "exec_compliance_manager2"
  },

  // 4단계: 사업팀 하위 (2명)
  {
    id: 30,
    executiveId: "exec_business_senior1",
    name: "신사업시니어1",
    position: "영업대리",
    title: "대리",
    email: "business.senior1@company.com",
    executiveRegistrationDate: "2023-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 4,
    parentId: "exec_business_manager1"
  },
  {
    id: 31,
    executiveId: "exec_business_senior2",
    name: "오사업시니어2",
    position: "마케팅대리",
    title: "대리",
    email: "business.senior2@company.com",
    executiveRegistrationDate: "2023-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 4,
    parentId: "exec_business_manager2"
  },

  // 5단계: 재무팀 하위 (2명)
  {
    id: 32,
    executiveId: "exec_finance_junior1",
    name: "장재무주니어1",
    position: "재무사원",
    title: "사원",
    email: "finance.junior1@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 5,
    parentId: "exec_finance_senior1"
  },
  {
    id: 33,
    executiveId: "exec_finance_junior2",
    name: "전재무주니어2",
    position: "회계사원",
    title: "사원",
    email: "finance.junior2@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 5,
    parentId: "exec_finance_senior2"
  },

  // 5단계: 인사팀 하위 (2명)
  {
    id: 34,
    executiveId: "exec_hr_junior1",
    name: "고인사주니어1",
    position: "인사사원",
    title: "사원",
    email: "hr.junior1@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 5,
    parentId: "exec_hr_senior1"
  },
  {
    id: 35,
    executiveId: "exec_hr_junior2",
    name: "문인사주니어2",
    position: "교육사원",
    title: "사원",
    email: "hr.junior2@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 5,
    parentId: "exec_hr_senior2"
  },

  // 5단계: IT팀 하위 (2명)
  {
    id: 36,
    executiveId: "exec_it_junior1",
    name: "양IT주니어1",
    position: "개발사원",
    title: "사원",
    email: "it.junior1@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 5,
    parentId: "exec_it_senior1"
  },
  {
    id: 37,
    executiveId: "exec_it_junior2",
    name: "구IT주니어2",
    position: "인프라사원",
    title: "사원",
    email: "it.junior2@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 5,
    parentId: "exec_it_senior2"
  },

  // 5단계: 리스크팀 하위 (2명)
  {
    id: 38,
    executiveId: "exec_risk_junior1",
    name: "신리스크주니어1",
    position: "리스크사원",
    title: "사원",
    email: "risk.junior1@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 5,
    parentId: "exec_risk_senior1"
  },
  {
    id: 39,
    executiveId: "exec_risk_junior2",
    name: "오리스크주니어2",
    position: "감사사원",
    title: "사원",
    email: "risk.junior2@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 5,
    parentId: "exec_risk_senior2"
  },

  // 5단계: 컴플라이언스팀 하위 (2명)
  {
    id: 40,
    executiveId: "exec_compliance_junior1",
    name: "양컴플라이언스주니어1",
    position: "컴플라이언스사원",
    title: "사원",
    email: "compliance.junior1@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 5,
    parentId: "exec_compliance_senior1"
  },
  {
    id: 41,
    executiveId: "exec_compliance_junior2",
    name: "구컴플라이언스주니어2",
    position: "법무사원",
    title: "사원",
    email: "compliance.junior2@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 5,
    parentId: "exec_compliance_senior2"
  },

  // 5단계: 사업팀 하위 (2명)
  {
    id: 42,
    executiveId: "exec_business_junior1",
    name: "신사업주니어1",
    position: "영업사원",
    title: "사원",
    email: "business.junior1@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 5,
    parentId: "exec_business_senior1"
  },
  {
    id: 43,
    executiveId: "exec_business_junior2",
    name: "오사업주니어2",
    position: "마케팅사원",
    title: "사원",
    email: "business.junior2@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 5,
    parentId: "exec_business_senior2"
  },

  // 6단계: 재무팀 하위 (2명)
  {
    id: 44,
    executiveId: "exec_finance_assistant1",
    name: "장재무어시스턴트1",
    position: "재무보조",
    title: "보조",
    email: "finance.assistant1@company.com",
    executiveRegistrationDate: "2024-06-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 6,
    parentId: "exec_finance_junior1"
  },
  {
    id: 45,
    executiveId: "exec_finance_assistant2",
    name: "전재무어시스턴트2",
    position: "회계보조",
    title: "보조",
    email: "finance.assistant2@company.com",
    executiveRegistrationDate: "2024-06-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 6,
    parentId: "exec_finance_junior2"
  },

  // 6단계: 인사팀 하위 (2명)
  {
    id: 46,
    executiveId: "exec_hr_assistant1",
    name: "고인사어시스턴트1",
    position: "인사보조",
    title: "보조",
    email: "hr.assistant1@company.com",
    executiveRegistrationDate: "2024-06-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 6,
    parentId: "exec_hr_junior1"
  },
  {
    id: 47,
    executiveId: "exec_hr_assistant2",
    name: "문인사어시스턴트2",
    position: "교육보조",
    title: "보조",
    email: "hr.assistant2@company.com",
    executiveRegistrationDate: "2024-06-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 6,
    parentId: "exec_hr_junior2"
  },

  // 6단계: IT팀 하위 (2명)
  {
    id: 48,
    executiveId: "exec_it_assistant1",
    name: "양IT어시스턴트1",
    position: "개발보조",
    title: "보조",
    email: "it.assistant1@company.com",
    executiveRegistrationDate: "2024-06-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 6,
    parentId: "exec_it_junior1"
  },
  {
    id: 49,
    executiveId: "exec_it_assistant2",
    name: "구IT어시스턴트2",
    position: "인프라보조",
    title: "보조",
    email: "it.assistant2@company.com",
    executiveRegistrationDate: "2024-06-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 6,
    parentId: "exec_it_junior2"
  },

  // 6단계: 리스크팀 하위 (2명)
  {
    id: 50,
    executiveId: "exec_risk_assistant1",
    name: "신리스크어시스턴트1",
    position: "리스크보조",
    title: "보조",
    email: "risk.assistant1@company.com",
    executiveRegistrationDate: "2024-06-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 6,
    parentId: "exec_risk_junior1"
  },
  {
    id: 51,
    executiveId: "exec_risk_assistant2",
    name: "오리스크어시스턴트2",
    position: "감사보조",
    title: "보조",
    email: "risk.assistant2@company.com",
    executiveRegistrationDate: "2024-06-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 6,
    parentId: "exec_risk_junior2"
  },

  // 6단계: 컴플라이언스팀 하위 (2명)
  {
    id: 52,
    executiveId: "exec_compliance_assistant1",
    name: "양컴플라이언스어시스턴트1",
    position: "컴플라이언스보조",
    title: "보조",
    email: "compliance.assistant1@company.com",
    executiveRegistrationDate: "2024-06-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 6,
    parentId: "exec_compliance_junior1"
  },
  {
    id: 53,
    executiveId: "exec_compliance_assistant2",
    name: "구컴플라이언스어시스턴트2",
    position: "법무보조",
    title: "보조",
    email: "compliance.assistant2@company.com",
    executiveRegistrationDate: "2024-06-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 6,
    parentId: "exec_compliance_junior2"
  },

  // 6단계: 사업팀 하위 (2명)
  {
    id: 54,
    executiveId: "exec_business_assistant1",
    name: "신사업어시스턴트1",
    position: "영업보조",
    title: "보조",
    email: "business.assistant1@company.com",
    executiveRegistrationDate: "2024-06-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 6,
    parentId: "exec_business_junior1"
  },
  {
    id: 55,
    executiveId: "exec_business_assistant2",
    name: "오사업어시스턴트2",
    position: "마케팅보조",
    title: "보조",
    email: "business.assistant2@company.com",
    executiveRegistrationDate: "2024-06-01",
    executiveDismissalDate: undefined,
    profileImageUrl: "/images/cute-warning-sign.png",
    level: 6,
    parentId: "exec_business_junior2"
  }
]

