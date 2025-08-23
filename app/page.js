"use client";

import { useState } from "react";
import InstagramFeed from "../components/sections/home/InstagramFeed";
import AboutUsSection from "../components/sections/home/AboutUsSection";
import WorksSection from "../components/sections/home/WorksSection";
import ContactFooter from "../components/sections/home/ContactFooter";
import NavigationMenu from "../components/layout/NavigationMenu";

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <div className="bg-white text-zinc-800 relative">
            {/* Google Fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
        .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'; }
        .font-hand { font-family: 'Yomogi', 'Noto Sans JP', sans-serif; letter-spacing: .02em; }
        .vertical-rl { writing-mode: vertical-rl; text-orientation: upright; }
        .soft-spot { filter: blur(28px); opacity: .35; }
        @keyframes fadeInImage {
          0% { opacity: 0; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .fade-in-image { animation: fadeInImage 2s ease-out forwards; }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 1.5s ease-out 0.5s forwards; opacity: 0; }
        .fade-in-up-delay { animation: fadeInUp 1.5s ease-out 1s forwards; opacity: 0; }
      `}</style>
            {/* Hero Section with Main Photo - Fixed Background */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Main photo as fixed background */}
                <div className="fixed inset-0 w-full h-full z-0">
                    <img
                        src="/images/main.jpg"
                        alt="メイン写真"
                        className="w-full h-full object-contain fade-in-image"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                    <div className="absolute inset-0 bg-gray-300/30"></div>
                </div>
                {/* Right-side soft color blobs */}
                <div className="pointer-events-none absolute right-16 top-64 w-56 h-56 rounded-full bg-orange-100 soft-spot z-10" />
                <div className="pointer-events-none absolute right-6 top-[420px] w-72 h-72 rounded-full bg-sky-100 soft-spot z-10" />
                {/* Right: Hamburger Menu */}
                <div className="absolute top-8 right-8 z-30 hidden lg:block">
                    {/* Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className="w-10 h-10 flex flex-col justify-center items-center space-y-1.5 transition-all duration-300 group"
                        aria-label="メニューを開く"
                    >
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2 bg-zinc-700' : 'shadow-sm'}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'shadow-sm'}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-zinc-700' : 'shadow-sm'}`}></span>
                    </button>
                    {/* ナビゲーションメニュー */}
                    <NavigationMenu
                        isOpen={isMenuOpen}
                        onClose={() => setIsMenuOpen(false)}
                    />
                </div>
                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="animate-bounce text-white">
                        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                        <p className="text-sm mt-2">Scroll</p>
                    </div>
                </div>
            </section>
            {/* Content sections that will overlay the fixed image when scrolled */}
            <div className="relative z-40 bg-white">
                {/* わたしたちのこと */}
                <AboutUsSection />
                {/* 日々のこと */}
                <WorksSection />
                {/* インスタグラムフィード */}
                <div className="bg-white">
                    <InstagramFeed />
                </div>
                {/* Contact Footer */}
                <ContactFooter />
            </div>
        </div>
    );
}
