'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AuthenticatedWriteButton() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/auth/me');
            const data = await response.json();
            setIsAuthenticated(data.authenticated);
        } catch (error) {
            console.error('Auth check error:', error);
            setIsAuthenticated(false);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Link
            href="/site/admin/new-post"
            className="group flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium">記事を書く</span>
        </Link>
    );
}
