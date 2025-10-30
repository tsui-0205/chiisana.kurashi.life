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

    // Cloudinary 設定が必要
    const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
        return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file');
        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer]);

        const uploadForm = new FormData();
        uploadForm.append('file', blob, file.name || 'upload.jpg');
        uploadForm.append('upload_preset', UPLOAD_PRESET);

        const cloudRes = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: 'POST', body: uploadForm }
        );

        const json = await cloudRes.json();
        if (!cloudRes.ok) {
            console.error('cloudinary error', json);
            return NextResponse.json({ error: 'Upload failed', details: json }, { status: 500 });
        }

        return NextResponse.json({ message: 'File uploaded successfully', url: json.secure_url, raw: json });
    } catch (error) {
        console.error('upload error', error);
        return NextResponse.json({ error: 'Failed to upload file', details: String(error) }, { status: 500 });
    }
}
