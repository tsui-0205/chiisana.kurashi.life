export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/site/admin/', '/api/'],
      },
    ],
    sitemap: [
      'https://tsui-chiisanakurashi.com/sitemap.xml',
      'https://tsui-chiisanakurashi.com/site/sitemap.xml',
    ],
  };
}
