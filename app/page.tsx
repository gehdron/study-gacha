"use client"

import dynamic from 'next/dynamic';

export default function Home(){
  const RoomScene = dynamic(() => import('@/components/roomScene'), { ssr: false });

  return(
    <RoomScene />
  )
}