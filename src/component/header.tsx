import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-[#6a82fb] to-[#fc5c7d] shadow-lg py-5 px-10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#7999ce" />
            <text x="12" y="16" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">A</text>
          </svg>
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-sm">AddPay</h1>
      </div>
      <nav>
        <ul className="flex gap-6 text-lg font-medium">
          <li className="hover:text-[#ffe082] transition-colors cursor-pointer">ホーム</li>
          <li className="hover:text-[#ffe082] transition-colors cursor-pointer">機能</li>
          <li className="hover:text-[#ffe082] transition-colors cursor-pointer">お問い合わせ</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;