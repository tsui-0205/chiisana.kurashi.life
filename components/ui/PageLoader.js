"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const show = () => setVisible(true);
        const hide = () => setVisible(false);

        window.addEventListener("__page-loader:show", show);
        window.addEventListener("__page-loader:hide", hide);

        return () => {
            window.removeEventListener("__page-loader:show", show);
            window.removeEventListener("__page-loader:hide", hide);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="page-loader-root">
            <div className="loader-container" role="status" aria-live="polite">
                <span className="loader-char">い</span>
                <span className="loader-char">し</span>
                <span className="loader-char">か</span>
                <span className="loader-char">わ</span>
            </div>
            <div className="loading-text">ロード中...</div>

            <style jsx>{`
                .page-loader-root {
                    position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; flex-direction: column;
                    background: linear-gradient(145deg, #fefcea, #f1daff);
                    font-family: 'Helvetica Neue', sans-serif;
                }
                .loader-container { display: flex; gap: 1rem; font-size: 4rem; color: #333; font-weight: bold; }
                .loader-char { opacity: 0; transform: translateY(20px); animation: fadeUp 0.6s ease forwards; }
                .loader-char:nth-child(1) { animation-delay: 0.2s; }
                .loader-char:nth-child(2) { animation-delay: 0.6s; }
                .loader-char:nth-child(3) { animation-delay: 1s; }
                .loader-char:nth-child(4) { animation-delay: 1.4s; }
                @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
                .loading-text { margin-top: 2rem; font-size: 1.2rem; color: #666; opacity: 0; animation: fadeIn 1s ease forwards; animation-delay: 2s; }
                @keyframes fadeIn { to { opacity: 1; } }
            `}</style>
        </div>
    );
}
