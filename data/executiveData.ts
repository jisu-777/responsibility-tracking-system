import { ExecutiveMasterData } from "@/types"

// 기존 executiveList 데이터 (책무기술서 페이지용)
export const executiveList = [
  {
    officer: {
      position: "경영기획담당",
      rank: "전무",
      name: "홍길동",
      assignmentDate: "2023.03.01",
      appointmentDate: "2020.05.15",
      dualRole: "Y",
      dualRoleDetails: "ESG위원회 위원장, 내부거래위원회 위원",
      department: "경영기획실, 전략기획팀",
    },
    committees: [
      {
        name: "리스크관리위원회",
        role: "위원장",
        frequency: "분기 1회",
        responsibility: "리스크 정책 및 한도 설정"
      },
      {
        name: "ESG위원회",
        role: "위원",
        frequency: "반기 1회",
        responsibility: "ESG 전략 및 성과 심의"
      }
    ],
    responsibilities: {
      summary: "업무 총괄 및 리스크 관리",
      date: "2024-03-01",
      details: [
        {
          duty: "내부회계관리",
          description: "회계정책 수립 및 공시 검토",
          regulation: "외감법 제8조"
        },
        {
          duty: "리스크관리",
          description: "리스크 식별 및 대응 계획 수립",
          regulation: "리스크관리규정 제3조"
        },
        {
          duty: "윤리경영",
          description: "임직원 행동강령 운영",
          regulation: "윤리규정 제1장"
        }
      ]
    },
    controlDuties: [
      "내부통제기준에 따른 절차 준수 여부 점검",
      "중요정보 보고 체계 수립",
      "리스크 식별 및 대응 활동 실행"
    ]
  },
  {
    officer: {
      position: "재무관리담당",
      rank: "부사장",
      name: "이영희",
      assignmentDate: "2022.09.15",
      appointmentDate: "2019.04.20",
      dualRole: "N",
      dualRoleDetails: "",
      department: "재무관리실",
    },
    committees: [
      {
        name: "재무위원회",
        role: "위원장",
        frequency: "월 1회",
        responsibility: "재무 전략 수립 및 자금운용 심의"
      }
    ],
    responsibilities: {
      summary: "재무 전략 총괄 및 자금 집행 관리",
      date: "2023-01-01",
      details: [
        {
          duty: "자금운용",
          description: "단기·중기 자금계획 수립 및 실행",
          regulation: "재무규정 제10조"
        }
      ]
    },
    controlDuties: [
      "예산 대비 자금 운영 실적 점검",
      "자금 계획 수립 절차의 적정성 검토"
    ]
  },
  {
    officer: {
      position: "IT보안담당",
      rank: "상무",
      name: "김철수",
      assignmentDate: "2021.06.01",
      appointmentDate: "2018.02.10",
      dualRole: "Y",
      dualRoleDetails: "정보보호위원회 위원",
      department: "정보보안팀",
    },
    committees: [
      {
        name: "정보보호위원회",
        role: "위원",
        frequency: "분기 1회",
        responsibility: "보안 정책 수립 및 사고 대응"
      }
    ],
    responsibilities: {
      summary: "정보 보안 및 시스템 안정성 확보",
      date: "2022-05-01",
      details: [
        {
          duty: "보안관리",
          description: "보안 정책 수립 및 보안 툴 운영",
          regulation: "정보보호지침 제5조"
        }
      ]
    },
    controlDuties: [
      "정기 보안 점검 실행",
      "외부 공격 모니터링 체계 유지"
    ]
  },
  {
    officer: {
      position: "HR담당",
      rank: "전무",
      name: "박미정",
      assignmentDate: "2020.01.01",
      appointmentDate: "2017.11.01",
      dualRole: "N",
      dualRoleDetails: "",
      department: "인사팀",
    },
    committees: [
      {
        name: "인사위원회",
        role: "위원장",
        frequency: "수시",
        responsibility: "승진 및 인사 관련 의사결정"
      }
    ],
    responsibilities: {
      summary: "조직 운영 및 인사제도 관리",
      date: "2023-04-01",
      details: [
        {
          duty: "채용관리",
          description: "인재 채용 및 채용절차 운영",
          regulation: "인사규정 제2장"
        }
      ]
    },
    controlDuties: [
      "인사 운영의 공정성 검토",
      "채용 기준 및 절차 개선 여부 점검"
    ]
  },
  {
    officer: {
      position: "준법감시담당",
      rank: "감사",
      name: "정우성",
      assignmentDate: "2023.02.01",
      appointmentDate: "2021.03.15",
      dualRole: "Y",
      dualRoleDetails: "준법감시위원회 위원장",
      department: "준법감시팀",
    },
    committees: [
      {
        name: "준법감시위원회",
        role: "위원장",
        frequency: "격월",
        responsibility: "법률 위반 방지 및 대응 방안 점검"
      }
    ],
    responsibilities: {
      summary: "사내 법규 준수 관리 및 리스크 식별",
      date: "2023-06-01",
      details: [
        {
          duty: "법규준수",
          description: "내부 규정 및 외부 법령 준수 점검",
          regulation: "준법감시기준 제4조"
        }
      ]
    },
    controlDuties: [
      "법령 변경사항에 따른 사내 규정 정비",
      "준법감시 교육 이행 여부 점검"
    ]
  }
]

