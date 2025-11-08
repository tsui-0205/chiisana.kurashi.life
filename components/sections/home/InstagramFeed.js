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

    // アニメーション設定（複製数はランタイムで決定 -> ユーザーが回数を指定する必要なし）
    const DURATION_DESKTOP = 38; // 秒: デスクトップで1セットが流れる時間の目安
    const DURATION_MOBILE = 25; // 秒: モバイルで1セットが流れる時間の目安
    const duration = DURATION_DESKTOP;
    const mobileDuration = DURATION_MOBILE;

    // 複製数は初期2。レンダリング後にラッパー幅とトラック幅を見て必要な分だけ増やす
    const [copies, setCopies] = useState(2);
    const doubled = useMemo(() => Array(copies).fill(instagramPosts).flat(), [copies]);
    const singleWidthRef = useRef(0);

    // ドラッグでスクロール（リファクタリング版）
    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        const handlePointerDown = (e) => {
            isDragging = true;
            setIsUserInteracting(true);
            el.setPointerCapture(e.pointerId);
            startX = e.clientX;
            scrollLeft = el.scrollLeft;
            el.style.cursor = "grabbing";
        };

        const handlePointerMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const deltaX = (e.clientX - startX) * 1.5; // ドラッグ感度向上
            el.scrollLeft = scrollLeft - deltaX;
        };

        const handlePointerEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            setIsUserInteracting(false);
            try { 
                el.releasePointerCapture(e.pointerId); 
            } catch (err) {
                console.warn('Failed to release pointer capture:', err);
            }
            el.style.cursor = "grab";
        };

        el.addEventListener("pointerdown", handlePointerDown);
        el.addEventListener("pointermove", handlePointerMove);
        el.addEventListener("pointerup", handlePointerEnd);
        el.addEventListener("pointercancel", handlePointerEnd);

        return () => {
            el.removeEventListener("pointerdown", handlePointerDown);
            el.removeEventListener("pointermove", handlePointerMove);
            el.removeEventListener("pointerup", handlePointerEnd);
            el.removeEventListener("pointercancel", handlePointerEnd);
        };
    }, []);

    // IntersectionObserver でパフォーマンス最適化（リファクタリング版）
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const newVisible = new Set(visibleItems);
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = entry.target.dataset.index;
                        if (index) newVisible.add(index);
                    }
                });
                if (newVisible.size !== visibleItems.size) {
                    setVisibleItems(newVisible);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        observerRef.current = observer;

        // 監視対象要素を取得して監視開始
        const elements = document.querySelectorAll('[data-animate="true"]');
        elements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, [visibleItems]);

    // ランタイムで必要な複製数を確保する (画像読み込み後に呼び出すことで幅のズレを抑える)
    useEffect(() => {
        let cancelled = false;
        let attempts = 0;

        const ensureCopies = () => {
            attempts += 1;
            const wrapper = wrapperRef.current;
            const track = trackRef.current;
            if (!wrapper || !track || cancelled) return;

            const wrapperW = wrapper.clientWidth || window.innerWidth;
            // track.scrollWidth が wrapper の 2 倍以上になるように複製数を増やす
            if (track.scrollWidth < wrapperW * 2 && attempts < 12) {
                setCopies((c) => Math.min(12, c + 1));
                // 次レンダリング後に再確認
                setTimeout(ensureCopies, 120);
            }
            // 単一セットの幅を計測（最初の N 要素の合計幅 + gap を含む）
            try {
                const children = Array.from(track.children || []);
                const n = instagramPosts.length;
                if (children.length >= n) {
                    const firstN = children.slice(0, n);
                    const widths = firstN.reduce((sum, el) => sum + (el.offsetWidth || 0), 0);
                    const style = window.getComputedStyle(track);
                    const gap = parseFloat(style.gap || style.columnGap || 0) || 0;
                    const paddingLeft = parseFloat(style.paddingLeft || 0) || 0;
                    const paddingRight = parseFloat(style.paddingRight || 0) || 0;
                    const setWidth = widths + gap * Math.max(0, n - 1) + paddingLeft + paddingRight;
                    if (setWidth > 0) singleWidthRef.current = setWidth;
                }
            } catch (e) {
                // noop
            }
        };

        // 少し遅らせて最初の計測（画像のレイアウトが安定してから）
        const t = setTimeout(ensureCopies, 200);
        window.addEventListener('resize', ensureCopies);

        return () => {
            cancelled = true;
            clearTimeout(t);
            window.removeEventListener('resize', ensureCopies);
        };
    }, [doubled]);

    // requestAnimationFrame でシームレスにスクロールさせる（CSSキーフレームのリセット位置問題を回避）
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let rafId = 0;
        let last = performance.now();
        let offset = 0; // px

        const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const step = (now) => {
            const elapsed = (now - last) / 1000; // 秒
            last = now;

            if (!isUserInteracting) {
                const vw = window.innerWidth;
                const isMobile = vw <= 768;
                const usedDuration = isMobile ? mobileDuration : duration;

                // 1セット分の幅（px） — 事前計測があればそれを優先
                const measured = singleWidthRef.current || 0;
                const singleWidthPx = measured > 0 ? measured : (track.scrollWidth / copies || 0);
                // px/秒
                const speed = singleWidthPx / Math.max(0.001, usedDuration);

                offset += speed * elapsed;
                // 繰り返し時にジャンプしないように余剰分だけ差し引く
                if (offset >= singleWidthPx) offset -= singleWidthPx;

                track.style.transform = `translateX(-${offset}px)`;
            }

            rafId = requestAnimationFrame(step);
        };

        rafId = requestAnimationFrame(step);

        return () => cancelAnimationFrame(rafId);
    }, [copies, duration, mobileDuration, isUserInteracting]);

    const [ref, inView] = useInView({ threshold: 0.12 });

    return (
        <section id="instagram" className="instagram-section relative overflow-hidden text-zinc-800">
            <style>{`
                /* フォント設定 */
                .font-body { 
                    font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; 
                }
                .font-hand { 
                    font-family: 'Yomogi', 'Noto Sans JP', sans-serif; 
                    letter-spacing: 0.02em; 
                }

                /* マーキーラッパー */
                .marquee-wrapper { 
                    overflow: hidden;
                    position: relative; 
                    touch-action: pan-x; 
                    cursor: grab; 
                    -webkit-overflow-scrolling: touch;
                    scroll-behavior: auto;
                }

                /* マーキートラック - 高速スムーズアニメーション */
                .marquee-track {
                    display: flex;
                    gap: 24px;
                    will-change: transform;
                    align-items: stretch;
                }

                /* アニメーションは JavaScript(rAF) 側で制御する。
                   CSS キーフレームは残すが、ここではアニメーションを無効化して
                   inline style(transform) による連続スクロールを優先させる */
                .marquee-track.animate {
                    /* animation intentionally disabled when using rAF scroll */
                    animation: none !important;
                }

                /* 無限ループ: 1セット分を移動して戻る（デスクトップ用） */
                @keyframes scrollX {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                /* モバイル用: ビューポート幅で1セット分を移動（確実に4枚分を通過） */
                @keyframes scrollXMobile {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100vw); }
                }

                /* アクセシビリティ: モーション削減 */
                @media (prefers-reduced-motion: reduce) {
                    .marquee-track.animate { 
                        animation: none; 
                    }
                }

                /* エッジフェード効果 */
                .edge-fade::before,
                .edge-fade::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 12vw;
                    pointer-events: none;
                    z-index: 10;
                }
                .edge-fade::before { 
                    left: 0; 
                    background: linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0)); 
                }
                .edge-fade::after { 
                    right: 0; 
                    background: linear-gradient(270deg, rgba(255,255,255,1), rgba(255,255,255,0)); 
                }

                /* カードデザイン */
                .ig-card {
                    position: relative;
                    overflow: hidden;
                    border-radius: 1rem;
                    background: white;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
                    transition: transform 0.4s cubic-bezier(0.2, 0.6, 0.2, 1), 
                                box-shadow 0.4s ease;
                }
                .ig-card:hover { 
                    transform: translateY(-4px); 
                    box-shadow: 0 20px 60px rgba(0,0,0,0.12); 
                }
                .ig-card::after { 
                    content: "";
                    position: absolute;
                    inset: 0;
                    box-shadow: inset 0 0 80px rgba(0,0,0,0.06);
                    border-radius: 1rem;
                }

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
                                    className="ig-card group relative h-[40vh] md:h-[50vh] aspect-[4/3] min-w-[50vw] sm:min-w-[40vw] md:min-w-[36vw] lg:min-w-[36vw] xl:min-w-[28vw]"
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
