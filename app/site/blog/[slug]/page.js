"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ContactFooter from "@/components/sections/home/ContactFooter";

// 日付フォーマット: YYYY.MM.DD
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  if (!/\d{4}-\d{2}-\d{2}/.test(dateStr)) return dateStr;
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
};

// ナビゲーションボタン
const NavigationButton = ({ href, children, icon }) => (
  <Link href={href} className="group flex items-center gap-3 transition-all duration-200">
    <span className="grid place-items-center w-12 h-12 rounded-full border border-zinc-700 bg-zinc-100/60 text-zinc-700 shadow-sm transition-all group-hover:border-zinc-900 group-hover:bg-zinc-200/80">
      {icon}
    </span>
    <span className="text-zinc-700 text-base tracking-wider font-bold group-hover:underline underline-offset-4" style={{ letterSpacing: '0.12em' }}>
      {children}
    </span>
  </Link>
);

// アイコン
const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:-translate-x-1">
    <path d="M18 12H6M6 15l-4-3 4-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HomeIcon = () => <img src="/images/blog/homeicon.png" alt="ホーム" className="w-6 h-6 object-contain" loading="lazy" />;

// 記事画像
const ArticleImage = ({ src, alt, className = "" }) => (
  <div className={`flex justify-center ${className}`}>
    <div className="bg-white p-1 shadow-lg max-w-full">
      <img
        src={src || "/images/blog/default.jpg"}
        alt={alt}
        className="w-full h-auto max-w-3xl mx-auto block object-contain"
        loading="lazy"
        onError={(e) => { e.target.src = "/images/blog/default.jpg"; }}
      />
    </div>
  </div>
);

// テキストコンテンツ
const TextContent = ({ content }) => {
  const paragraphs = useMemo(() => 
    content ? content.split('\n').filter(p => p.trim()) : [], 
    [content]
  );
  
  if (!content || paragraphs.length === 0) return null;
  
  return (
    <div className="prose prose-lg max-w-none text-neutral-800 leading-relaxed">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4">{paragraph}</p>
      ))}
    </div>
  );
};

export default function BlogPostSimple() {
  const params = useParams();
  const slug = params?.slug;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || []);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const post = useMemo(() => {
    if (!slug || !posts.length) return null;
    return posts.find(p => p.id === decodeURIComponent(slug));
  }, [slug, posts]);

  if (loading) return null;

  if (!post) {
    return (
      <main className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-8">記事が見つかりません</h1>
          <div className="flex flex-wrap gap-6 justify-center">
            <NavigationButton href="/site/blog" icon={<BackIcon />}>ブログ一覧</NavigationButton>
            <NavigationButton href="/" icon={<HomeIcon />}>ホーム</NavigationButton>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="px-6 py-16">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-center leading-relaxed tracking-wide whitespace-nowrap overflow-x-auto">{post.title}</h1>

          <div className="flex items-center justify-center gap-3 mb-4">
            {post.category && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${post.category === '思い出' ? 'bg-[#e5e1dc] text-[#333]' : 'bg-zinc-100 text-zinc-600'}`}>
                {post.category}
              </span>
            )}
            <time dateTime={post.date} className="text-base text-neutral-600">{formatDate(post.date)}</time>
          </div>

          {post.excerpt && (
            <div className="max-w-2xl mx-auto text-center mb-6">
              <p className="text-lg text-neutral-700 leading-relaxed">{post.excerpt}</p>
            </div>
          )}

          {post.tags && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {post.tags.split(',').map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm font-medium">#{tag.trim()}</span>
              ))}
            </div>
          )}

          <ArticleImage src={post.cover} alt={post.title} className="mb-10" />

          {post.images?.length > 0 && (
            <div className="space-y-6 mb-10">
              {post.images.map((imageUrl, index) => (
                <ArticleImage key={index} src={imageUrl} alt={`画像 ${index + 1}`} className="mb-6" />
              ))}
            </div>
          )}

          {post.content && (
            <div className="max-w-2xl mx-auto px-4 md:px-8">
              <TextContent content={post.content} />
            </div>
          )}

          {post.sections?.length > 0 && (
            <div className="mt-12 space-y-10">
              {post.sections.map((section, index) => (
                <div key={index} className="max-w-4xl mx-auto">
                  {section.title && (
                    <div className="max-w-2xl mx-auto px-4 md:px-8 mb-6">
                      <h2 className="text-2xl md:text-3xl font-semibold text-center leading-relaxed tracking-wide text-neutral-800">{section.title}</h2>
                    </div>
                  )}
                  {section.image && <ArticleImage src={section.image} alt={section.title || `セクション ${index + 1}`} className="mb-6" />}
                  {section.content && (
                    <div className="max-w-2xl mx-auto px-4 md:px-8">
                      <TextContent content={section.content} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <nav className="mt-12" aria-label="記事ナビゲーション">
            <div className="flex flex-wrap gap-6 justify-center">
              <NavigationButton href="/site/blog" icon={<BackIcon />}>ブログ一覧</NavigationButton>
              <NavigationButton href="/" icon={<HomeIcon />}>ホーム</NavigationButton>
            </div>
          </nav>
        </article>
      </div>
      <ContactFooter />
    </main>
  );
}