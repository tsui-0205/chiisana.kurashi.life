'use client';
import { useState } from 'react';
import Image from 'next/image';
import ToTopButton from '../../ui/ToTopButton';

export default function ContactFooter() {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 500); // 0.5秒後に元に戻す
    };

    return (
        <section className="relative bg-white border-t border-neutral-200">
            <div className="relative z-10">
                {/* メインコンテンツ */}
                <div className="mx-auto max-w-4xl px-6 py-16 text-center font-body">
                    <div className="mb-12 text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900" style={{ letterSpacing: '0.2em' }}>
                        <span className="relative inline-block">CONTACT</span>
                    </div>

                    <p className="mb-8 text-neutral-600 leading-7 text-sm max-w-md mx-auto">
                        下記のメールアドレスまでお気軽にご連絡ください
                    </p>

                    <a
                        href="mailto:chiisana.kurashi.life@gmail.com"
                        className="inline-flex items-center gap-3 rounded-lg border border-neutral-300 bg-neutral-50 px-6 py-3 shadow-sm transition-all hover:bg-neutral-100 hover:border-neutral-400 hover:shadow-md group cursor-pointer"
                        aria-label="メールアドレスに連絡"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleClick}
                    >
                        {/* 小さなメールイラスト */}
                        <div className="w-6 h-6 flex-shrink-0">
                            <Image
                                src={(isHovered || isClicked) ? "/images/mail/open-mail.jpg" : "/images/mail/close-mail.jpg"}
                                alt={(isHovered || isClicked) ? "開いたメール" : "閉じたメール"}
                                width={24}
                                height={24}
                                className="rounded transition-all duration-300"
                            />
                        </div>
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
                    <div className="text-center text-xs text-neutral-400">© わたしと夫の小さな暮らし</div>
                </div>

                {/* ページトップへ（共通部品） */}
                <ToTopButton />
            </div>
        </section>
    );
}
