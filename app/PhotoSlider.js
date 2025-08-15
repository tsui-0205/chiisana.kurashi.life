"use client";
import { useState, useEffect } from "react";

const images = [
    { 
        src: "/main.jpg", 
    },
];

export default function PhotoSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const goToSlide = (slideIndex) => {
        setIndex(slideIndex);
    };

    const goToPrevious = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="relative w-screen left-1/2 -translate-x-1/2 mb-12 group">
            {/* メインスライダー */}
            <div className="relative overflow-hidden h-96 md:h-[500px] lg:h-[600px]">
                <div className="relative w-full h-full">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${i === index
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-105'
                                }`}
                        >
                            {/* 背景グラデーション */}
                            <div className={`w-full h-full bg-gradient-to-br ${img.gradient}`}></div>
                            
                            {/* 画像オーバーレイ（画像が存在する場合） */}
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="absolute inset-0 w-full h-full object-contain opacity-80"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            
                            {/* アイコンとグラデーションオーバーレイ */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-6xl md:text-8xl opacity-20">
                                    {img.icon}
                                </div>
                            </div>

                            {/* 装飾的な枠線 */}
                            <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-white/40"></div>
                            <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-white/40"></div>
                            <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-white/40"></div>
                            <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-white/40"></div>
                        </div>
                    ))}
                </div>

                {/* 左右ナビゲーション */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 border border-white/20"
                    aria-label="前の写真"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 border border-white/20"
                    aria-label="次の写真"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* プログレスバー */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
                    <div
                        className="h-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-4000 ease-linear"
                        style={{ width: `${((index + 1) / images.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* インジケーター */}
            <div className="flex justify-center gap-3 mt-8 px-4">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`transition-all duration-300 rounded-full border-2 ${i === index
                                ? "w-10 h-4 bg-rose-500 border-rose-500"
                                : "w-4 h-4 bg-transparent border-rose-300 hover:border-rose-400 hover:bg-rose-100"
                            }`}
                        aria-label={`写真 ${i + 1}へ移動`}
                    />
                ))}
            </div>
        </div>
    );
}
