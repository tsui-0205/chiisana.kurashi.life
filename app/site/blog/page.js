"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardImage } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categories as categoryList } from "@/data/categories";
import ContactFooter from "@/components/sections/home/ContactFooter";
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';

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

function HeroTriptych({ images }) {
  const src = images && images.length ? images[0] : '';
  return (
    <section className="relative h-[60vh] md:h-screen w-full overflow-hidden">
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

function PostCard({ post, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      className="group"
    >
      <Link href={post.href} onClick={() => { try { window.dispatchEvent(new Event('__page-loader:show')); } catch { } }}>
        <Card>
          <CardImage
            src={post.cover}
            alt={post.title}
          />
          <CardContent>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2 text-nowrap">
              {(() => {
                const cat = post.category || "日常";
                const catClass = cat === '思い出' ? 'bg-[#e5e1dc] text-[#333]' : 'bg-zinc-100 text-zinc-600';
                return (
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium whitespace-nowrap ${catClass}`}>
                    {cat}
                  </span>
                );
              })()}
              <p className="text-[10px] text-neutral-500 tracking-[0.08em] whitespace-nowrap">
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
                {post.tags.split(',').slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.article>
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

      /* Reduce aggressive zoom/translate on small screens to avoid horizontal over-cropping */
      @media (max-width: 640px) {
        .image-figure { transform: translateY(10px) scale(1.01); }
        .fade-in-image { animation: fadeInImage 1.1s ease-out forwards; }
      }
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [showAll, setShowAll] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // APIから投稿を取得
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || []);
        } else {
          console.error('Failed to fetch posts:', response.status);
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // カテゴリの一覧を取得（共通カテゴリリスト + 実際に使われているカテゴリの統合）
  const categories = useMemo(() => {
    // 実際の投稿で使われているカテゴリを取得
    const usedCategories = new Set(posts.map(post => post.category).filter(Boolean));
    // 共通リストと統合（重複排除）
    const allCategories = new Set([...categoryList, ...Array.from(usedCategories)]);
    return ["Category", ...Array.from(allCategories)];
  }, [posts]);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const da = a.date ? new Date(a.date) : new Date(0);
      const db = b.date ? new Date(b.date) : new Date(0);
      return db - da; 
    });
  }, [posts]);

  const filtered = useMemo(() => {
    const base = sortedPosts.filter((p) => {
      // 検索クエリのフィルタリング（タイトル、概要、タグで検索）
      const matchesSearch = q
        ? (
          p.title?.toLowerCase().includes(q.toLowerCase()) ||
          p.excerpt?.toLowerCase().includes(q.toLowerCase()) ||
          p.tags?.toLowerCase().includes(q.toLowerCase())
        )
        : true;
      // カテゴリのフィルタリング
      const matchesCategory = selectedCategory === "Category" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    return showAll ? base : base.slice(0, 9);
  }, [q, selectedCategory, showAll, sortedPosts]);

  // カテゴリ選択ハンドラー
  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
    setShowAll(false); // カテゴリ変更時は最新9件のみ表示
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-gray-800">
      {/* Hamburger Menu */}
      <div className="fixed top-6 right-6 z-50 menu-container">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 w-14 h-10 flex flex-col justify-center items-center space-y-1.5 transition-all duration-300 group cursor-pointer"
          aria-label="メニューを開く"
        >
          <span className={`w-10 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2 bg-zinc-700' : ''}`}></span>
          <span className={`w-10 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-10 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-zinc-700' : ''}`}></span>
        </button>
      </div>

      {/* Full-screen Menu Overlay for mobile, compact panel for desktop */}
      {isMenuOpen && (
        <>
          {/* Mobile: Full-screen overlay */}
          <div className="md:hidden fixed inset-0 z-50 transition-opacity menu-container">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <div className="relative h-full overflow-auto bg-white/95 p-6 flex flex-col transform origin-top transition-transform duration-300 ease-out menu-container">
              <div className="flex items-center justify-end mt-4">
                <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 relative inline-flex items-center justify-center text-zinc-700 md:hidden overflow-visible" aria-label="閉じるメニュー">
                  <span className="absolute inset-0 pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-6 before:border-t-2 before:border-[#b0cdd8] before:rotate-45 after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-6 after:border-t-2 after:border-[#b0cdd8] after:-rotate-45" />
                </button>
              </div>
              <nav className="mt-8 flex-1 flex flex-col justify-center">
                <ul className="space-y-8 text-xl">
                  <li>
                    <Link
                      href="/"
                      className="block transition-all duration-300 cursor-pointer py-4 px-6 text-center relative group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative z-10 block" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontSize: '13.44px', color: '#6b6b6b', letterSpacing: '0.13em' }}>ホーム</span>
                      <span className="block mt-1 text-xs text-[#84B5C5]" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontWeight: 300, letterSpacing: '0.15em', fontSize: '11px' }}>home</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-zinc-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#articles"
                      className="block transition-all duration-300 cursor-pointer py-4 px-6 text-center relative group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative z-10 block" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontSize: '13.44px', color: '#6b6b6b', letterSpacing: '0.13em' }}>記事一覧</span>
                      <span className="block mt-1 text-xs text-[#84B5C5]" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontWeight: 300, letterSpacing: '0.15em', fontSize: '11px' }}>articles</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-zinc-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/chiisana.kurashi.life"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transition-all duration-300 cursor-pointer py-4 px-6 text-center relative group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative z-10 block" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontSize: '13.44px', color: '#6b6b6b', letterSpacing: '0.13em' }}>Instagram</span>
                      <span className="block mt-1 text-xs text-[#84B5C5]" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontWeight: 300, letterSpacing: '0.15em', fontSize: '11px' }}>instagram</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-zinc-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                    </a>
                  </li>
                  {isAuthenticated && (
                    <li>
                      <Link
                        href="/site/admin"
                        className="block transition-all duration-300 cursor-pointer py-4 px-6 text-center relative group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="relative z-10 block" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontSize: '13.44px', color: '#6b6b6b', letterSpacing: '0.13em' }}>管理</span>
                        <span className="block mt-1 text-xs text-[#84B5C5]" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontWeight: 300, letterSpacing: '0.15em', fontSize: '11px' }}>Admin</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-rose-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
          <div className="hidden md:block">
            {isMenuOpen && (
              <div className="fixed top-0 right-0 z-50 w-72 max-w-[90%] bg-white/95 backdrop-blur-sm shadow-lg p-4 transition-transform duration-300 ease-out rounded-bl-3xl rounded-tl-3xl rounded-b-2xl menu-container">
                <div className="flex items-center justify-end mt-4">
                  <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 relative hidden md:inline-flex items-center justify-center text-zinc-700 overflow-visible" aria-label="閉じるメニュー">
                    <span className="absolute inset-0 pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-4 before:border-t-2 before:border-[#b0cdd8] before:rotate-45 after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-4 after:border-t-2 after:border-[#b0cdd8] after:-rotate-45" />
                  </button>
                </div>
                <nav className="mt-4">
                  <ul className="space-y-2">
                    <li className="group text-center">
                      <Link
                        href="/"
                        className="block text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer py-3 px-4 rounded-lg hover:bg-zinc-50 relative"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="relative z-10 block text-base font-medium" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontSize: '13.44px', color: '#6b6b6b', letterSpacing: '0.13em' }}>ホーム</span>
                        <span className="block text-xs text-[#84B5C5] mt-1" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontWeight: 300, letterSpacing: '0.15em', fontSize: '11px' }}>home</span>
                      </Link>
                    </li>
                    <li className="group text-center">
                      <a
                        href="#articles"
                        className="block text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer py-3 px-4 rounded-lg hover:bg-zinc-50 relative"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="relative z-10 block text-base font-medium" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontSize: '13.44px', color: '#6b6b6b', letterSpacing: '0.13em' }}>記事一覧</span>
                        <span className="block text-xs text-[#84B5C5] mt-1" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontWeight: 300, letterSpacing: '0.15em', fontSize: '11px' }}>articles</span>
                      </a>
                    </li>
                    <li className="group text-center">
                      <a
                        href="https://www.instagram.com/chiisana.kurashi.life"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer py-3 px-4 rounded-lg hover:bg-zinc-50 relative"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="relative z-10 block text-base font-medium" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontSize: '13.44px', color: '#6b6b6b', letterSpacing: '0.13em' }}>Instagram</span>
                        <span className="block text-xs text-[#84B5C5] mt-1" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontWeight: 300, letterSpacing: '0.15em', fontSize: '11px' }}>instagram</span>
                      </a>
                    </li>
                    {isAuthenticated && (
                      <li className="group text-center">
                        <Link
                          href="/site/admin"
                          className="block text-rose-600 hover:text-rose-700 transition-colors cursor-pointer py-3 px-4 rounded-lg hover:bg-rose-50 relative"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="relative z-10 block text-base font-medium" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontSize: '13.44px', color: '#6b6b6b', letterSpacing: '0.13em' }}>管理</span>
                          <span className="block text-xs text-[#84B5C5] mt-1" style={{ fontFamily: `"YakuHanJP_Narrow", "Zen Kaku Gothic New", sans-serif`, fontWeight: 300, letterSpacing: '0.15em', fontSize: '11px' }}>Admin</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </>
      )}

      <HeroTriptych images={heroImages} />
      <section id="articles" className="py-16 px-4 md:px-6 max-w-6xl mx-auto mb-4 md:mb-6 lg:mb-8">
        {/* Search and Category Filter */}
        <div className="mt-12 mb-8">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* Search Box */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="タイトル、タグ、キーワードで検索..."
                className="pl-9 rounded-2xl w-full"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative w-full md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="w-full px-6 py-3 text-sm font-light tracking-wider appearance-none bg-white/80 backdrop-blur-sm text-zinc-700 border border-zinc-200/60 rounded-2xl shadow-sm cursor-pointer transition-all duration-200 hover:border-zinc-300/80 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
                style={{ letterSpacing: '0.1em' }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Results count */}
          {(q || selectedCategory !== "Category") && (
            <div className="text-sm text-gray-600 mt-3 text-right">
              {filtered.length}件の記事
            </div>
          )}
        </div>
        <div className="relative pb-6 md:pb-6 lg:pb-20">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">読み込み中...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">該当する記事が見つかりませんでした</p>
              {(q || selectedCategory !== "すべて") && (
                <button
                  onClick={() => {
                    setQ("");
                    setSelectedCategory("Category");
                  }}
                  className="mt-4 px-6 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors"
                >
                  すべての記事を表示
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((p, i) => (
                <PostCard key={p.id} post={p} index={i} />
              ))}
            </div>
          )}

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