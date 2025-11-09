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
                    animation: fadeInOut 1.5s ease-in-out infinite;
                }

                .loader-image:nth-child(1) {
                    animation-delay: 0s;
                }

                .loader-image:nth-child(2) {
                    animation-delay: 0.5s;
                }

                .loader-image:nth-child(3) {
                    animation-delay: 1s;
                }

                @keyframes fadeInOut {
                    0%, 100% {
                        opacity: 0;
                        transform: scale(0.8) translateY(10px);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
