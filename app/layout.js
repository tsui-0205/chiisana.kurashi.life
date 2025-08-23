import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "わたしと夫の小さな暮らし - 石川県で過ごす夫婦の日常",
  description: "石川県で暮らす夫婦の日常を綴るブログ。季節の移り変わり、料理、散歩、小さな幸せを写真と文章で記録しています。",
  keywords: "夫婦,日常,暮らし,石川県,ブログ,日記,ライフスタイル,北陸",
  authors: [{ name: "河岸夫妻" }],
  icons: {
    icon: "/profiles/17552437879081.jpg",
    shortcut: "/profiles/17552437879081.jpg",
    apple: "/profiles/17552437879081.jpg",
  },
  openGraph: {
    title: "わたしと夫の小さな暮らし - 石川県で過ごす夫婦の日常",
    description: "石川県で暮らす夫婦の日常を綴るブログ。季節の移り変わり、料理、散歩、小さな幸せを写真と文章で記録しています。",
    type: "website",
    locale: "ja_JP",
    siteName: "わたしと夫の小さな暮らし"
  },
  twitter: {
    card: "summary",
    title: "わたしと夫の小さな暮らし - 石川県で過ごす夫婦の日常",
    description: "石川県で暮らす夫婦の日常を綴るブログ。季節の移り変わり、料理、散歩、小さな幸せを写真と文章で記録しています。"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
