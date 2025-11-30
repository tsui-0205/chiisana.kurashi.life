"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// モバイル用投稿カード
const PostCardMobile = ({ post, formatDate, confirmDeletePost }) => (
    <div className="p-4 hover:bg-gray-50">
        <div className="flex gap-3 mb-3">
            {post.cover && (
                <img src={post.cover} alt={post.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{post.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-600 rounded-full">{post.category || "日常"}</span>
                    <span>{formatDate(post.date)}</span>
                </div>
            </div>
        </div>
        <div className="flex gap-2 justify-end">
            <Link href={`/site/blog/${post.id}`} className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100" target="_blank">表示</Link>
            <Link href={`/site/admin/edit-post/${encodeURIComponent(post.id)}`} className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100">編集</Link>
            <button onClick={() => confirmDeletePost(post)} className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100">削除</button>
        </div>
    </div>
);

// PC用テーブル行
const PostRowDesktop = ({ post, formatDate, confirmDeletePost }) => (
    <tr className="hover:bg-gray-50">
        <td className="px-6 py-4">
            <div className="flex items-center">
                {post.cover && <img src={post.cover} alt={post.title} className="w-12 h-12 object-cover rounded-lg mr-4" />}
                <div>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{post.title}</h3>
                    {post.excerpt && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{post.excerpt}</p>}
                </div>
            </div>
        </td>
        <td className="px-6 py-4">
            <span className="px-2 py-1 bg-rose-100 text-rose-600 text-xs rounded-full">{post.category || "日常"}</span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(post.date)}</td>
        <td className="px-6 py-4">
            <div className="flex gap-2">
                <Link href={`/site/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium" target="_blank">表示</Link>
                <Link href={`/site/admin/edit-post/${encodeURIComponent(post.id)}`} className="text-green-600 hover:text-green-800 text-sm font-medium">編集</Link>
                <button onClick={() => confirmDeletePost(post)} className="text-red-600 hover:text-red-800 text-sm font-medium">削除</button>
            </div>
        </td>
    </tr>
);

export default function PostsManagement() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ show: false, post: null });
    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const router = useRouter();

    useEffect(() => {
        const init = async () => {
            try {
                const response = await fetch('/api/auth/me');
                const data = await response.json();

                if (data.authenticated) {
                    setIsAuthenticated(true);
                    loadPosts();
                } else {
                    router.push('/site/admin/login');
                }
            } catch (error) {
                router.push('/site/admin/login');
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, [router]);

    const loadPosts = async () => {
        setLoadingPosts(true);
        try {
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data.posts || []);
        } catch (error) {
            console.error('Failed to load posts:', error);
        } finally {
            setLoadingPosts(false);
        }
    };

    const showToast = (message, type = "info") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
    };

    const confirmDeletePost = (post) => setDeleteModal({ show: true, post });

    const handleDeletePost = async () => {
        const { post } = deleteModal;
        if (!post) return;

        try {
            const response = await fetch(`/api/posts?id=${encodeURIComponent(post.id)}`, { method: 'DELETE' });

            if (response.ok) {
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

    const cancelDelete = () => setDeleteModal({ show: false, post: null });

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
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
        return null;
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-4 sm:p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">記事を削除</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">この操作は元に戻せません</p>
                                </div>
                            </div>

                            <div className="mb-4 sm:mb-6">
                                <p className="text-sm sm:text-base text-gray-700">
                                    以下の記事を削除しますか？
                                </p>
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                    <h4 className="text-sm sm:text-base font-medium text-gray-900 break-words">{deleteModal.post.title}</h4>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                        {deleteModal.post.category || "日常"} • {formatDate(deleteModal.post.date)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
                                <button
                                    onClick={cancelDelete}
                                    className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                                >
                                    キャンセル
                                </button>
                                <button
                                    onClick={handleDeletePost}
                                    className="w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-red-600 text-white text-sm sm:text-base rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
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
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <Link
                                href="/site/admin"
                                className="group inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all duration-200 self-start"
                            >
                                <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 transition-transform duration-200 group-hover:-translate-x-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                <span className="whitespace-nowrap">管理画面に戻る</span>
                            </Link>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                                記事管理
                            </h1>
                        </div>
                        <Link
                            href="/site/admin/new-post"
                            className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            新しい記事を書く
                        </Link>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-md border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-800">
                                全記事一覧 ({posts.length}件)
                            </h2>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {loadingPosts ? (
                            null
                        ) : posts.length > 0 ? (
                            <>
                                {/* スマホ: カードレイアウト */}
                                <div className="block md:hidden divide-y divide-gray-200">
                                    {posts.map((post, index) => (
                                        <PostCardMobile key={post.id || index} post={post} formatDate={formatDate} confirmDeletePost={confirmDeletePost} />
                                    ))}
                                </div>

                                {/* PC: テーブルレイアウト */}
                                <table className="hidden md:table w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">記事情報</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリ</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">公開日</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {posts.map((post, index) => (
                                            <PostRowDesktop key={post.id || index} post={post} formatDate={formatDate} confirmDeletePost={confirmDeletePost} />
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-600 mb-4">まだ記事がありません</p>
                                <Link
                                    href="/site/admin/new-post"
                                    className="inline-flex items-center text-rose-600 hover:text-rose-800 font-medium"
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
