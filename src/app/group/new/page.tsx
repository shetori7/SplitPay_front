'use client';
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { XMarkIcon } from "@heroicons/react/24/solid";
import {apiFetch} from "@/lib/apiFetch";
import { Group } from "@/domain/group"; // 追加


export default function NewGroup() {
    const router = useRouter();

    const [members, setMembers] = useState<string[]>(["あべ"]);
    const [memberInput, setMemberInput] = useState("");
    const [groupName, setGroupName] = useState(""); 

    const handleAddMember = () => {
        if (memberInput.trim() !== "") {
            setMembers([...members, memberInput.trim()]);
            setMemberInput(""); // 入力フィールドをクリア
        }
    };

    const handleRemoveMember = (index: number) => {
        setMembers(members.filter((_, i) => i !== index));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // フォームのデフォルト送信を防ぐ
        
        apiFetch<Group>("/group/new", {
            method: "POST",
            body: JSON.stringify({
                group_name: groupName, // ここに実際のグループ名を入れる
                users: members, // メンバーの配列
            }),
        })
        .then((data) => {
            console.log(groupName)
            console.log("グループ作成成功:", data);
            router.push(`/group/${data.groupUuid}`); 
        })
        .catch((error) => {
            console.error("グループ作成エラー:", error);
        });
    };
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-700">
            {/* ヘッダー */}
            <header className="w-full bg-[#7999ce] text-white py-4 px-8">
                <h1 className="text-2xl font-bold">AddPay</h1>
            </header>

            {/* メインコンテンツ */}
            <main className="flex flex-col gap-6 items-center justify-center flex-1 p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                    <label className="font-medium text-gray-600">グループ</label>
                    <input
                        type="text"
                        placeholder="グループ名"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="border border-gray-300 rounded p-2 bg-white text-black"
                    />
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-600">メンバーを追加</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="メンバー"
                                value={memberInput}
                                onChange={(e) => setMemberInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault(); // Enterキーでフォーム送信を防ぐ
                                        handleAddMember();
                                    }
                                }}
                                className="flex-1 border border-gray-300 rounded p-2 bg-white text-black"
                            />
                            <button
                                type="button"
                                onClick={handleAddMember}
                                className="bg-[#3f82f5] hover:bg-[#A0C4FF] text-gray-50 rounded px-4"
                            >
                                追加
                            </button>
                        </div>
                    </div>
                    <ul className="list-disc list-inside bg-gray-100 p-4 rounded border border-gray-300">
                        {members.map((member, index) => (
                            <li key={index} className="flex justify-between items-center">
                                {member}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveMember(index)}
                                    className="text-red-500 hover:underline"
                                >
                                    <XMarkIcon className="h-5 w-5" /> {/* バツアイコン */}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="submit"
                        className="bg-[#3f82f5] hover:bg-[#A0C4FF] text-gray-50 rounded p-2"
                    >
                        グループを作成
                    </button>
                </form>
            </main>

            {/* フッター */}
            <footer className="w-full bg-[#7999ce] text-white py-4 px-8 text-center">
                <p>© 2025 Miya Abe Eng. All rights reserved.</p>
            </footer>
        </div>
    );
}