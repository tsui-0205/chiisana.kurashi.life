"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import useInView from '@/hooks/useInView';
import RegionInfo from "./RegionInfo";

// 画像は /public/images/ishikawa 
// noto.jpg, kanazawa.jpg, hakusan.jpg, kaga.jpg を使用

const SLIDES = [
    { id: "noto", src: "/images/ishikawa/noto.jpg" },
    { id: "kanazawa", src: "/images/ishikawa/kanazawa.jpg" },
    { id: "hakusan", src: "/images/ishikawa/hakusan.jpg" },
    { id: "kaga", src: "/images/ishikawa/kaga.jpg" },
];

const REGION_NAMES = {
    noto: { ja: "能登", en: "Noto" },
    kanazawa: { ja: "金沢", en: "Kanazawa" },
    hakusan: { ja: "白山", en: "Hakusan" },
    kaga: { ja: "加賀", en: "Kaga" },
};

// ====== アイドル（未ホバー時）演出レイヤ ============================
function IdleBackdrop({ active, onChangeIndex, setImagesLoaded: setParentImagesLoaded }) {
    const prefersReduced = useReducedMotion();

    const [index, setIndex] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // 画像をプリロード
    useEffect(() => {
        Promise.all(
            SLIDES.map((slide) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.onload = img.onerror = resolve;
                    img.src = slide.src;
                })
            )
        ).then(() => {
            setImagesLoaded(true);
            setParentImagesLoaded?.(true);
        });
    }, [setParentImagesLoaded]);

    useEffect(() => {
        if (!active || !imagesLoaded || prefersReduced) return;
        const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4000);
        return () => clearInterval(t);
    }, [active, prefersReduced, imagesLoaded]);

    // 親コンポーネントへ index 変化を通知
    useEffect(() => {
        onChangeIndex?.(index);
    }, [index, onChangeIndex]);

    // 浮遊するグラデーションブロブ
    const blob = (
        <motion.div
            aria-hidden={true}
            className="absolute -left-32 -top-32 h-[42vh] w-[42vh] rounded-full bg-gradient-to-br from-sky-300/30 via-indigo-300/20 to-fuchsia-300/30 blur-3xl"
            initial={{ opacity: 0, scale: 0.9, x: -40, y: -20 }}
            animate={active && !prefersReduced ? { opacity: 1, scale: 1, x: [0, 30, -20, 0], y: [0, -10, 10, 0] } : { opacity: 1 }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
    );

    const blob2 = (
        <motion.div
            aria-hidden={true}
            className="absolute -right-32 bottom-10 h-[48vh] w-[48vh] rounded-full bg-gradient-to-tr from-emerald-300/25 via-teal-300/20 to-cyan-300/25 blur-3xl"
            initial={{ opacity: 0, scale: 0.9, x: 40, y: 20 }}
            animate={active && !prefersReduced ? { opacity: 1, scale: 1, x: [0, -20, 20, 0], y: [0, 15, -10, 0] } : { opacity: 1 }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
    );

    return (
        <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
            {/* Ken Burns スライド（背景）*/}
            {SLIDES.map((s, i) => {
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
                aria-hidden={true}
                className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                style={{
                    backgroundImage: "radial-gradient(transparent 60%, rgba(0,0,0,0.35))",
                    backgroundSize: "cover",
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

// 地域名ラベル（モバイル用）
const RegionLabel = ({ region }) => {
    const info = REGION_NAMES[region];
    if (!info) return null;
    return (
        <div className="absolute top-3 left-3 z-40 flex items-center gap-2 lg:hidden">
            <span className="text-2xl md:text-3xl font-extrabold text-white tracking-[0.2em] drop-shadow-lg">{info.ja}</span>
            <span className="text-xs md:text-lg font-medium text-white/90 tracking-wider drop-shadow-lg">{info.en}</span>
        </div>
    );
};

// ====== MAIN ======================================================
export default function IshikawaMapApp() {
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedOrigin, setSelectedOrigin] = useState("none");
    const [mainHovered, setMainHovered] = useState(false);
    const [idleIndex, setIdleIndex] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const prefersReduced = useReducedMotion();

    // イベントハンドラをメモ化
    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") setSelectedRegion(null);
    }, []);

    const handleRegionInfoClose = useCallback(() => {
        setSelectedRegion(null);
        setSelectedOrigin('none');
        setHoveredRegion(null);
    }, []);

    const handleMarkerClick = useCallback((id, e) => {
        if (e?.stopPropagation) e.stopPropagation();
        setSelectedRegion((s) => (s === id ? null : id));
        setSelectedOrigin("click");
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener('regioninfo:close', handleRegionInfoClose);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener('regioninfo:close', handleRegionInfoClose);
        };
    }, [handleKeyDown, handleRegionInfoClose]);

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
        let t;
        const onScroll = () => {
            clearTimeout(t);
            t = setTimeout(() => {
                setSelectedRegion(null);
                setSelectedOrigin('none');
            }, 150);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            clearTimeout(t);
        };
    }, [selectedRegion]);

    const idleActive = !hoveredRegion && !selectedRegion;
    const [ref, inView] = useInView({ threshold: 0.12 });

    // 地域選択ハンドラをメモ化
    const handleRegionSelect = useCallback((region) => {
        setHoveredRegion(region);
        setSelectedRegion(region);
        setSelectedOrigin('click');
    }, []);

    return (
        <div className="min-h-screen bg-white text-zinc-800 relative overflow-hidden py-12 px-4 sm:px-6">
            {/* セクションヘッダ（文字切れ対策：padding と overflow 調整） */}
            <div className="font-body container mx-auto mb-8 md:mb-12 relative px-4 sm:px-6">
                <div className="flex items-center gap-3 overflow-visible">
                    <div className="h-0.5 w-16 sm:w-24 bg-black rounded-full flex-shrink-0" />
                    <h2 className="text-[18px] sm:text-[22px] md:text-[28px] lg:text-[38px] font-bold text-zinc-700 tracking-[0.12em] md:tracking-[0.18em] md:pl-8 lg:pl-20 whitespace-nowrap overflow-visible">
                        石川の、ココいきまっし
                    </h2>
                </div>
            </div>

            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-5"
            >
                <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] md:col-span-5">
                    <div className="relative h-[95vh] w-full overflow-hidden bg-transparent" onTouchStart={() => setHoveredRegion(null)}>
                        {/* === 追加: 未ホバー時のアイドル背景レイヤ === */}
                        <IdleBackdrop active={idleActive} onChangeIndex={setIdleIndex} setImagesLoaded={setImagesLoaded} />

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
                                {hoveredRegion && <RegionLabel region={hoveredRegion} />}

                                {/* モバイル用：未ホバー（Idle）時にも表示する */}
                                {!hoveredRegion && idleActive && <RegionLabel region={SLIDES[idleIndex]?.id} />}

                                {/* buttons moved below background slideshow */}

                                {/* 縦書きタイトル（ホバー時または Idle スライド時に表示） */}
                                {(() => {
                                    const displayRegion = hoveredRegion || (idleActive ? SLIDES[idleIndex]?.id : null);
                                    if (!displayRegion) return null;

                                    const regionInfo = REGION_NAMES[displayRegion];
                                    if (!regionInfo) return null;

                                    return (
                                        <motion.div
                                            key={displayRegion}
                                            aria-hidden={!hoveredRegion}
                                            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={prefersReduced ? {} : { duration: 1.8, ease: "easeOut" }}
                                            className="absolute left-[-240px] top-8 z-40 hidden lg:flex flex-col items-center lg:left-[-320px]"
                                        >
                                            <div className="flex flex-col items-center text-[2.8rem] lg:text-[3.6rem] font-extrabold leading-[1] tracking-[0.28em] text-white drop-shadow-md">
                                                {regionInfo.ja.split('').map((char, i) => <span key={i} className="block">{char}</span>)}
                                            </div>
                                            <div className="mt-4 flex flex-col items-center text-lg lg:text-xl font-medium text-white drop-shadow-sm tracking-[0.3em]">
                                                {regionInfo.en.split("").map((ch, i) => <span key={i} className="block leading-none">{ch}</span>)}
                                            </div>
                                        </motion.div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>

                    {/* === 地域ナビゲーション（シンプルスタイル） === */}
                    <div className="button-grid" style={{ marginTop: 32 }}>
                        {SLIDES.map(({ id }) => (
                            <div key={id} className="button-13">
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    handleRegionSelect(id);
                                }}>{REGION_NAMES[id].ja}</a>
                            </div>
                        ))}
                    </div>

                    {/* 説明カード - モバイル:下部、デスクトップ:右側 */}
                    {selectedRegion && (
                        <div className="absolute inset-0 z-50 pointer-events-auto">
                            {/* オーバーレイ: 外側クリック/タッチで閉じる */}
                            <div
                                className="absolute inset-0 bg-black/20 md:bg-transparent"
                                role="button"
                                tabIndex={0}
                                onClick={handleRegionInfoClose}
                                onPointerDown={handleRegionInfoClose}
                                onTouchEnd={handleRegionInfoClose}
                            />

                            {/* パネル: モバイルでは下部、デスクトップでは右側に配置 */}
                            <div className="absolute inset-x-4 bottom-16 pointer-events-none md:top-[60%] md:-translate-y-1/2 md:right-[5%] md:inset-x-auto md:w-[30%] md:max-w-md">
                                <div
                                    className="pointer-events-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-xl max-h-full overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()}
                                    onTouchStart={(e) => e.stopPropagation()}
                                    onTouchEnd={(e) => e.stopPropagation()}
                                >
                                    <RegionInfo
                                        region={selectedRegion}
                                        onClose={handleRegionInfoClose}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* 背景ぼかしエフェクト */}
            <div className="pointer-events-none absolute -left-16 bottom-8 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl z-0" />
            <div className="pointer-events-none absolute right-14 bottom-20 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl z-0" />
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
                onHover(id);
            }}
            whileHover={{ scale: 1.15 }}
            whileFocus={{ scale: 1.15 }}
            whileTap={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            style={{ willChange: "transform" }}
        />
    );
}
