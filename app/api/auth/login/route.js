import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 管理者パスワード（実際の運用では環境変数に設定）
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';

export async function POST(request) {
    try {
        const { password } = await request.json();
        
        if (password === ADMIN_PASSWORD) {
            // セッションクッキーを設定
            const cookieStore = cookies();
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
        const cookieStore = cookies();
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
