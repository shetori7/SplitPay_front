"use client"
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/apiFetch';
import { Group } from '@/domain/group';
import React from 'react'

const Page = () => {
  const { id } = useParams();
  const [group, setGroup] = useState<Group>();
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [targetIds, setTargetIds] = useState<number[]>(group?.Users.map(u => u.user_id) ?? []);
  const [amount, setAmount] = React.useState<number | "">("");
  const [purpose, setPurpose] = useState("");

  const handleTargetCheck = (id: number) => {
    setTargetIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    // グループ情報を取得
    apiFetch<Group>(`/group/getInfo?groupUuId=${id}`)
      .then(data => setGroup(data))
      .catch(error => console.error("Error fetching group data:", error));
  }, [id]);

  useEffect(() => {
    if (group && group.Users.length > 0 && selected === undefined) {
      setSelected(group.Users[0].user_id);
    }
  }, [group, selected]);

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8 text-gray-700">

      <h1 className="text-2xl font-bold mb-4">グループ: {group?.group_name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <label htmlFor="dropdown">払ってくれた人：</label>
        <select
          id="dropdown"
          value={selected ?? ""}
          onChange={e => setSelected(Number(e.target.value))}
          className="border rounded p-2"
        >
          {group?.Users.map((member, index) => (
            <option key={index} value={member.user_id}>
              {member.user_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="支払いの用途"
          className="border rounded p-2 w-full"
          value={purpose}
          onChange={e => setPurpose(e.target.value)}
        />
        <label className="block mb-2">支払い対象者：</label>
          {group?.Users.map((member, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`target-${member.user_id}`}
                value={member.user_id}
                checked={targetIds.includes(member.user_id)}
                onChange={() => handleTargetCheck(member.user_id)}
                className="mr-2"
              />
              <label htmlFor={`target-${member.user_id}`} className="text-gray-800">
                {member.user_name}
              </label>
            </div>
          ))}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
            <input
              type="number"
              className="pl-7 border rounded p-2"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
            />
          </div>
          <button
            onClick={async () => {
              try {
                await apiFetch("/payment/new", {
                  method: "POST",
                  body: JSON.stringify({
                    group_uuid: id,
                    payer_id: selected,
                    amount:amount,
                    participants_ids: targetIds,
                  }),
                });
                // 必要に応じて画面遷移やメッセージ表示
              } catch (error) {
                console.error("Error sending payment data:", error);
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            支払う
          </button>
      </div>
      <button
        onClick={() => window.history.back()}
        className=" bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg"
      >
        戻る
      </button>
      
    </div>


  );
}

export default Page