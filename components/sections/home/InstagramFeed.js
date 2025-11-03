"use client";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import Image from 'next/image';
import ToTopButton from "../../ui/ToTopButton";

// ▼ 自動スクロールで流す写真（手動でファイルを置いてください）
const instagramPosts = [
    { id: "mizukiri", postUrl: "https://www.instagram.com/chiisana.kurashi.life/", imageUrl: "/images/instagram/mizukiri.jpg" },
    { id: "osusumefoods", postUrl: "https://www.instagram.com/chiisana.kurashi.life/", imageUrl: "/images/instagram/osusumefoods.jpg" },
    { id: "tateyama", postUrl: "https://www.instagram.com/chiisana.kurashi.life/", imageUrl: "/images/instagram/tateyama.jpg" },
    { id: "utsurun", postUrl: "https://www.instagram.com/chiisana.kurashi.life/", imageUrl: "/images/instagram/utsurun.jpg" },
];

export default function InstagramFeed({ showToTop = false, hideWhenHeroVisible = false }) {
    const [loaded, setLoaded] = useState({});
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const trackRef = useRef(null);
    const wrapperRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState(new Set());
    const observerRef = useRef(null);

    // クリックで投稿を開く（メモ化）
    const openPost = useCallback((url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    }, []);

    // アニメーション設定をメモ化
    const { duration, mobileDuration, doubled, movePercent } = useMemo(() => {
        const baseSeconds = 40;
        const dur = Math.max(12, Math.round((instagramPosts.length / 3) * baseSeconds));
        const mobDur = Math.max(8, Math.round(dur * 0.6));
        const DUPLICATES = 2;
        const dbl = Array(DUPLICATES).fill(instagramPosts).flat();
        const mvPercent = 470 / DUPLICATES;
        return { duration: dur, mobileDuration: mobDur, doubled: dbl, movePercent: mvPercent };
    }, []);

    // ドラッグでスクロール（スマホ/PC両対応）
    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        const onDown = (e) => {
            isDown = true;
            setIsUserInteracting(true);
            el.setPointerCapture(e.pointerId);
            startX = e.clientX;
            scrollLeft = el.scrollLeft;
            el.style.cursor = "grabbing";
        };
        const onMove = (e) => {
            if (!isDown) return;
            const walk = (e.clientX - startX) * 1.2; // ドラッグ感度
            el.scrollLeft = scrollLeft - walk;
        };
        const onUp = (e) => {
            isDown = false;
            setIsUserInteracting(false);
            try { el.releasePointerCapture(e.pointerId); } catch { }
            el.style.cursor = "grab";
        };

        el.addEventListener("pointerdown", onDown);
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerup", onUp);
        el.addEventListener("pointercancel", onUp);

        return () => {
            el.removeEventListener("pointerdown", onDown);
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerup", onUp);
            el.removeEventListener("pointercancel", onUp);
        };
    }, []);

    // IntersectionObserver を統合してパフォーマンス改善
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleItems(prev => new Set([...prev, entry.target.dataset.index]));
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // 要素を即座に監視開始
        const elements = document.querySelectorAll('[data-animate="true"]');
        elements.forEach((el) => {
            try {
                if (observerRef.current) {
                    observerRef.current.observe(el);
                }
            } catch (e) {
                // noop
            }
        });

        return () => {
            try {
                if (observerRef.current) {
                    observerRef.current.disconnect();
                }
            } catch (e) {
                // noop
            }
        };
    }, []);

    const [ref, inView] = useInView({ threshold: 0.12 });

    return (
        <section id="instagram" className="instagram-section relative overflow-hidden text-zinc-800">
            <style>{`
        .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
        .font-hand { font-family: 'Yomogi', 'Noto Sans JP', sans-serif; letter-spacing: .02em; }

        /* フルブリード・オートスクロール */
        .marquee-wrapper { 
          overflow: hidden;
          position: relative; 
          touch-action: pan-x; 
          cursor: grab; 
          -webkit-overflow-scrolling: touch;
          scroll-behavior: auto; /* ユーザー操作優先 */
        }
        .marquee-track {
          display: flex;
          gap: 24px;
          will-change: transform;
          align-items: stretch;
        }
                        .marquee-track.animate {
                            animation: scrollX linear infinite;
                            animation-duration: ${duration}s;
                            animation-play-state: running;
                        }
                /* モバイル向け: より短い duration を使って体感速度を速める */
                @media (max-width: 768px) {
                    .marquee-track.animate { animation-duration: ${mobileDuration}s; }
                }
                @keyframes scrollX {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-${movePercent}%); }
                }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track.animate { animation: none; }
        }

        /* 端のフェード（モダンな抜け感） */
        .edge-fade::before,
        .edge-fade::after {
          content: ""; position: absolute; top: 0; bottom: 0; width: 12vw; pointer-events: none;
        }
        .edge-fade::before { left: 0; background: linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0)); }
        .edge-fade::after  { right: 0; background: linear-gradient(270deg, rgba(255,255,255,1), rgba(255,255,255,0)); }

        /* 画像カードの質感 */
        .ig-card {
          position: relative; overflow: hidden; border-radius: 1rem; background: white;
          box-shadow: 0 10px 40px rgba(0,0,0,.08);
          transition: transform .4s cubic-bezier(.2,.6,.2,1), box-shadow .4s;
        }
        .ig-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,.12); }
        .ig-card::after { content: ""; position: absolute; inset: 0; box-shadow: inset 0 0 80px rgba(0,0,0,.06); border-radius: 1rem; }
        
        /* セクション背景 */
        .instagram-section {
          padding: 2rem 1rem;
        }
      `}</style>

            <div className="font-body mx-auto mt-6 md:mt-8 mb-6 md:mb-12 max-w-[1200px] relative px-6">
                <div
                    className={`flex items-center gap-3 fade-in-up ${visibleItems.has('header') ? 'visible' : ''}`}
                    data-animate="true"
                    data-index="header"
                >
                    <div className="h-0.5 w-24 bg-black rounded-full"></div>
                    <h2 className="text-[22px] sm:text-[28px] md:text-[38px] font-bold text-zinc-700 tracking-[0.18em] md:pl-[80px] whitespace-nowrap">日々のこと</h2>
                </div>
            </div>

            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="mx-auto max-w-7xl px-0 md:px-6 py-2 pb-20 font-body"
            >
                {/* アカウントリンク */}
                <div className="text-center mb-10 px-6">
                    <a
                        href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200/80 text-zinc-800 hover:border-zinc-900/40 hover:bg-zinc-900/5 transition-colors"
                    >
                        <svg className="w-6 h-6 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <rect x="3" y="3" width="18" height="18" rx="5" />
                            <circle cx="12" cy="12" r="3" />
                            <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
                        </svg>
                        <span className="font-medium tracking-wide">@chiisana.kurashi.life</span>
                    </a>
                </div>

                <div className="left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen relative">
                    <div
                        className="edge-fade marquee-wrapper w-full"
                        ref={wrapperRef}
                        aria-label="Instagram carousel (auto-scrolling)"
                    >
                        <div
                            ref={trackRef}
                            className={`marquee-track animate`}
                            style={{
                                padding: "12px 24px",
                            }}
                        >
                            {doubled.map((post, idx) => (
                                <figure
                                    key={`${post.id}-${idx}`}
                                    className="ig-card group relative h-[45vh] md:h-[60vh] aspect-[4/3] min-w-[50vw] sm:min-w-[36vw] md:min-w-[36vw] lg:min-w-[36vw] xl:min-w-[28vw]"
                                    onClick={() => openPost(post.postUrl)}
                                    role="button"
                                    aria-label="Open Instagram post"
                                >
                                    <Image
                                        src={post.imageUrl}
                                        alt="つい・わたしと夫の小さな暮らし 石川県の日常"
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 36vw, 28vw"
                                        className="object-cover"
                                        loading="lazy"
                                        onLoad={() => setLoaded((p) => ({ ...p, [post.id]: true }))}
                                        onError={() => setLoaded((p) => ({ ...p, [post.id]: false }))}
                                    />

                                    {/* ホバー時オーバーレイ */}
                                    <figcaption className="pointer-events-none absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-black/25">
                                        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                            <rect x="3" y="3" width="18" height="18" rx="5" />
                                            {/* 中心を塗りつぶしてホバーでインパクトを出す */}
                                            <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
                                            <circle cx="17.5" cy="6.5" r="0.95" fill="currentColor" stroke="none" />
                                        </svg>
                                    </figcaption>

                                    {/* 読み込み失敗時のプレースホルダ */}
                                    {loaded[post.id] === false && (
                                        <div className="absolute inset-0 grid place-items-center bg-zinc-100 text-zinc-500 text-sm">
                                            画像を読み込めませんでした
                                        </div>
                                    )}
                                </figure>
                            ))}
                        </div>
                    </div>
                </div>

                {/* もっと見るボタン */}
                <div className="mt-14 text-center">
                    <a
                        href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-6 focus:outline-none"
                        aria-label="インスタグラムへ"
                        onClick={e => {
                            e.preventDefault();
                            window.open('https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag==', '_blank', 'noopener,noreferrer');
                        }}
                    >
                        {/* 円ボタン（デザインを合わせた） */}
                        <span className="grid place-items-center w-20 h-20 rounded-full border border-[#84B5C5] bg-zinc-100/60 text-[#84B5C5] shadow-sm transition-all
       group-hover:border-zinc-600 group-hover:bg-zinc-200/80 group-focus-visible:ring-1 group-focus-visible:ring-[#84B5C5]/50">
                            <svg
                                width="28" height="28" viewBox="0 0 24 24" fill="none"
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            >
                                <path d="M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M18 9l4 3-4 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>

                        {/* テキスト（色・フォントを合わせる） */}
                        <span className="text-[#84B5C5] text-xl sm:text-2xl tracking-wide font-semibold py-2
                            group-hover:underline underline-offset-4 decoration-[#84B5C5] transition-colors">
                            Instagramへ
                        </span>

                    </a>
                </div>
            </motion.div>

            {/* ページトップへ（共通部品） */}
            <ToTopButton />
        </section>
    );
}
