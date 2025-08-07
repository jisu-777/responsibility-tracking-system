"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

import Image from 'next/image';
import NavDropdown from './NavDropdown'

interface NavItem {
  name: string
  path: string
  subItems?: { name: string; path: string }[]
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { name: "대시보드", path: "/" ,
     
    },

   
    { name: "임원관리", path: "/executive" ,
      subItems: [
        { name: "임원 책무관리", path: "/executive/" },     
        { name: "임원 Master", path: "/executive/master" },  
        { name: "임원상세", path: "/executive/detail" },    
        { name: "신규등록", path: "/executive/register" },  
      ],
    },
    { name: "책무문서", path: "/responsibility",
      subItems: [
      { name: "책무체계도", path: "/responsibility"
       },
      { name: "책무기술서", path: "/responsibility/doc" },
    
    ] },

    { name: "관리조치", path: "/management" ,
      subItems: [

        { name: "관리조치 현황조회", path: "/management" },     
        { name: "관리조치 이행점검", path: "/management/check" },  
        
      ],
    },
    { 
      name: "책무관리", 
      path: "/responsibility_management",
      
    },


   
  ]

  const handleNavClick = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  const isCurrentPage = (path: string) => {
    if (path === "/dashboard" && pathname === "/") return true
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brandGrey-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full px-4 ">
        <div className="flex h-14 items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavClick("/")}>
            <div className="pt-1">
          <Image
              src="/images/logo_v2.png"
              alt="Logo"
              width={70}
              height={60}
            />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl  font-semibold text-gray-900 pb-1">책무관리시스템</h1>
              
            </div>
            
            
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden lg:flex items-center gap-7 text-black">
            {navItems.map((item) => (
              item.subItems ? (
                <NavDropdown
                  key={item.name}
                  name={item.name}
                  path={item.path}
                  subItems={item.subItems}
                  isCurrentPage={isCurrentPage}
                  onNavClick={handleNavClick}
                />
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`underline-hover text-lg font-medium ${
                    isCurrentPage(item.path) ? 'active font-semibold' : ""
                  }`}
                >
                  <span className="hidden xl:inline">{item.name}</span>
                </button>
              )
            ))}
          </nav>



         
        </div>
      </div>
    </header>
  )
}