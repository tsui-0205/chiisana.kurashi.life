"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ContactFooter from "@/components/sections/home/ContactFooter";
import { posts } from "@/data/posts";

// 日付フォーマット: YYYY.MM.DD
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const isIso = /\d{4}-\d{2}-\d{2}/.test(dateStr);
  if (!isIso) return dateStr;
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

// ナビゲーションボタンコンポーネント
const NavigationButton = ({ href, children, icon }) => (
  <Link href={href} className="group flex items-center gap-3 transition-all duration-200">
    <span className="grid place-items-center w-12 h-12 rounded-full border border-zinc-700 bg-zinc-100/60 text-zinc-700 shadow-sm transition-all
                    group-hover:border-zinc-900 group-hover:bg-zinc-200/80 group-focus-visible:ring-1 group-focus-visible:ring-zinc-700/50">
      {icon}
    </span>
    <span className="text-zinc-700 text-base tracking-wider font-bold py-2
                    group-hover:underline underline-offset-4 decoration-zinc-700 transition-colors"
      style={{ letterSpacing: '0.12em' }}>
      {children}
    </span>
  </Link>
);

// 戻る矢印アイコン
const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transition-transform duration-200 group-hover:-translate-x-1">
    <path d="M18 12H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M6 15l-4-3 4-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ホームアイコン
const HomeIcon = () => (
  <img src="/images/blog/homeicon.png" alt="ホーム" className="w-6 h-6 object-contain" />
);

// 記事画像コンポーネント（白フチ＆影）
const ArticleImage = ({ src, alt, className = "" }) => (
  <div className={`flex justify-center ${className}`}>
    <div className="bg-white p-1 shadow-lg max-w-full overflow-hidden">
      <img
        src={src || "/images/blog/default.jpg"}
        alt={alt}
        className="w-full h-auto max-w-3xl mx-auto block"
        style={{ aspectRatio: "4/3", objectFit: "cover" }}
        onError={(e) => { e.target.src = "/images/blog/default.jpg"; }}
      />
    </div>
  </div>
);

// テキストコンテンツコンポーネント
const TextContent = ({ content }) => {
  if (!content) return null;
  return (
    <div className="prose prose-lg max-w-none text-neutral-800 leading-relaxed">
      {content.split('\n').map((paragraph, index) => (
        paragraph.trim() && <p key={index} className="mb-4">{paragraph}</p>
      ))}
    </div>
  );
};

export default function BlogPostSimple() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  // URLデコードして記事を検索
  const post = useMemo(() => {
    if (!slug) return null;
    const decodedSlug = decodeURIComponent(slug);
    return posts.find(p => p.id === decodedSlug);
  }, [slug]);

  // 記事が見つからない場合
  if (!post) {
    return (
      <main className="min-h-screen bg-neutral-100 text-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-8">記事が見つかりません</h1>
          <div className="flex flex-row flex-wrap gap-6 justify-center items-center">
            <NavigationButton href="/site/blog" icon={<BackIcon />}>
              ブログ一覧
            </NavigationButton>
            <NavigationButton href="/" icon={<HomeIcon />}>
              ホーム
            </NavigationButton>
          </div>
        </div>
      </main>
    );
  }

  const category = post.category || null;

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      {/* 記事コンテンツ */}
      <div className="px-6 py-16">
        <article className="max-w-4xl mx-auto">
          {/* タイトル */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-center leading-relaxed tracking-wide">
            {post.title}
          </h1>

          {/* カテゴリと日付 */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {category && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${category === '思い出' ? 'bg-[#e5e1dc] text-[#333]' : 'bg-zinc-100 text-zinc-600'
                }`}>
                {category}
              </span>
            )}
            <time dateTime={post.date} className="text-base text-neutral-600">
              {formatDate(post.date)}
            </time>
          </div>

          {/* 記事の概要 */}
          {post.excerpt && (
            <div className="max-w-2xl mx-auto text-center mb-6">
              <p className="text-lg text-neutral-700 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          )}

          {/* タグ */}
          {post.tags && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {post.tags.split(',').map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm font-medium">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* メイン画像 */}
          <ArticleImage src={post.cover} alt={post.title} className="mb-10" />

          {/* 記事本文 */}
          {post.content && (
            <div className="max-w-2xl mx-auto px-4 md:px-8">
              <TextContent content={post.content} />
            </div>
          )}

          {/* 複数画像セクション */}
          {post.sections && post.sections.length > 0 && (
            <div className="mt-12 space-y-10">
              {post.sections.map((section, index) => (
                <div key={index} className="max-w-4xl mx-auto">
                  {/* セクション見出し */}
                  {section.title && (
                    <div className="max-w-2xl mx-auto px-4 md:px-8 mb-6">
                      <h2 className="text-2xl md:text-3xl font-semibold text-center leading-relaxed tracking-wide text-neutral-800">
                        {section.title}
                      </h2>
                    </div>
                  )}

                  {/* セクション画像 */}
                  {section.image && (
                    <ArticleImage
                      src={section.image}
                      alt={section.title || `セクション ${index + 1}`}
                      className="mb-6"
                    />
                  )}

                  {/* セクション本文 */}
                  {section.content && (
                    <div className="max-w-2xl mx-auto px-4 md:px-8">
                      <TextContent content={section.content} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ナビゲーションボタン */}
          <nav className="mt-12" aria-label="記事ナビゲーション">
            <div className="flex flex-row flex-wrap gap-6 justify-center items-center">
              <NavigationButton href="/site/blog" icon={<BackIcon />}>
                ブログ一覧
              </NavigationButton>
              <NavigationButton href="/" icon={<HomeIcon />}>
                ホーム
              </NavigationButton>
            </div>
          </nav>
        </article>
      </div>

      <ContactFooter />
    </main>
  );
}