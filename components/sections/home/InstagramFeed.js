"use client";
import { useState, useEffect } from "react";
import SectionHeader from "../../ui/SectionHeader";

// インスタグラム投稿のデータ（実際の投稿を手動で更新してください）
const instagramPosts = [
    {
        id: "1",
        postUrl: "https://www.instagram.com/p/DM_23O9SGfO/?utm_source=ig_web_copy_link&igsh=ZGkzdGhybzQwanZl",
        imageUrl: "/images/instagram/a.jpg"
    },
    {
        id: "2",
        postUrl: "https://www.instagram.com/p/DMkyHLmychN/?utm_source=ig_web_copy_link&igsh=MWV6eDd4MmFiY2p3NA==",
        imageUrl: "/images/instagram/1755241937405.jpg"
    },
    {
        id: "3",
        postUrl: "https://www.instagram.com/p/DMAQhUoS135/?utm_source=ig_web_copy_link&igsh=MTlsb2E2ZmpiejNiMA==",
        imageUrl: "/images/instagram/1755241937446.jpg"
    }
];

export default function InstagramFeed() {
    const [loadedImages, setLoadedImages] = useState({});

    // デバッグ用：コンポーネントマウント時にパスを確認
    useEffect(() => {
        console.log('Instagram投稿データ:', instagramPosts);
        instagramPosts.forEach(post => {
            console.log(`画像パス: ${post.imageUrl}`);
        });
    }, []);

    const handleImageLoad = (postId) => {
        setLoadedImages(prev => ({
            ...prev,
            [postId]: true
        }));
    };

    const handleImageError = (postId) => {
        setLoadedImages(prev => ({
            ...prev,
            [postId]: false
        }));
    };

    const handlePostClick = (postUrl) => {
        window.open(postUrl, '_blank', 'noopener noreferrer');
    };

    return (
        <section className="relative overflow-hidden bg-white text-zinc-800">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
                .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
                .font-hand { font-family: 'Yomogi', 'Noto Sans JP', sans-serif; letter-spacing: .02em; }
            `}</style>

            {/* Soft color blobs */}
            <div className="pointer-events-none absolute left-32 top-24 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl" />
            <div className="pointer-events-none absolute left-52 top-52 h-64 w-64 rounded-full bg-pink-100/40 blur-3xl" />

            {/* Section Header */}
            <div className="px-6 py-24 pb-8">
                <SectionHeader 
                    title="Instagram" 
                    subtitle="日々の暮らしをインスタグラムでも発信しています"
                />
            </div>

            <div className="mx-auto max-w-6xl px-6 py-8 pb-24 font-body">
                {/* Instagram Link */}
                <div className="text-center mb-12">
                    <a
                        href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors tracking-wide"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z" />
                        </svg>
                        @chiisana.kurashi.life
                    </a>
                </div>

                {/* インスタグラム投稿グリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {instagramPosts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => handlePostClick(post.postUrl)}
                            className="relative mx-auto w-full max-w-md cursor-pointer group"
                        >
                            <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-[0_10px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.12)] transition-all duration-300">
                                <img
                                    src={post.imageUrl}
                                    alt="Instagram投稿"
                                    className="aspect-square w-full rounded-xl object-cover"
                                    loading="lazy"
                                    onLoad={() => {
                                        handleImageLoad(post.id);
                                    }}
                                    onError={(e) => {
                                        handleImageError(post.id);
                                    }}
                                />
                                {/* inner soft shadow */}
                                <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_80px_rgba(0,0,0,0.06)]" />

                                {/* Hover overlay */}
                                <div className="absolute inset-2 rounded-xl bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* もっと見るボタン */}
                <div className="text-center mt-16">
                    <a
                        href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border-2 border-zinc-300 px-8 py-3 rounded-full text-zinc-700 font-medium hover:bg-zinc-50 transition-colors tracking-wide"
                    >
                        インスタグラムでもっと見る
                    </a>
                </div>
            </div>

            {/* Scroll to top button */}
            <div className="fixed bottom-6 right-6">
                <a
                    href="#top"
                    className="group grid h-12 w-12 place-items-center rounded-full border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
                    aria-label="ページ上部へ"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 14l6-6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
