import PhotoSlider from "./PhotoSlider";
import InstagramFeed from "./InstagramFeed";
import CoupleIntroSlider from "./CoupleIntroSlider";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-800 overflow-hidden relative">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
        .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'; }
        .font-hand { font-family: 'Yomogi', 'Noto Sans JP', sans-serif; letter-spacing: .02em; }
        .vertical-rl { writing-mode: vertical-rl; text-orientation: upright; }
        .soft-spot { filter: blur(28px); opacity: .35; }
      `}</style>

      {/* Right-side soft color blobs */}
      <div className="pointer-events-none absolute right-8 top-44 size-6 rounded-full bg-zinc-400/50" />
      <div className="pointer-events-none absolute right-16 top-64 w-56 h-56 rounded-full bg-orange-100 soft-spot" />
      <div className="pointer-events-none absolute right-6 top-[420px] w-72 h-72 rounded-full bg-sky-100 soft-spot" />

      {/* Layout: three columns (left text / hero image / right nav) */}
      <section className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(420px,560px)_1fr] min-h-screen font-body">
        {/* Left: Title + profile image */}
        <div className="order-2 lg:order-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 pb-16 lg:pb-0">
          <div className="flex items-center mb-8">
            <img 
              src="/profiles/17552437879081.jpg" 
              alt="プロフィール画像" 
              className="w-12 h-12 rounded-full object-cover mr-4 shadow-sm"
            />
          </div>
          <h1 className="font-hand text-[clamp(28px,6vw,64px)] leading-[1.1] text-zinc-900 select-none">
            私と夫の小さな暮らし
          </h1>
          <p className="text-lg text-zinc-600 mt-6 max-w-md leading-relaxed">
            石川で過ごすふたりの日常を綴っています。
          </p>
        </div>

        {/* Middle: Hero Image (PhotoSlider) */}
        <div className="order-1 lg:order-2 relative h-[48vh] lg:h-auto lg:min-h-screen border-x lg:border-l lg:border-r border-transparent lg:border-zinc-100">
          <div className="absolute inset-0">
            <PhotoSlider />
          </div>
        </div>

        {/* Right: Vertical nav + scroll doodle */}
        <div className="order-3 hidden lg:flex flex-col justify-between items-center px-8">
          <nav className="mt-24 vertical-rl text-zinc-600/90 tracking-[.25em] text-sm">
            <ul className="space-y-6">
              <li>
                <a href="#about" className="hover:text-zinc-900 transition-colors cursor-pointer">
                  私たちについて
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-zinc-900 transition-colors cursor-pointer">
                  ブログ
                </Link>
              </li>
              <li>
                <a href="#photos" className="hover:text-zinc-900 transition-colors cursor-pointer">
                  写真
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900 transition-colors cursor-pointer"
                  title="インスタグラム"
                >
                  インスタグラム
                </a>
              </li>
            </ul>
          </nav>

          {/* Scroll indicator */}
          <div className="mb-10 flex flex-col items-center gap-2 select-none">
            <span className="text-xs tracking-widest text-zinc-500">Scroll</span>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="28" stroke="#cfcfd6" strokeWidth="2" strokeDasharray="4 6" />
              <rect x="26" y="18" width="8" height="24" rx="4" stroke="#9aa0a6" strokeWidth="2" />
              <circle cx="30" cy="24" r="3" fill="#9aa0a6" />
            </svg>
          </div>
        </div>
      </section>

      {/* Mobile navigation - 縦書きナビを横書きで表示 */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-zinc-200 z-20">
        <nav className="px-4 py-3">
          <ul className="flex justify-center space-x-6 text-sm">
            <li>
              <a href="#about" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                私たちについて
              </a>
            </li>
            <li>
              <Link href="/blog" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                ブログ
              </Link>
            </li>
            <li>
              <a href="#photos" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                写真
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 transition-colors"
                title="インスタグラム"
              >
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile footer scroll cue */}
      <div className="lg:hidden absolute bottom-20 left-1/2 -translate-x-1/2 text-center text-xs text-zinc-500">
        <div className="animate-bounce">Scroll</div>
      </div>

      {/* 私たちについて */}
      <section id="about" className="py-20 px-4 bg-zinc-50">
        <div className="max-w-4xl mx-auto font-body">
          <h3 className="text-3xl font-bold text-center text-zinc-800 mb-12">私たちについて</h3>
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <CoupleIntroSlider />
          </div>
        </div>
      </section>

      {/* 最近の日記 */}
      <section id="blog" className="py-20 px-4 bg-white font-body">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-zinc-800 mb-12">最近の日記</h3>
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
                  <div className="md:w-24 text-sm text-zinc-500 font-medium">
                    {post.date}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-zinc-800 mb-2">
                      {post.title}
                    </h4>
                    <p className="text-zinc-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="inline-block mt-3 text-zinc-700 hover:text-zinc-900 font-medium text-sm">
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
              className="border-2 border-zinc-400 text-zinc-700 px-6 py-2 rounded-full font-medium hover:bg-zinc-50 transition-colors"
            >
              すべての日記を見る
            </Link>
          </div>
        </div>
      </section>

      {/* 写真ギャラリー */}
      <section id="photos" className="py-20 px-4 bg-zinc-50 font-body">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-zinc-800 mb-12">写真</h3>
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
      <div className="bg-white">
        <InstagramFeed />
      </div>

      {/* フッター */}
      <footer className="bg-zinc-900 text-white py-12 px-4 font-body">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-xl font-bold mb-4">私と夫の小さな暮らし</h4>
          <p className="text-zinc-400 mb-6">
            石川県で暮らす夫婦の日常を綴るブログ
          </p>

          <div className="border-t border-zinc-700 pt-6">
            <p className="text-zinc-500 text-sm">
              ©私と夫の小さな暮らし
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
