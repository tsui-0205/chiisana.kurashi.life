"use client";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "../../ui/SectionHeader";
import ToTopButton from "../../ui/ToTopButton";

// ▼ 実際の投稿を手動更新してください
const instagramPosts = [
    {
        id: "1",
        postUrl:
            "https://www.instagram.com/p/DM_23O9SGfO/?utm_source=ig_web_copy_link&igsh=ZGkzdGhybzQwanZl",
        imageUrl: "/images/instagram/a.jpg",
    },
    {
        id: "2",
        postUrl:
            "https://www.instagram.com/p/DMkyHLmychN/?utm_source=ig_web_copy_link&igsh=MWV6eDd4MmFiY2p3NA==",
        imageUrl: "/images/instagram/1755241937405.jpg",
    },
    {
        id: "3",
        postUrl:
            "https://www.instagram.com/p/DMAQhUoS135/?utm_source=ig_web_copy_link&igsh=MTlsb2E2ZmpiejNiMA==",
        imageUrl: "/images/instagram/1755241937446.jpg",
    },
];

export default function InstagramFeed({ showToTop = false, hideWhenHeroVisible = false }) {
    const [loaded, setLoaded] = useState({});
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const trackRef = useRef(null);
    const wrapperRef = useRef(null);

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

    // ...existing code...

    // クリックで投稿を開く
    const openPost = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    // トラックの自動スクロール速度（画像数に応じて自動で伸縮）
    const baseSeconds = 20; // 3枚で約20秒/ループ
    const duration = Math.max(12, Math.round((instagramPosts.length / 3) * baseSeconds));

    // 2周分に複製（無限ループ風）
    const doubled = [...instagramPosts, ...instagramPosts];

    return (
        <section className="relative overflow-hidden bg-white text-zinc-800">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
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
        .marquee-wrapper:hover .marquee-track.animate { animation-play-state: paused; }
        @keyframes scrollX {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
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
      `}</style>

            {/* 背景の柔らかい色味 */}
            <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
            <div className="pointer-events-none absolute left-56 -top-8 h-64 w-64 rounded-full bg-pink-100/50 blur-3xl" />

            {/* セクションヘッダ */}
            <div className="relative text-center py-20 px-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-800">
                    Instagram
                </h2>
                <p className="mt-4 text-base md:text-lg text-zinc-500">
                    日々のことをインスタグラムでも発信しています
                </p>
                <div className="mt-6 mx-auto h-0.5 w-24 bg-gradient-to-r from-sky-400 to-purple-400 rounded-full" />
            </div>

            <div className="mx-auto max-w-7xl px-0 md:px-6 py-2 pb-20 font-body">
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
                {/* ▼ フルブリード横スクロール（自動で流れ続ける） */}
                <div
                    className="edge-fade marquee-wrapper w-screen md:w-full -mx-[calc(50vw-50%)] md:mx-0"
                    ref={wrapperRef}
                    aria-label="Instagram carousel (auto-scrolling)"
                >
                    <div
                        ref={trackRef}
                        className={`marquee-track ${isUserInteracting ? "" : "animate"}`}
                        style={{
                            // ビューポートに対して高さを可変に（モバイル: 45vh / デスクトップ: 60vh）
                            // 画像は object-cover で横幅いっぱい
                            padding: "12px 24px",
                        }}
                    >
                        {doubled.map((post, idx) => (
                            <figure
                                key={`${post.id}-${idx}`}
                                className="ig-card group relative h-[45vh] md:h-[60vh] aspect-[4/3] min-w-[66vw] sm:min-w-[50vw] md:min-w-[42vw] lg:min-w-[36vw] xl:min-w-[28vw]"
                                onClick={() => openPost(post.postUrl)}
                                role="button"
                                aria-label="Open Instagram post"
                            >
                                <img
                                    src={post.imageUrl}
                                    alt="Instagram投稿"
                                    loading="lazy"
                                    className="h-full w-full object-cover"
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

                {/* もっと見るボタン */}
                <div className="mt-14 text-center fade-in-up">
                    <a
                        href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-4 sm:gap-12 focus:outline-none"
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
                        <span className="text-[#84B5C5] text-base tracking-wide font-medium py-2
       group-hover:underline underline-offset-4 decoration-[#84B5C5] transition-colors">
                            インスタグラムへ
                        </span>
                    </a>
                </div>
            </div>

            {/* ページトップへ（共通部品） */}
            <ToTopButton />
        </section>
    );
}
