'use client';
import MailImageToggle from '../../ui/MailImageToggle';
import ToTopButton from '../../ui/ToTopButton';

export default function ContactFooter() {


    return (
        <section className="relative bg-white border-t border-neutral-200">
            <div className="relative z-10">
                {/* メインコンテンツ */}
                <div className="mx-auto max-w-4xl px-6 py-16 text-center font-body">
                    <div className="mb-12 text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900" style={{ letterSpacing: '0.2em' }}>
                        <span className="relative inline-block">CONTACT</span>
                    </div>

                    <p className="mb-8 text-neutral-600 leading-7 text-sm max-w-md mx-auto">
                        下記のアドレスまでお気軽にご連絡ください
                    </p>

                    <a
                        href="mailto:chiisana.kurashi.life@gmail.com"
                        className="inline-flex items-center gap-3 rounded-lg border border-neutral-300 bg-neutral-50 px-6 py-3 shadow-sm transition-all hover:bg-neutral-100 hover:border-neutral-400 hover:shadow-md group cursor-pointer"
                        aria-label="メールアドレスに連絡"
                    >
                        <MailImageToggle />
                    </a>
                </div>

                {/* 区切り */}
                <div className="mx-auto max-w-4xl px-6">
                    <div className="h-px bg-neutral-200 mb-8" />
                </div>

                {/* コピーライト */}
                <div className="mx-auto max-w-4xl px-6 pb-8">
                    <div className="text-center text-xs text-neutral-400">© わたしと夫の小さな暮らし</div>
                </div>

                {/* ページトップへ（共通部品） */}
                <ToTopButton />
            </div>
        </section>
    );
}
