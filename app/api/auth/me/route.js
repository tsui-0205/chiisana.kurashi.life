import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('admin_session')?.value;

        if (!sessionToken) {
            return NextResponse.json({
                authenticated: false
            });
        }

        // セッショントークンを検証
        try {
            const decoded = Buffer.from(sessionToken, 'base64').toString();
            const [user, timestamp, secret] = decoded.split(':');

            if (user === 'admin' && secret === SESSION_SECRET) {
                // トークンの有効期限チェック（7日間）
                const tokenTime = parseInt(timestamp);
                const now = Date.now();
                const weekInMs = 7 * 24 * 60 * 60 * 1000;

                if (now - tokenTime < weekInMs) {
                    return NextResponse.json({
                        authenticated: true,
                        user: 'admin'
                    });
                }
            }
        } catch (decodeError) {
            console.error('Token decode error:', decodeError);
        }

        // 無効なトークンの場合はクッキーを削除
        try {
            cookieStore.delete('admin_session');
        } catch (e) {
            // ignore
        }

        return NextResponse.json({
            authenticated: false
        });

    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json({
            authenticated: false
        }, { status: 500 });
    }
}
