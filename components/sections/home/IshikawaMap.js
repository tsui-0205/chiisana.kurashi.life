"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import RegionInfo from "./RegionInfo";

// 画像は /public/images/ishikawa 
// noto.jpg, kanazawa.jpg, hakusan.jpg, kaga.jpg を使用

// ====== アイドル（未ホバー時）演出レイヤ ============================
function IdleBackdrop({ active, onChangeIndex }) {
    const prefersReduced = useReducedMotion();

    // Ken Burns 的にスライド&ズームする画像セット
    const slides = useMemo(
        () => [
            { id: "noto", src: "/images/ishikawa/noto.jpg" },
            { id: "kanazawa", src: "/images/ishikawa/kanazawa.jpg" },
            { id: "hakusan", src: "/images/ishikawa/hakusan.jpg" },
            { id: "kaga", src: "/images/ishikawa/kaga.jpg" },
        ],
        []
    );

    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!active) return;
        if (prefersReduced) return;
        const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
        return () => {
            try {
                clearInterval(t);
            } catch (e) {
                // Ignore errors during cleanup
            }
        };
    }, [active, prefersReduced, slides.length]);

    // 親コンポーネントへ index 変化を通知
    useEffect(() => {
        if (typeof onChangeIndex === "function") onChangeIndex(index);
    }, [index, onChangeIndex]);

    // 浮遊するグラデーションブロブ
    const blob = (
        <motion.div
            aria-hidden
            className="absolute -left-32 -top-32 h-[42vh] w-[42vh] rounded-full bg-gradient-to-br from-sky-300/30 via-indigo-300/20 to-fuchsia-300/30 blur-3xl"
            initial={{ opacity: 0, scale: 0.9, x: -40, y: -20 }}
            animate={active && !prefersReduced ? { opacity: 1, scale: 1, x: [0, 30, -20, 0], y: [0, -10, 10, 0] } : { opacity: 1 }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
    );

    const blob2 = (
        <motion.div
            aria-hidden
            className="absolute -right-32 bottom-10 h-[48vh] w-[48vh] rounded-full bg-gradient-to-tr from-emerald-300/25 via-teal-300/20 to-cyan-300/25 blur-3xl"
            initial={{ opacity: 0, scale: 0.9, x: 40, y: 20 }}
            animate={active && !prefersReduced ? { opacity: 1, scale: 1, x: [0, -20, 20, 0], y: [0, 15, -10, 0] } : { opacity: 1 }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
    );

    return (
        <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
            {/* Ken Burns スライド（背景）*/}
            {slides.map((s, i) => {
                const isActive = i === index;
                return (
                    <motion.img
                        key={s.id}
                        src={s.src}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ willChange: "transform, opacity" }}
                        initial={{ opacity: 0 }}
                        animate={
                            active && isActive && !prefersReduced
                                ? { opacity: 1, scale: [1.05, 1.12], x: [0, 10], y: [0, -8] }
                                : { opacity: isActive ? 1 : 0 }
                        }
                        transition={{ duration: 3.8, ease: "easeOut" }}
                    />
                );
            })}

            {/* 薄いビネットとノイズで紙っぽい質感 */}
            <div className="absolute inset-0 bg-black/20" />
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "radial-gradient(transparent 60%, rgba(0,0,0,0.35)), url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'4\\' stitchTiles=\\'stitch\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.5\\'/></svg>')",
                    backgroundSize: "cover, 160px 160px",
                    backgroundPosition: "center",
                }}
            />

            {/* 浮遊ブロブ */}
            {blob}
            {blob2}

            {/* マルキー（流れる帯）は削除済み */}
        </div>
    );
}

