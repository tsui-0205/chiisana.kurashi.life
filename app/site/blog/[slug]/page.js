"use client";
import React from "react";
import ContactFooter from "@/components/sections/home/ContactFooter";

// ===== Simple Post (odekake-camera 個別記事 風) =====
// 画面中央に「タイトル→日付→大きな画像（白フチ＆影）」のみを配置。
// 余白たっぷり・モノトーン・可読性重視。必要最小限のスタイルに絞っています。

// SimplePost 型定義:
// {
//   title: string;
//   date: string; // ISO 8601 もしくは YYYY.MM.DD を想定
//   hero: { src: string; alt?: string };
// }

const fmtDateDot = (d) => {
    // 受け取りが ISO の場合は YYYY.MM.DD に整形
    const isIso = /\d{4}-\d{2}-\d{2}/.test(d);
    if (!isIso) return d; // 既に "2025.08.28" のような書式ならそのまま
    const dt = new Date(d);
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const day = String(dt.getDate()).padStart(2, "0");
    return `${y}.${m}.${day}`;
};

const sample = {
    title: "祝！自分だけの城？",
    date: "2025-08-28",
    hero: {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=2000",
        alt: "家の廊下で作業する人の後ろ姿",
    },
    content: "この記事では、私たちの新しい住まいについて紹介します。静かな住宅街に位置するこの家は、自然光がたっぷりと入る明るい空間が特徴です。リビングルームは開放的で、家族が集まってリラックスできる場所となっています。\n\nキッチンは機能的でありながらも美しいデザインが施されており、料理をするのが楽しくなります。また、庭には季節の花々が植えられ、四季を通じて異なる表情を見せてくれます。\n\nこの家での新しい生活は、私たちにとって新たなスタートを意味しています。ここで過ごす時間が、かけがえのない思い出となることを願っています。"
};

export default function BlogPostSimple({ post = sample }) {
    return (
        <main className="min-h-screen bg-neutral-100 text-neutral-900">
            {/* Header with Logo and Navigation */}
            <header className="bg-white border-b border-neutral-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo/Site Name */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">OC</span>
                            </div>
                            <span className="text-lg font-semibold tracking-wide">おでかけカメラ</span>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden sm:flex items-center space-x-6 text-sm">
                            <a href="/" className="text-neutral-600 hover:text-neutral-900 transition">Home</a>
                            <a href="/site/blog" className="text-neutral-900 font-medium">Blog</a>
                            <a href="#" className="text-neutral-600 hover:text-neutral-900 transition">About</a>
                            <a href="#" className="text-neutral-600 hover:text-neutral-900 transition">Contact</a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Breadcrumbs */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <nav className="text-sm text-neutral-500 mb-4">
                    <a href="/" className="hover:text-neutral-700 transition">Home</a>
                    <span className="mx-2">/</span>
                    <a href="/site/blog" className="hover:text-neutral-700 transition">Blog</a>
                    <span className="mx-2">/</span>
                    <span className="text-neutral-900">{post.title}</span>
                </nav>
            </div>

            {/* Title Section */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
                        {post.title}
                    </h1>
                    <p className="mt-3 text-sm tracking-widest font-semibold text-neutral-700">
                        {fmtDateDot(post.date)}
                    </p>

                    {/* Category/Tags */}
                    <div className="mt-4 flex justify-center">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-200 text-xs font-medium text-neutral-700">
                            <span className="w-2 h-2 bg-neutral-400 rounded-full mr-2"></span>
                            ライフスタイル
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero (white frame) - wider size */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
                <div className="mx-auto max-w-4xl rounded-md border-4 border-white shadow-[0_2px_0_0_rgba(0,0,0,0.06),0_10px_30px_-10px_rgba(0,0,0,0.25)] bg-white/50">
                    <img
                        src={post.hero.src}
                        alt={post.hero.alt ?? post.title}
                        className="block w-full h-auto object-cover"
                    />
                </div>
            </div>

            {/* Content - narrower than image */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="prose prose-neutral max-w-2xl mx-auto">
                    {post.content && post.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 leading-8 text-neutral-700">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>

            {/* Contact Footer */}
            <div className="mt-16">
                <ContactFooter />
            </div>
        </main>
    );
}