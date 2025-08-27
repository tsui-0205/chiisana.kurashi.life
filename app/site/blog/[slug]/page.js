"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactFooter from "../../../../components/sections/home/ContactFooter";

// 仮のブログデータ（実際のプロジェクトでは外部ファイルやCMSから取得）
const blogPosts = {
    "summer-evening-kakigori": {
        id: "summer-evening-kakigori",
        date: "2024年8月10日",
        title: "夏の夕暮れと手作りかき氷",
        content: `
      <p>今日はとても暑い一日でした。気温は35度を超え、エアコンの効いた部屋にいても汗ばむほどでした。</p>
      
      <p>夕方になって少し涼しくなったころ、夫が「かき氷作ろうか」と提案してくれました。冷凍庫にある氷と、買い置きしておいたブルーハワイのシロップで、簡単な手作りかき氷を作ることにしました。</p>
      
      <p>夫がかき氷機で氷を削り、私がシロップをかける係です。シンプルなブルーハワイシロップをかけただけでしたが、この暑さの中で食べるかき氷は格別に美味しく感じられました。</p>
      
      <p>庭に出て、夕焼けを見ながら二人でかき氷を食べる時間は、とても幸せでした。こんな些細な時間が、私たちにとっての大切な思い出になっていくのだなと思います。</p>
      
      <p>明日はもう少し涼しくなりそうです。でもまた暑くなったら、今度は違う味のシロップを試してみたいと思います。</p>
    `,
    image: "/images/blog/kakigori.jpg",
        category: "日常",
        tags: ["夏", "手作り", "おやつ", "夫婦時間"]
    },
    "shrine-walk": {
        id: "shrine-walk",
        date: "2024年8月8日",
        title: "近所の小さな神社へお散歩",
        content: `
      <p>今朝は久しぶりに早起きをして、涼しいうちに近所の小さな神社まで散歩に出かけました。</p>
      
      <p>家から歩いて15分ほどの場所にある神社は、普段はあまり人がいない静かな場所です。朝の清々しい空気の中、石段をゆっくりと上っていきます。</p>
      
      <p>境内に着くと、石川県の街並みが一望できる素敵な場所がありました。夫と二人で小さなベンチに座り、しばらく景色を眺めていました。遠くに見える山々、手前に広がる田んぼや住宅地。いつも見慣れた景色ですが、高い場所から見ると新鮮に感じられます。</p>
      
      <p>神社の境内には季節の花も咲いていて、写真を撮ったりしながらのんびりと過ごしました。こういう何気ない時間が、私たちには一番の贅沢かもしれません。</p>
      
      <p>帰り道では、コンビニで冷たいお茶を買って、また別の道を通って帰りました。同じ街でも、歩く道が違うだけで新しい発見があるものですね。</p>
    `,
    image: "/images/blog/shrine.jpg",
        category: "散歩",
        tags: ["朝", "神社", "景色", "散歩", "発見"]
    },
    "first-nukadoko": {
        id: "first-nukadoko",
        date: "2024年8月5日",
        title: "初めてのぬか床作り",
        content: `
      <p>以前から興味があったぬか床作りに、ついに挑戦してみることにしました。</p>
      
      <p>最初は本当にうまくできるのか心配でしたが、夫がインターネットや本で丁寧に調べてくれて、必要な材料や作り方をまとめてくれました。二人で協力しながら作業を進めることができました。</p>
      
      <p>米ぬか、塩、水の配合から始まり、昆布や唐辛子なども加えて、最初のぬか床を仕込みます。手で混ぜている時の感触が何とも言えず、発酵食品を作っているという実感が湧いてきます。</p>
      
      <p>最初の野菜は、きゅうりとナスを漬けてみました。1日後に取り出してみると、ほんのりとぬかの香りがして、シャキシャキとした食感も残っています。初回にしては上出来だと思います。</p>
      
      <p>これから毎日かき混ぜて、ぬか床を育てていくのが楽しみです。季節ごとに違う野菜を漬けて、私たちだけの味を作っていきたいと思います。</p>
    `,
    image: "/images/blog/nukadoko.jpg",
        category: "料理",
        tags: ["手作り", "発酵", "料理", "挑戦", "野菜"]
    }
};


