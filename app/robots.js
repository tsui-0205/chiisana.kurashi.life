export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/site/admin/', '/api/'],
      },
    ],
    sitemap: 'https://chiisana.kurashi.life/sitemap.xml',
  };
}
