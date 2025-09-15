"use client";
import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ContactFooter from "@/components/sections/home/ContactFooter";
import { posts } from "@/data/posts";

// ===== Simple Post (odekake-camera 個別記事 風) =====
// 画面中央に「タイトル→日付→大きな画像（白フチ＆影）」のみを配置。
// 余白たっぷり・モノトーン・可読性重視。必要最小限のスタイルに絞っています。

const fmtDateDot = (d) => {
  // 受け取りが ISO の場合は YYYY.MM.DD に整形
  const isIso = /\d{4}-\d{2}-\d{2}/.test(d);
  if (!isIso) return d; // 既に "2025.08.28" のような書式ならそのまま
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
};

export default function BlogPostSimple() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  // URLデコードして日本語に戻す
  const decodedSlug = slug ? decodeURIComponent(slug) : null;

  // URLのslugから該当する投稿を検索（デコード済みで比較）
  const post = posts.find(p => p.id === decodedSlug);

  // デバッグ用（確認後に削除可能）
  console.log('Decoded slug:', decodedSlug);
  console.log('Found post:', post ? post.title : 'Not found');
  console.log('Post sections:', post ? post.sections : 'No post found');

  const handleBackClick = () => {
    router.push('/site/blog');
  };    // 投稿が見つからない場合のデフォルト
  if (!post) {
    return (
      <main className="min-h-screen bg-neutral-100 text-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-8">記事が見つかりません</h1>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/site/blog" className="group flex items-center gap-3 transition-all duration-200">
              {/* 円ボタン */}
              <span className="grid place-items-center w-12 h-12 rounded-full border border-zinc-700 bg-zinc-100/60 text-zinc-700 shadow-sm transition-all
                              group-hover:border-zinc-900 group-hover:bg-zinc-200/80 group-focus-visible:ring-1 group-focus-visible:ring-zinc-700/50">
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none"
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                >
                  <path d="M18 12H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M6 15l-4-3 4-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              {/* テキスト */}
              <span className="text-zinc-700 text-base tracking-wider font-bold py-2
                              group-hover:underline underline-offset-4 decoration-zinc-700 transition-colors" style={{ letterSpacing: '0.12em' }}>
                ブログ一覧
              </span>
            </Link>

            <Link href="/" className="group flex items-center gap-3 transition-all duration-200">
              {/* 円ボタン */}
              <span className="grid place-items-center w-12 h-12 rounded-full border border-zinc-700 bg-zinc-100/60 text-zinc-700 shadow-sm transition-all
                              group-hover:border-zinc-900 group-hover:bg-zinc-200/80 group-focus-visible:ring-1 group-focus-visible:ring-zinc-700/50">
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none"
                  className="transition-transform duration-200 group-hover:scale-110"
                >
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              {/* テキスト */}
              <span className="text-zinc-700 text-base tracking-wider font-bold py-2
                              group-hover:underline underline-offset-4 decoration-zinc-700 transition-colors" style={{ letterSpacing: '0.12em' }}>
                ホーム
              </span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      {/* 記事コンテンツ: ページ上部中央に配置 */}
      <div className="px-6 py-16">
        <article className="max-w-4xl mx-auto">
          {/* タイトル */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-center leading-relaxed tracking-wide">
            {post.title}
          </h1>

          {/* カテゴリと日付 */}
          <div className="flex items-center justify-center gap-3 mb-4">
            {post.category && (
              <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-medium">
                {post.category}
              </span>
            )}
            <p className="text-base text-neutral-600">
              {fmtDateDot(post.date)}
            </p>
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

          {/* 大きな画像（白フチ＆影） */}
          <div className="mb-10 flex justify-center">
            <div className="bg-white p-1 shadow-lg max-w-full overflow-hidden">
              <img
                src={post.cover || "/images/blog/default.jpg"}
                alt={post.title}
                className="w-full h-auto max-w-3xl mx-auto block"
                style={{
                  aspectRatio: "4/3",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          {/* 記事本文（写真より内側に配置） */}
          {post.content && (
            <div className="max-w-2xl mx-auto px-4 md:px-8">
              <div className="prose prose-lg max-w-none text-neutral-800 leading-relaxed">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* 複数画像セクション */}
          {post.sections && post.sections.length > 0 && (
            <div className="mt-12 space-y-10">
              {post.sections.map((section, index) => (
                <div key={index} className="max-w-4xl mx-auto">
                  {/* セクション小見出し */}
                  {section.title && (
                    <div className="max-w-2xl mx-auto px-4 md:px-8 mb-6">
                      <h2 className="text-2xl md:text-3xl font-semibold text-center leading-relaxed tracking-wide text-neutral-800">
                        {section.title}
                      </h2>
                    </div>
                  )}

                  {/* セクション画像 */}
                  {section.image && (
                    <div className="mb-6 flex justify-center">
                      <div className="bg-white p-1 shadow-lg max-w-full overflow-hidden">
                        <img
                          src={section.image}
                          alt={section.title || `セクション ${index + 1}`}
                          className="w-full h-auto max-w-3xl mx-auto block"
                          style={{
                            aspectRatio: "4/3",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* セクション説明文 */}
                  {section.content && (
                    <div className="max-w-2xl mx-auto px-4 md:px-8">
                      <div className="prose prose-lg max-w-none text-neutral-800 leading-relaxed">
                        {section.content.split('\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ナビゲーションボタン */}
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/site/blog"
                className="group flex items-center gap-3 transition-all duration-200"
              >
                {/* 円ボタン */}
                <span className="grid place-items-center w-12 h-12 rounded-full border border-zinc-700 bg-zinc-100/60 text-zinc-700 shadow-sm transition-all
                                  group-hover:border-zinc-900 group-hover:bg-zinc-200/80 group-focus-visible:ring-1 group-focus-visible:ring-zinc-700/50">
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none"
                    className="transition-transform duration-200 group-hover:-translate-x-1"
                  >
                    <path d="M18 12H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M6 15l-4-3 4-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                {/* テキスト */}
                <span className="text-zinc-700 text-base tracking-wider font-bold py-2
                                  group-hover:underline underline-offset-4 decoration-zinc-700 transition-colors" style={{ letterSpacing: '0.12em' }}>
                  ブログ一覧
                </span>
              </Link>

              <Link
                href="/"
                className="group flex items-center gap-3 transition-all duration-200"
              >
                {/* 円ボタン */}
                <span className="grid place-items-center w-12 h-12 rounded-full border border-zinc-700 bg-zinc-100/60 text-zinc-700 shadow-sm transition-all
                                  group-hover:border-zinc-900 group-hover:bg-zinc-200/80 group-focus-visible:ring-1 group-focus-visible:ring-zinc-700/50">
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none"
                    className="transition-transform duration-200 group-hover:scale-110"
                  >
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                {/* テキスト */}
                <span className="text-zinc-700 text-base tracking-wider font-bold py-2
                                  group-hover:underline underline-offset-4 decoration-zinc-700 transition-colors" style={{ letterSpacing: '0.12em' }}>
                  ホーム
                </span>
              </Link>
            </div>
          </div>
        </article>
      </div>

      {/* ContactFooter */}
      <ContactFooter />
    </main>
  );
}