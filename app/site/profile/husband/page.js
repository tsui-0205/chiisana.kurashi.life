"use client";

import React from "react";
import Link from "next/link";
import ContactFooter from "@/components/sections/home/ContactFooter";

export default function HusbandProfilePage() {
    const profileData = {
        name: '夫',
        image: '/images/profiles/husband.jpg',
        introduction: 'エンジニアとして働きながら、石川県での生活を満喫しています。技術への探求心と、自然豊かな環境での暮らしのバランスを大切にしています。',
        skills: [
            { category: 'プログラミング', items: ['JavaScript', 'React', 'Node.js', 'Python'] },
            { category: 'デザイン', items: ['Figma', 'Adobe Photoshop', 'UI/UX設計'] },
            { category: '写真撮影', items: ['風景写真', 'ポートレート', '日常スナップ'] },
            { category: 'スポーツ', items: ['フットサル', 'ランニング', 'サイクリング'] }
        ],
        hobbies: ['読書（技術書・小説）', '写真撮影', 'コーヒー豆の焙煎', '散歩', 'ブログ執筆'],
        philosophy: '技術と自然、都市と田舎、仕事と趣味。一見相反するものの調和を見つけることで、より豊かな人生を築けると信じています。',
        portfolio: [
            {
                title: 'ウェブアプリケーション開発',
                description: 'React & Node.jsを使用したフルスタック開発',
                tags: ['React', 'Node.js', 'MongoDB']
            },
            {
                title: 'UI/UXデザイン',
                description: 'ユーザー中心設計に基づいたインターフェース設計',
                tags: ['Figma', 'Adobe XD', 'プロトタイピング']
            },
            {
                title: '風景写真',
                description: '石川県の自然を中心とした風景写真',
                tags: ['Canon', 'Lightroom', '自然写真']
            }
        ]
    };

    return (
        <main className="min-h-screen bg-neutral-100 text-neutral-900">
            {/* ヘロー画像セクション */}
            <div className="relative h-96 w-full overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="/images/main.jpg"
                        alt="hero"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* ナビゲーション */}
                <div className="absolute top-8 left-8 z-20">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 transition-all duration-200"
                    >
                        <span className="grid place-items-center w-12 h-12 rounded-full border border-white/70 bg-white/20 text-white shadow-sm transition-all backdrop-blur-sm
                            group-hover:border-white group-hover:bg-white/30">
                            <svg
                                width="20" height="20" viewBox="0 0 24 24" fill="none"
                                className="transition-transform duration-200 group-hover:-translate-x-1"
                            >
                                <path d="M18 12H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M6 15l-4-3 4-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-white text-base tracking-wider font-bold py-2 group-hover:underline underline-offset-4 decoration-white transition-colors" style={{ letterSpacing: '0.12em' }}>
                            ホームへ戻る
                        </span>
                    </Link>
                </div>

                {/* タイトル */}
                <div className="absolute bottom-8 left-8 z-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                        夫のプロフィール
                    </h1>
                    <p className="text-white/90 text-lg mt-2 drop-shadow">
                        エンジニア・写真家・石川在住
                    </p>
                </div>
            </div>

            {/* メインコンテンツ */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* プロフィール概要 */}
                <div className="grid md:grid-cols-3 gap-12 mb-16">
                    {/* プロフィール画像 */}
                    <div className="md:col-span-1">
                        <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-lg">
                            <img
                                src={profileData.image}
                                alt={profileData.name}
                                className="w-full aspect-square rounded-xl object-cover"
                            />
                        </div>
                    </div>

                    {/* 基本情報 */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-3xl font-semibold text-zinc-800 mb-4">自己紹介</h2>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                {profileData.introduction}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-zinc-800 mb-3">人生哲学</h3>
                            <p className="text-zinc-600 leading-relaxed bg-zinc-50 rounded-xl p-4">
                                {profileData.philosophy}
                            </p>
                        </div>
                    </div>
                </div>

                {/* スキル・専門分野 */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-zinc-800 mb-8 text-center">
                        スキル・専門分野
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {profileData.skills.map((skill, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                                <h3 className="text-xl font-semibold text-zinc-800 mb-4">{skill.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item, itemIndex) => (
                                        <span
                                            key={itemIndex}
                                            className="px-3 py-2 bg-[#84B5C5]/10 text-[#84B5C5] text-sm rounded-lg border border-[#84B5C5]/20"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 趣味・興味 */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-zinc-800 mb-8 text-center">
                        趣味・興味
                    </h2>
                    <div className="bg-white rounded-xl p-8 shadow-md">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {profileData.hobbies.map((hobby, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                >
                                    {hobby}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ポートフォリオ・実績 */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-zinc-800 mb-8 text-center">
                        ポートフォリオ・実績
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {profileData.portfolio.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-lg font-semibold text-zinc-800 mb-3">{item.title}</h3>
                                <p className="text-zinc-600 mb-4 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 連絡先・メッセージ */}
                <section className="text-center bg-white rounded-xl p-8 shadow-md">
                    <h2 className="text-2xl font-semibold text-zinc-800 mb-4">
                        お気軽にお声かけください
                    </h2>
                    <p className="text-zinc-600 mb-6 max-w-2xl mx-auto">
                        技術的なお話や写真についてのご相談、石川県での暮らしについてなど、
                        どんなことでもお気軽にお声かけください。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/#about"
                            className="group inline-flex items-center gap-3 transition-all duration-200"
                        >
                            <span className="grid place-items-center w-12 h-12 rounded-full border border-[#84B5C5] bg-[#84B5C5]/10 text-[#84B5C5] shadow-sm transition-all
                              group-hover:border-zinc-600 group-hover:bg-zinc-200/80">
                                <svg
                                    width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    className="transition-transform duration-200 group-hover:-translate-x-1"
                                >
                                    <path d="M18 12H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    <path d="M6 15l-4-3 4-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span className="text-[#84B5C5] text-base tracking-wide font-medium py-2
                              group-hover:underline underline-offset-4 decoration-[#84B5C5] transition-colors">
                                プロフィール一覧へ
                            </span>
                        </Link>
                    </div>
                </section>
            </div>

            {/* ContactFooter */}
            <ContactFooter />
        </main>
    );
}
