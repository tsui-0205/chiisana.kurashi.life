'use client';

export default function ContactFooter() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50/50 to-white text-zinc-800">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
        .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
        .font-hand { font-family: 'Yomogi', 'Noto Sans JP', sans-serif; letter-spacing: .02em; }
        .text-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(0,0,0,0.1); text-shadow: 0 1px 0 rgba(0,0,0,0.05); }
      `}</style>

            {/* Top divider with subtle gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent"></div>

            {/* Soft decorative blobs */}
            <div className="pointer-events-none absolute right-16 top-20 h-40 w-40 rounded-full bg-blue-100/30 blur-3xl" />
            <div className="pointer-events-none absolute left-24 bottom-20 h-32 w-32 rounded-full bg-amber-100/40 blur-3xl" />

            <div className="relative z-10">
                {/* Main content container */}
                <div className="mx-auto max-w-5xl px-6 pt-28 pb-24 text-center font-body">
                    {/* 小見出し */}
                    <div className="mb-8 text-zinc-600">ご覧いただきありがとうございます</div>

                    {/* 大きな CONTACT アウトライン */}
                    <div className="pointer-events-none mb-10 select-none text-[clamp(40px,8vw,120px)] font-semibold leading-none">
                        <span className="text-outline tracking-[0.2em]">CONTACT</span>
                    </div>

                    {/* 説明文 */}
                    <p className="mb-8 text-zinc-600 leading-8">
                        下記のメールアドレスにお気軽にご連絡ください
                    </p>

                    {/* メールボタン（pill） */}
                    <a
                        href="mailto:peche.toitoitoi@gmail.com"
                        className="mx-auto inline-flex items-center gap-3 rounded-full border border-zinc-300 bg-zinc-50 px-6 py-3 shadow-sm transition hover:bg-zinc-100"
                    >
                        <span className="text-sm tracking-wide text-zinc-600">peche.toitoitoi@gmail.com</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-zinc-600">
                            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

                {/* Footer divider */}
                <div className="mx-auto max-w-6xl px-6">
                    <div className="flex items-center gap-6 mb-8">
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 to-zinc-300" />
                        <span className="text-xs text-zinc-400 tracking-widest">FOOTER</span>
                        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-200 to-zinc-300" />
                    </div>
                </div>

                {/* 下部のコピーライト */}
                <div className="mx-auto max-w-6xl px-6 pb-10">
                    <div className="text-center text-xs text-zinc-400">
                        © わたしと夫の小さな暮らし
                    </div>
                </div>
            </div>
        </section>
    );
}
