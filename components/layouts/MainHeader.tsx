"use client"

import { Bell, User, LogIn } from "lucide-react"
import Image from 'next/image'

export default function MainHeader() {
  return (
    <header className="h-12 bg-black/80 backdrop-blur-sm border-b border-gray-700 px-6 flex items-center justify-between z-20">
      {/* 왼쪽 영역 */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/logo_v2.png"
          alt="Logo"
          width={50}
          height={44}
        />
        <h1 className="text-xl font-semibold text-white">책무관리시스템</h1>
      </div>

      {/* 오른쪽 영역 - 아이콘들 */}
      <div className="flex items-center gap-4">
        {/* 로그인 아이콘 */}
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <LogIn className="w-5 h-5 text-white" />
        </button>

        {/* 알림 아이콘 */}
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors relative">
          <Bell className="w-5 h-5 text-white" />
          {/* 알림 뱃지 */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* 사용자 아이콘 */}
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <User className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  )
} 