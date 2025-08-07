import Image from 'next/image'
import Card1 from '@/components/dashboard/card1'
import Card2 from '@/components/dashboard/card2'
import DemoG from '@/components/dashboard/DemoG'
import DemoGWithDescription from '@/components/dashboard/DemoGWithDescription'
import DemoF from '@/components/dashboard/DemoF'
import MultipleCards from '@/components/dashboard/MultipleCards'

export default function dashboardCompany() {
  return (
    <div className="p-6 bg-brandGrey-50 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">대시보드</h1>

      <div className='flex gap-6'>
        {/* 왼쪽: 기존 카드들 */}
        <div className="flex flex-col gap-5">
          <Card1
            title="전체 책무세부내용"
            mainValue="119개"
            backgroundColor="bg-brand-500/50 "
            icon={
              <Image
                src="/images/cute-warning-sign.png"
                alt="귀여운 경고 표지판"
                width={80}
                height={80}
                className="rounded-lg"
              />
            }
          />
          
          <Card2
            title="소관조직"
            mainValue="3개"
            backgroundColor="bg-white "
            icon={
              <Image
                src="/images/cute-warning-sign.png"
                alt="귀여운 경고 표지판"
                width={64}
                height={64}
                className="rounded-lg"
              />
            }
          />
             <Card2
            title="소관조직"
            mainValue="3개"
            backgroundColor="bg-white "
            icon={
              <Image
                src="/images/cute-warning-sign.png"
                alt="귀여운 경고 표지판"
                width={64}
                height={64}
                className="rounded-lg"
              />
            }
          />

         
        </div>

        {/* 오른쪽: 도넛 차트들 */}
        
          <div className='w-1/2'>
            <DemoG  mainTitle="전체 진행 현황"
  subtitle="전체"
  sections={[
    { value: 40, label: "완료", color: "#FD5108" },
    { value: 35, label: "진행중", color: "#DFE3E6" },
    { value: 25, label: "대기", color: "#EEEFF1" }
  ]}/>
          </div>
          <div className="flex flex-col gap-5">
            <DemoGWithDescription 
              mainTitle="책무 진행 현황"
              title1="완료"
              title2="진행중"
              title3="대기"
              description1="12개"
              description2="11개"
              description3="25개"
            />
            <DemoGWithDescription 
              mainTitle="부서별 책무 현황"
              title1="완료"
              title2="진행중"
              title3="대기"
              description1="12개"
              description2="11개"
              description3="25개"
            />
          </div>
      
      </div>
      
      {/* 하단: 게이지 차트와 여러 카드 */}
 
        <div className="flex gap-2 w-full  ">
          
         
         
          <div className='w-2/6'>
          <DemoF 
            numerator={2} 
            denominator={6}
            subtitle="기한경과 비율"
            title="임원관리활동 현황" 
            color="#FE9A5A"
          />
</div> <div className='w-1/6 '>
          <MultipleCards
            title="부서별 통계"
            cards={[
              {
                title: "인사팀",
                value: "85%"
              },
              {
                title: "재무팀", 
                value: "72%"
              },
              {
                title: "영업팀",
                value: "68%"
              }
            ]}
          /></div> <div className='w-2/6 h-full'>

          <DemoF 
            numerator={3} 
            denominator={8}
            subtitle="완료율"
            title="책무관리 현황" 
            color="#424E82"
          />
</div><div className='w-1/6'>
          <MultipleCards
            title="부서별 통계"
            cards={[
              {
                title: "인사팀",
                value: "85%"
              },
              {
                title: "재무팀", 
                value: "72%"
              },
              {
                title: "영업팀",
                value: "68%"
              }
            ]}
          /></div>
        </div>
    
     
    </div>
  )
}