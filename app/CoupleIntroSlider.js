'use client';

import { useState, useEffect } from 'react';

export default function CoupleIntroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const profiles = [
        {
            id: 'couple',
            name: '河岸夫妻',
            role: '石川で暮らす夫婦',
            image:  '/profiles/17552437879081.jpg', 
            description: [
                '石川県の豊かな自然に囲まれて、',
                '夫婦ふたりでゆったりと暮らしています。',
                '季節ごとに変わる風景、',
                '近所への散歩、ちょっとした発見...',
                'そんな何気ない日常の中にある',
                '小さな幸せを大切にして、',
                'この場所で記録していきたいと思います。'
            ],
            icon: (
                <svg className="w-16 h-16 text-rose-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
            ),
            gradient: 'from-pink-100 to-orange-100'
        },
        {
            id: 'wife',
            name: 'みさき',
            role: '音楽と食べることが大好き',
            image: '/profiles/wife.jpg', 
            interests: [
                { icon: '🍳', text: 'お菓子作り' },
                { icon: '☕', text: 'カフェタイム' },
                { icon: '🎵', text: 'ピアノ演奏' }
            ],
            icon: (
                <svg className="w-16 h-16 text-rose-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
            ),
            gradient: 'from-pink-100 to-rose-100'
        },
        {
            id: 'husband',
            name: 'つばさ',
            role: 'フットサルと読書が日課',
            image: '/profiles/husband.jpg', 
            interests: [
                { icon: '🚶‍♂️', text: '朝の散歩' },
                { icon: '📚', text: '読書' },
                { icon: '⚽', text: 'フットサル' },
            ],
            icon: (
                <svg className="w-16 h-16 text-rose-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14v6.5"></path>
                </svg>
            ),
            gradient: 'from-blue-100 to-indigo-100'
        }
    ];

    // 自動スライド（5秒ごと）
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % profiles.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative">
            {/* スライドコンテンツ */}
            <div className="overflow-hidden rounded-2xl">
                <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {profiles.map((profile, index) => (
                        <div key={profile.id} className="w-full flex-shrink-0">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                {/* プロフィール画像部分 */}
                                <div>
                                    <div className={`w-48 h-48 bg-gradient-to-br ${profile.gradient} rounded-full mx-auto flex items-center justify-center shadow-md overflow-hidden`}>
                                        <div className="text-center w-full h-full flex flex-col items-center justify-center">
                                            {profile.image ? (
                                                // 👈 写真がある場合は写真を表示
                                                <img 
                                                    src={profile.image} 
                                                    alt={profile.name}
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            ) : (
                                                // 👈 写真がない場合はアイコンを表示
                                                <>
                                                    {profile.icon}
                                                    <p className="text-rose-600 font-medium">{profile.name}</p>
                                                    <p className="text-rose-400 text-sm mt-1">{profile.role}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {profile.image && (
                                        // 👈 写真がある場合は名前を下に表示
                                        <div className="text-center mt-4">
                                            <p className="text-rose-600 font-medium">{profile.name}</p>
                                            <p className="text-rose-400 text-sm mt-1">{profile.role}</p>
                                        </div>
                                    )}
                                </div>
                                
                                {/* 説明文部分 */}
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    {profile.description ? (
                                        // 夫婦紹介（1枚目）は文章表示
                                        <>
                                            {profile.description.map((text, textIndex) => (
                                                <p key={textIndex}>
                                                    {text}
                                                </p>
                                            ))}
                                        </>
                                    ) : (
                                        // 個別紹介（2-3枚目）はアイコンリスト表示
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4">好きなこと・趣味</h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                {profile.interests?.map((interest, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                        <span className="text-2xl">{interest.icon}</span>
                                                        <span className="font-medium text-gray-700">{interest.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-rose-600 font-medium">
                                        ゆっくりと、自分たちらしく。
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* スライドインジケーター */}
            <div className="flex justify-center mt-6 space-x-2">
                {profiles.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentSlide === index 
                                ? 'bg-rose-500 scale-110' 
                                : 'bg-rose-200 hover:bg-rose-300'
                        }`}
                        aria-label={`スライド${index + 1}を表示`}
                    />
                ))}
            </div>

            {/* 左右のナビゲーションボタン（オプション） */}
            <button
                onClick={() => goToSlide((currentSlide - 1 + profiles.length) % profiles.length)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="前のスライド"
            >
                <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>

            <button
                onClick={() => goToSlide((currentSlide + 1) % profiles.length)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="次のスライド"
            >
                <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    );
}
