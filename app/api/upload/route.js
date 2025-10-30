import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs'; // ensure Node runtime so we can use Buffer, etc.

const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';

// 認証チェック
async function checkAuthentication() {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('admin_session')?.value;
        if (!sessionToken) return false;
        const decoded = Buffer.from(sessionToken, 'base64').toString();
        const [user, timestamp, secret] = decoded.split(':');
        if (user === 'admin' && secret === SESSION_SECRET) {
            const tokenTime = parseInt(timestamp);
            const now = Date.now();
            const weekInMs = 7 * 24 * 60 * 60 * 1000;
            return now - tokenTime < weekInMs;
        }
    } catch (e) {
        console.error('auth check failed', e);
    }
    return false;
}

export async function POST(request) {
    // 認証チェック
    if (!(await checkAuthentication())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Cloudinary 設定が必要 (API Key/Secret を使った署名付きアップロード)
    const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
    const API_KEY = process.env.CLOUDINARY_API_KEY;
    const API_SECRET = process.env.CLOUDINARY_API_SECRET;
    const missing = [];
    if (!CLOUD_NAME) missing.push('CLOUDINARY_CLOUD_NAME');
    if (!API_KEY) missing.push('CLOUDINARY_API_KEY');
    if (!API_SECRET) missing.push('CLOUDINARY_API_SECRET');
    if (missing.length) {
        // どの env が足りないか明示して返す（値は出さない）
        return NextResponse.json({ error: 'Cloudinary not configured', missing }, { status: 500 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file');
        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64File = `data:${file.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;

        // 署名生成 (timestamp + folder 指定)
        const timestamp = Math.round(Date.now() / 1000);
        const folder = 'blog'; // Cloudinary のフォルダ名（任意で変更可）
        const crypto = await import('crypto');
        const stringToSign = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
        const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

        const uploadForm = new FormData();
        uploadForm.append('file', base64File);
        uploadForm.append('api_key', API_KEY);
        uploadForm.append('timestamp', String(timestamp));
        uploadForm.append('signature', signature);
        uploadForm.append('folder', folder);

        const cloudRes = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: 'POST', body: uploadForm }
        );

        let json;
        try {
            json = await cloudRes.json();
        } catch (e) {
            console.error('failed to parse cloudinary response', e);
            const text = await cloudRes.text().catch(() => 'no-body');
            console.error('cloudinary raw response', text);
            return NextResponse.json({ error: 'Upload failed', details: 'Invalid response from Cloudinary', status: cloudRes.status }, { status: 502 });
        }

        if (!cloudRes.ok) {
            console.error('cloudinary error', { status: cloudRes.status, body: json });
            return NextResponse.json({ error: 'Upload failed', details: json, status: cloudRes.status }, { status: 502 });
        }

        return NextResponse.json({ message: 'File uploaded successfully', url: json.secure_url, raw: json });
    } catch (error) {
        console.error('upload error', error);
        return NextResponse.json({ error: 'Failed to upload file', details: String(error) }, { status: 500 });
    }
}
