"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function MailImageToggle() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsOpen((prev) => !prev);
        }, 1000); // 1秒ごとに切り替え

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-2">
            {/* メール画像 */}
            <div className="w-6 h-6 flex-shrink-0">
                <Image
                    src={isOpen ? "/images/mail/open-mail.jpg" : "/images/mail/close-mail.jpg"}
                    alt={isOpen ? "開いたメール" : "閉じたメール"}
                    width={24}
                    height={24}
                    className="rounded transition-all duration-300"
                />
            </div>

            {/* メールアドレス */}
            <span className="text-sm font-medium text-neutral-700 select-all transition-colors">
                tsui.chiisana.kurashi@gmail.com
            </span>
        </div>
    );
}
