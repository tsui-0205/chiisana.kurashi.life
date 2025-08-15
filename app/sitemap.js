export default function sitemap() {
  return [
    {
      url: 'https://my-small-life.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://my-small-life.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://my-small-life.com/blog/summer-evening-kakigori',
      lastModified: new Date('2024-08-10'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://my-small-life.com/blog/shrine-walk',
      lastModified: new Date('2024-08-08'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://my-small-life.com/blog/first-nukadoko',
      lastModified: new Date('2024-08-05'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
