"use client";

import { ArrowRight } from "lucide-react";

export default function RegionInfo({ region, onClose }) {
    if (!region) return null;

    const CONTENT = {
        noto: {
            title: "能登",
            body: "輪島や珠洲の海辺、千枚田など自然と海の恵みが豊富なエリアです。",
        },
        kanazawa: {
            title: "金沢",
            body: "兼六園や茶屋街など文化と歴史が息づく町。美術館や工芸も魅力です。",
        },
        kaga: {
            title: "加賀",
            body: "温泉地や伝統工芸（九谷焼）で知られる、温かい里の風景が広がります。",
        },
        hakusan: {
            title: "白山",
            body: "霊峰白山を中心とした山岳地帯。自然歩道や清流が魅力です。",
        },
    };

    const data = CONTENT[region] || { title: region, body: "説明はありません。" };
    const handleClose = () => {
        // Prefer parent callback
        if (typeof onClose === 'function') {
            onClose();
            return;
        }

        // Fallback: dispatch a custom event so a parent or window listener can react
        try {
            const ev = new CustomEvent('regioninfo:close', { detail: { region } });
            window.dispatchEvent(ev);
        } catch (e) {
            // noop
        }
    };

    return (
        <div className="rounded-lg bg-white p-4 md:p-6 shadow-lg border border-gray-200 w-full relative">
            {/* 閉じるボタン（右上） */}
            <button
                type="button"
                onClick={handleClose}
                onTouchEnd={handleClose}
                onPointerDown={handleClose}
                aria-label="閉じる"
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/0 hover:bg-[rgba(132,181,197,0.12)] transition-colors z-20 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent', color: 'rgb(132,181,197)' }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
            </button>

            <div className="pr-8">
                <h3 className="text-lg md:text-xl font-semibold mb-2">{data.title}</h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">{data.body}</p>

                <div className="flex gap-2 flex-wrap items-center">
                    <div className="flex-1" />
                    <div>
                        <button
                            type="button"
                            className="hidden group items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-yellow-300 transition-colors touch-manipulation"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                            <span>もっと見る</span>
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
