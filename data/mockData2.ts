// 새로운 인터페이스 정의
export interface ExecutiveResponsibility {
  officerId: string
  officerName: string       // 임원 이름
  position: string          // 직책
  department?: string       // 담당 본부명
  organization: OrgNode     // 조직도 뷰용 계층 구조
  codes: string[]          // 담당 코드들
  responsibilities: Responsibility[] // 책무 리스트
}

export interface Responsibility {
  id: string
  code: string
  title: string
  description: string
  category: string
}

export interface OrgNode {
  id: string
  name: string              // 이름
  title: string             // 직책
  children?: OrgNode[]
}

// 임원별 책무체계도 데이터 (조직도 기반)
export const mockExecutiveResponsibilityData: ExecutiveResponsibility[] = [
  {
    officerId: "chairman001",
    officerName: "박이사",
    position: "이사회 의장",
    department: "이사회",
    codes: ["C1"],
    responsibilities: [
      {
        id: "chairman-1",
        code: "C1-1",
        title: "이사회 운영 관리",
        description: "이사회 정기회의 개최, 의결사항 문서화, 이사회-경영진 간 소통 관리",
        category: "이사회 운영"
      },
      {
        id: "chairman-2",
        code: "C1-2",
        title: "기업 전략 감독",
        description: "기업 전략 방향 수립, 리스크 관리 감독, 경영진 성과 모니터링",
        category: "전략 감독"
      }
    ],
    organization: {
      id: "chairman",
      name: "박이사",
      title: "이사회 의장",
      children: [
        {
          id: "board-support",
          name: "이사회 지원",
          title: "지원 부서",
          children: [
            {
              id: "board-secretary",
              name: "김사무",
              title: "이회사무국장",
              children: [
                {
                  id: "board-admin",
                  name: "이행정",
                  title: "행정팀장",
                  children: [
                    {
                      id: "board-admin-assistant1",
                      name: "박행정1",
                      title: "행정담당자",
                      children: [
                        {
                          id: "board-admin-staff1",
                          name: "김행정직원1",
                          title: "행정직원"
                        },
                        {
                          id: "board-admin-staff2",
                          name: "이행정직원2",
                          title: "행정직원"
                        }
                      ]
                    },
                    {
                      id: "board-admin-assistant2",
                      name: "정행정2",
                      title: "행정담당자",
                      children: [
                        {
                          id: "board-admin-staff3",
                          name: "한행정직원3",
                          title: "행정직원"
                        },
                        {
                          id: "board-admin-staff4",
                          name: "송행정직원4",
                          title: "행정직원"
                        }
                      ]
                    },
                    {
                      id: "board-admin-assistant3",
                      name: "한행정3",
                      title: "행정담당자",
                      children: [
                        {
                          id: "board-admin-staff5",
                          name: "박행정직원5",
                          title: "행정직원"
                        },
                        {
                          id: "board-admin-staff6",
                          name: "김행정직원6",
                          title: "행정직원"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "board-planning",
                  name: "정기획",
                  title: "기획팀장",
                  children: [
                    {
                      id: "board-planning-assistant1",
                      name: "박기획1",
                      title: "기획담당자",
                      children: [
                        {
                          id: "board-planning-staff1",
                          name: "김기획직원1",
                          title: "기획직원"
                        },
                        {
                          id: "board-planning-staff2",
                          name: "이기획직원2",
                          title: "기획직원"
                        }
                      ]
                    },
                    {
                      id: "board-planning-assistant2",
                      name: "한기획2",
                      title: "기획담당자",
                      children: [
                        {
                          id: "board-planning-staff3",
                          name: "정기획직원3",
                          title: "기획직원"
                        },
                        {
                          id: "board-planning-staff4",
                          name: "송기획직원4",
                          title: "기획직원"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "audit-head",
              name: "김감사",
              title: "감사본부장",
              children: [
                {
                  id: "audit-planning",
                  name: "송계획",
                  title: "감사계획팀장",
                  children: [
                    {
                      id: "audit-planning-assistant1",
                      name: "박계획1",
                      title: "계획담당자",
                      children: [
                        {
                          id: "audit-planning-staff1",
                          name: "김계획직원1",
                          title: "계획직원"
                        },
                        {
                          id: "audit-planning-staff2",
                          name: "이계획직원2",
                          title: "계획직원"
                        }
                      ]
                    },
                    {
                      id: "audit-planning-assistant2",
                      name: "한계획2",
                      title: "계획담당자",
                      children: [
                        {
                          id: "audit-planning-staff3",
                          name: "정계획직원3",
                          title: "계획직원"
                        },
                        {
                          id: "audit-planning-staff4",
                          name: "송계획직원4",
                          title: "계획직원"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "audit-execution",
                  name: "정실행",
                  title: "감사실행팀장",
                  children: [
                    {
                      id: "audit-execution-assistant1",
                      name: "박실행1",
                      title: "실행담당자",
                      children: [
                        {
                          id: "audit-execution-staff1",
                          name: "김실행직원1",
                          title: "실행직원"
                        },
                        {
                          id: "audit-execution-staff2",
                          name: "이실행직원2",
                          title: "실행직원"
                        }
                      ]
                    },
                    {
                      id: "audit-execution-assistant2",
                      name: "한실행2",
                      title: "실행담당자",
                      children: [
                        {
                          id: "audit-execution-staff3",
                          name: "정실행직원3",
                          title: "실행직원"
                        },
                        {
                          id: "audit-execution-staff4",
                          name: "송실행직원4",
                          title: "실행직원"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "risk-head",
              name: "김관리",
              title: "리스크관리본부장",
              children: [
                {
                  id: "risk-policy",
                  name: "박정책",
                  title: "리스크정책팀장",
                  children: [
                    {
                      id: "risk-policy-assistant1",
                      name: "박정책1",
                      title: "정책담당자",
                      children: [
                        {
                          id: "risk-policy-staff1",
                          name: "김정책직원1",
                          title: "정책직원"
                        },
                        {
                          id: "risk-policy-staff2",
                          name: "이정책직원2",
                          title: "정책직원"
                        }
                      ]
                    },
                    {
                      id: "risk-policy-assistant2",
                      name: "한정책2",
                      title: "정책담당자",
                      children: [
                        {
                          id: "risk-policy-staff3",
                          name: "정정책직원3",
                          title: "정책직원"
                        },
                        {
                          id: "risk-policy-staff4",
                          name: "송정책직원4",
                          title: "정책직원"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "risk-monitoring",
                  name: "정모니터",
                  title: "리스크모니터링팀장",
                  children: [
                    {
                      id: "risk-monitoring-assistant1",
                      name: "박모니터1",
                      title: "모니터링담당자",
                      children: [
                        {
                          id: "risk-monitoring-staff1",
                          name: "김모니터직원1",
                          title: "모니터링직원"
                        },
                        {
                          id: "risk-monitoring-staff2",
                          name: "이모니터직원2",
                          title: "모니터링직원"
                        }
                      ]
                    },
                    {
                      id: "risk-monitoring-assistant2",
                      name: "한모니터2",
                      title: "모니터링담당자",
                      children: [
                        {
                          id: "risk-monitoring-staff3",
                          name: "정모니터직원3",
                          title: "모니터링직원"
                        },
                        {
                          id: "risk-monitoring-staff4",
                          name: "송모니터직원4",
                          title: "모니터링직원"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    officerId: "ceo001",
    officerName: "김대표",
    position: "대표이사",
    department: "경영진",
    codes: ["A1"],
    responsibilities: [
      {
        id: "ceo-1",
        code: "A1-1",
        title: "전사 경영 전략 수립",
        description: "회사 전체 경영 전략 수립 및 실행, 사업 계획 수립 및 관리",
        category: "경영 전략"
      },
      {
        id: "ceo-2",
        code: "A1-2",
        title: "조직 운영 관리",
        description: "조직 운영 및 관리, 인사 정책 수립, 성과 관리",
        category: "조직 운영"
      }
    ],
    organization: {
      id: "ceo",
      name: "김대표",
      title: "대표이사",
      children: [
        {
          id: "operations",
          name: "운용부문",
          title: "운용부문",
          children: [
            {
              id: "etf-head",
              name: "김운용",
              title: "ETF운용본부장",
              children: [
                {
                  id: "etf-strategy",
                  name: "박전략",
                  title: "ETF전략팀장",
                  children: [
                    {
                      id: "etf-strategy-assistant1",
                      name: "박전략1",
                      title: "전략담당자",
                      children: [
                        {
                          id: "etf-strategy-staff1",
                          name: "김전략직원1",
                          title: "전략직원"
                        },
                        {
                          id: "etf-strategy-staff2",
                          name: "이전략직원2",
                          title: "전략직원"
                        }
                      ]
                    },
                    {
                      id: "etf-strategy-assistant2",
                      name: "한전략2",
                      title: "전략담당자",
                      children: [
                        {
                          id: "etf-strategy-staff3",
                          name: "정전략직원3",
                          title: "전략직원"
                        },
                        {
                          id: "etf-strategy-staff4",
                          name: "송전략직원4",
                          title: "전략직원"
                        }
                      ]
                    },
                    {
                      id: "etf-strategy-assistant3",
                      name: "정전략3",
                      title: "전략담당자",
                      children: [
                        {
                          id: "etf-strategy-staff5",
                          name: "박전략직원5",
                          title: "전략직원"
                        },
                        {
                          id: "etf-strategy-staff6",
                          name: "김전략직원6",
                          title: "전략직원"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "etf-trading",
                  name: "정거래",
                  title: "ETF거래팀장",
                  children: [
                    {
                      id: "etf-trading-assistant1",
                      name: "박거래1",
                      title: "거래담당자",
                      children: [
                        {
                          id: "etf-trading-staff1",
                          name: "김거래직원1",
                          title: "거래직원"
                        },
                        {
                          id: "etf-trading-staff2",
                          name: "이거래직원2",
                          title: "거래직원"
                        }
                      ]
                    },
                    {
                      id: "etf-trading-assistant2",
                      name: "한거래2",
                      title: "거래담당자",
                      children: [
                        {
                          id: "etf-trading-staff3",
                          name: "정거래직원3",
                          title: "거래직원"
                        },
                        {
                          id: "etf-trading-staff4",
                          name: "송거래직원4",
                          title: "거래직원"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "global-head",
              name: "김글로",
              title: "글로벌사업본부장",
              children: [
                {
                  id: "global-strategy",
                  name: "한전략",
                  title: "글로벌전략팀장",
                  children: [
                    {
                      id: "global-strategy-assistant1",
                      name: "박글로전략1",
                      title: "글로벌전략담당자",
                      children: [
                        {
                          id: "global-strategy-staff1",
                          name: "김글로전략직원1",
                          title: "글로벌전략직원"
                        },
                        {
                          id: "global-strategy-staff2",
                          name: "이글로전략직원2",
                          title: "글로벌전략직원"
                        }
                      ]
                    },
                    {
                      id: "global-strategy-assistant2",
                      name: "한글로전략2",
                      title: "글로벌전략담당자",
                      children: [
                        {
                          id: "global-strategy-staff3",
                          name: "정글로전략직원3",
                          title: "글로벌전략직원"
                        },
                        {
                          id: "global-strategy-staff4",
                          name: "송글로전략직원4",
                          title: "글로벌전략직원"
                        }
                      ]
                    },
                    {
                      id: "global-strategy-assistant3",
                      name: "정글로전략3",
                      title: "글로벌전략담당자",
                      children: [
                        {
                          id: "global-strategy-staff5",
                          name: "박글로전략직원5",
                          title: "글로벌전략직원"
                        },
                        {
                          id: "global-strategy-staff6",
                          name: "김글로전략직원6",
                          title: "글로벌전략직원"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "global-trading",
                  name: "정거래",
                  title: "글로벌거래팀장",
                  children: [
                    {
                      id: "global-trading-assistant1",
                      name: "박글로거래1",
                      title: "글로벌거래담당자",
                      children: [
                        {
                          id: "global-trading-staff1",
                          name: "김글로거래직원1",
                          title: "글로벌거래직원"
                        },
                        {
                          id: "global-trading-staff2",
                          name: "이글로거래직원2",
                          title: "글로벌거래직원"
                        }
                      ]
                    },
                    {
                      id: "global-trading-assistant2",
                      name: "한글로거래2",
                      title: "글로벌거래담당자",
                      children: [
                        {
                          id: "global-trading-staff3",
                          name: "정글로거래직원3",
                          title: "글로벌거래직원"
                        },
                        {
                          id: "global-trading-staff4",
                          name: "송글로거래직원4",
                          title: "글로벌거래직원"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "equity-head",
              name: "김주식",
              title: "주식운용본부장",
              children: [
                {
                  id: "equity-research",
                  name: "이연구",
                  title: "주식연구팀장",
                  children: [
                    {
                      id: "equity-research-assistant1",
                      name: "박주식연구1",
                      title: "주식연구담당자",
                      children: [
                        {
                          id: "equity-research-staff1",
                          name: "김주식연구직원1",
                          title: "주식연구직원"
                        },
                        {
                          id: "equity-research-staff2",
                          name: "이주식연구직원2",
                          title: "주식연구직원"
                        }
                      ]
                    },
                    {
                      id: "equity-research-assistant2",
                      name: "한주식연구2",
                      title: "주식연구담당자",
                      children: [
                        {
                          id: "equity-research-staff3",
                          name: "정주식연구직원3",
                          title: "주식연구직원"
                        },
                        {
                          id: "equity-research-staff4",
                          name: "송주식연구직원4",
                          title: "주식연구직원"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "equity-trading",
                  name: "정거래",
                  title: "주식거래팀장",
                  children: [
                    {
                      id: "equity-trading-assistant1",
                      name: "박주식거래1",
                      title: "주식거래담당자",
                      children: [
                        {
                          id: "equity-trading-staff1",
                          name: "김주식거래직원1",
                          title: "주식거래직원"
                        },
                        {
                          id: "equity-trading-staff2",
                          name: "이주식거래직원2",
                          title: "주식거래직원"
                        }
                      ]
                    },
                    {
                      id: "equity-trading-assistant2",
                      name: "한주식거래2",
                      title: "주식거래담당자",
                      children: [
                        {
                          id: "equity-trading-staff3",
                          name: "정주식거래직원3",
                          title: "주식거래직원"
                        },
                        {
                          id: "equity-trading-staff4",
                          name: "송주식거래직원4",
                          title: "주식거래직원"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "fi-head",
              name: "김에프",
              title: "FI운용본부장",
              children: [
                {
                  id: "fi-research",
                  name: "박연구",
                  title: "FI연구팀장",
                  children: [
                    {
                      id: "fi-research-assistant1",
                      name: "박FI연구1",
                      title: "FI연구담당자",
                      children: [
                        {
                          id: "fi-research-staff1",
                          name: "김FI연구직원1",
                          title: "FI연구직원"
                        },
                        {
                          id: "fi-research-staff2",
                          name: "이FI연구직원2",
                          title: "FI연구직원"
                        }
                      ]
                    },
                    {
                      id: "fi-research-assistant2",
                      name: "한FI연구2",
                      title: "FI연구담당자",
                      children: [
                        {
                          id: "fi-research-staff3",
                          name: "정FI연구직원3",
                          title: "FI연구직원"
                        },
                        {
                          id: "fi-research-staff4",
                          name: "송FI연구직원4",
                          title: "FI연구직원"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "fi-trading",
                  name: "정거래",
                  title: "FI거래팀장",
                  children: [
                    {
                      id: "fi-trading-assistant1",
                      name: "박FI거래1",
                      title: "FI거래담당자",
                      children: [
                        {
                          id: "fi-trading-staff1",
                          name: "김FI거래직원1",
                          title: "FI거래직원"
                        },
                        {
                          id: "fi-trading-staff2",
                          name: "이FI거래직원2",
                          title: "FI거래직원"
                        }
                      ]
                    },
                    {
                      id: "fi-trading-assistant2",
                      name: "한FI거래2",
                      title: "FI거래담당자",
                      children: [
                        {
                          id: "fi-trading-staff3",
                          name: "정FI거래직원3",
                          title: "FI거래직원"
                        },
                        {
                          id: "fi-trading-staff4",
                          name: "송FI거래직원4",
                          title: "FI거래직원"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "global-bond-head",
              name: "김채권",
              title: "글로벌채권본부장",
              children: [
                {
                  id: "global-bond-research",
                  name: "김연구",
                  title: "글로벌채권연구팀장",
                  children: [
                    {
                      id: "global-bond-research-assistant1",
                      name: "박글로채권연구1",
                      title: "글로벌채권연구담당자",
                      children: [
                        {
                          id: "global-bond-research-staff1",
                          name: "김글로채권연구직원1",
                          title: "글로벌채권연구직원"
                        },
                        {
                          id: "global-bond-research-staff2",
                          name: "이글로채권연구직원2",
                          title: "글로벌채권연구직원"
                        }
                      ]
                    },
                    {
                      id: "global-bond-research-assistant2",
                      name: "한글로채권연구2",
                      title: "글로벌채권연구담당자",
                      children: [
                        {
                          id: "global-bond-research-staff3",
                          name: "정글로채권연구직원3",
                          title: "글로벌채권연구직원"
                        },
                        {
                          id: "global-bond-research-staff4",
                          name: "송글로채권연구직원4",
                          title: "글로벌채권연구직원"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "global-bond-trading",
                  name: "정거래",
                  title: "글로벌채권거래팀장",
                  children: [
                    {
                      id: "global-bond-trading-assistant1",
                      name: "박글로채권거래1",
                      title: "글로벌채권거래담당자",
                      children: [
                        {
                          id: "global-bond-trading-staff1",
                          name: "김글로채권거래직원1",
                          title: "글로벌채권거래직원"
                        },
                        {
                          id: "global-bond-trading-staff2",
                          name: "이글로채권거래직원2",
                          title: "글로벌채권거래직원"
                        }
                      ]
                    },
                    {
                      id: "global-bond-trading-assistant2",
                      name: "한글로채권거래2",
                      title: "글로벌채권거래담당자",
                      children: [
                        {
                          id: "global-bond-trading-staff3",
                          name: "정글로채권거래직원3",
                          title: "글로벌채권거래직원"
                        },
                        {
                          id: "global-bond-trading-staff4",
                          name: "송글로채권거래직원4",
                          title: "글로벌채권거래직원"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "ldi-head",
              name: "김삼일",
              title: "LDI 운용본부장",
              children: [
                {
                  id: "ldi-strategy",
                  name: "박전략",
                  title: "LDI전략팀장",
                  children: [
                    {
                      id: "ldi-strategy-assistant1",
                      name: "박LDI전략1",
                      title: "LDI전략담당자",
                      children: [
                        {
                          id: "ldi-strategy-staff1",
                          name: "김LDI전략직원1",
                          title: "LDI전략직원"
                        },
                        {
                          id: "ldi-strategy-staff2",
                          name: "이LDI전략직원2",
                          title: "LDI전략직원"
                        }
                      ]
                    },
                    {
                      id: "ldi-strategy-assistant2",
                      name: "한LDI전략2",
                      title: "LDI전략담당자",
                      children: [
                        {
                          id: "ldi-strategy-staff3",
                          name: "정LDI전략직원3",
                          title: "LDI전략직원"
                        },
                        {
                          id: "ldi-strategy-staff4",
                          name: "송LDI전략직원4",
                          title: "LDI전략직원"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "ldi-implementation",
                  name: "정실행",
                  title: "LDI실행팀장",
                  children: [
                    {
                      id: "ldi-implementation-assistant1",
                      name: "박LDI실행1",
                      title: "LDI실행담당자",
                      children: [
                        {
                          id: "ldi-implementation-staff1",
                          name: "김LDI실행직원1",
                          title: "LDI실행직원"
                        },
                        {
                          id: "ldi-implementation-staff2",
                          name: "이LDI실행직원2",
                          title: "LDI실행직원"
                        }
                      ]
                    },
                    {
                      id: "ldi-implementation-assistant2",
                      name: "한LDI실행2",
                      title: "LDI실행담당자",
                      children: [
                        {
                          id: "ldi-implementation-staff3",
                          name: "정LDI실행직원3",
                          title: "LDI실행직원"
                        },
                        {
                          id: "ldi-implementation-staff4",
                          name: "송LDI실행직원4",
                          title: "LDI실행직원"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "direct-support",
          name: "직할지원",
          title: "직할지원",
          children: [
            {
              id: "digital-head",
              name: "류선호",
              title: "디지털관리본부장",
              children: [
                {
                  id: "digital-strategy",
                  name: "박전략",
                  title: "디지털전략팀장",
                  children: [
                    {
                      id: "digital-strategy-assistant1",
                      name: "박디지털전략1",
                      title: "디지털전략담당자",
                      children: [
                        {
                          id: "digital-strategy-staff1",
                          name: "김디지털전략직원1",
                          title: "디지털전략직원"
                        },
                        {
                          id: "digital-strategy-staff2",
                          name: "이디지털전략직원2",
                          title: "디지털전략직원"
                        }
                      ]
                    },
                    {
                      id: "digital-strategy-assistant2",
                      name: "한디지털전략2",
                      title: "디지털전략담당자",
                      children: [
                        {
                          id: "digital-strategy-staff3",
                          name: "정디지털전략직원3",
                          title: "디지털전략직원"
                        },
                        {
                          id: "digital-strategy-staff4",
                          name: "송디지털전략직원4",
                          title: "디지털전략직원"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "digital-infrastructure",
                  name: "정인프라",
                  title: "디지털인프라팀장",
                  children: [
                    {
                      id: "digital-infrastructure-assistant1",
                      name: "박디지털인프라1",
                      title: "디지털인프라담당자",
                      children: [
                        {
                          id: "digital-infrastructure-staff1",
                          name: "김디지털인프라직원1",
                          title: "디지털인프라직원"
                        },
                        {
                          id: "digital-infrastructure-staff2",
                          name: "이디지털인프라직원2",
                          title: "디지털인프라직원"
                        }
                      ]
                    },
                    {
                      id: "digital-infrastructure-assistant2",
                      name: "한디지털인프라2",
                      title: "디지털인프라담당자",
                      children: [
                        {
                          id: "digital-infrastructure-staff3",
                          name: "정디지털인프라직원3",
                          title: "디지털인프라직원"
                        },
                        {
                          id: "digital-infrastructure-staff4",
                          name: "송디지털인프라직원4",
                          title: "디지털인프라직원"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "compliance-head",
              name: "한서준",
              title: "컴플라이언스본부장",
              children: [
                {
                  id: "compliance-monitoring",
                  name: "박모니터",
                  title: "준법감시모니터링팀장",
                  children: [
                    {
                      id: "compliance-monitoring-assistant1",
                      name: "박준법모니터1",
                      title: "준법감시모니터링담당자",
                      children: [
                        {
                          id: "compliance-monitoring-staff1",
                          name: "김준법모니터직원1",
                          title: "준법감시모니터링직원"
                        },
                        {
                          id: "compliance-monitoring-staff2",
                          name: "이준법모니터직원2",
                          title: "준법감시모니터링직원"
                        }
                      ]
                    },
                    {
                      id: "compliance-monitoring-assistant2",
                      name: "한준법모니터2",
                      title: "준법감시모니터링담당자",
                      children: [
                        {
                          id: "compliance-monitoring-staff3",
                          name: "정준법모니터직원3",
                          title: "준법감시모니터링직원"
                        },
                        {
                          id: "compliance-monitoring-staff4",
                          name: "송준법모니터직원4",
                          title: "준법감시모니터링직원"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "compliance-policy",
                  name: "정정책",
                  title: "준법감시정책팀장",
                  children: [
                    {
                      id: "compliance-policy-assistant1",
                      name: "박준법정책1",
                      title: "준법감시정책담당자",
                      children: [
                        {
                          id: "compliance-policy-staff1",
                          name: "김준법정책직원1",
                          title: "준법감시정책직원"
                        },
                        {
                          id: "compliance-policy-staff2",
                          name: "이준법정책직원2",
                          title: "준법감시정책직원"
                        }
                      ]
                    },
                    {
                      id: "compliance-policy-assistant2",
                      name: "한준법정책2",
                      title: "준법감시정책담당자",
                      children: [
                        {
                          id: "compliance-policy-staff3",
                          name: "정준법정책직원3",
                          title: "준법감시정책직원"
                        },
                        {
                          id: "compliance-policy-staff4",
                          name: "송준법정책직원4",
                          title: "준법감시정책직원"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "security-head",
              name: "김정보",
              title: "정보보호본부장",
              children: [
                {
                  id: "security-strategy",
                  name: "박전략",
                  title: "정보보호전략팀장",
                  children: [
                    {
                      id: "security-strategy-assistant1",
                      name: "박보안전략1",
                      title: "정보보호전략담당자",
                      children: [
                        {
                          id: "security-strategy-staff1",
                          name: "김보안전략직원1",
                          title: "정보보호전략직원"
                        },
                        {
                          id: "security-strategy-staff2",
                          name: "이보안전략직원2",
                          title: "정보보호전략직원"
                        }
                      ]
                    },
                    {
                      id: "security-strategy-assistant2",
                      name: "한보안전략2",
                      title: "정보보호전략담당자",
                      children: [
                        {
                          id: "security-strategy-staff3",
                          name: "정보안전략직원3",
                          title: "정보보호전략직원"
                        },
                        {
                          id: "security-strategy-staff4",
                          name: "송보안전략직원4",
                          title: "정보보호전략직원"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "security-operations",
                  name: "정운영",
                  title: "정보보호운영팀장",
                  children: [
                    {
                      id: "security-operations-assistant1",
                      name: "박보안운영1",
                      title: "정보보호운영담당자",
                      children: [
                        {
                          id: "security-operations-staff1",
                          name: "김보안운영직원1",
                          title: "정보보호운영직원"
                        },
                        {
                          id: "security-operations-staff2",
                          name: "이보안운영직원2",
                          title: "정보보호운영직원"
                        }
                      ]
                    },
                    {
                      id: "security-operations-assistant2",
                      name: "한보안운영2",
                      title: "정보보호운영담당자",
                      children: [
                        {
                          id: "security-operations-staff3",
                          name: "정보안운영직원3",
                          title: "정보보호운영직원"
                        },
                        {
                          id: "security-operations-staff4",
                          name: "송보안운영직원4",
                          title: "정보보호운영직원"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
]

// 임원 선택 옵션 (조직도 기반)
export const executiveOptions = [
  { id: "all", name: "전체 보기", position: "" },
  { id: "chairman001", name: "박이사", position: "이사회 의장" },
  { id: "ceo001", name: "김대표", position: "대표이사" }
] 