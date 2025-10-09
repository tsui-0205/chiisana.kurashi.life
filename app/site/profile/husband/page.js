"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// アクセントカラー（柔らかいブルー）
const ACCENT = "#84B5C5";

const profile = {
    name: "夫",
    image: "/images/profiles/husband.jpg",
    intro:
        "エンジニアとして働きながら、石川県での生活を満喫。技術への探求心と自然のバランスを大切にしています。",
    skills: [
        {
            label: "プログラミング",
            items: ["JavaScript", "React", "Node.js", "Python"],
        },
        {
            label: "デザイン",
            items: ["Figma", "Photoshop", "UI/UX設計"],
        },
        {
            // '写真撮影' removed per request
            items: ["風景", "ポートレート", "日常スナップ"],
        },
    ],
    portfolio: [
        {
            title: "Webアプリ開発",
            desc: "React & Node.js のフルスタック",
            tags: ["React", "Node.js"],
        },
        {
            title: "UI/UXデザイン",
            desc: "ユーザー中心設計",
            tags: ["Figma", "Prototype"],
        },
        {
            // '風景写真' removed per request
            desc: "石川県の自然が中心",
            tags: ["Lightroom", "Canon"],
        },
    ],
};

export default function HusbandProfilePage() {
    return (
        <main className="min-h-screen bg-neutral-50 text-neutral-800 relative">
            {/* 背景装飾 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-white z-[-1]" />
            <div className="absolute top-[10%] left-[60%] w-[120px] h-[120px] bg-sky-100 rounded-full blur-3xl opacity-50 animate-pulse" />
            <div className="absolute bottom-[20%] right-[10%] w-[80px] h-[80px] bg-amber-100 rounded-full blur-2xl opacity-60" />

            {/* HERO */}
            <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <motion.div
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="overflow-hidden shadow-lg relative rounded-none max-w-[420px] w-full mx-auto"
                >
                    <Image
                        src={profile.image}
                        alt="夫の写真"
                        width={600}
                        height={700}
                        className="w-full h-auto object-cover"
                        priority
                    />
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
                        夫のプロフィール
                    </h1>
                    <p className="text-lg leading-8 text-neutral-700">{profile.intro}</p>
                </motion.div>
            </section>

            {/* SKILLS */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-semibold mb-10 text-center"
                >
                    スキル
                </motion.h2>

                <div className="space-y-8">
                    {profile.skills.map((s, i) => (
                        <motion.div
                            key={s.label ?? `skill-${i}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-white border border-neutral-200 p-6 rounded-xl shadow-sm"
                        >
                            <p className="text-lg font-semibold mb-4" style={{ color: ACCENT }}>
                                {s.label}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {s.items.map((item, j) => (
                                    <span
                                        key={`${item}-${j}`}
                                        className="px-3 py-1.5 text-sm rounded-full border"
                                        style={{
                                            borderColor: `${ACCENT}33`,
                                            background: `${ACCENT}14`,
                                            color: ACCENT,
                                        }}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* PORTFOLIO */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-semibold mb-10 text-center"
                >
                    ポートフォリオ
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {profile.portfolio.map((p, i) => (
                        <motion.article
                            key={p.title ?? `portfolio-${i}`}
                            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border border-neutral-200 rounded-xl p-5 transition-shadow"
                        >
                            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                            <p className="text-sm text-neutral-600 mb-4">{p.desc}</p>
                            <div className="flex flex-wrap gap-2 text-sm">
                                {p.tags.map((tag, k) => (
                                    <span
                                        key={`${tag}-${k}`}
                                        className="px-2 py-1 rounded border border-neutral-200 bg-neutral-50"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white border border-neutral-200 rounded-2xl p-10 text-center shadow-md"
                >
                    <h3 className="text-2xl font-semibold mb-4">お気軽にお声かけください</h3>
                    <p className="text-neutral-600 max-w-xl mx-auto mb-6">
                        技術や写真のご相談、石川での暮らしのことなど、軽いメッセージでも大歓迎です。
                    </p>
                    <Link
                        href="/#about"
                        className="inline-flex items-center gap-2 px-5 py-3 border rounded-lg text-sm font-medium transition-colors"
                        style={{ borderColor: `${ACCENT}66`, color: ACCENT }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18 12H6"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                            <path
                                d="M6 15l-4-3 4-3"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        プロフィール一覧へ
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
