"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardImage } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { posts } from "@/data/posts";
import ContactFooter from "@/components/sections/home/ContactFooter";

const heroTitle = posts[0]?.title ?? "おすすめ記事";
const heroImages = [
  "/images/blog/blog-main.jpg",
];

function formatDateYMD(dateStr) {
  if (!dateStr) return '';
  const parts = String(dateStr).split('-');
  if (parts.length < 3) return dateStr;
  const [y, m, d] = parts;
  return `${y}年${Number(m)}月${Number(d)}日`;
}

function HeroTriptych({ title, images }) {
  const src = images && images.length ? images[0] : '';
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-screen hero image like main page */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="w-full h-full image-figure">
          <img
            src={src}
            alt="hero"
            className="w-full h-full object-cover object-center fade-in-image"
            loading="eager"
            onLoad={(e) => e.currentTarget.parentElement && e.currentTarget.parentElement.classList.add('visible')}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/blog/blog-main.jpg';
              e.currentTarget.parentElement && e.currentTarget.parentElement.classList.add('visible');
            }}
          />
        </div>
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Animated Scroll Indicator positioned to avoid mobile overlap */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="text-white text-sm mb-2 font-light tracking-wider drop-shadow-md animate-bounce scroll-bounce">SCROLL</div>
        <svg className="w-6 h-6 text-white animate-bounce scroll-bounce drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

function PostCard({ post }) {
  return (
    <article className="group">
      <Link href={post.href}>
        <Card>
          <CardImage
            src={post.cover}
            alt={post.title}
          />
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] px-2 py-1 bg-rose-100 text-rose-600 rounded-full font-medium">
                {post.category || "日常"}
              </span>
              <p className="text-[10px] text-neutral-500 tracking-[0.08em]">
                {formatDateYMD(post.date)}
              </p>
            </div>
            <h3 className="text-[13px] font-bold tracking-wide text-sky-700 line-clamp-2">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="mt-2 text-[10px] text-neutral-600 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            {post.tags && (
              <div className="flex flex-wrap gap-1 mt-2">
                {post.tags.split(',').slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </article>
  );
}

