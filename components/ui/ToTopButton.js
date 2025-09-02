"use client";
import React, { useEffect, useState } from "react";

/**
 * ページトップへ戻るイラスト＋汗アニメーションボタン
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
        <a
            href={href}
            className={`fixed bottom-6 right-6 z-50 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-full ${className}`}
            aria-label="ページ上部へ"
            title={title}
            onClick={onClick}
            {...rest}
        >
            <span className="relative block w-20 h-20 md:w-32 md:h-32 bg-transparent">
                <img
                    src="/images/toTop.png"
                    alt=""
                    className="absolute inset-0 m-auto max-w-full max-h-full object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.35)] translate-y-1 md:translate-y-2 scale-x-110 animate-bob motion-reduce:animate-none"
                    draggable="false"
                />
                {/* 落ちる汗（ポタポタ） */}
                <span className="absolute right-2 top-2 md:right-7 md:top-6 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-sky-300/80 blur-[0.5px] animate-sweat [animation-delay:.0s] motion-reduce:animate-none" />
                <span className="absolute right-3 top-6 md:right-9 md:top-9 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-sky-300/70 blur-[0.5px] animate-sweat [animation-delay:.35s] motion-reduce:animate-none" />
                <span className="absolute right-5 top-10 md:right-11 md:top-12 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-sky-300/60 blur-[0.5px] animate-sweat [animation-delay:.7s] motion-reduce:animate-none" />
                {/* 飛び散る汗（ピュッ） */}
                <span className="absolute right-1 top-1 md:right-6 md:top-5 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-sky-300/70 blur-[0.5px] animate-sweat-splash [animation-delay:1s] motion-reduce:animate-none" />
                <span className="absolute right-0 top-5 md:right-4 md:top-8 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-sky-300/60 blur-[0.5px] animate-sweat-splash [animation-delay:1.3s] motion-reduce:animate-none" />
            </span>
        </a>
    );
}
