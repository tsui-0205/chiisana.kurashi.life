"use client";

import React from "react";
import { motion } from "framer-motion";
import useInView from "@/hooks/useInView";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WorksSection() {
    const router = useRouter();
    const [ref, inView] = useInView({ threshold: 0.15 });

    return (
        <div className="works-section relative overflow-hidden bg-white text-zinc-800">
            {/* タイトル */}
            <div
                id="works"
                className="font-body container mx-auto mb-6 md:mb-12 relative px-6"
            >
                <div className="flex items-center gap-3">
                    <div className="h-0.5 w-24 bg-black rounded-full" />
                    <h2 className="text-[22px] sm:text-[28px] md:text-[38px] font-bold text-zinc-700 tracking-[0.18em] md:pl-[80px] whitespace-nowrap">
                        夫のつぶやき
                    </h2>
                </div>
            </div>

            {/* アニメーション付きセクション */}
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: "easeOut" }}
            >
                {/* メイン画像 */}
                <main className="container mx-auto px-4">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/images/husbandwork/twitterMain.jpg"
                            alt="夫のつぶやき"
                            width={900}
                            height={300}
                            className="rounded-md"
                            style={{ height: "auto" }}
                        />
                    </div>
                </main>

                {/* 「つぶやきへ」ボタン */}
                <div className="mt-14 text-center fade-in-up mb-24 md:mb-32">
                    <Link
                        href="/site/blog"
                        className="group inline-flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-6 focus:outline-none"
                        aria-label="つぶやきへ"
                        onClick={(e) => {
                            e.preventDefault();
                            try {
                                window.dispatchEvent(new Event("__page-loader:show"));
                            } catch { }
                            setTimeout(() => router.push("/site/blog"), 50);
                        }}
                    >
                        <span className="grid place-items-center w-20 h-20 rounded-full border border-[#84B5C5] bg-zinc-100/60 text-[#84B5C5] shadow-sm transition-all group-hover:border-zinc-600 group-hover:bg-zinc-200/80 group-focus-visible:ring-1 group-focus-visible:ring-[#84B5C5]/50">
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="transition-transform duration-200 group-hover:translate-x-1"
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

                        <span className="text-[#84B5C5] text-xl sm:text-2xl tracking-wide font-semibold py-2 group-hover:underline underline-offset-4 decoration-[#84B5C5] transition-colors">
                            つぶやきへ
                        </span>
                    </Link>
                </div>

                {/* 背景ぼかしエフェクト */}
                <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl z-0" />
                <div className="pointer-events-none absolute right-10 top-16 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl z-0" />

                <style jsx>{`
          .works-section {
            padding: 2rem 1rem;
          }
        `}</style>
            </motion.div>
        </div>
    );
}
