"use client";
import { useEffect, useState } from "react";

/**
 * useImageLoaded(src)
 * - src: 画像のパス（string）
 * 戻り値: boolean (読み込み成功していれば true)
 *
 * クライアントサイドで Image をプリロードして読み込み可否を簡潔に扱うためのフック
 */
export default function useImageLoaded(src) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!src) {
            setLoaded(false);
            return;
        }
        let mounted = true;
        try {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                if (mounted) setLoaded(true);
            };
            img.onerror = () => {
                if (mounted) setLoaded(false);
            };
        } catch (e) {
            if (mounted) setLoaded(false);
        }
        return () => { mounted = false; };
    }, [src]);

    return loaded;
}
