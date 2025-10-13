"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ show: false, post: null });
    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const router = useRouter();

    useEffect(() => {
        checkAuthStatus();
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoadingPosts(true);
        try {
            const response = await fetch('/api/posts');
            const data = await response.json();
            if (data.posts) {
                setPosts(data.posts);
            }
        } catch (error) {
        } finally {
            setLoadingPosts(false);
        }
    };

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/auth/me');
            const data = await response.json();

            if (data.authenticated) {
                setIsAuthenticated(true);
            } else {
                router.push('/site/admin/login');
            }
        } catch (error) {
            router.push('/site/admin/login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/login', {
                method: 'DELETE',
            });
            router.push('/site/admin/login');
        } catch (error) {
        }
    };

    // 日付フォーマット関数
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // 最近の記事（最新3件）
    const recentPosts = posts.slice(0, 3);

    // トースト表示関数
    const showToast = (message, type = "info") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: "", type: "" });
        }, 4000);
    };

    // 削除確認モーダルを表示
    const confirmDeletePost = (post) => {
        setDeleteModal({ show: true, post });
    };

    // 記事削除実行
    const handleDeletePost = async () => {
        const post = deleteModal.post;
        if (!post) return;

        try {
            const response = await fetch(`/api/posts?id=${encodeURIComponent(post.id)}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // 記事リストを再読み込み
                loadPosts();
                showToast(`「${post.title}」を削除しました`, 'success');
            } else {
                const error = await response.json();
                showToast(`削除に失敗しました: ${error.error}`, 'error');
            }
        } catch (error) {
            showToast('削除中にエラーが発生しました', 'error');
        } finally {
            setDeleteModal({ show: false, post: null });
        }
    };

    // 削除キャンセル
    const cancelDelete = () => {
        setDeleteModal({ show: false, post: null });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">認証を確認中...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // リダイレクト中
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* トースト通知 */}
            {toast.show && (
                <div
                    className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${toast.type === 'success'
                        ? 'bg-green-500 text-white'
                        : toast.type === 'error'
                            ? 'bg-red-500 text-white'
                            : 'bg-blue-500 text-white'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        {toast.type === 'success' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        )}
                        {toast.type === 'error' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        )}
                        <span>{toast.message}</span>
                        <button
                            onClick={() => setToast({ show: false, message: "", type: "" })}
                            className="ml-2 hover:bg-white hover:bg-opacity-20 rounded p-1"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* 削除確認モーダル */}
            {deleteModal.show && deleteModal.post && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">記事を削除</h3>
                                    <p className="text-sm text-gray-600">この操作は元に戻せません</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-700">
                                    以下の記事を削除しますか？
                                </p>
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900">{deleteModal.post.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {deleteModal.post.category || "日常"} • {formatDate(deleteModal.post.date)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={cancelDelete}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                                >
                                    キャンセル
                                </button>
                                <button
                                    onClick={handleDeletePost}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                >
                                    削除する
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* ヘッダー */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-4">
                        <div className="flex items-center">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                                ブログ管理画面
                            </h1>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleLogout}
                                className="group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                            >
                                <svg className="w-4 h-4 mr-2 text-gray-500 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                ログアウト
                            </button>
                            <Link
                                href="/"
                                className="group inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-rose-600 border border-rose-600 rounded-lg shadow-sm hover:bg-rose-700 hover:border-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all duration-200"
                            >
                                <svg className="w-4 h-4 mr-2 text-rose-100 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
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
                    <Link href="/site/admin/new-post" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
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

                    <Link href="/site/admin/posts" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-800">記事管理</h3>
                                <p className="text-gray-600 text-sm">記事の編集・削除・管理</p>
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
                                <p className="text-2xl font-bold text-green-600 mt-2">
                                    {loadingPosts ? '...' : `${posts.length}記事`}
                                </p>
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
                        {loadingPosts ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto"></div>
                                <p className="mt-2 text-gray-600">記事を読み込み中...</p>
                            </div>
                        ) : recentPosts.length > 0 ? (
                            <div className="space-y-4">
                                {recentPosts.map((post, index) => (
                                    <div key={post.id || index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg gap-3 sm:gap-4">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-800 text-sm sm:text-base">{post.title}</h4>
                                            <p className="text-xs sm:text-sm text-gray-600 mt-1">{formatDate(post.date)}</p>
                                            {post.category && (
                                                <span className="inline-block mt-1 px-2 py-1 bg-rose-100 text-rose-600 text-xs rounded-full">
                                                    {post.category}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-2">
                                            <span className="px-2 py-1 sm:px-3 sm:py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                公開済み
                                            </span>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/site/blog/${post.id}`}
                                                    className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
                                                >
                                                    表示
                                                </Link>
                                                <Link
                                                    href={`/site/admin/edit-post/${encodeURIComponent(post.id)}`}
                                                    className="text-green-600 hover:text-green-800 text-xs sm:text-sm font-medium"
                                                >
                                                    編集
                                                </Link>
                                                <button
                                                    onClick={() => confirmDeletePost(post)}
                                                    className="text-red-600 hover:text-red-800 text-xs sm:text-sm font-medium"
                                                >
                                                    削除
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-600">まだ記事がありません</p>
                                <Link
                                    href="/site/admin/new-post"
                                    className="mt-2 inline-flex items-center text-rose-600 hover:text-rose-800 text-sm font-medium"
                                >
                                    最初の記事を書く
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
