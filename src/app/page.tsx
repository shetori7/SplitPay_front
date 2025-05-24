import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-50 text-gray-700">
      <main className="flex flex-col gap-6 items-center justify-center flex-1 p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/group/new"
            className="bg-[#3f82f5] hover:bg-[#A0C4FF] text-gray-50 rounded px-8 py-3 text-lg font-semibold transition"
          >
            はじめる
          </Link>
        </div>
      </main>
    </div>
  );
}
