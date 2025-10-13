"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    // 既にログイン済みかチェック
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/auth/me');
            const data = await response.json();

            if (data.authenticated) {
                router.push('/site/admin');
            }
        } catch (error) {
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/site/admin');
            } else {
                setError(data.message || 'ログインに失敗しました');
            }
        } catch (error) {
            setError('ログイン中にエラーが発生しました');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">管理者ログイン</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        ブログ管理にアクセスするにはパスワードを入力してください
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                パスワード
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                    placeholder="管理者パスワードを入力"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || !password}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'ログイン中...' : 'ログイン'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="text-center">
                            <Link
                                href="/"
                                className="text-sm text-rose-600 hover:text-rose-500"
                            >
                                ← ホームに戻る
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
