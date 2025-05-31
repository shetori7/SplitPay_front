"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { PencilSquareIcon } from "@heroicons/react/24/solid";

type Payment = {
  payer: string;
  amount: number;
  description: string;
  date: string;
};

type GroupData = {
  groupName: string;
  users: string[];
  payments: Payment[];
};

const Page = () => {
  const { id } = useParams();
  const [group, setGroup] = useState<GroupData | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      localStorage.setItem("groupId", id);
    }

    // 仮のデータをセット
    setGroup({
      groupName: "テストグループ",
      users: ["山田 太郎", "佐藤 花子", "鈴木 一郎"],
      payments: [
        {
          payer: "山田 太郎",
          amount: 3000,
          description: "飲み会",
          date: "2025-05-31",
        },
        {
          payer: "佐藤 花子",
          amount: 1500,
          description: "カフェ",
          date: "2025-05-30",
        },
      ],
    });
  }, [id]);

  if (!group) {
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
          <h1 className={`text-3xl font-bold ${mainTitle}`}>{group.groupName}</h1>
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
          {group.users.map((user, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 bg-white border border-indigo-200 rounded-full px-5 py-2 shadow text-gray-700 transition 
                hover:bg-indigo-100 hover:border-indigo-400 hover:text-indigo-700"
            >
              <span className="font-medium">{user}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 立て替え記録 */}
      <div className={`${mainBg} border ${mainBorder} rounded-lg p-6 shadow-sm`}>
        <div className="flex items-center mb-4">
          <h2 className={`text-2xl font-semibold ${mainSubTitle} flex items-center`}>
            立て替え記録
          </h2>

        </div>
        {group.payments.length === 0 ? (
          <div className="text-gray-500">まだ立て替え記録がありません。</div>
        ) : (
          <ul className="space-y-1">
            {group.payments.map((p, idx) => (
              <li
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between bg-white border border-indigo-200 rounded-lg px-4 py-0.5 shadow transition hover:bg-indigo-50"
              >
                <div className="flex-1">
                  <span className="text-xl font-bold block mb-0">{p.description}</span>
                  <span className="text-sm text-gray-500">支払者: {p.payer}</span>
                </div>
                <div className="flex items-center gap-2 justify-end text-right mt-1 md:mt-0">
                  <span className="text-2xl font-extrabold text-indigo-700 tracking-wide">
                    ¥{p.amount.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    className="ml-2 p-1 rounded hover:bg-indigo-100 transition"
                    aria-label="この立て替え記録を編集"
                    onClick={() => {/* 編集処理をここに追加 */}}
                  >
                    <PencilSquareIcon className="w-5 h-5 text-indigo-500" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;