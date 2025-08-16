"use client";

import { useState } from "react";
import InstagramFeed from "./InstagramFeed";
import CoupleIntroSlider from "./CoupleIntroSlider";
import AboutUsSection from "./AboutUsSection";
import WorksSection from "./WorksSection";
import ContactFooter from "./ContactFooter";
import SectionHeader from "./SectionHeader";
import Link from "next/link";

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
        
        /* 写真のフェードインアニメーション */
        @keyframes fadeInImage {
          0% {
            opacity: 0;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .fade-in-image {
          animation: fadeInImage 2s ease-out forwards;
        }
        
        /* タイトルのフェードインアニメーション */
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 1.5s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        .fade-in-up-delay {
          animation: fadeInUp 1.5s ease-out 1s forwards;
          opacity: 0;
        }
      `}</style>

      {/* Hero Section with Main Photo - Fixed Background */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Main photo as fixed background */}
        <div className="fixed inset-0 w-full h-full z-0">
          <img
            src="/main.jpg"
            alt="メイン写真"
            className="w-full h-full object-contain fade-in-image"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Right-side soft color blobs */}
        <div className="pointer-events-none absolute right-16 top-64 w-56 h-56 rounded-full bg-orange-100 soft-spot z-10" />
        <div className="pointer-events-none absolute right-6 top-[420px] w-72 h-72 rounded-full bg-sky-100 soft-spot z-10" />

        {/* Right: Hamburger Menu */}
        <div className="absolute top-8 right-8 z-30 hidden lg:block">
          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="w-12 h-12 flex flex-col justify-center items-center space-y-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="メニューを開く"
          >
            <span className={`w-6 h-0.5 bg-zinc-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-zinc-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-zinc-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Dropdown Menu */}
          <div className={`mt-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-4'}`}>
            <nav>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#about"
                    className="block text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-zinc-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    私たちについて
                  </a>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="block text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-zinc-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ブログ
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-zinc-100"
                    title="インスタグラム"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    インスタグラム
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Hero content overlay */}
        {/* <div className="relative z-20 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-hand fade-in-up">私と夫の小さな暮らし</h1>
            <p className="text-lg md:text-xl opacity-90 font-body fade-in-up-delay">石川県で暮らす夫婦の日常</p>
          </div>
        </div> */}

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
        {/* Mobile navigation - 縦書きナビを横書きで表示 */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-zinc-200 z-20">
          <nav className="px-4 py-3">
            <ul className="flex justify-center space-x-6 text-sm">
              <li>
                <a href="#about" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                  私たちについて
                </a>
              </li>
              <li>
                <Link href="/blog" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                  ブログ
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors"
                  title="インスタグラム"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile footer scroll cue */}
        <div className="lg:hidden absolute bottom-20 left-1/2 -translate-x-1/2 text-center text-xs text-zinc-500">
          <div className="animate-bounce">Scroll</div>
        </div>

        {/* 私たちについて */}
        <AboutUsSection />

        {/* 最近の日記 */}
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
