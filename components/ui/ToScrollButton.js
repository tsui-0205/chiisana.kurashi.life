"use client";
import React, { useCallback } from "react";

/**
 * 下へスクロールするボタン部品（ToTopButton と同等のサイズ感・形状）
 */
function ToScrollButton({
    href = "#",
    className = "",
    title = "下へ移動",
    ariaLabel = "ページ下部へ移動",
    onClick,
    ...rest
}) {
    const handleClick = useCallback(
        (e) => {
            if (onClick) {
                e.preventDefault();
                onClick(e);
                return;
            }

            if (href && href.startsWith("#")) {
                e.preventDefault();
                const id = href === "#" ? null : href;
                if (id) {
                    const el = document.querySelector(id);
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                        return;
                    }
                }
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            }
        },
        [href, onClick]
    );

    return (
        <a
            href={href}
            className={`relative block w-20 h-20 md:w-32 md:h-32 bg-transparent z-50 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-full ${className}`}
            title={title}
            aria-label={ariaLabel}
            onClick={handleClick}
            {...rest}
        >
            <span className="relative block w-full h-full">
                <img
                    src="/images/toScroll.png"
                    alt="下へスクロール"
                    draggable="false"
                    className="absolute inset-0 m-auto max-w-full max-h-full object-contain translate-y-1 md:translate-y-2 scale-x-110 animate-bob motion-reduce:animate-none"
                />

                {/* 単一の汗要素に統合（位置・大きさは調整可） */}
                <span className="absolute right-3 top-4 md:right-8 md:top-7 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-amber-300/75 blur-[0.5px] animate-sweat motion-reduce:animate-none" aria-hidden />
            </span>
        </a>
    );
}

export default React.memo(ToScrollButton);
