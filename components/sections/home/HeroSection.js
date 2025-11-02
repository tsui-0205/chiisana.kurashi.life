"use client";
import React, { useEffect, useRef } from "react";
import useImageLoaded from "../../../hooks/useImageLoaded";
import NavigationMenu from "../../layout/NavigationMenu";

export default function HeroSection({ isMenuOpen, setIsMenuOpen, onLoaded, onHeroVisible }) {
    const hasMainPhoto = useImageLoaded('/images/main.jpg');
    const sectionRef = useRef(null);
    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    // フォントをプリロード
    useEffect(() => {
        if (typeof document !== 'undefined' && 'fonts' in document) {
            Promise.all([
                document.fonts.load('400 16px "Noto Sans JP"'),
                document.fonts.load('400 16px "Yomogi"'),
                // YasashisaGothicはファイルが配置されたら有効化
                // document.fonts.load('400 16px "YasashisaGothic"'),
            ]).then(() => setFontsLoaded(true))
              .catch(() => setFontsLoaded(true)); // エラーでも続行
        } else {
            setFontsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (typeof onLoaded === 'function') onLoaded(hasMainPhoto && fontsLoaded);
    }, [hasMainPhoto, fontsLoaded, onLoaded]);

    useEffect(() => {
        const currentRef = sectionRef.current;
        if (!currentRef) return;
        
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
        
        obs.observe(currentRef);
        
        return () => {
            try {
                obs.disconnect();
                document.documentElement.classList.remove('hero-visible');
            } catch (e) {
                // noop
            }
        };
    }, [onHeroVisible]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // wave animation timing control
    const waveStagger = 0.15; // seconds between each character start
    const waveDuration = 1.5; // must match CSS animation duration
    const firstText = "きまっし";
    const secondText = "みまっし";
    const firstLastDelay = (Math.max(0, firstText.length - 1) * waveStagger);
    const secondOffset = firstLastDelay + waveDuration + 0.15; // small gap after first finishes

    return (
        <section id="hero" ref={sectionRef} className="relative h-screen w-full overflow-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
        /* Yasashisa Gothic: フォントファイルを public/fonts/yasashisa-gothic.woff2 に配置後、以下のコメントを外してください
        @font-face {
            font-family: 'YasashisaGothic';
            src: url('/fonts/yasashisa-gothic.woff2') format('woff2');
            font-weight: 400 900;
            font-style: normal;
            font-display: swap;
        }
        */
    :root{ --letter-spacing: 0.06em; --font-size: clamp(40px, 9vw, 96px); --stroke-width: 10px; --slash-tilt: 35deg; }
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
        /* オーバーレイテキスト */
        .center-text {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: var(--font-size);
            font-weight: 700;
            color: #fff;
            text-align: center;
            line-height: 1.05;
            letter-spacing: var(--letter-spacing);
            font-family: 'Zen Maru Gothic', 'Noto Sans JP', sans-serif;
            pointer-events: none;
            text-shadow: 0 2px 16px rgba(0,0,0,.35);
            white-space: nowrap;
            /* Android対策: 強制的に新しいレイヤーを作成して描画を保証 */
            will-change: transform;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform-style: preserve-3d;
            -webkit-transform-style: preserve-3d;
        }
        @media (max-width: 640px) {
            /* スマホでも文字のインパクトを保持 */
            .center-text { 
                font-size: calc(var(--font-size) * 1.0); 
                top: 45%; 
                left: 50%;
                transform: translate(-50%, -50%);
                line-height: 0.95;
                letter-spacing: 0.04em;
            }
        }
        @media (max-width: 480px) {
            /* 極小画面でも十分な迫力を保つ */
            .center-text { 
                font-size: calc(var(--font-size) * 0.9); 
                top: 45%; 
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

    /* 斜めスラッシュ（長めで急角度） */
    .slash { 
        position: absolute; 
        top: 46%; 
        width: 12vw; 
        max-width: 280px; 
        height: var(--stroke-width); 
        background: #fff; 
        border-radius: 999px; 
        transform-origin: center; 
        opacity: .95;
        /* Android対策: レイヤー描画を強制 */
        will-change: transform;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;
        z-index: 20;
        pointer-events: none;
    }
    /* 左右とも center 基準で文字から十分離れた位置に配置 */
    .slash.left { 
        left: 50%; 
        transform: translate(-320%, -75%) rotate(var(--slash-tilt)) translateZ(0);
    }
    .slash.right { 
        left: 50%; 
        transform: translate(220%, -75%) rotate(calc(var(--slash-tilt) * -1)) translateZ(0);
    }
    @media (max-width: 768px){ 
        .slash { width: 15vw; max-width: 180px; top: 46%; }
        /* move slashes further out on tablet */
        .slash.left { 
            transform: translate(-260%, -70%) rotate(var(--slash-tilt)) translateZ(0);
        }
        /* push the right slash further out for better spacing */
        .slash.right { 
            transform: translate(200%, -70%) rotate(calc(var(--slash-tilt) * -1)) translateZ(0);
        }
    }
    @media (max-width: 520px){ 
        .slash { width: 20vw; max-width: 120px; top: 46%; }
        /* move slashes further out on small screens */
        .slash.left { 
            transform: translate(-220%, -65%) rotate(30deg) translateZ(0);
        }
        /* increase right translation to separate from text */
        .slash.right { 
            transform: translate(140%, -65%) rotate(-30deg) translateZ(0);
        }
    }

        .bottom-right-text {
            position: absolute;
            bottom: 5%;
            right: 4%;
            width: 160px;
            height: 160px;
            display: grid;
            place-items: center;
            pointer-events: none;
            transform: translateZ(0);
        }
        .bottom-right-text svg { width: 160px; height: 160px; overflow: visible; }
        @keyframes rotateText {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .bottom-right-text .rotating-text { 
            animation: rotateText 20s linear infinite; 
            transform-origin: 100px 100px; 
        }
                    .circle-text { fill: #FFD54F; font-weight: 900; font-family: 'YasashisaGothic', 'Zen Maru Gothic', 'Kosugi Maru', 'Yomogi', "Noto Sans JP", sans-serif; font-size: 28px; letter-spacing: 0.2em; }
        .bottom-right-text .circle-bg { fill: rgba(255,213,79,0); } /* 背景円を透明に */
        @media (max-width: 640px) {
            .bottom-right-text { width: 120px; height: 120px; right: 3%; bottom: 4%; }
            .bottom-right-text svg { width: 120px; height: 120px; }
            .bottom-right-text .rotating-text { transform-origin: 60px 60px; }
            .bottom-right-text .circle-text { font-size: 22px; font-weight: 900; letter-spacing: 0.15em; }
        }
                    @keyframes wave {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
        }

        .wave-text span {
            display: inline-block;
            /* play once and keep end state (forwards) so it doesn't loop continuously */
            animation: wave 1.5s ease-in-out 1 forwards;
            /* Android対策: スムーズなアニメーション */
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }

      `}</style>
            <div className="fixed inset-0 w-full h-full z-0">
                <div className={`absolute inset-0 w-full h-full bg-gray-200 animate-pulse transition-opacity duration-500 ${hasMainPhoto ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />
                <img
                    src="/images/main.jpg"
                    alt="メイン写真"
                    className={`absolute inset-0 w-full h-full object-cover object-center fade-in-image transition-opacity duration-500 ${hasMainPhoto ? 'opacity-100' : 'opacity-0'}`}
                    loading="eager"
                    fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gray-300/30"></div>
            </div>

            {/* 指定のテキストオーバーレイ（写真上に表示） */}
            <div className="slash left z-20" aria-hidden></div>
            <div className={`center-text z-20 text-6xl font-bold tracking-wider wave-text ${fontsLoaded ? '' : 'opacity-0'}`}>
                <div>
                    {firstText.split("").map((char, i) => (
                        <span key={i} style={{ animationDelay: `${i * waveStagger}s` }}>{char}</span>
                    ))}
                </div>
                <div className="ml-12 mt-4 md:mt-6">
                    {secondText.split("").map((char, i) => (
                        <span key={i} style={{ animationDelay: `${(secondOffset + i * waveStagger).toFixed(2)}s` }}>{char}</span>
                    ))}
                </div>
            </div>

            <div className="slash right z-20" aria-hidden></div>
            <div className={`bottom-right-text z-20 transition-opacity duration-500 ${fontsLoaded ? 'opacity-100' : 'opacity-0'}`} aria-hidden>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="いしかわの暮らし">
                    <defs>
                        <path id="circlePathLarge" d="M100,20 a80,80 0 1,1 -0.1,0" />
                    </defs>
                    <circle className="circle-bg" cx="100" cy="100" r="80" />
                    <text className="circle-text rotating-text">
                        <textPath href="#circlePathLarge" startOffset="0" textLength="502">い し か わ の 暮 ら し ・ い し か わ の 暮 ら し ・</textPath>
                    </text>
                </svg>
            </div>

            <div className="fixed z-50 top-4 right-4 md:top-8 md:right-8">
                <button
                    onClick={toggleMenu}
                    className="p-2 w-14 h-10 flex flex-col justify-center items-center space-y-1.5 transition-all duration-300 group cursor-pointer"
                    aria-label="メニューを開く"
                >
                    <span className={`w-10 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2 bg-zinc-700' : ''}`}></span>
                    <span className={`w-10 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-10 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-zinc-700' : ''}`}></span>
                </button>
            </div>
            <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-30">
                <div className="animate-bounce text-white" style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                }}>
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                    <p className="text-sm mt-2" style={{
                        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                        fontWeight: 500
                    }}>Scroll</p>
                </div>
            </div>
        </section>
    );
}