// 임원 마스터 데이터 (25명)
export const mockExecutiveMasterData: ExecutiveMasterData[] = [
  {
    id: 1,
    // 조직정보
    departmentCode: "ORG100000",
    departmentName: "유진",
    departmentPath: "/유진",
    // 그룹정보
    groupCode: "ORG190000",
    groupName: "IT본부",
    positionName: "IT본부장",
    responsibleCommittee: "주관회의체1",
    chairmanMember: "위원",
    meetingFrequency: "매월",
    keyDeliberationMatter: "IT 전략 및 시스템 구축",
    // 임원정보
    rank: "본부장",
    name: "송영호",
    employeeId: "456",
    email: "song.young@company.com",
    executiveRegistrationDate: "2025-01-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 2,
    // 조직정보
    departmentCode: "ORG110000",
    departmentName: "경영지원본부",
    departmentPath: "/유진/경영지원본부",
    // 그룹정보
    groupCode: "ORG191000",
    groupName: "경영지원본부",
    positionName: "경영지원본부장",
    responsibleCommittee: "주관회의체2",
    chairmanMember: "위원장",
    meetingFrequency: "매년",
    keyDeliberationMatter: "경영 전략 및 예산 관리",
    // 임원정보
    rank: "본부장",
    name: "이사배",
    employeeId: "567",
    email: "lee.sabae@company.com",
    executiveRegistrationDate: "2024-01-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 3,
    // 조직정보
    departmentCode: "ORG120000",
    departmentName: "영업본부",
    departmentPath: "/유진/영업본부",
    // 그룹정보
    groupCode: "ORG192000",
    groupName: "영업본부",
    positionName: "영업본부장",
    responsibleCommittee: "주관회의체3",
    chairmanMember: "위원",
    meetingFrequency: "분기",
    keyDeliberationMatter: "영업 전략 및 고객 관리",
    // 임원정보
    rank: "본부장",
    name: "김영수",
    employeeId: "789",
    email: "kim.youngsu@company.com",
    executiveRegistrationDate: "2024-02-15",
    executiveDismissalDate: undefined,
  },
  {
    id: 4,
    // 조직정보
    departmentCode: "ORG130000",
    departmentName: "마케팅본부",
    departmentPath: "/유진/마케팅본부",
    // 그룹정보
    groupCode: "ORG193000",
    groupName: "마케팅본부",
    positionName: "마케팅본부장",
    responsibleCommittee: "주관회의체4",
    chairmanMember: "위원",
    meetingFrequency: "월간",
    keyDeliberationMatter: "마케팅 전략 및 브랜드 관리",
    // 임원정보
    rank: "본부장",
    name: "박지영",
    employeeId: "234",
    email: "park.jiyoung@company.com",
    executiveRegistrationDate: "2024-03-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 5,
    // 조직정보
    departmentCode: "ORG140000",
    departmentName: "인사본부",
    departmentPath: "/유진/인사본부",
    // 그룹정보
    groupCode: "ORG194000",
    groupName: "인사본부",
    positionName: "인사본부장",
    responsibleCommittee: "주관회의체5",
    chairmanMember: "위원장",
    meetingFrequency: "반기",
    keyDeliberationMatter: "인사 정책 및 조직 문화",
    // 임원정보
    rank: "본부장",
    name: "최민수",
    employeeId: "345",
    email: "choi.minsu@company.com",
    executiveRegistrationDate: "2024-04-10",
    executiveDismissalDate: undefined,
  },
  {
    id: 6,
    // 조직정보
    departmentCode: "ORG150000",
    departmentName: "재무본부",
    departmentPath: "/유진/재무본부",
    // 그룹정보
    groupCode: "ORG195000",
    groupName: "재무본부",
    positionName: "재무본부장",
    responsibleCommittee: "주관회의체6",
    chairmanMember: "위원",
    meetingFrequency: "월간",
    keyDeliberationMatter: "재무 관리 및 투자 전략",
    // 임원정보
    rank: "본부장",
    name: "정수진",
    employeeId: "456",
    email: "jung.sujin@company.com",
    executiveRegistrationDate: "2024-05-20",
    executiveDismissalDate: undefined,
  },
  {
    id: 7,
    // 조직정보
    departmentCode: "ORG160000",
    departmentName: "연구개발본부",
    departmentPath: "/유진/연구개발본부",
    // 그룹정보
    groupCode: "ORG196000",
    groupName: "연구개발본부",
    positionName: "연구개발본부장",
    responsibleCommittee: "주관회의체7",
    chairmanMember: "위원",
    meetingFrequency: "분기",
    keyDeliberationMatter: "R&D 전략 및 기술 혁신",
    // 임원정보
    rank: "본부장",
    name: "한동욱",
    employeeId: "567",
    email: "han.dongwook@company.com",
    executiveRegistrationDate: "2024-06-15",
    executiveDismissalDate: undefined,
  },
  {
    id: 8,
    // 조직정보
    departmentCode: "ORG170000",
    departmentName: "품질관리본부",
    departmentPath: "/유진/품질관리본부",
    // 그룹정보
    groupCode: "ORG197000",
    groupName: "품질관리본부",
    positionName: "품질관리본부장",
    responsibleCommittee: "주관회의체8",
    chairmanMember: "위원장",
    meetingFrequency: "월간",
    keyDeliberationMatter: "품질 관리 및 인증",
    // 임원정보
    rank: "본부장",
    name: "윤서연",
    employeeId: "678",
    email: "yoon.seoyeon@company.com",
    executiveRegistrationDate: "2024-07-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 9,
    // 조직정보
    departmentCode: "ORG180000",
    departmentName: "해외사업본부",
    departmentPath: "/유진/해외사업본부",
    // 그룹정보
    groupCode: "ORG198000",
    groupName: "해외사업본부",
    positionName: "해외사업본부장",
    responsibleCommittee: "주관회의체9",
    chairmanMember: "위원",
    meetingFrequency: "반기",
    keyDeliberationMatter: "해외 진출 및 글로벌 전략",
    // 임원정보
    rank: "본부장",
    name: "임태호",
    employeeId: "789",
    email: "lim.taeho@company.com",
    executiveRegistrationDate: "2024-08-10",
    executiveDismissalDate: undefined,
  },
  {
    id: 10,
    // 조직정보
    departmentCode: "ORG200000",
    departmentName: "디지털혁신본부",
    departmentPath: "/유진/디지털혁신본부",
    // 그룹정보
    groupCode: "ORG199000",
    groupName: "디지털혁신본부",
    positionName: "디지털혁신본부장",
    responsibleCommittee: "주관회의체10",
    chairmanMember: "위원",
    meetingFrequency: "월간",
    keyDeliberationMatter: "디지털 전환 및 혁신",
    // 임원정보
    rank: "본부장",
    name: "강지훈",
    employeeId: "890",
    email: "kang.jihun@company.com",
    executiveRegistrationDate: "2024-09-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 11,
    // 조직정보
    departmentCode: "ORG210000",
    departmentName: "보안본부",
    departmentPath: "/유진/보안본부",
    // 그룹정보
    groupCode: "ORG200000",
    groupName: "보안본부",
    positionName: "보안본부장",
    responsibleCommittee: "주관회의체11",
    chairmanMember: "위원장",
    meetingFrequency: "월간",
    keyDeliberationMatter: "보안 정책 및 위험 관리",
    // 임원정보
    rank: "본부장",
    name: "송미영",
    employeeId: "901",
    email: "song.miyoung@company.com",
    executiveRegistrationDate: "2024-10-15",
    executiveDismissalDate: undefined,
  },
  {
    id: 12,
    // 조직정보
    departmentCode: "ORG220000",
    departmentName: "법무본부",
    departmentPath: "/유진/법무본부",
    // 그룹정보
    groupCode: "ORG201000",
    groupName: "법무본부",
    positionName: "법무본부장",
    responsibleCommittee: "주관회의체12",
    chairmanMember: "위원",
    meetingFrequency: "분기",
    keyDeliberationMatter: "법무 관리 및 리스크",
    // 임원정보
    rank: "본부장",
    name: "김준호",
    employeeId: "012",
    email: "kim.junho@company.com",
    executiveRegistrationDate: "2024-11-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 13,
    // 조직정보
    departmentCode: "ORG230000",
    departmentName: "커뮤니케이션본부",
    departmentPath: "/유진/커뮤니케이션본부",
    // 그룹정보
    groupCode: "ORG202000",
    groupName: "커뮤니케이션본부",
    positionName: "커뮤니케이션본부장",
    responsibleCommittee: "주관회의체13",
    chairmanMember: "위원",
    meetingFrequency: "월간",
    keyDeliberationMatter: "PR 전략 및 미디어 관리",
    // 임원정보
    rank: "본부장",
    name: "이하나",
    employeeId: "123",
    email: "lee.hana@company.com",
    executiveRegistrationDate: "2024-12-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 14,
    // 조직정보
    departmentCode: "ORG240000",
    departmentName: "지속가능경영본부",
    departmentPath: "/유진/지속가능경영본부",
    // 그룹정보
    groupCode: "ORG203000",
    groupName: "지속가능경영본부",
    positionName: "지속가능경영본부장",
    responsibleCommittee: "주관회의체14",
    chairmanMember: "위원장",
    meetingFrequency: "반기",
    keyDeliberationMatter: "ESG 정책 및 사회적 책임",
    // 임원정보
    rank: "본부장",
    name: "박성민",
    employeeId: "234",
    email: "park.sungmin@company.com",
    executiveRegistrationDate: "2025-01-15",
    executiveDismissalDate: undefined,
  },
  {
    id: 15,
    // 조직정보
    departmentCode: "ORG250000",
    departmentName: "고객경험본부",
    departmentPath: "/유진/고객경험본부",
    // 그룹정보
    groupCode: "ORG204000",
    groupName: "고객경험본부",
    positionName: "고객경험본부장",
    responsibleCommittee: "주관회의체15",
    chairmanMember: "위원",
    meetingFrequency: "월간",
    keyDeliberationMatter: "고객 만족도 및 서비스 개선",
    // 임원정보
    rank: "본부장",
    name: "최유진",
    employeeId: "345",
    email: "choi.yujin@company.com",
    executiveRegistrationDate: "2025-02-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 16,
    // 조직정보
    departmentCode: "ORG260000",
    departmentName: "데이터분석본부",
    departmentPath: "/유진/데이터분석본부",
    // 그룹정보
    groupCode: "ORG205000",
    groupName: "데이터분석본부",
    positionName: "데이터분석본부장",
    responsibleCommittee: "주관회의체16",
    chairmanMember: "위원",
    meetingFrequency: "분기",
    keyDeliberationMatter: "데이터 전략 및 분석",
    // 임원정보
    rank: "본부장",
    name: "정다은",
    employeeId: "456",
    email: "jung.daeun@company.com",
    executiveRegistrationDate: "2025-03-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 17,
    // 조직정보
    departmentCode: "ORG270000",
    departmentName: "인공지능본부",
    departmentPath: "/유진/인공지능본부",
    // 그룹정보
    groupCode: "ORG206000",
    groupName: "인공지능본부",
    positionName: "인공지능본부장",
    responsibleCommittee: "주관회의체17",
    chairmanMember: "위원장",
    meetingFrequency: "월간",
    keyDeliberationMatter: "AI 기술 개발 및 적용",
    // 임원정보
    rank: "본부장",
    name: "한승우",
    employeeId: "567",
    email: "han.seungwoo@company.com",
    executiveRegistrationDate: "2025-04-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 18,
    // 조직정보
    departmentCode: "ORG280000",
    departmentName: "클라우드본부",
    departmentPath: "/유진/클라우드본부",
    // 그룹정보
    groupCode: "ORG207000",
    groupName: "클라우드본부",
    positionName: "클라우드본부장",
    responsibleCommittee: "주관회의체18",
    chairmanMember: "위원",
    meetingFrequency: "분기",
    keyDeliberationMatter: "클라우드 인프라 및 서비스",
    // 임원정보
    rank: "본부장",
    name: "윤지훈",
    employeeId: "678",
    email: "yoon.jihun@company.com",
    executiveRegistrationDate: "2025-05-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 19,
    // 조직정보
    departmentCode: "ORG290000",
    departmentName: "모바일본부",
    departmentPath: "/유진/모바일본부",
    // 그룹정보
    groupCode: "ORG208000",
    groupName: "모바일본부",
    positionName: "모바일본부장",
    responsibleCommittee: "주관회의체19",
    chairmanMember: "위원",
    meetingFrequency: "월간",
    keyDeliberationMatter: "모바일 플랫폼 및 앱 개발",
    // 임원정보
    rank: "본부장",
    name: "임서연",
    employeeId: "789",
    email: "lim.seoyeon@company.com",
    executiveRegistrationDate: "2025-06-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 20,
    // 조직정보
    departmentCode: "ORG300000",
    departmentName: "웹개발본부",
    departmentPath: "/유진/웹개발본부",
    // 그룹정보
    groupCode: "ORG209000",
    groupName: "웹개발본부",
    positionName: "웹개발본부장",
    responsibleCommittee: "주관회의체20",
    chairmanMember: "위원장",
    meetingFrequency: "분기",
    keyDeliberationMatter: "웹 서비스 및 플랫폼 개발",
    // 임원정보
    rank: "본부장",
    name: "강민수",
    employeeId: "890",
    email: "kang.minsu@company.com",
    executiveRegistrationDate: "2025-07-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 21,
    // 조직정보
    departmentCode: "ORG310000",
    departmentName: "보안개발본부",
    departmentPath: "/유진/보안개발본부",
    // 그룹정보
    groupCode: "ORG210000",
    groupName: "보안개발본부",
    positionName: "보안개발본부장",
    responsibleCommittee: "주관회의체21",
    chairmanMember: "위원",
    meetingFrequency: "월간",
    keyDeliberationMatter: "보안 솔루션 개발 및 적용",
    // 임원정보
    rank: "본부장",
    name: "송태영",
    employeeId: "901",
    email: "song.taeyoung@company.com",
    executiveRegistrationDate: "2025-08-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 22,
    // 조직정보
    departmentCode: "ORG320000",
    departmentName: "네트워크본부",
    departmentPath: "/유진/네트워크본부",
    // 그룹정보
    groupCode: "ORG211000",
    groupName: "네트워크본부",
    positionName: "네트워크본부장",
    responsibleCommittee: "주관회의체22",
    chairmanMember: "위원",
    meetingFrequency: "분기",
    keyDeliberationMatter: "네트워크 인프라 및 보안",
    // 임원정보
    rank: "본부장",
    name: "김지원",
    employeeId: "012",
    email: "kim.jiwon@company.com",
    executiveRegistrationDate: "2025-09-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 23,
    // 조직정보
    departmentCode: "ORG330000",
    departmentName: "시스템운영본부",
    departmentPath: "/유진/시스템운영본부",
    // 그룹정보
    groupCode: "ORG212000",
    groupName: "시스템운영본부",
    positionName: "시스템운영본부장",
    responsibleCommittee: "주관회의체23",
    chairmanMember: "위원장",
    meetingFrequency: "월간",
    keyDeliberationMatter: "시스템 운영 및 유지보수",
    // 임원정보
    rank: "본부장",
    name: "이준호",
    employeeId: "123",
    email: "lee.junho@company.com",
    executiveRegistrationDate: "2025-10-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 24,
    // 조직정보
    departmentCode: "ORG340000",
    departmentName: "데이터센터본부",
    departmentPath: "/유진/데이터센터본부",
    // 그룹정보
    groupCode: "ORG213000",
    groupName: "데이터센터본부",
    positionName: "데이터센터본부장",
    responsibleCommittee: "주관회의체24",
    chairmanMember: "위원",
    meetingFrequency: "분기",
    keyDeliberationMatter: "데이터센터 운영 및 관리",
    // 임원정보
    rank: "본부장",
    name: "박현우",
    employeeId: "234",
    email: "park.hyunwoo@company.com",
    executiveRegistrationDate: "2025-11-01",
    executiveDismissalDate: undefined,
  },
  {
    id: 25,
    // 조직정보
    departmentCode: "ORG350000",
    departmentName: "디지털마케팅본부",
    departmentPath: "/유진/디지털마케팅본부",
    // 그룹정보
    groupCode: "ORG214000",
    groupName: "디지털마케팅본부",
    positionName: "디지털마케팅본부장",
    responsibleCommittee: "주관회의체25",
    chairmanMember: "위원",
    meetingFrequency: "월간",
    keyDeliberationMatter: "디지털 마케팅 전략 및 실행",
    // 임원정보
    rank: "본부장",
    name: "최지은",
    employeeId: "345",
    email: "choi.jieun@company.com",
    executiveRegistrationDate: "2025-12-01",
    executiveDismissalDate: undefined,
  },
]
