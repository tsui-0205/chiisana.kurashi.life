'use client';

import { useState, useEffect, useRef } from 'react';
import SectionHeader from '../../ui/SectionHeader';
import ToTopButton from '../../ui/ToTopButton';

export default function AboutUsSection({ showToTop = false, hideWhenHeroVisible = false }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [visibleItems, setVisibleItems] = useState(new Set());
    const observerRef = useRef(null);
    const sliderRef = useRef(null);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

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
                'インスタグラム担当です。',
                'ドラマとピアノとカフェめぐりが趣味です。昔から絶対音感があり、ふとした瞬間に聴いた曲の音を当てるのが得意です。'
            ]
        },
        {
            id: 'husband',
            name: '夫',
            image: '/images/profiles/husband.jpg',
            description: [
                'ホームページ担当です。',
                '趣味はフットサルと読書、料理です。けん玉が得意で、ランニングもします。調子が良い日は2kmを6分台で走れます。'
            ],
            hasDetails: true,
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

            {/* Soft color blobs */}
            <div className="pointer-events-none absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
            <div className="pointer-events-none absolute right-14 bottom-20 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />

            {/* Section Header - Independent positioning */}
            <div className="font-body mx-auto mt-20 md:mt-20 mb-6 md:mb-2 max-w-[1200px] relative px-6">
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
                            <div key={profile.id} className="w-full flex-shrink-0 px-4 h-auto md:h-[520px] overflow-hidden">
                                <div className="grid items-center gap-16 md:grid-cols-2 min-h-[500px] h-full">
                                    {/* Left: text */}
                                    <div className="h-full flex flex-col justify-center space-y-6 order-2 md:order-1">
                                        {/* Profile selector buttons placed under the header */}
                                        <div className="mt-6 hidden md:flex justify-start gap-4 md:mb-6" role="tablist" aria-label="プロフィール切替">
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

                                        {Array.isArray(profile.description) ? (
                                            profile.description.map((para, idx) => (
                                                <p
                                                    key={idx}
                                                    className="text-[14px] font-light leading-[2] tracking-[0.12em] text-[#6B6B6B] max-w-[462px] mb-[16px] text-justify"
                                                    style={{
                                                        fontFamily: `'YakuHanJP_Narrow', 'Zen Kaku Gothic New', sans-serif`,
                                                        letterSpacing: '0.13em'
                                                    }}
                                                >
                                                    {para}
                                                </p>
                                            ))
                                        ) : (
                                            <p
                                                className="text-[14px] font-light leading-[2] tracking-[0.12em] text-[#6B6B6B] max-w-[462px] mb-[32px] text-justify"
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
                                            // placeholder to keep equal height on desktop
                                            <div className="hidden md:flex items-center gap-4" aria-hidden>
                                                <span className="w-16 h-16" />
                                                <span className="w-24 h-6" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="block md:hidden text-center mb-4 order-0">
                                        <div className="flex justify-center gap-4 mb-2">
                                            {profiles.map((p, i) => (
                                                <button
                                                    key={`mobile-${p.id}`}
                                                    onClick={() => setCurrentSlide(i)}
                                                    className={`
                                                            px-4 py-2 rounded-full text-sm tracking-wide font-semibold 
                                                            shadow-md transition duration-300 ease-in-out
                                                            ${currentSlide === i
                                                            ? 'bg-[#84B5C5] text-white scale-105'
                                                            : 'bg-white text-[#84B5C5] hover:bg-[#eaf6f8] border border-[#84B5C5]'
                                                        }
                                                    `}
                                                    aria-label={`表示: ${p.name}`}
                                                >
                                                    {i === 0 ? '夫婦' : i === 1 ? 'わたし' : '夫'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative mx-auto w-full max-w-md order-1 md:order-2 h-full flex items-center justify-center">
                                        <div className="relative overflow-hidden rounded-full bg-white p-0 md:p-2 shadow-[0_10px_50px_rgba(0,0,0,0.08)]">
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
                </div>
            </div>

            {/* ページトップへ（共通部品） */}
            <ToTopButton />
        </section>
    );
}