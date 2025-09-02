'use client';
import ToTopButton from '../../ui/ToTopButton';

export default function ContactFooter() {
    return (
        <section className="relative bg-white border-t border-neutral-200">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap');
                .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
            `}</style>

            <div className="relative z-10">
                {/* メインコンテンツ */}
                <div className="mx-auto max-w-4xl px-6 py-16 text-center font-body">
                    <div className="mb-12 text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900" style={{ letterSpacing: '0.2em' }}>
                        <span className="relative inline-block">
                            CONTACT
                        </span>
                    </div>

                    <p className="mb-8 text-neutral-600 leading-7 text-sm max-w-md mx-auto">
                        下記のメールアドレスまでお気軽にご連絡ください
                    </p>

                    <a
                        href="mailto:chiisana.kurashi.life@gmail.com"
                        className="inline-flex items-center gap-3 rounded-lg border border-neutral-300 bg-neutral-50 px-6 py-3 shadow-sm transition-all hover:bg-neutral-100 hover:border-neutral-400 hover:shadow-md group cursor-pointer"
                        aria-label="メールアドレスに連絡"
                    >
                        {/* メールアイコン */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-neutral-600 group-hover:text-neutral-800 transition-colors">
                            <path d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M3.75 7.5 12 13.5l8.25-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 select-all transition-colors">
                            chiisana.kurashi.life@gmail.com
                        </span>
                    </a>
                </div>

                {/* 区切り */}
                <div className="mx-auto max-w-4xl px-6">
                    <div className="h-px bg-neutral-200 mb-8" />
                </div>

                {/* コピーライト */}
                <div className="mx-auto max-w-4xl px-6 pb-8">
                    <div className="text-center text-xs text-neutral-400">
                        © わたしと夫の小さな暮らし
                    </div>
                </div>

                {/* ページトップへ（共通部品） */}
                <ToTopButton />
            </div>
        </section>
    );
}
