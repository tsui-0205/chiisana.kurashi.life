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
    const [hasMainPhoto, setHasMainPhoto] = useState(null);
    const [isHeroVisible, setIsHeroVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    return (
        <div className="bg-white text-zinc-800 relative">
            {/* SEO: Main heading - visually hidden but accessible to search engines */}
            <h1 className="sr-only">わたしと夫の小さな暮らし - つい。石川県で暮らす夫婦の日常ブログ</h1>
            <HeroSection isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onLoaded={setHasMainPhoto} onHeroVisible={setIsHeroVisible} />
            {/* Content sections that will overlay the fixed image when scrolled */}
            <div className="relative z-40 bg-white">
                {/* 石川県の思い出マップ */}
                <div className="bg-white mb-12 md:mb-0">
                    <IshikawaMap />
                </div>
                {/* わたしたちのこと */}
                <AboutUsSection showToTop={hasMainPhoto === false} hideWhenHeroVisible={isHeroVisible} />
                {/* インスタグラムフィード */}
                <div className="bg-white">
                    <InstagramFeed showToTop={hasMainPhoto === false} hideWhenHeroVisible={isHeroVisible} />
                </div>
                {/* 夫のつぶやき */}
                <div className="mb-0">
                    <WorksSection showToTop={hasMainPhoto === false} hideWhenHeroVisible={isHeroVisible} />
                </div>
                {/* Contact Footer */}
                <ContactFooter />
            </div>
        </div>
    );
}
