'use client';
import Link from 'next/link';

export default function FloatingWriteButton() {
    return (
        <Link
            href="/site/admin/new-post"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            aria-label="新しい記事を書く"
        >
            <svg 
                className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            
            {/* ツールチップ */}
            <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-zinc-800 text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                記事を書く
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-zinc-800"></div>
            </div>
        </Link>
    );
}
