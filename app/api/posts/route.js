import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { kv } from '@vercel/kv';

const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';
const POSTS_KEY = 'blog:posts'; // KVストレージのキー

// 認証チェック関数
async function checkAuthentication() {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('admin_session')?.value;

        if (!sessionToken) {
            return false;
        }

        const decoded = Buffer.from(sessionToken, 'base64').toString();
        const [user, timestamp, secret] = decoded.split(':');

        if (user === 'admin' && secret === SESSION_SECRET) {
            const tokenTime = parseInt(timestamp);
            const now = Date.now();
            const weekInMs = 7 * 24 * 60 * 60 * 1000;

            return now - tokenTime < weekInMs;
        }
    } catch (error) {
        console.error('Authentication error:', error);
    }

    return false;
}

// GETリクエスト: 現在の投稿一覧を取得
export async function GET() {
    try {
        // KVから投稿を取得
        const posts = await kv.get(POSTS_KEY) || [];
        
        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Failed to read posts', details: error.message }, { status: 500 });
    }
}

// POSTリクエスト: 新しい投稿を追加
export async function POST(request) {
    // 認証チェック
    if (!(await checkAuthentication())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const newPost = await request.json();

        console.log('新しい投稿を受け取りました:', newPost);

        // バリデーション
        if (!newPost.id || !newPost.title || !newPost.content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // KVから現在の投稿を取得
        const currentPosts = await kv.get(POSTS_KEY) || [];

        // 重複チェック
        if (currentPosts.some(post => post.id === newPost.id)) {
            return NextResponse.json({ error: 'Post with this ID already exists' }, { status: 400 });
        }

        // 新しい投稿を作成
        const postToAdd = {
            id: newPost.id,
            title: newPost.title,
            date: newPost.date || new Date().toISOString().split('T')[0],
            cover: newPost.cover || "/images/sample/default.jpg",
            href: `/site/blog/${newPost.id}`,
            content: newPost.content,
            excerpt: newPost.excerpt || "",
            category: newPost.category || "日常",
            tags: newPost.tags || "",
            sections: newPost.sections || [],
        };

        // 配列の先頭に追加（最新順）
        currentPosts.unshift(postToAdd);

        console.log('保存する投稿:', currentPosts.length);

        // KVに保存
        await kv.set(POSTS_KEY, currentPosts);

        return NextResponse.json({
            message: 'Post created successfully',
            post: postToAdd
        });

    } catch (error) {
        console.error('投稿作成エラー:', error);
        return NextResponse.json({ 
            error: 'Failed to create post', 
            details: error.message 
        }, { status: 500 });
    }
}

// PUTリクエスト: 既存の投稿を更新
export async function PUT(request) {
    // 認証チェック
    if (!(await checkAuthentication())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const updatedPost = await request.json();

        if (!updatedPost.id) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }

        // KVから現在の投稿を取得
        const currentPosts = await kv.get(POSTS_KEY) || [];

        // 投稿を見つけて更新
        const postIndex = currentPosts.findIndex(post => post.id === updatedPost.id);
        if (postIndex === -1) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        currentPosts[postIndex] = {
            ...currentPosts[postIndex],
            ...updatedPost,
            href: `/site/blog/${updatedPost.id}`,
        };

        // KVに保存
        await kv.set(POSTS_KEY, currentPosts);

        return NextResponse.json({
            message: 'Post updated successfully',
            post: currentPosts[postIndex]
        });

    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ 
            error: 'Failed to update post',
            details: error.message 
        }, { status: 500 });
    }
}

// DELETEリクエスト: 投稿を削除
export async function DELETE(request) {
    // 認証チェック
    if (!(await checkAuthentication())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get('id');

        if (!postId) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }

        // KVから現在の投稿を取得
        const currentPosts = await kv.get(POSTS_KEY) || [];

        // 投稿を見つけて削除
        const postIndex = currentPosts.findIndex(post => post.id === postId);
        if (postIndex === -1) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // 投稿を配列から削除
        const deletedPost = currentPosts.splice(postIndex, 1)[0];

        // Cloudinary の画像を削除（投稿内の全画像を検出）
        const cloudinaryDeleteResults = [];
        
        // カバー画像を削除
        if (deletedPost.cover && deletedPost.cover.includes('cloudinary.com')) {
            const deleteResult = await deleteCloudinaryImage(deletedPost.cover);
            cloudinaryDeleteResults.push({ url: deletedPost.cover, result: deleteResult });
        }

        // セクション内の画像を削除
        if (deletedPost.sections && Array.isArray(deletedPost.sections)) {
            for (const section of deletedPost.sections) {
                if (section.image && section.image.includes('cloudinary.com')) {
                    const deleteResult = await deleteCloudinaryImage(section.image);
                    cloudinaryDeleteResults.push({ url: section.image, result: deleteResult });
                }
            }
        }

        // KVに保存
        await kv.set(POSTS_KEY, currentPosts);

        return NextResponse.json({
            message: 'Post deleted successfully',
            deletedPost: deletedPost,
            cloudinaryDeleted: cloudinaryDeleteResults
        });

    } catch (error) {
        console.error('Delete post error', error);
        return NextResponse.json({ error: 'Failed to delete post', details: String(error) }, { status: 500 });
    }
}

// Cloudinary から画像を削除するヘルパー関数
async function deleteCloudinaryImage(imageUrl) {
    try {
        const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
        const API_KEY = process.env.CLOUDINARY_API_KEY;
        const API_SECRET = process.env.CLOUDINARY_API_SECRET;

        if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
            console.error('Cloudinary not configured for deletion');
            return { success: false, error: 'Cloudinary not configured' };
        }

        // URL から public_id を抽出
        // 例: https://res.cloudinary.com/xxx/image/upload/v1234567890/blog/filename.jpg
        // → public_id は "blog/filename"
        const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|gif|webp)$/i);
        if (!match) {
            console.error('Could not extract public_id from URL:', imageUrl);
            return { success: false, error: 'Could not extract public_id from URL' };
        }

        const publicId = match[1]; // 例: "blog/filename"
        console.log('Deleting Cloudinary image:', publicId);

        // Cloudinary Admin API で削除（署名付き）
        const timestamp = Math.round(Date.now() / 1000);
        const crypto = await import('crypto');
        const stringToSign = `public_id=${publicId}&timestamp=${timestamp}`;
        const signature = crypto.createHash('sha1').update(stringToSign + API_SECRET).digest('hex');

        const deleteForm = new FormData();
        deleteForm.append('public_id', publicId);
        deleteForm.append('api_key', API_KEY);
        deleteForm.append('timestamp', String(timestamp));
        deleteForm.append('signature', signature);

        const cloudRes = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
            { method: 'POST', body: deleteForm }
        );

        const json = await cloudRes.json();
        console.log('Cloudinary delete response:', json);
        
        if (!cloudRes.ok) {
            console.error('Cloudinary delete failed:', { status: cloudRes.status, body: json });
            return { success: false, error: json, status: cloudRes.status };
        }

        return { success: true, result: json };
    } catch (error) {
        console.error('Error deleting Cloudinary image:', error);
        return { success: false, error: String(error) };
    }
}
