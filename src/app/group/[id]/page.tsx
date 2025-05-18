"use client"
import { useParams } from 'next/navigation';
import React from 'react'

const Page = () => {
  const { id } = useParams();
  //TODO: idを使ってAPIからデータを取得する
  return (
    <div>{id}のページ</div>
  )
}

export default Page