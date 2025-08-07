"use client"
import React from 'react'
import DemoA from '@/components/dashboard/DemoA'
import DemoB from '@/components/dashboard/DemoB'
import DemoC from '@/components/dashboard/DemoC'
import DemoD from '@/components/dashboard/DemoD'
import DemoE from '@/components/dashboard/DemoE'
import DemoF from '@/components/dashboard/DemoF'
import DemoG from '@/components/dashboard/DemoG'

export default function page() {
  return (
    <div>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center">
        <DemoA />
        <DemoB />
        <DemoC />
      </div>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center">
        <DemoD />
        <DemoE numerator={75} denominator={100} />
        <DemoF numerator={60} denominator={100} />
      </div>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center">
        <DemoG />
      </div>
    </div>
  )
}