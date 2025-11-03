export default function sitemap() {
  const baseUrl = 'https://tsui-chiisanakurashi.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];
}
