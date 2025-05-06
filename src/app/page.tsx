import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200">
        Sogen Admin
      </div>
      <div className="flex flex-col items-center gap-4">
        <Link href="/register" className="text-blue-500 hover:underline">
          はじめる
        </Link>
      </div>
    </div>
  );
}
