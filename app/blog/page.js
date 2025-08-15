import Link from "next/link";

// 仮のブログデータ
const blogPosts = [
    {
        id: "summer-evening-kakigori",
        date: "2024年8月10日",
        title: "夏の夕暮れと手作りかき氷",
        excerpt: "今日はとても暑い一日でした。夕方に夫と一緒に庭に出て、手作りのかき氷を作りました。シンプルなブルーハワイシロップをかけただけですが、とても美味しく感じられて...",
        content: "今日はとても暑い一日でした。夕方に夫と一緒に庭に出て、手作りのかき氷を作りました。シンプルなブルーハワイシロップをかけただけですが、とても美味しく感じられました。",
        image: "/blog/kakigori.jpg",
        category: "日常",
        tags: ["夏", "手作り", "おやつ"]
    },
    {
        id: "shrine-walk",
        date: "2024年8月8日",
        title: "近所の小さな神社へお散歩",
        excerpt: "朝の涼しいうちに、近所にある小さな神社まで散歩に出かけました。石段を上ると、街が一望できる素敵な場所があって、夫と二人でしばらく景色を眺めていました...",
        content: "朝の涼しいうちに、近所にある小さな神社まで散歩に出かけました。石段を上ると、街が一望できる素敵な場所があって、夫と二人でしばらく景色を眺めていました。",
        image: "/blog/shrine.jpg",
        category: "散歩",
        tags: ["朝", "神社", "景色", "散歩"]
    },
    {
        id: "first-nukadoko",
        date: "2024年8月5日",
        title: "初めてのぬか床作り",
        excerpt: "以前から挑戦してみたかったぬか床作りに挑戦しました。最初はうまくいくか心配でしたが、夫が丁寧に調べてくれて、二人で協力して作ることができました...",
        content: "以前から挑戦してみたかったぬか床作りに挑戦しました。最初はうまくいくか心配でしたが、夫が丁寧に調べてくれて、二人で協力して作ることができました。",
        image: "/blog/nukadoko.jpg",
        category: "料理",
        tags: ["手作り", "発酵", "料理", "挑戦"]
    }
];

export default function BlogPage() {
    const categories = [...new Set(blogPosts.map(post => post.category))];

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-orange-50 to-yellow-50">
            {/* ヘッダー */}
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="text-2xl font-bold text-rose-800 hover:text-rose-900 transition-colors">
                            私と夫の小さな暮らし
                        </Link>
                        <div className="hidden md:flex space-x-6">
                            <Link href="/" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">
                                ホーム
                            </Link>
                            <Link href="/blog" className="text-rose-700 hover:text-rose-900 transition-colors font-medium border-b-2 border-rose-500">
                                ブログ
                            </Link>
                            <a href="/#about" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">
                                私たちについて
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            {/* ページヘッダー */}
            <section className="py-16 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        ブログ記事一覧
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        私たちの日常を綴った記事をお楽しみください
                    </p>
                </div>
            </section>

            {/* カテゴリフィルター */}
            <section className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        <button className="px-4 py-2 bg-rose-500 text-white rounded-full font-medium hover:bg-rose-600 transition-colors">
                            すべて
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="px-4 py-2 bg-white text-rose-600 border border-rose-200 rounded-full font-medium hover:bg-rose-50 transition-colors"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 記事一覧 */}
            <section className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {blogPosts.map((post) => (
                            <article key={post.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                                <Link href={`/blog/${post.id}`}>
                                    <div className="aspect-video bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center">
                                        <div className="text-center p-8">
                                            <svg className="w-12 h-12 text-rose-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                            <p className="text-rose-600 font-medium text-sm">{post.category}</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-sm text-gray-500">{post.date}</span>
                                            <span className="px-2 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-medium">
                                                {post.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-rose-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {post.tags.slice(0, 3).map((tag) => (
                                                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="text-rose-600 font-medium text-sm group-hover:text-rose-800 transition-colors">
                                            続きを読む →
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* フッター */}
            <footer className="bg-rose-900 text-white py-12 px-4 mt-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h4 className="text-xl font-bold mb-4">私と夫の小さな暮らし</h4>
                    <p className="text-rose-200 mb-6">
                        石川県で暮らす夫婦の日常を綴るブログ
                    </p>
                    <div className="border-t border-rose-700 pt-6">
                        <p className="text-rose-300 text-sm">
                            © 2025 私と夫の小さな暮らし
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
