import { kv } from '@vercel/kv';

export default async function sitemap() {
  const baseUrl = 'https://tsui-chiisanakurashi.com';
  
  // KVから投稿を取得
  let posts = [];
  try {
    posts = await kv.get('blog:posts') || [];
  } catch (error) {
    console.error('Failed to fetch posts for sitemap:', error);
    posts = [];
  }
  
  // /site/ 配下のページ
  const routes = [
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
