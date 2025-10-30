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
  title: "つい|わたしと夫の小さな暮らし - 石川暮らし",
  description: "石川県で暮らす夫婦の日常を綴るブログ。小さな幸せを写真と文章で記録しています。",
  keywords: "夫婦,日常,暮らし,石川県,ブログ,日記,ライフスタイル,北陸,写真,小さな幸せ,つい,わたしと夫の小さな暮らし",
  authors: [{ name: "つい|夫" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // Open Graph / Social metadata
  openGraph: {
    title: "つい|わたしと夫の小さな暮らし - 石川暮らし",
    description: "石川県で暮らす夫婦の日常を綴るブログ。小さな幸せを写真と文章で記録しています。",
    url: "https://chiisana.kurashi.life/",
    siteName: "つい|わたしと夫の小さな暮らし",
    images: [
      {
        url: "/images/main.jpg",
        width: 1200,
        height: 630,
        alt: "わたしたちの暮らし",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "つい|わたしと夫の小さな暮らし - 石川暮らし",
    description: "石川県で暮らす夫婦の日常を綴るブログ。小さな幸せを写真と文章で記録しています。",
    images: ['/images/main.jpg'],
  },
  // canonical
  alternates: {
    canonical: 'https://chiisana.kurashi.life/'
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": metadata.title,
    "url": "https://chiisana.kurashi.life/",
    "description": metadata.description,
    "author": {
      "@type": "Person",
      "name": metadata.authors?.[0]?.name || ""
    }
  };
  return (
    <html lang="ja">
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
