"use client";

import { useState } from "react";
import ContactFooter from "../../../components/sections/home/ContactFooter";
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const categories = [...new Set(blogPosts.map(post => post.category))];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-white text-zinc-800 relative min-h-screen">
            {/* Google Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
                .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
                .font-hand { font-family: 'Yomogi', 'Noto Sans JP', sans-serif; letter-spacing: .02em; }
            `}</style>

            {/* Header */}
            <header className="relative bg-white border-b border-zinc-200">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-2xl font-bold text-zinc-800 hover:text-zinc-900 transition-colors font-hand">
                            わたしと夫の小さな暮らし
                        </Link>
                        
                        {/* Desktop Navigation */}
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

                        {/* Mobile Hamburger */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1.5 transition-all duration-300"
                            aria-label="メニューを開く"
                        >
                            <span className={`w-6 h-0.5 bg-zinc-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`w-6 h-0.5 bg-zinc-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`w-6 h-0.5 bg-zinc-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`lg:hidden mt-4 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                        <nav className="space-y-4 py-4">
                            <Link href="/" className="block text-zinc-600 hover:text-zinc-900 transition-colors font-medium">
                                ホーム
                            </Link>
                            <Link href="/#about" className="block text-zinc-600 hover:text-zinc-900 transition-colors font-medium">
                                わたしたちのこと
                            </Link>
                            <Link href="/blog" className="block text-zinc-900 font-medium">
                                ブログ
                            </Link>
                            <a
                                href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-zinc-600 hover:text-zinc-900 transition-colors font-medium"
                            >
                                Instagram
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-16 font-body">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 mb-4 font-hand tracking-widest">
                        ブログ
                    </h1>
                    <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                        私たちの日常や発見を記録しています
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button className="px-6 py-2 bg-zinc-900 text-white rounded-full font-medium">
                        すべて
                    </button>
                    {categories.map((category) => (
                        <button 
                            key={category}
                            className="px-6 py-2 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 rounded-full font-medium transition-colors"
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <article key={post.id} className="group">
                            <Link href={`/blog/${post.id}`}>
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-zinc-100">
                                    {/* Image */}
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 mb-3">
                                            <time className="text-sm text-zinc-500">{post.date}</time>
                                            <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                        
                                        <h2 className="text-xl font-medium mb-3 text-zinc-800 group-hover:text-zinc-900 font-hand">
                                            {post.title}
                                        </h2>
                                        
                                        <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        
                                        <div className="mt-4 text-zinc-600 text-sm font-medium group-hover:text-zinc-900 transition-colors">
                                            続きを読む →
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </main>

            {/* Contact Footer */}
            <ContactFooter />
        </div>
    );
}