export default function BlogPost({ params }) {
    const { slug } = React.use(params);
    const post = blogPosts[slug];

    if (!post) {
        notFound();
    }

    const relatedPosts = Object.values(blogPosts)
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 2);

    return (
        <div className="bg-white text-zinc-800 relative min-h-screen font-body">
            {/* Google Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
                .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
                .font-hand { font-family: 'Yomogi', 'Noto Sans JP', sans-serif; letter-spacing: .02em; }
            `}</style>
            {/* ヘッダー */}
            <header className="relative bg-white border-b border-zinc-200">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-zinc-800 hover:text-zinc-900 transition-colors font-hand">
                            わたしと夫の小さな暮らし
                        </Link>
                        <nav className="hidden lg:flex space-x-8">
                            <Link href="/" className="text-zinc-600 hover:text-zinc-900 transition-colors font-medium">
                                ホーム
                            </Link>
                            <Link href="/#about" className="text-zinc-600 hover:text-zinc-900 transition-colors font-medium">
                                わたしたちのこと
                            </Link>
                            <Link href="/blog" className="text-zinc-900 font-medium border-b-2 border-zinc-900">
                                ブログ
                            </Link>
                            <a
                                href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-600 hover:text-zinc-900 transition-colors font-medium"
                            >
                                Instagram
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* パンくずリスト */}
            <nav className="py-4 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center space-x-2 text-sm text-zinc-600">
                        <Link href="/" className="hover:text-zinc-900">ホーム</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-zinc-900">ブログ</Link>
                        <span>/</span>
                        <span className="text-zinc-800">{post.title}</span>
                    </div>
                </div>
            </nav>

            {/* 記事メイン */}
            <main className="max-w-6xl mx-auto px-6 py-16 font-body">
                <div className="max-w-3xl mx-auto">
                    <header className="mb-8">
                        <div className="flex items-center gap-4 mb-3">
                            <time className="text-sm text-zinc-500">{post.date}</time>
                            <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-full">
                                {post.category}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 mb-4 font-hand tracking-widest">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-md text-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* アイキャッチ画像 */}
                    {post.image && (
                        <div className="mb-8 max-w-3xl mx-auto w-full">
                            <div className="relative w-full aspect-[4/3] rounded-[2rem] p-[3px] bg-gradient-to-br from-pink-200 via-zinc-100 to-sky-200 shadow-xl overflow-hidden group">
                                <div className="w-full h-full rounded-[1.8rem] bg-white/80 backdrop-blur-[2px] flex items-center justify-center overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = '/images/blog/kilakilazaka.jpg';
                                        }}
                                    />
                                </div>
                                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-zinc-200 group-hover:ring-pink-300 pointer-events-none transition-all duration-300"></div>
                            </div>
                        </div>
                    )}

                    {/* 記事本文 */}
                    <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
                        <div
                            className="prose prose-lg max-w-none prose-zinc prose-headings:text-zinc-800 prose-p:text-zinc-700 prose-p:leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* 関連記事 */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-12">
                            <h3 className="text-2xl font-bold text-zinc-800 mb-6">関連記事</h3>
                            <div className="grid gap-6 md:grid-cols-2">
                                {relatedPosts.map((relatedPost) => (
                                    <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                                        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-shadow group">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-sm text-zinc-500">{relatedPost.date}</span>
                                                <span className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded-full text-xs font-medium">
                                                    {relatedPost.category}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-semibold text-zinc-800 mb-2 group-hover:text-zinc-900 transition-colors">
                                                {relatedPost.title}
                                            </h4>
                                            <div className="text-zinc-600 font-medium text-sm group-hover:text-zinc-900 transition-colors">
                                                読む →
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ナビゲーション */}
                    <div className="mt-8 pt-8 border-t border-zinc-200">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-zinc-600 hover:text-zinc-900 font-medium transition-colors"
                        >
                            ← ブログ一覧に戻る
                        </Link>
                    </div>
                </div>
            </main>

            {/* Contact Footer */}
            <ContactFooter />
        </div>
    );
}
