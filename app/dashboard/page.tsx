"use client"

import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity,
  Target,
  Calendar,
  CheckCircle,
  Clock
} from "lucide-react"

// 대시보드 컴포넌트들 import
import StatCard from "@/components/dashboard/StatCard"
import ChartCard from "@/components/dashboard/ChartCard"
import ProgressCard from "@/components/dashboard/ProgressCard"
import AlertCard from "@/components/dashboard/AlertCard"
import MiniChart from "@/components/dashboard/MiniChart"
import ActivityCard from "@/components/dashboard/ActivityCard"

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">대시보드 컴포넌트 테스트</h1>
      
      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="총 매출"
          value="₩45,231,000"
          change="+20.1%"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard 
          title="신규 고객"
          value="+2,350"
          change="+180.1%"
          changeType="positive"
          icon={Users}
        />
        <StatCard 
          title="활성 사용자"
          value="+12,234"
          change="+19%"
          changeType="positive"
          icon={Activity}
        />
        <StatCard 
          title="평균 주문"
          value="₩12,234"
          change="-4.3%"
          changeType="negative"
          icon={TrendingDown}
        />
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="매출 추이"
          description="지난 12개월 매출 현황"
          value="₩45,231,000"
          change="+20.1%"
          changeType="positive"
        />
        <ChartCard 
          title="고객 성장률"
          description="월별 신규 고객 증가율"
          value="+2,350"
          change="+180.1%"
          changeType="positive"
        />
      </div>

      {/* 진행률 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressCard 
          title="목표 달성률"
          value={75}
          target={100}
          description="분기별 목표 대비"
          icon={Target}
        />
        <ProgressCard 
          title="작업 완료율"
          value={60}
          target={100}
          description="이번 주 작업 진행률"
          icon={CheckCircle}
        />
        <ProgressCard 
          title="시간 활용률"
          value={85}
          target={100}
          description="업무 시간 대비"
          icon={Clock}
        />
      </div>

      {/* 알림 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AlertCard 
          title="주의 필요"
          description="3개 작업이 마감일을 초과했습니다"
          count={3}
          type="warning"
        />
        <AlertCard 
          title="완료 예정"
          description="오늘 5개 작업이 완료 예정입니다"
          count={5}
          type="info"
        />
      </div>

             {/* 미니 차트들 */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <MiniChart 
           title="일일 방문자"
           value="1,234"
           change="+12%"
           changeType="positive"
         />
         <MiniChart 
           title="페이지뷰"
           value="45,678"
           change="+8%"
           changeType="positive"
         />
         <MiniChart 
           title="이탈률"
           value="2.3%"
           change="-1.2%"
           changeType="positive"
         />
         <MiniChart 
           title="체류시간"
           value="4m 32s"
           change="+15%"
           changeType="positive"
         />
       </div>

       {/* 활동 카드들 */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <ActivityCard 
           title="새로운 댓글"
           description="프로젝트 진행상황에 대한 피드백이 추가되었습니다."
           time="2분 전"
           user={{
             name: "김철수",
             initials: "김철",
             avatar: "/avatars/user1.jpg"
           }}
           type="comment"
           count={3}
         />
         <ActivityCard 
           title="좋아요"
           description="팀 미팅 결과가 좋아요를 받았습니다."
           time="5분 전"
           user={{
             name: "이영희",
             initials: "이영",
             avatar: "/avatars/user2.jpg"
           }}
           type="like"
           count={12}
         />
         <ActivityCard 
           title="공유"
           description="새로운 정책 문서가 공유되었습니다."
           time="10분 전"
           user={{
             name: "박민수",
             initials: "박민",
             avatar: "/avatars/user3.jpg"
           }}
           type="share"
           count={5}
         />
       </div>
     </div>
   )
 }

 