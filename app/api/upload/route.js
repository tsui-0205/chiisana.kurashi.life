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

export async function POST(request) {
    // 認証チェック
    if (!(await checkAuthentication())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // ファイル名を安全な形式に変換
        const timestamp = Date.now();
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${timestamp}_${sanitizedName}`;

        // 年月日フォルダを作成（YYYYMMDD形式）
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const dateFolder = `${year}${month}${day}`;

    // アップロード先のディレクトリを確保（article/YYYYMMDD サブフォルダ）
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'blog', 'article', dateFolder);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // ファイルを保存
        const filePath = path.join(uploadDir, fileName);
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        fs.writeFileSync(filePath, buffer);

    // 公開URLを返す（article/YYYYMMDD サブフォルダ）
    const publicUrl = `/images/blog/article/${dateFolder}/${fileName}`;

        return NextResponse.json({
            message: 'File uploaded successfully',
            url: publicUrl,
            fileName: fileName
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
