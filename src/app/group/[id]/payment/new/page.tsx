"use client"
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/apiFetch';
import { Group } from '@/domain/group';
import React from 'react'

const Page = () => {
  const { id } = useParams();
  const [group, setGroup] = useState<Group>();
  
  useEffect(() => {
    // グループ情報を取得
    apiFetch<Group>(`/api/group/${id}`)
      .then(data => setGroup(data))
      .catch(error => console.error("Error fetching group data:", error));
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8 text-gray-700">
      <h1 className="text-2xl font-bold mb-4">グループ: {group?.group_name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2">メンバー一覧</h2>
        <ul className="list-disc pl-5 space-y-2">
          {group?.Users.map((member, index) => (
            <li key={index} className="text-gray-800">
              {member.user_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page