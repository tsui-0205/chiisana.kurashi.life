"use client";
import React, { useEffect, useState } from "react";

/**
 * ページトップへ戻るイラスト＋上向きアニメーションボタン
 * @param {Object} props
 * @param {string} [props.className] - 追加クラス
 * @param {function} [props.onClick] - クリックイベント
 * @param {string} [props.href] - aタグのhref（省略時はbutton）
 * @param {string} [props.title] - ツールチップ
 */
export default function ToTopButton({ className = "", onClick, href = "#top", title = "ページ上部へ", ...rest }) {
    const [rootHasHero, setRootHasHero] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        let obs;
        try {
            const hero = document.getElementById('hero');
            if (hero) {
                const io = new IntersectionObserver((entries) => {
                    entries.forEach(e => setRootHasHero(e.isIntersecting));
                }, { threshold: 0.5 });
                io.observe(hero);
                obs = io;
            } else {
                // fallback to root class mutation
                try { setRootHasHero(document.documentElement.classList.contains('hero-visible')); } catch (e) { }
                const mo = new MutationObserver(() => {
                    try { setRootHasHero(document.documentElement.classList.contains('hero-visible')); } catch (e) { }
                });
                try { mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] }); } catch (e) { }
                obs = mo;
            }
        } catch (e) {
            // noop
        }
        return () => { try { obs && obs.disconnect(); } catch (e) { } };
    }, []);

    // Avoid rendering until after client mount to prevent SSR/CSR markup mismatch
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;
    if (rootHasHero) return null;

    return (
        <>
            <style jsx>{`
                @keyframes bounce-gentle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                .animate-bounce-gentle {
                    animation: bounce-gentle 2s ease-in-out infinite;
                }
                @keyframes float-up {
                    0% { transform: translateY(20px); opacity: 0.8; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-40px); opacity: 0; }
                }
                .animate-float-up {
                    animation: float-up 2s ease-out infinite;
                }
            `}</style>
            <a
                href={href}
                className={`fixed bottom-6 right-6 z-50 transition-all duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-full group ${className}`}
                aria-label="ページ上部へ"
                title={title}
                onClick={onClick}
                {...rest}
            >
                <span className="relative block w-24 h-24 md:w-40 md:h-40 bg-transparent">
                    <img
                        src="/images/toTop.png"
                        alt=""
                        className="absolute inset-0 m-auto max-w-full max-h-full object-contain  animate-bounce-gentle motion-reduce:animate-none transition-transform duration-300"
                        draggable="false"
                    />
                    {/* もっと薄い黄色の丸がイラストの右側で下から上に移動 */}
                    <span className="absolute right-3 bottom-4 md:right-6 md:bottom-6 w-3 h-3 md:w-4 md:h-4 rounded-full bg-amber-200/30 blur-[0.4px] animate-float-up motion-reduce:animate-none" aria-hidden />

                    {/* 上向き矢印のヒント */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-neutral-600 animate-pulse">
                            <path d="M12 4l-8 8h16l-8-8z" fill="currentColor" />
                        </svg>
                    </div>
                </span>
            </a>
        </>
    );
}
