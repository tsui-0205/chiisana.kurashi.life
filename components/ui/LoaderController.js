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

    return null;
}
