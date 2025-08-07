"use client"

import { useState, useEffect } from "react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // 스크롤 위치 감지
  useEffect(() => {
    const toggleVisibility = () => {
      // window 스크롤과 메인 콘텐츠 스크롤 모두 확인
      const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const mainElement = document.querySelector('main')
      const mainScrollTop = mainElement ? mainElement.scrollTop : 0
      
      // 둘 중 하나라도 300px 이상 스크롤되면 버튼 표시
      setIsVisible(windowScrollTop > 300 || mainScrollTop > 300)
    }

    // 초기 상태 확인
    toggleVisibility()

    // window 스크롤 이벤트 리스너
    window.addEventListener("scroll", toggleVisibility, { passive: true })
    
    // 메인 콘텐츠 스크롤 이벤트 리스너
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.addEventListener("scroll", toggleVisibility, { passive: true })
    }
    
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      if (mainElement) {
        mainElement.removeEventListener("scroll", toggleVisibility)
      }
    }
  }, [])

  // 맨 위로 스크롤
  const scrollToTop = () => {
    // 메인 콘텐츠가 스크롤 가능한지 확인
    const mainElement = document.querySelector('main')
    if (mainElement && mainElement.scrollTop > 0) {
      // 메인 콘텐츠를 맨 위로 스크롤
      mainElement.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    } else {
      // window를 맨 위로 스크롤
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
    
    // 스크롤 완료 후 상태 업데이트를 위한 타이머
    setTimeout(() => {
      const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const mainElement = document.querySelector('main')
      const mainScrollTop = mainElement ? mainElement.scrollTop : 0
      setIsVisible(windowScrollTop > 300 || mainScrollTop > 300)
    }, 100)
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            width: isHovered ? '120px' : '50px',
            height: '50px',
            borderRadius: isHovered ? '50px' : '50%',
            backgroundColor: isHovered ? '#FE7C39' : 'rgb(76, 74, 74)',
            border: 'none',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 0px 0px 4px rgba(253, 81, 8, 0.253)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            overflow: 'hidden',
            padding: '0'
          }}
          aria-label="맨 위로 이동"
        >
          <svg 
            style={{
              width: '20px',
              height: '20px',
              transition: 'all 0.3s',
              transform: isHovered ? 'translateY(-200%)' : 'translateY(0)'
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* 귀여운 화살표 아이콘 */}
            <path d="M12 19V5" stroke="white" strokeWidth="2"/>
            <path d="M5 12L12 5L19 12" stroke="white" strokeWidth="2"/>
          </svg>
          <span style={{
            position: 'absolute',
            bottom: isHovered ? 'auto' : '-20px',
            color: 'white',
            fontSize: isHovered ? '16px' : '0px',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.3s',
            lineHeight: '1.2',
            padding: isHovered ? '8px 12px' : '0px'
          }}>
            위로가기
          </span>
        </button>
      )}
    </>
  )
} 