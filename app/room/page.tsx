"use client"

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export default function Home(){
  const RoomScene = dynamic(() => import('@/components/roomScene'), { ssr: false });

  return(
    <Suspense fallback={<div className="w-screen h-screen flex items-center justify-center">Loading room...</div>}>
      <RoomScene />
    </Suspense>
    
  )
}