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
  title: "つい|わたしと夫の小さな暮らし - 石川暮らし",
  description: "石川県で暮らす夫婦の日常を綴るブログ。季節の移り変わり、料理、散歩、小さな幸せを写真と文章で記録しています。",
  keywords: "夫婦,日常,暮らし,石川県,ブログ,日記,ライフスタイル,北陸",
  authors: [{ name: "河岸夫妻" }],
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
