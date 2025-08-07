"use client"

import ActivityCard from "@/components/dashboard/ActivityCard"
import StatCard from "@/components/dashboard/StatCard"
import ProgressCard from "@/components/dashboard/ProgressCard"
import MiniChart from "@/components/dashboard/MiniChart"
import ChartCard from "@/components/dashboard/ChartCard"
import AlertCard from "@/components/dashboard/AlertCard"
import Segmentation from "@/components/dashboard/Segmentation"
import Satisfaction from "@/components/dashboard/Satisfaction"
import { Users, Target, TrendingUp, Activity } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">대시보드</h1>
          <p className="text-gray-600">오늘의 활동과 성과를 확인하세요</p>
        </div>
        
        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="총 임원 수"
            value="24"
            change="+12%"
            changeType="positive"
            icon={Users}
          />
          <StatCard 
            title="목표 달성률"
            value="78%"
            change="+5%"
            changeType="positive"
            icon={Target}
          />
          <StatCard 
            title="평균 성과"
            value="85"
            change="-2%"
            changeType="negative"
            icon={TrendingUp}
          />
          <StatCard 
            title="활동 수"
            value="156"
            change="+23%"
            changeType="positive"
            icon={Activity}
          />
        </div>

        {/* 차트 및 진행률 카드들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard 
            title="월별 성과 추이"
            description="이번 달 성과 현황을 확인하세요"
            value="85.2%"
            change="+12.5%"
            changeType="positive"
          />
          <ProgressCard 
            title="분기별 목표"
            value={78}
            target={90}
            description="3분기 목표 달성률"
            icon={Target}
          />
        </div>

        {/* 새로운 컴포넌트들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Segmentation />
          <Satisfaction />
        </div>

        {/* 미니 차트들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MiniChart 
            title="주간 활동"
            value="45"
            change="+8%"
            changeType="positive"
          />
          <MiniChart 
            title="월간 성과"
            value="92"
            change="+15%"
            changeType="positive"
          />
          <MiniChart 
            title="평균 점수"
            value="87"
            change="-3%"
            changeType="negative"
          />
        </div>

        {/* 알림 및 활동 카드들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <AlertCard 
              title="주의가 필요한 항목"
              description="3개의 책임 항목이 마감일을 초과했습니다."
              count={3}
              type="warning"
            />
            <AlertCard 
              title="이번 주 일정"
              description="5개의 새로운 활동이 예정되어 있습니다."
              count={5}
              type="info"
            />
          </div>
          
          <div className="space-y-4">
            <ActivityCard 
              title="새로운 책임 등록"
              description="김철수님이 새로운 책임을 등록했습니다."
              time="2시간 전"
              user={{
                name: "김철수",
                avatar: undefined,
                initials: "김"
              }}
              type="comment"
              count={5}
            />
            <ActivityCard 
              title="목표 달성 축하"
              description="이영희님이 분기 목표를 달성했습니다."
              time="4시간 전"
              user={{
                name: "이영희",
                avatar: undefined,
                initials: "이"
              }}
              type="like"
              count={12}
            />
           
          </div>
        </div>
      </div>
    </div>
  )
}
