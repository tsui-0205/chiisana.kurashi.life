import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* ヘッダー */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-800">
                                ブログ管理画面
                            </h1>
                        </div>
                        <div className="flex space-x-4">
                            <Link href="/" className="text-rose-600 hover:text-rose-800 font-medium">
                                サイトを見る
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">ダッシュボード</h2>
                    <p className="text-gray-600">ブログ記事の作成・編集・管理ができます。</p>
                </div>

                {/* アクション buttons */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    <Link href="/admin/new-post" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-800">新しい記事を書く</h3>
                                <p className="text-gray-600 text-sm">新しいブログ記事を作成します</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/admin/posts" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-800">記事一覧</h3>
                                <p className="text-gray-600 text-sm">既存の記事を管理・編集します</p>
                            </div>
                        </div>
                    </Link>

                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-800">統計</h3>
                                <p className="text-gray-600 text-sm">記事数やアクセス状況を確認</p>
                                <p className="text-2xl font-bold text-green-600 mt-2">3記事</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 最近の記事 */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">最近の記事</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {[
                                { title: "夏の夕暮れと手作りかき氷", date: "2024年8月10日", status: "公開済み" },
                                { title: "近所の小さな神社へお散歩", date: "2024年8月8日", status: "公開済み" },
                                { title: "初めてのぬか床作り", date: "2024年8月5日", status: "公開済み" }
                            ].map((post, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-800">{post.title}</h4>
                                        <p className="text-sm text-gray-600">{post.date}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                            {post.status}
                                        </span>
                                        <button className="text-rose-600 hover:text-rose-800 text-sm font-medium">
                                            編集
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
