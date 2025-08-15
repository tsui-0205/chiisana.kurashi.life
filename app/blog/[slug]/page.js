import Link from "next/link";
import { notFound } from "next/navigation";

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
        image: "/blog/kakigori.jpg",
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
        image: "/blog/shrine.jpg",
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
        image: "/blog/nukadoko.jpg",
        category: "料理",
        tags: ["手作り", "発酵", "料理", "挑戦", "野菜"]
    }
};

export default function BlogPost({ params }) {
    const post = blogPosts[params.slug];

    if (!post) {
        notFound();
    }

    const relatedPosts = Object.values(blogPosts)
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 2);

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
                            <Link href="/blog" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">
                                ブログ
                            </Link>
                            <a href="/#about" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">
                                私たちについて
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            {/* パンくずリスト */}
            <nav className="py-4 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-rose-600">ホーム</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-rose-600">ブログ</Link>
                        <span>/</span>
                        <span className="text-gray-800">{post.title}</span>
                    </div>
                </div>
            </nav>

            {/* 記事メイン */}
            <article className="py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-sm text-gray-500">{post.date}</span>
                            <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-medium">
                                {post.category}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* アイキャッチ画像 */}
                    <div className="mb-8">
                        <div className="aspect-video bg-gradient-to-br from-pink-100 to-orange-100 rounded-3xl flex items-center justify-center shadow-lg">
                            <div className="text-center p-8">
                                <svg className="w-16 h-16 text-rose-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <p className="text-rose-600 font-medium">{post.category}</p>
                            </div>
                        </div>
                    </div>

                    {/* 記事本文 */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-8">
                        <div
                            className="prose prose-lg max-w-none prose-gray prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* 関連記事 */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-12">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">関連記事</h3>
                            <div className="grid gap-6 md:grid-cols-2">
                                {relatedPosts.map((relatedPost) => (
                                    <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                                        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow group">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-sm text-gray-500">{relatedPost.date}</span>
                                                <span className="px-2 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-medium">
                                                    {relatedPost.category}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors">
                                                {relatedPost.title}
                                            </h4>
                                            <div className="text-rose-600 font-medium text-sm">
                                                読む →
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ナビゲーション */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-rose-600 hover:text-rose-800 font-medium transition-colors"
                        >
                            ← ブログ一覧に戻る
                        </Link>
                    </div>
                </div>
            </article>

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