// ====== MAIN ======================================================
export default function IshikawaMapApp() {
    // Production: no development instrumentation here. Normal behavior only.
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedOrigin, setSelectedOrigin] = useState("none");
    const [mainHovered, setMainHovered] = useState(false);
    const [idleIndex, setIdleIndex] = useState(0);
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") setSelectedRegion(null);
        }
        if (typeof window !== 'undefined') {
            window.addEventListener("keydown", onKey);
        }
        return () => {
            if (typeof window !== 'undefined') {
                try {
                    window.removeEventListener("keydown", onKey);
                } catch (e) {
                    // Ignore errors during cleanup
                }
            }
        };
    }, []);

    // Fallback: listen for RegionInfo fallback close events
    useEffect(() => {
        function onRegionInfoClose() {
            setSelectedRegion(null);
            setSelectedOrigin('none');
            setHoveredRegion(null);
        }
        if (typeof window !== 'undefined') {
            window.addEventListener('regioninfo:close', onRegionInfoClose);
        }
        return () => {
            if (typeof window !== 'undefined') {
                try {
                    window.removeEventListener('regioninfo:close', onRegionInfoClose);
                } catch (e) {
                    // Ignore errors during cleanup
                }
            }
        };
    }, []);

    // Hover と選択の同期
    useEffect(() => {
        if (hoveredRegion) {
            if (selectedOrigin !== "click") {
                setSelectedRegion(hoveredRegion);
                setSelectedOrigin("hover");
            }
        } else {
            if (selectedOrigin === "hover") {
                setSelectedRegion(null);
                setSelectedOrigin("none");
            }
        }
    }, [hoveredRegion, selectedOrigin]);

    // スクロールで説明カードを自動的に閉じる（短いデバウンス付き）
    useEffect(() => {
        if (!selectedRegion || typeof window === 'undefined') return;
        let t = null;
        function onScroll() {
            if (t) clearTimeout(t);
            t = setTimeout(() => {
                setSelectedRegion(null);
                setSelectedOrigin('none');
            }, 150);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            try {
                if (typeof window !== 'undefined') {
                    window.removeEventListener('scroll', onScroll);
                }
                if (t) clearTimeout(t);
            } catch (e) {

            }
        };
    }, [selectedRegion]);

    function handleMarkerClick(id, e) {
        if (e?.stopPropagation) e.stopPropagation();
        setSelectedRegion((s) => (s === id ? null : id));
        setSelectedOrigin("click");
    }

    const idleActive = !hoveredRegion && !selectedRegion;

    return (
        <div className="min-h-screen bg-[var(--background)] p-6">
            {/* セクションヘッダ（InstagramFeed と同じ左寄せスタイル） */}
            <div className="font-body mx-auto" style={{ margin: '80px auto 24px', maxWidth: '1200px', position: 'relative' }}>
                <div
                    className={`flex items-center gap-3 fade-in-up`}
                    data-animate="true"
                    data-index="header"
                >
                    <div className="h-0.5 w-24 bg-black rounded-full" />
                    <h2 className="text-[22px] sm:text-[28px] md:text-[38px] font-bold text-zinc-700 tracking-[0.18em] md:pl-[80px] whitespace-nowrap">石川の、ココいきまっし</h2>
                </div>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-5">
                <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] md:col-span-5">
                    <div className="relative h-[95vh] w-full overflow-hidden bg-transparent" onTouchStart={() => setHoveredRegion(null)}>
                        {/* === 追加: 未ホバー時のアイドル背景レイヤ === */}
                        <IdleBackdrop active={idleActive} onChangeIndex={setIdleIndex} />

                        {/* === ホバー中：対象写真を前面にフェード === */}
                        {hoveredRegion && (
                            <motion.div
                                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                            >
                                <motion.img
                                    src={`/images/ishikawa/${hoveredRegion}.jpg`}
                                    alt={hoveredRegion}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    initial={{ scale: 1.02 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 1.1, ease: "easeOut" }}
                                />
                                <div className="pointer-events-none absolute inset-0 bg-black/20" />
                            </motion.div>
                        )}

                        {/* === メイン（中央写真+マーカー） === */}
                        <div
                            className="absolute left-1/2 top-1/2 -translate-y-1/2 md:top-1/2 md:-translate-y-1/2 z-30 w-[86%] -translate-x-1/2 sm:w-[60%] md:w-[58%] lg:w-[28%]"
                            onMouseEnter={() => setMainHovered(true)}
                            onMouseLeave={() => setMainHovered(false)}
                            onTouchStart={() => setMainHovered((s) => !s)}
                        >
                            <div className="relative">
                                {/* メイン画像がコンテナをはみ出して切れないよう max-height を指定 */}
                                <img
                                    src="/images/ishikawa/main.jpg"
                                    alt="メイン写真"
                                    className="w-full h-auto max-h-[60vh] sm:max-h-[80vh] md:max-h-[88vh] lg:max-h-[80vh] object-contain"
                                />

                                {/* モバイル用：横書きオーバーレイ（ホバー/タッチ時） */}
                                {hoveredRegion && (
                                    // 左上横書き（モバイル/タブレット）: md(iPad)で読みやすくするためサイズを拡大
                                    <div className="absolute top-3 left-3 z-40 flex items-center gap-2 lg:hidden">
                                        <span className="text-3xl md:text-4xl font-extrabold text-white tracking-[0.2em]">
                                            {hoveredRegion === "noto" && "能登"}
                                            {hoveredRegion === "kanazawa" && "金沢"}
                                            {hoveredRegion === "hakusan" && "白山"}
                                            {hoveredRegion === "kaga" && "加賀"}
                                        </span>
                                        <span className="text-sm md:text-xl font-medium text-white/90 tracking-wider">
                                            {hoveredRegion === "noto" && "Noto"}
                                            {hoveredRegion === "kanazawa" && "Kanazawa"}
                                            {hoveredRegion === "hakusan" && "Hakusan"}
                                            {hoveredRegion === "kaga" && "Kaga"}
                                        </span>
                                    </div>
                                )}

                                {/* モバイル用：未ホバー（Idle）時にも表示する */}
                                {!hoveredRegion && idleActive && (
                                    <div className="absolute -top-8 left-3 z-40 flex items-center gap-2 lg:hidden">
                                        <span className="text-3xl md:text-4xl font-extrabold text-white tracking-[0.2em]">
                                            {idleIndex === 0 && "能登"}
                                            {idleIndex === 1 && "金沢"}
                                            {idleIndex === 2 && "白山"}
                                            {idleIndex === 3 && "加賀"}
                                        </span>
                                        <span className="text-sm md:text-xl font-medium text-white/90 tracking-wider">
                                            {idleIndex === 0 && "Noto"}
                                            {idleIndex === 1 && "Kanazawa"}
                                            {idleIndex === 2 && "Hakusan"}
                                            {idleIndex === 3 && "Kaga"}
                                        </span>
                                    </div>
                                )}

                                {/* buttons moved below background slideshow */}

                                {/* 縦書きタイトル（ホバー時または Idle スライド時に表示） */}
                                {(() => {
                                    // hoveredRegion があれば優先。なければ idleIndex に対応する領域を表示。
                                    const regions = ["noto", "kanazawa", "hakusan", "kaga"];
                                    const displayRegion = hoveredRegion || (idleActive ? regions[idleIndex % regions.length] : null);
                                    if (!displayRegion) return null;

                                    const enName = displayRegion === "noto" ? "Noto" : displayRegion === "kanazawa" ? "Kanazawa" : displayRegion === "hakusan" ? "Hakusan" : displayRegion === "kaga" ? "Kaga" : "";

                                    // motion を使い、表示はゆっくりフェード&スライドインさせる
                                    return (
                                        <motion.div
                                            key={displayRegion}
                                            aria-hidden={!!hoveredRegion ? false : true}
                                            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                            animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                                            transition={prefersReduced ? {} : { duration: 1.8, ease: "easeOut" }}
                                            className="absolute left-[-240px] top-8 z-40 hidden lg:flex flex-col items-center lg:left-[-320px]"
                                        >
                                            <div className="flex flex-col items-center text-[2.8rem] lg:text-[3.6rem] font-extrabold leading-[1] tracking-[0.28em] text-white drop-shadow-md">
                                                {displayRegion === "noto" && (
                                                    <>
                                                        <span className="block">能</span>
                                                        <span className="block">登</span>
                                                    </>
                                                )}
                                                {displayRegion === "kanazawa" && (
                                                    <>
                                                        <span className="block">金</span>
                                                        <span className="block">沢</span>
                                                    </>
                                                )}
                                                {displayRegion === "hakusan" && (
                                                    <>
                                                        <span className="block">白</span>
                                                        <span className="block">山</span>
                                                    </>
                                                )}
                                                {displayRegion === "kaga" && (
                                                    <>
                                                        <span className="block">加</span>
                                                        <span className="block">賀</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="mt-4 flex flex-col items-center text-lg lg:text-xl font-medium text-white drop-shadow-sm tracking-[0.3em]">
                                                {enName.split("").map((ch, i) => (
                                                    <span key={i} className="block leading-none">
                                                        {ch}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>

                    {/* === 追加: 背景スライド下の地域ボタン群 === */}
                    {/* === 地域ナビゲーション（シンプルスタイル） === */}
                    <div className="mt-8 w-full flex justify-center">
                        <div className="flex flex-wrap gap-8 md:gap-20 lg:gap-28 justify-center items-center font-medium text-lg">
                            <button
                                onClick={() => setHoveredRegion('noto')}
                                onKeyDown={(e) => e.key === 'Enter' && setHoveredRegion('noto')}
                                className="transition-colors duration-200 cursor-pointer hover:opacity-70"
                                style={{ color: '#84b5c5' }}
                            >
                                能登 &gt;
                            </button>
                            <button
                                onClick={() => setHoveredRegion('kanazawa')}
                                onKeyDown={(e) => e.key === 'Enter' && setHoveredRegion('kanazawa')}
                                className="transition-colors duration-200 cursor-pointer hover:opacity-70"
                                style={{ color: '#84b5c5' }}
                            >
                                金沢 &gt;
                            </button>
                            <button
                                onClick={() => setHoveredRegion('hakusan')}
                                onKeyDown={(e) => e.key === 'Enter' && setHoveredRegion('hakusan')}
                                className="transition-colors duration-200 cursor-pointer hover:opacity-70"
                                style={{ color: '#84b5c5' }}
                            >
                                白山 &gt;
                            </button>
                            <button
                                onClick={() => setHoveredRegion('kaga')}
                                onKeyDown={(e) => e.key === 'Enter' && setHoveredRegion('kaga')}
                                className="transition-colors duration-200 cursor-pointer hover:opacity-70"
                                style={{ color: '#84b5c5' }}
                            >
                                加賀 &gt;
                            </button>
                        </div>

                        {/* 説明カード - モバイル:下部、デスクトップ:右側 */}
                        {selectedRegion && (
                            <div className="absolute inset-0 z-50 pointer-events-auto">
                                {/* オーバーレイ: 外側クリック/タッチで閉じる */}
                                <div
                                    className="absolute inset-0 bg-black/20 md:bg-transparent"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => {
                                        setSelectedRegion(null);
                                        setSelectedOrigin('none');
                                        setHoveredRegion(null);
                                    }}
                                    onPointerDown={() => {
                                        setSelectedRegion(null);
                                        setSelectedOrigin('none');
                                        setHoveredRegion(null);
                                    }}
                                    onTouchEnd={() => {
                                        setSelectedRegion(null);
                                        setSelectedOrigin('none');
                                        setHoveredRegion(null);
                                    }}
                                />

                                {/* パネル: モバイルでは下部、デスクトップでは右側に配置 */}
                                <div className="absolute inset-x-4 bottom-4 pointer-events-none md:top-[60%] md:-translate-y-1/2 md:right-[5%] md:inset-x-auto md:w-[30%] md:max-w-md">
                                    <div
                                        className="pointer-events-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-xl max-h-full overflow-y-auto"
                                        onClick={(e) => e.stopPropagation()}
                                        onTouchStart={(e) => e.stopPropagation()}
                                        onTouchEnd={(e) => e.stopPropagation()}
                                    >
                                        <RegionInfo
                                            region={selectedRegion}
                                            onClose={() => {
                                                setSelectedRegion(null);
                                                setSelectedOrigin('none');
                                                setHoveredRegion(null);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ====== Marker sub-component（ホバー/フォーカス時の共通挙動） ==========
function Marker({
    id,
    src,
    className,
    onHover,
    onClick,
    selectedOrigin,
}) {
    return (
        <motion.img
            src={src}
            alt={`${id}マーカー`}
            tabIndex={0}
            className={`pointer-events-auto transform-gpu ${className}`}
            onClick={(e) => onClick(id, e)}
            onKeyDown={(e) => e.key === "Enter" && onClick(id, e)}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={() => {
                onHover(null);
            }}
            onFocus={() => onHover(id)}
            onBlur={() => {
                if (selectedOrigin === "hover") onHover(null);
            }}
            onTouchStart={(e) => {
                e.stopPropagation();
                onHover((prev) => (prev === id ? null : id));
            }}
            whileHover={{ scale: 1.15 }}
            whileFocus={{ scale: 1.15 }}
            whileTap={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            style={{ willChange: "transform" }}
        />
    );
}
