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

    return (
        <div className="rounded-2xl bg-white/95 p-4 md:p-6 shadow-md border border-black/5 w-full overflow-visible max-h-max md:max-w-[480px] lg:max-w-[520px]">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-semibold">{data.title}</h3>
                    <p className="mt-2 text-sm md:text-base text-neutral-700 whitespace-normal break-words">{data.body}</p>
                </div>
                <div className="md:ml-4 flex-shrink-0">
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onClose && onClose(); }}
                        aria-label="この地域を閉じる"
                        className="group mt-2 inline-flex items-center justify-between gap-3 rounded-2xl bg-yellow-400 px-4 py-2 text-[14px] md:text-[15px] font-semibold text-neutral-900 shadow-sm hover:bg-yellow-300 active:bg-yellow-400/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/60 whitespace-nowrap"
                    >
                        <span>もっと見る</span>
                        <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                </div>
            </div>
        </div>
    );
}
