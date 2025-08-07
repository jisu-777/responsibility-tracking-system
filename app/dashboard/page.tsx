"use client"

import DemoA from "@/components/dashboard/DemoA"
import DemoB from "@/components/dashboard/DemoB"
import DemoC from "@/components/dashboard/DemoC"
import DemoD from "@/components/dashboard/DemoD"
import DemoE from "@/components/dashboard/DemoE"
import DemoF from "@/components/dashboard/DemoF"
import DemoG from "@/components/dashboard/DemoG"



// 대시보드 컴포넌트들 import
import StatCard from "@/components/dashboard/StatCard"
import ChartCard from "@/components/dashboard/ChartCard"
import ProgressCard from "@/components/dashboard/ProgressCard"
import AlertCard from "@/components/dashboard/AlertCard"
import MiniChart from "@/components/dashboard/MiniChart"
import ActivityCard from "@/components/dashboard/ActivityCard"

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">대시보드 컴포넌트 테스트</h1>
      <div className="flex items-center">



     {/* 통계 카드들 */}
     <div className="flex flex-col gap-4">
        <StatCard 
          title="전채책무"
          value="10개"
          className="bg-brandGrey-50"
          image="/images/star.png"
          
       
        />
        <StatCard 
          title="임원관리활동"
          value="3"
          className="bg-brandGrey-50"
          image="/images/star.png"
          value2="10개"
        />
        <StatCard 
          title="부서내부통제"
          subtitle="기한경과/전체구성"
          value="2"
          className="bg-brandGrey-50"
          image="/images/star.png"
          value2="3개"
        />
       
      </div>
      <div className="flex">
  <DemoG />
      </div>


      </div>
      
  
      
      

      
     </div>
   )
 }

 