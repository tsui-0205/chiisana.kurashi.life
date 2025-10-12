import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 管理者パスワード（実際の運用では環境変数に設定）
function getDefaultPassword() {
    const now = new Date();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `kawagishi0205${m}${d}`;
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || getDefaultPassword();
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';

export async function POST(request) {
    try {
        const { password } = await request.json();

        // 今日の日付をパスワードとして許可する (複数フォーマット対応)
        function isTodayPassword(pw) {
            if (!pw) return false;
            const now = new Date();
            const y = now.getFullYear();
            const m = String(now.getMonth() + 1).padStart(2, '0');
            const d = String(now.getDate()).padStart(2, '0');
            const ymd = `${y}${m}${d}`;
            const mmdd = `${m}${d}`;
            const variants = [
                ymd,
                `${y}-${m}-${d}`,
                `${y}/${m}/${d}`,
                mmdd,
                `kawagishi0205${mmdd}`
            ];
            return variants.includes(String(pw));
        }

        if (password === ADMIN_PASSWORD || isTodayPassword(password)) {
            // セッションクッキーを設定
            const cookieStore = await cookies();
            const sessionToken = Buffer.from(`admin:${Date.now()}:${SESSION_SECRET}`).toString('base64');

            cookieStore.set('admin_session', sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 7日間
                path: '/'
            });

            return NextResponse.json({
                success: true,
                message: 'ログインしました'
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'パスワードが間違っています'
            }, { status: 401 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            success: false,
            message: 'ログインエラーが発生しました'
        }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('admin_session');

        return NextResponse.json({
            success: true,
            message: 'ログアウトしました'
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'ログアウトエラーが発生しました'
        }, { status: 500 });
    }
}
