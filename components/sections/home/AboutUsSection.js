'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import ToTopButton from '../../ui/ToTopButton';

export default function AboutUsSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [visibleItems, setVisibleItems] = useState(new Set());

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

        const timer = setTimeout(() => {
            const elements = document.querySelectorAll('[data-animate="true"]');
            elements.forEach((el) => observer.observe(el));
        }, 100);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
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
            image: '/images/profiles/fufu_explan.jpg',
            explanationImage: '/images/profiles/fufu_explan.jpg'
        },
        {
            id: 'wife',
            name: 'わたし',
            image: '/images/profiles/wife.jpg',
            explanationImage: '/images/profiles/wife_explan.jpg'
        },
        {
            id: 'husband',
            name: '夫',
            image: '/images/profiles/husband.jpg',
            explanationImage: '/images/profiles/husband_explan.jpg',
            hasDetails: false
        }
    ];

    useEffect(() => { setMounted(true); }, []);
    const [bodyRef, bodyInView] = useInView({ threshold: 0.15 });
    const [imageSrc, setImageSrc] = useState(null);
    const [imageCheckError, setImageCheckError] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const active = profiles[currentSlide];
        if (!active) return;

        setImageCheckError(false);
        setImageSrc(null);

        const urls = [active.explanationImage, active.image].filter(Boolean);
        let img = null;

        const tryLoad = (i) => {
            if (cancelled) return;
            const url = urls[i];
            if (!url) {
                if (!cancelled) setImageCheckError(true);
                return;
            }
            img = new window.Image();
            img.onload = () => {
                if (!cancelled) setImageSrc(url);
            };
            img.onerror = () => {
                img = null;
                tryLoad(i + 1);
            };
            img.src = url;
        };

        tryLoad(0);

        return () => {
            cancelled = true;
            if (img) {
                img.onload = null;
                img.onerror = null;
            }
        };
    }, [currentSlide]);

    if (!mounted) {
        return <section id="about" className="relative overflow-hidden bg-white text-zinc-800" style={{ minHeight: 520 }} />;
    }

    return (
        <section id="about" className="relative overflow-hidden bg-white text-zinc-800">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
                .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
                .font-hand { font-family: 'Yomogi', 'Noto Sans JP', sans-serif; letter-spacing: .02em; }
                .text-shadow-soft { text-shadow: 0 6px 30px rgba(0,0,0,.06); }

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

            <div className="pointer-events-none absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
            <div className="pointer-events-none absolute right-14 bottom-20 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />

            <div className="font-body mx-auto mt-10 md:mt-16 mb-6 md:mb-8 max-w-[1200px] relative px-6">
                <div
                    className={`flex items-center gap-3 fade-in-up ${visibleItems.has('header') ? 'visible' : ''}`}
                    data-animate="true"
                    data-index="header"
                >
                    <div className="h-0.5 w-24 bg-black rounded-full"></div>
                    <h2 className="text-[22px] sm:text-[28px] md:text-[38px] font-bold text-zinc-700 tracking-[0.18em] md:pl-[80px] whitespace-nowrap">わたしたちのこと</h2>
                </div>
            </div>

            <motion.div
                ref={bodyRef}
                initial={{ opacity: 0, y: 30 }}
                animate={bodyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="mx-auto max-w-6xl"
            >
                <div className="px-6 mt-1 md:mt-2 mb-0 font-body">
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
                    <div
                        className={`relative overflow-visible fade-in-up ${visibleItems.has('slider') ? 'visible' : ''}`}
                        data-animate="true"
                        data-index="slider"
                        style={{ transitionDelay: '0.2s' }}
                    >
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {profiles.map((profile, index) => (
                                <div
                                    key={profile.id}
                                    className="w-full flex-shrink-0 px-4"
                                >
                                    {/* シンプルな1カラムレイアウト - 説明画像を横幅いっぱいに表示 */}
                                    <div className="w-full max-w-4xl mx-auto py-0">
                                        <div className="relative mx-auto max-w-3xl w-full overflow-hidden mb-6">
                                            <img
                                                src={index === currentSlide ? (imageSrc || profile.explanationImage || profile.image) : (profile.explanationImage || profile.image)}
                                                alt={`${profile.name}の説明`}
                                                className="block max-w-full h-auto object-contain mx-auto"
                                                loading="lazy"
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                            />
                                        </div>

                                        {/* 夫のプロフィールの場合のみ「詳しく見る」ボタンを表示 */}
                                        {profile.hasDetails && (
                                            <div className="flex justify-center">
                                                <a
                                                    href="/site/profile/husband"
                                                    className="group inline-flex items-center gap-3 px-6 py-3 bg-[#84B5C5] text-white rounded-full hover:bg-[#6B9AAA] transition-colors duration-200 shadow-md"
                                                    aria-label="詳しくみる"
                                                >
                                                    <span className="text-sm font-medium">詳しくみる</span>
                                                    <svg
                                                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                                    >
                                                        <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                        <path d="M18 9l4 3-4 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </motion.div>

            {/* ページトップへ（共通部品） */}
            <ToTopButton />
        </section>
    );
}