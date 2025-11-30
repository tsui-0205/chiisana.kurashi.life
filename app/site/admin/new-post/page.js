"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";

export default function NewPost() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    cover: "",
    images: [], // 複数画像用
    excerpt: "",
    category: "日常",
    tags: [],
    sections: [],
    publishDate: new Date().toISOString().split('T')[0]
  });

  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const TOAST_DURATION = 3000;

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, TOAST_DURATION);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

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

  const handleImageUpload = async (e, sectionIndex = null, isMultiple = false) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formDataImage = new FormData();
      formDataImage.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataImage,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();

      if (sectionIndex !== null) {
        setFormData(prev => ({
          ...prev,
          sections: prev.sections.map((section, index) =>
            index === sectionIndex ? { ...section, image: result.url } : section
          )
        }));
      } else if (isMultiple) {
        setFormData(prev => ({ ...prev, images: [...prev.images, result.url] }));
      } else {
        setFormData(prev => ({ ...prev, cover: result.url }));
      }

      showToast('画像がアップロードされました！', 'success');
    } catch (error) {
      showToast('画像のアップロードエラーが発生しました。', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // セクション管理関数
  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: "", content: "", image: "" }]
    }));
  };

  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const updateSection = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };

  const addTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title?.trim() || !formData.content?.trim() || !formData.slug?.trim()) {
      showToast('タイトル、スラッグ、本文は必須項目です。', 'error');
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);

    try {
      const postData = {
        id: formData.slug,
        title: formData.title,
        content: formData.content,
        cover: formData.cover || "/images/sample/default.jpg",
        images: formData.images,
        excerpt: formData.excerpt,
        category: formData.category,
        tags: formData.tags.join(', '),
        sections: formData.sections,
        date: formData.publishDate,
      };

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '投稿に失敗しました');
      }

      showToast('記事が正常に投稿されました！', 'success');
      setTimeout(() => router.push(`/site/blog/${formData.slug}`), 1000);
    } catch (error) {
      showToast(error.message || '投稿中にエラーが発生しました。', 'error');
      setIsSubmitting(false);
    }
  };

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
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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

      {/* 投稿確認モーダル */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                記事を投稿しますか？
              </h3>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p><strong>タイトル:</strong> {formData.title}</p>
                <p><strong>スラッグ:</strong> {formData.slug}</p>
                <p><strong>カテゴリ:</strong> {formData.category}</p>
                {formData.tags.length > 0 && (
                  <p><strong>タグ:</strong> {formData.tags.join(', ')}</p>
                )}
                <p><strong>公開日:</strong> {formData.publishDate}</p>
                <p><strong>画像セクション:</strong> {formData.sections.length}個</p>
                {formData.cover && (
                  <p><strong>カバー画像:</strong> 設定済み</p>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  キャンセル
                </button>
                <button
                  onClick={confirmSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '投稿中...' : '投稿する'}
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
                新しい記事を書く
              </h1>
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
                    URL: /site/blog/{formData.slug}
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

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  アイキャッチ画像
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                    disabled={uploadingImage}
                  />
                  {uploadingImage && (
                    <span className="text-sm text-gray-500">アップロード中...</span>
                  )}
                </div>
                {formData.cover && (
                  <div className="mt-4">
                    <img
                      src={formData.cover}
                      alt="アイキャッチ画像"
                      className="w-32 h-32 object-cover rounded-md border border-gray-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      画像URL: {formData.cover}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  追加画像（複数アップロード可能）
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, null, true)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    disabled={uploadingImage}
                  />
                  {uploadingImage && (
                    <span className="text-sm text-gray-500">アップロード中...</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  記事内で使用する画像を複数アップロードできます
                </p>
                {formData.images && formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.images.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`画像 ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <p className="text-xs text-gray-500 mt-1 truncate" title={imageUrl}>
                          {imageUrl}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
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
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    タグ
                  </label>
                  <div className="space-y-3">
                    {/* 既存のタグ表示 */}
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            #{tag}
                            <button
                              type="button"
                              onClick={() => removeTag(index)}
                              className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 新しいタグ入力 */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="newTag"
                        placeholder="新しいタグを入力"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.target;
                            const tag = input.value.trim();
                            if (tag) {
                              addTag(tag);
                              input.value = '';
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('newTag');
                          const tag = input.value.trim();
                          if (tag) {
                            addTag(tag);
                            input.value = '';
                          }
                        }}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        追加
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Enterキーまたは「追加」ボタンでタグを追加できます
                    </p>
                  </div>
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
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent font-mono text-sm"
                placeholder="記事の導入部分を入力してください。HTMLタグも使用できます。"
                required
              />
              <div className="mt-2 text-xs text-gray-500">
                <p>HTMLタグが使用できます。段落は &lt;p&gt;&lt;/p&gt; で囲んでください。</p>
              </div>
            </div>

            {/* 画像セクション */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">画像セクション</h3>
                <button
                  type="button"
                  onClick={addSection}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  + セクション追加
                </button>
              </div>

              {formData.sections.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  「+ セクション追加」ボタンで画像付きセクションを追加できます
                </p>
              )}

              {formData.sections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-700">セクション {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="text-red-600 hover:text-red-800 focus:outline-none"
                    >
                      削除
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        小見出し
                      </label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        placeholder="小見出しを入力してください"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        画像
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                        disabled={uploadingImage}
                      />
                      {section.image && (
                        <div className="mt-2">
                          <img
                            src={section.image}
                            alt="セクション画像"
                            className="w-20 h-20 object-cover rounded-md border border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      説明文
                    </label>
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(index, 'content', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="この画像についての説明を入力してください"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 保存ボタン */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <Link
                href="/site/admin"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-center"
              >
                キャンセル
              </Link>
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {preview ? "編集" : "プレビュー"}
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.title || !formData.content}
                className="px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '投稿中...' : '記事を投稿'}
              </button>
            </div>
          </form>
        ) : (
          // プレビュー - 実際の記事デザインと同じスタイル
          <div className="min-h-screen bg-neutral-100 -mx-4 sm:-mx-6 lg:-mx-8 -my-8">
            <div className="px-6 py-16">
              <article className="max-w-4xl mx-auto">
                {/* タイトル */}
                <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-center leading-relaxed tracking-wide text-neutral-900">
                  {formData.title || "記事タイトルがここに表示されます"}
                </h1>

                {/* カテゴリと日付 */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${formData.category === '思い出'
                      ? 'bg-[#e5e1dc] text-[#333]'
                      : 'bg-zinc-100 text-zinc-600'
                    }`}>
                    {formData.category}
                  </span>
                  <time className="text-base text-neutral-600">
                    {formData.publishDate.replace(/-/g, '.')}
                  </time>
                </div>

                {/* 記事の概要 */}
                {formData.excerpt && (
                  <div className="max-w-2xl mx-auto text-center mb-6">
                    <p className="text-lg text-neutral-700 leading-relaxed">
                      {formData.excerpt}
                    </p>
                  </div>
                )}

                {/* タグ */}
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* メイン画像（アイキャッチ） */}
                {formData.cover && (
                  <div className="flex justify-center mb-10">
                    <div className="bg-white p-1 shadow-lg max-w-full">
                      <img
                        src={formData.cover}
                        alt={formData.title}
                        className="w-full h-auto max-w-3xl mx-auto block object-contain"
                        style={{ aspectRatio: "auto" }}
                      />
                    </div>
                  </div>
                )}

                {/* 追加画像表示 */}
                {formData.images && formData.images.length > 0 && (
                  <div className="space-y-6 mb-10">
                    {formData.images.map((imageUrl, index) => (
                      <div key={index} className="flex justify-center">
                        <div className="bg-white p-1 shadow-lg max-w-full">
                          <img
                            src={imageUrl}
                            alt={`画像 ${index + 1}`}
                            className="w-full h-auto max-w-3xl mx-auto block object-contain"
                            style={{ aspectRatio: "auto" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 記事本文 */}
                {formData.content && (
                  <div className="max-w-2xl mx-auto px-4 md:px-8 mb-10">
                    <div className="text-neutral-800 leading-relaxed">
                      {formData.content.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                          <p key={index} className="mb-4 text-lg">
                            {paragraph}
                          </p>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* セクション表示 */}
                {formData.sections && formData.sections.length > 0 && (
                  <div className="mt-12 space-y-10">
                    {formData.sections.map((section, index) => (
                      <div key={index} className="max-w-4xl mx-auto">
                        {/* セクション見出し */}
                        {section.title && (
                          <div className="max-w-2xl mx-auto px-4 md:px-8 mb-6">
                            <h2 className="text-2xl md:text-3xl font-semibold text-center leading-relaxed tracking-wide text-neutral-800">
                              {section.title}
                            </h2>
                          </div>
                        )}

                        {/* セクション画像 */}
                        {section.image && (
                          <div className="flex justify-center mb-6">
                            <div className="bg-white p-1 shadow-lg max-w-full">
                              <img
                                src={section.image}
                                alt={section.title || `セクション ${index + 1}`}
                                className="w-full h-auto max-w-3xl mx-auto block object-contain"
                                style={{ aspectRatio: "auto" }}
                              />
                            </div>
                          </div>
                        )}

                        {/* セクション本文 */}
                        {section.content && (
                          <div className="max-w-2xl mx-auto px-4 md:px-8">
                            <div className="text-neutral-800 leading-relaxed">
                              {section.content.split('\n').map((paragraph, idx) => (
                                paragraph.trim() && (
                                  <p key={idx} className="mb-4 text-lg">
                                    {paragraph}
                                  </p>
                                )
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </article>

              {/* プレビュー画面のボタン */}
              <div className="max-w-4xl mx-auto mt-8 px-6">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                    <Link
                      href="/site/admin"
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-center"
                    >
                      キャンセル
                    </Link>
                    <button
                      type="button"
                      onClick={() => setPreview(!preview)}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      編集に戻る
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.title || !formData.content}
                      className="px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? '投稿中...' : '記事を投稿'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
