import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import dynamic from 'next/dynamic';

const PageLoaderHost = dynamic(() => import('../components/ui/PageLoaderHost'));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "つい|わたしと夫の小さな暮らし - 石川県で暮らす夫婦の日常ブログ",
  description: "石川県で暮らす夫婦の日常を綴るブログ。2025年2月5日に入籍した内気なふたりが、能登・金沢・白山・加賀の小さな幸せを写真と文章で記録しています。カフェ巡り、読書、フットサル、日々の暮らしを発信中。",
  keywords: "わたしと夫の小さな暮らし,つい,石川県,夫婦ブログ,日常,暮らし,能登,金沢,白山,加賀,北陸,ライフスタイル,カフェ巡り,写真,日記,小さな幸せ,夫婦の日常,石川暮らし,ishikawa,kanazawa",
  authors: [{ name: "つい|夫" }],
  creator: "つい|わたしと夫の小さな暮らし",
  publisher: "つい|わたしと夫の小さな暮らし",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console の確認コードをここに追加（取得後）
    // google: 'your-google-verification-code',
  },
  // Open Graph / Social metadata
  openGraph: {
    title: "つい|わたしと夫の小さな暮らし - 石川県で暮らす夫婦の日常ブログ",
    description: "石川県で暮らす夫婦の日常を綴るブログ。2025年2月5日に入籍した内気なふたりが、能登・金沢・白山・加賀の小さな幸せを写真と文章で記録しています。",
    url: "https://tsui-chiisanakurashi.com/",
    siteName: "つい|わたしと夫の小さな暮らし",
    images: [
      {
        url: "https://tsui-chiisanakurashi.com/images/main.jpg",
        width: 1200,
        height: 630,
        alt: "石川県で暮らす夫婦の日常 - わたしと夫の小さな暮らし",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "つい|わたしと夫の小さな暮らし - 石川県で暮らす夫婦の日常ブログ",
    description: "石川県で暮らす夫婦の日常を綴るブログ。能登・金沢・白山・加賀の小さな幸せを写真と文章で記録しています。",
    images: ['https://tsui-chiisanakurashi.com/images/main.jpg'],
  },
  // canonical
  alternates: {
    canonical: 'https://tsui-chiisanakurashi.com/'
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "つい|わたしと夫の小さな暮らし",
    "alternateName": "わたしと夫の小さな暮らし",
    "url": "https://tsui-chiisanakurashi.com/",
    "description": "石川県で暮らす夫婦の日常を綴るブログ。2025年2月5日に入籍した内気なふたりが、能登・金沢・白山・加賀の小さな幸せを写真と文章で記録しています。",
    "inLanguage": "ja",
    "author": {
      "@type": "Person",
      "name": "つい|夫",
      "description": "石川県在住のエンジニア。読書とフットサルが趣味。"
    },
    "publisher": {
      "@type": "Organization",
      "name": "つい|わたしと夫の小さな暮らし",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tsui-chiisanakurashi.com/images/main.jpg"
      }
    },
    "keywords": "わたしと夫の小さな暮らし,つい,石川県,夫婦ブログ,日常,暮らし,能登,金沢,白山,加賀",
    "about": {
      "@type": "Thing",
      "name": "石川県での暮らし",
      "description": "石川県能登・金沢・白山・加賀での夫婦の日常生活"
    }
  };
  return (
    <html lang="ja">
      <head>
        <link rel="canonical" href="https://tsui-chiisanakurashi.com/" />
        <meta name="geo.region" content="JP-17" />
        <meta name="geo.placename" content="石川県" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <PageLoaderHost />
      </body>
    </html>
  );
}
