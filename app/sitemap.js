import { posts } from '@/data/posts';

export default function sitemap() {
  const baseUrl = 'https://chiisana.kurashi.life';
  
  // 基本ページ
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/site/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // ブログ記事を動的に追加
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/site/blog/${encodeURIComponent(post.id)}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...routes, ...blogPosts];
}
