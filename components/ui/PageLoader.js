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
                <img className="loader-image" src="/images/loadishikawa.png" alt="loader1" />
                <img className="loader-image" src="/images/loadishikawa.png" alt="loader2" />
                <img className="loader-image" src="/images/loadishikawa.png" alt="loader3" />
            </div>
            <div className="loading-text">ロード中...</div>

            <style jsx>{`
                .page-loader-root {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    background: linear-gradient(145deg, #fefcea, #f1daff);
                    font-family: 'Helvetica Neue', sans-serif;
                }

                .loader-container {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                    justify-content: center;
                }

                .loader-image {
                    width: 100px;
                    height: auto;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeUp 0.6s ease forwards;
                }

                .loader-image:nth-child(1) {
                    animation-delay: 0.2s;
                }

                .loader-image:nth-child(2) {
                    animation-delay: 0.6s;
                }

                .loader-image:nth-child(3) {
                    animation-delay: 1s;
                }

                @keyframes fadeUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* make loading text animate with the images (use same fadeUp) */
                .loading-text {
                    margin-top: 1.6rem;
                    font-size: 1.2rem;
                    color: #666;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeUp 0.6s ease forwards;
                    animation-delay: 1s; /* sync with 3rd image */
                }
            `}</style>
        </div>
    );
}
