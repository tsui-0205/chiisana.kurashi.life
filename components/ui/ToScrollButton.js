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
        <>
            <style jsx>{`
                @keyframes float-down {
                    0% { transform: translateY(-20px); opacity: 0.8; }
                    50% { opacity: 1; }
                    100% { transform: translateY(40px); opacity: 0; }
                }
                .animate-float-down {
                    animation: float-down 2s ease-out infinite;
                }
                @keyframes bounce-down {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(4px); }
                }
                .animate-bounce-down {
                    animation: bounce-down 2s ease-in-out infinite;
                }
            `}</style>
            <a
                href={href}
                className={`relative block w-20 h-20 md:w-32 md:h-32 bg-transparent z-50 transition-all duration-300 hover:opacity-90 hover:translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-full group ${className}`}
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
                        className="absolute inset-0 m-auto max-w-full max-h-full object-contain animate-bounce-down motion-reduce:animate-none transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* 単一の浮遊ドット（上から下に移動） */}
                    <span className="absolute right-3 top-4 md:right-8 md:top-7 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-amber-300/40 blur-[0.4px] animate-float-down motion-reduce:animate-none" aria-hidden />
                </span>
            </a>
        </>
    );
}

export default React.memo(ToScrollButton);
