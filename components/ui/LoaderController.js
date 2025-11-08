"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LoaderController() {
    const pathname = usePathname();

    useEffect(() => {
        // hide loader when path changes
        try { window.dispatchEvent(new Event('__page-loader:hide')); } catch { }
    }, [pathname]);

    useEffect(() => {
        const onVisibility = () => {
            if (document.visibilityState === 'visible') {
                try { window.dispatchEvent(new Event('__page-loader:hide')); } catch { }
            }
        };
        window.addEventListener('visibilitychange', onVisibility);
        return () => window.removeEventListener('visibilitychange', onVisibility);
    }, []);

    useEffect(() => {
        // リンククリック時にローダーを表示
        const handleClick = (e) => {
            const target = e.target.closest('a');
            if (!target) return;

            const href = target.getAttribute('href');
            if (!href) return;

            // 外部リンク、アンカーリンク、mailto、tel などはスキップ
            if (
                href.startsWith('http') ||
                href.startsWith('//') ||
                href.startsWith('#') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:') ||
                target.getAttribute('target') === '_blank'
            ) {
                return;
            }

            // 現在のパスと同じ場合はスキップ
            const currentPath = window.location.pathname;
            const targetPath = href.startsWith('/') ? href : `/${href}`;
            if (currentPath === targetPath) return;

            // ローダーを表示
            try {
                window.dispatchEvent(new Event('__page-loader:show'));
            } catch { }
        };

        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, []);

    return null;
}
