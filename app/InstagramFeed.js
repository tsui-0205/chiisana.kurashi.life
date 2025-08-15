"use client";
import { useState, useEffect } from "react";

// インスタグラム投稿のデータ（実際の投稿を手動で更新してください）
const instagramPosts = [
    {
        id: "1",
        postUrl: "https://www.instagram.com/p/DM_23O9SGfO/?utm_source=ig_web_copy_link&igsh=ZGkzdGhybzQwanZl",
        imageUrl: "/instagram/a.jpg"
    },
    {
        id: "2",
        postUrl: "https://www.instagram.com/p/DMkyHLmychN/?utm_source=ig_web_copy_link&igsh=MWV6eDd4MmFiY2p3NA==",
        imageUrl: "/instagram/1755241937405.jpg"
    },
    {
        id: "3",
        postUrl: "https://www.instagram.com/p/DMAQhUoS135/?utm_source=ig_web_copy_link&igsh=MTlsb2E2ZmpiejNiMA==",
        imageUrl: "/instagram/1755241937446.jpg"
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
        <section className="py-20 px-4 bg-gradient-to-b from-rose-50 to-pink-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                        Instagram
                    </h3>
                    <p className="text-gray-600 mb-6">
                        日々の暮らしをインスタグラムでも発信しています
                    </p>
                    <a
                        href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-800 font-medium transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z" />
                        </svg>
                        @chiisana.kurashi.life をフォロー
                    </a>
                </div>

                {/* インスタグラム投稿グリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {instagramPosts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => handlePostClick(post.postUrl)}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                        >
                            {/* 画像部分 */}
                            <div className="relative aspect-square overflow-hidden">
                                <img
                                    src={post.imageUrl}
                                    alt="Instagram投稿"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    onLoad={() => {
                                        handleImageLoad(post.id);
                                    }}
                                    onError={(e) => {
                                        handleImageError(post.id);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* もっと見るボタン */}
                <div className="text-center mt-12">
                    <a
                        href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-8 py-3 rounded-full text-white font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z" />
                        </svg>
                        インスタグラムでもっと見る
                    </a>
                </div>
            </div>
        </section>
    );
}
