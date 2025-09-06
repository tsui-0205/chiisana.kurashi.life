import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // 管理画面の保護（ログインページ以外）
    if (pathname.startsWith('/site/admin') && !pathname.startsWith('/site/admin/login')) {
        const adminSession = request.cookies.get('admin_session');

        if (!adminSession) {
            // セッションがない場合はログインページにリダイレクト
            const loginUrl = new URL('/site/admin/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // セッショントークンの基本的な検証
        try {
            const decoded = Buffer.from(adminSession.value, 'base64').toString();
            const [user, timestamp, secret] = decoded.split(':');
            const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';

            if (user !== 'admin' || secret !== SESSION_SECRET) {
                const loginUrl = new URL('/site/admin/login', request.url);
                return NextResponse.redirect(loginUrl);
            }

            // 有効期限チェック（7日間）
            const tokenTime = parseInt(timestamp);
            const now = Date.now();
            const weekInMs = 7 * 24 * 60 * 60 * 1000;

            if (now - tokenTime >= weekInMs) {
                const loginUrl = new URL('/site/admin/login', request.url);
                return NextResponse.redirect(loginUrl);
            }
        } catch (error) {
            // トークンが不正な場合はログインページにリダイレクト
            const loginUrl = new URL('/site/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/site/admin/:path*']
};
