"use client";

import { useState } from "react";
import InstagramFeed from "../components/sections/home/InstagramFeed";
import AboutUsSection from "../components/sections/home/AboutUsSection";
import WorksSection from "../components/sections/home/WorksSection";
import ContactFooter from "../components/sections/home/ContactFooter";
import HeroSection from "../components/sections/home/HeroSection";
import IshikawaMap from "../components/sections/home/IshikawaMap";

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // main photo が有効に表示されているか（HeroSection からコールバックで受け取る）
    const [hasMainPhoto, setHasMainPhoto] = useState(null);
    const [isHeroVisible, setIsHeroVisible] = useState(false);

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
        .soft-spot { opacity: .35; }
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
            <HeroSection isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onLoaded={setHasMainPhoto} onHeroVisible={setIsHeroVisible} />
            {/* Content sections that will overlay the fixed image when scrolled */}
            <div className="relative z-40 bg-white">
                {/* 石川県の思い出マップ */}
                <div className="bg-white">
                    <IshikawaMap />
                </div>
                {/* わたしたちのこと */}
                <AboutUsSection showToTop={hasMainPhoto === false} hideWhenHeroVisible={isHeroVisible} />
                {/* インスタグラムフィード */}
                <div className="bg-white">
                    <InstagramFeed showToTop={hasMainPhoto === false} hideWhenHeroVisible={isHeroVisible} />
                </div>
                {/* 夫のつぶやき */}
                <WorksSection showToTop={hasMainPhoto === false} hideWhenHeroVisible={isHeroVisible} />
                {/* Contact Footer */}
                <ContactFooter />
            </div>
        </div>
    );
}
