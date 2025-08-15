"use client";
import { useState } from "react";
import Link from "next/link";

export default function NewPost() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "日常",
    tags: "",
    publishDate: new Date().toISOString().split('T')[0]
  });

  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // タイトルが変更されたら自動でslugを生成
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここで記事を保存する処理を実装
    console.log("新しい記事:", formData);
    alert("記事が保存されました！（このデモでは実際には保存されません）");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-800">
                ← 管理画面に戻る
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">
                新しい記事を書く
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {preview ? "編集" : "プレビュー"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!preview ? (
          // 編集フォーム
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              {/* 基本情報 */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    記事タイトル *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="記事のタイトルを入力してください"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    スラッグ（URL）
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="記事のURL（自動生成されます）"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL: /blog/{formData.slug}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  記事の概要
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="記事の短い要約を入力してください"
                />
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリ
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="日常">日常</option>
                    <option value="料理">料理</option>
                    <option value="散歩">散歩</option>
                    <option value="季節">季節</option>
                    <option value="思い出">思い出</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    タグ
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="タグ1, タグ2, タグ3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公開日
                  </label>
                  <input
                    type="date"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* 記事本文 */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                記事本文 *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent font-mono text-sm"
                placeholder="記事の内容を入力してください。HTMLタグも使用できます。"
                required
              />
              <div className="mt-2 text-xs text-gray-500">
                <p>HTMLタグが使用できます。段落は &lt;p&gt;&lt;/p&gt; で囲んでください。</p>
                <p>改行は自動的に段落に変換されます。</p>
              </div>
            </div>

            {/* 保存ボタン */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/admin"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                記事を保存
              </button>
            </div>
          </form>
        ) : (
          // プレビュー
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <article>
              <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-500">{formData.publishDate}</span>
                  <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-medium">
                    {formData.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  {formData.title || "記事タイトルがここに表示されます"}
                </h1>
                {formData.excerpt && (
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {formData.excerpt}
                  </p>
                )}
                {formData.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.tags.split(',').map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              <div className="prose prose-lg max-w-none prose-gray">
                {formData.content ? (
                  <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') }} />
                ) : (
                  <p className="text-gray-500 italic">記事の内容がここに表示されます...</p>
                )}
              </div>
            </article>
          </div>
        )}
      </div>
    </div>
  );
}
