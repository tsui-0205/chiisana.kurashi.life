'use client';

import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../../ui/SectionHeader';
import ToTopButton from '../../ui/ToTopButton';

export default function AboutUsSection({ showToTop = false, hideWhenHeroVisible = false }) {
    // ...existing code...
    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleItems, setVisibleItems] = useState(new Set());
    const observerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = entry.target.getAttribute('data-index');
                        if (index) {
                            setVisibleItems(prev => new Set([...prev, index]));
                        }
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '-10% 0px -10% 0px'
            }
        );

        // コンポーネントマウント後に要素を監視
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll('[data-animate="true"]');
            elements.forEach((el) => {
                observer.observe(el);
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        // スライドが変更されたときに新しい要素を監視
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll('[data-animate="true"]:not([data-observed])');
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const index = entry.target.getAttribute('data-index');
                            if (index) {
                                setVisibleItems(prev => new Set([...prev, index]));
                            }
                        }
                    });
                },
                {
                    threshold: 0.2,
                    rootMargin: '-10% 0px -10% 0px'
                }
            );

            elements.forEach((el) => {
                observer.observe(el);
                el.setAttribute('data-observed', 'true');
            });
        }, 100);

        return () => clearTimeout(timer);
    }, [currentSlide]);

    const profiles = [
        {
            id: 'couple',
            name: '石川で暮らす夫婦',
            image: '/images/profiles/17552437879081.jpg',
            description: '石川県の豊かな自然に囲まれて、夫婦ふたりでゆったりと暮らしています。季節ごとに変わる風景、近所への散歩、ちょっとした発見...そんな何気ない日常の中にある小さな幸せを大切にして、この場所で記録していきたいと思います。'
        },
        {
            id: 'wife',
            name: 'わたし',
            // role: '音楽と食べることが大好き',
            image: '/images/profiles/wife.jpg',
            description: '毎日の生活の中で、音楽を聴きながらお菓子を作る時間が一番の楽しみです。特にピアノを弾いて過ごす午後のひととき、手作りのお菓子と一緒にコーヒーを飲む時間を大切にしています。'
        },
        {
            id: 'husband',
            name: '夫',
            // role: 'フットサルと読書が日課',
            image: '/images/profiles/husband.jpg',
            description: '週末はフットサルで体を動かし、平日の夜は読書の時間を楽しんでいます。最近は写真撮影にも興味を持ち、日常の風景や妻との思い出を記録することが新しい趣味になっています。'
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % profiles.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + profiles.length) % profiles.length);
    };

    return (
        <section id="about" className="relative overflow-hidden bg-white text-zinc-800">
            {/* Google Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
                .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
                .font-hand { font-family: 'Yomogi', 'Noto Sans JP', sans-serif; letter-spacing: .02em; }
                .text-shadow-soft { text-shadow: 0 6px 30px rgba(0,0,0,.06); }
                
                /* 名前デザイン */
                .portfolio-title,
                .name-text h3 {
                    font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif;
                    font-size: 24px; 
                    font-weight: 500; 
                    letter-spacing: 0.18em; 
                    padding: 10px 0 24px;
                    transition: all 0.4s;
                    margin: 0 0 32px 0; /* mb-8 相当 */
                    color: rgba(63,63,70,1); 
                }

                .fade-in-up {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                
                .fade-in-up.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .fade-in-left {
                    opacity: 0;
                    transform: translateX(-50px);
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                
                .fade-in-left.visible {
                    opacity: 1;
                    transform: translateX(0);
                }
                
                .fade-in-right {
                    opacity: 0;
                    transform: translateX(50px);
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                
                .fade-in-right.visible {
                    opacity: 1;
                    transform: translateX(0);
                }
            `}</style>

            {/* Soft color blobs */}
            <div className="pointer-events-none absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
            <div className="pointer-events-none absolute right-14 bottom-20 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />

            {/* Section Header - Independent positioning */}
            <div className="font-body mx-auto" style={{ margin: '80px auto 24px', maxWidth: '1200px', position: 'relative' }}>
                <div
                    className={`flex items-center gap-3 fade-in-up ${visibleItems.has('header') ? 'visible' : ''}`}
                    data-animate="true"
                    data-index="header"
                >
                    <div className="h-0.5 w-24 bg-black rounded-full"></div>
                    <h2 className="text-[22px] sm:text-[28px] md:text-[38px] font-bold text-zinc-700 tracking-[0.18em] md:pl-[80px] whitespace-nowrap">わたしたちのこと</h2>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-8 pb-24 font-body">
                {/* Slider Container */}
                <div
                    className={`relative overflow-hidden fade-in-up ${visibleItems.has('slider') ? 'visible' : ''}`}
                    data-animate="true"
                    data-index="slider"
                    style={{ transitionDelay: '0.2s' }}
                >
                    {/* Slides */}
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {profiles.map((profile, index) => (
                            <div key={profile.id} className="w-full flex-shrink-0 px-4">
                                <div className="grid items-center gap-16 md:grid-cols-2 min-h-[500px]">
                                    {/* Left: text */}
                                    <div className="space-y-6">
                                        <div className="name-text">
                                            <h3 className="portfolio-title font-hand">
                                                {profile.name}
                                            </h3>
                                        </div>
                                        <p className="leading-8 text-zinc-500">
                                            {profile.description}
                                        </p>
                                    </div>

                                    {/* Right: photo card */}
                                    <div className="relative mx-auto w-full max-w-md">
                                        <div className="relative overflow-hidden rounded-full bg-white p-2 shadow-[0_10px_50px_rgba(0,0,0,0.08)]">
                                            <img
                                                src={profile.image}
                                                alt={profile.name}
                                                className="aspect-square w-full rounded-full object-cover text-shadow-soft"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />
                                            {/* inner soft shadow */}
                                            <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_80px_rgba(0,0,0,0.06)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 bg-white hover:bg-zinc-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10 border border-zinc-200 fade-in-left ${visibleItems.has('nav') ? 'visible' : ''}`}
                        aria-label="前のスライド"
                        data-animate="true"
                        data-index="nav"
                        style={{ transitionDelay: '0.4s' }}
                    >
                        <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 bg-white hover:bg-zinc-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10 border border-zinc-200 fade-in-right ${visibleItems.has('nav') ? 'visible' : ''}`}
                        aria-label="次のスライド"
                        style={{ transitionDelay: '0.4s' }}
                    >
                        <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>

                    {/* Slide Indicators */}
                    <div
                        className={`mt-12 flex justify-center gap-2 fade-in-up ${visibleItems.has('indicators') ? 'visible' : ''}`}
                        data-animate="true"
                        data-index="indicators"
                        style={{ transitionDelay: '0.6s' }}
                    >
                        {profiles.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 rounded-full transition-all duration-200 ${currentSlide === index
                                    ? 'bg-zinc-600 w-8'
                                    : 'bg-zinc-300 hover:bg-zinc-400 w-2'
                                    }`}
                                aria-label={`スライド ${index + 1} へ移動`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ページトップへ（共通部品） */}
            <ToTopButton />
        </section>
    );
}