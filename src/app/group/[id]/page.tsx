"use client"
import { useParams } from 'next/navigation';
import React from 'react'
import { apiFetch } from '@/lib/apiFetch';
import { Group } from '@/domain/group';

const Page = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<Group | null>(null);
  //TODO: idを使ってAPIからデータを取得する
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result: Group = await apiFetch(`/group/${id}`);
        setData(result);
      } catch (error)
      {
        console.error("Error fetching data:", error);
        // エラーハンドリング
      }
    };
    fetchData();
  }, [id]);
  return (
    <>
      <div>{data ? data.groupName : "Loading..."}</div>
    </>
  )
}

export default Page