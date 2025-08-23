'use client';

import { useState, useEffect, useRef } from 'react';

export default function WorksSection() {
    const [visibleItems, setVisibleItems] = useState(new Set());
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleItems(prev => new Set([...prev, entry.target.dataset.index]));
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll('[data-animate="true"]');
        elements.forEach((el) => {
            if (observerRef.current) {
                observerRef.current.observe(el);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);
    // 日々のことデータ
    const recentPosts = [
        {
            id: 1,
            date: "2024年8月10日",
            title: "夏の夕暮れと手作りかき氷",
            excerpt: "今日はとても暑い一日でした。夕方に夫と一緒に庭に出て、手作りのかき氷を作りました。シンプルなブルーハワイシロップをかけただけですが、とても美味しく感じられて...",
            image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop",
            slug: "summer-evening-kakigori",
            category: "日常"
        },
        {
            id: 2,
            date: "2024年8月8日",
            title: "近所の小さな神社へお散歩",
            excerpt: "朝の涼しいうちに、近所にある小さな神社まで散歩に出かけました。石段を上ると、街が一望できる素敵な場所があって、夫と二人でしばらく景色を眺めていました...",
            image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=1200&auto=format&fit=crop",
            slug: "shrine-walk",
            category: "お出かけ"
        },
        {
            id: 3,
            date: "2024年8月5日",
            title: "初めてのぬか床作り",
            excerpt: "以前から挑戦してみたかったぬか床作りに挑戦しました。最初はうまくいくか心配でしたが、夫が丁寧に調べてくれて、二人で協力して作ることができました...",
            image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop",
            slug: "first-nukadoko",
            category: "料理"
        }
    ];

    return (
        <section className="relative overflow-hidden bg-white text-zinc-800">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
        .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
        .font-hand { font-family: 'Yomogi', 'Noto Sans JP', sans-serif; letter-spacing: .02em; }
        
        .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fade-in-left {
            opacity: 0;
            transform: translateX(-30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in-left.visible {
            opacity: 1;
            transform: translateX(0);
        }
        
        .fade-in-right {
            opacity: 0;
            transform: translateX(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in-right.visible {
            opacity: 1;
            transform: translateX(0);
        }
      `}</style>

            {/* Soft color blobs */}
            <div className="pointer-events-none absolute right-32 top-24 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />
            <div className="pointer-events-none absolute right-52 top-52 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl" />

            {/* Section Header - Independent positioning */}
            <div className="px-6 py-24 pb-8 font-body">
                <div
                    className={`flex items-center gap-6 fade-in-up ${visibleItems.has('header') ? 'visible' : ''}`}
                    data-animate="true"
                    data-index="header"
                >
                    <div className="h-0.5 w-32 bg-black rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-700 font-body tracking-widest">日々のこと</h2>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-8 pb-24 font-body">
                {/* Blog posts grid */}
                <div className="space-y-16">
                    {recentPosts.map((post, index) => (
                        <div
                            key={post.id}
                            className={`grid items-center gap-16 md:grid-cols-2 fade-in-up ${visibleItems.has(`post-${index}`) ? 'visible' : ''}`}
                            data-animate="true"
                            data-index={`post-${index}`}
                            style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                            {/* Image */}
                            <div className={`relative mx-auto w-full max-w-lg ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-[0_10px_50px_rgba(0,0,0,0.08)]">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="aspect-[4/3] w-full rounded-xl object-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                    {/* inner soft shadow */}
                                    <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_80px_rgba(0,0,0,0.06)]" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                                <p className="mb-2 text-sm tracking-widest text-sky-600 font-medium">#{post.category}</p>
                                <p className="mb-2 text-sm text-zinc-400">{post.date}</p>
                                <h3 className="mb-4 text-2xl font-medium tracking-wide text-zinc-700 font-hand">{post.title}</h3>
                                <p className="mb-6 leading-8 text-zinc-500">
                                    {post.excerpt}
                                </p>
                                <a
                                    href={`/blog/${post.slug}`}
                                    className="inline-block border-b border-zinc-300 pb-1 text-sm tracking-widest text-zinc-600 transition hover:border-zinc-500 hover:text-zinc-700"
                                >
                                    続きを読む →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View all button */}
                <div
                    className={`mt-16 text-center fade-in-up ${visibleItems.has('button') ? 'visible' : ''}`}
                    data-animate="true"
                    data-index="button"
                >
                    <a
                        href="/blog"
                        className="inline-block border-2 border-zinc-300 px-8 py-3 rounded-full text-zinc-700 font-medium hover:bg-zinc-50 transition-colors tracking-wide"
                    >
                        すべてみる
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
