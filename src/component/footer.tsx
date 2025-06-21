import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-r from-[#6a82fb] to-[#7999ce] shadow-inner py-5 px-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#fc5c7d" />
                        <text x="12" y="16" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">A</text>
                    </svg>
                </span>
                <span className="text-xl font-extrabold tracking-tight drop-shadow-sm">AddPay</span>
            </div>
            <p className="text-sm opacity-80">© 2025 Miya Abe Eng. All rights reserved.</p>
        </footer>
    );
};

export default Footer;