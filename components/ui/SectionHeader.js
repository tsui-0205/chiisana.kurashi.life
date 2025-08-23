'use client';

import { useState, useEffect, useRef } from 'react';

export default function SectionHeader({ title, subtitle }) {
    const [isVisible, setIsVisible] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (headerRef.current) {
            observer.observe(headerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={headerRef}
            className={`text-center mb-12 transition-all duration-700 ease-out ${
                isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
            }`}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-['Noto_Sans_JP']">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-['Noto_Sans_JP']">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