export default function BlogPage() {
  // page-level styles for image entrance animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .image-figure { opacity: 0; transform: translateY(18px) scale(1.03); transition: opacity 0.7s cubic-bezier(.2,.9,.3,1), transform 0.8s cubic-bezier(.2,.9,.3,1); will-change: opacity, transform; }
      .image-figure.visible { opacity: 1; transform: translateY(0) scale(1); }
      @keyframes fadeInImage {
        0% { opacity: 0; transform: scale(1.05); }
        100% { opacity: 1; transform: scale(1); }
      }
      .fade-in-image { animation: fadeInImage 2s ease-out forwards; }
      @keyframes scrollBounce {
        0% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0); }
      }
      .scroll-bounce { animation: scrollBounce 1.2s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    const imgs = Array.from(document.querySelectorAll('.image-figure img'));
    const markVisible = (img) => {
      try {
        const parent = img.parentElement;
        if (parent && !parent.classList.contains('visible')) parent.classList.add('visible');
      } catch (e) { }
    };

    const onOnce = (e) => {
      const img = e.currentTarget || e.target;
      markVisible(img);
      img.removeEventListener('load', onOnce);
      img.removeEventListener('error', onOnce);
    };

    imgs.forEach((img) => {
      if (img.complete && img.naturalWidth && img.naturalHeight) {
        markVisible(img);
        return;
      }
      img.addEventListener('load', onOnce);
      img.addEventListener('error', onOnce);
    });

    return () => {
      // cleanup listeners
      imgs.forEach((img) => {
        img.removeEventListener('load', onOnce);
        img.removeEventListener('error', onOnce);
      });
      document.head.removeChild(style);
    };
  }, []);

  // client-only year to avoid hydration mismatch with server-side rendering
  const [buildYear, setBuildYear] = useState('');
  useEffect(() => { setBuildYear(new Date().getFullYear()); }, []);

  // Menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  // show only latest 9 by default, toggle to show all via `old` button
  const [showAll, setShowAll] = useState(false);

  // カテゴリの一覧を取得
  const categories = useMemo(() => {
    const cats = new Set(posts.map(post => post.category).filter(Boolean));
    return ["すべて", ...Array.from(cats)];
  }, []);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const da = a.date ? new Date(a.date) : new Date(0);
      const db = b.date ? new Date(b.date) : new Date(0);
      return db - da; // newest first
    });
  }, []);

  const filtered = useMemo(() => {
    const base = sortedPosts.filter((p) => {
      // 検索クエリのフィルタリング
      const matchesSearch = q ? p.title.toLowerCase().includes(q.toLowerCase()) : true;
      // カテゴリのフィルタリング
      const matchesCategory = selectedCategory === "すべて" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    return showAll ? base : base.slice(0, 9);
  }, [q, selectedCategory, showAll, sortedPosts]);

  return (
    <div className="min-h-screen bg-zinc-50 text-gray-800">
      {/* Hamburger Menu */}
      <div className="fixed top-6 right-6 z-50 menu-container">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 bg-black/80 backdrop-blur rounded-full flex items-center justify-center group hover:bg-black transition-colors"
        >
          <div className="flex flex-col gap-1">
            <span className={`w-5 h-0.5 bg-white transition-transform origin-center ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-transform origin-center ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Full-screen Menu Overlay for mobile, compact panel for desktop */}
      {isMenuOpen && (
        <>
          {/* Mobile: Full-screen overlay */}
          <div className="md:hidden fixed inset-0 z-50 transition-opacity menu-container">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
            <div className="relative h-full overflow-auto bg-zinc-900/95 backdrop-blur p-8 flex flex-col transform origin-top transition-transform duration-300 ease-out menu-container">
              <div className="flex items-center justify-end">
                <button onClick={() => setIsMenuOpen(false)} className="p-3 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200" aria-label="閉じるメニュー">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="mt-12 flex-1 flex flex-col justify-center">
                <ul className="space-y-8 text-xl">
                  <li>
                    <a
                      href="/"
                      className="block text-zinc-200 hover:text-white transition-all duration-300 cursor-pointer py-4 px-6 text-center relative group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative z-10">ホーム</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#articles"
                      className="block text-zinc-200 hover:text-white transition-all duration-300 cursor-pointer py-4 px-6 text-center relative group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative z-10">記事一覧</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/chiisana.kurashi.life"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-zinc-200 hover:text-white transition-all duration-300 cursor-pointer py-4 px-6 text-center relative group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative z-10">Instagram</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Desktop: Compact panel */}
          <div className="hidden md:block fixed top-20 right-6 z-50 w-56 bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-700/50 menu-container">
            <nav className="p-2">
              <ul className="space-y-1">
                <li>
                  <a
                    href="/"
                    className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition-all duration-200 relative group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10">ホーム</span>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-white rounded-full group-hover:h-6 transition-all duration-300"></div>
                  </a>
                </li>
                <li>
                  <a
                    href="#articles"
                    className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition-all duration-200 relative group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10">記事一覧</span>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-white rounded-full group-hover:h-6 transition-all duration-300"></div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/chiisana.kurashi.life"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition-all duration-200 relative group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10">Instagram</span>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-white rounded-full group-hover:h-6 transition-all duration-300"></div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}

      {/* Hero */}
      <HeroTriptych title={heroTitle} images={heroImages} />

      {/* New Articles */}
      <section id="articles" className="py-16 px-4 md:px-6 max-w-6xl mx-auto mb-4 md:mb-6 lg:mb-8">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[0.18em] text-zinc-900">
            ARTICLES
          </h2>
          <p className="text-zinc-500 mt-2 font-light">記事一覧</p>
        </div>

        {/* Filter / Search */}
        <div className="mt-12 mb-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative w-full md:w-2/3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="キーワードで探す"
              className="pl-9 rounded-2xl"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 text-sm font-light tracking-wider transition-all duration-300 border ${selectedCategory === category
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg'
                    : 'bg-white/90 text-zinc-700 border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900'
                  }`}
                style={{ letterSpacing: '0.1em' }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="relative pb-6 md:pb-6 lg:pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>

          {/* 右下にoldボタンを絶対配置。画像群の右下の下に見えるように translateY を使う */}
          {!showAll && sortedPosts.length > 9 && (
            <div className="absolute right-4 bottom-0 transform translate-y-1 md:translate-y-2 lg:translate-y-3">
              <button
                onClick={() => setShowAll(true)}
                className="group inline-flex items-center gap-4 focus:outline-none"
                aria-label="過去の投稿を表示"
              >
                {/* 円ボタン */}
                <span className="grid place-items-center w-12 h-12 rounded-full border border-zinc-700 bg-zinc-100/60 text-zinc-700 shadow-sm transition-all
                  group-hover:border-zinc-900 group-hover:bg-zinc-200/80 group-focus-visible:ring-1 group-focus-visible:ring-zinc-700/50">
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path d="M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M18 9l4 3-4 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                {/* テキスト */}
                <span className="text-zinc-700 text-base tracking-wider font-bold py-2
                  group-hover:underline underline-offset-4 decoration-zinc-700 transition-colors" style={{ letterSpacing: '0.12em' }}>
                  old
                </span>
              </button>
            </div>
          )}
        </div>
      </section>
      <ContactFooter />
    </div>
  );
}