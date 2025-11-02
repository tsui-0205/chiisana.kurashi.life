'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import ToTopButton from '../../ui/ToTopButton';

export default function AboutUsSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [visibleItems, setVisibleItems] = useState(new Set());
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // 画像をプリロード
    useEffect(() => {
        const imageSources = [
            '/images/profiles/fufu_explan.jpg',
            '/images/profiles/wife.jpg',
            '/images/profiles/husband.jpg'
        ];

        const imagePromises = imageSources.map((src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve; // エラーでも続行
                img.src = src;
            });
        });

        Promise.all(imagePromises)
            .then(() => setImagesLoaded(true))
            .catch(() => setImagesLoaded(true));
    }, []);

    // IntersectionObserverを統合（重複を削除）
    useEffect(() => {
        if (!imagesLoaded) return; // 画像がロードされるまで待つ

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
                threshold: 0.1,
                rootMargin: '0px 0px -5% 0px'
            }
        );

        const timer = setTimeout(() => {
            const elements = document.querySelectorAll('[data-animate="true"]');
            elements.forEach((el) => observer.observe(el));
        }, 50);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [imagesLoaded]);

    const profiles = [
        {
            id: 'couple',
            name: '石川で暮らす夫婦',
            image: '/images/profiles/fufu_explan.jpg',
            description: [
                '2025年2月5日、ニコニコの日に入籍。',
                '同じ地元で育った内気なふたりが、石川で過ごす小さな日常をゆるやかに綴ります。',
                'お金では買えない、日々の小さな幸せを大切にしています。',
                '生まれ育った町の風景や日常を少しずつ発信していきたいと考えています。'
            ]
        },
        {
            id: 'wife',
            name: 'わたし',
            image: '/images/profiles/wife.jpg',
            description: [
                (
                    <span key="wife-badge" style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        backgroundColor: '#eaf6f8',
                        color: '#84B5C5',
                        borderRadius: '6px',
                        fontWeight: 500,
                        fontSize: '14px',
                        letterSpacing: '0.05em',
                    }}>
                        テンション管理担当
                    </span>
                )
                ,
                '📍趣味',
                'カフェ巡り・カメラ・日記',
                '📍特技',
                '日常を言葉にすること',
                '📍担当',
                '企画・広報・おしゃべり全般',
                '📍ひとこと',
                'だいたい私がしゃべってます。'
            ]
        },
        {
            id: 'husband',
            name: '夫',
            image: '/images/profiles/husband.jpg',
            description: [
                (
                    <span key="husband-badge" style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        backgroundColor: '#eaf6f8',
                        color: '#84B5C5',
                        borderRadius: '6px',
                        fontWeight: 500,
                        fontSize: '14px',
                        letterSpacing: '0.05em',
                    }}>
                        妻の笑顔メンテナンス係
                    </span>
                ),
                '📍趣味',
                '読書・フットサル',
                '📍特技',
                'けん玉（地味にうまい）',
                '📍担当',
                'ホームページ制作',
                '📍ひとこと',
                '気分がノッた日はランニング2kmを6分台で完走。',
                '褒められると伸びます。'
            ],
            hasDetails: false,
            detailedInfo: {
                introduction: 'エンジニアとして働きながら、石川県での生活を満喫しています。技術への探求心と、自然豊かな環境での暮らしのバランスを大切にしています。',
                skills: [
                    { category: 'プログラミング', items: ['JavaScript', 'React', 'Node.js', 'Python'] },
                    { category: 'デザイン', items: ['Figma', 'Adobe Photoshop', 'UI/UX設計'] },
                    { category: 'スポーツ', items: ['フットサル', 'ランニング', 'サイクリング'] }
                ],
                hobbies: ['読書（技術書・小説）', 'コーヒー豆の焙煎', '散歩', 'ブログ執筆'],
                philosophy: '技術と自然、都市と田舎、仕事と趣味。一見相反するものの調和を見つけることで、より豊かな人生を築けると信じています。'
            }
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % profiles.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + profiles.length) % profiles.length);
    };

    useEffect(() => { setMounted(true); }, []);
    const [bodyRef, bodyInView] = useInView({ threshold: 0.15 });

    if (!mounted) {
        return (
            <section id="about" className="relative overflow-hidden bg-white text-zinc-800" style={{ minHeight: 520 }}>
                {/* 初期読み込み中のスケルトン */}
                <div className="font-body mx-auto mt-10 md:mt-16 mb-6 md:mb-8 max-w-[1200px] relative px-6">
                    <div className="flex items-center gap-3 opacity-50">
                        <div className="h-0.5 w-24 bg-zinc-200 rounded-full"></div>
                        <div className="h-8 w-48 bg-zinc-100 rounded animate-pulse"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="relative overflow-hidden bg-white text-zinc-800">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
                .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
                .font-hand { font-family: 'Yomogi', 'Noto Sans JP', sans-serif; letter-spacing: .02em; }
                .text-shadow-soft { text-shadow: 0 6px 30px rgba(0,0,0,.06); }

                /* タイトル用の背景 */
                .section-header-bg {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(8px);
                    padding: 1rem 0;
                    border-radius: 12px;
                }

                .fade-in-up {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: opacity, transform;
                }
                
                .fade-in-up.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .fade-in-left {
                    opacity: 0;
                    transform: translateX(-30px);
                    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: opacity, transform;
                }
                
                .fade-in-left.visible {
                    opacity: 1;
                    transform: translateX(0);
                }
                
                .fade-in-right {
                    opacity: 0;
                    transform: translateX(30px);
                    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: opacity, transform;
                }
                
                .fade-in-right.visible {
                    opacity: 1;
                    transform: translateX(0);
                }
            `}</style>

            {/* Soft color blobs */}
            <div className="pointer-events-none absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
            <div className="pointer-events-none absolute right-14 bottom-20 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />

            {/* Section Header - Independent positioning with background */}
            <div className="font-body mx-auto mt-10 md:mt-16 mb-6 md:mb-8 max-w-[1200px] relative px-6">
                <div className="section-header-bg">
                    <div
                        className="flex items-center gap-3 px-4"
                        data-animate="true"
                        data-index="header"
                    >
                        <div className="h-0.5 w-24 bg-black rounded-full"></div>
                        <h2 className="text-[22px] sm:text-[28px] md:text-[38px] font-bold text-zinc-700 tracking-[0.18em] md:pl-[80px] whitespace-nowrap">わたしたちのこと</h2>
                    </div>
                </div>
            </div>

            {/* Profile selector + slider: body content that should fade up (title remains static) */}
            <motion.div
                ref={bodyRef}
                initial={{ opacity: 0, y: 30 }}
                animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="mx-auto max-w-6xl"
            >
                <div className="px-6 mt-2 md:mt-3 mb-0 font-body">
                    <div
                        className={`flex justify-center md:justify-start gap-3 fade-in-up ${visibleItems.has('profile-tabs') ? 'visible' : ''}`}
                        role="tablist"
                        aria-label="プロフィール切替"
                        data-animate="true"
                        data-index="profile-tabs"
                    >
                        {profiles.map((p, index) => (
                            <button
                                key={p.id}
                                onClick={() => setCurrentSlide(index)}
                                className={`
                                                h-10 px-5 rounded-full text-base tracking-wide font-semibold
                                                whitespace-nowrap flex items-center justify-center shadow-md
                                                transition duration-300 ease-in-out
                                                ${currentSlide === index
                                        ? 'bg-[#84B5C5] text-white scale-105'
                                        : 'bg-white text-[#84B5C5] border border-[#84B5C5] hover:bg-[#eaf6f8]'
                                    }
                                            `}
                                role="tab"
                                aria-selected={currentSlide === index}
                            >
                                {p.id === 'couple' ? '夫婦' : p.id === 'wife' ? 'わたし' : p.id === 'husband' ? '夫' : p.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="px-6 pt-2 pb-0 font-body">
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
                                <div
                                    key={profile.id}
                                    className="w-full flex-shrink-0 px-4 min-h-[620px] md:h-[640px] overflow-visible"
                                >
                                    <div className="grid items-center gap-10 md:gap-16 md:grid-cols-2 py-6">
                                        {/* Left: text */}
                                        <div className="h-full flex flex-col justify-center space-y-3 md:space-y-6 order-2 md:order-1">

                                            {Array.isArray(profile.description) ? (
                                                profile.description.map((para, idx) => {
                                                    if (React.isValidElement(para)) {
                                                        return (
                                                            <p
                                                                key={idx}
                                                                className="text-sm sm:text-base font-light leading-[1.9] md:leading-[2] tracking-[0.12em] text-[#6B6B6B] max-w-full sm:max-w-[462px] mb-3 sm:mb-[16px] text-justify"
                                                                style={{
                                                                    fontFamily: `'YakuHanJP_Narrow', 'Zen Kaku Gothic New', sans-serif`,
                                                                    letterSpacing: '0.13em'
                                                                }}
                                                            >
                                                                {para}
                                                            </p>
                                                        );
                                                    }

                                                    const text = String(para || '');
                                                    const isMarker = text.trim().startsWith('📍');
                                                    const renderedText = isMarker ? text.replace(/^📍\s*/, '') : text;
                                                    let shouldIndent = false;
                                                    if (!isMarker) {
                                                        for (let j = idx - 1; j >= 0; j--) {
                                                            const prev = profile.description[j];
                                                            const prevText = String(prev || '');
                                                            if (prevText.trim().startsWith('📍')) {
                                                                shouldIndent = true;
                                                                break;
                                                            }
                                                        }
                                                    }

                                                    return (
                                                        <p
                                                            key={idx}
                                                            className={`text-sm sm:text-base font-light leading-[1.9] md:leading-[2] tracking-[0.12em] text-[#6B6B6B] max-w-full sm:max-w-[462px] mb-3 sm:mb-[16px] text-justify${shouldIndent ? ' ml-8' : ''}`}
                                                            style={{
                                                                fontFamily: `'YakuHanJP_Narrow', 'Zen Kaku Gothic New', sans-serif`,
                                                                letterSpacing: '0.13em'
                                                            }}
                                                        >
                                                            {isMarker ? (
                                                                <span className="inline-flex items-center">
                                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2" aria-hidden>
                                                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#84B5C5" />
                                                                        <circle cx="12" cy="9" r="2.5" fill="#ffffff" />
                                                                    </svg>
                                                                    <span className="text-[16px] font-medium">{renderedText}</span>
                                                                </span>
                                                            ) : (
                                                                renderedText
                                                            )}
                                                        </p>
                                                    );
                                                })
                                            ) : (
                                                <p
                                                    className="text-sm sm:text-base font-light leading-[1.9] md:leading-[2] tracking-[0.12em] text-[#6B6B6B] max-w-full sm:max-w-[462px] mb-6 text-justify"
                                                    style={{
                                                        fontFamily: `'YakuHanJP_Narrow', 'Zen Kaku Gothic New', sans-serif`,
                                                        letterSpacing: '0.13em'
                                                    }}
                                                >
                                                    {profile.description}
                                                </p>
                                            )}

                                            {/* 夫のプロフィールの場合のみ「詳しく見る」ボタンを表示 */}
                                            {profile.hasDetails ? (
                                                <a
                                                    href="/site/profile/husband"
                                                    className="group inline-flex items-center gap-4 focus:outline-none"
                                                    aria-label="詳しくみる"
                                                >
                                                    {/* 円ボタン */}
                                                    <span className="grid place-items-center w-16 h-16 rounded-full border border-[#84B5C5] bg-zinc-100/60 text-[#84B5C5] shadow-sm transition-all
                                                    group-hover:border-zinc-600 group-hover:bg-zinc-200/80 group-focus-visible:ring-1 group-focus-visible:ring-[#84B5C5]/50">
                                                        <svg
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            className="transition-transform duration-200 group-hover:translate-x-1"
                                                        >
                                                            <path d="M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                                            <path d="M18 9l4 3-4 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </span>

                                                    {/* テキスト */}
                                                    <span className="text-[#84B5C5] text-base tracking-wide font-medium py-2
                                                    group-hover:underline underline-offset-4 decoration-[#84B5C5] transition-colors">
                                                        詳しくみる
                                                    </span>
                                                </a>
                                            ) : (
                                                // placeholder to keep equal height across all profiles
                                                <div className="flex items-center gap-4" aria-hidden>
                                                    <span className="w-16 h-16" />
                                                    <span className="w-24 h-6" />
                                                </div>
                                            )}
                                        </div>



                                        <div className="relative mx-auto w-full max-w-md order-1 md:order-2 h-full flex items-center justify-center">
                                            <div className="relative overflow-hidden rounded-full bg-white p-0 md:p-2 shadow-[0_10px_50px_rgba(0,0,0,0.08)]">
                                                {!imagesLoaded && (
                                                    <div className="aspect-square w-full rounded-full bg-zinc-100 animate-pulse" />
                                                )}
                                                <img
                                                    src={profile.image}
                                                    alt={profile.name}
                                                    className={`aspect-square w-full rounded-full object-cover text-shadow-soft transition-opacity duration-300 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
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
                    </div>
                </div>

            </motion.div>

            {/* ページトップへ（共通部品） */}
            <ToTopButton />
        </section>
    );
}