import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-700">
      <h1 className="text-4xl font-bold mb-4">グループを作成</h1>
      <Link
        href="/group/new"
        className="bg-[#3f82f5] text-gray-50 rounded px-8 py-3 text-lg font-semibold"
      >
        はじめる
      </Link>
    </div>
  );
}