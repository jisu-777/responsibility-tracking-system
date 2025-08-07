import Image from 'next/image'
import Card1 from '@/components/dashboard/card1'
import Card2 from '@/components/dashboard/card2'
import DemoG from '@/components/dashboard/DemoG'
import DemoGWithDescription from '@/components/dashboard/DemoGWithDescription'
import DemoF from '@/components/dashboard/DemoF'
import MultipleCards from '@/components/dashboard/MultipleCards'

export default function dashboard() {  
  return (
    <div className=" mx-auto pt-6 bg-brandGrey-50 min-h-screen px-6">
      <div className="mb-8 flex justify-between items-center border-b border-b-brandGrey-200">
        <h1 className=" text-3xl font-bold text-gray-900 mb-8">전사 대시보드</h1>

        
      </div>

      <div className='flex flex-col xl:flex-row gap-6 w-full min-h-[400px]'>
        {/* 왼쪽: 기존 카드들 */}
        <div className="flex flex-col gap-5 w-full xl:w-1/4 min-h-[400px]">
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
            className="flex-[2]"
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
            className="flex-1"
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
            className="flex-1"
          />
        </div>

        {/* 오른쪽: 도넛 차트들 */}
        <div className="flex flex-col lg:flex-row gap-6 w-full xl:w-3/4 min-h-[400px]">
                     <div className='w-full lg:w-1/2 flex flex-col'>
             <div className="w-full flex-1">
              <DemoG  mainTitle="전체 진행 현황"
  subtitle="전체"
  sections={[
    { value: 40, label: "완료", color: "#FD5108" },
    { value: 35, label: "진행중", color: "#DFE3E6" },
    { value: 25, label: "대기", color: "#EEEFF1" }
  ]}/>
            </div>
            
                         {/* 새로운 카드: 3개의 div로 구성 */}
             <div className="mt-6 p-4 bg-white rounded-md w-full flex-1">
               <div className="flex gap-4 w-full h-full">
                 {/* 첫 번째 div */}
                 <div className="flex-1 w-1/3 flex flex-col items-center text-center justify-center">
                   <div className="mb-3">
                     <Image
                       src="/images/search (3).png"
                       alt="검색 아이콘"
                       width={48}
                       height={48}
                       className="rounded-lg"
                     />
                   </div>
                   <div className="text-sm font-medium text-gray-700">검색 기능</div>
                 </div>
                 
                 {/* 두 번째 div */}
                 <div className="flex-1 w-1/3 flex flex-col items-center text-center justify-center">
                   <div className="mb-3">
                     <Image
                       src="/images/search (3).png"
                       alt="검색 아이콘"
                       width={48}
                       height={48}
                       className="rounded-lg"
                     />
                   </div>
                   <div className="text-sm font-medium text-gray-700">데이터 분석</div>
                 </div>
                 
                 {/* 세 번째 div */}
                 <div className="flex-1 w-1/3 flex flex-col items-center text-center justify-center">
                   <div className="mb-3">
                     <Image
                       src="/images/search (3).png"
                       alt="검색 아이콘"
                       width={48}
                       height={48}
                       className="rounded-lg"
                     />
                   </div>
                   <div className="text-sm font-medium text-gray-700">리포트 생성</div>
                 </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full lg:w-1/2">
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
      </div>
      
      {/* 하단: 게이지 차트와 여러 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full mt-6">
        <div className='w-full'>
          <DemoF 
            numerator={2} 
            denominator={6}
            subtitle="기한경과 비율"
            title="임원관리활동 현황" 
            color="#FE9A5A"
          />
        </div>
        <div className='w-full'>
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
          />
        </div>
        <div className='w-full'>
          <DemoF 
            numerator={3} 
            denominator={8}
            subtitle="완료율"
            title="책무관리 현황" 
            color="#6B7280"
          />
        </div>
        <div className='w-full'>
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
          />
        </div>
      </div>
    </div>
  )
}