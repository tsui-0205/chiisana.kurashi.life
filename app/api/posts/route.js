import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';

// 認証チェック関数 (非同期化: cookies() が Promise を返すため)
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
        console.error('Auth check error:', error);
    }

    return false;
}

// GETリクエスト: 現在の投稿一覧を取得
export async function GET() {
    try {
        const postsPath = path.join(process.cwd(), 'data', 'posts.js');
        const postsContent = fs.readFileSync(postsPath, 'utf8');

        // posts.js から posts 配列を抽出
        const postsMatch = postsContent.match(/export const posts = (\[[\s\S]*?\]);/);
        if (!postsMatch) {
            return NextResponse.json({ error: 'Posts data not found' }, { status: 500 });
        }

        // 安全にevalするため、Function constructorを使用
        const postsData = new Function('return ' + postsMatch[1])();

        return NextResponse.json({ posts: postsData });
    } catch (error) {
        console.error('Error reading posts:', error);
        return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 });
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

        // バリデーション
        if (!newPost.id || !newPost.title || !newPost.content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const postsPath = path.join(process.cwd(), 'data', 'posts.js');
        const postsContent = fs.readFileSync(postsPath, 'utf8');

        // 現在の posts 配列を取得
        const postsMatch = postsContent.match(/export const posts = (\[[\s\S]*?\]);/);
        if (!postsMatch) {
            return NextResponse.json({ error: 'Posts data not found' }, { status: 500 });
        }

        const currentPosts = new Function('return ' + postsMatch[1])();

        // 重複チェック
        if (currentPosts.some(post => post.id === newPost.id)) {
            return NextResponse.json({ error: 'Post with this ID already exists' }, { status: 400 });
        }

        // 新しい投稿を配列の先頭に追加（最新順）
        currentPosts.unshift({
            id: newPost.id,
            title: newPost.title,
            date: newPost.date || new Date().toISOString().split('T')[0],
            cover: newPost.cover || "/images/sample/default.jpg",
            href: `/site/blog/${newPost.id}`,
            content: newPost.content,
            excerpt: newPost.excerpt || "",
            category: newPost.category || "日常",
            tags: newPost.tags || "",
            sections: newPost.sections || [], // 複数セクションを保存
        });

        // 新しい posts.js ファイルの内容を生成
        const newPostsContent = `// ブログ投稿データ
export const posts = ${JSON.stringify(currentPosts, null, 4).replace(/"([^"]+)":/g, '$1:')};
`;

        // ファイルに書き込み
        fs.writeFileSync(postsPath, newPostsContent, 'utf8');

        return NextResponse.json({
            message: 'Post created successfully',
            post: currentPosts[0]
        });

    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
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

        const postsPath = path.join(process.cwd(), 'data', 'posts.js');
        const postsContent = fs.readFileSync(postsPath, 'utf8');

        const postsMatch = postsContent.match(/export const posts = (\[[\s\S]*?\]);/);
        if (!postsMatch) {
            return NextResponse.json({ error: 'Posts data not found' }, { status: 500 });
        }

        const currentPosts = new Function('return ' + postsMatch[1])();

        // 投稿を見つけて更新
        const postIndex = currentPosts.findIndex(post => post.id === updatedPost.id);
        if (postIndex === -1) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        currentPosts[postIndex] = {
            ...currentPosts[postIndex],
            ...updatedPost,
            href: `/site/blog/${updatedPost.id}`, // hrefは常に正しく設定
        };

        // 新しい posts.js ファイルの内容を生成
        const newPostsContent = `// ブログ投稿データ
export const posts = ${JSON.stringify(currentPosts, null, 4).replace(/"([^"]+)":/g, '$1:')};
`;

        fs.writeFileSync(postsPath, newPostsContent, 'utf8');

        return NextResponse.json({
            message: 'Post updated successfully',
            post: currentPosts[postIndex]
        });

    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
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

        const postsPath = path.join(process.cwd(), 'data', 'posts.js');
        const postsContent = fs.readFileSync(postsPath, 'utf8');

        // 現在の posts 配列を取得
        const postsMatch = postsContent.match(/export const posts = (\[[\s\S]*?\]);/);
        if (!postsMatch) {
            return NextResponse.json({ error: 'Posts data not found' }, { status: 500 });
        }

        const currentPosts = new Function('return ' + postsMatch[1])();

        // 投稿を見つけて削除
        const postIndex = currentPosts.findIndex(post => post.id === postId);
        if (postIndex === -1) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // 投稿を配列から削除
        const deletedPost = currentPosts.splice(postIndex, 1)[0];

        // 新しい posts.js ファイルの内容を生成
        const newPostsContent = `// ブログ投稿データ
export const posts = ${JSON.stringify(currentPosts, null, 4).replace(/"([^"]+)":/g, '$1:')};
`;

        fs.writeFileSync(postsPath, newPostsContent, 'utf8');

        return NextResponse.json({
            message: 'Post deleted successfully',
            deletedPost: deletedPost
        });

    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
