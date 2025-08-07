"use client"

import React, { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, ChevronLeft, Menu, X, LayoutDashboard, Users, FileText, Settings, ClipboardList } from 'lucide-react'
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  path: string
  icon: any
  subItems?: { name: string; path: string }[]
}

export default function ImprovedSidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      name: "대시보드",
      path: "/",
      icon: LayoutDashboard,
      subItems: [
        { name: "임원대시보드", path: "/dashboard/executive" },
        { name: "전사대시보드", path: "/dashboard/company" },
      ]
    },
    {
      name: "임원관리",
      path: "/executive",
      icon: Users,
      subItems: [
        { name: "임원 책무관리", path: "/executive/" },
        { name: "임원 Master", path: "/executive/master" },
        { name: "임원상세", path: "/executive/detail" },
        { name: "신규등록", path: "/executive/register" },
      ],
    },
    {
      name: "책무문서",
      path: "/responsibility",
      icon: FileText,
      subItems: [
        { name: "책무체계도", path: "/responsibility" },
        { name: "책무기술서", path: "/responsibility/doc" },
      ]
    },
    {
      name: "관리조치",
      path: "/management",
      icon: ClipboardList,
      subItems: [
        { name: "관리조치 현황조회", path: "/management" },
        { name: "관리조치 이행점검", path: "/management/check" },
      ],
    },
    {
      name: "책무관리",
      path: "/responsibility_management",
      icon: Settings,
      subItems: [
        { name: "책무 현황", path: "/responsibility_management/status" },
        { name: "책무 설정", path: "/responsibility_management/settings" },
      ]
    },
  ]

  const handleNavClick = (path: string) => {
    router.push(path)
  }

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    )
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const isCurrentPage = (path: string) => {
    if (path === "/" && pathname === "/") return true
    return pathname === path
  }

  const isSubItemActive = (subItems: { name: string; path: string }[]) => {
    return subItems.some(subItem => isCurrentPage(subItem.path))
  }

  return (
    <div className={cn(
      "sticky top-0 h-[calc(100vh-48px)] bg-white flex flex-col transition-all duration-300 ease-in-out z-10 relative border-r border-slate-200/60 shadow-sm flex-shrink-0",
      isCollapsed ? 'w-16' : 'w-72'
    )}>
      

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-brand-500/60 hover:bg-brand-500  rounded-full hover:shadow-lg transition-all duration-200 flex items-center justify-center group hover:border-brand-400 z-20"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-white group-hover:text-white hover:scale-110 transition-all duration-200" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-white group-hover:text-white hover:scale-110 transition-all duration-200" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0
            const isExpanded = expandedItems.includes(item.name)
            const isActive = isCurrentPage(item.path) || (hasSubItems && isSubItemActive(item.subItems!))

            return (
              <li key={item.name}>
                {hasSubItems ? (
                  <div>
                    {/* Main Menu Item */}
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 group",
                        isActive
                          ? 'bg-gradient-to-r from-blue-50 to-blue-50/50 text-blue-700 shadow-sm border border-blue-100'
                          : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                      )}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <div className={cn(
                        "flex items-center transition-all duration-200",
                        isCollapsed ? 'justify-center' : 'gap-3'
                      )}>
                        <div className={cn(
                          "flex items-center justify-center rounded-lg transition-all duration-200",
                          isCollapsed ? "w-8 h-8" : "w-7 h-7",
                          isActive 
                            ? "bg-blue-100 text-blue-600" 
                            : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                        )}>
                          {React.createElement(item.icon, { 
                            className: isCollapsed ? "w-4 h-4" : "w-3.5 h-3.5" 
                          })}
                        </div>
                        {!isCollapsed && (
                          <span className="font-medium text-sm whitespace-nowrap">
                            {item.name}
                          </span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <div className={cn(
                          "transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      )}
                    </button>

                    {/* Sub Menu Items */}
                    {isExpanded && !isCollapsed && (
                      <div className="mt-1 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {item.subItems!.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={() => handleNavClick(subItem.path)}
                            className={cn(
                              "w-full text-left p-2.5 rounded-lg text-sm transition-all duration-200 relative",
                              isCurrentPage(subItem.path)
                                ? 'bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500 pl-4'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-2 border-transparent hover:border-slate-200 pl-4'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <div className={cn(
                                "w-1.5 h-1.5 rounded-full transition-colors duration-200",
                                isCurrentPage(subItem.path) 
                                  ? "bg-blue-500" 
                                  : "bg-slate-300"
                              )} />
                              <span className="whitespace-nowrap">{subItem.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Single Menu Item */
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={cn(
                      "w-full text-left p-3 rounded-xl transition-all duration-200 group",
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-blue-50/50 text-blue-700 shadow-sm border border-blue-100'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <div className={cn(
                      "flex items-center transition-all duration-200",
                      isCollapsed ? 'justify-center' : 'gap-3'
                    )}>
                      <div className={cn(
                        "flex items-center justify-center rounded-lg transition-all duration-200",
                        isCollapsed ? "w-8 h-8" : "w-7 h-7",
                        isActive 
                          ? "bg-blue-100 text-blue-600" 
                          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                      )}>
                        {React.createElement(item.icon, { 
                          className: isCollapsed ? "w-4 h-4" : "w-3.5 h-3.5" 
                        })}
                      </div>
                      {!isCollapsed && (
                        <span className="font-medium text-sm whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                    </div>
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      
    
    </div>
  )
}