import PhotoSlider from "./PhotoSlider";
import InstagramFeed from "./InstagramFeed";
import CoupleIntroSlider from "./CoupleIntroSlider";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-orange-50 to-yellow-50">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src="/profiles/17552437879081.jpg" 
                alt="プロフィール画像" 
                className="w-10 h-10 rounded-full object-cover mr-3 shadow-sm"
              />
              <h1 className="text-2xl font-bold text-rose-800">
                私と夫の小さな暮らし
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">
                私たちについて
              </a>
              <span className="text-rose-300 transform rotate-12 select-none">/</span>
              <Link href="/blog" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">
                ブログ
              </Link>
              <span className="text-rose-300 transform rotate-12 select-none">/</span>
              <a href="#photos" className="text-rose-700 hover:text-rose-900 transition-colors font-medium">
                写真
              </a>
              <span className="text-rose-300 transform rotate-12 select-none">/</span>
              <a
                href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-700 hover:text-rose-900 transition-colors flex items-center gap-1"
                title="インスタグラム"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* メインビジュアル */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            石川で過ごす <span className="text-rose-600">ふたりの日常</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            小さな幸せを見つけながら過ごす毎日を綴っています。
          </p>
          {/* 写真スライダー */}
          <PhotoSlider />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#blog"
              className="bg-rose-500 text-white px-8 py-3 rounded-full font-medium hover:bg-rose-600 transition-colors shadow-lg"
            >
              最新の日記を読む
            </a>
            <a
              href="#photos"
              className="border-2 border-rose-500 text-rose-600 px-8 py-3 rounded-full font-medium hover:bg-rose-50 transition-colors"
            >
              写真を見る
            </a>
          </div>
        </div>
      </section>

      {/* 私たちについて */}
      <section id="about" className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">私たちについて</h3>
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <CoupleIntroSlider />
          </div>
        </div>
      </section>

      {/* 最近の日記 */}
      <section id="blog" className="py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">最近の日記</h3>
          <div className="grid gap-6">
            {[
              {
                slug: "summer-evening-kakigori",
                date: "2024年8月10日",
                title: "夏の夕暮れと手作りかき氷",
                excerpt: "今日はとても暑い一日でした。夕方に夫と一緒に庭に出て、手作りのかき氷を作りました。シンプルなブルーハワイシロップをかけただけですが、とても美味しく感じられて...",
                color: "from-blue-100 to-cyan-100"
              },
              {
                slug: "shrine-walk",
                date: "2024年8月8日",
                title: "近所の小さな神社へお散歩",
                excerpt: "朝の涼しいうちに、近所にある小さな神社まで散歩に出かけました。石段を上ると、街が一望できる素敵な場所があって、夫と二人でしばらく景色を眺めていました...",
                color: "from-green-100 to-emerald-100"
              },
              {
                slug: "first-nukadoko",
                date: "2024年8月5日",
                title: "初めてのぬか床作り",
                excerpt: "以前から挑戦してみたかったぬか床作りに挑戦しました。最初はうまくいくか心配でしたが、夫が丁寧に調べてくれて、二人で協力して作ることができました...",
                color: "from-orange-100 to-yellow-100"
              }
            ].map((post, index) => (
              <article key={index} className={`bg-gradient-to-r ${post.color} p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow`}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-24 text-sm text-gray-500 font-medium">
                    {post.date}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="inline-block mt-3 text-rose-600 hover:text-rose-800 font-medium text-sm">
                      続きを読む →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="border-2 border-rose-500 text-rose-600 px-6 py-2 rounded-full font-medium hover:bg-rose-50 transition-colors"
            >
              すべての日記を見る
            </Link>
          </div>
        </div>
      </section>

      {/* 写真ギャラリー */}
      <section id="photos" className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">写真</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "朝の庭", color: "from-green-200 to-emerald-200" },
              { title: "手作りパン", color: "from-orange-200 to-yellow-200" },
              { title: "夕焼け", color: "from-pink-200 to-rose-200" },
              { title: "散歩道", color: "from-blue-200 to-indigo-200" },
              { title: "お茶の時間", color: "from-purple-200 to-pink-200" },
              { title: "季節の花", color: "from-red-200 to-pink-200" },
            ].map((photo, index) => (
              <div key={index} className={`aspect-square bg-gradient-to-br ${photo.color} rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
                <div className="text-center">
                  <svg className="w-8 h-8 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-white text-sm font-medium">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* インスタグラムフィード */}
      <InstagramFeed />

      {/* フッター */}
      <footer className="bg-rose-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-xl font-bold mb-4">私と夫の小さな暮らし</h4>
          <p className="text-rose-200 mb-6">
            石川県で暮らす夫婦の日常を綴るブログ
          </p>

          {/* インスタグラムリンク
          <div className="mb-6">
            <a
              href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-6 py-3 rounded-full text-white font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>インスタグラムはこちら</span>
            </a>
          </div> */}

          <div className="border-t border-rose-700 pt-6">
            <p className="text-rose-300 text-sm">
              ©私と夫の小さな暮らし
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
