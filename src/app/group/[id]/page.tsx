"use client"
import { useParams } from 'next/navigation';
import React from 'react';
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/navigation';
import { useGroupInfo } from '@/hooks/useGroupInfo';

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { groupName, userNameList, payments, loading } = useGroupInfo(id);

  if (loading) {
    return <div className="p-8 text-gray-700">読み込み中...</div>;
  }

  // メインカラーを統一（indigo系）
  const mainBg = "bg-indigo-50";
  const mainBorder = "border-indigo-200";
  const mainTitle = "text-gray-700";
  const mainSubTitle = "text-gray-700";

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8 text-gray-700">
      {/* グループ名とメンバー一覧をまとめて表示 */}
      <div className={`${mainBg} border ${mainBorder} rounded-lg p-6 shadow-sm`}>
        <div className="flex items-center mb-4">
          <h1 className={`text-3xl font-bold ${mainTitle}`}>{groupName}</h1>
          <button
            type="button"
            className="ml-2 p-1 rounded hover:bg-indigo-100 transition"
            aria-label="グループ名を編集"
            onClick={() => {/* 編集処理をここに追加 */}}
          >
            <PencilSquareIcon className="w-6 h-6 text-indigo-500" />
          </button>
        </div>
        <h2 className={`text-lg font-semibold ${mainSubTitle} mb-2`}>メンバー</h2>
        <ul className="flex flex-wrap gap-4">
          {userNameList.map((user, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 bg-white border border-indigo-200 rounded-full px-5 py-2 shadow text-gray-700 transition 
                hover:bg-indigo-100 hover:border-indigo-400 hover:text-indigo-700"
            >
              <span className="font-medium">{user}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-6">
          {payments.length === 0 ? (
            <div className="text-gray-500">まだ立替記録がありません。</div>
          ) : (
            <ul className="space-y-2">
              {payments.map((p) => (
                <li key={p.final_payment_id} className="flex flex-col md:flex-row md:items-center justify-between bg-white border border-indigo-200 rounded-lg px-4 py-2 shadow">
                  <div className="flex-1">
                    <span className="font-bold">{p.from_user_name} → {p.to_user_name}</span>
                    <span className="ml-2 text-gray-500">支払い: </span>
                    <span className="text-indigo-700 font-bold">¥{p.amount.toLocaleString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* 立替記録のボタンを追加 */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2 bg-indigo-500 text-white font-semibold rounded-full shadow hover:bg-indigo-600 transition"
            onClick={() => {router.push(`/group/${id}/payment/new`);}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            立替記録を追加
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;