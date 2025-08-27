'use client';
import ToTopButton from '../../ui/ToTopButton';

export default function ContactFooter() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-white to-sky-50 text-sky-900 shadow-sm">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Yomogi&display=swap');
                .font-body { font-family: 'Noto Sans JP', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
                .font-hand { font-family: 'Yomogi', 'Noto Sans JP', sans-serif; letter-spacing: .02em; }
                .text-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(0,0,0,0.08); text-shadow: 0 1px 0 rgba(0,0,0,0.05); }

                @keyframes sweat {
                    0% { transform: translateY(0) scaleY(1); opacity: 0.8; }
                    60% { opacity: 1; }
                    80% { transform: translateY(24px) scaleY(1.2); opacity: 1; }
                    100% { transform: translateY(40px) scaleY(0.8); opacity: 0; }
                }
                .animate-sweat {
                    animation: sweat 1.8s cubic-bezier(.4,0,.2,1) infinite;
                }

                @keyframes sweat-splash {
                    0% { transform: scale(0.7) translateY(0) translateX(0) rotate(-10deg); opacity: 0.7; }
                    30% { opacity: 1; }
                    60% { transform: scale(1.1) translateY(-12px) translateX(10px) rotate(10deg); opacity: 1; }
                    100% { transform: scale(0.7) translateY(0) translateX(0) rotate(-10deg); opacity: 0; }
                }
                .animate-sweat-splash {
                    animation: sweat-splash 1.8s cubic-bezier(.4,0,.2,1) infinite;
                }
            `}</style>

            {/* 上のアーチ部分 */}
            <div className="absolute top-0 left-0 right-0">
                <svg
                    className="w-full h-24"
                    viewBox="0 0 1440 120"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,120 C480,0 960,0 1440,120 L1440,0 L0,0 Z"
                        fill="white"
                    />
                </svg>
            </div>

            {/* 背景のデコレーション */}
            <div className="pointer-events-none absolute right-16 top-20 h-32 w-32 rounded-full bg-sky-200/40 blur-3xl" />
            <div className="pointer-events-none absolute left-24 bottom-16 h-28 w-28 rounded-full bg-sky-300/30 blur-3xl" />

            <div className="relative z-10">
                {/* メインコンテンツ */}
                <div className="mx-auto max-w-4xl px-6 pt-20 pb-12 text-center font-body">
                    <div
                        className="text-sky-700 font-bold font-body whitespace-nowrap overflow-hidden text-[18px] sm:text-[20px] md:text-[22px]"
                        style={{ letterSpacing: '0.08em', marginBottom: '40px', lineHeight: 1.2 }}
                    >
                        ご覧いただきありがとうございます
                    </div>

                    <div className="pointer-events-none mb-8 select-none text-[clamp(32px,7vw,90px)] font-semibold leading-none">
                        <span className="text-outline tracking-[0.15em]">CONTACT</span>
                    </div>

                    <p className="mb-6 text-sky-700 leading-7 text-sm">
                        下記のメールアドレスにお気軽にご連絡ください
                    </p>

                    <a
                        href="mailto:chiisana.kurashi.life@gmail.com"
                        className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-5 py-2.5 shadow-sm transition hover:bg-sky-100 group"
                        aria-label="メールアドレスに連絡"
                    >
                        {/* メールアイコン */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-sky-600 mr-1">
                            <path d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M3.75 7.5 12 13.5l8.25-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        <span className="text-base font-bold tracking-wide text-sky-700 underline-offset-4 group-hover:underline select-all">
                            chiisana.kurashi.life@gmail.com
                        </span>
                    </a>
                </div>

                {/* 区切り */}
                <div className="mx-auto max-w-5xl px-6">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-200 to-sky-300" />
                        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-sky-200 to-sky-300" />
                    </div>
                </div>

                {/* コピーライト */}
                <div className="mx-auto max-w-5xl px-6 pb-8">
                    <div className="text-center text-[10px] text-sky-400">
                        © わたしと夫の小さな暮らし
                    </div>
                </div>
                {/* ページトップへ（共通部品） */}
                <ToTopButton />
            </div>
        </section>
    );
}
