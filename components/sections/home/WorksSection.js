"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function WorksSection() {
    const router = useRouter();
    // tweets data removed per request — rendering a simple placeholder instead

    return (
        <section className="works-section relative overflow-hidden bg-white text-zinc-800">
            {/* ✅ タイトル用 container */}
            <div className="font-body container mx-auto mt-0 md:mt-0 mb-6 md:mb-12 relative px-6">
                <div
                    className={`flex items-center gap-3 fade-in-up ${/* visibleItems not present in this component; keep as static visible */ ''}`}
                    data-animate="true"
                    data-index="header"
                >
                    <div className="h-0.5 w-24 bg-black rounded-full"></div>
                    <h2 className="text-[22px] sm:text-[28px] md:text-[38px] font-bold text-zinc-700 tracking-[0.18em] md:pl-[80px] whitespace-nowrap">夫のつぶやき</h2>
                </div>
            </div>

            <main className="content container">
                <div className="twitter-main-image mx-auto mb-6 max-w-[900px]">
                    <Image src="/images/husbandwork/twitterMain.jpg" alt="夫のつぶやき" width={900} height={300} className="rounded-md object-cover" />
                </div>
            </main>

            {/* 「つぶやきへ」ボタン */}
            <div className="mt-14 text-center fade-in-up">
                <Link
                    href="/site/blog"
                    className={`group inline-flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-6 focus:outline-none`}
                    aria-label="つぶやきへ"
                    onClick={(e) => {
                        e.preventDefault();
                        try { window.dispatchEvent(new Event('__page-loader:show')); } catch { }
                        // small delay to allow render
                        setTimeout(() => router.push('/site/blog'), 50);
                    }}
                >
                    <span className={`grid place-items-center w-20 h-20 rounded-full border border-[#84B5C5] bg-zinc-100/60 text-[#84B5C5] shadow-sm transition-all group-hover:border-zinc-600 group-hover:bg-zinc-200/80 group-focus-visible:ring-1 group-focus-visible:ring-[#84B5C5]/50`}>
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            className={`transition-transform duration-200 group-hover:translate-x-1`}
                        >
                            <path
                                d="M6 12h12"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                            <path
                                d="M18 9l4 3-4 3"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>

                    <span
                        className={`text-[#84B5C5] text-xl sm:text-2xl tracking-wide font-semibold py-2 group-hover:underline underline-offset-4 decoration-[#84B5C5] transition-colors`}
                    >
                        つぶやきへ
                    </span>
                </Link>
            </div>

            {/* ✅ 追加：背景のふんわりぼかし */}
            <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl z-0" />
            <div className="pointer-events-none absolute right-10 top-16 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl z-0" />

            <style jsx>{`
                .works-section { padding: 2rem 1rem; }
                .twitter-main-image { width: 100%; height: auto; }
            `}</style>
        </section>
    );
}
