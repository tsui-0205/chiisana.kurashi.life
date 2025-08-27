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
                        <svg className="w-5 h-5 opacity-80" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 6c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.325 12 18.325s6.162-2.759 6.162-6.163C18.162 8.759 15.403 6 12 6zm6.406-2.682a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.88z" />
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
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 6c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.325 12 18.325s6.162-2.759 6.162-6.163C18.162 8.759 15.403 6 12 6zm6.406-2.682a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.88z" />
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
                        {/* 円ボタン */}
                        <span className="grid place-items-center w-20 h-20 rounded-full border-2 border-zinc-500 bg-zinc-50/80 text-zinc-700 shadow-lg transition-all
                   group-hover:border-zinc-700 group-hover:bg-zinc-200/60 group-focus-visible:ring-2 group-focus-visible:ring-zinc-400/60">
                            <svg
                                width="32" height="32" viewBox="0 0 24 24" fill="none"
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            >
                                {/* Start a bit more left and extend the horizontal shaft to make the arrow longer */}
                                <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                {/* Move the arrow head further right to match the longer shaft */}
                                <path d="M18 9l4 3-4 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>

                        {/* テキスト */}
                        <span className="text-zinc-700 text-lg tracking-wide font-semibold py-2
                   group-hover:underline underline-offset-4 decoration-zinc-500">
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
