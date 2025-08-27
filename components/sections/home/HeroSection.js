"use client";
import React, { useEffect, useRef } from "react";
import useImageLoaded from "../../../hooks/useImageLoaded";
import NavigationMenu from "../../layout/NavigationMenu";
import ToScrollButton from "../../ui/ToScrollButton";

export default function HeroSection({ isMenuOpen, setIsMenuOpen, onLoaded, onHeroVisible }) {
    const hasMainPhoto = useImageLoaded('/images/main.jpg');
    const sectionRef = useRef(null);

    useEffect(() => {
        if (typeof onLoaded === 'function') onLoaded(hasMainPhoto);
    }, [hasMainPhoto, onLoaded]);

    useEffect(() => {
        if (!sectionRef.current) return;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const visible = entry.isIntersecting;
                    // 親へ通知
                    if (typeof onHeroVisible === 'function') onHeroVisible(visible);
                    // ルートにクラスを付与してグローバルに制御できるようにする
                    try {
                        if (visible) document.documentElement.classList.add('hero-visible');
                        else document.documentElement.classList.remove('hero-visible');
                    } catch (e) {
                        // noop
                    }
                });
            },
            { threshold: 0.5 }
        );
        obs.observe(sectionRef.current);
        return () => {
            obs.disconnect();
            try { document.documentElement.classList.remove('hero-visible'); } catch (e) { }
        };
    }, [onHeroVisible]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <section id="hero" ref={sectionRef} className="relative h-screen w-full overflow-hidden">
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

            <div className="fixed inset-0 w-full h-full z-0">
                <img
                    src="/images/main.jpg"
                    alt="メイン写真"
                    className="w-full h-full object-cover md:object-contain object-center fade-in-image"
                />
                <div className="absolute inset-0 bg-gray-300/30"></div>
            </div>

            <div className="pointer-events-none absolute right-16 top-64 w-56 h-56 rounded-full bg-orange-100 soft-spot z-10" />
            <div className="pointer-events-none absolute right-6 top-[420px] w-72 h-72 rounded-full bg-sky-100 soft-spot z-10" />

            <div className="fixed z-50 top-4 right-4 md:top-8 md:right-8">
                <button
                    onClick={toggleMenu}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex flex-col justify-center items-center space-y-1.5 transition-all duration-300 group cursor-pointer"
                    aria-label="メニューを開く"
                >
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2 bg-zinc-700' : 'shadow-sm'}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'shadow-sm'}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-zinc-700' : 'shadow-sm'}`}></span>
                </button>
            </div>
            <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="animate-bounce text-white">
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                    <p className="text-sm mt-2">Scroll</p>
                </div>
            </div>

            {hasMainPhoto && (
                <div className="absolute bottom-8 right-8 z-30">
                    <ToScrollButton href="#about" className="" />
                </div>
            )}
        </section>
    );
}
